import { Loader2 } from 'lucide-react'

export default function Loading({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-20 text-ink-soft" role="status" aria-live="polite">
      <Loader2 size={18} className="animate-spin" />
      <span className="text-sm">{label}&hellip;</span>
    </div>
  )
}
