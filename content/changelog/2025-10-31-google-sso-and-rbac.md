---
date: 2025-10-31
title: Google SSO & Role-Based Access Control
authors:
  - name: Smart Mekiliuwa
    image: /employees/smart.jpg
  - name: Subomi Oluwalana
    image: /employees/subomi.jpg
---

We shipped two features this week that change how you manage access to Convoy: Google SSO and a rebuilt permissions system.

**Google SSO**

If your team uses Google Workspace, you can now sign in to Convoy with your Google account. No separate password to remember or rotate.

Here's how it works. Click "Sign in with Google" on the login page. Google handles the authentication. You're redirected back to Convoy and you're in. First-time users get a quick setup flow where they name their organization. If you already have a Convoy account with the same email, we link it automatically.

This matters because password management is a pain. Your team already has Google accounts. Why create another credential to manage? With SSO, onboarding is faster and your security posture improves since you're centralizing identity management.

For self-hosted deployments, you'll need to set up OAuth credentials in Google Cloud Console and configure them in your `convoy.json`. Our [setup guide](/docs/product-manual/google-sso) walks through the process step by step.

**Role-Based Access Control**

We rebuilt permissions from the ground up. The old system worked, but it didn't scale well as teams grew. Now you have five distinct roles:

- **Instance Admin** — Full control across the entire Convoy instance
- **Organization Admin** — Manage your organization and all its projects
- **Billing Admin** — Handle billing, nothing else
- **Project Admin** — Manage a specific project's settings and resources
- **Project Viewer** — Read-only access to project data

The roles follow a hierarchy. Instance Admin inherits everything. Organization Admin gets Project Admin and Project Viewer permissions. You get the idea. This means you can grant broad access without manually checking dozens of permission boxes.

You can also scope roles to specific projects or even individual endpoints. Need someone to manage webhooks for one client but not see others? Scope their Project Admin role to that project. Simple.

Why does this matter? As your team grows, you need granular control over who can do what. A contractor shouldn't have the same access as your CTO. An intern reviewing logs doesn't need to modify production endpoints. RBAC gives you the tools to enforce the principle of least privilege without micromanaging every permission.

Both features are live now. Check the [Google SSO docs](/docs/product-manual/google-sso) and [RBAC guide](/docs/product-manual/rbac) for implementation details.

![Google SSO & RBAC](/feature-images/google-sso-and-rbac.png)

