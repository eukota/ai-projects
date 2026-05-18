# DATA 322 — Machine Learning for Data Science
## Course Syllabus | Spring 2027 | Cal Poly Humboldt

**Instructor:** Darrell Ross  
**Units:** 4  
**Department:** Mathematics & Data Science  
**Contact:** *(TBD)*  
**Office Hours:** *(TBD)*

---

## Course Description

A practical introduction to machine learning, data mining, and statistical pattern recognition. Topics span supervised learning (classification and regression), unsupervised learning (clustering and dimensionality reduction), and modern ML best practices including fairness, model evaluation, and AI-assisted workflows.

This section is a **Teach With AI pilot**. Students use a course AI agent throughout the semester as a tutor, code reviewer, and quiz preparation partner. AI assistance is explicitly allowed and encouraged. Accountability comes through in-class conceptual tests and a documented collaboration log that makes AI use visible and critical.

**Catalog prerequisites:** DATA 271, MATH 107, STAT 109

---

## Learning Outcomes

By the end of the course, students will be able to:

1. Select and apply appropriate ML algorithms for classification, regression, and clustering tasks
2. Build end-to-end ML pipelines with proper data splitting, preprocessing, and cross-validation
3. Evaluate model performance using metrics appropriate to the task and dataset (precision, recall, ROC-AUC, silhouette, etc.)
4. Interpret and communicate model results to a non-technical audience
5. Identify and avoid common failure modes: data leakage, overfitting, inappropriate metric selection
6. Apply basic fairness analysis and produce a model card for a trained classifier
7. Use AI tools critically — documenting, evaluating, and correcting AI-generated outputs

---

## Required Tools & Materials

All software is free and open source. Students are expected to have a working environment by the end of Week 1.

| Tool | Purpose |
|---|---|
| Python 3.11+ (via conda or venv) | Core language |
| Jupyter Lab | Notebook environment |
| Git + GitHub | Version control; all projects submitted as repos |
| VS Code or Cursor | Editor with Python/Jupyter extensions |
| scikit-learn, pandas, matplotlib, seaborn | ML and analysis stack |
| PyTorch or Keras (Set 3) | Deep learning (introduced Week 13) |

No textbook is required. Weekly readings are provided as links.

---

## Course Structure

The semester is organized into three units, each anchored by a multi-week project.

### Unit 0 — Introduction (Weeks 1–3)
Environment setup, AI collaboration norms, and EDA review. No modeling yet. Every student exits this unit with a working environment, a course GitHub repo, and a first collaboration log entry.

### Unit 1 — Supervised Learning (Weeks 4–9)
Classification and regression. Project 1 runs Weeks 4–8.

### Unit 2 — Unsupervised Learning (Weeks 10–12)
Clustering and dimensionality reduction. Project 2 runs Weeks 10–12.

### Unit 3 — Modern ML Practices (Weeks 13–15)
Neural networks, LLMs as tools, fairness, and model cards. Project 3 runs Weeks 13–14; presentations Week 15.

---

## Weekly Schedule

| Week | Topic | Notes |
|---|---|---|
| 1 | Environment setup; intro to the course AI agent | **Infra gate — pass/fail** |
| 2 | AI collaboration norms; the collaboration log; ML landscape taxonomy | |
| 3 | EDA and the pre-modeling pipeline (DATA 271 review) | |
| 4 | Classification: logistic regression and decision trees | **Project 1 begins** |
| 5 | Ensemble methods: random forests and gradient boosting | |
| 6 | Model evaluation and cross-validation | |
| 7 | Regression: regularization with Ridge, Lasso, ElasticNet | |
| 8 | Project 1 work session and peer review | **Project 1 due** |
| 9 | Support vector machines and the kernel trick | Standalone topic |
| 10 | Clustering: k-means and hierarchical methods | **Project 2 begins** |
| 11 | Dimensionality reduction: PCA, t-SNE, UMAP | |
| 12 | Project 2 work session and critique | **Project 2 due** |
| 13 | Neural networks: practical foundations (Keras/PyTorch) | **Project 3 begins** |
| 14 | LLMs as tools; fairness and model cards | **Project 3 due** |
| 15 | Final presentations and synthesis | |

---

## Projects

