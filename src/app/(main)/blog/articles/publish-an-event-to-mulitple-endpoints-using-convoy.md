---
title: Publish an event to multiple endpoints using convoy
feature_image: publish-an-event.png
post_image: publish-an-event.png
primary_author:
    name: Daniel Oluojomu
    twitter: danvixent
primary_tag: Product Update
tags:
    - Convoy
    - Tutorial
    - Product Update
featured: false
description: One common scenario in publishing webhook events is enabling users to provide multiple endpoints to receive events. One easy example is publishing an event that the user needs to process at more than one location. This location could be a no-code..
published_at: 2022-03-09T20:32:07.000+00:00
---

One common scenario in publishing webhook events is enabling users to provide multiple endpoints to receive events. One easy example is publishing an event that the user needs to process at more than one location. This location could be a no-code platform like zapier, a newly minted microservice or serverless function, or a good old slack notification. In this article, I’d like to explain how you can achieve this using [Convoy](https://getconvoy.io/).

![multiple endpoints](/blog-assets/multiple_endpoints.png)

Without Convoy, your users have to build in the fan-out mechanism themselves, which is more stressful.

### Prerequisites

To follow along you would need the following

1. A [Convoy Cloud](https://dashboard.getconvoy.io/signup) account.
2. An Outgoing Project ID & API Key.

### Steps

**Create Two Endpoints**

First, we have to create two endpoints with the same `owner_id` , you can think of `owner_id`as an id used to group multiple endpoints under one entity e.g merchant.

For the first endpoint:

```json {% file="Sample Payload" %}
{
  "description": "test-endpoint-1",
  "owner_id": "<your-owner-id>",
  "events": [ "*" ],
  "secret": "12345",
  "url": "https://<your-endpoint-url>"
}
```

```bash {% file="Bash" %}
$ curl \
    --request POST \
    --data @endpoint-1.json \
    -H "Content-Type: application/json" \
    https://dashboard.getconvoy.io/api/v1/projects/{projectID}/endpoints
```

```json[Response]
{
	"status": true,
	"message": "Endpoint created successfully",
	"data": {
		"uid": "7556a922-7d10-47b1-b254-4dde679d9fbd",
		"project_id": "acc1bf6d-c309-4a99-b9a7-a9410fa5f6c4",
		"target_url": "https://<your-endpoint-url>",
		"owner_id": "<your-owner-id>",
		"title": "test_endpoint_1",
		"secrets": [
			{
				"uid": "72e9d70f-b57e-4f49-b098-01e8ea9795e7",
				"value": "1234",
				"created_at": "2022-12-15T13:38:01.638Z",
				"updated_at": "2022-12-15T13:38:01.638Z"
			}
		],
		"advanced_signatures": false,
		"description": "xx",
		"http_timeout": "",
		"rate_limit": 5000,
		"rate_limit_duration": "1m0s",
		"authentication": null,
		"created_at": "2022-12-15T13:38:01.638Z",
		"updated_at": "2022-12-15T13:38:01.638Z"
	}
}
```

For the second endpoint:

```json {% file="Sample Payload" %}
{
  "description": "test-endpoint-2",
  "owner_id": "<your-owner-id>",
  "events": [ "*" ],
  "secret": "12345",
  "url": "https://<your-endpoint-url>"
}
```

```bash {% file="Bash" %}
$ curl \
    --request POST \
    --data @endpoint-2.json \
    -H "Content-Type: application/json" \
    https://dashboard.getconvoy.io/api/v1/projects/{projectID}/endpoints
```

```json[Response]
{
	"status": true,
	"message": "Endpoint created successfully",
	"data": {
		"uid": "7556a922-7d10-47b1-b254-4dde679d9fbd",
		"project_id": "acc1bf6d-c309-4a99-b9a7-a9410fa5f6c4",
		"owner_id": "<your-owner-id>",
		"target_url": "https://<your-endpoint-url>",
		"title": "test_endpoint_2",
		"secrets": [
			{
				"uid": "89e9d70f-b57e-4f49-b098-01e8ea9795e7",
				"value": "1234",
				"created_at": "2022-12-15T13:38:01.638Z",
				"updated_at": "2022-12-15T13:38:01.638Z"
			}
		],
		"advanced_signatures": false,
		"description": "xx",
		"http_timeout": "",
		"rate_limit": 5000,
		"rate_limit_duration": "1m0s",
		"authentication": null,
		"created_at": "2022-12-15T13:38:01.638Z",
		"updated_at": "2022-12-15T13:38:01.638Z"
	}
}
```

**Create One Subscription for Each Endpoint**

Now we have to create subscriptions for each endpoint.

```json {% file="Sample Payload" %}
{
  "endpoint_id": "<your-endpoint-id>",
  "name": "test-sub-1"
}
```

```bash {% file="Bash" %}
$ curl \
    --request POST \
    --data @subscription-1.json \
    -H "Content-Type: application/json" \
    https://dashboard.getconvoy.io/api/v1/projects/{projectID}/subscriptions
```

```json[Response]
{
	"status": true,
	"message": "Subscription created successfully",
	"data": {
  	  "uid": "eb1e6167-d076-4366-b458-2ca7e358986e",
	  "endpoint_id": "<your-endpoint-id>",
		"name": "test-sub-1",
		"type": "api",
		"status": "active",
		"filter_config": {
			"event_types": [
				"*"
			],
			"filter": {}
		},
		"created_at": "2022-12-15T13:56:22.256Z",
		"updated_at": "2022-12-15T13:56:22.256Z"
	}
}
```

Repeat the same for the second subscription.

**Publish Event**

Now let us publish an event with the type to our endpoints. We’ll specify the `owner_id` we used for both endpoints, this allows convoy to dispatch the event to both endpoints.

```json {% file="Sample Payload" %}
{
  "owner_id": "<your-owner-id>",
  "data": {
		"blog": "https://getconvoy.io/blog"
	},
  "event_type": "ping"
}
```

```bash {% file="Bash" %}
$ curl \
    --request POST \
    --data @event.json \
    -H "Content-Type: application/json" \
    https://dashboard.getconvoy.io/api/v1/projects/{projectID}/events
```

```json[Response]
{
	"status": true,
	"message": "Endpoint event created successfully",
	"data": {
		"uid": "cdff6a37-8a41-412b-aa55-748cdefd8017",
		"event_type": "ping",
		"project_id": "acc1bf6d-c309-4a99-b9a7-a9410fa5f6c4",
		"endpoints": [
			"b5e4d42e-3ad6-4546-9f88-4f36b3f82941",
			"7556a922-7d10-47b1-b254-4dde679d9fbd"
		],
		"data": {
			"blog": "https://getconvoy.io/blog"
		},
		"created_at": "2022-12-15T13:39:45.276Z",
		"updated_at": "2022-12-15T13:39:45.276Z"
	}
}
```

## Show Endpoint Response
The screenshots below show that the events were routed to the two endpoints.

![Endpoint-1 Webhook](/blog-assets/endpoint-response-1.png)
![Endpoint-2 Webhook](/blog-assets/endpoint-response-2.png)

## Conclusion
In this post, we discussed why letting your users provide multiple endpoints is important. We demostrated this ability in Convoy and how to use it. Sounds good for your platform? Why not try out our free [cloud](https://dashboard.getconvoy.io/signup) and give us feedback on our [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) community!

Till next time ✌🏽
