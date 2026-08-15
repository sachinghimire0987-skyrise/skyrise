import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="container-editorial py-32 text-center">
        <p className="font-mono text-sm text-accent mb-4">404</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink">Page not found</h1>
        <p className="mt-3 text-ink-soft">The page you're looking for doesn't exist or has moved.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
        >
          Back home
        </Link>
      </section>
    </>
  )
}
