---
title: Sending Webhooks With Laravel
feature_image: sending-w-laravel.png
post_image: sending-w-laravel.png
primary_author:
    name: Dotun Jolaoso
    twitter: dotunj_
primary_tag: Tutorial
tags:
    - Convoy
    - Tutorial
    - Engineering
featured: false
description: Build a todo API with laravel, and send webhook events to an endpoint for every CRUD operation. To demonstrate how Convoy solves this problem, we will build a Todo API in Laravel and use Convoy to publish webhook events for each operation on our Todo items; create, update & delete.
published_at: 2022-12-02T16:00:00.000+00:00
---

Webhooks are messages ( or payload ) sent from an application after the execution of an operation. They are also used to communicate between a chain of services; for example, a payment provider emits webhook events to an e-commerce application’s endpoint after a payment operation. Convoy can be used to send webhook events from your application to your clients by serving as a reliable egress.

To demonstrate how Convoy solves this problem, we will build a Todo API in Laravel and use Convoy to publish webhook events for each operation on our Todo items; create, update & delete.

### Prerequisites

To follow along you would need the following

1. A [Convoy Cloud](https://dashboard.getconvoy.io/signup) account.
2. An Outgoing Project ID & API Key.

For the sake of brevity, we created an additional resource to help with creating user endpoints, usually users will supply this information to you via your dashboard. [2] We have also left out other aspects of the code not necessary for this guide.

### API Spec

Our API looks like this:

-   Endpoint
    ```
    GET    /endpoints
    GET    /endpoints/:id
    POST   /endpoint
    PUT    /endpoint/:id
    DELETE /endpoint/:id
    ```
-   Todo
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
    laravel new convoy-todo-api && cd convoy-todo-api
    ```

2. Endpoints API

    ```php
    <?php

    namespace App\Http\Controllers;

    use App\Models\Endpoint;
    use Convoy\Convoy;
    use Illuminate\Http\Request;

    class EndpointController extends Controller
    {

        protected $convoy;

        public function __construct()
        {
            $this->convoy = new Convoy(['api_key' => env('CONVOY_API_KEY'), 'project_id' => env('CONVOY_PROJECT_ID')]);
        }
        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            $endpoints = Endpoint::all();

            return response()->json($endpoints);
        }

        /**
         * Store a newly created resource in storage.
         *
         * @param  \Illuminate\Http\Request  $request
         * @return \Illuminate\Http\Response
         */
        public function store(Request $request)
        {
            $request->validate([
                'url' => 'required',
                'user_id' => 'required'
            ]);

            $endpointData = [
                'name' => 'endpoint laravel',
                'description' => 'default endpoint',
                'url' => $request->url

            ];

            $response = $this->convoy->endpoints()->create($endpointData, []);

            $endpoint = Endpoint::create([
                'convoy_id' => $response['data']['uid'],
                'user_id' => $request->user_id,
                'url' => $request->url,
            ]);

            return response()->json($endpoint, 201);
        }

        /**
         * Display the specified resource.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function show(Endpoint $endpoint)
        {
            return response()->json($endpoint);
        }

        /**
         * Update the specified resource in storage.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request, Endpoint $endpoint)
        {
            $request->validate(['url' => 'required']);

            //update on convoy
            $this->convoy->endpoints()->update($endpoint->convoy_id, [
                'name' => "endpoint-{$endpoint->id}",
                'description' => 'default endpoint',
                'url' => $request->url
            ]);

            $endpoint->update([
                'user_id' => $request->user_id,
                'url' => $request->url,
            ]);

            return response()->json($endpoint);
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy(Endpoint $endpoint)
        {
            $this->convoy->endpoints()->delete($endpoint->convoy_id);

            $endpoint->delete();

            return response()->json();
        }
    }
    ```

3. Todos API

    ```ruby
    <?php

    namespace App\Http\Controllers;

    use App\Models\Todo;
    use Convoy\Convoy;
    use Illuminate\Http\Request;

    class TodoController extends Controller
    {
        protected $convoy;

        public function __construct()
        {
            $this->convoy = new Convoy(['api_key' => env('CONVOY_API_KEY'), 'project_id' => env('CONVOY_PROJECT_ID')]);
        }
        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            $todos = Todo::all();

            return response()->json($todos);
        }

        /**
         * Store a newly created resource in storage.
         *
         * @param  \Illuminate\Http\Request  $request
         * @return \Illuminate\Http\Response
         */
        public function store(Request $request)
        {
            $validated = $request->validate([
                'title' => 'required',
                'date' => 'required',
                'user_id' => 'required'
            ]);

            $todo = Todo::create($validated);

            $this->sendWebhookEvent('todo.created', $todo);

            return response()->json($todo);
        }

        /**
         * Display the specified resource.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function show(Todo $todo)
        {
            return response()->json($todo);
        }

        /**
         * Update the specified resource in storage.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request, Todo $todo)
        {
            $validated = $request->validate([
                'title' => 'required',
                'date' => 'required',
                'user_id' => 'required'
            ]);

            $todo->update($validated);

            $todo->fresh();

            $this->sendWebhookEvent('todo.updated', $todo);

            return response()->json($todo);
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy(Todo $todo)
        {
            $todo->delete();

            $this->sendWebhookEvent('todo.deleted', $todo);

            return response()->json();
        }

        private function sendWebhookEvent(string $eventType, Todo $todo)
        {
            $this->convoy->events()->create([
                'endpoint_id' => $todo->user->endpoint->convoy_id,
                'event_type' => $eventType,
                'data' => [
                    'event_type' => $eventType,
                    'data' => [
                        'id' => $todo->id,
                        'user_id' => $todo->user_id,
                        'title' => $todo->title,
                        'date' => $todo->date,
                        'created_at' => $todo->created_at,
                        'updated_at' => $todo->updated_at,
                    ],
                ]
            ]);

            return;

        }
    }
    ```

### Publish Webhook Events

It’s time to publish your first webhook!

1. To begin, we start our laravel app

    ```bash
    $ php artisan serve
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
    	  "title": "Complete Laravel Guide",
    		"date": "2022-11-28",
    		"user_id": "1"
    	}'
    ```

    The API returns a successful response:

    ```bash
    {
      "id": 4,
      "title": "Complete Laravel Guide",
      "date": "2022-12-02",
      "user_id": 1,
      "created_at": "2022-12-02T06:16:50.000000Z",
      "updated_at": "2022-12-02T06:16:50.000000Z"
    }
    ```

Let’s see our event deliveries dashboard.

![Screenshot 2022-12-02 at 12.32.01.png](/blog-assets/events-laravel.png)

Let’s also see our webhooks endpoint

![Screenshot 2022-12-02 at 07.21.11.png](/blog-assets/endpoint-laravel.png)

### Appendix

1. In production environments, Endpoints should be scoped to each user/business/customer or whatever makes sense in your case because at the point of generating webhooks
2. Users can supply their endpoints through multiple means — your dashboard, the portal link
3. In this article, we publish webhooks in our controllers, in an ideal production environment, you should publish them from your workers.

### Conclusion

Convoy provides the ability the send webhooks to one endpoint as well as multiple endpoints. In this article, you learned how to send webhooks from a Laravel API. We hope you enjoyed reading this, [and you get to try it out](https://dashboard.getconvoy.io/signup) and give us some feedback on [slack](https://join.slack.com/t/convoy-community/shared_invite/zt-1kxezds9g-AfYHNMiff4I7GjrIcDLl6Q)!
