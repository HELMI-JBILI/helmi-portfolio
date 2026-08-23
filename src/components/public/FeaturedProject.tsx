import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import type { Project } from '@/lib/types'

/** Large, immersive presentation for the single most important project —
 * a "mission" rather than a card in a grid. Only renders real project data. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <RevealOnScroll>
      <article className="relative overflow-hidden rounded-sm border border-signal-500/25 bg-space-900">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14 order-2 lg:order-1">
            <p className="eyebrow-lab mb-4">Mission 01 · Featured Project</p>
            <h3 className="font-serif text-3xl md:text-4xl text-mist-100 leading-tight">{project.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-mist-300">{project.short_description}</p>
            {project.full_description && (
              <p className="mt-3 text-sm leading-relaxed text-mist-500 line-clamp-4">{project.full_description}</p>
            )}

            {project.technologies?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 8).map((t) => (
                  <span key={t} className="rounded-sm border border-linedark px-2 py-1 font-mono text-[10.5px] text-mist-300">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-mist-100 hover:text-signal-300">
                View case study <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-mist-500 hover:text-mist-100">
                  <Github className="h-3.5 w-3.5" /> Repository
                </a>
              )}
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-mist-500 hover:text-mist-100">
                  <ExternalLink className="h-3.5 w-3.5" /> Demo
                </a>
              )}
            </div>
          </div>

          <div className="relative order-1 lg:order-2 min-h-[280px] lg:min-h-[420px] bg-space-800">
            {project.main_image_url ? (
              <img src={project.main_image_url} alt={project.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-mist-500">
                Add a main image in Admin → Projects
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-space-950/70 via-transparent to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>
      </article>
    </RevealOnScroll>
  )
}
