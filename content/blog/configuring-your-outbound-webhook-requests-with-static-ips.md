---
title: Configuring your outbound webhook requests with static ips
feature_image: subscription-filtering.png
post_image: subscription-filtering.png
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Product Update
tags:
    - Product Update
featured: true
description: Verifying the source IP of webhook requests is an important security measure to make sure that the requests sent to your API consumers are from your servers.
published_at: 2022-12-07T17:00:00.000+00:00
---

# Introduction

When sending webhooks to other internal services or to your API consumers, it is crucial to verify the source IP of the request to prevent acknowledging webhooks from unknown and potentially malicious servers. This verification helps ensure the security of your internal services and API consumers.

Certain API consumers (fintechs, health techs etc) require a list of IP addresses that they expect your webhooks to come from so they can whitelist them and verify each webhook request against that list. This helps prevent unauthorized access to your services and protects against attacks such as man-in-the-middle attacks, where a malicious actor intercepts communication between your services and your API consumers. Verifying the source IP of webhook requests is an important step in maintaining the security of your systems and protecting against potential threats.

# Possible Setups

You might be sending your webhooks from

-   A single server
    -   It could be a VM with an assigned IP address
    -   It cloud be a cloud function, in which case the outgoing IP address would be the IP of the machine the function is running on at that time
-   Multiple servers which sit behind a reverse proxy
    -   The IP address would be either of the IPs of any of the VMs if each app instance is running in a different VM
    -   The IP address would be the IP of the VM if all the instances are running in the same VM

