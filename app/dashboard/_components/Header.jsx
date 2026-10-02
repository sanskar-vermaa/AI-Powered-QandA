"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/upgrade", label: "Upgrade" },
  { href: "/#how-it-works", label: "How it works" },
];

export default function Header() {
  const path = usePathname();

  return (
    <header className="glass-panel sticky top-0 z-50 flex p-4 items-center justify-between rounded-b-2xl">
      <Link href="/" aria-label="Delta home">
        <Image src="/logo-1.svg" width={160} height={100} alt="Delta" priority />
      </Link>
      <nav aria-label="Main">
        <ul className="hidden md:flex gap-6">
          {LINKS.map(({ href, label }) => {
            const active = path === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`hover:text-primary transition-all ${active ? "text-primary font-bold glow-text" : ""}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button type="button" className="text-primary font-medium">Sign in</button>
        </SignInButton>
      </SignedOut>
    </header>
  );
}
