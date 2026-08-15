import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, FileText, AlertCircle } from 'lucide-react'
import { getAllArticlesForAdmin, deleteArticle } from '@/services/articles'
import { StatusBadge } from '@/components/admin/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'
import Loading from '@/components/ui/Loading'
import { isSupabaseConfigured } from '@/lib/supabase'
import { formatDate } from '@/lib/format'
import type { Article } from '@/types'

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState<string | null>(null)

  function load() {
    setLoading(true)
    getAllArticlesForAdmin().then((a) => {
      setArticles(a)
      setLoading(false)
    })
  }

  useEffect(load, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this article? This cannot be undone.')) return
    const result = await deleteArticle(id)
    if (result.success) {
      load()
    } else {
      setNotice(result.error ?? 'Could not delete article.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Articles</h1>
          <p className="text-sm text-ink-soft mt-1">{articles.length} total</p>
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
        <div className="mb-6 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
          <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
          Viewing local demo articles. Connect Supabase to create, edit, or delete real articles.
        </div>
      )}
      {notice && <p className="mb-4 text-sm text-accent">{notice}</p>}

      {loading ? (
        <Loading label="Loading articles" />
      ) : articles.length === 0 ? (
        <EmptyState icon={FileText} title="No articles yet" description="Create your first article to get started." />
      ) : (
        <div className="rounded-xl border border-line bg-paper overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-mist/60 text-left text-xs uppercase tracking-wide text-ink-soft">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Updated</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-mist-line last:border-none">
                  <td className="px-5 py-4 font-medium text-ink max-w-xs truncate">{a.title}</td>
                  <td className="px-5 py-4 hidden sm:table-cell text-ink-soft">{a.category.name}</td>
                  <td className="px-5 py-4 hidden md:table-cell text-ink-soft">{formatDate(a.updated_at)}</td>
                  <td className="px-5 py-4"><StatusBadge status={a.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link to={`/admin/articles/${a.id}/edit`} className="text-ink-soft hover:text-ink" aria-label="Edit">
                        <Pencil size={16} />
                      </Link>
                      <button onClick={() => handleDelete(a.id)} className="text-ink-soft hover:text-accent" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
