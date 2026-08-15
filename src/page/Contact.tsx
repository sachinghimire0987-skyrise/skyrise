import { useState } from 'react'
import { Mail, Code2, AtSign, Camera, Briefcase } from 'lucide-react'
import Seo from '@/components/Seo'
import { siteSettings } from '@/data/settings'

const socialIcons = {
  github: Code2,
  twitter: AtSign,
  instagram: Camera,
  linkedin: Briefcase,
} as const

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // No backend wired for the contact form yet. Once Supabase is connected,
    // this can insert into a `messages` table or call an edge function.
    // For now, direct people to email, and show a clear confirmation state.
    setSent(true)
  }

  return (
    <>
      <Seo title="Contact" description="Get in touch with Sachin Ghimire." />
      <section className="container-editorial py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Contact</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink text-balance">Get in touch</h1>
            <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md">
              For collaborations, project inquiries, or just to say hello.
            </p>

            <div className="mt-10 space-y-4">
              <a href={`mailto:${siteSettings.contact_email}`} className="flex items-center gap-3 text-ink hover:text-accent">
                <Mail size={18} />
                {siteSettings.contact_email}
              </a>
              <div className="flex items-center gap-4 pt-2">
                {Object.entries(siteSettings.social).map(([key, url]) => {
                  const Icon = socialIcons[key as keyof typeof socialIcons]
                  if (!Icon || !url) return null
                  return (
                    <a key={key} href={url} target="_blank" rel="noreferrer noopener" aria-label={key} className="text-ink-soft hover:text-accent transition-colors">
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="rounded-xl border border-line bg-mist p-8">
                <h2 className="font-display text-xl font-semibold text-ink">Message noted</h2>
                <p className="mt-2 text-sm text-ink-soft">
                  This form isn't wired to a backend yet. For now, please email{' '}
                  <a href={`mailto:${siteSettings.contact_email}`} className="text-accent underline underline-offset-2">
                    {siteSettings.contact_email}
                  </a>{' '}
                  directly and I'll reply as soon as I can.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">Name</label>
                  <input id="name" name="name" required type="text" className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">Email</label>
                  <input id="email" name="email" required type="email" className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">Message</label>
                  <textarea id="message" name="message" required rows={5} className="w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none focus-visible:border-accent resize-none" />
                </div>
                <button type="submit" className="rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
