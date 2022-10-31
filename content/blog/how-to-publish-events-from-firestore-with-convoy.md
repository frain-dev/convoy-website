---
title: Publish Webhook Events From Firebase Firestore With Convoy
feature_image: firestore-convoy.png
post_image: firestore-convoy.png
primary_author:
    name: Emmanuel Aina
    twitter: emmanuelaina_
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: false
description: Firebase Cloud Functions is a powerful tool that allows you to listen and configure multiple actions triggered by your user's activities on any of your connected Firebase services; real-time database, Firestore, storage, authentication, etc.  Learn how
published_at: 2022-10-19T13:30:00.000+00:00
---

Firebase Cloud Functions is a powerful tool that allows you to listen and configure multiple actions triggered by your user's activities on any of your connected Firebase services: real-time database, Firestore, storage, authentication, etc.

On the other side, Convoy makes it ridiculously easy for you to send webhook events to multiple endpoints or apps. Convoy is built to be flexible and scalable, to fit into your sophisticated and simple systems. Webhooks have become a very critical service provided by software services, enabling integrations and inter-service communications.

In this article, I’ll be taking you through how to trigger a webhook event when new data is added to an `events` document in a Firebase Firestore collection with Convoy in a couple of minutes. You’ll be able to use this similarly for Firebase Auth, Storage, etc. All you’ll need to follow along is a Firebase project (you can learn how to set that up [here](https://firebase.google.com/docs/functions/get-started)) and a Convoy project.

First, let’s set up Firebase, our event source.

## Cloud Function Setup

To create a Firebase Cloud Function, you need to install the Firebase CLI tool by running the command below in your terminal:

```console[terminal]
$ npm install -g firebase-tools
```

Next, we’ll use the Firebase CLI tool to run the cloud function setup wizard to help us get started quickly. Follow the steps outlined below:

1. Run `firebase login` in your terminal to authenticate yourself against your firebase account.
2. From your project directory, run `firebase init firestore`, select your preferred Firebase project and preferably select the default options for the sake of the article (read more on this [here](https://firebase.google.com/docs/firestore/quickstart#create)).
3. Lastly, run `firebase init functions` and select npm as a preferred pack manager tool, and install the necessary modules.

After this setup, you should have some files created automatically for you in the following structure:

```console[Project structure]
myproject
 +- .firebaserc    # Hidden file that helps you quickly switch between
 |                 # projects with `firebase use`
 |
 +- firebase.json  # Describes properties for your project
 |
 +- functions/     # Directory containing all your functions code
      |
      +- .eslintrc.json  # Optional file containing rules for JavaScript linting.
      |
      +- package.json  # npm package file describing your Cloud Functions code
      |
      +- index.js      # main source file for your Cloud Functions code
      |
      +- node_modules/ # directory where your dependencies (declared in
                       # package.json) are installed
```

In the next section, you’ll set up your Convoy project.

## Setup Convoy

1. You can get started with Convoy by signing up on [Convoy Dashboard](https://dashboard.getconvoy.io), or running your [local instance](https://github.com/frain-dev/convoy) and logging in and creating an organization.
   You should see something like this when this is done

![Dashboard](/blog-assets/dashboard.png)

2. Create a new outgoing project from your dashboard. An outgoing project is a project for sending out webhook events.

![Project type](/blog-assets/project-type.png)

3. After creating your Convoy `outgoing` project, you should get a token for authenticating requests using Convoy API, for the said project. You should copy and keep it somewhere safe temporarily, we’ll get back to it in a bit.

![Project API Key](/blog-assets/api-key.png)

> For security reasons, this token will not be available to you when you again after closing the modal

Proceeding from the create project modal, you’ll be prompted with a project setup modal on how to set up your outgoing project with the Convoy SDKs, this tutorial is basically going to take you through that process, for Javascript.

4. In your newly created project folder, setup npm and install the Convoy SDK, see the reference commands below:

```console[terminal]
$ npm init
$ npm install convoy.js
```

5. Now we have Convoy.js installed, create an `index.js` file and config with your auth credentials (remember the token you copied and saved somewhere after creating your project?), see sample configuration below:

```js[index.js]
const { Convoy } = require('convoy.js');
const convoy = new Convoy({ api_key: 'your_api_key' })
```

In the event you're using a self-hosted Convoy instance, you can define the URL as part of what is passed into Convoy's constructor.

```js[index.js]
const convoy = new Convoy({ api_key: 'your_api_key', uri: 'self-hosted-instance' })
```

6. Now let’s setup our Convoy project to fire out events, with two basic steps:

    1. **Create an application**: Apps on Convoy are the events receivers. Think of apps like the users you’re going to be sending events to. Each app is required to have an endpoint (can be more than one endpoint), where the events for the app will be sent to.

        Let’s create an app with the SDK:

        ```js[index.js]
        function createApp() {
          try {
            const appData = { name: "my_app", support_email: "support@myapp.com" };
            const response = await convoy.applications.create(appData);

            // You're to save this app id, you'll need it to reference this app
            // with it's endpoint and event
            const appId = response.data.uid;
          } catch (error) {
            console.log(error);
          }
        }
        ```

        Next, we add an endpoint to our newly created app:

        ```js[index.js]
        function createAppEndpoint(appId) {
          try {
            const endpointData = {
              url: "https://0d87-102-89-2-172.ngrok.io",
              description: "Default Endpoint",
              secret: "endpoint-secret",
              "http_timeout": "10s"
            };

            // appId from our app creation above
            const response = await convoy.endpoints.create(appId, endpointData);

            // You're to save this endpoint id, you'll need it to reference this
            // endpoint in future
            const endpointId = response.data.uid;
          } catch (error) {
            console.log(error);
          }
        }
        ```

    2. **Create a subscription**: Subscriptions on Convoy connect events to their respective application endpoint; this is what powers the extra juice on Convoy, stay with me.

        You can subscribe an application endpoint to specific event types, think of it like this: you can subscribe `payment.success`, `payment.failed` and other payment-related events to `../web/payment` endpoint and invoice-related events like `invoice.created`, `invoice.processing`, etc. to `../web/invoice` endpoint.

        ```js[index.js]
        function createSubscription(endpointId, appId) {
            try {
            const subscriptionData = {
                app_id: appId,

                // should Convoy disable the subscription's endpoint when the max retry
                // limit has been reached and the endpoint continues to fail
                disable_endpoint: true,

                endpoint_id: endpointId,
                group_id: projectId,
                name: "New sub",

                // is this subscription for an incoming or outgoing project
                type: "outgoing"

                filter_config: {
                    // event types you'll like to subscribe to, * here is a wildcard
                    // to subscribe to all events
                    event_types: ["*"]
                }
            };

            const response = await convoy.subscriptions.create(subscriptionData);
            } catch (error) {
                console.log(error);
            }
        }
        ```

You can confirm your new Application and Subscription on the Convoy Dashboard, on the Apps page and Subscriptions page respectively.

Now we’re good to go to write our cloud function.

## Writing The Cloud Function

1. In the `index.js` file in our function folder, we’ll import two critical firebase modules as shown below:

    ```js[index.js]
    // The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
    const functions = require('firebase-functions');

    // The Firebase Admin SDK to access Firestore.
    const admin = require('firebase-admin');
    admin.initializeApp();
    ```

2. Next, create our cloud function that listens to a Firestore DB update:

    ```js[index.js]
    exports.webhook = functions.firestore.document('/events/{documentId}')
        .onCreate((snap, context) => {
          // Grab the current value of what was written to Firestore.
          const newData = snap.data();

    			// ... code for sending events to Convoy
        });
    ```

3. With that done, the next step is to install Convoy in our function folder; we’ll use the Convoy Javascript SDK for this.

    ```console[terminal]
    npm install convoy.js
    ```

4. With that done, we can now import the Convoy SDK into our function.

    ```js[index.js]
    const { Convoy } = require('convoy.js');
    // your_api_key is the token gotten from the Convoy project created earlier
    const convoy = new Convoy({ api_key: 'your_api_key' })
    // if you're using your self hosted Convoy instance, you should use the below
    // code snippet instead
    const convoy = new Convoy({ api_key: 'your_api_key', uri: 'self-hosted-instance url' })

    exports.webhookEvent = functions.firestore.document('/events/{documentId}')
        // Grab the current value of what was written to Firestore.
          const newData = snap.data();

    			// ... code for sending events to Convoy
        });
    ```

5. Lastly, we want to check the data added to our events collection, pick the required details and send out an event:

    ```js[index.js]
    const { Convoy } = require('convoy.js');
    // your_api_key is the token gotten from the Convoy project created earlier
    const convoy = new Convoy({ api_key: 'your_api_key' })
    // if you're using your self hosted Convoy instance, you should use the below
    // code snippet instead
    // const convoy = new Convoy({ api_key: 'your_api_key', uri: 'self-hosted-instance url' })

    exports.webhookEvent = functions.firestore.document('/events/{documentId}')
        .onCreate((snap, context) => {
          // new data added to our events collection
          // { app_id: string, data: any, event_type: string }
          const newData = snap.data();

          // use the new data to build a payload for Convoy
          // containing the app_id (the event receiver) and event type (which the app subscribes to)
          const eventData = {
            app_id: newData.app_id,
            event_type: newData.event_type,
            data: newData.data,
          };

          // send to Convoy
          return convoy.events
            .create(eventData)
            .then((response) => snap)
            .catch((error) => error);
          } catch (error) {
            return error;
          }
        });
    ```

    The above code snippet is assuming that the data payload added to the events collection looks like this:

    ```json[Sample payload]
    {
      "app_id": "3774387-...",
      "event_type": "payment.success",
      "data": {
        // some data you want to send
      }
    }
    ```

    We’ll use this data to build the event payload which requires the following:

    - app_id: The app id of the app that should receive this event
    - event_type: The event type of the event you’ll like to send
    - data: The actual item then sent in the event payload

    With the Convoy configuration in place, run the command below to test the function locally:

    ```console[terminal]
    $ firebase emulators:start
    ```

    The command above starts a local server on port `4000`. Your local function logs can be viewed at [http://localhost:4000/logs](http://localhost:4000/logs) and the local FireStore DB at [http://localhost:4000/firestore](http://localhost:4000/firestore).

With all things going well, you should see screens like these:

![New events collection in the local Firestore](/blog-assets/collections.png)

New events collection in the local Firestore:

![Logs from the fired function](/blog-assets/logs.png)

Adding new data to your event collection will now automatically trigger a webhook event.

Lastly, verify that events have been sent to your convoy instance from your Convoy dashboard:

![Events sent to Convoy](/blog-assets/firebase-events.png)

With this basic setup, you’re good to go with sending out webhook events automatically triggered by an update to your Firebase Firestore Collection.

You can similarly listen to Firebase Authentication and other Firebase actions and trigger a resulting webhook event after (more details on that [here](https://firebase.google.com/docs/functions/use-cases)), using the [Convoy SDKs](https://getconvoy.io/docs/sdk).

## Conclusion

Convoy provides the ability to receive webhooks from various providers and fans out to your applications. In this article, you learned how to trigger webhook events to your Convoy instance when an event is added to your Firebase Firestore collection.

Convoy provides you with reliability and replayability out-of-the-box. If this sounds suitable for your architecture, [try it out](https://dashboard.getconvoy.io) and give us feedback on our [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) community!
