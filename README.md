# Helmi Jbili — Portfolio & Research Platform

A production-ready personal portfolio, research profile, and CMS for **Helmi Jbili**
(Computer Science student · AI · Earth Observation researcher). Built with React,
TypeScript, Vite, Tailwind CSS, Framer Motion, and Supabase (Postgres + Auth + Storage),
designed for Netlify deployment.

## What's included

- **Public site** (`/`) — dark "research lab" visual identity (near-black,
  off-white, cyan/violet accents, a Canvas-based scientific background, an
  interactive research-domains constellation) with Hero, Research
  Statement/About, Research Domains, Research (flagship: Tunisia Land Surface
  Analysis Platform), Projects with a large Featured Project + a per-project
  case-study page at `/projects/:slug`, Skills as a "Research Stack,"
  Education/Experience timelines, Certifications, Publications, Contact.
- **CV** (`/cv`) — deliberately left as a clean print/PDF-oriented document,
  not part of the dark redesign. A database-driven A4 CV with a real vector
  PDF download (`@react-pdf/renderer`) and a Print/Save-as-PDF fallback. It
  updates automatically whenever you edit Profile, Education, Experience,
  Skills, Research, Projects, Certifications, or Publications.
- **Admin dashboard** (`/admin`, Supabase-Auth-protected) — full CRUD for every content
  type, a media library backed by Supabase Storage, a contact-message inbox, and site
  settings. There is no public sign-up and no admin link anywhere on the public site.
- **Supabase schema** (`supabase/schema.sql`) — every table, Row Level Security policy,
  and storage bucket the app needs.
- **Seed data** (`supabase/seed.sql`) — the real content from the current site
  (helmijbilicv.netlify.app) plus the Tunisia Land Surface Analysis Platform description
  you provided. Anything not supplied (book titles, the ISI Kef program description) is
  left as a clearly labeled editable placeholder — nothing was invented.

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → New project.
2. Once it's provisioned, open **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and run it. This creates every table, RLS policy, and the
   7 storage buckets (`profile`, `projects`, `research`, `certificates`, `publications`,
   `cv`, `general`).
3. Run `supabase/seed.sql` the same way to load the starting content.
4. Go to **Authentication → Users → Add user** and create yourself an admin account
   (email + password). This is the *only* account that can sign in to `/admin` — there's
   no separate admin flag; anyone who can authenticate against your Supabase project is
   treated as the admin, which is correct for a single-owner site.

## 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your project's URL and anon key, from
**Project Settings → API** in the Supabase dashboard:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Never put your `service_role` key here or anywhere in frontend code — the anon key plus
Row Level Security is what keeps public visitors read-only and only your authenticated
admin account able to write.

## 3. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. Sign in at `/admin/login` with the user you created above.

## 4. Deploy to Netlify

1. Push this project to a GitHub repo.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build command `npm run build`, publish directory `dist` (already set in
   `netlify.toml`, along with SPA redirect rules so client-side routing works).
4. Under **Site settings → Environment variables**, add `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` with the same values as your `.env`.
5. Deploy. `/admin` is not linked from the public site, but it's not secret either —
   access control is enforced by Supabase Auth + RLS, not by hiding the URL.

## Project structure

```
supabase/
  schema.sql        Tables, RLS policies, storage buckets
  seed.sql          Real starting content
src/
  lib/              Supabase client, hand-authored TS types
  hooks/            useSupabaseQuery / useSupabaseSingle (generic data fetching)
  context/          Supabase Auth context
  components/
    ui/             Buttons, modals, form fields, badges…
    layout/         Navbar, Footer
    sections/       Hero, About, Research, Projects, Skills, timelines, Contact
    admin/          AdminLayout, ResourceCrud (generic config-driven CRUD), ImageUploader
  pages/            HomePage, CvPage, NotFoundPage
  pages/admin/      Dashboard, Profile, and one page per content type
  cv/               CvDocument (react-pdf) + useCvData aggregation hook
```

Most admin CRUD screens (Projects, Research, Skills, Education, Experience,
Certifications, Publications) are thin config objects passed into a single generic
`ResourceCrud` component — extend the schema, add a field to the config, and the list
view, create/edit modal, publish/feature toggles, reordering, and image uploads all
follow automatically.

## Content policy

Nothing here was invented. Where the brief referenced content not present on the
existing site (e.g. exact book titles, the ISI Kef program description), the seed data
leaves an explicit `Add … in Admin → …` placeholder instead of fabricating details —
fill those in from the Admin dashboard whenever you have the real text.

## Notes & honest limitations

- This was built and type-checked (`tsc -b`) and production-built (`vite build`)
  successfully in a sandboxed environment against placeholder Supabase credentials —
  but it has **not** been run against a live Supabase project or deployed to Netlify by
  this process, since that requires your own accounts/credentials. Please do a quick
  smoke test (sign in, create a project, upload an image, submit the contact form)
  after you connect your real project.
- Skill icons use `lucide-react` names in kebab-case (e.g. `brain-circuit`,
  `bar-chart-3`) — browse available icons at lucide.dev.
- The main JS bundle is code-split so `/cv` (which pulls in the PDF renderer) and the
  entire `/admin` dashboard load lazily and don't weigh down the public homepage.
