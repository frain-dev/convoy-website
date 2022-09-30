---
title: Troubleshooting
description: 'Guides on troubleshooting installation and usage difficulties.'
id: troubleshooting
order: 3
---

# Troubleshooting

This page contains fixes for some of the known installation and usage errors encountered when using Convoy across different platforms.

## Docker and Docker Compose

<!-- At the moment, we haven't encountered any issue -->

## Kubernetes

### Redis instance fails to connect. 

In this situation, ensure that your redis connection string is in the format:

```
redis://username:password@host:port
```

In some cases, the redis isntance creates a default account for a