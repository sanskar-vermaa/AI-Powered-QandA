# Security policy

## Reporting a vulnerability

Please use GitHub's **Report a vulnerability** button on the Security tab instead of a public issue.

## Design

- Database and Gemini credentials are read only in server modules that import `server-only`; CI fails if a canary secret shows up in the client bundle.
- Identity comes from Clerk on the server. Every query is scoped to the signed-in user, and other users' sessions return 404.
- Grading uses the question and model answer stored on the server, not values sent by the browser.
- Inputs are length-limited; user text is fenced in prompts and treated as data.
- Per-user daily limits bound AI usage.
- Responses carry `X-Frame-Options`, `nosniff`, HSTS, a referrer policy and a permissions policy that only allows the microphone.

## Advisory for versions before 1.0.0

Versions before 1.0.0 exposed `NEXT_PUBLIC_DRIZZLE_DB_URL` and `NEXT_PUBLIC_GEMINI_API_KEY` to the browser and did not check session ownership. Anyone running those versions should rotate the database password and Gemini key and follow the migration steps in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#migrating-from-the-0x-environment-variables).
