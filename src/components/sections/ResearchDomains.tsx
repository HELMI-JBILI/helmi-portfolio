import { SectionHeading } from '@/components/ui/SectionHeading'
import { RevealOnScroll } from '@/components/public/RevealOnScroll'
import { ResearchConstellation } from '@/components/public/ResearchConstellation'

export function ResearchDomains() {
  return (
    <section id="research-domains" className="py-24 md:py-32 border-t border-linedark bg-space-900/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="02 · Research Domains"
          title="A network of"
          emphasis="connected fields"
          description="Artificial intelligence, data and Earth observation don't operate in isolation — each domain informs the next."
        />
        <RevealOnScroll delay={0.1} className="mt-16">
          <ResearchConstellation />
        </RevealOnScroll>
      </div>
    </section>
  )
}
