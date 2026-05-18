---
name: kmeans-clustering
description: Guide elbow plot interpretation; debug poor cluster separation; explain k-means++ initialization
---

# Homework Skill: k-Means Clustering

## TODO

k-Means algorithm: random initialization (or k-means++), assignment step, update step, convergence. k-means++ initialization: why random starts produce unstable results; what sklearn does by default. Choosing k: elbow plot on inertia, silhouette score as a more principled alternative. Debugging poor separation: features need scaling before k-means (distance-based), high dimensionality degrades results, interpret centroids in domain terms. Hierarchical clustering as an alternative when you don't know k.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **Walk through the k-means algorithm step by step in plain language. What does "convergence" mean, and what does the algorithm guarantee — and not guarantee — about the result?**

2. **Why does k-means++ initialization produce better results than purely random initialization? What problem is it solving?**

3. **Your elbow plot shows inertia decreasing smoothly with no clear elbow. What does that tell you about your data, and what would you do next?**

4. **You run k-means without scaling your features and get three clusters. A classmate runs the same algorithm after scaling and gets three completely different clusters. Which result should you trust and why?**

5. **What does the silhouette score measure, and what does a score near 0 vs. near 1 tell you about your clustering?**
