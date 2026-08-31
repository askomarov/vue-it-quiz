---
category: Frontend
description: HTML, CSS, JavaScript, and modern frontend frameworks
icon: layout
difficulty: hard
tags: [javascript, closures]
---

## Question

What will the following code log to the console?

## Code

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

## Options

- 0, 1, 2
- 3, 3, 3
- 0, 0, 0
- 1, 2, 3

## Answer

3, 3, 3

## Explanation

Because `var` is function-scoped (not block-scoped), all three callbacks share the same `i` variable. By the time the timeouts execute, the loop has finished and `i` equals 3. Using `let` instead of `var` would produce `0, 1, 2` because `let` creates a new binding per iteration.
