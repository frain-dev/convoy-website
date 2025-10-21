---
date: 2025-08-04
title: PostgreSQL Backed Rate Limiter
authors:
  - name: Olalekan Odukoya
    image: /employees/olalekan.jpg
  - name: Raymond Tukpe
    image: /employees/raymond.jpg
---

We re-implemented our endpoint rate limiter (which limits the rate of requests sent to an endpoint) in PostgreSQL. It was previously implemented in Redis. We made this change because we are gradually phasing out the use of Redis from Convoy's core.
