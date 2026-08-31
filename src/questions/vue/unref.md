---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, unref]
---

## Question

What will this code log?

## Code

```typescript
import { ref, unref } from 'vue'

const a = ref(42)
const b = 100

console.log(unref(a))
console.log(unref(b))
```

## Options

- 42, 100
- { value: 42 }, 100
- 42, undefined
- 42, Ref<100>

## Answer

42, 100

## Explanation

`unref()` is a helper that returns the inner value if the argument is a ref, or the argument itself if it is not. So `unref(a)` returns `42` (the ref's `.value`), and `unref(b)` returns `100` because `b` is a plain number, not a ref.

See: [unref()](https://vuejs.org/api/reactivity-utilities.html#unref)
