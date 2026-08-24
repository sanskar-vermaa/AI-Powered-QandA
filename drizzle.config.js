import { defineConfig } from "drizzle-kit";

if (!process.env.NEXT_PUBLIC_DRIZZLE_DB_URL) {
  throw new Error("NEXT_PUBLIC_DRIZZLE_DB_URL is not set. Add it to your .env.local file.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
});