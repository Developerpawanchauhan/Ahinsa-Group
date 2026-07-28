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

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-900/96 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center
                   text-white/60 hover:text-gold-400 border border-white/10 hover:border-gold-500
                   transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>

      {many && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white/40 text-xs font-mono tracking-widest">
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
                     text-white/60 hover:text-gold-400 border border-white/10 hover:border-gold-500
                     transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <img
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        className="max-h-[84vh] max-w-[84vw] object-contain shadow-2xl"
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
                     text-white/60 hover:text-gold-400 border border-white/10 hover:border-gold-500
                     transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {many && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 overflow-x-auto max-w-[80vw] px-2 py-1"
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
