# Use Cases

## Coding Agent with Architectural Principles

A coding agent that knows your architectural preferences and flags decisions that conflict with your SRE principles without being asked.

Your SRE brain says "minimize state, keep systems stateless." Your maker brain says "build fast, optimize later." The system surfaces the conflict when a coding decision hits both, rather than disappearing into sycophancy.

## Design Review Partner

A design review partner that surfaces genuine dissent rather than converging on what you want to hear.

Multiple brains evaluate a proposal from different angles—cost, technical risk, user impact, learning opportunity, schedule pressure. Each argues its position independently. Conflicts between them are the review, not obstacles to suppress.

## Project Scoping Assistant

An assistant that catches time-commitment implications from your parent-brain before you commit to work your SRE-brain will regret.

You say "yes" to a side project. The system surfaces: "Your parent brain has flagged this conflicts with 'be home for dinner.' Last time this conflict appeared, you chose family. Should I block this or escalate?"

## Autonomous Overnight Claude Code Runs

Overnight Claude Code runs that escalate only genuine conflicts, not every uncertain decision.

Without Small Brain, an autonomous agent must either ask about everything (waking you up) or decide everything (missing your principles). With Small Brain, it operates at your level of specificity and only escalates when multiple genuine principles conflict.

## Long-Term Preference Drift Detection

Noticing when your principles have shifted and surfacing the change.

The compression loop detects: "Your decisions used to favor 'move fast' over 'minimize technical debt.' That reversed 6 weeks ago. Should I update the weighting?"

## Personal Knowledge System

A system that understands your decision-making well enough to:
- Recommend which experts to talk to (routes through the brain domain that matches the question)
- Flag when you're about to violate a principle you care about
- Surface patterns in your reasoning you haven't noticed
- Propose new principles from detected conflicts

## Team Decision Coordination

A system where multiple people can each have a Small Brain, and their brains can be composed to coordinate decisions at the group level.

Each team member's brain operates independently. When decisions affect multiple people, their brains' positions are surfaced and reconciled. The team learns not just what was decided, but what principles competed and how they were weighted.

## Minimum Viable First Milestone

A realistic first version may include:

- Single small brain (one domain)
- PAHF interrogation loop (clarify → ground → correct)
- Simple memory store (decisions, corrections)
- Manual compression loop (human-triggered, human-guided)
- User can force-resolve conflicts and teach the system from resolution
