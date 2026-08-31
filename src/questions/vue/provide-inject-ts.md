---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [provide, inject, typescript]
---

## Question

What is the preferred way to type an injected value in `<script setup lang="ts">`?

## Options

- provide('key', value); const v = inject('key') as Type
- provide('key', value); const v = inject<Type>('key')
- this.$provide('key', value); this.$inject('key')
- Vue.provide('key', value); Vue.inject('key')

## Answer

provide('key', value); const v = inject<Type>('key')

## Explanation

`provide()` and `inject()` are Composition API functions imported from `'vue'`, not compiler macros. The generic form `inject<Type>('key')` is preferred over type assertion (`inject('key') as Type`) because it gives better inference. For production code, an `InjectionKey<T>` is even better — it syncs types between provider and consumer.

See: [TypeScript — Typing Provide / Inject](https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject)
