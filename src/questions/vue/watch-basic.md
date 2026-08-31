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

0 -> 1, 1 -> 2

## Explanation

By default, `watch()` is triggered synchronously whenever the watched ref changes. Each assignment to `count.value` triggers the callback separately, so both transitions are logged: first `0 -> 1`, then `1 -> 2`.
