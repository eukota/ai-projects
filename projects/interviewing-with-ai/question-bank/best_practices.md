# Quick web UI prototypes with an API and in-memory storage

Build the smallest complete user journey that answers a product question. Use a real HTTP API, keep its data in server memory, and make every demo easy to reset. These recommendations assume a local or controlled demo with disposable data and one API process.

## Choose a small architecture

Use the language and framework you already know. Prefer an existing project’s conventions over introducing another stack. A basic setup needs only:

- A browser UI with a list, a form, and the interactions needed for the demo.
- HTTP routes that parse requests, validate input, and return JSON.
- A small store module holding a map or dictionary keyed by ID.
- A seed function that returns fresh sample records.

The flow is `UI → API → store`. Keep browser state for form input, selection, and loading indicators; treat API responses as the source of truth for records. Browser `localStorage` persists separately per browser and is not this shared server store. Do not maintain an independent fake database in the browser once the API is working.

Serve the UI and API from one origin when convenient. If separate development servers are necessary, proxy `/api` to the backend so browser requests still use relative URLs. Add libraries only when they remove immediate work. Skip queues, caches, microservices, containers, authentication providers, and generic repository frameworks unless the prototype specifically needs them.

## Build one complete path first

1. Write one sentence describing what the demo should prove, such as “A user can add a task and mark it complete.”
2. Define the record shape and the few requests that support that journey.
3. Implement the seeded store and one list endpoint; verify its JSON directly.
4. Render that endpoint in the UI before polishing the layout.
5. Add create and update operations from browser through storage.
6. Handle loading, empty, invalid-input, and failure states.
7. Add a repeatable reset and a short demo script.

Time-box styling and secondary features. A coherent page with readable spacing, clear labels, and working behavior is enough to test the idea. Record deferred features separately so they do not quietly expand the prototype.

## Keep the API contract explicit

For a task demo, a stored record might be:

```json
{ "id": "task-1", "title": "Try the prototype", "completed": false }
```

Use a deliberately small contract:

| Request | Input | Success |
| --- | --- | --- |
| `GET /api/tasks` | None | `200`, array of records in documented order |
| `POST /api/tasks` | `{ "title": "Review design" }` | `201`, created record |
| `PATCH /api/tasks/:id` | `{ "completed": true }` | `200`, updated record |
| `DELETE /api/tasks/:id` | None | `204`, no body |

Only implement operations that the UI uses. Generate IDs on the server with a UUID or a collision-safe counter; do not use array length as an ID. Trim titles, require 1–120 characters, accept only supported fields, and reject incorrect types. Client validation improves feedback, but the API must enforce the same rules.

Choose predictable failures: `400` for malformed or invalid input, `404` for a missing record, and `500` for an unexpected server error. Keep the error shape stable:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Enter a title between 1 and 120 characters.",
    "field": "title"
  }
}
```

Log unexpected errors server-side; return a useful message without exposing stack traces. A small shared request helper should check `response.ok`, handle empty `204` responses, and tolerate non-JSON failures. `fetch()` does not reject merely because an HTTP response is `404` or `500`. See [MDN’s Fetch guidance](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

## Make memory behavior intentional

Create the store once per API process, not once per request. Keep access behind a few functions such as `listTasks`, `createTask`, `updateTask`, and `resetTasks`. Return copies where callers could otherwise mutate stored objects accidentally.

Run exactly one API worker and one instance. Separate processes normally have separate memory; adding workers or replicas can make successive requests see different records. Serverless invocations are also unsuitable as a dependable shared memory store. [FastAPI’s deployment concepts](https://fastapi.tiangolo.com/deployment/concepts/) explain the process-memory boundary; the principle applies beyond that framework.

State disappears when the API restarts, crashes, redeploys, or reloads code. A browser refresh should reload data from the running API without resetting it. All clients reaching that process share the same records unless you deliberately add isolation. Make these behaviors clear in the demo notes and, when helpful, with a small “Demo data resets on server restart” notice.

Keep updates short. A single process does not eliminate races: an asynchronous operation between reading and writing can allow another request to intervene. Avoid such gaps in simple store operations; use a lock if the chosen server accesses the store from multiple threads. Limit record count and request size to reasonable demo bounds rather than allowing unbounded growth.

## Seed and reset predictably

Use a seed factory that produces new objects with stable IDs and ordering. Include a few realistic records, such as both completed and incomplete tasks. Avoid random content or current timestamps unless those behaviors are being tested.

Reset should replace the whole store and reset any ID counter consistently. For a local prototype, a restart may be sufficient. If a reset endpoint or button improves repeated demos, enable it only in explicit development/demo mode. Resetting affects every client sharing the process; do not trigger it implicitly on page load. After reset, reload UI data and clear stale selections.

Provide an empty seed option and a simple development mechanism for simulated delay or failure. These make UI states reviewable without relying on unreliable network conditions.

## Make the UI resilient enough to demonstrate

Show initial loading, an empty-state action, and an error with a retry option. Preserve form input when saving fails. Disable the submit button while its request is pending to prevent accidental duplicates. For speed and clarity, wait for server confirmation before updating the list; add optimistic behavior only when evaluating it matters.

After a successful mutation, replace the relevant record with the server response or refetch the small list. Keep one consistent strategy. If searches or filters issue overlapping requests, cancel obsolete requests or ignore stale responses. Browser cancellation support is described in [MDN’s AbortController documentation](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

Use native buttons and inputs, visible labels, keyboard navigation, and a readable focus indicator. Keep errors near the relevant field and avoid conveying status through color alone. Check one narrow screen size before the demo.

## Verify and hand off with minimal ceremony

Use a short, meaningful smoke check:

- Start from seed; list, create, update, and delete through the UI where supported.
- Send invalid input and a missing ID directly to the API; confirm expected errors and unchanged data.
- Refresh the browser; confirm successful changes remain while the API runs.
- Restart or reset; confirm the original seed returns without duplicates.
- Exercise empty, slow, and failed requests; confirm recovery and preserved input.

Automate only checks that protect meaningful behavior, such as validation and the create/read/update flow. Give each test a fresh store. Avoid spending the prototype budget on tests that merely duplicate trivial implementation details.

Document exact install/start commands, runtime prerequisites, local URL, reset method, and memory limitations. Prefer one development command that starts everything and surfaces startup failures. Include a three-step demo walkthrough and use fabricated data.

When records must survive restarts, multiple instances must share data, or real users depend on the app, replace the store implementation with persistence. Preserve the API contract where possible, then add database constraints, migrations, and appropriate concurrency handling. The small store boundary provides that migration path without building a database abstraction platform in advance.
