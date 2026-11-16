# Pre-built backend exercises

A different question type from the small and medium exercises. The backend already exists: a running API with seeded data, Swagger docs, and a written brief about the users' problems. The candidate builds only the frontend.

What it practices that the others don't:

- Scoping an open brief into one user and one journey.
- Reading an unfamiliar API, including where the docs and the real responses disagree.
- Directing an AI tool against real response shapes instead of an invented data model.

Each exercise is a folder with a `README.md` (candidate instructions and how to run), `01-brief.md`, `02-instructor-notes.md` (spoilers), and a `backend/` server.

Entries are self-contained, with no shared code. 01 can be practiced alone. 02 needs an interviewer, because the API is changed live partway through; it also has `tools/` for starting the server and publishing a temporary public URL.

| # | Exercise | Domain | Planted traps |
| --- | --- | --- | --- |
| 01 | [Freight exceptions](./01-freight-exceptions/) | Shipments and the exceptions dispatchers work through | Null ETA at customs, delivery blocked by open exceptions, restricted status transitions |
| 02 | [Tycho contract drift](./02-tycho-contract-drift/) | Raw-minerals shipments tracked for customers, dispatchers and managers | The same API traps, plus live contract breaks (renamed field, changed envelope, `null` turned into `"null"`, flaky 503s) and an optional roles add-on whose spec says 403 but returns 404 |
