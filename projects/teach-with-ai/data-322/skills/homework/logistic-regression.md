---
name: logistic-regression
description: Interpret logistic regression coefficients and log-odds; debug convergence failures
---

# Homework Skill: Logistic Regression

## Purpose

This skill is active during Week 4 and supports Project 1. Logistic regression is the first classifier students implement and the one where coefficient interpretation is most frequently done wrong. The focus is building the right mental model for what coefficients mean, and resolving the two most common failure modes: convergence warnings and scale confusion.

---

## Ask Before Explaining

When a student brings a logistic regression question, don't start with an explanation. Start with a question.

If they ask about coefficients: "Before I explain — what do you think the coefficient on this feature represents? Take a guess at what it's measuring."

If they have a ConvergenceWarning: "Show me your preprocessing code. Specifically, did you scale your features before fitting?"

If they say "my model is wrong": "What metric are you using and what does your confusion matrix look like? 'Wrong' means different things depending on whether you have a class imbalance problem."

---

## Coefficient Interpretation

Logistic regression predicts the log-odds of the positive class:

```
log(p / (1 - p)) = β₀ + β₁x₁ + β₂x₂ + ...
```

A coefficient β₁ means: holding all other features constant, a one-unit increase in x₁ increases the log-odds by β₁. The more intuitive form: exp(β₁) is the odds ratio — how many times more likely the positive class becomes per unit increase in x₁.

Key questions to ask:
- "Your coefficient for `age` is 0.12. What does that mean in plain language?"
- "If this feature is standardized (mean 0, std 1), does your interpretation of the coefficient change?"
- "Which direction does a positive coefficient push the prediction?"

**The scale trap:** coefficients only make sense relative to the feature's scale. A coefficient of 0.12 on `age` (in years) and 0.12 on `income` (in dollars) mean entirely different things — one-unit increases aren't comparable. If features are unscaled, coefficient magnitudes cannot be compared across features. If features are standardized, they can.

Ask: "Are your features scaled before fitting? If not, what does comparing `coef_[0]` to `coef_[1]` actually tell you?"

---

## The Sigmoid and predict vs. predict_proba

The model converts the linear output to a probability:

```
p = 1 / (1 + exp(-z))
```

`predict()` applies a 0.5 threshold to return class labels. `predict_proba()` returns the raw probabilities. These are not the same thing. Ask: "Which are you calling, and which do you actually need?"

For imbalanced classes, 0.5 is often the wrong threshold. This connects to precision/recall — the student will encounter this in the Project 1 evaluation section.

---

## Debugging: ConvergenceWarning

```
ConvergenceWarning: lbfgs failed to converge (status=1): STOP: TOTAL NO. OF ITERATIONS REACHED LIMIT.
```

Two causes, in order of likelihood:

**1. Features not scaled.** The optimizer is navigating a poorly conditioned loss surface. The fix is a Pipeline:

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("clf", LogisticRegression(random_state=42))
])
```

**2. Insufficient iterations.** After scaling, if it still fails:

```python
LogisticRegression(max_iter=1000)
```

Do not increase `max_iter` without scaling first. Adding iterations to an unscaled problem doesn't fix the underlying geometry.

Ask: "Did you scale before trying to increase max_iter?"

---

## Debugging: Near-Perfect Separation

If `coef_` values are very large (e.g., 50, -200) or training accuracy is 1.0 on a non-trivial dataset, suspect perfect or near-perfect separation. One feature (or combination) perfectly predicts the target in training data, pushing coefficients toward infinity.

Ask: "Does any single feature perfectly predict the class label in your training set? Could one of your features be derived from the target?" This is a leakage diagnostic.

---

## Connection to Project 1

Logistic regression is the first of the three required classifiers in Project 1. The project narrative section requires interpreting results for a non-technical audience. That means:

1. Connecting coefficients to domain language — not "coefficient is 0.8" but "higher vegetation density is associated with substantially higher predicted wildfire risk."
2. Acknowledging what the model cannot tell you — coefficients describe association in the training data, not causation.

Do not accept "the model has a coefficient of 0.8 for feature X" as a complete interpretation. Ask: "What does that mean for someone using this model to make a real decision?"

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **Your logistic regression has a coefficient of 0.8 for the feature `vegetation_density`. Explain what that means in plain language to someone who doesn't know what log-odds are.**

2. **You get a ConvergenceWarning from sklearn. What are the two most likely causes, and which should you address first? Why shouldn't you just increase `max_iter` as the first fix?**

3. **`predict()` and `predict_proba()` return different things. Explain the difference and give an example of a situation where you'd need one vs. the other.**

4. **Your model achieves 94% accuracy on an imbalanced dataset where 93% of samples are class 0. Is 94% accuracy meaningful here? What's actually happening and what metric should you look at instead?**

5. **A coefficient of 0.12 on `age` (in years) and 0.12 on `income` (in dollars) look the same. Why are they completely different in terms of what they mean about feature importance?**
