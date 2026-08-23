import { useSupabaseQuery, useSupabaseSingle } from '@/hooks/useSupabaseQuery'
import type {
  Profile,
  Education,
  Experience,
  Skill,
  SkillCategory,
  ResearchProject,
  Project,
  Certification,
  Publication,
} from '@/lib/types'

/** Aggregates every table the CV needs so both the HTML preview and the
 * PDF renderer stay in sync with a single source of truth from Supabase. */
export function useCvData() {
  const profile = useSupabaseSingle<Profile>('profiles')
  const education = useSupabaseQuery<Education>('education', { publicOnly: true, order: { column: 'display_order' } })
  const experience = useSupabaseQuery<Experience>('experience', { publicOnly: true, order: { column: 'display_order' } })
  const skillCategories = useSupabaseQuery<SkillCategory>('skill_categories', { order: { column: 'display_order' } })
  const skills = useSupabaseQuery<Skill>('skills', { publicOnly: true, order: { column: 'display_order' } })
  const research = useSupabaseQuery<ResearchProject>('research_projects', { publicOnly: true, order: { column: 'display_order' } })
  const projects = useSupabaseQuery<Project>('projects', { publicOnly: true, order: { column: 'display_order' } })
  const certifications = useSupabaseQuery<Certification>('certifications', { publicOnly: true, order: { column: 'display_order' } })
  const publications = useSupabaseQuery<Publication>('publications', { publicOnly: true, order: { column: 'display_order' } })

  const loading =
    profile.loading ||
    education.loading ||
    experience.loading ||
    skillCategories.loading ||
    skills.loading ||
    research.loading ||
    projects.loading ||
    certifications.loading ||
    publications.loading

  return {
    loading,
    profile: profile.data,
    education: education.data,
    experience: experience.data,
    skillCategories: skillCategories.data,
    skills: skills.data,
    research: research.data,
    projects: projects.data.filter((p) => p.featured).slice(0, 4),
    certifications: certifications.data,
    publications: publications.data,
  }
}

export type CvData = ReturnType<typeof useCvData>
