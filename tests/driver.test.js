import { pickDriver } from "@/utils/db";

it.each([
  ["postgresql://u:p@ep-cool-123.us-east-2.aws.neon.tech/neondb?sslmode=require", undefined, "neon"],
  ["postgresql://u:p@ep-cool-123-pooler.eu-central-1.aws.neon.tech:5432/db", undefined, "neon"],
  ["postgres://u:p@localhost:5432/qanda", undefined, "pg"],
  ["postgres://u:p@db.supabase.co:5432/postgres", undefined, "pg"],
  ["postgres://u:p@neon.tech.evil.example/db", undefined, "pg"],
  ["postgres://u:p@localhost/db", "neon", "neon"],
  ["postgresql://u:p@x.neon.tech/db", "pg", "pg"],
])("%s (override %s) -> %s", (url, override, expected) => {
  expect(pickDriver(url, override)).toBe(expected);
});
