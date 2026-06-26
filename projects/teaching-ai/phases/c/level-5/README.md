# Level 8: Autonomous
## Building Your Own Orchestrator

You've built a system that orchestrates agents automatically. This isn't Gas Town (Yegge's specific implementation), but it's the same idea: instead of manually assigning tasks to agents, you define workflows as code, and the system coordinates agents to execute them. Agents work autonomously; you build and tune the orchestration system.

### Where You Are

You're on the frontier. You're no longer a conductor waving your hands to keep time; you've automated the conducting. You're now an architect of the orchestration system itself. Agents manage agents.

### What Changed From Level 7

| Aspect | Level 7 | Level 8 |
|--------|---------|---------|
| **Orchestration** | Manual (in your head) | Automated (as code) |
| **Your Role** | Conductor | System architect |
| **Agent Assignment** | Hand-assigned per task | Dynamic (system assigns) |
| **Scalability** | Limited by attention | Limited by infrastructure |
| **Work Definition** | Implicit (you know it) | Explicit (workflows as code) |
| **Failure Recovery** | Manual | Automated (retries, fallbacks) |
| **Throughput** | Limited by coordination | Massive (100+ agents possible) |

---

## Understanding This Stage

### Philosophy

Yegge's Gas Town is a specific orchestration system. The philosophy is: "You are a Product Manager, and the Gas Town system is an Idea Compiler."

This is the inversion of hand-management. Instead of you deciding what to do and agents executing, you *describe what you want done* and the system figures out how to execute it with agents. The system:

1. Breaks the work into atomic tasks (Yegge calls these "Beads")
2. Organizes tasks into workflows (Yegge calls these "Molecules")
3. Assigns tasks to agents dynamically
4. Handles failures and retries
5. Manages dependencies between tasks
6. Provides visibility into what's happening

The principle Yegge emphasizes: **"Throughput over Precision"**. The goal is not perfect execution; it's sustained, reliable execution at high volume. Some tasks might fail, some work might be discarded—but the overall flow keeps moving.

### How It Feels

- Freedom (coordination is automated)
- Responsibility (you're building the orchestrator)
- Abstraction (thinking in workflows, not agents)
- Frontier (this is new; there's no playbook)

---

## Getting Work Done

### Typical Workflow at This Level

1. **Define the work as a workflow:** Instead of "Agent 1 does X, Agent 2 does Y," you define: "Task A → Task B → Task C" with explicit dependencies and success criteria.

2. **Launch the orchestrator:** Start the orchestration system (your Gas Town, essentially). It reads the workflow definition.

3. **The system executes:** Agents spin up as needed. Agents claim tasks. Agents report back. The system assigns the next task based on dependencies.

4. **You monitor:** You watch the system execute. You see workflow progress, task status, agent utilization. You're not managing agents; you're monitoring the system.

5. **The system recovers:** If a task fails, the system retries (with backoff). If an agent crashes, the task is reassigned. The workflow keeps moving.

6. **You build:** While the system is executing one workflow, you're designing the next one. Or you're improving the orchestrator itself.

### Key Concepts (Inspired by Gas Town)

- **Beads:** Atomic units of work (a single task, clearly defined, testable)
- **Molecules:** Workflows made of Beads chained together with dependencies (e.g., "write code → run tests → review → commit")
- **Hooks:** Persistent storage for work (where tasks live and agents update them)
- **GUPP:** "Gastown Universal Propulsion Principle" — if there's work, agents must run it. This keeps the system moving.
- **Formulas:** Reusable workflow templates (e.g., "release process" or "refactor workflow")

### Scale Characteristics

- At Level 7 (hand-managed): 10-20 agents, you're drowning in coordination
- At Level 8 (orchestrated): 100+ agents, system handles coordination
- The scaling is exponential when orchestration is automatic

### When It Shines

- Repeated workflows (running the same process many times)
- Large projects with clear task dependencies
- Continuous work (new features, refactors, releases)
- You want to focus on *what* (the workflow design), not *how* (agent assignment)

### When It's Complex

- Initial setup is significant (you're building the orchestrator)
- Debugging is harder (multiple layers: orchestrator, agents, tasks)
- Failure modes are more diverse (task failure, agent crash, dependency broken)
- You need strong testing to ensure the orchestrator works reliably

### Patterns & Anti-Patterns

#### What Works

- Start simple: design one workflow, automate it, iterate
- Make tasks atomic and testable (clear success criteria)
- Define dependencies explicitly (the system needs to understand the relationship)
- Build in observability (logs, metrics, dashboards showing workflow progress)
- Test the orchestrator itself (simulated failures, edge cases)
- Think in terms of recovery (what if this task fails? The system should retry.)
- Use idempotency (if a task runs twice, the result is the same)

#### What Breaks

- Starting too ambitious (building the "perfect" orchestrator upfront)
- Tasks that are too large (if a task is "refactor the entire API," the system can't parallelize)
- Weak task definitions (ambiguous success criteria)
- Ignoring failure modes (assuming tasks always succeed)
- Over-engineering (building features you don't need)
- Not automating repetitive patterns (if you're defining the same workflow by hand repeatedly, you should template it)

---

## Growing Here

### Real Projects at This Level

1. **Orchestrated Build Pipeline:** Design a release workflow: code changes → run tests → build → deploy → smoke tests → rollback if needed. Define as molecules and beads. Have the orchestrator execute it.

2. **Continuous Refactoring:** Design a refactoring workflow that can run continuously in the background (extract utilities, update imports, run tests). Define the dependencies. Let the orchestrator run it repeatedly.

3. **Multi-Agent Feature Development:** Design a workflow where a feature goes through: design → API implementation → database → tests → integration → review → release. Each step might involve multiple agents. The orchestrator coordinates.

4. **System Scaling Project:** Take a single-agent workflow from Level 5, decompose it into parallel tasks, define the dependencies, and have the orchestrator execute it at scale (10x the work in the same time).

5. **Custom Orchestrator MVP:** Build a minimal orchestrator (you can start with simple scripts, evolve to a proper system). It should: define tasks, assign them to agents, track progress, handle failures, report results.

---

## The Frontier

Yegge describes Gas Town as "the tip of a deep iceberg." Building your own orchestrator puts you on that frontier:

- You're learning about distributed systems (agents are like nodes in a network)
- You're thinking about reliability and fault tolerance
- You're designing human-AI workflows that scale
- You're contributing to the emerging practice of AI-assisted software engineering

This is the bleeding edge. There's no playbook yet. Every orchestrator is different; every team will build something different. But the pattern is clear: **as you scale agents, you must automate their coordination**.

### Continuing from Here

After Level 8, the frontier opens up:

- **System Design:** How do you design orchestration systems for different domains (refactoring, feature development, testing, deployment)?
- **Observability:** How do you understand what's happening in a system with 100+ agents?
- **Reliability:** How do you ensure workflows complete reliably, even when tasks fail?
- **Optimization:** How do you structure workflows for maximum parallelism and minimum latency?
- **Evolution:** How do you improve the orchestrator over time as you learn what works?

These are open questions. You're at the frontier. Your answers will shape how teams use AI in the future.
