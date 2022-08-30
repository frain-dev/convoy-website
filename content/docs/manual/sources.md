---
title: Sources
description: 'Describe Sources in Convoy'
id: sources
order: 11
---

Sources
======
Sources are how events are routed into the system. In this segment we discuss the various types of sources and their use-cases.

## Types
There are 2 event source currently supported:
### **REST API** 
This is an authenticated API to push events to a Convoy instance. It is designed for an outgoing event project to push events to a specific application. This source is only and automatically available for all outgoing projects.

### **HTTP Ingestion**
This is an unauthenticated API to receive webhook events from third-party webhook providers like Github, Shopify etc, It is designed for incoming projects to receive events from any provider. For each provider, a source needs to be configured with it's necessary verification. Once configured, we provide you a unique link to be supplied to the provider. 

#### Verification
Source verification can be configured in 4 different ways on Convoy:
1. **Hmac:** Hmac is a common mechanism most providers support for webhooks. Providers like [Shopify](https://www.shopify.com/), [Stripe](https://stripe.com) etc. Creating a Hmac source looks like the below:
![create hmac source](/docs-assets/ingest-hmac.png)
2. **Basic Authentication:** While not popular supported some providers user this mechanism to verify events. Creating a Basic Auth source looks like the below:
![create basic auth source](/docs-assets/ingest-basic.png)
3. **API Keys:** Similar to Basic Authentication, API Keys while not popular are used by some providers to verify events. Providers like [Mono](https://mono.co)
![create api key source](/docs-assets/ingest-api.png)
4. **Custom Verification:** For some providers, like [Github](https://github.com) and [Twitter](https://twitter.com) the core verification mechanisms aren't sufficient. Though they are wrap around the core mechanisms, these modules have to be built specifically for eah provider. Currently, we have support for [Github](https://github.com), and have planned support for [Twitter](https://twitter.com) and [Shopify](https://shopify.com). You can request new sources by sending an email to `support@getconvoy.io`.
