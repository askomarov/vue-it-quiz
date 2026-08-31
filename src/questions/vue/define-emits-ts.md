---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [typescript, defineEmits]
---

## Question

How do you type `defineEmits` in `<script setup lang="ts">` so the payload is checked?

## Code

```vue
<script setup lang="ts">
const emit = defineEmits<{
  // Which syntax?
}>()
</script>
```

## Options

- { submit: (value: string) => void }
- (e: 'submit', value: string) => void
- { submit: string }
- ['submit', 'cancel']

## Answer

(e: 'submit', value: string) => void

## Explanation

In Vue 3.3+, `defineEmits` accepts a call signature type: `defineEmits<{ (e: 'submit', value: string): void }>()`. Each event is a function overload where the first parameter is the event name and the rest are payload types. An alternative valid syntax uses named tuples: `{ submit: [value: string] }`. The object-with-function-value form `{ submit: (value: string) => void }` is not valid.

`defineEmits(['submit', 'cancel'])` is also valid Vue — it's a runtime declaration that lists event names, but TypeScript will not check payload types. Only the generic type-based form provides compile-time payload checking.

See: [TypeScript — Typing Component Emits](https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits)
