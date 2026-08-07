# Open Questions

## Resolved

- **What triggers the outer compression loop?** — Volume/drift detected. The loop also detects persistent conflict clusters that cannot be resolved into meta-principles, which triggers the brain split question.
- **What triggers spinning up a second brain?** — The distillation loop surfaces unresolvable conflict clusters. The split decision is always human. See concept.md: Brain Split Trigger.
- **What does the conflict surfacing UI/interface look like?** — Controlled by two settings: principle auto-answer toggle and multi-brain conflict resolution toggle. Hard floor: unresolvable conflicts always escalate to human.
- **How does Small Brain integrate with Claude Code's CLAUDE.md / project context system?** — As a plugin in the claude-marketplace. PAHF input is passive, gathered via conversation hooks. No explicit user-facing mode.

## Open

- What is the right domain decomposition for the first set of small brains? (Domain-based: SRE, maker, parent—or cognitive-mode-based: risk evaluator, opportunity seeker, efficiency optimizer?)
- What is the minimum number of brains needed for a useful approximation?
- How are brain weights initialized before enough conflict data exists?
- Should brains share a constitutional layer (cross-cutting principles) or be fully isolated?
- How is the blind voting mechanism enforced technically?
- How should memory be represented—SQL, vector DB, triple store, or hybrid?
- What is the minimum set of primitives needed to implement a small brain?
- Can brains specialize further mid-flight (sub-domain branching)?
- How should principled conflict differ from uncertainty or missing information?
- How does the system handle stale or contradicted principles?
- Should brains have memory of their own deliberation process, or only final positions?
- How is credit assignment determined when multiple brains influence an outcome?
- What is the export format for a brain? (JSON, structured Markdown, SQLite dump?)
- What does "provisional trust" mean for an imported brain in practice—how does confidence decay or grow?
- How many unresolvable cycles before the compression loop surfaces a brain split question?
- What is the right granularity for the status report—per brain, per domain, per time window?
