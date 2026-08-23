import { Helmet } from 'react-helmet-async'
import { usePDF } from '@react-pdf/renderer'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileDown, Printer } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Spinner } from '@/components/ui/Spinner'
import { useCvData } from '@/cv/useCvData'
import { CvDocument } from '@/cv/CvDocument'

function fmt(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function CvPage() {
  const data = useCvData()
  const { profile, education, experience, skillCategories, skills, research, projects, certifications, publications, loading } = data

  const grouped = skillCategories
    .map((c) => ({ cat: c, items: skills.filter((s) => s.category_id === c.id) }))
    .filter((g) => g.items.length > 0)

  const [pdfInstance] = usePDF({
    document: loading ? undefined : (
      <CvDocument
        profile={profile}
        education={education}
        experience={experience}
        skillCategories={skillCategories}
        skills={skills}
        research={research}
        projects={projects}
        certifications={certifications}
        publications={publications}
      />
    ),
  })
  const fileName = `${(profile?.full_name ?? 'Helmi-Jbili').replace(/\s+/g, '-')}-CV.pdf`

  return (
    <div className="min-h-screen bg-cream-200">
      <Helmet>
        <title>Curriculum Vitae — {profile?.full_name ?? 'Helmi Jbili'}</title>
      </Helmet>
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="container-page pt-32 pb-6 print:hidden">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Back to portfolio
        </Link>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif text-3xl text-ink">Curriculum Vitae</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-sm border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
            >
              <Printer className="h-4 w-4" strokeWidth={1.5} /> Print / Save as PDF
            </button>
            {!loading && (
              <a
                href={pdfInstance.url ?? undefined}
                download={fileName}
                aria-disabled={pdfInstance.loading || !pdfInstance.url}
                className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-cream-100 hover:bg-ink-light aria-disabled:pointer-events-none aria-disabled:opacity-50"
              >
                <FileDown className="h-4 w-4" strokeWidth={1.5} />
                {pdfInstance.loading || !pdfInstance.url ? 'Preparing PDF…' : 'Download CV PDF'}
              </a>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="container-page pb-24">
          {/* A4-proportioned HTML preview — mirrors the PDF and doubles as the print fallback */}
          <article
            id="cv-print-area"
            className="mx-auto max-w-[850px] bg-white border border-line shadow-card print:border-0 print:shadow-none"
          >
            <header className="bg-cream-200 p-10 md:p-12 flex items-start justify-between gap-6 print:bg-cream-200">
              <div>
                <h2 className="font-serif text-3xl text-ink">{profile?.full_name}</h2>
                <p className="mt-1 text-aqua-700 text-sm">{profile?.headline} · {profile?.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-light">
                  {profile?.email && <span>{profile.email}</span>}
                  {profile?.phone && <span>{profile.phone}</span>}
                  {profile?.location && <span>{profile.location}</span>}
                  {profile?.github_url && <span>github.com/{profile.github_url.split('/').pop()}</span>}
                </div>
              </div>
              {profile?.avatar_url && (
                <img src={profile.avatar_url} alt="" className="h-20 w-20 rounded-full object-cover border border-line" />
              )}
            </header>

            <div className="p-10 md:p-12">
              {profile?.bio && (
                <section className="mb-8">
                  <h3 className="cv-h">Profile</h3>
                  <p className="text-[13px] leading-relaxed text-ink-light">{profile.bio}</p>
                </section>
              )}

              <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
                <div>
                  {education.length > 0 && (
                    <section className="mb-8">
                      <h3 className="cv-h">Education</h3>
                      {education.map((e) => (
                        <div key={e.id} className="mb-4">
                          <div className="flex justify-between text-[13px]">
                            <span className="font-medium text-ink">{e.degree}</span>
                            <span className="font-mono text-[11px] text-ink-muted">
                              {fmt(e.start_date)} — {e.is_current ? 'Present' : fmt(e.end_date)}
                            </span>
                          </div>
                          <p className="text-[12px] text-ink-light">{e.institution}</p>
                          {e.description && <p className="mt-1 text-[12px] text-ink-muted">{e.description}</p>}
                        </div>
                      ))}
                    </section>
                  )}

                  {research.length > 0 && (
                    <section className="mb-8">
                      <h3 className="cv-h">Research Projects</h3>
                      {research.map((r) => (
                        <div key={r.id} className="mb-4">
                          <p className="text-[13px] font-medium text-ink">{r.title}</p>
                          <p className="text-[12px] text-ink-muted">{r.summary}</p>
                        </div>
                      ))}
                    </section>
                  )}

                  {projects.length > 0 && (
                    <section className="mb-8">
                      <h3 className="cv-h">Professional Projects</h3>
                      {projects.map((p) => (
                        <div key={p.id} className="mb-4">
                          <p className="text-[13px] font-medium text-ink">{p.title}</p>
                          <p className="text-[12px] text-ink-muted">{p.short_description}</p>
                        </div>
                      ))}
                    </section>
                  )}

                  {experience.length > 0 && (
                    <section className="mb-8">
                      <h3 className="cv-h">Experience</h3>
                      {experience.map((e) => (
                        <div key={e.id} className="mb-4">
                          <div className="flex justify-between text-[13px]">
                            <span className="font-medium text-ink">{e.position}</span>
                            <span className="font-mono text-[11px] text-ink-muted">
                              {fmt(e.start_date)} — {e.is_current ? 'Present' : fmt(e.end_date)}
                            </span>
                          </div>
                          <p className="text-[12px] text-ink-light">{e.organization}</p>
                        </div>
                      ))}
                    </section>
                  )}

                  {publications.length > 0 && (
                    <section>
                      <h3 className="cv-h">Publications</h3>
                      {publications.map((p) => (
                        <p key={p.id} className="mb-2 text-[13px] text-ink">
                          {p.title} <span className="text-[11px] text-ink-muted">({p.category})</span>
                        </p>
                      ))}
                    </section>
                  )}
                </div>

                <div>
                  {profile?.research_interests && profile.research_interests.length > 0 && (
                    <section className="mb-8">
                      <h3 className="cv-h">Research Interests</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.research_interests.map((r) => (
                          <span key={r} className="rounded-sm bg-cream-200 px-2 py-0.5 text-[11px] text-ink-light">{r}</span>
                        ))}
                      </div>
                    </section>
                  )}

                  {grouped.length > 0 && (
                    <section className="mb-8">
                      <h3 className="cv-h">Technical Skills</h3>
                      {grouped.map((g) => (
                        <div key={g.cat.id} className="mb-3">
                          <p className="font-mono text-[10px] uppercase tracking-wide text-aqua-700 mb-1">{g.cat.name}</p>
                          {g.items.map((s) => (
                            <p key={s.id} className="text-[12px] text-ink-light">{s.name}</p>
                          ))}
                        </div>
                      ))}
                    </section>
                  )}

                  {certifications.length > 0 && (
                    <section className="mb-8">
                      <h3 className="cv-h">Certifications</h3>
                      {certifications.map((c) => (
                        <div key={c.id} className="mb-2">
                          <p className="text-[12px] font-medium text-ink">{c.name}</p>
                          <p className="text-[11px] text-ink-muted">{c.organization}</p>
                        </div>
                      ))}
                    </section>
                  )}

                  {profile?.languages && profile.languages.length > 0 && (
                    <section>
                      <h3 className="cv-h">Languages</h3>
                      {profile.languages.map((l) => (
                        <p key={l.name} className="text-[12px] text-ink-light">{l.name} — {l.level}</p>
                      ))}
                    </section>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
