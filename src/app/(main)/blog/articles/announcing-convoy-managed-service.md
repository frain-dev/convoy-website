---
title: 'Announcing Convoy’s Managed Service'
feature_image: announcing-convoy-managed-service.png
post_image: announcing-convoy-managed-service.png 
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Product Update
tags:
  - Convoy
  - Product Update
featured: true
description: Presenting Convoy's all-new cloud platform. Tailored to simplify webhooks management like never before, join us as we unveil our exciting new cloud offering featuring dedicated instances, expanded regional availability, competitive pricing, industry standard security, and uncompromising compliance.
published_at: 2023-11-06T17:00:00.000+00:00
---

Hey Friends,

It’s been a minute since we wrote a product announcement, but yes, we’ve been in the kitchen — the entire team has been cooking, just for you, and we’re very excited to roll out our new cloud platform. Trust me, webhooks management has never been simpler.

Convoy is the world’s most advanced webhooks gateway with several features like retries, rate limiting, circuit breaking, transformations, etc. While all these features are great and are available in Convoy Community Edition. Many teams want to use Convoy without the burden of managing the infrastructure and not sacrificing security and availability. Hence, we are launching a new Cloud platform — multi-tenant, fully SOC2 compliant, and highly available across multiple regions.

![Create a cluster](/blog-assets/creating-cluster.gif)

Let’s talk about why this release is exciting.

### Dedicated Instances

Three months ago, we opened up a now obsolete Cloud offering to enable users to rapidly test the platform without the need to spin up an instance for themselves. But for real production workloads, this won’t suffice. Webhooks, more often than not, power critical workflows, and hold very sensitive information in them. Because of this, teams have higher availability and security requirements, which a single instance deployment won’t provide.

In this new Offering, each user's workload will be running on dedicated machines. With this, we are able to support the enterprise's security and availability requirements.

### Available Regions

For many teams, data residency is non-negotiable. Our previous cloud offering was completely resident in the US. This wasn’t sufficient for our international customer base. To accommodate everyone, our new cloud platform will include one new region in the European Union (EU). Our plan is to constantly add new regions as we deem fit for our users and their needs. If you’re curious about when we would announce this, you can join our Slack community to stay updated.

### Competitive Pricing

At Convoy, we’ve done the hard work to design a cost-effective platform where you’re paying simply for what you’re running. We leverage the best-in-class control plane technology that enables us to scale machines up and down as you utilize them, so you only pay for what you consume. Also, we’ve gone ahead to publish new pricing plans focused on your expected workloads.

### Compliance

Finally, compliance & security. This is one of the major distinctions between the old cloud platform and the new platform. Webhook payloads oftentimes include very sensitive information, so to align with the highest security standards, we partnered with Vanta to deliver a fully compliant platform.  If you’d like to know more about our SOC2 status, please email us at sales@getconvoy.io

### How do I move my resources?

This requires you to use our CLI to move your organization’s data and point your SDKs to the new Base URL of your cluster. If you have any questions, please join us on Slack or email support@getconvoy.io

### What to expect?

We have lots of more features planned out — Cloud Queues, Partner Integrations, Bring Your Own Encryption, Monitoring & Alerts, and more. But for now, we’re focused on getting our Cloud platform to general availability. If you’re curious about any feature, don’t hesitate to join on us Slack.

Cheers to improving the webhooks experience on the internet.
