# Starter app assumptions

Timing in this bank assumes:

- A working starter app already runs: browser UI, HTTP API, and an in-memory store with a seed function and a reset.
- Storage is simple and process-local. No database.
- No authentication, authorization, or deployment work. Where a role matters, use a demo switcher.
- All data is synthetic and disposable.

Architecture and API conventions follow [best_practices.md](../best_practices.md): `UI → API → store`, server-generated IDs, server-side validation, a stable error shape.

## Instructor setup checklist

- Starter runs with one command and serves UI and API from one origin.
- Reset returns the seed state.
- Two browser windows can be open at once (needed for concurrency and duplicate-submission exercises).
