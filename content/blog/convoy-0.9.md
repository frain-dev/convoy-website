---
title: Convoy v0.9
feature_image: convoy-0.9.png
post_image: convoy-0.9.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
featured: false
description: Convoy v0.9 stable release has landed 🎉. We’ve been working on these improvements and we are super excited to share this release. This release includes a migration to PostgreSQL as our default datastore store, includes integration with message brokers such Amazon SQS & Google PubSub, a new client CLI and an improved Dashboard experience.
published_at: 2023-03-29T16:00:00.000+00:00
---

Hey Friends, 

Convoy v0.9 stable release has landed 🎉. We’ve been working on these improvements and we are super excited to share this release. This release includes a migration to PostgreSQL as our default datastore store, includes integration with message brokers such Amazon SQS & Google PubSub, a new client CLI and an improved Dashboard experience. Lets go

### PostgreSQL

In the past, we’ve shared our pain of dealing with MongoDB, and how using it as our primary datastore hasn’t been the best architectural decision. But we can summary them with the following: 

- For self-hosted users, the lack of a good migration tool for schema and data migration reduced our velocity to ship new features without fear of breaking their deployment.
- Again , for self-hosted users to run Convoy successful they need a replica set, because MongoDB doesn’t support transactions on a single node instance, and bootstrapping a replica set does not provide the best experience for our users.
- Lastly, tweaking queries in MongoDB is hard. Even in the short time of our migration, we’ve found Convoy’s API & Dashboard to be noticeably faster.

We finally got around switching from PostgreSQL to MongoDB in Convoy v0.9. For new installations, this has no impact other than you have to specify a PostgreSQL DSN. For old installations, we are working a migration script to assist with your data migration, we will share updates very soon.

### Message Brokers

Convoy can now consume webhook events off topics and queues on Amazon SQS and Google PubSub. We did this to improve the deliverability guarantees of ingesting webhook into Convoy compared to our REST API interface because Message Brokers are stateful services that provide more guarantees that as long as a message has been committed it will eventually be read off the queue and delivered as a webhook event. To achieve this over HTTP is a combination of retries, building an async dispatch system etc. which can all be side-stepped with a direct message broker integration. To do this, we introduced the concept of `Sources` to an Outgoing Webhooks Project. This means you can now configure multiple webhook ingest sources as shown below:

![Convoy v0.9 Message Broker Source Config](/blog-assets/message-broker-0.9.png)

Then run the `convoy ingest` process to spin up workers dedicated to consuming messages on the queues and publishing webhook events to client endpoints. 

### Client CLI

In the past, we talked about local debugging for Convoy. Yes, we had to re-launch this because our previous implementation wasn’t intuitive enough for our users. To achieve this new implementation, we 

1. We decided to ship this only for our `Incoming Project` users, while we ship this in a more intuitive fashion for `Outgoing Projects`.
2. Shipped a new cli entirely called the Client CLI. See the full docs [here](https://getconvoy.io/docs/tools/convoy-cli).

We wrote a full blog post on how to get started with our new cli [here](https://getconvoy.io/blog/debugging-webhook-events-with-convoy-cli/) - Please let us know your thoughts.

### Improved Dashboard

In previous releases, several aspects of our product experience wasn’t intuitive enough for our users. In this release, we worked hard to rethink several pages including

1. Our onboarding pages, it included several steps that weren't quite necessary; this created significant confusion and user drop-off. In this release, we've eliminated redundant steps in the onboarding process.

2. Several forms had redundant fields that weren't necessary to the function. E.g. Endpoint description. In this release, we did a complete audit of our forms and improved the experience all-round. 


### What’s Next?

For Convoy v0.10, we have the following features planned — Kafka Integration, Webhook Idempotent Keys, Meta Events and the first release candidate for our Enterprise Edition. For Convoy EE, v0.10, it will include Role-Based Access Controls. If you’re interested in our early EE release, please reach out to us at sales@getconvoy.io
