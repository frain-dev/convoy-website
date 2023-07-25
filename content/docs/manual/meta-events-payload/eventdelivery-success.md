```json
{
  event_type: "eventdelivery.success",
  data: {
    uid: "01H43Q9NS0AHAD29HTVXG997GS",
    project_id: "01H28MWP1TQV5AC5QR54BSX8HJ",
    event_id: "01H43Q9MXMX9K1XAXCCB201BTV",
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
      uid: "01H43Q9MXMX9K1XAXCCB201BTV",
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
      uid: "01H43Q9RX5T49ZCYNSGCYX0QMS",
      msg_id: "01H43Q9NS0AHAD29HTVXG997GS",
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
        Date: "Thu, 29 Jun 2023 14:00:49 GMT",
        Server: "nginx",
        Vary: "Accept-Encoding",
        X-Request-Id: "77695b71-6305-43da-adec-064462422a7b",
        X-Token-Id: "202ad8fc-653c-492a-bdaa-0ac2bd34c981"
      },
      http_status: "200 OK",
      status: true,
      created_at: "2023-06-29T15:00:48.29347+01:00",
      updated_at: "2023-06-29T15:00:48.29347+01:00",
      deleted_at: null
    },
    status: "Success",
    metadata: {
      data: {
        data: "test event from Convoy",
        amount: 1000,
        convoy: "https://getconvoy.io"
      },
      raw: "{\data\:\"test event from Convoy\",\convoy\:\"https://getconvoy.io\",\amount\:1000}",
      strategy: "linear",
      next_send_time: "2023-06-29T15:00:45.088735+01:00",
      num_trials: 1,
      interval_seconds: 2,
      retry_limit: 3
    },
    cli_metadata: null,
    created_at: "2023-06-29T15:00:45.088743+01:00",
    updated_at: "2023-06-29T15:00:45.088743+01:00",
    deleted_at: null
  }
}
```