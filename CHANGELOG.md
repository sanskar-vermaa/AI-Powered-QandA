# Changelog

## 1.0.0

### Security
- Database URL and Gemini key no longer reach the browser (server actions, server-only modules, new variable names)
- Sessions, answers and feedback are scoped to their owner; other users get a 404
- Next.js upgraded from 15.2.4 to 15.5.27 (React Server Components advisories)
- Daily per-user limits on AI usage; Gemini safety filters re-enabled; security headers

### Fixed
- Feedback page always showed "No record found" (Next 15 async params)
- Transcripts duplicated themselves while recording
- Re-recording an answer created duplicate feedback entries
- Production server crashed with "window is not defined" when preloading the quiz page
- Toast messages never appeared (no Toaster mounted); errors were silently swallowed
- Header links were plain text; footer icons and links were broken; sign-in artwork broke on nested routes
- Page title was "Create Next App"; package-lock.json was out of sync

### Added
- Instant rating and feedback after each answer, overall score on the feedback page
- Delete sessions; clickable question navigation with answered markers; microphone check
- Works with any Postgres (pg pool) as well as Neon; indexes; `db/schema.sql`
- 100 Vitest tests (PGlite-backed data layer), ESLint CLI, GitHub Actions CI with a secret-leak check, Docker image and docker-compose, docs

## 0.1.0

- First version: Gemini-generated questions, voice answers, feedback, Clerk auth, Neon database
