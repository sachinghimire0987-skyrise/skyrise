import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { articles as demoArticles } from '@/data/articles'
import type { Article } from '@/types'

/**
 * Article service.
 *
 * When Supabase credentials are configured (see .env.example), these
 * functions query the `articles` table (joined with authors/categories/tags)
 * as defined in supabase/migrations/0001_init.sql.
 *
 * When Supabase is not configured, they fall back to the local demo data in
 * src/data/articles.ts so the UI is never empty during local development.
 * This fallback is intentionally explicit — it is not meant to simulate a
 * real backend. See README.md > "Connecting Supabase".
 */

export async function getPublishedArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    return demoArticles.filter((a) => a.status === 'published')
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*, author:authors(*), category:categories(*), tags:article_tags(tag:tags(*))')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('getPublishedArticles error:', error.message)
    return []
  }

  return (data ?? []) as unknown as Article[]
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const all = await getPublishedArticles()
  return all.filter((a) => a.featured)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSupabaseConfigured) {
    return demoArticles.find((a) => a.slug === slug) ?? null
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*, author:authors(*), category:categories(*), tags:article_tags(tag:tags(*))')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('getArticleBySlug error:', error.message)
    return null
  }

  return data as unknown as Article
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const all = await getPublishedArticles()
  return all.filter((a) => a.category.slug === categorySlug)
}

export async function searchArticles(query: string): Promise<Article[]> {
  const all = await getPublishedArticles()
  const q = query.trim().toLowerCase()
  if (!q) return []
  return all.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.name.toLowerCase().includes(q))
  )
}

// ---------------------------------------------------------------------------
// Admin-only operations. These require Supabase to be configured with an
// authenticated admin session; they return a clear error otherwise rather
// than pretending to save data.
// ---------------------------------------------------------------------------

export async function getAllArticlesForAdmin(): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    return demoArticles
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*, author:authors(*), category:categories(*), tags:article_tags(tag:tags(*))')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('getAllArticlesForAdmin error:', error.message)
    return []
  }

  return (data ?? []) as unknown as Article[]
}

export async function saveArticle(
  article: Partial<Article> & { id?: string }
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase is not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to enable saving.',
    }
  }

  const { error } = article.id
    ? await supabase.from('articles').update(article).eq('id', article.id)
    : await supabase.from('articles').insert(article)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteArticle(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase is not connected. See README.md > "Connecting Supabase".' }
  }
  const { error } = await supabase.from('articles').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}
