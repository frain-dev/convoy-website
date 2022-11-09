---
title: How To Debug Your Webhooks With Convoy CLI
feature_image: debug-webhooks.png
post_image: debug-webhooks.png
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: true
description: At Convoy, we make use of retention policies to enable you back up your existing webhook data. In this article, Raymond discusses what a retention policy is and its role in Convoy's engineering process
published_at: 2022-10-12T10:00:00.000+00:00
---

Debugging webhook configuration can be very tedious, many times you are required to plumb together multiple tools to get it to work end to end, the tools include but are not limited to a proxy (e.g. ngrok), an HTTP dump (e.g. webhook.site) and most importantly the service provider’s server which triggers the webhook; which might be Convoy if you are the service provider. We have built tools to bridge that gap by allowing Convoy users and their users (in the case of API companies) debug event headers and payloads. Using our new CLI tools you can test event delivery with ease and in minutes.

## Components

We added new components to make this possible which I’ll go into in this section

### Stream Server

Convoy ships with a separate stream server which is communicated with using web sockets. This server runs independently of the main Convoy server, it listens on a MongoDB change stream and forwards saved events to registered devices as well as already existing application endpoints. This can be started by running `convoy stream`, it uses the same configuration file as the main convoy server.

### Stream Client

The client is used to communicate with the stream server. It can be used to register applications, listen to events sent in the past or tail events as they come in. 

# Putting it all together

To effectively use these tools you would need to connect your local machine to a Convoy host; the host could be our hosted cloud at [https://cli.getconvoy.io](https://cli.getconvoy.io), your hosted Convoy stream server instance or a locally hosted stream server instance.

## Create a CLI Key

We need to create a `CLI key`. `CLI keys` are access tokens that are scoped to one application. They can only be used to authenticate stream client and receive events from the stream server. To create one, go the application’s page and click on the “+” button.

![Untitled](Debugging%20your%20webhooks%20with%20the%20Convoy%20CLI%20b64ac0aa11934657bd0069c8470da5a8/Untitled.png)

## Register the app

Copy the generated key and proceed to your terminal to register the application. You can do this by running `convoy login`.

```console[terminal]
$ convoy login --host "https://cli.getconvoy.io" --api-key "API_KEY"
```

![Untitled](Debugging%20your%20webhooks%20with%20the%20Convoy%20CLI%20b64ac0aa11934657bd0069c8470da5a8/Untitled%201.png)

## Listen for events

To start listening to events we will need to run the `listen` command, passing the source and host where you want the events to be forwarded to. This will tail events sending them to both our device and the endpoint as they are received by the configured source.

```console[terminal]
# only tail events as they come in
$ convoy listen --source="f9116a91-b9d5-4a68-b5b0-75a4c115469a" \
	--forward-to "https://webhook.site/2f1adc9b-1e2b-4809-bd42-3022be6eb3fa" 
```

> 💡 The source flag is only required for incoming projects.

When listening for events the `device` is set to active and a `subscription` is created using the device and source passed to the `--source` flag. This subscription will not have an endpoint since the events are be delivered to the device.

![Untitled](Debugging%20your%20webhooks%20with%20the%20Convoy%20CLI%20b64ac0aa11934657bd0069c8470da5a8/Untitled%202.png)

![Untitled](Debugging%20your%20webhooks%20with%20the%20Convoy%20CLI%20b64ac0aa11934657bd0069c8470da5a8/Untitled%203.png)

### Dashboard changes

When a device is offline, it won’t be able to receive events, so all it’s event deliveries will be in the `discarded` state. An icon which is used to denote that an event delivery is meant for a device is also displayed on the dashboard.

![Events dashboard showing discarded events](Debugging%20your%20webhooks%20with%20the%20Convoy%20CLI%20b64ac0aa11934657bd0069c8470da5a8/Untitled%204.png)

Events dashboard showing discarded events

### Replaying missed events

Using the listen command, we can chose to tail events as they come in or fetch past events which were sent while the device was offline. To fetch past events, we can replay all the discarded event deliveries by passing either a date string or a valid ISO date timestamp to the `--since` flag when running the listen command.

```console[terminal]
# replay all discarded events since the last 12 hours
# and tail events as they come in
$ convoy listen --source="f9116a91-b9d5-4a68-b5b0-75a4c115469a" \
	--forward-to "https://webhook.site/2f1adc9b-1e2b-4809-bd42-3022be6eb3fa" \
	--since "12h"

# replay all discarded events since the timestamp
# and tail events as they come in
$ convoy listen --source="f9116a91-b9d5-4a68-b5b0-75a4c115469a" \
	--forward-to "https://webhook.site/2f1adc9b-1e2b-4809-bd42-3022be6eb3fa" \
	--since "2022-10-31"
```

![Running the listen command with —since as a valid ISO timestamp](Debugging%20your%20webhooks%20with%20the%20Convoy%20CLI%20b64ac0aa11934657bd0069c8470da5a8/Untitled%205.png)

Running the listen command with —since as a valid ISO timestamp

![Running the listen command with —since as a valid time duration string](Debugging%20your%20webhooks%20with%20the%20Convoy%20CLI%20b64ac0aa11934657bd0069c8470da5a8/Untitled%206.png)

Running the listen command with —since as a valid time duration string

# Conclusion

Using Convoy’s CLI we can reduce the time taken to debug webhook configurations. We can 

easily […]