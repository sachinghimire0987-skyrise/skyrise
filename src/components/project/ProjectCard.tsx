import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'

const statusLabel: Record<Project['status'], string> = {
  active: 'Active',
  building: 'In progress',
  paused: 'Paused',
  archived: 'Archived',
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col justify-between p-6 rounded-xl border border-line bg-paper hover:border-ink transition-colors h-full"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{project.category}</span>
          <ArrowUpRight size={18} className="text-ink-soft group-hover:text-accent transition-colors shrink-0" />
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{project.name}</h3>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">{project.description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-xs text-ink-soft">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        {statusLabel[project.status]}
      </div>
    </Link>
  )
}
