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

```typescript
import { ref, watch } from 'vue'

const a = ref(1)
const b = ref(10)

watch(
  () => a.value + b.value,
  (sum) => console.log(`sum: ${sum}`)
)

a.value = 2
b.value = 20
```

## Options

- Logs nothing
- Logs: sum: 12, then sum: 22
- Logs: sum: 22 (once)
- Logs: sum: 11, then sum: 22

## Answer

Logs: sum: 12, then sum: 22

## Explanation

When a getter function is passed as the watch source, Vue tracks all reactive dependencies accessed inside it. When `a` changes to 2, the getter returns `2 + 10 = 12`. When `b` changes to 20, the getter returns `2 + 20 = 22`. Both changes trigger the callback with the new return value.
