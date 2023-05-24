---
title: How Bloc reduced Support Issues by 90% with Convoy
feature_image: banner1.png
post_image: banner1.png
primary_author:
    name: Lotanna Nwose
    twitter: viclotana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false
description: Bloc's Customer Story, how using Convoy helped the Engineering team to rreceive less and less support issues by providing their customers access to easily audit and debug their events themselves using Convoy Portal Links.
published_at: 2023-05-25T17:00:00.000+00:00
---
## About Bloc

Bloc is a fintech infrastructure company and is considered one of the biggest Banking-as-a-Service (BAAS) platforms in the African fintech space. In 2021, it processed more than $30 million with just one of its bill payment services. Recently, Bloc [acquired another fintech](https://disrupt-africa.com/2022/07/14/nigerian-fintech-infrastructure-startup-bloc-acquires-payments-company-orchestrate/) infrastructure company called Orchestrate, which now operates as a service provided by Bloc.

Startups, small and medium-sized enterprises, and large organizations use Bloc's suite of banking and payment tools and APIs to accept payments, send money, attract new customers, create revenue streams, and efficiently manage their business online.

## Chatting with Jerry

Jerry Enebeli, Bloc's Chief Technology Officer (CTO), recently sat down with us to discuss their relationship with customers and how Convoy helps them stay efficient and extend that efficiency to Bloc's customers.

*“The two things I believe every engineering team needs today to be efficient are Proper visibility into application events, along with time-saving tools that offer reliable service.” - Jerry, CTO*

## The Challenges of the Past

Bloc partners with various service providers to offer banking services, including businesses that use BAAS solutions. Handling millions of events, including webhooks, is crucial to their operations. The Bloc team initially built a simple webhook service internally, however, it lacked the necessary tools and features to efficiently track and identify problems related to webhooks, such as failure notifications and intuitive event logging.

Last year, Bloc's customer success team received numerous webhook complaints. Upon investigation, they discovered that most of the issues were unrelated to Bloc but webhook insights. Debugging events and tracking logs was a significant problem for many customers, and it was difficult to fulfil SLA requirements if customers couldn't easily tell what was sent or not.

*“After meeting and hearing about [the product roadmap](https://github.com/orgs/frain-dev/projects/3/views/1), I was convinced that Convoy was the ideal solution for Bloc. Its features and potential for growth aligned perfectly with our needs & vision.”*

## Portal Links to the rescue

One issue reported to Bloc's customer success team persisted for three weeks. During a session with the customer, Bloc’s support engineers learned that the issue was caused by Bloc sending webhooks to an auth-protected route that returned a forbidden error. The user was able to identify this issue by reviewing event deliveries through [Convoy's Portal Links](https://getconvoy.io/docs/manual/portal-links).

A [Portal Link](https://getconvoy.io/docs/manual/portal-links) generates a customer-facing dashboard to display information on an endpoint's event deliveries. The portal link serves as a medium to quickly generate portals for users to review and debug webhook events from a publisher. 

Following this and similar experiences, the Bloc team now uses [Portal Links](https://getconvoy.io/docs/manual/portal-links/#caveats) through the [Convoy API](https://convoy.readme.io/reference/get_api-v1-projects-projectid-portal-links) to give customers total control over monitoring and seamlessly debugging webhooks and audit logs. If you are a Bloc customer, you may already be familiar with webhook logs in your dashboard, which is fully powered by the Convoy Webhooks Gateway.

*"This singular implementation has reduced the number of support issues we receive by over 90%. It is a game-changer for us."*