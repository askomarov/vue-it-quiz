---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [lifecycle, hooks]
---

## Question

Which Composition API hook replaces the Options API `mounted` lifecycle hook?

## Options

- onCreated()
- onBeforeMount()
- onMounted()
- onRendered()

## Answer

onMounted()

## Explanation

`onMounted()` is the Composition API equivalent of the `mounted` Options API hook. It fires after the component's DOM has been mounted. You register it inside `setup()` (or `<script setup>`) by passing a callback.

See: [onMounted()](https://vuejs.org/api/composition-api-lifecycle.html#onmounted)
