---
title: Release Notes
description: 'Version 0.9 Release Notes'
id: release-notes-v9
order: 5
---

# Convoy v0.9
Convoy v0.9 was a major release from our previous versions. We officially switched from `MongoDB` to `PostgreSQL`. We integrated two Message Brokers to ingest webhook events. Please read on to learn more about what we shipped in this release.

## Release Highlights
- **PostgreSQL Migration**: We switched our primary datastore from `MongoDB` to `PostgreSQL`. We decided to make this change for a number of reasons:
    - We want to provide easy migration for both data and schema changes. We struggled to provide this with `MongoDB` and it has constrainted our velocity to releasing features.
    - We wanted to provide an easy way to upgrade data and schema changes when we release a new version. We struggled to do this successfully with `MongoDB` and we tried to fix it by writing our [migration tool](https://getconvoy.io/blog/data-migrations-in-mongodb-using-golang) around `MongoDB` but we still do not have strong confidence in upgrading & downgrading a Convoy instance. Switching to `PostgreSQL` is our fix for this.
    - We wanted a much more pleasant experience running Convoy on-prem. With many of our queries that required transactions. `MongoDB` (version 5+ as of this writing) you needed to run `MongoDB` as a replica set which was less than ideal.

- **Message Brokers**: We released support for ingesting webhook events from `Message Brokers` into Convoy. This will increase the overall delivery guarantees of webhook events from your backend services into Convoy. As of this release, Convoy supports both `Google PubSub` and `Amazon SQS`. 

- **Improved Dashboard**: We made several improvements to our dashboard to provide a frictionless onboarding, and product experience.

## Changelog
The changelogs for this minor release version and any maintenance versions are listed below.

- [Convoy version v0.9.0](https://github.com/frain-dev/convoy/releases/tag/v0.9.0)
- [Convoy version v0.9.0-rc.3](https://github.com/frain-dev/convoy/releases/tag/v0.9.0-rc.3)
- [Convoy version v0.9.0-rc.2](https://github.com/frain-dev/convoy/releases/tag/v0.9.0-rc.2)
- [Convoy version v0.9.0-rc.1](https://github.com/frain-dev/convoy/releases/tag/v0.9.0-rc.1)
