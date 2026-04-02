---
title: "Build vs Buy: The Real Engineering Cost of Webhooks"
feature_image: build-vs-buy.png
post_image: build-vs-buy.png
primary_author:
    name: Convoy
    twitter: getconvoy
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: false
description: Most teams underestimate what webhook infrastructure really costs to build and maintain. We break down the real numbers, real failure modes, and when building in-house makes sense vs when it does not.
published_at: 2026-04-02T10:00:00.000+00:00
---

There is a moment that happens on almost every engineering team building a SaaS product. A product requirement comes in; customers need to receive real-time notifications when something happens in your system. Someone in the room says "we just need to fire an HTTP POST request when an event occurs, how long can that take?"

Two weeks later, you have something working. Six months later, you are debugging silent failures at 2am. Twelve months later, two of your best engineers are spending 20% of their time maintaining infrastructure that has nothing to do with your actual product.

We built Convoy because we watched this happen over and over again. This post is our attempt to lay out the full picture of what webhook infrastructure actually costs to build and maintain, so that engineering teams can make this decision with accurate information rather than optimistic assumptions. We will share real numbers, real failure modes, and an honest view of when building in-house makes sense and when it does not.

---

## The first version feels easy

Your first webhook implementation probably takes a sprint or two. You write a background job that fires an HTTP POST request when something happens in your system. You add a basic retry loop. You log what was sent. You ship it.

The code looks something like this:

```python
def send_webhook(endpoint_url, payload, secret):
    signature = hmac.new(secret, payload, hashlib.sha256).hexdigest()
    response = requests.post(
        endpoint_url,
        json=payload,
        headers={"X-Signature": signature},
        timeout=5
    )
    if not response.ok:
        retry_later(endpoint_url, payload)  # good enough... for now
```

It is clean. It passes code review. It works in staging. Everyone moves on. The problem is that it is a solution to a much simpler problem than the one you are actually going to have. It handles the happy path. Production is not the happy path.

Production looks like this. A customer endpoint goes down for six hours and their team misses 400 events with no way to replay them. Another customer receives duplicate events because your retry logic does not account for idempotency, and they process the same notification twice. Your security team asks how you are preventing replay attacks and you realise you are not. A fintech customer asks for static IPs so they can whitelist your webhooks at their firewall and you have no answer. A single slow customer endpoint starts backing up your delivery queue and events for everyone else start arriving late.

None of these are edge cases. They are the normal second chapter of webhook infrastructure, and almost every team encounters them. They are also exactly the problems Convoy was built to solve.

---

## What you are actually building

Most teams scope the initial build as "retries and signatures." Here is what the complete list actually looks like once you have been in production for a year and your customers have started asking hard questions.

**Reliable delivery**

Retries are not just a loop. Proper retry infrastructure means exponential backoff with jitter so you are not creating thundering herd problems when multiple endpoints recover simultaneously. It means dead letter queues so events that exhaust retries are captured rather than silently dropped. It means at-least-once delivery semantics with idempotency keys so customers do not process the same event twice. It means handling slow or hanging endpoints without blocking delivery for other customers, which requires worker isolation at the endpoint level rather than a shared queue.

Getting this right is harder than it looks because the failure modes are subtle. A retry loop that works perfectly at 100 events per hour will behave completely differently at 100,000 events per hour, and the bugs that surface at scale are the hardest kind to reproduce and fix. Convoy handles all of this out of the box, including configurable retry policies per endpoint, dead letter queues, and full worker isolation so one bad endpoint never affects the rest of your customers.

**Security**

HMAC payload signing so customers can verify events came from you. Timestamp validation to prevent replay attacks, where an attacker captures a valid webhook payload and re-sends it later. SSRF protection so malicious callback URLs cannot be used to probe your internal network or cloud metadata endpoints. Rolling secrets so customers can rotate signing keys without any downtime or missed events during the transition.

Each of these is a separate implementation with its own edge cases and its own maintenance burden as the threat landscape evolves. Convoy ships with all of them built in and keeps them updated as new attack patterns emerge, so your team never has to think about webhook security again.

