---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watch, flush]
---

## Question

What happens when you set `flush: 'post'` in a watcher's options?

## Code

```typescript
import { ref, watch } from 'vue'

const data = ref(0)

watch(data, () => {
  console.log('DOM updated')
}, { flush: 'post' })

data.value = 1
```

## Options

- The callback runs before the DOM is updated
- The callback runs after the DOM is updated
- The callback never runs
- The callback runs immediately on registration

## Answer

The callback runs after the DOM is updated

## Explanation

By default, `watch()` callbacks run before the component updates the DOM (`flush: 'pre'`). With `flush: 'post'`, the callback is deferred until after Vue has flushed the DOM updates, so you can access the updated DOM inside the callback.
