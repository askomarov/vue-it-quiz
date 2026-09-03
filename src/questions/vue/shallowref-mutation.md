---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [shallowRef, reactivity]
---

## Question

How many times does the watcher fire, and which mutation causes it?

## Code

```typescript
import { shallowRef, watch } from 'vue'

const state = shallowRef({ count: 0 })

watch(state, () => {
  console.log('watcher triggered')
})

state.value.count = 1   // A
state.value = { count: 2 } // B
```

## Options

- Twice — both A and B trigger it
- Once — only A (`state.value.count = 1`)
- Once — only B (`state.value = { count: 2 }`)
- Never — shallowRef does not trigger watchers

## Answer

Once — only B (`state.value = { count: 2 }`)

## Explanation

`shallowRef()` only tracks replacement of `.value` itself, not deep mutations inside the held object. Mutating `state.value.count` (A) changes the data but does not notify dependents. Replacing the whole object via `state.value = { count: 2 }` (B) does — so the watcher fires once. To react to inner mutations without replacing `.value`, use `triggerRef()` or a deep `ref` / `reactive`.

See: [shallowRef()](https://vuejs.org/api/reactivity-advanced.html#shallowref)
