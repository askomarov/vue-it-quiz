---
category: Database
description: SQL, NoSQL, and database design concepts
icon: database
difficulty: hard
tags: [sql, indexing]
---

## Question

What is the primary purpose of a database index?

## Options

- To enforce data uniqueness
- To speed up data retrieval
- To compress data
- To encrypt data

## Answer

To speed up data retrieval

## Explanation

An index creates a data structure (typically a B-tree) that allows the database to find rows quickly without scanning the entire table. While indexes can also enforce uniqueness, their primary purpose is to accelerate query performance. They do come with a trade-off: they slow down writes and consume additional storage.
