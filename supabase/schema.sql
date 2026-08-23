-- ============================================================================
-- Helmi Jbili Portfolio — Supabase schema
-- Run this once in Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE where possible.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- helper: auto-update updated_at
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- profiles (singleton row — the site owner)
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null default 'Helmi Jbili',
  headline text not null default 'Computer Science Student & Researcher',
  tagline text not null default 'AI · Earth Observation · Remote Sensing · Data Science',
  bio text not null default '',
  story text default '',
  passions text default '',
  values_text text default '',
  avatar_url text,
  cover_url text,
  cv_pdf_url text,
  email text default '',
  phone text default '',
  location text default 'Tunisia',
  university text default 'University of Jendouba',
  github_url text default '',
  linkedin_url text default '',
  facebook_url text default '',
  research_interests text[] default '{}',
  languages jsonb default '[]', -- [{ "name": "Arabic", "level": "Native" }]
  stats jsonb default '{}',     -- freeform { "books": 3, "recommendations": 7 }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_profiles_updated on profiles;
create trigger trg_profiles_updated before update on profiles
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- skill_categories
-- ---------------------------------------------------------------------------
create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------------
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references skill_categories(id) on delete set null,
  name text not null,
  icon text default 'sparkles',       -- lucide-react icon name
  level text default 'Proficient',     -- Foundational / Proficient / Advanced / Expert
  description text default '',
  display_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_skills_updated on skills;
create trigger trg_skills_updated before update on skills
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- education
-- ---------------------------------------------------------------------------
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  field text default '',
  location text default '',
  start_date date,
  end_date date,
  is_current boolean not null default false,
  description text default '',
  display_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_education_updated on education;
create trigger trg_education_updated before update on education
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- experience
-- ---------------------------------------------------------------------------
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  position text not null,
  organization text not null,
  location text default '',
  start_date date,
  end_date date,
  is_current boolean not null default false,
  description text default '',
  technologies text[] default '{}',
  display_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_experience_updated on experience;
create trigger trg_experience_updated before update on experience
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- projects + project_images
-- ---------------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text default '',
  full_description text default '',
  category text default '',
  technologies text[] default '{}',
  main_image_url text,
  github_url text,
  demo_url text,
  documentation_url text,
  start_date date,
  end_date date,
  featured boolean not null default false,
  published boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_projects_updated on projects;
create trigger trg_projects_updated before update on projects
  for each row execute function set_updated_at();

create table if not exists project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  image_url text not null,
  caption text default '',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- research_projects + research_images
-- ---------------------------------------------------------------------------
create table if not exists research_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text default '',
  full_description text default '',
  research_type text default 'Earth Observation', -- Earth Observation / AI / Remote Sensing ...
  methods text[] default '{}',                     -- NDVI, EVI, NDWI, Change Detection ...
  technologies text[] default '{}',
  github_url text,
  demo_url text,
  documentation_url text,
  status text default 'Implemented',                -- Implemented / Ongoing / Concept
  is_priority boolean not null default false,        -- visually prioritized flag
  start_date date,
  end_date date,
  featured boolean not null default false,
  published boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_research_updated on research_projects;
create trigger trg_research_updated before update on research_projects
  for each row execute function set_updated_at();

