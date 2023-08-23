---
title: Convoy Helm Chart v1.0
feature_image: convoy-helm-charts.png
post_image: convoy-helm-charts.png
primary_author:
    name: Obinna Odirionye
    twitter: odirionyeo
primary_tag: Product Update
tags:
    - Convoy
    - Product Update
featured: false
description: Convoy Helm Chart v1.0.0 is our latest release including so many exciting features - Documentation, DX Improvements, and so much more. In this blog post, we share these updates and what you can expect from Convoy Helm Chart v1.1.0
published_at: 2023-05-12T18:30:00.000+00:00
---

Hey there, 

If you are reading this article, it means you want to see some of the exciting new things we added and have deprecated. Before diving in, Let's talk about Convoy and the components inside the Helm Chart.

Convoy is an Open Source Webhooks Gateway. For both incoming & outgoing events. In the Convoy Helm Chart, we have five components, namely:

- Stream: This is the server that broadcasts created events to the Convoy's cli  client using webhooks

- Scheduler: This is another fascinating component that runs the analytics and data retention (backup) jobs.

- Migrate: This is a convoy job component that is responsible for DB migration.

- Server: The components host Convoy's REST API that powers the dashboard and all HTTP SDK functions.

- Worker: This component runs all the asynchronous tasks from the queuing system.

Tip: Convoy uses Redis for Queueing, Rate limiting, and Caching, while PostgreSQL is the Database. You can learn more [here](https://getconvoy.io/docs/deploy/architecture/#components)

## New features

### Documentation
Prior to v1, we had no documentation about how to tweak the configuration inside our chart; any developer could install it, but most times, we developers love to tune something to our specific needs, and we have rollout our [documentation](https://github.com/frain-dev/helm-charts#convoy) which should enable more folks to run Convoy on Kubernetes.

### Security
We all know how dangerous it can be to expose secrets without encrypting them; we used config maps for handling configurations, and they revealed specific credentials in plain text. In v1, We now use Kubernetes secrets, and yes, we know Kubernetes secrets are encoded, but you can use any of your favorite tools like [Sops](https://fluxcd.io/flux/guides/mozilla-sops/) or [External secrets](https://github.com/external-secrets/external-secrets) for much better security. We got rid of *convoy.json*.

### External Databases
Before v1, we only supported database creation from the helm chart; You could not necessarily use managed DB or bring your Database. Now With the `externalDatabase` and `externalRedis` attributes. You can use your own DB and not rely on the helm chart. Check the docs for [more](https://github.com/frain-dev/helm-charts/blob/main/README.md).


### DX improvements
Most helm charts as we know, can repeat values in the `values.yaml` A typical example is this:

```shell
convoy:
    username: Convoy
    password: Convoy

postgres:
    username: Convoy
    password: Convoy

convoy-sidecar:
    username: Convoy
    password: Convoy
```

This makes configuration harder and a lot of moving parts. In v1, We now use YAML alias; An example looks like this

```shell
common:
     username: &username "convoy"
     password: &password "convoy"

convoy:
    username: *username
    password: *password

postgres:
    username: *username
    password: *password

convoy-sidecar:
    username: *username
    password: *password
```

The syntax we use is called an "alias node" in YAML. An alias node allows you to reference a previously defined value in the YAML document. The syntax for defining an alias node in YAML uses the *&* character followed by a name. To reference the value of an alias node, you use the * character followed by the same name.

Now we have a single source, and other values can inherit from it.

### Deployments
Before Convoy can be up and running, We need to do some DB migration handled by the `migrate` component. Before now, When the chart is deployed, other components go into a crash loop since the `migrate` component isn't done. Part of the benefit of using Kubernetes is that it has a reconciliation phase where it will retry the pods again. After several seconds and minutes, other components will start. So we had to fix that.

Introducing [Helm Chart Hooks](https://helm.sh/docs/topics/charts_hooks/), we used helm hooks in our configuration, and it looks like this:

```shell
apiVersion: batch/v1
kind: Job
metadata:
  name: {{ include "convoy-migrate.fullname". }}
  annotations:
    "helm.sh/hook": pre-install,pre-upgrade
    "helm.sh/hook-delete-policy": hook-succeeded
    
```
Voila, `"helm.sh/hook": pre-install,pre-upgrade` ensures that helm runs the job before any other resources during an installation and upgrading phase and `"helm.sh/hook-delete-policy": hook-succeeded` ensures the job is deleted,  keeping the Kubernetes resources clean.

This was a solution, right? Unfortunately Not, So the issue is why? That is because this only considers that the `migrate` component needs to be connected to the remote databases, Postgres and Redis. If a user uses a managed DB or brings their DB, the solution is valid; otherwise, it is not a reasonable solution.


Another idea was to use this:

```shell
apiVersion: batch/v1
kind: Job
metadata:
  name: {{ include "convoy-migrate.fullname". }}
  annotations:
    "helm.sh/hook": post-install,post-upgrade
    "helm.sh/hook-weight": "0"
    "helm.sh/hook-delete-policy": before-hook-creation
```

`"helm.sh/hook": post-install,post-upgrade` and  `helm.sh/hook-weight: "0"` allows the job to run after an installation or upgrade, which means Redis and Postgres will kick off, and the migrate will run, but this takes us back to the initial problem which was to avoid the `CrashLoopBackOff` of the other components

Introducing [InitContainers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/), Initcontainers allows Kubernetes to run pre-containers before the actual container, which can also be helpful when dealing with migrations. Our new config was updated to this:

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

The config above will check the migration job constantly every 10 seconds to ensure it is complete before other components will run. That was the solution.

## Coming soon
We are working on some features, and one of them is horizontal pod autoscaling which allows each component to scale based on CPU or memory utilization.

## Conclusion
We are constantly improving and enhancing how things are built, and we are always open to suggestions on improving our open-source tool, Convoy. We cannot wait to see the fascinating things you will make with Convoy. 
