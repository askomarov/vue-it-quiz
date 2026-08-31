---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [watch, deep]
---

## Question

What will be logged?

## Code

```typescript
import { ref, watch } from 'vue'

const obj = ref({ nested: { value: 0 } })

watch(obj, (newVal) => {
  console.log('changed')
}, { deep: true })

obj.value.nested.value = 1
obj.value.nested.value = 2
```

## Options

- Nothing is logged
- changed (once)
- changed, changed
- changed, changed, changed

## Answer

changed, changed

## Explanation

A `ref` wrapping an object is made deeply reactive by default, but `watch()` on a ref does not deeply invoke the callback unless `deep: true` is set. With `deep: true`, each nested mutation triggers the callback separately, so both assignments produce a log: `changed, changed`.
