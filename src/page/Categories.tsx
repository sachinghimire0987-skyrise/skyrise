import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '@/components/Seo'
import { categories } from '@/data/taxonomy'

export default function Categories() {
  return (
    <>
      <Seo title="Categories" description="Browse articles by category." />
      <section className="container-editorial py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Browse</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink text-balance">Categories</h1>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/categories/${c.slug}`}
              className="group flex items-center justify-between p-6 rounded-xl border border-line hover:border-ink transition-colors"
            >
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">{c.name}</h2>
                {c.description && <p className="mt-1.5 text-sm text-ink-soft">{c.description}</p>}
              </div>
              <ArrowUpRight size={20} className="text-ink-soft group-hover:text-accent transition-colors shrink-0 ml-4" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
