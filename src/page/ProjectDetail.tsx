import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Seo from '@/components/Seo'
import Loading from '@/components/ui/Loading'
import { getProjectBySlug } from '@/services/projects'
import type { Project } from '@/types'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null | undefined>(undefined)

  useEffect(() => {
    if (!slug) return
    getProjectBySlug(slug).then(setProject)
  }, [slug])

  if (project === undefined) return <Loading label="Loading project" />
  if (project === null) return <Navigate to="/projects" replace />

  return (
    <>
      <Seo title={project.name} description={project.description} />
      <article className="container-editorial py-16 sm:py-20 max-w-3xl">
        <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-8">
          <ArrowLeft size={15} />
          All projects
        </Link>

        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">{project.category}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink text-balance">{project.name}</h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">{project.long_description ?? project.description}</p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Visit project
            <ArrowUpRight size={16} />
          </a>
        )}
      </article>
    </>
  )
}
