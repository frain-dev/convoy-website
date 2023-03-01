---
title: Subscriptions
description: 'Describe subscriptions in Convoy'
id: subscriptions
order: 4
---

# Subscriptions

## Subscriptions

Subscriptions are conduits through which events are routed from a source to a destination (endpoint) in Convoy. In addition to defining how to deliver events, subscriptions can be used to specify what retry strategy to use, how many times you should receive alerts for failing event attempts and if the subscription should trigger a circuit breaker when an endpoint is returning an error multiple times in a row. They represent the core of event routing for both Incoming and Outgoing events.

## How Event Routing Works?

In an Incoming webhooks project, events are routed to a [source](/docs/manual/sources), then we subscribe multiple endpoints to receive from that source. If no subscriptions are present, events are only saved in the [Event Log](/docs/manual/events-and-event-deliveries) for reference purposes. If subscriptions are present, we match the event against it's subscription filters, only endpoints whose subscription filters match will receive events.

In an Outgoing webhooks project, events are routed specifically to an endpoint from the API. If the endpoint has no subscription, we create a catch-all subscription (i.e. a subscription that will receive all events) on-the-fly, create an event delivery and forward the event to your endpoint. When a subscription is present, we match the event first, against the `event_type` then against the subscription filters. If both are present, both have to be true else events will not be sent to the endpoint.

Read on to understand how to create subscription filters.

## Subscription filters

Subscription filtering are used to decide what events an endpoint will receive based off the webhook event payload. The subscription filter is an enriched JSON syntax for both simple and complex filters (such as special logical and arithmetic operators `$or`, `$gte`, `$eq`).

Subscription filters can be configured from the subscriptions page:

![subscription filter](/docs-assets/subscription-filter.png)

The filters are configured in the **Filter Schema** editor and the event payload in the **Event Payload** editor to validate the schema.

![Subscription filter](/docs-assets/subscription-filter-empty-modal.png)

### Simple filters

Simple filters directly match keys to values, and they can be nested. They can also match items in an array.

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

#### Array contains match

```json[Array contains match]
{
	"dish": {
		"ingredients": "rice"
	}
}
```

![subscription filter modal](/docs-assets/subscription-filter-array-contains.png)

### Complex filters

Complex filters contain more logic such as logical operators and special operators. Complex filters are employed to filter events using one or more conditions, e.g, `$or` logical operator filter.

#### $neq filter

This filter matches event which directly does not match the event type in the webhook payload.

```json[$neq filter]
{
    "event": {
        "$neq": "created"
    }
}
```

![$neq subscription filter](/docs-assets/subscription-ne-filter.png)

#### $or and $and filters

This filter is used to match multiple conditions defined in the schema.

```json[$or filter]
{
  "$or": [
    {
      "cities": "london"
    },
    {
      "type": "weekly"
    }
  ]
}
```

```json[$and filter]
{
  "$and": [
    {
      "age": {
        "$gte": 10
      }
    },
    {
      "$or": [
        {
          "type": "weekly"
        },
        {
          "cities": "lagos"
        }
      ]
    }
  ]
}
```

![$and filter](/docs-assets/subscription-or-filter.png)

#### $in filter

This filter is used to match keys where the value can be a range of values. It can be used in place of `$or` if you are comparing on the same field. The opposite of this operator `$nin` can be used to match keys where the value is not in a range of values.

```json[$in filter]
{
	"event": {
		"$in": [ "created", "deleted"]
	}
}

{
	"event": {
		"$nin": [ "created", "deleted"]
	}
}
```

![$in filter](/docs-assets/subscription-in-filter.png)

#### Arithmetic filters

These filters match events based on arithmetic operators. For example, the filter below will match all events where the age is greater than 1. The operators supported are `$gt`, `$gte`, `$lt`, `$lte`

```json[Artihmetic filter]
{
    "age": {
        "$gt": 1
    }
}
```

Here's full list of the supported filters:
| Operator | Supported Type | Description |
| --- | --- | --- |
| none | all | Match all |
| $gte | number | Greater than or equal to |
| $gt | number | Greater than |
| $lt | number | Less than |
| $lte | number | Less than or equal to |
| $eq | number, object, string, bool | Equal |
| $neq | number, object, string, bool | Not Equal |
| $in | array | checks if an array contains a value |
| $nin | array | checks if an array does not contain a value |
| $or | array of conditions | matches an array of conditions |
| $and | array of conditions | matches an array of conditions |
| $exist | array | checks if a key exists |

## Creating an Outgoing Subscription

An outgoing subscription can be created both from the API and the UI. The API allows for a full programmatic experience. Creating it from the UI looks like this:
![create outgoing subscription](/docs-assets/outgoing-subscription.png)

## Creating an Incoming Subscription

Creating an Incoming subscription from the UI looks like this:
![create incoming subscription](/docs-assets/incoming-subscription.png)

Where you do not want to inherit the subscription configuration details, use the toggle below to add more granular configuration to each subscription.

![More configuration](/docs-assets/sub-extra-config.png)
