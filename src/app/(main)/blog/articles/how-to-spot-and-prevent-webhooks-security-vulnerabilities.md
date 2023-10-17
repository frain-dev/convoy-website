---
title: "Webhook Security Vulnerabilities: How to Spot and Prevent Them"
feature_image: how-to-spot-and-prevent-webhooks-security-vulnerabilities.png
post_image: how-to-spot-and-prevent-webhooks-security-vulnerabilities.png
primary_author:
    name: Amarachi Aso
    twitter: AsoAmarachi
primary_tag: Webhook Security
tags:
    - Webhook Security
    - Convoy
featured: false
description: Engineers and system designers choose webhooks as a way to implement real-time communication, but webhooks can expand the attack surface on a system if not implemented carefully, this article outlines known webhook security attack types and how to prevent them.
published_at: 2023-10-02T09:00:00.000+00:00
---

# Introduction

It is a norm in today's interconnected digital world for data to flow seamlessly between applications, services, and networks, this has made it increasingly popular to build or integrate with a webhook system to facilitate these data transactions. Engineers and system designers choose webhooks as a way to implement real-time communication between apps and services because webhooks are considered efficient. However unless careful consideration is given concerning possible security vulnerabilities and how to build preventive measures into your webhook system, this system can introduce an entry point for malicious actors into your overall application.

The purpose of this article is to outline known webhook security attack types that affect either a webhook provider, a webhook consumer, or both parties. You will read about how they work, and how to build your webhook system such that it is resistant to such attacks. Let's Begin.

## Replay Attacks

An application that receives webhooks can become a victim of a replay attack, this attack is a security threat where a malicious actor intercepts a legitimate webhook request and resends it once or multiple times. The impacts of this can include successfully tricking the receiver into acting on an illegitimate webhook request, data duplication, or even resource exhaustion. Replay attacks can be cheap to launch because even when messages are encrypted the malicious actor does not need to decrypt them for an attack to work. For example, without decrypting the message in a request, an attacker could simply resend a webhook that is meant to confirm payment for an item, and in a poorly implemented webhook system, this can lead to them checking out an item without actually paying for it.

In the following diagram, you can see an illustration of how a replay attack works.

![how replay attacks work](/blog-assets/replay-attack-illustration.png)


### Preventing replay attacks: Webhook Idempotency & Timestamped Signatures


Webhook Idempotency and timestamped Signatures are two ways to prevent replay attacks that work in tandem.
Idempotency in this case is a quality that ensures that an identical webhook request can only be processed or accepted once by the webhook consumer. To make your webhooks idempotent, the webhook requests need to include a unique identifier every time they are sent, this will allow the receiver to identify if a webhook has been received before. It's a common practice to clear webhook log after a period of time since webhooks are transient data, hence it will be impossible to compare each webhooks unique identifier against a complete list of all previous webhooks. This is where timestamped signatures come in. Including a timestamp to the webhook Signature will allow the consumer to accept and compare only the unique identifiers of webhooks that were created within the last `n` period of time, e.g. 3 minutes.

