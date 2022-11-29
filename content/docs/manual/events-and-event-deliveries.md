---
title: Events and Event Deliveries
description: 'Describe event and event deliveries in Convoy'
id: event-and-event-deliveries
order: 5
---

# Events

Events are all the webhook events pushed to Convoy via any of the available sources. They do not have a status and do not contain delivery attempts. It is only a log of events published to Convoy. The events log page can be accessed from the sidebar.
![convoy event log](/docs-assets/event-log.png)

## Event delivery

Event delivery is a resource that tracks successive attempts to deliver the event payload to each application endpoint. Multiple event deliveries can be created for a single event, this is influenced by the number of subscriptions that are matched to it. Event deliveries can be viewed on the **Events** page:

![Event delivery](/docs-assets/event-delivery.png)

## Debugging webhook events

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