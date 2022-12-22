---
title: Convoy v0.8
feature_image: convoy-0.8.png
post_image: convoy-0.8.png
primary_author: 
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Product Update
tags: 
    - Convoy
    - Product Update
featured: false
description: Convoy v0.8 is our latest release including so many exciting features - Subscriptions Filtering, Deprecated Applications, Portal Links, Simpler Events Dashboard and Events Log, and so much more. In this blog post, we share these updates and what you can expect from Convoy v0.9
published_at: 2022-12-23T16:00:00.000+00:00
---

Horray! It's the end of the year and Convoy v0.8 has landed with so many exciting features - Subscriptions Filtering, Deprecated Applications, Portal Links, Simpler Events Dashboard and Events Log, and so much more. In this blog post, we share these updates and what you can expect from Convoy v0.9.

### Deprecated Applications
To simplify integrating Convoy, we entirely deprecated the concept of applications. Applications were a concept we introduced to describe backend apps receiving events from a webhook provider. We have since realised this was unnecessary, creating a higher learning curve for our users. In this update, users can immediately create endpoints and send events. Because this was such a significant update, we have made this update a backwards-compatible upgrade preventing downtime for our current users. 

### Subscriptions Filtering
Subscriptions Filtering is the act of subscribing for events based on the structure of the payload. It is one of our most exciting features. With this, webhook consumers can filter events they receive based on the payload. This includes two types of filters, from simple filters (exact object match) to complex matches (like $or, $in etc.) It would be best if you headed over to our docs to see a [complete reference](/docs/manual/subscriptions#subscription-filters). See sample in action:
![subscription filtering in action](/blog-assets/subscriptions-filtering.gif)

### Portal Links
After deprecating applications, the "app portal" automatically became obsolete, so we redesigned it and launched Portal Links. A Portal Link is a new resource entirely that can be created, updated, and deleted via the API and the dashboard. They are a more flexible mechanism for generating customer-facing dashboards scoped to one or more endpoints. See an example below:
![creating a portal link](/blog-assets/create-portal-links.png)

### Simpler Events Dashboard & Events Logs
Another quick advantage of ripping out applications is it enabled us to provide a more straightforward events dashboard. The new events dashboard immediately shows your event deliveries, while the events log shows you all events sent to Convoy for incoming and outgoing projects. See the new dashboard below:
![events  log](/blog-assets/events-logs.gif)

### New Fan out mechanism
Applications in the former design were the anchor for fan-out. In this release, we introduced a new mechanism for fan-out, after deprecating apps. We introduced a new endpoint -- `/event/fanout`, and a new field on the endpoint object -- `owner_id`. The latter acts as a grouping concept to group multiple endpoints under one entity, and the endpoint is the only means of fan out possible in Convoy.


### What's Next?
We've commenced work on Convoy v0.9. This update includes several interesting features like ingesting events from pub/sub systems like Kafka, Amazon SQS, Google PubSub, Meta Events and several other improvements. Please watch out for our [GitHub Discussion Posts](https://github.com/frain-dev/convoy/discussions) for each of these features, and let us know what you think.
