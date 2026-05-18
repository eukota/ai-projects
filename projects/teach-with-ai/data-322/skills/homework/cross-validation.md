---
name: cross-validation
description: Identify correct vs. incorrect CV setup in student code; explain stratification and why it matters for imbalanced classes
---

# Homework Skill: Cross-Validation

## Purpose

This skill is active during Week 6 and is essential for Project 1. Cross-validation is where the most common student mistakes live — not conceptual misunderstanding, but subtle implementation errors that make results silently wrong. This skill's job is to find those errors in student code before the project is submitted.

---

## Ask Before Explaining

If a student says "my model gets 0.91 accuracy": "Is that from a single train/test split or from cross-validation? And is accuracy the right metric for your class balance?"

If they show CV code: "Walk me through this code line by line. When exactly does your scaler fit? Is it inside or outside the cross-validation loop?"

If they ask why CV matters: "If you split your dataset once and got 0.87 accuracy, and your classmate split the same dataset differently and got 0.79, which is the right number? How would you know?"

---

## Why a Single Split Lies to You

A single train/test split gives you one estimate of generalization error. But that estimate has high variance — it depends on which specific samples landed in train vs. test. On a 500-row dataset, a different random_state can shift your accuracy by 5 percentage points.

k-fold CV averages over k different splits, giving a more stable estimate. The standard deviation across folds is as important as the mean — it tells you how much to trust the number.

Always report: mean ± std. A model with 0.87 ± 0.02 is more trustworthy than 0.91 ± 0.08.

---

## The Correct CV Pattern

The single most common mistake: fitting a scaler (or any preprocessor) on the full training set before cross-validation. This leaks test-fold statistics into training.

**Wrong:**
```python
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)   # leakage: uses all fold data
scores = cross_val_score(clf, X_scaled, y_train, cv=5)
```

**Correct:**
```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("clf", LogisticRegression())
])

scores = cross_val_score(pipe, X_train, y_train, cv=5, scoring="f1_weighted")
print(f"{scores.mean():.3f} ± {scores.std():.3f}")
```

When `cross_val_score` uses a Pipeline, the scaler is refit on each training fold and applied to the held-out fold. No leakage.

Ask: "Show me where in your code the scaler's `.fit()` happens. Is it inside or outside the CV split?"

---

## Stratified CV for Imbalanced Classes

If the positive class is 10% of your dataset and you split randomly, some folds may have 5% or 20% positive — the model sees different class distributions in each fold, making scores unstable and misleading.

`StratifiedKFold` preserves the class proportion in each fold:

```python
from sklearn.model_selection import StratifiedKFold, cross_val_score

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(pipe, X_train, y_train, cv=cv, scoring="f1_weighted")
```

`cross_val_score` uses stratification by default for classifiers, but making it explicit is clearer and safer.

For small datasets (< 300 rows), `RepeatedStratifiedKFold` reduces variance further:

```python
from sklearn.model_selection import RepeatedStratifiedKFold

cv = RepeatedStratifiedKFold(n_splits=5, n_repeats=10, random_state=42)
```

---

## The Test Set Is Not Part of Model Selection

Ask: "When did you look at your test set?" The answer should be: once, at the very end, after all model selection is done.

If a student used the test set to compare models — even just to look at the numbers — then chose the model with the best test performance, the test set is no longer a valid holdout. Its performance estimate is optimistic. The correct pattern: use CV on the training set for all model selection; evaluate on the test set once as a final sanity check.

---

## Connection to Project 1

Project 1 requires CV for model comparison. A submission that compares logistic regression, decision tree, and random forest using a single train/test split — or worse, evaluates on the test set while selecting the model — cannot receive full credit on the pipeline correctness component (25% of the grade). When reviewing a student's code, this is the first thing to check.
