# Design & Implementation Phase

How to plan, design, and code with AI in an interview setting.

## What Interviewers Evaluate Here

The interviewer watches:
- Can you break down a problem?
- Do you use AI effectively?
- Can you understand and own the code?
- How do you handle complexity?
- Can you iterate and improve?

---

## Entry Level: Generate → Review → Move On

**Minimum to pass:** Generate code with AI, review it briefly, validate it runs.

### What Entry Level Looks Like

```
You: "Let me have Claude implement this based on our plan"

(Claude writes code)

You: "Looks good. Let me run it and see if it works"

(Run code, test basic case)

You: "Great, it works. Moving on to testing."
```

**Signal:** You can get code written and validated at a basic level.

**How to do this:**
1. Ask AI to implement (with clear scope)
2. Read the output
3. Test basic happy path
4. Move forward

---

## Mid Level: Plan → Implement → Review Thoroughly

**What's expected:** Ask AI for a plan first. Review the code carefully. Understand what it's doing. Ask clarifying questions. Maybe iterate once.

### What Mid Level Looks Like

```
You: "Let me ask Claude to outline the implementation plan first"

Claude: (outlines architecture, key files, dependencies)

You: "That makes sense. Now go ahead and implement it"

Claude: (writes code)

You: "Let me review this... I see you're using [approach]. 
      Why did you choose that over [alternative]?"

Claude: (explains)

You: "Got it. This looks solid. Let me test it."

(Test, find minor issue)

You: "There's an edge case here. Can you fix this part?"

Claude: (fixes)

You: "Perfect. Moving to testing."
```

**Signal:** You drive the implementation. You understand it. You iterate smartly.

**How to do this:**
1. Ask AI for a plan
2. Review the plan
3. Ask AI to implement
4. Review the code thoroughly
5. Ask clarifying questions
6. Iterate if needed

---

## Senior Level: Own the Architecture

**What's expected:** You make design decisions. You guide AI. You can explain every choice. You optimize for the interview context (time, scope, learning).

### What Senior Level Looks Like

```
You: "Based on the requirements, here's how I'd approach this:
      [explain architecture]
      
      For this interview, I'm going to scope it to [MVP].
      I'll ask Claude to implement it, but I want to drive the design."

(You write out the interface/structure first, or sketch it)

You: "Claude, here's what I'm thinking for the structure:
      [define key components]
      Can you implement these according to this pattern?"

Claude: (implements)

You: (reviews)

You: "I see you chose [approach]. I'm wondering if we should
      [alternative] to handle [concern]. What do you think?"

(Discuss, decide)

You: "Let's go with your approach because [reasoning].
      Now let's test this thoroughly."
```

**Signal:** You understand systems. You make intentional decisions. You use AI as a tool you control.

---

## Key Differences Between Levels

| Aspect | Entry | Mid | Senior |
|--------|-------|-----|--------|
| **Plan first?** | Maybe | Yes | Yes, and detailed |
| **Understand code?** | Surface level | Yes | Deeply, explain it |
| **Ask why?** | Rarely | Sometimes | Always |
| **Iterate?** | If broken | If improvements needed | Refine for quality |
| **Make decisions?** | Follow AI | Ask questions | Drive it |

---

## How to Handle Common Scenarios

### Scenario 1: "Claude wrote code I don't understand"

**Entry level:** Run it, hope it works
**Mid level:** Ask Claude to explain it
**Senior level:** Ask Claude to explain, decide if you'd do it differently

### Scenario 2: "Code works but feels inefficient"

**Entry level:** Ship it
**Mid level:** Ask Claude if it's okay for the time constraint
**Senior level:** Decide strategically whether to optimize

### Scenario 3: "I disagree with Claude's approach"

**Entry level:** Use it anyway (no confidence to override)
**Mid level:** Ask Claude to explain, maybe try different approach
**Senior level:** Explain your reasoning, try your way if time allows

---

## Interview Pacing

⏱️ **Typical interview:** 45 minutes for code

- Requirements: 5 minutes
- Design: 5-10 minutes (plan + review)
- Implementation: 15-20 minutes (AI helps, you guide)
- Testing: 5-10 minutes
- Discussion: 5 minutes

**If you're at Entry level:** Lean on AI to move fast
**If you're at Mid level:** Balance speed with understanding
**If you're at Senior level:** Move fast because you understand everything

---

## Red Flags

### ❌ Accept Code Without Understanding
```
Claude: (writes 50 lines)
You: "Looks good" (without reading)
```
→ You can't explain it if interviewer asks

### ❌ Argue With AI Unproductively
```
You: "I think your way is wrong"
Claude: "Here's why it's right"
You: "No, I don't agree"
(Stuck in loop, no progress)
```
→ Shows poor judgment

### ❌ Ignore Edge Cases
```
You: "Let me just test the happy path"
(Skip testing error cases)
```
→ Incomplete thinking

---

## Practice: Design & Implementation

### Scenario
Build a task queue system that processes jobs asynchronously.

**Your turn:** Write out your approach

Include:
1. What you'd ask AI for first (plan or implementation?)
2. How you'd review the code
3. What you'd ask Claude if you didn't understand something
4. How you'd test it
5. What trade-offs you'd consider

---

## Key Takeaway

**Design & Implementation signals:** Can you break down problems? Can you use AI smartly? Do you own the code?

**Entry level:** Generate and move on ✓  
**Mid level:** Plan, generate, review, iterate ✓  
**Senior level:** Drive design, use AI strategically, own everything ✓

---

## Next Step

Once implementation is solid, move to the **[Testing Phase](04-testing-phase.md)**.
