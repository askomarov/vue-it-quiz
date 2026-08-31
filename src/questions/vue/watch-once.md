---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [watch, once]
---

## Question

What will be logged to the console?

## Code

```typescript
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (val) => {
  console.log(val)
}, { once: true })

count.value = 1
count.value = 2
```

## Options

- 2
- 1
- 1, 2
- Nothing is logged

## Answer

2

## Explanation

With `{ once: true }` (Vue 3.4+), the callback runs only once, then the watcher stops. Both assignments happen in the same synchronous tick, so Vue batches them: the single callback fires with the final value `2`, not the intermediate `1`. Without `immediate: true`, the initial value `0` does not trigger the callback.

See: [Watchers — Once Watchers](https://vuejs.org/guide/essentials/watchers.html#once-watchers)
