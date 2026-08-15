import { useState } from 'react'
import { subscribeToNewsletter } from '@/services/newsletter'
import { ArrowRight, Check } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    const result = await subscribeToNewsletter(email)
    if (result.success) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
      setMessage(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-ink font-medium">
        <Check size={18} className="text-accent" />
        You're subscribed. Thanks for reading.
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-full border border-line bg-paper px-5 py-3 text-sm outline-none focus-visible:border-accent"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending' : 'Subscribe'}
          <ArrowRight size={15} />
        </button>
      </form>
      {status === 'error' && <p className="mt-2 text-xs text-accent">{message}</p>}
    </div>
  )
}
