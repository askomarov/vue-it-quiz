---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [reactivity, computed]
---

## Question

What will this code log?

## Code

```typescript
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

count.value = 5
console.log(double.value)
```

## Options

- 0
- 5
- 10
- undefined

## Answer

10

## Explanation

`computed()` creates a reactive computed ref. When `count.value` changes to 5, `double.value` is lazily re-evaluated on next access and returns `5 * 2 = 10`. Computed values are cached and only recompute when their dependencies change.

See: [Computed Properties](https://vuejs.org/guide/essentials/computed.html)
