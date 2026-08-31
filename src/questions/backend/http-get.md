---
category: Backend
description: Server-side development, APIs, and backend architecture
icon: server
difficulty: easy
tags: [http, methods]
---

## Question

Which HTTP method is idempotent and typically used to retrieve data without side effects?

## Options

- POST
- GET
- PATCH
- DELETE

## Answer

GET

## Explanation

The `GET` method is safe and idempotent — it should only retrieve data and not modify server state. Calling it multiple times produces the same result without side effects.
