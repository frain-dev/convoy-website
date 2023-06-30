---
title: Forward Proxies and Kubernetes Deployment
feature_image: forward-proxies.png
post_image: forward-proxies.png
primary_author:
    name: Dotun Jolaoso
    twitter: dotunj_
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
    - Engineering
featured: false
description: Configuring Convoy with Forward proxies and Deploying Convoy with our updated Kubernetes deployment helm charts  
published_at: 2023-06-27T13:00:00.000+00:00
---

# Introduction

Welcome to Day 2 of Convoy's Launch week! Over the months we have been working on a bunch of quality of life improvements and guides which would make it easy for you to deploy Convoy to your production environments faster. In this article, we will delve into how you can deploy Convoy with our updated helm charts to Kubernetes and how can you configure Convoy with a forward proxy for added security benefits.

# Forward proxies

A forward proxy or a proxy server is an intermediary server that sits between clients and servers, forwarding requests on behalf of clients and providing additional services such as caching, security and anonymity. At times, webhook consumers require API providers to send webhooks from predefined IP addresses. A forward proxy can provide you with privacy and anonymity for your servers running convoy by masking their IP addresses. This ensures you can now route webhooks traffic through a dedicated egress.

We'll be exploring how you can configure Stripe's [SmokeScreen](https://github.com/stripe/smokescreen) and [Nginx](https://www.nginx.com) to work as a forward proxy with Convoy.

## Configuring SmokeScreen

Stripe's Smokescreen is a powerful tool that can be used as a forward proxy for Convoy, it can be used to achieve Static IPs for your outbound webhook events.

To configure Smokescreen as a forward proxy for Convoy, follow the steps [here](https://github.com/stripe/smokescreen) to install smokescreen on your server.

Start smokescreen by running:

```shell
smokescreen --listen-port <your-desired-proxy-port>
```

You can configure your proxy URL with Convoy using the `HTTP_PROXY` environment variable or within your convoy.json file:

```json
"server": {
  "http": {
    "proxy": "<smokescreen-url>",
    "ssl": false,
    "ssl_cert_file": "",
    "ssl_key_file": "",
    "port": 5005
  }
},
```

### Access Control Lists (ACLs)

Smokescreen allows you to specify access control lists, these help prevent IP spoofing attacks.

```yaml
---
version: v1
services:
  - name: enforce-dummy-srv
    project: usersec
    action: enforce
    allowed_domains:
      - example1.com
      - example2.com
      - deny1.com # overrides global deny list

  - name: report-dummy-srv
    project: security
    action: report
    allowed_domains:
      - example3.com

global_allow_list:
  - goodexample1.com
  - goodexample2.com
  - goodexample3.com
  - conflictingexample.com

global_deny_list:
  - deny1.com
  - deny2.com
  - conflictingexample.com
```
The `enforce` action makes smokescreen strictly follow the defined rule, as opposed to `report` which allows the rule to be broken with a warning.
For more extensive documentation of Smokescreen's configuration see [here](https://github.com/stripe/smokescreen).

## Configuring Nginx

Nginx is a fast HTTP Proxy Server. It is usually used as a reverse proxy, but it can also serve as a forward proxy.

Nginx can be configured as a forward proxy, however the default configuration doesn't work very well with HTTPS connections. A solution for this, is to build and compile Nginx with the [ngx_http_proxy_connect_module](https://github.com/chobits/ngx_http_proxy_connect_module). The module allows the forward proxying work well with SSL connnections.

Using Docker, here's how you can build a custom Nginx image with the `ngx_http_proxy_connect_module` installed

1. Define your `Dockerfile` file:

```
FROM nginx:1.25.1-alpine

ENV NGINX_VERSION 1.25.1

# Download sources
# For latest build deps, see https://github.com/nginxinc/docker-nginx/blob/master/mainline/alpine/Dockerfile
RUN apk update && apk upgrade && \
    apk add --no-cache --virtual .build-deps \
    gcc \
    libc-dev \
    make \
    openssl-dev \
    pcre-dev \
    zlib-dev \
    linux-headers \
    curl \
    gnupg \
    libxslt-dev \
    gd-dev \
    geoip-dev \
    patch \
    bash \
    git \
    openssh

RUN wget "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz
RUN git clone "https://github.com/chobits/ngx_http_proxy_connect_module"

RUN tar -zxC / -f nginx.tar.gz && \
    cd /nginx-$NGINX_VERSION && \
    patch -p1 < /ngx_http_proxy_connect_module/patch/proxy_connect_rewrite_102101.patch && \
    ./configure \
    --prefix=/etc/nginx \
    --sbin-path=/usr/sbin/nginx \
    --modules-path=/usr/lib/nginx/modules \
    --conf-path=/etc/nginx/nginx.conf \
    --error-log-path=/var/log/nginx/error.log \
    --http-log-path=/var/log/nginx/access.log \
    --pid-path=/var/run/nginx.pid \
    --lock-path=/var/run/nginx.lock \
    --http-client-body-temp-path=/var/cache/nginx/client_temp \
    --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
    --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
    --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
    --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
    --with-perl_modules_path=/usr/lib/perl5/vendor_perl \
    --user=nginx \
    --group=nginx \
    --with-compat \
    --with-file-aio \
    --with-threads \
    --with-http_addition_module \
    --with-http_auth_request_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_gunzip_module \
    --with-http_gzip_static_module \
    --with-http_mp4_module \
    --with-http_random_index_module \
    --with-http_realip_module \
    --with-http_secure_link_module \
    --with-http_slice_module \
    --with-http_ssl_module \
    --with-http_stub_status_module \
    --with-http_sub_module \
    --with-http_v2_module \
    --with-mail \
    --with-mail_ssl_module \
    --with-stream \
    --with-stream_realip_module \
    --with-stream_ssl_module \
    --with-stream_ssl_preread_module \
    --add-dynamic-module=/ngx_http_proxy_connect_module && \
    make && make install

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

```

2. Add the `nginx.conf` file with the forward proxy configuration

```nginx
load_module /usr/lib/nginx/modules/ngx_http_proxy_connect_module.so;

worker_processes  auto;

events {}

http {
    server {
        listen                         8080;

        # dns resolver used by forward proxying
        resolver                       8.8.8.8;

        # forward proxy for CONNECT requests
        proxy_connect;
        proxy_connect_connect_timeout  10s;
        proxy_connect_data_timeout     10s;

        # defined by yourself for non-CONNECT requests
        # Example: reverse proxy for non-CONNECT requests
        location / {
            proxy_pass http://$host;
            proxy_set_header Host $host;
        }
    }
}
```

Once you've built the image and have it running in a container, you can now update your `convoy.json` with the proxy URL.

```json
"server": {
  "http": {
    "proxy": "http://localhost:8080",
    "ssl": false,
    "ssl_cert_file": "",
    "ssl_key_file": "",
    "port": 5005
  }
}
```

# Kubernetes Deployment

## Ease of Installation

We recently released v1 of our helm charts on [Artifact Hub](https://artifacthub.io/packages/helm/convoy/convoy) in which we refactored the charts based on industry standards. They are now very easy to install and configure making product evaluation and maintenance a breeze. 

## Documentation
Prior to v1, we had no documentation about how to tweak the configuration inside our chart; any developer could install it, but most times, we developers love to tune something to our specific needs, and we have rolled out our [documentation](https://github.com/frain-dev/helm-charts#convoy) which should enable more folks to run Convoy on Kubernetes.

## Security
We all know how dangerous it can be to expose secrets without encrypting them; we used config maps for handling configurations, and they revealed specific credentials in plain text. In v1, We now use Kubernetes secrets, and yes, we know Kubernetes secrets are encoded, but you can use any of your favorite tools like [Sops](https://fluxcd.io/flux/guides/mozilla-sops/) or [External secrets](https://github.com/external-secrets/external-secrets) for much better security. We got rid of *convoy.json*.

## External Databases
Before v1, we only supported database creation from the helm chart; You could not necessarily use managed DB or bring your Database. Now With the `externalDatabase` and `externalRedis` attributes. You can use your own DB and not rely on the helm chart. Check the docs for [more](https://github.com/frain-dev/helm-charts/blob/main/README.md).

## Deployments
Before Convoy can be up and running, it needs to do run db migrations if any exist. Before now, when the chart is deployed, other components go into a crash loop since the `migrate` component wasn't complete. Part of the benefit of using Kubernetes is that it has a reconciliation phase where it will retry the pods again. After several seconds and minutes, other components will start. So we had to fix that.

Introducing [InitContainers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/), initContainers allows Kubernetes to run pre-containers before the actual container, which can also be helpful when dealing with migrations. Our new config was updated to this:

```shell
initContainers:
- name: wait-for-migrate
  image: bitnami/kubectl:1.24.4
  command:
    - /bin/sh
    - -c
    - |
      until kubectl wait --for=condition=complete --timeout=600s job/migrate; do
        echo "Waiting for migrate job to complete..."
        sleep 10
      done
```

The config above will check the migration job constantly every 10 seconds to ensure it is complete before other components will run.

## Auto Scaling based on CPU and Memory Utilization
We also added Horizontal Pod Autoscaling (HPA) which allows specific components to scale based on CPU or memory utilization. All you need to do is enable them in the component and those pods will be scaled when they hit the limits.

```shell
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80
```

## What’s Next?

We plan on adding more support for other platforms you can configure to work as a forward proxy with Convoy such as [Envoy](https://github.com/envoyproxy/envoy), [OpenResty](https://openresty.org) etc. We'll also keep improving

You can stay up to date with the docs [here](https://getconvoy.io/docs/forward-proxies/smokescreen) to keep track of when the documentation is added.

