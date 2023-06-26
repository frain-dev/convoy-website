---
title: 'Testing Webhooks: Convoy Playground'
feature_image: introducing-convoy-playground.png
post_image: introducing-convoy-playground.png
primary_author:
    name: Emmanuel Aina
    twitter: emmanuelaina_
primary_tag: Convoy
tags:
    - Convoy
    - Engineering
featured: true
description: With Convoy Playground, we’re taking a step further towards ensuring that integrating and sending webhook events is ridiculously easy for every engineer and engineering team, providing as many
published_at: 2023-06-26T10:00:00.000+00:00
---

[![Introducing Convoy Playground](/blog-assets/playground-video-img.png)](https://www.youtube.com/watch?v=boRhKgQYIDM)

Welcome to day one of Convoy Launch week! Today, we're introducing [Convoy Playground](https://playground.getconvoy.io)!

With [Convoy Playground](https://playground.getconvoy.io), we’re taking a step further towards ensuring that integrating and sending webhook events is ridiculously easy for every engineer and engineering team, providing as many resources as possible, required at any level.

Our goal with Convoy Playground is simple: creating a resource for engineers to easily test their webhook integrations end to end; completely powered by Convoy.

While Convoy enables you to send and receive webhook events, we’ve also baked this into our Playground:

-   Test with receiving events from any source with a source URL.
-   Test sending out an event to an endpoint by setting a source destination.
-   Debugging events: request and response data.

## Test Incoming Events with Convoy Playground

![Source URL](/blog-assets/Source-URL.png)

On the first load, Playground automatically creates a source URL you can copy and start receiving webhook events with. All you need to do is copy this URL, paste it into your webhook event source, and start testing and debugging with received events.

![Events and request / response details (Incoming)](/blog-assets/Events-and-request-response-details-Incoming.png)

## Test Outgoing Events with Convoy Playground

![Source URL](/blog-assets/Source-URL-and-destination-input.png)

Like on Convoy, you can also test sending out webhook events with Playground by adding a destination endpoint. Simply click the add destination button, paste your endpoint URL, and you’re good to go with proxying webhook events from your source URL to your custom endpoint destination.

![Events and request / response details (Outgoing)](/blog-assets/Events-and-request-response-details-outgoing.png)

## Debugging Events

Another thing that is core to Convoy is the ability to debug your webhook events, which we’re also extending to our Playground. On Convoy Playground, you can view events request and response bodies and headers, helping you get to the root of possible problems, if any.

![request / response details](/blog-assets/Request-response-details.png)

## Conclusion

We have loads of other features lauching this week, you can stay tunned and follow up on this journey on our [website](https://launchweek.getconvoy.io). As usual, your feedback is always welcome, please feel free to join us on our community [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email); we can't wait to have you.
