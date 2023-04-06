---
title: Convoy March Newsletter
feature_image: march-newsletter.png
post_image: march-newsletter.png
primary_author:
    name: Lotanna Nwose
    twitter: viclotana
primary_tag: News
tags:
    - News
featured: false
description: This is a re-publishing of our monthly newsletter sent to subscribers earler this month. View to subscribe for future email newsletters.
published_at: 2023-04-06T18:30:00.000+00:00
---
Hi there 👋

Happy new month, I hope you are well. Today, we are going to do a quick recap of what exciting things happened last month at Convoy, mostly around the stable version of Convoy 0.9, and how we did with our launches on HackerNews and Product Hunt.

### Convoy Show HN on HackerNews 🔬

![Hacker News Launch: Show HN](/blog-assets/hn-launch.png)

Once in a while, we post valuable content on HN, last month we decided to do a Show HN launch to get the product to more developers and hear thoughts from people. This was a good success as we got questions from people who wanted to know more about webhook Gateways. You can take a look at the post [here](https://news.ycombinator.com/item?id=35369983). 

### Upgrade to Convoy 0.9 stable release! 💃

Convoy 0.9 stable release is out, to use it, update your docker image to v0.9.0 Migrations are run automatically when running the docker image. If you’re running the binary directly, then you need to run ‘convoy migrate up’ before running the server and other components. After this, you can then update to 0.9.1 too.

Two major changes landed in this release; we ported over the stream server to rely on our worker system rather than MongoDB Change Stream and we made massive performance improvements to all our queries making the dashboard and API experience noticeably faster. Read everything about it on [the Convoy 0.9 blog](https://getconvoy.io/blog/convoy-0.9).

### Top 10 Product of the day on Product Hunt 🏆

![Product Hunt Launch](/blog-assets/ph-launch.png)

We also did a launch on Product Hunt, this was a great launch and massive improvement from last year. This year we had 40 more comments and over 100 more upvotes, and lots of product reviews from our customers. Things were totally different a year ago, [check out the launch here](https://www.producthunt.com/posts/convoy-4). 

### 1,500 stars on GitHub 🎉

![Convoy GitHub stars](/blog-assets/starss.png)

If you have been to our Github page recently, you will notice that our star count has now increased to over 1,500 stars. This to us is one of the ways we get validation for our current direction and the stage of the product and adoption rate of Webhook Gateways. If you are yet to, go on and [star the Convoy project here](https://github.com/frain-dev/convoy).

### New **Blogs to Read this week 📕**

1. [Why Engineers do not use Webhook Gateways Yet](https://getconvoy.io/blog/why-engineers-do-not-use-webhook-gateways-yet).
2. [Debugging Webhook Events with the new Client CLI](https://getconvoy.io/blog/debugging-webhook-events-with-convoy-cli).
3. Are you a platform engineer, [read about Webhook Gateways](https://getconvoy.io/blog/webhook-gateways-for-platform-engineers)
4. [What’s new in Convoy 0.9](https://getconvoy.io/blog/convoy-0.9)
5. [10 most common use cases of Webhook Gateways](https://getconvoy.io/blog/10-most-common-use-cases-of-a-webhook-gateway)

### Next steps 🚀

As you know, [we have a public roadmap](https://github.com/orgs/frain-dev/projects/3/views/1) where you can follow our journey and see what we are shipping next, this new quarter, we have exciting news about how we ship products moving forward and even a launch week event. Make sure to [join the community](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) so you do not miss anything. 

That's all the updates we have for you for now! If you're excited about Convoy, please don't forget to give us a star on [GitHub](https://github.com/frain-dev/convoy) and follow us on [Twitter](https://twitter.com/getconvoy) for more updates and enjoy the Easter holidays!