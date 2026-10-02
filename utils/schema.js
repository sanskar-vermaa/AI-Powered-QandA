import { index, pgTable, serial, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";

// Keep in sync with db/schema.sql.
export const MockInterview = pgTable(
  "mockInterview",
  {
    id: serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition").notNull(),
    jobDesc: varchar("jobDesc").notNull(),
    jobExperience: varchar("jobExperience").notNull(),
    createdBy: varchar("createdBy").notNull(),
    createdAt: varchar("createdAt"),
    mockId: varchar("mockId").notNull(),
  },
  (t) => [
    index("mockInterview_owner_idx").on(t.createdBy, t.id),
    uniqueIndex("mockInterview_mockId_idx").on(t.mockId),
  ]
);

export const UserAnswer = pgTable(
  "userAnswer",
  {
    id: serial("id").primaryKey(),
    mockIdRef: varchar("mockId").notNull(),
    question: varchar("question").notNull(),
    correctAns: varchar("correctAns"),
    userAns: text("userAns"),
    feedback: text("feedback"),
    rating: varchar("rating"),
    userEmail: varchar("userEmail"),
    // Historical typo in the column name, kept for existing databases.
    createdAt: varchar("ccreatedAt"),
  },
  (t) => [index("userAnswer_session_idx").on(t.mockIdRef, t.userEmail)]
);
