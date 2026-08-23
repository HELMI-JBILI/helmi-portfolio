import { type ReactNode } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScientificBackground } from '@/components/public/ScientificBackground'
import { useSupabaseSingle } from '@/hooks/useSupabaseQuery'
import type { Profile } from '@/lib/types'

/** Shared shell for every public (non-admin, non-CV) page: applies the dark
 * "research lab" theme, mounts one persistent ambient network background
 * (fixed to the viewport, behind everything), the redesigned Navbar/Footer,
 * and supplies the profile record once so pages don't each re-fetch it. */
export function PublicShell({ children }: { children: (profile: Profile | null) => ReactNode }) {
  const { data: profile } = useSupabaseSingle<Profile>('profiles')
  return (
    <div className="public-shell min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <ScientificBackground />
      </div>
      <Navbar />
      <main>{children(profile)}</main>
      <Footer profile={profile} />
    </div>
  )
}
