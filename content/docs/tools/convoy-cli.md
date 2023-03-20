---
title: Convoy CLI
description: 'Convoy CLI tool'
id: convoy-cli
order: 1
---

# Convoy Client CLI

The Convoy Client CLI provides functionality that hooks into the server side event streaming for easy webhook debugging on your local machine.

## Installing the Convoy CLI

The Convoy Client CLI can be installed directly from your package manager or by building from the GitHub source:

<client-cli-tab></client-cli-tab>

## Using the CLI

To view the list of the available commands at any time, just run `convoy-cli` in your terminal with no arguments:

```console[terminal]
$ convoy-cli
Convoy CLI for debugging your events locally

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

```console[terminal]
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

```console[terminal]
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

The login command authenticates your Convoy CLI with a Personal API Key to give access to your Convoy instance.

### Command Flags

- `--help`: Get help on the login command.
- `--api-key`: This flag specifies the Personal API key for authenticating the CLI. This is a required parameter that must be passed when running the command.
- `--host`: This flag specifies the host for your Convoy instance. For cloud users, the default host is `https://cli.getconvoy.io`.

## Logout

Command: `convoy-cli logout`

### Synopsis

```console[terminal]
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

```console[terminal]
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
