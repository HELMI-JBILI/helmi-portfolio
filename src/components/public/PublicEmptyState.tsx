import type { LucideIcon } from 'lucide-react'
import { Radar } from 'lucide-react'

export function PublicEmptyState({
  title,
  description,
  icon: Icon = Radar,
}: {
  title: string
  description?: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-linedark py-16 text-center">
      <Icon className="mb-3 h-5 w-5 text-mist-500" strokeWidth={1.25} />
      <p className="text-sm font-medium text-mist-100">{title}</p>
      {description && <p className="mt-1 max-w-xs text-xs text-mist-500">{description}</p>}
    </div>
  )
}
