"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "@/lib/posthog-client";

export function Hero() {
  return (
    <section className="bg-surface pt-12 md:pt-20 pb-0">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight max-w-2xl">
          Job hunting is hard.
          <br />
          Your tools shouldn&apos;t be.
        </h1>

        <p className="mt-4 md:mt-5 text-sm md:text-base text-text-secondary max-w-sm md:max-w-md leading-relaxed">
          JobPilot finds jobs, scores your match, researches companies, and
          tailors your resume — all automatically.
        </p>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full sm:w-auto">
          <Link
            href="/login"
            onClick={() => posthog.capture("cta_get_started_clicked", { location: "hero" })}
            className="bg-accent text-accent-foreground text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            onClick={() => posthog.capture("cta_find_first_match_clicked", { location: "hero" })}
            className="bg-surface border border-border text-text-primary text-sm font-medium px-6 py-3 rounded-lg hover:bg-surface-secondary transition-colors text-center"
          >
            Find Your First Match
          </Link>
        </div>

        <div className="mt-10 md:mt-14 w-full max-w-5xl">
          <Image
            src="/images/dashboard-demo.png"
            alt="JobPilot dashboard showing job matches and analytics"
            width={1200}
            height={720}
            className="w-full rounded-xl md:rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
