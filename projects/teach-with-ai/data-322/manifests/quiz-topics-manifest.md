# Quiz Topics Manifest — DATA 322

Maps every quiz prep question bank to the skill file it lives in, the week(s) it is tested, the project arc it relates to, and a topic category. This is the master reference for building in-class tests.

**How to use this manifest:** to construct a test covering a given week range, filter by the `Weeks tested` column. The questions live in the `## Quiz Prep` section of the linked skill file. Pull from those sections directly — do not rewrite or paraphrase; the question banks are written to match the level and style of the in-class tests.

---

## Unit 0 — Introduction (Weeks 1–3)

| Topic | Skill file | Weeks tested | Project arc | Category |
|---|---|---|---|---|
| Python environment: kernel mismatch diagnosis | [intro-environment](../skills/homework/intro-environment.md) | 1, any | none | environment setup |
| conda environments vs. base Python | [intro-environment](../skills/homework/intro-environment.md) | 1, any | none | environment setup |
| Git commit mechanics and course repo rationale | [intro-environment](../skills/homework/intro-environment.md) | 1 | none | version control |
| `python -m ipykernel install` — what it does | [intro-environment](../skills/homework/intro-environment.md) | 1 | none | environment setup |
| Risk of installing into base conda | [intro-environment](../skills/homework/intro-environment.md) | 1 | none | environment setup |
| Infra: kernel mismatch fix | [infra-setup-rubric](../skills/homework/infra-setup-rubric.md) | 1 | none | environment setup |
| Infra: named vs. base environment | [infra-setup-rubric](../skills/homework/infra-setup-rubric.md) | 1 | none | environment setup |
| Infra: ipykernel install purpose | [infra-setup-rubric](../skills/homework/infra-setup-rubric.md) | 1 | none | environment setup |
| Infra: git config global email | [infra-setup-rubric](../skills/homework/infra-setup-rubric.md) | 1 | none | version control |
| Infra: conda activate failing | [infra-setup-rubric](../skills/homework/infra-setup-rubric.md) | 1 | none | environment setup |
| Collaboration log completeness | [intro-ai-workflow](../skills/homework/intro-ai-workflow.md) | 2, any | all | AI collaboration |
| Why log entries require disagreement or correction | [intro-ai-workflow](../skills/homework/intro-ai-workflow.md) | 2, any | all | AI collaboration |
| Copilot suggestion: when to log it | [intro-ai-workflow](../skills/homework/intro-ai-workflow.md) | 2 | all | AI collaboration |
| AI use vs. learning from AI | [intro-ai-workflow](../skills/homework/intro-ai-workflow.md) | 2 | all | AI collaboration |
| Collaboration norms: full AI authorship | [intro-ai-workflow](../skills/homework/intro-ai-workflow.md) | 2 | all | AI collaboration |
| Leakage-revealing column (`outcome_date`) | [intro-eda-review](../skills/homework/intro-eda-review.md) | 3, 4, 6 | P1, P3 | data leakage |
| Missing data: decision process for 60% missing | [intro-eda-review](../skills/homework/intro-eda-review.md) | 3 | all | data quality |
| Imbalanced target: which metrics mislead | [intro-eda-review](../skills/homework/intro-eda-review.md) | 3, 4 | P1, P3 | evaluation metrics |
| Train/test split before preprocessing — why | [intro-eda-review](../skills/homework/intro-eda-review.md) | 3, 6 | all | data leakage |
| Correlated features: when to drop | [intro-eda-review](../skills/homework/intro-eda-review.md) | 3, 5 | P1, P3 | feature engineering |

---

## Unit 1 — Supervised Learning (Weeks 4–9)

