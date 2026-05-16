---
name: intro-eda-review
description: Guide a student through a complete pre-modeling EDA checklist on a provided dataset; surface distributional issues, missing data patterns, class imbalance, and data quality red flags before any modeling begins
---

# Homework Skill: EDA Review (Pre-Modeling Checklist)

## Purpose

This skill is active during Week 3 and applies throughout the semester whenever a student is preparing a dataset for modeling. The goal is to prevent students from modeling bad data and to build the habit of systematic EDA before touching sklearn.

The single most common student mistake in this course is fitting a model on a dataset they don't understand. This skill addresses that directly.

---

## The Pre-Modeling EDA Checklist

Work through these in order. Each section has questions to ask the student and code patterns to suggest.

---

### 1. Load and Inspect

Before anything else, the student should know what they actually have.

```python
import pandas as pd

df = pd.read_csv("your_dataset.csv")

print(df.shape)          # rows, columns
print(df.dtypes)         # column types
print(df.head(10))       # first look
print(df.tail(5))        # check for footer rows / metadata contamination
```

Ask: "Are there any columns with unexpected types? Are there columns that look numeric but are stored as object/string?"

Red flags to look for:
- Date columns stored as strings — need parsing before use
- IDs stored as integers that could accidentally be treated as features
- Columns with all-identical values (zero variance — useless features)
- Columns whose names suggest leakage: `outcome_date`, `diagnosis_flag`, anything future-looking

---

### 2. Missing Data

```python
missing = df.isnull().sum()
missing_pct = (missing / len(df)) * 100
print(missing_pct[missing_pct > 0].sort_values(ascending=False))
```

Ask: "Are there columns with more than 20% missing? What will you do with them?"

Rules of thumb for this course:
- >50% missing: consider dropping the column unless there's a strong domain reason to keep it
- 5–50% missing: imputation is appropriate; choice of strategy depends on whether missingness is random
- <5% missing: row-level drop is defensible but document why

Key concept: missing data is rarely random. Ask the student: "Is there a reason certain rows have missing values? Could the missingness itself be informative?" For example, a missing income field might indicate non-response that correlates with income level — that is not ignorable.

---

### 3. Target Variable

If the problem is supervised, inspect the target before anything else.

**Classification:**
```python
print(df["target"].value_counts())
print(df["target"].value_counts(normalize=True))
```

Ask: "Is this balanced? If the minority class is under 15%, what does that mean for your evaluation metrics?" (This is the setup for the precision/recall discussion in Week 4 — plant the seed here.)

**Regression:**
```python
import matplotlib.pyplot as plt
df["target"].hist(bins=50)
plt.title("Target Distribution")
plt.show()
print(df["target"].describe())
```

Ask: "Is the distribution skewed? Are there outliers that will dominate your loss function?"

---

### 4. Feature Distributions

```python
df.describe()    # numeric features: min, max, mean, std, quartiles
```

Look for:
- **Extreme values / outliers:** max is 10x larger than the 99th percentile? Flag it.
- **Scale differences:** one feature ranges 0–1, another ranges 0–100,000. This matters for linear models and distance-based methods.
- **Zero-inflated features:** mostly zero with rare large values — tree methods handle this fine, linear models may struggle.

For categorical features:
```python
for col in df.select_dtypes(include="object").columns:
    print(col, df[col].nunique(), df[col].value_counts().head())
```

Ask: "Are any categorical columns high-cardinality (many unique values)? How will you encode them?"

---

### 5. Correlations and Multicollinearity

```python
import seaborn as sns
corr = df.select_dtypes(include="number").corr()
sns.heatmap(corr, annot=False, cmap="coolwarm")
```

Ask: "Are there pairs of features with correlation above 0.9? That can indicate redundant features or potential leakage."

Strong feature-target correlation is good. Strong feature-feature correlation is worth noting but not automatically a problem — it depends on the model family.

---

### 6. Train/Test Split — Before Any Further Processing

The EDA checklist ends with a gate: before doing any imputation, scaling, or encoding, the student must split the data.

```python
from sklearn.model_selection import train_test_split

X = df.drop("target", axis=1)
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y  # stratify if classification
)
```

This is the moment to introduce the leakage rule explicitly: **fit all preprocessing transformers on `X_train` only; apply to `X_test`.** The student who fits a scaler on the full dataset before splitting has already leaked. If the student has done any imputation or scaling before this step, that work must be redone.

---

## How to Use This Skill

When a student says "I'm ready to start modeling" or "here's my EDA notebook," ask them to walk through this checklist. Do not accept "I loaded the data and it looks fine."

Specific questions to push on:
1. "What's the shape of your dataset and what's the class balance?"
2. "Which columns have missing values and what's your plan?"
3. "Have you split your data yet? Where in the notebook did that happen?"
4. "Show me the distribution of your target variable."

If they can't answer these with evidence from their notebook, they are not ready to model.

---

## Connection to Project Work

This EDA checklist is the entry requirement for Project 1. The project rubric includes a section for EDA quality — not just "did you run `.describe()`" but "did you catch anything, and did you make a decision based on what you found?"

Students who skip this step typically produce models that fail silently — high accuracy on an imbalanced dataset, features that shouldn't be there, test performance that doesn't match CV performance. The debugging is much harder than doing the EDA upfront.
