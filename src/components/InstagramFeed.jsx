import { useEffect, useRef, useState } from 'react'
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// Turns any Instagram post/reel URL into its official embed URL.
// e.g. https://www.instagram.com/reel/ABC123/  →  https://www.instagram.com/reel/ABC123/embed/
// Exported for the project gallery, which plays Instagram videos too.
export function embedSrc(url) {
  const m = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed/` : null
}

/* One card's width: most of a phone's screen so the next one peeks in, two
   across from sm, three from lg. Each takes its share of the gap-7 (1.75rem)
   between cards out first, so a full row adds up to exactly 100%. */
const CARD = 'w-[85%] sm:w-[calc(50%-0.875rem)] lg:w-[calc(33.333%-1.167rem)]'

const ARROW =
  'absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center ' +
  'rounded-full border border-gold-500/40 bg-ink-900/70 text-cream/90 backdrop-blur-sm shadow-lg ' +
  'transition hover:border-gold-500 hover:text-gold-400 ' +
  'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gold-500/40 disabled:hover:text-cream/90'

/* Official Instagram embeds (public posts only), three to a row, with the rest
   a side-scroll away behind arrow buttons. `posts` entries are either:
   - a string: an instagram.com post/reel URL → rendered as an official embed
   - an object { image, url }: a local image card linking to `url` — used when
     a specific carousel slide must be shown (embeds always start at slide 1)

   Scrolled by the arrows (and by swipe), never on its own: these are live
   embeds a visitor may be watching, and each is a full Instagram iframe, so the
   row is not looped or repeated the way the photo strips are. */
export default function InstagramFeed({ handle, posts = [] }) {
  const items = posts
    .map((p) => {
      if (typeof p === 'string') {
        const src = embedSrc(p)
        return src ? { kind: 'embed', src } : null
      }
      return p && p.image ? { kind: 'image', image: p.image, url: p.url } : null
    })
    .filter(Boolean)

  const trackRef = useRef(null)
  // Whether the row is at its start / end — each arrow greys out at its end,
  // and both disappear when everything already fits.
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

  // One card per press. The step is read from where the first two cards sit,
  // so it includes the gap and stays right at every breakpoint — and under the
  // desktop page zoom, where measuring a single card would come out short.
  const step = (dir) => {
    const el = trackRef.current
    if (!el) return
    const [a, b] = el.children
    const width = a && b ? b.offsetLeft - a.offsetLeft : el.clientWidth
    el.scrollBy({ left: dir * width, behavior: 'smooth' })
  }

  if (!items.length) return null

  const overflows = !(edges.start && edges.end)

  return (
    <section className="section-pad bg-page-alt border-t border-soft">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionHeading
            center
            eyebrow={`@${handle}`}
            title={<>Moments from <span className="gold-text">Instagram</span></>}
            subtitle="Live from our official Instagram — site progress, launches and community moments."
          />
        </div>

        <Reveal>
          <div className="relative">
            {/* Its own scrollbar-hiding rather than PhotoStrip's .photo-strip,
                which turns scroll-snap off for the strips' glide. Here the snap
                is wanted, so a swipe always settles on a whole card. The
                scroll-px keeps that snap clear of the phone-width padding. */}
            <div
              ref={trackRef}
              className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-5 px-5 scroll-px-5 md:mx-0 md:px-0 md:scroll-px-0 flex gap-7 overflow-x-auto snap-x snap-mandatory"
            >
              {items.map((item, i) => (
                <div key={i} className={`flex-shrink-0 snap-start ${CARD}`}>
                  {item.kind === 'embed' ? (
                    <div className="card-glass overflow-hidden">
                      <iframe
                        src={item.src}
                        title={`Instagram post ${i + 1}`}
                        className="w-full block"
                        style={{ height: 540 }}
                        frameBorder="0"
                        scrolling="no"
                        loading="lazy"
                        allow="encrypted-media"
                      />
                    </div>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-glass overflow-hidden block group"
                    >
                      <div className="img-zoom" style={{ height: 488 }}>
                        <img
                          src={item.image}
                          alt={`Instagram post ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center justify-between px-4 py-3.5 border-t border-soft bg-page">
                        <span className="flex items-center gap-2 text-fg-muted text-xs uppercase tracking-widest">
                          <Instagram className="w-4 h-4 text-gold-500" /> @{handle}
                        </span>
                        <span className="text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest group-hover:opacity-70 transition">
                          View post
                        </span>
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {overflows && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={edges.start}
                  aria-label="Previous Instagram posts"
                  className={`${ARROW} left-1 md:-left-5`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={edges.end}
                  aria-label="Next Instagram posts"
                  className={`${ARROW} right-1 md:-right-5`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </Reveal>

        <div className="text-center mt-12">
          <a
            href={`https://www.instagram.com/${handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex"
          >
            <Instagram className="w-4 h-4" /> Follow @{handle}
          </a>
        </div>
      </div>
    </section>
  )
}
