# Follow-up change

Introduce after the core flow works end to end.

## The change

> Two people have the booking page open. Both click the last open slot at nearly the same time. What happens, and how do you make sure it is correct?

## Why it exposes an assumption

A build that reads slot state, checks it, then writes it as separate steps, or that trusts the page the user loaded, can double-book. In a single-process in-memory server with synchronous code the race may not reproduce by luck; the exercise is making the guarantee explicit rather than depending on it.

## What to demonstrate

1. **Reproduce or reason:** show two sessions attempting the same slot, or walk through the code path where a stale page leads to a second booking.
2. **Diagnose:** locate the check and the write; say which assumption fails.
3. **Fix:** make the check and mark-taken a single atomic store operation. The loser receives the same conflict error as any taken slot.
4. **Verify:** a request-level test that fires two bookings for one slot and asserts one success and one conflict, plus the stale-page case in the browser.

## Stretch variations

- Cancel and rebook the same slot from two sessions.
- A user booking two slots in a row: add a one-appointment-per-name rule and explain how it interacts with cancellation.
- Show the UI recovering after a conflict by refreshing slot state.
