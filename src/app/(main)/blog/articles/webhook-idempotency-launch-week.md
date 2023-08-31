---
title: Launching Webhook Idempotency
feature_image: launching-webhook-idempotency.png
post_image: launching-webhook-idempotency.png
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Product Update
tags:
    - Convoy
    - Product
    - Launch Week
featured: false
description: Welcome to day 2 of Convoy Launch week! We are thrilled to unveil Webhook Idempotency in Convoy, we believe that this feature will enrich your experience with Convoy. In this article, we will delve into how you can leverage Convoy to handle idempotent requests from your existing webhook providers and also send Idempotent webhooks to your API consumers.
published_at: 2023-06-25T17:00:00.000+00:00
---

## Introduction

Welcome to day 2 of Convoy Launch week! We are thrilled to unveil Webhook Idempotency in Convoy, we believe that this feature will enrich your experience with Convoy. In this article, we will delve into how you can leverage Convoy to handle idempotent requests from your existing webhook providers and also send Idempotent webhooks to your API consumers. 

![idempotency-event-log.png](/blog-assets/idempotency-event-log.png)

# Idempotency In Convoy

Idempotent HTTP requests refer to the characteristic of certain HTTP methods that allows them to be safely and repeatedly executed without altering the state of the server beyond the initial request. These methods include GET, HEAD, PUT, and DELETE, while POST stands apart as a non-idempotent member.

While POST requests aren’t normally non-idempotent, the introduction of an Idempotency key passed via a header can be used to de-duplicate them. When sending out webhook requests we set the `X-Convoy-Idempotency-Key` header and this can be used to de-duplicate events sent by Convoy. In the next two sections, we will talk about how to configure idempotency keys for both incoming and outgoing projects and how to de-duplicate events sent or received.

## Idempotency in Incoming Projects

With Convoy, you can inspect parts of a request to extract the idempotency key. Some API providers will send the key in a header or in the request body, some might use a combination of both; at times the API provider might not provide any idempotency functionality, so you might want to define your own idempotency rules based on webhooks sent by the API provider. Not to worry, we have you covered on all those fronts! When creating a source you can specify the location of the idempotency key and we’ll use it to generate a SHA256 checksum value.

To get started create a source and specify the idempotency key locations, this is an ordered set of locations— valid parts of the request where the keys might be found. The locations include the request header, body and query params.

![idempotency-create-source.png](/blog-assets/idempotency-create-source.png)

Whenever you receive a request from that source, the values in the locations you set are extracted and used to create the checksum. 

```
> POST /ingest/9aKVYbMveTwynW03 HTTP/2
> Host: dashboard.getconvoy.io
> user-agent: insomnia/2023.2.2
> content-type: application/json
> x-idempotency-key: 123
> accept: */*
> content-length: 84

| {
| 	"event_type": "links.write",
| 	"payload": "731645d0-2ad1-4f75-a2b5-1e277a8a82d7"
| }

< HTTP/2 200 
< date: Fri, 23 Jun 2023 21:15:39 GMT
< content-type: application/json; charset=utf-8
< content-length: 53
< x-request-id: f7fb2941c7a4c54675dc351cc0c873f6
< access-control-allow-origin: *
< access-control-allow-credentials: true
< access-control-allow-methods: GET, PUT, POST, DELETE, PATCH, OPTIONS
< access-control-max-age: 1728000
< alt-svc: h3=":443"; ma=86400

| {
|	  "status": true,
|	  "message": "Event received",
|	  "data": 84
| } 
```

As you can see below, an idempotency checksum was generated for this event. This same key will be sent to your endpoint which can also be used to de-duplicate events.

![idempotency-key.png](/blog-assets/idempotency-key.png)

Sending the exact same request again would return a different success message stating the event would be ingested but won’t be sent since there is an existing successfully dispatched duplicate. This would prevent your endpoints from receiving the same events multiple times.

```
> POST /ingest/9aKVYbMveTwynW03 HTTP/2
> Host: dashboard.getconvoy.io
> user-agent: insomnia/2023.2.2
> content-type: application/json
> x-idempotency-key: 123
> accept: */*
> content-length: 84

| {
| 	"event_type": "links.write",
| 	"payload": "8b3614b7-f652-4d1d-932a-1a2cbd2a0319"
| }

< HTTP/2 200 
< date: Fri, 23 Jun 2023 21:29:57 GMT
< content-type: application/json; charset=utf-8
< content-length: 85
< x-request-id: 9cf977a3d802a33086e9c835b4fc63a5
< access-control-allow-origin: *
< access-control-allow-credentials: true
< access-control-allow-methods: GET, PUT, POST, DELETE, PATCH, OPTIONS
< access-control-max-age: 1728000
< alt-svc: h3=":443"; ma=86400

| {
|	    "status": true,
|       "message": "Duplicate event received, but will not be sent",
|	    "data": 84
| }
```

Events that are de-duplicated are marked with the duplicate flag both in the API payload and in the event log on the dashboard. Duplicate events; while normally would be discarded —won’t be ingested and saved— are kept for record purposes in the event log so when you click on them you can see a list of all the duplicates and the original event that was successful.

![idempotency-duplicates.png](/blog-assets/idempotency-duplicates.png)

## Idempotency in Outgoing Projects

In outgoing projects you would need to specify an idempotency key in the request payload when creating the event. This works the same way when creating dynamic and fanout events. The idempotency key should be a unique value generated by the client. It is recommended to use the SHA256 of a UUID v4 string or any other sufficiently random string to ensure avoidance of collisions. We recommend a SHA256 string because the idempotency keys we generate for incoming projects are SHA256 strings.

```jsx
{
    "endpoint_id": "01H3PECSZYDEES152G7DDBW7MP",
    "data": {
        "name": "{{$randomAdjective}}",
        "email": "{{$randomEmail}}",
        "age": 10
    },
    "idempotency_key": "12d851d0255ea37d2a0253016e62d35047ab4a737b5bcd75fb8fddff4b029249",
    "custom_headers": {
        "header": "valve"
    },
    "event_type": "read"
}
```

As expected if you send the same idempotency key in a request it would create the event but no event delivery will be sent.

![idempotency-outgoing.png](/blog-assets/idempotency-outgoing.png)

Duplicate events also show all the other duplicates as well as the original

![idempotency-duplicates-outgoing.png](/blog-assets/idempotency-duplicates-outgoing.png)

# Conclusion

We're thrilled about the potential benefits being able to automatically de-duplicating events brings. Convoy goal is about fostering collaboration, empowering engineers, and simplifying integration.

We’re committed to reducing the amount of work done by developers that want to build webhooks and by using Convoy, we want to take all that work from you so you can focus on building your product, that’s why we’re launching new features everyday this week! This is just day 2, with 3 more days to go! Stay tuned for more updates. Interested in giving Convoy a go? You can join our community slack [here](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) and give us feedback!