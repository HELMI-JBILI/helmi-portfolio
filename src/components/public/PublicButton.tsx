// Public-only button. Deliberately NOT the same file as
// src/components/ui/Button.tsx, which the Admin Dashboard depends on —
// keeping them separate means this redesign can never affect admin visuals.
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

type Variant = 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const variants: Record<Variant, string> = {
  solid: 'bg-mist-100 text-space-950 hover:bg-signal-300',
  outline: 'border border-linedark text-mist-100 hover:border-signal-400/60 hover:text-signal-300',
  ghost: 'text-mist-300 hover:text-mist-100',
}
const sizes: Record<Size, string> = {
  sm: 'text-xs px-4 py-2 gap-1.5',
  md: 'text-[13px] px-6 py-3 gap-2',
}
const base =
  'inline-flex items-center justify-center font-medium tracking-wide rounded-sm transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none'

export const PublicButton = forwardRef<HTMLButtonElement, BaseProps & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = 'solid', size = 'md', icon, children, className, ...rest }, ref) => (
    <button ref={ref} className={clsx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {icon}
    </button>
  )
)
PublicButton.displayName = 'PublicButton'

export function PublicLinkButton({
  to,
  href,
  variant = 'solid',
  size = 'md',
  icon,
  children,
  className,
}: BaseProps & { to?: string; href?: string }) {
  const cls = clsx(base, variants[variant], sizes[size], className)
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
        {icon}
      </Link>
    )
  }
  return (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={cls}>
      {children}
      {icon}
    </a>
  )
}
