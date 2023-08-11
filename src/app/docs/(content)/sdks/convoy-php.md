---
title: Convoy PHP SDK
description: "Convoy PHP SDK Configuration"
id: convoy-php
---

### Install Client

To install the package, you will need to be using Composer in your project.

To get started quickly,

```bash[terminal]
$ composer require frain/convoy symfony/http-client nyholm/psr7
```

### Configure

Next, import the `convoy` module and setup with your auth credentials.

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

### Create an Endpoint

```php[example]
$endpointData = [
    "url" => "https://0d87-102-89-2-172.ngrok.io",
    "description" => "Default Endpoint",
    "secret" => "endpoint-secret",
    "events" => ["*"]
]

$response = $convoy->endpoints()->create($appId, $endpointData);
```

### Create a Subscription

```php[example]
$subscriptionData = [
    "name" => "event-sub",
    "endpoint_id" => $endpointId
];

$response = $convoy->subscriptions()->create($subscriptionData);
```

With the subscription in place, you're set to send an event.

### Send an Event

To send an event, you'll need the `uid` from the application we created earlier.

```php[example]
$eventData = [
    "endpoint_id" => $endpointId,
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
