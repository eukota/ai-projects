# Tycho contract drift (pre-built backend, interviewer-run)

A frontend-on-a-supplied-API question where the API **changes under the candidate** once they have something working. Raw minerals shipped between ports; the candidate builds a frontend for several audiences, then has to find out why it broke, then (if time allows) meet a new security requirement.

This is a self-contained entry. It does not share code with [01 freight exceptions](../01-freight-exceptions/), although they started from the same API.

## What it practices

- Scoping an open brief into one user and one journey (as in 01).
- Reading an unfamiliar API against real responses, including where the docs and the API disagree (as in 01).
- **Diagnosing a contract change.** Verifying data against what the user expects, comparing a live response with the docs, fixing it in one place, and saying how they would catch it next time.
- **Adapting to a new requirement.** A security story adds login, roles and notes to a UI that already works.

## How it differs from 01

| | 01 freight exceptions | 02 Tycho contract drift |
| --- | --- | --- |
| Run | Self-practice or interviewer | **Interviewer-run**: the break needs someone to trigger it |
| Brief centre | Exceptions triage | Shipment tracking for several audiences, exceptions secondary |
| Data | Ferengi freight (minerals optional) | Minerals only |
| API changes mid-session | No | Yes: four live break modes |
| Second requirement | Follow-up changes | Optional roles add-on (auth, notes) |

## Files

1. [Brief](./01-brief.md): what the candidate receives.
2. [Instructor notes](./02-instructor-notes.md): spoilers, the break modes, the roles add-on, the debrief. Don't share.
3. [Candidate instructions](./03-candidate-instructions.md): ground rules and how the session runs. Send with the brief.
4. `backend/`: the API server (Node, Express). Includes the hidden break and roles switches, off by default.
5. `tools/`: `start-server.sh`, `share-api.sh` (temporary public URL), `smoke_test.py`, `build_session_guide.py`.

**Give the candidate only** the brief, the candidate instructions and the API URL. Not `backend/` (it contains the break code) and not the instructor notes.

## Run it

```bash
tools/start-server.sh      # http://localhost:4000, docs at /docs
tools/share-api.sh         # a temporary public https URL for the candidate (needs cloudflared)
```

The full sequence, with commands and what to listen for, is in the [instructor notes](./02-instructor-notes.md). To check the setup without a candidate: `PORT=4010 tools/start-server.sh`, then `python3 -I tools/smoke_test.py http://localhost:4010`.

## Timing

About 60 minutes: roughly 5 to 10 for the brief and questions, 30 to 35 build, about 10 break, the rest debrief. The roles add-on only if the candidate is ahead.
