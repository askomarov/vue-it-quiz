---
category: Database
description: SQL, NoSQL, and database design concepts
icon: database
difficulty: medium
tags: [sql, joins]
---

## Question

What does the following SQL query return?

## Code

```sql
SELECT u.name, o.order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

## Options

- Only users who have orders
- All users, with order data if it exists, otherwise NULL
- Only orders that have a matching user
- All orders, with user data if it exists

## Answer

All users, with order data if it exists, otherwise NULL

## Explanation

A `LEFT JOIN` returns all rows from the left table (users), and matching rows from the right table (orders). If no match is found, the right table's columns are filled with `NULL`. This is useful when you want all records from the primary table regardless of matches.
