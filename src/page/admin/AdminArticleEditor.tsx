import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle, Eye } from 'lucide-react'
import { getAllArticlesForAdmin, saveArticle } from '@/services/articles'
import { categories, tags, author } from '@/data/taxonomy'
import { slugify, estimateReadingTime } from '@/lib/format'
import { isSupabaseConfigured } from '@/lib/supabase'
import type { ArticleStatus } from '@/types'

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  category_id: categories[0].id,
  tag_ids: [] as string[],
  seo_title: '',
  seo_description: '',
  featured: false,
  status: 'draft' as ArticleStatus,
}

export default function AdminArticleEditor() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [slugTouched, setSlugTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!id) return
    getAllArticlesForAdmin().then((articles: any[]) => {
      const article = articles.find((a: any) => a.id === id)
      if (!article) return
      setForm({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        cover_image: article.cover_image ?? '',
        category_id: article.category.id,
        tag_ids: article.tags.map((t: any) => t.id),
        seo_title: article.seo_title ?? '',
        seo_description: article.seo_description ?? '',
        featured: article.featured,
        status: article.status,
      })
      setSlugTouched(true)
    })
  }, [id])

  function updateField<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleTitleChange(value: string) {
    updateField('title', value)
    if (!slugTouched) updateField('slug', slugify(value))
  }

  function toggleTag(tagId: string) {
    setForm((f) => ({
      ...f,
      tag_ids: f.tag_ids.includes(tagId) ? f.tag_ids.filter((t) => t !== tagId) : [...f.tag_ids, tagId],
    }))
  }

  async function handleSave(status: ArticleStatus) {
    setSaving(true)
    setError(null)

    const category = categories.find((c: any) => c.id === form.category_id)!
    const selectedTags = tags.filter((t: any) => form.tag_ids.includes(t.id))

    const result = await saveArticle({
      id,
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      cover_image: form.cover_image || null,
      category,
      tags: selectedTags,
      author,
      seo_title: form.seo_title || form.title,
      seo_description: form.seo_description || form.excerpt,
      featured: form.featured,
      status,
      reading_time: estimateReadingTime(form.content),
      published_at: status === 'published' ? new Date().toISOString() : null,
    })

    setSaving(false)
    if (result.success) {
      navigate('/admin/articles')
    } else {
      setError(result.error ?? 'Could not save article.')
    }
  }

  return (
    <div>
      <Link to="/admin/articles" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-6">
        <ArrowLeft size={15} />
        All articles
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">{isEditing ? 'Edit article' : 'New article'}</h1>
        <button
          onClick={() => setPreview((p) => !p)}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"
        >
          <Eye size={16} />
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-6 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
          <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
          Supabase isn't connected, so saving is disabled here. You can still draft content and copy it into{' '}
          <code className="font-mono text-xs">src/data/articles.ts</code>, or connect Supabase to save for real.
        </div>
      )}
      {error && <p className="mb-4 text-sm text-accent">{error}</p>}

      {preview ? (
        <article className="prose-article max-w-3xl bg-paper border border-line rounded-xl p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {categories.find((c) => c.id === form.category_id)?.name}
          </p>
          <h1 className="font-display text-3xl font-semibold mt-2">{form.title || 'Untitled article'}</h1>
          <p className="text-ink-soft mt-2">{form.excerpt}</p>
          <div className="mt-6" dangerouslySetInnerHTML={{ __html: form.content || '<p><em>No content yet.</em></p>' }} />
        </article>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Title</label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent"
                placeholder="Article title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  updateField('slug', slugify(e.target.value))
                }}
                className="w-full rounded-lg border border-line px-4 py-2.5 text-sm font-mono outline-none focus-visible:border-accent"
                placeholder="article-slug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent resize-none"
                placeholder="A short summary shown on cards and search results"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Content <span className="text-ink-soft font-normal">(HTML supported)</span>
              </label>
              <textarea
                value={form.content}
                onChange={(e) => updateField('content', e.target.value)}
                rows={16}
                className="w-full rounded-lg border border-line px-4 py-3 text-sm font-mono outline-none focus-visible:border-accent"
                placeholder="<p>Write the article here&hellip;</p>"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Cover image URL</label>
              <input
                value={form.cover_image}
                onChange={(e) => updateField('cover_image', e.target.value)}
                className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent"
                placeholder="https://\u2026 or leave blank"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-line bg-paper p-5">
              <label className="block text-sm font-medium text-ink mb-1.5">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => updateField('category_id', e.target.value)}
                className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus-visible:border-accent"
              >
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <label className="block text-sm font-medium text-ink mb-1.5 mt-4">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((t: any) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTag(t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      form.tag_ids.includes(t.id) ? 'bg-ink text-paper border-ink' : 'border-line text-ink-soft hover:border-ink'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 mt-4 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => updateField('featured', e.target.checked)}
                  className="rounded border-line"
                />
                Featured article
              </label>
            </div>

            <div className="rounded-xl border border-line bg-paper p-5">
              <h3 className="text-sm font-semibold text-ink mb-3">SEO</h3>
              <label className="block text-xs font-medium text-ink-soft mb-1.5">SEO title</label>
              <input
                value={form.seo_title}
                onChange={(e) => updateField('seo_title', e.target.value)}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus-visible:border-accent mb-3"
                placeholder="Defaults to article title"
              />
              <label className="block text-xs font-medium text-ink-soft mb-1.5">SEO description</label>
              <textarea
                value={form.seo_description}
                onChange={(e) => updateField('seo_description', e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus-visible:border-accent resize-none"
                placeholder="Defaults to excerpt"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleSave('published')}
                disabled={saving || !form.title}
                className="rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving\u2026' : 'Publish'}
              </button>
              <button
                onClick={() => handleSave('draft')}
                disabled={saving || !form.title}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink hover:border-ink transition-colors disabled:opacity-50"
              >
                Save as draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
