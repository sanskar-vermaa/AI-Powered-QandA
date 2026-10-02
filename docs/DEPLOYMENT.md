# Deployment

## Vercel

1. **Import** the repository in Vercel (framework: Next.js, no overrides).
2. **Database:** Storage → Neon (or paste any Postgres URL). Create the tables once with `npm run db:push` locally against that URL, or run `db/schema.sql` in the Neon SQL editor.
3. **Environment variables** (Production and Preview):
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
   - `DATABASE_URL` (Neon integration may name it `POSTGRES_URL`; copy it into `DATABASE_URL`)
   - `GEMINI_API_KEY`
   - optional: `GEMINI_MODEL`, `INTERVIEW_QUESTION_COUNT`, `MAX_INTERVIEWS_PER_DAY`, `MAX_ANSWERS_PER_DAY`, `NEXT_PUBLIC_CHATBASE_ID`
4. **Clerk:** add the production domain in the Clerk dashboard.
5. Deploy.

### Migrating from the 0.x environment variables

Earlier versions used `NEXT_PUBLIC_DRIZZLE_DB_URL` and `NEXT_PUBLIC_GEMINI_API_KEY`. Those values were exposed in the browser bundle, so:

1. **Rotate both secrets** (reset the Neon role password; create a new Gemini key and delete the old one).
2. Set the new values as `DATABASE_URL` and `GEMINI_API_KEY`.
3. Delete the old `NEXT_PUBLIC_DRIZZLE_DB_URL`, `NEXT_PUBLIC_GEMINI_API_KEY` and `NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT` variables (the count is now `INTERVIEW_QUESTION_COUNT`).
4. Redeploy and run `npm run db:push` once to add the new indexes.

## Docker

```bash
docker build --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_... -t qanda .
docker run -p 3000:3000 \
  -e CLERK_SECRET_KEY=sk_live_... \
  -e NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in -e NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up \
  -e DATABASE_URL=postgres://... \
  -e GEMINI_API_KEY=... \
  qanda
```

`docker compose up --build` runs the app with a local Postgres initialised from `db/schema.sql`.

## Operating notes

- **Costs:** each new session is one Gemini call and each graded answer is one call; the daily limits bound the worst case per user.
- **Speech recognition** relies on the browser (Chrome and Edge desktop work best; Firefox lacks it).
- **Backups:** Neon keeps point-in-time history on paid plans; otherwise schedule `pg_dump`.
