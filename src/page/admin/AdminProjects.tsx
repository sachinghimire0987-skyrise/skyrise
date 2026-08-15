import { useEffect, useState } from 'react'
import { AlertCircle, ExternalLink } from 'lucide-react'
import { getProjects } from '@/services/projects'
import { isSupabaseConfigured } from '@/lib/supabase'
import Loading from '@/components/ui/Loading'
import type { Project } from '@/types'

const statusStyle: Record<Project['status'], string> = {
  active: 'bg-green-100 text-green-800',
  building: 'bg-amber-100 text-amber-800',
  paused: 'bg-mist text-ink-soft border border-mist-line',
  archived: 'bg-mist text-ink-soft border border-mist-line',
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects().then((p) => {
      setProjects(p)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Projects</h1>
          <p className="text-sm text-ink-soft mt-1">{projects.length} total</p>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-6 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
          <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
          Viewing local demo projects from <code className="font-mono text-xs">src/data/projects.ts</code>. Connect Supabase to add
          or edit projects here.
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="rounded-xl border border-line bg-paper overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-mist/60 text-left text-xs uppercase tracking-wide text-ink-soft">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-mist-line last:border-none">
                  <td className="px-5 py-4 font-medium text-ink">{p.name}</td>
                  <td className="px-5 py-4 hidden sm:table-cell text-ink-soft">{p.category}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer noopener" className="text-ink-soft hover:text-ink inline-flex">
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <span className="text-ink-soft text-xs">&mdash;</span>
                    )}
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
