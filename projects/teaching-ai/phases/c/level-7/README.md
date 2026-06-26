# Level 7: Orchestrating
## 10+ Agents, Hand-Managed

You're now running 10+ Claude Code instances in parallel. They're working on different modules, features, and systems. You're manually coordinating all of them. Tasks are assigned by hand. Feedback is manual. Work is coordinated through your conscious effort—keeping track of who's doing what, when they can start/stop, and how to integrate results.

### Where You Are

Hand-management at scale. It works, but it's wearing on you. You're becoming a conductor, trying to keep all the instruments in time. You're pushing the limits of what one human can orchestrate.

### What Changed From Level 6

| Aspect | Level 6 | Level 7 |
|--------|---------|---------|
| **Agent Count** | 3-5 | 10+ |
| **Task Complexity** | Moderate (parallel) | High (interdependent chains) |
| **Your Role** | Coordinator | Conductor |
| **Bottleneck** | Task dependencies | Your attention |
| **Tracking** | 3-5 contexts | 10+ contexts |
| **Intervention Frequency** | Occasional | Frequent |
| **Sustainability** | Sustainable | Straining |

---

## Understanding This Stage

### Philosophy

Yegge describes this stage: "You are starting to push the limits of hand-management." This is the warning sign. You can do this, and you can do it well for a while. But it's not sustainable. You're essentially running an orchestration system in your head.

This stage is about recognizing a threshold: *hand-management works up to a point, but beyond that point, you need to automate it*. This realization is what drives you to Level 8.

The key insight: you're not *coding* anymore. You're *managing*. If you're spending more time coordinating than thinking about the actual work, you're ready for the next level.

### How It Feels

- Exhilarating and exhausting
- High velocity but high cognitive load
- Context switching is constant
- Some agents idle; some you're juggling
- You feel like a project manager, not a developer

---

## Getting Work Done

### Typical Workflow

1. **Plan the work:** Break a large project into 10-20 independent tasks. This is important; tasks need to be truly independent.

2. **Assign tasks:** Launch agents with specific assignments. "Agent 1: API endpoints A-D. Agent 2: API endpoints E-H. Agent 3: tests for endpoints A-D." Etc.

3. **Monitor:** Watch multiple terminals. Track which agents are working, which are done, which are waiting. Take notes (mental or written) on status.

4. **Coordinate:** When Agent 1 finishes API layer, Agent 11 (who's been waiting) can start the client integration. You're manually managing these dependencies.

5. **Handle conflicts:** When two agents write to the same file, you resolve conflicts or reorganize work to prevent it.

6. **Integrate:** As agents finish, integrate their work. This is non-trivial at scale (10+ agents = 10+ code reviews and merges).

7. **Verify:** Run the full test suite. Fix issues. Iterate.

### Task Decomposition at This Scale

- **By module:** Each agent owns a module or subsystem
- **By layer:** API, database, tests, monitoring—each separate
- **By feature:** Independent features in parallel
- **By system:** Different systems (microservices) in parallel

### Coordination Mechanisms (All Manual)

- You keep notes on what each agent is doing
- You assign tasks in sequence (Agent A finishes, then Agent B can start)
- You re-assign agents if dependencies change
- You manually manage shared resource conflicts

### When It Works

- Tasks are truly independent (no blocking)
- You have good intuition for what's going wrong
- You like being in control and making decisions
- The scope of work justifies the coordination overhead
- Your agents are reliable (you trust them to execute well)

### When It Struggles

- You can't keep track of all agents (information overload)
- Tasks have dependencies you didn't anticipate
- You're context-switching constantly
- Merge conflicts are frequent and complex
- You're making coordination decisions by intuition, not process
- Some agents are idle, waiting for your feedback

### Patterns & Anti-Patterns

#### What Works

- Extremely clear task boundaries (no dependencies between agents)
- Write down the task list and agent assignments
- Use git branches per-agent (easy to track and integrate)
- Short feedback loops (check in frequently, not once per week)
- Prioritize integration over new work (resolve conflicts as they come)
- Have a clear definition of "done" for each task (tests pass, diffs reviewed)
- Know when to say "this is too complex to hand-manage" (the real insight of this level)

#### What Breaks

- Trying to manage more than you can track (mental overflow)
- Tasks with hidden dependencies (Agent 1 blocks Agent 2, but you didn't realize it)
- Slow test suite (you can't validate integration quickly)
- Agent failures requiring intervention (agent gets stuck, you unblock it, back to square one)
- Context thrashing: too many agents, too much switching
- Thinking you can scale this approach indefinitely (you can't)

---

## Growing Here

### Real Projects at This Level

1. **Large System Build:** Build a full system (API, database, tests, monitoring, docs) with 10-15 agents working in parallel. Each agent owns a specific piece. You orchestrate, integrate, and test.

2. **Full Refactor:** Refactor a large codebase in parallel. 10 agents, each refactoring a subsystem. You coordinate and integrate.

3. **Multi-Service Project:** Work across multiple services/modules in parallel. Each agent works on a service. You ensure services integrate correctly.

### The Real Exercise

After completing a large project at this level, reflect: "How much time did I spend orchestrating vs. thinking about the actual work?" The answer should push you toward Level 8.

### Ready to Level Up?

You're ready to move to **Level 8: Autonomous** when:
- Hand-managing 10+ agents feels unsustainable (you're constantly coordinating)
- You're spending more time orchestrating than thinking about the actual work
- You see patterns in what you're doing (assigning tasks, integrating results) that could be automated
- You want to scale beyond hand-management (20+ agents, continuous workflows)
- You're curious about building a system like Gas Town (orchestration as code, not as conscious effort)
