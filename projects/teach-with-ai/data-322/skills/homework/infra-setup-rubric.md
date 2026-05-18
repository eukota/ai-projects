---
name: infra-setup-rubric
description: Diagnose and resolve Python environment, Jupyter, Git, and VS Code/Cursor setup issues; help a student verify their environment and self-assess readiness for the course
---

# Homework Skill: Infrastructure Setup

## Purpose

This skill is active during Week 1 and available throughout the semester. Infrastructure setup is a graded component — every student must demonstrate a working, verified environment. This skill covers what "passing" looks like, how to diagnose failures, and common patterns the agent uses to get a student unblocked.

The goal is not just that things work, but that the student understands well enough to diagnose future problems themselves.

---

## What a Passing Infrastructure Looks Like

A student has passing infrastructure when they can confirm all of the following:

1. A named Python environment (conda or venv) that is not the system/base Python, with course packages installed.
2. Jupyter Lab or Notebook running and using that named environment as the kernel.
3. Git configured with their name and email, with a course repository initialized and at least one commit pushed.
4. VS Code or Cursor installed with the Python extension active and pointing at the named environment's interpreter.
5. (Optional but recommended) GitHub Copilot activated in VS Code/Cursor.

---

## Verification Steps

Have the student run each of these to confirm their environment is correctly wired up.

### Python Environment

```bash
# Confirm which Python is active — should be inside a named env, not /usr/bin/python or /Users/.../base
which python           # macOS/Linux
where python           # Windows

# Confirm environment name (conda)
conda info --envs      # active env has * next to it

# Confirm packages are installed and importable
python -c "import numpy, pandas, matplotlib, seaborn, sklearn, jupyter; print('All packages OK')"
python -c "import sklearn; print(sklearn.__version__)"  # should be >= 1.3
```

### Jupyter Kernel

```bash
# List registered kernels
jupyter kernelspec list

# The output should include an entry for the course environment:
# data322    /path/to/kernels/data322
```

Then open Jupyter Lab, create a new notebook, and confirm the kernel selector shows "DATA 322" (or whatever display name was used). Run:

```python
import sys
print(sys.executable)  # should show a path inside the named environment, not base
```

### Git Identity

```bash
git config --global user.name   # should return their full name
git config --global user.email  # should return their email

# Confirm the course repo exists and has commits
cd ~/your-course-repo
git log --oneline -5
```

### VS Code / Cursor Interpreter

Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) → "Python: Select Interpreter." The interpreter should show the named environment path, not base or system Python.

In a new `.py` file or notebook, confirm the bottom status bar shows the correct environment name.

---

## Diagnostic Flow

When a student reports a broken environment, work through these steps before suggesting any fix.

**Step 1 — Identify the symptom exactly.**

Ask: "What exactly fails? Copy and paste the full error message." Do not guess. Common symptoms:
- `ModuleNotFoundError` on import in Jupyter even though the package is installed
- Jupyter kernel shows the wrong Python version in the top-right corner
- `conda activate data322` has no effect or is not recognized
- Git commands fail with auth errors or "please tell me who you are"
- VS Code shows a different interpreter than the terminal

**Step 2 — Identify the environment type and OS.**

Ask: "What OS are you on? Did you install Python via conda, pyenv, system package manager, or directly from python.org?" Environment issues are OS- and installer-specific. Don't assume.

**Step 3 — Verify the environment is active where the student thinks it is.**

The most common failure: the environment is installed correctly but not active, or Jupyter is running from a different Python than the terminal. Have them run `which python` / `where python` and compare against the path they expect.

**Step 4 — Verify the kernel registration.**

If `which python` in the terminal is correct but Jupyter uses the wrong Python:

```bash
# Re-register the environment as a Jupyter kernel
python -m ipykernel install --user --name=data322 --display-name "DATA 322"
```

Then restart Jupyter and select the new kernel.

**Step 5 — Verify packages are installed in the active environment.**

```bash
python -c "import sklearn; print(sklearn.__version__)"
```

If this fails in the terminal with the environment active, the packages need to be installed:

```bash
pip install numpy pandas matplotlib seaborn scikit-learn jupyter ipykernel jupyterlab
```

**Step 6 — Git identity.**

```bash
git config --global user.name "First Last"
git config --global user.email "student@example.com"
```

If `git push` fails with authentication errors, they need to set up GitHub SSH keys or a personal access token — point them to [docs.github.com/en/authentication](https://docs.github.com/en/authentication) and offer to walk through it.

---

## Common Failure Patterns

**"I installed the package but Jupyter can't find it."**
The package was installed in a different environment than the one Jupyter is using. Fix: re-run `pip install` with the environment active, or re-register the kernel.

**"conda activate data322 doesn't do anything."**
The shell hasn't been initialized for conda. Fix: run `conda init bash` (or `conda init zsh` on macOS), then restart the terminal.

**"I'm using the base conda environment because it already has pandas."**
This works until it doesn't. Base environments are fragile and shared — future installs can break things unexpectedly. Create a named environment: `conda create -n data322 python=3.11` and install packages fresh.

**"pip install worked but I keep getting the wrong version."**
There are multiple Python installations on the system. `which pip` may point to a different Python than `which python`. Fix: use `python -m pip install` instead of bare `pip install`.

**"VS Code shows the wrong interpreter and I can't find the right one."**
The named environment interpreter path needs to be added manually. In VS Code, click the interpreter selector in the status bar → "Enter interpreter path" → paste the output of `which python` with the environment active.

**"Git says 'please tell me who you are' on every commit."**
`git config --global user.name` and `git config --global user.email` were never set, or were set with `--local` only. Fix: set them globally.

---

## Self-Assessment Checklist

The student can use this to self-assess before the Week 1 lab deadline.

- [ ] `conda info --envs` (or equivalent) shows a named `data322` environment with `*` active
- [ ] `python -c "import numpy, pandas, sklearn, jupyter; print('OK')"` runs without errors
- [ ] `sklearn.__version__` is 1.3 or higher
- [ ] `jupyter kernelspec list` shows a `data322` kernel
- [ ] A new Jupyter notebook opens with "DATA 322" as the selected kernel
- [ ] Running `import sys; print(sys.executable)` in that notebook shows a path inside the named environment
- [ ] `git config --global user.name` and `git config --global user.email` both return the correct values
- [ ] `git log --oneline -3` in the course repo shows at least one commit
- [ ] VS Code or Cursor status bar shows the `data322` interpreter when a Python file is open

If all boxes are checked, infrastructure setup is complete.

---

## Quiz Prep

The AI will quiz you on these questions in Socratic mode before the in-class test — it will ask you to answer first, then give feedback. Memorizing definitions won't be enough; you need to be able to reason through these in plain language.

1. **You run `import sklearn` in your terminal and it works, but the same import fails in your Jupyter notebook. What's the most likely cause, and what's the fix?**

2. **What's the difference between installing packages into a named conda environment vs. into the base environment? Why does the course tell you to always use a named environment?**

3. **Explain what `python -m ipykernel install --user --name=data322` does and when you'd need to run it.**

4. **What does `git config --global user.email` do, and why does git require this before you can commit?**

5. **A classmate says "conda activate data322 does nothing when I run it." Without knowing their OS, what are two possible causes and how would you distinguish between them?**
