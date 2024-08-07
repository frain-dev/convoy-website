---
title: 'Designing a Robust Integration Test Suite for Convoy’s Data Plane with TestContainers'
feature_image: end-to-end-test-suite.png
post_image: end-to-end-test-suite.png 
primary_author:
    name: Convoy Engineering
    twitter: getconvoy
primary_tag: Engineering 
tags:
  - Convoy
  - Engineering
featured: true 
description: For the last 3 years, Convoy has been an indispensable tool for developers to securely send and receive millions of webhook events daily and at a massive scale. And since it is open source, many developers contribute to the project to ensure it remains highly customisable,  performant, efficient and reliable.
published_at: 2024-08-07T17:00:00.000+00:00 
--- 
![end-to-end-test-suite.png](/blog-assets/end-to-end-test-suite.png)

As software systems become large and very complex, asserting that when modifications are made, all the combined pieces still work as intended is **imperative**. That is the goal of testing. 

But what kind of testing are we talking about? This article focuses on **end-to-end** **integration** tests. 

For the last 3 years, Convoy has been an indispensable tool for developers to securely send and receive millions of webhook events daily and at a massive scale. And since it is open source, many developers contribute to the project to ensure it remains highly customisable,  performant, efficient and reliable.

Enter reliability, it can be so easy to ignore this aspect of any software when changes are made to the codebase. This is the main reason why a robust end-to-end test suite is needed to spot defects in the code before they are shipped to end users. 

# **Before TestContainers**
Before the use of TestContainers, Convoy, written in Go, relied on the following checks:

1. Golang Lint
2. Unit tests
3. Mocking (using `mockgen`). 
4. Integration tests (using GitHub workflows and some environment configurations).

These checks are fine as they are and help catch defects and reduce technical debt. 

However, there are some limitations. 

For example:

- Golang Lint analyses code without running it.
- Unit tests are quite limited in scope and lack context about the end-to-end behaviour of the system.
- Mocking simulates this behaviour, however, what happens in the real world could be different.
- The current integration test suite relies on manually purging the database for every test case since they all share the same hardcoded port in the environment variables. In addition, the tests are not truly end-to-end.

Even if we accept these limitations as we did for a while, some very nasty bugs will escape all these checks. Why? Because these tests do not fully adhere to this guiding principle:

> “The more your tests resemble the way your software is used, the more confidence they can give you” — Kent C. Dodds
> 

To understand how Convoy is used, and the desired end-user experience, we need to first understand the high-level system architecture.

![convoy-architecture.png](/blog-assets/convoy-architecture.png)

From the architecture described above the data plane is the component we’re interested in. It is the component responsible for ingesting and delivering webhooks to user endpoints. To this end, we designed a robust integration test suite so we don't inadvertently introduce regression defects to the data plane as we continue to evolve it.

# **Using TestContainers**

## Iteration 0

Following the official TestContainers Go documentation, we started by creating separate containers for the core services such as Redis and Postgres. For Postgres, it was defined this way:

```go
type PostgresContainer struct {
	*postgres.PostgresContainer
	ConnectionString string
}

func CreatePGContainer(t *testing.T) (*PostgresContainer, error) {
	ctx := context.Background()

	pgContainer, err := postgres.RunContainer(ctx,
		testcontainers.WithImage("postgres:15.2-alpine"),
		postgres.WithDatabase("convoy"),
		postgres.WithUsername("postgres"),
		postgres.WithPassword("postgres"),
		testcontainers.WithWaitStrategy(
			wait.ForLog("database system is ready to accept connections").
				WithOccurrence(2).WithStartupTimeout(5*time.Second)),
	)
	if err != nil {
		t.Fatal(err)
	}

	t.Cleanup(func() {
		if err := pgContainer.Terminate(ctx); err != nil {
			t.Fatalf("failed to terminate pgContainer: %s", err)
		}
	})

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	assert.NoError(t, err)
	log.Info("Conn: " + connStr)
	return &PostgresContainer{
		PostgresContainer: pgContainer,
		ConnectionString:  connStr,
	}, nil
}
```

And for Redis:

