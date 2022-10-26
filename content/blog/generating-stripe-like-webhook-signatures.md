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
featured: true
description: Building a webhook publishing infrastructure requires providing a way to validate the message’s integrity to enable consumers to validate the webhook event origin. In this blog post, Subomi takes us through how Stripe-like signatures are generated.
published_at: 2022-10-12T10:00:00.000+00:00
---


Building a webhook publishing infrastructure requires providing a way to validate the message’s integrity to enable consumers to validate the webhook event origin. Generating webhook signatures would require us to implement certain important features which include:

1. Prevent Replay Attacks
2. Forward Compatibility.
3. Zero Downtime Key Rotation.

All these properties mentioned exist in Stripe’s webhook signature implementation, see below:

```bash
Stripe-Signature:
t=1492774577,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v0=6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39
```

In this article, we would replicate this implementation in Golang, with one additional requirement; We want our implementation to be backward compatible with the common implementation, like the signature below:

```bash
Stripe-Signature: 
5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

This backward compatibility allows new API consumers to opt-in to this new system at their choosing. For this article, we define the latter signature specification as **simple signatures** and the former as **advanced signatures**. Implementing simple signatures is pretty trivial and commonplace already, but advanced signatures aren’t common.

To discuss advanced signatures, we start by breaking down the requirements even further.

## Prevent Replay Attacks

```bash
Stripe-Signature:
**t=1492774577,**
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v0=6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39
```

A replay attack occurs when an attacker intercepts a valid payload, and its signature, then re-transmits them. The aiming range from exploiting webhook consumers that don’t process webhook events in an idempotent fashion, and replaying old events to perform an action twice.

A replay attack occurs when an attacker intercepts a valid payload and its signature and then re-transmits them for malicious purposes. An example of an exploit is to assume a consumer idempotently processes events with the `X-Event-ID` from the provider, but the consumer also archives webhook events after a certain timeframe. With this setup, it means after a certain time, old events become valid again. 

To mitigate against this, we generate a timestamp and include it in the signed payload so it is verified alongside the signature and so the attacker cannot change the timestamp without invalidating the signature. This ensures that events after a given threshold are regarded invalid. 

When retrying events, each delivery attempt should re-generate the timestamp. This ensures the timestamp is fresh.

## Forward Compatibility

```bash
Stripe-Signature:
t=1492774577,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
**v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v0=6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39**
```

Webhooks implementation evolves over time. Webhook providers can determine whether to switch from `hex` to `base64` for encoding or change the hash function or the template of the payload being signed. To enable smooth upgrades for consumers, Convoy version signatures as in the example above. This allows consumers to verify against at least just one signature and migrate to the newest version at their convenience.

## Zero Downtime Key Rotation

```bash
Stripe-Signature:
t=1492774577,
**v1=xdz+2j9aMVQUUjSy0KUz/CsjD4jaD6wHJGGf1c3eZzrWxHTf1cAjZ3aL07O9NZXMhg5gajfi+TYuBU1aoU18xA==,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,**
v0=cvt+CsjD4jaD6wHJGGf1/2j9aMVQUUjSy0KUzc3eZzrWxHTf1cTYuBU1aoU18xAAjZ3aL07O9+NZXMhg5gajfi==
v0=df51a848684dac3901d2b8bd17e5c8d2d971b15c544fa923493232df1fe0fbad
```

Webhooks rely on a shared secret that needs to be rotated periodically to be kept safe. Building effective key rotation mechanisms is a major implementation of great webhooks implementations. In the above sample, you can see `v1` and `v0` appear twice this means, we used two secrets to generate two different schemes.

## Core Implementation

The entire core library goes thus:

```go[signatures.go]
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
	// Index 0 = v0, Index 1 = v1
	Schemes []Scheme

	// This flag allows for backward-compatible implementation
	// of this type. You're either generating a simplistic header
	// or a complex header.
	Advanced bool
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
	var hStr strings.Builder

	// Add timestamp.
	t := fmt.Sprintf("t=%d,", time.Now().Unix())
	hStr.WriteString(t)

	for k, sch := range s.Schemes {
		v := fmt.Sprintf("v%d=", k)

		var hSig string
		for _, sec := range sch.Secret {
			sig, err := s.generateSignature(sch, sec, tBuf)
			if err != nil {
				return "", err
			}

			hSig = fmt.Sprintf("%s%s,", v, sig)
			hStr.WriteString(hSig)
		}

	}

	return hStr.String(), nil
}
```

Other aspects of this library were removed for brevity.

Let’s break down the above code listing:

1. We use the `Advanced` flag to determine what type of signature to generate.
2. We use the `Scheme` type to determine unique variables per signature.

### SDK

To support adoption, we’ve adapted our core libraries to parse and validate this format. 

### Appendix

1. JSON objects are an unordered collection. The ordering should not matter but in the context of webhooks, they matter. Your webhook infrastructure should not tamper with the order, It should process as is.
2. JSON objects should trim space by default to prevent different strange computation results. 
3. The core requirements of this implementation were expanded upon at [webhooks.fyi](https://webhooks.fyi) 

### Conclusion

In this article, we showed how to implement Stripe-Like webhooks and build them in a backward-compatible fashion with your current implementation. We shipped this feature in Convoy, and you can deploy and publish great webhook signatures for your users!