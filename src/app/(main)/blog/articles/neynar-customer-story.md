---
title: How Neynar adopted Convoy to deliver Fine-grained Farcaster webhooks
feature_image: neynar-customer-story.png
post_image: neynar-customer-story.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Customer Stories
tags:
    - Convoy
    - Customer Stories
featured: false
description: Early in their journey of building the developer infrastructure for Farcaster, Neynar Co-founder & CTO Manan Patel realised that they needed a reliable, performant and highly customisable way to deliver webhook notifications to customer endpoints.
published_at: 2025-02-25T17:00:00.000+00:00
---

# About Neynar 
[Neynar](https://neynar.com) is a developer platform that simplifies building on Farcaster, a decentralized social protocol. Founded in 2023 by former Coinbase employees, Neynar offers a suite of APIs and tools that streamline application development, including cloud-hosted hubs, authentication solutions, and real-time data pipelines. 

In May 2024, Neynar secured $11 million in Series A funding led by Haun Ventures and Union Square Ventures, with participation from a16z CSX and Coinbase Ventures. Serving over 1,000 companies and developers, Neynar is committed to fostering a vibrant developer ecosystem in the decentralized social networking space.
---
&nbsp;

Early in their journey of building the developer infrastructure for Farcaster, Neynar Co-founder & CTO Manan Patel realised that they needed a reliable, performant and highly customisable way to deliver webhook notifications to customer endpoints.

# The Challenge

Understanding the requirements and Neynar’s high bar for quality, Manan chose to shop for solutions rather than build it internally, seeing that it could slow them down from executing their core mission. 

After trying out several tools in the market, Manan found that none of them was robust enough for their needs. They didn’t have first-class support for the features they required, instead they’d have to build and maintain more functionality around those tools to make them useful. 

Secondly, speed was a non-negotiable for the a16z crypto startup, and the ability to self-host the entire platform — control and data plane, enabled them to move fast in the market and execute on their mission.

# The Search for a Webhooks Service

As an engineering leader, Manan wasn’t new to the build vs. buy dilemma but knew that given Neynar’s requirement, it was better to confirm there was no off-the-shelf solution that could help them move faster.

After searching the space for products to meet his requirements, to his surprise, most the products lacked the breadth of features Neynar required. His top requirements: 

- Fine-grained [webhook subscriptions](https://www.getconvoy.io/docs/product-manual/filters) (including regex matching)
- Broadcast events to multiple tenants.
- A developer portal for developers to manage their endpoints and event deliveries.


> With Convoy, we were able to spin up both the control plane and data plane in our AWS environment with ease, cutting through a lot of compliance requirements and delivering events in minutes — Manan Patel, Co-founder & CTO

# The Solution

## Time to Market

Because speed is a competitive advantage of every startup. Neynar quickly went to integrate and deploy Convoy in production and it took them only a few hours to begin delivering webhook events to customers. 

Since the initial launch, Neynar has gone on to be able to quickly release new event types and webhook functionalities to their users in record time!

> “Alternatively, if we had to build all our webhook functionality from scratch, it would have taken us way longer, it would have been less robust, and more code to maintain that isn’t our core business” — Manan Patel, Co-founder & CTO

## Fine-grained event subscriptions

Manan described that enabling developers to subscribe to exactly what they want from the network is crucial. For example, users want to receive events for casts that include a particular substring or phrase. 

When we began designing fine-grained webhook subscriptions, we were pleasantly surprised by how fine-grained we could get.

> Neynar is building the developer infrastructure for Web3 Social, similar to X (Formerly known as Twitter) for Web2; fine-grained subscriptions are crucial — Manan Patel, Co-founder & CTO

## Rapid support for the implementation of new features

What also struck the team at Neynar was how nimble and responsive the Convoy team has been. Every time they engaged us in Slack, hoping to come back later for a response, surprisingly, they responded almost immediately.

> “We felt very similar to the Convoy team, a small customer-obsessed team, moving very fast, responding to customer issues” — Manan Patel, Co-founder & CTO

# The Results

As a result of Convoy, Neynar has become the leading provider of webhook events for Farcaster. They’ve been able to iterate rapidly and even build a webhooks subscription API on top of Convoy’s flexibility.
