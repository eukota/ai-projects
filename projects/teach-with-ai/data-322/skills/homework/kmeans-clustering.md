---
name: kmeans-clustering
description: Guide elbow plot interpretation; debug poor cluster separation; explain k-means++ initialization
---

# Homework Skill: k-Means Clustering

## TODO

k-Means algorithm: random initialization (or k-means++), assignment step, update step, convergence. k-means++ initialization: why random starts produce unstable results; what sklearn does by default. Choosing k: elbow plot on inertia, silhouette score as a more principled alternative. Debugging poor separation: features need scaling before k-means (distance-based), high dimensionality degrades results, interpret centroids in domain terms. Hierarchical clustering as an alternative when you don't know k.
