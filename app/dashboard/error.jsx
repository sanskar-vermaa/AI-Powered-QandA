"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }) {
  return (
    <div className="px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-primary glow-text">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">We couldn&apos;t load this page. Please try again.</p>
      <Button className="mt-8 rounded-4xl" onClick={reset}>Try again</Button>
    </div>
  );
}
