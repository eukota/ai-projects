# Teaching AI Material Map

Organized by four phases. Learners can follow A→B→C or enter at any phase.

---

## PHASE A: Foundation

**Level 0: Overcoming Fear & Building Motivation**

Goal: Help people see AI as opportunity, not threat. Acknowledge concerns. Establish why learning AI matters.

### Current Material:
- **vision.md** — Mission, identity, central beliefs about AI as force multiplier
- **risks.md** — Honest discussion of hallucinations, cheating, dependency, privacy, job loss + responses
- **tracks.md** (K-12, Homeschool section) — Safe, empowering, hands-on framing

### Entry Point:
Anyone hesitant, fearful, or skeptical about AI.

---

## PHASE B: General Capability

**Levels 1-3: Progressive Learning for Everyone Motivated to Learn AI**

Goal: Build practical AI capability for any learner—students, professionals, makers. Not specialized yet.

### Current Material:

**Foundational Concepts:**
- **ai-unlocked.md** — Core capabilities (ask better questions, break into AI-assistable tasks, verify outputs, build workflows, understand model tradeoffs)
- **sample-agents.md** — Concrete agent examples (research, tutor, coder, planner, questioner, verifier) with authentic use cases

**Implementation Models:**
- **tracks.md** (AI in Classroom, AI-Native Course Design) — How AI fits into structured learning environments
- **concepts/ai-native-course-model.md** — Detailed course architecture (instructor layer, student AI assistant, course skills, analytics)

### Entry Point:
Anyone ready to learn AI. Can follow A→B or skip A and start here.

---

## PHASE C: Engineering Fundamentals

**Levels 4-11: Yegge's 8 Stages of AI Developer Evolution**

Goal: Engineers already committed to AI. Progress through the developer maturity curve from IDE-based agents to orchestration.

### Yegge's 8 Stages (Levels 4-11):

**Level 4: Stage 1 — Zero or Near-Zero AI**
- Maybe code completions, sometimes ask Chat questions
- Traditional development with minimal AI assistance

**Level 5: Stage 2 — IDE Agent, Permissions On**
- Narrow coding agent in sidebar asks permission to run tools
- Building trust, learning agent capabilities within constraints

**Level 6: Stage 3 — IDE Agent, YOLO Mode**
- Trust goes up, turn off permissions, agent gets wider
- Delegating more to the agent, less oversight

**Level 7: Stage 4 — IDE, Wide Agent**
- Agent gradually grows to fill the screen
- Code is now diffs; human reviews changes vs. creates code

**Level 8: Stage 5 — CLI, Single Agent**
- Move to command line, single agent instance
- YOLO mode; diffs scroll by; human may or may not look

**Level 9: Stage 6 — CLI, Multi-Agent YOLO**
- Regularly use 3-5 parallel agent instances
- High velocity, fluid workflows

**Level 10: Stage 7 — 10+ Agents, Hand-Managed**
- Starting to push limits of manual hand-management
- Need for better coordination systems emerging

**Level 11: Stage 8 — Building Your Own Orchestrator**
- Automating agent workflow, coordinating many agents
- On the frontier of developer experience with AI

### Reference Material:
- **Steve Yegge's "Welcome to Gas Town"** — The 8 stages framework + Gas Town orchestration example

### Entry Point:
Engineers who already want to learn AI. Can follow A→B→C or skip A+B and start here (assume self-motivation).

---

## PHASE D: Frontier

**Levels 12+: Emerging AI Engineering Systems**

Goal: Understand and navigate the frontier of AI engineering—systems, tools, architecture, and practices still forming.

### Interview Track

**[Interview Preparation](phases/d/interview-prep/)**
- 7-module teaching course: interview strategy, requirements, design & implementation, testing, communication, mock interviews, self-assessment
- Entry/Mid/Senior examples for each phase
- Practical frameworks for demonstrating AI proficiency under interview constraints

