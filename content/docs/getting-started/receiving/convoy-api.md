---
title: Convoy API
description: "Receiving webhook events with Convoy API"
id: convoy-api
---

Sending webhooks with the API does not require a client setup like the SDKs. The API key retrieved from your dashboard will be added in the Authorization header.

## Create an application

An application represents a user's application trying to receive webhooks. Once you create an application, you'll receive a `uid` as part of the response that you should save and supply in subsequent API calls to perform other requests such as creating an event.

```console[terminal]
curl --request POST \
  --url https://dashboard.getconvoy.io/api/v1/applications \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
  "is_disabled": false,
  "name": "Convoy app name placeholder"
}'
```

After creating an application, you'll need to add an endpoint to the application you just created. An endpoint represents a target URL to receive events.

## Add application endpoint

```terminal[console]
curl --request POST \
  --url https://dashboard.getconvoy.io/api/v1/applications/<app-id>/endpoints \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
  "description": "Endpoint description",
  "http_timeout": "10s",
  "url": "http://localhost:1001"
}'
```

Next, add a webhook source from which you'll be receiving events from.

## Add a webhook source

```terminal[console]
curl --request POST \
  --url https://dashboard.getconvoy.io/api/v1/sources \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "sample source",
  "type": "http",
	"provider": "github",
	"verifier": {
	  "hmac": {
			"secret": "strongestSecret!"
		}
	}
}'
```

Store the source ID `uid` from the response returned, 


The next step is to create a subscription to the webhook source. Subscriptions serve as the medium for retrieving events from the defined source.

## Create a subscription

```console[terminal]
curl --request POST \
  --url 'https://dashboard.getconvoy.io/api/v1/subscriptions?groupId=string' \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
  "app_id": "<app-id>",
  "endpoint_id": "<endpoint-id>",
  "name": "Subscription name",
  "source_id": "<source-id>"
}'
```

With the subscription in place, you can now retrieve events sent to your application.

## Retrieve events

You can retrieve the webhook events sent to your convoy application by executing the request:

```console[terminal]
curl --request GET \
  --url https://dashboard.getconvoy.io/api/v1/events \
  --header 'Authorization: Bearer <api-key>'
```

## Cheers! 🎉

You have sucessfully created a Convoy application to retrieve events sent to you from your webhook source. 

The complete API reference can be viewed and interacted with on [Readme](https://convoy.readme.io).