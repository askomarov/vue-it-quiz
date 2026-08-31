---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: easy
tags: [reactivity, reactive]
---

## Question

What is the main practical difference between `ref()` and `reactive()`?

## Options

- ref() wraps any value in a reactive .value; reactive() only works with objects
- They are identical
- ref() is async, reactive() is sync
- reactive() works with primitives, ref() works with objects

## Answer

ref() wraps any value in a reactive .value; reactive() only works with objects

## Explanation

`ref()` can hold any value (primitives, objects, arrays) and is accessed via `.value`. `reactive()` only accepts objects/arrays and returns a deep proxy — properties are accessed directly without `.value`. `reactive()` cannot wrap primitives. Both work with objects, but `ref()` is more universal and avoids destructuring pitfalls.

See: [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
