---
title: SDK
description: 'Convoy SDK Documentation'
id: sdk
order: 6
---

# SDK

Convoy provides SDK for in-app integration. These SDKs carry out the same operations as the API and Convoy dashboard. The methods in each SDK mirror the [API](https://convoy.readme.io/reference).

This page introduces you to the SDKs as well as demonstrate the steps involved in sending an event to your Convoy instance.

{% tabs %}

{% tab label="Javascript" %}

### Install Client

Install convoy.js with

```bash {% file="terminal" %}
$ npm install convoy.js
```

### Configure

Next, require the `convoy` module and setup with your auth credentials.

```js {% file="example" %}
const { Convoy } = require("convoy.js");
const convoy = new Convoy({ api_key: "your_api_key" });
```

The SDK also supports authenticating via Basic Auth by defining your username and password.

```js {% file="example" %}
const convoy = new Convoy({ username: "default", password: "default" });
```

In the event you're using a self hosted convoy instance, you can define the url as part of what is passed into convoy's constructor.

```js {% file="example" %}
const convoy = new Convoy({
  api_key: "your_api_key",
  uri: "self-hosted-instance",
});
```

### Create an Endpoint

```js {% file="example" %}
try {
  const endpointData = {
    url: "https://0d87-102-89-2-172.ngrok.io",
    description: "Default Endpoint",
    secret: "endpoint-secret",
    events: ["*"],
  };

  const response = await convoy.endpoints.create(appId, endpointData);
} catch (error) {
  console.log(error);
}
```

## Create a subscription

```js {% file="example" %}
try {
  const subscriptionData = {
    "name": "event-sub",
    "endpoint_id": endpointId,
  };

  const response = await convoy.subscriptions.create(subscriptionData);
} catch (error) {
  console.log(error);
}
```

With the subscription in place, you're set to send an event.


### Sending an Event

```js {% file="example" %}
try {
  const eventData = {
    endpoint_id: endpointId,
    event_type: "payment.success",
    data: {
      event: "payment.success",
      data: {
        status: "Completed",
        description: "Transaction Successful",
        userID: "test_user_id808",
      },
    },
  };

  const response = await convoy.events.create(eventData);
} catch (error) {
  console.log(error);
}
```
{% /tab %}

{% tab label="Python" %}

## Install Client
Install convoy-python with:
```bash
$ pip install convoy-python
```

## Configure
```python {% file="example" %}
from convoy import Convoy
convoy = Convoy({"api_key":"your_api_key", "project_id": "your_project_id"})
```

In the event you're using a self-hosted convoy instance, you can define the `uri` as part of what is passed into tbe convoy's constructor.

```python {% file="example" %}
convoy = Convoy({ "api_key": 'your_api_key', "uri": 'self-hosted-instance',"project_id": "your_project_id" })
```

### Create an Endpoint

An endpoint represents a target URL to receive events.

```python {% file="Create endpoint" %}
endpointData = {
    "url": "https://0d87-102-89-2-172.ngrok.io",
    "description": "Default Endpoint",
    "secret": "endpoint-secret",
    "events": ["*"],
  }

(response, status) = convoy.endpoint.create({}, endpointData)
endpoint_id = response["data"]["uid"]
```

## Create a Subscription
After creating an endpoint, we need to subscribe the endpoint to events. 

```python {% file="Create subscription" %}
subscription_data = {
  "endpoint_id": endpoint_id
  "name": "New subscription"
}

(response, status) = convoy.subscription.create({}, subscription_data)
```

### Send an Event

To send an event, you'll need the `uid` we created in the earlier section.

```python {% file="Create event" %}
eventData = {
    "endpoint_id": endpoint_id,
    "event_type": "payment.success",
    "data": {
      "event": "payment.success",
      "data": {
        "status": "Completed",
        "description": "Transaction Successful",
        "userID": "test_user_id808",
      },
    },
  }

(response, status) = convoy.event.create({}, eventData)
```

## Cheers! 🎉

You have successfully created a Convoy application to send events to your configured endpoint.
{% /tab %}

{% tab label="PHP" %}

### Install Client

To install the package, you will need to be using Composer in your project.

To get started quickly,

```bash {% file="terminal" %}
$ composer require frain/convoy symfony/http-client nyholm/psr7
```

### Configure

Next, import the `convoy` module and setup with your auth credentials.

```php {% file="example" %}
use Convoy\Convoy;

$convoy = new Convoy(["api_key" => "your_api_key"]);
```

The SDK also supports authenticating via Basic Auth by defining your username and password.

```php {% file="example" %}
$convoy = new Convoy(["username" => "default", "password" => "default"]);
```

In the event you're using a self hosted convoy instance, you can define the url as part of what is passed into convoy's constructor.

```php {% file="example" %}
$convoy = new Convoy([
    "api_key" => "your_api_key",
    "uri" => "self-hosted-instance"
]);
```

### Create an Endpoint

```php {% file="example" %}
$endpointData = [
    "url" => "https://0d87-102-89-2-172.ngrok.io",
    "description" => "Default Endpoint",
    "secret" => "endpoint-secret",
    "events" => ["*"]
]

$response = $convoy->endpoints()->create($appId, $endpointData);
```

### Create a Subscription

```php {% file="example" %}
$subscriptionData = [
    "name" => "event-sub",
    "endpoint_id" => $endpointId
];

$response = $convoy->subscriptions()->create($subscriptionData);
```

With the subscription in place, you're set to send an event.

### Send an Event

To send an event, you'll need the `uid` from the application we created earlier.

```php {% file="example" %}
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
{% /tab %}

{% tab label="Ruby" %}

## Install Client

Add this line to your application's Gemfile:

```bash {% file="terminal" %}
$ gem 'convoy'
```

And then execute:

```bash {% file="terminal" %}
$ bundle install
```

Or install it yourself as:

```bash {% file="terminal" %}
$ gem install convoy
```

## Configure
To configure your client, provide your `api_key` and `project_id`, see below:
```ruby
require 'convoy'

Convoy.ssl = true
Convoy.api_key = "CO.M0aBe..."
Convoy.project_id = "23b1..."
```

## Create an Endpoint
An endpoint represents a target URL to receive webhook events. You should create one endpoint per user/business or whatever scope works well for you. 

```ruby
endpoint = Convoy::Endpoint.new(
  data: {
    "description": "Endpoint One",
    "http_timeout": "1m",
    "url": "https://webhook.site/73932854-a20e-4d04-a151-d5952e873abd"
  }
)

endpoint_response = endpoint.save
```

## Create an Subscription
After creating an endpoint, we need to subscribe the endpoint to events. 

```ruby
subscription = Convoy::Subscription.new(
  data: {
    endpoint_id: endpoint_id,
    name: 'ruby subscription'
  }
)

subscription_response = subscription.save
```

## Send an Event
To send an event, you'll need to pass the `uid` from the endpoint we created earlier.

```ruby
event = Convoy::Event.new(
  data: {
    endpoint_id: endpoint_id,
    event_type: "wallet.created",
    data: {
      status: "completed",
      event_type: "wallet.created",
      description: "transaction successful"
    }
  }
)

event_response = event.save
```
{% /tab %}

{% tab label="Golang" %}

## Install Client

Install convoy-go with

```bash {% file="terminal" %}
$ go get github.com/frain-dev/convoy-go
```

## Configure
```go {% file="example" %}
import (
    convoy "github.com/frain-dev/convoy-go"
)

  c := convoy.New(convoy.Options{
      APIKey: "your_api_key",
  })
```

The SDK also supports authenticating via Basic Auth by providing your username and password

```go {% file="example" %}
  c := convoy.New(convoy.Options{
      APIUsername: "default",
      APIPassword: "default",
  })
```

In the event you're using a self hosted convoy instance, you can define the url as part of what is passed into the `convoy.Options` struct

```go {% file="example" %}
   c := convoy.New(convoy.Options{
       APIKey: "your_api_key",
       APIEndpoint: "self-hosted-instance",
   })
```

## Create an Endpoint

```go {% file="example" %}
endpoint, err := c.Endpoints.Create(app.UID, &Convoy.CreateEndpointRequest{
    URL: "http://localhost:8081",
    Description: "Some description",
}, nil)

  if err != nil {
      log.Fatal("failed to create app endpoint \n", err)
  }
```

## Create a Subscription

```go {% file="example" %}
subscription, err := c.Subscriptions.Create(&Convoy.CreateSubscriptionRequest{
    Name: "<subscription name>"
    EndpointID: "<endpoint-id>"
}, nil)

  if err != nil {
      log.Fatal("failed to create app endpoint \n", err)
  }
```

With the subscription in place, you're set to send an event.

### Send an Event

To send an event, you'll need the `uid` from the application we created earlier.

```go {% file="example" %}
event, err := c.Events.Create(&convoy.CreateEventRequest{
        EndpointID: endpoint.UID,
		EventType: "test.customer.event",
		Data:      []byte(`{"event_type": "test.event", "data": { "Hello": "World", "Test": "Data" }}`),
	}, nil)

	if err != nil {
		log.Fatal("failed to create app event \n", err)
	}
```
{% /tab %}

{% /tabs %}
