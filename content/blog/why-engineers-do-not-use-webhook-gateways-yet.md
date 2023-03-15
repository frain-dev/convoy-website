---
title: Why Platform Engineers do not use Webhook Gateways yet
feature_image: reasons.png
post_image: reasons.png
primary_author:
    name: Lotanna Nwose
    twitter: viclotana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false
description: Speaking to lots of platform engineers, we compiled some recurring reasons why some of them do not currently use webhook gateways in their workflow to be more efficient.
published_at: 2023-03-15T17:00:00.000+00:00
---
Speaking with platform engineers at events, in various online communities and even within the Convoy community validated  the notion that managing webhooks in production is not always easy and can require a lot of effort. [Platform engineers](https://getconvoy.io/blog/webhook-gateways-for-platform-engineers) believe strongly in [frictionless self-service developer experience](https://www.gartner.com/en/articles/what-is-platform-engineering), and solving for efficiency to quickly provide business value. Let’s take a look at why some they haven't adopted a webhooks gateway such as [Convoy](https://getconvoy.io) to manage webhook events and integrations yet and what we are doing to change that. 

### Lack of Awareness

Due to how relatively new the webhooks management space is, lots of platform engineers find Convoy from content we put out, recommendation from their network and a small percentage from keyword searches. Also, just like any new space, lots of engineers are not aware of [benefits and features](https://getconvoy.io/blog/10-most-common-use-cases-of-a-webhook-gateway) that webhook gateways have out-of-the-box to make their workflows more efficient. 

We are creating more valuable content around webhooks and breaking down its complexities, the more we do, the more you can find Convoy when you do a quick Google Search for anything webhooks related.

### Resistance to Change

Many engineers are used to managing webhook integrations manually, and are hesitant to switch to a new platform or service. This is true, especially in large organisations where it takes months to go from one developer buy-in to team-wide adoption. This is the classic [build or buy analogy](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiKzO-av9n9AhUlolwKHYe7AmoQFnoECCgQAQ&url=https%3A%2F%2Fwww.forbes.com%2Fsites%2Fforbestechcouncil%2F2020%2F03%2F04%2Fbuild-vs-buy-why-most-businesses-should-buy-their-next-software-solution%2F&usg=AOvVaw3muvuN-zL7IsiGKZaogu9L), we do know that adopting a webhooks gateway can provide significant benefits, and significantly reduced debugging time exponentially as you scale.

With Convoy you can manage both incoming and outgoing webhooks, API providers can start their change management process by updating their Docs and telling their customers to receive their webhooks with Convoy. Time and resources saved by customer success teams using this approach is usually a good motivation to buy later on.

### Security Concerns

Webhooks can be vulnerable to attacks such as man-in-the-middle and replay attacks, which can compromise the security of the entire system. Some engineers worry that using a webhooks gateway could introduce additional security risks, particularly if the gateway is hosted by a third-party provider. 

Convoy provides advanced webhooks security with endpoint authentication, payload signing, rolling webhook secrets, replay attack prevention, and forward-compatible scheme upgrades. For data security and compliance concerns, you can self-host Convoy using the Community Edition or Convoy Enterprise on-prem.

### Cost Considerations

We are currently in a bear market and so engineering teams are working towards capital efficiency so cost is another factor that  is preventing engineers from adopting a webhooks gateway. Engineers worry that these costs will add up over time, particularly if they have multiple webhook integrations to manage.

We have made that decision even easier at Convoy, making the product [free forever for developers](https://getconvoy.io/blog/Convoy-Webhooks-is-free-for-developers) and then having the best [cost-effective pricing](https://getconvoy.io/pricing) in the market today. Our commitment is to builders and we would continue to show that with our pricing strategies.

### Integration Complexities

Readiness to integrate is another interesting issue, some of the startup to mid-level teams we have spoken to are sometimes spent for time. Some engineers are not ready to integrate with a new tool just yet, others might be in the middle of a project or not have the bandwidth to take on something new. 

On the other hand, there is a general assumption that integrating new tools can take days and lots of efforts. With Convoy, you can get up and running in a few minutes without even speaking to anyone. If you do need to, there is a [growing community of platform engineers](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) including the Convoy engineers available to answer questions at any time. 

### Wrapping Up

Do you have any unmentioned reason why you have not tried out  the Convoy webhooks gateway? Convoy is a reliable webhooks gateway for sending and receiving millions of webhook events with robust support for Retries, Rate Limiting, Static IPs, Circuit Breaking, Rolling Secrets. You can secure your payloads, scale horizontally and get endpoint failure alerts to debug faster with Convoy. You should try it out [here](https://www.notion.so/Convoy-CLI-c38b497f240a4188bc5e7000a7dcf80d).