create table if not exists research_images (
  id uuid primary key default gen_random_uuid(),
  research_project_id uuid not null references research_projects(id) on delete cascade,
  image_url text not null,
  image_type text default 'screenshot', -- screenshot / architecture / satellite / map / chart
  caption text default '',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- certifications
-- ---------------------------------------------------------------------------
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text not null,
  issue_date date,
  credential_id text default '',
  credential_url text default '',
  category text default '',
  image_url text,
  pdf_url text,
  description text default '',
  display_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_cert_updated on certifications;
create trigger trg_cert_updated before update on certifications
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- publications (books, articles, research papers, technical writing)
-- ---------------------------------------------------------------------------
create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  category text default 'Book', -- Book / Article / Research Paper / Technical Writing / Other
  cover_image_url text,
  pdf_url text,
  external_url text,
  publication_date date,
  display_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_pub_updated on publications;
create trigger trg_pub_updated before update on publications
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- media library
-- ---------------------------------------------------------------------------
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  url text not null,
  file_name text not null,
  file_type text default '',
  file_size bigint default 0,
  folder text default 'general',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contact_messages
-- ---------------------------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text default '',
  message text not null,
  is_read boolean not null default false,
  honeypot text default '', -- spam trap, must stay empty
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- site_settings (singleton)
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text default 'Helmi Jbili — Portfolio',
  meta_description text default '',
  theme jsonb default '{}',
  maintenance_mode boolean not null default false,
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- Public (anon) role: read-only access to published content.
-- Authenticated admin (any row in auth.users, since this is a single-admin
-- site provisioned by the owner) gets full read/write access.
-- Contact messages: public can INSERT only; only authenticated can SELECT/UPDATE/DELETE.
-- ============================================================================

alter table profiles enable row level security;
alter table skill_categories enable row level security;
alter table skills enable row level security;
alter table education enable row level security;
alter table experience enable row level security;
alter table projects enable row level security;
alter table project_images enable row level security;
alter table research_projects enable row level security;
alter table research_images enable row level security;
alter table certifications enable row level security;
alter table publications enable row level security;
alter table media enable row level security;
alter table contact_messages enable row level security;
alter table site_settings enable row level security;

-- profiles: public read, admin write
drop policy if exists "public read profiles" on profiles;
create policy "public read profiles" on profiles for select using (true);
drop policy if exists "admin write profiles" on profiles;
create policy "admin write profiles" on profiles for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- skill_categories
drop policy if exists "public read skill_categories" on skill_categories;
create policy "public read skill_categories" on skill_categories for select using (true);
drop policy if exists "admin write skill_categories" on skill_categories;
create policy "admin write skill_categories" on skill_categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- skills: public reads only published
drop policy if exists "public read skills" on skills;
create policy "public read skills" on skills for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "admin write skills" on skills;
create policy "admin write skills" on skills for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- education
drop policy if exists "public read education" on education;
create policy "public read education" on education for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "admin write education" on education;
create policy "admin write education" on education for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- experience
drop policy if exists "public read experience" on experience;
create policy "public read experience" on experience for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "admin write experience" on experience;
create policy "admin write experience" on experience for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- projects
drop policy if exists "public read projects" on projects;
create policy "public read projects" on projects for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "admin write projects" on projects;
create policy "admin write projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- project_images (inherit via join is complex for RLS; keep simple: public read all, admin write)
drop policy if exists "public read project_images" on project_images;
create policy "public read project_images" on project_images for select using (true);
drop policy if exists "admin write project_images" on project_images;
create policy "admin write project_images" on project_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- research_projects
drop policy if exists "public read research_projects" on research_projects;
create policy "public read research_projects" on research_projects for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "admin write research_projects" on research_projects;
create policy "admin write research_projects" on research_projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- research_images
drop policy if exists "public read research_images" on research_images;
create policy "public read research_images" on research_images for select using (true);
drop policy if exists "admin write research_images" on research_images;
create policy "admin write research_images" on research_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- certifications
drop policy if exists "public read certifications" on certifications;
create policy "public read certifications" on certifications for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "admin write certifications" on certifications;
create policy "admin write certifications" on certifications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- publications
drop policy if exists "public read publications" on publications;
create policy "public read publications" on publications for select using (published = true or auth.role() = 'authenticated');
drop policy if exists "admin write publications" on publications;
create policy "admin write publications" on publications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- media: admin only (not public content, it's the CMS library)
drop policy if exists "admin all media" on media;
create policy "admin all media" on media for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- contact_messages: anyone can insert, only admin can read/update/delete
drop policy if exists "public insert contact_messages" on contact_messages;
create policy "public insert contact_messages" on contact_messages for insert with check (true);
drop policy if exists "admin read contact_messages" on contact_messages;
create policy "admin read contact_messages" on contact_messages for select using (auth.role() = 'authenticated');
drop policy if exists "admin update contact_messages" on contact_messages;
create policy "admin update contact_messages" on contact_messages for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin delete contact_messages" on contact_messages;
create policy "admin delete contact_messages" on contact_messages for delete using (auth.role() = 'authenticated');

-- site_settings
drop policy if exists "public read site_settings" on site_settings;
create policy "public read site_settings" on site_settings for select using (true);
drop policy if exists "admin write site_settings" on site_settings;
create policy "admin write site_settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================================
-- STORAGE BUCKETS
-- Buckets are public-read (for fast <img> delivery) but only the authenticated
-- admin can upload/modify/delete. Create them via storage policies below —
-- Supabase requires buckets to also be created once from the Dashboard or via
-- the snippet at the bottom (storage.buckets insert).
-- ============================================================================

insert into storage.buckets (id, name, public)
values
  ('profile', 'profile', true),
  ('projects', 'projects', true),
  ('research', 'research', true),
  ('certificates', 'certificates', true),
  ('publications', 'publications', true),
  ('cv', 'cv', true),
  ('general', 'general', true)
on conflict (id) do nothing;

drop policy if exists "public read storage" on storage.objects;
create policy "public read storage" on storage.objects for select
  using (bucket_id in ('profile','projects','research','certificates','publications','cv','general'));

drop policy if exists "admin write storage" on storage.objects;
create policy "admin write storage" on storage.objects for insert
  with check (auth.role() = 'authenticated' and bucket_id in ('profile','projects','research','certificates','publications','cv','general'));

drop policy if exists "admin update storage" on storage.objects;
create policy "admin update storage" on storage.objects for update
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin delete storage" on storage.objects;
create policy "admin delete storage" on storage.objects for delete
  using (auth.role() = 'authenticated');

-- ============================================================================
-- Done. Next: run supabase/seed.sql, then create your admin user in
-- Authentication > Users, and confirm the profiles.user_id matches it
-- (or simply leave it null — RLS here checks auth.role(), not a specific user,
-- since this is a single-admin personal site).
-- ============================================================================
