import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Consistent, restrained scroll-reveal used across every public section.
 * Respects prefers-reduced-motion by skipping the transform entirely. */
export function RevealOnScroll({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: reduce ? 0.01 : 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
