# DATA 322 — Machine Learning for Data Science
## Spring 2027 Curriculum Framework
### Proposed by Darrell Ross | "Teach With AI" Pilot Course

---

## 1. Official Course Context

**Course Number:** DATA 322  
**Official Title:** Machine Learning for Data Science  
**Units:** 4  
**Department:** Mathematics & Data Science, Cal Poly Humboldt  
**Catalog Edition:** 2024–25 (catoid 12, confirmed in Modern Campus Catalog)

**Official Catalog Description:**
> A broad introduction to machine learning, data mining, and statistical pattern recognition. Topics include: (i) Supervised learning, (ii) Unsupervised learning, and (iii) Best practices in machine learning. The course draws from numerous case studies and applications, with a practical rather than theoretical emphasis.

**Prerequisites:** DATA 271 (Data Wrangling and Visualization), MATH 107 (Linear Algebra), STAT 109 (Introductory Statistics)

**Program Context:** DATA 322 sits in the junior year of the Cal Poly Humboldt B.S. in Data Science, after the foundational wrangling/viz tier (DATA 271) and basic applied analysis (DATA 311). It feeds into upper-division capstone work. The program's stated mission is "data for good" — social and environmental problem-solving with real data.

---

## 2. Curriculum Design Philosophy

This course extends the official catalog scope deliberately. The catalog description is intentionally spare; a practical 300-level ML course for Spring 2027 must treat large-language-model tooling as a first-class skill alongside classical ML. The design philosophy:

- **Practical over theoretical.** Sklearn, Pandas, and notebooks before derivations.
- **Project-anchored.** Three multi-week projects give students a complete pipeline to own rather than a collection of isolated homework problems.
- **AI-native instruction.** Students use an in-course AI agent throughout — as a tutor, a rubber duck, a quiz partner, and a code reviewer. The agent is visible on day one and part of the grade rubric by week three.
- **Domain relevance.** Datasets and case studies drawn from environmental science, public health, and social equity — consistent with Cal Poly Humboldt's program identity.

---

## 3. Week-by-Week Topic Outline

Each week is 3 hours of lecture/lab contact. Four-unit course.

---

### UNIT 0 — Setup and Orientation (Weeks 1–2)

**Week 1 — The ML Landscape and the AI-Assisted Workflow**

Topics:
- What machine learning is and is not: a taxonomy of problem types
- The data science pipeline as an end-to-end loop (obtain → wrangle → model → evaluate → communicate)
- How DATA 322 fits in the major: what DATA 271 gave you, what this course adds
- Introduction to the course AI agent: capabilities, appropriate use, trust calibration
- Lab: Environment setup (Python, Jupyter/VS Code, sklearn, pandas, matplotlib); first AI-assisted notebook walkthrough

Standalone vs. project arc: **Standalone setup week** — establishes the baseline everyone needs before any project work.

---

**Week 2 — Data for ML: Pipelines, Splits, and Feature Engineering**

Topics:
- Training / validation / test splits — why and how; data leakage as a career-ending mistake
- Feature engineering: encoding, scaling, imputation
- Exploratory data analysis before modeling (not just before visualization)
- Using the AI agent for EDA: generating summary statistics, asking "what looks wrong?"
- Lab: End-to-end warm-up pipeline on a clean dataset (California wildfire perimeter data or similar)

Standalone vs. project arc: **Bridge week** — completes foundational setup; provides the scaffold all three projects will reuse.

---

### UNIT 1 — Supervised Learning (Weeks 3–8)
#### Project 1: Classification on a Real-World Tabular Dataset (Weeks 3–7)

This is the longest project arc. Students choose from a curated set of approved datasets (environmental monitoring, public health records, Cal Poly Humboldt campus energy usage, USDA agricultural data). They will build, evaluate, and compare classifiers, culminating in a written report and a five-minute recorded walkthrough.

---

**Week 3 — Classification Fundamentals: Logistic Regression and Decision Trees**

