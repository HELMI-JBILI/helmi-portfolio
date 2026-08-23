import { Award, ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PublicSpinner } from '@/components/public/PublicSpinner'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import type { Certification } from '@/lib/types'

export function Certifications() {
  const { data, loading } = useSupabaseQuery<Certification>('certifications', {
    publicOnly: true,
    order: { column: 'display_order' },
  })
  if (!loading && data.length === 0) return null

  return (
    <section id="certifications" className="py-24 md:py-32 border-t border-linedark bg-space-900/40">
      <div className="container-page">
        <SectionHeading eyebrow="08 · Recognition" title="Certifications" />
        {loading && <PublicSpinner />}
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((c, i) => (
            <RevealOnScroll key={c.id} delay={(i % 3) * 0.06} className="flex gap-4 rounded-sm border border-linedark bg-space-900 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-signal-500/30 bg-signal-500/10">
                <Award className="h-4.5 w-4.5 text-signal-400" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-wide text-mist-500">{c.category}</p>
                <h3 className="mt-0.5 font-serif text-base text-mist-100 leading-snug">{c.name}</h3>
                <p className="text-xs text-mist-300">{c.organization}</p>
                {c.description && <p className="mt-2 text-xs text-mist-500 leading-relaxed">{c.description}</p>}
                {c.credential_url && (
                  <a href={c.credential_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-signal-400 hover:underline">
                    Verify credential <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
