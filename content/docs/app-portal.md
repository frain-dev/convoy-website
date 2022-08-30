---
title: App Portal
description: 'Convoy App Portal'
id: app-portal
order: 5
---

# Convoy App SDK

We extended the visibility we provide you on the Convoy dashboard to your users through app portal; your users can view, debug and inspect events sent to them. App Portal is available through `convoy-app.js` SDK, through which you can render our pre-built UI on your platform out of the box or use it to power your custom built UI for your users. We automatically manage your customer's application context so you don't have to be concerned about a customer seeing events from another customer.

## Usage

You can embed the `convoy-app.js` sdk into your client application through any of the following ways:
- Using Jsdelivr
```html
<script src="https://cdn.jsdelivr.net/npm/convoy-app.js@0.0.1/dist/bundle.js"></script>
```

- Installing the `convoy-app.js` node module
```bash[terminal]
npm i convoy-app.js
```

```
import * as Convoy from 'convoy-app.js';

// Or

<script src="node_modules/convoy-app.js/dist/bundle.js"></script>
 ```

## Initializing
You need two details to setup convoy app:
- **url;** this represents you Convoy instance url
- **api_key;** authentication token generated from your backend system see API reference [here](https://github.com/frain-dev/convoy/blob/v0.6.0-rc.3/docs/v3/openapi3.json)

**Javascript**
```js
const convoy = new Convoy({ uri: 'convoy instance url', api_key: 'app token from your backend'});
```

**Typescript**
```ts
declare const Convoy: any;

export class ConvoyExampleClass {
    convoy: any;

    constructor() {
        this.convoy = new Convoy({ uri: 'convoy instance url', api_key: 'app token from your backend'})
    }
}
```

## SDK Methods
### App Portal UI

You can use the SDK to load app portal within your client platform
```js
convoy.initAppPortal();
// You can optionally pass a DOM selector string, convoy-app uses #convoy-app by default
convoy.initAppPortal('#convoy-app');
```
![convoy app portal](/docs-assets/app-portal-ui.png)

### Create Subscription Modal

You can use the SDK to load a modal that renders a form for your users to create subscription
```js
convoy.createSubscription();
// You can optionally pass a DOM selector string, convoy-app uses #convoy-create-sub by default
convoy.createSubscription('#convoy-create-sub');
```
![convoy app portal](/docs-assets/app-portal-create-subscription.png)

### App Event

You can use the SDK to get the app's events
```js
try {
    const response = await convoy.events.all();
} catch (error) {
    console.log(error);
}


try {
    const response = await convoy.events.get(eventId);
} catch (error) {
    console.log(error);
}
```

### Event Deliveries

You can use the SDK to get the app's event deliveries
```js
try {
    const response = await convoy.eventDeliveries.all();
} catch (error) {
    console.log(error);
}

try {
    const response = await convoy.eventDeliveries.get(eventDeliveryId);
} catch (error) {
    console.log(error);
}


// get event delivery attempt

try {
    const response = await convoy.eventDeliveries.deliveryAttempts(eventDeliveryId);
} catch (error) {
    console.log(error);
}

try {
    const response = await convoy.eventDeliveries.deliveryAttempt(eventDeliveryId, eventDeliveryAttemptId);
} catch (error) {
    console.log(error);
}



// resend event

try {
    const response = await convoy.eventDeliveries.resend(eventDeliveryId);
} catch (error) {
    console.log(error);
}



// batch resend events

try {
    const response = await convoy.eventDeliveries.batchResend({ids: [...eventDeliveryIds]});
} catch (error) {
    console.log(error);
}
```

### Subscription

You can use the SDK to get the app's subscription
```js
try {
    const response = await convoy.subscriptions.all();
} catch (error) {
    console.log(error);
}


try {
    const response = await convoy.subscriptions.get(eventId);
} catch (error) {
    console.log(error);
}
```
