---
name: dimensionality-reduction-pca
description: Interpret a scree plot and PCA loadings; explain variance explained in plain language; contrast PCA with t-SNE/UMAP
---

# Homework Skill: Dimensionality Reduction and PCA

## Purpose

This skill is active during Week 11 and is required for Project 2. PCA serves two distinct roles in this course: as a preprocessing step (reducing noise and redundancy before clustering) and as an interpretive tool (what do the principal components mean?). Students often understand one role without the other. This skill develops both.

---

## Ask Before Explaining

Before explaining PCA: "You have 15 features. What problem do you think 15 dimensions causes, and what would you lose if you reduced to 2?"

If a student shows a scree plot: "Looking at this plot, how many components would you keep? What percentage of variance does that represent? And is 'more variance explained' always better?"

If they show a PCA scatter plot of clusters: "The axes say PC1 and PC2. What do those axes actually represent? Are they the same as any of your original features?"

---

## What PCA Does

PCA finds a new coordinate system for your data such that:
1. The first axis (PC1) points in the direction of maximum variance.
2. Each subsequent axis points in the direction of maximum remaining variance, orthogonal to all previous axes.

The result is a set of new features (principal components) that are uncorrelated with each other. Each PC is a linear combination of the original features.

```python
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca = PCA()  # fit all components first to see variance explained
pca.fit(X_scaled)
```

**Scale before PCA.** PCA is variance-based — features with larger ranges will dominate the first component. StandardScaler first, always.

---

## The Scree Plot

```python
import matplotlib.pyplot as plt
import numpy as np

plt.plot(range(1, len(pca.explained_variance_ratio_) + 1),
         np.cumsum(pca.explained_variance_ratio_), marker="o")
plt.xlabel("Number of Components")
plt.ylabel("Cumulative Variance Explained")
plt.axhline(0.85, linestyle="--", color="red", label="85% threshold")
plt.legend()
```

Common threshold: retain enough components to explain 85–90% of variance. But this is a heuristic, not a rule. Ask: "If your first 3 components explain 62%, is a 2D plot showing you most of the story or less than half of it?"

For Project 2, if the first two PCs explain less than 50% of variance, note this explicitly in the report. The 2D visualization is misleading if it shows only half the structure.

---

## Loading Interpretation

`pca.components_[i]` is the loading vector for the ith principal component. Each entry corresponds to a feature and represents how strongly that feature contributes to the component.

```python
import pandas as pd

loadings = pd.DataFrame(
    pca.components_[:3],
    columns=feature_names,
    index=["PC1", "PC2", "PC3"]
)
print(loadings.abs().T.sort_values("PC1", ascending=False).head(8))
```

Interpretation: the features with the largest absolute loadings contribute most to that component. The sign matters too — features with the same sign move together along that axis; opposite signs are inversely related.

The key task is giving components a plain-language label. For census data:
- PC1 loads heavily on income, education level, and home value → "economic status axis"
- PC2 loads on commute time, population density, and housing age → "urban-rural axis"

Ask: "Looking at the top features for PC1 in your domain, what concept does this component represent? What would you call this axis if you were labeling a chart for a county planner?"

A student who reports loading magnitudes without naming the components has done the math but not the interpretation.

---

## PCA for Dimensionality Reduction Before Clustering

When the dataset has many features, k-Means performance degrades (the curse of dimensionality — in high dimensions, all points are roughly equidistant). PCA can reduce to a manageable number of components first:

```python
pca_prep = PCA(n_components=0.90, svd_solver="full")  # retain 90% variance
X_reduced = pca_prep.fit_transform(X_scaled)
```

Ask: "How many components did PCA need to retain 90% of variance? Is that enough of a reduction to matter for your clustering?"

This is a preprocessing decision that must be justified in the Project 2 report — don't just apply it mechanically.

---

## t-SNE and UMAP: Nonlinear Alternatives

PCA is linear — it can only capture linear structure. t-SNE and UMAP capture nonlinear relationships and are primarily used for visualization, not for preprocessing.

**What t-SNE optimizes:** it tries to preserve local neighborhoods. Points that are close in high-dimensional space should be close in the 2D plot. It does not preserve global distances — clusters far apart in 2D may not actually be far in the original space.

**The lies t-SNE tells:**
- Cluster sizes in t-SNE are not meaningful.
- Distances between clusters are not meaningful.
- Different random initializations can produce different-looking plots.

Ask: "If two clusters look very far apart in your t-SNE plot, does that mean they're actually very different in your original feature space?" (It doesn't necessarily.)

For Project 2, if a student uses t-SNE for visualization, require them to note its limitations in the figure caption.

---

## Connection to Project 2

PCA is required in Project 2 — both as a preprocessing option and as the source of the 2D cluster visualization. The scree plot is one of the four required figures. Component interpretation in domain terms contributes to the cluster narrative grade. A PCA section that only shows cumulative variance explained without interpreting what PC1 and PC2 represent will not receive full credit.