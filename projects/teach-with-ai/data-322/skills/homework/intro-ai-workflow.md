---
name: intro-ai-workflow
description: Review a student's collaboration log entry; identify missing critical reflection; model what good AI-assisted work documentation looks like
---

# Homework Skill: AI Workflow and the Collaboration Log

## Purpose

This skill is active during Week 2 and referenced throughout the semester whenever a student submits or asks about a collaboration log entry. The collaboration log is a graded component of all three projects. This skill teaches students what a good entry looks like and reviews their drafts.

---

## What the Collaboration Log Is

The collaboration log documents every meaningful use of an AI tool during project work. "Meaningful" means: the AI output influenced a decision, was used as a starting point for code, or provided an explanation the student relied on.

The log is not a transcript. It is a record of the student's critical relationship with the AI tools they used.

A complete log entry has four parts:

1. **What I asked / what I used it for.** Specific enough that an instructor can understand the interaction without seeing the full conversation.
2. **What the AI produced.** A brief summary — not the full output, but enough to see what happened.
3. **What I did with it.** Did you use it as-is? Modify it? Reject it? Build on it?
4. **Where it was wrong or where I disagreed.** Every entry should have at least one observation about AI limitations, errors, or moments where you made a different choice. If the entry has none of this, it is incomplete.

---

## Reviewing a Student's Draft Log Entry

When a student shares a draft log entry, evaluate it on these criteria:

**Is the AI contribution specific?**
A vague entry like "I used ChatGPT to help with my code" fails this check. A specific entry describes what was asked, what was returned, and what the student did next. Ask: "Can an instructor reading this reconstruct what happened without seeing the conversation?"

**Is there evidence of critical engagement?**
The log must include at least one moment where the student pushed back on, corrected, or declined to follow AI output. If the entry reads like the student accepted everything the AI produced without question, ask: "Was there anything the AI suggested that you didn't end up using? Why?"

If the student says "it was all correct and I used all of it," that is almost certainly not true and is a sign of uncritical use. Push on this: "Did the AI ever suggest a variable name, a function, a model parameter, or an interpretation that you changed? That counts."

**Is the reflection honest?**
Entries that read like a testimonial ("the AI was super helpful and explained everything clearly") are not reflections. Ask: "What would have been different if you hadn't used AI assistance here? What gap did it fill, and what did you still have to do yourself?"

---

## Sample Entries: Good vs. Weak

**Weak entry:**
> Used GitHub Copilot to write the feature encoding section. It worked and I used it.

Problems: No specifics on what was generated. No indication of critical review. No documentation of limitations or corrections.

**Strong entry:**
> Asked the class agent to explain why I should scale features before logistic regression but not before a random forest. The agent gave a correct explanation grounded in the distance-based vs. tree-based distinction. I used this explanation to write my preprocessing comment in the notebook. However, the agent initially said "always scale before any sklearn Pipeline" which is wrong — I pushed back and it corrected itself, acknowledging that scalers inside a Pipeline don't need to be applied before the Pipeline is constructed. I documented this correction in my notebook comment.

Why this is strong: specific question asked, specific output received, used but with active engagement, identified and documented an error.

---

## Teaching the Norms

When a student is confused about what counts as "AI use" for the log, use these examples to clarify:

**Counts:**
- Using GitHub Copilot to complete a function and accepting the suggestion
- Asking the class agent to explain a concept you then relied on
- Prompting ChatGPT for a code snippet and modifying it for your dataset
- Using an LLM to help interpret a model output

**Does not count:**
- Using a search engine (Google, Stack Overflow)
- Using course slides or the textbook
- Asking a classmate for help

**Gray area (student judgment, document it anyway):**
- Asking an AI to check your grammar in a report section
- Using Copilot for boilerplate imports and setup code you know cold

---

## AI Tools in Scope for This Course

The course explicitly approves these AI tools, and students are expected to use them:

- **The DATA 322 class agent** — primary tool; Socratic, course-aware
- **GitHub Copilot** — in VS Code or Cursor; code completion
- **ChatGPT** — as a reference tool for conceptual explanations; students should treat it like a knowledgeable friend who sometimes confabulates

Tools outside this list are not prohibited, but students must document their use. Any AI tool that writes significant portions of a project deliverable without documentation is an academic integrity violation.

---

## Grading Weight Reminder

The collaboration log is worth 15% of each project grade. A log that has no critical reflection or no documented errors cannot receive full credit regardless of how good the underlying project work is. This is intentional — the log is not an afterthought; it is evidence of how you learned.
