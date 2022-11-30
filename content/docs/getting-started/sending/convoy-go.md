---
title: Convoy Golang SDK
description: "Send webhook event with Convoy Golang SDK."
id: convoy.go
---

## Install Client
Install convoy-go, with:
```bash
$ go get github.com/frain-dev/convoy-go
```

## Configure
```go[example]
import (
    convoy "github.com/frain-dev/convoy-go"
)

  c := convoy.New(convoy.Options{
      APIKey: "your_api_key",
  })
```

The SDK also supports authenticating via Basic Auth by providing your username and password

```go[example]
  c := convoy.New(convoy.Options{
      APIUsername: "default",
      APIPassword: "default",
  })
```

In the event you're using a self hosted convoy instance, you can define the url as part of what is passed into the `convoy.Options` struct

```go[example]
   c := convoy.New(convoy.Options{
       APIKey: "your_api_key",
       APIEndpoint: "self-hosted-instance",
   })
```

## Create an Endpoint

```go[example]
endpoint, err := c.Endpoints.Create(app.UID, &Convoy.CreateEndpointRequest{
    URL: "<your endpoint>",
    Description: "<endpoint description>",
}, nil)

  if err != nil {
      log.Fatal("failed to create app endpoint \n", err)
  }
```

The next step is to create a subscription to the webhook source. Subscriptions are the conduit through which events are routed from a source to a destination on Convoy.

## Subscribe for Events

```go[example]
subscription, err := c.Subscriptions.Create(&Convoy.CreateSubscriptionRequest{
    Name: "<subscription name>"
    EndpointID: "<endpoint-id>"
}, nil)

  if err != nil {
      log.Fatal("failed to create app endpoint \n", err)
  }
```

With the subscription in place, you're set to send an event.

## Send an Event

To send an event, you'll need the `uid` from the application you created earlier.

```go[example]
event, err := c.Events.Create(&convoy.CreateEventRequest{
        EndpointID: endpoint.UID,
		EventType: "test.customer.event",
		Data:      []byte(`{"event_type": "test.event", "data": { "Hello": "World", "Test": "Data" }`),
	}, nil)

	if err != nil {
		log.Fatal("failed to create app event \n", err)
	}
```

## Cheers! 🎉

You have successfully created a Convoy application to send events to your configured endpoint.
