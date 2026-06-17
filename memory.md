# Memory — Phase 1 Complete / Feature 05 Next

Last updated: 2026-06-17

## What was built

**PostHog review issues resolved (3 fixes):**
- `lib/posthog-client.ts` — created as re-export of posthog singleton from `posthog-js`
- All 7 files that imported `posthog-js` directly updated to import from `@/lib/posthog-client`: `Hero.tsx`, `Navbar.tsx`, `HowItWorks.tsx`, `Footer.tsx`, `app/(auth)/login/page.tsx`, `app/(auth)/callback/page.tsx`, `app/dashboard/page.tsx`
- `context/code-standards.md` — approved all 10 active PostHog events + 4 future agent events in the events table; renamed env var `NEXT_PUBLIC_POSTHOG_KEY` → `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` with correct "Used In" values

**Feature 04 — Database Schema (via InsForge MCP):**
- `profiles` table — 24 columns, primary key is `uuid REFERENCES auth.users(id) ON DELETE CASCADE`
- `agent_runs` table — FK to profiles
- `jobs` table — FK to agent_runs + profiles, `source CHECK (source IN ('search', 'url'))`, `company_research jsonb`
- `agent_logs` table — FK to agent_runs, profiles, nullable `job_id` FK to jobs
- RLS enabled on all 4 tables — 16 policies total (`user_id = auth.uid()`, profiles uses `id = auth.uid()`)
- Auto-profile trigger `on_auth_user_created` — `AFTER INSERT ON auth.users`, SECURITY DEFINER, inserts `(id, email)` into profiles
- `resumes` storage bucket — private (`isPublic: false`)
- `context/progress-tracker.md` — Features 02, 03, 04 marked complete, phase updated to Phase 2

## Decisions made

- **`lib/posthog-client.ts` is the canonical browser import** — all components import from `@/lib/posthog-client`, never directly from `posthog-js`. PostHog init stays in `instrumentation-client.ts`.
- **Auto-profile on signup** — trigger creates the profiles row. Feature 06 (Profile Save Logic) only needs to UPDATE, never INSERT or upsert.
- **profiles.id = auth.users.id** — no separate user_id column on profiles; other tables use `user_id` FK referencing `profiles(id)`.
- **env var is `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`** — reconciled in both code and code-standards.md. `NEXT_PUBLIC_POSTHOG_HOST` is the second PostHog env var.

## Problems solved

- No new problems surfaced this session — all work was clean.

## Current state

- **Feature 01 (Homepage)**: Complete ✅
- **Feature 02 (Auth)**: Complete ✅
- **Feature 03 (PostHog)**: Complete ✅
- **Feature 04 (Database Schema)**: Complete ✅
- **Feature 05 (Profile Page — Full UI)**: Not started
- **Phase 1**: Fully done

## Next session starts with

Start Feature 05 — Profile Page Full UI. Run `/architect the feature 5` first, then build the complete profile page with mock data. No save logic. Key sections from build-plan.md: completion banner, resume upload area, profile form (Personal Info, Professional Info, Work Experience × 3, Education, Job Preferences), Save Profile button.

## Open questions

- Has OAuth been tested end-to-end? A successful login was never confirmed — "nothing happening" was the last known symptom before error handling was improved.
- Does InsForge require `allowedRedirectUrls` to include `http://localhost:3000/callback`? Backend metadata showed empty `allowedRedirectUrls` — still unconfirmed whether this blocks OAuth.
