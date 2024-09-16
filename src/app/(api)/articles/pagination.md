---
title: "Pagination"
feature_image: api-authorization-models.png
post_image: api-authorization-models.png
index: 2
primary_author:
    name: Amarachi Aso
    twitter: AsoAmarachi
primary_tag: API Authorization
tags:
    - Convoy
    - APIs
    - API Authorization
featured: false
description: Read about API authorization models and the best place in your stack to implement them.
published_at: 2024-06-13T17:00:00.000+00:00
---

![api-authorization-models.png](/blog-assets/api-authorization-models.png)

API security does not stop at authentication, it goes further into proper authorization and even beyond. This is the second part of a series about modern API best practices. The first part focused solely on authentication. This one will take a closer look at modern authorization mechanisms and the kind of access control needs they're ideal for.

API authorization is how you define what authenticated users or systems can do within an API. Because permission requirements differ for various groups of users and systems, implementing access control that exposes just the right amount of API resources to the right groups without over-exposure can be tricky.

The good news is that although every API is different, most APIs’ authorization needs are not completely unique, and could benefit from adopting already existing authorization models, techniques, and best practices, or at least gain inspiration from them. The next subheading is about popular authorization models and their use cases.


### Authorization models

Before creating your access control policy, you should take some time to decide and design an authorization model that aligns with your business logic and security requirements.

One or a combination of the following models can be used when creating your access control policy or logic.

#### Role-based access control (RBAC): 

Involves creating roles with predefined sets of permissions. Users who are assigned any of roles inherits the permissions associated with the role. As an example, an online store API could have roles such as customer, vendor, admin, and super admin.

**Use case:** Suitable for APIs where each onboarded user can only play one kind of clear-cut role. For instance, given the previous example of an online store API, at no point would a user who is onboarded as a customer need to perform an administrative task such as to edit or remove a product.


#### Attribute-Based Access Control (ABAC):

In ABAC, you define attributes and then associate a set of permissions with each of the attributes, so that users or other entities who possess any of the attributes at the time of interacting with the API also have the associated permissions. Possible attributes vary greatly depending on use case requirements. In a movie streaming/download application, attributes could include location, age, and device type.


**Use case:** Ideal for APIs requiring high customization and context sensitivity. If you need to regulate access to certain resources and data based on factors such as location, age, time, resource ownership, and even role, then this method of access control will meet your needs.


#### Relationship-Based Access Control (ReBAC):

ReBAC works by defining access control policies in terms of relationships between entities. Take a social media application for instance, Users might only be able to send direct messages to their mutuals, see posts from people they follow, or the “follows” of their “follows”. In a healthcare application, a caregiver might be allowed to view the medical records of the patient they care for, and the doctor treating this patient might be able to view and edit the same record. 

**Use case:** ReBAC is particularly well-suited for applications that involve complex relationships between entities.


#### Permission-based authorization:

This method involves directly assigning specific permissions to individual entities. There are two common ways this is done. One is when a user delegates some of their privileges to a third-party program by means of an access token, the third-party program could then call and access API endpoints and resources on behalf of the user. Two is when entities are directly assigned specific permissions on the system level, and not through delegation by a user.

**Use case:** Effective for APIs where users should be able to grant fine-grained access to third-party programs such as scripts and automation tools. And for APIs where permission requirements are mostly unique per use or entity.


#### Scope-based authorization:

This is the method of access control available in OAuth 2.0. The permissions granted to an application are those available within the scopes requested during the initial token exchange. It works similarly to Permission-based authorization but for OAuth 2.0 flows.

**Use case:** Useful for APIs where third-party applications require fine-grained access to a user's resources. 


### Authorization Check Points

Authorization checks can be implemented on different layers of an API for maximum security. OWASP lists [top 10 Security Risks](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) associated with APIs, among them, three have to do especially with faulty authorization. To prevent these vulnerabilities, it's important to implement the right authorization policy at both the API gateway and within your API code. A closer look at what can be done at each of these locations.


### API Gateway

One of the security risks that can be combated at the API gateway is Broken Function Level Authorization. Function Level Authorization refers to the mechanism that is employed to ensure that no user of an API can by any means gain unintended access to resources, methods, and endpoints that are supposed to be restricted from them. 

For instance, given an endpoint `/api/v1/results/cohort_5`. The intended usage is:

