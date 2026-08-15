import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { siteSettings } from '@/data/settings'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function AdminSettings() {
  const [form, setForm] = useState(siteSettings)

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink mb-1">Site settings</h1>
      <p className="text-sm text-ink-soft mb-8">General information used across the site.</p>

      {!isSupabaseConfigured && (
        <div className="mb-6 flex gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-ink">
          <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
          Settings are currently defined in <code className="font-mono text-xs">src/data/settings.ts</code>. Connect Supabase and
          wire this form to the <code className="font-mono text-xs">site_settings</code> table to save changes here.
        </div>
      )}

      <div className="max-w-xl space-y-5 rounded-xl border border-line bg-paper p-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Site name</label>
          <input
            value={form.site_name}
            onChange={(e) => setForm({ ...form, site_name: e.target.value })}
            disabled={!isSupabaseConfigured}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent disabled:opacity-60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Tagline</label>
          <input
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            disabled={!isSupabaseConfigured}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent disabled:opacity-60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            disabled={!isSupabaseConfigured}
            rows={3}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent resize-none disabled:opacity-60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Contact email</label>
          <input
            value={form.contact_email}
            onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
            disabled={!isSupabaseConfigured}
            className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent disabled:opacity-60"
          />
        </div>
        <button
          disabled={!isSupabaseConfigured}
          className="rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}
