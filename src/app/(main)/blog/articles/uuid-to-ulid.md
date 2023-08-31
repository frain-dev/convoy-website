---
title: We switched Convoy's ID format from UUIDv4 to ULID
feature_image: uuid-to-ulid.png
post_image: uuid-to-ulid.png
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Product Update
tags:
    - Convoy
    - Engineering
featured: false
description: UUIDv4 and ULID are both types of unique identifiers that can be used in distributed systems. UUIDv4 stands for Universally Unique Identifier version 4, and ULID stands for Universally Unique Lexicographically Sortable Identifier.
published_at: 2023-05-23T17:00:00.000+00:00
---

With our release of `v0.9.x` and `v23.05.x`, we migrated our datastore from MongoDB to Postgres, we decided to change our ID format.

# What does this mean for you and your data?
At Convoy, we strive to make sure that our software is backwards compatible and that little effort is required on your part, so your workloads can operate while we move things around internally. We ensure that the contract we keep with our API is never broken. In this case, we unfortunately had to make the change, so we as a company and Convoy as a product could evolve into a version of the vision that we have.

Both our users on cloud and users that self-host will be affected and I have outlined below what each set of users will experience and how they can work around it.

## Cloud Users
1. Your old resources will all still use the old UUIDv4 format.
2. Pagination for all old resources will break; they might be out of order since UUIDv4 isn't lexicographically sortable
3. All new resources will use the new ULID format.
4. Pagination for new resources like event and event-deliveries will live along-side the older records and will bubble up, when the retention policy kicks in those older ones will be deleted, and you would start seeing only resources with new IDs.
5. You can create new versions of existing resources to preserve pagination accuracy (we are working on adding search to all relevant pages, so you don't necessarily have to do this if you are looking for a resource).
6. Search will not be affected, events that have been indexed and not deleted (due to retention policy) will still be available. 

## Self-Hosted Users
1. All of the above apply
2. If you are still running `v0.8.x` and below, we created a [migration repo](https://github.com/frain-dev/migrate-to-postgres) that you can use to migrate your data.
3. If you don't have a retention policy configured your existing events and event-deliveries will not be deleted, but the newer ones will still be bubbled up.

# Why did we do this?

First some definitions. **ULID** and **UUIDv4** are both commonly used unique identifier formats. **UUIDv4** is a standardized format for generating unique identifiers that are widely used in distributed systems. 
**ULID** is a type of unique identifier that combines a timestamp and a random component to generate a unique value that is also lexicographically sortable.

## UUIDv4 

From the [UUIDv4 spec](https://datatracker.ietf.org/doc/html/rfc4122#section-4.4), it is constructed by generating random number.

```UUIDv4 spec
Sample ID: 4fcc81d9-9512-4b2e-9267-b5e057d5007a

   4fcc81d9-9512-      4           b2e-            9          267-b5e057d5007a
  |--------------|    |-|         |----|          |-|        |----------------|
     Randomness     Version*    Randomness      Version**        Randomness

*  Set the four most significant bits of the 7th byte '0100',
       so that the Hex value always starts with a 4,
       
** Set the 2 most significant bits of the 9 th byte to '10', 
        so that the Hex value will always start with a 8, 9, A , or B.  
```

1. **Standardization**: UUIDv4 is a standardized format defined by [RFC 4122](https://www.ietf.org/rfc/rfc4122.txt), which means it is widely recognized and understood by developers across different languages and platforms. This makes it easier to integrate with other systems and tools that use UUIDv4.
2. **Large namespace**: UUIDv4 has a larger namespace than ULID, which means that it can generate a larger number of unique identifiers. This is useful in systems with a high rate of data generation or where a large number of unique identifiers are required.
3. **Randomness**: UUIDv4 is generated using a random or pseudo-random algorithm, which makes it difficult to predict or guess the next value in the sequence. This can be useful in security-sensitive applications or where unpredictability is important.

## ULID

From the official [ULID spec](https://github.com/ulid/spec), it is constructed by concatenating a timestamp with a random suffix:
```ULID spec
Sample ID: 01ARZ3NDEKTSV4RRFFQ69G5FAV

   01ARZ3NDEK        TSV4RRFFQ69G5FAV
 |------------|    |------------------|
   Timestamp            Randomness
    48bits                80bits
```
This provides several nice properties:
1. **They are lexicographically sortable**: We made the change solely because we wanted to incorporate cursor based pagination, which is really important for reading a large dataset. When your dataset it large enough, offset pagination (using limit and skip in queries) starts to become slow, meaning if you have over 100k events your dashboard will slow to a crawl when loading and searching events/deliveries.
2. **They are better used as indexes**: ULIDs work very well with B-Trees which is used to create indexes in Postgres.
3. **They are URL friendly**: ULIDs are more compact, they use Crockford’s base32 for better efficiency and readability (5 bits per character) which make it easy to copy-and-paste (`01ARZ3NDEKTSV4RRFFQ69G5FAV`), unlike hyphenated UUIDs which are in base 16 (e.g. `4fcc81d9-9512-4b2e-9267-b5e057d5007a`).
4. **They are unique with millisecond precision**: ULIDs generated in the same second will be unique based on the random component. The random component has enough entropy to avoid collisions in practical uses.
5. **We plan to use them for Idempotency Keys**: In order to ensure the reliable delivery of an event on a large scale, it is essential for the idempotency key to be unique during the desired time frame for the event to be retryable, typically less than one minute.


## Differences between UUIDs and ULIDs:
| Format | Sortable | 	Monotonic | Randomness |
|--------|----------|------------|------------|
| UUIDv4 | No       | No         | 122 bits   |
| ULID   | Yes      | Yes        | 80 bits *  |

     * Random bits are incremented sequentially within the same millisecond.

## Tradeoffs/Cons
1. When creating both **UUIDs** and **ULIDs**, the process of generating **ULIDs** is 73% slower when producing 10 million values, but only 31% slower when generating and inserting 1 million values. Generating **ULIDs** are slower than **UUIDs**, though, the benefits of a sortable globally unique identifier make the tradeoff worth it.
2. Timing information can be unintentionally exposed through **ULIDs**, revealing the speed at which a particular resource is generated. By analyzing ULIDs, it becomes possible to deduce the rate at which a service is generating events, thereby disclosing potentially valuable competitive data that should remain confidential.

## Conclusion
Although a little slower to generate, **ULIDs** provide many pros over the pure random **UUIDv4** that lots of large companies running work-loads at scale have adopted. As a company building for the scale of our current users and future scale of the general internet, we are always looking to adopt and implement technologies that will work at companies of all sizes, sending and ingesting any amount of webhook events.

## References
- [ULID Primary Keys](https://blog.daveallie.com/ulid-primary-keys)
- [Using ULIDs at incident.io](https://blog.lawrencejones.dev/ulid)
- [UUID V4 Random Generation](https://www.intl-spectrum.com/Article/r848/IS_UUID_V4_UUID_V4_Random_Generation)
- [Choosing Primary Key Type in Postgres](https://shekhargulati.com/2022/06/23/choosing-a-primary-key-type-in-postgres/)