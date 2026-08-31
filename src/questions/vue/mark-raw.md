---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, markRaw]
---

## Question

What does `markRaw()` do and when would you use it?

## Options

- Marks a value as dirty so it re-renders
- Permanently prevents an object from being made reactive
- Freezes an object like Object.freeze()
- Removes an object from the DOM

## Answer

Permanently prevents an object from being made reactive

## Explanation

`markRaw()` marks an object so that Vue will never make it reactive, even if it is nested inside a `reactive()` or `ref()`. This is useful for large, immutable data structures (like class instances, Three.js objects, or large arrays) where deep reactivity adds unnecessary overhead and can cause performance issues.

See: [markRaw()](https://vuejs.org/api/reactivity-advanced.html#markraw)
