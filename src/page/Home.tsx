import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Seo from '@/components/Seo'
import SectionHeader from '@/components/ui/SectionHeader'
import ArticleCard from '@/components/article/ArticleCard'
import ProjectCard from '@/components/project/ProjectCard'
import NewsletterForm from '@/components/NewsletterForm'
import EmptyState from '@/components/ui/EmptyState'
import Loading from '@/components/ui/Loading'
import { getPublishedArticles, getFeaturedArticles } from '@/services/articles'
import { getProjects } from '@/services/projects'
import { categories } from '@/data/taxonomy'
import { author } from '@/data/taxonomy'
import { siteSettings } from '@/data/settings'
import type { Article, Project } from '@/types'
import { FileText } from 'lucide-react'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [featured, setFeatured] = useState<Article[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    let active = true
    Promise.all([getPublishedArticles(), getFeaturedArticles(), getProjects()]).then(
      ([all, feat, proj]) => {
        if (!active) return
        setArticles(all)
        setFeatured(feat)
        setProjects(proj.slice(0, 3))
        setLoading(false)
      }
    )
    return () => {
      active = false
    }
  }, [])

  const heroArticle = featured[0] ?? articles[0]
  const latest = articles.filter((a) => a.id !== heroArticle?.id).slice(0, 6)

  return (
    <>
      <Seo title={siteSettings.site_name} description={siteSettings.description} />

      {/* Hero */}
      <section className="border-b border-line">
        <div className="container-editorial py-16 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                Personal site &amp; publication
              </p>
              <h1 className="font-display text-4xl sm:text-6xl font-semibold leading-[1.05] text-ink text-balance">
                Sachin Ghimire
              </h1>
              <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">{siteSettings.tagline}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/articles"
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Read the latest
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink hover:border-ink transition-colors"
                >
                  About Sachin
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-square rounded-2xl bg-mist border border-line flex items-center justify-center">
                <span className="font-display text-7xl text-line select-none">SG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="container-editorial py-16">
        {loading ? (
          <Loading label="Loading featured article" />
        ) : heroArticle ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Featured</p>
            <Link to={`/articles/${heroArticle.slug}`} className="group grid lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[16/10] rounded-2xl bg-mist border border-mist-line overflow-hidden flex items-center justify-center order-2 lg:order-1">
                <span className="font-display text-5xl text-line select-none">SG</span>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-xs font-medium text-accent uppercase tracking-wide">{heroArticle.category.name}</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold leading-tight text-ink group-hover:text-accent transition-colors text-balance">
                  {heroArticle.title}
                </h2>
                <p className="mt-4 text-ink-soft leading-relaxed">{heroArticle.excerpt}</p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  Read the full story
                  <ArrowUpRight size={15} />
                </p>
              </div>
            </Link>
          </>
        ) : (
          <EmptyState
            icon={FileText}
            title="No published articles yet"
            description="Add your first article from the admin panel to feature it here."
            action={
              <Link to="/admin/articles/new" className="text-sm font-medium text-accent hover:underline">
                Write an article
              </Link>
            }
          />
        )}
      </section>

      {/* Latest articles */}
      <section className="container-editorial py-16 border-t border-line">
        <SectionHeader eyebrow="Publication" title="Latest articles" action={{ label: 'View all', to: '/articles' }} />
        {loading ? (
          <Loading label="Loading articles" />
        ) : latest.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {latest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState icon={FileText} title="More articles coming soon" />
        )}
      </section>

      {/* Categories */}
      <section className="bg-mist border-y border-line">
        <div className="container-editorial py-16">
          <SectionHeader eyebrow="Browse" title="Categories" />
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/categories/${c.slug}`}
                className="px-5 py-2.5 rounded-full bg-paper border border-line text-sm font-medium text-ink hover:border-ink transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="container-editorial py-16">
        <SectionHeader
          eyebrow="Building"
          title="Projects"
          description="A few things I'm building alongside the writing."
          action={{ label: 'View all', to: '/projects' }}
        />
        {loading ? (
          <Loading label="Loading projects" />
        ) : projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <EmptyState title="No projects yet" />
        )}
      </section>

      {/* Personal / creator section */}
      <section className="bg-ink text-paper">
        <div className="container-editorial py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">The person behind it</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-balance">{author.name}</h2>
            <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">{author.bio}</p>
            <Link
              to="/author/sachin-ghimire"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-paper hover:text-accent transition-colors"
            >
              More about Sachin
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container-editorial py-20">
        <div className="rounded-2xl border border-line bg-mist p-10 sm:p-14 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink text-balance">
            Get new essays in your inbox
          </h2>
          <p className="mt-3 text-ink-soft">No spam. Just new articles, occasionally.</p>
          <div className="mt-6 max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
