---
category: Backend
description: Server-side development, APIs, and backend architecture
icon: server
difficulty: hard
tags: [rest, api]
---

## Question

Which REST API design follows best practices for updating a user's email?

## Options

- POST /users/123/updateEmail
- PUT /users/123 with body { "email": "new@example.com" }
- GET /users/123?email=new@example.com
- PATCH /users/123/email/new@example.com

## Answer

PUT /users/123 with body { "email": "new@example.com" }

## Explanation

REST best practices use HTTP methods to express intent. `PUT` is used for full resource updates with the new data in the request body. Using verbs in the URL (like `updateEmail`) violates REST conventions. `GET` should never modify data.
