# Related Repositories

## Core Dependencies

### PAHF: Personalized Agents from Human Feedback

Meta AI Research, February 2026. The foundational 3-step loop: pre-action clarification, grounding in memory, post-action correction. Small Brain extends and multi-instantiates this pattern across a decision team.

Repository: Available on GitHub (Meta AI Research)

### AIOS

This repository. AIOS defines the operating environment. Small Brain is its cognitive kernel—how the system develops and applies a model of the user's decision-making within AIOS's scheduler, memory, tools, permissions, and observability layer.

Repository: `projects/aios/` (this project)

## Related Frameworks

### modAL

Active learning framework on scikit-learn. A lighter alternative for simpler interrogation loops and uncertainty sampling. Useful reference for milestone 1 (single brain, interrogation only).

Repository: [modAL on GitHub](https://github.com/modAL-python/modAL)

## Orchestration and Swarm Coordination

### Dot Star Engine

Swarm orchestration engine for coordinating multiple agents. Small Brain's orchestrator layer (collecting positions, resolving conflicts, broadcasting decisions) is a natural integration target for Dot Star's coordination primitives.

Repository: `projects/dot-star-engine/` (related project)

## Implementation Paths

When Small Brain moves to implementation, those experiments should be linked here and marked as implementation repositories rather than conceptual architecture.
