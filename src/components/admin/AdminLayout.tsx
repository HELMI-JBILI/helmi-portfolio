import { type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, FolderGit2, Satellite, Sparkles, GraduationCap,
  Briefcase, Award, BookOpen, FileText, Image as ImageIcon, Mail, Settings, LogOut, ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/admin/research', label: 'Research', icon: Satellite },
  { to: '/admin/skills', label: 'Skills', icon: Sparkles },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/certifications', label: 'Certifications', icon: Award },
  { to: '/admin/publications', label: 'Publications', icon: BookOpen },
  { to: '/admin/cv', label: 'CV', icon: FileText },
  { to: '/admin/media', label: 'Media', icon: ImageIcon },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminLayout({ children }: { children: ReactNode }) {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream-200 lg:flex">
      <aside className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-line bg-cream-100">
        <div className="flex h-16 items-center justify-between px-5 border-b border-line">
          <span className="font-serif text-lg text-ink">Admin</span>
          <a href="/" target="_blank" rel="noreferrer" className="text-ink-muted hover:text-ink" aria-label="View site">
            <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
        <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-sm px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  isActive ? 'bg-ink text-cream-100' : 'text-ink-light hover:bg-cream-300'
                }`
              }
            >
              <item.icon className="h-4 w-4" strokeWidth={1.5} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-line mt-2">
          <p className="px-3 text-[11px] text-ink-muted truncate mb-2">{user?.email}</p>
          <button
            onClick={async () => {
              await signOut()
              navigate('/admin/login')
            }}
            className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-[13px] font-medium text-ink-light hover:bg-cream-300"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10 max-w-6xl">{children}</main>
    </div>
  )
}
