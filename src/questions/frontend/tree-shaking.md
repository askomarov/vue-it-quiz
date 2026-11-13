---
category: Frontend
description: HTML, CSS, JavaScript, and modern frontend frameworks
icon: layout
difficulty: medium
tags: [javascript, bundling, optimization]
---

## Question

What does it mean when code is "tree-shakable"?

## Options

- It will only inject the minimal amount of DOM into the DOM tree at a time
- It will be loaded async at runtime via an async script tag
- If it's not used it won't be included in the production bundle
- It will run only in the browser (not on the server)

## Answer

If it's not used it won't be included in the production bundle

## Explanation

Tree shaking is a build-time optimization that removes unused code from the production bundle. It relies on static analysis of module imports and exports; it does not refer to DOM updates, asynchronous loading, or browser-only execution.
