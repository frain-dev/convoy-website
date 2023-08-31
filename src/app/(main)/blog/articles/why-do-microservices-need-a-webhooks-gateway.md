---
title: Why do microservices need a Webhooks Gateway?
feature_image: microservices-webhooks-gateway.png
post_image: microservices-webhooks-gateway.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false
description: In this article, we will discuss why webhooks gateways are relevant to the microservices architecture, and what common features are found in the webhooks gateway. Finally, we will discuss some of the caveats to bear in mind while adopting a webhooks gateway.
published_at: 2023-02-01T15:00:00.000+00:00
---

A Webhook Gateway serves as a forward and reverse proxy to send and receive webhooks to client endpoints and from third-party providers. They are designed to enforce security, resilience and high availability on all webhook events for an organisation. We wrote a more detailed description [here](https://getconvoy.io/blog/what-are-webhook-gateways). 

![A schematic diagram showing the flow of events in both directions.](/blog-assets/microservices-webhooks-gateway.png)

The image above describes of the flow of webhook events from the microservices to client endpoints as well as from third-parties to the microservices. In this article, we will discuss why webhooks gateways are relevant to the microservices architecture, and what common features are found in the webhooks gateway. Finally, we will discuss some of the caveats to bear in mind while adopting a webhooks gateway.

## Why Do We Need Webhook Gateways?

The various advantages  of a microservice architecture subsequently present unique challenges that Webhook Gateways are purpose-built to address.

### Centralised Infrastructure to Decentralised Microservices

Microservice architectures split up several functions of an application into separate services, that are owned by different teams. This separation is typically based off a common domain e.g. Payments service, Notifications service etc. This design pattern engenders each team to build, deploy and maintain their services independently. Unlike a monolith application, teams are able to increase velocity and deliver features faster. This approach means increased complexity for webhooks management: How are we able to route webhook events from third-parties to the right microservice(s)? How are we able to route webhook events from backend services to client endpoints.

This is where a webhooks gateway comes in. They’re able to provide a central infrastructure capable of ingesting, routing webhooks both internally to backend services and externally to client endpoints. This central platform also reduces the learning curve for new teams to add webhooks to their services.

### Microservice Language and Protocol Agnostic

One of the major benefits of the microservice  approach is the ability for teams to utilise the best tools for the job. For example, one team can decide to build their API using Rails, GraphQL and MongoDB, while another team can decide to build their API using Golang, gRPC and PostgreSQL. 

Regardless of the technology stack chosen by each team. Webhooks gateways rely on a consistent payload structure to send to client endpoints and an endpoint to receive from third-party. As long as the payload format and structure remains consistent, developers can implement the business logic with any technology stack they prefer. While leaving the gateway to cross-cutting concerns like retries, rate limiting and signing the payload.

Services can be re-written from Python to Rust and redeployed with the Gateway. To the client endpoints, the payload remain the same, and it can continue to rely on the payload format and structure to remain the same.

### Routing to Microservices based on payload structure

When webhooks are ingested into your systems from third-party providers, in a monolith all events are routed to the same application all the time. However, in a microservice architecture, one or more microservice(s) can rely on the event from the provider to carry out separate actions. 

Webhook Gateways can be configured to receive events and route them to one or more destinations. They can match both headers and payload to determine webhooks destination.

### Traffic Control to prevent overloading of resources

Internet-facing services are common targets for malicious attacks and exploitation. They need to handle sudden spike in requests from valid users and bad actors. This requires features like request throttling and blacklist capabilities to keep systems reliable and secure.

Webhook Gateways are an effective barrier against Distributed Denial of Service (DDoS) attacks—throttling the number of requests made to affected services, so the service isn’t overwhelmed and protecting it against becoming unresponsive.

## Common Features & Benefits

A Webhook Gateway is located at the outer edge of your microservices and acts as a proxy to manage all ingress and egress webhooks traffic. The Webhook Gateway handles several features like:

### Security

Webhook Events sent to client endpoints need to be securely delivered to client endpoints. Clients need to validate that the message has not been tampered with in transit, they need to know that events are not being re-transmitted by malicious actors, in some sensitive environment they need to authenticate the webhook provider and authorise their IP address through their network firewall.

When receiving events from third-party providers (e.g. Stripe, Twilio ), consumers need to verify the webhooks before routing them to backend services for processing. 

Webhooks Gateway are able to centralise cross-cutting concerns like webhooks security and securely receive events from backend services, sign the payload, timestamp the payload, and deliver them reliably with static ip address. Since they exist at the outer edge of your microservices they are able to prevent exposing any of your backend services directly to the internet and reduces the attack surface area for malicious actors.

### Resilience

Managing HTTP Endpoints is one of the core responsibilities of a Webhook Gateway. Standard webhooks flow is a post request to an endpoint, and expect a 2xx status code in return, indicating success. However, these endpoints fail from time to time for several reasons: flaky networks, spike in traffic, code or infrastructure changes that resulted in a downtime, degraded performance in client’s application dependencies.

Due to the various types of issues that can prevent reliable webhooks delivery, webhook Gateways add important features like timeouts; to prevent waiting endlessly for response, retries; to automatically re-transmit webhook events, rate limiting; to deliver events to client endpoints at a steady pace the client can process, and circuit breaking; to prevent wasting system resources on zombie endpoints (i.e. endpoints that have failed consecutively over time)

### Customer-Facing Dashboard

Debugging webhooks delivery is an important aspect of the responsibilities of a webhooks providers to clients. Best practise enables engineers to debug webhook delivery without a human interaction with the engineering team of the provider.

Webhook Gateways provide such utility to generate rich customer-facing webhooks dashboard where users can directly (zero human intervention) debug webhook delivery issues and fix failing endpoints with a few clicks.

### Multiple Data Source Options

A Webhook Gateways need to be flexible and versatile. Microservices emit events through various channels. For example, building on Google Cloud, developers will often use Google PubSub to emits happening in one or more microservices, similar to AWS for Amazon SQS, and other tools like Kafka and RabbitMQ. 

Plugging into all these options make a webhooks gateway such a versatile tool for streaming webhook events from multiple event-generating microservice to send the events to the client endpoints.

## Caveats of using Webhooks Gateways

While there are several benefits with deploying a Webhooks gateway, there are some caveats to keep in mind when adopting a webhooks gateway for your organisation, such as:

The webhooks gateway is a new software component in your environment. It would require learning and building expertise in it. Platform Engineers and SREs will need to integrate, deploy and maintain this new software component and build production excellence running the webhooks gateway.

By design, a webhooks gateway is responsible for webhooks traffic (inbound and outbound) of your organisation, This, therefore, becomes a single point of failure for the entire organisation. Webhooks gateway then need to be designed for high availability to ensure no data loss for any webhook traffic. 

In the end, webhooks gateways aren’t one-size fit all. You can build a webhook gateway in-house or acquire an off-the-shelf solution like Convoy, while analysing your systems unique requirements.

## Final Words

A Webhook Gateway can enhance your microservice-based application with capabilities like secure webhooks delivery with signatures, static ips, resilience with retries, rate limiting, and customer-facing webhooks dashboards. However, before adding a webhooks gateway to your application architecture, you need to to understand what problems you’re trying to address, what events you’ll be sending and if the product you are choosing offers those features.

Convoy is the fastest open-source webhooks gateway available today. With Convoy, you’ll be able to configure advanced event routing, incoming and outgoing of webhooks, customer-facing webhooks dashboard, and securely deliver events with payload signing and static ips.

If you're exploring solutions for your webhooks, we welcome you to try [Convoy Cloud](https://dashboard.getconvoy.io/signup) for free today. If you have any questions or you'd like to nerd out about webhooks, feel free to join our growing community on [Slack](https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ)
