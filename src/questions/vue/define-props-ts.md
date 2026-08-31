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

In `<script setup>` with TypeScript, `defineProps` accepts a generic type argument for type-based declaration: `defineProps<{ title: string; count?: number }>()`. The compiler infers equivalent runtime prop options from the type, but this is not the same as a full runtime declaration with custom validators. The `?` marks the prop as optional.

See: [TypeScript — Typing Component Props](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props)
