-- Tables used by the app (matches utils/schema.js). Safe to run repeatedly.
-- Either run this file or `npm run db:push`.
CREATE TABLE IF NOT EXISTS "mockInterview" (
  "id" serial PRIMARY KEY,
  "jsonMockResp" text NOT NULL,
  "jobPosition" varchar NOT NULL,
  "jobDesc" varchar NOT NULL,
  "jobExperience" varchar NOT NULL,
  "createdBy" varchar NOT NULL,
  "createdAt" varchar,
  "mockId" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "userAnswer" (
  "id" serial PRIMARY KEY,
  "mockId" varchar NOT NULL,
  "question" varchar NOT NULL,
  "correctAns" varchar,
  "userAns" text,
  "feedback" text,
  "rating" varchar,
  "userEmail" varchar,
  -- Historical typo kept for compatibility with existing databases.
  "ccreatedAt" varchar
);

CREATE INDEX IF NOT EXISTS "mockInterview_owner_idx" ON "mockInterview" ("createdBy", "id");
CREATE UNIQUE INDEX IF NOT EXISTS "mockInterview_mockId_idx" ON "mockInterview" ("mockId");
CREATE INDEX IF NOT EXISTS "userAnswer_session_idx" ON "userAnswer" ("mockId", "userEmail");
