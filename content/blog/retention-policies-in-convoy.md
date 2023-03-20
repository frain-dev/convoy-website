---
title: Retention policies in Convoy
feature_image: retention-policies.png
post_image: retention-policies.png
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: false
description: At Convoy, we make use of retention policies to enable you back up your existing webhook data. In this article, Raymond discusses what a retention policy is and its role in Convoy's engineering process. Webhooks are transient; they never get updated
published_at: 2022-10-12T10:00:00.000+00:00
---

## Introduction

Webhooks are transient; they never get updated. This makes it unnecessary to store webhook data for any longer than is needed. Cold storage like S3 should be strongly considered, this is why we have chosen to implement this in Convoy.

With the latest release of Convoy, we brought first-class support for retention policies to allow you to back up your existing webhook data.

## Retention Policies

While following best practices, one of the steps you need to consider is creating and managing a retention policy. Within this policy, you will outline cold storage requirements for events and event deliveries. Considerations within the policy include:

-   Content: What type of information are you storing?
-   Duration: How long will the information be stored?
-   Location: Where is the data being stored?
-   Security: How will the data be confidentially accessed?
-   Disaster Recovery: How easy is it to restore the backup?

This isn’t an exhaustive list of things to consider and not all might apply to your use case but can serve as a starting point.

### Events Retention

Let’s assume you have multiple applications that integrate a payment provider (e.g Stripe/Paystack) where you receive webhooks, you would typically place Convoy between the payment provider and your applications to add reliability, replay-ability, and a source of truth for your webhooks infrastructure. If your applications process a lot of payments per day, storing stale data in your Convoy instance can quickly become an issue. Some of these issues are:

-   You would be getting unnecessarily inflated bills. If you are using a managed MongoDB database service like MongoDB Atlas, your monthly bill might be over $1000 per month on a modest installation.
-   The throughput of your installation would take a hit because queries would become slower as the data grows even with indexes configured.

Events Retention will solve this problem by keeping your Convoy database as lean as possible. In practice, it would be best to store only webhooks that you absolutely need for debugging, resolving customer issues, audits for regulatory compliance, etc. You can configure how long data would be stored, once this time period has elapsed, Convoy will automatically remove this data and store it in your configured destination, freeing up a lot of space in its database. At this time Convoy supports exporting your data to an on-prem destination or an S3 compatible bucket.

### Choosing a Events Retention Duration

You should treat your webhook data like your application logs, both are useful when debugging, resolving customer issues or as input for audits for regulatory compliance. Hence, both should ideally be shipped to cold storage on the same schedule. If you have an idea of how long this should take you can skip to the next section.

The events retention period obviously depends on your requirements. If you are building out the infrastructure for troubleshooting and short-term reporting, you may need to keep only one or two months of events. If you are trying to stay compliant with the HIPAA regulations or if you’re a Fintech, you will need to keep at least 6 to 12 months' worth for the auditors, and possibly more, depending on your company’s corporate retention policy or customer success needs.

### Choosing a Storage Location

Convoy supports any S3 compatible service, these include services like

-   Amazon S3
-   Digital Ocean Spaces
-   MinIO
-   Wasabi, etc

