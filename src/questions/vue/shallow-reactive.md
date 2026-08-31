---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, shallowReactive]
---

## Question

What will be logged?

## Code

```typescript
import { shallowReactive, watch } from 'vue'

const state = shallowReactive({ user: { name: 'Alice' } })

let triggered = 0
watch(() => state.user, () => triggered++)

state.user.name = 'Bob'
console.log(triggered)

state.user = { name: 'Carol' }
console.log(triggered)
```

## Options

- 0, 0
- 0, 1
- 1, 1
- 1, 2

## Answer

0, 0

## Explanation

Two things are happening here. First, `shallowReactive()` only tracks top-level property changes — mutating `state.user.name` does not trigger reactivity. Second, `console.log(triggered)` runs synchronously right after each mutation, but watcher callbacks are flushed asynchronously. Even the valid trigger (replacing `state.user`) has not fired yet at the time of either `console.log`, so both output `0`.

See: [shallowReactive()](https://vuejs.org/api/reactivity-advanced.html#shallowreactive) · [Watchers — Callback Flush Timing](https://vuejs.org/guide/essentials/watchers.html#callback-flush-timing)
