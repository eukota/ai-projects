# CLASS.md — DATA 322 Governance Document

**Read this file first.** Any AI agent working on this course must read this file before making any changes. It is the CLAUDE.md equivalent for DATA 322.

---

## 1. Course Identity

| Field | Value |
|---|---|
| Course number | DATA 322 |
| Official title | Machine Learning for Data Science |
| Institution | Cal Poly Humboldt |
| Department | Mathematics & Data Science |
| Units | 4 |
| Semester | Spring 2027 |
| Length | 15 weeks |
| Proposed by | Darrell Ross |
| Mission framing | "Data for good" — social and environmental problem-solving with real data |

The catalog description (from the 2024–25 catalog, catoid 12): a broad introduction to machine learning, data mining, and statistical pattern recognition, covering supervised learning, unsupervised learning, and best practices in ML, with practical rather than theoretical emphasis.

Prerequisites: DATA 271, MATH 107, STAT 109. This course feeds into upper-division capstone work (DATA 411/412).

This course deliberately extends the catalog scope to treat LLM tooling as a first-class skill alongside classical ML, and is the first concrete pilot for the "Teach With AI" initiative.

---

## 2. Repository Structure

```
data-322/
├── CLASS.md                         # This file — read first
├── overview.md                      # Seed concept document (early planning artifact)
├── open-questions.md                # Early planning artifact
├── ai-assistant-mvp.md              # Early planning artifact
├── course-support.md                # Early planning artifact
├── curriculum/
│   └── spring-2027-framework.md    # PRIMARY source of truth for week structure
├── skills/
│   ├── class-agent/
│   │   └── AGENT.md                # Full spec for the DATA 322 class agent
│   ├── homework/                    # Per-topic homework skills (see manifests)
│   ├── projects/                    # Per-project arc skills (P1, P2, P3)
│   ├── quiz-prep/
│   │   └── quiz-prep-agent.md      # Socratic quiz prep agent with full question banks
│   └── meta/
│       └── topic-to-project.md     # Routes topics to the correct project arc
└── manifests/
    ├── skills-manifest.md          # Master table of all skills
    ├── projects-manifest.md        # Per-project arc details
    ├── infra-manifest.md           # Infrastructure requirements by stage
    └── quiz-topics-manifest.md     # Maps quiz prep questions to weeks and topics
```

Purpose of each directory in one line:
- `curriculum/` — the authoritative week-by-week topic outline; drives everything else
- `skills/class-agent/` — the persistent course AI agent specification
- `skills/homework/` — individual topic skills the agent loads for tutoring and quiz prep
- `skills/projects/` — project arc skills covering rubrics, agent guidance, and common mistakes
- `skills/quiz-prep/` — Socratic drill agent with full question banks for all testable topics
- `skills/meta/` — cross-cutting routing and reference skills used by the class agent
- `manifests/` — governance layer; tracks all content and enables future AI sessions to understand the current state of the course

---

## 3. Curriculum Structure

The curriculum is defined in `curriculum/spring-2027-framework.md`. That file is the source of truth. The structure in plain language:

**Unit 0 — Introduction (Weeks 1–3)**
Three setup weeks with no modeling. Week 1: environment setup and AI workflow intro. Week 2: collaboration log norms and AI literacy. Week 3: EDA review and the pre-modeling pipeline. These are standalone — they do not belong to any project arc.

**Unit 1 — Supervised Learning (Weeks 4–9)**
Project 1 (classification) runs Weeks 4–8. Week 9 (SVM) is a standalone topic placed after P1 wraps so students aren't managing a deadline while learning a new paradigm.

**Unit 2 — Unsupervised Learning (Weeks 10–12)**
Project 2 (clustering and dimensionality reduction) runs all of Weeks 10–12.

**Unit 3 — Modern ML Practices and Applied AI (Weeks 13–15)**
Project 3 (capstone end-to-end ML system) runs Weeks 13–15.

**Three project arcs:**
- P1: Classification on a real tabular dataset (Weeks 4–8, 5 weeks)
- P2: Cluster analysis and dimensionality reduction (Weeks 10–12, 3 weeks)
- P3: End-to-end ML system with model card (Weeks 13–15, 3 weeks)

