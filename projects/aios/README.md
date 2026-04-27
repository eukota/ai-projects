# AIOS

## Summary

AIOS explores managed context as an operating layer for AI agents.

## Core Idea

AI project context should be a first-class runtime resource: durable, permissioned, addressable, searchable, and portable across agents and tools.

## Problem

Current AI products often trap project context inside chat silos, uploaded files, or product-specific memory. Agents are then expected to reconstruct context instead of relying on an engineered context substrate.

## Goals

- Make project context durable and portable.
- Separate design, decisions, tasks, artifacts, and implementation code.
- Provide clean APIs or conventions for agents to read and write scoped project context.
- Support multiple agents without losing provenance or state.

## Non-Goals

- This folder is not an implementation repository.
- Executable AIOS prototypes should live in separate repos and be linked here.

## Implementation Repositories

- TBD

## Open Questions

- What are the minimal context primitives AIOS must expose?
- What should be file-backed versus database-backed?
- How should permissions work across agents, humans, projects, and tools?
- What is the right relationship between Git and managed project context?
