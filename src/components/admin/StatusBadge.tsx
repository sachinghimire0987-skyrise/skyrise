export function StatusBadge({ status }: { status: 'draft' | 'published' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        status === 'published' ? 'bg-green-100 text-green-800' : 'bg-mist text-ink-soft border border-mist-line'
      }`}
    >
      {status === 'published' ? 'Published' : 'Draft'}
    </span>
  )
}
