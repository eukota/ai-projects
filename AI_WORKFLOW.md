# AI Workflow

## Adding a Project

1. Create a folder under `projects/<project-name>/`.
2. Add a `README.md` using `_templates/project.md`.
3. Add architecture, decision, experiment, and reference docs as needed.
4. Link implementation repositories, if any.
5. Add cross-project terms to `shared/glossary.md`.

## Importing Context

When importing context from ChatGPT, Claude, Cursor, notes apps, or other systems:

- Preserve the original meaning.
- Remove duplicated conversational filler.
- Keep open questions visible.
- Convert major conclusions into decision records.
- Keep implementation code out unless it is a short quoted example needed for design discussion.

## Updating Project State

Prefer small, explicit edits:

- Add a decision record when direction changes.
- Add an experiment when testing an uncertain idea.
- Update project README files when status, goals, or links change.
- Update `shared/open-questions.md` when questions span projects.

