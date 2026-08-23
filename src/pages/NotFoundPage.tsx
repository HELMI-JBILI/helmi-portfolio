import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream-200 px-6 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-serif text-3xl text-ink">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-ink-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-sm bg-ink px-6 py-3 text-sm font-medium text-cream-100">
        Back home
      </Link>
    </div>
  )
}
