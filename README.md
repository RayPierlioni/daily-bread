# Daily Bread Hub

A production-minded MVP for a peaceful Christian devotional, prayer, apologetics, and community hub.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS v4
- Prisma with SQLite for local development
- Prisma with Postgres/Supabase for production
- NextAuth/Auth.js with Google OAuth support and a local demo sign-in fallback
- Zod validation and React Hook Form
- Server actions plus API routes

## Local Development

1. Copy the local environment template:

```bash
cp .env.example .env
```

2. Keep local SQLite enabled:

```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
```

Google OAuth is optional locally. If Google credentials are blank, use the demo sign-in buttons at `/signin`.

3. Install dependencies:

```bash
pnpm install
```

4. Create and seed the local SQLite database:

```bash
pnpm db:migrate --name init
pnpm db:seed
```

If Prisma Migrate is unavailable in a locked-down local runtime, use:

```bash
pnpm db:push
pnpm db:seed
```

5. Run the app:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Accounts

- Demo user: `demo@dailybreadhub.local`
- Admin user: `admin@dailybreadhub.local`
- First-time assessment demo: click **Try first-time assessment** on `/signin`

The first-time assessment demo creates a fresh local review user, redirects to onboarding, saves the spiritual assessment, and starts the user on the sequential `Daily Bread Foundations` devotional track.

## Production Deployment Overview

Daily Bread Hub is a full-stack Next.js app. It should be deployed as a Node.js app, not copied into static hosting.

The recommended low-friction production setup is:

```text
GitHub repo -> Hostinger Managed Node.js app
                         |
                    Supabase Postgres
```

Vercel can also host the app, but Hostinger plus Supabase keeps the app closer to the hosting direction already discussed.

## Production Environment Variables

Use `.env.production.example` as the source of truth for the variables that must be pasted into the hosting dashboard.

Required:

```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="a-long-random-production-secret"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

Optional:

```bash
OPENAI_API_KEY="..."
OPENAI_MODEL="gpt-5-mini"
```

If `OPENAI_API_KEY` is not set, Ask in Faith first checks the curated Daily Bread Hub whitelist for common questions, then uses the built-in mock answer generator for non-whitelisted questions. That keeps the app usable without creating automatic AI bills during the first launch.

## Prisma Schemas

This project has two Prisma schemas:

- `prisma/schema.prisma` for local SQLite
- `prisma/schema.postgres.prisma` for production Postgres/Supabase

The `postinstall`, `prebuild`, and `db:generate` scripts automatically choose the correct schema based on `DATABASE_URL`.

If `DATABASE_URL` starts with `file:`, the app generates the SQLite client.
If `DATABASE_URL` starts with `postgres://` or `postgresql://`, the app generates the Postgres client.

## Production Database Setup

After creating a Supabase project and copying the Postgres connection strings into the host as `DATABASE_URL` and `DIRECT_URL`, initialize the production database:

```bash
pnpm db:generate:postgres
pnpm db:push:postgres
pnpm db:seed
```

For the first MVP launch, `db:push:postgres` is the simplest way to create the schema in Supabase. Before a larger public launch, replace this with formal Prisma migrations.

## Hostinger Deployment Checklist

1. Put this project in a GitHub repository.
2. In Hostinger, create a Managed Node.js web app if your plan supports it.
3. Connect Hostinger to the GitHub repository.
4. Set the install command:

```bash
pnpm install
```

5. Set the build command:

```bash
pnpm build
```

6. Set the start command:

```bash
pnpm start
```

7. Paste the production environment variables from `.env.production.example`.
8. Run the production database setup commands once.
9. Deploy.
10. Connect the domain.

## Google OAuth Setup

In Google Cloud Console, create OAuth credentials for a web application.

Add this authorized redirect URI after the domain is known:

```text
https://yourdomain.com/api/auth/callback/google
```

For local testing, also add:

```text
http://localhost:3000/api/auth/callback/google
```

Then paste the credentials into the hosting dashboard:

```bash
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## Production Readiness Commands

Before deploying:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

On the hosting service, after environment variables are set:

```bash
pnpm deploy:check
```

`deploy:check` confirms that required production environment variables are present and that `DATABASE_URL` is a Postgres connection string.

## Product Notes

- Prayers, faith questions, and spiritual assessment records are private by default.
- Signed-in users receive a sequential devotional track based on onboarding.
- The first production-style path is `Daily Bread Foundations`, a seeded 365-day ordered curriculum.
- Missing days does not skip readings; the next devotional is determined by the user's saved progress.
- Ask in Faith includes a curated whitelist of common questions so the app can answer many starter questions for free before any paid AI provider is used.
- Audio prayer recording is implemented with the browser `MediaRecorder` API where supported.
- Audio transcription, notifications, direct messaging, analytics, and richer AI personalization are prepared as future features.
