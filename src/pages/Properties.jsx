import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Building2, Store, LayoutGrid, Home as HomeIcon, Trees,
  Phone, MessageCircle, CalendarCheck, X, ArrowRight, BadgeCheck,
} from 'lucide-react'

import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { PROJECTS, PROPERTY_LISTINGS, SITE_VISIT_FORM_URL, COMPANY } from '../data/site'

const WHATSAPP_NUMBER = '916398730582'
const TEL_HREF = `tel:${COMPANY.phone.replace(/\s/g, '')}`

const TYPE_ICONS = {
  Shops: Store,
  'Residential Plots': LayoutGrid,
  'Commercial Plots': Building2,
  Villas: HomeIcon,
  'Farm Houses': Trees,
}

// Join availability data with the base project info; a listing's own `image`
// overrides the project's default card image.
const LISTINGS = PROPERTY_LISTINGS.map((l) => {
  const project = PROJECTS.find((p) => p.slug === l.slug)
  return project ? { ...l, project, image: l.image || project.image } : null
}).filter(Boolean)

function totalAvailable(listing) {
  return listing.types.reduce((n, t) => n + t.available, 0)
}

function AvailabilityModal({ listing, onClose }) {
  const { project, types } = listing

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Ahinsa Group, I am interested in available properties at ${project.name}. Please share the details.`
  )}`

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Available properties at ${project.name}`}
        className="relative bg-page border border-gold-500/25 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-page border-b border-soft px-6 md:px-8 py-5 flex items-start justify-between gap-4 z-10">
          <div>
            <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.3em] mb-1.5">
              Available Properties
            </div>
            <h3 className="font-serif text-2xl text-fg leading-tight">{project.name}</h3>
            <div className="flex items-center gap-2 text-fg-soft text-xs mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-500" /> {project.location}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-9 h-9 border border-soft flex items-center justify-center text-fg-muted hover:border-gold-500 hover:text-gold-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Property types */}
        <div className="px-6 md:px-8 py-6 space-y-6">
          {types.map((t) => {
            const Icon = TYPE_ICONS[t.type] || Building2
            const pct = Math.round((t.available / t.total) * 100)
            return (
              <div key={t.type} className="border border-soft p-5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-500">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-fg font-medium">{t.type}</div>
                      <div className="text-fg-soft text-xs mt-0.5">
                        <span className="text-gold-700 dark:text-gold-500 font-semibold">{t.available}</span> available of {t.total}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-gold-500/10 text-gold-700 dark:text-gold-500 border border-gold-500/25">
                    {pct}% open
                  </span>
                </div>

                {/* availability bar */}
                <div className="h-1 bg-soft/60 dark:bg-ink-700 mt-4">
                  <div className="h-full bg-gold-500" style={{ width: `${pct}%` }} />
                </div>

                {/* unit numbers */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {t.units.map((u) => (
                    <span
                      key={u}
                      className="px-2.5 py-1 text-xs border border-gold-500/25 text-fg-muted tracking-wider"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-page border-t border-soft px-6 md:px-8 py-5 grid sm:grid-cols-3 gap-3">
          <a
            href={SITE_VISIT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold justify-center text-center"
          >
            <CalendarCheck className="w-4 h-4" /> Book Site Visit
          </a>
          <a href={TEL_HREF} className="btn-outline-gold justify-center text-center">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold justify-center text-center"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Properties() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <PageHero
        title="Properties"
        subtitle="Explore live availability across our townships — and book a site visit in one click."
        breadcrumb="Properties"
        images={LISTINGS.map((l) => l.image)}
      />

      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {LISTINGS.map((l, i) => (
              <Reveal key={l.slug} delay={(i % 3) * 0.08}>
                <div className="card-glass group overflow-hidden h-full flex flex-col">
                  <div className="img-zoom aspect-[4/3] relative">
                    <img src={l.image} alt={l.project.name} className="w-full h-full object-cover" />
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-widest font-medium ${
                        l.comingSoon
                          ? 'bg-ink-900/85 text-gold-400 border border-gold-500/50'
                          : 'bg-gold-500 text-ink-900'
                      }`}
                    >
                      {l.comingSoon ? 'Coming Soon' : `${totalAvailable(l)} Units Available`}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-gold-700 dark:text-gold-500 uppercase tracking-[0.2em]">
                      <Building2 className="w-3.5 h-3.5" />
                      {l.project.type}
                    </div>
                    <h3 className="font-serif text-2xl text-fg mt-3">{l.project.name}</h3>
                    <div className="flex items-center gap-2 text-fg-soft text-sm mt-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-500" />
                      {l.project.location}
                    </div>

                    {/* type summary chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {l.types.map((t) => (
                        <span
                          key={t.type}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] border border-soft text-fg-muted"
                        >
                          <BadgeCheck className="w-3 h-3 text-gold-500" />
                          {t.type}
                        </span>
                      ))}
                    </div>

                    {l.comingSoon ? (
                      <button
                        disabled
                        className="btn-outline-gold justify-center mt-6 w-full opacity-60 cursor-not-allowed"
                      >
                        Launching Soon
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelected(l)}
                        className="btn-gold justify-center mt-6 w-full"
                      >
                        Check Available Properties <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-16 grid lg:grid-cols-2 gap-8 items-center">
          <Reveal>
            <h2 className="heading-serif text-fg text-3xl md:text-4xl">
              Not sure which property <span className="gold-text">fits you best</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:text-right">
            <a href={TEL_HREF} className="btn-outline-gold">
              <Phone className="w-4 h-4" /> Talk to our advisors
            </a>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {selected && <AvailabilityModal listing={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
