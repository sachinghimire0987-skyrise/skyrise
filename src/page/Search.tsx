import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import Seo from '@/components/Seo'
import ArticleCard from '@/components/article/ArticleCard'
import EmptyState from '@/components/ui/EmptyState'
import Loading from '@/components/ui/Loading'
import { searchArticles } from '@/services/articles'
import type { Article } from '@/types'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const [input, setInput] = useState(query)
  const [results, setResults] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    setInput(query)
    if (!query) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)
    searchArticles(query).then((r) => {
      setResults(r)
      setLoading(false)
    })
  }, [query])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setParams(input ? { q: input } : {})
  }

  return (
    <>
      <Seo title="Search" description="Search articles on Sachin Ghimire." />
      <section className="container-editorial py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Search</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink text-balance">Find an article</h1>

        <form onSubmit={handleSubmit} className="mt-8 max-w-xl flex items-center gap-2 border border-line rounded-full pl-5 pr-2 py-2">
          <SearchIcon size={18} className="text-ink-soft shrink-0" />
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by title, excerpt, or tag"
            className="flex-1 bg-transparent outline-none text-sm py-1.5"
            aria-label="Search articles"
            autoFocus
          />
          <button type="submit" className="rounded-full bg-ink text-paper px-5 py-2 text-sm font-medium hover:bg-accent transition-colors">
            Search
          </button>
        </form>

        <div className="mt-12">
          {loading ? (
            <Loading label="Searching" />
          ) : searched && results.length === 0 ? (
            <EmptyState
              icon={SearchIcon}
              title={`No results for "${query}"`}
              description="Try a different keyword, or browse articles by category instead."
            />
          ) : results.length > 0 ? (
            <>
              <p className="text-sm text-ink-soft mb-6">
                {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {results.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-ink-soft">Start typing to search across all published articles.</p>
          )}
        </div>
      </section>
    </>
  )
}
