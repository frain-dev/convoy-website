---
title: We switched IDs from UUID4 to ULID
primary_author:
    name: Raymond Tukpe
    twitter: rtukpe
primary_tag: Product Update
tags:
    - Convoy
    - Engineering
featured: false
description: UUIDv4 and ULID are both types of unique identifiers that can be used in distributed systems. UUIDv4 stands for Universally Unique Identifier version 4, and ULID stands for Universally Unique Lexicographically Sortable Identifier.
---

**ULID** and **UUIDv4** are both commonly used unique identifier formats. **UUIDv4** is a standardized format for generating unique identifiers that are widely used in distributed systems. 
**ULID** is a type of unique identifier that combines a timestamp and a random component to generate a unique value that is also lexicographically sortable.

Both have pros over each other which include but isn't limited to:

## UUIDv4 

**Standardization**: UUIDv4 is a standardized format defined by [RFC 4122](https://www.ietf.org/rfc/rfc4122.txt), which means it is widely recognized and understood by developers across different languages and platforms. This makes it easier to integrate with other systems and tools that use UUIDv4.

**Large namespace**: UUIDv4 has a larger namespace than ULID, which means that it can generate a larger number of unique identifiers. This is useful in systems with a high rate of data generation or where a large number of unique identifiers are required.

**Randomness**: UUIDv4 is generated using a random or pseudo-random algorithm, which makes it difficult to predict or guess the next value in the sequence. This can be useful in security-sensitive applications or where unpredictability is important.

## ULID

**Sorting**: ULID is designed to be lexicographically sortable, which means that identifiers can be sorted in chronological order based on their creation time. This can be useful in systems where sorting based on creation time is important.

**Compactness**: ULID is more compact than UUIDv4, which means that it can be more efficient to store and transmit.

**Deterministic**: ULID is generated using a combination of timestamp and randomness, which makes it deterministic based on the timestamp and the seed. This can be useful in applications that require deterministic behavior or where conflicts need to be resolved based on time.

We chose to switch to **ULID** because

1. They are compact
2. They are lexicographically sortable
3. They are URL friendly
4. They are unique with millisecond precision