---
name: clustering-kmeans
description: Guide elbow plot interpretation; debug poor cluster separation; explain k-means++ initialization
---

# Homework Skill: k-Means Clustering

## Purpose

This skill is active during Week 10 and drives Project 2. Clustering is the first time students work without a ground truth — there's no correct answer to validate against. The challenge is developing judgment about what makes a clustering useful, not just mechanically correct.

---

## Ask Before Explaining

Before touching the algorithm: "What do you think the clusters should represent in your dataset? What would a meaningful grouping look like if you described it to someone in the domain?"

If a student shows an elbow plot and asks what k to pick: "Where do you see the elbow? And what would k=3 vs. k=5 mean in terms of your domain — are there 3 or 5 natural groups in this data?"

If cluster separation looks poor: "Did you scale your features before running k-means? What happens if one feature has a range of 0–1 and another has a range of 0–1,000,000?"

---

## The k-Means Algorithm

1. Initialize k cluster centroids (randomly or via k-means++).
2. Assign each point to the nearest centroid (Euclidean distance).
3. Update each centroid to be the mean of its assigned points.
4. Repeat steps 2–3 until assignments stop changing (convergence).

The algorithm is guaranteed to converge, but not to a global optimum — it can get stuck in a local minimum depending on initialization.

**k-means++ initialization** selects initial centroids that are spread out, reducing the chance of a bad local minimum. It's sklearn's default (`n_init="auto"`). Students using older sklearn versions may need `init="k-means++"` explicitly.

Ask: "Why do you think random initialization can produce bad clusters? What goes wrong if two centroids start very close together?"

---

## Scaling Is Mandatory

k-Means uses Euclidean distance. If features are on different scales, the feature with the largest range dominates the distance calculation and effectively controls the clusters.

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
```

Ask: "What does it mean to compute the distance between two census tracts if one feature is income (0–200,000) and another is number of bedrooms (1–6)? Which feature drives that distance calculation before scaling?"

---

## Choosing k: Elbow Plot and Silhouette Score

**Elbow plot on inertia:**

```python
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

inertias = []
k_range = range(2, 11)
for k in k_range:
    km = KMeans(n_clusters=k, random_state=42, n_init="auto")
    km.fit(X_scaled)
    inertias.append(km.inertia_)

plt.plot(k_range, inertias, marker="o")
plt.xlabel("k")
plt.ylabel("Inertia")
plt.title("Elbow Plot")
```

Inertia always decreases as k increases — at k=n (one cluster per point), inertia is zero. The elbow is where additional clusters stop meaningfully reducing inertia.

**Silhouette score (more principled):**

```python
from sklearn.metrics import silhouette_score

scores = []
for k in k_range:
    km = KMeans(n_clusters=k, random_state=42, n_init="auto")
    labels = km.fit_predict(X_scaled)
    scores.append(silhouette_score(X_scaled, labels))

plt.plot(k_range, scores, marker="o")
plt.xlabel("k")
plt.ylabel("Silhouette Score")
```

Silhouette measures how similar a point is to its own cluster vs. other clusters. Ranges from -1 to 1; higher is better; above 0.5 is generally considered reasonable.

When elbow and silhouette disagree: the mathematical answer doesn't automatically win. If the silhouette peaks at k=4 but k=3 makes more domain sense and has a silhouette score only 0.02 lower — k=3 is probably the right choice. The report must explain this reasoning.

---

## Interpreting Cluster Centroids

After fitting, the centroid of each cluster is the mean feature vector:

```python
import pandas as pd

centroids = pd.DataFrame(
    km.cluster_centers_,
    columns=X_scaled.columns if hasattr(X_scaled, "columns") else range(X_scaled.shape[1])
)
```

But centroids in scaled space are hard to interpret. Inverse-transform them:

```python
centroids_original = pd.DataFrame(
    scaler.inverse_transform(km.cluster_centers_),
    columns=feature_names
)
```

Ask: "Looking at the centroids in original feature space, what is cluster 2 characterized by? How would you describe it to a county official in one sentence?"

A student who reports centroids as numbers without translating them to domain language has not completed the interpretation. Push: "You've shown me the math. Now tell me what it means."

---

## Hierarchical Clustering as an Alternative

When k is unknown or the dataset is small enough, hierarchical clustering avoids fixing k upfront:

```python
from scipy.cluster.hierarchy import dendrogram, linkage
import matplotlib.pyplot as plt

Z = linkage(X_scaled, method="ward")
dendrogram(Z, truncate_mode="lastp", p=20)
plt.title("Dendrogram (Ward linkage)")
```

The dendrogram shows where merges happen. Long vertical lines before a merge suggest well-separated clusters at that level — the cut level becomes the implied k.

Ask: "Does the dendrogram suggest a natural number of clusters? Does that agree with your elbow plot?"

---

## Connection to Project 2

Project 2 requires k selection justified with both elbow/silhouette evidence and domain reasoning. A submission that picks k=4 because "the silhouette score was highest" without explaining what four clusters mean in the domain will not receive full credit on the cluster narrative component (25% of the grade).