---
category: Git
description: Version control concepts and Git workflows
icon: git
difficulty: easy
tags: [git, stash]
---

## Question

What does `git stash` do?

## Options

- Deletes uncommitted changes
- Temporarily saves uncommitted changes for later use
- Commits changes without a message
- Pushes changes to a remote branch

## Answer

Temporarily saves uncommitted changes for later use

## Explanation

`git stash` saves your uncommitted working directory and staged changes, then reverts the working tree to match `HEAD`. You can later restore these changes with `git stash pop`. This is useful when you need to switch branches but are not ready to commit.
