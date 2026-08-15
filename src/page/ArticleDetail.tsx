import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react'
import Seo from '@/components/Seo'
import Loading from '@/components/ui/Loading'
import ArticleCard from '@/components/article/ArticleCard'
import { getArticleBySlug, getPublishedArticles } from '@/services/articles'
import { formatDate } from '@/lib/format'
import type { Article } from '@/types'

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null | undefined>(undefined)
  const [all, setAll] = useState<Article[]>([])

  useEffect(() => {
    if (!slug) return
    setArticle(undefined)
    Promise.all([getArticleBySlug(slug), getPublishedArticles()]).then(([a, list]: [Article | null, Article[]]) => {
      setArticle(a)
      setAll(list)
    })
  }, [slug])

  if (article === undefined) return <Loading label="Loading article" />
  if (article === null || article.status !== 'published') return <Navigate to="/articles" replace />

  const related = all.filter((a: any) => a.id !== article.id && a.category.id === article.category.id).slice(0, 3)
  const currentIndex = all.findIndex((a: any) => a.id === article.id)
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null
  const next = currentIndex >= 0 && currentIndex < all.length - 1 ? all[currentIndex + 1] : null

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: article!.title, url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <>
      <Seo
        title={article.seo_title || article.title}
        description={article.seo_description || article.excerpt}
        type="article"
      />

      <article className="container-editorial py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Link to="/articles" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-8">
            <ArrowLeft size={15} />
            All articles
          </Link>

          <Link
            to={`/categories/${article.category.slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-accent"
          >
            {article.category.name}
          </Link>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-semibold leading-tight text-ink text-balance">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
            <Link to={`/author/${article.author.slug}`} className="font-medium text-ink hover:text-accent">
              {article.author.name}
            </Link>
            <span>&middot;</span>
            <span>{formatDate(article.published_at)}</span>
            <span>&middot;</span>
            <span>{article.reading_time} min read</span>
            <button
              onClick={handleShare}
              className="ml-auto inline-flex items-center gap-1.5 text-ink-soft hover:text-ink"
              aria-label="Share this article"
            >
              <Share2 size={15} />
              Share
            </button>
          </div>

          <div className="mt-10 aspect-[16/9] rounded-2xl bg-mist border border-mist-line flex items-center justify-center">
            <span className="font-display text-5xl text-line select-none">SG</span>
          </div>

          <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: article.content }} />

          {article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((t: any) => (
                <span key={t.id} className="px-3 py-1.5 rounded-full bg-mist border border-mist-line text-xs font-medium text-ink">
                  #{t.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 flex items-center justify-between border-t border-mist-line pt-8 text-sm">
            {prev ? (
              <Link to={`/articles/${prev.slug}`} className="flex items-center gap-1.5 text-ink hover:text-accent max-w-[45%]">
                <ArrowLeft size={15} className="shrink-0" />
                <span className="truncate">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/articles/${next.slug}`} className="flex items-center gap-1.5 text-ink hover:text-accent max-w-[45%] text-right ml-auto">
                <span className="truncate">{next.title}</span>
                <ArrowRight size={15} className="shrink-0" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-mist">
          <div className="container-editorial py-14 max-w-4xl mx-auto">
            <h2 className="font-display text-xl font-semibold text-ink mb-2">Related articles</h2>
            <div>
              {related.map((a: any) => (
                <ArticleCard key={a.id} article={a} variant="horizontal" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
