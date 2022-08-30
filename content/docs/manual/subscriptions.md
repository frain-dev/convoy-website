---
title: Subscriptions
description: 'Describe subscriptions in Convoy'
id: subscriptions
order: 4
---

Subscriptions
======
Subscriptions are the conduit through which events are routed from a source to a destination on Convoy. They represent the core of event routing for both Incoming and Outgoing events. There are primarily two types of subscriptions depending on the project type: Incoming and Outgoing. An Incoming subscription is used to subscribe endpoints to event sources while an outgoing subscription is used to subscribe an endpoint to event types.

## Creating an Outgoing Subscription
An outgoing subscription can be created both from the API and the UI. The API allows for a full programmatic experience. Creating it from the UI looks like this:
![create outgoing subscription](/docs-assets/outgoing-subscription.png)
## Creating an Incoming Subscription
Creating an Incoming subscription from the UI looks like this:
![create incoming subscription](/docs-assets/incoming-subscription.png)

Where you do not want to inherit the subscription configuration details, use the toggle below to add more granular configuration to each subscription.
