# Delta Δ: AI-Powered Q&A Practice

Practice any subject out loud. Pick a subject, topics and difficulty; the AI writes questions with model answers, you answer by voice, and each answer is graded from 1 to 10 with specific feedback. Sessions, scores and feedback are saved per user.

**Stack:** Next.js 15 (App Router, Server Actions) · React 19 · Clerk · Drizzle ORM · PostgreSQL (Neon or any Postgres) · Google Gemini · Tailwind CSS 4 · Vitest · PGlite · Docker · GitHub Actions

**Live demo:** https://ai-powered-qand-a-delta.vercel.app/

## Features

- **AI-generated sessions:** questions and model answers for any subject, topic list and difficulty (1–5)
- **Voice answers:** browser speech recognition with a microphone check; questions can be read aloud
- **Instant grading:** every answer gets a 1–10 rating and 3–5 sentences of feedback right after recording; re-recording replaces the previous attempt
- **Feedback report:** overall rating, per-question scores, your answer next to the model answer
- **Dashboard:** history of sessions with retry, feedback and delete
- **Accounts:** Clerk sign-in; every query is scoped to the signed-in user
- **Cost control:** daily limits per user on new sessions and graded answers
- **Optional assistant:** Chatbase widget when `NEXT_PUBLIC_CHATBASE_ID` is set

## Security

All database and Gemini calls run on the server through Server Actions and server components. The connection string and API key use server-only variables and modules marked `server-only`, so importing them into a client component fails the build. CI builds with canary secret values and fails if either appears in the browser bundle. See [SECURITY.md](SECURITY.md).

## Quick start

Requirements: Node.js 18.18+, a [Clerk](https://clerk.com) application, a [Gemini API key](https://aistudio.google.com/apikey) and a Postgres database ([Neon](https://neon.tech) free tier works).

```bash
npm install
cp .env.example .env.local     # fill in Clerk, DATABASE_URL and GEMINI_API_KEY
npm run db:push                # create the tables (or run db/schema.sql)
npm run dev                    # http://localhost:3000
```

### Docker

```bash
cp .env.example .env           # Clerk and Gemini keys; the database is provided
docker compose up --build      # app on http://localhost:3000 with Postgres
```

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | yes | Clerk application keys |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | yes | `/sign-in`, `/sign-up` |
| `DATABASE_URL` | yes | Postgres URL. Neon URLs use the serverless HTTP driver, others a `pg` pool (`DB_DRIVER` overrides) |
| `GEMINI_API_KEY` | yes | Google Gemini key (server only) |
| `GEMINI_MODEL` | no | Default `gemini-2.5-flash` |
| `INTERVIEW_QUESTION_COUNT` | no | Questions per session, 1–10 (default 5) |
| `MAX_INTERVIEWS_PER_DAY` | no | Sessions per user per day (default 10) |
| `MAX_ANSWERS_PER_DAY` | no | Graded answers per user per day (default 100) |
| `NEXT_PUBLIC_INFORMATION`, `NEXT_PUBLIC_QUESTION_NOTE` | no | Custom help text |
| `NEXT_PUBLIC_CHATBASE_ID` | no | Enables the Chatbase assistant |

## Testing

```bash
npm test               # 100 tests
npm run test:coverage  # 100% statements on lib/ and server actions
npm run lint
```

The data layer and services are tested against [PGlite](https://pglite.dev), a real Postgres compiled to WebAssembly, using the same `db/schema.sql` as production, so no database server is needed. Tests cover ownership checks (users can't read, grade or delete each other's sessions), daily limits, AI failure handling and parsing of model output.

## Deployment

- **Vercel:** import the repo, add the environment variables above, deploy. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
- **Docker:** `docker build --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_... -t qanda .` then run with the server-side variables.

## Project structure

```
app/
  actions.js                 server actions (create, grade, delete) using the Clerk session
  dashboard/                 dashboard, session intro, quiz and feedback pages
  (auth)/                    Clerk sign-in and sign-up
lib/
  service.js                 session and grading logic, daily limits
  interviews.js              owner-scoped queries
  prompts.js                 Gemini prompts with fenced user input
  parseAiResponse.js         validation and normalisation of model output
  validation.js              input limits
utils/
  db.js, ai.js               server-only database and Gemini clients
  schema.js                  Drizzle schema
db/schema.sql                table definitions (docker-compose, tests)
tests/                       Vitest suites
```

More detail: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## License

[MIT](LICENSE)
