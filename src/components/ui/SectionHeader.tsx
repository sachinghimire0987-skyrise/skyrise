import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  action?: { label: string; to: string }
  children?: ReactNode
}

export default function SectionHeader({ eyebrow, title, description, action, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{eyebrow}</p>}
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink text-balance">{title}</h2>
        {description && <p className="mt-2 text-ink-soft max-w-xl">{description}</p>}
        {children}
      </div>
      {action && (
        <Link
          to={action.to}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors shrink-0"
        >
          {action.label}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}
