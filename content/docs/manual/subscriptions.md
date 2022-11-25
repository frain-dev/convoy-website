---
title: Subscriptions
description: 'Describe subscriptions in Convoy'
id: subscriptions
order: 4
---

Subscriptions
======


## Subscriptions

Subscriptions are the conduit through which events are routed from a source to a destination on Convoy. They represent the core of event routing for both Incoming and Outgoing events. There are primarily two types of subscriptions depending on the project type: **Incoming** and **Outgoing**.

 An Incoming subscription is used to subscribe endpoints to event sources while an outgoing subscription is used to subscribe an endpoint to event types.

## Subscription filters

Subscription filtering is the scenario where the webhook owner decides to filter events to be delivered to configured endpoints. The subscription filter is an enriched JSON syntax for both simple and complex filters ( such as special logical and arithmetic operators `$or`, `$gte`, `$eq`). 


Subscription filters can be configured from the subscriptions page:

![subscription filter](/docs-assets/subscription-filter.png)

The filters are configured in the **Filter Schema** editor and the event payload in the **Event Payload** editor to validate the schema.

![Subscription filter](/docs-assets/subscription-filter-empty-modal.png)
### Simple filters

Simple filters are filters with direct object match or nested match. Example:

#### Direct object match

This filter is used to validate simple JSON webhook payloads.

```json[Simple object match filter]
{
	"event_type": "created"
}
```

![subscription filter modal](/docs-assets/subscription-filter-modal.png)

#### Nested object match

This filter is used to validate nested webhook payloads.

```json[Nested object match filter]
{
	"event": {
		"type": "created"
	}
}
```

![subscription filter modal](/docs-assets/subscription-filter-modal-nested.png)

### Complex filters

Complex filters contain more logic such as logical operators and special operators. Complex filters are employed to filter events using one or more conditions, e.g, `$or` logical operator filter.

#### $ne filter

This filter matches event which directly does not match the event type in the webhook payload.

```json[$ne filter]
{
  "$ne": { "event": "created" }
}
```

![$ne subscription filter](/docs-assets/ne-subscription-filter.png)

#### $or filter

This filter is used to match either events defined in the schema. 

```json[$or filter]
{
  "$or": [
    {
      "event": "success"
    },
    {
      "event": "failed"
    }
  ]
}
```

![$and filter](/docs-assets/or-filter.png)

#### $and filter

This filter is used to match events that meet the conditions defined in the schema.

```json[$and filter]
{
	"$and": [
		{
			"event": "created"
		},
		{
			"data": "task created."
		}
	]
}
```

For example, a webhook event payload must contain the `event` and `data` variable to pass the filter above.
#### Arithmetic filters

This filter matches events based on arithmetic operators. For example, the filter below will match all events where the age is greater than 1.

```json[Artihmetic filter]
{
  "age": { "$gt": 1 }
}
```

## Creating an Outgoing Subscription

An outgoing subscription can be created both from the API and the UI. The API allows for a full programmatic experience. Creating it from the UI looks like this:
![create outgoing subscription](/docs-assets/outgoing-subscription.png)

## Creating an Incoming Subscription
Creating an Incoming subscription from the UI looks like this:
![create incoming subscription](/docs-assets/incoming-subscription.png)

Where you do not want to inherit the subscription configuration details, use the toggle below to add more granular configuration to each subscription.

![More configuration](/docs-assets/sub-extra-config.png)