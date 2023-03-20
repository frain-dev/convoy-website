---
title: Signatures
description: 'Describe what signatures are and how they are processed in Convoy'
id: signatures
order: 6
layout: docs
---

# Signatures

Webhook signatures are strings used to verify the validity of a webhook event sent to Convoy. This signature is passed as header values in the format: `X-Convoy-Signature`.

The signature encoding, hashing algorithm and signing secret are all retrieved from your Convoy source definition. These values are used in validating the webhook signature in the header accompanying the webhook event.

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
