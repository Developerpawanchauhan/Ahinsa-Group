import { Link } from 'react-router-dom'
import { ArrowRight, Building2, MapPin, Navigation } from 'lucide-react'

/**
 * One of our own premises — head office, corporate office. Shown on the About
 * and Contact pages; the homepage portfolio grid deliberately leaves these out
 * (see OFFICES / DEVELOPMENTS in src/data/site.js).
 *
 * Deliberately lighter than the homepage ProjectCard: an office is a place to
 * visit, so the address and directions lead, not a sales blurb.
 */
export default function OfficeCard({ office }) {
  return (
    <div className="card-glass group overflow-hidden h-full flex flex-col">
      <Link to={`/projects/${office.slug}`} className="img-zoom aspect-[4/3] relative block">
        <img src={office.image} alt={office.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-transparent to-transparent" />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-gold-700 dark:text-gold-500 uppercase tracking-[0.2em]">
          <Building2 className="w-3.5 h-3.5" />
          {office.type}
        </div>

        <h3 className="font-serif text-2xl text-fg mt-3">
          <Link to={`/projects/${office.slug}`} className="hover:text-gold-700 dark:hover:text-gold-500 transition">
            {office.name}
          </Link>
        </h3>

        <div className="flex items-start gap-2 text-fg-soft text-sm mt-3 flex-1">
          <MapPin className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0" />
          {office.address}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
          {office.mapUrl && (
            <a
              href={office.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest hover:underline"
            >
              <Navigation className="w-3 h-3" />
              Directions
            </a>
          )}
          <Link
            to={`/projects/${office.slug}`}
            className="inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest hover:underline"
          >
            View <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
