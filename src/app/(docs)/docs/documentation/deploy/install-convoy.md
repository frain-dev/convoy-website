---
title: Install Convoy
description: 'Deploy Convoy on an ubuntu server'
id: install-convoy
order: 2
---

# Install Convoy
Convoy is made up for several components and a few third-party dependencies. To install convoy, use the script below and follow the prompt.

## Requirements
- Docker 20.10.11+
- Compose 1.29.2+

## Deploy Locally
```bash {% file="Bash" %}
# Get the code
$ git clone https://github.com/frain-dev/convoy.git

# Go to the Convoy folder
$ cd convoy

# Start Services
$ docker compose -f configs/local/docker-compose.yml up
```

## Default Credentials
Use the credentials are below to sign into your freshly minted Convoy instance:
+ **Username**: superuser@default.com
+ **Password**: default
