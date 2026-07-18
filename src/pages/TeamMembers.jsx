import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Filter } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { TEAM_MEMBERS } from '../data/site'

export default function TeamMembers() {
  const departments = useMemo(() => {
    const set = new Set(TEAM_MEMBERS.map((m) => m.department))
    return ['All', ...Array.from(set)]
  }, [])

  const [filter, setFilter] = useState('All')
  const filtered = useMemo(
    () => (filter === 'All' ? TEAM_MEMBERS : TEAM_MEMBERS.filter((m) => m.department === filter)),
    [filter]
  )

  return (
    <>
      <div className="team-page-hero">
        <style>{`
          /* Faces sit in the top half of this photo (one member standing near
             the top edge) — bias the crop upward so no one's head is cut. */
          .team-page-hero .hero-img {
            object-position: 50% 20% !important;
          }
        `}</style>
        <PageHero
          title="Team"
          subtitle="The operating leadership across every function that powers Ahinsa Group."
          breadcrumb="About / Team"
          image="/images/emploi/team.jpg?w=1920&q=85&auto=format&fit=crop"
        />
      </div>

      <section className="section-pad bg-page">
        <div className="container-x text-center max-w-3xl mx-auto mb-14">
          <SectionHeading
            center
            eyebrow="Team Management"
            title={<>The <span className="gold-text">people</span> behind every project</>}
            subtitle="A multidisciplinary team of architects, engineers, sales professionals, customer-experience leaders and more — each obsessing over their craft."
          />
        </div>

        <div className="container-x flex items-center justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="hidden md:inline-flex items-center gap-2 text-fg-soft text-xs uppercase tracking-[0.2em] mr-2">
              <Filter className="w-3 h-3 text-gold-500" />
              By department
            </span>
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] border transition ${
                  filter === d
                    ? 'bg-gold-500 text-ink-900 border-gold-500'
                    : 'bg-transparent text-fg-muted border-gold-500/25 hover:border-gold-500'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filtered.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 0.06}>
                <div className="group">
                  <div className="img-zoom aspect-[4/5] overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700"
                    />
                  </div>
                  <div className="pt-5">
                    <p className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.25em]">
                      {m.department}
                    </p>
                    <h3 className="font-serif text-fg text-xl mt-2">{m.name}</h3>
                    <p className="text-fg-muted text-sm mt-1">{m.role}</p>
                    <p className="text-fg-soft text-sm leading-relaxed mt-3">{m.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-16 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="heading-serif text-fg text-3xl md:text-5xl">
              Build the future of <span className="gold-text">real estate</span> with us
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:text-right">
            <p className="text-fg-soft mb-6">
              We&apos;re always looking for passionate craftspeople, operators and creators to join our growing family.
            </p>
            <Link to="/contact" className="btn-gold">
              Explore Careers <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
