# Tycho Bulk Freight: build a frontend on an existing API

You are building a working web prototype for the people described in the [brief](./01-brief.md), using an API that already exists. Work the way you would on a real team, thinking aloud as you go.

## Ground rules

- Set up a fresh, empty repo for your frontend before you start.
- Use any language, framework or tools you like.
- Share your whole screen so your process is visible.
- Docs, search and AI coding tools are all allowed.
- You can't change the API. It is a shared service you consume.

## What you have

- **The API.** The interviewer gives you the base URL. Interactive docs are at `<base url>/docs`, and the raw spec is at `<base url>/openapi.yaml`.
- **Seed data** that looks like a normal week: shipments of raw minerals between ports, with the customers who receive them.
- **The [brief](./01-brief.md)**, which describes what the different people want.

CORS is open, so a dev server on your laptop can call the API directly. If the data gets into a mess, `POST <base url>/api/admin/reset` restores the seed data.

## How the session runs (about 60 minutes)

1. **Read the brief, 5 to 10 minutes.** Say out loud what you would ask the interviewer, and who you think the first user is. The interviewer will answer as the business.
2. **Pick one user and one journey.** Say what you are leaving out and why.
3. **Read the API before you build.** Open `/docs`, and also call the endpoints yourself with `curl` or a REST client. Treat the docs as a good starting point, not a guarantee.
4. **Build, directing your AI tool.** Give it the brief and the real response shapes. Read what it produces, and explain what you accept, change or reject.
5. **Verify as you go.** Check empty states, error states and the odd cases you found in step 3. Say how you know it works.

The interviewer may interrupt with questions or a change while you work. That is part of the exercise: keep your own understanding of the code, and say what you would do next.

## What the interviewer is looking for

- Clarifying questions before building, and a deliberate scope.
- Reading real API responses instead of assuming.
- Directing the AI with specifics, and checking its output.
- Steady progress to something that works, rather than a broad half-working tool.
- Clear explanations of tradeoffs, and how you validated the result.

## Files

- [Brief](./01-brief.md)
