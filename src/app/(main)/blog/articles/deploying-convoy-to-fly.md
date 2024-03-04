---
title: Deploying Convoy To Fly | The Webhooks Blog
feature_image: deploying-convoy-to-fly.png
post_image: deploying-convoy-to-fly.png
primary_author:
    name: Amarachi Aso
    twitter: AsoAmarachi
primary_tag: Tutorials
tags:
    - Convoy
    - Deployment
    - Tutorials
featured: false
description: After running and testing Convoy on a local machine, the next step is to host it on actual servers. In this blog post, see how you can deploy Convoy on Fly.io.
published_at: 2023-06-06T17:00:00.000+00:00
---


How do you deploy and manage your own [Convoy](https://getconvoy.io) instance to get all the benefits it offers? The getting started [install](https://docs.getconvoy.io/deployment/install-convoy) guide is a good place to start and test out Convoy's features. But for when you mean business, you'll need to deploy Convoy on actual servers: on-prem or on public clouds, manage your own data, and scale your deployment as need be. Convoy can be deployed on almost all public cloud platforms, but in this blog post, you will see how you can deploy convoy on Fly.io.

[Fly.io](https://fly.io/) is a public cloud for running full stack applications and databases close to your users. It is designed to make it easy to deploy distributed and real-time apps, which makes it especially suitable for deploying your convoy instance and its dependencies. You can understand all Fly.io related concepts or commands that we use in this post by simply following along, but if you want to get a more in-depth background understanding of how things work on Fly, you can check the documentation [here](https://fly.io/docs/).

## Deploy Dependencies

You want to start out with deploying the dependencies first so that convoy can connect with them once it's deployed. To begin, you will need to install the Fly command line tool [flyctl](https://fly.io/docs/hands-on/install-flyctl/), create a Fly.io [account](https://fly.io/docs/hands-on/sign-up/), or [signin](https://fly.io/docs/hands-on/sign-in/) if you already own an account. Now that you're ready let's begin!

### - Deploy and Configure Postgres: 

Fly.io has an offering called "Fly Postgres", it's not the same as a managed Postgres database, it's rather another way to deploy your own self-managed Postgres DB on Fly with the benefits being that the creation process is automated, and you get some platform  integration to simplify management. We'll use this option in this guide.

To create fly Postgres, run the following command on your fly.io authenticated machine:

```
$ fly postgres create
```

what follows is an interactive session where you are asked to:

 1. Select a name for your Postgres app. An example is `convoy-pg-data`, you will be asked to choose another name if an app on convoy already uses the name you have selected.

 2. Select an organization. The default organization **personal** is selected automatically if have not created any other organization.

 3. Select a region where you want Postgres to run.

 4. Select a plan. Choose a plan according to your current needs. Of course, the development plan should be preferred if you're only testing out things.

 5. You'd be asked if you want to Scale single node pg to zero after one hour. Again, choose according to your need.

After these, the database will be deployed, copy and save your credentials as the output suggests. In a few moments, you will need to attach this Postgres deployment to your Convoy app.

![output from creating a fly postgres instance](/blog-assets/output-from-creating-a-fly-postgres-instance.png)

### - Deploy Redis: 
Similar to fly Postgres, you can automatically create a [Redis](https://fly.io/docs/reference/redis/) database on fly.io without having to manually configure and run a Redis application. But this is done only with the Fly CLI tool, so open up your terminal once again and run the command below to get started:

```
$ flyctl redis create
```

Just as with the Postgres creation terminal session, provide the desired answers to the configuration questions asked:

```
? Select Organization: fly-apps
? Choose a primary region (can't be changed later)
? Would you like to enable eviction?
? Optionally, choose one or more replica regions (can be changed later)
? Select an Upstash Redis plan
```

After your Redis database is ready, your connection URL will be printed out, copy and save this as you would need it to configure convoy later.

### - Deploy Typesense

To enhance the search experience on Convoy, we suggest making use of Typesense. You can either sign up for [Typesense Cloud](https://cloud.typesense.org/?_ga=2.205470544.1514660043.1683562022-2138331833.1683064090) or run your own Typesense instance. For the sake of this guide, we'll go for the latter; we would run the `typesense/typesense:0.24.0` image of typesense. Unlike the Postgres and Redis databases that you deployed earlier, you will need to create a configuration file named `fly.toml` in order to deploy Typesense. All fly.io apps are configured via a `fly.toml` file, except the fly Postgres and Redis by Upstash databases that are automatically provisioned via the Fly CLI. But this config file also gets automatically generated when you launch an application with the `flyctl launch` command, after which you can manually edit it to fit your configuration needs.

To get started deploying Typesense, launch an app with the following command and respond with **No** when asked if you would like to set up a Postgres database, a Redis database, or if you would like to deploy now:

```
$ fly launch --image typesense/typesense:0.24.0
```
Confirm that a fly.toml file has been created on the directory that you ran this command on.

The next step is to create a [flycast](https://fly.io/docs/reference/private-networking/#flycast-private-load-balancing) IP. This step is necessary to enable internal networking between Typesense and Convoy since Typesens does not support the default internal networking on fly.io. After deploying Typesense, all apps within the same organization can connect to it via a `.flycast` URL.

To create the IP, run the next command on the same directory where you have your Typesene `fly.toml` file.

```
$ fly ips allocate-v6 --private
```

At this point edit your Typesense config file to match the following code: 

```
# fly.toml

app = "typesense-for-convoy"
primary_region = "mad"

[build]
  image = "typesense/typesense:0.24.0"

[mounts]
source="typesense_data"
destination="/data/typesense"

[http_service]
  internal_port = 8108

[env]
  TYPESENSE_DATA_DIR = "/data/typesense"
  TYPESENSE_ENABLE_CORS = "true"
  TYPESENSE_API_KEY = "convoy"
```

If you copied the above code, remember to change your app name from `typesense-for-convoy` to what you named your Typesense app. The difference between this code and the original content of fly.toml is that you have added a `mount` section to mount a volume, an `env` section to declare env variables and have replaced the `http_service` section. 

Now that your config file is ready, deploy Typesense by running:

```
$ flyctl deploy
```

When the deployment is done, you can confirm that you have Typesense running in the organization you deployed in on your fly.io dashboard. 

![typesense app listed on fly.io dashboard](/blog-assets/typesense-app-listed-on-fly.io-dashboard.png)

## Deploy Convoy

Deploy a version of Convoy. In this guide, we deploy version `23.05.1` with the image `docker.cloudsmith.io/convoy/convoy/frain-dev/convoy:v23.05.1`. To start, change into a new directory, or delete the `fly.toml` in your current directory. As with when you deployed Typesense, launch an app for Convoy and respond with **No** when asked if you would like to set up a Postgresql database, a Redis database, or if you would like to deploy now. Do that with the following command:

```
$ fly launch --image docker.cloudsmith.io/convoy/convoy/frain-dev/convoy:v23.05.1
```

Now that you have an app launched for Convoy, attach the Postgres database that you created before to this app with:

```
$ flyctl postgres attach --app convoy convoy-pg-data
```

Change `convoy` to the name you have given your convoy app, and `convoy-pg-data` to the name of your Postgres app.

Copy and save the new connection URL printed out from attaching your database, this is the URL you would configure Convoy with.

Edit your convoy fly.toml file to properly configure Convoy for deployment. The content should match the toml code below:

```
# fly.toml

app = "convoy"
primary_region = "mad"

[build]
  image = "docker.cloudsmith.io/convoy/convoy/frain-dev/convoy:v23.05.1"

[processes]
web = "/start.sh"
scheduler = "./cmd scheduler"
worker = "./cmd worker"
stream = "./cmd stream"
ingest = "./cmd ingest"

[mounts]
source = "convoy_data"
destination = "/data/convoy"
processes = ["web", "scheduler", "worker", "stream", "ingest"]

[http_service]
  processes = ["web"]
  internal_port = 5005
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true

[env]
  CONVOY_DB_TYPE = "postgres"
  CONVOY_DB_DSN = "postgres://your-postgres-connection-url"
  CONVOY_CACHE_PROVIDER = "redis"
  CONVOY_QUEUE_PROVIDER = "redis"
  CONVOY_REDIS_DSN = "redis://your-redis-connection-url"
  CONVOY_REQUIRE_AUTH = false
  CONVOY_JWT_REALM_ENABLED = true
  CONVOY_NATIVE_REALM_ENABLED = true
  CONVOY_SEARCH_TYPE = "typesense"
  CONVOY_TYPESENSE_HOST = "http://your-typesense-app.flycast"
  TYPESENSE_API_KEY = "convoy"
  
```

If you have copied the code, notice that you need to change the following: 
 - app name from `convoy` to your own app name
 - CONVOY_DB_DSN value to your Postgres database connection URL
 - CONVOY_REDIS_DSN value to your Redis database connection URL
 - For CONVOY_TYPESENSE_HOST, replace `your-typesense-app` to the name of your Typesense app.

Go on to change any other part of the configuration to your desired value or add more config options or sections. After these, save your file and run `fly deploy` on the same directory as your config file.

If successful, your Convoy application should be live on fly.io. The terminal output should include a link to visit your app, it should redirect you to the convoy login page as seen here:

![convoy login page](/blog-assets/convoy-login-page.png)

Login with the credentials:

- Username: superuser@default.com
- Password: default

And confirm that convoy works as expected. If it does, you have successfully deployed Convoy on fly.io! Visit your fly.io dashboard to view the log outputs of the applications you have deployed.

## What's Next

After successful deployment, you are ready to start sending and receiving webhook requests. Depending on your needs, you might want to [scale your application](https://fly.io/docs/apps/scale-machine/) or [deploy to other regions](https://fly.io/docs/apps/scale-count/#scale-an-app-s-regions) closer to your customers or partners.

You might also want to explore other ways to deploy Convoy. Did you know that convoy has [helm charts](https://github.com/frain-dev/helm-charts)? You might want to try deploying with this too and give us feedback in the [community](https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ) concerning your experience.  Lastly, if you decide to rather have Convoy manage the whole infrastructure while you focus on your core business, then you're welcome to try [Convoy Cloud](https://dashboard.getconvoy.io/signup).


