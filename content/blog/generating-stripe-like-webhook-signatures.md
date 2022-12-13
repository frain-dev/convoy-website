---
title: Generating Stripe-like Webhook Signatures
feature_image: stripe-like-signatures.png
post_image: stripe-like-signatures.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: false
description: Building a webhook publishing infrastructure requires providing a way to validate the message’s integrity to enable consumers to validate the webhook event origin. In this blog post, Subomi takes us through how Stripe-like signatures are generated.
published_at: 2022-10-12T10:00:00.000+00:00
---

Building a webhook publishing infrastructure requires providing a way to validate the message’s integrity to enable consumers to validate the webhook event origin. Generating webhook signatures would require us to implement certain important features which include:

1. Prevent Replay Attacks
2. Forward Compatibility.
3. Zero Downtime Key Rotation.

More on each item later on. But these properties exist in Stripe’s webhook signature implementation, see below:

```bash
Stripe-Signature:
t=1492774577,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v0=6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39
```

In this article, we would replicate this implementation in Golang, with one additional requirement; We want our implementation to be backward compatible with the common implementation, like the below:

```bash
Stripe-Signature: 
5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

This backward compatibility allows new API consumers to opt-in to this new system at their choosing. For the purpose of this article, we define the latter signature specification as simple signatures and the former as advanced signatures. Implementing simple signatures is pretty trivial and commonplace, but advanced signatures aren’t common.

We start by breaking down the requirements to discuss advanced signatures even further.

### Prevent Replay Attacks

```bash
Stripe-Signature:
t=1492774577,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v0=6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39
```

A replay attack occurs when an attacker intercepts a valid payload, and its signature, then re-transmits them. The aim is to exploit unsuspecting webhook consumers to perform an action multiple times. Idempotent keys aren’t sufficient against attacks like this because, webhooks are transient data, assuming consumers purge their webhook log after a certain period, it means re-transmitting purged webhook events all of sudden becomes valid. 

To mitigate against this, we generate a timestamp and include it in the signed payload, so it is verified alongside the signature, so the attacker cannot change the timestamp without invalidating the signature. This ensures that events after a given threshold are regarded invalid. 

When retrying events each delivery attempt should re-generate the timestamp, this ensures the timestamp is fresh.

### Forward Compatibility

```bash
Stripe-Signature:
t=1492774577,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v0=6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39
```

Webhooks implementation evolves over time, providers can determine whether to switch from `hex` to `base64` for encoding or change the hash function or the template of the payload being signed. To enable smooth upgrades for consumers, we version signatures in the example above. This allows consumers to verify against at least just one signature and migrate to the newest version at their convenience.

### Zero Downtime Key Rotation

```bash
Stripe-Signature:
t=1492774577,
v1=xdz+2j9aMVQUUjSy0KUz/CsjD4jaD6wHJGGf1c3eZzrWxHTf1cAjZ3aL07O9NZXMhg5gajfi+TYuBU1aoU18xA==,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v0=cvt+CsjD4jaD6wHJGGf1/2j9aMVQUUjSy0KUzc3eZzrWxHTf1cTYuBU1aoU18xAAjZ3aL07O9+NZXMhg5gajfi==
v0=df51a848684dac3901d2b8bd17e5c8d2d971b15c544fa923493232df1fe0fbad
```

Webhooks rely on a shared secret that needs to be rotated periodically to be kept safe. Building effective key rotation mechanisms is a major implementation of great webhooks implementations. In the above sample, you can see `v1` and `v0` appear twice this means, we used two secrets to generate two different schemes.

### Core Implementation

The core implementation goes thus:

```go
type Scheme struct {
	// Secret represents a list of active secrets used for
	// a scheme. It is used to implement rolled secrets.
	// Its order is irrelevant.
	Secret []string

	Hash     string
	Encoding string
}

