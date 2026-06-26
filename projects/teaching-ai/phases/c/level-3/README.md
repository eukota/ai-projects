# Level 3: YOLO
## IDE Agent, YOLO Mode

You've turned off permission checks. The agent can now read files, write code, run terminal commands, and execute changes *without asking*. Trust is high. The agent is wider in scope. You're moving from "approve each action" to "monitor the work and step in if things go wrong."

### Where You Are

YOLO mode activated. The agent moves fast. You move fast. The safety rail is your ability to undo changes and restart.

### What Changed From Level 2

| Aspect | Level 2 | Level 3 |
|--------|---------|---------|
| **Permissions** | Required for each action | Disabled; agent is autonomous |
| **Feedback Speed** | Slow (wait for approval) | Fast (agent acts immediately) |
| **Oversight Model** | Pre-hoc (review before action) | Post-hoc (monitor & intervene) |
| **Scope** | Narrow (constrained agent) | Wider (agent expands naturally) |
| **Velocity** | Moderate | High |
| **Risk** | Lower (you control each action) | Higher (trust-based) |

---

## Understanding This Stage

### Philosophy

YOLO mode is about velocity. The idea is simple: you trust the agent enough to let it move without asking permission for every keystroke. This unlocks a different kind of collaboration—you can iterate rapidly, ask the agent to try multiple approaches, and move forward at the agent's speed instead of waiting for permission dialogs.

The name is intentional. There's risk here. The agent can make mistakes. Your job is to:
1. Stay aware of what's happening (check diffs, run tests)
2. Set clear boundaries (what the agent should and shouldn't touch)
3. Catch mistakes early (review output, run tests frequently)
4. Know how to undo (git reset, command line recovery)

### How It Feels

- Less friction; no permission prompts
- More fluid iteration
- Agent moves at full speed
- You're watching, not approving
- Excitement and some risk

---

## Getting Work Done

### Typical Workflow

- Describe a task in detail
- Agent starts working; you watch the progress
- Agent proposes multiple changes, writes code, runs tests
- You skim diffs as they appear (or review after, depending on risk tolerance)
- Tests pass or fail; agent responds to feedback
- Task complete; you review the full changeset before committing

### The Vibe

- Less "let me review each line" and more "let me check the test results"
- More "try this approach, then try that one" iterations
- Agent frequently outputs diffs; you monitor but don't interrupt every time
- Work feels fluid, not procedural

### When It Shines

- Large refactors with clear intent
- Multi-step tasks (feature → tests → documentation)
- Iterative design (try → test → adjust → try again)
- Working in codebases the agent knows well

### When It Hurts

- Vague intent: agent goes in unexpected directions
- Risky changes (migrations, deletions) without clear boundaries
- Not running tests frequently
- Not reviewing the final changeset before commit

### Patterns & Anti-Patterns

#### What Works

- Start YOLO with low-risk tasks (tests, docs, formatting)
- Set explicit boundaries: "Don't touch the database layer"
- Monitor test results closely; they're your early warning system
- Review final diffs before committing (YOLO ≠ reckless)
- Keep git clean so you can easily revert
- Use YOLO for velocity on tasks you understand deeply

#### What Breaks

- Vague requests in unfamiliar code
- Ignoring test failures or warnings
- Giving the agent tasks that span multiple systems
- Approving commits without reading the diffs
- Using YOLO for everything; some tasks need careful review
- Not understanding what "undo" means in your context

---

## Growing Here

### Learning Projects

#### Low-Risk (Safe Experimentation)

1. **Refactor with Intent:** Ask the agent to refactor a function for readability. YOLO mode on. Watch it work, skim diffs. Review the final result. How different is it from what you'd write?

2. **Test Generation:** Have the agent write tests for existing code (no implementation changes). Run them. Do they catch real bugs in the implementation?

3. **Documentation Sprint:** Ask the agent to document a module (comments, docstrings, README). YOLO mode. Skim the changes, read the final output. Is it accurate?

#### Real Projects (Still Low-to-Medium Risk)

1. **Feature with Tests:** Build a feature with the agent in YOLO mode. Have it write code *and* tests. You review diffs and test results, then commit.

2. **Multi-File Refactor:** Refactor across 3-5 files (e.g., renaming a pattern, extracting utilities). Let the agent do the work; you run tests and review the final state.

### Ready to Level Up?

You're ready to move to **Level 4: Expanding** when:
- YOLO mode feels natural; you're comfortable with agent-driven changes
- You've caught and fixed a few agent mistakes; you know what to look for
- Test-driven development is your habit (running tests frequently)
- You want the agent to grow even bigger—taking on larger features, more architectural decisions
- You're curious about the agent taking up more screen real estate and your role shifting further toward review
