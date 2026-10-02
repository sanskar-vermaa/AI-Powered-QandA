import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-primary glow-text">Not found</h1>
      <p className="mt-4 text-muted-foreground">
        This page or Q&A session doesn&apos;t exist, or it belongs to another account.
      </p>
      <Button asChild className="mt-8 rounded-4xl">
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  );
}
