---
name: data-splits-leakage
description: Given a scenario, identify whether data leakage is present and explain why
---

# Homework Skill: Data Splits and Leakage

## TODO

Walk a student through identifying data leakage in realistic scenarios — preprocessing before splitting, target-correlated features derived from the future, inappropriate use of the test set during model selection. Explain train/validation/test split mechanics and why each boundary matters. Reference the leakage gotcha demo from the dean's test drive scenarios.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **A student fits a StandardScaler on their full dataset, then splits it into train and test sets, and runs cross-validation. Where is the leakage, and what real-world problem does this create?**

2. **You're building a model to predict whether a patient will be readmitted within 30 days. Your dataset includes a column called `readmission_date`. Should you use it as a feature? Explain why or why not.**

3. **What is the difference between a validation set and a test set? Why do you need both rather than just one holdout split?**

4. **Your model achieves 99% accuracy on the training set and 71% on the test set. Without seeing any code, what are two plausible explanations for this gap?**

5. **A classmate says "I used the test set to compare my three models and pick the best one, then reported that model's test accuracy in my report." Why is that reported accuracy misleading?**
