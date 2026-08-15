import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Newsletter signups need Supabase connected. Add credentials to .env — see README.md.',
    }
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({ email })
  if (error) return { success: false, error: error.message }
  return { success: true }
}
