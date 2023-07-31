---
title: Configuring Nginx as a forward proxy for Convoy
description: 'Convoy with Forward Proxies'
id: forward-proxies
order: 2
---

Configuring Nginx as a Forward Proxy for Convoy
==============================================================
Nginx is a fast HTTP Proxy Server. It is usually used as a reverse proxy, but it can also serve as a forward proxy.

## Configuring Nginx as a Forward Proxy
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