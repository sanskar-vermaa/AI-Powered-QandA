# Contributing

```bash
npm install
cp .env.example .env.local
npm run dev
```

Before opening a pull request:

```bash
npm run lint
npm test
npm run build
```

Rules of thumb:

- Never read a secret in a client component or through a `NEXT_PUBLIC_` variable. Server modules that touch secrets import `server-only`.
- Every query goes through `lib/interviews.js` and takes the owner's email.
- Business logic lives in `lib/` with dependencies passed in, so it can be tested with PGlite and a fake model.
- Keep `db/schema.sql` and `utils/schema.js` in sync.
