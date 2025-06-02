---
title: Convoy v24.4.1 Release Notes
feature_image: convoy-v24.4.1.png
post_image: convoy-v24.4.1.png
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
featured: false
description: Convoy v24.4.1 release has landed 🎉. We’ve been working on these improvements and we are super excited to share this release. These include a rate limiter backed by PostgreSQL, RabbitMQ message broker support, payload mutation using JavaScript functions for message broker sources, and lots of bug fixes.  
published_at: 2024-04-30T16:00:00.000+00:00
---

![header](/blog-assets/convoy-v24.4.1-header.png)


We’re proud to announce the release of `Convoy v2024.4.1`, which includes many features, enhancements, and bug fixes. These include a rate limiter backed by PostgreSQL, RabbitMQ message broker support, and payload mutation using JavaScript functions for message broker sources.

## Message Broker Source Functions

Events ingested via message brokers like Kafka, Amazon SQS, and Google PubSub can now be mutated using the same Javascript engine that powers subscription filters for incoming projects. Previously, events ingested via these sources needed to conform to a particular format or would be dropped and not acknowledged. This can be frustrating when integrating Convoy into your stack because you need to set up a new queue or topic from which Convoy will read events. With source functions, you can connect your current queues and topics to Convoy and specify a function in Convoy that will wrap your payload into something Convoy can ingest.

![source function update](/blog-assets/message_broker_update.png)


## RabbitMQ Message Broker Support

Thanks to GitHub user [nitzangoldfeder](https://github.com/nitzangoldfeder), who contributed to [this PR](https://github.com/frain-dev/convoy/pull/1911), Convoy can now ingest events from RabbitMQ. This integration is a welcome addition to our message broker catalog and will work with both self-hosted and cloud instances. It works similarly to the other message broker integrations.

![source function update](/blog-assets/rabbitmq_update.png)

## PostgreSQL Backed Rate Limiter

We re-implemented our endpoint rate limiter (which limits the rate of requests sent to an endpoint) in PostgreSQL. It was previously implemented in Redis. We made this change because we are gradually phasing out the use of Redis from Convoy’s core.

![source function update](/blog-assets/rate_limiter_update.png)

## API Changes

- Changed endpoint `title` to `name`
- Changes endpoint `target_url` to `url`

## Other changes

- Add project config for enforcing HTTPS endpoints.
- Add documentation to request models
- Encode Postgres connection string credentials
- Enqueue Stuck Event Deliveries
- Fixed a bug where telemetry wasn't being sent to PostHog.
- Fixed a bug where the signature modal in the project settings doesn't dismiss after saving.
- Fixed a bug where project settings were not displayed correctly on the dashboard.
- Fixed a bug where a failed subscription filter will stop all subscribers from a broadcast event from receiving the event.
- Fixed open telemetry TLS configuration.
- Fixed a bug where a created or updated subscription didn't show the nested values.
- Fixed endpoints count query for portal links.
- Added data plane capabilities back to the worker, which was unintentionally removed.

