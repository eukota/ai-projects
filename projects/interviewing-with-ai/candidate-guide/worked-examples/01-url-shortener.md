# Worked Example 01 — URL Shortener

## Problem Statement

Build a link shortener like bit.ly.

## Source

Classic system-design / coding-interview problem, widely used across interview-prep material. Adapted here as a deliberately small, re-runnable drill — no single canonical origin.

---

A deliberately small problem — everyone understands it in one sentence, so the focus stays on *how you prompt*, not on decoding the domain. It has real requirements ambiguity, genuine design choices, a bounded (~100-line) implementation, and obvious tests. Run it many times, changing one constraint each pass (add expiry, add analytics, make it distributed) to keep the drill fresh.

For each phase below, compare the ❌ **poor prompt** (the "outsource it" trap) with the ✅ **excellent prompt** (you directing the AI), and note the 🗣️ narration an interviewer wants to hear. Each maps to a Universal Principle from the [candidate guide README](../README.md).

## Phase 1 — Requirements & Design

> ❌ **Poor prompt**
>
> > "Write me a URL shortener."
>
> *Why it fails:* One-shot outsourcing. You've surrendered every decision — scope, storage, ID scheme — to the AI. This violates **Active Direction** and **Narrative Control**: the AI is now driving, and it will happily produce a generic answer to a problem you never actually scoped.
>
> ✅ **Excellent prompt**
>
> > "We're designing a URL shortener. Before any code, list the open requirements questions that most change the design — things like custom aliases, link expiration, click analytics, auth, and expected scale. Group them by how much they affect the architecture."
>
> *Why it works:* You use the AI to **surface** the decision space, then you make the calls. Asking it to rank by architectural impact is **Narrative Control** — you're steering toward a version that's completable in the time you have.
>
> 🗣️ *Say out loud:* "I'm going to scope this to a single-instance, in-memory service with optional expiry, and explicitly defer analytics and auth. That keeps it solvable in our time box — I'll note the deferred items as future work."

---

> ❌ **Poor prompt (design)**
>
> > "What's the best way to generate the short codes?"
>
> *Why it fails:* "Best" invites an unexamined verdict you'll accept at face value. Violates **Critical Reading**.
>
> ✅ **Excellent prompt (design)**
>
> > "Compare three short-code strategies — random string, hash of the URL, and a base62-encoded counter — on collision risk, guessability, and whether identical URLs collapse to one code. I'm leaning toward base62 counter; tell me where that choice hurts."
>
> *Why it works:* You ask for a **comparison against criteria you named**, state your leaning, and invite the AI to attack it. That's **Collaboration** plus **Critical Reading** — you're pressure-testing a decision, not shopping for one.
>
> 🗣️ *Say out loud:* "Base62 counter gives me short, collision-free codes with trivial logic. The tradeoff is guessability and that it leaks volume — acceptable for this exercise, and I'd revisit it if links were sensitive."

## Phase 2 — Implementation

> ❌ **Poor prompt**
>
> > "Now write all the code."
>
> *Why it fails:* You get several hundred lines you didn't shape and can't defend. When the interviewer asks "why this?", you're reading your own solution for the first time. Violates **Active Direction** and **Collaboration**.
>
> ✅ **Excellent prompt**
>
> > "Let's build it in slices. Start with just the two core functions: `shorten(url)` returning a code, and `resolve(code)` returning the URL or a not-found signal. Use an in-memory dict and the base62 counter we agreed on. No web layer yet — I want to eyeball the core logic first."
>
> *Why it works:* You **decompose and sequence** the work, delegating a well-bounded slice while keeping the design decisions yours. You can actually read and reason about ~20 lines before moving on. This is **Active Direction** in practice.
>
> 🗣️ *Say out loud:* "I'm reviewing the counter increment for a race condition — single-threaded for now, so fine, but I'm flagging it as the first thing that breaks under concurrency."

---

> ❌ **Poor prompt (extending)**
>
> > "Add expiration too."
>
> *Why it fails:* Vague bolt-on. You haven't said what expiry *means* here, so the AI guesses.
>
> ✅ **Excellent prompt (extending)**
>
> > "Add optional expiry: `shorten(url, ttl_seconds=None)`. On `resolve`, treat an expired code as not-found and don't auto-delete — lazy expiry is fine. Keep the not-found path identical to a missing code so we don't leak whether a code ever existed."
>
> *Why it works:* You specify the **behavior, the interface, and a security nuance** the AI wouldn't infer. You're using it as a fast implementer of *your* decisions.

## Phase 3 — Testing

> ❌ **Poor prompt**
>
> > "Write some tests."
>
> *Why it fails:* You get happy-path tests that prove nothing interesting, and you've signaled you don't know what's risky. Violates **Critical Reading** and **Articulation**.
>
> ✅ **Excellent prompt**
>
> > "List the edge cases worth testing for this service, ranked by likelihood of being where a bug hides — think collisions, resolving an unknown code, an expired code, an empty or malformed URL, and idempotency of shortening the same URL twice. Then write tests for the top four. I'll tell you which to skip."
>
> *Why it works:* You make the AI **enumerate risk first**, then you prioritize — you're deciding what "done" means, not delegating the definition of quality. Ranking + your override is **Narrative Control** and **Critical Reading** together.
>
> 🗣️ *Say out loud:* "The expired-code test is the one I most expect to fail — it exercises the lazy-expiry path we just added. If the not-found responses for 'expired' and 'never existed' differ, that's a leak and a bug."

## What the interviewer takes away

Across all three phases, the excellent prompts show the same shape: **you surface options, you decide, the AI executes, and you verify.** That's the entire strategy in miniature — and it's exactly what the [interviewer rubric](../../interviewer-rubric/) scores.
