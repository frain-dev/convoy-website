---
title: CLI
description: 'CLI'
id: cli
order: 3
---

# CLI

Convoy ships with a very easy-to-use command-line interface (CLI). Refer to the navigation to the right for a list of subcommands.

## Installing the CLI

The Convoy CLI can be installed directly from your package manager or by building from the GitHub source:

{% tabs %}
{% tab label="Mac" %}
Install the Convoy CLI to your Mac from brew:

```bash {% file="terminal" %}
$ brew tap frain-dev/tools
$ brew install convoy
```

{% /tab %}

{% tab label="Linux" %}

The installation procedures for Linux is split into two:

-   Ubuntu and Debain users
-   CentOS and RHEL users

### Ubuntu and Debain OS

Install the Convoy CLI from apt repository:

```bash {% file="terminal" %}
$ curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy/setup.deb.sh' | sudo -E bash
$ sudo apt install convoy
```

### CentOS and RHEL OS

Install the Convoy CLI using yum:

```bash {% file="terminal" %}
$ curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy/setup.rpm.sh' | sudo -E bash
$ sudo yum install convoy
```

{% /tab %}

{% tab label="Windows" %}

To install Convoy on Windows, download the binary applicable to your machine:

-   [Download for AMD64](https://dl.cloudsmith.io/public/convoy/convoy/raw/versions/0.6.6/convoy_0.6.6_windows_amd64.tar.gz)
-   [Download for ARM64](https://dl.cloudsmith.io/public/convoy/convoy/raw/versions/0.6.6/convoy_0.6.6_windows_arm64.tar.gz)

{% /tab %}

{% tab label="Source" %}

To build Convoy from source code, you need:

-   Go [version 1.16 or greater](https://golang.org/doc/install).
-   NodeJS [version 14.17 or greater](https://nodejs.org).
-   Npm [version 6 or greater](https://npmjs.com).

```bash
$ git clone https://github.com/frain-dev/convoy.git && cd convoy
$ make build
```

Verify the build by running the command below:

```bash {% file="terminal" %}
$ convoy -v
Convoy version v0.6.0
```

{% /tab %}
{% /tabs %}

## Using the CLI

To view the list of the available commands at any time, just run `convoy` in your terminal with no arguments:

```bash {% file="terminal" %}
$ convoy
High Performance Webhooks Gateway

Usage:
  Convoy [command]

Available Commands:
  bootstrap   bootstrap creates a new user account
  completion  generate the autocompletion script for the specified shell
  config      config outputs your instances computed configuration
  help        Help about any command
  ingest      Ingest webhook events from Pub/Sub streams
  migrate     Convoy migrations
  retry       retry event deliveries with a particular status in a timeframe
  scheduler   scheduler runs periodic tasks
  server      Start the HTTP server
  stream      Start a websocket server to pipe events to a convoy cli instance
  version     Print the version
  worker      Start worker instance

Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
  -h, --help                    help for Convoy
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-type string       Redis provider
      --redis-username string   Redis Username
  -v, --version                 version for Convoy
```

To get help for any specific command, pass the `-h` flag to the relevant subcommand. For example, to get help about the `worker` sub-command run `convoy worker -h`

## Ingest

Command: `convoy ingest`

### Synopsis

```bash {% file="terminal" %}
$ convoy ingest --help
Ingest webhook events from Pub/Sub streams

Usage:
  Convoy ingest [flags]

Flags:
  -h, --help           help for ingest
      --interval int   the time interval, measured in seconds, at which the database should be polled for new pub sub sources (default 300)

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-username string   Redis Username
```

### Description

### Command Flags

-   `--interval`: The time in seconds to poll the database for changes in the source configuration.

## Bootstrap

Command: `convoy bootstrap`

### Synopsis

```bash {% file="terminal" %}
$ convoy bootstrap --help
bootstrap creates a new user account

Usage:
  Convoy bootstrap [flags]

Flags:
      --email string        Email
      --first-name string   Email (default "admin")
      --format string       Output Format (default "json")
  -h, --help                help for bootstrap
      --last-name string    Email (default "admin")

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-type string       Redis provider
      --redis-username string   Redis Username
```

### Description

The bootstrap creates a new user account.

### Command Flags

-   `--help`: Get help on the bootstrap command.

## Stream

Command: `convoy stream`

### Synopsis

```bash {% file="terminal" %}
$ convoy stream --help
Start a websocket server to pipe events to a convoy cli instance

Usage:
  Convoy stream [flags]

Flags:
  -h, --help                 help for stream
      --log-level string     stream log level (default "error")
      --socket-port uint32   Socket port (default 5008)

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-username string   Redis Username

```

### Description

The stream command starts a websocket server to pipe events to another convoy instance.

### Command Flags

-   `--help`: Get help on the stream command.

## Migrate

Command: `convoy migrate`

### Synopsis

```bash {% file="terminal" %}
$ convoy migrate --help
Convoy migrations

Usage:
  Convoy migrate [command]

Available Commands:
  create      creates a new migration file
  down        Rollback migrations
  up          Run all pending migrations

Flags:
  -h, --help   help for migrate

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-username string   Redis Username

```

### Description

The migrate command is responsible for running pending migrations and rolling back migrations.

### Command Flags

-   `down`: Rollback migrations.
-   `up`: Run all pending migrations

## Config

Command: `convoy config`

## Synopsis

```bash {% file="terminal" %}
$ convoy config -h
config outputs your instances computed configuration

Usage:
  Convoy config [flags]

Flags:
  -h, --help   help for config

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-username string   Redis Username

```

### Description

The config command outputs the configuration for your active instances.

### Command Flags

-   `--help`: Get help on the config worker.

## Server

Command: `convoy server`

### Synopsis

```bash {% file="terminal" %}
$ convoy server --help
Start the HTTP server

Usage:
  Convoy server [flags]

Aliases:
  server, serve, s

Flags:
      --api-auth string            API-Key authentication credentials
      --basic-auth string          Basic authentication credentials
      --cache string               Cache Provider ("redis" or "in-memory") (default "redis")
      --disable-endpoint           Disable all application endpoints
      --env string                 Convoy environment (default "development")
  -h, --help                       help for server
      --host string                Host - The application host name
      --limiter string             Rate limiter provider ("redis" or "in-memory") (default "redis")
      --log-level string           Log level (default "error")
      --logger string              Logger (default "info")
      --max-response-size uint     Max response size
      --multi-tenant               Start convoy in single- or multi-tenant mode
      --native                     Enable native-realm authentication
      --new-relic-app string       NewRelic application name
      --new-relic-config-enabled   Enable new-relic config
      --new-relic-key string       NewRelic application license key
      **--new-relic-**tracer-enabled   Enable new-relic distributed tracer
      --port uint32                Server port
      --promaddr string            Prometheus dsn
      --proxy string               HTTP Proxy
      --replay-attacks             Enable feature to prevent replay attacks
      --retry-interval uint        Endpoint retry interval
      --retry-limit uint           Endpoint retry limit
      --retry-strategy string      Endpoint retry strategy
      --searcher string            Searcher
      --sentry string              Sentry DSN
      --signature-hash string      Application signature hash
      --signature-header string    Application signature header
      --ssl                        Configure SSL
      --ssl-cert-file string       SSL certificate file
      --ssl-key-file string        SSL key file
      --typesense-api-key string   Typesense Api Key
      --typesense-host string      Typesense Host
      --worker-port uint32         Worker port

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-username string   Redis Username

```

### Description

The server command runs convoy’s REST API. The REST API is the primary entry point to using convoy and this command is likely the most important command.

### Command Flags

-   `--port`: This flag specifies the port number the server listens on. This is a required parameter that must be configured from one of the configuration sources.

-   `--auth`: This flag specifies if the REST API will require authentication or not. It is enabled by default

-   `--multi-tenant`: This flag specifies the mode the instance is running. It’s a boolean flag. When set to `true` . The server will only receive events but not run workers in the background. It is expected that you will run `convoy worker` as a different process to consume event deliveries off the queue. Defaults to `false`.

-   `--max-response-size`: This flag specifies the maximum response in bytes of the endpoint’s payload to store. This configuration only affects the default group.

-   `--native`: This flag specifies if the `native` realm should be enabled. You can read more about the native realm [here](insert-link) It is a boolean flag. Defaults to `false`.

-   `--disable-endpoint`: This flag specifies the `disable-endpoint` configuration for the default group for convoy instances running in non-multi tenant mode.Defaults to `false`.

-   `--signature-hash`: This flag specifies the hash algorithm for the default group for convoy instances running in non-multi tenant mode.

-   `--signature-header`: This flag specifies the HTTP header for the default group for convoy instances running in non-multi tenant mode.

-   `--sentry`: This flag specifies the DSN to push telemetry data to sentry.

-   `--ssl`: This specifies if the server should run with `ssl` enabled. If true, then you must specify two other flags `--ssl-cert-file` and `--ssl-key-file`.

-   `--ssl-cert-file`: This is a path to the SSL certificate file. If specified and `ssl` is set to `false`; nothing happens.

-   `--ssl-key-file`: This is a path to the SSL key file. If specified and `ssl` is set to `false`; nothing happens.

-   `--with-workers`: This specifies if the server should run in monolith mode. This means both the server and worker will be run in the same process. Defaults to `true` if not specified.

## Worker

Command: `convoy worker`

### Synopsis

```bash {% file="terminal" %}
$ convoy worker -h
Start worker instance

Usage:
  Convoy worker [flags]

Flags:
  -h, --help                       help for worker
      --log-level string           scheduler log level
      --new-relic-app string       NewRelic application name
      --new-relic-config-enabled   Enable new-relic config
      --new-relic-key string       NewRelic application license key
      --new-relic-tracer-enabled   Enable new-relic distributed tracer
      --smtp-from string           Sender email address
      --smtp-password string       SMTP authentication password
      --smtp-provider string       SMTP provider
      --smtp-reply-to string       Email address to reply to
      --smtp-ssl                   Enable SMTP SSL
      --smtp-url string            SMTP provider URL
      --smtp-username string       SMTP authentication username
      --worker-port uint32         Worker port (default 5006)

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-username string   Redis Username
```

### Description

The worker command is used when running convoy in the micro-services mode. It does the job by simply reading event deliveries of the queue and passing them to consumers to process. It is possible to run multiple worker processes to scale up your workers.

This command requires all Global configurations to be set either through the CLI or the configuration file. This is because the workers need to connect to both the database and the queues to perform its duty.

### Command Flags

-   `--smtp-provider`: This flag specifies the name of the SMTP provider. While this isn’t necessary for smtp configuration, it is used to provider rich log.
-   `--smtp-from`: This specifies the sender’s email address when sending notification emails.
-   `--smtp-url`: This specifies the smtp servers’ url. You should lookup the providers’ documentation on how to specify this flag.
-   `--smtp-port`: This specifies the smtp servers’ port. You should lookup the providers’ documentation o how to specify this flag.
-   `--smtp-reply-to`: This specifies the email to use as reply-to in notification emails sent.
-   `--smtp-username`: This specifies the username for smtp authentication. You should lookup the providers’ documentation on how to specify this flag.
-   `--smtp-password`: This specifies the password for smtp authentication. You should lookup the providers’ documentation on how to specify this flag.
-   `--smtp-ssl`: This specifies if ssl should be used in the smtp protocol for sending emails.
-   `--help`: Get help on the worker command.
-   `--worker-port`: Specify the worker server’s port. Defaults to `5006` if not specified.

## Retry

Command: `convoy retry`

### Synopsis

```bash {% file="terminal" %}
$ convoy retry -h
retry event deliveries with a particular status in a timeframe

Usage:
  Convoy retry [flags]

Flags:
  -h, --help            help for retry
      --status string   Status of event deliveries to re-queue
      --time string     Time interval

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-username string   Redis Username
```

### Description

At core, convoy is an asynchronous messaging service. It relies on message brokers to carry out its duty. This command is used to filter event deliveries that match the filters set; it will purge the queues for all matched event deliveries and re-enqueue them all.

### Command Flags

-   `--status`: This is used to specify the status of event delivery to re-queue.

-   `--time`: This is used to specify how far in the past to look for event deliveries. It accepts a duration string. Duration strings are like integers followed by a time unit. E.g. `1h`, `300ms`, or `2h45m` etc.

## Scheduler

Command: `convoy scheduler`

### Synopsis

```bash {% file="terminal" %}
$ convoy scheduler -h
requeue event deliveries in the background with a scheduler.

Usage:
  Convoy scheduler [flags]

Flags:
      --export-spec string   export scheduler time interval '@every <duration>' (default "@every 24h")
  -h, --help              help for scheduler
      --port uint32       port to serve Metrics (default 5007)

Global Flags:
      --config string           Configuration file for convoy (default "./convoy.json")
      --db-database string      Database Database
      --db-host string          Database Host
      --db-options string       Database Options
      --db-password string      Database Password
      --db-port int             Database Port
      --db-scheme string        Database Scheme
      --db-type string          Database provider
      --db-username string      Database Username
      --redis-database string   Redis database
      --redis-host string       Redis Host
      --redis-password string   Redis Password
      --redis-port int          Redis Port
      --redis-scheme string     Redis Scheme
      --redis-username string   Redis Username
```

### Description

The scheduler runs as an automated `retrier`. It performs the same duty as `convoy retry` but it runs in the background and performs the retry function at a predefined interval.

### Command Flags

-   `--export-spec`: This is used to specify how far in the past to look for event deliveries. It accepts a duration string. Duration strings are like integers followed by a time unit. E.g. `1h`, `300ms`, or `2h45m` etc.

-   `--port`: This is the port where the metrics from the scheduler serves the metrics and has a default port of `5007`.
