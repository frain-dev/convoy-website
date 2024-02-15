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
description: Yes, you read the title correctly. A stripe webhook caused a DoS>  attack on a Vercel function, translating into 63 GB of serverless execution and a $23k bill in 48 hours. As a great CEO, Rauch stepped up to the occasion and provided transparency and a full refund. This incident is a good lesson on cascading failures. 
published_at: 2024-02-15T18:00:00.000+00:00
---

Yes, you read the title correctly. A stripe webhook caused a DoS attack on a vercel function that translated into [63gb of serverless execution](https://x.com/michaelaubry/status/1757554062114107601?s=20), and finally a $23k bill in a space of 48 hours. Rauch, being a great CEO, stepped up to the occasion, provided [transparency](https://twitter.com/rauchg/status/1757948957421113853) and a full refund. This incident is a good lesson on cascading failures. 

> **Shameless Plug:** Convoy is an open-source high-performance webhooks gateway to manage millions of webhooks end-to-end. You can use Convoy to send or receive webhooks and completely prevent all the problems explained in this article.

## TL;DR

- Webhooks providers should always throttle delivery.
- Webhook consumers should always rate limit their webhook endpoints.
- Webhooks at scale can be a pain.

## What exactly happened?

In summary, in two days, an attacker created ~545K fake accounts and trials, which in turn created ~545K fake subscriptions on Stripe, which triggered webhooks back to Vercel. The Vercel function became saturated and could not correctly process the hooks. Stripe, being a reliable webhook provider, began retrying the events. And there you have it, Dos is on. In no time, Vercel rakes up 63 GB of execution cost.

{% tweet url="https://twitter.com/michaelaubry/status/1757539928534315322" /%}


Like this [tweet](https://x.com/TheGerardTaylor/status/1757957410323402806?s=20), stripe webhook being an attack vector wasn’t on my bingo card for 2024. I believe this is even a more scary problem for serverless workloads that can “infinitely” scale compared good old vms that would simply give up. A key take away here is if you’re running serverless workloads you want to ensure you have rate limits, and proper spend management controls in place. No surprises.

## What were the false solutions recommended?

Below are some of the solutions I observed on Twitter, and I wanted to share some opinions on them. 

1. **Use Cloudflare:** Many responses indicated that putting your app behind Cloudflare should have done the trick. My initial reaction is usually the same for most DoS attacks I see on the internet. Cloudflare is an excellent product for this scenario, but how do you apply Cloudflare here is a different question. If you had applied Cloudflare to the entire app, we would have prevented the cascading failure from happening altogether. But assuming the serverless function was hosted elsewhere, applying Cloudflare directly would not have solved any issue because this was not a botnet attack, but these were legitimate webhook requests from Stripe. To make Cloudflare work in this case, you’d specifically need to turn on their rate limiting feature on this particular endpoint; you can learn more [here](https://www.cloudflare.com/en-gb/application-services/products/rate-limiting/).

2. **Verify HMAC Signature:** This solves nothing because they were all legitimate requests from Stripe. It’s as good as all the generated webhooks would have had a valid signature. 

3. **Vercel Spend Management:** While this user did not have this feature turned on by default, it turns out this feature on Vercel only notifies you when you cross your expected threshold rather than put a hard stop to your resources. You’re expected to consume the webhook and call the Pause API to implement your own hard stop. See this thread.

## What were the real possible solutions?

The real solution here is rate limiting. Both the provider and the consumer can apply this strategy. I’ll explain.

1. On the consumer, this is relatively trivial. Apply a rate-limiting middleware on your webhook endpoints. Rate limiting is commonplace today with libraries in almost all languages we use to build web apps. As you might have guessed, yes, you can also use Cloudflare here, which has a no-code solution to the same problem.
2. On the provider, webhook providers should enable consumers to configure rate limiting on their endpoint. This is even more important for serverless workloads, like in this case.
3. On the provider, webhook providers should implement circuit breaking for webhooks delivery.
