import { ExternalLink } from 'lucide-react'

export function CvAdminPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-1">CV</h1>
      <p className="text-sm text-ink-muted mb-8 max-w-xl">
        The CV is generated automatically from your Profile, Education, Experience, Skills, Research,
        Projects, Certifications and Publications — there's nothing separate to edit here. Update any of
        those sections and the CV (both the on-site preview and the downloadable PDF) updates immediately.
      </p>
      <a
        href="/cv"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-cream-100 hover:bg-ink-light"
      >
        Open live CV <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
      </a>
    </div>
  )
}
