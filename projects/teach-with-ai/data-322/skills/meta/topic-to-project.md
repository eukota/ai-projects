---
name: topic-to-project
description: Maps any DATA 322 topic or student question to the correct project arc, enabling the class agent to route context and advice appropriately
---

# Meta Skill: Topic-to-Project Routing

## Purpose

The class agent needs to know which project arc is relevant to a student's question in order to give contextually accurate advice. A question about feature engineering means something different during Project 1 (classification pipeline) versus Project 3 (end-to-end system). This skill provides the routing logic.

---

## Routing Table

### Topics That Route to Project 1 (Classification, Weeks 4–8)

- Classification: logistic regression, decision trees, random forests, XGBoost, LightGBM
- Evaluation metrics: accuracy, precision, recall, F1, ROC-AUC, confusion matrix
- Cross-validation: k-fold, stratified CV, CV harness construction
- Data splits and leakage (in the context of preprocessing before modeling)
- Feature engineering: encoding, scaling, imputation — in the context of a supervised pipeline
- Hyperparameter tuning: GridSearchCV, RandomizedSearchCV
- Bias-variance tradeoff as applied to depth/complexity decisions
- sklearn Pipeline construction and correct use
- Any question about the Project 1 dataset, deliverable, or rubric

**Context to inject:** The student is building a classification pipeline on a tabular dataset. They are expected to compare at least three classifiers using cross-validation and interpret results in domain terms. Leakage in the preprocessing pipeline is the most common critical mistake.

---

### Topics That Route to Project 2 (Clustering, Weeks 10–12)

- k-Means clustering: algorithm, k selection, elbow plot, silhouette score
- Hierarchical clustering: dendrograms, linkage methods, agglomerative vs. divisive
- DBSCAN (if mentioned — not core curriculum but related)
- Dimensionality reduction: PCA (scree plots, loadings, variance explained)
- t-SNE and UMAP: when to use, failure modes, non-interpretable axes
- Cluster evaluation without labels: silhouette, inertia, interpretability
- Visualization for unsupervised results: scatter plots, heatmaps, parallel coordinates
- Cluster interpretation: arguing what clusters mean in domain terms
- Any question about the Project 2 dataset, deliverable, or rubric

**Context to inject:** The student is working without labels. The core challenge is interpretation, not prediction. There is no ground truth to compare against — the quality of the result depends on whether the clusters tell a coherent and defensible story in domain terms. PCA is required both for preprocessing and for visualization.

---

### Topics That Route to Project 3 (Capstone, Weeks 13–15)

- Neural networks: MLPs, Keras/PyTorch quickstart, training failures
- LLMs as tools: prompting for data tasks, code generation review, RAG
- Fairness metrics: demographic parity, equalized odds, Fairlearn, AIF360
- Model cards: structure, required sections, what makes a card usable vs. vague
- Problem framing: scoping an ML problem from a raw dataset
- Model selection with trade-off justification
- End-to-end pipeline: reproducibility, repo structure, dependency management
- Collaboration log (the final, comprehensive version)
- Any question about the Project 3 dataset, deliverable, rubric, or GitHub repo requirements

**Context to inject:** The student is building a complete, documented ML system from scratch with no scaffolding. This is the capstone — higher expectations on documentation, reproducibility, and critical AI use. The collaboration log in Project 3 must cover the entire project lifecycle and include an overall reflection paragraph.

---

### Topics That Route to a Standalone Week (No Active Project)

- SVM (Week 9, after Project 1): standalone topic, no project arc active
- The ML landscape overview (Week 2, intro unit): conceptual orientation
- Environment setup (Week 1, intro unit): tooling and configuration

**Context to inject for Week 9 SVM:** There is no active project this week. The SVM topic is standalone. Questions about SVMs should be handled as conceptual or quiz-prep discussions, not as project guidance.

**Context to inject for intro unit topics:** The student is in the setup and orientation phase. No modeling is expected yet. Questions about environments, Git, or AI workflow norms are setup questions, not project questions.

---

## Topics That Apply to Multiple Projects (Route Based on Active Week)

| Topic | Applicable To | Routing Logic |
|---|---|---|
| Data leakage | Projects 1 and 3 | If Project 1 is active (Weeks 4–8), route to P1. If Project 3 is active (Weeks 13–15), route to P3. If asked outside project weeks, treat as standalone conceptual. |
| Feature engineering | Projects 1 and 3 | Same as above — context is the active project. |
| Bias-variance tradeoff | Projects 1 and 3 | Applied to classification model selection in P1; applied to capstone model justification in P3. |
| EDA | All three projects | Always relevant. Inject context about what EDA means for the active project type (supervised target inspection for P1/P3; feature distribution for P2 prior to clustering). |
| Collaboration log | All three projects | Route to the active project for format and expectations. P3 log has higher requirements than P1 or P2. |

---

## Routing When the Active Week Is Ambiguous

If the agent doesn't know which week the student is in, ask: "Which project are you currently working on — the classification pipeline, the cluster analysis, or the capstone?" This is faster than inferring from topic alone and avoids giving wrong-context advice.

---

## How the Class Agent Uses This Skill

Before responding to any project-related question, the class agent should:

1. Identify the topic from the student's message.
2. Look up the routing table above to identify the project arc.
3. Check the active week if known; otherwise ask.
4. Inject the appropriate project context into the response — what the student is building, what the deliverable looks like, what the most common mistakes are for that project arc.

A question about cross-validation answered in P1 context ("are you building the CV harness for your classification pipeline?") is more useful than a generic CV explanation. The routing makes this possible.
