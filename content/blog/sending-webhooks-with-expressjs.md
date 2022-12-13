---
title: Sending Webhooks With Express.js
feature_image: expressjs-convoy.png
post_image: expressjs-convoy.png
primary_author:
    name: Dotun Jolaoso
    twitter: dotunj_
primary_tag: Tutorial
tags:
    - Convoy
    - Tutorial
    - Engineering
featured: false
description: Build a todo API with ExpressJS, and send webhook events to an endpoint for every CRUD operation.
published_at: 2022-12-13T16:00:00.000+00:00
---

 Webhooks are messages ( or payload ) sent from an application after the execution of an operation. They are also used to communicate between a chain of services; for example, a payment provider emits webhook events to an e-commerce application’s endpoint after a payment operation. Convoy can be used to send webhook events from your application to your clients by serving as a reliable egress.

To demonstrate how Convoy solves this problem, we will build a Todo API in Express and use Convoy to publish webhook events for each operation on our Todo items; create, update & delete. 

### Prerequisites

To follow along you would need the following

1. A [Convoy Cloud](https://dashboard.getconvoy.io/signup) account
2. An Outgoing Project ID & API Key.

For the sake of brevity, we created an additional resource to help with creating user endpoints, usually users will supply this information to you via your dashboard. [2] We have also left out other aspects of the code not necessary for this guide.

### API Spec

Our API looks like this:

- Endpoint
    
    ```
    GET    /endpoints
    GET    /endpoints/:id
    POST   /endpoint
    PUT    /endpoint/:id
    DELETE /endpoint/:id
    ```
    
- Todo
    
    ```
    GET    /todos
    GET    /todos/:id
    POST   /todos
    PUT    /todos/:id
    DELETE /todos/:id
    ```
    

Every time we `create`, `update` and `delete` a todo item, we would generate the following events — `todo.created`, `todo.updated`, and `todo.deleted` respectively.

### Let’s Build Our API

1. Project Setup
    
    ```bash
    mkdir convoy-todo-api && cd convoy-todo-api
    npm init -y
    npm install express uuid convoy.js
    ```
    
2. Endpoints API
    
    ```jsx
    const { v4: uuidv4 } = require("uuid");
    const { convoy, endpoints } = require("../data");
    
    const getEndpoints = async (req, res) => {
      try {
        res.json(endpoints);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    const getEndpoint = async (req, res) => {
      try {
        const endpoint = endpoints.find(
          (endpoint) => endpoint.id === req.params.id
        );
        if (!endpoint) {
          return res.status(404).send("Endpoint not found");
        }
    
        res.json(endpoint);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    const createEndpoint = async (req, res) => {
      try {
        if (!req.body?.url || !req.body?.user_id) {
          return res.status(400).send("url and user id is required");
        }
    
        const data = {
          name: "endpoint express",
          description: "default endpoint",
          url: req.body.url,
        };
    
        const response = await convoy.endpoints.create(data);
    
        const endpoint = {
          id: uuidv4(),
          convoy_id: response.data.uid,
          url: req.body.url,
          user_id: req.body.user_id,
        };
    
        endpoints.push(endpoint);
        res.status(201).json(endpoint);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    const updateEndpoint = async (req, res) => {
      try {
        if (!req.body?.url || !req.body?.user_id) {
          return res.status(400).send("url and user id is required");
        }
    
        const index = endpoints.findIndex(
          (endpoint) => endpoint.id === req.params.id
        );
    
        //Endpoint not found
        if (index === -1) {
          return res.status(404).send("Endpoint not found");
        }
    
        const endpoint = endpoints[index];
    
        await convoy.endpoints.update(endpoint.convoy_id, {
          name: `endpoint-${endpoint.id}`,
          description: "default endpoint",
          url: req.body.url,
        });
    
        const updatedEndpoint = {
          id: endpoint.id,
          convoy_id: endpoint.convoy_id,
          url: req.body.url,
          user_id: req.body.user_id,
        };
    
        endpoints[index] = updatedEndpoint;
        res.status(200).json(updatedEndpoint);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    const destroyEndpoint = async (req, res) => {
      try {
        const index = endpoints.findIndex(
          (endpoint) => endpoint.id === req.params.id
        );
    
        //Endpoint not found
        if (index === -1) {
          return res.status(404).send("Endpoint not found");
        }
    
        await convoy.endpoints.delete(endpoints[index].convoy_id);
    
        endpoints.splice(index, 1);
        res.status(200).json([]);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    module.exports = {
      getEndpoints,
      getEndpoint,
      createEndpoint,
      updateEndpoint,
      destroyEndpoint,
    };
    ```
    
3. Todos API
    
    ```jsx
    const { v4: uuidv4 } = require("uuid");
    const { convoy, endpoints, todos } = require("../data");
    
    const getTodos = async (req, res) => {
      try {
        res.json(todos);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    const getTodo = async (req, res) => {
      try {
        const todo = todos.find((todo) => todo.id === req.params.id);
        if (!todo) {
          return res.status(404).send("Todo not found");
        }
    
        res.json(todo);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    const createTodo = async (req, res) => {
      try {
        if (!req.body?.title || !req.body?.date || !req.body?.user_id) {
          return res.status(400).send("title, date and user id are required");
        }
    
        const todo = {
          id: uuidv4(),
          title: req.body.title,
          date: req.body.date,
          user_id: req.body.user_id,
        };
    
        todos.push(todo);
        await sendWebhookEvent("todo.created", todo);
    
        res.status(201).json(todo);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    const updateTodo = async (req, res) => {
      try {
        if (!req.body?.title || !req.body?.date || !req.body?.user_id) {
          return res.status(400).send("title, date and user id are required");
        }
    
        const index = todos.findIndex((todo) => todo.id === req.params.id);
    
        //Todo not found
        if (index === -1) {
          return res.status(404).send("Todo not found");
        }
    
        const updatedTodo = {
          id: todos[index].id,
          title: req.body.title,
          date: req.body.date,
          user_id: req.body.user_id,
        };
    
        todos[index] = updatedTodo;
    
        await sendWebhookEvent("todo.updated", updatedTodo);
    
        res.json(updateTodo);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    const destroyTodo = async (req, res) => {
      try {
        const index = todos.findIndex((todo) => todo.id === req.params.id);
    
        //Todo not found
        if (index === -1) {
          return res.status(404).send("Todo not found");
        }
    
        const todo = todos[index];
        todos.splice(index, 1);
    
        await sendWebhookEvent("todo.deleted", todo);
    
        res.status(200).json([]);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
    async function sendWebhookEvent(type, todo) {
      const endpoint = endpoints.find(
        (endpoint) => endpoint.user_id === todo.user_id
      );
      if (!endpoint) return;
    
      await convoy.events.create({
        endpoint_id: endpoint.convoy_id,
        event_type: type,
        data: {
          event_type: type,
          data: todo,
        },
      });
    
      return;
    }
    
    module.exports = {
      getTodo,
      getTodos,
      createTodo,
      updateTodo,
      destroyTodo,
    };
    ```
    
4. Data.js
    
    ```jsx
    const { Convoy } = require("convoy.js");
    
    const endpoints = [];
    const todos = [];
    const convoy = new Convoy({
      api_key: process.env.CONVOY_API_KEY,
      project_id: process.env.CONVOY_PROJECT_ID
    });
    
    module.exports = { endpoints, todos, convoy };
    ```
    

### Publish Webhook Events

It’s time to publish your first webhook! 

1. To begin, we start our express app 
    
    ```bash
    $ node app.js
    ```
    
2. Second, we create an endpoint with the cURL command below:
    
    ```bash
    $ curl --request POST \
    	--url "localhost:8000/endpoints" \
    	-H "Content-Type: application/json" \
    	-d '{
    		"user_id": "1",
    		"url": "https://webhook.site/f60fa8c4-6f69-4447-bf02-ac5d317aa4ca"
    	}'
    ```
    
3. Finally, we create a Todo item, that in turn generates the webhook item. Let's use the cURL command below:
    
    ```bash
    curl --request POST \
      --url "localhost:8000/todos' \
      -H 'Content-Type: application/json' \
      -d '{
    	  "title": "Complete Express Guide",
    		"date": "2022-11-28",
    		"user_id": "1"
    	}'
    ```
    
    The API returns a successful response:
    
    ```bash
    {
      "id": 4,
      "title": "Complete Express Guide",
      "date": "2022-12-02",
      "user_id": 1,
      "created_at": "2022-12-02T06:16:50.000000Z",
      "updated_at": "2022-12-02T06:16:50.000000Z"
    }
    ```
    

Let’s see our event deliveries dashboard.

![Screenshot 2022-12-09 at 00.13.05.png](/blog-assets/events-expressjs.png)

Let’s also see our webhooks endpoint

![Screenshot 2022-12-09 at 00.12.22.png](Sending%20Webhooks%20with%20ExpressJS%20f0cd381007094a8b8a5bf0adabda67cf/Screenshot_2022-12-09_at_00.12.22.png)

### Appendix

1. In production environments, Endpoints should be scoped to each user/business/customer or whatever makes sense in your case because at the point of generating webhooks 
2. Users can supply their endpoints through multiple means — your dashboard, the portal link
3. In this article, we publish webhooks in our controllers, in an ideal production environment, you should publish them from your workers.

### Conclusion

Convoy provides the ability the send webhooks to one endpoint as well as multiple endpoints. In this article, you learned how to send webhooks from an ExpressJS API. We hope you enjoyed reading this, [and you get to try it out](https://dashboard.getconvoy.io/signup) and give us some feedback on [slack](https://join.slack.com/t/convoy-community/shared_invite/zt-1kxezds9g-AfYHNMiff4I7GjrIcDLl6Q)!
