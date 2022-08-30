---
title: Publish an event to multiple endpoints using convoy
feature_image: publish-an-event.png
primary_author:
    name: Daniel Oluojomu
    twitter: danvixent
primary_tag: Product Update
tags:
    - Convoy
	- Product Update
featured: false
description: One common scenario in publishing webhook events is enabling users to provide multiple endpoints to receive events. One easy example is publishing an event that the user needs to process at more than one location. This location could be a no-code..
published_at: 2022-03-09T20:32:07.000+00:00
---

One common scenario in publishing webhook events is enabling users to provide multiple endpoints to receive events. One easy example is publishing an event that the user needs to process at more than one location. This location could be a no-code platform like zapier, a newly minted microservice or serverless function, or a good old slack notification. In this article, I’d like to explain how you can achieve this using [Convoy](https://getconvoy.io/).

![multiple endpoints](/blog-assets/multiple_endpoints.png)

Without Convoy, your users have to build in the fan-out mechanism themselves, which is more stressful.

# Steps

## Start Convoy Instance

To follow through with this article, you’d need to run an instance of Convoy:

```bash[]
$ docker run \
	-p 5005:5005 \
	--name convoy-server \
	-v `pwd`/convoy.json:/convoy.json \
	ghcr.io/frain-dev/convoy:v0.4.18
```

## Create an Application

Next, we have to create an application under this group

```json[Sample Payload]
{
  "name": "test-app",
  "support_email": "test@gmail.com",
  "secret": "eyJhbGciOiJIUzI1NiJ9"
}
```

```bash[bash]
$ curl \
    --request POST \
    --data @app.json \
    -H "Content-Type: application/json" \
    <http://localhost:5005/api/v1/applications>
```

```json[Response]
{
	"status": true,
	"message": "App created successfully",
	"data": {
		"uid": "2b1e9973-ed03-403c-a8b0-341edd51fb14",
		"group_id": "f0a187f4-edaa-4f8e-adec-75b9a36b3c68",
		"name": "test-app",
		"support_email": "test@gmail.com",
		"endpoints": [],
		"created_at": "2022-03-09T14:17:51.111+01:00",
		"updated_at": "2022-03-09T14:17:51.111+01:00",
		"events": 0
	}
}
```

## Create Two Endpoints

Now we can create multiple endpoints under this app. The first endpoint will take the `*` event type. Essentially this event type means all incoming events to that app will be published to that endpoint. The second endpoint will take the event type payment.created. Only incoming with the exact type payment.created will be published to that endpoint. Convoy tries to match the event type to all available endpoints under that app; the event is then published to all the matched endpoints.

For the first endpoint:

```json[Sample Payload]
{
  "description": "test-endpoint-1",
  "events": [
    "*"
  ],
  "secret": "12345",
  "url": "<your-endpoint>"
}
```

```bash[Bash]
$ curl \
    --request POST \
    --data @endpoint-1.json \
    -H "Content-Type: application/json" \
    <http://localhost:5005/api/v1/applications/{appID}/endpoints>
```

```json[Response]
{
	"status": true,
	"message": "App endpoint created successfully",
	"data": {
		"uid": "2901bbc9-092e-4685-868d-a17298fe86ba",
		"target_url": "<your-endpoint>",
		"description": "test-endpoint-1",
		"status": "active",
		"secret": "12345",
		"events": [
			"*"
		],
		"created_at": "2022-03-09T14:18:14.493+01:00",
		"updated_at": "2022-03-09T14:18:14.493+01:00"
	}
}
```

For the second endpoint:

```json[Sample Payload]
{
  "description": "test-endpoint-2",
  "events": [
    "payment.created"
  ],
  "secret": "12345",
  "url": "<your-endpoint>"
}
```

```bash[Bash]
$ curl \
    --request POST \
    --data @endpoint-2.json \
    -H "Content-Type: application/json" \
    <http://localhost:5005/api/v1/applications/{appID}/endpoints>
```

```json[Response]
{
	"status": true,
	"message": "App endpoint created successfully",
	"data": {
		"uid": "2901bbc9-092e-4685-868d-a17298fe86ba",
		"target_url": "<your-endpoint>",
		"description": "test-endpoint-2",
		"status": "active",
		"secret": "12345",
		"events": [
			"payment.created"
		],
		"created_at": "2022-03-09T14:18:14.493+01:00",
		"updated_at": "2022-03-09T14:18:14.493+01:00"
	}
}
```

## Publish Event

Now let us publish an event with the type `payment.created` to this app. The `payment.created` will match both endpoints since `*` will match all event types, and the `payment.created` type of the second endpoint matches precisely.

```json[Sample Payload]
{
  "app_id": "2b1e9973-ed03-403c-a8b0-341edd51fb14",
  "data": {
		"blog":"medium.com"
	},
  "event_type": "payment.created"
}
```

```bash[]
$ curl \
    --request POST \
    --data @event.json \
    -H "Content-Type: application/json" \
    <http://localhost:5005/api/v1/events>
```

```json[Response]
{
	"status": true,
	"message": "App event created successfully",
	"data": {
		"uid": "ddcd3928-1d7e-4527-901f-47673fd569ce",
		"event_type": "payment.created",
		"matched_endpoints": 2,
		"provider_id": "",
		"data": {
			"blog": "medium.com"
		},
		"app_metadata": {
			"uid": "2b1e9973-ed03-403c-a8b0-341edd51fb14",
			"title": "test-app",
			"group_id": "e6bbde4b-4c43-45a6-8d4c-c8eed1c2bb41",
			"support_email": "test@gmail.com"
		},
		"created_at": "2022-03-09T15:14:27.569+01:00",
		"updated_at": "2022-03-09T15:14:27.569+01:00"
	}
}
```

## Show Endpoint Response

![multiple endpoints](/blog-assets/endpoint_response.gif)

Till next time ✌🏽
