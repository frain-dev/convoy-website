---
title: Convoy Ruby SDK
description: "Convoy Ruby SDK Configuration"
id: convoy-rb
---

## Install Client

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
