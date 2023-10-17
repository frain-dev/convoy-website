---
title: Client CLI
description: 'Client CLI tool'
id: convoy-cli
order: 1
---

# Client CLI

The Client CLI is our client-side command-line tool used to debug webhook events locally. With it, users can stream events from a Convoy server to their local server to debug events failing in production.

## Installing the Client CLI

The Client CLI can be installed directly from your package manager or by building from the GitHub source:

{% tabs %}

{% tab label="Mac" %}

Install the Convoy CLI to your Mac from brew:

```bash {% file="terminal" %}
$ brew tap frain-dev/tools
$ brew install convoy-cli
```

{% /tab %}

{% tab label="Linux" %}

The installation procedures for Linux is split into two:

-   Ubuntu and Debain users
-   CentOS and RHEL users

### Ubuntu and Debian OS

Install the Convoy Client CLI from apt repository:

```bash {% file="terminal" %}
$ curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy-cli/setup.deb.sh' | sudo -E bash
$ sudo apt install convoy-cli
```

### CentOS and RHEL OS

Install the Convoy Client CLI using yum:

```bash {% file="terminal" %}
$ curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy-cli/setup.rpm.sh' | sudo -E bash
$ sudo yum install convoy-cli
```

{% /tab %}

{% tab label="Windows" %}
To install Convoy on Windows, download the binary applicable to your machine:

-   [Download for AMD64](https://dl.cloudsmith.io/public/convoy/convoy-cli/raw/versions/0.1.0/convoy-cli_0.1.0_windows_amd64.tar.gz)
-   [Download for ARM64](https://dl.cloudsmith.io/public/convoy/convoy-cli/raw/versions/0.1.0/convoy-cli_0.1.0_windows_arm64.tar.gz)

{% /tab %}

{% tab label="Source" %}

To build Convoy Client CLI from source code, you need:

-   Go [version 1.9 or greater](https://golang.org/doc/install).

```bash
$ git clone https://github.com/frain-dev/convoy-cli.git && cd convoy-cli
$ make install
```

Verify the build by running the command below:

```bash {% file="terminal" %}
$ convoy-cli -v

convoy-cli version v0.1.0
```

{% /tab %}
{% /tabs %}

## Using the CLI

To view the list of the available commands at any time, just run `convoy-cli` in your terminal with no arguments:

```bash {% file="terminal" %}
$ convoy-cli
Client CLI for debugging your events locally

Usage:
  convoy-cli [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  listen      Starts a websocket client that listens to events streamed by the server
  login       Logs into your Convoy instance using a CLI API Key
  logout      Logs out of your Convoy instance
  project     Switch, List or Refresh projects

Flags:
  -h, --help      help for convoy-cli
  -v, --version   version for convoy-cli

Use "convoy-cli [command] --help" for more information about a command.
```

To get help for any specific command, pass the `-h` flag to the relevant subcommand. For example, to get help about the worker subcommand

```bash {% file="terminal" %}
$ convoy-cli project -h
Switch, List or Refresh projects

Usage:
  convoy-cli project [flags]

Flags:
  -h, --help               help for project
      --list               List all projects
      --refresh            Refresh the project list
      --switch-to string   Switch to specified project
```

## Login

Command: `convoy-cli login`

### Synopsis

```bash {% file="terminal" %}
$ convoy-cli login --help
Logs into your Convoy instance using a Personal API Key

Usage:
  convoy-cli login [flags]

Flags:
      --api-key string   API Key
  -h, --help             help for login
      --host string      Host (default "https://cli.getconvoy.io")
```

### Description

The login command authenticates your Client CLI with a Personal API Key to give access to your Convoy instance.

### Command Flags

- `--help`: Get help on the login command.
- `--api-key`: This flag specifies the Personal API key for authenticating the CLI. This is a required parameter that must be passed when running the command.
- `--host`: This flag specifies the host for your Convoy instance. For cloud users, the default host is `https://cli.getconvoy.io`.

## Logout

Command: `convoy-cli logout`

### Synopsis

```bash {% file="terminal" %}
$ convoy-cli logout
Logs out of your Convoy instance

Usage:
  convoy-cli logout [flags]

Flags:
  -h, --help   help for logout
```

### Description

The logout command logs out of your Convoy instance

### Command Flags

- `--help`: Get help on the logout command.

## Listen

Command: `convoy-cli listen`

### Synopsis

```bash {% file="terminal" %}
$ convoy listen --help
Starts a websocket client that listens to events streamed by the server

Usage:
  convoy-cli listen [flags]

Flags:
      --forward-to string    The host/web server you want to forward events to
  -h, --help                 help for listen
      --since string         Send discarded events since a timestamp (e.g. 2013-01-02T13:23:37Z) or relative time (e.g. 42m for 42 minutes)
      --source-name string   The name of the source you want to receive events from (only applies to incoming projects)
```

### Description

The listen command forwards events streamed from a source in your Convoy instance to a defined web server. The listen command starts a websocket client that listens to events streamed by the servcer.

### Command Flags
- `--help`: Help for listen
- `--forward-to`: The host/web server you want to forward events to.
- `--since`: Send discarded events since a timestamp (e.g. 2013-01-02T13:23:37Z) or relative time (e.g. 42m for 42 minutes).
- `--source-name`: The name of the source you want to receive events from (only applies to incoming projects).
