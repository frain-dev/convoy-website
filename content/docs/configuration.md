---
title: Configuration
description: 'Convoy Configuration'
id: configuration
order: 4
---

# Configuration

Convoy can be configured by using one of or a combination of the methods below:
- Creating a `convoy.json` configuration file (default)
- Setting environment variables.
- Setting CLI flags

The order of preference when all three is used is **CLI flags** > **environment variables** > **convoy.json** file. Values set in the cli flags will override the same config value set with either env vars of in the config file.

## Configuration File

An example configuration is shown below:

```json[Sample Config]
{
  "host": "hooks.domain.com",
  "database": {
      "type": "postgres",
      "dsn": "postgres://localhost/convoy?sslmode=disable"
  },
  "server": {
      "http": {
          "ssl": false,
          "ssl_cert_file": "",
          "ssl_key_file": "",
          "port": 5005,
          "worker_port": 5006
      }
  },
  "queue": {
      "type": "redis",
      "redis": {
          "dsn": "redis://redis_server:6379"
      }
  },
  "search": {
      "type": "typesense",
      "typesense": {
          "host": "http://typesense:8108",
          "api_key": "convoy"
      }
  },
  "auth": {
      "jwt": {
          "enabled": true
      },
      "native": {
          "enabled": true
      }
  }
}
```

## Parameters

This section explains the role of the parameters used in configuring the Convoy instance.

-   `database` ( required ) <br /> 
    The parameter houses the configuration for the main data store. Currently supported databases: `PostgreSQL`.
	```json[sample]
	{
	  "database": {
	    "type": "postgres",
	    "dsn": "postgres://localhost/convoy?sslmode=disable"
	  },
	}
	```

-   `queue`, `cache` and `limiter` <br />
    These parameters are used to configure convoy's queuing backend, caching backend and rate limiting backend respectively. They all currently only support `redis` and therefore have similar configuration format. Configuration for the `queue` is `required` while the others are `optional`.
	```json[sample]
	{
	   "queue": {
		   "type": "redis",
		   "redis": {
		     "dsn": "redis://localhost:6379"
		   }
	   }
	}
	```

-   `server` ( optional )  <br /> 
    This parameter configures the settings for both the api and worker server. It specifies the port and ssl settings for the both the api and worker server. `ssl` defaults to `false`, when set `ssl_key_file` and `ssl_cert_file` must be set as well. `port` and `worker_port` are set to `5005` and `5006` by default respectively. 

-   `auth` ( required ) <br /> 
    This specifies the authentication mechanism used to access Convoy's API. Convoy has two APIs; one for the UI and the other for the public API. Each API requires authentication by default.  Convoy supports two authentication mechanisms: <br />
	 - `native`: Configure realm. This is used for the Public API.
	 - `jwt`: Configure jwt. This is used for UI authentication.

	```json[sample]
	{
	  "auth": {
	    "native": {
	      "enabled": true
	    },
	    "jwt": {
	      "enabled": true
	    },
	  }
	}
	```

