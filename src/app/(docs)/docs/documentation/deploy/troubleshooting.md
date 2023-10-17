---
title: Troubleshooting
description: 'Guides on troubleshooting installation and usage difficulties.'
id: troubleshooting
order: 3
---

# Troubleshooting

This page contains fixes for some of the known installation and usage errors encountered when using Convoy across different platforms.

## Docker and Docker Compose

If you have any issues deploying Convoy with either Docker or Docker compose, please reach out on the [Slack channel](https://app.slack.com/client/T02JMPNCYNP).


### Redis instance fails to connect.
Ensure that your Redis connection string is in the correct [format](https://github.com/lettuce-io/lettuce-core/wiki/Redis-URI-and-connection-details#uri-syntax) and that you can connect to the instance using redis-cli from the same machine.

### Events Stuck in Scheduled or Processing State
This can happen in older version of Convoy and is a result of a bug where we register workers on a process that doesn't also register the handler. What you can do is to update Convoy to a more recent version and run the retry command

```shell
# if you are using the binary
convoy retry --status="Scheduled" --time="1h"

# if you are using docker
docker run -d -p 5009:5009 --name retry -v `pwd`/convoy.json:/convoy.json your-convoy-image:tag retry --status="Processing" --time="1h"
```
