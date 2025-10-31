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

Google Workspace users can sign into Convoy using their Google account. No more separate passwords to manage.

The flow works like this: click "Sign in with Google", you'll get redirected through Google's auth, then back to Convoy. First time logging in? You'll name your organization. Existing account with that email? We'll connect it up.

Since everyone's already using Google accounts anyway, this cuts down on password chaos. New team members get onboarded faster, and all your identity stuff lives in one place.

Self-hosted users: pull OAuth credentials from Google Cloud Console and add them to `convoy.json`. Full steps are in the [setup guide](/docs/product-manual/google-sso).

**Role-Based Access Control**

The old permissions setup worked okay, but it started breaking down as teams got bigger. So we rebuilt it. You've got five roles now:

- **Instance Admin** — Controls everything across your Convoy instance
- **Organization Admin** — Runs the organization and all its projects
- **Billing Admin** — Only billing stuff
- **Project Admin** — One project's settings and resources
- **Project Viewer** — Can look but can't touch

Permissions stack on top of each other. Instance Admin sees and controls everything. Organization Admin gets Project Admin and Viewer powers automatically. Makes it easy to give someone wide access without going through a bunch of checkboxes.

You can also lock roles down to specific projects or even individual endpoints. Say you need someone managing webhooks for Client A but you don't want them seeing Client B's stuff. Scope their Project Admin role to just that one project.

The bigger your team gets, the more you need this kind of control. Your contractor shouldn't have the same keys as your CTO. Someone reviewing event logs doesn't need to mess with production endpoints. RBAC gives you a way to set boundaries without having to manually approve every little thing.

Both are live now. Check out the [Google SSO docs](/docs/product-manual/google-sso) and [RBAC guide](/docs/product-manual/rbac) to get started.
