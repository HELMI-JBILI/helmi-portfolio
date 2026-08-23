import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Spinner } from '@/components/ui/Spinner'

// Code-split the CV page (pulls in @react-pdf/renderer) and the entire admin
// dashboard out of the public-visitor bundle — neither is needed for the
// first paint of the portfolio itself.
const CvPage = lazy(() => import('@/pages/CvPage').then((m) => ({ default: m.CvPage })))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })))
const LoginPage = lazy(() => import('@/pages/admin/LoginPage').then((m) => ({ default: m.LoginPage })))
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const ProfileAdmin = lazy(() => import('@/pages/admin/ProfileAdmin').then((m) => ({ default: m.ProfileAdmin })))
const ProjectsAdmin = lazy(() => import('@/pages/admin/ProjectsAdmin').then((m) => ({ default: m.ProjectsAdmin })))
const ResearchAdmin = lazy(() => import('@/pages/admin/ResearchAdmin').then((m) => ({ default: m.ResearchAdmin })))
const SkillsAdmin = lazy(() => import('@/pages/admin/SkillsAdmin').then((m) => ({ default: m.SkillsAdmin })))
const EducationAdmin = lazy(() => import('@/pages/admin/EducationAdmin').then((m) => ({ default: m.EducationAdmin })))
const ExperienceAdmin = lazy(() => import('@/pages/admin/ExperienceAdmin').then((m) => ({ default: m.ExperienceAdmin })))
const CertificationsAdmin = lazy(() => import('@/pages/admin/CertificationsAdmin').then((m) => ({ default: m.CertificationsAdmin })))
const PublicationsAdmin = lazy(() => import('@/pages/admin/PublicationsAdmin').then((m) => ({ default: m.PublicationsAdmin })))
const CvAdminPage = lazy(() => import('@/pages/admin/CvAdminPage').then((m) => ({ default: m.CvAdminPage })))
const MediaAdmin = lazy(() => import('@/pages/admin/MediaAdmin').then((m) => ({ default: m.MediaAdmin })))
const MessagesAdmin = lazy(() => import('@/pages/admin/MessagesAdmin').then((m) => ({ default: m.MessagesAdmin })))
const SettingsAdmin = lazy(() => import('@/pages/admin/SettingsAdmin').then((m) => ({ default: m.SettingsAdmin })))

function Admin({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Spinner className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/cv" element={<CvPage />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<Admin><DashboardPage /></Admin>} />
        <Route path="/admin/profile" element={<Admin><ProfileAdmin /></Admin>} />
        <Route path="/admin/projects" element={<Admin><ProjectsAdmin /></Admin>} />
        <Route path="/admin/research" element={<Admin><ResearchAdmin /></Admin>} />
        <Route path="/admin/skills" element={<Admin><SkillsAdmin /></Admin>} />
        <Route path="/admin/education" element={<Admin><EducationAdmin /></Admin>} />
        <Route path="/admin/experience" element={<Admin><ExperienceAdmin /></Admin>} />
        <Route path="/admin/certifications" element={<Admin><CertificationsAdmin /></Admin>} />
        <Route path="/admin/publications" element={<Admin><PublicationsAdmin /></Admin>} />
        <Route path="/admin/cv" element={<Admin><CvAdminPage /></Admin>} />
        <Route path="/admin/media" element={<Admin><MediaAdmin /></Admin>} />
        <Route path="/admin/messages" element={<Admin><MessagesAdmin /></Admin>} />
        <Route path="/admin/settings" element={<Admin><SettingsAdmin /></Admin>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