**Standalone topics:** Week 9 (SVM); the intro unit (Weeks 1–3) is also standalone.

---

## 4. Assessment Model Summary

Four graded components apply across the course:

**1. Infrastructure Setup** — Week 1 pass/fail gate. Student must demonstrate working conda/venv environment, correct Jupyter kernel, Git configured with identity, and VS Code or Cursor with Python extension. See `skills/homework/infra-setup-rubric.md`. The class agent diagnoses and helps resolve failures.

**2. Project Narrative** — Written or recorded narrative for each project explaining the problem, modeling choices, and real-world interpretation. Graded on reasoning clarity, appropriate result interpretation, and honest acknowledgment of model limitations.

**3. Project Results** — The technical deliverable (notebook, pipeline, model card, visualization portfolio, or GitHub repo depending on the project). Graded on ML correctness (no leakage, proper CV, appropriate preprocessing), completeness, and collaboration log quality.

**4. In-Class Conceptual Tests** — Short (20–30 min), closed-resource, 4–6 short-answer questions drawn from the `## Quiz Prep` sections of homework skill files. Tests assess understanding, not recall. Students write 2–4 sentence answers. No code.

**In-class test format note:** tests are currently administered on paper or via LMS quiz. The long-term design is AI-delivered (agent presents questions, student types, instructor reviews session log) but the required server infrastructure does not yet exist. See Known Issues below.

**Collaboration log:** a graded sub-component of every project deliverable. Documents AI tool use with specific entries including what was asked, what was produced, what the student did with it, and at minimum one instance of disagreement or correction. Worth 15% of P1 and P2 grades, 25% of P3 grade.

**AI use policy:** fully allowed throughout the course including for homework, project work, and test preparation. The collaboration log makes AI use visible and critical rather than passive. In-class tests are the accountability mechanism — they cannot be completed by AI on the student's behalf.

---

## 5. Skills Conventions

### Frontmatter Format

Every skill file in `skills/` must begin with YAML frontmatter:

```yaml
---
name: kebab-case-skill-name
description: One-sentence description of what the skill does and when it is active
---
```

The `name` field is the canonical identifier used in the skills manifest. The `description` field is used by the agent when selecting which skill to load.

### Naming Rules

- Kebab-case, all lowercase
- Named for the topic, not the week: `cross-validation` not `week-6-skill`
- Project skills use the pattern `project-N-topic`: `project-1-classification`
- The quiz prep agent is a single consolidated file: `quiz-prep-agent.md`
- The class agent spec is `AGENT.md` (all-caps, in `skills/class-agent/`)

### How Skills Map to Weeks

The mapping is maintained in `manifests/skills-manifest.md`. Each homework skill has a primary week (when it is first active) and may be relevant across multiple weeks or project phases. The curriculum framework is the source of truth for week structure; the skill files are derived from it, not the reverse.

### How to Add a New Skill Correctly

1. Create the file in the appropriate subdirectory (`skills/homework/`, `skills/projects/`, etc.).
2. Use the correct frontmatter format with a kebab-case name.
3. Include a `## Quiz Prep` section at the end of every homework skill. This is required — quiz prep sections are the source material for in-class tests.
4. Add the skill to `manifests/skills-manifest.md` with all required columns (name, type, unit, week(s), project arc, status, quiz prep present).
5. If the skill feeds a project arc, update `manifests/projects-manifest.md` to link it.
6. If the skill introduces infra requirements, update `manifests/infra-manifest.md`.

---

## 6. Manifest Conventions

Four manifests live in `manifests/`. Each tracks a different dimension of the course:

| Manifest | What it tracks | When to update |
|---|---|---|
| `skills-manifest.md` | Every skill file: type, unit, week, project arc, status, quiz prep | When any skill is added, changed, or removed |
| `projects-manifest.md` | Each project arc: objectives, deliverables, infra, linked skills, quiz topics, status | When a project arc changes, a skill is linked to a project, or infra changes |
| `infra-manifest.md` | Tools and library requirements by stage; pass/fail gates | When infra requirements change or new checkpoints are added |
| `quiz-topics-manifest.md` | Maps every quiz prep question to a skill, week, project arc, and topic category | When a quiz prep section is added, modified, or a new skill is created |

