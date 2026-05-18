---
name: fairness-metrics
description: Walk through computing demographic parity and equalized odds on a provided model output; explain when they conflict
---

# Homework Skill: Fairness Metrics

## TODO

Demographic parity: equal positive prediction rate across groups — can be achieved by a model that ignores the protected attribute, but also by a model that discriminates in other ways. Equalized odds: equal TPR and FPR across groups — stronger constraint, requires group-conditional calibration. Why they can't both be satisfied simultaneously when base rates differ across groups (the impossibility theorem). Fairlearn and AIF360 as practical toolkits. Walking through a concrete example: hospital readmission classifier, computing demographic parity by race, interpreting the result in the context of the "data for good" mission.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **A model satisfies demographic parity — it predicts positive at the same rate for both groups. Does that mean the model is fair? What could still be wrong?**

2. **Explain equalized odds in plain language. What does it require beyond what demographic parity requires?**

3. **Group A has a 40% true positive rate in the data and Group B has 20%. Is it possible for a model to simultaneously satisfy demographic parity, equalized odds, and calibration? Why or why not?**

4. **You're building a hospital readmission classifier. For Group A, the model misses 30% of high-risk patients (false negatives). For Group B, it misses 12%. Which fairness definition is being violated, and what are the real-world consequences?**

5. **"The model treats everyone the same because we didn't include race as a feature." Why is that reasoning flawed?**
