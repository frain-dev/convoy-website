---
title: Install CLI from source
description: "Building Convoy CLI from GitHub source"
id: cli-source
---

To build Convoy from source code, you need:
* Go [version 1.16 or greater](https://golang.org/doc/install).
* NodeJS [version 14.17 or greater](https://nodejs.org).
* Npm [version 6 or greater](https://npmjs.com).

```bash
$ git clone https://github.com/frain-dev/convoy.git && cd convoy
$ make build
```

Verify the build by running the command below:

```console[terminal]
$ convoy -v

Convoy version v0.6.0
```