---
title: Endpoints
description: 'Describe endpoints in Convoy'
id: endpoints
order: 3
---


# Endpoints

An endpoint is a valid [HTTP URL](https://datatracker.ietf.org/doc/html/rfc7230) that can receive webhook events. It can be configured with a number of attributes which include an `http timeout` which denotes how long Convoy should wait for a response before timing out, an `alert configuration` setting which gives you the option to get notified when an endpoint's status changes, a `rate limit` setting which allows you to match your consumers own rate limit, and an `authentication` setting which allows your consumer set an additional level of security on the endpoint.

### Endpoint State
An endpoint can have any of the states below:
1. `Active`: This state means the endpoint is responding normally, and Convoy will continue to send events to it.
2. `Inactive`: This means the endpoint has consecutively failed to process events. In this state, all new events will be set to the `Discarded` state and **will not be sent** to the endpoint. To re-activate the endpoint -- retry any failed or discarded event delivery, if it's successful, the endpoint will be set to `active`. Then you can batch retry all failed events that weren't processed while the endpoint was `inactive`.
3. `Paused`: In this state, the endpoint has been manually disabled to stop receiving events. All new events will be set to the `Discarded` state and **will not be sent** to the endpoint. To re-activate the endpoint, un-pause the endpoint, and it will be set to `active`.
4. `Pending`: This state indicates that the endpoint was previously `Inactive` and a failed or discarded event delivery is being resent to the endpoint. If successful, the endpoint will be set to `Active`.

### Zero Downtime Key Rotation
Because webhooks rely on a shared secret that needs to be rotated periodically to be kept safe, Convoy ships with a mechanism for zero downtime key rotation which is crucial for webhooks as it ensures continuous and secure operations. It facilitates regular cryptographic key rotations, mitigating risks associated with key compromises, while ensuring there's no service interruption, which is vital for real-time processing of webhooks events. It also aids in meeting regulatory compliance, maintaining clear audit trails, and can be automated to reduce operational burdens of key rotations. Additionally, it fosters customer trust by showcasing a commitment to security and service availability,

This can be triggered from both the API -- [this endpoint](https://convoy.readme.io/reference/put_api-v1-projects-projectid-endpoints-endpointid-expire-secret) and the dashboard, see below:
![Expire Secret](/docs-assets/expire-secret.png)

Once the secret is expired, conovy will send more than one message digest pending the full expiration of the old secret. You can learn more about [signatures](/docs/manual/signatures)

### Endpoint authentication

Endpoint authentication is a scenario where the endpoint owner needs to specify an authentication mechanism separate from signatures to validate the webhook origin. New and existing endpoints can now require an API Key to authenticate against the endpoint. In the future, we hope to support more authentication mechanisms.

![Endpoint authentication](/docs-assets/endpoint-auth.png)

### Endpoint Owner ID
Endpoint Owner ID is a unique ID for identifying a group of endpoints. It is useful for fanning out an event to multiple endpoints and creating portal link for multiple endpoints. It is typically set by you, the user and should have meaningful significance within your internal systems, serving the purpose of logically grouping endpoints.

![Endpoint Owner ID](/docs-assets/endpoint-owner-id.png)

### Portal Links

A [Portal Link](/docs/manual/portal-link) is used to generate a consumer-facing dashboard to display information on an endpoint's event deliveries. The portal link serves as a medium to quickly generate portals for users to review and debug events from a publisher. You can generate one time links via the dashboard or long-use links to be embedded in your dashboards via the API. To learn more, click [here](/docs/manual/portal-link)

![Dashboard spun from a portal link](/docs-assets/portal-event-deliveries.png)
