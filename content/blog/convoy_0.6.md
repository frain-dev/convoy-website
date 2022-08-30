---
title: Convoy v0.6
feature_image: update_screenshot.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
featured: true
description: Convoy v0.6 was a major upgrade from our previous release. We added our most requested features - webhooks ingress, and a number of other interesting features. :) In this post, we share what these updates were, and what you should expect from us in Convoy v0.7
published_at: 2022-08-27T12:04:00.000+00:00
---

Convoy v0.6 was a major upgrade from our previous release. We added our most requested features - webhooks ingress, and a number of other interesting features. :) In this post, we share what these updates were, and what you should expect from us in Convoy v0.7

### **Bi-directional webhooks support**

When we spoke to lots of our users about Convoy, there was a large consensus on being able to receive webhooks with Convoy. We decided to tackle this in the spirit of providing a consistent toolchain for webhooks. We also realised working with webhooks in either direction required the same infrastructure; events storage, indexing, queuing, dispatching and debugging. In this release, there are two types of projects: Incoming and Outgoing, as the name suggests - Incoming; is used by API consumers to receive events from their providers, and Outgoing; is used by API providers to publish events to their customers.

![Screenshot 2022-08-25 at 6.36.58 PM.png](/blog-assets/Screenshot_2022-08-25_at_6.36.58_PM.png)

With an incoming project, you can receive events from multiple sources.  All you need to do is configure the source, with verification or no verification (to act as a proxy) and use the generated URL on the respective provider.

![Screenshot 2022-08-25 at 6.42.11 PM.png](/blog-assets/Screenshot_2022-08-25_at_6.42.11_PM.png)

### **Payload Search**

We want it to be ridiculously easy to debug and find issues when there’s a webhook failure or when a member of your engineering or support team needs information about a certain integration, so we built Payload Search. With this, the event dashboard now includes a search bar. This allows you to search through the webhooks payload to find just almost anything. To make this work, we introduced a new dependency - [Typesense](https://typesense.org/). With this, the entire payload is indexed in Typesense and provides search abilities over every field of the webhook payload. See it in action:

![convoy-search.gif](/blog-assets/convoy-search.gif)

The configuration change also is quite, small see below:

```json
{
	...
	"search": {
		"type": "typesense",
	  "typesense": {
			"host": "http://localhost:8108",
			"api_key": "convoy"
		}
		...
	}
}
```

**NB:** Typesense is not a required dependency, you can continue to operate Convoy without a search backend.

### Retention Policies

Webhook events are derived data, and usually are used to trigger other critical actions. After some days, weeks, and months you want to archive them in cold storage and keep our database fresh with recent data. This is what retention policies are for; It allows you to specify how recent the events shown on your dashboard should be. We introduced a new configuration for this; now you can configure on a project-by-project basis how far back you want your data to remain in the online storage. See the new configuration option on creating project

![Screenshot 2022-08-25 at 6.59.18 PM.png](/blog-assets/Screenshot_2022-08-27_at_12.35.05_PM.png)

We also introduced an instance-wide configuration to support this. It specifies the archive location. See configuration below:

```json
{
	...
	"storage_policy": {
		"type": "s3",
		"s3": {
			"bucket": "<insert-bucket>",
			"access_key": "<insert-access-key>",
			"secret_key": "<insert-secret-key>",
			"session_token": "<insert-session-token>",
			"region": "<insert-region>"
		}
	}
	...
}
```

We plan to support more storage locations in the future. You can also raise a GitHub issue as a feature request [here](https://github.com/frain-dev/convoy/issues).

And that will be all for now.

You can get started easily with Convoy, by self-hosting an instance or using the [cloud](https://dashboard.getconvoy.io/signup). For self-hosting, please follow the instructions [here](https://github.com/frain-dev/convoy#installation-getting-started) to proceed. 

### What’s Next?

We’ve commenced work on Convoy v0.7. This update includes several interesting features like a new events dashboard, Ingesting with PubSub and a new CLI for debugging events. We created [Github discussion posts](https://github.com/frain-dev/convoy/discussions) for each of these features. You can head over and let us know what you think. 
