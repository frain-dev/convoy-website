---
title: Convoy JavaScript SDK
description: "Convoy JavaScript SDK Configuration"
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

Now that your client has been configured, create an application.

## Create an application

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

## Add application endpoint

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
