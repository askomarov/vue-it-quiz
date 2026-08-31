---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: medium
tags: [composables, conventions]
---

## Question

What is the naming convention for custom composables in Vue 3?

## Options

- Prefix with `use`, e.g., useFetch, useMouse
- Prefix with `on`, e.g., onFetch, onMouse
- Suffix with `Composable`, e.g., FetchComposable
- No convention; any name is fine

## Answer

Prefix with `use`, e.g., useFetch, useMouse

## Explanation

Vue's convention is to prefix composable function names with `use` (e.g., `useFetch`, `useMouse`, `useCounter`). This makes them easy to identify and helps tooling like the Vue DevTools and IDE extensions recognize them as composables.
