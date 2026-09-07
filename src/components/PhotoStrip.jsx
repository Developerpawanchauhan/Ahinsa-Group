import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

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

// The row loops by repeating the photos and snapping back a whole copy once
// the scroll passes one. That only works while the repeated row is wider than
// the viewport plus a copy — with a handful of photos two copies are not, the
// snap-back point sits past the furthest the browser will scroll, and the
// strip stops dead at the end. Repeat enough times to clear that comfortably.
const MIN_CARDS = 9
// A strip must be at least this visible before it may claim the autoscroll.
const MIN_VISIBLE = 0.25

/**
 * Shared by every page that shows more photos than fit in a row: the events
 * diary and each section of a project's gallery.
 *
 * Only one strip on a page may autoscroll at a time — otherwise a dozen rows
 * animate at once and the page never sits still. This hook collects how much
 * of each strip is on screen and hands back the index of the winner.
 *
 *   const { activeStrip, onVisibility } = useStripArbiter()
 *   <PhotoStrip index={i} active={activeStrip === i} onVisibility={onVisibility} … />
 */
export function useStripArbiter() {
  const ratios = useRef(new Map())
  const [activeStrip, setActiveStrip] = useState(-1)

  const onVisibility = useCallback((index, ratio) => {
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

  return { activeStrip, onVisibility }
}

/**
 * One row of photos scrolled sideways: arrow buttons, no visible scrollbar,
 * and an autoscroll that advances a card every 2s while the row is the one on
 * screen. Pauses on hover, focus and touch.
 *
 * The strip owns no lightbox — it calls `onOpen(i)` with the index of the
 * photo within `images`, so the caller can map that onto whatever collection
 * its own lightbox is showing.
 *
 * @param frozen  stop the autoscroll from outside — the caller's lightbox is
 *                open, and the pointer leaving the strip would otherwise
 *                un-pause it and scroll the row behind the overlay.
 */
export default function PhotoStrip({
  images,
  label,
  index,
  active,
  onVisibility,
  onOpen,
  frozen = false,
  countLabel = true,
}) {
  const stripRef = useRef(null)
  const rafRef = useRef(0)
  const [paused, setPaused] = useState(false)

  // How many times the list is repeated (see MIN_CARDS). A single photo has
  // nothing to scroll, so it is never repeated.
  const copies = images.length > 1 ? Math.max(2, Math.ceil(MIN_CARDS / images.length)) : 1
  const cards = copies > 1 ? Array.from({ length: copies }, () => images).flat() : images

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

    // The strip repeats the photos, so there is always another identical copy
    // ahead. Before each move, snap the position back into the first copy —
    // instant and invisible, because the copies look the same — then glide on
    // from there. The result never runs out and never rewinds.
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

  // Report how much of this strip is on screen; the arbiter uses that to pick
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

  // `active` is true for exactly one strip at a time.
  useEffect(() => {
    if (paused || frozen || !active || images.length < 2) return
    const id = setInterval(() => step(1), 2000)
    return () => clearInterval(id)
  }, [paused, frozen, active, images.length])

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
      {countLabel && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-fg-soft text-[10px] uppercase tracking-[0.25em]">
            {images.length} {images.length === 1 ? 'Photo' : 'Photos'}
          </span>
        </div>
      )}

      <div
        ref={stripRef}
        className="photo-strip -mx-5 px-5 md:mx-0 md:px-0 flex gap-4 overflow-x-auto"
      >
        {/* Repeated so the loop always has photos ahead of it. Every copy
            after the first is decorative — hidden from screen readers. */}
        {cards.map((img, i) => {
          const isClone = i >= images.length
          const real = i % images.length // clones open the original photo
          return (
            <button
              type="button"
              key={`${img}-${i}`}
              onClick={() => onOpen(real)}
              aria-hidden={isClone || undefined}
              tabIndex={isClone ? -1 : undefined}
              aria-label={`View ${label} photo ${real + 1} full screen`}
              className="img-zoom group relative flex-shrink-0 overflow-hidden w-[80%] sm:w-[48%] lg:w-[32%] aspect-[16/10] cursor-zoom-in"
            >
              <img
                src={img}
                alt={isClone ? '' : `${label} ${real + 1}`}
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
    </div>
  )
}

/** The scrollbar is hidden — the arrow buttons are the visible affordance.
 *  Mount once per page that uses PhotoStrip. */
export function PhotoStripStyles() {
  return (
    <style>{`
      /* Strips stay swipeable/scrollable, but the bar itself is hidden.
         scroll-behavior stays 'auto' and scroll-snap is off: both would
         fight the frame-by-frame glide and make each move land instantly. */
      .photo-strip {
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: auto;
        scroll-snap-type: none;
      }
      .photo-strip::-webkit-scrollbar { display: none; }
    `}</style>
  )
}
