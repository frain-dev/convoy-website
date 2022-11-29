---
title: Endpoints
description: 'Describe endpoints in Convoy'
id: endpoints
order: 3
---

Endpoints
======

## Endpoint

An endpoint is a specific destination that can receive webhook events. An endpoint can be configured with `http_timeout`. Endpoints can be managed over the API and the dashboard.

### Endpoint authentication

Endpoint authentication is a scenario where the endpoint owner needs to specify an authentication mechanism separate from signatures to validate the webhook origin. New and existing endpoints can now require an API Key to authenticate against the endpoint. In the future, we hope to support more authentication mechanisms.

![Endpoint authentication](/docs-assets/endpoint-auth.png)

## Portal links

A [portal link](/docs/manual/portal-link) is used to generate a mini-event dashboard to display information on an endpoint's event deliveries. The portal link serves as a medium to quickly generate portals for users to review and debug events from a publisher.

![Dashboard spun from a portal link](/docs-assets/portal-event-deliveries.png)
