---
name: fairness-model-cards
description: Walk through computing fairness metrics and writing a complete model card; explain when demographic parity and equalized odds conflict
---

# Homework Skill: Fairness Metrics and Model Cards

## Purpose

This skill is active during Week 15 and is the final graded component of Project 3. It covers two interconnected topics: measuring whether a model's outputs are fair across demographic groups, and documenting a model system so a stakeholder can understand and trust it. Both require synthesis across the whole semester — not just running code, but making a judgment call and defending it.

---

## Ask Before Explaining

Before explaining fairness metrics: "Your model predicts hospital readmission. Before we look at any metrics — who does this model affect, and what would 'unfair' look like to a patient who's harmed by a wrong prediction?"

Before reviewing a model card draft: "Read back your 'Intended Use' section to me. Could a bad actor use this model in a way that your intended use statement doesn't rule out?"

Before discussing demographic parity vs. equalized odds: "Can you have a model where positive predictions are equally likely across groups AND the error rates are equal across groups? What would that require?"

---

## Fairness: Why It's in This Course

Machine learning models trained on historical data inherit the patterns in that data — including historical discrimination. A model that is "accurate" on aggregate can still systematically harm specific groups. "Data for good" is not just about choosing good problems; it's about checking whether your model does what you think it does across all the populations it affects.

---

## Demographic Parity

A model satisfies demographic parity if the positive prediction rate is equal across protected groups.

```python
import pandas as pd

# Assume: y_pred is the model's predictions, group is the protected attribute
results = pd.DataFrame({"y_pred": y_pred, "group": group_labels})
rates = results.groupby("group")["y_pred"].mean()
print(rates)
```

If the positive prediction rate is 0.40 for group A and 0.22 for group B, the model fails demographic parity.

**What demographic parity doesn't tell you:** a model could achieve demographic parity by making an equal number of wrong predictions in each group. Equal rates do not mean equally accurate predictions. Ask: "If a model randomly predicts positive for 30% of both groups, does it satisfy demographic parity? Is that a fair model?"

---

## Equalized Odds

A model satisfies equalized odds if both the true positive rate (recall) and false positive rate are equal across groups.

```python
from sklearn.metrics import confusion_matrix

for grp in results["group"].unique():
    mask = group_labels == grp
    tn, fp, fn, tp = confusion_matrix(y_true[mask], y_pred[mask]).ravel()
    tpr = tp / (tp + fn)
    fpr = fp / (fp + tn)
    print(f"Group {grp}: TPR={tpr:.3f}, FPR={fpr:.3f}")
```

Equalized odds is a stronger constraint than demographic parity. It requires the model to be equally accurate for all groups, not just equally likely to predict positive.

Ask: "For a hospital readmission classifier, which would be worse: a false negative (missed high-risk patient) or a false positive (unnecessary intervention)? Does your answer change depending on the group?"

---

## The Impossibility Result

When base rates differ between groups (e.g., group A has a 40% true positive rate in the data, group B has a 20% true positive rate), it is mathematically impossible to simultaneously satisfy:
1. Demographic parity
2. Equalized odds
3. Calibration (predicted probabilities reflect true probabilities)

This is not a software bug — it's a mathematical constraint. A model that achieves one of these will violate at least one other.

The practical implication: there is no purely technical answer to "which fairness definition is correct." It is a values question that depends on the application. The model card must document which definition you chose and why.

Ask: "If you had to choose one fairness metric to optimize for your Project 3 model, which would you pick? What's your reasoning, and who does that choice help and hurt?"

---

## Fairlearn and AIF360

For computing multiple fairness metrics and visualizing disparity:

```python
from fairlearn.metrics import MetricFrame
from sklearn.metrics import accuracy_score, recall_score

metrics = {
    "accuracy": accuracy_score,
    "recall": recall_score,
}

mf = MetricFrame(
    metrics=metrics,
    y_true=y_test,
    y_pred=y_pred,
    sensitive_features=group_labels
)
print(mf.by_group)
```

Students are not required to use Fairlearn or AIF360, but they are required to compute and report at least one fairness metric disaggregated by a relevant subgroup. Computing accuracy only on the full test set is not sufficient for Project 3 if the application has demographic implications.

---

## Model Cards

A model card is structured documentation that allows a stakeholder to understand what a model does, what it was built on, and whether it's appropriate for their use case. It is not a marketing document — it should accurately represent limitations.

Required sections for Project 3:

**Model Details:** model type, training framework, version, date trained.

**Intended Use:** primary use case (from the problem framing statement). Out-of-scope uses — specific uses this model should not be applied to.

**Factors:** what demographic, environmental, or contextual factors might the model's performance vary across?

**Metrics:** primary metric and why it was chosen. Performance on the full test set AND on relevant subgroups.

**Evaluation Data:** source, size, date range, how it was split.

**Training Data:** source, size, date range, known gaps or limitations.

**Ethical Considerations:** concrete potential harms from misuse or errors — not "the model could be misused" but specific scenarios.

**Caveats and Recommendations:** what should a user know before relying on this model?

---

## Reviewing a Draft Model Card

Common deficiencies to flag:

**Accuracy without context:** "The model achieves 0.87 accuracy" — on how many samples? With what class balance? Ask: "How does a reader know whether 0.87 is good without knowing the class distribution?"

**No subgroup performance:** if the application affects people differently by group, overall accuracy is insufficient. Ask: "Which groups does this model affect? Have you shown performance separately for each?"

**Vague intended use:** "This model predicts wildfire risk" does not constrain misuse. Push: "Could someone use this model to deny insurance to homeowners? Does your intended use section rule that out?"

**Missing training data recency:** if the model was trained on data from 2018–2022 and it's being used in 2027, that's a five-year distribution shift risk. Ask: "When was your training data collected? Does that matter for how accurate the model is today?"

**Generic ethical considerations:** "The model could be misused" tells a stakeholder nothing actionable. Require specificity: "If this model is applied to [specific bad use], it could [specific harm] because [specific mechanism]."

---

## Connection to Project 3

The model card is worth 20% of the Project 3 grade. The fairness analysis (at minimum one metric disaggregated by group) feeds directly into the Metrics and Ethical Considerations sections. A model card that has no subgroup analysis when the application involves people, or that lists no concrete ethical considerations, cannot receive full credit. This is the last deliverable of the course — it represents everything the semester has built toward.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **A model card says "accuracy: 0.87" in the Metrics section. What's missing, and what would a stakeholder need to know to evaluate whether 0.87 is actually good performance for this use case?**

2. **Your intended use section says "this model predicts wildfire risk." A classmate points out that an insurance company could use it to deny coverage to homeowners. Does your intended use section prevent that misuse? What would need to change?**

3. **Why can't you satisfy demographic parity, equalized odds, and calibration simultaneously when base rates differ between groups? What does this mean for a practitioner choosing a fairness metric?**

4. **A model was trained on data from 2018–2022 and is being deployed in 2027. What specific risk does that create, and where in the model card should it be documented?**

5. **Your ethical considerations section says "the model could be misused by bad actors." Why is that insufficient, and what would a concrete ethical consideration look like instead?**

6. **Explain the difference between demographic parity and equalized odds in plain language. Give an example of a situation where you would choose one over the other and explain your reasoning.**