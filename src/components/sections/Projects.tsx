import { Link } from 'react-router-dom'
import { Github, ExternalLink, ArrowUpRight, FolderGit2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PublicSpinner } from '@/components/public/PublicSpinner'
import { PublicEmptyState } from '@/components/public/PublicEmptyState'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { FeaturedProject } from '@/components/public/FeaturedProject'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import type { Project } from '@/lib/types'

export function Projects() {
  const { data, loading } = useSupabaseQuery<Project>('projects', {
    publicOnly: true,
    order: { column: 'display_order' },
  })
  const sorted = [...data].sort((a, b) => Number(b.featured) - Number(a.featured))
  const [featured, ...rest] = sorted

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-linedark bg-space-900/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="04 · Projects"
          title="Selected"
          emphasis="projects"
          description="Systems built for scale, security, and real-world data — each one a short case study, not just a card."
        />

        {loading && <PublicSpinner />}
        {!loading && sorted.length === 0 && (
          <div className="mt-12">
            <PublicEmptyState title="No projects published yet" description="Add a project in Admin → Projects." icon={FolderGit2} />
          </div>
        )}

        {featured && (
          <div className="mt-16">
            <FeaturedProject project={featured} />
          </div>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <RevealOnScroll key={p.id} delay={(i % 3) * 0.07}>
              <Link
                to={`/projects/${p.slug}`}
                className="group flex h-full flex-col rounded-sm border border-linedark bg-space-900 p-6 hover:border-signal-500/40 transition-colors"
              >
                {p.main_image_url && (
                  <img src={p.main_image_url} alt={p.title} className="mb-5 h-40 w-full rounded-sm object-cover" loading="lazy" />
                )}
                <p className="eyebrow-lab mb-2">{p.category}</p>
                <h3 className="font-serif text-xl text-mist-100 leading-snug">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist-500">{p.short_description}</p>

                {p.technologies?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.map((t) => (
                      <span key={t} className="rounded-sm bg-space-800 px-2 py-1 font-mono text-[10px] text-mist-300">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between border-t border-linedark pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-mist-300 group-hover:text-signal-300">
                    Case study <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <div className="flex gap-3">
                    {p.github_url && <Github className="h-4 w-4 text-mist-500" strokeWidth={1.5} />}
                    {p.demo_url && <ExternalLink className="h-4 w-4 text-mist-500" strokeWidth={1.5} />}
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
