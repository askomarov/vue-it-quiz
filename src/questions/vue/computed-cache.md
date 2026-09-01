---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, computed-cache]
---

## Question

What will this code log?

## Code

```javascript
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed(() => {
  console.log("computed ran");
  return `${firstName.value} ${lastName.value}`;
});

console.log(fullName.value);
console.log(fullName.value);
firstName.value = "Jane";
console.log(fullName.value);
```

## Options

- computed ran, computed ran, computed ran
- computed ran, (no log), computed ran
- computed ran, computed ran, (no log)
- (no log), computed ran, computed ran

## Answer

computed ran, (no log), computed ran

## Explanation

Computed refs cache their result. The first access evaluates and logs `computed ran`. The second access returns the cached value without re-evaluating. After `firstName` changes, the cache is invalidated, so the third access re-evaluates and logs again. This is why computeds are more efficient than plain methods.

See: [Computed Properties](https://vuejs.org/guide/essentials/computed.html)
