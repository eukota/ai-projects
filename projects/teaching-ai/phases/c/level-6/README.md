# Level 6: Swarming
## CLI, Multi-Agent YOLO

You're now running 3-5 Claude Code instances in parallel, all working on different pieces of the same project simultaneously. Diffs stream in from multiple agents. Outputs are chaotic and overlapping. Test results come back from different agents at different times. It's productive chaos.

### Where You Are

Multiple agents, full autonomy, high throughput. You're monitoring and coordinating work across parallel streams, not writing code. Velocity is very high.

### What Changed From Level 5

| Aspect | Level 5 | Level 6 |
|--------|---------|---------|
| **Agent Count** | 1 | 3-5 in parallel |
| **Output Volume** | Single stream | Multiple overlapping streams |
| **Context Isolation** | Single agent sees everything | Each agent has narrow scope |
| **Coordination** | Implicit (single agent) | Explicit (you coordinate) |
| **Merge Complexity** | Simple | Conflicts possible |
| **Velocity** | Very high | 2-3x higher |
| **Complexity** | Moderate | High (more to track) |

---

## Understanding This Stage

### Philosophy

Yegge calls this "CLI, multi-agent, YOLO": you're very fast. The idea is that you've learned enough to split work effectively across agents. Each agent is assigned a specific subtask with clear boundaries. They work in parallel. You monitor and integrate results.

This requires a different kind of thinking: **task decomposition**. You're not just describing features; you're describing features *in a way that agents can work on in parallel without interfering with each other*.

The trade-off: you lose fine-grained control for massive velocity gains. You're betting that with good decomposition and clear boundaries, agents can work autonomously and you can integrate their results quickly.

### How It Feels

- Chaos and harmony at the same time
- Much faster output
- More to monitor
- Context switching is constant
- Exhilarating when it works, frustrating when agents step on each other

---

## Getting Work Done

### Typical Workflow

1. **Decompose the work:** Think through what needs to happen. Identify independent streams. Example: "Agent A: write the API layer. Agent B: write the database migrations and models. Agent C: write tests and integration."

2. **Start agents:** Launch 3-5 Claude Code instances, each with a specific task and constraints ("don't touch the API layer" or "only modify the auth module").

3. **Monitor in parallel:** Watch multiple terminals. You're looking for test failures, errors, or signs that agents are stepping on each other.

4. **Intervene as needed:** If agents conflict, give clarifying feedback. If an agent gets stuck, jump in. Most of the time, let them work.

5. **Integrate results:** As agents finish, integrate their work. Usually straightforward (separate files), sometimes requires conflict resolution (both agents modified the same file).

6. **Run full test suite:** Verify the integrated system works end-to-end.

### Task Decomposition Examples

- **Large feature:** Agent A: core logic. Agent B: tests. Agent C: documentation and monitoring.
- **Multi-system work:** Agent A: API changes. Agent B: database schema and migrations. Agent C: client-side code.
- **Refactoring:** Agent A: core changes. Agent B: dependent modules. Agent C: tests.

### Context Management

- Each agent has a narrow, well-defined scope
- You give each agent explicit constraints ("API layer only," "database module only")
- Agents know what files they can't touch
- You can update an agent if context drifts or task changes

### When It Flows

- Work is truly parallelizable (not all tasks are)
- Agents don't interfere (clear boundaries)
- Tests catch integration issues fast
- You're comfortable switching between agent contexts
- Feedback is high-level (not constant micro-corrections)

### When It Breaks

- Tasks are interdependent (Agent B needs Agent A's result to proceed)
- Vague boundaries; agents step on each other constantly
- Test suite is slow; you can't get quick feedback
- Context thrashing: you're constantly updating agents on changes
- Too many agents; you can't track what's happening

### Patterns & Anti-Patterns

#### What Works

- Clear, independent subtasks with explicit boundaries
- Strong test suite (your integration verification)
- Minimal coupling between agent workstreams
- Start with 3 agents, add more only if coordination is smooth
- Monitor test failures actively; they'll tell you about conflicts
- Keep git clean and frequently commit integrated results
- Document the division of labor (which agent does what)

#### What Breaks

- Highly coupled tasks (Agent A depends on Agent B's output before starting)
- Vague boundaries; agents invade each other's territory
- Slow test suite; you can't verify integration quickly
- Too many agents; loss of visibility and coordination
- Not catching merge conflicts early (review final diffs)
- Assuming agents won't interfere; they will with unclear boundaries
- Giving agents contradictory information

---

## Growing Here

### Real Projects at This Level

1. **Multi-System Feature:** Build a feature that spans API, database, and tests. Split across 3 agents: API (agent 1), database and models (agent 2), tests and integration (agent 3). Verify the final system works.

2. **Large Refactor:** Refactor a significant codebase using multiple agents. Example: extract utilities into a shared library (agent 1), update all import sites (agent 2), update tests (agent 3). Coordinate carefully.

3. **Parallel Features:** Build two independent features in parallel (agent 1: feature A, agent 2: feature B). You coordinate, verify, and integrate.

4. **System Upgrade:** Upgrade a major dependency across multiple affected systems. Agent A: core library updates. Agent B: API layer updates. Agent C: client updates. Verify end-to-end.

5. **Scaling Refactor:** Refactor code to support scale (add caching, optimize queries, add monitoring). Split work across agents. Integrate and test under load.

### Ready to Level Up?

You're ready to move to **Level 7: Orchestrating** when:
- 3-5 agents feels smooth; you want to scale to more parallel work
- Task decomposition is natural to you (you think in independent streams)
- You're hitting the limits of manual coordination
- You want to see what 10+ agents can do
- You're starting to think about how to automate the orchestration itself (Level 8)
