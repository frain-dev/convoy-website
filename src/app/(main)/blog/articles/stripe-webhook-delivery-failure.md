---
title: Stripe webhooks DoS caused $23k Vercel bills
feature_image: stripe-webhook-delivery-failure.png
post_image: stripe-webhook-delivery-failure.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false 
description: Yes, you read the title correctly. A stripe webhook caused a ddos attack on a vercel function that translated into 63gb of serverless execution, and finally a $23k bill in a space of 48 hours. Rauch, being a great CEO, stepped up to the occasion, provided [transparency](https://twitter.com/rauchg/status/1757948957421113853) and a full refund. This incident is a good lesson on cascading failures. 
published_at: 2024-02-15T18:00:00.000+00:00
---

Yes, you read the title correctly. A stripe webhook caused a ddos attack on a vercel function that translated into [63gb of serverless execution](https://x.com/michaelaubry/status/1757554062114107601?s=20), and finally a $23k bill in a space of 48 hours. Rauch, being a great CEO, stepped up to the occasion, provided [transparency](https://twitter.com/rauchg/status/1757948957421113853) and a full refund. This incident is a good lesson on cascading failures. 

## TL;DR

- Use ratelimiting.
- Webhooks at scale can be a pain.

## What exactly happened?

In summary, in the space of two days, an attacker created ~545K fake accounts and trials, which in turn created ~545K fake subscriptions on Stripe, which in turn triggered webhooks back to Vercel. The Vercel function became saturated and could not properly process the hooks. Stripe, being a reliable webhook provider, began retrying the events. And there you have it, DDOS is on. In no time, Vercel rakes up a 63gb of execution cost.

[https://twitter.com/michaelaubry/status/1757539928534315322](https://twitter.com/michaelaubry/status/1757539928534315322)

{% tweet url="https://twitter.com/michaelaubry/status/1757539928534315322" /%}


Like this [tweet](https://x.com/TheGerardTaylor/status/1757957410323402806?s=20), stripe webhook being an attack vector wasn’t on my bingo card for 2024. I believe this is even a more scary problem for serverless workloads that can “infinitely” scale compared good old vms that would simply give up. A key take away here is if you’re running serverless workloads you want to ensure you have rate limits, and proper spend management controls in place. No surprises.

## What are we false solutions recommended?

Below are some of the solutions I observed in the thread that I had some opinions to share.

1. Use Cloudflare: Many responses indicated that putting your app behind Cloudflare should have done the trick. For most DDOS attacks I see on the internet my initial reaction is usually the same. Cloudflare is an excellent product for this scenario, but how do you apply Cloudflare here is a different question. If you apply Cloudflare to the entire app to start with, we would have prevented the cascading failure from happening all together, but assume the serverless function was hosted elsewhere, applying Cloudflare directly there would not have solved any issue, because this was not a bot net attack, but legitimate webhook requests from Stripe. To make Cloudflare work in this case, you’d specifically need to turn on their rate limiting feature on this particular endpoint, you can learn more [here](https://www.cloudflare.com/en-gb/application-services/products/rate-limiting/).
2. Verify HMAC Signature: This solves nothing because they were all legitimate requests from Stripe. It’s a good as all the webhooks generated would have add a valid signature attached to it. 
3. Vercel Spend Management: While this user did not have this feature turned on by default, it turns out this feature on Vercel only notifies you when you cross your expected threshold rather than put a hard stop to your resources. You’re expected to consume the webhook and call the Pause API to implement your own hard stop. See this thread.

## What are the possible solutions?

The real solution here is rate limiting. Both the provider and the consumer can apply this strategy. I’ll explain.

1. On the consumer, this is relatively trivial apply use a rate limiting middleware on your webhook endpoints. rate limiting is common place today with libraries in almost all languages we use to build web apps. As you might have guessed right, yes, you can use Cloudflare here as well which is a no-code solution to the same problem.
2. On the provider, webhook providers should enable consumers configure rate limiting on their endpoint. This is even more important for serverless workloads like in this case.
3. On the provider, webhook providers should implement circuit breaking for webhooks delivery.