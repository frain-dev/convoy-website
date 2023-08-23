---
title: FAQ
description: 'Convoy Frequently Asked Questions'
id: faq
order: 7
---

# FAQ

{%accordion title="What is the difference between an incoming and an outgoing webhooks project?"%}
| Features | Incoming | Outgoing |
| ------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Purpose | For API consumers. In this scenario, Convoy acts as a reliable ingress for webhook events. | For API providers. In this scenario, Convoy acts as a reliable egress for webhook events. |
| Portal | You don’t need a portal because you have access to the entire dashboard. | Each API consumer needs a portal to view their specific endpoint webhook logs. |
| Event Sources | Events are ingested only through HTTP source URLs. | Events are ingested through REST API and PubSub systems like Amazon SQS, Google PubSub, etc. |

{%/accordion%}
