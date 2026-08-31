---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [reactivity, readonly]
---

## Question

What does `readonly()` do when applied to a reactive object?

## Options

- Freezes the object permanently
- Returns a read-only proxy that warns on mutation attempts
- Converts the object to a ref
- Makes the object non-reactive

## Answer

Returns a read-only proxy that warns on mutation attempts

## Explanation

`readonly()` returns a proxy of the original reactive object that allows reads but blocks writes. In development mode, attempting to mutate a readonly proxy logs a warning. It is useful for passing reactive state to child components while preventing them from modifying it.

See: [readonly()](https://vuejs.org/api/reactivity-core.html#readonly)
