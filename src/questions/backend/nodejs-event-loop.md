---
category: Backend
description: Server-side development, APIs, and backend architecture
icon: server
difficulty: medium
tags: [nodejs, async]
---

## Question

What will this Node.js code print to the console?

## Code

```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

## Options

- A, B, C, D
- A, D, C, B
- A, D, B, C
- A, C, D, B

## Answer

A, D, C, B

## Explanation

Synchronous code runs first (A, D). Then the microtask queue is processed before the macrotask queue. The Promise callback (C) is a microtask and runs before the setTimeout callback (B), which is a macrotask.
