---
name: project-1-classification
description: Guide students through the Project 1 classification pipeline — dataset selection, EDA, model comparison, CV harness, evaluation, and the written deliverable
---

# Project 1: Classification on a Real-World Tabular Dataset

**Weeks 4–8 | Deliverable due end of Week 8**

## Project Overview

Students build an end-to-end binary or multiclass classification pipeline on a tabular dataset with real-world stakes. The dataset is student-selected from a curated approved list. The deliverable is a Jupyter notebook with a documented pipeline and a 5-minute recorded walkthrough.

---

## Approved Dataset Categories

- **Environmental monitoring:** wildfire perimeter data, air quality index by county, stream flow measurements
- **Public health:** disease outcome data (CDC WONDER, state health departments), hospital readmission records
- **Cal Poly Humboldt campus data:** energy usage by building, dining hall waste tracking
- **USDA agricultural data:** crop yield outcomes, pesticide application records

Students must get dataset approval from the instructor before Week 5. The dataset must have a clear binary or multiclass target, at least 500 rows, and not be a well-known benchmark dataset (no Titanic, no Iris).

---

## Rubric Summary

| Component | Weight |
|---|---|
| EDA quality: identified and addressed data issues before modeling | 20% |
| Pipeline correctness: no leakage, proper CV, preprocessing inside split | 25% |
| Model comparison: at least 3 algorithms, honest evaluation with CV | 25% |
| Interpretation: feature importance, confusion matrix narrative, domain meaning | 15% |
| Collaboration log: specific, critical, documented AI errors or disagreements | 15% |

---

## Agent Guidance for Each Phase

### Phase 1: Dataset Selection and EDA (Week 4)

When a student is selecting a dataset, ask:
- "Does this dataset have a clear, pre-existing target variable, or are you constructing one? If you're constructing it, explain how — that's a design decision that goes in your report."
- "How many rows and features? What's the class balance on your target?"
- "Are there any features that would be unavailable at prediction time in a real deployment?" (This is the leakage setup question.)

When reviewing EDA, use the `intro-eda-review` checklist. The EDA section of the notebook must show:
- Shape, dtypes, missing value counts
- Target distribution with class balance
- At least two visualizations that informed a preprocessing decision
- The train/test split done before any preprocessing

### Phase 2: Pipeline Construction (Weeks 5–6)

The correct pattern is a sklearn `Pipeline` with preprocessing steps before the estimator:

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
    ("clf", RandomForestClassifier(n_estimators=100, random_state=42))
])
```

The scaler and imputer fit on `X_train` only when this Pipeline is passed to `cross_val_score` or `GridSearchCV`. This is the correct leakage-free pattern.

If a student shows code where `.fit_transform()` was called on the full dataset before splitting, flag this immediately and explain the leakage.

### Phase 3: Model Comparison (Weeks 5–6)

The minimum set is logistic regression, decision tree, and random forest. Students who want to add XGBoost, SVM, or a neural network are encouraged to.

The comparison must use cross-validation, not a single train/test split. For imbalanced classes, require stratified k-fold. Report mean ± std of the primary metric.

Metric selection: for imbalanced classes, push students away from accuracy toward F1 (macro or weighted, depending on whether they care equally about all classes). Ask: "If your model got the majority class right 100% of the time and the minority class right 0% of the time, what would your accuracy be? Is that a good model?"

### Phase 4: Interpretation and Narrative (Week 8)

The notebook must include a section answering these questions in plain language:
1. Which model performed best and why do you think that is?
2. Which features mattered most? What does that mean for the domain?
3. What are the failure modes — when does your best model get it wrong?
4. Who would use this model and what decision would it inform?

If a student writes "the random forest had the highest F1 score" and stops there, that is not sufficient. They must connect the model performance to the real-world context of their dataset.

---

## Common Mistakes to Flag

**Fitting preprocessors before splitting.** See above. Always flag, always explain why.

**Reporting accuracy on imbalanced data.** If class balance is less than 80/20, accuracy is misleading. Require F1 or ROC-AUC.

**Using a single train/test split for model comparison.** If the test set was used to pick the best model, it is no longer a valid holdout. Require CV for model comparison and preserve the test set for final evaluation only.

**Feature importance from a pipeline without extracting the estimator.** `pipe.named_steps['clf'].feature_importances_` is the correct access pattern.

**Confusing correlation with causation in feature importance interpretation.** "The most important feature was X" is not the same as "X causes the outcome." Push students to phrase this carefully.

---

## Collaboration Log for Project 1

The log must include at minimum:
1. One entry from the EDA phase: what did you ask the AI, what did it say, what did you do differently?
2. One entry from model debugging: a specific debugging interaction with the class agent or Copilot.
3. One documented case where the AI was wrong or you chose not to follow its suggestion.

A log that consists only of "the agent helped me understand cross-validation" is not sufficient. It must be specific and must include a critical assessment.
