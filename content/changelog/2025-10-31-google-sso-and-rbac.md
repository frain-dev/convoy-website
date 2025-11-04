---
date: 2025-10-31
title: Google SSO & Role-Based Access Control
authors:
  - name: Smart Mekiliuwa
    image: /employees/smart.jpg
---

![Google SSO & RBAC](/feature-images/google-sso-and-rbac.png)

We released two features this week: Google SSO and a complete rewrite of how permissions work.

**Google SSO**

Google Workspace users can sign into Convoy using their Google account, eliminating the need for separate passwords.

Click "Sign in with Google" on the login page. The authentication flow redirects through Google and back to Convoy. First-time users will set up their organization name during the process. Existing accounts with the same email are automatically linked.

![Google SSO Login](/feature-images/google-sso-login.png)

**Role-Based Access Control**

The old permissions setup worked for smaller teams but started breaking down as teams grew. We rebuilt it with five roles:

- **Instance Admin** — Controls everything across your Convoy instance
- **Organization Admin** — Runs the organization and all its projects
- **Billing Admin** — Handles billing only
- **Project Admin** — One project's settings and resources
- **Project Viewer** — View-only access to project data

![RBAC](/feature-images/rbac.png)

This gives you granular control over who can access and modify resources in your Convoy instance.

Both features are available now. See the [Google SSO docs](/docs/product-manual/google-sso) and [RBAC guide](/docs/product-manual/rbac) for implementation details.
