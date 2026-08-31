---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watch, deep]
---

## Question

What will be logged?

## Code

```typescript
import { ref, watch } from 'vue'

const obj = ref({ nested: { value: 0 } })

watch(obj, (newVal) => {
  console.log('changed')
}, { deep: true })

obj.value.nested.value = 1
obj.value.nested.value = 2
```

## Options

- Nothing is logged
- changed (once)
- changed, changed
- changed, changed, changed

## Answer

changed (once)

## Explanation

With `{ deep: true }`, nested mutations inside the ref do trigger the watcher. However, both assignments run synchronously in the same tick, so Vue batches the callback — it fires once, not twice. Deep tracking detects each mutation, but the scheduler still deduplicates invocations within one flush cycle.

See: [Watchers — Deep Watchers](https://vuejs.org/guide/essentials/watchers.html#deep-watchers) · [Callback Flush Timing](https://vuejs.org/guide/essentials/watchers.html#callback-flush-timing)
