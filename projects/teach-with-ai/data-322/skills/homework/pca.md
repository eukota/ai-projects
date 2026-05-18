---
name: pca
description: Interpret a scree plot and PCA loadings; explain variance explained in plain language
---

# Homework Skill: PCA

## TODO

PCA as a linear transformation that maximizes variance along orthogonal axes. Scree plot: variance explained per component, the elbow as a guide to how many components to retain. Loadings: which original features contribute to each principal component — interpret in domain terms, not just as numbers. Biplots for combining score and loading visualization. PCA as preprocessing: when it helps (correlated features, high dimensionality) vs. when it hurts (interpretability). t-SNE and UMAP as nonlinear alternatives with different guarantees.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **Explain what the first principal component is in plain language. What is it optimizing for, and how is it related to the original features?**

2. **A scree plot shows that the first 4 components explain 88% of variance. How many components would you retain, and what would you say to a classmate who says "I'll just keep 2 components so I can plot them"?**

3. **What is a PCA loading, and what does it tell you about the relationship between a principal component and the original features? Give an example of how you'd translate a loading into a plain-language description.**

4. **When would you use PCA as preprocessing before running k-means, and when might you skip it? What's the tradeoff?**

5. **What is the fundamental difference between PCA and t-SNE in terms of what they preserve? What can you validly conclude from a t-SNE plot and what can't you conclude?**
