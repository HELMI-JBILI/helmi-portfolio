import clsx from 'clsx'
import type { ReactNode } from 'react'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-sm border border-line bg-white px-2.5 py-1 text-[11px] font-mono tracking-wide text-ink-light',
        className
      )}
    >
      {children}
    </span>
  )
}
