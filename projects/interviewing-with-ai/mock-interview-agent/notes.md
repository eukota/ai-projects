# Mock Interview Agent — Implementation Notes

## Context

The `interviewing-with-ai` project has three sections:
1. **candidate-guide** — How candidates perform well in AI interviews (complete, committed)
2. **mock-interview-agent** — Tool for candidates to practice with (planned)
3. **interviewer-rubric** — How interviewers evaluate candidates (legacy materials exist)

## Purpose

Build an AI agent that simulates an interviewer for practicing AI-assisted technical interviews.

## Key Requirements

The agent should:
- Present interview problems (Entry or Senior complexity)
- Respond to candidate questions in real-time
- Allow candidates to ask clarifying questions that constrain scope
- Evaluate candidate performance using the interviewer rubric
- Provide feedback on AI competency demonstration

## Design Considerations

- **Interview problems:** Use Entry-level (chat program) and Senior-level (CI/CD system) examples from candidate-guide/worked-examples/
- **Evaluation:** Should use the rubric from interviewer-rubric section to assess:
  - How well candidate directs the AI
  - Whether candidate thinks critically about AI output
  - Whether candidate blindly accepts or actively iterates
  - Whether candidate articulates thinking out loud
  - Whether candidate controls the narrative through questions
- **Candidate context:** Agent should understand the universal principles (Core Principles, Reading AI Responses, Voice Mode) from candidate-guide/README.md

## Next Steps

1. Define agent interface and interaction model
2. Design evaluation logic using interviewer rubric
3. Build the agent
4. Test with Entry and Senior problems

## Related Files

- `../candidate-guide/01-requirements-and-design.md` — What candidates should demonstrate in Req/Design phase
- `../candidate-guide/02-implementation.md` — What candidates should demonstrate in Implementation phase
- `../candidate-guide/03-testing.md` — What candidates should demonstrate in Testing phase
- `../candidate-guide/README.md` — Universal principles the agent should evaluate against
- `../interviewer-rubric/` — Evaluation criteria for the agent to use

---

*This file exists during implementation and will be removed before completion.*
