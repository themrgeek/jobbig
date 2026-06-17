# Memory — PostHog Instrumentation

Last updated: 2026-06-16

## What was built

**Feature 02 — Auth (already existed from last session):**
- `lib/insforge.ts` — InsForge client singleton
- `app/(auth)/login/page.tsx` — Google + GitHub OAuth, auth-check on mount
- `app/(auth)/callback/page.tsx` — OAuth callback, session cookie, posthog.identify()
- `middleware.ts` — Protects /dashboard, /profile, /find-jobs
- `app/dashboard/page.tsx` — Placeholder dashboard

**Feature 03 — PostHog (wizard-initialized + events added this session):**
- `instrumentation-client.ts` — PostHog init via Next.js instrumentation pattern (wizard). Uses `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `/ingest` proxy. `capture_exceptions: true`, `defaults: "2026-01-30"`.
- `lib/posthog-server.ts` — Server-side PostHog client (flushAt: 1, flushInterval: 0)
- `next.config.ts` — Reverse proxy rewrites for `/ingest/` → PostHog
- `posthog-js` and `posthog-node` both in package.json

**Events added this session:**
- `components/layout/Navbar.tsx` — `nav_link_clicked` ({ destination: "dashboard" | "find_jobs" | "profile" })
- `components/layout/Footer.tsx` — converted to "use client", added `footer_link_clicked` ({ label: "privacy" | "terms" })

**Pre-existing events (from prior session + wizard):**
- `oauth_login_initiated` ({ provider }) — login page
- `auth_callback_success` / `auth_callback_failed` ({ reason }) — callback page
- `posthog.identify(user.id, { email })` — callback page
- `dashboard_viewed` — dashboard page
- `cta_get_started_clicked`, `cta_find_first_match_clicked` — Hero.tsx
- `cta_how_it_works_clicked` ({ label }) — HowItWorks.tsx
- `navbar_cta_clicked` — Navbar.tsx

## Decisions made

- **Wizard pattern over layout provider**: PostHog initialized in `instrumentation-client.ts` (Next.js 15.3+ pattern) instead of wrapping layout with a provider. Components import `posthog` directly from `posthog-js` — no lib wrapper.
- **Two-layer session management**: `insforge_session=1` client cookie for middleware; real auth via InsForge's own session.
- **Post-auth always → `/dashboard`**: No ?from tracking.
- **`redirectTo` is dynamic**: `window.location.origin + '/callback'`.

## Problems solved

- **InsForge MCP not loading**: Requires VSCode window reload (Cmd+Shift+P → "Developer: Reload Window").

## Current state

- **Feature 01 (Homepage)**: Complete ✅ — in progress-tracker.md
- **Feature 02 (Auth)**: Built ✅ — NOT yet marked complete in progress-tracker.md
- **Feature 03 (PostHog)**: Instrumented ✅ but 3 review issues need resolving before marking complete
- **Feature 04 (Database Schema)**: Not started

**3 open review issues (must resolve before Feature 04):**
1. **Unapproved events** — 10 events exist in code; `code-standards.md` only approves 4 (`job_search_started`, `job_found`, `profile_completed`, `company_researched`). Update `code-standards.md` to approve all current events (or remove the ones that don't belong).
2. **Env var name mismatch** — code uses `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` everywhere; `code-standards.md` specifies `NEXT_PUBLIC_POSTHOG_KEY`. Pick one and reconcile both code and code-standards.md.
3. **`lib/posthog-client.ts` missing** — `architecture.md` lists this file as the PostHog browser singleton. Currently components import directly from `posthog-js`. Either create the wrapper file or update architecture.md to reflect the instrumentation-client.ts pattern.

## Next session starts with

1. Resolve the 3 review issues above (update code-standards.md and architecture.md)
2. Mark Feature 02 complete in `context/progress-tracker.md`
3. Mark Feature 03 complete in `context/progress-tracker.md` (after resolving issues)
4. Start Feature 04 — Database Schema: create profiles, agent_runs, jobs, agent_logs tables + resumes storage bucket via InsForge MCP

## Open questions

- Has the OAuth flow been tested end-to-end? "Nothing happening" was the symptom last session — error handling was improved but a successful login was never confirmed.
- Does InsForge require `allowedRedirectUrls` to include `http://localhost:3000/callback`? Backend metadata showed empty `allowedRedirectUrls` — unconfirmed whether this blocks OAuth.
