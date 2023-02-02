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

Convoy uses a hash-based message authentication code ( HMAC ) with an encoding method set in the project settings to generate signatures. Convoy [SDKs](/docs/sdks) are equipped with methods to verify your signatures, but you can also follow the steps outlined below to manually verify your signatures:

### Step 1: Detect the signature type and extract the signatures

Split the signature header into a list of variables using the delimiter `,` and store the list into a variable. Determine the type of signature passed in the header from the length of the list; the signature is an advanced signature if the length of the variable is greater than one and if the length equals 1, the signature type is simple.

If the signature is an advanced signature, the signature is further split using `=` as the delimiter to get a key and value pair. The timetstamp and signatures values can now be retrieved respectively.

If the signature is a simple signature, the signature string is returned unprocessed.

### Step 2: Create a new signature string

Now, we need to generate our own signature. To do this, using a HMAC library of your choice (most languages provide functions in the standard library for this purpose) create a digest with the following:
- A shared secret.
- Encoding: `base64` or `hex`.
- Request Payload. If it's an advanced signature, payload should be a concatenated string of the timestamp and the request payload delimited by `,`. It should look like: `{timestamp},{payload}`

### Step 3: Verify Timestamp (Optional)

If it's an advanced signature, before comparing signatures. Verify that the timestamp is within your tolerance limit. Events outside your tolerance range can be ignored.

### Step 4: Compare the signatures

Compare the signatures from the request header to the signature computed from the previous step. With simple signatures, a string match is all that is required, while with advanced signatures, our computed signature must match at least one of the supplied signatures in the request header. To prevent against [timing attacks](https://en.wikipedia.org/wiki/Timing_attack) please use constant time string comparison for matching signatures.

### Caveat: Ensuring exact JSON payload match

- **Ordering** <br />
    According to the [JSON RFC 4627](https://www.ietf.org/rfc/rfc4627.txt). JSON objects are an unordered collection, see below:
    ```bash
    An object is an unordered collection of zero or more name/value
    pairs, where a name is a string and a value is a string, number,
    boolean, null, object, or array.
    ```
    With this the order shouldn't matter, but if you decide to switch the key ordering for any reason, the resulting hash would be different. You should process as received.

- **Whitespaces** <br />
    To eliminate any ambiguities in the structure of the payload used to generate the signature across languages and stacks. Convoy strips out all whitespace characters from the payload to generate the hash. See the following examples to know what's correct:

    ```json[❌ Wrong]
    {
      "event": {
        "id": "5ac64822-4adc-4fda-ade0-410becf0de4f",
        "event_type": "incident.priority_updated",
        "resource_type": "incident",
        "occurred_at": "2020-10-02T18:45:22.169Z",
        "agent": {
          "id": "PLH1HKV",
          "self": "https://api.pagerduty.com/users/PLH1HKV",
          "summary": "Tenex Engineer",
          "type": "user_reference"
        }
      }
    }
    ```

    ```json[❌ Wrong]
    {\n  \"event\": {\n    \"id\": \"5ac64822-4adc-4fda-ade0-410becf0de4f\",\n    \"event_type\": \"incident.priority_updated\",\n    \"resource_type\": \"incident\",\n    \"occurred_at\": \"2020-10-02T18:45:22.169Z\",\n    \"agent\": {\n      \"id\": \"PLH1HKV\",\n      \"self\": \"https://api.pagerduty.com/users/PLH1HKV\",\n      \"summary\": \"Tenex Engineer\",\n      \"type\": \"user_reference\"\n    }\n  }\n}
    ```

    ```json[✅ Correct]
    {"event":{"id":"5ac64822-4adc-4fda-ade0-410becf0de4f","event_type":"incident.priority_updated","resource_type":"incident","occurred_at":"2020-10-02T18:45:22.169Z","agent":{"id":"PLH1HKV","self":"https://api.pagerduty.com/users/PLH1HKV","summary":"Tenex Engineer","type":"user_reference"}}}
    ```

## References

- [Generating Stripe-like Webhook Signatures](https://getconvoy.io/blog/generating-stripe-like-webhook-signatures/)
