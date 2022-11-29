---
title: Convoy-Python SDK
description: 'Sending an event with Convoy Python SDK.'
id: convoy-python
---

The first step involved in sending a webhook event is configuring your SDK client.

## Setup client
```python[example]
from convoy import Convoy
convoy = Convoy({"api_key":"your_api_key", "project_id": "your_project_id"})
```

In the event you're using a self-hosted convoy instance, you can define the `uri` as part of what is passed into tbe convoy's constructor.

```python[example]
convoy = Convoy({ "api_key": 'your_api_key', "uri": 'self-hosted-instance',"project_id": "your_project_id" })
```
### Create an endpoint

An endpoint represents a target URL to receive events.

```python[Create endpoint]
endpointData = {
    "url": "https://0d87-102-89-2-172.ngrok.io",
    "description": "Default Endpoint",
    "secret": "endpoint-secret",
    "events": ["*"],
  }

(response, status) = convoy.endpoint.create({}, endpointData)
endpoint_id = response["data"]["uid"]
```

## Subscribe for events
After creating an endpoint, we need to subscribe the endpoint to events. 

```python[Create subscription]
subscription_data = {
  "endpoint_id": endpoint_id
  "name": "New subscription"
}

(response, status) = convoy.subscription.create({}, subscription_data)
```

### Sending an event

To send an event, you'll need the `uid` we created in the earlier section.

```python[Create event]
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