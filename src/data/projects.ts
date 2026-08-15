import type { Project } from '@/types'

// DEMO CONTENT — replace via /admin/projects or Supabase once connected.
export const projects: Project[] = [
  {
    id: 'proj-risea',
    name: 'Risea',
    slug: 'risea',
    description: 'An e-commerce platform focused on simplifying order flow between vendors and buyers.',
    long_description:
      'Risea is a lightweight e-commerce platform built to reduce the friction vendors face when listing products and fulfilling orders. The focus is on a fast, predictable checkout and clear order status at every step.',
    category: 'E-commerce',
    image: null,
    link: null,
    status: 'active',
    featured: true,
    created_at: '2025-01-10T00:00:00.000Z',
  },
  {
    id: 'proj-vms',
    name: 'VMS',
    slug: 'vms',
    description: 'A vendor management system for tracking activation, performance, and communication.',
    long_description:
      'VMS (Vendor Management System) centralizes vendor status, order history, and follow-up notes so operations teams can prioritize outreach without digging through spreadsheets.',
    category: 'Business / Software',
    image: null,
    link: null,
    status: 'building',
    featured: true,
    created_at: '2025-06-20T00:00:00.000Z',
  },
  {
    id: 'proj-vibe-coding',
    name: 'Vibe Coding',
    slug: 'vibe-coding',
    description: 'A personal practice and set of notes on building software quickly by learning through doing.',
    long_description:
      'Vibe Coding is an ongoing personal project and writing series about building fast, imperfect prototypes as a way of learning &mdash; documented alongside the articles on this site.',
    category: 'Coding / Learning',
    image: null,
    link: null,
    status: 'active',
    featured: false,
    created_at: '2026-01-05T00:00:00.000Z',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const findProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