```go
type RedisContainer struct {
	*redis.RedisContainer
	ConnectionString string
}

func CreateRedisContainer() (*RedisContainer, error) {
	ctx := context.Background()

	redisContainer, err := redis.RunContainer(ctx,
		testcontainers.WithImage("redis:6-alpine"),
	)
	if err != nil {
		log.Fatalf("failed to start container: %s", err)
	}

	uri, err := redisContainer.ConnectionString(ctx)
	if err != nil {
		log.Fatalf("failed to get connection string: %s", err)
	}
	log.Info("Conn: ", uri)

	return &RedisContainer{
		RedisContainer:   redisContainer,
		ConnectionString: uri,
	}, nil
}
```

This approach generated random ports for Redis and Postgres that we could plug into Convoy’s generic container from the host system. For example, to run the command `convoy agent`, we defined Convoy’s container as such:

```go
func ConvoyAgent(container *PostgresContainer, rContainer *RedisContainer, port int, rPort int) (*testcontainers.Container, error) {
	ctx := context.Background()

	dbHost, err := container.Host(ctx)
	if err != nil {
		log.Fatal(err)
	}

	redisHost, err := rContainer.Host(ctx)
	if err != nil {
		log.Fatal(err)
	}

	path := filepath.Join("..", ".")

	req := testcontainers.ContainerRequest{
		FromDockerfile: testcontainers.FromDockerfile{
			Context:       path,
			Dockerfile:    "Dockerfile.dev",
			PrintBuildLog: true,
			KeepImage:     false,
		},
		//HostAccessPorts: []int{port, 5432},
		Env: map[string]string{
			"CONVOY_DB_HOST":      dbHost,
			"CONVOY_DB_SCHEME":    "postgres",
			"CONVOY_DB_USERNAME":  "postgres",
			"CONVOY_DB_PASSWORD":  "postgres",
			"CONVOY_DB_DATABASE":  "convoy",
			"CONVOY_DB_PORT":      strconv.Itoa(port),
			"CONVOY_REDIS_HOST":   redisHost,
			"CONVOY_REDIS_SCHEME": "redis",
			"CONVOY_REDIS_PORT":   strconv.Itoa(rPort),
		},
		Cmd:        []string{"./cmd", "agent"},
		WaitingFor: wait.ForLog("ready"),
	}

	c, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})

	return &c, err
}
```

This approach had several limitations. For one thing, it required creating separate functions to build each container. Second, we had networking issues. For example, it was hard to connect to the randomly generated exposed Postgres port from the Convoy processes. Perhaps this was due to a knowledge gap or the fact that we did not create a Docker network. Anyway, we soon changed our approach to a much simpler one.

## Iteration 1

Digging deeper into the documentation, we discovered that we could use `docker compose` directly. This was only possible from Go version 1.21 and above. That changed things really; all we needed was just one method that spins up and tears down the services specified in Convoy’s docker-compose.yml.

```go
func (i *IntegrationTestSuite) SetupSuite() {
	t := i.T()
	identifier := tc.StackIdentifier("convoy_docker_test")
	compose, err := tc.NewDockerComposeWith(tc.WithStackFiles("./testdata/docker-compose-test.yml"), identifier)
	require.NoError(t, err)

	t.Cleanup(func() {
		require.NoError(t, compose.Down(context.Background(), tc.RemoveOrphans(true), tc.RemoveImagesLocal), "compose.Down()")
	})

	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(cancel)

	// ignore ryuk error
	_ = compose.WaitForService("postgres", wait.NewLogStrategy("ready").WithStartupTimeout(60*time.Second)).
		WaitForService("redis_server", wait.NewLogStrategy("Ready to accept connections").WithStartupTimeout(10*time.Second)).
		WaitForService("migrate", wait.NewLogStrategy("migration up succeeded").WithStartupTimeout(60*time.Second)).
		Up(ctx, tc.Wait(true), tc.WithRecreate(api.RecreateNever))

	i.TestData = seedTestData(t)
}
```

This approach was a much-needed lifesaver. At first, though, it didn’t seem it would work because of a persistent ryuk error that was not nil. The error was similar to the following:

```bash
failed to connect to reaper: dial tcp [::1]:49485: connect: connection refused: Connecting to Ryuk on localhost:49485 failed
```

Checking for the root cause of this error, we stumbled upon:

