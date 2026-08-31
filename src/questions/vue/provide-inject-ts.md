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

In `<script setup>`, `provide()` and `inject()` are compiler macros. To get a typed injected value, use the generic form: `inject<Type>('key')`. You can also provide a default value as the second argument: `inject<Type>('key', defaultValue)`.
