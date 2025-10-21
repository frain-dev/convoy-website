---
date: 2025-08-22
title: Message Broker Source Functions
authors:
  - name: Raymond Tukpe
    image: /employees/raymond.jpg
  - name: Subomi Oluwalana
    image: /employees/subomi.jpg
---

Events ingested via message brokers like Kafka, Amazon SQS, and Google PubSub can now be mutated using the same Javascript engine that powers subscription filters for incoming projects. Previously, events ingested via these sources needed to conform to a particular format or would be dropped and not acknowledged. This can be frustrating when integrating Convoy into your stack because you need to set up a new queue or topic from which Convoy will read events. With source functions, you can connect your current queues and topics to Convoy and specify a function in Convoy that will wrap your payload into something Convoy can ingest.

![Subscription Create Function](/docs-assets/subscription-create-function.png)
