import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Github, ExternalLink, FileText, Calendar } from 'lucide-react'
import { PublicShell } from '@/components/layout/PublicShell'
import { PublicSpinner } from '@/components/public/PublicSpinner'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import type { Project, ProjectImage } from '@/lib/types'

function fmt(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: matches, loading } = useSupabaseQuery<Project>('projects', {
    publicOnly: true,
    filter: { slug },
  })
  const project = matches[0] ?? null

  const { data: allProjects } = useSupabaseQuery<Project>('projects', {
    publicOnly: true,
    order: { column: 'display_order' },
  })
  const { data: allImages } = useSupabaseQuery<ProjectImage>('project_images', {
    order: { column: 'display_order' },
  })

  const gallery = project ? allImages.filter((i) => i.project_id === project.id) : []
  const related = project
    ? allProjects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3)
    : []

  return (
    <PublicShell>
      {() => (
        <div className="pt-32 pb-24">
          <Helmet>
            <title>{project ? `${project.title} — Helmi Jbili` : 'Project — Helmi Jbili'}</title>
            {project?.short_description && <meta name="description" content={project.short_description} />}
          </Helmet>

          <div className="container-page">
            <Link to="/#projects" className="inline-flex items-center gap-1.5 text-sm text-mist-500 hover:text-mist-100">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Back to projects
            </Link>
          </div>

          {loading && <PublicSpinner className="mt-16" />}

          {!loading && !project && (
            <div className="container-page mt-20 text-center">
              <p className="font-serif text-2xl text-mist-100">Project not found</p>
              <p className="mt-2 text-sm text-mist-500">It may have been unpublished or the link is out of date.</p>
              <Link to="/" className="mt-6 inline-flex rounded-sm bg-mist-100 px-6 py-3 text-sm font-medium text-space-950">
                Back home
              </Link>
            </div>
          )}

          {!loading && project && (
            <article className="mt-8">
              <div className="container-page">
                <RevealOnScroll>
                  <p className="eyebrow-lab mb-4">{project.category || 'Engineering Project'}</p>
                  <h1 className="max-w-3xl font-serif text-4xl md:text-[3.2rem] leading-[1.05] text-mist-100 text-balance">
                    {project.title}
                  </h1>
                  {project.short_description && (
                    <p className="mt-6 max-w-2xl text-lg text-mist-300 leading-relaxed">{project.short_description}</p>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-linedark pt-6">
                    {(project.start_date || project.end_date) && (
                      <span className="inline-flex items-center gap-2 font-mono text-xs text-mist-500">
                        <Calendar className="h-3.5 w-3.5" />
                        {fmt(project.start_date)}{project.end_date ? ` — ${fmt(project.end_date)}` : ''}
                      </span>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-mist-100 hover:text-signal-300">
                        <Github className="h-4 w-4" strokeWidth={1.5} /> Repository
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-mist-100 hover:text-signal-300">
                        <ExternalLink className="h-4 w-4" strokeWidth={1.5} /> Live demo
                      </a>
                    )}
                    {project.documentation_url && (
                      <a href={project.documentation_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-mist-100 hover:text-signal-300">
                        <FileText className="h-4 w-4" strokeWidth={1.5} /> Documentation
                      </a>
                    )}
                  </div>
                </RevealOnScroll>
              </div>

              {project.main_image_url && (
                <RevealOnScroll delay={0.1} className="container-page mt-12">
                  <div className="relative overflow-hidden rounded-sm border border-linedark">
                    <img src={project.main_image_url} alt={project.title} className="w-full max-h-[520px] object-cover" />
                  </div>
                </RevealOnScroll>
              )}

              <div className="container-page mt-16 grid gap-16 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  {project.full_description && (
                    <RevealOnScroll>
                      <p className="eyebrow-lab mb-3">Overview</p>
                      <p className="text-[15px] leading-relaxed text-mist-300 whitespace-pre-line">{project.full_description}</p>
                    </RevealOnScroll>
                  )}

                  {gallery.length > 0 && (
                    <RevealOnScroll delay={0.1} className="mt-14">
                      <p className="eyebrow-lab mb-4">Gallery</p>
                      <div className="grid grid-cols-2 gap-3">
                        {gallery.map((img) => (
                          <figure key={img.id} className="overflow-hidden rounded-sm border border-linedark bg-space-900">
                            <img src={img.image_url} alt={img.caption} className="h-44 w-full object-cover" loading="lazy" />
                            {img.caption && <figcaption className="px-3 py-2 font-mono text-[10px] text-mist-500">{img.caption}</figcaption>}
                          </figure>
                        ))}
                      </div>
                    </RevealOnScroll>
                  )}
                </div>

                <div className="space-y-10">
                  {project.technologies?.length > 0 && (
                    <RevealOnScroll delay={0.05}>
                      <p className="eyebrow-lab mb-3">Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span key={t} className="rounded-sm border border-linedark px-2.5 py-1 font-mono text-[10.5px] text-mist-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </RevealOnScroll>
                  )}

                  {related.length > 0 && (
                    <RevealOnScroll delay={0.1}>
                      <p className="eyebrow-lab mb-3">Related projects</p>
                      <div className="space-y-3">
                        {related.map((r) => (
                          <Link
                            key={r.id}
                            to={`/projects/${r.slug}`}
                            className="block rounded-sm border border-linedark bg-space-900 p-4 hover:border-signal-500/40 transition-colors"
                          >
                            <p className="text-sm font-medium text-mist-100">{r.title}</p>
                            <p className="mt-1 text-xs text-mist-500 line-clamp-2">{r.short_description}</p>
                          </Link>
                        ))}
                      </div>
                    </RevealOnScroll>
                  )}
                </div>
              </div>
            </article>
          )}
        </div>
      )}
    </PublicShell>
  )
}
