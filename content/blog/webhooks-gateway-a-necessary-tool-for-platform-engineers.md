---
title: Webhook Gateways for Platform Engineers
feature_image: webhook-gateways-for-platform-engineers.png
post_image: webhook-gateways-for-platform-engineers.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false
description: At Convoy, we are building a high-performance webhooks gateway; we believe this is a necessary tool in the toolkit for the modern platform teams. In this article, we share this thought process.
published_at: 2023-02-20T17:00:00.000+00:00
---

# Introduction

In recent years, there has been a growing interest in the adoption and practises of platform engineers. In [Puppet’s State of DevOps Report](https://www.puppet.com/resources/state-of-platform-engineering) surveying hundreds of developers with and without platform engineers in their organisation. 60% are experiencing improved system reliability, 59% are experiencing greater productivity and 57% are experiencing better workflow standards. At Convoy, we are building a high-performance webhooks gateway; we believe this is a necessary tool in the toolkit for the modern platform teams. In this article, we share this thought process.

But, first some definitions. :)

## What is Platform Engineering

Here’s a definition according to [What is Platform Engineering?](https://platformengineering.org/blog/what-is-platform-engineering) 

Platform Engineering is the discipline of designing and building toolchains and workflows that enable self-service capabilities for software engineering organizations in the cloud-native era. Platform Engineers provide an integrated product most often referred to as an “Internal Developer Platform” covering the operational necessities of the entire lifecycle of an application.

Essentially, the platform team exists to enhance the productivity of the product-focused engineers, this is why Sam Newman in his recent article — [Don’t Call It A Platform](https://samnewman.io/blog/2023/02/08/dont-call-it-a-platform/)  , advocates for a better name like “Delivery Support” or “Delivery Enablement Teams”. It is useful to highlight the dichotomy between Site Reliability Engineers and Platform Engineers. This [article](https://www.getambassador.io/resources/rise-of-cloud-native-engineering-organizations) from Ambassador Labs shares an insightful image:

![SRE vs. Platform Engineering](/blog-assets/sre-vs-platform-engineering.png)

Put simply, the SRE runs the underlying infrastructure while the platform engineer provides the underlying infrastructure as a service (product) to product teams with baked in standards for the specific organisation. If you’re looking to learn more about the difference between a SRE and a platform engineer see [here](https://www.getambassador.io/resources/rise-of-cloud-native-engineering-organizations).

## What is a Webhook Gateway?

A webhook gateway is a webhook management tool that sits between a webhooks provider and the webhooks consumer. It acts as both a reverse and forward proxy for webhooks. It can be deployed by both the API provider that sends webhooks and the consumer that receives webhooks to handle webhook events multiplexing and de-multiplexing respectively.

![What are Webhook Gateways?](/blog-assets/webhook-gateway-architecture.png)Source: [What are Webhook Gateways?](https://getconvoy.io/blog/what-are-webhook-gateways)

It exists to provide a consistent infrastructure for end-to-end webhooks management for engineers.

## Why are Webhook Gateways important to Platform Teams?

Now, that we’ve set up the foundation of these terms, let’s talk about why they’re important to platform teams: 

- **Cross-Cutting Concern:** Webhooks management are easily a cross-cutting concern. In a growing organisation, several backend services would more often than not, send or receive webhooks; how then do we apply retries, rate limiting, circuit breaking etc. to sending events to client endpoints consistently across the organisation? If unchecked this can rapidly deteriorate into massive code duplication, inconsistencies and a big ball of mess. This is where platform engineers step in, to bring sanity to cross-cutting concerns across an organisation and enable developers focus on core business problems.
- **Developer Productivity:** Developer time is a scarce resource. Product-focused technology companies more often than not are always hiring for brilliant engineers. The degree to which engineers are solving core business problems, I believe is directly correlated to the degree to which users would receive new features and bug fixes. Engineers can’t move fast and solve customer problems if they aren’t constantly battling with their tools. This is where platform engineers come in. It is said that the best SRE and platform engineers constantly find and [eliminate toil](https://sre.google/sre-book/eliminating-toil/).
- **Standardisation:** How long does it a new engineer to fully onboard and get productive? When switching teams in an organisation, how long does it take for an engineer to onboard the new engineer? What is the learning curve of these tools? Standardisation helps scale a growing organisation with best practices. This standardisation typically the responsibility of the platform engineers. Reduced learning curve etc.
- **Improved Security:**  Security shouldn’t be an after-thought. The Entire DevSecOps movement was built around this idea. Webhooks carry sensitive data; providing a consistent secure platform where best practises are baked-in from the onset is an elite team practise. Platform engineers can work to ensure security across all webhooks sent and receive across the organisation.

## Why Convoy? & How do I get started?

Convoy is an open-source high-performance webhooks gateway to manage millions of webhooks end-to-end. It is designed to be an highly scalable multi-tenant webhooks gateway to support multiple backend services sending and receiving webhooks. It comes baked in with several features like retries, rate limiting, circuit breaking, customer-facing webhooks dashboards, support for both sending & receiving webhooks and a lot more. 

We welcome you to try out our OSS or Cloud software today. If you have any questions or you’d like to nerd out about webhooks, shared services and platform engineering feel free to join our growing community on [slack](https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ).

That’ll be all for now. Bye :)
