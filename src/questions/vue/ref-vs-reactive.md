---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: easy
tags: [reactivity, reactive, ref]
---

## Question

What will this code log?

## Code

```javascript
import { ref, reactive, isRef, isReactive } from "vue";

const a = ref(1);
const b = reactive(1);
const c = reactive([1]);

console.log(isRef(a), isReactive(b), isReactive(c));
```

## Options

- true, false, true
- true, true, true
- true, false, false
- false, false, true

## Answer

true, false, true

## Explanation

`ref()` wraps any value — primitives included — in an object with `.value`. `reactive()` is a `Proxy`, so it only makes **object types** reactive: plain objects, arrays, `Map`, `Set`. A primitive does not throw: in dev Vue warns `value cannot be made reactive` and returns the value as-is, so `isReactive(reactive(1))` is `false`. Arrays are objects, so `reactive([1])` is reactive. "reactive() only works with objects" is the Proxy constraint, not "plain objects only" and not a runtime exception.

See: [Limitations of reactive()](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)
