import { GraduationCap, Briefcase } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PublicSpinner } from '@/components/public/PublicSpinner'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import type { Education, Experience } from '@/lib/types'

function formatRange(start: string | null, end: string | null, current: boolean) {
  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  const s = start ? fmt(start) : ''
  const e = current ? 'Present' : end ? fmt(end) : ''
  return [s, e].filter(Boolean).join(' — ')
}

function Timeline<T extends { id: string; display_order: number }>({
  items,
  renderItem,
}: {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}) {
  return (
    <div className="relative border-l border-linedark pl-8">
      {items
        .sort((a, b) => a.display_order - b.display_order)
        .map((item, i) => (
          <RevealOnScroll key={item.id} delay={i * 0.06} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-signal-400 bg-space-950" />
            {renderItem(item)}
          </RevealOnScroll>
        ))}
    </div>
  )
}

export function EducationSection() {
  const { data, loading } = useSupabaseQuery<Education>('education', {
    publicOnly: true,
    order: { column: 'display_order' },
  })
  return (
    <section id="education" className="py-24 md:py-32 border-t border-linedark bg-space-900/40">
      <div className="container-page grid gap-14 lg:grid-cols-[280px_1fr]">
        <div>
          <SectionHeading eyebrow="06 · Education" title="Education" />
          <GraduationCap className="mt-8 hidden h-8 w-8 text-signal-500/40 lg:block" strokeWidth={1.25} />
        </div>
        <div>
          {loading && <PublicSpinner />}
          <Timeline
            items={data}
            renderItem={(e) => (
              <div>
                <p className="font-mono text-[10.5px] text-signal-400">{formatRange(e.start_date, e.end_date, e.is_current)}</p>
                <h3 className="mt-1 font-serif text-lg text-mist-100">{e.degree}</h3>
                <p className="text-sm text-mist-300">{e.institution}{e.location ? ` · ${e.location}` : ''}</p>
                {e.description && <p className="mt-2 text-sm text-mist-500 leading-relaxed">{e.description}</p>}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}

export function ExperienceSection() {
  const { data, loading } = useSupabaseQuery<Experience>('experience', {
    publicOnly: true,
    order: { column: 'display_order' },
  })
  if (!loading && data.length === 0) return null
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-linedark">
      <div className="container-page grid gap-14 lg:grid-cols-[280px_1fr]">
        <div>
          <SectionHeading eyebrow="07 · Experience" title="Experience" />
          <Briefcase className="mt-8 hidden h-8 w-8 text-signal-500/40 lg:block" strokeWidth={1.25} />
        </div>
        <div>
          {loading && <PublicSpinner />}
          <Timeline
            items={data}
            renderItem={(e) => (
              <div>
                <p className="font-mono text-[10.5px] text-signal-400">{formatRange(e.start_date, e.end_date, e.is_current)}</p>
                <h3 className="mt-1 font-serif text-lg text-mist-100">{e.position}</h3>
                <p className="text-sm text-mist-300">{e.organization}{e.location ? ` · ${e.location}` : ''}</p>
                {e.description && <p className="mt-2 text-sm text-mist-500 leading-relaxed">{e.description}</p>}
                {e.technologies?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.technologies.map((t) => (
                      <span key={t} className="rounded-sm border border-linedark px-2 py-1 font-mono text-[10px] text-mist-300">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}
