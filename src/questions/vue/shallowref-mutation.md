---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [shallowRef, reactivity]
---

## Question

What will this code log?

## Code

```typescript
import { shallowRef, watch } from 'vue'

const state = shallowRef({ count: 0 })

watch(state, () => {
  console.log('watcher triggered')
})

state.value.count = 1
state.value = { count: 2 }
```

## Options

- watcher triggered, watcher triggered
- watcher triggered
- watcher triggered (only after the second line)
- Nothing is logged

## Answer

watcher triggered (only after the second line)

## Explanation

`shallowRef()` only triggers reactivity when `.value` itself is replaced — it does not deeply track mutations to the inner object. So `state.value.count = 1` does NOT trigger the watcher. Only `state.value = { count: 2 }` (replacing the entire `.value`) triggers it once.
