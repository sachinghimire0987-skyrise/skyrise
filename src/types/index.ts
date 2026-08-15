// ---------------------------------------------------------------------------
// Core domain types. These mirror the Supabase schema in
// supabase/migrations/0001_init.sql so the frontend and database stay in sync.
// ---------------------------------------------------------------------------

export type ArticleStatus = 'draft' | 'published'
export type ProjectStatus = 'active' | 'building' | 'paused' | 'archived'

export interface Profile {
  id: string
  full_name: string
  username: string
  avatar_url: string | null
  bio: string | null
  role: 'admin' | 'editor' | 'reader'
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Author {
  id: string
  name: string
  slug: string
  avatar_url: string | null
  bio: string
  role: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  author: Author
  category: Category
  tags: Tag[]
  published_at: string | null
  updated_at: string
  status: ArticleStatus
  featured: boolean
  views: number
  reading_time: number
  seo_title?: string
  seo_description?: string
}

export interface ArticleDraft {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  category_id: string
  tag_ids: string[]
  author_id: string
  seo_title: string
  seo_description: string
  featured: boolean
  status: ArticleStatus
}

export interface Project {
  id: string
  name: string
  slug: string
  description: string
  long_description?: string
  category: string
  image: string | null
  link: string | null
  status: ProjectStatus
  featured: boolean
  created_at: string
}

export interface MediaAsset {
  id: string
  file_name: string
  url: string
  size_bytes: number
  mime_type: string
  uploaded_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
}

export interface SiteSettings {
  site_name: string
  tagline: string
  description: string
  contact_email: string
  social: {
    twitter?: string
    instagram?: string
    linkedin?: string
    github?: string
    facebook?: string
  }
}

export interface AdminOverviewStats {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalProjects: number
  totalViews: number
}
