---
title: Configuration
description: 'Convoy Configuration'
id: configuration
order: 4
---

# Configuration

You can configure Convoy by using one of or a combination of the methods below:
- creating a `config json file` (default)
- setting `environment variables`.
- setting `cli flags`

The order of preference when all the are used is `cli flags` > `environment variables` > `config json file`. Values set in the cli flags will override the same config value set with either env vars of in the config file.

## Creating a config json file
An example configuration is shown below:

```json[Sample Config]
{
  "environment": "dev",
  "database": {
      "type": "mongodb",
      "dsn": "mongodb://mongo1:27017,mongo2:27017,mongo3:27017/convoy?replicaSet=myReplicaSet&readPreference=primary&ssl=false"
  },
  "queue": {
      "type": "redis",
      "redis": {
          "dsn": "redis://redis_server:6379"
      }
  },
  "cache": {
      "type": "redis",
      "redis": {
          "dsn": "redis://redis_server:6379"
      }
  },
  "host": "{host}",
  "logger": {
      "type": "console",
      "server_log": {
          "level": "error"
      }
  },
  "smtp": {
      "provider": "sendgrid",
      "url": "smtp.sendgrid.net",
      "port": 2525,
      "username": "apikey",
      "password": "<api-key-from-sendgrid>",
      "from": "support@frain.dev"
  },
  "search": {
      "type": "typesense",
      "typesense": {
          "host": "http://typesense:8108",
          "api_key": "convoy"
      }
  },
  "server": {
      "http": {
          "ssl": false,
          "ssl_cert_file": "",
          "ssl_key_file": "",
          "port": 5005
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

-   `environment`: Configure which environment configure is running on. Defaults `development`.
-   `database`: Configures the main data store. Currently supported databases: `mongodb`.
	```json[sample]
	{
	  "database": {
	    "type": "mongodb",
	    "dsn": "mongodb://localhost:27017/convoy"
	  },
	}
	```
-   `queue`, `cache` and `limiter`: This configures a queuing backend to use. Currently supported queuing, caching and rate limiter backends: `redis`, planned queuing backends: `rabbitmq` and `sqs`.
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
-   `port`: Specifies which port Convoy should run on.
-   `worker_port`: Specifies which port Convoy workers should run on.
-   `auth`: This specifies authentication mechanism used to access Convoy's API. Convoy has two APIs, one for the UI and the second is the public API. Each API requires authentication by default.  Convoy supports two authentication mechanisms:
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

-   `smtp`: Convoy sends out emails for several reasons for [dead endpoints](./overview#dead-endpoints), team invitation etc. It needs a SMTP provider to do this.

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
-   `tracer` and `new_relic`: Convoy uses [newrelic](https://newrelic.com) for tracing.

	```json[sample]
	{
	  "tracer": {
	    "type": "new_relic"
	  },
	  "new_relic": {
	    "license_key": "012345678909876543210",
	    "app_name": "convoy",
	    "config_enabled": true,
	    "distributed_tracer_enabled": true
	  }
	}
	```

## Environment Variables

Alternatively, you can configure Convoy using the following environment variables:

- `CONVOY_ENV`
- `SSL`
- `PORT`
- `WORKER_PORT`
- `CONVOY_HOST`
- `CONVOY_DB_TYPE`
- `CONVOY_DB_DSN`
- `CONVOY_LIMITER_PROVIDER`
- `CONVOY_CACHE_PROVIDER`
- `CONVOY_QUEUE_PROVIDER`
- `CONVOY_REDIS_DSN`
- `CONVOY_LOGGER_LEVEL`
- `CONVOY_LOGGER_PROVIDER`
- `CONVOY_SSL_KEY_FILE`
- `CONVOY_SSL_CERT_FILE`
- `CONVOY_SMTP_PROVIDER`
- `CONVOY_SMTP_URL`
- `CONVOY_SMTP_USERNAME`
- `CONVOY_SMTP_PASSWORD`
- `CONVOY_SMTP_FROM`
- `CONVOY_SMTP_PORT`
- `CONVOY_SMTP_REPLY_TO`
- `CONVOY_NEWRELIC_APP_NAME`
- `CONVOY_NEWRELIC_LICENSE_KEY`
- `CONVOY_NEWRELIC_CONFIG_ENABLED`
- `CONVOY_NEWRELIC_DISTRIBUTED_TRACER_ENABLED`
- `CONVOY_REQUIRE_AUTH`
- `CONVOY_BASIC_AUTH_CONFIG`
- `CONVOY_API_KEY_CONFIG`
- `CONVOY_NATIVE_REALM_ENABLED`
- `CONVOY_JWT_REALM_ENABLED`
- `CONVOY_JWT_SECRET`
- `CONVOY_JWT_EXPIRY`
- `CONVOY_JWT_REFRESH_SECRET`
- `CONVOY_JWT_REFRESH_EXPIRY`
- `CONVOY_SEARCH_TYPE`
- `CONVOY_TYPESENSE_HOST`
- `CONVOY_TYPESENSE_API_KEY`
