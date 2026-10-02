import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { listInterviews } from "@/lib/interviews";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Dashboard" };

export default async function Dashboard() {
  const { db, email } = await getViewer();
  const interviews = email ? await listInterviews(db, email) : [];

  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl text-primary glow-text">Dashboard</h1>
      <p className="text-muted-foreground">
        Pick a subject and hit Start. The AI writes the questions, you answer out loud, and you get feedback on
        every answer.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      <InterviewList interviews={interviews} />
    </div>
  );
}
