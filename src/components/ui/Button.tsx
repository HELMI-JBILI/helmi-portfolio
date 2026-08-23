import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-ink text-cream-100 hover:bg-ink-light',
  secondary: 'bg-aqua-500 text-white hover:bg-aqua-600',
  outline: 'border border-ink/20 text-ink hover:border-ink/50 bg-transparent',
  ghost: 'text-ink hover:bg-ink/5',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-4 py-2 gap-1.5',
  md: 'text-sm px-6 py-3 gap-2',
}

const base =
  'inline-flex items-center justify-center font-medium tracking-wide rounded-sm transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none'

export const Button = forwardRef<HTMLButtonElement, BaseProps & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = 'primary', size = 'md', icon, children, className, ...rest }, ref) => (
    <button ref={ref} className={clsx(base, variantClasses[variant], sizeClasses[size], className)} {...rest}>
      {children}
      {icon}
    </button>
  )
)
Button.displayName = 'Button'

export function LinkButton({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
}: BaseProps & { to?: string; href?: string }) {
  const cls = clsx(base, variantClasses[variant], sizeClasses[size], className)
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
