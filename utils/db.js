import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

let db;

// Neon's HTTP driver suits serverless hosts like Vercel; any other Postgres
// (Docker, RDS, Supabase...) uses a regular connection pool. Override the
// choice with DB_DRIVER=neon or DB_DRIVER=pg.
export function pickDriver(url, override = process.env.DB_DRIVER) {
  if (override === "neon" || override === "pg") return override;
  return /\.neon\.tech(?::\d+)?\//.test(url) ? "neon" : "pg";
}

// The connection string is a secret: it is read only on the server (the
// "server-only" import makes any client-side import fail the build) and the
// client is created lazily so builds don't need a database.
export function getDb() {
  if (!db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
    }
    db =
      pickDriver(url) === "neon"
        ? drizzleNeon(neon(url), { schema })
        : drizzlePg(new pg.Pool({ connectionString: url, max: 5 }), { schema });
  }
  return db;
}
