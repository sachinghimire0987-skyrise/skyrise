import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, CheckCircle2, PenLine, FolderKanban, Eye, AlertCircle, Plus } from 'lucide-react'
import { getAdminOverviewStats } from '@/services/stats'
import { isSupabaseConfigured } from '@/lib/supabase'
import type { AdminOverviewStats } from '@/types'

const statCards = [
  { key: 'totalArticles' as const, label: 'Total articles', icon: FileText },
  { key: 'publishedArticles' as const, label: 'Published', icon: CheckCircle2 },
  { key: 'draftArticles' as const, label: 'Drafts', icon: PenLine },
  { key: 'totalProjects' as const, label: 'Projects', icon: FolderKanban },
  { key: 'totalViews' as const, label: 'Total views', icon: Eye },
]

export default function AdminOverview() {
  const [stats, setStats] = useState<AdminOverviewStats | null>(null)

  useEffect(() => {
    getAdminOverviewStats().then(setStats)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Overview</h1>
          <p className="text-sm text-ink-soft mt-1">A snapshot of your content.</p>
        </div>
        <Link
          to="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          <Plus size={16} />
          New article
        </Link>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-8 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
          <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
          <div>
            Showing local demo data. Numbers below reflect the sample content in <code className="font-mono text-xs">src/data</code>,
            not a live database. Connect Supabase to track real content and views &mdash; see README.md.
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div key={card.key} className="rounded-xl border border-line bg-paper p-5">
            <card.icon size={18} className="text-accent" />
            <p className="mt-3 font-display text-2xl font-semibold text-ink">{stats ? stats[card.key] : '\u2013'}</p>
            <p className="mt-1 text-xs text-ink-soft">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <Link to="/admin/articles" className="rounded-xl border border-line bg-paper p-6 hover:border-ink transition-colors">
          <h2 className="font-display text-lg font-semibold text-ink">Manage articles</h2>
          <p className="mt-1.5 text-sm text-ink-soft">Edit, publish, or remove articles.</p>
        </Link>
        <Link to="/admin/projects" className="rounded-xl border border-line bg-paper p-6 hover:border-ink transition-colors">
          <h2 className="font-display text-lg font-semibold text-ink">Manage projects</h2>
          <p className="mt-1.5 text-sm text-ink-soft">Add or update projects on the site.</p>
        </Link>
      </div>
    </div>
  )
}
