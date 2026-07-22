import { Instagram } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// Turns any Instagram post/reel URL into its official embed URL.
// e.g. https://www.instagram.com/reel/ABC123/  →  https://www.instagram.com/reel/ABC123/embed/
function embedSrc(url) {
  const m = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed/` : null
}

/* Official Instagram embeds (public posts only) in a grid that matches the
   site's card styling. `posts` entries are either:
   - a string: an instagram.com post/reel URL → rendered as an official embed
   - an object { image, url }: a local image card linking to `url` — used when
     a specific carousel slide must be shown (embeds always start at slide 1) */
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
  if (!items.length) return null

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
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
            </Reveal>
          ))}
        </div>

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
