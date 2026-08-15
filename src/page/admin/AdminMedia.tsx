import { Image, AlertCircle } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function AdminMedia() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink mb-1">Media</h1>
      <p className="text-sm text-ink-soft mb-8">Images and files used across articles and projects.</p>

      {!isSupabaseConfigured && (
        <div className="mb-6 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
          <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
          Media uploads require Supabase Storage. Connect a Supabase project and create a storage bucket named{' '}
          <code className="font-mono text-xs">media</code> &mdash; see README.md &gt; "Connecting Supabase".
        </div>
      )}

      <EmptyState
        icon={Image}
        title="No media uploaded yet"
        description="Once Supabase Storage is connected, uploaded images will appear here and can be inserted into articles."
      />
    </div>
  )
}
