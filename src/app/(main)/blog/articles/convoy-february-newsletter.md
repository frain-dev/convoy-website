---
title: Convoy February Newsletter
feature_image: feb.png
post_image: feb.png
primary_author:
    name: Lotanna Nwose
    twitter: viclotana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false
description: This is the February 2023 re-publishing of our monthly newsletter sent to subscribers earler this month. View to subscribe for future email newsletters.
published_at: 2023-03-08T17:00:00.000+00:00
---
Hi Engineer 👋

Happy new month, I hope you are well. Today, we are going to do a quick recap of what exciting things happened last month at Convoy, from our 0.9 release candidate party to the new features now available and the ones coming really soon. 

### Google Pubsub and Amazon SQS Ingest Support

![Message broker dashboard Screenshot](/blog-assets/pubsub.png)

This is a community favourite! We are super happy to announce that with the new release, Convoy 0.9 RC allows different options for ingesting webhook events asides HTTP. You can now do so directly from message brokers such as Google Pubsub and Amazon SQS.

### New Onboarding Dashboard Updates

A few changes has been made to the dashboard, mostly around onboarding for new users. You now have a waiting-on-events screen when you create your first outgoing project with clear instructions around setting up ingestion. 

Also, after creating an incoming project, you will now see a modal with the source URL and clear next-step instructions. For old users, the delivery attempt HTTP status code background color now shows green for 2xx and red for any other code.

### We migrated from Mongo DB to Postgres

![Mongo DB to Postgres Screenshot](/blog-assets/db.png)

Just before February ended, we had an event to launch Convoy 0.9 release candidate, a lot of exciting things were talked about. One of which was announcing that we have now migrated our DB from Mongo DB to Postgres. Our CTO and CEO had a conversation about it and highlighted why this migration was necessary and the thought process behind it. [Watch the launch event here](https://www.youtube.com/live/H5xiG7EU9XU?feature=share&t=409). Go over the exciting blogs, we have one more exciting news!

### New **Blogs to Read this week**

1. [Read all about Webhooks with Message Brokers and Convoy](https://getconvoy.io/blog/webhooks-with-message-brokers-and-convoy)
2. Are you a platform engineer, [read about Webhook Gateways](https://getconvoy.io/blog/webhook-gateways-for-platform-engineers) 
3. [Another Big & Exciting news from Convoy](https://getconvoy.io/blog/hitting-1k-github-stars-at-convoy)
4. [10 most common use cases of Webhook Gateways](https://getconvoy.io/blog/10-most-common-use-cases-of-a-webhook-gateway)

### Features to look forward to

As you know, [we have a public roadmap](https://github.com/orgs/frain-dev/projects/3/views/1) where you can follow our journey and see what we are shipping next, some of which would include stable release of Convoy 0.9, Convoy Community and Enterprise Editions, and Webhooks idempotent keys 💫 

That's all the updates we have for you for now! If you're excited about Convoy, please don't forget to give us a star on [GitHub](https://github.com/frain-dev/convoy) and follow us on [Twitter](https://twitter.com/getconvoy) for more updates and see you by month end!