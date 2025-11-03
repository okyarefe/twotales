## TwoTales — Copilot / Agent Instructions

This file contains concise, repository-specific guidance to help an AI coding agent be productive quickly.

High-level architecture
- Next.js (App Router, Next 15) with TypeScript. Root layout is in `src/app/layout.tsx` and runs server-side (async). Components use a mix of Server and Client components.
- Auth & DB: Supabase is the primary backend. There are two helpers:
  - Server usage: `src/lib/supabase/server.ts` (uses `createServerClient` and Next cookies)
  - Client usage: `src/lib/supabase/client.ts` (browser client for react components)
- AI: OpenAI Responses API is wrapped in `src/services/openai/*`. The client is at `src/services/openai/client.ts` and generation logic is in `generateStory.ts` (uses `zod` schemas to validate parsed responses).

Key developer workflows / commands
- Install: `npm install`
- Dev server: `npm run dev` (runs `next dev`)
- Build: `npm run build` (runs `next build`)
- Start: `npm run start` (runs `next start`)
- Lint: `npm run lint`

Important environment variables (used directly in code)
- `OPENAI_API_KEY` — required by `src/services/openai/client.ts`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — used by both `server.ts` and `client.ts`
- `NEXT_PUBLIC_SITE_URL` — used as the OAuth redirect root in `src/actions/auth.ts`
- `DATABASE_URL` may be mentioned in docs but Supabase is the source of truth in code (see stored procedures below).

Database / persistence notes (important)
- The app talks directly to Supabase using row-level queries and RPCs in `src/lib/supabase/queries.ts` and `src/actions/user-data.ts`.
- Stored procedures / RPCs referenced in code (do not rename without updating usages):
  - `increment_num_stories`
  - `create_quiz_with_questions`
  - `deduct_credit`
- `prisma/schema.prisma` is present but empty — do not assume Prisma is the active DB layer. Changes to DB schema should be coordinated with the Supabase project and its SQL migrations.

Auth pattern and UX
- Google OAuth is wired via `src/actions/auth.ts` using `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })`.
- Server-side user lookup is done in `src/app/layout.tsx` (the layout fetches the user and passes `initialUser`/`initialUserData` into `UserProvider`).
- Client-side session and listeners live in `src/contexts/user-context.tsx` (auth state changes push users to `/dashboard` on sign-in).

OpenAI usage patterns
- Use `openAiClient.responses.create()` or `.parse()` as already used in `src/services/openai/generateStory.ts`.
- The project validates AI outputs with Zod schemas located in `src/services/openai/structured-outputs-schema/*`. Use `zodTextFormat` (from `openai/helpers/zod`) to request structured text and then `JSON.parse` + validate.
- Models and system prompts are centralized in `src/services/openai/config.ts`. Prefer changing prompts/models there.

Project-specific conventions and patterns
- Server actions: functions under `src/actions/*` often have `"use server"` and call `createServerClient()` for Supabase.
- DB helpers: prefer `src/lib/supabase/queries.ts` for inserting/fetching stories and quizzes. Stored procedures are used for transactional or atomic operations.
- Error handling: most server functions throw Error with a user-friendly message (follow the same pattern when adding new server APIs).
- UI state: `UserProvider` is the single place for client-side user data and credits; update it when changing credit flows.

What to avoid / gotchas
- Don't migrate the DB or change RPC names without checking Supabase SQL migrations; the code expects specific RPC names.
- README mentions Drizzle; the runtime code uses Supabase + Prisma package exists but schema is empty. Treat README as partially stale.
- Avoid editing cookie handling in `src/lib/supabase/server.ts` unless you understand Next 15 server-component cookie behavior; `setAll` is intentionally tolerant of server-component calls.

Where to look first when making changes
- Authentication & session flow: `src/actions/auth.ts`, `src/lib/supabase/server.ts`, `src/contexts/user-context.tsx`, `src/app/layout.tsx`
- Story/quiz generation: `src/services/openai/generateStory.ts`, `src/services/openai/client.ts`, `src/services/openai/structured-outputs-schema/*`
- Database interactions and RPCs: `src/lib/supabase/queries.ts`, `src/actions/user-data.ts`

If you add or modify AI prompts
- Centralize prompt & model changes in `src/services/openai/config.ts` and keep schema changes in `structured-outputs-schema`.
- Keep the same validation pattern: request structured JSON with `zodTextFormat`, then `JSON.parse()` and validate against the zod schema. Log raw output on parse failure (existing code logs it).

Questions for the maintainer (when uncertain)
- Should Prisma be removed or fully configured with migrations? (Currently `prisma/schema.prisma` is empty.)
- Where are Supabase migrations / SQL files stored (not in repo) — should agents open an issue before changing DB RPC names?

If anything here is unclear or you want this expanded (e.g., CI steps, test commands, or examples of typical PRs), tell me which parts to expand and I will iterate.
