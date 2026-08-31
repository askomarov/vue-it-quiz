---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: easy
tags: [reactivity, ref]
---

## Question

What does `ref()` return, and how do you access its value in JavaScript?

## Options

- A plain value; access it directly
- An object with a `.value` property; access via `.value`
- A function; call it to get the value
- An array; access via index 0

## Answer

An object with a `.value` property; access via `.value`

## Explanation

`ref()` returns a reactive object with a single `.value` property. In JavaScript you must access or mutate it through `.value`. In templates, Vue automatically unwraps refs so you can use the name directly without `.value`.
