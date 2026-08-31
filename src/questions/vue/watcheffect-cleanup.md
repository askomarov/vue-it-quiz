---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watchEffect, cleanup]
---

## Question

What is the purpose of the `onCleanup` function provided inside `watchEffect`?

## Code

```typescript
import { watchEffect } from 'vue'

watchEffect((onCleanup) => {
  const timer = setInterval(() => console.log('tick'), 1000)
  onCleanup(() => clearInterval(timer))
})
```

## Options

- It runs before the effect's first execution
- It registers a cleanup function that runs before the next re-run or when the effect is stopped
- It prevents the effect from ever running again
- It forces the effect to run synchronously

## Answer

It registers a cleanup function that runs before the next re-run or when the effect is stopped

## Explanation

`onCleanup` registers a callback that Vue calls before the effect re-runs (due to dependency changes) or when the effect is stopped (e.g., component unmount). This is the standard pattern for cleaning up side effects like timers, event listeners, or subscriptions created inside the effect.

See: [Watchers — Side Effect Cleanup](https://vuejs.org/guide/essentials/watchers.html#side-effect-cleanup)
