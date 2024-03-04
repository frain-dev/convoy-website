---
title: Load Testing Convoy with K6
feature_image: load-test-with-k6.png
post_image: load-test-with-k6.png
primary_author:
    name: Dotun Jolaoso
    twitter: dotunj_
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: false
description: Evaluating the performance and limits of a software is an important practice in software engineering. At Convoy, we employ the load testing method to continously evaluate the performance and test the limits of the products we're building.
published_at: 2022-10-05T13:00:00.000+00:00
---

## Introduction

At Convoy, we’re constantly trying to evaluate the performance and limits of the software. There are different tests people generally carry out to assess the performance, availability, reliability, and stability of various software systems.

Load Testing is an example of such a test which is primarily aimed at assessing the current performance of a system under a simulated workload. It is used to ensure that an application performs satisfactorily when there are many concurrent requests happening at the same time.

This is important because it helps with a couple of things:

1. Determines the system’s behaviour under peak and normal conditions. Webhooks are an integral part of every application today. It is important to us to know the software is capable of handling millions of webhook requests on a daily basis without any challenges.
2. Ensure that new code additions, features, or infrastructure changes do not introduce performance regressions and that we’re consistently meeting the standards we’ve set for the system.

## Tools for Load Testing

There are different popular tools for load testing your application such as [Apache JMeter,](https://jmeter.apache.org/index.html) [NeoLoad](https://www.tricentis.com/products/performance-testing-neoload), [K6](https://k6.io/), etc. Choosing a particular load testing tool depends on your application needs and use case. In our case, we opted to use K6 because of its simplicity and ease of use.

## Our Approach

Load testing should be goal oriented. It is important to set expectations and thresholds. Those expectations might come from a Service Level Agreement (SLAs), or just general standards you’ve set for your API and software systems.

For example, according to a [study](https://www.nngroup.com/articles/website-response-times/) conducted by Nielsen Norman Group, the optimal response time for your website should be <= 1s.

For us, we approached Load testing with a couple of important questions:

1. What does a successful test look like?
2. What does a failed test look like?
3. What metrics can we look out for to consistently optimise?

In our case we started with evaluating the performance of two API endpoints we feel are critical to our users: - the [GET Events](https://docs.getconvoy.io/api-reference/events/list-all-events) endpoint and the [CREATE Events](https://docs.getconvoy.io/api-reference/events/create-an-event) endpoint.

### Load Testing with K6

K6 provides support for writing your Load test script using JavaScript ES2015/ES6 with support for [local and remote modules](https://k6.io/docs/using-k6/modules/).

We started with a simple Load Test script that looks like this:

```js[Sample load test script]
import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Rate } from "k6/metrics";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const baseUrl = `${__ENV.BASE_URL}/api/v1`;
const apiKey = __ENV.API_KEY;
const appId = __ENV.APP_ID;
const params = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    },
};

const listEventsErrorRate = new Rate("List_Events_errors");
const createEventErrorRate = new Rate("Create_Event_error");
const ListEventsTrend = new Trend("List_Events");
const createEventsTrend = new Trend("Create_Events");

const names = ["John", "Jane", "Bert", "Ed"];
const emails = [
    "John@gmail.com",
    "Jane@amazon.com",
    "Bert@yahoo.com",
    "Ed@hotmail.com",
];

export const generateEventPayload = (appId) => ({
    app_id: appId,
    data: {
        player_name: randomItem(names),
        email: randomItem(emails),
    },
    event_type: `${randomItem(names)}.${randomItem(names)}`.toLowerCase(),
});

export let options = {
    noConnectionReuse: true,
    stages: [
        { duration: "60s", target: 20 }, // simulate ramp-up of traffic from 1 to 20 users over 60s
        { duration: "60s", target: 20 }, // stay at 20 users for 60s
    ],
    thresholds: {
        "List_Events": ["p(95) < 3000"], //95% of requests must complete below 3s
        "Create_Events": ["p(99) < 3000"], //99% of requests must complete below 3s
        "List_Events_errors": ["rate<0.1"], // error rate must be less than 10%
        "Create_Event_error": ["rate<0.1"], // error rate must be less than 10%
        http_req_duration: ["p(99)<6000"], // 99% of requests must complete below 6s
    },
};

export default function () {
    let eventBody = JSON.stringify(generateEventPayload(appId));
    const listEventsUrl = `${baseUrl}/events?appId=${appId}`;
    const createEventUrl = `${baseUrl}/events`;

    const requests = {
        "List_Events": {
            method: "GET",
            url: listEventsUrl,
            params: params,
        },
        "Create_Events": {
            method: "POST",
            url: createEventUrl,
            params: params,
            body: eventBody,
        },
    };

    const responses = http.batch(requests)
    const listResp = responses['List_Events'];
    const createResp = responses['Create_Events'];

    check(listResp, {
      'list_events': (r) => r.status === 200,
    }) || listEventsErrorRate.add(1);

    ListEventsTrend.add(listResp.timings.duration)

    check(createResp, {
      'event_created': (r) => r.status === 201,
    }) || createEventErrorRate.add(1)

    createEventsTrend.add(createResp.timings.duration)

    sleep(1);
}

```

Our test will involve making simultaneous batch requests to the [Create Events](https://docs.getconvoy.io/api-reference/events/create-an-event) and [List Events](https://docs.getconvoy.io/api-reference/events/list-all-events) API.

The `stages` key within the `options` object allows us to specify the number of Virtual Users (VU) we want to make requests concurrently. The first stage simulates a ramp-up of traffic from 1 to 20 users within a duration of 60s. Subsequently, within the second stage, there are 20 VU making requests for another 60s.

In line with our goals, we’ve also defined a couple of metrics and thresholds that are important to us:

1.  We’ve defined two [rates](https://k6.io/docs/javascript-api/k6-metrics/rate/), the `listEventsErrorRate` and `createEventErrorRate`. In K6, rates are used to track how frequently a non-zero value occurs. We’ll use both of these rates to track how many HTTP errors we receive from the Create Events and List Events endpoint.
2.  Similarly, we’ve defined two [trends](https://k6.io/docs/javascript-api/k6-metrics/trend/), the `ListEventsTrend` and `CreateEventsTrend`. Trends are used to calculate statistics for multiple values like mean or mode. We’ll use this to track how long each request to the Create Events and List Events endpoint takes.
3.  We’ve also defined a couple of [thresholds](https://k6.io/docs/using-k6/thresholds/). Thresholds are used to signify the pass/fail criteria for the test. If the performance of the system does not meet those conditions, the test will finish with a failed status. Let’s look at some of the thresholds we’ve defined here:

             -  95% of requests to the List Events endpoint must have a response time below 3s.

             -  99% of requests to the Create Events endpoint must have a response time below 3s.

             -  Less than 1% of requests to the List Events endpoint return an error.

             -  Less than 1% of requests to the Create Events endpoint return an error.

             -  99% of requests must have a response time below 6s.

### Running the Tests

For running the tests with K6, we decided to integrate this into our Github Actions CI workflow. We have a workflow that runs on a scheduled time period to simulate peak and normal periods using the [schedule trigger](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) that Github Actions provides. Ideally, you also want your Load test environment to mirror your production environment to give you accurate results and analysis.

Here’s an example of what that workflow currently looks like:

```yaml[Example workflow]
name: Run Load Test

on:
  schedule:
    - cron: '30 14 * * *'
    - cron: '30 18 * * *'
    - cron: '30 21 * * *'

  workflow_dispatch:
    inputs:
      name:
        description: "Manual workflow name"
        required: true

jobs:
   load_test:
     name: K6 Load Test
     runs-on: ubuntu-latest

     steps:
      - name: Checkout
        uses: actions/checkout@v1

      - name: Run Local K6 Test
        uses: grafana/k6-action@v0.2.0
        with:
         filename: loadtest/convoy.js
         flags: --out influxdb=${{ secrets.INFLUXDB_BASE_URL }}
        env:
           BASE_URL: ${{ secrets.CONVOY_BASE_URL }}
           API_KEY: ${{ secrets.CONVOY_API_KEY }}
           APP_ID: ${{ secrets.CONVOY_APP_ID }}
```

After running a test, K6 prints an end-of-test \*\*summary report to `stdout` providing you with top-level details about the just concluded test. The end-of-test summary contains summary statistics about each built-in metric that K6 provides by default along with any additional custom metrics you might have defined. The summary also contains the pass or fail results of the test’s thresholds or checks.

Here’s a sample of what an end-of-test summary looks like after running the tests. You can check out the K6 metrics docs [here](https://k6.io/docs/using-k6/metrics/) to further understand what some of the additional metrics mean.

![End-to-end summary](/blog-assets/end-to-end-test-summary.png)

### Visualisation and Metrics

For granular analysis and further evaluation over a period of time, K6 provides support for exporting your metrics data to an external output. This output can be a file in different formats such as CSV or JSON, or you can also send it to another program such as Datadog or Prometheus. You can find a list of all supported outputs [here](https://k6.io/docs/getting-started/results-output/#external-outputs)

In our case, we opted for exporting the end-of-test summary to an [InfluxDB](https://www.influxdata.com/) instance and then using a Grafana dashboard for viewing the result.

![Load testing result from K6](/blog-assets/load-testing-result.png)

You can find out how to set up something similar [here](https://k6.io/docs/results-visualization/influxdb-+-grafana/).

# Conclusion

Load Testing is a crucial step in assessing the performance of any software system. It helps to ascertain and give you the required confidence that your platform is capable of handling a lot of concurrent requests at the same time.

For us at Convoy, we view load testing as an ongoing constant effort. We’ll continually evaluate performance results and continue to optimize the software to ensure we’re able to handle all of your webhook requests.
