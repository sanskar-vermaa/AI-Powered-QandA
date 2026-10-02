"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateJson } from "@/utils/ai";
import { getDb } from "@/utils/db";
import { gradeAnswer, removeSession, startSession } from "@/lib/service";

async function signedInEmail() {
  const user = await currentUser();
  return user?.primaryEmailAddress?.emailAddress ?? null;
}

export async function createInterviewAction(input) {
  const result = await startSession({
    db: getDb(),
    generate: generateJson,
    email: await signedInEmail(),
    input,
  });
  if (result.ok) revalidatePath("/dashboard");
  return result;
}

export async function submitAnswerAction({ mockId, index, answer }) {
  return gradeAnswer({
    db: getDb(),
    generate: generateJson,
    email: await signedInEmail(),
    mockId,
    index,
    answer,
  });
}

export async function deleteInterviewAction(mockId) {
  const result = await removeSession({ db: getDb(), email: await signedInEmail(), mockId });
  if (result.ok) revalidatePath("/dashboard");
  return result;
}
