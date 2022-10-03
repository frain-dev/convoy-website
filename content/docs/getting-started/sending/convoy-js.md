---
title: Convoy JavaScript SDK
description: "Send wehbook event with Convoy JavaScript SDK."
id: convoy.js
---

The first step involved in sending a webhook event is configuring your SDK client.

## Setup client
```js[example]
const { Convoy } = require("convoy.js");
const convoy = new Convoy({ api_key: "your_api_key" });
```

The SDK also supports authenticating via Basic Auth by defining your username and password.

```js[example]
const convoy = new Convoy({ username: "default", password: "default" });
```

In the event you're using a self hosted convoy instance, you can define the url as part of what is passed into convoy's constructor.

```js[example]
const convoy = new Convoy({
  api_key: "your_api_key",
  uri: "self-hosted-instance",
});
```

Now that your client has been configured, create a convoy application.

## Creating an application

An application represents a user's application trying to receive webhooks. Once you create an application, you'll receive a `uid` as part of the response that you should save and supply in subsequent API calls to perform other requests such as creating an event.

```js[example]
try {
  const appData = { name: "my_app", support_email: "support@myapp.com" };

  const response = await convoy.application.create(appData);

  const appId = response.data.uid;
} catch (error) {
  console.log(error);
}
```

After creating an application, you'll need to add an endpoint to the application you just created. An endpoint represents a target URL to receive events.

### Add application endpoint


```js[example]
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

The next step is to create a subscription to the webhook source. Subscriptions are the conduit through which events are routed from a source to a destination on Convoy.

## Create a subscription

```js[example]try {
  const subscriptionData = {
    "name": "event-sub",
    "app_id": appId,
    "endpoint_id": endpointId,
  };

  const response = await convoy.subscriptions.create(appId, subscriptionData);
} catch (error) {
  console.log(error);
}
```

With the subscription in place, you're set to send an event.

## Send an event

To send an event, you'll need the `uid` from the application you created earlier.

```js[example]
try {
  const eventData = {
    app_id: appId,
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

## Cheers! 🎉

You have sucessfully created a Convoy application to send webhook events to your configured endpoint.