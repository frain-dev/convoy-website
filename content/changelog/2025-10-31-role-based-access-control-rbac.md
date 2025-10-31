---
date: 2025-10-31
title: Role-Based Access Control (RBAC)
authors:
  - name: Subomi Oluwalana
    image: /employees/subomi.jpg
  - name: Smart Mekiliuwa
    image: /employees/smart.jpg
---

As Convoy scales within organizations, teams need granular control over who can view, manage, or modify projects and endpoints. We've refactored our access control system to support role-based permissions across instances, organizations, and projects.

The system introduces five roles with hierarchical permissions:

- **Instance Admin**: Full instance management across all organizations and projects
- **Organization Admin**: Organization-wide control, team management, and all projects
- **Billing Admin**: Billing management only
- **Project Admin**: Project-level administration and settings
- **Project Viewer**: Read-only access to project data

Higher-ranked roles automatically inherit permissions from lower ones, ensuring the principle of least privilege. Roles can be scoped to specific projects or even individual endpoints for fine-grained access control.

Read more in our [RBAC product manual](/docs/product-manual/rbac).

[//]: # (![RBAC]&#40;/feature-images/rbac.png&#41;)

