"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export function Navbar() {
  return (
    <header className="w-full bg-surface border-b border-border h-16 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={140}
            height={36}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Nav links — hidden below md */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            href="/dashboard"
            onClick={() => posthog.capture("nav_link_clicked", { destination: "dashboard" })}
            className="text-sm font-medium text-text-dark hover:text-accent transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/find-jobs"
            onClick={() => posthog.capture("nav_link_clicked", { destination: "find_jobs" })}
            className="text-sm font-medium text-text-dark hover:text-accent transition-colors"
          >
            Find Jobs
          </Link>
          <Link
            href="/profile"
            onClick={() => posthog.capture("nav_link_clicked", { destination: "profile" })}
            className="text-sm font-medium text-text-dark hover:text-accent transition-colors"
          >
            Profile
          </Link>
        </nav>

        {/* CTA — always visible */}
        <Link
          href="/login"
          onClick={() => posthog.capture("navbar_cta_clicked")}
          className="shrink-0 bg-accent text-accent-foreground text-sm font-medium px-4 sm:px-5 py-2 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          <span className="hidden sm:inline">Start for Free</span>
          <span className="sm:hidden">Get Started</span>
        </Link>
      </div>
    </header>
  );
}
