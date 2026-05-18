---
name: svm
description: Explain SVM margin and kernel intuition without derivation; guide C parameter and kernel selection
---

# Homework Skill: Support Vector Machines

## Purpose

This skill is active during Week 9 — after Project 1 wraps. SVM is core curriculum but placed intentionally so students learn it without a deadline in the way. The goal is building clean intuition about margin, support vectors, and the kernel trick without requiring students to understand the full optimization derivation.

---

## Ask Before Explaining

Before explaining SVM margin: "You've used logistic regression and random forest — both draw decision boundaries. What do you think it means to draw a 'good' boundary between two classes?"

Before explaining the kernel trick: "In two dimensions, can you draw a line that perfectly separates two groups if one group is arranged in a ring around the other? What would you need to do to make them separable?"

Before discussing the C parameter: "Would you rather have a model that's confident it got the training data right, or one that's less certain but leaves more room for error on new data?"

---

## The Margin Intuition

A decision boundary that barely grazes the training points is fragile — a small shift in the data would cross it. A boundary that runs through the middle of the empty space between classes is more robust.

The SVM finds the boundary that maximizes the margin: the width of the gap between the decision boundary and the nearest points of each class. Those nearest points are the support vectors — the only training points that actually determine the boundary. All other points could be removed and the model wouldn't change.

Ask: "If you add 1000 new training points far from the decision boundary, does the SVM change? Why or why not?"

---

## Soft Margin and the C Parameter

Real data isn't cleanly separable. The soft-margin SVM allows some training points to fall inside the margin or on the wrong side, controlled by C:

- **High C:** the model tolerates very few misclassifications in training — tight margin, complex boundary, prone to overfitting.
- **Low C:** the model allows more training errors in exchange for a wider margin — simpler boundary, better generalization.

C is a regularization parameter, analogous to the inverse of alpha in Ridge regression. Increase C = less regularization = more complex model.

```python
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV

param_grid = {"C": [0.1, 1, 10, 100], "kernel": ["rbf"]}
svm = GridSearchCV(SVC(), param_grid, cv=5, scoring="f1_weighted")
svm.fit(X_train_scaled, y_train)
print("Best params:", svm.best_params_)
```

**Scaling is required.** SVM uses distance, so features on different scales will dominate the margin calculation. Always scale before fitting an SVM.

Ask: "Did you scale your features? What happens to the margin if one feature ranges 0–1 and another ranges 0–10,000?"

---

## The Kernel Trick

Some data is not linearly separable in its original feature space, but would be separable if you could add dimensions. The kernel trick computes the similarity between points in a higher-dimensional space without explicitly computing the coordinates in that space — it's computationally feasible where the explicit transformation is not.

Common kernels:
- **Linear:** no transformation, fast, use when you believe the boundary is linear.
- **RBF (Radial Basis Function):** a Gaussian similarity measure, effective for nonlinear boundaries. The `gamma` parameter controls how "local" the influence of each training point is — high gamma = very local = wiggly boundary = overfitting risk.
- **Polynomial:** explicit polynomial interaction terms up to a given degree.

For most problems without a strong prior on linearity, start with RBF and tune C and gamma together via grid search.

---

## When to Use SVM vs. Random Forest

This is the interpretive question Week 9 is really asking. Guide the student to reason through it rather than giving a rule:

Ask: "What do you care more about here — interpretability of the model (what features drive the prediction) or raw predictive performance on this dataset? How large is the dataset?"

General heuristics (student should arrive at these through the conversation, not be told):
- SVMs scale poorly to very large datasets — training time is O(n²) to O(n³).
- SVMs work well on high-dimensional data with few samples (e.g., genomic data, text after TF-IDF).
- Random forests give feature importances; SVMs don't (support vectors are hard to interpret).
- Both require scaling; random forests do not.

The right answer is always "it depends on the problem." A student who says "random forest is always better" hasn't engaged with the question.
