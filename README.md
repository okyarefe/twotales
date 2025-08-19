# TwoTales

## Description

TwoTales is an AI-powered storytelling platform designed to help language learners improve their skills through engaging, personalized stories and quizzes. Users can generate stories in English and a target language, track their progress, and test their understanding with quizzes.

## Why?

Learning a new language can be challenging, especially when it comes to reading comprehension and vocabulary. TwoTales solves this by providing sentence-aligned stories in multiple languages, tailored to the learner’s level and interests. The platform also generates quizzes to reinforce learning, making language acquisition interactive and fun.

## Tech Stack

This project is built with Next.js, TypeScript, Supabase, OpenAI API, and Drizzle ORM.  
It uses Supabase for authentication and database, OpenAI for AI-powered story and quiz generation, and Drizzle for ORM.

## Quick Start

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**
   Before running the project, create a `.env.local` file in the root directory and add the following variables:

  - `DATABASE_URL`: Your PostgreSQL connection string (from Supabase).
  - `OPENAI_API_KEY`: Your OpenAI API key for story and quiz generation.
  - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon public key.
  - `NEXT_PUBLIC_SITE_URL`: The base URL for your site (e.g., `http://localhost:3000`).

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Sign in with Google to create an account.
- Generate a new story by selecting a language, level, and providing a prompt.
- Read stories side-by-side in English and your target language.
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
