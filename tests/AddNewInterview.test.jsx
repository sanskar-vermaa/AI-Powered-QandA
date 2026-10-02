// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mocks = vi.hoisted(() => ({ action: vi.fn(), push: vi.fn(), toastError: vi.fn() }));
vi.mock("@/app/actions", () => ({ createInterviewAction: mocks.action }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock("sonner", () => ({ toast: { error: mocks.toastError } }));

const { default: AddNewInterview } = await import("@/app/dashboard/_components/AddNewInterview");

async function fillAndSubmit() {
  await userEvent.click(screen.getByRole("button", { name: "Start Q&A" }));
  await userEvent.type(screen.getByLabelText("Subject"), "Networks");
  await userEvent.type(screen.getByLabelText("Topics"), "TCP, UDP");
  await userEvent.clear(screen.getByLabelText("Difficulty (1-5)"));
  await userEvent.type(screen.getByLabelText("Difficulty (1-5)"), "3");
  await userEvent.click(screen.getAllByRole("button", { name: "Start Q&A" }).at(-1));
}

beforeEach(() => vi.clearAllMocks());

it("creates a session and opens it", async () => {
  mocks.action.mockResolvedValue({ ok: true, mockId: "m1" });
  render(<AddNewInterview />);
  await fillAndSubmit();
  expect(mocks.action).toHaveBeenCalledWith({ subject: "Networks", topics: "TCP, UDP", difficulty: "3" });
  await vi.waitFor(() => expect(mocks.push).toHaveBeenCalledWith("/dashboard/interview/m1"));
});

it("shows the server's error message", async () => {
  mocks.action.mockResolvedValue({ ok: false, error: "You've reached today's limit of 10 Q&A sessions." });
  render(<AddNewInterview />);
  await fillAndSubmit();
  expect(await screen.findByRole("alert")).toHaveTextContent("today's limit");
  expect(mocks.toastError).toHaveBeenCalled();
  expect(mocks.push).not.toHaveBeenCalled();
});

it("limits field lengths and difficulty in the form", async () => {
  render(<AddNewInterview />);
  await userEvent.click(screen.getByRole("button", { name: "Start Q&A" }));
  expect(screen.getByLabelText("Subject")).toHaveAttribute("maxLength", "100");
  expect(screen.getByLabelText("Difficulty (1-5)")).toHaveAttribute("max", "5");
});
