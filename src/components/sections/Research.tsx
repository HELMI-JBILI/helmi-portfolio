import { Leaf, Satellite, GitBranch, ExternalLink, FileText } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PublicSpinner } from '@/components/public/PublicSpinner'
import { PublicEmptyState } from '@/components/public/PublicEmptyState'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import type { ResearchProject, ResearchImage } from '@/lib/types'

export function Research() {
  const { data: projects, loading } = useSupabaseQuery<ResearchProject>('research_projects', {
    publicOnly: true,
    order: { column: 'display_order' },
  })
  const { data: images } = useSupabaseQuery<ResearchImage>('research_images', {
    order: { column: 'display_order' },
  })

  const sorted = [...projects].sort((a, b) => Number(b.is_priority) - Number(a.is_priority))

  return (
    <section id="research" className="py-24 md:py-32 border-t border-linedark">
      <div className="container-page">
        <SectionHeading
          eyebrow="03 · Research"
          title="From orbit"
          emphasis="to insight"
          description="Applied research combining satellite imagery, geospatial data science and machine learning to study land surface conditions."
        />

        {loading && <PublicSpinner />}
        {!loading && sorted.length === 0 && (
          <div className="mt-12">
            <PublicEmptyState title="No research published yet" description="Add a research project in Admin → Research." icon={Satellite} />
          </div>
        )}

        <div className="mt-16 space-y-16">
          {sorted.map((project, idx) => {
            const gallery = images.filter((i) => i.research_project_id === project.id)
            return (
              <RevealOnScroll key={project.id} delay={idx * 0.05}>
                <article
                  className={`relative overflow-hidden rounded-sm border p-7 md:p-10 grid gap-10 ${
                    project.is_priority
                      ? 'border-signal-500/30 bg-space-900 md:grid-cols-[1.1fr_0.9fr]'
                      : 'border-linedark bg-space-900/60 md:grid-cols-2'
                  }`}
                >
                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-500/30 bg-signal-500/10 px-3 py-1 font-mono text-[10.5px] text-signal-300">
                        <Satellite className="h-3 w-3" /> {project.research_type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-linedark px-3 py-1 font-mono text-[10.5px] text-mist-300">
                        {project.status}
                      </span>
                      {project.is_priority && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-mist-100 px-3 py-1 font-mono text-[10.5px] text-space-950">
                          Mission 01 · Flagship
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl md:text-[1.85rem] text-mist-100 leading-snug">{project.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-mist-300">{project.summary}</p>
                    <p className="mt-4 text-sm leading-relaxed text-mist-500">{project.full_description}</p>

                    {project.methods?.length > 0 && (
                      <div className="mt-6">
                        <p className="eyebrow-lab mb-2 flex items-center gap-1.5">
                          <Leaf className="h-3 w-3" /> Methods &amp; indices
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.methods.map((m) => (
                            <span key={m} className="rounded-sm border border-linedark px-2 py-1 font-mono text-[10.5px] text-mist-300">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.technologies?.length > 0 && (
                      <div className="mt-4">
                        <p className="eyebrow-lab mb-2 flex items-center gap-1.5">
                          <GitBranch className="h-3 w-3" /> Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((t) => (
                            <span key={t} className="rounded-sm bg-space-800 px-2 py-1 font-mono text-[10.5px] text-mist-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-4">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-mist-100 hover:text-signal-300">
                          <ExternalLink className="h-3.5 w-3.5" /> Repository
                        </a>
                      )}
                      {project.documentation_url && (
                        <a href={project.documentation_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-mist-100 hover:text-signal-300">
                          <FileText className="h-3.5 w-3.5" /> Documentation
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-mist-100 hover:text-signal-300">
                          <ExternalLink className="h-3.5 w-3.5" /> Live demo
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative grid grid-cols-2 gap-3 content-start">
                    {gallery.length > 0 ? (
                      gallery.slice(0, 4).map((img) => (
                        <figure key={img.id} className="overflow-hidden rounded-sm border border-linedark bg-space-800">
                          <img src={img.image_url} alt={img.caption} className="h-32 w-full object-cover md:h-40 grayscale-[15%] contrast-[1.05]" loading="lazy" />
                          {img.caption && <figcaption className="px-2 py-1.5 font-mono text-[9.5px] text-mist-500">{img.caption}</figcaption>}
                        </figure>
                      ))
                    ) : (
                      <div className="col-span-2 flex h-40 items-center justify-center rounded-sm border border-dashed border-linedark font-mono text-[11px] text-mist-500">
                        Add screenshots, maps &amp; architecture diagrams in Admin → Research
                      </div>
                    )}
                  </div>
                </article>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
