# AIOS

Status: Concept / Incubating

## Summary

AIOS is a conceptual architecture for structured AI execution.

It treats modern AI workflows not as isolated chat sessions, but as a computing environment requiring operating-system-like capabilities: multi-model execution, memory management, context consistency, permissions, scheduling, tool access, persistent work, workflows, agent coordination, observability, and user applications.

AIOS is not a chatbot wrapper. It is a systems-level framework for reliable AI work across many models, agents, tools, and users.

## Core Idea

AI project context should be a first-class runtime resource: durable, permissioned, addressable, searchable, and portable across agents and tools.

## Problem

Current AI products often trap project context inside chat silos, uploaded files, or product-specific memory. Agents are then expected to reconstruct context instead of relying on an engineered context substrate.

Users often work across chat interfaces, coding agents, local models, hosted frontier models, scripts, documents, disconnected memory systems, multiple devices, and multiple tools. This creates repeated explanations, weak handoffs, duplicated memory, inconsistent outputs, poor observability, and no durable process model.

## Goals

- Make project context durable and portable.
- Separate design, decisions, tasks, artifacts, and implementation code.
- Provide clean APIs or conventions for agents to read and write scoped project context.
- Support multiple agents without losing provenance or state.
- Coordinate models, agents, tools, memory, workflows, permissions, and users as a coherent system.
- Preserve inspectability and human override.

## Non-Goals

- This folder is not an implementation repository.
- Executable AIOS prototypes should live in separate repos and be linked here.
- AIOS is not one specific model, one chatbot product, one vendor platform, or an AGI claim.

## Key Documents

- [Concept](concept.md)
- [Use Cases](use-cases.md)
- [Open Questions](open-questions.md)
- [Architecture Layers](architecture/layers.md)
- [Model Routing](architecture/model-routing.md)
- [Memory and Context](architecture/memory-context.md)
- [Permissions and Security](architecture/permissions-security.md)
- [Scheduling and Workflows](architecture/scheduling-workflows.md)
- [Observability and Reliability](architecture/observability-reliability.md)
- [Related Repositories](related-repos.md)

## Implementation Repositories

- TBD

## Open Questions

- What are the minimal context primitives AIOS must expose?
- What should be file-backed versus database-backed?
- How should permissions work across agents, humans, projects, and tools?
- What is the right relationship between Git and managed project context?
