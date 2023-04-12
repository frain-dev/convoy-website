---
title: Organizations and Projects
description: 'Describe Projects in Convoy'
id: organizations-and-projects
order: 10
---

# Organisations and Projects

Convoy provides the tools to properly categorise your data. These tools are organisations and projects.

## Organisations

An organisation is the highest level namespace within a Convoy instance. It comprises several projects. Ideally, this should map to a real-world organisation or some form of high-level grouping.

As a new user, an organization can be created by clicking on the **Create Organisation** on the dashboard:

![Create organization](/docs-assets/create-org-dashboard.png)

To switch between organizations, open the current organization's settings, or create a new organization, use the account dropdown on the right of the top bar.

![Organization operations](/docs-assets/org-process.png)

### Adding new members

In the Community Edition, all users are super users, so all users can invite other team members. 

> Before doing this, ensure you have your SMTP configuration set up.

![Team page](/docs-assets/team-page.png)

To add a new team member, visit the **teams** page at the top middle of the page.

![Add new teammate](/docs-assets/new-teammate.png)


Once the invite is sent, the user will get an email with an invitation link to join the new project. An invitation token is valid for **2 weeks** after which you'd need to generate a new one.

## Projects

A [project](https://dashboard.getconvoy.io/projects) is a hierarchical namespace for all core resources within Convoy. All events, applications, endpoints, subscriptions and all other critical configurations belong to a project and a project belongs to an organisation.

There are two types of projects; Incoming and Outgoing projects. 

![Incoming and outgoing projects](/docs-assets/in-and-out-projects.png)
### Incoming project
An incoming project is designed to receive webhooks from third-party party sources like Github, Twilio, Stripe etc. and even custom sources based on any form of verification. It was designed for API consumers.

### Outgoing project

An outgoing project is designed to publish webhooks to users' endpoints. It is designed for API providers. 

### Configure a Project

![Project configurations](/docs-assets/project-config.png)

The following are parameters that can be configured on a project.
|          Config          	|       Type      	|               Supported Values              	|       Default      	|
|:------------------------:	|:---------------:	|:-------------------------------------------:	|:------------------:	|
|   **Signature Details**  	|                 	|                                             	|                    	|
|          Header          	|      String     	|                                             	| X-Convoy-Signature 	|
|           Hash           	|      String     	|                                             	|       SHA512       	|
|      **Retry Logic**     	|                 	|                                             	|                    	|
|         Mechanism        	|      String     	| Linear time retry, Exponential time backoff 	|  Linear time retry 	|
|         Duration         	| Duration String 	|                                             	|         5s         	|
|           Limit          	|     Integer     	|                                             	|          5         	|
|      **Rate Limit**      	|                 	|                                             	|                    	|
|         Duration         	| Duration String 	|                                             	|         5s         	|
|           Limit          	|     Integer     	|                                             	|          5         	|
| Disable Failing Endpoint 	|     Boolean     	|                                             	|        False       	|


**Note: Setting the Project's Disable Failing Endpoint config to `False` will automatically set all the endpoints that are not in the `Paused` state for that project to the `Active` state.**

### Retention policies

Convoy uses retention policies to preserve webhook events sent from your Convoy application or received to your Convoy application. The default period for retaining webhook events is set to **30 days**.

The retention policy can be configured during project initialisation or modified from the project settings for an existing project.

![Retention policy](/docs-assets/retention-period.png)

#### Relationship with subscription

All these configurations act as sensible defaults for all subscriptions in a project. A project can't exist without all these parameters defined in the project. Each configuration can also be described on subscriptions in a project, where a subscription doesn't define these parameters, we fall back to the project's defaults.

### Multiple Projects

There are several practical ways of using projects:
1. **A project per environment:** You can decide to test your integration with a development or staging environment, before going live to a production environment to keep data separate.
2. **A project per product:** If you have several projects, you can scope them differently on Convoy too.
