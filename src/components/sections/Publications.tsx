import { BookOpen, ExternalLink, FileDown } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PublicSpinner } from '@/components/public/PublicSpinner'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import type { Publication } from '@/lib/types'

export function Publications() {
  const { data, loading } = useSupabaseQuery<Publication>('publications', {
    publicOnly: true,
    order: { column: 'display_order' },
  })
  if (!loading && data.length === 0) return null

  return (
    <section id="publications" className="py-24 md:py-32 border-t border-linedark">
      <div className="container-page">
        <SectionHeading
          eyebrow="09 · Publications"
          title="Publications &"
          emphasis="writing"
          description="Books and technical writing, including works donated to Arab public libraries. Artwork shown at full size — not a slider."
        />
        {loading && <PublicSpinner />}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p, i) => (
            <RevealOnScroll key={p.id} delay={(i % 3) * 0.07}>
              <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-linedark bg-space-900">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-space-800">
                  {p.cover_image_url ? (
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <BookOpen className="h-10 w-10 text-mist-500" strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-space-950/90 to-transparent p-4">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-signal-300">
                      {p.category}
                      {p.publication_date && ` · ${new Date(p.publication_date).getFullYear()}`}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-lg text-mist-100 leading-snug">{p.title}</h3>
                  {p.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-mist-500">{p.description}</p>
                  )}
                  <div className="mt-5 flex gap-5 border-t border-linedark pt-4">
                    {p.external_url && (
                      <a
                        href={p.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-mist-300 hover:text-signal-300"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View
                      </a>
                    )}
                    {p.pdf_url && (
                      <a
                        href={p.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-mist-300 hover:text-signal-300"
                      >
                        <FileDown className="h-3.5 w-3.5" /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
