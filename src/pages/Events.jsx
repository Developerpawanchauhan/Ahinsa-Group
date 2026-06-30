import { Link } from 'react-router-dom'
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { EVENTS } from '../data/site'

export default function Events() {
  // We will render all events in the same format.

  return (
    <>
      <PageHero
        title="Events"
        subtitle="Launches, openings, customer celebrations and industry moments at Ahinsa."
        breadcrumb="Media / Events"
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=85&auto=format&fit=crop"
      />

      <section className="section-pad bg-page-soft border-y border-soft">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Event Diary"
            title={<>Our <span className="gold-text">events</span> & Milestones</>}
          />
          <div className="mt-20 space-y-20">
            {EVENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <div className={`${i > 0 ? 'border-t border-soft pt-20' : ''}`}>
                  {/* Text */}
                  <div>
                    <h3 className="heading-serif text-3xl text-fg">{e.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.2em] mt-4">
                      <span className="text-gold-700 dark:text-gold-500 flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        {e.type}
                      </span>
                      <span className="text-fg-faint">&bull;</span>
                      <span className="text-fg-soft flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {e.date}
                      </span>
                      <span className="text-fg-faint">&bull;</span>
                      <span className="text-fg-soft flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {e.location}
                      </span>
                    </div>
                    <div className="gold-divider mx-0 my-6" />
                    <p className="text-fg-muted leading-relaxed">{e.excerpt}</p>
                  </div>
                  {/* Images */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {e.images.slice(0, 3).map((img, imgIdx) => (
                      <div key={imgIdx} className="img-zoom aspect-[16/10]">
                        <img src={img} alt={`${e.title} ${imgIdx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
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
