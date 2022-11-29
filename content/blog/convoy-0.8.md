---
title: Convoy v0.8
feature_image: update_screenshot.png
post_image: update_screenshot.png
primary_author:
    name: Abdulazeez Abdulazeez
    twitter: kvng_zeez
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
featured: false
description: Convoy v0.8 is a major upgrade from our previous release. We deprecated applications, added subscription filtering and enhanced the UI and overall application performance.
published_at: 2022-11-29T12:04:00.000+00:00
---

Convoy v0.8 is a major upgrade from the [previous release](docs/releases/version-7). We deprecated applications from the webhooks project flow, introduced subscription filtering and introduced several features. 

In this post, we share the new updates in Convoy v0.8.

## Subscription Filtering

Subscription filtering is the scenario where the webhook owner decides to filter events to be delivered to configured endpoints. The subscription filter is an enriched JSON syntax for both simple and complex filters ( such as special logical and arithmetic operators `$or`, `$gte`, `$eq`).

Subscription filters can be configured from the subscriptions page in your project dashboard.

![subscription filter](/docs-assets/subscription-filter.png)

For example, you can create a filter to deliver events of the type `created` to your endpoints.

```json[Example filter]
{
	"event_type": "created"
}
```

![Subscription filter](/blog-assets/subscription-filter.png)

In the filter sandbox, we added a **Test filter** button to enable you to test your filters before applying them to your subscription.


In a project with an active subscription filter, only events payload matching the filter is delivered. For example, six events have been sent with varying event types but only the `created` event is delivered:

![Events delivery](/blog-assets/filtered-events.png)

### Deprecated apps

In a bid to simplify the process of creating a webhook project in Convoy, we removed applications from the webhook project flow. We discovered that applications provide extra complexity and increase the learning curve involved in getting started. With applications deprecated, you can:

- subscribe endpoints to sources directly without needing an application.
- publish events to endpoints in an outgoing project without needing an application.

#### New configuration flow

- Incoming webhook project
For an incoming webhook project, an endpoint, source and subscription alone is needed to get started.
![Incoming](/blog-assets/new-incoming.png)

- Outgoing webhook project
For an incoming webhook project, an endpoint and a subscription alone is needed to get started.
![Outgoing](/blog-assets/new-outgoing.png)

### Portal links

We also introduced portal links that spin up a mini dashboard that allows you to view and debug events associated with an endpoint and deprecated app portal.

A portal link is used to generate a mini-event dashboard to display information on an endpoint's event deliveries. The portal link serves as a medium to quickly generate portals for users to review and debug events from a publisher.

![Portal links](/docs-assets/portal-link.png)

Event deliveries associated with the endpoint for which a portal link is created can be filtered, retried and expanded on to view more details.

![Dashboard spun from a portal link](/docs-assets/portal-event-deliveries.png)


### Event log

We introduced an events log page to serve as a reference center for events sent or received separately.

![Event log](/docs-assets/event-log.png)

Events can be filtered either by date, time or endpoint in the events log page. The events page in the dashboard will only display event deliveries i.e, events that were delivered to endpoints successfully.

![Event delivery](/docs-assets/event-delivery.png)

These are the updates contained in Convoy v0.8.


### Get started with Convoy

You can get started easily with Convoy, by self-hosting an instance or using the [cloud](https://dashboard.getconvoy.io/signup). For self-hosting, please follow the instructions [here](https://github.com/frain-dev/convoy#installation-getting-started) to proceed.

## What's next?

