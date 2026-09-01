---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watch, getter source]
---

## Question

What happens when you pass a getter function as the source to `watch()`?

## Code

```javascript
import { ref, watch } from "vue";

const a = ref(1);
const b = ref(10);

watch(
  () => a.value + b.value,
  (sum) => console.log(`sum: ${sum}`),
);

a.value = 2;
b.value = 20;
```

## Options

- Logs nothing
- Logs: sum: 12, then sum: 22
- Logs: sum: 22 (once)
- Logs: sum: 11, then sum: 22

## Answer

Logs: sum: 22 (once)

## Explanation

When a getter function is passed as the watch source, Vue tracks all reactive dependencies accessed inside it. Here both `a` and `b` are dependencies. Since both refs change synchronously in the same tick, Vue batches the callback into a single invocation with the final computed value `2 + 20 = 22`. Separate logs (`sum: 12`, then `sum: 22`) would only appear if the changes occurred in different flush cycles.

See: [Watchers — Watch Source Types](https://vuejs.org/guide/essentials/watchers.html#watch-source-types) · [Callback Flush Timing](https://vuejs.org/guide/essentials/watchers.html#callback-flush-timing)
