import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { projects as demoProjects } from '@/data/projects'
import type { Project } from '@/types'

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return demoProjects

  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('getProjects error:', error.message)
    return []
  }
  return (data ?? []) as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured) return demoProjects.find((p) => p.slug === slug) ?? null

  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single()
  if (error) {
    console.error('getProjectBySlug error:', error.message)
    return null
  }
  return data as Project
}

export async function saveProject(
  project: Partial<Project> & { id?: string }
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Supabase is not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to enable saving.',
    }
  }
  const { error } = project.id
    ? await supabase.from('projects').update(project).eq('id', project.id)
    : await supabase.from('projects').insert(project)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase is not connected. See README.md > "Connecting Supabase".' }
  }
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}
