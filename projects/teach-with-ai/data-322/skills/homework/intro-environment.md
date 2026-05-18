---
name: intro-environment
description: Walk a student through diagnosing and fixing a broken Python/Jupyter/Git environment; covers conda/venv, Jupyter kernel issues, and Git config for the course repo
---

# Homework Skill: Environment Setup

## Purpose

This skill is active during Week 1 and available throughout the semester for environment-related issues. Students in DATA 322 are expected to have a working environment by the end of Week 1. This skill handles the full diagnostic flow when something is broken, and guides students who are setting up from scratch.

---

## What This Skill Covers

- Python environment management: conda vs. venv, when to use which
- Installing and verifying course packages: numpy, pandas, matplotlib, seaborn, scikit-learn, jupyter, ipykernel
- Jupyter kernel mismatches: "my environment has the package but Jupyter can't find it"
- VS Code or Cursor: connecting to the right interpreter, installing the Jupyter extension
- Git: initial config, creating the course repo, first commit
- GitHub Copilot: activation and basic use in VS Code/Cursor

---

## Diagnostic Flow

When a student reports an environment problem, work through this in order before assuming anything:

**Step 1 — Identify the symptom.**
Ask: "What exactly is failing? Can you share the error message or what you see?"

Common symptoms:
- `ModuleNotFoundError` on import
- Jupyter kernel crashes or resets on first cell
- Jupyter shows the wrong Python version in the top-right kernel indicator
- `conda activate` has no effect or is not recognized
- Git commands fail with auth errors or name/email not set

**Step 2 — Identify the environment.**
Ask: "What OS are you on? What did you use to install Python — conda, system Python, pyenv, or something else?"

Do not assume. Environment issues are OS-specific and install-path-specific.

**Step 3 — Verify the environment is active where they think it is.**
The most common problem: the environment is installed correctly but not activated, or Jupyter is running from a different Python than the terminal.

Instruct:
```bash
# In the terminal where they're working:
which python      # on macOS/Linux
where python      # on Windows

# Check if the kernel is registered
jupyter kernelspec list
```

If the active Python path doesn't match the environment path, that's the issue. Fix:
```bash
# Register the conda/venv environment as a Jupyter kernel
python -m ipykernel install --user --name=data322 --display-name "DATA 322"
```

Then restart Jupyter and select the new kernel from the top-right menu.

**Step 4 — Verify the packages are installed in that environment.**
```bash
# With the environment active:
python -c "import sklearn; print(sklearn.__version__)"
python -c "import pandas; print(pandas.__version__)"
```

If this passes in terminal but fails in Jupyter, the kernel isn't pointing at this environment — go back to Step 3.

**Step 5 — Git setup.**
Minimum required config for the course repo:
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Create the course repo
mkdir data-322-work && cd data-322-work
git init
echo "# DATA 322 Work" > README.md
git add README.md
git commit -m "Initialize course repo"
```

GitHub remote setup (if using GitHub):
```bash
gh repo create data-322-work --private --source=. --remote=origin --push
# or manually:
git remote add origin https://github.com/yourname/data-322-work.git
git push -u origin main
```

---

## Required Environment (Course Standard)

Students should confirm these packages install and import cleanly:

```
numpy>=1.24
pandas>=2.0
matplotlib>=3.7
seaborn>=0.12
scikit-learn>=1.3
jupyter
ipykernel
jupyterlab (optional but recommended over classic notebook)
```

Recommended conda environment file (students can save as `environment.yml`):
```yaml
name: data322
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11
  - numpy
  - pandas
  - matplotlib
  - seaborn
  - scikit-learn
  - jupyter
  - ipykernel
  - jupyterlab
  - pip
```

Create with: `conda env create -f environment.yml`  
Activate with: `conda activate data322`

---

## What Not to Do

Do not tell a student to use `pip install` into a base conda environment. This creates dependency conflicts that are extremely hard to debug later. Always work inside a named environment.

Do not tell a student to use `sudo pip install` or modify system Python. This is how they break their machine.

Do not guess at the fix without asking for the error message first. Environment issues are specific and the same symptom can have ten different causes.

---

## Escalation

If a student has worked through this flow and still has a broken environment, direct them to bring their laptop to office hours. Remote debugging of complex environment issues via chat is not efficient and wastes student time.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **You run `import sklearn` in your terminal and it works, but the same import fails in your Jupyter notebook. What's the most likely cause, and how would you diagnose it?**

2. **What's the difference between a conda environment and the base conda environment? Why does the course tell you never to install packages into base?**

3. **Explain what `git commit` actually does. Why does the course require you to have a Git repository for your work from day one, rather than just keeping files in a folder?**

4. **What does `python -m ipykernel install --user --name=data322` do, and when would you need to run it?**

5. **A classmate says "I installed scikit-learn with pip into my base Python and everything works fine." What risk are they taking that they might not notice until later in the semester?**
