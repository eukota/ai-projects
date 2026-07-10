# Interviewer Rubric — Implementation Notes

## Context

The `interviewing-with-ai` project has three sections:
1. **candidate-guide** — How candidates perform well in AI interviews (complete, committed)
2. **mock-interview-agent** — Tool for candidates to practice with (planned)
3. **interviewer-rubric** — How interviewers evaluate candidates (legacy materials exist, needs update)

## Current State

Legacy rubric materials exist in:
- `teaching-ai/phases/d/ai-solution-strategy/ai-awareness-experience.md`
- `teaching-ai/phases/d/ai-solution-strategy/ai-proficiency.md`
- `teaching-ai/phases/d/ai-solution-strategy/code-proficiency.md`
- `teaching-ai/phases/d/ai-solution-strategy/solution-generation.md`

These materials were previously focused on Entry/Mid/Senior levels, which doesn't align with the new candidate-guide approach.

## Key Insight from Redesign

The new candidate-guide focuses on **strategy and principles**, not performance levels:
- Universal Core Principles (apply to all candidates)
- Reading AI Responses techniques
- Phase-specific strategies
- Advanced techniques

The rubric should evaluate how well candidates **demonstrate and apply these principles**, not categorize them into levels.

## Purpose

The interviewer rubric should:
- Clarify what interviewers look for in AI-assisted interviews
- Evaluate how well candidates apply the strategy principles
- Assess critical thinking (don't blindly accept AI output)
- Assess active direction (push back, iterate, control narrative)
- Assess AI competency demonstration
- Provide consistent evaluation criteria

## Key Evaluation Dimensions

Based on candidate-guide universal principles:

1. **Active Direction of AI** — Does candidate push back, reject, prioritize?
2. **Articulation of Thinking** — Does candidate speak out loud about their reasoning?
3. **Collaboration with AI** — Does candidate work through problems with AI, not just use it?
4. **Narrative Control** — Does candidate ask constraining questions to guide the interview?
5. **Critical Reading of AI Output** — Does candidate think critically, or blindly accept?
6. **Phase-Specific Execution** — How well does candidate execute Requirements & Design, Implementation, and Testing strategies?

## Next Steps

1. Review legacy materials from teaching-ai
2. Redesign rubric around the new principles (not performance levels)
3. Create evaluation criteria for each principle/phase
4. Ensure rubric works for mock-interview-agent evaluation
5. Deprecate and remove legacy materials from teaching-ai once new rubric is complete

## Related Files

- `../candidate-guide/README.md` — Universal principles candidates should demonstrate
- `../candidate-guide/01-requirements-and-design.md` — Req/Design evaluation criteria
- `../candidate-guide/02-implementation.md` — Implementation evaluation criteria
- `../candidate-guide/03-testing.md` — Testing evaluation criteria

---

*This file exists during implementation and will be removed before completion.*