All manifests must be kept in sync with the actual skill files. They are governance documents, not auto-generated outputs — they must be updated manually whenever course content changes.

---

## 7. Modification Rules

These rules apply to any AI agent modifying this course. They are not suggestions.

1. **Always read CLASS.md first.** Do not modify any file in this repo without reading this document first.

2. **Always update the relevant manifest(s) after adding or changing content.** Adding a skill file without updating `skills-manifest.md` leaves the manifest out of sync. This is the most common governance failure.

3. **Never change a project arc without updating both `skills-manifest.md` and `projects-manifest.md`.** Project arcs are the load-bearing structure of the course. Changes to scope, deliverables, or linked skills must be reflected in both manifests.

4. **Never add a homework skill without adding it to `skills-manifest.md` and linking it to a week and project arc.** Unlinked skills are invisible to future agents and to the class agent's routing logic.

5. **The curriculum framework is the source of truth for week structure.** `curriculum/spring-2027-framework.md` defines the weeks and what belongs in them. Skills are derived from the curriculum, not the other way around. If a skill's week assignment conflicts with the framework, the framework wins.

6. **Quiz prep sections must exist in every homework skill.** The `## Quiz Prep` section is the source material for in-class tests. A homework skill without a quiz prep section is incomplete. Do not mark a skill as "complete" in the manifest if it lacks this section.

7. **Infra requirements must be noted in the relevant project skill and in `manifests/infra-manifest.md`.** When a project phase introduces a new library or tool requirement, it must be tracked in both places so students and future instructors know what to expect.

8. **Do not rename or restructure skills/directories without updating all manifests and all cross-references.** The class agent, the meta skill, and the manifests all reference skills by name. Renaming without updating breaks routing.

9. **Placeholder skills (status: placeholder in the manifest) must have a `## TODO` section describing what content is needed.** Do not add a skill file with only frontmatter and quiz prep questions — either complete it or mark it explicitly as a placeholder.

10. **Do not delete the early planning artifacts** (`overview.md`, `open-questions.md`, `ai-assistant-mvp.md`, `course-support.md`). They are historical context for the project's origin, not active course content.

---

## 8. Known Issues and Planned Features

**In-class AI test delivery (planned, not built)**
The curriculum framework describes a long-term design where in-class tests are delivered through a supervised AI interface — agent presents questions, student types answers, instructor reviews session logs. This requires server interface software not yet in place. Until that infrastructure is available, tests are administered on paper or via a standard LMS quiz. When this feature is built, the quiz-topics manifest becomes the primary input for test generation.

**In-class AI interaction grading component (planned)**
A planned grading component would assess the quality of a student's in-class AI interaction — how they prompt, how they push back, how they document disagreements. Not yet specified or implemented.

**Set 2 and Set 3 infra checkpoints (not yet built)**
The infra manifest tracks planned checkpoints at the start of Project 2 (Set 2, Week 10) and Project 3 (Set 3, Week 13) that verify students have installed additional required libraries. These checkpoints are not yet built as standalone skill files. See `manifests/infra-manifest.md` for the planned content. When built, they should follow the `infra-setup-rubric.md` pattern and be linked to the appropriate project arc.

**Duplicate skill files**
The following skill topics have two files — one complete and one placeholder (TODO-only). The placeholder files should eventually be removed or merged once the complete versions are verified as canonical:
- `skills/homework/clustering-kmeans.md` (complete) vs. `skills/homework/kmeans-clustering.md` (placeholder)
- `skills/homework/dimensionality-reduction-pca.md` (complete) vs. `skills/homework/pca.md` (placeholder)
- `skills/homework/fairness-model-cards.md` (complete) vs. `skills/homework/fairness-metrics.md` (placeholder) and `skills/homework/model-cards.md` (placeholder)

Until these are resolved, the complete versions are the canonical files. The placeholders are flagged in the skills manifest.
