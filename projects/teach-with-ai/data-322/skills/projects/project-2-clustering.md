---
name: project-2-clustering
description: Guide students through Project 2 unsupervised analysis — dataset selection, clustering, dimensionality reduction, cluster interpretation, and the written deliverable
---

# Project 2: Cluster Analysis and Dimensionality Reduction

**Weeks 10–12 | Deliverable due end of Week 12**

## Project Overview

Students apply clustering and dimensionality reduction to a dataset without labels. Because there is no ground truth, the core challenge is constructing a defensible interpretation of what the clusters mean. The deliverable is a report (4–6 pages) and a visualization portfolio (minimum 4 publication-quality figures).

---

## Approved Dataset Categories

- **Satellite imagery band data:** spectral signatures for land cover classification (without using the labels)
- **Genomic expression data:** gene expression across tissue samples or conditions
- **Humboldt County census tract socioeconomic data:** income, education, housing, demographic features by tract
- **Environmental sensor networks:** multi-station time-aggregated readings (air quality, water quality, weather)

The dataset must have no pre-existing cluster labels to use as a target. If the dataset has labels, students may use them only for post-hoc validation, not to guide clustering.

---

## Rubric Summary

| Component | Weight |
|---|---|
| Clustering: correct implementation, k selection justified with elbow/silhouette | 20% |
| Dimensionality reduction: PCA applied and components interpreted in domain terms | 20% |
| Visualization portfolio: 4+ publication-quality figures with clear captions | 20% |
| Cluster narrative: argument for cluster meaning grounded in domain knowledge | 25% |
| Collaboration log: AI use documented critically; AI interpretation critiqued | 15% |

---

## Agent Guidance for Each Phase

### Phase 1: Dataset Inspection and Preprocessing (Week 10)

Unlike supervised learning, unsupervised methods require the student to think carefully about what they want the clustering to be sensitive to.

Ask:
- "Have you scaled your features? k-Means uses Euclidean distance — unscaled features mean your clusters will be dominated by whatever feature has the largest absolute range."
- "Are there any features you're excluding from the clustering? If so, why?"
- "What do you think the clusters should represent? What would a meaningful grouping look like in your domain?"

This last question is critical. Students who cluster without a prior hypothesis about what clusters mean will produce results they can't interpret. Push for a domain framing before they run a single algorithm.

### Phase 2: Choosing k (Week 10)

The elbow plot on inertia is the standard starting point:

```python
from sklearn.cluster import KMeans

inertias = []
k_range = range(2, 11)
for k in k_range:
    km = KMeans(n_clusters=k, random_state=42, n_init="auto")
    km.fit(X_scaled)
    inertias.append(km.inertia_)
```

The silhouette score is more principled and should accompany the elbow plot:

```python
from sklearn.metrics import silhouette_score

silhouette_scores = []
for k in k_range:
    km = KMeans(n_clusters=k, random_state=42, n_init="auto")
    labels = km.fit_predict(X_scaled)
    silhouette_scores.append(silhouette_score(X_scaled, labels))
```

When reviewing a student's k selection, ask: "The elbow suggests k=4, but the silhouette score peaks at k=3. How are you resolving that disagreement? Domain knowledge should break the tie."

The answer to k is not purely mathematical. If the domain naturally has 3 interpretable categories and the silhouette score is nearly as high at k=3 as k=4, k=3 is more defensible. The report should explain this.

### Phase 3: PCA for Visualization and Interpretation (Week 11)

PCA is required for this project — both as a preprocessing step (if dimensionality warrants it) and for 2D visualization of clusters.

```python
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

# Variance explained
print(pca.explained_variance_ratio_)
print("Total:", sum(pca.explained_variance_ratio_))
```

If the first two PCs explain less than 50% of variance, the 2D plot is showing less than half the story. Students should note this explicitly in their report and consider t-SNE or UMAP for visualization (while keeping PCA for the component interpretation).

Loading interpretation: `pca.components_[0]` is the first principal component's loadings. Each entry corresponds to a feature. The features with the largest absolute loadings contribute most to that component. Students should interpret these in domain terms — for census data, PC1 might load heavily on income, educational attainment, and housing cost, suggesting it's a "economic status" axis.

### Phase 4: The Cluster Narrative (Week 12)

This is the hardest part. The student must answer: "What are these clusters? What do they represent in the real world?"

The agent should push the student to go beyond the math:
- "You've shown the centroids. What is the centroid of cluster 2 telling you in human terms?"
- "If someone asked you to name these clusters in a presentation to a county official, what would you call them?"
- "Is there any external validation you can do? For the census data: can you map the clusters to actual Humboldt County geography and see if they make geographic sense?"

Common failure mode: the student describes the centroids in feature-space terms ("cluster 3 has high PC1 and low PC2") without translating back to domain meaning. Push until you get plain language.

---

## Visualization Portfolio Requirements

The four required figures:
1. **Elbow plot and/or silhouette score plot** showing k selection rationale
2. **2D PCA scatter plot** with cluster labels color-coded
3. **Scree plot** showing variance explained per component
4. **Cluster profile chart** (heatmap of feature means per cluster, or parallel coordinates plot)

Publication quality means: axis labels, title, legend, readable font size, no default matplotlib styling. Students should use seaborn or matplotlib with explicit styling. Figures must have captions that explain what the reader is seeing — not just "Figure 1: clusters" but a sentence about what the visualization shows.

---

## Collaboration Log for Project 2

The log must include:
1. One entry from the k-selection phase: did the AI suggest a k? Did you follow it?
2. One entry from PCA interpretation: what did the AI say the loadings mean? Was it right?
3. A specific example of the AI generating a cluster interpretation you pushed back on or modified.

The critical reflection here should focus on AI-generated interpretation: "The agent told me cluster 3 represents low-income rural tracts — but when I mapped the clusters geographically, cluster 3 was actually concentrated in coastal tourist areas. The agent's interpretation was wrong and here's what I concluded instead."
