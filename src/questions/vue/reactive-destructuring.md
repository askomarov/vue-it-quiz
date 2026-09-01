---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, ref-destructuring]
---

## Question

What will this code log?

## Code

```javascript
import { reactive } from "vue";

const state = reactive({ count: 0, label: "items" });
const { count, label } = state;

state.count = 10;
console.log(count, label);
```

## Options

- 10, items
- 0, items
- 10, undefined
- undefined, undefined

## Answer

0, items

## Explanation

Destructuring a `reactive()` object breaks reactivity — the destructured variables are plain copies of the values at the time of destructuring. After `state.count = 10`, the local `count` variable still holds the original value `0`. To preserve reactivity, use `toRefs()` before destructuring.

See: [Reactivity Fundamentals — Limitations of reactive()](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)
