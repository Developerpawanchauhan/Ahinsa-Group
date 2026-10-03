import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/* Full-screen image viewer. Controlled: the parent owns `index` (null = closed)
   and reacts to `onClose` / `onNavigate`. Styling and keys match the brochure
   lightbox — Esc closes, arrows step, clicking the backdrop closes. */
export default function ImageLightbox({ images = [], index = null, onClose, onNavigate, alt = 'Image' }) {
  const open = index !== null && index >= 0 && index < images.length

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
      else if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, index, images.length, onClose, onNavigate])

  // Lock body scroll while open so the page behind doesn't move.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const many = images.length > 1

  // The overlay is /95, not /96: 96 is not a step on Tailwind's opacity scale,
  // so that class produced no rule at all and the overlay was blur only. Over a
  // dark page it passed; in the light theme it left the white controls on cream.
  return (
    <div
      className="fixed inset-0 z-50 bg-ink-900/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center
                   bg-ink-900/70 text-white backdrop-blur-sm border border-white/30 shadow-lg
                   hover:bg-gold-500 hover:text-ink-900 hover:border-gold-500
                   transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>

      {many && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-ink-900/70 backdrop-blur-sm px-3 py-1 text-white/80 text-xs font-mono tracking-widest">
          {index + 1} &nbsp;/&nbsp; {images.length}
        </div>
      )}

      {many && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((index - 1 + images.length) % images.length)
          }}
          aria-label="Previous image"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center
                     bg-ink-900/70 text-white backdrop-blur-sm border border-white/30 shadow-lg
                   hover:bg-gold-500 hover:text-ink-900 hover:border-gold-500
                     transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <img
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        className="max-h-[84vh] max-w-[84vw] lg:max-h-[105vh] lg:max-w-[105vw] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {many && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((index + 1) % images.length)
          }}
          aria-label="Next image"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center
                     bg-ink-900/70 text-white backdrop-blur-sm border border-white/30 shadow-lg
                   hover:bg-gold-500 hover:text-ink-900 hover:border-gold-500
                     transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {many && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 overflow-x-auto max-w-[80vw] lg:max-w-[100vw] px-2 py-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(i)
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`flex-shrink-0 w-14 h-10 overflow-hidden border transition-all duration-200 ${
                i === index ? 'border-gold-500 opacity-100' : 'border-white/10 opacity-40 hover:opacity-70'
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
