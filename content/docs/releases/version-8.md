--- 
title: Release Notes
description: 'Version 8 Release Notes'
id: version-8
order: 2
---

# Convoy v0.8

We released Convoy v0.8 with new features, several bug fixes, UI enhancement and major performance improvements. Please take a look at the complete [changelog](#changelog).

## Release highlights

- **Deprecated apps**: We restructured the flow for receiving and sending webhooks by eliminating the need to create an application for incoming and outgoing projects. This change is to reduce the learning curve and make the integration process simplified. You can now subscribe to your endpoints directly to sources without needing an application in incoming projects and publish events directly to your endpoints in outgoing projects.

- **Portal links**: We've introduced portal links so you can share event logs with your users. A portal link spins up a mini dashboard that displays information on your event deliveries, giving you the flexibility to review and debug events.

- **Subscription filtering**: We've added a [subscription filtering](/docs/manual/subscriptions#subscription-filters) mechanism to allow webhook owners to filter events to be delivered to endpoints using an enriched JSON syntax. The filters can be simple filters or complex filters. We also provide a sandbox to test the filter before applying them to the subscription.

- **New UI**: We rolled out new changes to the dashboard UI. You can now monitor your events separately on the **Events Log** page and the event deliveries on the **Events** page. We also added **Portal Links** to the sidebar and removed **App Portal** from the dashboard. You should tour the [new dashboard](https://dashboard.getconvoy.io) to get a first-hand view of the new UI.

## Changelog

The changelogs for this minor release version and any maintenance versions are listed below.

