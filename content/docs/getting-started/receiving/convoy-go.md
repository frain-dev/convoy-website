---
title: Convoy Golang SDK
description: "Receiving a webhook event with Convoy Golang SDK."
id: convoy.go
---
The first step involved in receiving a webhook event is configuring your SDK client.

## Setup Client
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

Now that your client has been configured, create an application.

## Create an application

An application represents a user's application trying to receive webhooks. Once you create an application, you'll receive a `uid` as part of the response that you should save and supply in subsequent API calls to perform other requests such as creating an event.

```go[example]
  app, err := c.Applications.Create(&convoy.CreateApplicationRequest{
      Name: "My_app",
      SupportEmail: "support@myapp.com",
  }, nil)

  if err != nil {
      log.Fatal("failed to create app \n", err)
  }
```
After creating an application, you'll need to add an endpoint to the application you just created. An endpoint represents a target URL to receive events.

## Add application endpoint

```go[example]
endpoint, err := c.Endpoints.Create(app.UID, &Convoy.CreateEndpointRequest{
    URL: "http://localhost:8081",
    Description: "Some description",
}, nil)

  if err != nil {
      log.Fatal("failed to create app endpoint \n", err)
  }
```
