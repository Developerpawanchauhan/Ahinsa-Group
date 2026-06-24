import { Link } from 'react-router-dom'
import { Award, Trophy, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { AWARDS } from '../data/site'

export default function Awards() {
  // Find the specific Zee Media award for the featured section
  const featuredAward = AWARDS.find(a => a.awardedBy.includes('Zee Media')) || AWARDS[0];

  const byYear = AWARDS.reduce((acc, a) => {
    acc[a.year] = acc[a.year] || []
    acc[a.year].push(a)
    return acc
  }, {})
  
  // Sort awards within each year by date (descending - newest first)
  Object.keys(byYear).forEach(year => {
    byYear[year].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB - dateA
    })
  })
  
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a))

  return (
    <>
      <div className="awards-page-hero">
        <style>{`
          .awards-page-hero .hero-img {
            object-position: bottom !important;
          }
        `}</style>
        <PageHero
          title="Awards & Recognition"
          subtitle="Two decades of craft, celebrated by the industry and our customers."
          breadcrumb="Media / Awards"
          image="/images/awards/hero-awards.jpg"
        />
      </div>

      <section className="section-pad bg-page">
        <div className="container-x text-center max-w-3xl mx-auto">
          <SectionHeading
            center
            eyebrow="Honours"
            title={<>Recognition that <span className="gold-text">reflects our work</span></>}
            subtitle="Awards are not the goal — but they are the byproduct of doing the work right, every single time."
          />
        </div>
      </section>

      {featuredAward && (
        <section className="bg-page-alt border-y border-soft py-16">
          <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="img-zoom aspect-[4/3] overflow-hidden">
                <img src={featuredAward.image} alt={featuredAward.title} className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">Featured Award &middot; {featuredAward.year}</p>
              <h2 className="heading-serif text-fg text-3xl md:text-5xl mt-5">{featuredAward.title}</h2>
              <p className="text-gold-700 dark:text-gold-500 uppercase tracking-[0.25em] text-xs mt-4">
                {featuredAward.awardedBy}
              </p>
              <div className="gold-divider mx-0 my-6" />
              <p className="text-fg-muted leading-relaxed">{featuredAward.description}</p>
              <div className="inline-flex items-center gap-3 mt-6 px-4 py-2 border border-gold-500/30 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-[0.2em]">
                <Trophy className="w-4 h-4" />
                {featuredAward.category}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-pad bg-page">
        <div className="container-x">
          {years.map((year) => (
            <div key={year} className="mb-16 last:mb-0">
              <Reveal>
                <div className="flex items-center gap-6 mb-8">
                  <h3 className="font-serif text-5xl md:text-6xl gold-text">{year}</h3>
                  <span className="flex-1 h-px bg-gradient-to-r from-gold-500/40 to-transparent" />
                  <span className="text-fg-soft uppercase tracking-[0.25em] text-xs">
                    {byYear[year].length} {byYear[year].length === 1 ? 'recognition' : 'recognitions'}
                  </span>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {byYear[year].map((a, i) => (
                  <Reveal key={a.title} delay={i * 0.08}>
                    <article className="card-glass overflow-hidden h-full flex flex-col group">
                      <div className="img-zoom aspect-[16/10]">
                        <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500 flex-shrink-0">
                            <Award className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.25em]">
                              {a.category}
                            </p>
                            <h4 className="font-serif text-lg text-fg mt-1 leading-tight group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
                              {a.title}
                            </h4>
                          </div>
                        </div>
                        <p className="text-fg-soft text-xs uppercase tracking-[0.2em] mt-4">
                          {a.awardedBy}
                        </p>
                        <p className="text-fg-soft text-sm mt-3 leading-relaxed">{a.description}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-fg text-3xl md:text-5xl">
              See the projects <span className="gold-text">behind the awards</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/projects" className="btn-gold mt-8">
              Explore Our Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
