const mocks = vi.hoisted(() => ({
  currentUser: vi.fn(),
  revalidatePath: vi.fn(),
  startSession: vi.fn(),
  gradeAnswer: vi.fn(),
  removeSession: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({ currentUser: mocks.currentUser }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("@/utils/db", () => ({ getDb: () => "db" }));
vi.mock("@/utils/ai", () => ({ generateJson: "generate" }));
vi.mock("@/lib/service", () => ({
  startSession: mocks.startSession,
  gradeAnswer: mocks.gradeAnswer,
  removeSession: mocks.removeSession,
}));

const { createInterviewAction, deleteInterviewAction, submitAnswerAction } = await import("@/app/actions");

beforeEach(() => {
  vi.clearAllMocks();
  mocks.currentUser.mockResolvedValue({ primaryEmailAddress: { emailAddress: "alice@example.com" } });
});

it("passes the signed-in email, never one from the client", async () => {
  mocks.startSession.mockResolvedValue({ ok: true, mockId: "m1" });
  const input = { subject: "S", topics: "T", difficulty: 1, email: "eve@example.com" };
  expect(await createInterviewAction(input)).toEqual({ ok: true, mockId: "m1" });
  expect(mocks.startSession).toHaveBeenCalledWith({ db: "db", generate: "generate", email: "alice@example.com", input });
  expect(mocks.revalidatePath).toHaveBeenCalledWith("/dashboard");
});

it("passes a null email when signed out", async () => {
  mocks.currentUser.mockResolvedValue(null);
  mocks.startSession.mockResolvedValue({ ok: false, error: "Please sign in again." });
  await createInterviewAction({});
  expect(mocks.startSession.mock.calls[0][0].email).toBeNull();
  expect(mocks.revalidatePath).not.toHaveBeenCalled();
});

it("grades answers for the signed-in user", async () => {
  mocks.gradeAnswer.mockResolvedValue({ ok: true, rating: "7", feedback: "f" });
  await submitAnswerAction({ mockId: "m1", index: 2, answer: "a long enough answer" });
  expect(mocks.gradeAnswer).toHaveBeenCalledWith({
    db: "db",
    generate: "generate",
    email: "alice@example.com",
    mockId: "m1",
    index: 2,
    answer: "a long enough answer",
  });
});

it("deletes and refreshes the dashboard", async () => {
  mocks.removeSession.mockResolvedValue({ ok: true });
  expect(await deleteInterviewAction("m1")).toEqual({ ok: true });
  expect(mocks.removeSession).toHaveBeenCalledWith({ db: "db", email: "alice@example.com", mockId: "m1" });
  expect(mocks.revalidatePath).toHaveBeenCalledWith("/dashboard");

  mocks.removeSession.mockResolvedValue({ ok: false, error: "nope" });
  mocks.revalidatePath.mockClear();
  await deleteInterviewAction("m2");
  expect(mocks.revalidatePath).not.toHaveBeenCalled();
});
