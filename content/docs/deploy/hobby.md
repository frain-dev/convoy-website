---
title: Hobby
description: 'Deploy Convoy on an ubuntu server'
id: hobby
order: 2
---

# Hobby
We provide an easy way to deploy Convoy without spending a ton on infrastructure costs. It is aimed at users who want to test out the platform and understand its use-cases.

## Pre-requisites
- You have deployed a Linux Ubuntu Virtual Machine. 
    - Anything between a $10/month (2GB RAM) to $20/month (4GB RAM) droplet will work fine.
    - You have ssh access to the VM. You'd need ssh access to the VM to run commands from time to time.


### Quick Install on an Ubuntu VM
1. Head over to your DNS provider and configure an A record to your VM's IP address. 

2. SSH into the VM and run the following:
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/frain-dev/convoy/main/deploy/vm-deploy)"
    ```
3. Visit your domain name and login with [default credentials]() 🎉

### Upgrading
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/frain-dev/convoy/main/deploy/vm-upgrade)"
```
