<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into JobPilot. The following changes were made:

- **`instrumentation-client.ts`** — initialises `posthog-js` for client-side tracking via a reverse proxy, with error tracking (`capture_exceptions: true`) and debug mode in development.
- **`lib/posthog-server.ts`** — singleton `posthog-node` client for server-side event capture.
- **`next.config.ts`** — `/ingest` rewrites proxy PostHog requests through Next.js (avoids ad-blockers); `skipTrailingSlashRedirect: true` required for PostHog to work correctly.
- **`components/homepage/Hero.tsx`** — `"use client"` directive; `onClick` handlers on both CTA links to capture hero button clicks.
- **`components/layout/Navbar.tsx`** — `"use client"` directive; `onClick` on the "Start for Free" / "Get Started" nav button.
- **`components/homepage/HowItWorks.tsx`** — converted to client component; `onClick` handlers on both CTA links in the bottom conversion section.
- **`app/(auth)/login/page.tsx`** — captures `oauth_login_initiated` (with `provider` property) when a user clicks Google or GitHub; `captureException` on OAuth errors.
- **`app/(auth)/callback/page.tsx`** — calls `posthog.identify()` on successful auth (using user ID as distinct ID), then captures `auth_callback_success`; captures `auth_callback_failed` (with `reason` property) and exceptions on failure paths.
- **`app/dashboard/page.tsx`** — fires `dashboard_viewed` as a post-login engagement signal.
- **`.env.local`** — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` set to correct values.

| Event | Description | File |
|---|---|---|
| `cta_get_started_clicked` | User clicks "Get Started" hero CTA | `components/homepage/Hero.tsx` |
| `cta_find_first_match_clicked` | User clicks "Find Your First Match" hero CTA | `components/homepage/Hero.tsx` |
| `navbar_cta_clicked` | User clicks "Start for Free" / "Get Started" in the navbar | `components/layout/Navbar.tsx` |
| `cta_how_it_works_clicked` | User clicks a CTA in the bottom How It Works section (`label`: get_started / learn_more) | `components/homepage/HowItWorks.tsx` |
| `oauth_login_initiated` | User clicks a social login button (`provider`: google / github) | `app/(auth)/login/page.tsx` |
| `auth_callback_success` | OAuth callback completes and user is authenticated | `app/(auth)/callback/page.tsx` |
| `auth_callback_failed` | OAuth callback fails (`reason`: no_user / exception) | `app/(auth)/callback/page.tsx` |
| `dashboard_viewed` | Authenticated user lands on the dashboard | `app/dashboard/page.tsx` |

## Next steps

We've built a dashboard and five insights to monitor user behaviour from day one:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/471351/dashboard/1720972)
- [Login Conversion Funnel](https://us.posthog.com/project/471351/insights/3p0CY3Iu)
- [CTA Clicks by Location](https://us.posthog.com/project/471351/insights/Dt45WokP)
- [Auth Failures Over Time](https://us.posthog.com/project/471351/insights/fJkDHQXK)
- [Daily Active Users (Dashboard Views)](https://us.posthog.com/project/471351/insights/uEKlMvPt)
- [Login Provider Breakdown](https://us.posthog.com/project/471351/insights/gp8H2QYK)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — currently `posthog.identify()` runs in the OAuth callback but not when an existing session is resumed on page load (the `getCurrentUser()` check in `login/page.tsx` detects an active session and redirects without re-identifying).

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
</wizard-report>