| Topic | Skill file | Weeks tested | Project arc | Category |
|---|---|---|---|---|
| Scaler leakage before CV | [data-splits-leakage](../skills/homework/data-splits-leakage.md) | 4, 6 | P1, P3 | data leakage |
| Future-value feature leakage (`readmission_date`) | [data-splits-leakage](../skills/homework/data-splits-leakage.md) | 4 | P1, P3 | data leakage |
| Validation set vs. test set distinction | [data-splits-leakage](../skills/homework/data-splits-leakage.md) | 6 | P1 | model evaluation |
| Train/test gap: two plausible explanations | [data-splits-leakage](../skills/homework/data-splits-leakage.md) | 6 | P1 | model evaluation |
| Using test set for model selection: why invalid | [data-splits-leakage](../skills/homework/data-splits-leakage.md) | 6 | P1 | model evaluation |
| Ordinal vs. one-hot encoding | [feature-engineering](../skills/homework/feature-engineering.md) | 4, 5 | P1, P3 | feature engineering |
| Scaling: why trees don't need it but logistic regression does | [feature-engineering](../skills/homework/feature-engineering.md) | 4–6 | P1 | feature scaling |
| Missing data 35%: options and risks | [feature-engineering](../skills/homework/feature-engineering.md) | 4 | all | data quality |
| Imputation leakage: mean from full dataset | [feature-engineering](../skills/homework/feature-engineering.md) | 4, 6 | P1, P3 | data leakage |
| High-cardinality categorical encoding | [feature-engineering](../skills/homework/feature-engineering.md) | 5 | P1, P3 | feature engineering |
| Logistic regression: interpreting a coefficient | [logistic-regression](../skills/homework/logistic-regression.md) | 4, 8 | P1 | model interpretation |
| ConvergenceWarning: two causes, correct fix order | [logistic-regression](../skills/homework/logistic-regression.md) | 4 | P1 | debugging |
| `predict()` vs. `predict_proba()` | [logistic-regression](../skills/homework/logistic-regression.md) | 4, 6 | P1 | model evaluation |
| Accuracy on imbalanced data: what it hides | [logistic-regression](../skills/homework/logistic-regression.md) | 4, 6 | P1 | evaluation metrics |
| Coefficient comparison across unscaled features | [logistic-regression](../skills/homework/logistic-regression.md) | 4, 7 | P1 | model interpretation |
| Decision tree: why `max_depth=None` is a problem | [decision-trees](../skills/homework/decision-trees.md) | 4, 5 | P1 | overfitting |
| Learning curve divergence at depth 5 | [decision-trees](../skills/homework/decision-trees.md) | 5, 6 | P1 | overfitting |
| Feature importance: correlation ≠ causation | [decision-trees](../skills/homework/decision-trees.md) | 5, 8 | P1 | model interpretation |
| `min_samples_split` vs. `min_samples_leaf` | [decision-trees](../skills/homework/decision-trees.md) | 4, 5 | P1 | hyperparameter tuning |
| Gini vs. entropy: when it matters | [decision-trees](../skills/homework/decision-trees.md) | 4 | P1 | model selection |
| Bagging: error type reduced and why | [ensemble-methods](../skills/homework/ensemble-methods.md) | 5, 6 | P1 | ensemble methods |
| Bagging vs. boosting fundamental difference | [ensemble-methods](../skills/homework/ensemble-methods.md) | 5, 8 | P1 | ensemble methods |
| MDI importance: two reasons not to trust comparison | [ensemble-methods](../skills/homework/ensemble-methods.md) | 5, 8 | P1 | model interpretation |
| Gradient boosting: correcting residuals mechanically | [ensemble-methods](../skills/homework/ensemble-methods.md) | 5 | P1 | ensemble methods |
| Learning rate and n_estimators coupling | [ensemble-methods](../skills/homework/ensemble-methods.md) | 5 | P1 | hyperparameter tuning |
| CV: what a single split number doesn't tell you | [cross-validation](../skills/homework/cross-validation.md) | 6, 8 | P1 | model evaluation |
| Scaler inside Pipeline vs. outside CV | [cross-validation](../skills/homework/cross-validation.md) | 6 | P1 | data leakage |
| Comparing models with same test score but different CV variance | [cross-validation](../skills/homework/cross-validation.md) | 6, 8 | P1 | model selection |
| Stratified k-fold: when regular k-fold misleads | [cross-validation](../skills/homework/cross-validation.md) | 6 | P1 | model evaluation |
| Test set for model comparison: why invalid | [cross-validation](../skills/homework/cross-validation.md) | 6 | P1 | model evaluation |
| Ridge regression: problem it solves | [regression-regularization](../skills/homework/regression-regularization.md) | 7, 8 | P1 | regression |
| Lasso zeroing features: careful interpretation | [regression-regularization](../skills/homework/regression-regularization.md) | 7 | P1 | regression |
| Ridge vs. Lasso with correlated features | [regression-regularization](../skills/homework/regression-regularization.md) | 7 | P1 | regression |
| Scaling before regularized regression: why required | [regression-regularization](../skills/homework/regression-regularization.md) | 7 | P1 | feature scaling |
| Alpha increase: effect on bias, variance, coefficients | [regression-regularization](../skills/homework/regression-regularization.md) | 7 | P1 | regression |
| SVM margin: why wider is better | [svm](../skills/homework/svm.md) | 9 | standalone | SVM |
| Support vectors: significance and stability | [svm](../skills/homework/svm.md) | 9 | standalone | SVM |
| High C: trade-off and risk | [svm](../skills/homework/svm.md) | 9 | standalone | SVM |
| Kernel trick: conceptual explanation | [svm](../skills/homework/svm.md) | 9 | standalone | SVM |
| SVM on 50,000-row dataset: practical concern | [svm](../skills/homework/svm.md) | 9 | standalone | SVM |