**[AI Solution Strategy](phases/d/ai-solution-strategy/)**
- Evaluation rubric for AI-assisted technical interviews
- Three top-level criteria: AI Awareness/Experience, Code Proficiency, AI Proficiency
- Three solution phases: Requirements, Design & Implementation, Testing
- Four performance levels (Non-Passing/Entry/Mid/Senior) with examples and training recommendations

### Architecture & Systems Track

**[AI Stack](phases/d/ai-stack/)**
- End-to-end agentic toolchains from context management to observability
- Core components: context management, agent orchestration, execution & iteration, observability & monitoring, safety & guardrails
- Practical framework for understanding what a complete AI system requires
- Evolving as patterns and best practices emerge

**[Event Horizon](phases/d/event-horizon/)**
- Self-learning agents and agentic evolution
- Philosophical and technical questions: autonomy, adaptation, emergence, model selection
- Exploration of agents that improve themselves and move beyond initial programming
- Conversation-starting topics on the frontier of AI capability

### Entry Point:
Engineers who have mastered Yegge's progression (Phase C, Levels 4-11) and want to:
- Perform well in AI-assisted interviews (Interview Track)
- Understand complete agentic systems and emerging frontier (Architecture & Systems Track)

---

## LECTURE SERIES (Separate / Complementary)

Standalone outreach presentations. Can reference phases/levels but are not part of the progression structure itself.

### Current Presentations:

**CPH Colloquium: "AI as a System — From Tools to Agents to Orchestration"**
- Audience: Cal Poly Humboldt students, faculty, community
- Purpose: Inspiration + high-level capability overview
- Maps to: Phases A-B and elements of Phase C

**RCM Seminar: "Practical AI for Families, Teachers, and Students"**
- Audience: Redwood Coast Montessori community
- Purpose: Accessible intro + practical use cases
- Maps to: Phase A → early Phase B

---

## Engineer Course Structure (Two Levels)

The new engineering course teaches two different specializations of Phase C + Phase D:

### Level 1: "Get Really Good at AI Coding"
Focus: Mastering Yegge's progression (Levels 4-11) + selected frontier concepts
- Deepen capability in each stage
- Understand tradeoffs and when to level up
- Build judgment about tool selection and workflow design
- Touch on emerging systems (observability, context management, guardrails)

### Level 2: "Perform Well in Interviews with AI"
Focus: Yegge's progression (Levels 4-11) + interview-specific frontier depth
- Know where you are in your progression
- Articulate your journey and decisions
- Answer questions about tool tradeoffs and system design
- Demonstrate understanding of emerging frontier (what's coming, why it matters)
- Real-time problem-solving and communication under pressure

---

## Summary: Material Status

| Phase | Levels | Status | Key Material | Next Steps |
|-------|--------|--------|---------------|-----------|
| **A** | 0 | ✅ Complete | vision, risks | — |
| **B** | 1-3 | ⚠️ Partial | ai-unlocked, sample-agents, tracks, ai-native-model | Explicit level progression |
| **C** | 4-11 | 🔄 Framework Ready | Yegge's 8 stages (Gas Town reference) | Deep docs for each stage |
| **D** | 12+ | 🔄 Framework Ready | Interview track, AI Stack, Event Horizon | Build out content for each track |
| **Presentations** | — | ✅ Good | CPH Colloquium, RCM Seminar | Optional: expand for engineer track |

---

## Next Steps

1. **Build Phase C content** — Deep documentation for each of Yegge's 8 stages (what does each level mean, what skills are needed, what tools/workflows fit)
2. **Build Phase D content** — Expand each of the four tracks with deeper material:
   - Interview Prep: Add video walkthroughs, practice scenarios, real interview examples
   - AI Solution Strategy: Add case studies, company-specific rubric variations
   - AI Stack: Document each component with implementation patterns and tool comparisons
   - Event Horizon: Curate research, document emerging patterns, explore philosophical questions
3. **Create stepping stones** — For each Yegge stage (Phase C), define practical milestones/projects to move between levels
