---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [typescript, props]
---

## Question

How do you define props with TypeScript types in `<script setup>` using `defineProps`?

## Code

```vue
<script setup lang="ts">
// Which syntax is correct?
</script>
```

## Options

- defineProps<{ title: string; count?: number }>()
- defineProps(['title', 'count'])
- const props = this.$props as { title: string }
- props: { title: String, count: Number }

## Answer

defineProps<{ title: string; count?: number }>()

## Explanation

In `<script setup>` with TypeScript, `defineProps` accepts a generic type argument: `defineProps<{ title: string; count?: number }>()`. Vue's compiler extracts the type literal and generates runtime prop validation automatically. The `?` marks the prop as optional.
