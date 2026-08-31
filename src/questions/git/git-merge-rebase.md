---
category: Git
description: Version control concepts and Git workflows
icon: git
difficulty: medium
tags: [git, merge]
---

## Question

What is the difference between `git merge` and `git rebase`?

## Options

- merge rewrites history, rebase preserves it
- merge preserves history, rebase rewrites it
- they are identical
- merge is faster than rebase

## Answer

merge preserves history, rebase rewrites it

## Explanation

`git merge` creates a merge commit that preserves the complete branch history. `git rebase` replays your commits on top of another branch, rewriting commit history to be linear. Rebase produces cleaner history but should not be used on shared branches because it rewrites commit hashes.