- [Could not connect to Ryuk at localhost:49154 on Docker for Windows](https://github.com/testcontainers/testcontainers-java/issues/3609)
- [[Bug]: compose.dockerCompose.Up errors out with "failed to connect to reaper](https://github.com/testcontainers/testcontainers-go/issues/2563)
- The official documentation at https://golang.testcontainers.org/features/configuration/#customizing-ryuk-the-resource-reaper,

Despite reviewing these sources meticulously, progress was not forthcoming. We then decided to ignore the error, since we were already cleaning up used resources in the `t.Cleanup` method.

Aside from the ryuk error, the core test suite is indeed very simple. As shown in the preceding code snippet, we only needed to specify the location of the docker-compose.yml file and set it as an argument to `tc.NewDockerComposeWith(...)`. This method creates a `*dockerCompose` object. This object has a convenience method `WaitForService` that allows us to apply a waiting strategy for the services similar to the way `depends_on` works in a docker-compose.yml file.

The order was to start up the Postgres server first, followed by Redis and then running Convoy migrations. Once these steps have been completed, we need to wait for all other unnamed services using another method `Up(ctx, tc.Wait(true))`. The last step is to seed random test data. That’s it!

# Building the Test Cases

Since the goal of the test suite is the **correctness of the data plane** (see architecture described above). Let’s examine the ingestion sources, their structure and the expected behaviour (see the [docs](https://docs.getconvoy.io/product-manual/events-and-event-deliveries#ingesting-events) for a more detailed explanation)

|  | Direct | Fan Out | Broadcast | Dynamic |
| --- | --- | --- | --- | --- |
| HTTP | Ingest events from the HTTP source and deliver it to one endpoint. | Ingest events from the HTTP source and deliver it to multiple endpoints. | Ingest events from the HTTP source and deliver it to all tenant’s endpoints | Ingest events from the HTTP source and deliver it to the embedded endpoint. |

Other supported Ingest Channels are Amazon SQS, Apache Kafka, Google PubSub and RabbitMQ. This integration test suite using TestContainers is designed to ensure that for all possible ingestion structure across any channel the system operates correctly. Let’s look at a sample test case.

## Fan-Out Events Test Cases

A fan-out is an event delivered to multiple endpoints linked by an `ownerID`(see [docs](https://docs.getconvoy.io/product-manual/events-and-event-deliveries#fan-out)). The pseudocode for this flow is:

```go
func (f *FanoutEventsTestSuite) Test_FanoutEvent_Success() {
	// start dummy HTTP server to receive the webhook.
	go startHTTPServer(n)

	// create multiple endpoints linked by an ownerID.
	err := createEndpoints(n)
	
	// subscribe the endpoints to matching event types.
	err := createMatchingSubscriptions(m)
	
	// send a matching event through a specific channel
	err := sendEventToOwnerID(ctx, channel, ownerID, payload)
	
	// assert that our dummy server received the hook.
	assertEventCameThrough(ctx)
}

func (f *FanoutEventsTestSuite) Test_FanoutEvent_NotMatching() {
	// start dummy HTTP server to receive the webhook.
	go startHTTPServer(n)

	// create multiple endpoints linked by an ownerID.
	err := createEndpoints(n)
	
	// subscribe endpoints to event types that wouldn't match.
	err := createNonMatchingSubscriptions(m)
	
	// send a matching event through a specific channel
	err := sendEventToOwnerID(ctx, channel, ownerID, payload)
	
	// assert that no event came through.
	assertNoEventCameThrough(ctx)
}
```

Now that we have the foundation of the test suite laid out, we will be able to continue improving the test suite for various other combinations and assertions, such as Broadcast Events, Dynamic Events, Pub/Sub Ingest, Custom Headers and Idempotency Keys, etc. to catch regressions before any new releases.

> The goal of our pilot test cases was **correctness**.
> 

# Lessons Learned

To be sure, this integration of TestContainers in Convoy has several benefits. Even while writing the tests, some bugs were squashed along the way. These bugs would have been difficult to detect otherwise. 

In addition, we didn’t need to purge the database all the time as we were doing before now; we have the guarantee that containers are spun up with a clean slate and there will be no conflict with other tests or even parallel runs of the same tests.

Another benefit is that we do not need to create a separate function for each required container. All we need to do is update the docker-compose file with the same integration test suite left unchanged, and everything should work as expected.

# Final Thoughts

Without a doubt, end-to-end tests are crucial in ensuring the reliability and efficiency of any software especially cloud-native software such as Convoy. In this article, we reviewed how we at Convoy were able to implement an end-to-end integration test suite in Go using TestContainers. The principles shared in this article can also help anyone who has a similar mindset regardless of the project being worked on, thus improving their reliability and functionality.

Looking ahead, we hope to increase our test coverage using this approach to help remove defects, mitigate technical debt, and reliability of Convoy processes!
