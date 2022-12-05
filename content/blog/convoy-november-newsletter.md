---
title: Convoy November Newsletter
feature_image: november-newsletter.png
post_image: november-newsletter.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: News
tags:
    - News
featured: false
description:
published_at: 2022-12-05T13:00:00.000+00:00
---

> This is a re-publishing of our monthly newsletter sent to subscribers earlier this month. [Sign up to receive future email newsletters.](https://getconvoy.io)

Hi there, 

November was an exciting month for us at Convoy. We shipped many new features, improved performance and designed a new dashboard experience. Let's dive in!

## New Updates
The following updates include everything we shipped last month

1.  **Subscription Filtering**  
    We launched subscription filtering this last month! This is one of our most exciting features. With this, webhook consumers can filter events they receive based on the payload. This includes two types of filters, from simple exact matches to complex matches like $or, $in etc. We wrote an entire blog post about this release here. Enjoy!
 
2. **Deprecated Applications**  
    To simplify integrating Convoy, we entirely deprecated the concept of applications. Applications were a concept we introduced to describe backend apps receiving events from a webhook provider. We have since realised this was unnecessary, creating a higher learning curve for our users. In this update, users can immediately create endpoints and send events. Because this was such a significant update, we have made this update a backwards-compatible upgrade preventing downtime for our current users. 
 
3. **Portal links**     
    After deprecating applications, the "app portal" automatically became obsolete, so we redesigned it and launched Portal Links. These are a more flexible mechanism for generating customer-facing dashboards scoped to one or more endpoints. Head over to our documentation to learn more!
 
4. **New Events Dashboard and Event Log**   
    Also, eliminating applications enabled us to present an easier-to-use events dashboard to debug endpoints downtime faster. Then we introduced a separate events log page as a reference for all events sent to Convoy regardless of your project type. 
 
5. **Pricing Page**     
    Last but not least, we put our new Cloud pricing plans here. If you do not see a plan that works for your use, please do not hesitate to reach out. Important notice to our current customers' billing will commence in January 2023. 

## From our blog

- [How To Debug Your Webhooks With Convoy CLI](/blog/debug-your-webhooks-with-convoy-cli)  
Debugging webhook events can be very tedious; many times, you are required plumb together multiple tools to get it to work end to end. This article demonstrates the Convoy CLI tool to enable debugging webhooks easier for consumers.
 
- [Webhooks Failure Notifications With Convoy](/blog/webhoook-failures-notifications-with-convoy)     
It is the responsibility of a good webhook delivery system to send out a form of automated notification on these delivery problems. Learn how Convoy handles webhook failures notification in this article.
 
- [Sending Webhooks With Rails](/blog/sending-webhooks-with-rails)     
Join Subomi in this article on how to build a Todo API with Rails and send webhook events to an endpoint for every CRUD operation on the API.
 
- [Sending Webhooks With FastAPI](/blog/sending-webhooks-with-fastapi)   
Join Abdulazeez in this article on how to build a Todo API with FastAPI and send webhook events to an endpoint for every CRUD operation on the API.
 
- [Sending Webhooks With Flask](/blog/sending-webhooks-with-flask)
Join Abdulazeez in this article on how to build a Todo API with Flask and send webhook events to an endpoint for every CRUD operation on the API.
 
- [Subscriptions Filtering in Convoy](/blog/introducing-subscriptions-filtering)  
Often, webhook consumers depend on only a fraction of the webhook events it receives. Learn how to route webhook events to endpoints based on payload structure in Convoy.
 
- [Sending Webhooks With Laravel](/blog/sending-webhooks-with-laravel)    
Join Dotun in this article on how to build a Todo API with Laravel and send webhook events to an endpoint for every CRUD operation on the API.
 
That's all the updates we have for you for now! If you're excited about Convoy, please don't forget to give us a star on [GitHub](https://github.com/frain-dev/convoy) and follow us on [Twitter](https://twitter.com/getconvoy) for more updates. 
