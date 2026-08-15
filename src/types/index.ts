export type ArticleStatus = 'draft' | 'published'

export interface AdminOverviewStats {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalProjects: number
  totalViews: number
}

export interface SiteSettings {
  site_name: string
  tagline?: string
  description?: string
  contact_email: string
  social: {
    twitter?: string
    instagram?: string
    linkedin?: string
    github?: string
    [key: string]: string | undefined
  }
}

export type Category = any
export type Tag = any
export type Author = any
export type Article = any
export type Project = any
export type Maybe<T> = T | null | undefined
