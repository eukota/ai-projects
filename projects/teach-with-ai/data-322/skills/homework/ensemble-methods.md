---
name: ensemble-methods
description: Explain bagging vs. boosting; interpret random forest feature importances; guide hyperparameter tuning for XGBoost/LightGBM
---

# Homework Skill: Ensemble Methods

## Purpose

This skill is active during Week 5 and is central to Project 1. Random forests are the workhorse classifier students will reach for throughout the course. The goal is understanding why ensembles outperform single trees, which hyperparameters matter, and how to interpret feature importances without making misleading claims.

---

## Ask Before Explaining

If a student asks why random forest beats their decision tree: "What was the main failure mode of your single tree? Was it overfitting the training data, or was it underfitting?" The answer shapes whether bagging (variance reduction) is the right explanation to lead with.

If they're confused about which hyperparameters to tune: "What problem are you trying to solve? Is your model currently overfitting, underfitting, or are you just trying to squeeze out more performance?"

If they show feature importances: "Pick the top feature. What does a high importance score actually mean — and what would be a wrong conclusion to draw from it?"

---

## Bagging vs. Boosting

**Bagging (Bootstrap Aggregating):** Each tree is trained on a random bootstrap sample of the training data. The trees are independent — they run in parallel. Predictions are averaged (regression) or voted on (classification). The benefit is variance reduction: each tree overfits a different subset, and their errors cancel out in the aggregate. Random forests add one more source of randomness: each split considers only a random subset of features (`max_features`), which decorrelates the trees.

**Boosting:** Trees are trained sequentially. Each new tree focuses on the samples the previous trees got wrong — it corrects residual error. The benefit is bias reduction. Gradient boosting (XGBoost, LightGBM) is boosting with a gradient descent framing.

Ask: "Which type of error is a random forest better at reducing — bias or variance? How does that compare to gradient boosting?"

---

## Random Forest Hyperparameters

`n_estimators`: Number of trees. More is almost always better up to a point of diminishing returns. 100 is a reasonable default; 500 is safe for most datasets.

`max_features`: Features considered at each split. Default is `sqrt(n_features)` for classification. Lower values decorrelate trees more but can increase bias.

`oob_score=True`: Uses the out-of-bag samples (data not in each tree's bootstrap) as a free validation estimate. Useful for a quick sanity check without a separate val split.

```python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=200,
    max_features="sqrt",
    oob_score=True,
    random_state=42,
    n_jobs=-1
)
rf.fit(X_train, y_train)
print("OOB score:", rf.oob_score_)
```

---

## Gradient Boosting Hyperparameters

The key interplay: `learning_rate` and `n_estimators` are coupled. A low learning rate needs more trees to converge but usually generalizes better. A high learning rate converges faster but is more prone to overfitting.

Rule of thumb for tuning order:
1. Set `n_estimators` high (300–500) and `learning_rate` low (0.05–0.1).
2. Tune `max_depth` (3–6 is typical for boosting; deeper trees fit more complex patterns but overfit faster).
3. If performance is good, reduce `n_estimators` until performance drops — that's the efficient stopping point.

```python
from sklearn.ensemble import GradientBoostingClassifier

gb = GradientBoostingClassifier(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=4,
    random_state=42
)
```

For larger datasets, prefer `HistGradientBoostingClassifier` (sklearn) or XGBoost/LightGBM directly — they're much faster.

---

## Feature Importances: MDI vs. Permutation

**Mean Decrease in Impurity (MDI):** The default `feature_importances_` in sklearn random forests. Measures how much each feature reduced impurity across all trees and splits. Fast to compute, but biased toward high-cardinality and correlated features.

**Permutation importance:** Measures the drop in model performance when a feature's values are randomly shuffled. Model-agnostic, less biased, but slower.

```python
from sklearn.inspection import permutation_importance

result = permutation_importance(rf, X_val, y_val, n_repeats=10, random_state=42)
# result.importances_mean gives the mean score drop per feature
```

The critical question to ask: "Do you have features that are correlated with each other?" If yes, MDI will split importance between them, making both look weaker than either is. Permutation importance handles this better. Ask students to compare both before drawing conclusions.

---

## The Causation Trap (Again)

Same warning as decision trees, amplified because random forest importances look more authoritative. Ask: "Your top feature has importance 0.34. Does that mean removing it from the real-world system would reduce wildfire risk by 34%?" It does not. Importance is a model artifact, not a causal claim. Project 1 narratives that say "vegetation_density causes wildfire risk because it has the highest feature importance" are incorrect and will be flagged.

---

## Connection to Project 1

Random forest is the third required classifier. It will typically be the top performer. The student must explain in their narrative why that is — not just report the number. "Random forest outperformed logistic regression, likely because the relationship between features and the target is nonlinear and the ensemble reduces the overfitting seen in our single decision tree" is the kind of reasoning the project narrative requires.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **Explain bagging in your own words. What type of error does it reduce, and why does averaging many overfit trees produce a model that generalizes better than any single tree?**

2. **What's the fundamental difference between how bagging and boosting combine their base learners? Which one is reducing bias and which is reducing variance?**

3. **Your random forest's top feature has MDI importance 0.41. A classmate says this feature is twice as important as the next one at 0.20. What are two reasons you shouldn't trust that comparison at face value?**

4. **In gradient boosting, what does "focusing on the samples the previous trees got wrong" actually mean mechanically? What is being adjusted and how?**

5. **If you increase `learning_rate` in gradient boosting, what happens to the number of trees you need and why? What's the risk of a very high learning rate?**
