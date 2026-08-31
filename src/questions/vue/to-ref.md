---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, toRef]
---

## Question

What will this code output?

## Code

```typescript
import { reactive, toRef, watch } from 'vue'

const state = reactive({ count: 0 })
const countRef = toRef(state, 'count')

let logs: string[] = []
watch(countRef, (v) => logs.push(`${v}`))

state.count = 5
console.log(logs.join(', '))
```

## Options

- Nothing
- 5
- 0, 5
- undefined

## Answer

5

## Explanation

`toRef()` creates a ref that stays connected to the original reactive object's property. When `state.count` changes to 5, the `countRef` watcher fires with the new value `5`. `toRef` does not copy the value — it creates a live reference to the property on the source object.
