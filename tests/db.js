import { readFileSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "../utils/schema";

const SCHEMA_SQL = readFileSync(path.resolve(__dirname, "../db/schema.sql"), "utf8");

// A real Postgres (compiled to WASM) per test file, created from the same
// db/schema.sql that production and docker-compose use.
export async function createTestDb() {
  const client = new PGlite();
  await client.exec(SCHEMA_SQL);
  return drizzle(client, { schema });
}
