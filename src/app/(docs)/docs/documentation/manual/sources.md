---
title: Sources
description: 'Describe Sources in Convoy'
id: sources
order: 11
---

# Sources

Sources are how events are ingested into Convoy. In this section, we explain the different types of sources and their use cases. Convoy currently supports three types of sources: REST API, HTTP Ingested and Message Brokers.

## REST API

This is an authenticated API to push events to a Convoy instance. It is designed specifically for an outgoing projects to push events to a specific endpoint. This source is only and automatically available for all outgoing projects.

## HTTP Ingestion

This is an unauthenticated API to receive webhook events from third-party webhook providers like Github, Shopify etc, It is designed for incoming projects to receive events from any provider. For each provider, a source needs to be configured with its necessary verification. Once configured, we provide you with a unique link to be supplied to the provider.

### Verification

Source verification can be configured in four different ways on Convoy:

1. **Hmac:** Hmac is a common mechanism most providers support for webhooks. Providers like [Shopify](https://www.shopify.com/), [Stripe](https://stripe.com) etc. Creating a Hmac source looks like the below:
   ![create hmac source](/docs-assets/ingest-hmac.png)

For HMAC verification mechanism, Convoy provides support for [simple and advanced signatures](/docs/manual/signatures).

2. **Basic Authentication:** While not popular supported some providers user this mechanism to verify events. Creating a Basic Auth source looks like the below:
   ![create basic auth source](/docs-assets/ingest-basic.png)

3. **API Keys:** Similar to Basic Authentication, API Keys while not popular are used by some providers to verify events. Providers like [Mono](https://mono.co)
   ![create API key source](/docs-assets/ingest-api.png)

4. **Custom Verification:** For some providers, like [Github](https://github.com) and [Twitter](https://twitter.com) the core verification mechanisms aren't sufficient. Though they are wrap around the core mechanisms, these modules have to be built specifically for eah provider.

Currently, we have support for [GitHub](https://github.com), and have planned support for [Twitter](https://twitter.com) and [Shopify](https://shopify.com). You can request new sources by sending an email to `support@getconvoy.io`.

## Message Brokers

Message Brokers provide extra reliability gains to ingest events from backend services to dispatch to client endpoints. With this, disparate services write events to a queue or topic, then convoy reads off the queue or topic and send the events to client endpoint. It is designed for and only available to outgoing projects.

### Google PubSub

To ingest events using Google PubSub, follow the steps outlined below:

1. **Create a PubSub Topic**
   ![create google pubsub topic](/docs-assets/google-pubsub.png)
2. **Create a Subscription**
   ![create a subscription](/docs-assets/create-google-subscription.png)
3. **Create a Service Account with PubSub Admin Role**
   ![create service account](/docs-assets/create-service-account.png)
4. **Generate Service Account JSON Key**
   ![generate service account json key](/docs-assets/create-service-account-key.png)
5. **Configure Source**
   Supply your `Project ID`, `Topic Name`, `Subscription` and upload your service account json key.
6. **Send Events**
   We write `JSON` events into the queue with the following format:
   
    ```json {% file="Sample Payload" %}
     {
       "endpoint_id": "01GTBP6SX313EZN6X3QE29CW6Z",
       "event_type": "compliance.completed",
       "custom_headers": {
          "X-Event-Key": "Event XYZ"
       },
       "data": {}
     }
    ```
    The payload is exactly the same as the one used with our REST API.

### Amazon SQS

To ingest events using Amazon SQS, follow the steps outlined below:

1. **Create an IAM User for authenticating with the SQS Queue and attach the AmazonSQSFullAccess policy to the user**
   ![create IAM user](/docs-assets/create-sqs-user.png)
   ![attach AmazonSQSFullAccess policy](/docs-assets/attach-sqs-policy.png)
2. **Under the security credentials tab for the IAM user, generate a new Access Key. Take note of the Access Key and Secret Key generated**
   ![generate a new access key](/docs-assets/generate-access-key.png)
   ![create CLI access key](/docs-assets/cli-access-key.png)
3. **Create a SQS Queue and specify the ARN of the IAM user under the access policy**
   ![create sqs queue](/docs-assets/create-sqs-queue.png)
   ![add the IAM user under access policy](/docs-assets/access-policy-iam-user.png)
4. **Configure Source**
   Supply your `Access Key`, `Secret Key`, `Queue Name` and `Default Region`.
5. **Send Events**
   We write `JSON` events into the queue with the following format:

    ```json {% file="Sample Payload" %}
     {
       "endpoint_id": "01GTBP6SX313EZN6X3QE29CW6Z",
       "event_type": "compliance.completed",
       "custom_headers": {
          "X-Event-Key": "Event XYZ"
       },
       "data": {}
     }
    ```
    The payload is exactly the same as the one used with our REST API.