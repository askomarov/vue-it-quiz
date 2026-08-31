---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [typescript, template-ref]
---

## Question

How do you type a template ref in `<script setup lang="ts">` for a DOM element?

## Code

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'

// What type should this ref have?
const inputEl = useTemplateRef<???>('inputEl')
</script>

<template>
  <input ref="inputEl" />
</template>
```

## Options

- HTMLElement
- HTMLInputElement
- Element
- any

## Answer

HTMLInputElement

## Explanation

Template refs should use the specific DOM element interface. For an `<input>`, use `useTemplateRef<HTMLInputElement>('inputEl')` (Vue 3.5+) or `ref<HTMLInputElement | null>(null)` in earlier versions. Vue 3.5+ can also auto-infer the type from the template. `HTMLElement` compiles but lacks input-specific properties like `.value` without casting.

See: [TypeScript — Typing Template Refs](https://vuejs.org/guide/typescript/composition-api.html#typing-template-refs)
