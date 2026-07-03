# Implementation

Writing the code with AI.

## The Approach

- **Trigger the plan:** Tell AI to execute the plan you've agreed on
- **Constrain for speed:** Give AI specific interview-time constraints:
  - Ask for an MVP (Minimum Viable Product) — clear signal to focus on core functionality
  - Time window (tell it you have less time than you actually do; AI doesn't understand time well)
  - Use in-memory databases (not persisted storage)
  - Skip quality-of-life features (user docs, polish, UI niceties)
  - **Explicitly call out** what you're skipping (shows intentionality, not negligence)
- **Let AI generate fast:** Unlike Requirements & Design (where you iterate), you don't have time to read proposals and iterate here. Let AI produce the full code quickly.
- **Get code into a file:** Output the code to an actual file/interface (not just chat), so you can review and edit it properly
  - This lets you see the actual code structure, not chat snippets
  - You can make targeted edits to the actual file, not get lost in chat discussion
- **Review the code:** Read through the output; skim for missing pieces or gaps
- **Don't blindly accept:** Find something to ask AI to add, remove, or change
  - Shows critical thinking and active direction
  - Interviewers look for this—blindly accepting AI output is a red flag

## Interview Signaling

- **Quick recap:** summarize the requirements and plan you've landed on
- **Pivot to implementation:** "Now let me actually get to the code and see what it looks like"
- **Signal:** this is where you demonstrate you know how to code and think critically about what the AI wrote
- **Show engagement:** read the code, evaluate it, spot issues or improvements

## Advanced Strategies

### Split implementation along component boundaries

Spin up separate agents to work on different parts in parallel (e.g., one writes API, another writes UI)

- **Demonstrates:** strategic use of parallelism, ability to manage multiple streams
- **Risk:** forgetting to integrate, or UI doesn't match API expectations
- **Requires:** tracking both threads, clean integration, components working together

### Tell AI to make its own decisions

Give AI autonomy to implement a component (like a UI) without asking for approval on every decision

- **Demonstrates:** trust in AI, acceleration, confidence in capabilities
- **Use case:** when you say "we won't have time for UI" but then decide to try anyway—spin it up with autonomy
- **Risk:** AI makes choices you don't like; you have to rework it
- **Requires:** knowing when to let go, being able to adapt quickly

