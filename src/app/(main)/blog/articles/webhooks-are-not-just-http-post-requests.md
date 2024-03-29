---
title: Webhooks are simply HTTP Post requests
feature_image: webhooks-are-simply-http-post-requests.png
post_image: webhooks-are-simply-http-post-requests.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false 
description: Occasionally, I meet an engineer to whom I explain what Convoy does, and they go on to say —isn’t webhooks simply an HTTP Post request; why do we need a service for that, some express this with a bit of disdain. This reminds me of a comment I received years back when I newly learned about feature flags as a concept and LaunchDarkly as a product to add flags to your application.
published_at: 2024-03-29T18:00:00.000+00:00
---

Occasionally, I meet an engineer to whom I explain what [Convoy](https://getconvoy.io) does, and they go on to say —isn’t webhooks simply an HTTP Post request; why do we need a service for that, some express this with a bit of disdain. This reminds me of a comment I received years back when I newly learned about feature flags as a concept and [LaunchDarkly](https://launchdarkly.com/) as a product to add flags to your application. I was enthralled by the idea that code could be in production, but only a few users can access it, and the number of possibilities from thereon. I immediately became a fan. You can imagine the shock on my face when a friend said to me — is that not simply if/else? Why do we need a product for it? 

I also occasionally meet engineers who have worked with webhooks in production at scale and have a better sense of the requirements and complexities involved. As a corollary, the extent of your understanding directly correlates to the level of pain you’ve experienced with webhooks in production.

Abstractions are everywhere in software engineering and at several layers. We write them because we want to either hide away complexity or re-use complexity. The easiest way to disdain an abstraction is to be oblivious to the requirements of the abstraction, which would lead to reducing the abstraction to the limitation of your understanding. Another hidden benefit of abstraction is getting it right opens up other benefits/possibilities that previously did not exist. I am reminded of this tweet by [Greg Brockman](https://twitter.com/gdb), which I love:

{% tweet url="https://twitter.com/gdb/status/1764005795799400796" /%}

Business requirements determine the abstraction, and we all know business requirements are fluid. And it even gets more interesting if your abstraction is needed across several verticals. The shape and form of the abstraction would be different for each but intuitive enough for both. Effectively, what you know as the API today is no longer the API tomorrow. We need to continuously evolve our understanding of the business requirements that shape our abstractions; that is the only way to acknowledge better APIs truly. Otherwise, sooner or later, you’ll ask yourself who moved my cheese.

Practically, this mirrors my experience with building Convoy and talking to users — there’s a new abstraction users are constantly seeking. The environment now is completely different from the environment years ago, where we did not have the proliferation of SaaS, Serverless/edge functions were nowhere to be found, and honestly, leading companies have built excellent webhook systems that the requirements are way higher than before, so get on with the times. :) The HTTP Post Idea does not suffice! A new abstraction is being built and is here to stay.

To wrap up this rant, I’m the founder of a [webhooks gateway](https://getconvoy.io/blog/what-are-webhook-gateways) company, and my bias is staring me right in the face. But much more than that, my mission is to help developers build secure and reliable apps in production, and I hope that when you read through our [blog](https://getconvoy.io/blog) and [docs](https://docs.getconvoy.io), you’ll learn how to achieve that with webhooks and events in your apps. 

Bye for now!
