---
title: Release Notes
description: 'Version 0.8 Release Notes'
id: release-notes-v8
order: 4
---

# Convoy v0.8
Convoy v0.8 was a significant upgrade from our previous versions. We introduced several new changes but ensured that critical endpoints from v0.7 remained functional and backwards-compatible. Please read on to understand what we shipped in this release.

## Release Highlights
- **Deprecated Applications**: To simplify integrating Convoy, we entirely deprecated the concept of applications. Applications were a concept we introduced to describe backend apps receiving events from a webhook provider. We have since realised this was unnecessary, creating a higher learning curve for our users. In this update, users can immediately create endpoints and send events. Because this was such a significant update, we have made this update a backwards-compatible upgrade with v0.7.

- **Portal Links**: After deprecating applications, the "app portal" automatically became obsolete, so we redesigned it and launched Portal Links. A Portal Link is a new resource entirely that can be created, updated, and deleted via the API and the dashboard. They are a more flexible mechanism for generating customer-facing dashboards scoped to one or more endpoints.

- **New Fan out mechanism**: Applications in the former design were the anchor for fan-out. In this release, we introduced a new mechanism for fan-out, after deprecating apps. We introduced a new endpoint -- `/event/fanout`, and a new field on the endpoint object -- `owner_id`. The latter acts as a grouping concept to group multiple endpoints under one entity, and the endpoint is the only means of fan out possible in Convoy.

- **Subscriptions Filtering**: Subscriptions Filtering is the act of subscribing for events based on the structure of the payload. It is one of our most exciting features. With this, webhook consumers can filter events they receive based on the payload. This includes two types of filters, from simple filters (exact object match) to complex matches (like $or, $in etc.) It would be best if you headed over to our docs to see a [complete reference](/docs/manual/subscriptions#subscription-filters).

- **Simpler Events Logs and Events Dashboard**: Another quick advantage of ripping out applications is it enabled us to provide a more straightforward events dashboard. The new events dashboard immediately shows your event deliveries, while the events log shows you all events sent to Convoy for incoming and outgoing projects.

- **Static IPs**: At times, webhooks consumers require providers to send webhooks from predefined IP addresses. In this release, Convoy ships with a http connect proxy support that allows it route webhooks traffic through a dedicated egress. With this, we can maintain IP address of our cluster across all requests.

## Changelog
The changelogs for this minor release version and any maintenance versions are listed below.

[Convoy version v0.8.0](https://github.com/frain-dev/convoy/releases/tag/v0.8.0)
