import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  eyebrow: string
  title: string
  emphasis?: string
  description?: string
  align?: 'left' | 'center'
}

// NOTE: only ever imported by public section components (verified: no
// src/pages/admin or src/components/admin usage) — safe to restyle in place
// for the dark "research lab" theme without touching the Admin Dashboard.
export function SectionHeading({ eyebrow, title, emphasis, description, align = 'left' }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: reduce ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}
    >
      <p className="eyebrow-lab mb-4">{eyebrow}</p>
      <h2 className="text-3xl md:text-[2.6rem] leading-[1.1] text-mist-100 text-balance">
        {title}
        {emphasis && <em className="text-signal-400 not-italic font-serif italic"> {emphasis}</em>}
      </h2>
      {description && <p className="mt-4 text-mist-500 text-[15px] leading-relaxed max-w-xl">{description}</p>}
    </motion.div>
  )
}
