---
title: Debugging Webhook Events with the new Convoy Client CLI
feature_image: debug-webhooks.png
post_image: debug-webhooks.png
primary_author:
    name: Daniel Oluojomu
    twitter: danvixent
primary_tag: Engineering
tags:
- Convoy
- Engineering
featured: false
description: Debugging webhook configuration can be very tedious, many times you are required plumb together multiple tools to get it to work end to end. In this article, we explain how the new Convoy Client CLI tool works.
published_at: 2023-03-20T10:00:00.000+00:00
---


# Debugging Webhook Events with the new Convoy Client CLI

## Background

Convoy is the fastest open-source webhooks gateway available, provides a secure means for engineers to send, receive and debug webhooks. Convoy provides comprehensive features such as retries, rate limiting, static IPs, circuit breaking, zero-downtime secrets upgrades and more. It's widely accepted among expanding teams and organisations that establishing shared services for synchronised teams is an effective approach to enhancing developer productivity throughout the organisation. This is one of the fundamental principles and driving forces behind the growth of platform engineering today.

### Quick overview

In furthering our objective of making webhooks easier to debug, we decided to overhaul our Convoy CLI stream implementation. Our users found the former implementation not so easy to use.

First pain point was the fact that we had all the CLI streaming commands in the main convoy binary:

- `login` which sets up the credentials the  CLI needs to listen for events.
- `listen` which uses the credentials to listen for events.
- `stream` this starts the event streaming server

The `listen` and `login` command depend on a `config.yml` file, however the `stream` command depends on the `convoy.json` configuration file as the rest of the convoy binary commands, read more [here](https://getconvoy.io/docs/cli). This is the basis of our decision to split them; we now have a [convoy-cli](https://github.com/frain-dev/convoy-cli) repository that holds the `login` and `listen` commands, the `stream` command continues to live in the main convoy binary.

We have also disabled CLI streaming for `outgoing` projects while we continue develop an intuitive solution for them, for now CLI is only enabled for `incoming` projects. CLI tokens have also been deprecated, you will now be required to login with a Personal API Key.

### Usage

To set up your convoy client cli to listen on events in an `incoming` project, you need to first install the `convoy-cli` binary. Run the following commands:

```bash
$ brew tap frain-dev/tools

$ brew install convoy-cli
```

On the convoy server, you have to start the stream server with the `stream` command:

```bash
$ convoy stream --config <path-to-config>
```

Next you have to login on the convoy cli using your Personal API Key

```bash
$ convoy-cli login --api-key <your-api-key> --host <your-stream-host-address>
```

This command will get a list of projects you have access to and add them to your `~/.convoy/config.yml` , don’t worry, the file will be created if it doesn’t exist. By default, the first project is set as the current project but you change this to another project by running the following commands:

```bash
$ convoy-cli project --list
- ID: dfd86411-3c8d-4fdb-a140-85827da345d2
 Name: Test Project
 Type: incoming
 Host: http://cli.getconvoy.io
 Status: Active

//...remaining projects

$ convoy-cli project --switch-to dfd86411-3c8d-4fdb-a140-85827da345d2
Successfully switched to Test Project
```

As demonstrated above you need to supply the project id to the `switch-to` flag. Now you’re all set to listen to incoming events. Listen to events from a particular source in the project with:

```bash
$ convoy-cli listen --source-name <the-source-name> --forward-to <your-forward-address>
```

Or all sources in the project with:

```bash
$ convoy-cli listen --forward-to <your-forward-address>
```

The value you pass to the `--forward-to` flag can be any address of your choice, but this will typically be an endpoint on a local server, where you can debug your events as they come in.

The full documentation for the convoy-cli tool can be found here.

### Conclusion

The Convoy Client CLI is a great way to debug your webhook events in your local environment without the need for tools like ngrok. This reaffirms our commitment at convoy to making webhooks ridiculously easy to handle and troubleshoot. Give it a try and give us feedback in our [slack](https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ) community.