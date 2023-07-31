---
title: Troubleshooting
description: 'Guides on troubleshooting installation and usage difficulties.'
id: troubleshooting
order: 3
---

# Troubleshooting

This page contains fixes for some of the known installation and usage errors encountered when using Convoy across different platforms.

## Docker and Docker Compose

If you have any issues deploying Convoy with either Docker or Docker compose, please reach out in the [Slack channel](https://app.slack.com/client/T02JMPNCYNP).


### Redis instance fails to connect. 
In this situation, ensure that your Redis connection string is in the format:

```
redis://username:password@host:port
```

### MongoDB DSN
In this situation, ensure your MongoDB instance is a replica set, up and running, and correctly connected:
```
mongodb://username:password@mongodburi:port/database
```

### Unable to reach Convoy servers

In this situation, add the following IPs to your whitelist:

```
159.89.231.210
159.223.166.174
159.65.239.138
```
