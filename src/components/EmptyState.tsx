import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-line rounded-xl bg-mist/60">
      {Icon && (
        <div className="w-11 h-11 rounded-full bg-paper border border-line flex items-center justify-center mb-4 text-ink-soft">
          <Icon size={20} />
        </div>
      )}
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-ink-soft max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
