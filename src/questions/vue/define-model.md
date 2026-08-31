---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [typescript, defineModel]
---

## Question

What does `defineModel()` return and what is its purpose?

## Options

- A read-only prop
- A ref that enables two-way binding between parent and child via v-model
- A computed ref for display only
- A method to emit events

## Answer

A ref that enables two-way binding between parent and child via v-model

## Explanation

`defineModel()` returns a ref whose value is synced with the parent's `v-model` binding. Mutating the ref's `.value` automatically emits an `update:modelValue` event to the parent. It eliminates the need to manually pair a `prop` with an `emit` for two-way binding.
