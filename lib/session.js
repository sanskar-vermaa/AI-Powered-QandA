import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { getDb } from "@/utils/db";

// For server components: the database plus the signed-in user's email.
export async function getViewer() {
  const user = await currentUser();
  return { db: getDb(), email: user?.primaryEmailAddress?.emailAddress ?? null };
}
