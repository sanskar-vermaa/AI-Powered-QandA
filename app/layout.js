import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Header from "./dashboard/_components/Header";
import ChatbaseWidget from "./_components/ChatbaseWidget";

export const metadata = {
  title: {
    default: "Delta Δ · AI-powered Q&A practice",
    template: "%s · Delta Δ",
  },
  description:
    "Practice any subject out loud: AI writes questions for your topics and difficulty, grades your spoken answers and explains how to improve.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
          <div className="gradient-mesh-bg" aria-hidden="true" />
          <Header />
          <main>{children}</main>
          <Toaster />
          <ChatbaseWidget />
        </body>
      </html>
    </ClerkProvider>
  );
}
