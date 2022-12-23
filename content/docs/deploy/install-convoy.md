---
title: Install Convoy
description: 'Deploy Convoy on an ubuntu server'
id: install-convoy
order: 2
---

# Install Convoy
To install convoy, follow the instructions below to install all it's components and dependencies.

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
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/frain-dev/convoy/main/deploy/vm-upgrade.sh)"
```

## Default Credentials
   + **Username**: superuser@default.com
   + **Password**: default

