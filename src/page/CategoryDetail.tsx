import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import Seo from '@/components/Seo'
import ArticleCard from '@/components/article/ArticleCard'
import EmptyState from '@/components/ui/EmptyState'
import Loading from '@/components/ui/Loading'
import { getArticlesByCategory } from '@/services/articles'
import { findCategoryBySlug } from '@/data/taxonomy'
import type { Article } from '@/types'

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const category = slug ? findCategoryBySlug(slug) : undefined
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getArticlesByCategory(slug).then((a) => {
      setArticles(a)
      setLoading(false)
    })
  }, [slug])

  if (!category) return <Navigate to="/categories" replace />

  return (
    <>
      <Seo title={category.name} description={category.description ?? undefined} />
      <section className="container-editorial py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Category</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink text-balance">{category.name}</h1>
        {category.description && <p className="mt-4 text-lg text-ink-soft max-w-xl">{category.description}</p>}

        <div className="mt-12">
          {loading ? (
            <Loading label="Loading articles" />
          ) : articles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <EmptyState icon={FileText} title="No articles in this category yet" />
          )}
        </div>
      </section>
    </>
  )
}
