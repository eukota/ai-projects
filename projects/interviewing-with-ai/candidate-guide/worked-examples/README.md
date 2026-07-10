# Worked Examples

Walkthroughs showing the AI Solution Strategy in action. Each example demonstrates the same shape — **you surface options, you decide, the AI executes, and you verify** — by contrasting poor prompts with excellent ones across all phases.

## Contents

- `01-url-shortener.md` — **Poor vs. excellent prompts** across Requirements & Design, Implementation, and Testing. A small, re-runnable problem; the flagship walkthrough. *(Complete)*
- `02-online-chat.md` — Entry-level problem: build an online chat program. *(Coming soon)*
- `03-cicd-system.md` — Senior-level problem: design a CI/CD system for executing builds. *(Coming soon)*

Each file begins with the **problem statement** and the **source** it was retrieved from, followed by the walkthrough.

## More Practice Problems

Additional problems to drill the strategy on before they become full worked examples. The best AI-assisted interview problems are broad, ambiguous, and multi-stage — they can't be solved with a single prompt, which is exactly what forces you to direct, decide, and verify.

**Build-a-system** (scope it down through clarifying questions):

- **Air-traffic control** — "Build a control system for managing aircraft takeoffs and landings at a busy airport." Canva's real replacement for Conway's Game of Life. ([Canva Engineering](https://www.canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews/))
- **Rate limiter** — token bucket vs. sliding window is a rich design fork; per-user vs. global; single-node vs. distributed. ([Hello Interview](https://www.hellointerview.com/blog/meta-ai-enabled-coding))
- **Parking lot / elevator dispatch** — classic object-oriented design, now AI-assisted. ([Hello Interview](https://www.hellointerview.com/blog/meta-ai-enabled-coding))
- **In-memory key-value store with TTL**, **job scheduler**, or **notification/feed service** — all bounded and re-runnable with added constraints.
- **Agentic round** — design an autonomous agent workflow: tool boundaries, agent loops, timeouts, and state/context management. ([interviewing.io](https://interviewing.io/blog/how-to-use-ai-in-meta-s-ai-assisted-coding-interview-with-real-prompts-and-examples))

**Debug-and-extend** (drop into a multi-file codebase, fix a bug, then add a feature and make it scale):

- **Broken LRU cache**, **flawed binary search**, **buggy rate limiter**, or **broken REST handler** — debug-first problems. ([Coditioning](https://www.coditioning.com/blog/13/meta-ai-enabled-coding-interview-guide))
- **Card Game** and **Fix the Maze** — Meta practice problems. ([Coditioning](https://www.coditioning.com/blog/13/meta-ai-enabled-coding-interview-guide))

**How these are scored** — regardless of problem, interviewers watch the same axes: problem decomposition, *control* over the AI (are you directing it or is it directing you?), verification/testing habits, and keeping the interviewer in the loop. ([Hello Interview](https://www.hellointerview.com/blog/meta-ai-enabled-coding), [Canva Engineering](https://www.canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews/))

---

For the interviewer perspective, see `../../interviewer-rubric/`.
