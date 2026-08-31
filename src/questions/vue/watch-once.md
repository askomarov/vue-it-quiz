---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watch, once]
---

## Question

How can you make a watcher fire only once and then automatically stop itself?

## Code

```typescript
import { ref, watch } from 'vue'

const data = ref(0)

// How to watch data only once?
```

## Options

- Pass { once: true } in the options
- Use the returned stop function to stop it inside the callback
- Use watchOnce() instead of watch()
- Pass { count: 1 } in the options

## Answer

Use the returned stop function to stop it inside the callback

## Explanation

`watch()` returns a stop function. To fire only once, call it inside the callback: `const stop = watch(data, () => { console.log('once'); stop() })`. Vue 3.4+ also supports the `{ once: true }` option which does this automatically, but the manual stop approach works in all versions.
