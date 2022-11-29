---
title: Convoy API
description: "Send webhook event with Convoy API"
id: convoy-api
---
Sending webhooks with the API does not require a client setup like the SDKs. The API key retrieved from your dashboard will be added to the Authorization header and the project ID will be added to the request URL.

## Create an endpoint

An endpoint is a specific destination that can receive webhook events. Once you create an endpoint, you'll receive a `uid` as part of the response that you should save and supply in subsequent API calls to perform other requests such as creating an event.

```console[terminal]
curl --request POST \
  --url https://dashboard.getconvoy.io/api/v1/projects/<project-id>/endpoints \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '
    {
      "name": "Convoy endpoint",
      "description": "Endpoint description",
      "http_timeout": "10s",
      "url": "https://webhook.site/40984a4e-7b36-41fb-a234-9c2006bac8b5"
  }'
```

The next step is to create a subscription to the webhook source. Subscriptions are the conduit through which events are routed from a source to a destination on Convoy.

### Create a subscription

```console[example]
curl --request POST \
  --url https://dashboard.getconvoy.io/api/v1/projects/<project-id>/subscriptions \
  --header 'Authorization: Bearer <api-key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "endpoint_id": <endpoint-id>,
    "name": "Subscription name"
}'
```

With the subscription in place, you're set to send an event.
## Send an event

To send an event, you'll need the `uid` from the application you created earlier.

```terminal[console]
curl --request POST \
  --url https://dashboard.getconvoy.io/api/v1/projects/<project-id>/events \
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

You have successfully created a Convoy application to send events to your configured endpoint.

The complete API reference can be viewed and interacted with on [Readme](https://convoy.readme.io).