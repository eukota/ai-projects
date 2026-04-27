# Architecture Layers

AIOS is currently modeled as a layered architecture.

```text
L0 Kernel
L1 Memory + State
L2 Tool / IO Runtime
L3 Agent Execution
L4 Coordination + Workflow
L5 User Applications
L6 Federation / External Systems
```

## L0 Kernel

The foundational substrate that provides primitives required by all higher layers.

Responsibilities:

- Identity primitives
- Authentication hooks
- Authorization primitives
- Process lifecycle model
- Scheduler interfaces
- Resource accounting
- Memory handles
- Persistence primitives
- Policy enforcement hooks
- Audit hooks
- System clock and timing
- Event bus primitives

Example questions:

- What is an agent process?
- How are resources measured?
- How are permissions attached?

## L1 Memory + State

Manages context, memory, and durable state.

Responsibilities:

- Session context
- Working memory
- Long-term memory
- Structured state stores
- Retrieval systems
- Embeddings and indexes
- Snapshots
- Branching state
- History logs
- Memory inheritance
- Version control for context
- Garbage collection and compaction

## L2 Tool / IO Runtime

Connects AI processes to the outside world.

Responsibilities:

- Filesystem access
- Databases
- APIs
- Web search
- Shell execution
- Sensors
- Messaging systems
- Email
- Calendars
- Code repositories
- Document stores
- Output rendering
- Notifications

Required properties:

- Permission scoped
- Observable
- Retryable
- Rate-limited
- Sandboxable
- Revocable

## L3 Agent Execution

Runs autonomous or semi-autonomous AI workers.

Agent types:

- Planner
- Worker
- Researcher
- Evaluator
- Refiner
- Monitor
- Tutor
- Coordinator
- Specialist

Responsibilities:

- Spawn agents
- Suspend and resume agents
- Terminate agents
- Isolate context
- Assign tools
- Assign budgets
- Assign goals
- Collect outputs
- Escalate failures

Process concepts:

- Parent and child agents
- Background agents
- Daemon agents
- One-shot jobs
- Supervised workers

## L4 Coordination + Workflow

Handles system-wide orchestration.

Responsibilities:

- Task queues
- DAG execution
- Dependencies
- Retries
- Timeouts
- Scheduling
- Batching
- Delegation
- Human approval gates
- Escalation rules
- Load balancing
- Workflow templates
- Multi-agent collaboration

Example workflows:

- Coding: spec -> plan -> code -> test -> review -> deploy
- Research: question -> gather -> compare -> synthesize -> cite
- Personal assistant: request -> schedule -> notify -> follow-up

## L5 User Applications

Where users experience value directly.

Example applications:

- Coding copilots
- Classroom systems
- Dashboards
- Personal assistants
- Design tools
- Writing systems
- Business automation
- Home automation
- Tutoring platforms
- Family knowledge systems
- Maker tools
- Research assistants

Applications should rely on lower layers rather than reinventing them.

## L6 Federation / External Systems

Coordinates beyond a single runtime.

Responsibilities:

- Connect to cloud models
- Connect to local clusters
- Connect to external APIs
- Communicate with other AIOS instances
- Shared trust relationships
- Cross-organization workflows
- Portable identities
- Distributed memory exchange
- Remote execution

Examples:

- Home AIOS plus cloud reasoning provider
- Company AIOS plus vendor APIs
- School AIOS plus student devices
- Personal AIOS plus homelab cluster