Depending on which approach you use, you might not be able to guarantee that the IP addresses would remain the same because the VMs might be rotated or rebooted during scheduled upgrades. In the case of cloud functions, it depends on the provider. Both [Google](https://cloud.google.com/functions/docs/networking/network-settings#route-egress-to-vpc) and [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/generate-a-static-outbound-ip-address-using-a-lambda-function-amazon-vpc-and-a-serverless-architecture.html) provide ways to configure this.

## Relevant Headers

The following are some headers to look out for when trying to figure out if your webhooks source IP is correctly configured

-   **X-Forwarded-For**: The X-Forwarded-For (XFF) header is a standard HTTP header that is used to identify the originating IP address of a client connecting to a web server through an HTTP proxy or a load balancer. This is useful when the original client IP address is not available to the server, for example, when the client is behind a NAT gateway or a load balancer. The XFF header is typically added to the request by the proxy or load balancer, and the server can use the IP address in the header to identify the original client IP address for logging or other purposes. [[1]](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)
-   **X-Original-Forwarded-For**: This header represents the original header (**X-Forwarded-For**) value received by the proxy server from one of its backends. The `X-Original-*` prefix denotes that this is the original value of the header, as the value of the **X-Forwarded-For** header is normally overwritten by the proxy server. [[2]](https://stackoverflow.com/questions/57759419/x-original-for-header-whats-its-purpose)
-   **CF-Connecting-IP**: The header provides the client IP address connecting to Cloudflare to the origin web server. This header will only be sent on the traffic from Cloudflare’s edge to your origin web server. [[3]](https://developers.cloudflare.com/fundamentals/get-started/reference/http-request-headers/)

    > The **CF-Connecting-IP** header only exists if you use Cloudflare.

-   **X-Real-IP**: Some reverse proxies include this extra header. This header identifies the client's IP address. For the proxy server, the "client" is the last remote peer. If the `x-original-forwarded-for` header is set both this header and the `x-forwarded-for` will be the same.

# Forward Proxies

A forward proxy is an intermediary that sits between your server and the internet. It evaluates the request, takes any needed actions which might include checking a host or IP allows/disallow list, and routes the request to the destination on the client’s behalf, the client in this case is your server. It then evaluates and inspects any response, takes action as needed, and forwards it to the originating client if appropriate.

Some of their uses include but are not limited to

1. **Network Address Translation**: A forward proxy can be used to hide the IP addresses and location information of your internal network from webhook recipients. This is what is used for assigning static IPs.
2. **DNS Proxy Caching**: A forward proxy can improve the performance of outbound requests by caching commonly accessed websites and storing DNS lookup results in a local cache on the proxy server. This allows the proxy to quickly access the IP address of a requested website from its DNS cache, reducing the amount of time and resources required to process requests and speeding up page loading times. [[8]](https://www.websense.com/content/support/library/web/v85/wcg_help/dns_proxy_caching.aspx) [[9]](https://www.catchpoint.com/blog/dns-cache)
3. **Enhancing Security**: It can be used to prevent security vulnerabilities which include but are not limited to
    - **SSRF**: Server Side Request Forgery (SSRF) attacks are a type of cyberattack where an attacker can send malicious requests from a vulnerable web application to an internal or external system. SSRF attacks can be used to access sensitive information, bypass authentication mechanisms, and execute arbitrary code on the your server. This type of attack is particularly dangerous because it can be used to gain access to your internal network and resources. [[4]](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery)

## Configuring Convoy with a Forward Proxy

We will be using [Smokescreen](https://github.com/stripe/smokescreen) which was built by Stripe. Smokescreen is an HTTP Connect Proxy server [[5]](https://www.youtube.com/watch?v=PAJ5kK50qp8) [[6]](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling#http_tunneling) [[7]](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT) that can restrict which URLs it’s client connects to, it also allows you centralize egress from your Convoy instance, allowing you to give your API consumers stable egress IP addresses. We created a wrapper around Smokescreen called mole which you can deploy and configure with your convoy instance.

1. Clone the repo

    ```bash
    $ git clone https://github.com/frain-dev/mole
    ```

2. Update the `acl.yaml` file

    ```yaml
    global_allow_list:
    	- your-allowed-host.com
    	- another-allowed-host.com

    global_deny_list:
    	- your-denied-host.com
    	- another-denied-host.com
    ```

3. Build the new image

    ```bash
    $ docker build -t username/mole:latest .
    ```

4. Run the image

    ```bash
    $ docker run -d -p 4750:4750 -e PROXY_PASSWORD=$PROXY_PASSWORD username/mole:latest
    ```

5. Configure the proxy in Convoy

    ```bash
    $ export HTTP_PROXY="http://:$PROXY_PASSWORD@localhost:4750"
    ```

6. Now all requests sent from your Convoy instance would be routed through the connect proxy and any user that tries to send a request to your internal services would be blocked.
7. In this current setup you would have only one IP address, but if you would like to scale your setup you would need to create multiple connect proxy servers, put them behind a load balancer and send all outgoing webhook requests to the load balancer.

![Traffic flow overview](/blog-assets/configuting-static-ips-traffic-overview.png)
Traffic flow overview

# Conclusion

In this article we have learnt what a forward proxy is and have learnt how to configure any server that sends outbound requests with it. We applied what we learnt to configuring Convoy to use static IPs and got an idea of how to scale it for production usage.

Configuring static IP addresses is a prerequisite for modern API providers and with Convoy this is easy to configure. Sounds good for your platform? Why not try out our free [cloud](https://dashboard.getconvoy.io) and give us feedback on our [slack](https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email) community!

# References

-   [1] - [MDN Web Docs - X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)
-   [2] - [Stackoverflow - X-Original-For header: what's its purpose?](https://stackoverflow.com/questions/57759419/x-original-for-header-whats-its-purpose)
-   [3] - [Cloudflare Docs - HTTP request headers](https://developers.cloudflare.com/fundamentals/get-started/reference/http-request-headers/)
-   [4] - [Server Side Request Forgery](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery)
-   [5] - [How HTTP Tunneling works, The CONNECT method, Pros & Cons](https://www.youtube.com/watch?v=PAJ5kK50qp8)
-   [6] - [MDN Web Docs - HTTP tunneling](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling#http_tunneling)
-   [7] - [MDN Web Docs - CONNECT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT)
-   [8] - [DNS Proxy Caching](https://www.websense.com/content/support/library/web/v85/wcg_help/dns_proxy_caching.aspx)
-   [9] - [Understanding DNS cache](https://www.catchpoint.com/blog/dns-cache)
