---
title: Deploy Convoy
description: 'Techniques to deploy convoy to the various cloud platforms'
id: overview
order: 3

children:
   - label: 'Digital Ocean'
     link: '/docs/deploy/digitalocean'
---

# Deploying Convoy

In addition to being open-source, we provide simple configurations to help you get started running an instance of Convoy. While Convoy is a simple binary, deploying it requires third-party dependencies like MongoDB & Redis. To keep things simple, we choose to use Docker & Docker-Compose for ease of deployment. 

## Configure

Convoy can be configured from either CLI flags, environment variables or a `convoy.json` file. You can head over to the [Configuration](/docs/configuration) page for full details.


## Platforms

- [Docker](./docker)
- [Hobby](./hobby)
- [DigitalOcean](./digitalocean)

## Troubleshooting

If you encounter any error while installing Convoy on any platform, please reach out to [support@getconvoy.io](mailto:support@getconvoy.io) or join our [Slack Community](https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ)
