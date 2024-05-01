---
title: "Lessons on webhooks, platform engineering and api versioning: a chat with Stanislav Zmiev"
feature_image: interview-with-stanislav-zmiev.png
post_image: interview-with-stanislav-zmiev.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false 
description: We sat down briefly with Stanislav Zmiev, who's the tech lead of platform engineering at Monite to chat about platform engineering, how they designed their webhooks gateway, and some of thoughts on api versioning. Enjoy 🎉 
published_at: 2024-04-30T18:00:00.000+00:00
---

![interview-with-stanislav-zmiev.png](/blog-assets/interview-with-stanislav-zmiev.png)

Stanislav is the tech lead of platform engineering at [Monite](https://monite.com/), where he has been for two years. We sat down briefly with him to chat about Platform Engineering, how they designed their webhooks gateway, and some of thoughts on api versioning. Enjoy 🎉

## You’re the Tech Lead for Monite’s Platform Engineering team. Tell us, what does platform engineering mean to you? How does this translate to your everyday work?
    
    It’s the same as any engineer: I lead a team, build products, conduct one-to-ones, communicate with clients, decide on architecture, etc. The difference is that my clients are almost exclusively developers in the same company as me. My product is the tooling to make sure these developers are as effective and happy as possible.
    
    My team maintains our kubernetes cluster, cloud services, a large chunk of both internal and external microservices, internal libraries, developer tooling, our monitoring solution, release manager, and a bunch of smaller internal tools.
    
## As a Platform Engineering tech lead, how do you determine the projects you tackle? Is there a certain threshold of complexity, or are all cross-functional problems owned by the platform engineering team?
    
    For a long time, all of our internal tools were managed almost exclusively by the platform team. We got into a habit of calling all of the technically complex non-business tasks the “platform tasks”, which are managed and completed by the platform team.
    
    I was the one determining what tasks were and were not important based on personal discussions with the business teams, public polls, and architectural councils — always trying to get the gist of what is the most important set of problems at the moment.
    
    However, I am hoping to slowly move away from this approach: I am a firm believer that platform teams managing the entirety of infrastructure is a dream only achievable by large companies who have the resources to build them. Monite is a startup and the classical DevOps is preferable in our scenario where infrastructure is co-managed by the cross-functional teams. Many pieces of infrastructure will still need a degree of centralization but I am hoping to build an environment where the business teams are going to be encouraged to build and support infrastructural tools with assistance from the platform team. So the platform team would effectively focus on helping and teaching the cross-functional teams until we grow large enough for the platform team to start managing the entirety of our infrastructure again.
    
    This approach decreases the bus factor, helps the engineers from the cross-functional teams grow in terms of infrastructural skills, and builds a powerful trust between the teams.  
    
 ## Let’s talk about your webhooks delivery system. Do you have a fun code name for the project? What is it called internally?
    
    I am afraid we settled for the boring “events”. I guess we are just conservative when it comes to naming. 
    
## Can you give us a high-level description of the system’s architecture and the technologies involved?
    
    It is quite simple actually. Python with FastAPI  for the logic and postgres both for storage and for creating asynchronous events. We settled on such a simple model after realizing that keeping everything in postgres provides us with
    
    Business services use postgres-based transactional outbox for sending events to our “events” service and then this service uses the same mechanism to deliver events to our consumers. The retries are also done with our transactional outbox, providing our users with at-least once guarantees across the board.
    
    We also do retries with a backoff and notify our users if one of their endpoints keeps failing. As a precationary measure, we also provide the polling endpoint that allows our users to select all events from a certain time frame even if they lost the original webhooks. 
    
## Engineers often say webhooks are pretty trivial to implement. Effectively, It’s simply a HTTP Post Request. Having built this in production, what are your thoughts on this comment
    
    Well, that’s what we started with: “Just a POST request”. Then you quickly realize that it’s a group of POST requests for every client of yours that set it up. So you need a separate API just for webhooks. Remember that your clients might want to receive a single webhook on multiple endpoints so you have to set up logic for that. Then you realize that your clients want to have webhooks from certain events to be sent onto certain endpoints — you gotta add that as well.
    
    That’s where you realize that you need to somehow move these requests out of your core logic because they are gonna take too much time. Down the line you quickly realize that you need an asynchronous job or service for sending requests that needs to be really fast and that needs to rate limit itself so that it does not overwhelm your clients. Then you figure out that you will probably need a [transactional outbox](https://microservices.io/patterns/data/transactional-outbox.html) to guarantee **at least once** delivery.
    
    If you decide to make your webhooks user-friendly, you will need to add a body of  the changed entity within your system to the webhook — making them even more complex. If you ever think of adding API versioning and microservices into the mix, you will quickly start grasping for air and blaming yourself for ever getting into this mess.
    
    We were unluckly enough to have almost every possible complication in our situation: we had API versioning, microservices, object bodies in webhook payloads, at-least once guarantees — the entire bunch. So we were forced to spend a significant amount of resources perfecting our webhooks. The end result is pretty outstanding in my opinion but if I were to make the decision again — I would likely just go for a versionless, monolithic approach with webhooks only including minimal information on the event, and then slowly extend it as the business grows, or just use an off-the-shelf solution like Convoy, where most of these are baked-in already.
    
## I know you’re a big fan of building backwards-compatible APIs with rolling versions, and you designed Cadwyn to bring this pattern to the Python Community. Tell us about it.
    
    When we started building API versioning at Monite, we were horrified at the results. API versioning allowed us to make more breaking changes but supporting our code base has become hard and expensive. That’s where I learned about Stripe’s approach from their famous article. I was immediately amazed at how they tackled the same problem, thought of the same solution but were able to finish it!
    
    I contacted the article’s author, Brandur Leach, we had a few discussions on API versioning and within a few months I was able to bring [Cadwyn](https://github.com/zmievsa/cadwyn) to life — my own FastAPI-based implementation of Stripe’s approach. It solved all of our problems at the cost of a steeper initial learning curve. Cadwyn does not just copy Stripe though — I believe we were able to go much further than that. It is type safe, supports request migrations, has code generation, is open-source, and has an extensive documentation. I call it the zero-duplication API versioning — schemas, routers, data — everything is generated for you from your migrations. As a result, Cadwyn gave us the ability to stop worrying about ever deprecating API versions  as the cost of supporting each version has become almost unnoticeable. 
    
    Cadwyn is not just a python framework — its documentation has an entire section on similar frameworksб best articles about API versioning, and guidelines on how to build a similar framework. I hope that Cadwyn and its docs can become a learning resource for anybody trying to master API versioning.

## Getting Started with Convoy

Want to add webhooks to your API in minutes? You can get started at [cloud.getconvoy.io/signup](http://cloud.getconvoy.io/signup).