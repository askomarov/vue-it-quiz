---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [shallowRef, triggerRef]
---

## Question

How can you force a `shallowRef`'s watcher to fire after mutating its inner object without replacing `.value`?

## Code

```typescript
import { shallowRef, triggerRef } from 'vue'

const state = shallowRef({ count: 0 })

state.value.count = 5
// What goes here to trigger reactivity?
```

## Options

- state.update()
- triggerRef(state)
- state.notify()
- Vue.forceUpdate(state)

## Answer

triggerRef(state)

## Explanation

`triggerRef()` manually triggers the side effects (watchers, renders) associated with a `shallowRef`. After mutating the inner object, calling `triggerRef(state)` tells Vue that something changed, so any watchers or computed values depending on this ref re-evaluate.
