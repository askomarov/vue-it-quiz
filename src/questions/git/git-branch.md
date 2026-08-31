---
category: Git
description: Version control concepts and Git workflows
icon: git
difficulty: easy
tags: [git, basics]
---

## Question

Which Git command creates a new branch and switches to it?

## Options

- git branch new-branch
- git checkout -b new-branch
- git switch new-branch
- git create new-branch

## Answer

git checkout -b new-branch

## Explanation

`git checkout -b new-branch` creates a new branch and immediately switches to it. This is shorthand for `git branch new-branch` followed by `git checkout new-branch`. The newer `git switch -c new-branch` command achieves the same result and is preferred in modern Git.
