---
date: 2026-01-30
title: Reliability, Observability & Data Layer Improvements
authors:
  - name: Smart Mekiliuwa
    image: /employees/smart.jpg
  - name: Raymond Tukpe
    image: /employees/raymond.jpg
---

![Reliability, Observability & Data Layer Improvements](/feature-images/reliability-observability-data-layer.png)

We shipped bug fixes, better observability, and a refactored data layer for the Core Gateway.

**Fixes & observability**

Endpoints in **Paused** or **Inactive** state now activate correctly, and OSS default-user login no longer requires an organization. We fixed filter evaluation for boolean values in arrays and a startup bug where the worker blocked the agent server. For Sentry, you can set `CONVOY_SENTRY_DEBUG=true` and `CONVOY_SENTRY_ENVIRONMENT` to get debug logging and environment tagging.

**Data layer improvements**

We refactored the data layer to use [SQLC](https://sqlc.dev/) for type-safe SQL across API keys, configuration, delivery attempts, organisations, portal links, projects, sources, and filters. Behaviour is unchanged and no config or API changes are required on your side.

Upgrade for the fixes and observability improvements.
