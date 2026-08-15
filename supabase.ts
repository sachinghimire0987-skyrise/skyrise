import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/**
 * `isSupabaseConfigured` tells the rest of the app whether real credentials
 * are present. When they are not (e.g. running the UI without a backend
 * yet), services fall back to empty/placeholder states instead of pretending
 * to have live data. See README.md > "Connecting Supabase".
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// A valid-looking placeholder URL keeps the client constructor from
// throwing when credentials are absent. No network calls succeed against
// it; every service checks `isSupabaseConfigured` before querying.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
