---
title: Docker
description: 'Deploy Convoy on Docker'
id: docker
order: 4
---

# Docker

We provide an easy way to deploy Convoy in one-command using docker and docker-compose manifests.


## Prerequisites

- You have Docker installed on your machine.

## Installation procedures

### Docker

In your terminal, run the command below:

```console[terminal]
$ docker run \
	-p 5005:5005 \
	--name convoy-server \
	-v `pwd`/convoy.json:/convoy.json \
	docker.cloudsmith.io/convoy/convoy/frain-dev/convoy:latest
```

<!-- TODO: Huddle with RT to get this docker run config to work. -->

### Docker Compose

The following steps guide you on deploying using docker-compose:

1. Create the docker-compose manifest file:

```yaml[docker-compose.yaml]
version: "3"

services:
    web:
        image: docker.cloudsmith.io/convoy/convoy/frain-dev/convoy:latest
        entrypoint:
            ["./cmd", "server", "--config", "convoy.json", "-w", "false"]
        hostname: web
        container_name: web
        volumes:
            - ./convoy.json:/convoy.json
        restart: on-failure
        ports:
            - 5005:5005
        depends_on:
            - mongo
            - redis_server
        networks:
            - backendCluster

    scheduler:
        image: docker.cloudsmith.io/convoy/convoy/frain-dev/convoy:v0.6.6
        entrypoint: ["./cmd", "scheduler", "--config", "convoy.json"]
        volumes:
            - ./convoy.json:/convoy.json
        restart: on-failure
        depends_on:
            - mongo
            - redis_server
        networks:
            - backendCluster

    worker:
        image: docker.cloudsmith.io/convoy/convoy/frain-dev/convoy:v0.6.6
        entrypoint: ["./cmd", "worker", "--config", "convoy.json"]
        volumes:
            - ./convoy.json:/convoy.json
        restart: on-failure
        depends_on:
            - mongo
            - redis_server
        networks:
            - backendCluster

    mongo:
        image: mongo:latest
        hostname: mongo
        container_name: mongo
        restart: always
        volumes:
            - /var/convoy/data/mongo:/data/db
        networks:
            - backendCluster

    redis_server:
        image: redis:alpine
        hostname: redis_server
        container_name: redis_server
        restart: always
        networks:
            - backendCluster

networks:
    backendCluster:
```

2. Create the Convoy configuration file, `convoy.json`:

```json[convoy.json]
{
    "environment": "development",
    "host": "http://localhost:5005",
    "database": {
        "type": "mongodb",
        "dsn": "mongodb://mongo:27017/convoy?readPreference=primary&ssl=false"
    },
    "queue": {
        "type": "redis",
        "redis": {
            "dsn": "redis://redis_server:6379"
        }
    },
    "cache": {
        "type": "redis",
        "redis": {
            "dsn": "redis://redis_server:6379"
        }
    },
    "server": {
        "http": {
            "port": 5005,
            "worker_port": 5006
        }
    },
    "disable_endpoint": false,
    "auth": {
        "native": {
            "enabled": true
        },
        "jwt": {
            "enabled": true
        }
    }
}
```

3. Deploy the Convoy application with the command below:

```console[terminal]
$ docker-compose up
```
    
![Application containers created](/docs-assets/containers-created.png)

![Application running successfully](/docs-assets/healthy-application.png)

4. Visit the Convoy dashboard on [http://localhost:5005](http://localhost:5005):

![Convoy Dashboard sign-in page](/docs-assets/convoy-sign-in-page.png)

Sign in with the credentials:

- username: **superuser@default.com**
- password: **default**

![Convoy default credentials](/docs-assets/convoy-user-pass.png)

5. Welcome to your dashboard

![Convoy Dashboard](/docs-assets/convoy-dashboard-page.png)

<!-- ## Next steps

Include link to blogpost articles.
 -->
