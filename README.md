# Sachin Ghimire

A personal site and digital publication for Sachin Ghimire, combining a
portfolio/personal-brand section with an editorial publication (articles,
categories, an author page) and an admin panel for managing content.

Built with React, TypeScript, Vite, Tailwind CSS, and a Supabase-ready
data layer.

---

## Tech stack

- **React 19 + TypeScript** — UI and types
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — styling, via `@tailwindcss/vite`
- **React Router v7** — routing (public site + admin panel)
- **Supabase** — auth, database, and storage (optional — the site runs on
  local demo data until you connect it)
- **Lucide React** — icons

---

## 1. Installation

```bash
npm install
```

## 2. Local development

```bash
npm run dev
```

The site runs at `http://localhost:5173` using the demo content in
`src/data/` (5 sample articles, 3 sample projects, sample categories/tags).
Nothing is saved anywhere yet — that's expected until Supabase is connected.

The admin panel is at `/admin`. Without Supabase connected, it's viewable
but read-only: every write action (saving an article, deleting a project,
etc.) shows a clear message instead of pretending to save.

## 3. Environment variables

Copy the example file:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | For live data | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | For live data | Your Supabase project's anon/public API key |
| `VITE_SITE_URL` | Optional | Used for canonical URLs, e.g. `https://sachinghimire.com` |

## 4. Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and **anon public
   key** into your `.env` file.
3. Run the schema migration in `supabase/migrations/0001_init.sql`:
   - Easiest: open the Supabase SQL Editor and paste the file's contents, or
   - With the Supabase CLI: `supabase link` then `supabase db push`.
4. Create a Storage bucket named `media` (used by the admin Media page).
5. Restart the dev server (`npm run dev`). The site will now read and write
   through Supabase instead of the local demo data in `src/data/`.

The schema includes: `profiles`, `authors`, `categories`, `tags`,
`articles`, `article_tags`, `projects`, `media`, `comments`,
`newsletter_subscribers`, and `site_settings`, with row-level security
policies — public read access to published content, and admin/editor-only
write access based on a `role` column in `profiles`.

### Creating an admin user

1. In Supabase, go to **Authentication → Users** and create a user (or sign
   one up through your own flow).
2. In the SQL Editor, give that user an admin role:
   ```sql
   insert into public.profiles (id, full_name, role)
   values ('<user-uuid-from-auth-users>', 'Sachin Ghimire', 'admin');
   ```
3. Sign in at `/admin/login` with that user's email and password.

## 5. Database setup summary

All tables, indexes, and RLS policies are defined in
`supabase/migrations/0001_init.sql`. Re-run it any time on a fresh project —
it uses `create table if not exists` and `on conflict do nothing` so it's
safe to re-apply.

## 6. Adding articles

**Without Supabase connected:** edit `src/data/articles.ts` directly. Each
entry follows the `Article` type in `src/types/index.ts`. This is the
fastest way to add real content before a backend is wired up.

**With Supabase connected:** go to `/admin/articles/new`. Fill in the title
(the slug auto-fills, editable), excerpt, content (HTML is supported),
category, tags, cover image URL, and SEO fields, then **Publish** or **Save
as draft**. Existing articles can be edited or deleted from `/admin/articles`.

## 7. Adding projects

**Without Supabase connected:** edit `src/data/projects.ts`, following the
`Project` type.

**With Supabase connected:** insert rows into the `projects` table (an
in-admin project editor can be added the same way the article editor works,
using `src/services/projects.ts`'s `saveProject`).

## 8. Project structure

```
src/
  components/     Reusable UI (layout, article, project, admin, ui)
  layouts/        SiteLayout (public) and AdminLayout (admin panel)
  pages/          Route-level components, including pages/admin/*
  routes/         ProtectedRoute for admin auth guarding
  hooks/          (reserved for shared hooks)
  lib/            Supabase client, formatting helpers
  services/       Data-access layer — Supabase-aware with local fallbacks
  types/          Shared TypeScript types
  data/           Local demo/placeholder content
  context/        AuthContext (Supabase session)
public/
  images/, favicon/
supabase/
  migrations/     SQL schema
```

## 9. Deploying to Vercel

1. Push this project to a Git repository.
2. Import it in [Vercel](https://vercel.com/new).
3. Vercel will detect the Vite framework automatically (also configured
   explicitly in `vercel.json`).
4. Add the same environment variables from `.env` in **Project Settings →
   Environment Variables**.
5. Deploy. `vercel.json` includes a rewrite so client-side routing (e.g.
   `/articles/some-slug`) works correctly on refresh.

## 10. Notes on placeholder content

The demo articles and projects shipped in `src/data/` are clearly
illustrative — written to show how the site looks and behaves with real
content, not presented as real published work. Replace or remove them once
you're adding your own.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Type-check and build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
