---
title: Debugging Webhook Events with the new Client CLI
feature_image: debug-webhooks-with-client-cli.png
post_image: debug-webhooks-with-client-cli.png
primary_author:
    name: Daniel Oluojomu
    twitter: danvixent
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: false
description: Debugging webhook configuration can be very tedious, many times you are required plumb together multiple tools to get it to work end to end. In this article, we explain how the new Client CLI tool works.
published_at: 2023-03-20T10:00:00.000+00:00
---

Hey Friends,

We re-launched our `client cli` tool with new documentation [here](https://getconvoy.io/docs/cli-file/convoy-cli). For the unfamiliar reader, Convoy is an open-source high-performance webhooks gateway to manage millions of webhooks end-to-end. It is designed to be a highly scalable multi-tenant webhooks gateway to support multiple backend services sending and receiving webhooks. In this article, we describe the new `client cli` and why we made these changes.

### Background

In our initial implementation of a client-side CLI, we noticed some issues that raised some questions on the CLI being intuitive and how to use it. Since then, we decided to take a different approach to improve the UX. Shedding more light on the issues:

-   In the initial implementation, we bundled the server and client program into one binary. This meant some commands like `convoy server` relied on the `convoy.json` config file while other commands like `convoy listen` relied on a different config file - `config.yml` . This wasn’t very intuitive — which command was for the server and which command was for the client? To solve this we now release two binaries `convoy` ( Our server program ) and `convoy-cli` ( Our client program )
-   Secondly, convoy is a webhooks gateway it is able to ingest webhooks from providers as well as send webhooks to consumers. To achieve this, we created two project types - `Incoming` and `Outgoing` projects. We realised that building a client-side program for the former is way easier than building for the latter. We decided to split up their implementation:
    -   For an `Incoming` project, a user can use their `personal access tokens` to authenticate against their instance and receive and debug events locally.
    -   For an `Outgoing` project, no other solution was more intuitive than `OAuth`. We decided to deprecate support for `CLI Tokens` and re-launch this when `OAuth` is ready. Please reach out to us on [slack](https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ) if you’re super interested in this.

### Usage

To set up your convoy-cli to listen on events in a `incoming` project, you need to first install the `convoy-cli` binary. Run the following commands:

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

The full documentation for the convoy-cli tool can be found [here](https://getconvoy.io/docs/cli-file/convoy-cli).

### Conclusion

In this article, we launched our new client side CLI and showed you how to set it up to debug webhooks locally. Sounds good for your platform? Why not try it out for yourself and give us feedback on our [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) community!
