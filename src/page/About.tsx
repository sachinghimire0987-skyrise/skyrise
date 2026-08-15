import Seo from '@/components/Seo'
import { author } from '@/data/taxonomy'

const skills = ['Operations & Logistics', 'Vendor Management', 'Product Thinking', 'Full-Stack Development', 'Writing', 'Team Leadership']
const interests = ['E-commerce', 'Nepali business culture', 'Software tools', 'Long-form writing', 'Systems thinking']
const journey = [
  { year: '2022', text: 'Started working in operations, coordinating branch performance and vendor relationships.' },
  { year: '2024', text: 'Began building internal tools to simplify vendor tracking and reporting.' },
  { year: '2025', text: 'Started Risea, exploring e-commerce from the product side rather than only operations.' },
  { year: '2026', text: 'Launched this site to bring writing, projects, and professional work into one place.' },
]

export default function About() {
  return (
    <>
      <Seo title="About" description={author.bio} />

      <section className="container-editorial py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">About</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink text-balance">{author.name}</h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">{author.bio}</p>
        </div>
      </section>

      <section className="container-editorial pb-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-4">Journey</h2>
            <ul className="space-y-6">
              {journey.map((item) => (
                <li key={item.year} className="flex gap-5">
                  <span className="font-mono text-sm text-accent shrink-0 w-14">{item.year}</span>
                  <p className="text-ink-soft leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-4">Currently</h2>
            <p className="text-ink-soft leading-relaxed">
              Splitting time between operations work, building small software projects, and writing on this site.
              Most of what I write comes directly from problems I'm working through at the time &mdash; vendor
              activation, target-setting, or just learning to build software faster.
            </p>
          </div>
        </div>

        <aside className="space-y-10">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-mist border border-mist-line text-xs font-medium text-ink">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-mist border border-mist-line text-xs font-medium text-ink">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  )
}
