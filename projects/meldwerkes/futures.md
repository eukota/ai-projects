# Futures

Where Meldwerkes could go, and the level of abstraction it operates at. Not a
roadmap — several directions below are mutually exclusive in practice.

## Mind, not brain

The terminology is deliberate. *Brain* emulation belongs to a different
tradition — neurons, connectomes, substrate-level simulation, bottom-up. Its
fidelity question is whether you have modeled the hardware.

Language models do not operate at that level and will not by this route. They
work over tokens and meaning, which is the functional level: dispositions,
judgment, what someone would decide and why. That is a *mind*, and it is
substrate-independent by construction.

The distinction decides what can be evaluated. Brain-level fidelity is
inaccessible here — there is no instrument for it. Mind-level fidelity is
behaviorally testable: does it decide the way its owner decides, and can it say
why. Every research question this project has is answerable only at that level.

It also clarifies what this is *not*. A log of events is neither brain nor mind
— it sits below both, recording activity rather than disposition. Recall layers
do not become minds by accumulating more.

Inside the system, a *brain* remains the concrete thing on disk: one store of
decisions, corrections, and principles. The modest noun fits the artifact; the
ambitious one describes the level being modeled.

## Directions

**A sharper assistant.** The nearest. Principles ground the agent's choices so
it stops re-litigating settled preferences. Needs nothing new — it is what the
PAHF loop already does, with more accumulated signal.

**A mirror.** The conflict clustering may be more useful to the *person* than
to the agent. A system that can say "your stated preference here contradicts
what you decided there" does something no notebook does. Would need conflicts
surfaced deliberately rather than only consumed internally to split brains.

**A portable identity layer.** Export/import already means the model is not
bound to Claude Code. Pointed at another agent or tool, the same principles
should still apply. Needs the export format treated as a stable contract rather
than an implementation detail.

**A model that can act.** The far end: accurate enough to make routine calls on
its owner's behalf, with provenance good enough to audit afterward. Needs
everything above, plus a much higher bar on traceability and calibration — both
cheap to defer and expensive to retrofit.

**A team mind.** Multi-brain orchestration was built for one person's
inconsistency across domains, but the same machinery could model where a *team*
agrees and where it does not. A different product from the same foundation.

## What a mind has that this does not, yet

Naming the level honestly also names the gaps. Each is a plausible growth
direction rather than an embarrassment:

**Perception.** Input arrives only as conversation — what the owner said and
corrected. A mind takes in the world directly. The nearer version here is
reading the artifacts themselves (the code, the document, the diff) rather than
only the discussion about them, forming principles from what it observed rather
than what it was told.

**Episodic memory.** Decisions and corrections are stored with timestamps and
context, but they function as *evidence* — fuel for deriving principles — not
as experience that can be recalled. "The time we tried this and it broke" is
not something the system can currently say. Retrieval as narrative is a
different capability from the one already built.

**Affect.** Every principle carries confidence but no valence. Nothing
distinguishes a preference held mildly from one felt strongly, or records what
frustrates and energizes. Judgment without weight is flatter than the thing it
models.

**A self-model.** Per-principle confidence exists; a model of the model does
not. The system cannot say where its coverage is thin, which domains it has
never seen its owner decide in, or how its picture of them has shifted over
time. This one gates the others — knowing what it does not know is the
precondition for letting it act.

## Constraints worth holding regardless of direction

- Input stays **corrections**, not events.
- Principles stay **derived**, not stored.
- The model stays **exportable** — it should belong to the person it models,
  not to whoever hosts it.
