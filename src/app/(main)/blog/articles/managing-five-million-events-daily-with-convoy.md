---
title: Managing 5 million events per day with Convoy
feature_image: cardiff.png
post_image: cardiff.png
primary_author:
    name: Lotanna Nwose
    twitter: viclotana
primary_tag: Customer Stories
tags:
    - Convoy
    - Customer Stories
featured: false
description: Cardiff Networks Customer story about how they use Convoy to process over 5 million webhook events daily while working on various projects. 
published_at: 2023-06-30T17:00:00.000+00:00
---
## How do you manage that many events?

Cardiff Networks has established itself as a leading provider of customized technology solutions for the Banking, Telecom, Media & SME sectors in East Africa, with plans to expand to the rest of Africa. Their major focus is on developing scalable, reliable, and resource-efficient enterprise-grade solutions and due to the quality of their clientele, they process approximately 5-6 million events per day on one of their moderately busy clusters.

I spoke to the Chief Information Officer at Cardiff Networks, Philip Simbwa about his business operations and how they have gotten this far in the business.

“The two most important things you want a good platform engineering team to have is visibility on errors and reliable deploy-and-forget infrastructure setups in your workflow” - Philip Simbwa

## The Webhooks management-at-scale hell

Working on multiple projects simultaneously, Philip’s team use a Microservices setup for some projects and in some special cases, monolithic setups. With their Microservices setups, sometimes they want to move fast (with lots of deploys) but not break things, so they always had to sidecar a webhooks manager for each mission-critical service. 

The two big challenges for them became that they did not want to invest resources into centralising these sidecars. Also, they were losing substantial amounts of time just writing sidecars for all these services. And as their microservices fleet grew, so was the maintenance hell for sidecars growing as well.

“*Before discovering Convoy, we faced challenges in ensuring the seamless operation of webhooks at scale. Writing custom event workers to be deployed as sidecars alongside the actual services proved time-consuming.”*

## Webhook Gateways for Microservices communication

This is where Philip started researching solutions, his criteria were simple, a webhook Gateway that understands complexities at scale, is easy to implement and has a great support team. He found Convoy and things changed for the better.

“*With its powerful features and capabilities, Convoy has enabled Cardiff Networks to achieve better stability and reliability for our distributed infrastructure. Thanks to Convoy, Cardiff Networks can now process approximately 5-6 million events per day on one of our moderately busy clusters, without any unnecessary complexities or hoops to jump through.”*

## The best features at the scale-up stage

When I asked Philip about what Convoy features he considers really important when dealing with millions of events at scale, he mentioned [Convoy Portal Links](https://docs.getconvoy.io/product-manual/portal-links) and the pause button for endpoints. He says these two things help the customer success team speak the same language with some of the highly technical teams and clients they work with (which is often hard without a tool like Convoy)

## Managing internal infrastructure

The Cardiff Networks team keeps finding interesting ways to use the Webhooks Gateway, they started with using Convoy for third-party callbacks, and at the time looking to use another tool, Temporal for internal infra callbacks but realized they can use Convoy to handle both internal and third-party callbacks and that is exactly what they do today.

“*Convoy has been a game-changer for Cardiff Networks and has significantly enhanced the quality of our technology solutions."*