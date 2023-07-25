```json
{
  event_type: "eventdelivery.failed",
  data: {
    uid: "01H43QH6RJ6D4JV0MSAS9PHGRF",
    project_id: "01H28MWP1TQV5AC5QR54BSX8HJ",
    event_id: "01H43QH6NGWVGNZKXA31CJ6W8A",
    endpoint_id: "01H3FRZ6SX9CDKZTEY6TMQAPWD",
    device_id: "",
    subscription_id: "01H3FRZ6VDCJ4G8Y3979YP7TC7",
    headers: null,
    url_query_params: "",
    idempotency_key: "",
    endpoint_metadata: {
      uid: "01H3FRZ6SX9CDKZTEY6TMQAPWD",
      project_id: "01H28MWP1TQV5AC5QR54BSX8HJ",
      target_url: "https://webhook.site/202ad8fc-653c-492a-bdaa-0ac2bd34c981",
      title: "endpoint-2",
      secrets: null,
      advanced_signatures: false,
      description: "",
      http_timeout: "",
      rate_limit: 0,
      status: "",
      rate_limit_duration: "",
      authentication: null,
      created_at: "0001-01-01T00:00:00Z",
      updated_at: "0001-01-01T00:00:00Z",
      deleted_at: null
    },
    event_metadata: {
      uid: "01H43QH6NGWVGNZKXA31CJ6W8A",
      event_type: "test.convoy",
      endpoints: null,
      headers: null,
      url_query_params: "",
      idempotency_key: "",
      is_duplicate_event: false,
      created_at: "0001-01-01T00:00:00Z",
      updated_at: "0001-01-01T00:00:00Z",
      deleted_at: null
    },
    source_metadata: {
      uid: "",
      project_id: "",
      mask_id: "",
      name: "",
      url: "",
      type: "",
      provider: "",
      is_disabled: false,
      verifier: null,
      custom_response: {
        body: "",
        content_type: ""
      },
      provider_config: null,
      forward_headers: null,
      pub_sub: null,
      idempotency_keys: [

      ],
      created_at: "0001-01-01T00:00:00Z",
      updated_at: "0001-01-01T00:00:00Z",
      deleted_at: null
    },
    device_metadata: {
      uid: "",
      last_seen_at: "0001-01-01T00:00:00Z",
      created_at: "0001-01-01T00:00:00Z",
      updated_at: "0001-01-01T00:00:00Z",
      deleted_at: null
    },
    attempt: {
      uid: "01H43QHJQV5BE376GTNPY196GZ",
      msg_id: "01H43QH6RJ6D4JV0MSAS9PHGRF",
      url: "https://webhook.site/202ad8fc-653c-492a-bdaa-0ac2bd34c981",
      method: "POST",
      endpoint_id: "01H3FRZ6SX9CDKZTEY6TMQAPWD",
      api_version: "v23.06.3",
      ip_address: "[2a01:4f8:141:1d3::2]:443",
      request_http_header: {
        Content-Type: "application/json",
        User-Agent: "Convoy/v23.06.3",
        X-Convoy-Signature: "143312f3eb736911d8c17d980135414a7d37da863c8f13e7245f83131774d835"
      },
      response_http_header: {
        Cache-Control: "no-cache, private",
        Content-Type: "text/plain; charset=UTF-8",
        Date: "Thu, 29 Jun 2023 14:05:05 GMT",
        Server: "nginx",
        X-Request-Id: "c1a3908f-92f7-4920-9ecd-e269eca15c6a",
        X-Token-Id: "202ad8fc-653c-492a-bdaa-0ac2bd34c981"
      },
      http_status: "400 Bad Request",
      created_at: "2023-06-29T15:05:04.123567+01:00",
      updated_at: "2023-06-29T15:05:04.123567+01:00",
      deleted_at: null
    },
    status: "Failure",
    metadata: {
      data: {
        data: "test event from Convoy",
        amount: 1000,
        convoy: "https://getconvoy.io"
      },
      raw: "{\data\:\"test event from Convoy\",\convoy\:\"https://getconvoy.io\",\amount\:1000}",
      strategy: "linear",
      next_send_time: "2023-06-29T15:05:06.123529+01:00",
      num_trials: 3,
      interval_seconds: 2,
      retry_limit: 3
    },
    cli_metadata: null,
    description: "Retry limit exceeded",
    created_at: "2023-06-29T15:04:51.858865+01:00",
    updated_at: "2023-06-29T15:04:59.138633+01:00",
    deleted_at: null
  }
}
```