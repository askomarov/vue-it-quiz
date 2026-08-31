---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: easy
tags: [composition-api, setup]
---

## Question

What does Vue compile a `<script setup>` block into?

## Options

- A setup() function (same as explicit Composition API)
- A created() lifecycle hook
- A beforeCreate() lifecycle hook
- A mounted() lifecycle hook

## Answer

A setup() function (same as explicit Composition API)

## Explanation

You never write `setup()` yourself in `<script setup>` — the compiler transforms the entire block into a `setup()` function that runs once per component instance, before the component is created. Top-level bindings become local variables returned to the template.

See: [Composition API — setup()](https://vuejs.org/api/composition-api-setup.html#setup)
