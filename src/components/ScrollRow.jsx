import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ARROW =
  'absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center ' +
  'rounded-full border border-gold-500/40 bg-ink-900/70 text-cream/90 backdrop-blur-sm shadow-lg ' +
  'transition hover:border-gold-500 hover:text-gold-400 ' +
  'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gold-500/40 disabled:hover:text-cream/90'

/**
 * A row scrolled sideways by its arrow buttons (and by swipe), for things a
 * visitor plays or reads in place: videos, Instagram embeds.
 *
 * Unlike PhotoStrip it never repeats an item, never loops and never scrolls by
 * itself. Those suit photos, whose copies look the same. They do not suit
 * players: PhotoStrip loops by repeating its cards and silently jumping a whole
 * copy back, so a video playing in one copy was swapped for a still copy of the
 * same tile — the picture stopped while the sound carried on from off screen.
 * Here every item exists once and stays where the visitor left it.
 *
 * Each arrow greys out at its end; both go when everything already fits.
 *
 * @param cardClass  width of one item — and so how many show at once
 * @param gapClass   the gap between items (keep in step with cardClass's maths)
 */
export default function ScrollRow({ items, renderItem, cardClass, gapClass = 'gap-4', label = 'items' }) {
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const update = () =>
      setEdges({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items.length])

  // One item per press. The step is read from where the first two items sit,
  // so it includes the gap and stays right at every breakpoint — and under the
  // desktop page zoom, where measuring a single item would come out short.
  const step = (dir) => {
    const el = trackRef.current
    if (!el) return
    const [a, b] = el.children
    const width = a && b ? b.offsetLeft - a.offsetLeft : el.clientWidth
    el.scrollBy({ left: dir * width, behavior: 'smooth' })
  }

  const overflows = !(edges.start && edges.end)

  return (
    <div className="relative">
      {/* Snap so a swipe settles on a whole item; scroll-px keeps the snap
          clear of the phone-width padding. */}
      <div
        ref={trackRef}
        className={`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-5 px-5 scroll-px-5 md:mx-0 md:px-0 md:scroll-px-0 flex ${gapClass} overflow-x-auto snap-x snap-mandatory`}
      >
        {items.map((item, i) => (
          <div key={i} className={`flex-shrink-0 snap-start ${cardClass}`}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {overflows && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label={`Previous ${label}`}
            className={`${ARROW} left-1 md:-left-5`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label={`Next ${label}`}
            className={`${ARROW} right-1 md:-right-5`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  )
}
