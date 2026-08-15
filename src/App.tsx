import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import ScrollToTop from '@/components/ScrollToTop'
import ProtectedRoute from '@/routes/ProtectedRoute'

import SiteLayout from '@/layouts/SiteLayout'
import AdminLayout from '@/layouts/AdminLayout'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Articles from '@/pages/Articles'
import ArticleDetail from '@/pages/ArticleDetail'
import Categories from '@/pages/Categories'
import CategoryDetail from '@/pages/CategoryDetail'
import SearchPage from '@/pages/Search'
import AuthorPage from '@/pages/AuthorPage'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

import AdminLogin from '@/pages/admin/AdminLogin'
import AdminOverview from '@/pages/admin/AdminOverview'
import AdminArticles from '@/pages/admin/AdminArticles'
import AdminArticleEditor from '@/pages/admin/AdminArticleEditor'
import AdminCategories from '@/pages/admin/AdminCategories'
import AdminTags from '@/pages/admin/AdminTags'
import AdminProjects from '@/pages/admin/AdminProjects'
import AdminMedia from '@/pages/admin/AdminMedia'
import AdminSettings from '@/pages/admin/AdminSettings'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public site */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:slug" element={<CategoryDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/author/:slug" element={<AuthorPage />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="articles/new" element={<AdminArticleEditor />} />
            <Route path="articles/:id/edit" element={<AdminArticleEditor />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="tags" element={<AdminTags />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
