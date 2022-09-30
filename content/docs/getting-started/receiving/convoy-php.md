---
title: Convoy PHP SDK
description: "Convoy PHP SDK Configuration"
id: convoy-php
---

The first step involved in receiving a webhook event is configuring your SDK client.

### Setup Client

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

## Create an application

An application represents a user's application trying to receive webhooks. Once you create an application, you'll receive a `uid` from the response that you should save and supply in subsequent API calls to perform other requests such as creating an event.

```php[example]
$appData = ["name" => "my_app", "support_email" => "support@myapp.com"];

$response = $convoy->applications()->create($appData);

$appId = $response['data']['uid'];
```

### Add application endpoint

After creating an application, you'll need to add an endpoint to the application you just created. An endpoint represents a target URL to receive events.

```php[example]
$endpointData = [
    "url" => "https://0d87-102-89-2-172.ngrok.io",
    "description" => "Default Endpoint",
    "secret" => "endpoint-secret",
    "events" => ["*"]
]

$response = $convoy->endpoints()->create($appId, $endpointData);
```