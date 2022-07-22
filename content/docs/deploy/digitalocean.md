---
title: Digital Ocean
description: 'Deploy Convoy to a Digital Ocean Droplet'
id: digitalocean
order: 3
---

# Digital Ocean
We provide a 1-click deployment for DigitalOcean. This is designed for those who want to try Convoy without spending a lot on infrastructure costs.

## 1-click Install
Follow the steps below to have a complete setup on a Digital Ocean droplet.

1. [Click here to deploy an instance with 1-click install.](https://marketplace.digitalocean.com/apps/convoy?refcode=01772e568527&action=deploy) The Digital Ocean UI will prompt you to configure the droplet size. The default works fine.

2. Head over to your DNS provider and configure an A record to the provided IP address in step 1. 

3. SSH into your machine with the provided IP address in step 1 and run the following:
   ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/frain-dev/convoy/main/deploy/vm-deploy)"
   ```

4. Visit your domain name and login with [default credentials]() 🎉
