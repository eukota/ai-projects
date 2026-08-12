# Working Notes

Thinking-out-loud on how Meldwerkes might work. Not commitments — some of this
will turn out to be wrong. Kept so the reasoning survives the conversation that
produced it.

---

## Bootstrapping a mind from existing chat history

**The question:** could a mind be trained retroactively from chat logs, using
the moments where the assistant asked a question and the user answered?

**Partially — but that is the weakest of three signals in the same data.**
Ranked by value:

1. **Corrections.** Strongest, because they are *contrastive*: the rejected
   output and the preferred one arrive together. A labeled pair with a
   direction, not an isolated point. Also carries valence — the user cared
   enough to interrupt.

2. **Unprompted directives.** "Always do X," "never Y," "I prefer A over B."
   Explicit principles requiring no inference.

3. **Answers to clarifying questions.** Real signal, heavily mixed with *task
   facts*. "Use Postgres here" is a project fact; "I prefer boring
   infrastructure" is a principle. Same surface shape, entirely different
   durability.

4. **Accepted outputs.** Weak. Absence of correction approximates acceptance,
   but noisily — the user may simply not have read it.

**The machinery already exists.** Claude Code stores transcripts as JSONL under
`~/.claude/projects/`, and the plugin's `UserPromptSubmit` hook already
classifies exactly these categories live. Bootstrapping is that same prompt run
in batch over historical transcripts — not new machinery, the existing
classifier run offline.

**The hard parts are not extraction:**

- **Fact versus principle.** The central difficulty. A durable disposition and
  a local project decision look identical in text.
- **Drift.** Old preferences may have been superseded. Timestamps matter, and
  confidence should decay with age rather than accumulate forever.
- **Selection bias.** Transcripts over-represent friction. A mind trained only
  on where things went wrong learns a distorted picture of its owner.

---

## Tuning the mind × domain matrix

**The question:** multi-mind resolution seems to need per-mind, per-domain
priorities. Does that require tuning, and what kind?

**Yes, and it is a known problem shape:** mixture-of-experts gating. Each mind
is an expert; the orchestrator needs to know which to trust for which kind of
decision. The weight is not a vector but a matrix over (mind × domain).

**The weights do not need hand-tuning, or training data up front.** Prediction
with expert advice — multiplicative weights, Littlestone and Warmuth — learns
them online from outcomes, with regret bounds guaranteeing convergence near the
best expert *without knowing in advance which one that is*.

**The supervision signal is already flowing.** The orchestrator applies mind
A's principle; the user corrects it; A's weight in that domain decreases. The
correction stands; it increases. Corrections therefore do double duty — they
create principles *and* tune the gate. No second feedback mechanism is
required, which is the elegant part.

**The caution from the same literature:** with few observations per (mind,
domain) cell this overfits quickly. Mitigations are standard — a low learning
rate, shrinkage toward a uniform prior, and escalation to the user when the top
two minds are within noise of each other. That last is a principled version of
the existing rule about escalating when principles cannot resolve a conflict:
the trigger becomes statistical rather than binary.

---

## Deterministic weights, agentic judgments

**The question:** will the mind × domain matrix be actual numbers over time, or
nondeterministic and agentic?

**The weights should be actual persisted floats, updated by a deterministic
rule.** Three reasons:

- **Auditability.** A matrix can be inspected and shown. "Your judgment is most
  consistent in backend work, least in design" is a claim a table can support
  and a model call cannot.
- **Stability.** A model asked "which mind should I trust here?" answers
  differently on different runs. A number does not.
- **Guarantees.** The regret bounds above apply only to an actual update rule.

**The agentic parts sit around it**, doing what arithmetic cannot: deciding
which domain a decision belongs to, judging whether a correction invalidates an
existing principle, extracting a principle from raw conversational text.

The separation is the point — semantics to the model, bookkeeping to
arithmetic. The failure mode is asking a language model to do the arithmetic:
expensive, unstable, and impossible to audit afterward.

This also makes the matrix a feature rather than an implementation detail. It
is the most direct artifact for the mirror direction — a picture of where its
owner's judgment is consistent, and where it is not.

---

## Settings and autonomy levels

**The question:** there should be a toggle for how much the model influences
decisions, and at what visibility.

Two axes that are genuinely independent, because they are needed at different
times:

**Capture** — is PAHF recording? `on` / `off`. Useful from day one.

**Apply** — is the model influencing decisions, and how visibly? Useless until
there is data, which argues for shipping it conservative.

| `apply_mode` | Behavior |
|---|---|
| `off` | Model not consulted |
| `advise` | Shows what it *would* have applied; does not act |
| `disclose` | Applies, and says what it applied |
| `silent` | Applies without narration |

Today's `principle_auto_answer` boolean conflates two things: whether to *act*
and whether to *say so*. It can express silent-apply and ask-first, but not
apply-and-disclose — which is the mode most useful while trust is still being
established.

Plus **scope**: which minds are consulted — one, several, all.

A persisted default in `settings.json` and a **session-scoped override** via
skill ("use the model this session, disclose mode, all minds") are both worth
having, for the same reason `--verbose` exists alongside a config file.

For v1: capture solid, `apply_mode` defaulting to `advise`. Scope and the
session override can follow while data accrues.
