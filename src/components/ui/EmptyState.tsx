import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
}: {
  title: string
  description?: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-line py-16 text-center">
      <Icon className="mb-3 h-6 w-6 text-ink-muted" strokeWidth={1.5} />
      <p className="text-sm font-medium text-ink">{title}</p>
      {description && <p className="mt-1 max-w-xs text-xs text-ink-muted">{description}</p>}
    </div>
  )
}
