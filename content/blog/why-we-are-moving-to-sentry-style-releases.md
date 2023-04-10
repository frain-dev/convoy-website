---
title: Why we're moving away from Prometheus Style Release Strategy to Sentry Style Release Strategy
feature_image: sentry-release-strategy.png
post_image: sentry-release-strategy.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
featured: false
description: Since we released Convoy v0.9 series, we have received exciting feedback from you guys, and we are super excited to continue building a next-generation webhook tooling for you guys.  But first, we must pivot our development and release workflow to support the desired release velocity. 
published_at: 2023-04-10T16:00:00.000+00:00
---

Hey Friends, 

Since we released Convoy v0.9 series, we have received exciting feedback from you guys, and we are super excited to continue building a next-generation webhook tooling for you guys.  But first, we must pivot our development and release strategy to support the desired release velocity. Historically, we adopted a prometheus development workflow, but this hasn’t been the best approach. In this article, I describe the previous workflow, the drawbacks, and what we are adopting going forward. Are you ready? Let’s dive in.

### Background

Convoy is an open-source high-performance webhooks gateway to manage millions of webhooks end-to-end. It is designed to be a highly scalable multi-tenant webhooks gateway to support multiple backend services sending and receiving webhooks. From the onset, we weren't clear if we were building a distributed persistent message queue for webhooks or a service relying on a third-party database. I think this distinction is very important for early-stage open-source startups. 

Convoy’s development and workflow should feel more like a SaaS. I do not have a better word/category for these types of startups & projects. But we’re more similar to Sentry, Novu, and Kong but for webhooks rather than Kafka or RabbitMQ for webhooks. With this clarification and recent product improvements, e.g. replacing the primary datastore from MongoDB to Postgres, we are set to switch our release strategy fully.

### Prometheus Release Strategy & The Drawbacks

To properly understand and appreciate the changes we are introducing, I need to describe the strategy we adopted from Prometheus. Here’s the [workflow](https://github.com/prometheus/prometheus/blob/main/RELEASE.md) transcribed:

1. Merge all new commits to the `main` line. 
2. On the release day, create a release branch like `release-0.1`, and tag the commit like `v0.1.0`
3. For patches, merge commits to the `release branch`, tag and release `v0.1.1`, for example.
    1. If both the `main` and `release` branch has not diverged, you can merge to `main` and cherry-pick to the `release` branch.
4. When `main` diverges, for patches to a release, we’d like to carry on to `main`.  Merge to the `release` branch and cherry-pick commits from the `release` to `main`. 
5. If changes aren’t ready to land a major or minor release, release it as a release candidate. E.g. `v0.1.0-rc.1`.
6. It’s okay for the `main` line to diverge significantly from the `release branch`. The release doc on Prometheus had this: `Maintaining the release branches for older minor releases happens on a best effort basis.`
7. In principle, `main` should always be green. But occasionally, that might not be the case. It’s the job of the release manager to ensure `main` green a  few days ahead of a release.

We fully adopted this workflow, and it hasn’t aged very well for our project. Let me highlight the specific problems we’ve faced:

1. As an early-stage open-source startup, we wanted to put our product in the hands of our users and iterate fast. Enable users to upgrade to the latest release, utilise new features, and leverage new endpoints without necessarily touching previous integrations. With the workflow above, In principle, `main` should always be `green`, but in practise it is not the case. For us, we need `main` always to be `green`. Like Sentry’s workflow, CD is very important to us and our eventual Cloud deployment. 
2. As a corollary to the previous point, we couldn’t give any preferential treatment to `v0.2` users over `v0.1`. We wanted to grow with them. This was what led us to deploy a cloud platform ahead of time (wrong move! We needed to change our release flow). Prometheus had this in their release docs: `Maintaining the release branches for older minor releases happens on a best effort basis.`

### Sentry Release Strategy & The Benefits

Now that we are moving away from that development style, what’s next? — Sentry Release Strategy , Friends. 🎉 Our new workflow goes like this: 

1. Merge all commits to the `main` line.
    1. Always keep the `main` line green and ready to deploy
2. On the release day, tag the `main` line and release a new binary like `v0.1.0`
    1. Every API change going forward will be versioned. We will work very hard not to break old integrations.
    2. Every API call will use the header `X-Convoy-Version` or the project’s default. The API will respond to every call based on your version. 
3. New features will undergo three release stages: `alpha`, `beta` & `general availability` behind a feature flag.
4. We won’t patch old releases. If a bug is serious enough, we will cut a new binary out of schedule.

This workflow offers us a lot of benefits. 

1. We can move faster than ever, and shipping features that are important to our users. 
2. We can experiment faster with our users, releasing experimental features behind a feature flag.
3. We have eliminated the collaboration complexities of cherry-picking fixes across release branches.
4. In the future, we can do Convoy nightly releases for users who want to stay on the bleeding edge.
5. Finally, this approach forces a good habit; It ensures we think very well about every API change and make them in a backwards-compatible version. The reasoning here is similar to traditional SaaS companies, the contract your open-source project has with it’s users is not only the software you’ve distributed but the API it carries.

### Other Changes

1. We are moving to Calender Versioning since it better describes our releases than Semantic Versioning.

### Parting Thoughts

1. Why does this work for Prometheus? While I can’t specifically say why, I think the following reasons are contributing factors:
    1. Prometheus is a very stable & widely-adopted project. They can get by now with a little steep migration curve. In our scenario, we need to ship new features to v0.1 users and grow with them, not create pain for them to migrate.
    2. Prometheus was developed in SoundCloud, and their 0.1 users were colleagues; unlike Convoy, our 0.1 users weren’t colleagues, the story was entirely different.
    3. Lastly, Prometheus is a CNCF project, while Convoy is a VC-backed Company. The project timelines tend to differ. Sometimes, it’s not necessarily the pressure VCs put on you but the pressure you put on yourself to get things right for your company and team. 
2. This is also the reason we moved away from MongoDB to PostgreSQL. We wanted consistent data and schema upgrades for our users. It’s no surprise most OSS projects use PostgreSQL. Two projects I’ve found using MongoDB in their OSS: Appsmith & Novu.
