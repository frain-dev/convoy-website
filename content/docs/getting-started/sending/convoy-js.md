---
title: Convoy JavaScript SDK
description: "Send wehbook event with Convoy JavaScript SDK."
id: convoy.js
---

## Install Client
Install convoy.js with:
```bash
$ npm install convoy.js
```

## Configure
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

## Create an Endpoint

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

## Subscribe for Events

```js[example]
try {
  const subscriptionData = {
    "name": "event-sub",
    "endpoint_id": endpoint_id,
  };

  const response = await convoy.subscriptions.create(subscriptionData);
} catch (error) {
  console.log(error);
}
```

With the subscription in place, you're set to send an event.

## Send an Event

To send an event, you'll need the `uid` from the endpoint you created earlier.

```js[example]
try {
  const eventData = {
    endpoint_id: endpoint_id,
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

You have successfully created a Convoy application to send events to your configured endpoint.
