import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'

export function LoginPage() {
  const { session, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: err } = await signIn(email, password)
    if (err) setError(err)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-200 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-aqua-300 bg-aqua-50">
            <Lock className="h-4.5 w-4.5 text-aqua-700" strokeWidth={1.5} />
          </span>
          <h1 className="font-serif text-2xl text-ink">Admin Sign In</h1>
          <p className="mt-1 text-sm text-ink-muted">Helmi Jbili — Portfolio CMS</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-sm border border-line bg-white p-7">
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-line bg-white px-3 py-2.5 text-sm focus:border-aqua-400 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-line bg-white px-3 py-2.5 text-sm focus:border-aqua-400 focus:outline-none"
            />
          </div>
          {error && <p className="mb-4 text-xs text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-ink-muted">
          Admin users are created in Supabase → Authentication → Users. There is no public sign-up.
        </p>
      </div>
    </div>
  )
}
