# Instructor checkpoints

| Minute | Look for | Intervene if |
| --- | --- | --- |
| 0–3 | Student asks clarifying questions before prompting | They paste the request straight to the AI. Ask: “What could go wrong with this sentence?” |
| 3–8 | Assumptions written down: identity, ordering, what “helped” does | Ordering or identity is left implicit. |
| 8–15 | First flow works: join, list with positions | The AI built accounts, a database, or websockets. Ask them to cut scope. |
| 15–20 | Student reads generated code, not just runs it | Position is stored rather than derived, or ordering uses client time. |
| 20–25 | Duplicate-submission handling and a visible check | Only the button is disabled; the server still accepts duplicates. |

## Questions to ask during the build

- What does “the same student” mean here, and where is that enforced?
- Is a position stored or computed? What breaks if you store it?
- What happens if two students join in the same moment?

## Between approaches

Reset the starter. Confirm which single dimension changes (see [small pacing](../../01-shared/01-small-pacing.md)). Do not hint at fixes found in approach A.

## Comparison

Use the [comparison rubric](../../01-shared/03-comparison-rubric.md). For this exercise, compare when each approach first noticed the duplicate-submission problem.
