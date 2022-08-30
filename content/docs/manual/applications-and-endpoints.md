---
title: Applications and Endpoints
description: 'Describe applications and endpoints in Convoy'
id: applications-and-endpoints
order: 3
---

Applications and Endpoints
======
An application refers to either your backend apps or your user’s backend application for an incoming project and outgoing project respectively. It can contain more than one endpoint. This enables users to register multiple endpoints under a single application and give Convoy the ability to fan-out an event to one or more endpoints.

An endpoint is a specific destination that can receive webhook events. Each endpoint belongs to an application. An endpoint can be configured with http_timeout.  Both applications and endpoints can be managed over the API and the dashboard.

## App Portal
The app portal is designed for the outgoing webhooks project. This is an embeddable iframe that gives users full management capabilities over their applications. Your users can directly add endpoints, subscribe endpoints to events and debug any issues with the webhooks log. An app portal looks like this: 
![app portal](/docs-assets/app-portal-ui.png)

It contains a list of subscriptions and events sent to those endpoints.
