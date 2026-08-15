import { useEffect } from 'react'
import { siteSettings } from '@/data/settings'

interface SeoProps {
  title: string
  description?: string
  image?: string | null
  type?: 'website' | 'article'
  canonical?: string
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Lightweight SEO manager: updates document title, meta description,
 * Open Graph, and Twitter card tags per-page without a routing-level
 * framework dependency. Canonical URL and structured data for article pages
 * are included where applicable.
 */
export default function Seo({ title, description, image, type = 'website', canonical }: SeoProps) {
  useEffect(() => {
    const fullTitle = title === siteSettings.site_name ? title : `${title} \u2014 ${siteSettings.site_name}`
    document.title = fullTitle

    const desc = description || siteSettings.description
    setMeta('description', desc)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', desc, 'property')
    setMeta('og:type', type, 'property')
    setMeta('og:site_name', siteSettings.site_name, 'property')
    if (image) setMeta('og:image', image, 'property')

    setMeta('twitter:card', image ? 'summary_large_image' : 'summary')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)
    if (image) setMeta('twitter:image', image)

    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }
  }, [title, description, image, type, canonical])

  return null
}
