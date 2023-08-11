---
title: Architecture
description: 'Convoy internal architecture and components'
id: architecture
order: 1
---

# Architecture
Convoy is made up several services working in tandem. Below is an architecture diagram and the traffic pattern.

![Convoy Architecture](/docs-assets/convoy-architecture-2.png)


## Components
Let's breakdown the image above by describing the important elements.

### Server
The API Server hosts Convoy's REST API that powers the dashboard, and all HTTP SDK functions. When events are sent through the API, they are immediately enqueued to Redis, where a worker picks it up and persists the events into the database, before dispatching the events. We are currently iterating very fast and releasing new features often, we try our best to make it backward compatible while shipping new exciting features. When there are breaking changes we explicitly communicate them in the [Release Notes.](https://getconvoy.io/docs/releases/version-8#release-highlights)

The API Server is a stateless service, and can be scaled horizontally. We suggest that you deploy them behind a load balancer to properly distribute traffic among the instances. See the CLI details [here](/docs/cli#server).

### Workers
The workers are responsible for processing all asynchronous tasks from Redis. This can range from important functions like processing webhook events to ancillary tasks like sending emails, purging stale events etc. 

These workers are designed to be stateless and can be scaled horizontally to increase throughput of the entire system. See the CLI details [here](/docs/cli#worker)

### Egress
The egress service is a HTTP Connect Proxy that is directly responsible for sending webhook events to the client endpoints. The services provides two major benefits - static ips, because it is a connect proxy, we are able to maintain a predefined set of IP address on all requests forwarded to client endpoints. Secondly, the egress service prevents Server-Side Request Forgery (SSRF) by creating a blacklist of URLs that cannot receive requests to prevent malicious users from trigger unexpected behaviours in our cloud environment.

By its nature, the egress service should be deployed in a static environment (i.e. specific VMs with IP Address pre-defined). Depending on your availability requirements, we suggest you deploy at least 3 instances and place a load balancer in front the egress services to distribute traffic evenly. See the CLI details [here](/docs/cli#egress)

This feature is only available in Convoy Convoy, if you would like to deploy this to your environment, please reach out to us at sales@getconvoy.io.

### Scheduler
The scheduler service is responsible for triggering important periodic tasks. To avoid, duplicate jobs, there should only exist one scheduler across your deployment. See the CLI details [here](/docs/cli#scheduler)

### Ingest
This is a stateless worker server used to consume webhook events from message brokers. It constantly polls source configuration from the database and consumes events from the broker. It is not responsible for processing these events other than consuming from the broker and writing to redis to be consumed by a standard worker. See the CLI details [here](/docs/cli#ingest)

## Third-Party Dependencies
- PostgreSQL 15+
- Redis 6+