- The endpoint is linked to a button in a UI available to cohort five(5) students, the button makes a `GET` request to the endpoint to return the results of the students in the cohort.

- Linked to other buttons in an admin panel that allows admins to update, view, and delete the results.

Without a proper function level authorization policy, a user could:

- Access the results of students in a different cohort by simply guessing and calling the correct endpoint, e.g `/api/v1/results/cohort_3`

- Perform administrative tasks by changing their request method from `GET` to `UPDATE` or even `DELETE`

*How to fortify Function Level Authorization*

The goal is to ensure that only authorized users can call endpoints or use certain HTTP methods. To do this, the API gateway could serve as a policy enforcement point. For every API request, check the role of the caller, and ensure that they have sufficient privilege to perform the requested operation. 

![A diagram illustrating Function Level Authorization](/blog-assets/function-level-authorization.png)


2) Another authorization level that can be implemented on the gateway is Object Property Level Authorization. This would refer to a means to check that only authorized users can view certain properties in the API response object, or include certain properties in their request object.

To illustrate an absence of Object Property Level Authorization, assume you built the next Twitter-like social media platform, and there's an endpoint `/api/profiles/handle_name` 

A `GET` request on this endpoint returns an object with properties corresponding to the handle's details, including their bookmarks, which are supposed to be private to the account owner.

Another example, this time using the `PUT` method. A vendor in an e-commerce website updates their product by making the following request:

```
PUT /api/products/product_id

{
  "name": "some product"
  "description": "very useful household item"
  "featured": true
}
```

A vendor is not intended to be able to declare their product as featured, but this vendor is able to do this by simply including the property "featured" in their request object.

*How to implement Object Property Level Authorization*

- Validate the request objects sent by clients to ensure they follow a predefined structure appropriate for the different user roles the API supports. 

![Illustrates Object Property Level Authorization on request objects](/blog-assets/object-property-level-authorization1.png)

- For the response object, the API code should also define response object schemas for each user role or level you support which would contain only the properties necessary for that role. Otherwise, implement a way for the api gateway to stripe out unnecessary properties from the response object.

![Illustrates Object Property Level Authorization](/blog-assets/object-property-level-authorization2.png)


### API Code

At the code level, Object level authorization should be implemented. It is a mechanism used to control which objects each user has access to. Without this, users might be able to perform unauthorized operations on the objects belonging to other users.

For example, a user of a social media platform might be able to edit or delete a post made by another user by simply providing the `id` of the post in a request to the appropriate endpoint. This operation is authorized if the post were to be theirs, but there is no mechanism to check if the `id` they've included in their request is indeed for a post belonging to them.


*How to implement Object Level Authorization*

For every function that uses an input from the client to access or manipulate a record in the database, your API should by design check if the authenticated user has permission to perform the requested action.

To reduce the chances of users guessing the IDs of other users, use UUIDs to generate IDs and other similar means of identifying objects.

![Illustrates Object Level Authorization](/blog-assets/object-level-authorization.png)


### Best Practices for API Authorization

While adopting the right authorization model and implementing the required authorization levels, consider also following these best practices.

Use Policy as Code: Instead of using the default method of embedding access control logic into the API code itself, policy-as-code allows you to manage and implement policy decisions through code that is written in a high-level language, and which could be updated as needed, tested, and deployed separately from the main application code. This practice is quickly gaining popularity, especially in cloud-native environments.

Principle of least privilege: Grant users and systems only the minimum level of access needed to perform their functions. 

Deny by Default: For limiting access to some endpoints, prefer using an allow list to explicitly grant access over using a block list to explicitly deny access. This way even when there are new restricted endpoints or new users, an oversight does not result in unauthorized access to endpoints.

Keep Audits and Logs: This helps with detecting anomalies, identifying potential weaknesses, and ensuring compliance with regulatory requirements.

### What Next

Until this point, you got to learn about 5 different access control models and their use cases, the different authorization levels and where in your stack to best implement them, and then some best practices to keep in mind as you design your API authorization mechanism.

The next article in this series will be about pagination in APIs. Again, hope to see you there.


### Getting Started with Convoy

Already have an API, and want to send or receive webhooks from it? Get started in minutes at [cloud.getconvoy.io/signup](http://cloud.getconvoy.io/signup).

