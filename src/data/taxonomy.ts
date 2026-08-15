import type { Author, Category, Tag } from '@/types'

// ---------------------------------------------------------------------------
// Placeholder taxonomy data. Replace with data fetched from Supabase once
// connected (see src/services/articles.ts). Kept here so the UI has
// something realistic to render out of the box.
// ---------------------------------------------------------------------------

export const author: Author = {
  id: 'author-sachin-ghimire',
  name: 'Sachin Ghimire',
  slug: 'sachin-ghimire',
  avatar_url: null,
  bio: 'Sachin Ghimire writes about technology, business, and everyday life in Nepal. He builds software and writes essays on the side.',
  role: 'Founder & Writer',
}

export const categories: Category[] = [
  { id: 'cat-reality', name: 'Reality', slug: 'reality', description: 'Honest observations on how things actually work.', color: '#b3261e' },
  { id: 'cat-nepal', name: 'Nepal', slug: 'nepal', description: 'Stories and analysis rooted in Nepal.', color: '#2f5233' },
  { id: 'cat-technology', name: 'Technology', slug: 'technology', description: 'Software, tools, and the systems behind them.', color: '#1f3a5f' },
  { id: 'cat-ideas', name: 'Ideas', slug: 'ideas', description: 'Frameworks and ways of thinking worth keeping.', color: '#6b4226' },
  { id: 'cat-stories', name: 'Stories', slug: 'stories', description: 'Narrative, first-person, and reported pieces.', color: '#7a2048' },
  { id: 'cat-opinion', name: 'Opinion', slug: 'opinion', description: 'Arguments and positions, clearly labeled as such.', color: '#4a4b52' },
  { id: 'cat-personal', name: 'Personal', slug: 'personal', description: 'Notes from the writer\u2019s own life and work.', color: '#8a5a1f' },
]

export const tags: Tag[] = [
  { id: 'tag-startups', name: 'Startups', slug: 'startups' },
  { id: 'tag-writing', name: 'Writing', slug: 'writing' },
  { id: 'tag-ecommerce', name: 'E-commerce', slug: 'ecommerce' },
  { id: 'tag-logistics', name: 'Logistics', slug: 'logistics' },
  { id: 'tag-culture', name: 'Culture', slug: 'culture' },
  { id: 'tag-productivity', name: 'Productivity', slug: 'productivity' },
  { id: 'tag-software', name: 'Software', slug: 'software' },
  { id: 'tag-career', name: 'Career', slug: 'career' },
]

export const findCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)
export const findTagBySlug = (slug: string) => tags.find((t) => t.slug === slug)
