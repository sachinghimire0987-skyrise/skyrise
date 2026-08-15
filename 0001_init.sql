-- ---------------------------------------------------------------------------
-- Sachin Ghimire — initial schema
-- Run via: supabase db push  (or paste into the Supabase SQL editor)
-- ---------------------------------------------------------------------------

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- profiles: extends Supabase auth.users with app-specific fields
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  username text unique,
  avatar_url text,
  bio text,
  role text not null default 'reader' check (role in ('admin', 'editor', 'reader')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- authors: public byline info, decoupled from auth.users so bylines can
-- exist even for authors who never log in
-- ---------------------------------------------------------------------------
create table if not exists public.authors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  avatar_url text,
  bio text not null default '',
  role text not null default '',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  color text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- tags
-- ---------------------------------------------------------------------------
create table if not exists public.tags (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- articles
-- ---------------------------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  author_id uuid references public.authors (id) on delete set null,
  category_id uuid references public.categories (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  views integer not null default 0,
  reading_time integer not null default 1,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_category_idx on public.articles (category_id);
create index if not exists articles_published_at_idx on public.articles (published_at desc);

-- ---------------------------------------------------------------------------
-- article_tags: many-to-many join table
-- ---------------------------------------------------------------------------
create table if not exists public.article_tags (
  article_id uuid references public.articles (id) on delete cascade,
  tag_id uuid references public.tags (id) on delete cascade,
  primary key (article_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  long_description text,
  category text not null default '',
  image text,
  link text,
  status text not null default 'active' check (status in ('active', 'building', 'paused', 'archived')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- media: metadata for files stored in the `media` storage bucket
-- ---------------------------------------------------------------------------
create table if not exists public.media (
  id uuid primary key default uuid_generate_v4(),
  file_name text not null,
  url text not null,
  size_bytes bigint not null default 0,
  mime_type text not null default '',
  uploaded_by uuid references auth.users (id) on delete set null,
  uploaded_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- comments (optional; article commenting)
-- ---------------------------------------------------------------------------
create table if not exists public.comments (
  id uuid primary key default uuid_generate_v4(),
  article_id uuid references public.articles (id) on delete cascade,
  author_name text not null,
  author_email text,
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- newsletter_subscribers
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- site_settings: single-row table for global site configuration
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  site_name text not null default 'Sachin Ghimire',
  tagline text not null default '',
  description text not null default '',
  contact_email text not null default '',
  social jsonb not null default '{}'::jsonb
);

insert into public.site_settings (id, site_name, tagline, description, contact_email)
values (true, 'Sachin Ghimire', 'Notes on technology, business, and life in Nepal.',
        'The personal site and publication of Sachin Ghimire.', 'hello@sachinghimire.com')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;
alter table public.projects enable row level security;
alter table public.media enable row level security;
alter table public.comments enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.site_settings enable row level security;

-- Public read access to published content
create policy "Public can read published articles" on public.articles
  for select using (status = 'published');

create policy "Public can read authors" on public.authors for select using (true);
create policy "Public can read categories" on public.categories for select using (true);
create policy "Public can read tags" on public.tags for select using (true);
create policy "Public can read article_tags" on public.article_tags for select using (true);
create policy "Public can read projects" on public.projects for select using (true);
create policy "Public can read site_settings" on public.site_settings for select using (true);
create policy "Public can read approved comments" on public.comments for select using (approved = true);

-- Anyone can subscribe to the newsletter, but not read the list back
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert with check (true);

-- Admins/editors have full access (requires a matching row in profiles)
create policy "Admins manage articles" on public.articles for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins manage projects" on public.projects for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins manage categories" on public.categories for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins manage tags" on public.tags for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins manage media" on public.media for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Admins manage settings" on public.site_settings for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins manage comments" on public.comments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
);
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admins read all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
