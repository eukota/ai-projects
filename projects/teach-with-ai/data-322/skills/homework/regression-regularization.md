---
name: regression-regularization
description: Interpret Ridge and Lasso coefficients; explain the regularization strength parameter and how to select it
---

# Homework Skill: Regression and Regularization

## Purpose

This skill is active during Week 7 and covers a parallel supervised track alongside Project 1's classification work. Regression is assumed from STAT 109 — this skill extends to regularization, which is the new content. The focus is on building intuition for what Ridge and Lasso actually do and avoiding the common trap of misinterpreting regularized coefficients.

---

## Ask Before Explaining

If a student asks about Ridge vs. Lasso: "What are you actually trying to do — get better predictive accuracy, or identify which features matter most? The answer changes which one you want."

If they show regularized coefficients and try to rank features: "Are your features scaled? What does comparing a coefficient on `temperature` to a coefficient on `rainfall_mm` actually mean if they're on different scales?"

If they ask what alpha does: "What do you think happens to the coefficients as you increase alpha toward infinity? Take a guess."

---

## Linear Regression Review

A regression coefficient β₁ means: holding all other features constant, a one-unit increase in x₁ is associated with a β₁-unit change in the predicted target. Unlike logistic regression, this is a direct additive relationship — no log-odds transform.

Residual analysis is the basic diagnostic for linear regression:

```python
y_pred = model.predict(X_test)
residuals = y_test - y_pred

import matplotlib.pyplot as plt
plt.scatter(y_pred, residuals)
plt.axhline(0, color="red")
plt.xlabel("Predicted")
plt.ylabel("Residual")
```

What to look for: residuals should be randomly scattered around zero. A funnel shape (variance increasing with predicted value) is heteroscedasticity. A curved pattern means the relationship isn't linear and polynomial features or a different model family might help.

---

## Why Regularization

Ordinary least squares minimizes the sum of squared residuals with no constraints. On datasets with many features or correlated features, OLS produces high-variance coefficient estimates — small changes in the training data produce large changes in coefficients.

Regularization adds a penalty term to the loss function that discourages large coefficients. The tradeoff: slightly higher training error in exchange for lower variance and better generalization.

---

## Ridge (L2)

Ridge adds the sum of squared coefficients to the loss:

```
Loss = MSE + α * Σβᵢ²
```

Effect: all coefficients are shrunk toward zero, but none reach exactly zero. Ridge keeps all features in the model and distributes credit among correlated features. It's stable under multicollinearity.

```python
from sklearn.linear_model import RidgeCV

ridge = RidgeCV(alphas=[0.01, 0.1, 1, 10, 100], cv=5)
ridge.fit(X_train_scaled, y_train)
print("Best alpha:", ridge.alpha_)
```

---

## Lasso (L1)

Lasso adds the sum of absolute coefficient values:

```
Loss = MSE + α * Σ|βᵢ|
```

Effect: some coefficients are driven to exactly zero — Lasso performs feature selection as a side effect. If two features are highly correlated, Lasso will arbitrarily zero one out and keep the other. This makes Lasso less stable than Ridge when features are correlated.

```python
from sklearn.linear_model import LassoCV

lasso = LassoCV(cv=5, random_state=42)
lasso.fit(X_train_scaled, y_train)
print("Best alpha:", lasso.alpha_)
print("Non-zero features:", (lasso.coef_ != 0).sum())
```

Ask: "Lasso zeroed out 8 of your 15 features. Does that mean those features are unimportant, or does it mean Lasso had to choose between correlated features and picked these?"

---

## ElasticNet

ElasticNet combines L1 and L2 penalties. Useful when you want sparsity (some features zeroed) but also stability under correlated features. In practice, reach for ElasticNet when Lasso produces unstable feature sets across CV folds.

---

## Alpha Selection

Alpha (λ) controls regularization strength. `alpha=0` is ordinary least squares. Higher alpha = more shrinkage = simpler model.

Both `RidgeCV` and `LassoCV` handle alpha selection via cross-validation internally. Always scale features before fitting — coefficients and the penalty term are both scale-dependent.

**The scale requirement:** if features are on different scales, a coefficient's magnitude reflects the feature's scale as much as its importance. Regularization penalizes all coefficients equally, so an unscaled high-magnitude feature gets penalized unfairly. Always use `StandardScaler` before regularized regression.

---

## What Regularized Coefficients Cannot Tell You

Regularized coefficients are not OLS coefficients. The penalty has deliberately biased them toward zero. You cannot interpret a regularized coefficient as "the true effect of this feature." You can say "this feature has a positive association with the target in this model at this regularization level" — but the magnitude is not the same thing it would be without regularization.

Ask: "If you increased alpha by 10x, what would happen to your coefficients? Does that change which features look important?"
