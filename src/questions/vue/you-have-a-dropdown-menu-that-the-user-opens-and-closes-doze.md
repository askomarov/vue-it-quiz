---
category: Vue 3
description: Composition API, reactivity, TypeScript integration, and internals
icon: layout
difficulty: easy
tags: [v-if v-show]
---

## Question

You have a dropdown menu that the user opens and closes dozens of times during a session. The menu contains several child components with their own state.

Which directive is generally the better choice for this case, and why?

## Options

- `v-if`, because it completely removes the menu from the DOM when it is hidden
- `v-show`, because the menu stays mounted and Vue only toggles its CSS display property
- `v-if`, because it is always faster when toggling elements
- `v-show`, because it destroys and recreates the child components on every toggle

## Answer

`v-show`, because the menu stays mounted and Vue only toggles its CSS display property

## Explanation

`v-if` conditionally renders the element, so toggling it can destroy and recreate the element and its child components. `v-show` renders the element once and controls its visibility using the CSS display property.

For elements that are toggled frequently, `v-show` is generally preferable because it avoids the repeated mount/unmount cost. For content that is toggled rarely or may not need to be rendered at all initially, `v-if` is usually the better choice.

[conditional render](https://vuejs.org/guide/essentials/conditional.html)
