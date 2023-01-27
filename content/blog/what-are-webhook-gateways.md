---
title: What are Webhook Gateways?
feature_image: webhook-gateways.png
post_image: webhook-gateways.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false
description: A webhook gateway is a webhook management tool that sits between a webhooks provider and webhooks consumer. It acts as a reserve proxy for webhooks. It can be deployed by both the API provider that sends webhooks and the consumer that receives webhooks to handle webhook events multiplexing and de-multiplexing respectively. 
published_at: 2023-01-23T18:00:00.000+00:00
---

# What is a Webhook Gateway

A webhook gateway is a webhook management tool that sits between a webhooks provider and webhooks consumer. It acts as a reserve and forward proxy for webhooks. It can be deployed by both the API provider that sends webhooks and the consumer that receives webhooks to handle webhook events multiplexing and de-multiplexing respectively. 

# Why use a Webhook Gateway?

In today’s world of ever changing user requirements, speed is a competitive advantage. Development teams are required to move fast and deliver user value. More teams are adopting a serverless, micro-service, and service-oriented architecture to move fast. Teams are leveraging technologies like an API Gateway to consolidate duplicate tasks like authentication, rate limiting, circuit breaking etc. while product teams focus on their core business. With webhooks, teams and tech leads would need to answer the following questions:

1. How can we provide a consistent infrastructure to receive events from third-party providers and route these events to one or more micro-services to handle them?
2. How can we provide a consistent infrastructure to collect events from multiple backend services and send them to client endpoints?
3. How can we consolidate duplicate webhook responsibilities like endpoint authentication and security, rate limiting, and endpoint failure notifications?
4. Similar to API Gateways, how can we increase developer efficiency across the organisation, where webhooks become plug & play?
5. How can we provide an independent infrastructure to scale to handle webhooks traffic in peak periods? See [Shopify BFCM Webhooks Stats](https://twitter.com/ShopifyEng/status/1597983929654710278?s=20&t=imFyGdlmjo16ZNAm6ZFfnw).

Your challenge is offering developers in your organisation a simple and dependable experience in the face of any webhooks complexity. A webhook gateway is a way to decouple all your microservices from your webhooks implementations. When a microservice needs to send a webhook event, they should write to the broker, the webhook gateway receives it and routes them to the right endpoint(s), whilst keeping track of everything.

# Architecture of Webhooks Gateway

![Webhooks Gateway Architecture](/blog-assets/webhook-gateway-architecture.png)

The diagram above provides an high level view of how a webhook gateway operates. We used AWS specific elements but this can be any cloud environment - Azure, GCP, Digital Ocean, etc or even On-Prem. The arrows from the left show the flow of traffic from your backend services to client endpoints on the right, and the arrows from the right show the flow of traffic from third-party providers like (stripe, twilio, etc.) to your backend services for processing. 

Generally, to avoid vendor lock-in, a webhook gateway will (should) provide support for multiple broker systems like Amazon SQS, Google PubSub, Kafka etc. to allow you use the best broker for your scenario. Visit this [page](https://getconvoy.io/docs/deploy/architecture) to learn about Convoy's internal architecture.

# API Gateways vs. Webhook Gateways

Webhook gateways share similarities with API gateways

|  | API Gateway | Webhooks Gateway |
| --- | --- | --- |
|  Entrypoint | Entry into the API. | Exit from the API. |
|  Key Metric | Throughput & Latency | Throughput |
|  API Type | Synchronous API | Asynchronous API |
|  Protocols | Multiple Protocols - HTTP, Websockets, gRPC | HTTP |
|  Message Format | JSON, XML & Protocol Buffers. | Mostly JSON. |

# Conclusion

Convoy is the first ever open-source webhooks gateway to manage millions of  webhooks end-to-end. If you’re exploring solutions for your webhooks, we welcome you to try out [Convoy Cloud](https://dashboard.getconvoy.io/signup) for free today. If you have any questions or you’d like to nerd out about webhooks, feel free to join our growing community on [slack](https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ).
