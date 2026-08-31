---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, toRefs]
---

## Question

Why is `toRefs()` commonly used when returning from a composable that returns a reactive object?

## Code

```typescript
import { reactive, toRefs } from 'vue'

function useCounter() {
  const state = reactive({ count: 0, step: 1 })
  // ...
  return toRefs(state)
}
```

## Options

- To make the object immutable
- To convert each property into a ref so destructuring preserves reactivity
- To convert the object to a shallowRef
- To deep-clone the object

## Answer

To convert each property into a ref so destructuring preserves reactivity

## Explanation

If you destructure a `reactive()` object directly, each destructured value loses reactivity because it becomes a plain primitive. `toRefs()` converts each property into a ref that stays linked to the original reactive object, so destructuring like `const { count, step } = useCounter()` keeps both values reactive.

See: [toRefs()](https://vuejs.org/api/reactivity-utilities.html#torefs)
