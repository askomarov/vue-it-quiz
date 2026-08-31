---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: hard
tags: [reactivity, effectScope]
---

## Question

What does `effectScope()` do and why would you use it?

## Options

- It creates a new component instance
- It groups effects (watchers, computeds) so they can be stopped together
- It scopes CSS styles to a component
- It limits the number of reactive effects allowed

## Answer

It groups effects (watchers, computeds) so they can be stopped together

## Explanation

`effectScope()` creates a scope object that collects all reactive effects created within it. Calling `scope.stop()` cleanly disposes all watchers, computeds, and watchEffects in that scope at once. This is especially useful in composables that create dynamic effects, allowing for clean teardown without tracking each effect individually.
