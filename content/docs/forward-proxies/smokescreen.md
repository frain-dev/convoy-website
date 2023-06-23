---
title: Configuring Stripe's Smokescreen as a forward proxy for Convoy
description: 'Convoy with Forward Proxies'
id: forward-proxies
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

In your convoy.json file, you need to specify the url to smokescreen as your proxy value:

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

## Access Control Lists (ACLs)

Smokescreen allows you to specify access control lists, these help prevent IP spoofing attacks.

```yaml
---
version: v1
services:
  - name: enforce-dummy-srv
    project: usersec
    action: enforce
    allowed_domains:
      - example1.com
      - example2.com
      - deny1.com # overrides global deny list

  - name: report-dummy-srv
    project: security
    action: report
    allowed_domains:
      - example3.com

global_allow_list:
  - goodexample1.com
  - goodexample2.com
  - goodexample3.com
  - conflictingexample.com

global_deny_list:
  - deny1.com
  - deny2.com
  - conflictingexample.com
```
The `enforce` action makes smokescreen strictly follow the defined rule, as opposed to `report` which allows the rule to be broken with a warning.
For more extensive documentation of Smokescreen's configuration see [here](https://github.com/stripe/smokescreen).
