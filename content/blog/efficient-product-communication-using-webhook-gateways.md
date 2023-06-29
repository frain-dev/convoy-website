---
title: Building great relationships with your Customers with Webhook Gateways
feature_image: maple.png
post_image: maple.png
primary_author:
    name: Lotanna Nwose
    twitter: viclotana
primary_tag: Customer Stories
tags:
    - Convoy
    - Customer Stories
featured: false
description: Maple Billing Customer story about how they use Convoy to enforce efficiency and facilitate communications with their customers as a Notifications is a core part of their business. 
published_at: 2023-06-29T17:00:00.000+00:00
---
## Stripe + Baremetrics + Docusign

What do you get when you combine the Stripe core product with the subscription idea of Baremetrics and the contract handling abilities of Docusign, you have Maple Billing. [Maple Billing](https://maplebilling.com) is an end-to-end billing workflow product that enables experimentation-ready billing capabilities for engineering, product, sales and revenue teams with just a few lines of code.

I had a chat with the co-founder Aswinkumar Rajendiran about efficiency in the developer experience space, and he told me the two major things every engineering team needs today are automation and good tools for things like infrastructure, testing, Continuous Integration, and deployments.

## Notifications as a core business offering

Aswinkumar explained that at Maple Billing, notifications are a core business offering and something they pay serious attention to. They use webhooks to inform all their customers across multiple events, such as when they get a new customer, or when they have a new subscription, to subscription changes such as downgrade and upgrade of plans, and even trial service notifications. They also send business insight notifications such as how much your MRR has increased in a given period.

“Notification is a huge piece of our business operations today and we use webhooks quite frequently for sending these notifications”

## The Build vs Buy Question

For a product like this, the event delivery infrastructure has to be very solid, and Aswinkumar considered building an implementation for webhooks at Maple Billing at first. However, being in the early stages, he wanted the team to focus more time and resources on building out the core product, so he did a Google Search for Webhooks Gateways, and he found [Convoy](http://getconvoy.io). He loved the fact that it is an open-source project so he was not worried about any lock-ins yet, he then [joined the community](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email).

## The “Progress” Pitch

At the time Convoy was using MongoDB as a primary datastore and that lacked a good schema and data migration tool for self-hosted users. For us, this reduced our velocity to ship new features without fear of breaking customers’ deployment. For Maple Billing, who used Postgres, this meant they were not as keen to integrate Convoy. A couple of weeks later we migrated our datastore to PostgreSQL and they integrated Convoy****.****

>💡 [Read about the Convoy 0.9 Release here](https://getconvoy.io/blog/convoy-0.9)

“I was part of the community for a while and then after the Postgres implementation, I was just excited. We were very hesitant with MongoDB because we self-host Postgres, Mongo tends to get expensive over time.”

The team loves the ease of integration and the out-of-the-box support for scale.

## The most efficient way to receive Webhooks

The team at Maple Billing had never had to worry about webhooks since the integration. In fact, they have built an amazing product, looking at their documentation you can see how more work has been done. They even recommend Convoy to their customers [in their Docs](https://maplebilling.readme.io/reference/webhooks), so they too can receive Maple Billing webhooks easily and have a great developer experience all-round.