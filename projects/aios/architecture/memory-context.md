# Memory and Context

Context is a first-class AIOS resource.

## Memory Types

Ephemeral memory:

Temporary session state.

Working memory:

Current active project or task context.

Durable memory:

Long-lived knowledge retained intentionally.

Shared memory:

Context visible to multiple agents or users.

Derived memory:

Summaries, embeddings, generated artifacts, and other computed context.

## Context Consistency Problem

Many agents may read and write shared context across layers. The system must preserve coherence.

Risks:

- Stale reads
- Conflicting writes
- Permission leaks
- Duplicate facts
- Race conditions
- Contradictory summaries
- Lost updates
- Runaway context growth

Possible strategies:

- Versioned context
- Immutable snapshots
- Append-only logs
- Branch and merge model
- Ownership boundaries
- Leases and locks
- Confidence metadata
- Provenance tracking
- Human review checkpoints

## Hard Problems

- Stale context
- Conflicting updates
- Memory bloat
- Privacy boundaries
- Summarization loss
- Version drift

