---
title: "Webhook Gateways: Build vs. Buy"
feature_image: webhook-gateways-build-vs-buy.png
post_image: webhook-gateways-build-vs-buy.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false 
description: We sat down briefly with Stanislav Zmiev, who's the tech lead of platform engineering at Monite to chat about platform engineering, how they designed their webhooks gateway, and some of thoughts on api versioning. Enjoy 🎉 
published_at: 2024-06-11T18:00:00.000+00:00
---

![webhook-gateways-build-vs-buy.png](/blog-assets/webhook-gateways-build-vs-buy.png)

Build vs. Buy isn’t a new concept in making decisions in technology. It is a critical decision engineering leaders constantly have to make about several problem domains, evaluating several factors. Even in this era, where engineering man-hours are a scarce resource; leaders want to focus their engineers on the problems that are critical to their business and outsource [undifferentiated heavy lifting](https://www.intercom.com/blog/run-less-software/).  

This decision is even more interesting to make when exploring building a webhook delivery system, because not until recently there wasn’t any other option than to build. I believe it is also why engineers often make the mistake that [webhooks are simple HTTP post requests](https://getconvoy.io/blog/webhooks-are-not-just-http-post-requests); guess who doesn’t agree — Engineers who have run webhooks in production at scale. The recurring sentiment that I get from them is things can be simpler.

Caveat: This article is focused on webhook providers — the folks sending out the webhooks.

# Let’s define a Webhooks Gateway
Before we explore the build vs. buy decision, let’s first define what we mean by a [webhooks gateway](https://getconvoy.io/blog/what-are-webhook-gateways).

For many, the idea of building a webhooks delivery system boils down to a system (either a separate service or built into the monolith) that can deliver webhook events to user endpoints via JSON, with features like retries, signature verification, static IPs, and basic level subscriptions using event types. While all of these are important for dealing with specific aspects of webhooks, they barely cover the full spectrum of activities that surround them. A webhooks gateway is a comprehensive solution designed to handle the full life cycle of webhooks delivery— from creating subscriptions, ingesting events, delivering events, and pruning stale events from the system. 

![webhooks-dashboard.png](/blog-assets/webhooks-dashboard.png)

A comprehensive solution offers features like a developer portal, comprehensive rate limiting, circuit breaking, fine-grained webhook subscriptions, deep observability (preferably with open standards like OpenTelemetry and Prometheus) to know things like the average end-to-end latency of deliveries per endpoint and fine-grained retention policies to keep storage costs low and keep the overall system performant.

A common way to define webhooks is they’re reverse APIs. With regular APIs developers have more control, over the data they retrieve and at what interval — It’s a pull mechanism, with webhooks on the other hand, developers have less control— instead, they have to expose a URL to you and expect/hope that all events will be delivered in realtime — It’s a push mechanism.

Over time, developers either grow to trust your webhooks and confidently rely on them. Otherwise, they ignore them entirely and fall back to polling, which defeats the entire purpose. Reliability has become table stakes for companies building against webhooks. Polling APIs is an inefficient design both for the producer and the consumer, and doesn’t work very well in Serverless environments.

# Building and maintaining your own tooling
Building your own webhooks gateway comes with some great perks, especially having complete control over its features and functions. It allows you to customize the system to match your organization’s unique requirements, ensuring smooth integration with your current tools, whether you've built them internally or purchased them ready-made.

However, this level of customization doesn't come for free. It involves not just an initial time and resource investment for development, but also a long-term commitment for maintenance and updates. You need to consider this as an ongoing obligation rather than a one-off task: an ownership tax of sorts.

> We were doing it all with Resque in Ruby. Webhooks are such a pain in the ass, that it constituted ~90% of our job load at Shopify 
>
> — Simon Eskildsen (Co-founder & CEO at Turbopuffer, Ex Principal Engineer at Shopify)

When you think about creating your own system, there’s one more important thing to keep in mind: the risk of falling behind the industry trends. Ready-made solutions constantly add new features and stay up-to-date with the latest practices. However, going the DIY route means you’ll need to ensure your system stays current and competitive, which is no small task. If you fall behind, you won’t just miss out on new features but also struggle to meet industry standards, putting you at a disadvantage compared to others.

# Key considerations before you decide
When weighing the build vs buy question for your webhooks delivery solution, there are a couple of important factors to consider:

## Scope and functionality
Understanding the scope and requirements of your webhooks delivery system is crucial before even popping open your code editor. Webhooks have a not-so-good reputation because most implementations today are poorly built and lack many important features. Let’s consider a few of these requirements.

- Do we want to build an independent service or add it to our monolith?
    - Do we envisage a service-oriented architecture in the future where multiple services would be generating webhooks?
- How will webhook events be ingested?
    - Can we ingest events via a regular API so other (micro)services can push events via this route?
    - Can we consume events directly from message brokers like Kafka or Amazon SQS?
    - Can we plug our delivery system directly into our CDC pipeline and transform changes into webhook payloads to be delivered?
- How will consumers debug webhooks delivery without engaging customer support?
- How do we design around badly configured endpoints such that they do not impact the overall health of the system?
- Do we design an interface and correct access control policies for team members to manage webhooks for their service?
- What type of webhook subscriptions do we want to support? — event types, advanced filtering?
- How do we design for fair use such that large tenants do not impact the delivery of webhooks to smaller tenants?

Building might seem appealing at the beginning, but it’s important to consider the current and future requirements before opening your coding environment!

## Performance & Reliability
It might sound obvious, but webhook delivery system are systems with high SLA requirements. The reason is webhooks are reverse APIs; they power critical business workflows and disruption to the continuous delivery of webhooks will significantly impact customers. This is why it is absolutely necessary to consider this when designing an in-house solution, and the future maintenance effort into the future. 

One of the special benefits of using an off-the-shelf solution like [Convoy](https://getconvoy.io), is we’ve designed the core gateway to address this problem. To solve for this we adopted the control / data plane architecture for the core gateway. The control plane is responsible for managing all forms metadata — endpoints, webhook subscriptions, etc. While the data plane is responsible for the actual ingesting and delivery of webhooks. This enables us achieve design both components separately for their individual SLA guarantees.

## Cost
When evaluating cost in build vs. buy, our bias is usually to underestimate the cost of building internally vs. paying for software. But in true Intercom fashion, we should [run less software](https://www.intercom.com/blog/run-less-software/) especially software falls into the undifferentiated heavy lifting bucket.

The true cost of building goes way beyond the initial two weeks of building a simple webhooks delivery system that includes two tables — `endpoints`, and `events` , with a background job system to dispatch events. Here’s a couple other factors to consider in your cost analysis

- **Requirements:** It is important to fully scope out what you set out to build, taking into account how your system(s) are currently architected and how you plan to evolve that design. This would inform what your system requirements should look like, so that weeks of work don’t spiral into months of engineering.
- **Salaries:** Secondly, It’s important to consider the salaries of the team that’ll design and implement the first version.
- **Infrastructure:** Consider, your infrastructure cost, everything from machines running the servers to databases, caches, and your monitoring stack. Webhook systems similar to APIs are usually a high SLA system, so each piece of the stack must be HA enabled.
- **Maintenance:** Then, consider what is required to maintain and support the system. While this can feel negligible in the beginning the costs can become significant over time.
- **Opportunity Cost:** Lastly, consider the opportunity cost of diverting resources from other projects that are core to your business objectives. While webhooks are core to the API experience of most providers, they’re aren’t webhooks providers, and don’t need to spend too much time on it.

All things considered, we start to agree more with the Intercom [Run Less Software](https://www.intercom.com/blog/run-less-software/) philosophy!

## Support
When you opt to buy a solution like Convoy, one of the unsung benefits is having a dedicated support team at your fingertips. Think of it as offloading a significant chunk of work and worry. Instead of diverting your attention to troubleshooting issues or implementing new features, you can simply reach out to the vendor’s support team for quick and expert help.

During your evaluation phase, it's crucial to assess the responsiveness and expertise of support. Make sure they not only meet your expectations but can also act as a true partner in maintaining and delivering an excellent webhook experience to your users.

External support isn't just a nice-to-have; it's a significant time-saver that allows your internal teams to focus on your core business activities rather than being slowed down with maintenance and troubleshooting.

By leveraging a strong support organization, you essentially gain an extended team specialized in ensuring a superior webhook experience for your users. This can save you significant time and effort in the long run.

## Security
Security is paramount for webhook delivery systems due to the sensitive nature of the data involved. When purchasing an off-the-shelf solution, you can often rely on the vendor's reputation and third-party security audits to ensure your data's safety. These vendors support large customer bases and have heavily invested in security measures to protect their interests and yours.

Conversely, if you choose to build in-house, you must allocate resources to achieve comparable security standards. There is no room to compromise on security features such as authentication, authorization, and restricted data access, especially when handling sensitive webhook events like payment or healthcare data, which have stringent access requirements.

## Time to Value
Unless your procurement process is exceptionally cumbersome, purchasing software typically offers a faster time to value. This should be a key consideration in your decision-making process: can the vendor deliver at the speed you require?

Building a solution generally takes more time than buying one. Therefore, it's crucial to evaluate how urgently you need a solution, the initial scope of the project, and how quickly you can iterate and update the system to meet changing needs once it is in the hands of users.

# Conclusion
Much like other decisions, choosing whether to build or buy your webhook gateway is complex and involves many considerations. The advantages of building in-house include increased control, customization, and the opportunity to tackle an interesting engineering problem.

However, when you look at everything, the time, resources, and expertise needed usually surpass these advantages. As a result, you end up with a subpar version of a platform that you could have easily bought in less time and at a lower cost.

At [Convoy](https://www.notion.so/Webhooks-Gateway-Build-vs-Buy-73e6cd70e07149a09a35ab703a61a866?pvs=21), we have decades of collective experience managing webhooks. We talk to lots of companies about the subject, and we spend tens of thousands of hours designing, building, and iterating on a core gateway that is scalable and performant — A gateway that can be scaled across teams and service boundaries in an organisation. You’d be hard-pressed to build a tool that rivals that!

So whilst there may be specific instances where building is the right choice, for the majority, evaluating and buying a solution is the sensible decision, so you can focus on what your organization does best.


# Getting Started with Convoy
Want to add webhooks to your API in minutes? You can get started at [cloud.getconvoy.io/signup](http://cloud.getconvoy.io/signup).