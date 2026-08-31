---
category: DevOps
description: CI/CD, containers, deployment, and infrastructure
icon: cloud
difficulty: easy
tags: [docker, containers]
---

## Question

What is the purpose of a Dockerfile?

## Options

- To define database schemas
- To build Docker container images
- To configure load balancers
- To write application tests

## Answer

To build Docker container images

## Explanation

A `Dockerfile` is a text file containing instructions to assemble a Docker image. Each instruction (FROM, RUN, COPY, etc.) creates a new layer in the image. The resulting image can then be run as a container in any environment.
