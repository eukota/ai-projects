# Communication & Articulation

How to explain your thinking and decisions in an interview.

## Why This Matters

Your interviewer can't read your mind. They evaluate you on what you **say and show**, not what you know internally.

**Key insight:** Communication IS technical skill in an interview.

---

## What Interviewers Listen For

### Entry Level
- Can you explain what you're doing?
- Do you talk through your decisions?
- Are you easy to follow?

### Mid Level
- Can you explain the "why" behind decisions?
- Do you consider trade-offs?
- Can you articulate design choices?

### Senior Level
- Do you ask good questions?
- Can you teach your thinking?
- Do you show deep understanding?
- Can you discuss trade-offs confidently?

---

## Key Communication Moments

### 1. Explaining Your Approach

**Entry level:**
> "I'm going to use [tech] and build [thing]"

**Mid level:**
> "I'm going to use [tech] because [reasoning].
> The alternative was [other approach], but I chose this because [trade-off]."

**Senior level:**
> "I considered [approaches]. I'm choosing [tech] because [reasoning].
> This trades off [cost] for [benefit], which makes sense given [context].
> If [assumption changes], I'd reconsider."

### 2. Thinking Out Loud

**Entry level:**
> "Let me code this up" (silent typing)

**Mid level:**
> "I'm thinking through the structure. I need [components].
> Let me ask Claude for a plan first."

**Senior level:**
> "Let me think through this out loud. The critical parts are [X] and [Y].
> Here's how I'd structure it: [sketch].
> Does that make sense?"

### 3. Handling Mistakes

**Entry level:**
> "Oops, that didn't work. Let me fix it." (Silent debugging)

**Mid level:**
> "Hmm, this isn't working. It looks like [the issue].
> I think it's because [reasoning]. Let me fix [part]."

**Senior level:**
> "Let me trace through this. The issue is [specific].
> This happened because [root cause].
> The fix is [solution]. I'll also check [related area] to make sure it doesn't have the same issue."

### 4. Explaining Your Solution

**Entry level:**
> "This code [does thing]"

**Mid level:**
> "This code [does thing]. Here's how it works: [explanation].
> The key parts are [components]. They work together to [overall effect]."

**Senior level:**
> "This solution handles [requirements].
> The architecture is [structure] because [reasoning].
> It scales to [level] because [explanation].
> The trade-off is [cost] vs [benefit].
> If we needed to [improvement], we'd [approach]."

---

## How to Communicate Better

### 1. Name Things as You Go

```
❌ "Let me create this"

✓ "I'm creating a TaskQueue class to manage the queue"
```

### 2. Explain Your Reasoning

```
❌ "I'm using a hash map here"

✓ "I'm using a hash map for O(1) lookup instead of an array 
   which would be O(n) for finding by ID"
```

### 3. Check Understanding

```
❌ (Silent coding for 10 minutes)

✓ "Does this approach make sense so far?"
```

### 4. Admit When You're Unsure

```
❌ (Confidently wrong)

✓ "I'm not 100% sure about [detail]. Let me verify with Claude"
```

---

## Things NOT to Say

❌ "I don't know how to do this"  
→ Say: "I'm not sure of the best approach. Let me think through options"

❌ "AI wrote this"  
→ Say: "Claude provided the implementation. Let me walk you through it"

❌ "This is the only way to do it"  
→ Say: "This approach works. An alternative would be [other way]"

❌ "I'm just copying what Claude wrote"  
→ Say: "I asked Claude to implement [spec]. I reviewed it and made [changes]"

---

## Practice: Communication Scenarios

### Scenario 1: Explaining Your Design

**You just sketched an architecture. Explain it to your interviewer.**

Include:
- What each component does
- Why you chose this structure
- How components interact
- Trade-offs you considered

### Scenario 2: You Found a Bug

**Your code failed a test. Explain what happened.**

Include:
- What you expected
- What actually happened
- Why the bug exists
- How you'll fix it
- How you'll prevent it next time

### Scenario 3: You're Using AI

**The interviewer asks "Are you using AI for this part?"**

Include:
- What you asked AI to do
- How you reviewed it
- Changes you made
- Why you trusted/didn't trust that approach

---

## Key Takeaway

**Communication signals:** Can you explain your thinking? Can you teach me your solution?

**Entry level:** Explain what you're doing ✓  
**Mid level:** Explain why you're doing it ✓  
**Senior level:** Explain it so well I could do it ✓

---

## Interview Tip

**If you're nervous:**
- Slow down. Explain more, not less.
- Talk through your thinking.
- Ask clarifying questions instead of assuming.
- Name things out loud as you do them.

Your interviewer wants to understand your thinking. Give them material to evaluate.

---

## Next Step

Learn about **[Mock Interviews](06-mock-interview-structure.md)** — where you'll practice all of this.
