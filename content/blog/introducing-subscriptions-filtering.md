---
title: Subcriptions Filtering in Convoy
feature_image: subscription-filtering.png
post_image: subscription-filtering.png
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
featured: true
description: Many times webhook consumers depend on only a fraction of the webhook events it receives. Learn how to route webhook events to endpoints based on payload structure in Convoy.
published_at: 2022-12-01T13:00:00.000+00:00
---

# Introduction

Subscriptions are conduits through which events are routed from a source to a destination (endpoint) in Convoy. In addition to defining how to deliver events, subscriptions can be used to specify what retry strategy to use, how many times you should receive alerts for failing event attempts and if the subscription should trigger a circuit breaker when an endpoint is returning an error multiple times in a row. They represent the core of event routing for both Incoming and Outgoing events.

Depending on your workloads you would want to intelligently route events to different endpoints based on very specific event payload values or a range of values. Subscription Filters allow you deliver events to endpoints conditionally based on the event’s payload. This can come in handy when both sending and receiving webhooks.

Convoy previously only supported matching events to endpoints using the event types configured on subscriptions, using that alone does not provide enough flexibility that filters do. Additionally filters can be used in addition to event types to offer granularity in the decision of where to send an event to.

The two most common use cases are:

- Allowing only events with relevant data to be sent to an endpoint.
- Sending events to different endpoints based on their contents.

# Usage

Convoy’s subscription filters utilize a subset of [MongoDB’s Extended JSON v2](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/) which supports matching on any value (string, number, boolean, `null`), nested objects, arrays and some special operators.

## How it works

If we are sending events with the payload below, we can  create a subscription with a filter which will only send an event to the endpoint when the `amount` is greater than or equal to `10000`.

```bash
{
    "provider": "gomoney"
    "amount": 10000
}
```

```bash
{
    "amount": {
        "$gte": 10000
    }
}
```

We can also filter using the `provider` field, matching only when it’s set of a range of values

```bash
{
    "provider": {
        "$in": [
            "gomoney",
            "piggyvest"
        ]
    }
}
```

## Creating the Subscription filter

Subscription filters are currently available on [Convoy Cloud](https://dashboard.getconvoy.io) and will ship in our upcoming v0.8 release. By default all subscriptions have a “match all” filter `{}`. This is essentially like `*`  for the event type field.

![Create Subscription form with filter card](/blog-assets/create-sub-filter.png)

Create Subscription form with filter card

After you have added the filter (right side of the image below), you need to add a test payload (left side of the image below) which will be used to validate the payload structure which would be required for the filter to match.

![Filter with sample event payload](/blog-assets/filter-with-sample-payload.png)

Filter with sample event payload

## Testing it out

Now that the filter is set and the subscription is saved you can send test events to validate their behaviour. Create three subscriptions with filters

```bash
{
	"amount": {
		"$gt": 100
	}
}
```

```bash
{
	"amount": {
		"$lt": 100
	}
}
```

```bash
{
	"amount": 100
}
```

Now send some events with the following request bodies

```bash
{
    merchant: "xyz stores",
    amount: 100
}
```

```bash
{
    merchant: "xyz stores",
    amount: 1000
}
```

```bash
{
    merchant: "xyz stores",
    amount: 10
}
```

```bash
{
    merchant: "xyz stores"
}
```

After sending all 4 events, they will all show in the events, but only 3 of them will match the created filters and only 3 event deliveries will be created.

 

![Events log showing all four sent events](/blog-assets/event-log.png)

Events log showing all four sent events

![Event deliveries table showing the three matched events](/blog-assets/event-deliveries.png)

Event deliveries table showing the three matched events

# Conclusion

Subscription filters are an intuitive way to add granularity when you want to specify the exact endpoints that webhook events should be sent to or when you want to fan out events to multiple endpoints. Convoy gives you the ability to add filters to subscriptions out of the box, without having to add them to your application logic.

Sounds good for your platform? Why not try it out for yourself for free on or [cloud](https://dashboard.getconvoy.io) and give us feedback on our [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) community!
