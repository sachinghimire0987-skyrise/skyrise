import { Link } from 'react-router-dom'
import type { Article } from '@/types'
import { formatDate } from '@/lib/format'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'horizontal' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <Link to={`/articles/${article.slug}`} className="group flex items-start gap-3 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-accent uppercase tracking-wide">{article.category.name}</p>
          <h4 className="mt-1 font-display text-base font-medium leading-snug text-ink group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="mt-1 text-xs text-ink-soft">{formatDate(article.published_at)}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/articles/${article.slug}`} className="group flex gap-5 py-6 border-b border-mist-line last:border-none">
        <div className="w-28 h-20 sm:w-40 sm:h-28 shrink-0 rounded-lg bg-mist overflow-hidden flex items-center justify-center">
          <span className="font-display text-2xl text-line select-none">SG</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-accent uppercase tracking-wide">{article.category.name}</p>
          <h3 className="mt-1 font-display text-lg sm:text-xl font-medium leading-snug text-ink group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 hidden sm:block text-sm text-ink-soft line-clamp-2">{article.excerpt}</p>
          <p className="mt-2 text-xs text-ink-soft">
            {formatDate(article.published_at)} &middot; {article.reading_time} min read
          </p>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/articles/${article.slug}`} className="group block">
      <div className="aspect-[4/3] rounded-xl bg-mist overflow-hidden flex items-center justify-center border border-mist-line">
        <span className="font-display text-4xl text-line select-none">SG</span>
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium text-accent uppercase tracking-wide">{article.category.name}</p>
        <h3 className="mt-1.5 font-display text-xl font-medium leading-snug text-ink group-hover:text-accent transition-colors line-clamp-2 text-balance">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-ink-soft line-clamp-2">{article.excerpt}</p>
        <p className="mt-3 text-xs text-ink-soft">
          {formatDate(article.published_at)} &middot; {article.reading_time} min read
        </p>
      </div>
    </Link>
  )
}
