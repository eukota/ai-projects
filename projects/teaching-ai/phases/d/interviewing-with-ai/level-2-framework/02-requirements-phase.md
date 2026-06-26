# Requirements Phase

How to gather and clarify requirements in an interview (with AI as your assistant).

## What Interviewers Evaluate Here

The interviewer watches how you:
- Ask clarifying questions
- Scope the work
- Handle ambiguity
- Engage with the problem
- Set up for success

---

## Entry Level: Ask at Least One Question

**Minimum to pass:** Ask the interviewer at least one clarifying question before diving into implementation.

### What Entry Level Looks Like

```
Interviewer: "Build a user authentication system"

You: "Is this for a web app or mobile? Do we need OAuth or local auth?"
→ Ask 1-2 questions
→ Write down the requirements
→ Start coding
```

**Signal:** You don't just assume; you ask.

**How to do this:**
1. Listen to the problem
2. Ask 1-2 clarifying questions (constraints, scope, tech)
3. Get answers
4. Move forward

---

## Mid Level: Explicitly Discuss Requirements

**What's expected:** Talk through requirements thoughtfully. Show you're thinking about the problem before diving in.

### What Mid Level Looks Like

```
Interviewer: "Build a user authentication system"

You: "Okay, let me think through what I need to understand.
     - Scale: Is this for a startup (100 users) or enterprise (millions)?
     - Security: Are we storing passwords or using OAuth?
     - Persistence: Do we need a database or is in-memory okay for this interview?
     - Tech: Any constraints on what I can use?"

(Get answers, write them down)

You: "Great. So we're building a simple local auth system for a web app. 
      I'll use [tech stack] because [reasoning].
      Let me ask the AI to help me plan this out before implementing."
```

**Signal:** You think systematically about the problem. You scope the work. You ask AI for help planning.

**How to do this:**
1. Listen to the problem
2. Ask clarifying questions (coverage, scale, constraints)
3. Summarize requirements back to confirm understanding
4. Decide on approach/tech
5. Ask AI to help plan

---

## Senior Level: Own the Requirements

**What's expected:** You drive the requirements conversation. You make decisions. You set yourself up for success.

### What Senior Level Looks Like

```
Interviewer: "Build a user authentication system"

You: "I want to make sure I'm solving the right problem. Let me ask a few questions:
     - What's the scope? Are we talking MVP or production?
     - What are the constraints? Time, tech stack, database?
     - What does success look like?"

(Get answers)

You: "Based on that, here's how I'd approach it [explain architecture].
      For this interview, I'm going to scope it to [MVP definition].
      I'll use [tech] because [reasoning].
     
      Before I implement, let me have the AI draft a plan and we can review the architecture together."
```

**Signal:** You understand the problem deeply. You make smart trade-offs. You use AI strategically.

---

## Common Mistakes in Requirements Phase

### ❌ Non-Passing: Skip Requirements Entirely

```
Interviewer: "Build authentication"

You: (immediately opens IDE and starts coding)
```

→ Interviewer thinks: Entry level at best, no scoping skills

### ❌ Entry → Mid Gap: Ask But Don't Engage

```
You: "What are the requirements?"
(Get answer, nod, start coding without thinking)
```

→ Interviewer thinks: You asked, but didn't really think

### ❌ Mid → Senior Gap: Don't Make Decisions

```
You: "Should I use a database or in-memory storage?"
(Waits for interviewer to decide)
```

→ Interviewer thinks: You can't drive decisions

---

## How to Use AI in Requirements Phase

### Entry Level
- AI confirms your understanding of the problem
- Example: "Is this what the interviewer asked for?" (AI reads back requirements)

### Mid Level
- AI helps you think through requirements
- Example: "What are the important questions to ask about this system?"
- You use AI's suggestions to deepen your understanding

### Senior Level
- AI drafts an implementation plan based on requirements
- You review, refine, decide approach
- Example: "Here are the requirements. What are 3 different ways to implement this?"

---

## Practice: Requirements in an Interview

### Scenario
Interviewer: "Build a real-time collaboration tool like Google Docs"

**Your turn:** Write out what you'd say in the Requirements phase.

Include:
1. Clarifying questions you'd ask
2. Requirements you'd confirm
3. Trade-offs you'd consider
4. How you'd use AI to help
5. Your decision on scope/approach

**Compare to:**

```
"Great problem. Let me scope this:

Questions:
- Scale: Small team (5 users) or larger?
- Features: Just text editing or formatting, comments, etc?
- Tech: Browser only or mobile too?
- Realtime: Must be sub-second or 1-2 second lag okay?

(Get answers)

Based on that, I'm thinking:
- WebSockets for realtime communication
- Operational Transform or CRDT for conflict resolution
- Simple in-memory store for this interview

Let me ask Claude to outline a high-level architecture before I start coding."
```

---

## Key Takeaway

**Requirements phase signals:** Do I understand the problem? Can I scope work? Do I think before I act?

**Entry level:** Asks questions ✓  
**Mid level:** Asks questions + thinks through tradeoffs ✓  
**Senior level:** Asks questions + decides approach + uses AI strategically ✓

---

## Next Step

Once you've established requirements, move to the **[Design & Implementation Phase](03-design-implementation-phase.md)**.
