---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: easy
tags: [composition-api, setup]
---

## Question

Which function is the entry point of a component when using the Composition API in a `<script setup>` block?

## Options

- created()
- setup()
- beforeCreate()
- mounted()

## Answer

setup()

## Explanation

The `setup()` function is the entry point of the Composition API. With `<script setup>`, the compiler automatically wraps the block's top-level bindings into a `setup()` function that runs once per component instance, before the component is created.