Also covered in the consolidated quiz-prep-agent:

| Topic | Skill file | Weeks tested | Project arc | Category |
|---|---|---|---|---|
| Bias-variance tradeoff intuition | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 5, 6, 8 | P1 | bias-variance |
| Bias-variance: depth effect on trees | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 5, 6 | P1 | bias-variance |
| Bias-variance: random forests reduce variance | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 5 | P1 | ensemble methods |
| Precision vs. recall: scenario-based | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 4, 6, 8 | P1 | evaluation metrics |
| Feature scaling: which algorithms need it | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 4–6 | P1 | feature scaling |
| Overfitting: learning curve patterns | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 5, 6 | P1 | overfitting |

---

## Unit 2 — Unsupervised Learning (Weeks 10–12)

| Topic | Skill file | Weeks tested | Project arc | Category |
|---|---|---|---|---|
| k-Means: scaling requirement reason | [clustering-kmeans](../skills/homework/clustering-kmeans.md) | 10, 12 | P2 | clustering |
| k-Means: silhouette vs. domain at k=3 vs. k=5 | [clustering-kmeans](../skills/homework/clustering-kmeans.md) | 10, 12 | P2 | clustering |
| k-Means: what the algorithm guarantees and doesn't | [clustering-kmeans](../skills/homework/clustering-kmeans.md) | 10 | P2 | clustering |
| Elbow plot: why inertia always decreases | [clustering-kmeans](../skills/homework/clustering-kmeans.md) | 10, 12 | P2 | clustering |
| Centroid description vs. domain interpretation | [clustering-kmeans](../skills/homework/clustering-kmeans.md) | 10, 12 | P2 | clustering |
| Hierarchical clustering vs. k-means: when to choose | [clustering-kmeans](../skills/homework/clustering-kmeans.md) | 10, 11 | P2 | clustering |
| k-Means algorithm steps in plain language | [kmeans-clustering](../skills/homework/kmeans-clustering.md) | 10 | P2 | clustering |
| k-means++ vs. random initialization | [kmeans-clustering](../skills/homework/kmeans-clustering.md) | 10 | P2 | clustering |
| Smooth elbow plot: interpretation | [kmeans-clustering](../skills/homework/kmeans-clustering.md) | 10 | P2 | clustering |
| k-Means without scaling: trust question | [kmeans-clustering](../skills/homework/kmeans-clustering.md) | 10 | P2 | clustering |
| Silhouette score: plain language definition | [kmeans-clustering](../skills/homework/kmeans-clustering.md) | 10, 12 | P2 | clustering |
| 2D PCA with < 50% variance: risk | [dimensionality-reduction-pca](../skills/homework/dimensionality-reduction-pca.md) | 11, 12 | P2 | dimensionality reduction |
| PCA loading: plain language interpretation | [dimensionality-reduction-pca](../skills/homework/dimensionality-reduction-pca.md) | 11, 12 | P2 | dimensionality reduction |
| PCA scaling requirement | [dimensionality-reduction-pca](../skills/homework/dimensionality-reduction-pca.md) | 11 | P2 | dimensionality reduction |
| t-SNE "beautiful clusters" skepticism | [dimensionality-reduction-pca](../skills/homework/dimensionality-reduction-pca.md) | 11, 12 | P2 | dimensionality reduction |
| PCA as preprocessing vs. PCA as visualization | [dimensionality-reduction-pca](../skills/homework/dimensionality-reduction-pca.md) | 11, 12 | P2 | dimensionality reduction |
| PCA for k-means: gain and loss | [dimensionality-reduction-pca](../skills/homework/dimensionality-reduction-pca.md) | 11 | P2 | dimensionality reduction |
| PCA: first PC definition | [pca](../skills/homework/pca.md) | 11 | P2 | dimensionality reduction |
| Scree plot: 4 components at 88% — how many to keep | [pca](../skills/homework/pca.md) | 11 | P2 | dimensionality reduction |
| PCA loading to plain language | [pca](../skills/homework/pca.md) | 11, 12 | P2 | dimensionality reduction |
| PCA as preprocessing before k-means | [pca](../skills/homework/pca.md) | 11 | P2 | dimensionality reduction |
| PCA vs. t-SNE: what each preserves | [pca](../skills/homework/pca.md) | 11, 12 | P2 | dimensionality reduction |

