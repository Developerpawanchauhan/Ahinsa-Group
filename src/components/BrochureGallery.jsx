import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, BookOpen, Images } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// ─── Data ───────────────────────────────────────────────────────────────────

function range(n) {
  return Array.from({ length: n }, (_, i) => `${i + 1}.png`)
}

const BROCHURE_PROJECTS = [
  {
    id: 'grand',
    label: 'Ahinsa The Grand Green Valley',
    shortLabel: 'Grand Green Valley',
    folder: 'ahinsa-the grand',
    images: range(42),
  },
  {
    id: 'township',
    label: 'Ahinsa Green Valley Township',
    shortLabel: 'GV Township',
    folder: 'ahinsa-green-valley',
    images: range(25),
  },
  {
    id: 'empire',
    label: 'Ahinsa Green Valley Empire',
    shortLabel: 'GV Empire',
    folder: 'ahinsa-empire',
    images: range(36),
  },

  {
    id: 'firozabad',
    label: 'Ahinsa Mall Firozabad',
    shortLabel: 'Mall Firozabad',
    folder: 'firozabad',
    images: [
      '01.png','02.png','03.png','04.png','05.png','06.png','07.png','08.png','09.png',
      '10.png','11.png','12.png','13.png','14.png','15.png','16.png','17.png','18.png',
      '19.png','20.png','21.png','22.png','23.png','24 (2).png','25.png','26.png',
      '27.png','28.png','29 (2).png','30.png','31.png','32.png','34.png','35.png',
      '36.png','37.png','38.png',
    ],
  },
]

// ─── Component ──────────────────────────────────────────────────────────────

export default function BrochureGallery({ defaultId = 'grand' }) {
  const [activeId, setActiveId]       = useState(defaultId)
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const trackRef                      = useRef(null)

  const project = BROCHURE_PROJECTS.find(p => p.id === activeId)
  const imgSrc  = (file) => `/images/brochure/${project.folder}/${file}`

  // Carousel scroll
  const scrollCarousel = (dir) => {
    if (!trackRef.current) return
    const card = trackRef.current.firstElementChild
    if (!card) return
    const amount = card.getBoundingClientRect().width + 16 // card + gap-4
    trackRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  // Reset scroll when project changes
  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollLeft = 0
  }, [activeId])

  // Lightbox: keyboard navigation
  const closeLightbox = () => setLightboxIdx(null)
  const lbPrev = () => setLightboxIdx(i => (i - 1 + project.images.length) % project.images.length)
  const lbNext = () => setLightboxIdx(i => (i + 1) % project.images.length)

  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft')       lbPrev()
      else if (e.key === 'ArrowRight') lbNext()
      else if (e.key === 'Escape')     closeLightbox()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [lightboxIdx, activeId])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIdx])

  const switchProject = (id) => {
    setLightboxIdx(null)
    setActiveId(id)
  }

  return (
    <section className="section-pad bg-page-alt">
      <div className="container-x">

        {/* ── Heading ── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionHeading
            center
            eyebrow="Project Brochures"
            title={<>Browse our <span className="gold-text">project galleries</span></>}
            subtitle="Select a project to explore its full brochure — layouts, amenities and master plan in one place."
          />
        </div>

        {/* ── Project selector tabs ── */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {BROCHURE_PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => switchProject(p.id)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 border ${
                  activeId === p.id
                    ? 'bg-ink-900 text-gold-400 border-gold-500 shadow-lg shadow-gold-500/10'
                    : 'bg-transparent text-fg-muted border-soft hover:border-gold-500/60 hover:text-gold-500'
                }`}
              >
                {p.shortLabel}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Active project label + count ── */}
        <Reveal delay={0.05}>
          <div className="flex items-center gap-3 mb-6">
            <Images className="w-5 h-5 text-gold-500" />
            <span className="text-fg font-medium">{project.label}</span>
            <span className="text-fg-muted text-sm">— {project.images.length} pages</span>
          </div>
        </Reveal>

        {/* ── Carousel ── */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* Left scroll button */}
            <button
              onClick={() => scrollCarousel(-1)}
              aria-label="Scroll left"
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center
                         bg-page-alt border border-soft hover:border-gold-500 text-fg-muted hover:text-gold-400
                         transition-all duration-200 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable track — 3 landscape images visible */}
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto mx-5"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {project.images.map((file, i) => (
                <button
                  key={file}
                  onClick={() => setLightboxIdx(i)}
                  className="group relative flex-shrink-0 overflow-hidden bg-soft border border-soft
                             hover:border-gold-500/60 transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  style={{ width: 'calc((100% - 2rem) / 3)', aspectRatio: '4 / 3' }}
                >
                  <img
                    src={imgSrc(file)}
                    alt={`${project.label} — page ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/40 transition-all duration-300
                                  flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300
                                     scale-75 group-hover:scale-100 w-10 h-10 rounded-full bg-gold-500
                                     flex items-center justify-center shadow-lg">
                      <BookOpen className="w-4 h-4 text-ink-900" />
                    </span>
                  </div>
                  {/* Page badge */}
                  <span className="absolute bottom-2 right-2.5 text-[10px] text-white/50 font-mono
                                   group-hover:text-gold-400 transition-colors">
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Right scroll button */}
            <button
              onClick={() => scrollCarousel(1)}
              aria-label="Scroll right"
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center
                         bg-page-alt border border-soft hover:border-gold-500 text-fg-muted hover:text-gold-400
                         transition-all duration-200 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        </Reveal>

      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-ink-900/96 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center
                       text-white/60 hover:text-gold-400 border border-white/10 hover:border-gold-500
                       transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white/40 text-xs font-mono tracking-widest">
            {lightboxIdx + 1} &nbsp;/&nbsp; {project.images.length}
          </div>

          {/* Project name */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-gold-400/70 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
            {project.label}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); lbPrev() }}
            aria-label="Previous"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center
                       text-white/60 hover:text-gold-400 border border-white/10 hover:border-gold-500
                       transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main image */}
          <img
            src={imgSrc(project.images[lightboxIdx])}
            alt={`${project.label} — page ${lightboxIdx + 1}`}
            className="max-h-[84vh] max-w-[84vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); lbNext() }}
            aria-label="Next"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center
                       text-white/60 hover:text-gold-400 border border-white/10 hover:border-gold-500
                       transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 overflow-x-auto max-w-[80vw] px-2 py-1"
               style={{ scrollbarWidth: 'none' }}>
            {project.images.map((file, i) => (
              <button
                key={file}
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i) }}
                className={`flex-shrink-0 w-14 h-10 overflow-hidden border transition-all duration-200 ${
                  i === lightboxIdx
                    ? 'border-gold-500 opacity-100'
                    : 'border-white/10 opacity-40 hover:opacity-70'
                }`}
              >
                <img src={imgSrc(file)} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
