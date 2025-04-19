---
title: "Transactional Outbox: How to reliably generate webhook events"
feature_image: transactional-outbox.png
post_image: transactional-outbox.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Engineering
tags:
    - Convoy
    - Engineering
featured: false
description: 'One of the major problems of designing a webhook delivery system is designing around bad/zombie endpoints. Zombie endpoints are dead endpoints that fail continuously and, over time, clog up your queues, create back pressure, and delay event delivery to legitimate webhook endpoints.'
published_at: 2025-04-17T13:00:00.000+00:00
---


In the world of distributed systems, ensuring reliable event delivery is crucial, especially when dealing with webhooks. The transactional outbox pattern has emerged as a robust solution to this challenge. In this post, we'll explore how to implement this pattern to guarantee reliable webhook delivery, even in the face of system failures.

## Introduction

When building systems that need to notify external services about events (webhooks), we face a fundamental challenge: how do we ensure that every event is delivered exactly once, even when our system experiences failures? The transactional outbox pattern solves this by treating the event publication as part of the same transaction as the business operation.

![transactional outbox diagram](/blog-assets/transactional-outbox.png)

The key benefits of this pattern are:
- Atomic operations: Events are stored in the same transaction as the business data
- Guaranteed delivery: No events are lost, even if the system crashes
- Exactly-once delivery: Events are processed only once
- Scalability: The pattern works well with high-throughput systems


## Designing the Outbox

Let’s dive into implementing the transactional outbox pattern using Go and SQLite. Our implementation consists of two main components: an ingest service that creates events and a worker that processes them. In your system, the ingest service can represent any component that performs CRUD operations on domain objects — in this example, we’ll use invoices.

### Database Schema

First, we need to design our database schema to store both our business data and events:

