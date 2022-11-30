---
title: Convoy JavaScript SDK
description: "Convoy JavaScript SDK Configuration"
id: convoy.js
---

### Install Client

Install convoy.js with

```bash[terminal]
$ npm install convoy.js
```

### Configure

Next, require the `convoy` module and setup with your auth credentials.

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

### Create an Endpoint

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

## Create a subscription

```js[example]
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

```js[example]
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
