---
title: Sending Webhooks With Flask
feature_image: flask-convoy.png
post_image: flask-convoy.png
primary_author:
    name: Abdulazeez Abdulazeez
    twitter: kvng_zeez
primary_tag: Tutorial
tags:
    - Convoy
    - Engineering
    - Tutorial
featured: false
description: Build a todo API with Flask and send webhook events to an endpoint for every CRUD operation.
published_at: 2022-11-29T16:30:00.000+00:00
---
Webhooks are messages ( or payload ) sent from an application after the execution of an operation. They are also used to communicate between a chain of services; for example, a payment provider emits webhook events to an e-commerce application’s endpoint after a payment operation. Convoy facilitates publishing webhook events from your application to your clients by serving as a reliable egress.

In this article, we will build a Todo API in Flask and use Convoy to publish webhook events for each operation on our Todo items; create, update & delete. 

## Prerequisites

To follow along you would need the following

1. A [Convoy Cloud](https://dashboard.getconvoy.io) account.
2. An Outgoing Project ID & API Key.

For the sake of brevity, we created an additional resource to help with creating user endpoints, usually, users will supply this information to you via your dashboard. [2] We have also left out other aspects of the code not necessary for this guide.

## API Spec

Our API looks like this:

- Endpoint
    
    ```
    GET    /endpoint
    GET    /endpoint/:id
    POST   /endpoint
    PUT    /endpoint/:id
    DELETE /endpoint/:id
    ```
    
- Todo
    
    ```
    GET    /todo
    GET    /todo/:id
    POST   /todo
    PUT    /todo/:id
    DELETE /todo/:id
    ```
    

Every time we `create`, `update` and `delete` a todo item, we would generate the following events — `created`, `updated`, and `deleted` respectively.

### Let’s Build Our API

1. Project Setup
    
    ```console[terminal]
    $ mkdir flask-todo-convoy && cd flask-todo-convoy
    $ python3 -m venv venv
    $ touch .env {config,api,events}.py
    ```

    Activate virtual environment
    ```console[terminal]
    $ source venv/bin/activate
    $ pip install Flask uvicorn python-dotenv
    $ pip freeze > requirements.txt
    ```

    Install Convoy:
    ```console[terminal]
    $ pip install git+ssh://git@github.com/frain-dev/convoy-python
    ```

    Configure your environment variables in a `.env` file:

    ```dotenv[.env]
    CONVOY_API_KEY=<your-api-key>
    CONVOY_PROJECT_ID=<your-project-id>
    ```
2. Define events & configuration

    ```python[events.py]
    events = {
        "ping": {
            "event": "ping",
            "description": "Webhook test from application."
        },
        "created": {
            "event": "created",
            "description": "Todo created successfully"
        },
        "retrieved": {
            "event": "retrieved",
            "description": "Todo retrieved successfully"
        },
        "updated": {
            "event": "updated",
            "description": "Todo updated successfully"
        },
        "deleted": {
            "event": "deleted",
            "description": "Todo deleted successfully"
        },
        "failed": {
            "event": "failure",
            "description": "Todo not found."
        }
    }
    ```

    Configuration:
    ```python[config.py]
    from os import environ
    from dotenv import load_dotenv

    load_dotenv()

    CONVOY_API_KEY = environ.get("CONVOY_API_KEY")
    CONVOY_PROJECT_ID = environ.get("CONVOY_PROJECT_ID")
    ```


3. Endpoints API

    Start by adding the imports and a Convoy instance:

    ```python[api.py]
    from convoy import Convoy
    from flask import Flask, request
    from events import events

    app = Flask(__name__)
    app.config.from_pyfile("config.py")

    todos = []

    convoy = Convoy({"api_key": app.config.get("CONVOY_API_KEY"), "project_id": app.config.get("CONVOY_PROJECT_ID")})
    ```
    
    Add the code for the endpoints API:

    ```python[api.py | Endpoints API]
    @app.route("/endpoint", methods=["POST"])
    def create_endpoint():
            endpoint_body = request.json
            (endpoint, result) = convoy.endpoint.create({}, endpoint_body)    
            return {"Endpoint ID": endpoint["data"]["uid"]}

    @app.route("/endpoint", methods=["GET"])
    def get_endpoint():
        (endpoint, result) = convoy.endpoint.all({})
        return endpoint

    @app.route("/endpoint/<str:endpoint_id>", methods=["GET"])
    def get_endpoint_by_id(endpoint_id: str):
        (endpoint, result) = convoy.endpoint.find(endpoint_id, {})
        return endpoint

    @app.route("/endpoint/<str:endpoint_id>", methods=["UPDATE"])
    def update_endpoint(endpoint_id: str, endpoint_body: dict):
        (endpoint, result) = convoy.endpoint.update(endpoint_id, {}, endpoint_body)
        return endpoint

    @app.route("/endpoint/<str:endpoint_id>", methods=["DELETE"])
    def delete_endpoint(endpoint_id: str):
        (endpoint, result) = convoy.endpoint.delete(endpoint_id, {}, "")
        return endpoint

    ```

    Add the function that publishes webhooks:

    ```python[api.py]
    def send_webhook_event(event_type: str, endpoint: str):
        event = {
            "endpoint_id": endpoint,
            "event_type": event_type,
            "data": events[event_type]
        }
        
        (res, err) = convoy.event.create({}, event)
        return res
    ```
    
4. Todos API
    
    ```python[api.py | Todos API]
   @app.route("/todo", methods=["GET"])
    def get_todos() -> dict:
        endpoint_id = request.args.get("endpoint")
        send_webhook_event("retrieved", endpoint_id)
        return { "data": todos }

    @app.route("/todo/<int:todo_id>", methods=["GET"])
    def get_todo() -> dict:
        endpoint_id = request.args.get("endpoint")
        for todo in todos:
            if todo["id"] == todo_id:
                send_webhook_event("retrieved", endpoint_id)
                return todo
        send_webhook_event("failed", endpoint_id)
        return { "error": "Todo not found" }

    @app.route("/todo", methods=["POST"])
    def add_todo() -> dict:
        endpoint_id = request.args.get("endpoint")
        todo = {
            "id": request.json["id"],
            "item": request.json["item"]
        }
        todos.append(todo)
        send_webhook_event("created", endpoint_id)
        return {
            "data": "Todo added"
        }


    @app.route("/todo/<int:id>", methods=["PUT"])
    def update_todo(id) -> dict:
        endpoint_id = request.args.get("endpoint")
        for todo in todos:
            if int(todo["id"]) == id:
                todo["item"] = request.json.get("item", todo["item"])
                send_webhook_event("updated", endpoint_id)
                return {
                    "data": f"Todo with id {id} has been updated."
                }
        send_webhook_event("failed", endpoint_id)
        return {
            "data": f"Todo with id {id} not found."
        }


    @app.route("/todo/<int:id>", methods=["DELETE"])
    def delete_todo(id: int) -> dict:
        endpoint_id = request.args.get("endpoint")
        for todo in todos:
            if int(todo["id"]) == id:
                todos.remove(todo)
                send_webhook_event("deleted", endpoint_id)
                return {
                    "data": f"Todo with id {id} has been removed."
                }

        send_webhook_event("failed", endpoint_id)
        return {
            "data": f"Todo with id {id} not found."
        }

    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=8080)
    ```
    

## Publish Webhook Events

It’s time to publish your first webhook! 

1. To begin, we start our Flask app 
    
    ```console[terminal]
    $ flask api.py
    ```
    
2. Second, we create an endpoint with the cURL command below:
    
    ```console[terminal]
    curl -X 'POST' \
    'http://0.0.0.0:8080/endpoint' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d ' {
            "name": "Todo endpoint",
            "description": "Endpoint for todo API.",
            "http_timeout": "10s",
            "url": "https://webhook.site/40984a4e-7b36-41fb-a234-9c2006bac8b5"
    }'
    ```

    The API returns a successful response:

    ```console[terminal]
    {"Endpoint ID":"da6c42b5-2a51-478c-ad5e-53097c0f61cb"}
    ```
    
3. Finally, we create a Todo item, that in turn generates the webhook item. Let's use the cURL command below:
    
    ```console[terminal]
     curl -X 'POST' \
    'http://0.0.0.0:8080/todo?endpoint=da6c42b5-2a51-478c-ad5e-53097c0f61cb' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "id": 1,
    "item": "Setup a convoy webhook project and publish my first webhook"
    }'
    ```
    
    The API returns a successful response:
    
    ```console[terminal]
    {"data":["Todo added."]}
    ```
    

Let’s see our event deliveries dashboard.

![Deliveries dashboard](/blog-assets/events-flask.png)

Let’s also see our webhooks endpoint

![Webhooks.site endpoint page](/blog-assets/endpoint-flask.png)

### Appendix

1. In production environments, Endpoints should be scoped to each user/business/customer or whatever makes sense in your case because at the point of generating webhooks 
2. Users can supply their endpoints through multiple means — your dashboard, the portal link
3. In this article, we publish webhooks in our controllers, in an ideal production environment, you should publish them from your workers.

### Conclusion

Convoy provides the ability the send webhooks to one endpoint as well as multiple endpoints. In this article, you learned how to create send webhooks from a Flask API. We hope you enjoyed reading this, and that you get to try it out and give us some feedback on the [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) community!
