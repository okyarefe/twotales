# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Next.js dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint with Next.js rules
- `npm install` — Install dependencies

No test framework is configured.

## Architecture

**TwoTales** is a Next.js 15 App Router application (TypeScript, React 19) for AI-powered language learning. Users authenticate with Google, spend credits to generate bilingual stories via OpenAI, then take quizzes on the generated content.

### Key layers

- **Auth & DB:** Supabase (PostgreSQL). Server client at `src/lib/supabase/server.ts`, browser client at `src/lib/supabase/client.ts`. Prisma package exists but schema is empty — Supabase is the active DB layer.
- **AI generation:** OpenAI Responses API wrapped in `src/services/openai/`. Model and system prompts centralized in `config.ts`. Outputs validated with Zod schemas in `structured-outputs-schema/`.
- **Server actions:** `src/actions/*` — all marked `"use server"`, call `createServerClient()` for Supabase access.
- **DB queries:** `src/lib/supabase/queries/` — row-level queries and RPCs. Critical stored procedures: `increment_num_stories`, `create_quiz_with_questions`, `deduct_credit`. Do not rename RPCs without updating Supabase SQL migrations.
- **Client state:** `src/contexts/user-context.tsx` — `UserProvider` / `useUser()` hook manages auth session and user data (credits, profile). This is the single source of truth for client-side user state.
- **UI:** Tailwind CSS 4 + Shadcn UI (new-york style, Radix primitives) in `src/components/ui/`. Animations via Framer Motion.
- **Payments:** Lemon Squeezy integration with webhook handler at `src/app/api/webhooks/lemonsqueezy/route.ts`.

### Auth flow

1. Google OAuth initiated via `src/actions/auth.ts`
2. Callback at `/auth/callback`
3. Server-side: `src/app/layout.tsx` fetches user, passes to `UserProvider`
4. Client-side: `user-context.tsx` manages session listeners, redirects on sign-in

### Path alias

`@/*` maps to `src/*` (configured in tsconfig.json).

### Design tokens

Custom fonts: Outfit (sans) and Fraunces (serif). Custom sizes: `hero`, `hero-sm`, `display`, `subtitle`. Custom colors: `accent-gold`, `accent-gold-light`, `text-muted`, `text-light` (defined in `tailwind.config.ts`).

## Gotchas

- README mentions Drizzle — this is stale. Runtime code uses Supabase directly.
- Don't edit cookie handling in `src/lib/supabase/server.ts` without understanding Next 15 server-component cookie behavior; `setAll` is intentionally tolerant of server-component calls.
- DB schema changes must be coordinated with the Supabase project; SQL migrations are not stored in this repo.
- Error handling pattern: server functions throw `Error` with user-friendly messages. Follow this convention.
- AI prompt/model changes go in `src/services/openai/config.ts`. Schema changes go in `structured-outputs-schema/`. Keep the `zodTextFormat` → `JSON.parse` → validate pattern.

## Environment variables

- `OPENAI_API_KEY` — OpenAI API access
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase client config
- `SERVICE_KEY` — Supabase service role key (server-side only)
- `NEXT_PUBLIC_SITE_URL` — OAuth redirect root
- `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_WEBHOOK_SECRET` — Payment processing
