# Follow-up change

Introduce after the core flow works end to end.

## The change

> Sometimes a report job fails. Make failures visible, retry them automatically a limited number of times, and keep a record of everything that happened to each job.

## Why it exposes an assumption

A build that stores one `status` and one `result` on the job tends to overwrite state on each run. After a retry the first failure is gone, the attempt count is wrong, and a job that fails permanently either retries forever or loses its error. The core flow never needed to ask whether a job could run twice.

## What to demonstrate

1. **Reproduce or reason:** make the simulated worker fail on demand (for example a flag on the job, or a failure rate that tests can control). Show what the UI and the stored job look like after one failure and one retry.
2. **Diagnose:** find where the job record is overwritten and where retry is decided. Say which assumption failed: one run per job.
3. **Fix:** record each attempt (start, end, outcome, error) separately from the job's current status; cap retries and back off between them; make the `failed` state terminal when the cap is reached; keep the last error visible.
4. **Verify:** request-level tests for fail-then-succeed (two attempts in history, final `succeeded`) and always-fail (stops at the cap as `failed`). Read the log: `job.retry_scheduled` lines appear with the job ID and attempt number.

## Stretch variations

- Distinguish transient from permanent errors and do not retry the latter.
- Add a manual "retry" button on failed jobs and decide how it interacts with the cap and history.
- Make jobs idempotent so a duplicate delivery cannot produce two results.
- Survive a server restart: what happens to a job that was `running` when the process stopped?
