# Level 2: Emerging
## IDE Agent, Permissions On

You've integrated an AI agent directly into your IDE (Claude Code, Cursor, or similar). This agent can see your codebase, run terminal commands, read files, and propose changes—but *only with your permission*. Every action needs your approval before it executes.

### Where You Are

The agent is now in your IDE as a sidebar presence, asking for permission on each tool use. You're building trust gradually, with guardrails in place.

### What Changed From Level 1

| Aspect | Level 1 | Level 2 |
|--------|---------|---------|
| **Agent Location** | Separate chat window | IDE sidebar |
| **Context** | Manual (paste code snippets) | Automatic (sees whole codebase) |
| **Autonomy** | None (you copy results) | Partial (proposes changes, asks permission) |
| **Feedback Loop** | Slow (chat, then manual edit) | Fast (permission → execution → result) |
| **Risk Level** | Low (you decide what to do) | Medium (agent has write access) |
| **Your Focus** | Code author | Code reviewer + author |

---

## Understanding This Stage

### Philosophy

This stage is about building a collaborative relationship. The agent has autonomy *within bounds*. Your job is to:
1. Give clear intent (what you're trying to accomplish)
2. Review what the agent proposes
3. Give feedback (approve, adjust, reject)
4. Repeat until the task is done

The permission requirement is not a bug—it's a feature. It forces you to stay engaged, understand what the agent is doing, and build mental models of when the agent is reliable vs. when it's hallucinating.

### How It Feels

- Agent is present and capable
- You still control every action (permissions)
- There's back-and-forth iteration
- Faster than Level 1, but more cautious than later levels
- You're learning what the agent can do

---

## Getting Work Done

### Typical Workflow

- Describe a task: "Add error handling to this API endpoint"
- Agent proposes a solution (reads files, understands context, writes code)
- You review the diff (often multiple prompts before it's right)
- Agent gets permission to execute (write files, run tests)
- Agent runs tests/linting, you verify the result
- You check in the change

### When It Works Beautifully

- Clear task description with existing code context
- Straightforward changes (add logging, refactor, write tests)
- Agent can run tests to validate its work
- You can review diffs quickly

### When It Grinds

- Task requires knowledge outside the agent's training data
- You keep giving the agent feedback and it's not converging
- Permission prompts become tedious (yes, this is real)
- Agent misunderstands your intent from the description

### Patterns & Anti-Patterns

#### What Works

- Be explicit: "Add validation to this function" beats "make this better"
- Let the agent read the full file/context before proposing changes
- Use agent-provided diffs to understand what's happening
- Reject proposals confidently if they don't match your intent
- Ask the agent to run tests before you approve

#### What Breaks

- Vague requests: "fix this" without clarity on what's broken
- Approving changes you didn't read
- Giving permission to write files without reviewing the diff
- Assuming the agent understands your broader system design
- Fighting every permission prompt; they're there to protect you

---

## Growing Here

### Learning Exercises

1. **Permission Awareness:** Do a small feature (5-10 lines of code). Count how many permission prompts you get. Try the same feature with a different approach—is the number different?

2. **Diff Review Practice:** Ask the agent to refactor a piece of code. Review the diff line-by-line before approving. Can you articulate what changed and why?

3. **Feedback Loop:** Give the agent a task. On the first proposal, reject it with specific feedback. See how the second attempt differs. Do this 3-4 times on one task.

4. **Test-Driven Feedback:** Ask the agent to write a feature and its tests together. Run the tests before approving. Does the agent's test actually verify its implementation?

5. **Scope Clarity:** Give the agent an intentionally vague task. Watch it either ask for clarification or go in an unexpected direction. Learn what clarity looks like.

### Ready to Level Up?

You're ready to move to **Level 3: YOLO** when:
- Permission prompts feel routine, not protective
- You understand when the agent's proposals are reliable
- You trust the agent to make small, low-risk changes without your second-guessing
- You want to turn off permission checks and let the agent move faster
- You're comfortable with the agent executing changes without pre-approval (with the ability to undo)
