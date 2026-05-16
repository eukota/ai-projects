---
name: fairness-metrics
description: Walk through computing demographic parity and equalized odds on a provided model output; explain when they conflict
---

# Homework Skill: Fairness Metrics

## TODO

Demographic parity: equal positive prediction rate across groups — can be achieved by a model that ignores the protected attribute, but also by a model that discriminates in other ways. Equalized odds: equal TPR and FPR across groups — stronger constraint, requires group-conditional calibration. Why they can't both be satisfied simultaneously when base rates differ across groups (the impossibility theorem). Fairlearn and AIF360 as practical toolkits. Walking through a concrete example: hospital readmission classifier, computing demographic parity by race, interpreting the result in the context of the "data for good" mission.
