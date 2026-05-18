# Projects Manifest — DATA 322

One section per project arc. Covers objectives, deliverables, infra requirements, linked homework skills, quiz topics covered, graded components, and status. Keep in sync with `skills-manifest.md` and `infra-manifest.md` whenever project content changes.

---

## Project 1 — Classification Pipeline

**Title:** Classification on a Real-World Tabular Dataset
**Arc weeks:** 4–8 (5 weeks; launched Week 4, deliverable due end of Week 8)
**Skill file:** [skills/projects/project-1-classification.md](../skills/projects/project-1-classification.md)

### Learning Objectives

1. Apply and compare at least three classification algorithms (logistic regression, decision tree, random forest minimum).
2. Build a proper cross-validation harness; report results with mean ± std.
3. Interpret model outputs for a non-technical audience: feature importance, confusion matrix narrative, domain context.
4. Use the AI agent to debug, explain, and refine — and document that use critically in the collaboration log.

### Deliverables

- Jupyter notebook with documented end-to-end classification pipeline
- 5-minute recorded walkthrough (Loom or equivalent)
- Collaboration log (minimum 3 entries: EDA phase, debugging interaction, one documented AI error)

### Dataset Requirements

Student-selected from approved categories: environmental monitoring (wildfire perimeter, air quality, stream flow), public health (CDC WONDER, hospital readmission), Cal Poly Humboldt campus data, USDA agricultural data. Dataset must have a clear binary or multiclass target, at least 500 rows, and not be a well-known benchmark (no Titanic, no Iris). Dataset must be approved by instructor before Week 5.

### Infra Requirements

Set 1 (established Week 1): Python environment with numpy, pandas, matplotlib, seaborn, scikit-learn, jupyter, ipykernel. No additional libraries required beyond the Set 1 baseline.

### Linked Homework Skills

- [intro-eda-review](../skills/homework/intro-eda-review.md) — EDA checklist applied to project dataset
- [data-splits-leakage](../skills/homework/data-splits-leakage.md) — leakage identification in preprocessing pipeline
- [feature-engineering](../skills/homework/feature-engineering.md) — encoding, scaling, imputation decisions
- [logistic-regression](../skills/homework/logistic-regression.md) — first required classifier
- [decision-trees](../skills/homework/decision-trees.md) — second required classifier
- [ensemble-methods](../skills/homework/ensemble-methods.md) — third required classifier (random forest)
- [cross-validation](../skills/homework/cross-validation.md) — CV harness construction and validation
- [regression-regularization](../skills/homework/regression-regularization.md) — parallel supervised track (Week 7)

### Quiz Topics Covered by This Arc

- Data splits and leakage (Week 4, 6)
- Bias-variance tradeoff (Week 5, 6)
- Precision vs. recall (Week 4)
- Cross-validation and stratification (Week 6)
- Feature scaling (Weeks 4–6)
- Overfitting signs: learning curves (Week 5)

### Graded Components That Apply

All four graded components apply:
- Infrastructure setup (verified Week 1, gate for project participation)
- Project narrative (interpretation section of the notebook + walkthrough)
- Project results (pipeline correctness, model comparison, CV harness)
- In-class conceptual tests (covering Weeks 4–8 content)

**Rubric weights:**
- EDA quality: 20%
- Pipeline correctness (no leakage, proper CV): 25%
- Model comparison (3+ algorithms, honest CV evaluation): 25%
- Interpretation (feature importance, confusion matrix narrative, domain meaning): 15%
- Collaboration log (specific, critical, documented AI errors): 15%

### Status

Complete (skill file complete, rubric defined, homework skills linked).

---

## Project 2 — Cluster Analysis

**Title:** Cluster Analysis and Dimensionality Reduction on Unstructured or High-Dimensional Data
**Arc weeks:** 10–12 (3 weeks; launched Week 10, deliverable due end of Week 12)
**Skill file:** [skills/projects/project-2-clustering.md](../skills/projects/project-2-clustering.md)

### Learning Objectives

1. Apply k-means and at least one hierarchical or density-based method; compare using silhouette scores.
2. Use PCA to reduce dimensionality; interpret principal components in domain terms.
3. Build a defensible argument for cluster meaning that draws on domain knowledge, not just mathematical metrics.
4. Demonstrate critical evaluation of AI-generated cluster interpretations.

### Deliverables

- Report (4–6 pages)
- Visualization portfolio (minimum 4 publication-quality figures: elbow/silhouette plot, 2D PCA scatter with cluster labels, scree plot, cluster profile chart)
- Collaboration log (minimum 3 entries: k-selection phase, PCA interpretation, AI-generated cluster interpretation critique)

### Dataset Requirements

Label-free dataset (or dataset where labels are withheld). Approved categories: satellite imagery band data, genomic expression data, Humboldt County census tract socioeconomic data, environmental sensor networks. If the dataset has labels, they may only be used for post-hoc validation, not to guide clustering.

### Infra Requirements

Set 1 baseline plus: scipy (for hierarchical clustering via `scipy.cluster.hierarchy`). The scipy package should be verified as part of the Set 2 infra checkpoint (see `infra-manifest.md`). A formal Set 2 checkpoint skill is planned but not yet built.

