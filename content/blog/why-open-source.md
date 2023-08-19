---
title: 'Why Open Source?'
feature_image: why-open-source.png
post_image: why-open-source.png 
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: true
description: Why did we choose to build Convoy as an open-source project? In this article, I share our beliefs about open source and why it's important to us. Enjoy 🎉
published_at: 2023-08-16T16:00:00.000+00:00
---

Two weeks ago, we had a YC open-source founders event at the new YC office. A common question in these types of events is, “Why open source?”. It was the first question the moderator asked all the panellists, and sure, they all gave great answers!  Fun fact: I met an open-source founder, and she said: we all just like open-source and try to justify it with something-something data privacy. 😂 And it dawned on me that I hadn’t put in writing the answer to this question for Convoy, so here you go. 

As a quick recap -- Convoy is an open-source high-performance webhooks gateway to manage webhooks end-to-end. It is designed to be an highly scalable multi-tenant webhooks gateway to support multiple backend services sending and receiving webhooks. It comes baked in with several features like retries, rate limiting, circuit breaking, customer-facing webhooks dashboards, support for both sending & receiving webhooks and a lot more.

Disclaimer: This post might include subjective opinions you may not completely agree with, but it’s our why. Ready, set, let’s go. 

### Technology Abstraction or SaaS Business?

First and foremost, many problems in the infrastructure software domain are the necessary abstractions engineers need to do their job. This is true for many problems in the domain, like — Message Queues, Databases, API Gateways, Load Balancers, Service Discovery, Container Orchestration, etc. In these problem domains, companies oftentimes build out a managed service business over their core (open source) technology providing uptime, reliability, governance, etc., on a [usage-based pricing model](https://www.usagebased.org/) as their core revenue strategy rather than monetize over the availability of a feature or not. 

This type of clean technology abstraction is what I believe is missing in the webhooks provider space. In another post, I will write my technical vision for webhooks. But for this post, here’s a snippet — If you simplify the problem of a webhooks service, you’re left with a message queue dedicated to webhook events. This in itself is not a SaaS business. It’s simply a necessary abstraction gap that needs filling. If you agree to the precursory premise, open-sourcing the core technology is a no-brainer; we are never returning to the Oracle closed-source proprietary databases era.

Technologies that are necessary abstractions to enable developers to do their job needs and should be open-sourced. It comes with the territory. I don’t want opaque binaries with a promise of their internal behaviour. I want it alongside its source code to inspect it, have a concrete understanding of how it works, and extend it if I need to. Sadly, this can come under much debate with the recent [license changes](https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license) at HashiCorp. But I do not believe this is sufficient reason to bring back proprietary infrastructure software with unnecessary sales cycles prior to usage.

### Distribution.

Open source is the ultimate form of distribution for infrastructure software tools. Again, the core premise is these tools are necessary building blocks to achieve my goal. My goal can be anything from side projects to company production-grade projects. All that is important is I need this tool to achieve this objective. One advantage you get free of charge is being open-source enables the adoption of your tool to the ends of the earth. It’s always an amazing feeling interacting with engineers from various continents joining our Slack Community and asking questions about deploying & using Convoy—one of the best feelings ever. ✨ 

At Convoy, our mission is simple; we genuinely want to put our technology into the hands of as many engineers as possible without having to worry about long sales cycles, data compliance issues, and being constrained to your immediate network & friends. Open source helps us side-step all these problems at once, enabling engineers anywhere to utilize Convoy in the best way that fits their system architecture. 

### Sustainability.

Open source is the ultimate form of sustainability. [92% of SaaS companies fail](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/grow-fast-or-die-slow), regardless of funding or growth. Failure of your business should not bring down my infrastructure nor force me to redesign my system architecture when I am not ready to do so.  Providing open-source software is the highest form of care for sustainability for your users. Minor segue: at the YC event, I learned to differentiate project/market fit from product/market fit. The former describes the adoption of your project, while the latter describes the revenue of your business. Conflating the two can be erroneous.

At Convoy, regardless of the business of Convoy, we want the technology always to be available to developers, enabling them to fork it and ensure their system survival. As awkward as it sounds, this benefit provides sustainability even to open-source companies’ license changes. This is possible because most (if not all) license changes aren’t back-dated. Two examples that quickly come to mind are [Opensearch](https://opensearch.org/) to Elastic and now [OpenTF](https://opentf.org/) project to Terraform. 

In the grand scheme of things, the open-source companies industry is still early. RedHat clocked 20 last year. What do I think? I think many open-source companies/founders will start thinking of licensing and monetization very early in their project to prevent license change drama in their communities. This is already happening with projects like [Redpanda](https://redpanda.com/blog/open-source) and [DragonflyDB](https://www.dragonflydb.io/blog/announcing-dragonfly). Sustainability is dear to us, and being open-source helps us achieve this.

### Defensibility.

Lastly, Open source is the ultimate form of defensibility for our business. Similar to how I described that open source helps you distribute your software to as many developers as possible. It is also an invitation to improve and build the best version of the software to fit the needs of your users. That invitation is to like-minded engineers seeking the right abstractions to solve their problems which eventually builds a community that ensures the success of your project isn’t easily toppled.

At Convoy, we do not want to build in a silo; being open source is the closest form of an invitation to build the best abstraction possible for developers. Here, competition is irrelevant. You focus on working with your users to craft the best product and abstraction. Nothing is sweeter. :) 

And that’s why we chose to open-source Convoy. If you’re an open-source founder, I’m genuinely curious what your thoughts are and why you have chosen you open-source your startup’s core tech. If you have a blog post to share, that’ll be fantastic as well.
