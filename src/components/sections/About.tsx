import { PublicSpinner } from '@/components/public/PublicSpinner'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Profile } from '@/lib/types'

export function About({ profile }: { profile: Profile | null }) {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-linedark">
      <div className="container-page">
        <SectionHeading eyebrow="01 · About" title="Exploring the world" emphasis="through data." />

        <div className="mt-12 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll>
            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-mist-300 font-serif">
              {profile?.bio ??
                'My work applies computational methods — artificial intelligence, machine learning and data science — to understand real-world systems: satellite imagery, environmental patterns, and the physical world at large.'}
            </p>
            {profile?.research_interests && profile.research_interests.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {profile.research_interests.map((r) => (
                  <span key={r} className="rounded-sm border border-linedark bg-space-900 px-3 py-1.5 font-mono text-[11px] text-mist-300">
                    {r}
                  </span>
                ))}
              </div>
            )}
          </RevealOnScroll>

          <div className="space-y-8">
            {[
              { title: 'Curiosity', body: profile?.story },
              { title: 'Passions', body: profile?.passions },
              { title: 'Values', body: profile?.values_text },
            ]
              .filter((b) => b.body)
              .map((block, i) => (
                <RevealOnScroll key={block.title} delay={i * 0.08}>
                  <p className="eyebrow-lab mb-2">{block.title}</p>
                  <p className="text-[14.5px] leading-relaxed text-mist-500">{block.body}</p>
                </RevealOnScroll>
              ))}
            {!profile && <PublicSpinner />}
          </div>
        </div>
      </div>
    </section>
  )
}
