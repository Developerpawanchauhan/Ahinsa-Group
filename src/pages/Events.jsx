import { Link } from 'react-router-dom'
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { EVENTS } from '../data/site'

export default function Events() {
  const [featured, ...rest] = EVENTS

  return (
    <>
      <PageHero
        title="Events"
        subtitle="Launches, openings, customer celebrations and industry moments at Ahinsa."
        breadcrumb="Media / Events"
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=85&auto=format&fit=crop"
      />

      <section className="section-pad bg-page">
        <div className="container-x">
          <SectionHeading
            eyebrow="Upcoming Highlight"
            title={<>The <span className="gold-text">moment to mark</span> on your calendar</>}
          />
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 mt-12 items-center">
              <div className="img-zoom aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
                  <span className="text-gold-700 dark:text-gold-500 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {featured.date}
                  </span>
                  <span className="text-fg-faint">&bull;</span>
                  <span className="text-fg-soft flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {featured.location}
                  </span>
                  <span className="text-fg-faint">&bull;</span>
                  <span className="text-fg-soft flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    {featured.type}
                  </span>
                </div>
                <h2 className="heading-serif text-fg text-3xl md:text-5xl mt-6">{featured.title}</h2>
                <div className="gold-divider mx-0 my-6" />
                <p className="text-fg-muted leading-relaxed">{featured.excerpt}</p>
                <Link to="/contact" className="btn-gold mt-8">
                  Register Interest <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-page-soft border-y border-soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="Event Diary"
            title={<>Recent & upcoming <span className="gold-text">events</span></>}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
            {rest.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <article className="card-glass group cursor-pointer h-full flex flex-col overflow-hidden">
                  <div className="img-zoom aspect-[16/10] relative">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-gold-500 text-ink-900 px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                      {e.type}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                      <span className="text-gold-700 dark:text-gold-500 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {e.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-fg mt-3 group-hover:text-gold-700 dark:group-hover:text-gold-500 transition leading-tight">
                      {e.title}
                    </h3>
                    <div className="flex items-center gap-2 text-fg-soft text-xs mt-2">
                      <MapPin className="w-3 h-3 text-gold-500" />
                      {e.location}
                    </div>
                    <p className="text-fg-soft text-sm mt-3 leading-relaxed line-clamp-3 flex-1">
                      {e.excerpt}
                    </p>
                    <div className="mt-5 pt-5 border-t border-faint inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page border-t border-soft">
        <div className="container-x py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-fg text-3xl md:text-5xl">
              Want to <span className="gold-text">be there</span> for the next big moment?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fg-soft mt-6">
              Subscribe to our updates or write to us — we&apos;ll send you invites for upcoming launches and events.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/contact" className="btn-gold mt-8">
              Stay Updated <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