### Linked Homework Skills

- [clustering-kmeans](../skills/homework/clustering-kmeans.md) — k-means algorithm, k selection, elbow and silhouette, hierarchical clustering
- [dimensionality-reduction-pca](../skills/homework/dimensionality-reduction-pca.md) — PCA as preprocessing and visualization, scree plots, loading interpretation, t-SNE/UMAP contrast

### Quiz Topics Covered by This Arc

- k-Means clustering (Week 10): algorithm, k selection, elbow plot, silhouette score, cluster evaluation without labels
- PCA vs. t-SNE (Week 11): what each preserves, failure modes, when to use each
- Clustering evaluation without labels (Weeks 10–12)

### Graded Components That Apply

- Project narrative (cluster interpretation report — the hardest deliverable in the course)
- Project results (pipeline correctness, visualization portfolio)
- In-class conceptual tests (covering Weeks 10–12 content)

**Rubric weights:**
- Clustering (correct implementation, k selection justified): 20%
- Dimensionality reduction (PCA applied, components interpreted in domain terms): 20%
- Visualization portfolio (4+ figures, publication quality, captions): 20%
- Cluster narrative (argument for cluster meaning grounded in domain knowledge): 25%
- Collaboration log (AI use documented critically; AI interpretation critiqued): 15%

### Status

Complete (skill file complete, rubric defined, homework skills linked). Set 2 infra checkpoint skill is planned but not yet built.

---

## Project 3 — Capstone: End-to-End ML System

**Title:** End-to-End ML System with an AI-Augmented Workflow
**Arc weeks:** 13–15 (3 weeks; launched Week 13, deliverable due end of Week 15)
**Skill file:** [skills/projects/project-3-capstone.md](../skills/projects/project-3-capstone.md)

### Learning Objectives

1. Frame an ML problem from a raw or semi-structured dataset without instructor scaffolding.
2. Select and justify a model family appropriate to the problem; document trade-offs.
3. Apply at least one fairness metric; interpret the result in the context of the application.
4. Produce a model card that a stakeholder could read and act on.
5. Critically reflect on AI-assisted work: document what the agent contributed, where it erred, and how the student corrected it.

### Deliverables

GitHub repo containing:
- `README.md` (project summary, how to run, dataset source)
- `environment.yml` or `requirements.txt`
- `data/raw/` and `data/processed/`
- `notebooks/analysis.ipynb` (or multiple numbered notebooks)
- `model-card.md`
- `collaboration-log.md`

The notebook must be reproducible (fixed seeds, relative paths, runs top-to-bottom on a fresh clone).

### Dataset Requirements

Student-sourced or instructor-provided raw/semi-structured dataset. No scaffolding provided. Students frame the problem themselves. Dataset source must be documented. A well-framed problem statement (who uses the prediction, what decision it informs, cost of false positives vs. false negatives) must appear in both the notebook and the model card.

### Infra Requirements

Set 1 and Set 2 baseline plus: torch or tensorflow/keras (for neural network exploration), fairlearn or aif360 (for fairness metrics). Cloud GPU access recommended for any neural network training on datasets larger than ~5,000 rows. See `infra-manifest.md` for Set 3 details and GPU fallback notes. A formal Set 3 checkpoint skill is planned but not yet built.

### Linked Homework Skills

- [neural-networks](../skills/homework/neural-networks.md) — architecture intuition, training debugging, comparison to classical ML
- [llms-as-tools](../skills/homework/llms-as-tools.md) — LLM failure modes, prompting patterns, RAG overview
- [fairness-model-cards](../skills/homework/fairness-model-cards.md) — fairness metric computation and model card authoring
- [data-splits-leakage](../skills/homework/data-splits-leakage.md) — leakage risks revisited in the capstone context
- [feature-engineering](../skills/homework/feature-engineering.md) — preprocessing decisions in an unscaffolded pipeline

### Quiz Topics Covered by This Arc

- Neural networks (Week 13): architecture, activation functions, training failures, when to use vs. classical ML
- LLMs as tools (Week 14): hallucination, prompting patterns, RAG
- Fairness: demographic parity vs. equalized odds (Week 15)
- Model cards (Week 15): required sections, common deficiencies

### Graded Components That Apply

All four graded components apply at the highest standard.

**Rubric weights:**
- Problem framing (clear, specific, scoped to available data): 15%
- Pipeline quality (reproducible, leakage-free, documented): 20%
- Model selection and justification (trade-offs articulated, not just accuracy): 20%
- Model card (complete, honest, usable by a stakeholder — fairness analysis feeds here): 20%
- Collaboration log (comprehensive, critical, documents errors, includes overall reflection paragraph): 25%

The collaboration log weight is highest in Project 3. It covers the full project lifecycle and requires an overall reflection paragraph on what the student learned about working with AI. A log without this reflection cannot receive full credit.

### Status

Complete (skill file complete, rubric defined, homework skills linked). Set 3 infra checkpoint skill is planned but not yet built.
