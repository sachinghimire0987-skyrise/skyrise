import { isSupabaseConfigured } from '@/lib/supabase'
import { getAllArticlesForAdmin } from './articles'
import { getProjects } from './projects'
import type { AdminOverviewStats } from '@/types'

/**
 * Returns admin overview numbers. When Supabase is not configured this
 * still reflects the local demo data (clearly a small, fixed dataset) rather
 * than inventing traffic or engagement numbers — there is no "totalViews"
 * pretending to be live analytics unless a real backend is connected.
 */
export async function getAdminOverviewStats(): Promise<AdminOverviewStats> {
  const [articles, projects] = await Promise.all([getAllArticlesForAdmin(), getProjects()])

  return {
    totalArticles: articles.length,
    publishedArticles: articles.filter((a: any) => a.status === 'published').length,
    draftArticles: articles.filter((a: any) => a.status === 'draft').length,
    totalProjects: projects.length,
    totalViews: isSupabaseConfigured ? articles.reduce((sum: number, a: any) => sum + (a.views ?? 0), 0) : 0,
  }
}
