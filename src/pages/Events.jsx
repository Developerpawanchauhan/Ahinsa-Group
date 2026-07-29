import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Tag, ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import ImageLightbox from '../components/ImageLightbox'
import { EVENTS } from '../data/site'

const GAP = 16 // matches gap-4 on the strip
const GLIDE = 200 // ms for a one-card move

/* Solves a CSS cubic-bezier timing curve for y at a given x (progress).
   Newton-Raphson converges in a handful of passes at this precision. */
function cubicBezier(p1x, p1y, p2x, p2y) {
  const a = (c1, c2) => 1 - 3 * c2 + 3 * c1
  const b = (c1, c2) => 3 * c2 - 6 * c1
  const c = (c1) => 3 * c1
  const at = (t, c1, c2) => ((a(c1, c2) * t + b(c1, c2)) * t + c(c1)) * t
  const slope = (t, c1, c2) => 3 * a(c1, c2) * t * t + 2 * b(c1, c2) * t + c(c1)

  return (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 6; i++) {
      const d = slope(t, p1x, p2x)
      if (d === 0) break
      t -= (at(t, p1x, p2x) - x) / d
    }
    return at(t, p1y, p2y)
  }
}

// Exactly CSS `ease-in-out`: eases out of rest and settles back into it.
const easeInOut = cubicBezier(0.42, 0, 0.58, 1)

// Fine-grained thresholds so we can compare how much of each strip is on
// screen, not merely whether it is.
const THRESHOLDS = Array.from({ length: 11 }, (_, i) => i / 10)
// A strip must be at least this visible before it may claim the autoscroll.
const MIN_VISIBLE = 0.25

/* Every photo from one event, scrolled sideways: arrow buttons, no visible
   scrollbar, and an autoscroll that advances a card every 2s. The timer only
   runs while the strip is on screen — otherwise all ten strips on the page
   would animate at once — and pauses on hover, focus or touch. */
function EventPhotoStrip({ images, title, index, active, onVisibility }) {
  const stripRef = useRef(null)
  const rafRef = useRef(0)
  const [paused, setPaused] = useState(false)
  // Index into `images` of the photo shown full screen (null = closed).
  const [lightboxIdx, setLightboxIdx] = useState(null)

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
      el.scrollLeft = from + delta * easeInOut(p)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const step = (dir) => {
    const el = stripRef.current
    if (!el) return
    const card = el.firstElementChild
    const amount = card ? card.offsetWidth + GAP : el.clientWidth * 0.8

    // Distance covered by one full copy of the list. Measured from the DOM so
    // gaps and the mobile side padding are accounted for exactly.
    const first = el.children[0]
    const clone = el.children[images.length]
    const cycle = clone ? clone.offsetLeft - first.offsetLeft : 0

    // The strip renders the photos twice, so there is always another identical
    // copy ahead. Before each move, snap the position back into the first copy
    // — instant and invisible, because the two copies look the same — then
    // glide on from there. The result never runs out and never rewinds.
    if (cycle > 0) {
      if (dir > 0 && el.scrollLeft >= cycle) {
        cancelAnimationFrame(rafRef.current)
        el.scrollLeft -= cycle
      } else if (dir < 0 && el.scrollLeft <= 0) {
        cancelAnimationFrame(rafRef.current)
        el.scrollLeft += cycle
      }
    }

    glideTo(el, el.scrollLeft + dir * amount, GLIDE)
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  // Report how much of this strip is on screen; the parent uses that to pick
  // the single strip allowed to autoscroll.
  useEffect(() => {
    const el = stripRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => onVisibility(index, entry.isIntersecting ? entry.intersectionRatio : 0),
      { threshold: THRESHOLDS }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      onVisibility(index, 0)
    }
  }, [index, onVisibility])

  // `active` is true for exactly one strip at a time. The lightbox check is
  // separate from `paused`: opening it moves the pointer off the strip, which
  // would otherwise un-pause and scroll the row behind the overlay.
  useEffect(() => {
    if (paused || lightboxIdx !== null || !active || images.length < 2) return
    const id = setInterval(() => step(1), 2000)
    return () => clearInterval(id)
  }, [paused, lightboxIdx, active, images.length])

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
        {/* Rendered twice so the loop always has photos ahead of it. The
            second copy is decorative — hidden from screen readers. */}
        {(images.length > 1 ? [...images, ...images] : images).map((img, i) => {
          const isClone = i >= images.length
          const real = i % images.length // clones open the original photo
          return (
            <button
              type="button"
              key={`${img}-${i}`}
              onClick={() => setLightboxIdx(real)}
              aria-hidden={isClone || undefined}
              tabIndex={isClone ? -1 : undefined}
              aria-label={`View ${title} photo ${real + 1} full screen`}
              className="img-zoom group relative flex-shrink-0 overflow-hidden w-[80%] sm:w-[48%] lg:w-[32%] aspect-[16/10] cursor-zoom-in"
            >
              <img
                src={img}
                alt={isClone ? '' : `${title} ${real + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="w-6 h-6 text-cream" />
              </span>
            </button>
          )
        })}
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

      <ImageLightbox
        images={images}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onNavigate={setLightboxIdx}
        alt={`${title} photo`}
      />
    </div>
  )
}

export default function Events() {
  // Only one photo strip autoscrolls at a time: whichever is most on screen.
  // Each strip reports its visible ratio here and the largest one wins.
  const ratios = useRef(new Map())
  const [activeStrip, setActiveStrip] = useState(-1)

  const handleVisibility = useCallback((index, ratio) => {
    ratios.current.set(index, ratio)
    let best = -1
    let bestRatio = MIN_VISIBLE
    ratios.current.forEach((r, i) => {
      if (r > bestRatio) {
        bestRatio = r
        best = i
      }
    })
    setActiveStrip((prev) => (prev === best ? prev : best))
  }, [])

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
                  <EventPhotoStrip
                    images={e.images}
                    title={e.title}
                    index={i}
                    active={activeStrip === i}
                    onVisibility={handleVisibility}
                  />
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
