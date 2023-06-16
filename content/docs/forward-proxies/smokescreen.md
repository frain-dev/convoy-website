---
title: Configuring Stripe's Smokescreen as a forward proxy for Convoy
description: 'Convoy with Forward Proxies'
id: tutorial
order: 1
---

Configuring Stripe's Smokescreen as a Forward Proxy for Convoy
==============================================================

Stripe's Smokescreen is a powerful tool that can be used as a forward proxy for Convoy, it can be used to achieve Static IPs for your outbound webhook events.

## Why Use a Forward Proxy?

A forward proxy acts as an intermediary between clients and servers, forwarding requests on behalf of clients and providing additional services such as caching, security, and anonymity. By using Smokescreen as a forward proxy for Convoy, you can benefit from its advanced features and capabilities.

## Configuring Smokescreen as a Forward Proxy

To configure Smokescreen as a forward proxy for Convoy, follow the steps [here](https://github.com/stripe/smokescreen) to install smokescreen on your server.

Start smokcscreen by running:

```shell
smokescreen --listen-port <your-desired-proxy-port>
```

In your convoy.json file, you need to specify the url to smokerscreen as your proxy value:

```json
"server": {
  "http": {
    "proxy": "<smokescreen-url>",
    "ssl": false,
    "ssl_cert_file": "",
    "ssl_key_file": "",
    "port": 5005
  }
},
```

For more extensive documentation of Smokescreen's configuration see [here](https://github.com/stripe/smokescreen).

## Benefits of Using Smokescreen as a Forward Proxy

By leveraging Smokescreen as a forward proxy for Convoy, you can take advantage of the following benefits:

- Enhanced security: Smokescreen provides robust security features, including traffic encryption, IP whitelisting, and authentication mechanisms.
- Advanced request handling: Smokescreen allows you to apply custom rules, modify headers, and perform request transformations to optimize the flow of webhooks.
- Analytics and monitoring: Smokescreen offers detailed analytics and monitoring capabilities, allowing you to gain insights into webhook traffic and performance.
