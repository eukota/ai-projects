# Acceptance criteria

## Core flow

- The page lists the provider’s fixed slots (suggested seed: 8 half-hour slots) in time order.
- Booking an open slot with a valid name marks it taken and shows who booked it.
- Booking a taken slot is rejected by the API with a clear error (suggested `409`), and the UI shows the message without losing the user’s input.
- Cancelling an appointment returns its slot to open.
- State survives a page refresh while the server runs. Reset restores the seed.

## Validation

- Empty or whitespace-only name rejected with `400`; limits stated by the student.
- Unknown slot ID returns `404`.
- Cancelling an unknown or already-cancelled appointment returns a clear error, not a crash.

## Cancellation rule

The student decides and states who may cancel (for example, anyone with the appointment ID). The choice must be consistent between API and UI.

## Verification

- Request-level checks for book, conflict, and cancel through real HTTP.
- One browser run of book then cancel.

## After the follow-up change

See [follow-up change](./04-follow-up-change.md). Two sessions attempting the last open slot result in exactly one booking and one clear rejection.
