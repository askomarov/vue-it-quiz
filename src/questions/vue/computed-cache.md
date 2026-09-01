---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, computed-cache]
---

## Question

How many times will `computed ran` be logged?

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

- 1
- 2
- 3
- 4

## Answer

2

## Explanation

`fullName.value` is read three times, but the computed getter runs only when the cache is empty or invalidated. First read evaluates and logs `computed ran`. Second read returns the cached result — no getter, no log. After `firstName` changes, the cache is invalidated; the third read evaluates again and logs once more. The outer `console.log(fullName.value)` calls still print `John Doe` / `Jane Doe` each time; they are separate from the getter log.

See: [Computed Properties](https://vuejs.org/guide/essentials/computed.html)
