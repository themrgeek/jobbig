"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import posthog from "posthog-js";

export default function DashboardPage() {
  useEffect(() => {
    posthog.capture("dashboard_viewed");
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="mt-2 text-text-secondary">
            Your dashboard is being built. Check back soon.
          </p>
        </div>
      </main>
    </>
  );
}
