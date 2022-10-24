---
title: An overview of Convoy
description: 'A brief architecture detail of Convoy and  how it interacts with its component.'
id: overview
order: 1
---

# Overview
This page provides an overview of Convoy and its components, as well as the flow for Incoming and Outgoing webhook operations.

![Incoming and Outgoing flow](/docs-assets/overview.png)
<figcaption>Convoy architecture</figcaption>

### Incoming webhook project flow
![Incoming flow](/docs-assets/incoming.png)
<figcaption>Illustration of an incoming webhook flow</figcaption>

### Outgoing webhook project flow
![Outgoing flow](/docs-assets/outgoing.png)
<figcaption>Illustration of an outgoing webhook flow</figcaption>

## Webhook flow
Webhooks sent to a destination and received from a source are referred to as **events** and their delivery is facilitated by a **subscription**. These webhooks are sent through a Convoy application using the API key and the events are dispatched to **endpoints** matching the event type supplied.

Convoy provides you the option of creating projects which can either be an incoming webhook project or an outgoing webhook project. A project possesses its API keys, settings and components; applications, subscriptions, and sources. An incoming project flow differs from an outgoing project flow.

### Events
Events are webhook data received from a subscribed source or transmitted to a subscribed receiver. There is no specific payload type for events in Convoy; this means any valid JSON event payload can be sent or received.

Event types can be optionally created when sending an event payload to Convoy.

### Subscriptions
Subscriptions are responsible for conveying webhook events sent to a Convoy project as well as received from a source. By default, all subscriptions are mapped to an application and an application endpoint to ensure event deliveries.

In incoming projects, subscriptions are also tied to a webhook source to retrieve and save events transmitted from the source to Convoy, and in outgoing projects, subscriptions are only mapped to applications to store events sent from Convoy via the API or [SDKs](/docs/sdk).

Subscriptions are also defined to listen to configured event types. For example, a subscription configured to listen to event type `payment.success` will only retrieve this event from a source ( in the case of an incoming project ). This is a useful feature as different events can be mapped to different subscriptions and as a result, make the debugging and filtering of events smoother.

### Apps

An application represents a user's application trying to receive webhooks. Once you create an application on Convoy, you receive an `app_id` that you should save and supply in subsequent API calls to execute requests.

### Endpoints

An endpoint represents a target URL to receive events sent from your Convoy application via a delivery attempt. A delivery attempt represents a single attempt to dispatch an event to an endpoint. An endpoint is mapped to an application in a many-to-one fashion.