Topics:
- Binary classification: the decision boundary intuition
- Logistic regression: coefficients, log-odds, probability outputs
- Decision trees: splits, depth, overfitting
- Confusion matrix, precision, recall, F1, ROC-AUC
- Lab: Logistic regression vs. decision tree on a binary health outcome dataset

*Project 1 launched this week. Students select dataset; instructor approves.*

---

**Week 4 — Ensemble Methods: Random Forests and Gradient Boosting**

Topics:
- Bagging and the variance-reduction intuition
- Random forests: feature importance, out-of-bag error
- Gradient boosting (conceptually): XGBoost/LightGBM as practical tools
- Hyperparameter tuning: what to tune first and why
- Lab: Comparing tree ensembles on Project 1 dataset; first AI-assisted debugging session (students prompt the agent to explain a poor F1 score)

---

**Week 5 — Model Evaluation and Cross-Validation**

Topics:
- k-fold cross-validation: why the simple train/test split lies to you
- Stratified CV for imbalanced classes
- Bias-variance tradeoff: the conceptual core
- Learning curves and validation curves as diagnostic tools
- Lab: Building a proper CV harness for Project 1; AI agent for quiz prep on evaluation metrics

---

**Week 6 — Regression: Continuous Target Variables**

Topics:
- Linear regression review (expected from STAT 109) — extended to regularization
- Ridge, Lasso, ElasticNet: why regularization and how to pick lambda
- Regression metrics: MSE, MAE, R², residual analysis
- Polynomial features and interaction terms
- Lab: Regression on environmental continuous outcome (e.g., stream flow prediction, air quality index)

*Note: Regression is a parallel track to classification — covered in week 6 to give students a second supervised flavor before the project wraps.*

---

**Week 7 — Project 1 Work Session and Peer Review**

Topics:
- In-class project workshop: students work on their classification pipeline
- Peer code review: structured critique using a rubric
- AI agent as reviewer: students prompt the agent to critique their feature engineering choices
- Instructor feedback checkpoint

*Project 1 deliverable due end of week 7.*

---

**Week 8 — Support Vector Machines and the Kernel Trick**

Topics:
- Maximal margin classifier intuition
- Soft-margin SVM: the C parameter
- Kernels: RBF, polynomial — when and why
- SVM vs. tree methods: a practical comparison
- Lab: SVM on a moderately high-dimensional text or sensor dataset

Standalone vs. project arc: **Standalone topic** — SVM is core curriculum but intentionally placed after Project 1 wraps so students aren't managing a deadline while learning a new paradigm.

---

### UNIT 2 — Unsupervised Learning (Weeks 9–11)
#### Project 2: Cluster Analysis and Dimensionality Reduction on Unstructured or High-Dimensional Data (Weeks 9–11)

A three-week project. Students apply clustering and dimensionality reduction to a dataset without labels — they must argue their own interpretation of what the clusters mean. Approved datasets include: satellite imagery band data, genomic expression data, Humboldt County census tract socioeconomic data.

---

**Week 9 — Clustering: k-Means and Hierarchical Methods**

Topics:
- The unsupervised problem: no ground truth
- k-Means: algorithm, initialization (k-means++), the elbow heuristic
- Hierarchical clustering: dendrograms, linkage methods
- Cluster evaluation without labels: silhouette score, inertia
- Lab: Clustering Cal Poly Humboldt environmental sensor data or census tract data

*Project 2 launched this week.*

---

**Week 10 — Dimensionality Reduction: PCA and t-SNE/UMAP**

Topics:
- Principal Component Analysis: variance explained, biplots, scree plots
- PCA as preprocessing vs. PCA as the output
- t-SNE and UMAP: what they actually optimize and where they lie to you
- When to reduce: curse of dimensionality, visualization, noise removal
- Lab: PCA pipeline integrated into Project 2 dataset; AI agent queried for interpretation of PCA loadings

---

