---
name: llms-as-tools
description: Review a student's LLM prompt for a data task; suggest improvements; explain LLM failure modes in data workflows
---

# Homework Skill: LLMs as Tools

## Purpose

This skill is active during Week 14 and feeds directly into Project 3. Students have been using AI tools all semester — this week is about understanding what those tools actually are, where they break, and how to use them intentionally for data work rather than just hoping for a good answer.

The goal is critical fluency, not evangelism.

---

## Ask Before Explaining

Before explaining how LLMs work: "You've used the class agent and Copilot all semester. In your own words, what do you think is happening when you ask it a question? How does it decide what to say?"

If a student shows a prompt that returned a bad result: "Before we fix the prompt, tell me what was missing or wrong about the output. What would 'good' look like here?"

If they're deciding whether to use an LLM for a task: "What's the failure mode if the LLM is confidently wrong here? Is this a task where you can easily verify the output?"

---

## What LLMs Actually Are

An LLM is a token prediction engine. Given a sequence of tokens (roughly: words or word-pieces), it predicts the next most likely token based on patterns learned from training data. It has no memory between conversations, no access to live data (unless explicitly given tools), and no internal model of "truth" — only statistical patterns.

Implications for data work:
- **Library hallucination:** the model may confidently cite an API, function signature, or parameter name that doesn't exist or has changed since its training cutoff. Always verify against actual documentation before running.
- **Version drift:** sklearn 1.3 has different defaults than sklearn 0.24. The model may be drawing on training examples from any version.
- **Confident wrongness:** the model doesn't know what it doesn't know. A confident-sounding answer is not a correct answer.

Ask: "Have you ever gotten code from an LLM that looked right but threw an error when you ran it? What kind of error was it?"

---

## Failure Modes in Data Workflows

**Hallucinated API calls:** the model invents a method that doesn't exist, or uses a correct method with wrong arguments.

```python
# Example of something an LLM might generate that looks plausible but is wrong:
df.fillna(strategy="mean")  # ValueError: unexpected keyword argument
# Correct:
df.fillna(df.mean())
```

Rule: never paste LLM-generated code into a notebook without reading it first. If you don't understand what a line does, that's a flag.

**Stale best practices:** the model may recommend patterns that were correct two years ago but are now deprecated or superseded.

**Over-specific interpretations:** when asked "what does my PCA loading mean," the model may produce a plausible-sounding interpretation that's disconnected from the actual values. It doesn't know your dataset.

---

## Prompting Patterns for Data Tasks

**Be specific about input and expected output:**

Weak: "Write me a function to clean my data."

Better: "Write a Python function that takes a pandas DataFrame and returns a cleaned version with: (1) missing values in numeric columns filled with the column median, (2) rows where the target column is null dropped, (3) string columns stripped of leading/trailing whitespace. Show me the function signature and a brief docstring."

**Chain-of-thought for multi-step reasoning:**

Add "think step by step" or explicitly break the task into steps when the task requires reasoning. "First, identify which type of encoding is appropriate for each column. Then write the code."

**Few-shot examples for format control:**

If you want structured output (JSON, a specific table format), give one or two examples of what the output should look like before asking the model to produce it.

**Structured output for extraction tasks:**

For data wrangling tasks like entity extraction from messy text, specify the exact output format:
"Extract all location names from the following text and return a JSON array of strings. If none are found, return an empty array. Text: ..."

---

## Reviewing a Student's Prompt

When a student shares a prompt that returned a bad result, evaluate:

1. **Is the task specified precisely enough?** Vague prompts get vague answers.
2. **Is the expected output format explicit?** If you don't say what you want, you'll get whatever the model defaults to.
3. **Is there ambiguity the model had to guess at?** Ambiguity gets filled in with training data patterns, not with what you actually meant.
4. **Is this a task the model can actually do reliably?** LLMs are good at text manipulation, code generation (with verification), and explaining concepts. They're unreliable for numerical computation, reasoning about specific dataset values, and anything that requires current or specialized knowledge.

Ask: "What in this prompt left room for the model to make a decision you didn't intend?"

---

## LLMs for Data Wrangling

LLMs are genuinely useful for:
- Normalizing inconsistent categorical values ("Northern California", "N. CA", "NorCal" → all one label)
- Extracting structured data from messy text fields
- Writing first-pass regex patterns for text cleaning
- Translating column names or categories between schemas

The verification requirement: for any data transformation produced by an LLM, run a sample output through it and inspect manually before applying to the full dataset.

---

## RAG Conceptual Overview

Retrieval-Augmented Generation (RAG): instead of relying solely on the model's training data, the system retrieves relevant documents at query time and includes them in the context window. This is how the class agent is grounded in course materials — the agent retrieves relevant skill content and project prompts before generating a response.

Students don't need to implement RAG, but they should understand why the class agent can discuss Project 1 specifics while ChatGPT cannot.

Ask: "Why does the class agent know about the Project 3 rubric but ChatGPT doesn't? What would have to be true for ChatGPT to answer project-specific questions correctly?"

---

## Connection to Project 3

Project 3's collaboration log must include Week 14 entries documenting LLM use for feature engineering or data wrangling. The standard for these entries is: what did you ask, what did it produce, did you verify the output, and did you catch anything wrong? A log that says "used ChatGPT to help with data cleaning, it worked great" does not meet the critical reflection standard.
