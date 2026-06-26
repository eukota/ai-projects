# Testing Phase

How to validate your solution in an interview (where time is limited).

## What Interviewers Evaluate Here

- Can you think about edge cases?
- Do you write tests or just manual testing?
- Do you find bugs and fix them?
- How thorough are you?
- Can you use AI to help with testing?

---

## Entry Level: Manual Testing (Happy Path)

**Minimum to pass:** Test the main case. Show it works.

### What Entry Level Looks Like

```
You: "Let me test this with a basic example"

(Run: create task, check it's created, done)

You: "Works. Moving on."
```

**Signal:** You verify basic functionality.

**How to do this:**
1. Write a simple test case
2. Run code
3. Verify happy path works

---

## Mid Level: Multiple Test Cases + Thinking

**What's expected:** Test happy path AND some edge cases. Think about what could break. Maybe write a few tests.

### What Mid Level Looks Like

```
You: "Let me think about what I need to test:
     - Happy path: normal case
     - Empty input
     - Large input
     - Boundary cases"

(Run several tests)

You: "Good, basic cases work. Let me ask Claude to write a few tests
      to check edge cases."

Claude: (writes tests)

You: "I see you're testing [cases]. That covers the main scenarios.
      Let me run these."

(Run, find one issue)

You: "Ah, there's a bug with empty input. Let me fix that"

(Fix, re-test)

You: "Better. This is solid enough for the interview scope."
```

**Signal:** You think systematically about testing.

---

## Senior Level: Strategic Testing

**What's expected:** You decide what matters to test based on the problem and time. You balance coverage with pragmatism.

### What Senior Level Looks Like

```
You: "For this system, the critical paths are:
     [list key scenarios]
     
     The edge cases that matter are:
     [explain why these matter]
     
     In an interview setting, I'll focus on those.
     Let me ask Claude to write tests for the critical paths,
     then I'll add manual tests for edge cases."

(Claude writes tests)

You: (review, maybe refine)

You: "Now let me manually test [specific edge case] because
      it's critical to the design"

(Test, validate)

You: "This covers the essential scenarios. I'm confident in this solution."
```

**Signal:** You understand what matters. You test strategically.

---

## Common Testing Mistakes

### ❌ Non-Passing: No Testing
```
You: "It compiles, so it works"
(Skip testing entirely)
```
→ Interviewer thinks: Naive about quality

### ❌ Entry → Mid: Only Happy Path
```
You: (test one basic case)
You: "Looks good"
(Don't think about edge cases)
```
→ Interviewer thinks: Surface-level thinking

### ❌ Mid → Senior: Test Everything Slowly
```
You: "Let me write 20 test cases"
(Spend 15 minutes writing tests, no time for discussion)
```
→ Interviewer thinks: Poor time management

---

## How to Use AI in Testing

### Entry Level
- AI writes simple manual tests
- Example: "Write a test that creates a task and verifies it"

### Mid Level
- AI writes unit tests
- You review and validate
- Example: "Write tests for these edge cases"

### Senior Level
- AI writes comprehensive test suite
- You review, decide what's critical to validate manually
- Example: "Here are the critical paths. Write tests for these. I'll manually test [edge case] because it's important to see it work"

---

## Time Management in Testing

**45-minute interview breakdown:**

- Requirements: 5 min
- Design: 5-10 min
- Implementation: 15-20 min
- **Testing: 5-10 min** ← Keep it focused
- Discussion: 5 min

**Don't:** Spend 15 minutes writing exhaustive tests

**Do:** Spend 5-10 minutes testing what matters

---

## Practice: Testing Phase

### Scenario
You just implemented a task queue system. Now test it.

**Your turn:** What would you test?

Include:
1. Happy path test
2. 2-3 edge cases
3. How you'd ask AI to help
4. How you'd verify it works
5. Time estimate

**Compare to:**

```
I'd test:
1. Happy path: add task, process it, verify completion
2. Edge cases: 
   - Empty queue (shouldn't crash)
   - Duplicate task IDs (should handle gracefully)
   - Task failure (retry logic works)

I'd ask Claude to write tests for these cases.
Then I'd manually run one critical case to see it work.

That's 5-10 minutes. Then we discuss."
```

---

## Key Takeaway

**Testing signals:** Do you think about quality? Are you pragmatic? Can you validate your solution?

**Entry level:** Basic manual testing ✓  
**Mid level:** Multiple test cases, edge case thinking ✓  
**Senior level:** Strategic testing, knows what matters ✓

---

## Next Step

After testing, you'll discuss your solution. Learn about **[Communication & Articulation](05-communication-and-articulation.md)**.
