---
title: Let's Replicate PagerDuty Webhooks
feature_image: pagerduty-webhooks.png
post_image: pagerduty-webhooks.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Engineering
tags: 
    - Convoy
    - Engineering
featured: false
description: PagerDuty V3 Webhooks is one of the most advanced with several great features for webhooks delivery. We re-implemented all these in Convoy. Enjoy!
published_at: 2022-12-19T17:00:00.000+00:00
---
# Introduction

PagerDuty V3 Webhooks is the 3rd iteration of their Webhooks delivery system. In my opinion, it is one of the world’s most advanced webhook delivery systems with specific important features that are hard to find (or completely omitted) in other systems. In PagerDuty V3 Webhooks, users can subscribe to both event types and events from specific services, teams or accounts. This narrows down the amount of events sent to consumers and reduces pressure on consumers dealing with un-important events.

Convoy is an open-source webhooks delivery infrastructure. It can dispatch webhook events to consumers at any scale with all fantastic features each provider needs, thereby reducing their time to market to minutes instead of months. To achieve this, We give webhook providers, APIs to send webhooks in minutes alongside other important features for better development experience, security and scalability. In this article, we will use Convoy to replicate PagerDuty V3 Webhooks.

## Prerequisites

To follow along you would need the following

1. A [Convoy Cloud](https://dashboard.getconvoy.io/signup) account.
2. An Outgoing Project ID & API Key.

# PagerDuty Webhooks

Before we replicate PagerDuty’s webhooks, let’s take some time to highlight their important features, and why they’re important.

### Zero Downtime Key Rotation

```bash
X-PagerDuty-Signature:
v1=f03de6f61df6e454f3620c4d6aca17ad072d3f8bbb2760eac3b2ad391b5e8073,
v1=130dcacb53a94d983a37cf2acba98e805a1c37185309ba56fdcccbcf00d6dd8b
```

Because, webhooks rely on shared secrets, providing easy key rotation without downtime is a necessity. This exists in Stripe’s webhooks implementation and we wrote about how it works in detail [here](https://getconvoy.io/blog/generating-stripe-like-webhook-signatures/).

### Event Types

```json
"events": [
  "incident.acknowledged",
  "incident.annotated",
  "incident.delegated",
  "incident.escalated",
  "incident.priority_updated",
  "incident.resolved",
  "incident.responder.added",
  "incident.responder.replied",
  "incident.status_update_published",
]
```

To subscribe to events on PagerDuty, you need to supply an array of event types you care about. While this may seem obvious, it is not a common implementation rather, consumers receive all events from their providers and decide to process or ignore. This is the first level of subscription that ensures that only events that are important are sent over and others are disregarded.

### Filter By Service, Teams or Accounts

```json
"filter": {
  "id": "P393ZNQ",
  "type": "service_reference"
}
```

When subscribing to webhook events in PagerDuty, consumers are allowed to subscribe to events from specific services, teams or accounts and disregard all others. The code snippet above is an aspect of the payload for creating a webhook subscription (click [here](https://developer.pagerduty.com/docs/db0fa8c8984fc-overview#webhook-subscriptions) to see full webhook subscription request) specifically requesting for webhooks only from the service with `P393ZNQ` as reference. The `type` field can be either of the following: `service_reference`, `team_reference`, and `account_reference`. 

### Custom Headers

```json
"delivery_method": {
  "type": "http_delivery_method",
  "url": "https://example.com/receive_a_pagerduty_webhook",
  "custom_headers": [
    {
      "name": "your-header-name",
      "value": "your-header-value"
    }
  ]
},
```

Often, webhooks endpoint security relies on the webhook signatures to validate payload integrity. In some cases, however, some endpoints have authentication requirements with specific headers. Asides, from security reasons, endpoints can have other required header values for reasons best know to the endpoint owner. PagerDuty V3 Webhooks provides the facility to add custom headers to the webhook request sent to the endpoint. 

# Let’s Implement in Convoy

You can benefit from all these features by using Convoy. Let’s implement them using a sample project.

- Create Project
    
    ![Screenshot 2022-12-14 at 8.17.17 AM.png](/blog-assets/pagerduty-project.png)
    
- Create Endpoint
    
    ```json[Sample Payload]
    {
      "advanced_signatures": true,
      "description": "string",
      "name": "webhooks consumer",
      "url": "https://webhook.site/5cedac32-3e9a-4a3b-a68d-3a70a1cdc5c7"
    }
    ```
    
    ```bash[Bash]
    $ curl \
        --request POST \
        --data @endpoint.json \
        -H "Content-Type: application/json" \
    	-H "Authorization: {insert-api-key}" \
        "http://dashboard.getconvoy.io/api/v1/projects/{projectID}/endpoints"
    ```
    
    ```json[Response]
    {
      "status": true,
      "message": "Endpoint created successfully",
      "data": {
        "uid": "b2d6e2f4-9c9d-40d0-8cce-daafcc47dd3a",
        "group_id": "79e1fe7d-44f6-44bc-ae30-bbe50d5a1f6c",
        "target_url": "https://webhook.site/5cedac32-3e9a-4a3b-a68d-3a70a1cdc5c7",
        "title": "webhooks consumer",
        "secrets": [
          {
            "uid": "447fc154-4fca-4c36-87b9-65252a6a80de",
            "value": "Y3az1N-_35VFGlX-1ZXB0TwuY",
            "created_at": "2022-12-19T12:13:45.155Z",
            "updated_at": "2022-12-19T12:13:45.155Z"
          }
        ],
        "advanced_signatures": true,
        "description": "string",
        "http_timeout": "",
        "rate_limit": 5000,
        "rate_limit_duration": "1m0s",
        "authentication": null,
        "created_at": "2022-12-19T12:13:45.155Z",
        "updated_at": "2022-12-19T12:13:45.155Z"
      }
    }
    ```
    
- Expire Secret
    
    ```json[Sample Payload]
    {
    	"expiration": 2
    }
    ```
    
    ```bash[Bash]
    $ curl \
        --request PUT \
        --data @expire.json \
        -H "Content-Type: application/json" \
    	-H "Authorization: {insert-api-key}" \
        "http://dashboard.getconvoy.io/api/v1/projects/{projectID}/endpoints/{endpointID}/expire_secret"
    ```
    
    ```json[Response]
    {
      "status": true,
      "message": "endpoint secret expired successfully",
      "data": {
        "uid": "b2d6e2f4-9c9d-40d0-8cce-daafcc47dd3a",
        "group_id": "79e1fe7d-44f6-44bc-ae30-bbe50d5a1f6c",
        "target_url": "https://webhook.site/5cedac32-3e9a-4a3b-a68d-3a70a1cdc5c7",
        "title": "webhooks consumer",
        "secrets": [
          {
            "uid": "447fc154-4fca-4c36-87b9-65252a6a80de",
            "value": "Y3az1N-_35VFGlX-1ZXB0TwuY",
            "expires_at": "2022-12-19T22:21:27.429Z",
            "created_at": "2022-12-19T12:13:45.155Z",
            "updated_at": "2022-12-19T12:13:45.155Z"
          },
          {
            "uid": "2ae2fc48-4c23-4011-9e5e-f0f7cb5ae563",
            "value": "EDVFiabw6FdvrRnnWMmWBCCxh",
            "created_at": "2022-12-19T12:21:27.431Z",
            "updated_at": "2022-12-19T12:21:27.431Z"
          }
        ],
        "advanced_signatures": true,
        "description": "string",
        "http_timeout": "",
        "rate_limit": 5000,
        "rate_limit_duration": "1m0s",
        "authentication": null,
        "created_at": "2022-12-19T12:13:45.155Z",
        "updated_at": "2022-12-19T12:13:45.155Z"
      }
    }
    ```
    
    At this stage, we demonstrate secrets rotation by expiring old secrets  for 2  hours. In this period, Convoy will sends two hash digests from the old secret and the new secret till the old secret is expired.
    
- Create Subscription
    
    ```json[Sample Payload]
    {
      "name": "webhooks consumer subscription",
      "endpoint_id": "{insert-endpoint-id}",
      "filter_config": {
        "event_types": [ 
          "service.updated", 
          "service.created", 
          "service.deleted" 
        ],
        "filter": {
          "event": {
            "data": {
              "teams": {
                "id": "PFCVPS0"
               }   
             }   
           }   
         }   
       }
     }
    ```
    
    ```bash[Bash]
    $ curl \
        --request POST \
        --data @subscription.json \
        -H "Content-Type: application/json" \
    	-H "Authorization: {insert-api-key}" \
        "http://dashboard.getconvoy.io/api/v1/projects/{projectID}/subscriptions"
    ```
    
    ```json[Response]
    {
      "status": true,
      "message": "Subscriptions created successfully",
      "data": {
        "uid": "b762a872-2791-4c0d-a9ee-8d09c75c42cd",
        "name": "webhooks consumer subscription",
        "type": "api",
        "status": "active",
        "device_id": "",
        "source_metadata": null,
        "endpoint_metadata": null,
        "filter_config": {
          "event_types": [
            "service.updated",
            "service.created",
            "service.deleted"
          ],
          "filter": {
            "event": {
              "data": {
                "teams": {
                  "id": "PFCVPS0"
                }
              }
            }
          }
        },
        "created_at": "2022-12-19T12:37:18.39Z",
        "updated_at": "2022-12-19T12:37:18.39Z"
      }
    }
    ```
    
    At this stage, we subscribe our endpoint to receive events. First, we subscribe to certain event types specifically - `service.created`, `service.updated`, & `service.deleted`. Next, we subscribe to service events where one team `id` equals `PFCVPS0`. This steps represents one of the core implementations of PagerDuty V3 Webhooks implemented easily in Convoy.
    
- Send Event.
    
    ```json[Sample Payload]
    {
    	"endpoint_id": "b2d6e2f4-9c9d-40d0-8cce-daafcc47dd3a",
    	"event_type": "incident.priority_updated",
    	"custom_headers": {
    		"X-Consumer-Key": "68fa40beeec968fa40beeec9"
    	},
    	"data": {
    	  "event": {
    	    "id": "01BRB6ZP4M6T8ZG4X6BP63ZB9O",
    	    "event_type": "service.updated",
    	    "resource_type": "service",
    	    "occurred_at": "2021-03-02T13:35:11.682Z",
    	    "agent": null,
    	    "client": null,
    	    "data": {
    	      "html_url": "https://acme.pagerduty.com/services/PF9KMXH",
    	      "id": "PF9KMXH",
    	      "self": "https://api.pagerduty.com/services/PF9KMXH",
    	      "summary": "testing service updates",
    	      "alert_creation": "create_alerts_and_incidents",
    	      "teams": [
    	        {
    	          "html_url": "https://acme.pagerduty.com/teams/PFCVPS0",
    	          "id": "PFCVPS0",
    	          "self": "https://api.pagerduty.com/teams/PFCVPS0",
    	          "summary": "Engineering",
    	          "type": "team_reference"
    	        }
    	      ],
    	      "type": "service"
    	    }
    	  }
    	}
    }
    ```
    
    ```bash[Bash]
    $ curl \
        --request POST \
        --data @event.json \
        -H "Content-Type: application/json" \
    	-H "Authorization: {insert-api-key}" \
        "http://dashboard.getconvoy.io/api/v1/projects/{projectID}/events"
    ```
    
    ```json[Response]
    {
      "status": true,
      "message": "Endpoint event created successfully",
      "data": {
        "uid": "047d6c3b-ce23-4ef0-a959-42a9803826cc",
        "event_type": "service.updated",
        "matched_endpoints": 0,
        "group_id": "79e1fe7d-44f6-44bc-ae30-bbe50d5a1f6c",
        "endpoints": [
          "b2d6e2f4-9c9d-40d0-8cce-daafcc47dd3a"
        ],
        "headers": {
          "X-Consumer-Key": [
            "68fa40beeec968fa40beeec9"
          ]
        },
        "data": {
          "event": {
            "id": "01BRB6ZP4M6T8ZG4X6BP63ZB9O",
            "event_type": "service.updated",
            "resource_type": "service",
            "occurred_at": "2021-03-02T13:35:11.682Z",
            "agent": null,
            "client": null,
            "data": {
              "html_url": "https://acme.pagerduty.com/services/PF9KMXH",
              "id": "PF9KMXH",
              "self": "https://api.pagerduty.com/services/PF9KMXH",
              "summary": "testing service updates",
              "alert_creation": "create_alerts_and_incidents",
              "teams": [
                {
                  "html_url": "https://acme.pagerduty.com/teams/PFCVPS0",
                  "id": "PFCVPS0",
                  "self": "https://api.pagerduty.com/teams/PFCVPS0",
                  "summary": "Engineering",
                  "type": "team_reference"
                }
              ],
              "type": "service"
            }
          }
        },
        "created_at": "2022-12-19T12:53:24.305Z",
        "updated_at": "2022-12-19T12:53:24.305Z"
      }
    }
    ```
    
    At this stage, we send the events. Convoy allows us send `custom_headers` on the fly for each event sent. This way, we can send specific headers to each endpoint as required. 
    
- Show Deliveries
    
    ![Screenshot 2022-12-19 at 1.57.49 PM.png](/blog-assets/pagerduty-dashboard.png)
    
    ![Screenshot 2022-12-19 at 1.58.12 PM.png](/blog-assets/pagerduty-webhooks-site.png)
    

# Conclusion

In this post, we described core features of PagerDuty V3 Webhooks and we implemented all the same features in Convoy. Do you have similar use-case why don’t you try out Convoy and give us feedback in our slack channel.