It is possible to get a thing or the other wrong when implementing idempotency or working with idempotent webhook messages. A HackerOne bug report found [here](https://hackerone.com/reports/996540) describes a security loophole on [RBKmoney](https://rbk.money/) that is vulnerable to replay attacks even though the webhook publisher—Apple Pay in this case—has put in place measures for idempotency: An Apple pay device generates cryptogram for every transaction, but a fraudulent user could still reuse a previously generated cryptogram to make several payments in the future, and this is because the consumer of this cryptogram fails to check for idempotency during payment. The example proves that both API providers and their customers play a part in preventing a replay attack.


## Server-side request forgery (SSRF)


Server-Side Request Forgery (SSRF) is a security vulnerability that occurs when an attacker can manipulate the requests made by the server side of a web application. In an SSRF attack, the attacker tricks the server into sending requests to unintended targets which could be internal-only resources, other external systems, or even restricted areas within the network. This vulnerability exists because the application in question allows user-supplied input to be used as the URL or parameter for server-side requests, therefore an attacker can exploit this vulnerability by taking advantage of the trusted relationship between the server and internal-only resources or other restricted network resources. For example, a web application that sends out webhooks may be composed of protected internal services and a public endpoint for receiving URLs of webhook consumers. In this case, the protected internal services are not accessible from the outside, but this restriction does not apply to the server hosting the web application because there exists a trusted relationship between them. An attacker can trick this server into making post requests to these internal services or other restricted network resources on their behalf by providing a URL that points or redirects to these resources, thereby opening to them a window to execute a malicious operation.


![image illustrating SSRF](/blog-assets/SSRF-illustration.png)

Consider a real-life example of SSRF vulnerability as reported on [HackerOne](https://hackerone.com/reports/1189367): It was found that an endpoint on evernote.com can be exploited and used to access internal resources and even aws metadata with full response read.

### Preventing Server-side Request Forgery: Foward Proxies

Forward proxies are intermediaries that sit between clients and servers, forwarding requests from clients to the appropriate destination. They are commonly used for load balancing, caching, and improving security by acting as a buffer between the client and server. When it comes to mitigating SSRF attacks, forward proxies play a significant role. By routing outgoing requests from a webhook server through the forward proxy, the proxy can act as a gatekeeper and enforce access controls and security policies. They can be configured to evaluate requests going out from your webhook endpoint and only forward requests that are intended for whitelisted destinations or domains while denying all others. Whether a malicious attack or even a result of human error, this measure will prevent an application server from inadvertently executing harmful operations.

Implementing a forward proxy requires proper configuration and maintenance to ensure it aligns with the specific security requirements of an application and its infrastructure. It is crucial to regularly review and update the proxy's access controls, filters, and monitoring mechanisms to stay ahead of emerging threats and vulnerabilities.

### MITM Attacks


MITM which stands for "Man-in-the-Middle," refers to a type of cyberattack where a malicious actor intercepts the communication between two parties. The goal of an MITM attack includes collecting sensitive data, altering the content of messages to suit an attacker's objective, redirecting traffic to a fake or insecure website, or simply maliciously disrupting business operations for a rival.

To launch an MITM attack, the perpetrator first gains access to the network through means such as deploying a rogue Wi-Fi hotspot, exploiting vulnerable points on a Wi-Fi router, or even  IP spoofing and other advanced techniques. Once an attacker gains entry into a communication network, they can decrypt the message being transmitted and steal information, alter the content of the message, or divert traffic to a different destination.


![image illustrating MITM attack](/blog-assets/MITM-illustration.png)


A security vulnerability found on [Shopify](https://hackerone.com/reports/423467) allowed a malicious merchant to take over the communication protocol between a point-of-sale application and the customer end eventually permitting the merchant or malicious actor to intercept and change the content of a customer’s cart, Change the amount a customer has tipped, etc.

### Preventing MITM Attacks: Webhook Signature

Even in situations where an attacker manages to gain access to a network, it is still possible to mitigate any attempts at an MITM attack through webhook signatures. A webhook signature is a cryptographic hash or digital signature generated using a secret key that is shared between the sender and receiver. Their purpose is to ensure the integrity and authenticity of webhook messages, this means that they provide a means to validate the messages exchanged between different systems ensuring that they have not been tampered with during transmission and that they originate from trusted sources.

Webhook signatures are placed in the header of webhook messages by the sender, and the receiver must use the shared secret key to verify the integrity of the message by recalculating the signature. If the recalculated signature matches the one received with the webhook message, it indicates that the message has not been tampered with and originates from the expected sender.

The specific process for generating and verifying webhook signatures depends on your chosen implementation and the cryptographic algorithms used. The signature is a [Hash-based Message Authentication Code (HMAC)](https://en.wikipedia.org/wiki/HMACg) which typically is generated and recalculated using a hash function such as SHA-256.

### DDOS Attacks

A Distributed Denial of Service (DDoS) attack happens when a bad actor attempts to disrupt the normal functioning of a network, system, or application by overwhelming it with a flood of illegitimate traffic. In a DDoS attack, the attacker typically leverages a network of compromised devices which often include computers and other devices such as IoT devices scattered across the internet, this network of compromised devices is known as a botnet while each unique device is referred to as a bot or zombie. During an attack, each bot in a massive botnet simultaneously sends requests to a victim's IP address eventually overwhelming the system and causing temporary unavailability for all users or even a complete shutdown of the system.


Webhook-consuming applications are especially susceptible to DDoS attacks on the network layer since they expose a POST expoint that even a malicious actor can get hold of. One can suspect a possible DDoS attack when the following traits or patterns are present on your network and then take action:

- A sudden spike in network requests where the reason for that amount of increase cannot be explained.
- An unnatural amount of traffic originating from a single IP address or IP range.
- Your application suddenly becomes unavailable.


It is most beneficial to have a strategy in place to mitigate a DDoS attack even before one occurs.

### Preventing DDOS Attacks

**Rate Limiting:** Rate limiting is commonly employed as a way to mitigate the effects of DDoS attacks. It is the practice of controlling the rate or frequency of incoming requests into a system or application for the purpose of preventing resource misuse or enhancing user experience. How you implement rate limiting is up to you to decide, a common approach is to set a maximum number of webhook requests that each unique IP address is allowed to send per a given period, after which subsequent requests are denied or delayed until the time is reset. Another approach is to set the limit on the ingress endpoint itself instead of on individual IP addresses, in this approach, you set a maximum number of webhook requests that the endpoint can receive in total per a given period.

**Trusted Ingest Sources:** As a webhook consumer, you can significantly reduce the chances of a DDoS attack by keeping a whitelist of IP addresses where you can expect webhook messages to come from. You can build your webhook system such that each webhook request is verified against the list so that messages that come from IP addresses outside the list are ignored.

### The Best Webhook Security Strategy

So far the most practical ways to prevent specific security vulnerabilities that are common to webhooks have been discussed. But to attain maximum security, several security vulnerability prevention techniques should be put in place at the same time, giving your webhook system several layers of protection. This means that all the techniques highlighted in this article should be implemented where it applies to you whether as a webhook provider or a consumer. As a consumer a rule that can help your team keep their feet on the ground as regards security is to treat security as though the other party—the webhook provider—does not care at all, and all the securing is on you to do. As a provider, the rule would be to treat security as though a single loophole that causes a security breach will cost you your business (it literally can).

Absolute Security is almost impossible to attain, however, webhook systems can be made as secure as possible when security best practices are followed.