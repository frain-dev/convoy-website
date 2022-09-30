---
title: Convoy-Python SDK
description: 'Receiving webhook events with Python SDK.'
id: convoy-python
---

The first step involved in receiving a webhook event is configuring your SDK client.

### Setup client
Next, import the `convoy` module and setup with your auth credentials.

```python[example]
from convoy import Convoy
convoy = Convoy({"api_key":"your_api_key"})
```
The SDK also supports authenticating via Basic Auth by defining your username and password.

```python[example]
convoy = Convoy({"username":"default", "password":"default"})
```

In the event you're using a self hosted convoy instance, you can define the url as part of what is passed into convoy's constructor.

```python[example]
convoy = Convoy({ "api_key": 'your_api_key', "uri": 'self-hosted-instance' })
```

## Create an application

An application represents a user's application trying to receive webhooks. Once you create an application, you'll receive a `uid` that you should save and supply in subsequent API calls to perform other requests such as creating an event.

```python[example]
appData = { "name": "my_app", "support_email": "support@myapp.com" }
(response, status)  = convoy.applications.create({}, appData)
appId = response["data"]["uid"]

```

After creating an application, you'll need to add an endpoint to the application you just created. An endpoint represents a target URL to receive events.

### Add application endpoint


```python[example]
endpoint-data = {
    "url": "https://0d87-102-89-2-172.ngrok.io",
    "description": "Default Endpoint",
    "secret": "endpoint-secret",
    "events": ["*"],
  }

(response, status) = convoy.endpoint.create(appId, {}, endpoint_data)
```

Next, add a webhook source from which you'll be receiving events from.

## Add a webhook source

```python[example]
data = {
    "name": "sample source",
    "type": "http",
        "provider": "github",
        "verifier": {
            "hmac": {
                "secret": "strong"
            }
        }
    }

(response, error) = convoy.source.create({}, data)
```

Store the `uid` from the response returned. This is the source ID which will be used when creating a subscription.

The next step is to create a subscription to the webhook source. Subscriptions serve as the medium for retrieving events from the defined source.

## Create a subsctiption

```python[example]
data = {
  "name": "github-sub",
  "type": "http",
    "app_id": "<your-app-id>",
    "source_id": "<your-source-id>",
    "endpoint_id": "<your-endpoint-id>",
}

(response, error) = convoy.subscription.create({}, data)
```

With the subscription in place, you can now retrieve events sent to your application.

## Retrieve events

```python[example]
(events, error) = convoy.event.all({})
```

## Cheers! 🎉

You have sucessfully created a Convoy application to retrieve events sent to you from your webhook source. 