import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let db;

// The connection string is a secret: it is read only on the server (the
// "server-only" import makes any client-side import fail the build) and the
// client is created lazily so builds don't need a database.
export function getDb() {
  if (!db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
    }
    db = drizzle(neon(url), { schema });
  }
  return db;
}
