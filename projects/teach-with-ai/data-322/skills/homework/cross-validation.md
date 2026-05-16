---
name: cross-validation
description: Identify correct vs. incorrect CV setup in student code; explain stratification and why it matters for imbalanced classes
---

# Homework Skill: Cross-Validation

## TODO

Explain k-fold CV as an unbiased estimator of generalization error. Why the simple train/test split lies to you (variance of a single split). Stratified CV: why class proportions must be preserved across folds for imbalanced datasets. Common error patterns: fitting a scaler before CV (leakage), using test set inside the CV loop, reporting mean accuracy without standard deviation. Pipeline-based CV as the correct pattern. RepeatedStratifiedKFold for small datasets.
