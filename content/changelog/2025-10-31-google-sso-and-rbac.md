---
date: 2025-10-31
title: Google SSO & Role-Based Access Control
authors:
  - name: Smart Mekiliuwa
    image: /employees/smart.jpg
  - name: Subomi Oluwalana
    image: /employees/subomi.jpg
---

![Google SSO & RBAC](/feature-images/google-sso-and-rbac.png)

We released two features this week: Google SSO and a complete rewrite of how permissions work.

**Google SSO**

Google Workspace users can sign into Convoy using their Google account, eliminating the need for separate passwords.

Click "Sign in with Google" on the login page. The authentication flow redirects through Google and back to Convoy. First-time users will set up their organization name during the process. Existing accounts with the same email are automatically linked.

This reduces password management overhead since teams already use Google accounts. New team members get onboarded faster, and all identity management is centralized.

For self-hosted deployments, configure OAuth credentials from Google Cloud Console in your `convoy.json`. See the [setup guide](/docs/product-manual/google-sso) for details.

**Role-Based Access Control**

The old permissions setup worked for smaller teams but started breaking down as teams grew. We rebuilt it with five roles:

- **Instance Admin** — Controls everything across your Convoy instance
- **Organization Admin** — Runs the organization and all its projects
- **Billing Admin** — Handles billing only
- **Project Admin** — One project's settings and resources
- **Project Viewer** — View-only access to project data

Permissions stack on top of each other. Instance Admin sees and controls everything. Organization Admin automatically includes Project Admin and Viewer permissions, making it easy to grant broad access without configuring individual permissions.

You can also scope roles to specific projects or endpoints. For example, you can grant someone Project Admin access for one client project while restricting access to others.

As teams grow, granular access control becomes essential. Different team members need different levels of access. Someone reviewing event logs shouldn't have permission to modify production endpoints. RBAC provides tools to enforce least privilege without managing every permission individually.

Both features are available now. See the [Google SSO docs](/docs/product-manual/google-sso) and [RBAC guide](/docs/product-manual/rbac) for implementation details.
