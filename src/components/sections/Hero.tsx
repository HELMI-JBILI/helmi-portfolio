import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Radar } from 'lucide-react'
import { PublicLinkButton } from '@/components/public/PublicButton'
import { useCursorParallax } from '@/components/public/useCursorParallax'
import type { Profile } from '@/lib/types'

export function Hero({ profile }: { profile: Profile | null }) {
  const reduce = useReducedMotion()
  const parallax = useCursorParallax(4)

  return (
    <section id="profile" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="container-page relative grid gap-14 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 mb-8"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-signal-500/40 bg-signal-500/10">
              <Radar className="h-3.5 w-3.5 text-signal-400" strokeWidth={1.5} />
            </span>
            <p className="eyebrow-lab">Computer Science · AI &amp; Data Science Research</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl font-serif text-[2.5rem] leading-[1.06] text-mist-100 text-balance md:text-[3.6rem]"
          >
            {profile?.full_name ?? 'Helmi Jbili'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-mist-300 text-[15px] md:text-base"
          >
            Computer Science Student · AI &amp; Data Science Researcher
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-mist-500"
          >
            Exploring the intersection of artificial intelligence, data and the physical
            world — from satellite imagery to environmental systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <PublicLinkButton href="#research" variant="solid" icon={<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />}>
              View Research
            </PublicLinkButton>
            <PublicLinkButton href="#projects" variant="outline">
              View Projects
            </PublicLinkButton>
            <PublicLinkButton to="/cv" variant="ghost">
              Download CV
            </PublicLinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-linedark pt-7"
          >
            {Object.entries(profile?.stats ?? { books: 3, recommendations: 7, projects: 4 }).map(([key, val]) => (
              <div key={key}>
                <p className="font-mono text-2xl text-mist-100">{String(val).padStart(2, '0')}</p>
                <p className="mt-1 text-[10.5px] uppercase tracking-widest2 text-mist-500">{key}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Portrait — visible immediately, no effects over the face */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={
            reduce
              ? undefined
              : { transform: `translate3d(${parallax.x * -1}px, ${parallax.y * -1}px, 0)` }
          }
          className="relative mx-auto w-full max-w-[320px] lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-sm border border-linedark" aria-hidden />
          <div className="absolute -top-3 left-6 flex items-center gap-1.5 bg-space-950 px-2 font-mono text-[9px] uppercase tracking-widest2 text-signal-400">
            <span className="h-1 w-1 rounded-full bg-signal-400 animate-pulseSlow" /> Live profile
          </div>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-sm border border-linedark bg-space-900">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-xs text-mist-500">
                Profile image — set in Admin → Profile
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-mist-500">
            <span>{profile?.location ?? 'Tunisia'}</span>
            <span>{profile?.university ?? 'University of Jendouba'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