### Project 1 — Classification Pipeline (Weeks 4–8)
Build, evaluate, and compare classifiers on a real-world tabular dataset. Datasets are drawn from environmental monitoring, public health, and Cal Poly Humboldt campus data.

**Deliverables:** Documented Jupyter notebook + 5-minute recorded walkthrough + collaboration log  
**Requirements:** Minimum three classifiers; proper cross-validation harness; results interpreted for a non-technical audience; no data leakage

---

### Project 2 — Cluster Analysis (Weeks 10–12)
Apply clustering and dimensionality reduction to an unlabeled dataset. Students must argue what the clusters mean without ground truth labels.

**Deliverables:** Written report (4–6 pages) + visualization portfolio (4+ publication-quality figures) + collaboration log  
**Requirements:** k-means plus one hierarchical or density-based method; PCA component interpretation; silhouette analysis; domain-grounded cluster narrative  
**Candidate dataset:** Humboldt County census tract socioeconomic data

---

### Project 3 — End-to-End ML System (Weeks 13–14)
Student-framed problem. Full pipeline from raw data to a stakeholder-readable model card. The collaboration log becomes a primary deliverable here.

**Deliverables:** GitHub repo with documented code + model card + collaboration log  
**Requirements:** Student-defined problem framing; justified model selection; at least one fairness metric applied; model card meets minimum documentation standard; collaboration log demonstrates critical evaluation of AI assistance

---

## Grading

| Component | Weight | Notes |
|---|---|---|
| Infrastructure Setup | 5% | Pass/fail gate, Week 1 |
| Project 1 — Narrative | 10% | Written/recorded explanation |
| Project 1 — Results | 15% | Technical notebook + collaboration log |
| Project 2 — Narrative | 10% | Report and visualization portfolio |
| Project 2 — Results | 10% | Clustering analysis + collaboration log |
| Project 3 — Narrative | 10% | Problem framing and model card |
| Project 3 — Results | 15% | Full pipeline + collaboration log |
| In-Class Conceptual Tests (3) | 25% | ~8–9% each; short-answer; closed resource |

---

## In-Class Tests

Three closed-resource tests, administered during class time (approximately weeks 5, 9, and 13). Each test is 20–30 minutes, 4–6 short-answer questions. No code. Questions ask students to explain concepts in plain language, reason through a scenario, or identify what is wrong with a flawed approach.

Students who can explain *why* cross-validation prevents leakage will pass. Students who memorized "use k-fold CV" will not.

**AI preparation is encouraged.** The course agent runs Socratic drill sessions from the quiz preparation question banks. Students who use the agent to prep will have seen the question style and the depth of reasoning required before the test.

---

## The Collaboration Log

Every project submission includes a collaboration log — a documented record of how the student used AI tools, what the agent got right, and where the student had to correct, override, or push back on AI output.

The collaboration log is graded on quality of critical reflection, not on whether the student used AI extensively. A log that shows a student caught and documented an AI error is stronger than one that shows passive acceptance of AI suggestions.

Sample log entry format:
> *Week 5, cross-validation harness. I asked the agent to write a CV loop. It produced a loop that fit the scaler on the full dataset before splitting — data leakage. I caught this, corrected the code, and documented that the agent's suggestion was incorrect.*

---

## AI Use Policy

AI assistance is **fully permitted** in this course for all project work, homework, and test preparation. Students are expected to use AI tools and to use them critically.

What AI cannot do: take an in-class test on your behalf. The tests are the accountability mechanism. A student who uses AI for everything but cannot explain what cross-validation is or why their model's precision matters has not learned the material.

What AI will not do for you in this course: write your complete project deliverable without documentation. The collaboration log makes AI use visible. Undocumented AI use — submitting AI-generated work as if it were entirely your own thinking — is a violation of academic integrity.

---

## Program Alignment

This course directly supports Cal Poly Humboldt's "data for good" program mission. Project datasets are drawn from environmental, public health, and social equity domains. Project 3 requires a fairness analysis — applying the program's values to the models students build.

---

*Syllabus subject to revision. Students will be notified of any changes in writing.*

*Proposed for Spring 2027. This section is a Teach With AI pilot in collaboration with the Department of Mathematics & Data Science.*
