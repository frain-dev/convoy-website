---
title: Sending Webhooks With Rails
feature_image: sending-w-rails.png
post_image: sending-w-rails.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Tutorial
tags:
    - Tutorial
    - Engineering
featured: true
description: Build a todo API with rails and send webhook events to an endpoint for every CRUD operation.
published_at: 2022-11-29T16:00:00.000+00:00
---

Webhooks are messages ( or payload ) sent from an application after the execution of an operation. They are also used to communicate between a chain of services; for example, a payment provider emits webhook events to an e-commerce application’s endpoint after a payment operation. Convoy facilitates publishing webhook events from your application to your clients by serving as a reliable egress.

In this article, we will build a Todo API in Rails and use Convoy to publish webhook events for each operation on our Todo items; create, update & delete. 

## Prerequisites

To follow along you would need the following

1. A [Convoy Cloud](https://dashboard.getconvoy.io) account.
2. An Outgoing Project ID & API Key.

For the sake of brevity, we created an additional resource to help with creating user endpoints, usually, users will supply this information to you via your dashboard. [2] We have also left out other aspects of the code not necessary for this guide.

## API Spec

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
    
    ```console[terminal]
    rails new convoy-todo-api && cd convoy-todo-api
    ```
    
2. Endpoints API
    
    ```ruby[Endpoints API]
    class EndpointsController < ApplicationController
      before_action :set_endpoint, only: %i[show update destroy]
    
      def index
        endpoints = Endpoint.all
        render status: 200, json: endpoints
      end
    
      def show
        if @endpoint.nil?
          render status: 404, json: {}
          return
        end
    
        render status: 200, json: @endpoint
      end
    
      def create
        endpoint = Endpoint.new(endpoint_params)
    
        # Create on Convoy
        create_endpoint = Convoy::Endpoint.new(
          data: {
            name: "endpoint-#{rand(1000)}",
            description: "default endpoint",
            url: endpoint.url
          }
        )
        res = create_endpoint.save
    
    		# Save id as convoy_id
        endpoint.convoy_id = res.response['data']['uid']
        endpoint.save
    
        if endpoint.nil?
          render status: 400, json: endpoint.errors
          return
        end
    
        render status: 200, json: endpoint
      end
    
      def update
        if @endpoint.nil?
          render status: 404, json: {}
          return
        end
    
    		# Update on Convoy
        update_endpoint = Convoy::Endpoint.new(
          id: @endpoint.convoy_id,
          data: {
            name: "endpoint-#{endpoint.id}",
            description: "default endpoint",
            url: endpoint.url
          }
        )
        update_endpoint.update
    
        endpoint = @endpoint.update(endpoint_params)
        render status: 200, json: endpoint
      end
    
      def destroy
        if @endpoint.nil?
          render status: 404, json: {}
          return
        end
    
        convoy_endpoint = Convoy::Endpoint.new(@endpoint.convoy_id)
        convoy_endpoint.delete
        
        endpoint = @endpoint.destroy
        render status: 200, json: endpoint
      end
    
      private 
    
      def set_endpoint
        puts params[:id]
        @endpoint ||= Endpoint.find_by_id(params[:id])
      end
    
      def endpoint_params
        params.require(:endpoint).permit(:url, :user_id)
      end
    end
    ```
    
3. Todos API
    
    ```ruby[Todos API]
    class TodosController < ApplicationController
      before_action :set_todo, only: %i[show update destroy]
    
      def index
        todos = Todo.all
        render status: 200, json: todos
      end
    
      def show
        if @todo.nil?
          render status: 404, json: {}
          return
        end
    
        render status: 200, json: @todo
      end
    
      def create
        todo = Todo.create(todo_params)
    
        if todo.nil?
          render status: 400, json: todo.errors
          return
        end
    
        send_webhook_event("todo.created", todo)
    
        render status: 200, json: todo
      end
    
      def update
        if @todo.nil?
          render status: 404, json: {}
          return
        end
    
        todo = @todo.update(todo_params)
        todo = @todo.reload
        send_webhook_event("todo.updated", todo)
    
        render status: 200, json: todo
      end
    
      def delete
        if @todo.nil?
          render status: 404, json: {}
          return
        end
    
        todo = @todo.destroy
        send_webhook_event("todo.deleted", todo)
    
        render status: 200, json: todo
      end
    
      private
    
      def set_todo
        @todo ||= Todo.find_by_id(params[:id])
      end
    
      def todo_params
        params.permit(:title, :date, :user_id)
      end
    
      def send_webhook_event(event_type, todo)
        endpoint = todo.user.endpoint
        event = Convoy::Event.new(
          params: {
            groupID: ENV['CONVOY_PROJECT_ID'],
          },
          data: {
            endpoint_id: endpoint.convoy_id,
            event_type: event_type,
            data: {
              event_type: event_type,
              data: todo.as_json
            }
          }
        )
    
        event.save
      end
    end
    ```
    

## Publish Webhook Events

It’s time to publish your first webhook! 

1. To begin, we start our rails app 
    
    ```console[terminal]
    $ rails s
    ```
    
2. Second, we create an endpoint with the cURL command below:
    
    ```console[terminal]
    $ curl --request POST \
    	--url "localhost:3000/endpoints" \
    	-H "Content-Type: application/json" \
    	-d '{
    		"user_id": "1",
    		"url": "https://webhook.site/f60fa8c4-6f69-4447-bf02-ac5d317aa4ca"
    	}'
    ```
    
3. Finally, we create a Todo item, that in turn generates the webhook item. Let's use the cURL command below:
    
    ```console[terminal]
    curl --request POST \
      --url "localhost:3000/todos' \
      -H 'Content-Type: application/json' \
      -d '{
    	  "title": "Complete Rails Guide",
    		"date": "2022-11-28",
    		"user_id": "1"
    	}'
    ```
    
    The API returns a successful response:
    
    ```bash
    {
      "id": 9,
      "title": "Complete Rails Guide",
      "date": "2022-11-28",
      "user_id": 1,
      "created_at": "2022-11-28T08:04:18.235Z",
      "updated_at": "2022-11-28T08:04:18.235Z"
    }
    ```
    

Let’s see our event deliveries dashboard.

![Deliveries dashboard](/blog-assets/events-rails.png)

Let’s also see our webhooks endpoint

![Webhooks.site endpoint page](/blog-assets/endpoint-rails.png)

### Appendix

1. In production environments, Endpoints should be scoped to each user/business/customer or whatever makes sense in your case because at the point of generating webhooks 
2. Users can supply their endpoints through multiple means — your dashboard, the portal link
3. In this article, we publish webhooks in our controllers, in an ideal production environment, you should publish them from your workers.

### Conclusion

Convoy provides the ability the send webhooks to one endpoint as well as multiple endpoints. In this article, you learned how to create send webhooks from a Rails API. We hope you enjoyed reading this, and that you get to try it out and give us some feedback on the [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) community!
