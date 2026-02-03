---
title: How Spruce Accelerated Event Delivery with Convoy Fan-Out Functionality
feature_image: spruce-customer-story.png
post_image: spruce-customer-story.png
primary_author:
    name: Oluwatosin Fatungase
    linkedIn: https://www.linkedin.com/in/oluwatosinfatungase/
primary_tag: Customer Stories
tags:
    - Convoy
    - Customer Stories
    - Engineering
featured: true
description: Spruce Principal Engineer Michael Raines shares how Convoy fan-out functionality and reliability helped their small team deliver webhook events to customers efficiently, saving an estimated six to nine months of development time.
published_at: 2026-02-02T17:00:00.000+00:00
---

# About Spruce

[Spruce Health](https://sprucehealth.com) is the leading platform for HIPAA-compliant healthcare communication, serving over 25,000 healthcare professionals and facilitating more than 500,000 daily healthcare interactions. With over 10 years in business and 5 million patient accounts, Spruce provides an all-in-one communication solution that includes secure messaging, phone, video, e-fax, and team messaging capabilities for healthcare providers.

With a lean engineering team of approximately six full-time backend engineers, Spruce focuses on customer-driven product development and data-driven decision making. Their public API serves as the gateway for webhook integrations, enabling healthcare providers and third-party systems to integrate with Spruce's platform and receive real-time event notifications.

Michael Raines, Principal Engineer at Spruce, leads security, backend architecture, and implementation for the team. His role includes ensuring reliable event delivery to customers who integrate with Spruce's products.

---

&nbsp;

As Spruce expanded their customer base of healthcare providers and integrated systems, they needed a reliable way to deliver events to larger customers with developers who were interested in integrations. After evaluating their options, they chose Convoy, an open-source webhook gateway written in Go, which saved them an estimated six to nine months of development time.

# The Challenge

Spruce needed a robust solution for delivering webhook events to their customers. They could have built it themselves, but building a good webhook system is very time-intensive. Recognizing webhook delivery as a solved problem, Spruce decided to evaluate off-the-shelf solutions, which they typically avoid in favor of building in-house.

The team needed a solution that would reliably deliver events to multiple customer endpoints, scale with their growing customer base, integrate seamlessly with their existing Go-based infrastructure, and require minimal maintenance overhead.

# Why Convoy

Spruce went straight from having no event delivery system to using Convoy. After reviewing the codebase, Michael and his team were convinced Convoy was the right choice.

The key factors that influenced their decision:

- **Well-written and well-maintained code**: The code quality met Spruce's high standards
- **Familiar language**: Written in Go, which aligned with Spruce's tech stack
- **Scalable architecture**: Designed to handle growth and scale
- **Open-source**: Full visibility and control over the codebase
- **Reliability**: Critical for customer-facing event delivery

> "We have experienced 'almost none' of the typical rough edges found in off-the-shelf solutions, and have had very few problems with Convoy itself." — Michael Raines, Principal Engineer

# The Solution

## Time to Market

By choosing Convoy instead of building from scratch, Spruce was able to go from having no event delivery system to sending events to customers in just two to three months, compared to the estimated six to nine months it would have taken to build internally.

> "We could have built it ourselves, but building a good webhook system is very time-intensive and we considered a solved problem." — Michael Raines, Principal Engineer

## Fan-out functionality

The primary use of Convoy by Spruce is for webhook delivery, and one feature stands out as particularly valuable: the fan-out functionality.

Fan-out allows Spruce to send a single event to multiple endpoints registered by different organizations without needing to manage the mapping or delivery logistics in their own code. This simplifies their architecture significantly and reduces the complexity of their event delivery system.

> "For us at Spruce, the 'fan out functionality' is particularly useful, as it allows us to send an event to multiple endpoints registered by different organizations without needing to manage the mapping or delivery logistics in our own code." — Michael Raines, Principal Engineer

## Reliability and ease of use

Spruce values reliability, scalability, and ease of use above all else. Convoy has delivered on all three fronts. The team rarely uses the Convoy dashboard because event delivery runs so smoothly that there's little need for manual intervention or debugging.

This reliability is crucial for Spruce's small team, as it allows them to focus on their core product rather than maintaining webhook infrastructure.

# The Results

As a result of implementing Convoy, Spruce has been able to:

- **Accelerate time to market**: Reduced development time from an estimated 6-9 months to 2-3 months
- **Maintain a small, efficient team**: Convoy helps facilitate keeping the team small by handling complex webhook infrastructure
- **Deliver reliable events**: Experience minimal issues with event delivery, allowing them to focus on core product development
- **Scale efficiently**: The fan-out functionality enables them to serve multiple customers without additional complexity

Convoy has become an integral part of Spruce's infrastructure, enabling them to deliver reliable webhook events to their customers while maintaining their focus on building great products.
