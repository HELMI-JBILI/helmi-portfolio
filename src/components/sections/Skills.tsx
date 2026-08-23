import * as Icons from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PublicSpinner } from '@/components/public/PublicSpinner'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import type { Skill, SkillCategory } from '@/lib/types'

function iconFor(name: string) {
  const pascal = name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
  // @ts-expect-error dynamic lucide icon lookup
  return Icons[pascal] ?? Icons.Sparkles
}

export function Skills() {
  const { data: categories, loading: catLoading } = useSupabaseQuery<SkillCategory>('skill_categories', {
    order: { column: 'display_order' },
  })
  const { data: skills, loading } = useSupabaseQuery<Skill>('skills', {
    publicOnly: true,
    order: { column: 'display_order' },
  })

  const grouped = categories
    .map((c) => ({ category: c, items: skills.filter((s) => s.category_id === c.id) }))
    .filter((g) => g.items.length > 0)

  return (
    <section id="stack" className="py-24 md:py-32 border-t border-linedark">
      <div className="container-page">
        <SectionHeading
          eyebrow="05 · Research Stack"
          title="Tools of the"
          emphasis="investigation"
          description="Organized by purpose rather than popularity — the languages, models and infrastructure behind the work above."
        />

        {(loading || catLoading) && <PublicSpinner />}

        <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group, gi) => (
            <RevealOnScroll key={group.category.id} delay={gi * 0.05}>
              <p className="eyebrow-lab mb-4 pb-3 border-b border-linedark">{group.category.name}</p>
              <div className="space-y-3">
                {group.items.map((s) => {
                  const Icon = iconFor(s.icon)
                  return (
                    <div key={s.id} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" strokeWidth={1.5} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[13.5px] font-medium text-mist-100">{s.name}</p>
                          <span className="font-mono text-[9.5px] uppercase tracking-wide text-mist-500">{s.level}</span>
                        </div>
                        {s.description && <p className="mt-0.5 text-xs text-mist-500 leading-relaxed">{s.description}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
