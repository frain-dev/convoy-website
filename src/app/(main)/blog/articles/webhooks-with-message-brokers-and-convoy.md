---
title: Webhooks with Message Brokers and Convoy
feature_image: message-brokers-and-convoy.png
post_image: message-brokers-and-convoy.png
primary_author:
    name: Dotun Jolaoso
    twitter: dotunj_
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
    - Engineering
featured: false
description: Today, we’re excited to announce the upcoming release of our Message Broker integrations to ingest webhooks from backend services to Convoy. Starting in Convoy v0.9, API providers will be able to ingest webhook events from several backend services into Convoy using Message brokers, starting with Google PubSub and Amazon SQS.
published_at: 2023-02-17T17:00:00.000+00:00
---

# Background

Convoy is the fastest open-source webhooks gateway available today. It allows engineers securely send, receive and manage webhooks with robust support for retries, rate limiting, static IPs, circuit breaking, zero-downtime secrets upgrades and more. It is common wisdom in growing teams and organisations, that creating shared services for stream aligned teams is a sure way to improve developer productivity across the organisation. This is one of the core tenets and the factors driving the rise of platform engineering today. 

Our mission with Convoy, is to build a high-performance, consistent toolchain for your webhooks management serving multiple backend services to send and receive webhooks. Today, we’re excited to announce the upcoming release of our Message Broker integrations to ingest webhooks from backend services to Convoy. Starting in Convoy v0.9, API providers will be able to ingest webhook events from several backend services into Convoy using Message brokers, starting with Google PubSub and Amazon SQS.

In this article, we explain why this is important and why you should care. 

## HTTP Ingestion Technique

![HTTP Ingestion](/blog-assets/http-ingestion-technique.png)

Event flow from your backend services to Convoy to client endpoints.

To begin, we take a look at the current state of the world with Convoy. From the image above, events flow from your backend services to Convoy via our REST API. This event ingestion technique has some shortcomings like: 

### Synchronous Communication

The HTTP protocol is essentially a synchronous communication protocol, where a response is required for every request sent and a client can only send a request to one server at a particular time. This doesn’t map very well to webhook events. Webhook events are asynchronous by nature, delivering them to your webhooks gateway is/should be an asynchronous action by default. These events are usually consumed by more than one service (including the webhooks gateway). Let’s take an example the invoice service generates `invoice.created`event, this event has three consumers - The Delivery Service, The Data Warehouse and the Webhooks Gateway. This operation is well suited for the publish and subscribe pattern of message brokers than HTTP calls.

### Zero Message Delivery Guarantee

Webhook events exist on a spectrum from events with at-most once delivery guarantee requirement to events with at-least once delivery guarantee requirement. This means that missed events for the critical webhook events will result in critical business workflow failures.

The HTTP protocol isn’t sufficient to provide message delivery guarantees for webhook events. Ad-hoc solutions like retries work on to reduce the probability of missing events but Message Brokers provide message delivery guarantee at the protocol level, which allows them to be better-suited for scenarios like this.

### Zero Fault Tolerance

The HTTP protocol is not a fault tolerant protocol. The network is reliable is one of the fallacies of distributed computing. Hi-cups can exist for several reasons; a DDOS attack, rate limited servers under load, a switch or a power failure, server misconfiguration etc. Systems have to be designed to with-stand such failures.

A simple HTTP Post request isn’t fault tolerant, and while it is possible to design an HTTP Ingester to be fault tolerant. This would increase the complexity of our HTTP servers tremendously. Message brokers are a natural here. They’re designed from ground-up to be fault tolerant. They’re well understood and battle-tested for such users, and so when webhooks delivery is critical, they’re a more suitable alternative to deliver the webhooks to your webhooks gateway. 

## Message Broker Ingestion

![Broker Ingestion Technique](/blog-assets/broker-ingestion-technique.png)

Event flow from your backend services to Convoy showing both a message broker and REST API Connection.

From the image above, events can flow to Convoy via our REST API and through a Message Broker. This technique and flexibility provide more advantages over the strictly HTTP method in the earlier design.

### Asynchronous Communication

Webhook events are asynchronous by nature. Message Brokers were designed to facilitate asynchronous communication among services. They implement the Pub/Sub pattern. In its simplest form, Pub/Sub has two components; **producers and subscribers.** Producers communicate asynchronously with subscribers by publishing or broadcasting events.

Tailoring this down to our use case with API providers, this means providers (**producers**) can send webhook events to a message broker with or without regard to how or when these are events to be processed, and your webhooks gateway (**subscriber**) automatically pick these events, processes them and dispatches to their respective client endpoints. The asynchronous integration between the API provider and the webhooks gateway enhances the flexibility and robustness of your webhook infrastructure.

### Scalability

Message brokers are generally built for massive scalability. For example, Google proudly uses its Pub/Sub infrastructure for sending a massive number of messages internally, reaching over 500 million messages per second and over 1TB/s of data. Message brokers have the ability to manage heavy request loads and sudden increases in demand, resulting in the capability for providers to send even more events per second when compared to HTTP. 

### Loose Coupling

Loose coupling is a design strategy in which a system’s components have minimal knowledge of other components. Integrating with the REST API introduces tight coupling between the provider and Convoy. If for example, there’s a breaking change on one of Convoy’s endpoints, you’d usually have to update your integration to cater for the breaking change. However, using a message broker, the provider and Convoy are decoupled, meaning that they don’t need to be aware of each other’s existence.  This makes it easier to build large-scale, complex microservices that are composed of many loosely-coupled components.

### High Availability

Message brokers are designed to be highly available and fault tolerant. With HTTP for example, if the Convoy server is down, the provider will not be able to send events until the server is back online. With a broker on the other hand, messages will still be stored on the broker and delivered when the failure has been resolved. This helps ensure that messages are not lost and that your webhook infrastructure remains available, even in the face of failures. 

### Enhanced Flexibility

Message brokers allow you add multiple subscribers or consumers pulling event from the same queue. Convoy will allow you to be able to specify the number of workers or subscribers you want pulling and processing messages from the queue. This will help to distribute the workload among multiple subscribers, further increasing throughput and the overall performance of your webhook systems. 

# Conclusion

Convoy is the first ever open-source webhooks gateway to manage millions of  webhooks end-to-end. If you’re exploring solutions for your webhooks, we welcome you to try out [Convoy Cloud](https://dashboard.getconvoy.io/signup) for free today. If you have any questions or you’d like to nerd out about webhooks, feel free to join our growing community on [slack](https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ).

Finally, if you’ll love to see a demo of this feature, why not register [here](https://docs.google.com/forms/d/e/1FAIpQLScmJHY41EKaJRlN1cKhYdQk8XIIocVz2GZx1Xb7q-KuIVPRrg/viewform) for our Convoy v0.9 launch party.  We can’t wait to see you there.
