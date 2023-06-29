---
title: Meta Events
description: 'Describe meta events in Convoy'
id: meta-events
order: 9
---

# Meta Events
Meta events are operational events generated by Convoy for specific activities happening within your Convoy project. This allows you to subscribe and listen for events and perform any action based on these events within your own internal systems, providing a seamless headless experience. Convoy uses webhooks to notify you of these events.


### Types of event

At the moment, these are the events we currently support with plans to add some more later in the future.

| Event  | Description |
| --- | --- |
| endpoint.created | An endpoint was created |
| endpoint.updated | An endpoint was updated |
| endpoint.deleted | An endpoint was deleted |
| eventdelivery.success | An event delivery was successful |
| eventdelivery.failed | An event delivery failed |


This is an example of the payload sent with an `endpoint.created` event

```json
{
  event_type: "endpoint.created",
  data: {
    uid: "01H3FRSZYKNYWGPVV46RN98PM5",
    title: "testes",
    status: "active",
    secrets: [
      {
        uid: "01H3FRSZYKNYWGPVV46T42NYA8",
        value: "Vuk5LM0uujddIsqO5v_eSuz88",
        created_at: "2023-06-21T21:02:19.73106+01:00",
        deleted_at: null,
        expires_at: null,
        updated_at: "2023-06-21T21:02:19.73106+01:00"
      }
    ],
    owner_id: "582b0124-b0fe-45e0-9063-86877f797647",
    created_at: "2023-06-21T21:02:19.73104+01:00",
    deleted_at: null,
    project_id: "01H28MWP1TQV5AC5QR54BSX8HJ",
    rate_limit: 5000,
    target_url: "https://dashboard.getconvoy.io/ingest/GzuS7KiIFPyyFrG5",
    updated_at: "2023-06-21T21:02:19.73104+01:00",
    description: "testing endpoint",
    http_timeout: "10s",
    authentication: null,
    advanced_signatures: false,
    rate_limit_duration: "1m0s"
  }
}
```

Meta events are completely optional and can be turned on under the Project settings page. All you need to do is provide a webhook URL to receive these events, a secret for signing the payload (optional) and the events you would like to subscribe to.

![Meta Events Form](/docs-assets/meta-event-form.png)

You can also view a list of all your Meta events.

![Meta Events Log](/docs-assets/meta-events.png)

## Webhook Signature
We use the secret either provided by you or generated by us to sign the payload using `SHA256` hashing algorithm and `hex` encoding. The value is contained in the `X-Convoy-Signature` header, and you can use that to validate that the event was sent by Convoy.


