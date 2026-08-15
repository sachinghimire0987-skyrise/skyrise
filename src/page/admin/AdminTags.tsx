import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { getTags } from '@/services/taxonomy'
import { isSupabaseConfigured } from '@/lib/supabase'
import Loading from '@/components/ui/Loading'
import type { Tag } from '@/types'

export default function AdminTags() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTags().then((t) => {
      setTags(t)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink mb-1">Tags</h1>
      <p className="text-sm text-ink-soft mb-8">Fine-grained labels used across articles.</p>

      {!isSupabaseConfigured && (
        <div className="mb-6 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
          <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
          Tags are defined in <code className="font-mono text-xs">src/data/taxonomy.ts</code> until Supabase is connected.
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t.id} className="px-3.5 py-2 rounded-full bg-paper border border-line text-sm text-ink">
              #{t.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
