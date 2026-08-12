# Meldwerkes Concept

## Thesis

Meldwerkes is a multi-agent cognitive architecture that builds a personalized decision model of a human by learning their preferences, principles, and meta-priorities through structured interrogation, compression, and conflict resolution.

## Why Single-Brain Architectures Fail

Current AI usage treats models as stateless tools. Even advanced agent frameworks assume a single priority system that can be learned. This fails because:

1. **Human decisions depend on viewing angle.** The same person makes different calls as an SRE, a maker, a parent, or a philosopher. A single AI cannot hold multiple genuine positions simultaneously without collapsing into sycophancy.
2. **AI is fundamentally sycophantic.** A single model instance optimizes for coherence and approval, causing competing internal positions to converge toward what the user wants to hear. This is structural, not a tuning problem.
3. **A single priority stack becomes self-contradicting at sufficient depth.** Conflicts are buried, not resolved.

## The Decision Team Architecture

Meldwerkes is not a single agent. It is a **team of meldwerkess**—each a focused, independently trained cognitive agent covering a specific domain or viewing angle of the user's decision-making.

### How It Works

Every decision is broadcast to **all** brains simultaneously. No routing. Full broadcast guarantees cross-domain catches that a router would miss.

Each brain returns a position. The orchestrator:
- Identifies **consensus** (silent pass-through—user never sees it)
- Identifies **soft conflict** (picks higher-weighted position, queues for review)
- Identifies **hard conflict** (surfaces to user with all positions and reasoning)

The user resolves hard conflicts. That resolution becomes the richest training signal in the system—it reveals which principle wins when two legitimate ones compete.

### Why Structural Isolation is Required

Separate meldwerkess:
- Are trained independently on specific domains
- Never share context with each other during deliberation
- Cannot sycophantically converge because they never hear each other capitulating
- Vote blind—the orchestrator collects positions before any brain sees another's answer

This is the same reason red teams and design reviews work: isolate critics from each other so social pressure cannot suppress genuine dissent.

## The Fourier Analogy

Any complex function can be approximated to arbitrary precision by summing enough simple wave components (Fourier series). Meldwerkes applies the same principle:

| Fourier | Meldwerkes |
|---|---|
| Basis function | Individual meldwerkes (domain) |
| Frequency | Viewing angle / domain |
| Coefficient / weight | Orchestrator weighting |
| Interference | Conflict between brains |
| Phase offset | Meta-principle governing priority |
| Convergence | Sufficient approximation of user's decision function |

You don't need infinite brains—you need enough to approximate the function to sufficient precision. The compression loop finds the minimum set.

## The PAHF Loop

Meldwerkes is built on PAHF (Personalized Agents from Human Feedback)—a 3-step loop:

1. **Pre-action clarification** — ask before acting
2. **Grounding in memory** — check prior decisions/principles before answering
3. **Post-action correction** — update memory when user corrects output

This loop runs at two levels:

**Level 1—inside each meldwerkes**
Learning domain-specific preferences. The Fourier component itself.

**Level 2—inside the orchestrator**
Learning the phase relationships between brains—how to weight them and how they interfere. What it learns are meta-preferences: how the user prioritizes between competing worldviews.

PAHF is not just a component. It is the recursive pattern the whole architecture is built on.

### Human Input is Passive

The PAHF loop does not require the user to explicitly invoke it. Input is gathered passively as the user talks to the agent and answers questions. Hooks observe the conversation and capture correction signals automatically. The user is never in "PAHF mode"—they are simply talking.

## Memory Hierarchy

| Level | Contents | How populated | How used |
|---|---|---|---|
| Raw observations | PAHF correction log | Post-action corrections | Feeds compression loop |
| Decisions | Compressed observations | Outer compression loop | Grounds pre-action step |
| Principles | Compressed decisions | Outer compression loop | Top-down inference |
| Meta-principles | Compressed conflict resolutions | Outer compression loop | Orchestrator weighting |

The **pre-action grounding step walks this hierarchy top-down**:

1. Does a principle cover this? → Propose from principle, confirm with user
2. Does a prior decision cover this? → Ground there
3. Neither? → Ask the user

## Context Compression Loop

The PAHF 3-step loop is per-action (inner loop). Context compression is periodic and batch (outer loop). It runs across the full memory store on a schedule.

**Inner loop (per action):** clarify → ground → correct → write to memory

**Outer loop (periodic):**
1. Scan accumulated decisions
2. Detect clusters and recurring patterns
3. Abstract into principles
4. Validate principles against recent decisions
5. Rewrite/compress memory

