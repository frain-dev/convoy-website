---
title: Install Convoy Client CLI from source
description: "Building Convoy Client CLI from GitHub source"
id: cli-source
---

To build Convoy Client CLIfrom source code, you need:
* Go [version 1.9 or greater](https://golang.org/doc/install).

```bash
$ git clone https://github.com/frain-dev/convoy-cli.git && cd convoy-cli
$ make install
```

Verify the build by running the command below:

```console[terminal]
$ convoy-cli -v

convoy-cli version v0.1.0
```