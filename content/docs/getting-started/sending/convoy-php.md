---
title: Convoy PHP SDK
description: "Sending a webhook event with Convoy PHP SDK."
id: convoy-php
---
The first step involved in sending a webhook event is configuring your SDK client.

## Setup Client

```php[example]
use Convoy\Convoy;

$convoy = new Convoy(["api_key" => "your_api_key"]);
```

The SDK also supports authenticating via Basic Auth by defining your username and password.

```php[example]
$convoy = new Convoy(["username" => "default", "password" => "default"]);
```

In the event you're using a self hosted convoy instance, you can define the url as part of what is passed into convoy's constructor.

```php[example]
$convoy = new Convoy([
    "api_key" => "your_api_key",
    "uri" => "self-hosted-instance"
]);
```

## Creating an application

An application represents a user's application trying to receive webhooks. Once you create an application, you'll receive a `uid` from the response that you should save and supply in subsequent API calls to perform other requests such as creating an event.

```php[example]
$appData = ["name" => "my_app", "support_email" => "support@myapp.com"];

$response = $convoy->applications()->create($appData);

$appId = $response['data']['uid'];
```

After creating an application, you'll need to add an endpoint to the application you just created. An endpoint represents a target URL to receive events.

### Add application endpoint


```php[example]
$endpointData = [
    "url" => "https://0d87-102-89-2-172.ngrok.io",
    "description" => "Default Endpoint",
    "secret" => "endpoint-secret",
    "events" => ["*"]
]

$response = $convoy->endpoints()->create($appId, $endpointData);
$endpointId = $response['data']['uid'];
```

The next step is to create a subscription to the webhook source. Subscriptions are the conduit through which events are routed from a source to a destination on Convoy.

## Create a subscription

```php[example]
$subscriptionData = [
    "name" => "event-sub",
    "app_id" => $appId,
    "endpoint_id" => $endpointId
];

$response = $convoy->subscriptions()->create($subscriptionData);
```

With the subscription in place, you're set to send an event.

## Send an event

To send an event, you'll need the `uid` from the application you created earlier.

```php[example]
$eventData = [
    "app_id" => $appId,
    "event_type" => "payment.success",
    "data" => [
        "event" => "payment.success",
        "data" => [
            "status" => "Completed",
            "description" => "Transaction Successful",
            "userID" => "test_user_id808"
        ]
    ]
];

$response = $convoy->events()->create($eventData);
```

## Cheers! 🎉

You have successfully created a Convoy application to send events to your configured endpoint.