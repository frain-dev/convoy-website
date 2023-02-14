---
title: Convoy January Newsletter
feature_image: jan-newsletter.png
post_image: jan-newsletter.png
primary_author:
    name: Lotanna Nwose
    twitter: viclotana
primary_tag: News
tags:
    - News
featured: false
description: This is a re-publishing of our monthly newsletter sent to subscribers earler this month. View to subscribe for future email newsletters.
published_at: 2023-02-14T17:00:00.000+00:00
---

Hi Engineer 👋 

Happy new year and welcome to the very first Convoy newsletter of 2023. As usual, I would highlight a couple new and exciting features we now have, some cool features to watch out for in our next release and list of great content from our blog and upcoming events.

### New Product Updates

1. **You can now re-generate API keys for your projects**: Currently, `API Keys` are shown immediately after project creation. If the `API Key` wasn't copied at this stage, it is impossible to either create a new `API Key` or use the project via the `API`. Users have to create a new project from scratch for this in the past, now engineers can re-generate new `API Keys` for their projects.
2. **More config values for data retention**: Sometimes, engineers create  and persist instance settings in the database, configuration for this did not exist on the convoy.json file, now it does. Now that json file serves as a proper superset of all instance settings and can be modified from there, any updates to our instance configuration through any of the static config means will overwrite the database settings.
3. **New Pricing packages**: Convoy cloud is free for developers forever, this is a commitment we are making to builders to keep building while Convoy manages your webhooks infrastructure for free. We have also updated [the pricing page](https://getconvoy.io/pricing) here for engineering teams to have a look, we answered a lot of the questions you might already have.
4. **Notifications by Default**: Before now, it was optional for users to disable endpoints and then notify owners of such endpoints about endpoint failures, however a lot of users do not seem to use this judiciously causing webhooks to be sent to dead endpoints. Now, endpoint failure notifications are sent out by default and we disable endpoints once the max retries is reached solving for dead endpoints and making it good practise for customers to adopt our customer-facing dashboards for managing their endpoints.
5. **New Landing Page**: We made a redesign that better fits where we are at today at Convoy. We believe Engineering teams are already conversant with API Gateways, Convoy is exactly that for incoming and outgoing webhooks. For customers, you can now login to your dashboard straight from [the landing page](https://getconvoy.io).

### **Exciting Blogs to Read**

1. You know about API Gateways like Kong, do you know about [Webhook Gateways](https://getconvoy.io/blog/what-are-webhook-gateways)?
2. Our Product Roadmap is now public, [read about what led to this decision here](https://getconvoy.io/blog/making-convoy-webhooks-gateway-roadmap-public).
3. Learn how to [send webhooks easily with Express JS](https://getconvoy.io/blog/sending-webhooks-with-expressjs) here.
4. Learn how to [send webhooks easily with Gin here](https://getconvoy.io/blog/sending-webhooks-with-gin).
5. Read how to [replicate PagerDuty’s V3 Webhooks with Convoy](https://getconvoy.io/blog/lets-replicate-pagerduty-webhooks).
6. Do you know [why your Microservices need a Webhooks Gateway](https://getconvoy.io/blog/why-do-microservices-need-a-webhooks-gateway)?

### Upcoming Events

We are having a virtual launch party for our next release Convoy 0.9, on the 27th of February 2023. You should **[register to attend here](https://forms.gle/JCkN66YYjKcUK6RG9)** because a few exciting news would be shared, some of which includes support for Google Pubsub and Amazon SQS. You do not want to miss it!

That's all the updates we have for you for now! If you're excited about Convoy, please don't forget to give us a star on [GitHub](https://github.com/frain-dev/convoy) and follow us on [Twitter](https://twitter.com/getconvoy) for more updates.

