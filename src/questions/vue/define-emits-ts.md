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
- { submit: (value: string) => boolean } | { cancel: () => void }
- emit: { submit: string }

## Answer

(e: 'submit', value: string) => void

## Explanation

In Vue 3.3+, `defineEmits` accepts a call signature type: `defineEmits<{ (e: 'submit', value: string): void; (e: 'cancel'): void }>()`. Each event is declared as a function overload where the first parameter is the event name and the rest are the payload types. This gives full type checking on both the emit call site and the parent's listener.
