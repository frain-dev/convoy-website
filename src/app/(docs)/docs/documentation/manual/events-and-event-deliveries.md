---
title: Events and Event Deliveries
description: 'Describe event and event deliveries in Convoy'
id: event-and-event-deliveries
order: 5
---


# Events Log
The Events log dashboard represent all webhook events pushed to Convoy. They do not have a status and do not contain delivery attempts. It is only a log of events published to Convoy. The events log page can be accessed from the sidebar.
![convoy event log](/docs-assets/event-log.png)

## Event delivery
An event delivery is the combination of an endpoint and an event. For both incoming and outgoing webhooks project, an event can generate multiple event deliveries depending on the subscriptions. An event delivery can have any of the states below:
1. `Scheduled`: In this state, the event delivery has been enqueued to the message broker, but a worker node is yet to pick it up for delivery.
2. `Processing`: In this state, the event delivery has been retrieved from the message broker by a worker node, and the event is on it's way out.
3. `Success`: In this state, the event delivery delivered successfully. Here, the `Retry` button becomes `Force Retry`. This is used to retry a successful event in case of a false positive. 
4. `Retry`:  In this state, the event delivery previously failed and the automatic retries have kicked in. Here, Convoy will continue to retry till the max attempts is reached.
5. `Failed`: In this state, the event delivery has reached the maximum amount of automatic retries and failed to deliver the event or the endpoint failed to acknowledge delivery. Here, the `Retry` button becomes to active to trigger manual retries.
6. `Discarded`: In this state, the endpoint has been set to `inactive`, so Convoy did not try to process events to the endpoint at all. See [here](/docs/manual/endpoints#endpoint-state) on re-activating the endpoint.

Event deliveries can be viewed on the **Events Deliveries** page below:

![Event delivery](/docs-assets/event-delivery.png)

## Debugging Event Deliveries

For the most part, building a webhooks dashboard requires building the tools for finding and solving problems easily, this requires the ability to quickly find the affected payload, application, endpoint and most importantly affected customer. 

There are 2 ways to debug events in Convoy:

### Event filtering

You can filter events and event deliveries by date, time, status and endpoints respectively. 
![convoy event filter](/docs-assets/event-filter.png)

### Event search

When properly configured with a search backend, Convoy indexes the entire webhook payload this enables you to search the entire payload for any value in any field. This enables you to drill down the issue faster than ever and find the impacted customer and offending endpoints.
![convoy event search](/docs-assets/event-search.png)


### Convoy CLI

You can now debug your webhooks using the [stream command](/docs/cli#stream). We have made available, a blog post on [how to debug your webhooks with the Convoy CLI](/blog/debug-your-webhooks-with-convoy-cli/).
