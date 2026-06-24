# Small Brain

Status: Concept / Incubating

## Summary

Small Brain is a multi-agent cognitive architecture that builds a personalized decision model of a human by learning their preferences, principles, and meta-priorities through structured interrogation, compression, and conflict resolution.

It treats human decision-making not as a single optimizable priority stack, but as a team of specialized, isolated cognitive agents—each representing a genuine worldview or domain of expertise—that deliberate independently and broadcast their positions simultaneously.

Small Brain is not a single AI that learns your preferences. It is a structured system of small cognitive agents that vote blind, surface genuine conflicts instead of sycophantically converging, and grow progressively more capable through principled compression of decision patterns.

## Core Problem

Current AI systems treat users as having a single, coherent priority system. This fails because:

- Human decisions depend on context and role. You make different calls as an SRE, a maker, a parent, and a philosopher. No single model can hold multiple genuine positions without collapsing into sycophancy.
- Single-model systems are structurally sycophantic. A unified agent optimizes for coherence and user approval, suppressing dissent and forcing competing principles to converge.
- A single priority stack becomes self-contradicting at sufficient depth.

## Solution: The Decision Team

Small Brain solves this through **structural isolation**—separate small brains, trained independently on specific domains, that deliberate without hearing each other until all positions are collected.

Every decision broadcasts to all brains. Each brain returns a position. The orchestrator identifies consensus (silent), soft conflicts (picked and queued for review), and hard conflicts (surfaced to the user with full reasoning). The user resolves hard conflicts. That resolution becomes the richest training signal in the system—it reveals which principle wins when two legitimate ones compete.

## Design Principles

1. Multi-brain is required, not optional—sycophancy makes single-brain architectures structurally unreliable for genuine conflict.
2. Every decision broadcasts to all brains—no routing.
3. Brains vote blind—no brain sees another's position before voting.
4. Conflict surfaced is more valuable than conflict resolved—escalate hard conflicts to the user with full reasoning.
5. Resolved conflicts are the richest training signal in the system.
6. The outer compression loop is what enables milestone progression.
7. The memory hierarchy is walked top-down during grounding.
8. The system is grown through milestones, not built fully-formed.
9. PAHF is the recursive pattern at every level of the architecture.
10. Human override must always exist.

## Key Documents

- [Concept](concept.md)
- [Use Cases](use-cases.md)
- [Open Questions](open-questions.md)
- [Related Repositories](related-repos.md)

## Core Architecture

See [Concept](concept.md) for:

- The Decision Team model
- The Fourier analogy and why multi-brain is required
- The PAHF Loop (Personalized Agents from Human Feedback)
- Memory Hierarchy and context compression
- Milestone progression and capabilities

## Non-Goals

- This folder is not an implementation repository.
- Small Brain implementations should live in separate repos and be linked here.
- Small Brain is not a product, vendor platform, or AGI claim.
