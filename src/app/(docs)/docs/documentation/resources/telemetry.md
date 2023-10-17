--- 
title: Telemetry
description: 'Describe telemetry data collected from self-hosted instances'
id: telemetry
order: 10
---

# Telemetry
Convoy tracks usage of its products which helps the team to improve and deliver better software. This page explains what we track, how we track it and how to opt out of telemetry at any time. 

## What data is collected
All data we collect are completely anonymous, and aren't able to identify your company or team from the data we collect. We currently collect the following metrics:
- `Event Count`: This is an aggregate total of events sent/received from your instance.
- `Project Count` & `Active Project Count`: This is an aggregate total of projects created and projects actively sending/receiving events from your instance respectively. 
- `User Count`: This is an aggregate total of users on your instance.
- `Organisation Count`: This is an aggregate total of organisations created on your instance.

## How is the data collected and how will it be processed
All telemetry data are collected and stored securely on [Mixpanel](https://mixpanel.com). Metrics are computed and collected daily and pushed to our Mixpanel project. The data collected from the individual installations would follow our [privacy policy](https://getconvoy.io/legal/Privacy-Policy-Convoy.pdf).

## How do I opt out?
To opt of telemetry, set the `CONVOY_ANALYTICS_ENABLED` environment variable to false or add the following section to your `convoy.json`
```json {% file="Sample Config" %}
{
 "analytics": {
  "is_enabled" false
 }
}
```

