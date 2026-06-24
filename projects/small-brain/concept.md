# Small Brain Concept

## Thesis

Small Brain is a multi-agent cognitive architecture that builds a personalized decision model of a human by learning their preferences, principles, and meta-priorities through structured interrogation, compression, and conflict resolution.

## Why Single-Brain Architectures Fail

Current AI usage treats models as stateless tools. Even advanced agent frameworks assume a single priority system that can be learned. This fails because:

1. **Human decisions depend on viewing angle.** The same person makes different calls as an SRE, a maker, a parent, or a philosopher. A single AI cannot hold multiple genuine positions simultaneously without collapsing into sycophancy.
2. **AI is fundamentally sycophantic.** A single model instance optimizes for coherence and approval, causing competing internal positions to converge toward what the user wants to hear. This is structural, not a tuning problem.
3. **A single priority stack becomes self-contradicting at sufficient depth.** Conflicts are buried, not resolved.

## The Decision Team Architecture

Small Brain is not a single agent. It is a **team of small brains**—each a focused, independently trained cognitive agent covering a specific domain or viewing angle of the user's decision-making.

### How It Works

Every decision is broadcast to **all** brains simultaneously. No routing. Full broadcast guarantees cross-domain catches that a router would miss.

Each brain returns a position. The orchestrator:
- Identifies **consensus** (silent pass-through—user never sees it)
- Identifies **soft conflict** (picks higher-weighted position, queues for review)
- Identifies **hard conflict** (surfaces to user with all positions and reasoning)

The user resolves hard conflicts. That resolution becomes the richest training signal in the system—it reveals which principle wins when two legitimate ones compete.

### Why Structural Isolation is Required

Separate small brains:
- Are trained independently on specific domains
- Never share context with each other during deliberation
- Cannot sycophantically converge because they never hear each other capitulating
- Vote blind—the orchestrator collects positions before any brain sees another's answer

This is the same reason red teams and design reviews work: isolate critics from each other so social pressure cannot suppress genuine dissent.

## The Fourier Analogy

Any complex function can be approximated to arbitrary precision by summing enough simple wave components (Fourier series). Small Brain applies the same principle:

| Fourier | Small Brain |
|---|---|
| Basis function | Individual small brain (domain) |
| Frequency | Viewing angle / domain |
| Coefficient / weight | Orchestrator weighting |
| Interference | Conflict between brains |
| Phase offset | Meta-principle governing priority |
| Convergence | Sufficient approximation of user's decision function |

You don't need infinite brains—you need enough to approximate the function to sufficient precision. The compression loop finds the minimum set.

## The PAHF Loop

Small Brain is built on PAHF (Personalized Agents from Human Feedback)—a 3-step loop:

1. **Pre-action clarification** — ask before acting
2. **Grounding in memory** — check prior decisions/principles before answering
3. **Post-action correction** — update memory when user corrects output

This loop runs at two levels:

**Level 1—inside each small brain**
Learning domain-specific preferences. The Fourier component itself.

**Level 2—inside the orchestrator**
Learning the phase relationships between brains—how to weight them and how they interfere. What it learns are meta-preferences: how the user prioritizes between competing worldviews.

PAHF is not just a component. It is the recursive pattern the whole architecture is built on.

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

## Milestone Progression

The system is intentionally grown, not built fully-formed. Capability milestones:

1. Single small brain, single domain, interrogation loop only
2. Compression loop runs, principles extracted
3. Second small brain added, first conflict surfaced
4. Orchestrator learns to weight brains from resolved conflicts
5. Meta-principles extracted from conflict resolution patterns
6. Brain controls a single coding agent
7. Brain controls two agents simultaneously
8. Brain can write an orchestrator
9. Brain acts as product manager: given an idea, asks only deployment questions, handles all development, testing, CI autonomously

## Relationship to AIOS

Small Brain is the **cognitive kernel** of AIOS. Where AIOS defines the operating environment (scheduler, memory, tools, permissions, observability), Small Brain defines how the system develops and applies a model of the user's decision-making within that environment.

AIOS principle #5 (Context is a first-class resource) maps directly: principle extraction is context compression—actively managing the context budget by lifting repeated patterns into higher-level abstractions.

AIOS principle #7 (Composability over monoliths) maps to the coding agent side: extract deterministic code from repeated LLM patterns rather than regenerating from scratch.

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

## Relationship to Existing Concepts

Small Brain overlaps with multi-agent systems, decision theory, cognitive science, behavioral economics, knowledge representation, active learning, and alignment research.

It is narrower than those fields—focused on a specific pattern: personal decision modeling through structural isolation and conflict resolution—and yet broader in scope than any of them.