**Observability**

Per-endpoint delivery logs with full request and response bodies, not just status codes. Aggregated metrics on delivery success rates, latency distributions, and error breakdowns by endpoint and event type. Alerting when an endpoint starts failing consistently, ideally before your customer notices. Event replay from a UI so your team and your customers can investigate delivery issues without pulling logs from a database.

Without this, debugging becomes a manual archaeology exercise every time something goes wrong. Convoy gives you a full observability dashboard out of the box, with Prometheus metrics and OpenTelemetry traces that plug directly into whatever monitoring stack you already use.

**Customer self-service**

This is the requirement that consistently catches teams off guard. Your customers do not just receive webhooks passively. They need to manage them. They need to register and update endpoints, rotate secrets, choose which event types they care about, view delivery history, and replay failed events on their own schedule.

If you do not give them a portal to do this, every one of those actions becomes a support ticket. At any meaningful customer count, that support burden compounds quickly and quietly until it becomes a real operational problem. Convoy includes a fully featured customer-facing portal that you can embed directly into your product, so your customers can self-serve everything without ever contacting your support team.

**Scalability**

Your application and your delivery pipeline need to be decoupled. If a customer endpoint is slow or a traffic spike is happening, your core application should not feel it. This means a proper queue architecture sitting between your application logic and your delivery workers. It means rate limiting per endpoint so customers are not overwhelmed during bursts. It means circuit breaking to automatically detect and isolate failing endpoints before they affect the rest of the system. Convoy's control plane and data plane architecture was designed specifically for this, built in Go and capable of handling millions of events with sub-second delivery latencies.

**Integration with your existing infrastructure**

Most teams are not starting from a blank slate. They have Kafka topics or SQS queues already producing events. Your webhook infrastructure needs to ingest from those sources without requiring every team to change how they produce events. It needs to fit into your existing monitoring stack. It needs retention and archival policies that satisfy your compliance requirements. Convoy supports ingestion from Kafka, Amazon SQS, Google PubSub, and RabbitMQ out of the box, and it is SOC2 Type 1 certified, which means the compliance documentation your enterprise customers will eventually ask for already exists.

---

## The real numbers

There are three categories of cost in this decision. Most teams fully account for one of them.

**The initial build**

A realistic first version that covers retries with proper backoff, HMAC signatures, idempotency, delivery logging, and a basic dashboard takes two senior engineers roughly 2 to 3 months. This estimate is based on what we have consistently observed across engineering teams who attempted to build in-house before coming to Convoy, and it aligns with publicly available engineering benchmarks for infrastructure projects of similar scope.

And that version does not yet include the customer portal. It does not include SSRF protection. It does not include message broker ingestion, OpenTelemetry support, or compliance documentation. Those come later, when a customer asks for them and you have no choice.

At current market rates for senior engineers in the US, which average $150,000 to $180,000 per year according to levels.fyi data, two engineers for three months works out to approximately $75,000 to $90,000 to reach something you would feel confident showing to an enterprise customer. Budget more if your infrastructure builds tend to run over, which they usually do.

For teams outside the US the raw numbers are lower, but the opportunity cost calculation is identical. Two of your best engineers spending a full quarter on infrastructure that is not your product is two engineers not shipping the features your customers actually pay for.

**Ongoing maintenance**

This is the figure that gets left out of almost every build vs buy analysis, and it is the one that causes the most regret in hindsight.

Webhook infrastructure does not stay built. It needs security patches as new attack vectors are discovered. It needs scaling work as your event volume grows. It needs bug fixes when edge cases surface in production. It needs new features as customer requirements evolve, and they always evolve. A financial services customer will eventually ask for mTLS. An enterprise customer will ask for IP allowlisting. An audit will surface a gap in your logging that needs to be addressed before a deal closes.

