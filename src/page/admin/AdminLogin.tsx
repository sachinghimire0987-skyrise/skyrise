import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AdminLogin() {
  const { session, isConfigured, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const result = await signIn(email, password)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold text-ink text-center mb-1">Sachin Ghimire</h1>
        <p className="text-sm text-ink-soft text-center mb-8">Sign in to the admin panel</p>

        {!isConfigured && (
          <div className="mb-6 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
            <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
            <div>
              Supabase isn't connected yet, so there's no real login. Add <code className="font-mono text-xs">VITE_SUPABASE_URL</code>{' '}
              and <code className="font-mono text-xs">VITE_SUPABASE_ANON_KEY</code> to your <code className="font-mono text-xs">.env</code> file
              &mdash; see README.md &gt; "Connecting Supabase". Until then, the admin panel is viewable but read-only.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-paper border border-line rounded-xl p-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              required
              disabled={!isConfigured}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              required
              disabled={!isConfigured}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent disabled:opacity-50"
            />
          </div>
          {error && <p className="text-sm text-accent">{error}</p>}
          <button
            type="submit"
            disabled={!isConfigured || loading}
            className="w-full rounded-full bg-ink text-paper px-6 py-2.5 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in\u2026' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
