---
title: Install CLI on Linux
description: "Install CLI on Linux OS"
id: cli-linux
---

The installation procedures for Linux is split into two:
- Ubuntu and Debain users
- CentOS and RHEL users


### Ubuntu and Debain OS

Install the Convoy CLI from apt repository:

```console[terminal]
$ curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy/setup.deb.sh' | sudo -E bash
$ sudo apt install convoy
```

### CentOS and RHEL OS

Install the Convoy CLI using yum:

```console[terminal]
$ curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy/setup.rpm.sh' | sudo -E bash
$ sudo yum install convoy
```