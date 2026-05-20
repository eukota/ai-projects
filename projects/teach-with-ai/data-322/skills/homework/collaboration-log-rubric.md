# Collaboration Log Rubric

## Purpose
The collaboration log documents how you worked with the AI agent — what it got right, where it went wrong, and how you directed or corrected it. Quality is measured by **evidence of critical engagement**, not by extent of AI use.

---

## Scoring Levels

### Exemplary (90–100%)
- **Evidence of interaction:** Chat log shows multiple exchanges, not a single query-and-accept pattern
- **Critical questions:** Student asks "why," requests alternatives, or challenges AI reasoning
- **Error detection:** Student identifies and documents where AI output was wrong, incomplete, or misleading
- **Self-direction:** Student uses AI as a tool but drives the direction; doesn't accept suggestions uncritically
- **Depth:** Log entries show engagement with material, not just task completion

**Example:**
> *Week 5, cross-validation harness. I asked the agent for a CV loop. It gave me code that fit the scaler on the full dataset before splitting — data leakage. I caught this, asked why that's wrong, and then asked it to fix the bug. The revised version was correct. I also asked what would happen if I used the wrong order, and we discussed the impact on model eval.*

---

### Proficient (75–89%)
- **Evidence of interaction:** Multiple back-and-forths with the AI; shows some iteration
- **Critical questions:** At least one instance of asking "why" or requesting clarification
- **Error detection:** Catches and documents at least one AI mistake or oversimplification
- **Self-direction:** Mostly uses AI appropriately; one or two moments of accepting suggestions without question
- **Depth:** Discusses the material; not just mechanical task completion

**Example:**
> *Week 5, cross-validation. I asked for a CV implementation. The AI's first attempt had a bug (fit scaler before split). I fixed it and documented the correction. I also asked about k-fold vs. stratified k-fold, and the agent explained when each matters.*

---

### Developing (60–74%)
- **Evidence of interaction:** Minimal back-and-forth; mostly one-shot queries
- **Critical questions:** Asks clarification but mostly accepts answers at face value
- **Error detection:** May catch one error, but documentation is vague or incomplete
- **Self-direction:** Relies heavily on AI; limited independent judgment
- **Depth:** Focuses on "did the code work?" rather than "do I understand why?"

**Example:**
> *Used AI to write the CV loop. It worked, so I moved on. Asked for help with the results visualization and used that code too.*

---

### Incomplete (Below 60%)
- **Evidence of interaction:** One query, no follow-up; or submitted without chat log
- **Critical questions:** None, or only procedural ("how do I do X?")
- **Error detection:** No evidence of checking AI output
- **Self-direction:** Submitted AI output as-is without review
- **Depth:** No evidence of learning or material engagement

---

## How to Submit

Include with your project:
1. **Chat log or transcript** — Export the full conversation with the AI (or key excerpts if the log is very long)
2. **Annotations** — Mark moments of critical engagement: where you caught errors, asked follow-ups, or pushed back
3. **Brief summary** — 2–3 sentences on what you learned about your own learning from using AI on this project

---

## What Doesn't Count

- Passive use ("I asked and used the answer without checking")
- Undocumented use ("I used AI but forgot to save the chat")
- Trivial questions ("How do I format a string in Python?")
- One-time consultations (no iteration or follow-up)

---

## What Does Count

- Catching AI errors and documenting the fix
- Asking clarification questions and then trying the suggestion
- Comparing AI's output to your own attempt and noting differences
- Testing AI's recommendations before accepting them
- Asking "why" instead of just "how"
