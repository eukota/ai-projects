---
name: decision-trees
description: Explain overfitting via tree depth; guide pruning and depth decisions
---

# Homework Skill: Decision Trees

## Purpose

This skill is active during Week 4 and supports Project 1. Decision trees are the second required classifier and the most intuitive entry point to understanding overfitting. The goal here is less about getting code working and more about developing the diagnostic habit: train vs. validation performance gap as the overfitting signal.

---

## Ask Before Explaining

If a student shows a decision tree with high training accuracy but asks why validation is poor: "Before I explain — what do you think is happening when a tree with unlimited depth makes a prediction on a new data point it's never seen?"

If they ask about Gini vs. entropy: "Do you have a hypothesis about which gives better results on your dataset? Have you tried both?"

If they're asking what `feature_importances_` means: "In your own words, what would a high importance score mean for a feature? What does that tell you about the model's decision process — and what does it not tell you?"

---

## How Trees Split

At each node, the tree searches every feature and every possible split point to find the partition that most reduces impurity. Gini impurity and entropy are two ways to measure impurity — in practice, they produce nearly identical trees. The choice rarely matters. If a student is agonizing over it, redirect: "Run both. If the results differ meaningfully, that's interesting. If they don't, move on."

The key concept: a tree with no depth limit will fit the training data perfectly by eventually having one sample per leaf. This is the most extreme form of overfitting.

---

## Diagnosing Overfitting via Depth

Have the student produce a learning curve across depths:

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score
import matplotlib.pyplot as plt

train_scores = []
val_scores = []
depths = range(1, 21)

for d in depths:
    dt = DecisionTreeClassifier(max_depth=d, random_state=42)
    train_scores.append(dt.fit(X_train, y_train).score(X_train, y_train))
    val_scores.append(cross_val_score(dt, X_train, y_train, cv=5).mean())

plt.plot(depths, train_scores, label="Train")
plt.plot(depths, val_scores, label="Validation (CV)")
plt.xlabel("max_depth")
plt.legend()
```

Ask: "Where do the two lines diverge? What depth is the crossover point?" That crossover is where the model starts memorizing training noise instead of learning the pattern.

---

## The Three Pruning Knobs

`max_depth`: Maximum levels in the tree. Most direct lever. Start here.

`min_samples_split`: A node with fewer than this many samples cannot be split. Increasing it prevents the tree from partitioning very small subsets.

`min_samples_leaf`: A leaf must have at least this many samples. Prevents leaves representing single outliers.

The typical tuning sequence: find a reasonable `max_depth` with the learning curve above, then experiment with `min_samples_leaf` (values 5–20 are common starting points for datasets with hundreds of rows).

Ask: "What max_depth did your learning curve suggest? Did you try it?"

---

## Feature Importances

```python
import pandas as pd

importances = pd.Series(
    dt.feature_importances_,
    index=X_train.columns
).sort_values(ascending=False)
print(importances.head(10))
```

`feature_importances_[i]` is the mean decrease in impurity attributable to feature i across all splits. Higher is more "used."

**The causation trap.** Ask: "Your most important feature is X. Does that mean X causes the outcome?" It does not. It means the model found X useful for splitting. Feature importance is a property of the model on this training data — not a claim about the real world.

Also ask: "Are any of your top features correlated with each other?" Correlated features split importance between them, making both look less important than either would be alone. This is a limitation of MDI importance — it's introduced fully in the ensemble methods skill.

---

## Connection to Project 1

Decision trees are required as one of the three classifiers in Project 1. More importantly, the overfitting/depth relationship is the conceptual foundation for understanding why random forests work — covered next week. When reviewing a student's Project 1 tree, ask them to show the depth learning curve. A tree at `max_depth=None` in a project submission is a red flag.
