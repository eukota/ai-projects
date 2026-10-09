# Acceptance criteria

Observable behavior. Students may resolve the ambiguities differently as long as they state and apply their choice consistently.

## Core

- Joining with a name and question adds an entry to the end of the queue.
- Each waiting entry shows its position, starting at 1.
- The instructor can mark the front entry helped; it leaves the waiting list and every other position moves up by one.
- The queue and positions survive a page refresh while the server runs.
- Reset restores the seed state.

## Validation

- Empty or whitespace-only name or question is rejected by the API with a `400` and a stable error shape, and the UI shows the message.
- Overlong input is rejected (suggested limits: name 1–50, question 1–200 characters).

## Ordering and duplicates (the judgment items)

- Order is first-come, first-served by server-assigned order, not by client timestamps.
- Double-clicking the join button does not create two entries.
- A student who is already waiting cannot join a second time under the same identity. The identity rule (for example, normalized name) is stated by the student.
- Marking an already-helped or missing entry returns `404` or a clear error, not a crash.

## Verification

- At least one request-level check of join, list, and mark-helped through real HTTP.
- The student can show the duplicate case failing before the fix or passing after it.