```sql
-- Events table for storing webhook events
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    payload TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processed_at DATETIME,
    status TEXT DEFAULT 'pending'
);

-- Business data table (invoices in our example)
CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    status TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Ingest Service

The ingest service is responsible for creating business objects and their associated events in a single transaction. Here's how it works:

```go
func runIngest(queries *db.Queries, dbConn *sql.DB, rate time.Duration) error {
	ticker := time.NewTicker(rate)
	defer ticker.Stop()

	for range ticker.C {
		// Get a random business ID from our predefined list
		businessID := getRandomBusinessID()

		// Generate an invoice
		invoice := generateInvoice(businessID)

		// Start a transaction
		tx, err := dbConn.BeginTx(context.Background(), nil)
		if err != nil {
			log.Printf("Error starting transaction: %v", err)
			continue
		}

		// Create a new queries instance that uses the transaction
		txQueries := queries.WithTx(tx)

		// Create the invoice within the transaction
		_, err = txQueries.CreateInvoice(context.Background(), db.CreateInvoiceParams{
			ID:          invoice.ID,
			BusinessID:  invoice.BusinessID,
			Amount:      invoice.Amount,
			Currency:    invoice.Currency,
			Status:      invoice.Status,
			Description: sql.NullString{String: invoice.Description, Valid: true},
		})
		if err != nil {
			tx.Rollback()
			log.Printf("Error creating invoice: %v", err)
			continue
		}

		// Marshal the invoice for the event payload
		eventPayload := struct {
			EventType string      `json:"event_type"`
			Data      interface{} `json:"data"`
		}{
			EventType: "invoice.created",
			Data:      invoice,
		}
		payload, err := json.Marshal(eventPayload)
		if err != nil {
			tx.Rollback()
			log.Printf("Error marshaling invoice: %v", err)
			continue
		}

		// Create the event within the same transaction
		_, err = txQueries.CreateEvent(context.Background(), db.CreateEventParams{
			BusinessID: businessID,
			EventType:  "invoice.created",
			Payload:    string(payload),
		})
		if err != nil {
			tx.Rollback()
			log.Printf("Error creating event: %v", err)
			continue
		}

		// Commit the transaction
		if err := tx.Commit(); err != nil {
			log.Printf("Error committing transaction: %v", err)
			continue
		}

		log.Printf("Created invoice and event for business %s: %s", businessID, string(payload))
	}

	return nil
}
```

It's important to note that the code is written for illustrative purposes—to continuously generate invoices like a real application and produce the corresponding webhook events. The key point is that both the invoice creation and event creation occur within the same transaction. If either operation fails, the entire transaction is rolled back, ensuring data consistency.

### Worker Service

The worker service is responsible for processing pending events and sending it to the webhook gateway for dispatch. It runs continuously, polling for new events:

```go
func runWorker(queries *db.Queries, dbConn *sql.DB, pollInterval time.Duration, convoyClient *convoy.Client) error {
	for {
		events, err := queries.GetPendingEvents(context.Background(), batchSize)
		if err != nil {
			log.Printf("Error fetching events: %v", err)
			time.Sleep(pollInterval)
			continue
		}

		if len(events) == 0 {
			log.Printf("No pending events found. Polling again in %v", pollInterval)
			time.Sleep(pollInterval)
			continue
		}

		log.Printf("Found %d pending events to process", len(events))

		for _, event := range events {

			// Ensure payload is not empty
			if event.Payload == "" {
				log.Printf("Warning: Empty payload for event %d, skipping", event.ID)
				continue
			}

			// Create a fanout event using Convoy
			fanoutEvent := &convoy.CreateFanoutEventRequest{
				EventType:      event.EventType,
				OwnerID:        event.BusinessID, // Using business_id as owner_id
				IdempotencyKey: event.ID,
				Data:           []byte(event.Payload),
			}

			// Send the event to Convoy
			err = convoyClient.Events.FanoutEvent(context.Background(), fanoutEvent)
			if err != nil {
				log.Printf("Error sending event %d to Convoy: %v", event.ID, err)
				continue
			}

			// Mark event as processed
			if err := queries.MarkEventAsProcessed(context.Background(), event.ID); err != nil {
				log.Printf("Error marking event %d as processed: %v", event.ID, err)
				continue
			}
		}

		time.Sleep(pollInterval)
	}
```

Our `GetPendingEvents` method from above is implemented like below because this example was written with SQLite.

```sql
-- name: GetPendingEvents :many
SELECT id, business_id, event_type, payload, created_at, processed_at, status 
FROM events
WHERE status = 'pending'
ORDER BY created_at ASC
LIMIT ?;
```

For production use cases, we will be using PostgreSQL and would utilise features like `FOR UPDATE SKIP LOCKED` to make sure two processes are not processing the same event. See example below:

```sql
-- name: GetPendingEvents :many
SELECT id, business_id, event_type, payload, created_at, processed_at, status
FROM events
WHERE status = 'pending'
ORDER BY created_at ASC
LIMIT ?
FOR UPDATE SKIP LOCKED;
```

The worker picks up a batch of events from the outbox table and sends them to the webhook delivery system for dispatch. Once the delivery system acknowledges receipt of an event, it is marked as `processed` and can be purged during the next cleanup cycle. We leverage the unique ID of the outbox table to ensure webhook idempotency.

## Operational Tips

When running a transactional outbox system in production, consider these important operational aspects:

1. **Database Performance**
   - Create appropriate indexes on the events table (business_id, status, created_at)
   - Monitor the size of the events table and implement a cleanup strategy for processed events
   - Consider partitioning the events table by date if dealing with high volume

2. **Worker Configuration**
   - Set appropriate batch sizes based on your system's capacity
   - Configure reasonable poll intervals to balance latency and database load
   - Use multiple worker instances for horizontal scaling

3. **Monitoring and Alerting**
   - Monitor the number of pending events
   - Track webhook delivery success rates
   - Alert on high failure rates or processing delays
   - Set up logging for debugging webhook delivery issues

4. **Error Handling**
   - Implement dead letter queues for events that fail after multiple retries
   - Set up monitoring for stuck events (events that haven't been processed for too long)
   - Have a process for manually retrying failed events when necessary

5. **Scaling Considerations**
   - Use database connection pooling
   - Implement rate limiting for webhook delivery
   - Use a message queue for the worker to handle high throughput

By following these operational guidelines and implementing the transactional outbox pattern as shown, you can build a reliable webhook delivery system that guarantees exactly-once delivery, even in the face of system failures. 

## Getting Started with Convoy
Want to add webhooks to your API in minutes? You can get started at [cloud.getconvoy.io/signup](https://cloud.getconvoy.io/signup).
