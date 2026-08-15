import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/articles', label: 'Articles' },
  { to: '/categories', label: 'Categories' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
  }, [])

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const q = String(form.get('q') || '').trim()
    setOpen(false)
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Sachin Ghimire
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-line rounded-full pl-3 pr-1 py-1">
            <Search size={15} className="text-ink-soft" aria-hidden="true" />
            <input
              type="search"
              name="q"
              placeholder="Search articles"
              className="bg-transparent text-sm px-2 py-0.5 w-36 focus:w-48 transition-all outline-none placeholder:text-ink-soft/60"
              aria-label="Search articles"
            />
          </form>
          <Link
            to="/contact"
            className="text-sm font-medium bg-ink text-paper px-4 py-2 rounded-full hover:bg-accent transition-colors"
          >
            Get in touch
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-paper">
          <nav className="container-editorial flex flex-col py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-base border-b border-mist-line last:border-none ${
                    isActive ? 'text-accent font-medium' : 'text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <form onSubmit={handleSearchSubmit} className="mt-4 flex items-center border border-line rounded-full px-3 py-2">
              <Search size={16} className="text-ink-soft" aria-hidden="true" />
              <input
                type="search"
                name="q"
                placeholder="Search articles"
                className="bg-transparent text-sm px-2 py-0.5 flex-1 outline-none"
                aria-label="Search articles"
              />
            </form>
          </nav>
        </div>
      )}
    </header>
  )
}
