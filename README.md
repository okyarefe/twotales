# TwoTales

[Try it live](https://www.twotalesai.com/login)

## Description

TwoTales is an AI-powered storytelling platform designed to help language learners improve their skills through engaging, personalized stories and quizzes. Users can generate stories in English and a target language, track their progress, and test their understanding with quizzes.

## Why?

Learning a new language can be challenging, especially when it comes to reading comprehension and vocabulary. TwoTales solves this by providing sentence-aligned stories in multiple languages, tailored to the learner’s level and interests. The platform also generates quizzes to reinforce learning, making language acquisition interactive and fun.

## Tech Stack

This project is built with Next.js, TypeScript, Supabase, OpenAI API, and Lemon Squeezy.
It uses Supabase for authentication and database, OpenAI for AI-powered story and quiz generation, and Supabase CLI for database migrations.

![TwoTales](/public/twotalesimage.png)

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker Desktop](https://docs.docker.com/desktop/) (required for local Supabase)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (installed as a dev dependency)

### 1. Install dependencies

```sh
npm install
```

### 2. Set up environment variables

This project uses separate env files per environment (Next.js loads them automatically):

- **`.env`** — shared variables (OpenAI, Stripe, Lemon Squeezy)
- **`.env.development`** — local Supabase credentials (used by `npm run dev`)
- **`.env.production`** — production Supabase credentials (used by `npm run build`)

Create these files in the root directory with the following variables:

**`.env`** (shared):
- `OPENAI_API_KEY` — OpenAI API key for story and quiz generation
- `NEXT_PUBLIC_SITE_URL` — Base URL for your site (e.g., `http://localhost:3000`)
- `LEMONSQUEEZY_API_KEY` — Lemon Squeezy API key
- `LEMONSQUEEZY_STORE_ID` — Lemon Squeezy store ID
- `LEMONSQUEEZY_WEBHOOK_SECRET` — Secret for verifying webhook signatures

**`.env.development`** (local dev):
- `NEXT_PUBLIC_SUPABASE_URL` — Local Supabase URL (`http://127.0.0.1:54321`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Local Supabase anon key
- `SERVICE_KEY` — Local Supabase service role key

**`.env.production`** (production):
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anon public key
- `SERVICE_KEY` — Server-only service role key (never expose to client)

### 3. Start local Supabase

Make sure Docker Desktop is running, then:

```sh
npx supabase start
```

This starts a local Supabase instance with all your tables, functions, and seed data.

### 4. Run the development server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app connects to your local Supabase — not production.

### Local Supabase tools

- **Dashboard:** http://127.0.0.1:54323
- **Reset local DB:** `npx supabase db reset` (re-applies migrations + seed data)
- **Stop local Supabase:** `npx supabase stop`

### Database migrations

Schema changes are tracked as SQL migration files in `supabase/migrations/`.

```sh
npx supabase migration new <migration_name>   # Create a new migration file
npx supabase db push                           # Apply migrations to remote DB
npx supabase db reset                          # Reset local DB from migrations
```

## Usage

- Sign in with Google to create an account.
- Generate a new story by selecting a language, level, and providing a prompt.
- Read stories side-by-side in English and your target language.
- Save sentences from stories as flashcards for review.
- Track your flashcard progress as you learn.
- Take quizzes to test your comprehension.
- Track your credits and progress on the dashboard.

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and submit a pull request.
4. Ensure your code follows the project’s style and passes linting (`npm run lint`).

For questions or suggestions, open an issue or join the discussion.

---

Happy storytelling and language learning!
