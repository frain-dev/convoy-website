---
date: 2025-12-12
title: Organization Feature Flags, OAuth2 Endpoint Auth & Billing
authors:
  - name: Smart Mekiliuwa
    image: /employees/smart.jpg
  - name: Raymond Tukpe
    image: /employees/raymond.jpg
---

![Organization Feature Flags, OAuth2 Endpoint Auth & Billing](/feature-images/org-feature-flags-oauth2-billing.png)

We shipped four features this week: organization-level feature flags, OAuth2 authentication for endpoints, a billing module, and better test infrastructure.

**Organization Feature Flags**

Feature flags used to be all-or-nothing across your entire Convoy instance. You can now manage feature flags at the organization level. Go to **Settings → Early Adopter Features** to enable features like OAuth2 token exchange and mTLS for your organization. Instance admins can also override feature flags for specific organizations from the admin panel.

![Organization Feature Flags](/feature-images/org-feature-flags.png)

**OAuth2 Authentication for Endpoints**

Some endpoints require OAuth2 authentication. Endpoints now support OAuth2 client credentials authentication with shared secret or JWT client assertion. Configure your OAuth2 settings in the endpoint form, and Convoy handles token exchange automatically. This feature requires an enterprise license and the OAuth Token Exchange early adopter feature flag enabled.

![OAuth2 Endpoint Authentication](/feature-images/oauth2-endpoint-auth.png)

**Billing Module**

We added a billing module that calculates usage from your Convoy data. View monthly usage, manage subscriptions, handle invoices, and set up payment methods, all from the Convoy dashboard. Go to **Settings → Usage and Billing** to get started. This feature requires a billing module license and billing admin or organization admin role.

![Billing Module](/feature-images/billing-module.png)

**E2E Test Infrastructure**

We rebuilt our end-to-end test infrastructure to make it more reliable and easier to maintain. Tests now use Docker containers for Redis and PostgreSQL, making them faster and more consistent across environments.

**Other Improvements**

- **UI refresh**: We refreshed the dashboard UI with a cleaner design and better navigation
- **Batch tracking**: Track progress when retrying multiple event deliveries at once
- **Admin UI**: Instance admins can manage feature flags and circuit breaker configurations from a dedicated admin panel
- **Job IDs**: All queue jobs now use ULID-based job IDs for better tracking

All features are available now. See the [endpoints documentation](/docs/product-manual/endpoints) for OAuth2 configuration details.
