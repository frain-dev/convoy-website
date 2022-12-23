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
- Linux Machine. MacBook and Windows are currently not supported.

## Install Convoy
Run the script below and follow the prompt
```bash[Bash]
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/frain-dev/convoy/main/deploy/vm-deploy.sh)"
```

### Upgrading
To upgrade to a new instance run the script below and follow the prompt.
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/frain-dev/convoy/main/deploy/vm-upgrade.sh)"
```

## Default Credentials
Use the credentials are below to sign into your freshly minted Convoy instance:
+ **Username**: superuser@default.com
+ **Password**: default
