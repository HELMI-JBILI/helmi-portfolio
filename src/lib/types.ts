// Hand-written types mirroring supabase/schema.sql.
// If you evolve the schema, run `supabase gen types typescript` and replace
// this file for full generated accuracy — this hand-authored version keeps
// the app fully typed without requiring the Supabase CLI to build.

export interface Profile {
  id: string
  user_id: string | null
  full_name: string
  headline: string
  tagline: string
  bio: string
  story: string | null
  passions: string | null
  values_text: string | null
  avatar_url: string | null
  cover_url: string | null
  cv_pdf_url: string | null
  email: string
  phone: string
  location: string
  university: string
  github_url: string
  linkedin_url: string
  facebook_url: string
  research_interests: string[]
  languages: { name: string; level: string }[]
  stats: Record<string, number>
  created_at: string
  updated_at: string
}

export interface SkillCategory {
  id: string
  name: string
  slug: string
  display_order: number
}

export interface Skill {
  id: string
  category_id: string | null
  name: string
  icon: string
  level: string
  description: string
  display_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  start_date: string | null
  end_date: string | null
  is_current: boolean
  description: string
  display_order: number
  published: boolean
}

export interface Experience {
  id: string
  position: string
  organization: string
  location: string
  start_date: string | null
  end_date: string | null
  is_current: boolean
  description: string
  technologies: string[]
  display_order: number
  published: boolean
}

export interface Project {
  id: string
  title: string
  slug: string
  short_description: string
  full_description: string
  category: string
  technologies: string[]
  main_image_url: string | null
  github_url: string | null
  demo_url: string | null
  documentation_url: string | null
  start_date: string | null
  end_date: string | null
  featured: boolean
  published: boolean
  display_order: number
}

export interface ProjectImage {
  id: string
  project_id: string
  image_url: string
  caption: string
  display_order: number
}

export interface ResearchProject {
  id: string
  title: string
  slug: string
  summary: string
  full_description: string
  research_type: string
  methods: string[]
  technologies: string[]
  github_url: string | null
  demo_url: string | null
  documentation_url: string | null
  status: string
  is_priority: boolean
  start_date: string | null
  end_date: string | null
  featured: boolean
  published: boolean
  display_order: number
}

export interface ResearchImage {
  id: string
  research_project_id: string
  image_url: string
  image_type: string
  caption: string
  display_order: number
}

export interface Certification {
  id: string
  name: string
  organization: string
  issue_date: string | null
  credential_id: string
  credential_url: string
  category: string
  image_url: string | null
  pdf_url: string | null
  description: string
  display_order: number
  published: boolean
}

export interface Publication {
  id: string
  title: string
  description: string
  category: string
  cover_image_url: string | null
  pdf_url: string | null
  external_url: string | null
  publication_date: string | null
  display_order: number
  published: boolean
}

export interface MediaFile {
  id: string
  bucket: string
  path: string
  url: string
  file_name: string
  file_type: string
  file_size: number
  folder: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteSettings {
  id: string
  site_title: string
  meta_description: string
  theme: Record<string, unknown>
  maintenance_mode: boolean
}

// Minimal Database type so supabase-js generics resolve without the CLI.
export type Database = Record<string, unknown>
