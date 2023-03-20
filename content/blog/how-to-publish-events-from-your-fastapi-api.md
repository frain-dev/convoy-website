---
title: Publish Webhooks From Your FastAPI API With Convoy
feature_image: fastapi-convoy.png
post_image: fastapi-convoy.png
primary_author:
    name: Abdulazeez Abdulazeez
    twitter: kvng_zeez
primary_tag: Tutorial
tags:
    - Convoy
    - Engineering
    - Tutorial
featured: true
description: Convoy facilitates publishing webhook events from your application to your clients by serving as a reliable egress. Learn how you can publish your webhook events to multiple users and endpoint from your FastAPI API using the Convoy Python SDK
published_at: 2022-11-16T16:30:00.000+00:00
---

Webhooks are messages ( or payload ) sent from an application on the execution of an operation. They are also used to communicate between a chain of services; for example, a payment provider emits webhook events to an e-commerce application’s endpoint after an operation.

Convoy facilitates publishing webhook events from your application to your clients by serving as a reliable egress.

> 💡 Unlike traditional webhook servers, Convoy allows you to retry and replay your webhook events.

In this article, you will learn how to use Convoy’s Python SDK to publish webhooks events to multiple endpoints in your FastAPI application. You’ll start by setting up your Convoy instance on [Convoy cloud](https://dashboard.getconvoy.io) ( or [Convoy OSS](https://getconvoy.io/docs/deploy/overview#configure) ), create a todo API, and lastly, integrate the Convoy SDK to publish webhook events to endpoints.

## Setup Convoy

1. To set up your Convoy instance, sign in to your dashboard and create a new project:

![Convoy dashboard](/blog-assets/convoy-dashboard.png)

1. Create a new outgoing project from your dashboard. An outgoing project is a project for sending out webhook events.

![Create an outgoing project](/blog-assets/create-fastapi-project.png)

1. A project API key will be generated for the newly created outgoing project. Store the key in a safe place as you’ll use it in the API to authenticate your Convoy instance to publish webhooks:

![Project API Key](/blog-assets/api-key.png)

1. Configure your outgoing project. For this article, you’ll be configuring your outgoing project manually. Select the **\*\***Setup Without SDK**\*\*** option to manually configure your outgoing project:

![Configure project](/blog-assets/configure-project.png)

> 💡All actions performed manually in this article can be performed via our [SDKs](https://getconvoy.io/docs/sdk).

1. **Create an application**: application refers to your backend app with valid endpoints where webhooks are delivered to. An application can contain as many endpoints as necessary:

![Create an application](/blog-assets/create-application.png)

> ℹ️ Applications are created per user to distinguish their webhook events.

1. **Create an endpoint**: an endpoint is a specific destination that can receive webhook events. The endpoint URL used in this article is generated from [webhooks.site](https://webhooks.site):

![Create an endpoint](/blog-assets/create-endpoint.png)

1. **Create a subscription for the application**: Subscriptions on Convoy connect events to their respective application endpoint.

![Create application subscription](/blog-assets/create-subscription.png)

You’re all set to publish events and monitor them from your dashboard:

![Events dashboard](/blog-assets/events-dashboard.png)

With your Convoy instance up and running, you’ll build the API to publish your webhook events in the next section.

## Project setup

The first step to publishing webhooks from your FastAPI-powered API is to build the API. Start by creating a new folder and creating a virtual environment:

```console[terminal]
$ mkdir fastapi-todo-convoy && cd fastapi-todo-convoy
$ python3 -m venv venv
```

> ℹ️ You may use a different virtual environment manager like [Pipenv](https://pipenv.pypa.io/) or [poetry](https://python-poetry.org/).

### API structure

The API folder structure is outlined:

```console[terminal]
fastapi-todo-convoy
 +- .env # store Convoy API key and application ID.
 +- api/
   +- __init__.py # module file
   |
   +- config.py # interact with the environment file
   |
   +- api.py # todo API source file
   |
   +- events.py # store for various event types for your webhook payload
 +- main.py # entrypoint to run the application
 +- requirements.txt # application requirements file
```

In the project folder, add the following files:

```console[terminal]
$ touch .env api/{config,api,events}.py main.py
```

### Install dependencies

As a next step, activate the virtual environment and install the following dependencies:

```console[terminal]
$ source venv/bin/activate
$ pip install fastapi uvicorn pydantic[dotenv]
$ pip freeze > requirements.txt
```

Lastly, install the `convoy-python` package:

```console[terminal]
$ pip install git+ssh://git@github.com/frain-dev/convoy-python
```

### Set environment variables

In the `.env` file, add the variables:

```env
CONVOY_API_KEY=<your-api-key>
CONVOY_APP_ID=<your-app-id>
```

Replace `<your-api-key>` in the environment file above with the API key generated earlier on and retrieve your Convoy application ID from the dashboard:

![Retrieve application ID](/blog-assets/application-id.png)

To allow your API to retrieve the values stored in the environment file, define a `BaseSettings` child class in `config.py`:

```python[config.py]
from pydantic import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # convoy credentials
    CONVOY_API_KEY: Optional[str] = None
    CONVOY_APP_ID: Optional[str] = None

    class Config:
        env_file = ".env"

settings = Settings()
```

The `Settings` class defined above reads the variables defined in the environment file. The API can directly access the variables from the instance variable of the `Settings` class `settings`.

## Define event types

The next step is to define the various event payload to be included in the webhook to be published from the APIs. In `[events.py](http://events.py)`, add the code:

```python[events.py]
events = {
    "ping": {
        "event": "ping",
        "description": "Webhook test from application."
    },
    "created": {
        "event": "todo.created",
        "description": "Todo created successfully"
    },
    "retrieved": {
        "event": "todo.retrieved",
        "description": "Todo retrieved successfully"
    },
    "updated": {
        "event": "todo.updated",
        "description": "Todo updated successfully"
    },
    "deleted": {
        "event": "todo.deleted",
        "description": "Todo deleted successfully"
    },
    "failed": {
        "event": "todo.failure",
        "description": "Todo not found."
    }
}
```

In the code block above, you have six event types all prefixed with `todo.` accompanied by a description of the event.

## Build the API

The API performs a Create, Read, Update and Delete ( CRUD ) operation on todos stored in an in-app database, an array variable `todos`.

In `api.py`, import the dependencies and create an instance of `FastAPI`:

```python[api.py]
from convoy import Convoy
from fastapi import FastAPI

from .events import events
from .config import settings

app = FastAPI()
```

Next, create the `todos` variable and an instance of Convoy:

```python[api.py]
todos = []

convoy = Convoy({"api_key": settings.CONVOY_API_KEY})
app_id = settings.CONVOY_APP_ID
```

In the code block above, you connect to your Convoy instance using the API key stored in the environment file using the convoy-python SDK installed. The `app_id` variable is also set to the value stored in the environment file.

Next, you’ll define a function `send_webhook_event` that takes an argument `event_type` and uses the `convoy.event.create()` method to publish events to your application and by extension, your application endpoints.

```python[api.py]
def send_webhook_event(event_type: str):
    event = {
        "app_id": app_id,
        "event_type": event_type,
        "data": events[event_type]
    }

    (res, err) = convoy.event.create({}, event)
    return res
```

The `convoy.event.create()` method takes an optional `query` and an `event` payload body. The event payload body is an object containing the application ID, the event type and payload. In your API, the event type and event payload have been defined in `events.py`.

With the webhook publisher function in place, add the code below to complete your API:

```python[api.py]
@app.get("/")
async def ping():
    send_webhook_event("ping")
    return {"message": "Wilkomen!"}

@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    send_webhook_event("retrieved")
    return { "data": todos }

@app.post("/todo", tags=["todos"])
async def add_todo(todo: dict) -> dict:
    todos.append(todo)
    send_webhook_event("created")
    return {
        "data": { "Todo added." }
    }

@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: int, body: dict) -> dict:
    for todo in todos:
        if int(todo["id"]) == id:
            todo["item"] = body["item"]
            send_webhook_event("updated")
            return {
                "data": f"Todo with id {id} has been updated."
            }
    send_webhook_event("failed")
    return {
        "data": f"Todo with id {id} not found."
    }

@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: int) -> dict:
    for todo in todos:
        if int(todo["id"]) == id:
            todos.remove(todo)
            send_webhook_event("deleted")
            return {
                "data": f"Todo with id {id} has been removed."
            }

    send_webhook_event("failed")
    return {
        "data": f"Todo with id {id} not found."
    }
```

You have defined the routes to perform various CRUD operations in the code block above. Each successful operation emits a webhook to your Convoy application, and a failed operation emits a failed webhook event.

Lastly, in the API’s entry point file `main.py`, add the following:

```python[main.py]
import uvicorn

if __name__ == "__main__":
    uvicorn.run('api.api:app', host="0.0.0.0", port=8080, reload=True)
```

The code above starts the API on port 8080 on the localhost. Start your application with the command:

```console[terminal]
$ python main.py
```

## Publishing webhooks

It’s time to publish your first webhook! To publish your first webhook event, send a cURL request to the API:

```console[terminal]
$ curl http://0.0.0.0:8080/
```

The cURL request returns a response:

```console[terminal]
`{"message":"Wilkomen!"}`
```

In your Convoy dashboard, the event is delivered and logged:

![Ping event](/blog-assets/ping-webhook-event.png)

In the **Event Deliveries** tab, you can verify the status of the delivery as well as view the number of attempts:

![event-deliveries-i](/blog-assets/event-deliveries-i.png)

If you click on the event, a detailed delivery page is displayed:

![Event detail](/blog-assets/ping-event-details.png)

Let’s create a todo using a cURL request and verify if your API will publish a webhook event:

```console[terminal]
$ curl -X 'POST' \
  'http://0.0.0.0:8080/todo' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "item": "Create a Convoy outgoing project today"
}'
```

The API returns a successful response:

```console[terminal]
{
  "data": [
    "Todo added."
  ]
}
```

Was the webhook for a **create** action emitted? Verify from your dashboard:

![Events dashboard](/blog-assets/events-dashboard-ii.png)

You can verify that the API webhook successfully emitted the event type `created` from the dashboard. A detailed view of the event delivery can is seen from the event delivery tab:

![Todo created webhook event](/blog-assets/todo-created-webhook.png)

A visit to the endpoint URL strengthens the webhook delivery status from the Convoy dashboard:

![Webhook delivery endpoint](/blog-assets/webhook-endpoint.png)

Go on, execute more operations on the todo API and publish webhooks today on Convoy!

## Conclusion

Convoy provides the ability to publish webhooks to various endpoints in one request. In this article, you learned how to create and configure a Convoy outgoing project and publish webhooks from an API you built to your configured endpoint.

Convoy provides you with reliability and replayability out of the box. If this sounds suitable for your architecture,[try it out](https://dashboard.getconvoy.io/)and give us feedback on our[slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email)community!
