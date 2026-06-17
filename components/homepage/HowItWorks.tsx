"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "@/lib/posthog-client";

export function HowItWorks() {
  return (
    <>
      {/* Testimonial */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-accent mx-auto mb-5 md:mb-6 opacity-40"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <blockquote className="text-lg md:text-xl font-medium text-text-primary leading-relaxed mb-8 md:mb-10">
            I used to spend my evenings copy-pasting resumes. Now I open my
            dashboard to see interviews waiting. It feels like cheating. Had 3
            offers on the list simultaneously.
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/images/user-icon.png"
              alt="Alex Morgan"
              width={48}
              height={48}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary">
                Alex Morgan
              </p>
              <p className="text-xs text-text-muted">
                Senior Frontend Developer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-cta-gradient relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-64 md:w-[480px] h-64 md:h-[480px] rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 md:w-[480px] h-64 md:h-[480px] rounded-full bg-info-medium/20 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto mb-4">
            Your next job search can feel a lot less overwhelming
          </h2>
          <p className="text-sm md:text-base text-white/75 max-w-sm md:max-w-md mx-auto mb-8 md:mb-10 leading-relaxed">
            Let AI handle the searching, scoring, and research. You focus on the
            conversations that matter.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 max-w-xs sm:max-w-none mx-auto">
            <Link
              href="/login"
              onClick={() => posthog.capture("cta_how_it_works_clicked", { label: "get_started" })}
              className="bg-white text-accent text-sm font-medium px-6 py-3 rounded-lg hover:bg-surface-secondary transition-colors text-center"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              onClick={() => posthog.capture("cta_how_it_works_clicked", { label: "learn_more" })}
              className="bg-white/10 border border-white/25 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-white/20 transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
