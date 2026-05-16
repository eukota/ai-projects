---
name: regression-regularization
description: Interpret Ridge and Lasso coefficients; explain the regularization strength parameter and how to select it
---

# Homework Skill: Regression and Regularization

## TODO

Linear regression review: coefficient interpretation, residual analysis, homoscedasticity check. Ridge (L2): shrinks all coefficients, none go to zero, effective for correlated features. Lasso (L1): produces sparse models, feature selection side effect, breaks ties between correlated features arbitrarily. ElasticNet as the compromise. Lambda / alpha selection: cross-validated RidgeCV / LassoCV. Common mistake: interpreting regularized coefficients as if they were OLS coefficients without noting that scale matters.
