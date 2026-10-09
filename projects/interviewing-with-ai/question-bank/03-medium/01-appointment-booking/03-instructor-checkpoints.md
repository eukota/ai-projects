# Instructor checkpoints

| Block | Look for | Intervene if |
| --- | --- | --- |
| Clarify and plan (10 min) | Questions about slot definition, time zone, who can cancel, one booking per person | Student skips to code. Ask them to name two assumptions. |
| Build (30 min) | Slots seeded with stable IDs; booking enforced on the server | Availability is computed only in the UI, or booking checks slot state in the browser. |
| Test and revise (15 min) | Follow-up change introduced only after the core flow works end to end | The change is introduced early. |
| Tradeoffs (5 min) | Student names what they assumed and what they would test next | Discussion stays on code style. |

## Questions to ask during the build

- Where is “is this slot free?” decided, and where is the slot marked taken? Are those one step or two?
- What does a second user see after the first books?
- What happens to the appointment record when it is cancelled?

## Keep observable

Have the student keep two browser windows open from the start. It makes the follow-up change visible without extra setup.

## Debrief

Ask the student to explain the failure in terms of the code they read, not only the symptom. Then ask how they would prove the fix works.
