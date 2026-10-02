import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "../utils/schema";

// A real Postgres (compiled to WASM) per test file, with the same tables as
// production. Column names match utils/schema.js, including "ccreatedAt".
export async function createTestDb() {
  const client = new PGlite();
  await client.exec(`
    CREATE TABLE "mockInterview" (
      "id" serial PRIMARY KEY,
      "jsonMockResp" text NOT NULL,
      "jobPosition" varchar NOT NULL,
      "jobDesc" varchar NOT NULL,
      "jobExperience" varchar NOT NULL,
      "createdBy" varchar NOT NULL,
      "createdAt" varchar,
      "mockId" varchar NOT NULL
    );
    CREATE TABLE "userAnswer" (
      "id" serial PRIMARY KEY,
      "mockId" varchar NOT NULL,
      "question" varchar NOT NULL,
      "correctAns" varchar,
      "userAns" text,
      "feedback" text,
      "rating" varchar,
      "userEmail" varchar,
      "ccreatedAt" varchar
    );
  `);
  return drizzle(client, { schema });
}
