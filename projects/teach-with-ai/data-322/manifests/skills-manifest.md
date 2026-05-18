# Skills Manifest — DATA 322

This is the master table of all skill files in `skills/`. Keep this in sync whenever a skill is added, modified, or removed. See `CLASS.md` section 7 for update rules.

**Status values:** `complete` = full content present; `placeholder` = TODO body only; `planned` = not yet created.

**Quiz Prep column:** `yes` = has a `## Quiz Prep` section with questions; `no` = missing (required for all homework skills).

---

## Homework Skills

| Skill name (link) | Type | Unit | Week(s) | Project arc | Status | Quiz prep |
|---|---|---|---|---|---|---|
| [intro-environment](../skills/homework/intro-environment.md) | homework | 0 | 1 | none | complete | yes |
| [infra-setup-rubric](../skills/homework/infra-setup-rubric.md) | homework | 0 | 1 | none | complete | yes |
| [intro-ai-workflow](../skills/homework/intro-ai-workflow.md) | homework | 0 | 2 | all | complete | yes |
| [intro-eda-review](../skills/homework/intro-eda-review.md) | homework | 0 | 3 | all | complete | yes |
| [data-splits-leakage](../skills/homework/data-splits-leakage.md) | homework | 1 | 4, 6 | P1, P3 | placeholder | yes |
| [feature-engineering](../skills/homework/feature-engineering.md) | homework | 1 | 4, 5 | P1, P3 | placeholder | yes |
| [logistic-regression](../skills/homework/logistic-regression.md) | homework | 1 | 4 | P1 | complete | yes |
| [decision-trees](../skills/homework/decision-trees.md) | homework | 1 | 4 | P1 | complete | yes |
| [ensemble-methods](../skills/homework/ensemble-methods.md) | homework | 1 | 5 | P1 | complete | yes |
| [cross-validation](../skills/homework/cross-validation.md) | homework | 1 | 6 | P1 | complete | yes |
| [regression-regularization](../skills/homework/regression-regularization.md) | homework | 1 | 7 | P1 (parallel) | complete | yes |
| [svm](../skills/homework/svm.md) | homework | 1 | 9 | standalone | complete | yes |
| [clustering-kmeans](../skills/homework/clustering-kmeans.md) | homework | 2 | 10 | P2 | complete | yes |
| [kmeans-clustering](../skills/homework/kmeans-clustering.md) | homework | 2 | 10 | P2 | placeholder | yes |
| [dimensionality-reduction-pca](../skills/homework/dimensionality-reduction-pca.md) | homework | 2 | 11 | P2 | complete | yes |
| [pca](../skills/homework/pca.md) | homework | 2 | 11 | P2 | placeholder | yes |
| [neural-networks](../skills/homework/neural-networks.md) | homework | 3 | 13 | P3 | complete | yes |
| [llms-as-tools](../skills/homework/llms-as-tools.md) | homework | 3 | 14 | P3 | complete | yes |
| [fairness-model-cards](../skills/homework/fairness-model-cards.md) | homework | 3 | 15 | P3 | complete | yes |
| [fairness-metrics](../skills/homework/fairness-metrics.md) | homework | 3 | 15 | P3 | placeholder | yes |
| [model-cards](../skills/homework/model-cards.md) | homework | 3 | 15 | P3 | placeholder | yes |

**Notes on duplicates:** `clustering-kmeans` and `kmeans-clustering` cover the same topic — `clustering-kmeans` is the complete canonical version. Similarly, `dimensionality-reduction-pca` is canonical over `pca`, and `fairness-model-cards` is canonical over the separate `fairness-metrics` and `model-cards` placeholder files. See `CLASS.md` section 8.

---

## Project Skills

| Skill name (link) | Type | Unit | Weeks | Project arc | Status | Quiz prep |
|---|---|---|---|---|---|---|
| [project-1-classification](../skills/projects/project-1-classification.md) | project | 1 | 4–8 | P1 | complete | no |
| [project-2-clustering](../skills/projects/project-2-clustering.md) | project | 2 | 10–12 | P2 | complete | no |
| [project-3-capstone](../skills/projects/project-3-capstone.md) | project | 3 | 13–15 | P3 | complete | no |

Project skills do not have quiz prep sections — quiz prep is handled in the homework skills that feed each project arc.

---

## Quiz Prep Skills

| Skill name (link) | Type | Unit | Weeks | Project arc | Status | Quiz prep |
|---|---|---|---|---|---|---|
| [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | quiz-prep | all | all | all | complete | n/a |

The quiz prep agent is a single consolidated file covering all drillable topics. It is not week-specific — the agent selects topics based on the current week's content and the student's request.

---

## Meta Skills

| Skill name (link) | Type | Unit | Weeks | Project arc | Status | Quiz prep |
|---|---|---|---|---|---|---|
| [topic-to-project](../skills/meta/topic-to-project.md) | meta | all | all | all | complete | no |

---

## Class Agent

| Skill name (link) | Type | Unit | Weeks | Project arc | Status | Quiz prep |
|---|---|---|---|---|---|---|
| [AGENT](../skills/class-agent/AGENT.md) | agent | all | all | all | complete | no |

---

## Planned Skills (Not Yet Created)

| Skill name | Type | Unit | Week(s) | Project arc | Notes |
|---|---|---|---|---|---|
| infra-checkpoint-set2 | homework | 2 | 10 | P2 | Planned: verify Week 10 library additions before P2 starts |
| infra-checkpoint-set3 | homework | 3 | 13 | P3 | Planned: verify Week 13 library additions before P3 starts |
