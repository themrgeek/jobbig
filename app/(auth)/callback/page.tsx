"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { insforge } from "@/lib/insforge";
import posthog from "posthog-js";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data?.user) {
          const user = data.user;

          posthog.identify(user.id, {
            email: user.email,
          });
          posthog.capture("auth_callback_success");

          const secure = window.location.protocol === "https:" ? "; Secure" : "";
          document.cookie = `insforge_session=1; path=/; SameSite=Lax; max-age=${
            30 * 24 * 60 * 60
          }${secure}`;
          router.replace("/dashboard");
        } else {
          posthog.capture("auth_callback_failed", { reason: "no_user" });
          router.replace("/login?error=auth_failed");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        posthog.captureException(err);
        posthog.capture("auth_callback_failed", { reason: "exception" });
        router.replace("/login?error=auth_failed");
      }
    }
    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-text-secondary">Signing you in…</p>
      </div>
    </div>
  );
}
