import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Building2, Filter } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { PROJECTS } from '../data/site'

const STATUS_FILTERS = ['All', 'Ongoing', 'Completed', 'New Launch']

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return PROJECTS
    return PROJECTS.filter((p) => p.status === filter)
  }, [filter])

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="Iconic developments shaping the skyline of Agra."
        breadcrumb="Our Projects"
        image="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=85&auto=format&fit=crop"
      />

      {/* Filter bar */}
      <section className="bg-page-alt border-b border-soft sticky top-[72px] z-30 backdrop-blur-md">
        <div className="container-x py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-fg-soft text-sm">
            <Filter className="w-4 h-4 text-gold-700 dark:text-gold-500" />
            <span className="uppercase tracking-[0.2em] text-xs">Filter by status</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border transition-all duration-300 ${
                  filter === s
                    ? 'bg-gold-500 text-ink-900 border-gold-500'
                    : 'bg-transparent text-fg-muted border-gold-500/25 hover:border-gold-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 6) * 0.08}>
                <Link to="/contact" className="block card-glass group overflow-hidden h-full">
                  <div className="img-zoom aspect-[4/3] relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-gold-500 text-ink-900 px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                      {p.status}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gold-700 dark:text-gold-500 uppercase tracking-[0.2em]">
                      <Building2 className="w-3.5 h-3.5" />
                      {p.type}
                    </div>
                    <h3 className="font-serif text-2xl text-fg mt-3 group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 text-fg-soft text-sm mt-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-500" />
                      {p.location}
                    </div>
                    <p className="text-fg-soft text-sm mt-4 leading-relaxed line-clamp-2">{p.short}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest">
                      Enquire Now <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-fg-soft py-20">
              No projects match the selected filter.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-20 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="heading-serif text-fg text-4xl md:text-5xl">
              Looking for a project that fits your <span className="gold-text">specific needs</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:text-right">
            <p className="text-fg-soft mb-8">
              Our advisors can help you shortlist the right address based on lifestyle, budget and investment goals.
            </p>
            <Link to="/contact" className="btn-gold">
              Request a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