-   `smtp` ( optional ) <br /> 
    Convoy sends out emails for several reasons for [dead endpoints](./glossary#dead-endpoints), team invitation etc. It needs a SMTP provider to do this.

	```json[sample]
	{
	    "smtp": {
			"provider": "sendgrid",
			"url": "smtp.sendgrid.net",
			"port": 2525,
			"username": "apikey",
			"password": "api-key-from-sendgrid",
			"from": "support@frain.dev"
		}
	}
	```

- `host` ( optional ) <br /> 
    This specifies your convoy instance host name. It is used for various things like [portal link](./manual/portal-links.md) configuration, user invitation.

## Environment Variables

Alternatively, you can configure Convoy using the following environment variables:

| Parameter | Description |
| :---        |    ----:   |
| - `CONVOY_ENV` | The environment the convoy worker runs on. The default value is `development` and can be switched to `production` depending on the scenario.|
| - `SSL` | A boolean value to activate SSL.|
| - `PORT` | The port on which the Convoy instance will listen to. E.g., `8080`.|
| - `WORKER_PORT` | The port on which the Convoy worker will listen to. E.g., `8081`.|
| - `CONVOY_HOST` | The host on which the Convoy instance will be run on. E.g., `10.0.0.1`|
| - `CONVOY_DB_TYPE` | The database type associated with the Convoy instance. PostgreSQL is currently the only supported database.|
| - `CONVOY_DB_DSN` | The connection address of the database supplied earlier. Example: `postgres://localhost/convoy?sslmode=disable`.|
| - `CONVOY_LIMITER_PROVIDER` | The rate limiter provider. This is set to `redis` by default. |
| - `CONVOY_CACHE_PROVIDER` | The cache provider for the Convoy instance. E.g.,: `redis`.|
| - `CONVOY_QUEUE_PROVIDER` | The queue provider for the Convoy instance. E.g.,: `rabbitmq`.|
| - `CONVOY_REDIS_DSN` | The connection address for the cache provider, `redis`. E.g., `redis://redis:6379` |
| - `CONVOY_LOGGER_LEVEL` | The log returned by Convoy's logger. The default level is `info` and can be set to `error`.|
| - `CONVOY_LOGGER_PROVIDER` | The medium where logs are sent to. The defautl provider is set to `console`.|
| - `CONVOY_SSL_KEY_FILE` | The path to your SSL key file. |
| - `CONVOY_SSL_CERT_FILE` | The path to your SSL certificate file. |
| - `CONVOY_SMTP_PROVIDER` | The provider for SMTP ( mailing ) operations. E.g., `sengrid`.|
| - `CONVOY_SMTP_URL` | The SMTP provider URL. E.g., `smtp.sendgrid.net`|
| - `CONVOY_SMTP_USERNAME` | The SMTP username required to sign in to the provider.|
| - `CONVOY_SMTP_PASSWORD` | The SMTP password required to sign in to the provider.|
| - `CONVOY_SMTP_FROM` | THe SMTP address associated with the SMTP account and from which mails will be sent on behalf of. E.g., `welcome@frain.dev`.|
| - `CONVOY_SMTP_PORT` | The SMTP provider port. E.g., `2525`.|
| - `CONVOY_SMTP_REPLY_TO` | The SMPT address replies from mail will be directed to.|
| - `CONVOY_NEWRELIC_APP_NAME` | The application name from your newrelic account.|
| - `CONVOY_NEWRELIC_LICENSE_KEY` | The license key associated with your newrelic account.|
| - `CONVOY_NEWRELIC_CONFIG_ENABLED` | A boolean value to set the configuration state for newrelic.|
| - `CONVOY_NEWRELIC_DISTRIBUTED_TRACER_ENABLED` | A boolean value to set the configuration state for newrelic's tracer.|
| - `CONVOY_REQUIRE_AUTH` | A boolean value to configure the requirement status for authentication.|
| - `CONVOY_API_KEY_CONFIG` | The API key configuration value.|
| - `CONVOY_NATIVE_REALM_ENABLED` | A boolean value to activate native realm authentication.|
| - `CONVOY_JWT_REALM_ENABLED` | A boolean value to activate native JWT authentication.|
| - `CONVOY_JWT_SECRET` | The JWT secret to be used in encoding and decoding JWT tokens.|
| - `CONVOY_JWT_EXPIRY` | The expiry period for the JWT tokens signed.|
| - `CONVOY_JWT_REFRESH_SECRET` | The refresh secret for JWT refresh tokens.|
| - `CONVOY_JWT_REFRESH_EXPIRY` | The expiry period for JWT refresh tokens|
| - `CONVOY_SEARCH_TYPE` | The type of search tool used in the Convoy instance. E.g., `typesense`.|
| - `CONVOY_TYPESENSE_HOST` | The host address of the typesense instance used. E.g., `http://typesense:8108`.|
| - `CONVOY_TYPESENSE_API_KEY` | The API key required to interact with typesense.|
