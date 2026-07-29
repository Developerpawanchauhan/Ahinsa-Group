import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { EVENTS } from '../data/site'

const GAP = 16 // matches gap-4 on the strip
const GLIDE = 200 // ms for a one-card move
const REWIND = 450 // ms for the much longer wrap back to the first photo

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/* Every photo from one event, scrolled sideways: arrow buttons, no visible
   scrollbar, and an autoscroll that advances a card every 2s. The timer only
   runs while the strip is on screen — otherwise all ten strips on the page
   would animate at once — and pauses on hover, focus or touch. */
function EventPhotoStrip({ images, title }) {
  const stripRef = useRef(null)
  const rafRef = useRef(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)

  // Eased glide to a target offset. Driven frame by frame rather than with
  // `behavior: 'smooth'` so the duration and easing are ours, and so the long
  // wrap back to the start reads as a glide instead of a jump.
  const glideTo = (el, to, duration) => {
    cancelAnimationFrame(rafRef.current)
    const from = el.scrollLeft
    const delta = Math.max(0, Math.min(to, el.scrollWidth - el.clientWidth)) - from
    if (!delta) return

    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      el.scrollLeft = from + delta * easeInOutCubic(p)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const step = (dir) => {
    const el = stripRef.current
    if (!el) return
    const card = el.firstElementChild
    const amount = card ? card.offsetWidth + GAP : el.clientWidth * 0.8
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    const atStart = el.scrollLeft <= 4

    // Wrap around so the autoscroll loops instead of stalling at the end.
    if (dir > 0 && atEnd) glideTo(el, 0, REWIND)
    else if (dir < 0 && atStart) glideTo(el, el.scrollWidth, REWIND)
    else glideTo(el, el.scrollLeft + dir * amount, GLIDE)
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  // Only autoscroll strips the visitor can actually see.
  useEffect(() => {
    const el = stripRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.3,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible || images.length < 2) return
    const id = setInterval(() => step(1), 2000)
    return () => clearInterval(id)
  }, [paused, visible, images.length])

  const arrow =
    'absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center ' +
    'rounded-full border border-gold-500/40 bg-ink-900/70 text-cream/90 backdrop-blur-sm ' +
    'transition hover:border-gold-500 hover:text-gold-400'

  return (
    <div
      className="relative mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-fg-soft text-[10px] uppercase tracking-[0.25em]">
          {images.length} Photos
        </span>
      </div>

      <div
        ref={stripRef}
        className="events-strip -mx-5 px-5 md:mx-0 md:px-0 flex gap-4 overflow-x-auto"
      >
        {images.map((img, i) => (
          <div
            key={img}
            className="img-zoom flex-shrink-0 overflow-hidden w-[80%] sm:w-[48%] lg:w-[32%] aspect-[16/10]"
          >
            <img
              src={img}
              alt={`${title} ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photos"
            className={`${arrow} left-1 md:-left-5`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photos"
            className={`${arrow} right-1 md:-right-5`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  )
}

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
        <style>{`
          /* Photo strips stay swipeable/scrollable, but the bar itself is
             hidden — the arrow buttons are the visible affordance.
             scroll-behavior stays 'auto' and scroll-snap is off: both would
             fight the frame-by-frame glide and make each move land instantly. */
          .events-strip {
            scrollbar-width: none;
            -ms-overflow-style: none;
            scroll-behavior: auto;
            scroll-snap-type: none;
          }
          .events-strip::-webkit-scrollbar { display: none; }
        `}</style>
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
                  {/* Images — every photo from this date */}
                  <EventPhotoStrip images={e.images} title={e.title} />
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
