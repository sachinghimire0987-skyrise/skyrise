import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { categories as demoCategories, tags as demoTags } from '@/data/taxonomy'
import type { Category, Tag } from '@/types'

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return demoCategories
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) {
    console.error('getCategories error:', error.message)
    return []
  }
  return (data ?? []) as Category[]
}

export async function getTags(): Promise<Tag[]> {
  if (!isSupabaseConfigured) return demoTags
  const { data, error } = await supabase.from('tags').select('*').order('name')
  if (error) {
    console.error('getTags error:', error.message)
    return []
  }
  return (data ?? []) as Tag[]
}