Based on what we hear consistently from engineering teams, maintaining webhook infrastructure in production requires roughly 15 to 20 percent of one senior engineer's time once it is live. At the salary figures above, that is $22,000 to $36,000 per year, every year, for infrastructure that generates no direct revenue and is invisible to your customers when it works correctly.

Over three years, that maintenance cost alone adds $66,000 to $108,000 to the total, on top of the initial build. The full three-year cost of building and maintaining in-house sits somewhere between $140,000 and $200,000 for most teams, before accounting for opportunity cost. Convoy's cloud plans start at a fraction of that, and if you self-host the open-source version, your ongoing cost is essentially zero beyond the infrastructure you already run.

**Opportunity cost**

This is the one that matters most and the one that is hardest to put in a spreadsheet.

Every sprint your engineers spend on webhook infrastructure is a sprint they are not spending on the features that differentiate your product. Every 2am page about a backed-up queue is an engineer who is not at their best the following day. Every week retrofitting security because an enterprise deal surfaced a gap is a week that was not in the product roadmap.

The teams who most regret building in-house rarely describe the regret in financial terms. They describe it in time.

---

## When does building in-house actually make sense?

We want to be honest here because we think the decision deserves a real answer.

If your webhook use case is genuinely unusual at a scale that no off-the-shelf solution handles, for example billions of events per day with routing logic that is deeply coupled to your core domain model, then a purpose-built internal system may be justified. If you have a dedicated platform engineering team whose entire job is infrastructure of exactly this kind, and webhook infrastructure is one of several platforms they own as a long-term investment, the economics look different. If your data sovereignty requirements are so strict that you cannot use any external service even in a self-hosted configuration within your own cloud account, your options are more limited.

Outside of those scenarios, the build-in-house decision is almost always more expensive in total than it appears from the initial estimate, and the gap between the estimate and the reality tends to grow over time rather than close.

---

## Three questions to work through before you decide

Before your team commits to building, work through these honestly.

**What is the full scope?** Not just retries and logging. Write down the complete list: security, observability, a customer self-service portal, message broker ingestion, compliance documentation, and the first two or three rounds of scaling work. Estimate the time for all of it, not just the first sprint. Does that estimate still feel reasonable?

**What is the real opportunity cost?** Take the two engineers who would own this build. What would they ship in the next quarter if they were working on your product instead? Is webhook infrastructure more valuable to build than those features right now?

**Who owns it in 18 months?** When the engineer who built it moves to another team or leaves the company, who takes over? What does that handoff look like, and what is the cost of getting the new owner up to speed?

If you work through all three and the decision still clearly points toward building, then build. If any of those answers gives you pause, keep reading.

---

## Why teams choose Convoy

Convoy is an open-source webhooks gateway that gives your team everything described in this post without building or maintaining any of it. Retries with exponential backoff and jitter. HMAC signatures and replay prevention. Rate limiting and circuit breaking. A customer-facing portal for endpoint management. Message broker ingestion from Kafka, SQS, Google PubSub, and RabbitMQ. Prometheus metrics and OpenTelemetry traces. Flexible retention policies. SOC2 Type 1 certification.

You have two options for how you use it.

If your team wants full control over your data and your infrastructure, you can self-host Convoy in your own environment. It is open-source, runs on Kubernetes or Docker, and your data never leaves your cloud account. Your ops team manages the deployment. We handle all the product development, security updates, and new features. You get enterprise-grade webhook infrastructure, and you keep complete control over where your data lives.

If you would rather not manage the infrastructure at all, Convoy Cloud gives you a fully managed version of the same gateway. You connect your application, configure your endpoints, and we handle everything else. Teams typically go from zero to production in less than a day.

Either way, your engineers stop spending time on webhook infrastructure and start spending it on the product that actually moves your business forward. The question is not whether your team can build reliable webhook infrastructure. The question is whether building it is the best use of your engineering time right now.

For most teams, it is not. Get started for free at [getconvoy.io](https://getconvoy.io), or send us an email at [sales@getconvoy.io](mailto:sales@getconvoy.io) to talk through what the right setup looks like for your stack.