type Signature struct {
	Payload json.RawMessage

	// The order of these Schemes is a core part of this API.
	// We use the index as the version number. That is:
	// Index 1 = v1, Index 2 = v2
	Schemes []Scheme

	// This flag allows for backward-compatible implementation
	// of this type. You're either generating a simple header
	// or a complex header.
	Advanced bool

	// This function is used to generate a timestamp for signing
	// your payload. It was only added to aid testing.
	generateTimestampFn func() string
}

func (s *Signature) ComputeHeaderValue() (string, error) {
	// Encode Payload
	tBuf, err := s.encodePayload()
	if err != nil {
		return "", err
	}

	// Generate Simple Signatures
	if !s.Advanced {
		sch := s.Schemes[len(s.Schemes)-1]
		sec := sch.Secret[len(sch.Secret)-1]

		sig, err := s.generateSignature(sch, sec, tBuf)
		if err != nil {
			return "", err
		}

		return sig, nil
	}

	// Generate Advanced Signatures
	var signedPayload strings.Builder
	var hStr strings.Builder
	var ts string

	// Add timestamp.
	if s.generateTimestampFn != nil {
		ts = s.generateTimestampFn()
	} else {
		ts = fmt.Sprintf("%d", time.Now().Unix())
	}

	// Generate Payload
	signedPayload.WriteString(ts)
	signedPayload.WriteString(",")
	signedPayload.WriteString(string(tBuf))

	// Generate Header
	tPrefix := fmt.Sprintf("t=%s", ts)
	hStr.WriteString(tPrefix)

	for k, sch := range s.Schemes {
		v := fmt.Sprintf(",v%d=", k+1)

		var hSig string
		for _, sec := range sch.Secret {
			sig, err := s.generateSignature(sch, sec, []byte(signedPayload.String()))
			if err != nil {
				return "", err
			}

			hSig = fmt.Sprintf("%s%s", v, sig)
			hStr.WriteString(hSig)
		}
	}

	return hStr.String(), nil
}
```

Let’s break down the above code listing:

1. We use the `Advanced` flag to determine what type of signature to generate.
2. We use the `Scheme` type to encapsulate all versions, and the order in which they’re passed in determines their version. We map to index 0 to `v1` etc similar to how we don’t define API versioning as `/api/v0`.
3. `ComputeHeaderValue` will either generate a simple signature string or an advanced signature string based on the `Advanced` flag.
4. The line `tBuf, err := s.encodePayload()` encodes the payload and strips out all whitespace characters. This is important because verifying signatures will require both the provider and consumer to generate signatures over the exact same payload. Any difference in the payload will result in different hashes generated. This is why as a rule of thumb, in Convoy, we strip out all whitespace characters. 

Other aspects of this library were removed for brevity, you can find the full code [here](https://github.com/frain-dev/convoy/blob/main/pkg/signature/signature.go).

### Caveat
One caveat to keep in mind

### SDK

To enable easy migration, we’ve added webhook verification logic to our [Ruby](https://github.com/frain-dev/convoy.rb), [Python](https://github.com/frain-dev/convoy-python) & [Golang](https://github.com/frain-dev/convoy-go) SDKs to parse and validate this format. This verification will automatically identify either simple or advanced signatures and validate them respectively. 

### Separate API Keys from Webhook Secrets

Another useful benefit of Advanced Signatures is we can stop using our API Keys as webhooks secrets with zero downtime. This is good because compromised webhook secrets do not equal compromised API Keys and vice-versa. This is also known as the principle of least privilege. To achieve this do the following: 

1. Create endpoints, and set the webhook secret as the API Key.
2. Update your apps to verify Advanced Signatures.
3. Roll over the current webhook secret with an expiry time. 
4. Set the new webhook secret in your apps. 🎉

### Conclusion

In this article, we showed how to implement Stripe-Like webhooks and build them in a backward-compatible fashion with your current implementation. We shipped this feature to Convoy OSS and Cloud. You can sign up [here](https://dashboard.getconvoy.io) to get started!
