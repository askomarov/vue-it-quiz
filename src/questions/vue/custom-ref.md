---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, customRef]
---

## Question

What does `customRef()` allow you to do?

## Options

- Create a ref with custom get and set logic
- Create a ref that is always read-only
- Create a ref that can only hold strings
- Create a ref with no reactivity tracking

## Answer

Create a ref with custom get and set logic

## Explanation

`customRef()` lets you define your own dependency tracking (track) and triggering (trigger) logic inside a factory function. This is useful for advanced cases like debounced refs, refs backed by localStorage, or refs that transform values on get/set.
