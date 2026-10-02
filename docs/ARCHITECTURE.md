# Architecture

## Request flow

```
Browser (client components)
   │  server action call            ▲  plain data (no secrets, no model answers during a quiz)
   ▼                                │
app/actions.js ── currentUser() ──► Clerk
   │
   ▼
lib/service.js ── validation, daily limits, prompts, parsing
   │                       │
   ▼                       ▼
lib/interviews.js      utils/ai.js ──► Gemini
   │
   ▼
utils/db.js ──► Postgres (Neon HTTP driver or pg pool)
```

Server components (dashboard, session intro, quiz shell, feedback) read through `lib/session.js` → `lib/interviews.js` directly.

## Ownership

The signed-in user's primary email (from Clerk on the server) is the owner key. Every query in `lib/interviews.js` filters by it:

| Operation | Filter |
| --- | --- |
| list sessions | `createdBy = email` |
| open a session | `mockId = ? AND createdBy = email` |
| save an answer | session must belong to `email`; question text and model answer come from the stored session |
| read feedback | `mockId = ? AND userEmail = email` |
| delete | both of the above |

Pages return 404 for sessions owned by someone else, so ids can't be probed.

## Data model

`mockInterview`: one row per session. `jsonMockResp` holds `{"interviewQuestions": [{question, answer}]}`; `jobPosition`, `jobDesc` and `jobExperience` hold subject, topics and difficulty (names kept from the original schema).

`userAnswer`: one row per answered question per user. Re-recording deletes the previous row for that question first. `rating` is a whole number 0–10 stored as text. The `ccreatedAt` column name is a historical typo kept for compatibility.

Dates are `DD-MM-YYYY` strings; daily limits count rows with today's stamp.

## AI

- `lib/prompts.js` builds prompts with user text inside tags the model is told to treat as data.
- `utils/ai.js` calls Gemini with `responseMimeType: application/json` and default safety settings.
- `lib/parseAiResponse.js` strips code fences, drops malformed questions and normalises ratings like `"8/10"`.
- AI failures are logged server-side and shown to the user as a retryable message; nothing is saved.

## Testing strategy

- Pure modules (validation, prompts, parsing): unit tests.
- Data layer and services: PGlite (in-process Postgres) created from `db/schema.sql`, with a fake `generate` function standing in for Gemini.
- Server actions: Clerk, the database and the service are mocked to prove identity only comes from Clerk.
- Components: Testing Library in jsdom.
- CI: canary-secret build that fails if server secrets appear in `.next/static`.
