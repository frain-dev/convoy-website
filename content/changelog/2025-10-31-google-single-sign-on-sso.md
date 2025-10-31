---
date: 2025-10-31
title: Google Single Sign-On (SSO)
authors:
  - name: Smart Mekiliuwa
    image: /employees/smart.jpg
  - name: Subomi Oluwalana
    image: /employees/subomi.jpg
---

Teams using Convoy often have their identities managed in Google Workspace, and requiring separate passwords adds friction during onboarding and increases security risks. We've added Google OAuth authentication so your team can sign in with their existing Google accounts.

When a user clicks "Sign in with Google" on the login page, they're redirected to Google's OAuth consent screen, authenticate with their Google account, and are automatically signed into Convoy. For first-time users, we'll prompt them to set up their organization with a business name, then create their Convoy account linked to their Google identity. Existing users with matching email addresses are automatically linked to their Google accounts on first sign-in.

This change eliminates password management overhead, speeds up onboarding for new team members, and centralizes identity through your existing Google Workspace setup. To enable Google SSO on your self-hosted instance, you'll need to configure Google Cloud OAuth credentials and update your Convoy configuration. Check out our [Google SSO docs](/docs/product-manual/google-sso) for the complete setup guide.

[//]: # (![Google SSO]&#40;/feature-images/google-sso.png&#41;)