Without the outer loop, memory grows unbounded and grounding degrades. With it, the agent progressively operates at higher abstraction levels—which is the mechanism behind milestone progression.

**Resolved conflicts are prime compression candidates.** They reveal priority ordering between principles—the data needed to generate meta-principles.

### Brain Split Trigger

The compression loop is also what determines when a second brain is needed. When compression finds a persistent conflict cluster—two principle sets that consistently contradict each other and cannot be resolved into a stable meta-principle after repeated cycles—this is the signal that one brain is holding two incompatible viewing angles.

When this is detected, the system surfaces a single question to the user: **"Should these be separate brains?"** The user decides. If yes, a second brain is created and the conflicting cluster is migrated to it. The trigger is passive (auto-detected by compression); the split decision is always human.

## The Three Loops

| Loop | Trigger | Human input |
|---|---|---|
| PAHF (inner) | Every action | Passive—captured from normal conversation |
| Distillation (outer) | Periodic / volume | Passive trigger; human decides any brain split |
| Multi-brain | Every decision | See resolution settings below |

## Multi-Brain Resolution Settings

When multiple brains vote, the orchestrator resolves conflicts using principles where possible. Two settings control how much autonomy the orchestrator has:

**Principle auto-answer** (toggle)
- **Auto**: When a question can be answered by an existing principle, the orchestrator applies the answer silently without asking the user.
- **Manual**: The orchestrator surfaces the principle it would apply and asks the user to confirm before proceeding.

**Multi-brain conflict resolution** (toggle)
- **Auto**: When brains conflict and the orchestrator can resolve via principles, it does so silently.
- **Manual**: Always escalate conflicts to the user, even if principles could resolve them.

**Hard floor (always active):** When principles cannot resolve a conflict, the orchestrator always escalates to the user regardless of settings. Human override cannot be disabled at this level.

The two toggles are independent. You can have auto principle answers with manual conflict resolution, or vice versa.

## Milestone Progression

The system is intentionally grown, not built fully-formed. Capability milestones:

1. Single meldwerkes, single domain, interrogation loop only
2. Compression loop runs, principles extracted
3. Second meldwerkes added, first conflict surfaced
4. Orchestrator learns to weight brains from resolved conflicts
5. Meta-principles extracted from conflict resolution patterns
6. Brain controls a single coding agent
7. Brain controls two agents simultaneously
8. Brain can write an orchestrator
9. Brain acts as product manager: given an idea, asks only deployment questions, handles all development, testing, CI autonomously

## Relationship to AIOS

Meldwerkes is the **cognitive kernel** of AIOS. Where AIOS defines the operating environment (scheduler, memory, tools, permissions, observability), Meldwerkes defines how the system develops and applies a model of the user's decision-making within that environment.

AIOS principle #5 (Context is a first-class resource) maps directly: principle extraction is context compression—actively managing the context budget by lifting repeated patterns into higher-level abstractions.

AIOS principle #7 (Composability over monoliths) maps to the coding agent side: extract deterministic code from repeated LLM patterns rather than regenerating from scratch.

## Status Report

The system can produce a structured status report at any time:

- **Brains**: how many exist, their domains, when each was created
- **Domain scope per brain**: what kinds of decisions each brain handles
- **Memory state per brain**: principles extracted, confidence levels, meta-principles
- **Decision stats**: total decisions, confirmed vs corrected, correction rate per brain
- **Conflict history**: conflicts surfaced, how they were resolved (orchestrator vs human), unresolved conflicts

The report is a point-in-time snapshot. It is the primary tool for understanding what the system has learned and where it still has gaps.

## Export and Import

A meldwerkes can be exported to a portable format (JSON or structured Markdown) containing its full memory hierarchy: decisions, corrections, principles, and meta-principles. The export includes brain metadata (domain, creation date, settings) but not the conversation history that produced it.

A meldwerkes can be imported from an export. This allows:
- Sharing a trained brain between machines or users
- Bootstrapping a new brain from an existing one
- Backing up and restoring brain state
- Transferring a domain brain from one Meldwerkes installation to another

Imported brains are treated as external until the user explicitly trusts them. Trust affects whether imported principles are applied at full confidence or treated as provisional.

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
11. Human input to the PAHF loop is always passive—never mode-switched.
12. The brain split trigger is passive; the split decision is always human.
13. A brain can be exported and imported as a portable artifact.

## Relationship to Existing Concepts

Meldwerkes overlaps with multi-agent systems, decision theory, cognitive science, behavioral economics, knowledge representation, active learning, and alignment research.

It is narrower than those fields—focused on a specific pattern: personal decision modeling through structural isolation and conflict resolution—and yet broader in scope than any of them.
