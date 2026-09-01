---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, toRef]
---

## Question

What will this code log?

## Code

```javascript
import { reactive, toRef } from "vue";

const state = reactive({ count: 0 });
const countRef = toRef(state, "count");

state.count = 5;
console.log(countRef.value);

countRef.value = 10;
console.log(state.count);
```

## Options

- 0, 0
- 5, 5
- 5, 10
- 10, 10

## Answer

5, 10

## Explanation

`toRef()` creates a ref that stays linked to a property on a reactive object — it does not copy the value. Reading `countRef.value` after `state.count = 5` returns `5`. Writing `countRef.value = 10` updates `state.count` in turn. Unlike destructuring (`const { count } = state`), the ref keeps reactivity in both directions.

See: [toRef()](https://vuejs.org/api/reactivity-utilities.html#toref)
