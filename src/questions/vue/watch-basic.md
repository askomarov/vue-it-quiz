---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [watch, reactivity]
---

## Question

What will be logged to the console in the following code?

## Code

```typescript
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(`${oldVal} -> ${newVal}`)
})

count.value = 1
count.value = 2
```

## Options

- 0 -> 2
- 0 -> 1, 1 -> 2
- 0 -> 1
- 1 -> 2

## Answer

0 -> 2

## Explanation

Watcher callbacks are flushed asynchronously (pre-flush by default), not inline with the assignment. When two mutations happen in the same synchronous tick, Vue batches them into a single callback invocation with the final value — so only `0 -> 2` is logged. To get both transitions, the changes must happen in separate ticks (e.g. with `await nextTick()` between them).

See: [Watchers — Callback Flush Timing](https://vuejs.org/guide/essentials/watchers.html#callback-flush-timing)
