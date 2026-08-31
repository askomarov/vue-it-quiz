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

0, 1

## Explanation

`shallowReactive()` only makes the top-level properties reactive — nested objects are not wrapped in proxies. So mutating `state.user.name` does not trigger reactivity (logs `0`). But replacing `state.user` entirely is a top-level property change, so the watcher fires (logs `1`).
