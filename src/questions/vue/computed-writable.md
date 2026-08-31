---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [computed, writable]
---

## Question

How do you create a writable computed ref?

## Options

- Pass an object with get and set to computed()
- Pass a second function argument to computed() with a setter
- Use writableComputed()
- You cannot create a writable computed

## Answer

Pass an object with get and set to computed()

## Explanation

`computed()` accepts either a getter function (read-only) or an object with `get` and `set` methods: `computed({ get() { ... }, set(val) { ... } })`. When you assign to the computed ref's `.value`, the setter is invoked. A second function argument is not a valid API — it is silently ignored and the computed remains read-only.

See: [Computed — Writable Computed Ref](https://vuejs.org/guide/essentials/computed.html#writable-computed-ref)
