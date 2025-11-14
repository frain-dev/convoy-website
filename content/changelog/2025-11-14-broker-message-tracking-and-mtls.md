---
date: 2025-11-14
title: Broker Message Tracking, mTLS Support & Form-Encoded Content Types
authors:
  - name: Smart Mekiliuwa
    image: /employees/smart.jpg
  - name: Raymond Tukpe
    image: /employees/raymond.jpg
---

![Broker Message Tracking, mTLS & Form-Encoded](/feature-images/broker-message-tracking-mtls-form-encoded.png)

We shipped three features this week that make Convoy more reliable for production workloads: broker message ID tracking, mTLS client certificates, and better content type handling.

**Broker Message ID Tracking**

When events flow through message brokers like Kafka, Google Pub/Sub, SQS, or AMQP, tracking them back to their source message used to be tricky. You'd see an event in Convoy but couldn't easily trace it to the original broker message.

We now capture and store the broker message ID for every event ingested from these brokers. This means you can filter events and deliveries by their original broker message ID, making debugging and tracing much simpler.

The broker message ID is automatically extracted from each message and stored in the event metadata. You can filter by it using the `brokerMessageId` query parameter in the API, or search for it in the dashboard.

**mTLS Client Certificate Support**

Some endpoints require mutual TLS (mTLS) authentication. Before this release, you'd need to handle mTLS outside Convoy or use workarounds.

You can now configure client certificates directly on your endpoints. When Convoy delivers webhooks to that endpoint, it presents the client certificate for authentication. This is especially useful for enterprise integrations that require certificate-based authentication.

Configure your client certificate and key in the endpoint settings. Convoy handles the rest during delivery. This feature requires an enterprise license.

**Form-Encoded Content Type**

We added support for `application/x-www-form-urlencoded` content types. If your endpoint expects form-encoded data instead of JSON, you can now set that in the endpoint configuration.

**Other Improvements**

- **TLS for Redis**: Redis connections now support TLS encryption. Set `CONVOY_REDIS_TLS_ENABLED=true` to enable it.
- **Circuit breaker notifications**: Fixed an issue where email notifications weren't being sent when circuit breakers activated.
- **Configurable root path**: You can now configure the root path for Convoy deployments using `CONVOY_ROOT_PATH`.

All features are available now. See the [sources documentation](/docs/product-manual/sources) for details on broker message tracking, and the [endpoints documentation](/docs/product-manual/endpoints) for mTLS configuration.

