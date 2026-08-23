import { Helmet } from 'react-helmet-async'
import { PublicShell } from '@/components/layout/PublicShell'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { ResearchDomains } from '@/components/sections/ResearchDomains'
import { Research } from '@/components/sections/Research'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { EducationSection, ExperienceSection } from '@/components/sections/EducationExperience'
import { Certifications } from '@/components/sections/Certifications'
import { Publications } from '@/components/sections/Publications'
import { Contact } from '@/components/sections/Contact'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Helmi Jbili — AI &amp; Data Science Researcher · Earth Observation</title>
        <meta
          name="description"
          content="Helmi Jbili is a Computer Science student and AI & Data Science researcher exploring artificial intelligence, machine learning, computer vision, satellite imagery and Earth observation."
        />
      </Helmet>
      <PublicShell>
        {(profile) => (
          <>
            <Hero profile={profile} />
            <About profile={profile} />
            <ResearchDomains />
            <Research />
            <Projects />
            <Skills />
            <EducationSection />
            <ExperienceSection />
            <Certifications />
            <Publications />
            <Contact profile={profile} />
          </>
        )}
      </PublicShell>
    </>
  )
}
