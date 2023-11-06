---
title: Portal Links
description: 'Describe what portal links are and how to create one.'
id: portal-links
order: 6
---

# Portal links

A Portal Link is used to generate a customer-facing dashboard to display information on an endpoint's event deliveries. The portal link serves as a medium to quickly generate portals for users to review and debug events from a publisher. You can generate one time links via the dashboard or long-use links to be embedded in your dashboards via the API.

A portal link can be created for one or more endpoints.

![Create portal link](/docs-assets/create-portal-link.png)

Once a portal link is created, the link can be copied from the same page or the portal links page.

![New portal link](/docs-assets/new-portal-link.png)

![Portal links](/docs-assets/portal-link.png)

The event deliveries associated with the endpoint are listed. These events can be filtered, retried and expanded upon to view more details.

![Dashboard spun from a portal link](/docs-assets/portal-event-deliveries.png)

## Caveats

1. Portal Links do not expire, to disable you have to explicitly call the API or disable it through the dashboard.
2. Portal Links can be created for one or more endpoints.