**Week 11 — Project 2 Work Session and Critique**

Topics:
- In-class studio: building the cluster narrative
- Arguing cluster meaning without labels: domain knowledge requirement
- Visualization as communication: matplotlib, seaborn, plotly
- Peer critique and AI agent review

*Project 2 deliverable due end of week 11.*

---

### UNIT 3 — Modern ML Practices and Applied AI (Weeks 12–15)
#### Project 3: End-to-End ML System with an AI-Augmented Workflow (Weeks 12–14)

The capstone project. Students build a complete, documented ML system: problem framing, data acquisition or use of a provided raw dataset, full pipeline, model selection with justified trade-offs, and a deployment-ready model card. The AI agent is an explicit collaborator — students submit a "collaboration log" documenting how they used AI tools, what it got right, and where they had to correct it.

---

**Week 12 — Neural Networks and Deep Learning: Practical Foundations**

Topics:
- From linear models to multilayer perceptrons: the architecture intuition
- Activation functions, backpropagation (conceptual, not symbolic differentiation)
- Keras/PyTorch quickstart: building a small network in 20 lines
- When neural networks beat classical ML and when they don't
- Lab: MLP on a tabular classification problem; comparison to random forest on the same data

*Project 3 launched this week.*

---

**Week 13 — Large Language Models as Tools in the Data Science Workflow**

Topics:
- What LLMs actually are: tokens, context windows, how prompting works mechanically
- Using LLMs for data wrangling (parsing messy text, entity extraction)
- Using LLMs as code assistants: reviewing output critically, avoiding hallucinated API calls
- Retrieval-augmented generation (RAG) — conceptual overview for data pipelines
- Prompt engineering for data tasks: chain-of-thought, few-shot, structured output
- Lab: Students use an LLM to assist with Project 3 feature engineering; document the interaction

---

**Week 14 — ML Best Practices: Ethics, Fairness, and Model Cards**

Topics:
- Data leakage revisited: real-world failure modes
- Algorithmic fairness: demographic parity, equalized odds — concrete definitions
- Fairness toolkits: Fairlearn, AIF360 overview
- Model cards: what they are, why they exist, how to write one
- Responsible AI and the "data for good" frame: Humboldt program identity
- Lab: Students complete Model Card for Project 3 system

*Project 3 deliverable due end of week 14.*

---

**Week 15 — Final Presentations and Synthesis**

Topics:
- Student presentations of Project 3 (5 minutes per student or team)
- Synthesis lecture: the ML landscape you now inhabit
- Career paths and next courses: what DATA 411 / 412 will ask of you
- Reflection: AI as collaborator — what worked, what the agent got wrong, what you learned from correcting it

Standalone vs. project arc: **Standalone capstone week** — no new technical content introduced.

---

## 4. Project Groupings

### Project 1 — Classification Pipeline (Weeks 3–7)
**Scope:** 5 weeks. Students complete an end-to-end binary or multiclass classification project on a tabular dataset with real-world stakes.

**Deliverable:** Jupyter notebook with documented pipeline + 5-minute recorded walkthrough (Loom or equivalent).

**Learning Objectives:**
1. Apply and compare at least three classification algorithms (logistic regression, decision tree, random forest minimum).
2. Build a proper cross-validation harness; report results honestly with confidence intervals.
3. Interpret model outputs for a non-technical audience (feature importance, confusion matrix narrative).
4. Use the AI agent to debug, explain, and refine — and document that use.

---

### Project 2 — Cluster Analysis (Weeks 9–11)
**Scope:** 3 weeks. Students apply unsupervised methods to a high-dimensional or label-free dataset and construct a meaningful interpretation.

**Deliverable:** Report (4–6 pages) + visualization portfolio (minimum 4 publication-quality figures).

**Learning Objectives:**
1. Apply k-means and at least one hierarchical or density-based method; compare with silhouette scores.
2. Use PCA to reduce dimensionality; interpret principal components in domain terms.
3. Build an argument for cluster meaning that draws on domain knowledge, not just math.
4. Demonstrate critical evaluation of AI-generated cluster interpretations.

