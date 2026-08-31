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

- Pass a second function argument to computed() with a setter
- Use computed.writable()
- Use writableComputed()
- You cannot create a writable computed

## Answer

Pass a second function argument to computed() with a setter

## Explanation

`computed()` accepts either a getter function or an object with `get` and `set` methods. The setter form looks like `computed({ get() { ... }, set(val) { ... } })`. When you assign to the computed ref's `.value`, the setter is invoked.
