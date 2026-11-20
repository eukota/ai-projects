# Instructor checkpoints

| Block | Look for | Intervene if |
| --- | --- | --- |
| Clarify and plan (10 min) | Questions about what a report is, expected duration, who submits, whether history matters, what "done" means | Student skips to code. Ask them to name two assumptions and the statuses they will use. |
| Build (30 min) | A status field with an explicit set of states; the API returns before the work finishes; the worker, not the request handler, advances state | The submit request waits for the job, or the UI fakes progress with a timer instead of reading status from the API. |
| Test and revise (15 min) | Follow-up change introduced only after the core flow works end to end | The change is introduced early. |
| Tradeoffs (5 min) | Student names what they assumed (single process, in-memory, polling) and what they would change for real (durable queue, multiple workers) | Discussion stays on code style. |

## Questions to ask during the build

- Where does job state live, and who is allowed to change it?
- What does a user see if they reload while the job is running?
- What happens to a job if the server restarts mid-run?
- How would you know from the logs that this job ran? Can you find it by ID?

## Keep observable

Have the student tail a structured log file, or build a small pane showing counts per state and recent lifecycle events, from the start. It makes the follow-up change visible without extra setup, and it is the natural place to show iterating on tests while watching the system run.

## Debrief

Ask the student to explain the follow-up behavior in terms of the code and the log lines, not only the UI. Then ask how they would prove retries do not erase history.
