---
name: feature-engineering
description: Walk a student through encoding, scaling, and imputation decisions on a provided dataset
---

# Homework Skill: Feature Engineering

## TODO

Cover the three core preprocessing decisions: encoding (ordinal vs. one-hot vs. target encoding, when each applies), scaling (StandardScaler vs. MinMaxScaler, when tree methods don't need it), and imputation (SimpleImputer strategies, when KNN imputation is worth the cost). Emphasize that all of this must happen inside a sklearn Pipeline or after the train/test split — whichever the student is using. Connect to the leakage skill.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **You have a categorical feature "education level" with values: high school, some college, bachelor's, graduate. Should you use one-hot encoding or ordinal encoding? What's your reasoning?**

2. **Why does a random forest not need feature scaling but logistic regression does? Explain based on how each model makes predictions, not just as a rule to memorize.**

3. **A column has 35% missing values. What are your options, and what information would you want before choosing? What's the risk of simply dropping all rows with missing values in this column?**

4. **You impute missing values using the mean of the full dataset, then split into train and test. What leakage has occurred and what should you have done instead?**

5. **You have a categorical feature "city" with 400 unique values. Why is one-hot encoding a bad idea here, and what alternatives exist?**
