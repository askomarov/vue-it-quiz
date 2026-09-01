---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watch, multiple sources]
---

## Question

What are the parameter types in the callback when watching multiple sources?

## Code

```javascript
import { ref, watch } from "vue";

const a = ref(1);
const b = ref("hello");

watch([a, b], (newValues, oldValues) => {
  // What are the types of newValues and oldValues?
});
```

## Options

- Both are arrays: [number, string]
- Both are plain values of the last changed source
- newValues is an array, oldValues is undefined
- Both are objects: { a: number, b: string }

## Answer

Both are arrays: [number, string]

## Explanation

When watching an array of sources, the callback receives arrays for both `newValues` and `oldValues`, in the same order as the sources. So `newValues` is `[number, string]` and `oldValues` is `[number, string]`. TypeScript infers the tuple type from the sources array.

See: [Watchers — Watch Source Types](https://vuejs.org/guide/essentials/watchers.html#watch-source-types)
