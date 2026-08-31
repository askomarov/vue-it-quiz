---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [provide, inject, typescript]
---

## Question

How do you provide a typed value with `provide()` and consume it with `inject()` in `<script setup lang="ts">`?

## Options

- provide('key', value); const v = inject('key') as Type
- provide('key', value); const v = inject<Type>('key')
- this.$provide('key', value); this.$inject('key')
- Vue.provide('key', value); Vue.inject('key')

## Answer

provide('key', value); const v = inject<Type>('key')

## Explanation

`provide()` and `inject()` are Composition API functions imported from `'vue'`, not compiler macros. The generic form `inject<Type>('key')` is the preferred way to type the injected value. Type assertion via `inject('key') as Type` also works, but the generic gives better inference and is the idiomatic approach. For production code, an `InjectionKey<T>` is even better — it syncs types between provider and consumer.

See: [TypeScript — Typing Provide / Inject](https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject)
