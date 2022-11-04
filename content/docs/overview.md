---
title: An overview of Convoy
description: 'A brief architecture detail of Convoy and  how it interacts with its component.'
id: overview
order: 1
---
# Overview

![Incoming and outgoing flow](/docs-assets/webhook-flow.png)
<figcaption>Incoming and Outgoing webhook flow</figcaption>

## How Convoy works 

![Convoy proxy](/docs-assets/proxy.png)
<figcaption>Convoy proxy</figcaption>

Convoy operates in four steps: ingest webhook, persist webhook, queue, and deliver webhook.

### Ingest

The first operation that is executed when a webhook event is sent to Convoy is ******************ingesting******************. Convoy ingests the webhook event sent by a source and evaluates the validity of the webhook data. The source mask in the request path is used to identify the endpoint to send the webhook.

### Persist into database

The next operation after ingesting the webhook is persisting the webhook into the database. Convoy makes use of a job that picks up new events as they are received and adds them to a queue and a `process-event-creation` job reads from the queue and writes the events to the database.

### Queue

Once the webhook is persisted in the database, it is enqueued for delivery. Depending on the type of project, Convoy fetches subscriptions in two ways. For an incoming project, Convoy fetches subscriptions using the source mask ID and for outgoing projects, Convoy fetches subscriptions using the app ID.

### Deliver

This is the final stage of a webhook lifecycle. Convoy generates headers using the project’s hash and encoding settings, merges them with the event’s original headers and performs authentication on the endpoint if it’s configured. Convoy then delivers the webhook to the destination where it’ll be consumed which is commonly a backend application.

## Incoming webhooks

![Incoming flow](/docs-assets/incoming.png)
<figcaption>Incoming webhook flow</figcaption>

Incoming webhooks are webhooks received from a valid source. Convoy serves as a reliable ingress for webhook events sent from a subscribed source to be delivered to your backend application. For example, webhook events triggered by an action executed from your Paystack dashboard can be sent to your application via an incoming project. Convoy acts as the middleman that enables you to store, filter, and replay webhook events in real-time. Convoy’s incoming projects allow you to receive webhook events from multiple sources, this is particularly ideal for grouping similar services such as payment providers.

## Outgoing webhooks

![Outgoing flow](/docs-assets/outgoing.png)
<figcaption>Outgoing webhook flow</figcaption>

Outgoing webhooks are webhooks sent ( dispatched ) from your infrastructure. Convoy serves as a reliable egress for sending out webhooks to your customers. Convoy’s outgoing projects allow you to dispatch webhook events to your various customer endpoints which are configured as application endpoints. Unlike traditional systems, Convoy also enables you to monitor the delivery status of a webhooks sent, retry event deliveries, apply complex filters and search through events sent at a given period, and get notifications about the health of your customer’s endpoints.

## Feature comparison

| Features | Incoming | Outgoing |
| --- | --- | --- |
| Purpose | For API consumers. In this scenario, Convoy acts as a reliable ingress for webhook events. | For API providers. In this scenario, Convoy acts as a reliable egress for webhook events. |
| Portal | You don’t need a portal because you have access to the entire dashboard. | Each API consumer needs a portal to view their specific endpoint webhook logs. |
| Event Sources | Events are ingested only through HTTP source URLs. | Events are ingested through REST API and PubSub systems like Amazon SQS, Google PubSub, etc. |