---

### Project 3 — End-to-End ML System with Model Card (Weeks 12–14)
**Scope:** 3 weeks. The capstone. Students frame their own problem, build a complete pipeline, and produce a model card documenting the system.

**Deliverable:** GitHub repo with clean, documented code + model card + collaboration log.

**Learning Objectives:**
1. Frame an ML problem from a raw or semi-structured dataset without instructor scaffolding.
2. Select and justify a model family appropriate to the problem; document trade-offs.
3. Apply at least one fairness metric; interpret the result.
4. Produce a model card that a stakeholder could read and act on.
5. Critically reflect on AI-assisted work: document what the agent contributed, where it erred, and how the student corrected it.

---

## 5. Skills Manifest for AI Agent Design

This section defines the skill set needed for the course AI agent (the "class agent") and per-topic homework and quiz prep agents.

---

### 5.1 Homework Skills (by topic area)

| Topic | Skill Description |
|---|---|
| Data splits & leakage | Given a scenario, identify whether data leakage is present and explain why |
| Feature engineering | Walk a student through encoding, scaling, and imputation decisions on a provided dataset |
| Logistic regression | Interpret coefficients and log-odds; debug a failing convergence |
| Decision trees | Explain overfitting via depth; guide pruning decisions |
| Ensemble methods | Explain bagging vs. boosting; interpret feature importances |
| Cross-validation | Identify correct vs. incorrect CV setup in student code; explain stratification |
| Regression / regularization | Interpret Ridge/Lasso coefficients; explain the lambda selection process |
| SVM | Explain the margin and kernel intuition without derivation |
| k-Means clustering | Guide elbow plot interpretation; debug poor cluster separation |
| PCA | Interpret a scree plot; explain what a PCA loading means in plain language |
| Neural networks | Explain architecture choices; debug a non-converging training loop |
| LLMs as tools | Review a student's prompt for a data task; suggest improvements |
| Fairness metrics | Walk through computing demographic parity on a provided model output |
| Model cards | Review a draft model card and identify missing or misleading sections |

---

### 5.2 Project Skills (by project arc)

**Project 1 (Classification):**
- Dataset sanity check: "Here is my EDA — what am I missing before I model?"
- Pipeline review: "Here is my sklearn Pipeline object — what's wrong with this?"
- Evaluation interpretation: "My F1 is 0.71 but accuracy is 0.93 — explain what's happening"
- Hyperparameter guidance: "What should I tune first in a random forest and why?"

**Project 2 (Clustering):**
- Cluster interpretation: "Here are my centroids and silhouette scores — what do these clusters mean?"
- PCA loading interpretation: "My first two PCs explain 62% of variance — here are the loadings"
- Visualization critique: "Here is my t-SNE plot — what might I be misreading?"

**Project 3 (End-to-End):**
- Problem framing: "Here is my dataset — help me frame a valid ML problem"
- Model selection: "I'm choosing between random forest and gradient boosting — walk me through the trade-offs"
- Model card review: "Here is my draft model card — what's missing or misleading?"
- Collaboration log coaching: "Here is how I used AI this week — does this reflect appropriate critical use?"

---

### 5.3 Quiz Prep Skills

The quiz prep agent should be able to run Socratic-style drills on:

- Bias-variance tradeoff (explain, draw, apply to a given scenario)
- Precision vs. recall trade-off (when you care about one more than the other and why)
- The difference between PCA and t-SNE (strengths, failure modes, when to use each)
- Why cross-validation matters (what goes wrong without it)
- Feature scaling: when it matters and when it doesn't (tree methods vs. linear models)
- The kernel trick: intuition without the math
- Overfitting signs: learning curve patterns
- Clustering evaluation without labels: silhouette, inertia, interpretability
- Fairness definitions: demographic parity vs. equalized odds — definitions and when they conflict

