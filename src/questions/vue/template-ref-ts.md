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
import { ref } from 'vue'

// What type should this ref have?
const inputEl = ref<???>(null)
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

Template refs should be typed with the specific DOM element interface. For an `<input>` element, use `ref<HTMLInputElement | null>(null)`. Vue's template compiler checks that the ref type matches the element. Using `HTMLElement` is too broad and would not give you access to input-specific properties like `.value`.
