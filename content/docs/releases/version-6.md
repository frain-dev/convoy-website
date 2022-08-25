--- 
title: Release Notes
description: 'Version 6 Release Notes'
id: release-notes-v6
order: 2
---

# Convoy v0.6

## Release Highlights
- **Bi-directional webhooks flow:** Up till 0.5, Convoy has been by API providers to push webhook events to their customer’s endpoints. Starting in this release it has become possible to receive events from webhook
- **Organisations & Team management:** You can now management multiple organisations, invite team members to collaborate on a webhooks project. However, all team members are super users in the open core.
- **Replace `taskq` with `asynq` for our worker system:** We migrated our background job system from `taskq` to `asynq`. Asynq is much more stable background job library with a lot of observability features, this gives us a super-charged debugging experience working running an instance.
- **Redesigned UI:** Formerly, Convoy had a simple one-page dashboard to view all resources - events, event deliveries, applications etc. But it grew over time and became complex to show all necessary information. We’ve redesigned the UI to have a sidebar and multiple pages to show all resources more conveniently and provide a great experience.
- **Events Search:** From v0.6, we’ve provided a search bar to search through events payload. This will enable users debug and resolve issues faster
- **Retention Policies:** From v0.6, we’ve provided a mechanism to retain fresh data and archive old data in cold storage. This comes with a flexible configuration per project and only currently supports S3 storage buckets.

## Changelogs
The changelogs for this minor release version and any maintenance versions are listed below.

[Convoy version v0.6.5](https://github.com/frain-dev/convoy/releases/tag/v0.6.5)

[Convoy version v0.6.4](https://github.com/frain-dev/convoy/releases/tag/v0.6.4)

[Convoy version v0.6.3](https://github.com/frain-dev/convoy/releases/tag/v0.6.3)

[Convoy version v0.6.2](https://github.com/frain-dev/convoy/releases/tag/v0.6.2)

[Convoy version v0.6.1](https://github.com/frain-dev/convoy/releases/tag/v0.6.1)

[Convoy version v0.6.0](https://github.com/frain-dev/convoy/releases/tag/v0.6.0)

[Convoy version v0.6.0-rc.3](https://github.com/frain-dev/convoy/releases/tag/v0.6.0-rc.3)

[Convoy version v0.6.0-rc.2](https://github.com/frain-dev/convoy/releases/tag/v0.6.0-rc.2)

[Convoy version v0.6.0-rc.1](https://github.com/frain-dev/convoy/releases/tag/v0.6.0-rc.1)

