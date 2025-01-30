---
title: 'Convoy now ships with a simpler architecture.'
feature_image: convoy-new-architecture.png
post_image: convoy-new-architecture.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
featured: false
description: 'In our latest release, we’ve simplified Convoy’s architecture. In this article I describe a little bit more about the architecture and the benefits for Convoy.'
published_at: 2024-09-11T17:00:00.000+00:00
---

In our latest release (`v24.8.x` series), we’ve simplified Convoy’s architecture. In this article I describe a little bit more about the architecture and the benefits for Convoy. You can refer to the [docs](https://getconvoy.io/docs/deployment/architecture) to learn more about each component and their responsibility in the overall design. But before we discuss the new architecture, let’s juxtapose our old and new architecture.

![Convoy's architecture comparison](/blog-assets/convoy-new-architecture.png)

The old architecture relied on three tightly coupled components working together to provide the system's capabilities. In contrast, our new architecture follows the well-known [control plane and data plane model](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/control-planes-and-data-planes.html). The control plane handles configuration tasks such as registering client endpoints, creating subscriptions, and managing customer-facing developer portals. It also powers the web UI. The data plane serves as the core gateway, responsible for ingesting, transforming, matching, and delivering webhooks to client endpoints. Both planes share state through a common PostgreSQL database.

If you’re familiar with infrastructure software, you probably already noticed that this architecture isn’t groundbreaking— It’s how most API Gateways operate. In fact, we took a lot of inspiration from their design. This new architecture offers several important benefits for Convoy, some of which I’ll outline in this article, while others are yet to come. This design serves as the necessary prerequisite for those future improvements.

The first, and perhaps most obvious benefit, is the well-known principle of separation of concerns. In our previous architecture (see image above), every component played a role in the core data processing pipeline, meaning that if one component went down, it impacted the entire system’s availability—clearly not ideal. This required users to ensure that every system component was up and running at all times, which complicated deployments and increased the risk of downtime.

The core function of a webhook gateway is to ingest and deliver webhooks to available client endpoints. While the capability to manage endpoints is important, the stakes are much higher when a webhook meant to credit a merchant account and deliver value to end-users fails. The difference in urgency is clear—missing such critical webhooks have far more significant consequences. Even from interacting and supporting some of our users webhooks that don’t deliver within seconds is as good as useless to the end users.

The second benefit of the new architecture, closely tied to the first, is that it allows us to focus our reliability engineering efforts more effectively. Reliability engineering is costly in both time and resources. Engineers must invest in more complex deployment strategies, enhanced instrumentation, and comprehensive alerting systems to proactively prevent downtime and, when issues do occur, minimize Mean Time to Recovery (MTTR).

The final benefit I’d like to highlight is cost. In our previous architecture, scaling required increasing the capacity of all three components. Because each played a role in data processing, none could use smaller machines—any under-scaled component would become a bottleneck for the entire system. In contrast, the new architecture separates the control plane from the hot path, allowing it to run on smaller, more cost-efficient machines. Meanwhile, the data plane can be scaled with slightly larger machines, offering deeper observability and more efficient resource allocation.

A hallmark of good software design is when several unintended benefits emerge naturally from it. This architecture has laid a strong foundation for us to enhance the data processing pipeline, allowing us to achieve even higher reliability and performance guarantees. I’m excited to share more updates as we continue to make progress. That’s all for now. :)

Take care!

## Getting Started with Convoy

Want to add webhooks to your API in minutes? You can get started at [cloud.getconvoy.io/signup](http://cloud.getconvoy.io/signup).
