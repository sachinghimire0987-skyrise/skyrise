import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Tag as TagIcon,
  Image,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/articles', label: 'Articles', icon: FileText },
  { to: '/admin/categories', label: 'Categories', icon: TagIcon },
  { to: '/admin/tags', label: 'Tags', icon: TagIcon },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/media', label: 'Media', icon: Image },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { signOut, isConfigured } = useAuth()

  return (
    <div className="min-h-screen bg-mist flex">
      <aside className="w-64 shrink-0 bg-paper border-r border-line hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-line">
          <Link to="/admin" className="font-display text-lg font-semibold text-ink">
            Sachin Ghimire
          </Link>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-mist hover:text-ink'
                }`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-line space-y-1">
          <Link to="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-mist hover:text-ink transition-colors">
            <ExternalLink size={17} />
            View site
          </Link>
          {isConfigured && (
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-mist hover:text-ink transition-colors"
            >
              <LogOut size={17} />
              Sign out
            </button>
          )}
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="h-16 border-b border-line bg-paper flex items-center justify-between px-6 md:hidden">
          <span className="font-display font-semibold">Admin</span>
        </header>
        <main className="p-6 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
