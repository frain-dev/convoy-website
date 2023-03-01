---
title: 10 Most common Use Cases of a Webhook Gateway
feature_image: message-brokers-and-convoy.png
post_image: message-brokers-and-convoy.png
primary_author:
    name: Amarachi Aso
    twitter: AsoAmarachi
primary_tag: Product
tags:
    - Convoy
    - Product
featured: false
description: This article considers ten of the most common use cases of a webhook gateway, with emphasis on the features offered by Convoy.
published_at: 2023-03-01T17:00:00.000+00:00
---

# Introduction

A webhook gateway is a Software that sits between a webhook publisher/sender and the
webhook consumer, and serves as a forward and reverse proxy for webhooks. This article
will consider ten of the most common use cases of a webhook gateway, with emphasis on the
features offered by Convoy. Convoy is a high-performance open-source webhooks gateway to manage webhooks end to end.
First of all, here is a list of all ten use cases discussed here:
- Reliable Webhook Delivery
- Routing in Microservices
- Routing with Message Brokers
- Static IP
- Security
- Scale
- Monitoring and Alerts
- Easy Debugging
- Geolocation-Based Routing
- Versioning
### Reliable Webhook Delivery
Webhooks–which are simply HTTP push– fail frequently due to reasons that include but are not limited to downtimes, spikes in network requests, flaky internet, and expired SSL certificates.

A webhook gateway solves this problem when it implements features such as the following:

- Retries: to automatically resend webhook events a specified number of times.
- Circuit breaking: to stop sending requests to endpoints that have failed consecutively, thereby not wasting resources on a dead endpoint.
- Rate limiting; to prevent overloading client endpoints by delivering events at a rate that the client can process.
- Timeouts; to prevent waiting endlessly for response.

A webhook gateway like Convoy exists to ensure the deliverability of your webhook events by implementing these features, while the rest of your application handles other business logic.

### Routing in Microservices

In a microservice architecture, many of the services send out webhook events, they may also receive events from third-party providers. How do you manage these ingress and egress webhooks traffic? A webhook gateway can be deployed and configured to route incoming webhooks to the services where they are to be consumed, in the same manner, it would receive webhook events from your services and forward them to client endpoints. This
flow of events is illustrated in the image below.

![Diagram illustrating flow of events from microservices to client endpoint and vice versa](/blog-assets/microservices-webhooks-gateway.png)

