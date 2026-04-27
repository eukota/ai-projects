Layer Definitions
L0 Kernel

The foundational substrate.

Provides primitives required by all higher layers.

Responsibilities
identity primitives
authentication hooks
authorization primitives
process lifecycle model
scheduler interfaces
resource accounting
memory handles
persistence primitives
policy enforcement hooks
audit hooks
system clock / timing
event bus primitives
Example Questions
What is an agent process?
How are resources measured?
How are permissions attached?
L1 Memory + State

Manages context, memory, and durable state.

Responsibilities
session context
working memory
long-term memory
structured state stores
retrieval systems
embeddings/indexes
snapshots
branching state
history logs
memory inheritance
version control for context
garbage collection / compaction
Types of Memory
Ephemeral Memory

Temporary session state.

Working Memory

Current active project/task context.

Durable Memory

Long-lived knowledge retained intentionally.

Shared Memory

Context visible to multiple agents/users.

Derived Memory

Summaries, embeddings, generated artifacts.

Hard Problems
stale context
conflicting updates
memory bloat
privacy boundaries
summarization loss
version drift
L2 Tool / IO Runtime

Connects AI processes to the outside world.

Responsibilities
filesystem access
databases
APIs
web search
shell execution
sensors
messaging systems
email
calendars
code repositories
document stores
output rendering
notifications
Required Properties
permission scoped
observable
retryable
rate-limited
sandboxable
revocable
Analogy

Equivalent to device drivers + system calls + middleware.

L3 Agent Execution

Runs autonomous or semi-autonomous AI workers.

Agent Types
Planner

Breaks work into tasks.

Worker

Executes tasks.

Researcher

Collects information.

Evaluator

Scores outputs.

Refiner

Improves drafts.

Monitor

Watches systems/events.

Tutor

Teaches users.

Coordinator

Manages other agents.

Specialist

Domain expert agent.

Responsibilities
spawn agents
suspend/resume agents
terminate agents
isolate context
assign tools
assign budgets
assign goals
collect outputs
escalate failures
Process Concepts
parent/child agents
background agents
daemon agents
one-shot jobs
supervised workers
L4 Coordination + Workflow

Handles system-wide orchestration.

Responsibilities
task queues
DAG execution
dependencies
retries
timeouts
scheduling
batching
delegation
human approval gates
escalation rules
load balancing
workflow templates
multi-agent collaboration
Example Workflows
Coding Workflow

spec -> plan -> code -> test -> review -> deploy

Research Workflow

question -> gather -> compare -> synthesize -> cite

Personal Assistant Workflow

request -> schedule -> notify -> follow-up

L5 User Applications

Where users experience value directly.

Example Apps
coding copilots
classroom systems
dashboards
personal assistants
design tools
writing systems
business automation
home automation
tutoring platforms
family knowledge systems
maker tools
research assistants
Principle

Applications should rely on lower layers rather than reinventing them.

L6 Federation + External Systems

Coordinates beyond a single runtime.

Responsibilities
connect to cloud models
connect to local clusters
connect to external APIs
communicate with other AIOS instances
shared trust relationships
cross-organization workflows
portable identities
distributed memory exchange
remote execution
Examples
home AIOS + cloud reasoning provider
company AIOS + vendor APIs
school AIOS + student devices
personal AIOS + homelab cluster