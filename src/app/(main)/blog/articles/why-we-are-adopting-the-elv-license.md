---
title: 'Why we’re adopting the ELv 2.0 License'
feature_image: why-we-are-adopting-the-elv-license.png
post_image: why-we-are-adopting-the-elv-license.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Announcement
tags:
    - Convoy
    - Product Update 
featured: false 
description: 'In our upcoming release, we’re transitioning from the MPL 2.0 License to the ELv 2.0 License, and I wanted to share why we’re making this transition and what you can expect from us in the coming months.'
published_at: 2024-09-02T17:00:00.000+00:00
---

Dear Convoy Community, 

In our upcoming release, we’re transitioning from the MPL 2.0 License to the [ELv 2.0 License](https://www.elastic.co/licensing/elastic-license), and I wanted to share why we’re making this transition and what you can expect from us in the coming months.

In the past few months, we’ve been working with some of our users who are happy self-hosting Convoy and delivering millions of webhooks monthly; they’re not looking to switch to the Cloud platform. Most of these companies already have a commercial relationship with us, but what’s missing is a mechanism for us to continue delivering proprietary features to these users while keeping the free and open-source offering available. Today, we’re making this available by relicensing Convoy.

Before settling on the Elastic License, we considered several other OSS licenses, but none of them perfectly fit our scenario. Our approach to monetising open source is the [buyer-based open core framework](https://handbook.opencoreventures.com/open-core-business-model/#764604b5c6db4107bb84bbc427d81b87), where proprietary features are designed specifically for the user who cares most about them. There are multiple ways to deliver on this promise. For example, [GitLab](https://about.gitlab.com/) offers a dual license model with an `ee` directory containing all its paid features. [Sidekiq](https://sidekiq.org/) provides a core open-source project with a closed-source pro library with proprietary features built as plugins.

We decided on ELv 2.0 because the other techniques required a slightly more complex software delivery model with multiple repositories and dual licenses. ELv 2.0 enables us to have a more straightforward development workflow—we can maintain one repository and deliver all features via one binary. Users upgrading from the community edition to the business edition will only need a license key to access new features—no new deployment is needed!

Fundamentally, we’ve also learned that our users care about the stability and reliability of Convoy far more than our license choice, and we desire to build the world’s most advanced webhook gateways that users can depend on in production.

If you have any questions, please feel free to email me at `subomi at getconvoy dot io` or join our [Community](https://community.getconvoy.io) to share your thoughts.
