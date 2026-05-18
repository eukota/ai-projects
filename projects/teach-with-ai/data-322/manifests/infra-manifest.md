# Infrastructure Manifest — DATA 322

Tracks all infrastructure requirements by set (stage). A "set" maps to a project arc entry point where the environment must meet a higher bar. Keep this in sync with `projects-manifest.md` when infra requirements for a project arc change.

---

## Set 1 — Course Baseline (Week 1 Gate)

**When introduced:** Week 1 (required before any project work begins)
**Pass/fail gate:** yes — Infrastructure Setup is a graded component; students who do not pass the Week 1 check are blocked from project participation until resolved

**Required tools and libraries:**

| Tool / Library | Version requirement | Purpose |
|---|---|---|
| Python | 3.11 (via conda or venv; never system Python or base conda) | Runtime |
| conda or venv | any current | Environment isolation |
| numpy | >= 1.24 | Numerical computing |
| pandas | >= 2.0 | Data wrangling |
| matplotlib | >= 3.7 | Plotting |
| seaborn | >= 0.12 | Statistical visualization |
| scikit-learn | >= 1.3 | ML algorithms (core) |
| jupyter / jupyterlab | any current | Notebook interface |
| ipykernel | any current | Jupyter kernel registration |
| Git | any current | Version control |
| VS Code or Cursor | any current | IDE |
| Python extension (VS Code/Cursor) | any current | IDE integration |
| GitHub Copilot (optional but recommended) | any current | Code completion |

**Verification checklist (from `skills/homework/infra-setup-rubric.md`):**
- Named environment active (not base, not system Python)
- `python -c "import numpy, pandas, matplotlib, seaborn, sklearn, jupyter; print('OK')"` passes
- `sklearn.__version__` >= 1.3
- `jupyter kernelspec list` shows a `data322` kernel
- A notebook opened in JupyterLab uses the `data322` kernel
- `import sys; print(sys.executable)` inside the notebook shows the named environment path
- `git config --global user.name` and `user.email` both return values
- `git log --oneline -3` in the course repo shows at least one commit
- VS Code or Cursor status bar shows the `data322` interpreter

**Diagnostic skill:** `skills/homework/infra-setup-rubric.md` (complete)
**Setup guidance skill:** `skills/homework/intro-environment.md` (complete)

---

## Set 2 — Unsupervised Learning Additions (Week 10 Gate)

**When introduced:** Week 10 (required before Project 2 work begins)
**Pass/fail gate:** planned — a formal infra checkpoint at the start of Week 10 is not yet implemented as a standalone skill. Until it is built, the class agent should verify Set 2 requirements informally when a student begins Project 2.

**Additional requirements beyond Set 1:**

| Tool / Library | Version requirement | Purpose |
|---|---|---|
| scipy | any current | Hierarchical clustering via `scipy.cluster.hierarchy` (linkage, dendrogram) |
| plotly (optional) | any current | Interactive visualization for cluster exploration |

**Verification (informal until Set 2 checkpoint skill is built):**
```bash
python -c "import scipy; print(scipy.__version__)"
python -c "from scipy.cluster.hierarchy import dendrogram, linkage; print('OK')"
```

**Planned skill:** `infra-checkpoint-set2` — not yet created. When built, place in `skills/homework/` and follow the `infra-setup-rubric.md` pattern. Link to Project 2 in `projects-manifest.md` and add to `skills-manifest.md`.

---

## Set 3 — Modern ML and Deep Learning Additions (Week 13 Gate)

**When introduced:** Week 13 (required before Project 3 work begins)
**Pass/fail gate:** planned — same status as Set 2; not yet implemented as a standalone skill.

**Additional requirements beyond Set 1 + Set 2:**

| Tool / Library | Version requirement | Purpose |
|---|---|---|
| torch (PyTorch) | any current stable | Neural network implementation (primary) |
| tensorflow / keras | any current stable | Neural network alternative (Keras quickstart shown in curriculum) |
| fairlearn | any current | Fairness metric computation (MetricFrame, demographic parity) |
| aif360 (optional) | any current | Alternative fairness toolkit; not required but mentioned in curriculum |

**Note:** only one of torch or tensorflow/keras is required — students choose based on preference or instructor guidance. The course demonstrates both (PyTorch in the raw API example, Keras in the quickstart pattern).

**Cloud GPU fallback:**
For students whose local machines cannot run neural network training at reasonable speed (typically: training an MLP on a dataset > 5,000 rows takes more than 5 minutes per epoch), cloud GPU access is the recommended fallback. Options:
- Google Colab (free tier, T4 GPU)
- Kaggle Notebooks (free, P100 GPU)
- AWS SageMaker Studio Lab (free tier)

Students using cloud environments must ensure their `requirements.txt` or `environment.yml` is committed to their GitHub repo so the environment is reproducible locally for grading. Any notebook that runs only on a GPU should note the runtime requirement in the README.

**Verification (informal until Set 3 checkpoint skill is built):**
```bash
python -c "import torch; print(torch.__version__)"
python -c "import fairlearn; print('OK')"
```
Or for Keras:
```bash
python -c "import tensorflow as tf; print(tf.__version__)"
```

**Planned skill:** `infra-checkpoint-set3` — not yet created. When built, place in `skills/homework/`, follow `infra-setup-rubric.md` pattern, link to Project 3 in `projects-manifest.md`, and add to `skills-manifest.md`.

---

## Summary of Gates

| Gate | Week | Status | Skill |
|---|---|---|---|
| Set 1 — course baseline | 1 | Active, graded | `infra-setup-rubric.md` (complete) |
| Set 2 — unsupervised learning additions | 10 | Planned, not built | `infra-checkpoint-set2` (planned) |
| Set 3 — modern ML and deep learning additions | 13 | Planned, not built | `infra-checkpoint-set3` (planned) |

---

## Notes for Future Maintainers

When adding a new library requirement to any project arc, update this manifest and the corresponding section of `projects-manifest.md`. Do not add library requirements to skill files without tracking them here — the infra manifest is the single source of truth for what students need installed and when.

If the course moves to a managed cloud environment (e.g., a JupyterHub instance where packages are pre-installed), the Set 2 and Set 3 gates may become vestigial for student-facing setup but remain relevant for understanding what the course actually uses.
