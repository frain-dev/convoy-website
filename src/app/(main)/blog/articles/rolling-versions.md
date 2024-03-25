---
title: "Rolling versions: The new standard for API versioning"
feature_image: rolling-versions.png
post_image: rolling-versions.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Open Thoughts
tags:
    - Convoy
    - Open Thoughts
featured: false 
description: "It’s beautiful to see the industry finally adopt a superior technique for API versioning: rolling versions. Last week, Sequence adopted rolling versions as the versioning scheme for their API. Ten years ago, this scheme was unheard of, but fast-forward to this day, and it is fast becoming ubiquitous thanks to Stripe for inventing and popularising this technique with their article — APIs as infrastructure: future-proofing Stripe with versioning."
published_at: 2024-03-25T18:00:00.000+00:00
---

It’s beautiful to see the industry finally adopt a superior technique for API versioning: rolling versions. Last week, Sequence [adopted rolling versions](https://www.linkedin.com/posts/sequence-hq_launch-week-day-4-api-versioning-activity-7176527114731425792-Tck4?utm_source=share&utm_medium=member_desktop) as the versioning scheme for their API. Ten years ago, this scheme was unheard of, but fast-forward to this day, and it is fast becoming ubiquitous thanks to Stripe for inventing and popularising this technique with their article — [APIs as infrastructure: future-proofing Stripe with versioning](https://stripe.com/blog/api-versioning).

In this article, I’ll briefly describe this versioning scheme and discuss certain characteristics that make it a superior versioning technique, which explains why it’s gaining so much traction. You'd find this useful if you’re an engineering leader or API product manager. For the purpose of this article, we would assume an endpoint — `GET /api/v1/customer` to retrieve a single customer object. 

```json
// initial version
{
  "status": true,
  "message": "Customer retrieved successfully",
  "data": {
		"uid": "12345",
		"email": "blog@example.io",
		"full_name": "Blog Example",
        "customer_code": "CUS_c6wqvwmvwopw4ms",
		"created_at": "2016-03-29T20:03:09.584Z" 
	}
}
```

```json
// updated version
{
  "status": true,
  "message": "Customer retrieved successfully",
  "data": {
		"uid": "12345",
		"email": "blog@example.io",
		"first_name": "Blog",
		"last_name": "Example",
        "customer_code": "CUS_c6wqvwmvwopw4ms",
		"created_at": "2016-03-29T20:03:09.584Z" 
	}
}
```

The JSON payloads above describes two different versions of our API; the one on the left represents the old API with a compound `full_name` field, while the one on the right represents the updated API with the `full_name` field split out into two fields — `first_name` & `last_name`. Let’s explore how to achieve this in both versioning schemes. 

## Major Versioning & Rolling Versioning

In the major versioning scheme, you need to have an enormous list of changes to justify building a `/v2` API. A simple change like the one described above is not sufficient reason to rollout a new API version. Said differential, it’s not enough reason to break the contract you have with API clients. Another alternative is to keep the old fields and add the new field as well. The problem with this approach is the API becomes bloated, less intuitive and the code base suffers from technical debt. What you’re left with is an unintuitive API with no justification for a change.


Let’s juxtapose this with the rolling version scheme. Rolling versions is an API versioning technique that ensures backwards-compatibility by shipping incremental upgrades as a small set of changest to the API to help integrations stay current. Notice that, in the definition we don’t make mention of a new API. This is because we have only one API and all upgrades would be made to the same API. The key idea here is for every set of changes we ship to the API, we write transformation objects to from transform input from the previous API structure to the most recent structure both on the request and response flow. Below is a schematic of this technique in action. 

![request_migrations.png](/blog-assets/request_migrations.png)

To implement the change we described earlier, what we need to do is two-fold; update our core API to return the new customer object structure. Write a transformation logic to merge the `first_name` and `last_name` fields to adhere with the structure of the previous API. Lastly for every API request we need to determine what version is being requested. In this scheme, it is more common to use dates as versions number rather than semantic versions because it communicates better the frequency of releases. I recommend everyone to read the Stripe blog for a more in-depth description of this technique.

Why is this technique gaining traction? Nothing hits harder than a direct quote from the Stripe blog


> To date, we’ve maintained compatibility with every version of our API since the company’s inception in 2011.

Said another way is, if you integrated Stripe APIs over a decade ago for an app, and made zero changes to that integration it would still be working and live today in production. Let that sink in. Let’s discuss some of the key properties of this approach, and why you should strongly consider it for your API.

The first idea that resonates with me is the concept of your API as a living document; a fluid and intuitive contract. One that is able to easily and quickly adapt to the ever changing requirements of your users. If you think I’m wrong consider looking at the API Changelog of [Stripe](https://docs.stripe.com/changelog), [GitHub](https://github.blog/changelog/label/api/). It tells the story of an iterative approach to improving their API.  It is not uncommon to ship an endpoint which in retrospect isn’t as intuitive and could benefit from quick improvements. 

Because migrations are simple change objects for request and response JSON payloads, there are several benefits we derive from this design—transformations are deterministic and we can unit test and benchmark them. We can feature flag and progressively release new versions to subset of our users while trying battle testing our migrations.

## Conclusion

To conclude, rolling versions are not a panacea, and nothing beats proper API design, however, in our fast paced world, rolling versions enable us get the best of both worlds. Finally, how do you get started? Ok, so If I’ve successfully been able to get you excited about this API versioning scheme, and you’re wondering how do I get started, well here’s a list of libraries that have implemented this technique: 

- [Ruby on Rails](https://github.com/keygen-sh/request_migrations)
- [Laravel](https://github.com/tomschlick/request-migrations)
- [Golang](https://github.com/subomi/requestmigrations) (I was fortunate to be able to write this.)

If your stack is not available, and you’ve been looking for an opportunity to contribute to open source software, this might just be a great opportunity to port any of these implementations to your favourite language/framework. 

## References

1. [APIs as infrastructure: future-proofing Stripe with versioning](https://stripe.com/blog/api-versioning)
2. [To infinity and beyond: enabling the future of GitHub’s REST API with API versioning](https://github.blog/2022-11-28-to-infinity-and-beyond-enabling-the-future-of-githubs-rest-api-with-api-versioning/)
3. [[Updated] API Deprecations and Versions at Shopify: What You Need to Know](https://www.shopify.com/partners/blog/api-deprecation)
