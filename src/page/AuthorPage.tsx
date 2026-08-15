import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import Seo from '@/components/Seo'
import ArticleCard from '@/components/article/ArticleCard'
import EmptyState from '@/components/ui/EmptyState'
import Loading from '@/components/ui/Loading'
import { getPublishedArticles } from '@/services/articles'
import { author } from '@/data/taxonomy'
import type { Article } from '@/types'

export default function AuthorPage() {
  const { slug } = useParams<{ slug: string }>()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublishedArticles().then((a) => {
      setArticles(a.filter((art) => art.author.slug === slug))
      setLoading(false)
    })
  }, [slug])

  if (slug !== author.slug) return <Navigate to="/about" replace />

  return (
    <>
      <Seo title={author.name} description={author.bio} />
      <section className="container-editorial py-16 sm:py-20">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-mist border border-line flex items-center justify-center shrink-0">
            <span className="font-display text-2xl text-line select-none">SG</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{author.role}</p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink">{author.name}</h1>
          </div>
        </div>
        <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">{author.bio}</p>

        <div className="mt-14">
          <h2 className="font-display text-xl font-semibold text-ink mb-6">Articles by {author.name}</h2>
          {loading ? (
            <Loading label="Loading articles" />
          ) : articles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <EmptyState icon={FileText} title="No published articles yet" />
          )}
        </div>
      </section>
    </>
  )
}
