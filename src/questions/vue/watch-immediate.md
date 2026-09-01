---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watch, immediate]
---

## Question

What will this code output?

## Code

```javascript
import { ref, watch } from "vue";

const count = ref(10);

watch(
  count,
  (newVal, oldVal) => {
    console.log(`new: ${newVal}, old: ${oldVal}`);
  },
  { immediate: true },
);

count.value = 20;
```

## Options

- new: 20, old: 10
- new: 10, old: undefined, then new: 20, old: 10
- new: 10, old: null, then new: 20, old: 10
- new: 20, old: undefined

## Answer

new: 10, old: undefined, then new: 20, old: 10

## Explanation

With `immediate: true`, the watcher fires immediately upon registration. On this first run, `oldVal` is `undefined` because there is no previous value — so it logs `new: 10, old: undefined`. Then when `count.value` changes to 20, it fires again with `new: 20, old: 10`.

See: [Watchers — Eager Watchers](https://vuejs.org/guide/essentials/watchers.html#eager-watchers)
