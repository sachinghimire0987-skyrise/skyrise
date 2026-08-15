import { Link } from 'react-router-dom'
import { Code2, AtSign, Camera, Briefcase } from 'lucide-react'
import { siteSettings } from '@/data/settings'
import { categories } from '@/data/taxonomy'

const socialIcons = {
  github: Code2,
  twitter: AtSign,
  instagram: Camera,
  linkedin: Briefcase,
} as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-mist mt-24">
      <div className="container-editorial py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-xl font-semibold text-ink">
            Sachin Ghimire
          </Link>
          <p className="mt-3 text-sm text-ink-soft max-w-sm leading-relaxed">{siteSettings.tagline}</p>
          <div className="mt-5 flex items-center gap-4">
            {Object.entries(siteSettings.social).map(([key, url]: [string, string | undefined]) => {
              const Icon = socialIcons[key as keyof typeof socialIcons]
              if (!Icon || !url) return null
              return (
                <a
                  key={key}
                  href={String(url)}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={key}
                  className="text-ink-soft hover:text-accent transition-colors"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-4">Categories</h3>
          <ul className="space-y-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/categories/${c.slug}`} className="text-sm text-ink hover:text-accent transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-4">Site</h3>
          <ul className="space-y-2.5">
            <li><Link to="/about" className="text-sm text-ink hover:text-accent transition-colors">About</Link></li>
            <li><Link to="/projects" className="text-sm text-ink hover:text-accent transition-colors">Projects</Link></li>
            <li><Link to="/author/sachin-ghimire" className="text-sm text-ink hover:text-accent transition-colors">Author</Link></li>
            <li><Link to="/contact" className="text-sm text-ink hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mist-line">
        <div className="container-editorial py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-soft">
          <p>&copy; {year} {String(siteSettings.site_name)}. All rights reserved.</p>
          <p>Built with React, TypeScript &amp; Supabase.</p>
        </div>
      </div>
    </footer>
  )
}
