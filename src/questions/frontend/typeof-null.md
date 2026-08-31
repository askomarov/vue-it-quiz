---
category: Frontend
description: HTML, CSS, JavaScript, and modern frontend frameworks
icon: layout
difficulty: medium
tags: [javascript, types]
---

## Question

What will be the output of the following JavaScript code?

## Code

```javascript
console.log(typeof null);
console.log(typeof undefined);
```

## Options

- object, undefined
- null, undefined
- object, object
- undefined, undefined

## Answer

object, undefined

## Explanation

In JavaScript, `typeof null` returns `"object"` — this is a well-known historical bug that cannot be fixed without breaking existing code. `typeof undefined` returns `"undefined"` as expected.