Also covered in the consolidated quiz-prep-agent:

| Topic | Skill file | Weeks tested | Project arc | Category |
|---|---|---|---|---|
| PCA vs. t-SNE: axes, failure modes, when to use each | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 11, 12 | P2 | dimensionality reduction |
| Clustering evaluation without labels | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 10–12 | P2 | clustering |
| Silhouette vs. domain when they conflict | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 12 | P2 | clustering |

---

## Unit 3 — Modern ML Practices and Applied AI (Weeks 13–15)

| Topic | Skill file | Weeks tested | Project arc | Category |
|---|---|---|---|---|
| Why activation functions are needed | [neural-networks](../skills/homework/neural-networks.md) | 13, 15 | P3 | neural networks |
| Validation loss diverging: diagnosis and fix | [neural-networks](../skills/homework/neural-networks.md) | 13 | P3 | neural networks |
| MLP on 500-row dataset: right question to ask | [neural-networks](../skills/homework/neural-networks.md) | 13 | P3 | model selection |
| Learning rate: too high vs. too low | [neural-networks](../skills/homework/neural-networks.md) | 13 | P3 | neural networks |
| Gradient boosting vs. neural network: tabular 2,000 rows | [neural-networks](../skills/homework/neural-networks.md) | 13 | P3 | model selection |
| Backpropagation in plain language | [neural-networks](../skills/homework/neural-networks.md) | 13, 15 | P3 | neural networks |
| LLM code: wrong argument TypeError explanation | [llms-as-tools](../skills/homework/llms-as-tools.md) | 14, 15 | P3 | LLMs as tools |
| Hallucination: definition and data science danger | [llms-as-tools](../skills/homework/llms-as-tools.md) | 14 | P3 | LLMs as tools |
| LLM interpreting PCA loadings: skepticism | [llms-as-tools](../skills/homework/llms-as-tools.md) | 14 | P3 | LLMs as tools |
| RAG: plain language explanation and class agent relevance | [llms-as-tools](../skills/homework/llms-as-tools.md) | 14, 15 | P3 | LLMs as tools |
| Rewriting a weak data prompt | [llms-as-tools](../skills/homework/llms-as-tools.md) | 14 | P3 | LLMs as tools |
| LLM: when useful vs. when skeptical | [llms-as-tools](../skills/homework/llms-as-tools.md) | 14 | P3 | LLMs as tools |
| Fairness-model-cards: demographic parity ≠ fairness | [fairness-model-cards](../skills/homework/fairness-model-cards.md) | 15 | P3 | fairness |
| Fairness-model-cards: equalized odds definition | [fairness-model-cards](../skills/homework/fairness-model-cards.md) | 15 | P3 | fairness |
| Fairness impossibility theorem | [fairness-model-cards](../skills/homework/fairness-model-cards.md) | 15 | P3 | fairness |
| Model card: accuracy without context | [fairness-model-cards](../skills/homework/fairness-model-cards.md) | 15 | P3 | model cards |
| Model card: intended use vagueness | [fairness-model-cards](../skills/homework/fairness-model-cards.md) | 15 | P3 | model cards |
| Model card: training data recency risk | [fairness-model-cards](../skills/homework/fairness-model-cards.md) | 15 | P3 | model cards |
| Model card: vague ethical considerations | [fairness-model-cards](../skills/homework/fairness-model-cards.md) | 15 | P3 | model cards |
| Demographic parity vs. equalized odds: choose one | [fairness-model-cards](../skills/homework/fairness-model-cards.md) | 15 | P3 | fairness |
| Fairness-metrics: demographic parity ≠ fair | [fairness-metrics](../skills/homework/fairness-metrics.md) | 15 | P3 | fairness |
| Fairness-metrics: equalized odds beyond demographic parity | [fairness-metrics](../skills/homework/fairness-metrics.md) | 15 | P3 | fairness |
| Fairness-metrics: impossibility when base rates differ | [fairness-metrics](../skills/homework/fairness-metrics.md) | 15 | P3 | fairness |
| Fairness-metrics: hospital FN disparity | [fairness-metrics](../skills/homework/fairness-metrics.md) | 15 | P3 | fairness |
| Fairness-metrics: "no race feature" fallacy | [fairness-metrics](../skills/homework/fairness-metrics.md) | 15 | P3 | fairness |
| Model-cards: accuracy missing context | [model-cards](../skills/homework/model-cards.md) | 15 | P3 | model cards |
| Model-cards: intended use — weak vs. strong | [model-cards](../skills/homework/model-cards.md) | 15 | P3 | model cards |
| Model-cards: training data vs. evaluation data | [model-cards](../skills/homework/model-cards.md) | 15 | P3 | model cards |
| Model-cards: vague ethical considerations | [model-cards](../skills/homework/model-cards.md) | 15 | P3 | model cards |
| Model-cards: 2016–2019 data deployed 2027 | [model-cards](../skills/homework/model-cards.md) | 15 | P3 | model cards |

