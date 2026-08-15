import { useEffect, useState } from 'react'
import { Layers } from 'lucide-react'
import Seo from '@/components/Seo'
import ProjectCard from '@/components/project/ProjectCard'
import EmptyState from '@/components/ui/EmptyState'
import Loading from '@/components/ui/Loading'
import { getProjects } from '@/services/projects'
import type { Project } from '@/types'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects().then((p) => {
      setProjects(p)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Seo title="Projects" description="Software and business projects by Sachin Ghimire." />
      <section className="container-editorial py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Building</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink text-balance max-w-2xl">Projects</h1>
        <p className="mt-4 text-lg text-ink-soft max-w-xl">
          A running list of what I'm building &mdash; some shipped, some still in progress.
        </p>

        <div className="mt-12">
          {loading ? (
            <Loading label="Loading projects" />
          ) : projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Layers}
              title="No projects yet"
              description="Projects added from the admin panel will appear here."
            />
          )}
        </div>
      </section>
    </>
  )
}
