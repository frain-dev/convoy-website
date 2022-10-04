---
title: Troubleshooting
description: 'Guides on troubleshooting installation and usage difficulties.'
id: troubleshooting
order: 3
---

# Troubleshooting

This page contains fixes for some of the known installation and usage errors encountered when using Convoy across different platforms.

## Docker and Docker Compose

If you have any issues deploying Convoy with either Docker of Docker compose, please reach out in the [Slack channel](https://app.slack.com/client/T02JMPNCYNP).

## Kubernetes
The common issues encountered when deploying Convoy in Kubernetes are:

### Redis instance fails to connect. 
In this situation, ensure that your redis connection string is in the format:

```
redis://username:password@host:port
```

### MongoDB DSN
In this situation, ensure your MongoDB instance is a replica set, up and running, and correctly connected:
```
mongodb://username:password@mongodburi:port/database
```