You can find a list of other service providers [here](https://documentation.commvault.com/11.24/essential/9237_supported_cloud_storage_s3_compatible_object_storage_vendors.html).

## Configuration & Setup

Convoy supports two destinations for exported webhooks data:

-   `On-Prem` by defining a directory path.
-   `S3` by specifying AWS S3 bucket credentials.

### Install Convoy

You can install Convoy using the docker image:

```console[terminal]
$ docker run \
	-p 5005:5005 \
	--name convoy-server \
	-v `pwd`/convoy.json:/convoy.json \
	docker.cloudsmith.io/convoy/convoy/frain-dev/convoy:latest
```

### Setup Convoy

We need to create a few things to test retention policies. We need

-   A user access token
-   An organization
-   A project
-   An application with endpoints that can receive events

We need a user access token to create an organization and a project, so we will login via the API to get an access token. The returned `access_token` will be used to authenticate subsequent requests.

```console[terminal]
$ curl --location --request POST 'http://localhost:5005/ui/auth/login' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "username": "superuser@default.com",
	    "password": "default"
	}'
```

Create a new organization and copy the returned organization `uid`, we will use it when creating the project.

```console[terminal]
$ curl --location --request POST 'http://localhost:5005/ui/organisations' \
	--header 'Authorization: Bearer ACCESS_TOKEN' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "name": "Test Project"
	}'
```

Next we create a project with the retention policy configured. We configure the retention policy of events sent in the project to two minutes. Once every two minutes a scheduled job will export all the created events and event deliveries from that point in time to two minutes before to your configured destination, and then delete them from:

-   MongoDB: All db documents before the retention date will be hard deleted from the database
-   Typesense: All indexed events before the retention date would be deleted

```console[terminal]
$ curl --location --request \
	POST 'http://localhost:5005/ui/organisations/{org_id}/groups' \
	--header 'Authorization: Bearer ACCESS_TOKEN' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "name": "Retention Policy Test",
	    "type": "incoming",
	    "config": {
	        "is_retention_policy_enabled": true,
	        "retention_policy": {
	            "policy": "2m"
	        }
	    }
	}'
```

Next, we will configure the export destination, add this block to you config file.

```yaml[configuration file]
{
  "storage_policy": {
    "on_prem": {
      "path": "<path-to-your-export-directory>"
    },
    "s3": {
      "bucket": "<your-s3-bucket-name>",
      "region": "<your-s3-bucket-region>",
			"access_key": "<your-aws-access-key>",
			"secret_key": "<your-aws-secret-key>"
    },
    "type": "<s3-or-on_prem>"
  }
}
```

### On Prem configuration

This will export your events to a file on the running virtual machine. You need to ensure that Convoy has the user privileges to write to the folder so creating the folder and granting Convoy the permissions ahead of time would be necessary.

```console[terminal]
$ curl --location --request PUT 'http://localhost:5005/ui/configuration' \
--header 'Authorization: Bearer ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "storage_policy": {
        "type": "on_prem",
        "on_prem": {
            "path": "/var/convoy/export"
        }
    }
}'
```

### S3 Configuration

You can export your events to any S3 compatible storage service. We would cover setting this up in a different post.

```console[terminal]
$ curl --location --request PUT 'http://localhost:5005/ui/configuration' \
	--header 'Authorization: Bearer ACCESS_TOKEN' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "storage_policy": {
	        "type": "s3",
	        "s3": {
	            "bucket": "convoy",
	            "access_key": "6DXpKVZDAjdC9Ztu",
	            "secret_key": "14BLtxEpCkXhWqaPvJD0yy0c8VJY2xmO",
	            "endpoint": "http://localhost:9000"
	        }
	    }
	}'
```

To recap, there are two storage destination types `S3` and `on_prem` , depending on which you choose, you will have to supply different payload to configure it. Now that we have this setup, every time the retention policy job runs on Convoy, the config will be loaded and the data will be exported to the defined location.

## Testing it out

Convoy’s cron jobs run in a separate process which is called the `scheduler`. It is responsible for running deferred and periodic tasks. So you can run the Convoy server with `convoy server` and the scheduler with `convoy scheduler`.

For this demo we will start the scheduler using this command

```console[terminal]
$ convoy scheduler --export-spec "@every 2m"
```

This will start the scheduler and tell it to run the events export job every 2 minutes. Now we can send events normally, events and event deliveries older than 2 minutes will be archived and hard deleted from the db and search backend; we should also see the files in our configured directory as shown below:

![Event delivery files](/blog-assets/event-delivery.png)

![Events files](/blog-assets/events.png)

## **Conclusion**

Convoy gives us the ability to configure retention policies for projects. Once setup you do not have to worry about having stale webhook data in your database because Convoy provides you with that out of the box. Sounds good for your architecture? Why not try it out for yourself and give us feedback on our [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) community!
