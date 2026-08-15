import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import Seo from '@/components/Seo'
import ArticleCard from '@/components/article/ArticleCard'
import EmptyState from '@/components/ui/EmptyState'
import Loading from '@/components/ui/Loading'
import { getPublishedArticles } from '@/services/articles'
import { categories } from '@/data/taxonomy'
import type { Article } from '@/types'

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    getPublishedArticles().then((a) => {
      setArticles(a)
      setLoading(false)
    })
  }, [])

  const filtered = activeCategory ? articles.filter((a) => a.category.slug === activeCategory) : articles

  return (
    <>
      <Seo title="Articles" description="All articles by Sachin Ghimire." />
      <section className="container-editorial py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Publication</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink text-balance">Articles</h1>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === null ? 'bg-ink text-paper border-ink' : 'border-line text-ink hover:border-ink'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === c.slug ? 'bg-ink text-paper border-ink' : 'border-line text-ink hover:border-ink'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-12">
          {loading ? (
            <Loading label="Loading articles" />
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {filtered.map((a) => (
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
