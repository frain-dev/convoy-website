---
title: Convoy Ruby SDK
description: "Convoy Ruby SDK Configuration"
id: convoy-rb
---

## Installation

Add this line to your application's Gemfile:

```console[terminal]
$ gem 'convoy'
```

And then execute:

```console[terminal]
$ bundle install
```

Or install it yourself as:

```console[terminal]
$ gem install convoy
```

## Setup Client

```ruby
require 'convoy'

Convoy.ssl = true
Convoy.api_key = "CO.M0aBe..."
Convoy.path_version = "v1"
Convoy.base_uri = "https://dashboard.getconvoy.io/api"

```

## Creating an application
An application represents a user's application trying to receive webhooks. Once you create an application, you'll receive a `uid` as part of the response that you should save and supply in subsequent API calls to perform other requests such as creating an event.

```ruby
app = Convoy::Application.new(
  params: {
    groupID: "c3637195-53cd-4eba-b9df-e7ba9479fbb2"
  },
  data: {
    name: "Integration One"
  }
)

app_response = app.save
```

### Add an Endpoint to the Application
After creating an application, you'll need to add an endpoint to the application you just created. An endpoint represents a target URL to receive events.

```ruby
endpoint = Convoy::Endpoint.new(
  app_id,
  data: {
    "description": "Endpoint One",
    "http_timeout": "1m",
    "url": "https://webhook.site/73932854-a20e-4d04-a151-d5952e873abd"
  }
)

endpoint_response = endpoint.save
```

## Subscribe For Events
After creating an endpoint, we need to subscribe the endpoint to events. 

```ruby
subscription = Convoy::Subscription.new(
  data: {
    app_id: app_id,
    endpoint_id: endpoint_id,
    name: 'ruby subscription',
    filter_config: {
      event_types: [ "*" ]
    }
  }
)

subscription_response = subscription.save
```

## Publish an Event
Now let's publish an event.

```ruby
event = Convoy::Event.new(
  data: {
    app_id: app_id,
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

## Cheers! 🎉

You have sucessfully created a Convoy application to send events to your configured endpoint.