Also covered in the consolidated quiz-prep-agent:

| Topic | Skill file | Weeks tested | Project arc | Category |
|---|---|---|---|---|
| Fairness: demographic parity vs. equalized odds | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 15 | P3 | fairness |
| Fairness: impossibility result | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 15 | P3 | fairness |
| Fairness: loan approval — which criterion | [quiz-prep-agent](../skills/quiz-prep/quiz-prep-agent.md) | 15 | P3 | fairness |

---

## Topic Categories Reference

The category column uses these values consistently:

| Category | Description |
|---|---|
| environment setup | Python environments, Jupyter kernels, conda/venv |
| version control | Git, GitHub, repos |
| AI collaboration | Collaboration log, AI use norms, critical reflection |
| data quality | Missing data, outliers, distributional issues |
| data leakage | Preprocessing before splits, future-value features, test set misuse |
| feature engineering | Encoding, scaling, imputation |
| feature scaling | Specifically the question of when scaling matters and why |
| evaluation metrics | Accuracy, precision, recall, F1, ROC-AUC, confusion matrix |
| model evaluation | CV, train/test split mechanics, holdout validity |
| model selection | Choosing between model families; trade-off reasoning |
| model interpretation | Coefficients, feature importance, causation traps |
| bias-variance | The tradeoff, overfitting/underfitting patterns |
| overfitting | Learning curves, depth effects, regularization |
| regression | Ridge, Lasso, ElasticNet, residuals |
| ensemble methods | Bagging, boosting, random forest, gradient boosting |
| hyperparameter tuning | GridSearchCV, tuning sequences, parameter effects |
| debugging | ConvergenceWarning, training failures, error diagnosis |
| clustering | k-Means, hierarchical, silhouette, elbow, cluster interpretation |
| dimensionality reduction | PCA, t-SNE, UMAP, scree plots, loadings |
| SVM | Margin, support vectors, C parameter, kernel trick |
| neural networks | MLP, activation functions, backprop, training failures |
| LLMs as tools | Hallucination, prompting, RAG, verification |
| fairness | Demographic parity, equalized odds, impossibility theorem |
| model cards | Required sections, common deficiencies, intended use |

---

## Notes for Test Construction

When building a test for a given week range, use this manifest to identify which questions are in scope. The source questions live in `## Quiz Prep` sections of the skill files — pull them verbatim. Questions are written for 2–4 sentence short answers.

For a test covering Weeks 4–6, pull from: `data-splits-leakage`, `feature-engineering`, `logistic-regression`, `decision-trees`, `ensemble-methods`, `cross-validation`, and the bias-variance/precision-recall/overfitting topics in `quiz-prep-agent`.

Exclude topics from future weeks. Include topics from Unit 0 only if they are still relevant (leakage, collaboration log norms, and EDA are always fair game as they apply across the course).

When the AI-delivered test infrastructure is built, this manifest becomes the input for automated test generation — the system can filter by week and category to construct a balanced test from the question banks.
