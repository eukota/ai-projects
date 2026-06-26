# Solution Generation with AI

How the candidate solves problems using AI. This nested section covers:
- Requirements gathering
- Design and implementation (planning, design, coding)
- Testing

Each is evaluated at four levels: Non-Passing, Entry, Mid, Senior.

---

## Requirements

How they gather and clarify requirements.

### Non-Passing
- Don't ask the interviewer a single question
- Make assumptions without verifying
- Don't talk about requirements at all
- Just start implementing
- Skip requirements entirely

### Entry
- Ask at least one requirement (even if mundane)
- Ask and move on
- Delegate some requirements to AI
- Minimal engagement with requirement gathering

### Mid
- Explicitly talk through requirements
- Notable section of the interview
- Read and consider AI's proposed requirements
- Ask AI for clarification or details they're unsure about
- Engage with the requirement-gathering process

### Senior
- Know the requirements ahead of time
- Prompt AI with requirements upfront
- Medium-length prompt with every entry being critical
- Precisely constrain AI response
- Phrasing demonstrates understanding
- Example: "Build a user authentication system with these requirements: [specific list]"

---

## Design and Implementation

How they plan, design, and code with AI. (Combines implementation plan, pseudo code, and code.)

### Non-Passing
- Generate a solution but don't pay attention to it
- Don't iterate
- Accept everything without reading
- Accept and run with it
- Show no engagement with the solution

### Entry
- Generate a solution with AI
- Read through the AI response
- Look at the code
- Ask AI one or two questions about alignment
- Validate that it roughly matches what they wanted

### Mid
- Request architectural review of the plan before implementation
- Review AI-generated code carefully
- Consider how they'd do it professionally vs. for the interview
- Might say: "In production, I'd use different agents, but for speed, I'll..."
- Make thoughtful trade-offs between quality and time

### Senior
- Really know what's going on
- Have a refined, efficient process
- Compare professional approaches vs. interview shortcuts
- May have predesigned agents ready to go
- Have MCPs, hooks, or other AI primitives already designed
- Ready to implement with sophisticated AI infrastructure
- Can articulate trade-offs confidently

---

## Testing

How they validate their solution.

### Non-Passing
- Forget to test
- Spend so long on other sections that they run out of time
- Fail to get to testing at all

### Entry
- Write some tests with AI's help
- Validate the solution
- Maybe run it
- Focus is on using AI, not writing tests themselves
- Basic coverage

### Mid
- Review the tests AI suggests
- Ask AI for additional tests
- Do some validation
- Think about edge cases
- More thoughtful about test coverage
- Discuss what types of tests matter

### Senior
- Talk through the testing strategy
- Demonstrate different test types (unit, integration, regression)
- Discuss edge cases and how to handle them
- Work with AI to ensure different conditions are met
- Show deep understanding of testing practices
- Can articulate why these tests matter

---

## Summary Table

| Level | Requirements | Solution | Testing |
|-------|---|---|---|
| **Non-Passing** | Skip entirely | Generate but ignore | Skip or run out of time |
| **Entry** | Ask 1-2 basic questions | Generate, read, ask 1-2 Q's | Write some tests, basic validation |
| **Mid** | Explicitly discuss | Review, request arch review | Suggest additional tests, validate |
| **Senior** | Know upfront, precise prompts | Predesigned agents, MCPs | Talk through strategy, all test types |
