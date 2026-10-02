import InterviewItemCard from "./InterviewItemCard";

export default function InterviewList({ interviews }) {
  return (
    <section>
      <h2 className="font-medium text-xl">Previous Q&A</h2>
      {interviews.length === 0 ? (
        <p className="text-muted-foreground my-3">No sessions yet. Start your first one above.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviews.map((interview) => (
            <InterviewItemCard interview={interview} key={interview.mockId} />
          ))}
        </div>
      )}
    </section>
  );
}
