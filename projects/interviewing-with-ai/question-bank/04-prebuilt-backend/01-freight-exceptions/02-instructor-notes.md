# Instructor notes (spoilers)

Don't read before practicing.

## Deliberate gaps between the docs and the API

The spec is accurate except for these, which a candidate finds only by calling the API or reading responses:

1. **`eta` is `null` for shipments at customs.** The spec types it as a non-null date-time. A UI that formats it blindly shows "Invalid Date" or crashes.
2. **Marking `delivered` returns 409 `open_exception`** while any exception on the shipment is unresolved. The spec only says 409 for invalid status transitions.
3. **Status transitions are restricted** (`booked → in_transit → …`). The spec mentions this but not the allowed paths, so a status dropdown that offers every status will produce 409s.
4. **`/api/exceptions` defaults to `state=open`.** The resolved list needs `state=resolved` or `state=all`.
5. **`pageSize` is capped at 50**, and silently clamps rather than erroring.

## What to listen for

- **Clarifying questions:** who is the first user (dispatcher vs. manager vs. customer)? What does "keeping up" mean? What is the demo audience and deadline?
- **Scoping:** does the candidate choose one user and one journey, or build a bit of everything?
- **Reading the API:** do they call the endpoints and inspect real responses, or trust the generated client or the docs?
- **Directing the AI:** do they give it the brief and the real response shapes, or let it invent a data model?
- **Verification:** do they trigger the 409s and the null `eta`, check empty and error states, and use reset between runs?

## Reasonable first journeys

- **Dispatcher triage:** open exceptions sorted by severity and customer tier, open a shipment, resolve the exception, assign an owner.
- **Manager overview:** counts of open vs. resolved exceptions, unassigned shipments, priority customers affected.
- **Customer lookup:** search by shipment id, see status, ETA and any open problem.

Note the API has no "exceptions per day" endpoint. A manager view has to derive trends from `state=all`, which is a good scoping conversation.

## Follow-up changes

- A priority customer's shipment must show first everywhere.
- Two dispatchers resolve the same exception: handle the 409 `already_resolved` gracefully.
- Make the dashboard refresh itself without losing the user's place.
