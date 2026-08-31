---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watch, watchEffect]
---

## Question

What is the key difference between `watch()` and `watchEffect()`?

## Options

- watchEffect() is async, watch() is sync
- watch() requires an explicit source; watchEffect() auto-tracks dependencies
- watch() runs immediately, watchEffect() does not
- There is no difference

## Answer

watch() requires an explicit source; watchEffect() auto-tracks dependencies

## Explanation

`watch()` requires you to explicitly specify which reactive source to watch and only fires when that source changes. `watchEffect()` takes a single callback and automatically tracks any reactive dependencies accessed inside it. `watchEffect()` also runs immediately on registration, while `watch()` does not unless `immediate: true` is set.

See: [Watchers — watch vs. watchEffect](https://vuejs.org/guide/essentials/watchers.html#watch-vs-watcheffect)
