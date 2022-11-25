---
title: Signatures
description: 'Describe what signatures are and how they are processed in Convoy'
id: signatures
order: 6
---

Signatures
==========

Webhook signatures are strings used to verify the validity of a webhook event sent to Convoy. This signature is passed as header values in the format: `X-Convoy-Signature`.

The signature encoding, hashing algorithm and signing secret are all retrieved from your project settings. These values are used in validating the webhook signature in the header accompanying the webhook event.

![Configuring HMAC](/docs-assets/hmac-signature.png)

Convoy provides support for simple signatures and advanced signatures, as well as SDK methods to verify the integrity of these signatures.

## Simple signatures

Simple webhook signatures are used to validate the webhook sent. The validation is an important process to prevent exploitation and malicious webhook requests.

An example simple signature is:

```[example]
X-Convoy-Signature: 6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39
```

An example request header with a simple signature sent to Convoy:

```json[Sample header]
{
    Content-Type: "application/json",
    X-Convoy-Signature: "6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39"
}
```

## Advanced signatures

Unlike simple signatures, advanced signatures are equipped with timestamps. Example:

```[example]
X-Convoy-Signature:
t=1492774577,
v1=ansdoj213e98jqd928u3eudh239eu2j9d2jd8ejd238eu23ei2d9j23e8u23eue3,
v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,
v0=6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39
```

An example header with the advanced signature is:

```json[Advanced signature header]
{
    Content-Type: "application/json",
    X-Convoy-Signature: "t=1492774577,v1=ansdoj213e98jqd928u3eudh239eu2j9d2jd8ejd238eu23ei2d9j23e8u23eue3v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd,v0=6ffbb59b2300aae63f272406069a9788598b792a944a07aba816edb039989a39"
}
```

The signature above contains a timestamp `t` and multiple signature hashes `v0` and `v1`. Convoy matches at least one of the signatures to verify the authenticity of the webhook event sent.

To further understand the concept of advanced signatures, we have made available a [blog post](/blog/generating-stripe-like-webhook-signatures) on how they are generated as well as their use cases.

## Verifying signatures manually

Convoy uses a hash-based message authentication code ( HMAC ) with an encoding method set in the project settings to generate signatures. Convoy [SDKs](/docs/sdks) are equipped with methods to verify your signatures, but you can also follow the steps outlined below to verify your signatures:

### Step 1: Detect the signature type and extract the signatures

Split the signature header into a list of variables using the delimiter `,` and store the list into a variable. Determine the type of signature passed in the header from the length of the list; the signature is an advanced signature if the length of the variable is greater than one and if the length equals 1, the signature type is simple.

If the signature is an advanced signature, the signature is further split using `=` as the delimiter to get a key and value pair. The timetstamp and signatures values can now be retrieved respectively.

If the signature is a simple signature, the signature string is returned unprocessed.

### Step 2: Create a new signature string

A new signature payload is computed by the HMAC library and encoded in the user-defined encoding from the payload:

- The timestamp ( not required for simple signatures)
- A request body in JSON

The payload is signed using an endpoint secret known to the webhook event sender.

### Step 3: Compare the signatures

Compare the signatures from the event header and the signature computed from the previous step. Compare the difference in the timestamps taking a tolerance value into consideration. It is also advised to perform a constant string comparison for the signatures.

## References

- [Generating Stripe-like Webhook Signatures](https://getconvoy.io/blog/generating-stripe-like-webhook-signatures/)