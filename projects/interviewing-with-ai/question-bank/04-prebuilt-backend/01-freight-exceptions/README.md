# Freight exceptions (practice instance)

A practice exercise for building a frontend on top of an existing backend. You play the candidate. The kit has three parts: a running API with seeded data, Swagger docs, and a written brief about the users' problems.

## Candidate instructions

You are building a working web prototype for the people described in the brief, using the API we give you. Work the way you would on a real team, thinking aloud as you go.

- Set up an empty repo for your frontend before you start.
- Use any language, framework or tools you like.
- Share your whole screen so your process is visible.
- Docs, search and AI coding tools are all allowed.

Read the [brief](./01-brief.md). Decide what to build and say what you would ask the interviewer. Then build it, directing your AI tool and verifying what it produces.

## How to practice

**Setup**

1. Start the backend (see [Run the backend](#run-the-backend)). Docs are at <http://localhost:4000/docs>.
2. Create a fresh, empty repo for your frontend outside this folder. Don't edit `backend/`.
3. Reset the data whenever you want a clean start: `curl -X POST localhost:4000/api/admin/reset`.

**Run it like the interview (about 60 minutes)**

1. **Read the brief, 5 to 10 minutes.** Say out loud what you would ask the interviewer and who you think the first user is.
2. **Pick one user and one journey.** Say what you are leaving out.
3. **Read the API before you build.** Open `/docs` and also call the endpoints with `curl`. The docs are not the whole truth.
4. **Build with your AI tool and share your full screen.** Give it the brief and the real response shapes. Read what it produces and explain your choices as you go.
5. **Verify as you go.** Check empty states, error states and the odd cases you found in step 3.

**Afterwards**

- Open the [instructor notes](./02-instructor-notes.md) for the traps in the API and the follow-up changes. Try one as a second round.

## Run the backend

```bash
cd backend
npm install
npm start          # http://localhost:4000, docs at /docs
```

- Docs: <http://localhost:4000/docs> (raw spec: `/openapi.yaml`).
- Reset to seed data at any time: `curl -X POST localhost:4000/api/admin/reset`.
- Each request logs one JSON line to the terminal. To keep a log file: `npm start 2>&1 | tee logs/server-latest.log` (`logs/` is gitignored).
- CORS is open, so a separate dev server can call the API directly.

## Timing

About 60 minutes of build, as in the [exercise bank](../../README.md). Practice clarifying questions in the first 5 to 10 minutes.

## Files

1. [Brief](./01-brief.md): what the candidate receives
2. [Instructor notes](./02-instructor-notes.md): spoilers. Don't read these before practicing.
3. `backend/`: the API server
