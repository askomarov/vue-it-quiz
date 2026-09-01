---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, shallowReactive]
---

## Question

What will this code log?

## Code

```javascript
import { shallowReactive, isReactive } from "vue";

const state = shallowReactive({ user: { name: "Alice" } });

console.log(isReactive(state), isReactive(state.user));
```

## Options

- true, true
- true, false
- false, true
- false, false

## Answer

true, false

## Explanation

`shallowReactive()` makes only the root object reactive — nested objects are stored as-is without being wrapped in proxies. So `isReactive(state)` is `true`, but `isReactive(state.user)` is `false`. Mutations like `state.user.name = 'Bob'` change the data but do not trigger reactivity; replacing a top-level property like `state.user = { ... }` does.

See: [shallowReactive()](https://vuejs.org/api/reactivity-advanced.html#shallowreactive)
