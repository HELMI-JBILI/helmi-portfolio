import { FolderGit2, Satellite, Award, BookOpen, Mail, Image as ImageIcon } from 'lucide-react'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

const tiles = [
  { table: 'projects', label: 'Projects', icon: FolderGit2 },
  { table: 'research_projects', label: 'Research Projects', icon: Satellite },
  { table: 'certifications', label: 'Certifications', icon: Award },
  { table: 'publications', label: 'Publications', icon: BookOpen },
  { table: 'contact_messages', label: 'Messages', icon: Mail },
  { table: 'media', label: 'Media Files', icon: ImageIcon },
]

function Tile({ table, label, icon: Icon }: (typeof tiles)[number]) {
  const { data, loading } = useSupabaseQuery<{ id: string }>(table)
  return (
    <div className="rounded-sm border border-line bg-white p-6">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua-50 border border-aqua-200 mb-4">
        <Icon className="h-4 w-4 text-aqua-700" strokeWidth={1.5} />
      </span>
      <p className="font-serif text-3xl text-ink">{loading ? '—' : data.length}</p>
      <p className="mt-1 text-xs text-ink-muted">{label}</p>
    </div>
  )
}

export function DashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-1">Dashboard</h1>
      <p className="text-sm text-ink-muted mb-8">Overview of your portfolio content.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Tile key={t.table} {...t} />
        ))}
      </div>
    </div>
  )
}
