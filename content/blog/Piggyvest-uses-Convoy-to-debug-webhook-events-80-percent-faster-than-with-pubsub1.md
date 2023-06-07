---
title: Debuging webhook events 80% faster than with Pubsub
feature_image: piggyvest.png
post_image: test1.png
primary_author:
    name: Lotanna Nwose
    twitter: viclotana
primary_tag: Customer Stories
tags:
    - Convoy
    - Customer Stories 
featured: false
description: Piggyvest's Customer Story, how using Convoy helped the Engineering team to debug webhook events 80 percent faster than when they used Google Pubsub.
published_at: 2023-06-06T17:00:00.000+00:00
---
### Managing Fintech Products with millions of users

[Piggyvest](https://www.piggyvest.com), arguably the largest Wealthtech company in Sub-Saharan Africa with over 4 million customers, [paid out $480m](https://www.thecable.ng/piggyvest-we-paid-out-over-n240bn-to-customers-in-2021) to 3.5 million of its customers in 2021 and is on a mission to help Africans achieve their financial goals. The entity also provides a couple of other products, including [Pocket with over 2 million customers](https://pocketapp.com) and, [Patronize](https://patronize.co) for business owners.

Millions of events are sent and received daily from all Piggyvest customer interactions. The engineering team is responsible for ensuring that these systems work seamlessly and as expected.

I spoke with some members of this team, including Ikechukwu, the Engineering Manager, and Timothy, one of the engineers, about how they manage their events infrastructure.

### Debugging Challenges for millions of events

The team initially used Google Pubsub and Cloud Tasks to manage micro-service communication and webhook events. However, they encountered significant issues at their scale and across the multiple products they work on. Two major issues were auditing and debugging Webhook events. They frequently encountered dead messages in Google Pubsub queues, and they were unable to determine what happened to them or replay the events. This caused many issues, especially when dealing with critical financial transactions. In some cases, it was even difficult to determine the errors returned.

Additionally, browsing through logs at this level across multiple products was very time-consuming and a headache. They kept spending more and more time browsing through logs to resolve issues.

### Moving from Google Pubsub to Convoy

Ikechukwu was introduced to Convoy by a friend, who had heard about some of the challenges faced by the engineering team. After discovering Convoy, they quickly switched from using Pubsub to using Convoy to manage their entire events infrastructure. This move has given them access to granular payload details on every event, which is a big improvement over the summaries provided by Google Pubsub.

“I remember we started integrating it almost immediately because we had been on the lookout for a webhook aggregator that will take away a lot of our debugging stress for a while.” -  Timothy, Engineer at Piggyvest

### Bringing speed and efficiency to event management

Debugging is no longer a tedious task, and the team's experience has completely changed as a result. Engineers on the team now have more time to focus on building products.

If there is an issue with any of their products now, Convoy’s Payload Search with Typesense is the team's most-used feature to quickly locate events for investigating such issues.

“With Pubsub, we were really just shooting in the dark, working blindly, now with this level of visibility we resolve bugs 80% quicker than before”  -  Madu Ikechukwu, Engineering Manager

>There are two major ways to debug event deliveries on your Convoy dashboard. You can either use the search bar, which is configured with a search backend (such as Typesense), or you can use the event filter with options for date, time, status, and endpoints.

### The gift that keeps on giving

When asked what they love the most, Ikechukwu mentioned the ease of setup and the ability to search webhooks. Seeing what happened to an event at a glance is great. Timothy mentioned how easy it is to use and integrate into your workflow. He also loves the dedicated technical support which they enjoy as enterprise customers and the speed with which we ship new updates continuously.

“I love how simple and intuitive the Convoy dashboard is, for a platform that does such heavy lifting in the background. Sometimes, you guys ship updates within hours of raising an issue”  - Madu Ikechukwu, Engineering Manager