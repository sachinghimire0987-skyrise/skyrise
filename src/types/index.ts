export type Category = any
export type Tag = any
export type Author = any
export type Article = any
export type Project = any
export type SiteSettings = any
export type Maybe<T> = T | null | undefined
export type ArticleStatus = 'draft' | 'published'
export interface AdminOverviewStats {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalProjects: number
  totalViews: number
}
