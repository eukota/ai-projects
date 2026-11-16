# Instructor notes (spoilers)

Keep this file out of any screen share. The candidate receives only the brief, the candidate instructions and the API URL.

## Session shape (about 60 minutes)

1. **Hand-off and build (0:00 to about 0:40).** The candidate reads the brief, scopes one user and one journey, reads the real API, builds.
2. **Break (about 0:40, once their UI works).** You change the API contract live. The candidate diagnoses and fixes it.
3. **Roles add-on (stretch, only if the candidate gets this far).** You add a security requirement. They add login and role-based views.
4. **Debrief (last 10 minutes).**

If the candidate is slow, drop phase 3. If they are fast, run a second break before it.

## Setup

```bash
tools/start-server.sh      # API on http://localhost:4000, minerals data, frees the port first
tools/share-api.sh         # in a second terminal: prints a temporary https URL, Ctrl-C kills it
python3 -I tools/build_session_guide.py <tunnel url>    # optional: interviewer page with commands and the candidate's materials
```

- `share-api.sh` needs `cloudflared` (`brew install cloudflared`). Anyone with the URL can read and write the data, so stop the tunnel afterwards.
- Logs: `backend/logs/server-latest.log` (one JSON line per request, plus `break_mode_changed`, `addon_changed`, `login`), `backend/logs/tunnel-latest.log`.
- Restarting the server clears any break and the roles add-on. `POST /api/admin/reset` restores the data but clears neither.
- Verify the setup without a candidate: `PORT=4010 tools/start-server.sh`, then `python3 -I tools/smoke_test.py http://localhost:4010`. It checks every trap, break and role rule, and leaves everything off. Never run it against a server a candidate is using.

## Phase 1: traps in the API itself

The spec is accurate except for these, which the candidate finds only by calling the API or reading real responses:

1. **`eta` is `null` for shipments at customs.** The spec types it as a non-null date-time. A UI that formats it blindly shows "Invalid Date" or crashes.
2. **Marking `delivered` returns 409 `open_exception`** while any exception on the shipment is unresolved. The spec only mentions 409 for invalid status transitions.
3. **Status transitions are restricted** (`booked -> in_transit -> ...`). The allowed paths are not in the spec.
4. **`/api/exceptions` defaults to `state=open`.** Resolved ones need `state=resolved` or `state=all`.
5. **`pageSize` silently caps at 50.**

Listen for:
- **Clarifying questions:** who is the first user (customer, dispatcher, manager)? What does "keeping up" mean? Who is the demo audience?
- **Scoping:** one user and one journey, and what they leave out.
- **Reading the API:** calling endpoints and inspecting real responses, not trusting the docs.
- **Directing the AI:** giving it the brief and real response shapes, not letting it invent a data model.
- **Verification:** empty states, error states, the null `eta`, the 409s.

In-character answers if the candidate asks: the first demo audience is the dispatchers; "keeping up" means exceptions opened versus cleared; priority customers are the ones with tier `priority`; no hard deadline beyond today.

## Phase 2: the break

Do not announce it. Flip a mode, then say: "Refresh and walk me through it. Do the numbers look right?"

```bash
U=<tunnel url>
curl -X POST "$U/api/admin/break?mode=rename"        # assignedTo becomes owner
curl -X POST "$U/api/admin/break?mode=envelope"      # data/total become items/count
curl -X POST "$U/api/admin/break?mode=nullstring"    # every null becomes the string "null"
curl -X POST "$U/api/admin/break?mode=flaky"         # every 3rd call returns 503 + Retry-After
curl -X POST "$U/api/admin/break?mode=off"
curl "$U/api/admin/break"                            # current state
```

| Mode | What changes | Shows up as | Fix |
| --- | --- | --- | --- |
| `rename` | `assignedTo` becomes `owner` in responses (requests still send `assignedTo`) | Silent. Every shipment looks unassigned: the Unassigned count jumps to the total, dispatcher shows blank | Map the new name in one place |
| `envelope` | list envelope `{ data, total }` becomes `{ items, count }` | Loud. Lists go empty or the page errors | Adapt the response parsing once |
| `nullstring` | every `null` becomes the **string** `"null"` (`assignedTo`, `eta`, `resolvedAt`, `resolution`) | A truthy-string bug: Unassigned drops to 0, a dispatcher named "null", "Invalid Date" ETAs, open exceptions look resolved | Normalize `"null"` back to `null` at the API boundary, and say the real fix is the backend's |
| `flaky` | every 3rd `/api` call returns 503 with `Retry-After: 1` | Random failures | Error states and a retry. Tests resilience more than diagnosis |

Choosing one:
- **Start with `nullstring` or `rename`** for a diagnosis test. `nullstring` is the closest to a classic "boolean became a string" bug and needs no special knowledge.
- **`envelope`** is the gentlest: the evidence is plain in the raw JSON. Use it for a candidate who is struggling.
- Only one mode is active at a time.
- Do not use an encoding trick such as epoch timestamps. It tests trivia, not debugging. We tried it and removed it.

Clues the candidate can find: every response carries `X-Api-Version`, `1` normally and `2` while broken. The Swagger docs still describe the old contract on purpose, so a real response disagrees with them.

Good: compares a live response with their types and the docs, finds the actual cause, fixes it in one place, says how they know it is fixed and what would catch it next time.
Weak: asks the AI to "fix the empty list" or "fix the dates" without looking at a response.

If the break is not visible on the candidate's current screen, say where to look (for example, "check the overview numbers"). The page they are on may only show fields the break does not change, such as a shipment at customs with a null ETA.

## Phase 3: roles add-on (stretch)

Story: "We have been told this has to be secure. People should only see what is theirs, and there are admins who run it."

```bash
curl -X POST "$U/api/admin/addon?name=roles&state=on"     # state=off to undo
```

The candidate's open UI gets 401s. Every `/api` call except `/api/health` now needs `Authorization: Bearer <token>`. New endpoints: `POST /api/auth/login {email}` (no password) and `GET/POST /api/shipments/{id}/notes`. The Swagger docs update live and list the sample logins.

| Role | Email | Sees |
| --- | --- | --- |
| admin | scott@tycho.example, uhura@tycho.example | all 28 shipments, can change anything |
| shipper | ops@pilbara-ridge.example, dispatch@rbm-coop.example | shipments they ship (about 10) |
| receiver | engineering@starfleet-engineers.example, labs@daystrom.example, geology@academy.example | shipments addressed to them (about 6) |

Rules: shippers and receivers read their own shipments and add shared notes. Only admins change status or assignee, open or resolve exceptions, and write internal notes. Internal notes never appear for non-admins. List endpoints are filtered silently, so totals differ per role.

**Planted gap:** the spec says a shipment that is not yours returns **403**. The server returns **404**.

Listen for: where the token lives, handling 401 and logout, hiding admin actions in the UI while treating the server as the real gate, a way to test each role, and whether they notice the totals differ per role.

## Debrief questions

- What did you decide not to build, and why?
- Where did the AI help, and where did you override it?
- How did you know the break was fixed? What would catch it next time (contract tests, a typed client, schema validation)?
- What did you validate before calling it done? What would you do with more time?

## Follow-up changes (if there is time)

- A priority customer's shipments must show first everywhere.
- The dashboard refreshes itself without losing the user's place.
- Two dispatchers resolve the same exception: handle the 409 `already_resolved` gracefully.
