---
title: Subscriptions
description: 'Describe subscriptions in Convoy'
id: subscriptions
order: 4
---

# Subscriptions

Subscriptions are conduits through which events are routed 
from a source to a destination (endpoint) in Convoy.
In addition to defining how to deliver events, subscriptions 
can be used to specify what retry strategy to use and
how many times you should receive alerts for failing event attempts. 
They can also be used to trigger a circuit breaker when an endpoint
is returning an error multiple times in a row. 
They represent the core of event routing for both Incoming and Outgoing events.

## How Event Routing Works?

In an Incoming webhooks project, events are routed to a [source](/docs/manual/sources);
then we subscribe multiple endpoints to receive from that source.
If no subscriptions are present,
events are only saved in the [Event Log](/docs/manual/events-and-event-deliveries) for reference purposes.
If subscriptions are present, we match the event against its subscription filters,
only endpoints whose subscription filters match will receive events.

In an Outgoing webhooks project, events are routed specifically to an endpoint from the API.
If the endpoint has no subscription,
we create a subscription that will receive all events on-the-fly,
create an event delivery and forward the event to your endpoint.
When a subscription is present, we match the event first,
against the `event_type` then against the subscription filters.
If both are present, both have to be true, else events will not be sent to the endpoint.

Read on to understand how to create subscription filters.

## Creating an Outgoing Subscription

An outgoing subscription can be created both from the API and the UI. 
The API allows for a full programmatic experience. Creating it from the UI looks like this:
![create outgoing subscription](/docs-assets/subscription-create-outgoing-subscription.png)

## Creating an Incoming Subscription

Creating an Incoming subscription from the UI looks like this:
![create incoming subscription](/docs-assets/subscription-create-incoming-subscription.png)

Where you do not want to inherit the subscription configuration details, use the toggle below to add more granular configuration to each subscription.

![More configuration](/docs-assets/sub-extra-config.png)

## Functions

Wehbook functions are used to mutate webhook payloads (event data)
before they are dispatched based on a passed user-defined Javascript function.

Convoy uses [goja](https://github.com/dop251/goja) to provide a JavaScript
runtime environment in Go, providing full ECMAScript 5.1 support (including regex and strict mode).
Most of the ECMAScript 6 spec is implemented, but this is a work in progress.
To enhance the runtime, console support from [goja_nodejs](https://github.com/dop251/goja_nodejs) was also added.

### Importing Modules
`require` support also exists but is currently disabled.
Imports via `require` should in the future work similarly to NodeJS.

### Caveats
Certain constraints exist while using functions:
- Multiple functions can be written but only the transform function is called for the mutation to occur. 
- Only the first argument is used in the transform function and that is the payload data.
- The transform method must return a value.

You can configure the function when creating or updating a subscription.

![Create Webhook Function](/docs-assets/subscription-create-function.png)

## Filters

Subscription filtering is used to decide what events an endpoint will receive based on the webhook event payload. 
The subscription filter is an enriched JSON syntax for both simple and complex filters
(such as special logical and arithmetic operators `$or`, `$gte`, `$eq`).

Subscription filters can be configured from the subscriptions' page:

![subscription filter](/docs-assets/subscription-filter.png)

The filters are configured in the **Filter Schema** editor and the event payload in the **Event Payload** editor to validate the schema.

![Subscription filter](/docs-assets/subscription-filter-empty-modal.png)

### Simple filters

Simple filters directly match keys to values, and they can be nested. They can also match items in an array.

#### Direct object match

This filter is used to validate simple JSON webhook payloads.

```json  {% file="Simple object match filter" %}
{
	"event_type": "created"
}
```

![subscription filter modal](/docs-assets/subscription-filter-modal.png)

#### Nested object match

This filter is used to validate nested webhook payloads.

```json {% file="Nested object match filter" %}
{
	"event": {
		"type": "created"
	}
}
```

![subscription filter modal](/docs-assets/subscription-filter-modal-nested.png)

#### Array contains match

```json {% file="Array contains match" %}
{
	"dish": {
		"ingredients": "rice"
	}
}
```

![subscription filter modal](/docs-assets/subscription-filter-array-contains.png)

### Complex filters

Complex filters contain more logic such as logical operators and special operators. 
Complex filters are employed to filter events using one or more conditions, e.g., `$or` logical operator filter.

#### $neq filter

This filter matches event which directly does not match the event type in the webhook payload.

```json {% file="$neq filter" %}
{
    "event": {
        "$neq": "created"
    }
}
```

![$neq subscription filter](/docs-assets/subscription-ne-filter.png)

#### $or and $and filters

This filter is used to match multiple conditions defined in the schema.

```json {% file="$or filter" %}
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

```json {% file="$and filter" %}
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

#### Array Contains filters

This filter is used to match keys where the value can be a range of values. It can be used in place of `$or` if you are comparing on the same field. The opposite of this operator `$nin` can be used to match keys where the value is not in a range of values.

```json {% file="$in filter" %}
{
  "operation": {
    "$in": [
      "created",
      "deleted"
    ]
  }
}
```

```json {% file="$nin filter" %}
{
  "operation":{
    "$nin":[
      "updated",
      "truncated"
    ]
  }
}
```

![$in filter](/docs-assets/subscription-in-filter.png)

#### Arithmetic filters

These filters match events based on arithmetic operators. For example, the filter below will match all events where the age is greater than 1. The operators supported are `$gt`, `$gte`, `$lt`, `$lte`

```json {% file="Arithmetic filter" %}
{
    "age": {
        "$gt": 1
    }
}
```

#### Array positional filters

These filters match events with payloads that are array either in the root or nested.

```json {% file="Array positional filters" %}
{
    "$.venues.$.lagos": "lekki"
}
```

![Array positional $. filter](/docs-assets/subscription-array-positional-filter.png)

**NB:** Convoy only supports filters with arrays nested up to 3 levels i.e. `$.a.$.b.$.c.$.e` will throw an error

Here's a full list of the supported filters:

| Operator |        Supported Type        |                 Description                 |
|:--------:|:----------------------------:|:-------------------------------------------:|
|   none   |             all              |                  Match all                  |
|    $.    |            array             |            Match an array value             |
|   $gte   |            number            |          Greater than or equal to           |
|   $gt    |            number            |                Greater than                 |
|   $lt    |            number            |                  Less than                  |
|   $lte   |            number            |            Less than or equal to            |
|   $eq    | number, object, string, bool |                    Equal                    |
|   $neq   | number, object, string, bool |                  Not Equal                  |
|   $in    |            array             |     checks if an array contains a value     |
|   $nin   |            array             | checks if an array does not contain a value |
|   $or    |     array of conditions      |       matches an array of conditions        |
|   $and   |     array of conditions      |       matches an array of conditions        |
|  $exist  |            array             |           checks if a key exists            |







