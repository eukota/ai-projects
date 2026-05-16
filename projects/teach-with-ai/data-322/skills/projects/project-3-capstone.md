---
name: project-3-capstone
description: Guide students through Project 3 — problem framing, end-to-end pipeline, model card, and collaboration log for the capstone ML system
---

# Project 3: End-to-End ML System with Model Card

**Weeks 13–15 | Deliverable due end of Week 15**

## Project Overview

The capstone. Students frame their own ML problem from a raw or semi-structured dataset, build a complete documented pipeline, and produce a model card and collaboration log. There is no scaffolding — the student decides the problem, the features, the model family, and the evaluation criteria. The AI agent is an explicit collaborator and that collaboration is assessed.

**Deliverable:** GitHub repo with clean, documented code + model card + collaboration log.

---

## What "End-to-End" Means

A complete system, in this course, includes:
1. **Problem framing:** a written statement of the ML problem — what is being predicted, for whom, what decision it informs, and what "good enough" performance looks like
2. **Data acquisition or use:** source documented, provenance noted, any preprocessing decisions from raw to modeling-ready
3. **Pipeline:** reproducible code from raw data to model evaluation — a notebook or script that another person could run
4. **Model selection with rationale:** at least two model families compared; trade-offs documented
5. **Evaluation:** appropriate metrics for the problem type; subgroup analysis if the application has demographic implications
6. **Model card:** structured documentation of the system following the Google model card format
7. **Collaboration log:** full documentation of AI tool use across the project lifecycle

---

## Rubric Summary

| Component | Weight |
|---|---|
| Problem framing: clear, specific, scoped to available data | 15% |
| Pipeline quality: reproducible, leakage-free, documented | 20% |
| Model selection and justification: trade-offs articulated, not just accuracy | 20% |
| Model card: complete, honest, usable by a stakeholder | 20% |
| Collaboration log: comprehensive, critical, documents errors | 25% |

The collaboration log weight is intentionally higher in Project 3 than in Projects 1 and 2. This is the capstone — the standard is higher.

---

## Agent Guidance for Each Phase

### Phase 1: Problem Framing (Week 13)

Problem framing is the hardest part for most students. They default to "predict X" without thinking about whether predicting X is actually useful, whether the data supports it, or what they'd do with a prediction once they have it.

When a student brings a dataset and says "I want to predict Y," ask:

1. "Who would use this prediction and what decision would they make with it?"
2. "What's the consequence of a false positive? A false negative? Does that change what metric you care about?"
3. "Is your target variable actually available in the historical data, or are you constructing it? If constructing it, document every decision."
4. "Is there a leakage risk? Is any feature derived from or correlated with the future value of your target?"

A well-framed problem statement looks like: "I will build a classifier to predict whether a Humboldt County census tract is at elevated wildfire risk based on vegetation density, historical burn history, proximity to roads, and seasonal temperature anomalies. The intended use is to prioritize fuel management interventions by the county's fire department. A false negative (missed high-risk tract) is more costly than a false positive (unnecessary intervention), so I'll prioritize recall over precision."

A poorly framed problem statement: "I will predict wildfire risk."

Push until you get the well-framed version. This statement belongs in the model card's "Intended Use" section verbatim.

### Phase 2: Pipeline Construction (Week 13–14)

The pipeline must be reproducible. That means:
- Fixed random seeds where randomness is introduced
- No hardcoded absolute file paths — all paths relative to the project root
- `requirements.txt` or `environment.yml` in the repo root
- Raw data stored in `data/raw/`; processed data in `data/processed/`
- The notebook or script can be run top-to-bottom on a fresh clone without errors

Code review checklist the agent should run through:
1. Is the train/test split done before any preprocessing?
2. Are all preprocessing transformers fit on training data only?
3. Is cross-validation used for model comparison, with the test set held out until final evaluation?
4. Are evaluation metrics appropriate for the problem (not just accuracy)?
5. Is there any data leakage risk from the feature set — features that shouldn't be available at prediction time?

### Phase 3: Model Selection and Justification (Week 14)

Students must document the trade-offs they considered, not just which model won. A model selection section that says "I compared random forest and logistic regression; random forest had higher F1 so I chose it" is not sufficient.

A strong model selection section explains:
- Why these two (or more) model families were chosen as candidates
- What the trade-offs are in terms of interpretability, training time, performance on small vs. large data, and sensitivity to hyperparameters
- What the CV results showed, with variance reported (mean ± std)
- Why the selected model is appropriate for the intended use — a model card stakeholder needs to trust the choice, not just accept it

Push the student: "If you were presenting this to the fire department, how would you explain why you used a random forest instead of something simpler that a non-ML person could inspect?"

### Phase 4: Model Card (Week 15)

The model card must follow this structure:

**Model Details**
- Type, training framework, version, date

**Intended Use**
- Primary use case (verbatim from the problem framing statement)
- Out-of-scope uses (what this model should not be used for)

**Factors**
- Relevant demographic or environmental factors the model's performance may vary across

**Metrics**
- Primary metric and why it was chosen
- Performance on overall dataset and on relevant subgroups

**Evaluation Data**
- Source, size, date range, how it was split

**Training Data**
- Source, size, date range, known limitations or biases

**Ethical Considerations**
- Potential harms from misuse or from errors in the model's outputs

**Caveats and Recommendations**
- What a user should know before relying on this model

When reviewing a draft model card, flag:
- Accuracy reported without sample size or confidence interval — 0.87 accuracy on 50 samples is very different from 0.87 on 10,000
- No subgroup analysis when the application has demographic implications
- Intended use so broad it could justify any use of the model
- No mention of training data recency or known gaps
- Ethical considerations that are vague ("the model could be misused") vs. specific ("if applied to insurance underwriting, this model could systematically disadvantage low-income census tracts")

### Phase 5: Collaboration Log Review (Week 15)

The Project 3 collaboration log standard is the highest in the course. It must cover the entire project lifecycle, not just one or two interactions. It should include:

1. **Problem framing phase:** did you use AI to help scope the problem? Did it suggest a framing you rejected or modified?
2. **Feature selection:** did AI suggest features? Were any of those suggestions wrong or potentially leaky?
3. **Model selection:** did AI recommend a model family? Did you follow that recommendation? Why or why not?
4. **Debugging:** at least one specific debugging interaction with the class agent or Copilot.
5. **Model card drafting:** did AI help draft any sections? Which ones? What did you change and why?
6. **Overall reflection:** one paragraph on what you learned about working with AI as a collaborator — what it does well, where it needs supervision, and how your practice changed over the course of the semester.

A log without the overall reflection cannot receive full credit.

---

## GitHub Repo Requirements

The submitted repo must include:
```
/
├── README.md          (project summary, how to run, dataset source)
├── environment.yml    (or requirements.txt)
├── data/
│   ├── raw/           (raw data or instructions for downloading it)
│   └── processed/     (cleaned/feature-engineered data)
├── notebooks/
│   └── analysis.ipynb (or multiple numbered notebooks)
├── model-card.md
└── collaboration-log.md
```

The code in the notebook must be clean enough for a stranger to run. Comments should explain why, not what. No debug cells left in. No cells that take more than 2 minutes to run without a note.
