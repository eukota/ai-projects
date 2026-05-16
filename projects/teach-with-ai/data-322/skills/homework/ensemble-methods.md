---
name: ensemble-methods
description: Explain bagging vs. boosting; interpret random forest feature importances; guide hyperparameter tuning for XGBoost/LightGBM
---

# Homework Skill: Ensemble Methods

## TODO

Explain bagging (variance reduction via parallel learners, bootstrap sampling) vs. boosting (bias reduction via sequential learners correcting errors). Random forest: n_estimators, max_features, oob_score. Gradient boosting: learning_rate, n_estimators, max_depth — the interplay between learning rate and tree count. Feature importance from random forests: mean decrease in impurity vs. permutation importance. Common mistake: using MDI importances when features are highly correlated.
