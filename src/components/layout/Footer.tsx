import { Github, Linkedin, Facebook, Mail } from 'lucide-react'
import type { Profile } from '@/lib/types'

export function Footer({ profile }: { profile: Profile | null }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-linedark bg-space-950">
      <div className="container-page py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-xl text-mist-100">Helmi Jbili</p>
            <p className="mt-2 eyebrow-lab">AI / Data / Earth Observation</p>
          </div>
          <div className="flex gap-3">
            {profile?.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="social-icon-lab" aria-label="GitHub">
                <Github className="h-4 w-4" strokeWidth={1.5} />
              </a>
            )}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="social-icon-lab" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
              </a>
            )}
            {profile?.facebook_url && (
              <a href={profile.facebook_url} target="_blank" rel="noreferrer" className="social-icon-lab" aria-label="Facebook">
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="social-icon-lab" aria-label="Email">
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-linedark pt-6 text-xs text-mist-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} Helmi Jbili.</p>
          <p className="font-mono">Jendouba, Tunisia</p>
        </div>
      </div>
    </footer>
  )
}
