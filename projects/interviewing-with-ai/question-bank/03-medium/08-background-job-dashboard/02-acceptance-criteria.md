# Acceptance criteria

## Core flow

- Submitting a valid job returns quickly (suggested `202` with a `Location` header) and the job appears in the list as `queued`.
- The worker moves the job `queued -> running -> succeeded` without any browser action. The list updates by polling, with no manual refresh.
- A succeeded job exposes its result through the API and the UI.
- Requesting the result of an unfinished job is rejected with a clear error (suggested `409`), not an empty success.
- Jobs are listed newest first with status and timestamps.
- State survives a page refresh while the server runs. Reset restores the seed.

## Validation

- Invalid submit (student defines what is invalid, such as a missing report name) returns `400`; the UI shows the message without losing input.
- Unknown job ID returns `404`.

## State rules

The student states the allowed transitions. Only the worker advances a job. Illegal transitions (for example `succeeded -> running`) are refused in the store, not just hidden in the UI.

## Verification

- Request-level checks through real HTTP: submit, poll to done, fetch result, bad input, unknown ID, premature result request.
- Tests use a short or injectable job duration; they do not sleep for real seconds.
- One browser run of submit then watch the status change then open the result.
- Lifecycle events for a job are visible in the logs (`job.submitted`, `job.started`, `job.succeeded`) carrying the job ID.

## After the follow-up change

See [follow-up change](./04-follow-up-change.md). A job that fails then succeeds shows every attempt in its history; a job that always fails stops at the retry cap as `failed` with the last error visible; no failed attempt is erased.
