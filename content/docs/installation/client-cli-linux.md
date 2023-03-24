---
title: Install Convoy Client CLI on Linux
description: "Install Convoy Client CLI on Linux OS"
id: cli-linux
---

The installation procedures for Linux is split into two:
- Ubuntu and Debain users
- CentOS and RHEL users


### Ubuntu and Debian OS

Install the Convoy Client CLI from apt repository:

```console[terminal]
$ curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy-cli/setup.deb.sh' | sudo -E bash
$ sudo apt install convoy-cli
```

### CentOS and RHEL OS

Install the Convoy Client CLI using yum:

```console[terminal]
$ curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy-cli/setup.rpm.sh' | sudo -E bash
$ sudo yum install convoy-cli
```