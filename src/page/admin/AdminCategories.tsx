import { useEffect, useState } from 'react'
import { Tag as TagIcon, AlertCircle } from 'lucide-react'
import { getCategories } from '@/services/taxonomy'
import { isSupabaseConfigured } from '@/lib/supabase'
import Loading from '@/components/ui/Loading'
import type { Category } from '@/types'

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink mb-1">Categories</h1>
      <p className="text-sm text-ink-soft mb-8">Organize articles into topics.</p>

      {!isSupabaseConfigured && (
        <div className="mb-6 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
          <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
          Categories are defined in <code className="font-mono text-xs">src/data/taxonomy.ts</code> until Supabase is connected.
          Editing here will be enabled once the <code className="font-mono text-xs">categories</code> table is live.
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="rounded-xl border border-line bg-paper divide-y divide-mist-line">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center gap-4 px-5 py-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${c.color}1a` }}
              >
                <TagIcon size={15} style={{ color: c.color ?? undefined }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{c.name}</p>
                {c.description && <p className="text-xs text-ink-soft mt-0.5 truncate">{c.description}</p>}
              </div>
              <span className="ml-auto text-xs font-mono text-ink-soft">/{c.slug}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
