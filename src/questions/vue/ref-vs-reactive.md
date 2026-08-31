---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: easy
tags: [reactivity, reactive]
---

## Question

What is the difference between `ref()` and `reactive()`?

## Options

- They are identical
- ref() works with primitives, reactive() works with objects
- ref() is async, reactive() is sync
- reactive() works with primitives, ref() works with objects

## Answer

ref() works with primitives, reactive() works with objects

## Explanation

`ref()` is primarily for primitives (though it also works with objects) and requires `.value` access. `reactive()` is for objects and arrays — it returns a proxy of the original object, so you access properties directly without `.value`. `reactive()` does not work with primitives.