The quiz prep agent should refuse to just give answers; it should ask the student to explain first, then correct or affirm.

---

### 5.4 Class Agent Description

**Name (suggested):** DATA-322 Assistant (or localized name chosen by the instructor)

**Role:** A persistent, always-available course companion that knows the course material, the current project prompt, and the weekly learning objectives. It functions as a Socratic tutor for concepts, a code reviewer for notebooks, a quiz-prep partner, and a writing assistant for project reports.

**Hard constraints (must be enforced in system prompt):**
- Never write complete project solutions. It may write helper functions, explain patterns, or review student-written code, but completing a project deliverable on behalf of a student is a policy violation.
- When a student asks a direct quiz question (e.g., "what is the answer to question 3?"), it must redirect to explanation mode.
- It must log all student interactions for instructor review (privacy-compliant).

**Soft behaviors:**
- Prefers questions over statements ("What do you think is causing this?" before "The issue is X")
- When debugging code, asks the student to explain the code before identifying the error
- Surfaces domain context (environmental, social) when interpreting model results — consistent with the "data for good" program identity

**Technical stack (recommended):** A RAG-backed LLM agent with course slides, textbook excerpts, and project prompts indexed. Weekly context updates pushed by the instructor. Accessible via a course-specific URL or embedded in Canvas.

---

## 6. Compelling Examples for a Dean's Test Drive

If a dean is evaluating this course and its AI pilot, these are the scenarios most likely to land:

**1. The Leakage Gotcha (Week 2 / Week 5)**
Show a notebook where a student preprocesses the entire dataset before splitting, accidentally achieves 99% accuracy, and then the AI agent identifies the leakage when the student says "this seems too good." Demo the agent asking "when did you fit your scaler?" The dean sees AI as a teaching tool, not a cheating tool.

**2. The F1 vs. Accuracy Explainer (Week 3)**
A model that predicts "no wildfire" for every observation achieves 95% accuracy on an imbalanced dataset. Walk the dean through the AI agent explaining precision and recall in that specific context. Concrete, non-trivial, and immediately intuitive.

**3. Cluster Interpretation on Humboldt County Data (Week 10)**
Show a PCA + k-means run on census tract socioeconomic variables for Humboldt County. Let the dean see students asking the agent "what does cluster 3 mean?" and the agent responding with domain-grounded questions rather than a made-up answer. This hits the "data for good" identity directly.

**4. The Model Card for a Health Outcome Classifier (Week 14)**
Show a draft model card for a classifier predicting hospital readmission. Let the agent redline it — pointing out missing training data documentation, an overconfident accuracy claim, and no mention of demographic subgroup performance. This demonstrates AI as a quality gate, not just a helper.

**5. The Collaboration Log (Week 14–15)**
Show a student's collaboration log where they prompted the agent to help with feature selection, the agent recommended dropping a variable incorrectly, and the student caught and documented the error. This is the dean's strongest evidence that the pilot develops critical AI use, not passive dependence.

---

## 7. Alignment Notes

| Item | Alignment |
|---|---|
| Official catalog description | Fully covered: supervised (Weeks 3–8), unsupervised (Weeks 9–11), best practices (Weeks 2, 5, 14) |
| Prerequisites honored | DATA 271 content assumed for feature engineering; MATH 107 assumed for PCA intuition; STAT 109 assumed for regression review |
| Program identity ("data for good") | Environmental and social datasets used in all three projects; fairness metrics covered in Week 14 |
| 300-level rigor | No hand-holding on Python basics; all modeling done in code; projects require interpretation, not just execution |
| AI pilot requirements | AI agent introduced Week 1; assessed in all three projects; collaboration log is a graded deliverable |
| Spring 2027 scheduling | 15 instructional weeks assumed; final week is presentations only (no new content) |

---

*Document prepared by: Darrell Ross, proposed instructor, Spring 2027*  
*Last updated: May 2026*
