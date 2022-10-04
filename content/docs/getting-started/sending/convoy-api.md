---
title: Convoy API
description: "Send webhook event with Convoy API"
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

### Add application endpoint

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

The next step is to create a subscription to the webhook source. Subscriptions are the conduit through which events are routed from a source to a destination on Convoy.

### Create a subscription

```console[example]
curl --request POST \
  --url https://dashboard.getconvoy.io/api/v1/subscriptions \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
  "app_id": "<your app ID>",
  "endpoint_id": "<your endpoint ID>",
  "name": "Subscription name"
}'
```

With the subscription in place, you're set to send an event.
## Send an event

To send an event, you'll need the `uid` from the application you created earlier.

```terminal[console]
curl --request POST \
  --url https://dashboard.getconvoy.io/api/v1/events \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "app_id": "<app-id>",
    "event_type": "payment.success",
    "data": {
      "event": "payment.success",
      "data": {
        "status": "Completed",
        "description": "Transaction Successful",
        "userID": "test_user_id808"
      }
    }
}'
```

## Cheers! 🎉

You have sucessfully created a Convoy application to send events to your configured endpoint.

The complete API reference can be viewed and interacted with on [Readme](https://convoy.readme.io).