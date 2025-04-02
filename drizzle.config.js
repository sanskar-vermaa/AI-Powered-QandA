import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_JCFt69WHzeRp@ep-tiny-bonus-a5cxw6bv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  }
});