Source: [Why do microservices need a Webhooks Gateway?](https://getconvoy.io/blog/why-do-microservices-need-a-webhooks-gateway)

Webhook gateways are able to determine the destination of webhook events by
cross-checking the header and payload of each request.

### Routing with Message Brokers

Convoy recently announced the release of its Message Broker integrations to ingest
webhooks from backend services to Convoy. For API providers, this means that they will be
able to ingest webhook events from their backend services into Convoy using Message
brokers. Convoy currently supports Google PubSub and Amazon SQS.

Webhook events are asynchronous by nature and Message Brokers were designed to
facilitate asynchronous communication, hence, your webhook deployment that integrates
with message brokers allows you to completely bypass the shortcomings of REST API
Connections when sending webhook events.

![message broker ingestion diagram](/blog-assets/message-broker-ingestion-diagram.png)

The diagram above illustrates Convoy pulling webhook events from a message queue, then
sending them to a client
Convoy allows you to send events through both message brokers and a REST API. Read
more about it in this [blog post](https://getconvoy.io/blog/webhooks-with-message-brokers-and-convoy/).

### Static IP

If you are a third-party webhook provider, your consumer apps that are in sectors where
security is a top priority may have strict security mechanisms that include firewalls. Hence, to
serve these consumers, you need to provide them with a Static IP address from which your
events would be coming for them to whitelist. However, most modern ways of deploying
applications make it such that IP addresses are ephemeral by default instead of Static.

One way to fix this is to deploy a webhook gateway that would serve as a forward proxy for
your webhook-sending application. Convoy allows you to configure your outbound webhook
events with Static IP.
When you send webhook requests from different services running on different VMs using
convoy as your forward proxy, it’s certain that you get to configure only one static IP
address–the one for your convoy deployment.

![diagram that show how the IP of an outbound request changes as it is transmitted to a client's endpoints](/blog-assets/static-ip-of-an-outbound-request.jpg)

The simplified diagram shows how the IP of your outbound requests changes as it is
transmitted to a client's endpoints.

### Security

On the consumer end, the webhook gateway is still the ideal point to implement several
security mechanisms. Both the webhook publisher and the webhook consumer play
complementary roles to secure requests against malicious attackers. Some security
measures that API providers and consumers can apply at the webhook gateway level
include:
- Signed Payload: An API publisher can prevent a replay attack when they sign their payload and include a generated timestamp to their signature on each request. On the consumer side, the signed payload would be matched against each expected variable, to verify that the signature has not been altered.
- Static IP: A consumer app would be able to verify that the Static IP address of all incoming webhook events is whitelisted.
- Mutual TLS: Consumer apps equally use mutual TLS to ensure that connection requests from third-party providers are truly from the said provider.

### Scale

We live in a world of APIs. Since APIs are the glue that holds the digital world together, it is
not surprising that billions of webhooks are delivered every day. Below is an example of a
[Shopify BFCM Webhooks stats](https://twitter.com/ShopifyEng/status/1597983929654710278?s=20&t=imFyGdlmjo16ZNAm6ZFfnw):

![Shopify BFCM Webhooks stats](/blog-assets/shopify-BFCM-webhooks-stats.png)

With a webhook gateway handling all of your webhook traffic, you can independently scale
up and down during and after peak periods. This also means that your webhooks
implementations stay decoupled from the rest of your backend services. If your webhook
gateway is a SaaS like [Convoy Cloud](https://dashboard.getconvoy.io/), the developers in
your product team do not have to get deeply involved in the webhook implementation nor get
caught up in its complexity, permitting them to focus on your core business product.

### Monitoring and Alerts

Webhooks fail all the time, one reason is that App owners are constantly pushing changes to their apps. It is good behaviour for a webhook delivery system to be able to inform the app owner when their app is down. Convoy does well in this area as it allows you to implement different solutions for monitoring. For example, you can monitor uptime or monitor the average request per minute on your webhooks route, and flag it when they're below a certain threshold. Also, after an endpoint consistently fails, Convoy disables the endpoint and sends an email to the developers to triage.

### Easy Debugging

In addition to enabling monitoring, a webhook gateway can make it easier to debug failed webhook requests. For example, convoy includes a web interface where an operator can filter through event logs, search through the webhook payloads, see the response body from each request, discover the point where a webhook is failing, and even manually resend these webhooks. The dashboard is available to you whether you are an API provider or a consumer.

### Geolocation-Based Routing

Another possible way to use your webhook gateway to scale your product is to deploy instances of it
at various locations closer to your consumers. Routing webhook requests based on clients'
location works similarly to the traditional API Geolocation Based Routing. There are several
factors to put into consideration when deciding whether you need a geo-location-based
routing solution. But the end result is the same when you do decide to implement it: you
primarily mitigate issues caused by latency. To illustrate how this would work in a real
application; your backend services are deployed in a server in the UK, but you have
consumer apps running in India. When you deploy convoy as your webhook gateway
closer to India and write webhook events to a message broker, Convoy automatically
receives them and then routes them to your clients in India. Routing these events to clients
in India would involve lesser network overhead because of the location of your webhook gateway. 

This practice is common with API gateways, we think that in the case of a webhook gateway, this might only be relevant for a large company with several consumers in distant parts of the world.

### Versioning

Webhook requests signatures evolve over time either in response to bug reports or the need
for a new feature, but as they evolve, versioning these signatures become important as you
gradually face out old features. Versioning also allows API consumers to adopt new changes
to the signature at their own pace. The Convoy OSS and Cloud software also supports this
feature.

## Conclusion

So far you have seen the most common ways that one can utilize a webhook gateway.
Convoy democratizes the best features of webhook infrastructures used at big techs like
Stripe and PagerDuty into a single binary. When setting up Convoy for your product, you can
pick any of these features that suit your needs right out of the box. You’re welcome to try out
the OSS or [Cloud](https://dashboard.getconvoy.io/signup) software today.