---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: easy
tags: [composition-api, script-setup]
---

## Question

In `<script setup>`, how do you expose a variable to the template?

## Code

```vue
<script setup>
const count = ref(0)
// How does the template get access to count?
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## Options

- Return it from setup: `return { count }`
- Put it on `this`: `this.count = count`
- Nothing — top-level bindings are auto-exposed
- Call `defineExpose({ count })`

## Answer

Nothing — top-level bindings are auto-exposed

## Explanation

In `<script setup>`, every top-level binding (refs, functions, imports) is automatically available in the template — no `return` needed. `defineExpose()` is only for exposing things to a parent via a template ref, not for the component's own template.

See: [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
