---
title: Webhook Failures Notifications with Convoy
feature_image: webhook-failures-notifications.png
post_image: webhook-failures-notifications.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Product
tags:
    - Convoy
    - Product
featured: false
description: It is the responsibility of a good webhook delivery system to send out a form of automated notification on these delivery problems. Learn how Convoy handles webhook failures notification in this article
published_at: 2022-11-18T16:00:00.000+00:00
---

Webhook endpoints fail for several reasons, some of which can be:

1. Rate Limiting
2. Dead endpoints.
3. Firewall
4. Timeout.
5. Random network errors.
6. Invalid/Expired SSL certificates
7. Server Error.

It is the responsibility of a good webhook delivery system to send out a form of automated notification on these delivery problems. This has been sufficiently written about; you can see this [article](https://brandur.org/nanoglyphs/032-hook-toil#boxes) written by a former Stripe engineer about critical features for your webhooks delivery system.

While this provides great UX for the owner of the endpoint, it also helps to keep your endpoint delivery system efficient — It prevents you from wasting system resources trying to communicate to zombie endpoints. The best practice is to

1. Disable the endpoint
2. Send out a notification **_containing the failure reason_** to the endpoint owner.
3. Allow the endpoint owner re-activate the endpoint.
4. Replay events that weren’t sent, when the endpoint was down.

This is precisely what Convoy does. Let’s see how this looks like

### Failure Notifications

In Convoy, we send out email notifications to failing endpoints. When enabled, the email looks something like this:

**Network Errors**

![Email notifications on network errors.](/blog-assets/email-notif.png)

Email notifications on network errors.

**Server Errors**

![Email notifications on webhook endpoints with the stack trace.](/blog-assets/email-notif-ii.png)

Email notifications on webhook endpoints with the stack trace.

To achieve this with Convoy, do the following:

1. Create your endpoint, and set a support email on each endpoint.
2. Enable notifications on the endpoint.
3. Provide a dashboard for users to re-activate their endpoints. To provide this, we built an endpoint portal you can easily share with your users.
4. To replay missed events, users can filter for discarded events (events sent when the endpoint was dead) and batch retry all of them.

### Conclusion

In this article, we expanded on why it’s important to publish endpoint notifications, the best practices on webhook failure notifications, how this works in Convoy, and how this works in Convoy.

If this sounds interesting, we hope you try it out and give us some feedback.
