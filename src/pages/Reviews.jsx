import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import LinkPage, { Divider } from '../components/LinkPage'
import { DEVELOPMENTS } from '../data/site'
import { PAGE_META } from '../data/seo'
import usePageMeta from '../hooks/usePageMeta'

// Our projects' Google Business Profiles (/reviews), on the same frame as the
// portfolio page. Not linked from the site, and noindex (PAGE_META.reviews).

// The g.page/…/review links open straight on "write a review"; the
// share.google links open the profile. Each card's photo and location come
// from the project's own data (`slug`), the same as its card on the site.
const GOOGLE_PROFILES = [
  { slug: 'grand-green-valley', name: 'Ahinsa The Grand Green Valley', href: 'https://g.page/r/CeIEu1N9yLKQEAE/review', review: true },
  { slug: 'green-valley-township', name: 'Ahinsa Green Valley', href: 'https://share.google/XIEeBVpbPLI7XDNPm' },
  { slug: 'green-valley-empire', name: 'Ahinsa Green Valley Empire', href: 'https://share.google/nKeoBR40d4TuBpgMv' },
  { slug: 'green-valley-orchid', name: 'Ahinsa Green Valley Orchid', href: 'https://g.page/r/CVzO-RKs920yEAI/review', review: true },
  { slug: 'green-valley-residency', name: 'The Pride - Ahinsa Green Valley Residency', href: 'https://share.google/xm8e6J9PLZ7slGryi' },
].map((profile) => {
  const project = DEVELOPMENTS.find((p) => p.slug === profile.slug)
  return { ...profile, image: project?.image, location: project?.location }
})

/** Google's four-colour "G". */
function GoogleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

/** A project's Google Business Profile as a card: its photo, then its name and the Google action. */
function GoogleCard({ profile, item, index }) {
  const action = profile.review ? 'Write a review' : 'View on Google'
  return (
    <motion.li variants={item}>
      <motion.a
        href={profile.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${profile.name}: ${profile.review ? 'Write a review on Google' : 'View on Google'}`}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="group block overflow-hidden rounded-2xl border border-gold-500/20 bg-white/85 shadow-[0_14px_36px_-20px_rgba(135,104,24,0.55)] backdrop-blur-md transition-colors duration-300 hover:border-gold-500/50 hover:bg-white"
      >
        {profile.image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={profile.image}
              alt={profile.name}
              loading={index < 2 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900/55 to-transparent" />
            {profile.location && (
              <span className="absolute bottom-3 left-3 inline-flex max-w-[85%] items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-ink-800 shadow-sm backdrop-blur">
                <MapPin className="h-3 w-3 shrink-0 text-gold-600" />
                <span className="truncate">{profile.location}</span>
              </span>
            )}
          </div>
        )}
        {/* The name gets the full width; the Google mark and action sit under it. */}
        <div className="p-4">
          <span className="block font-medium leading-snug text-ink-900">{profile.name}</span>
          <span className="mt-3 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-xs text-ink-500">
              <GoogleIcon className="h-4 w-4" />
              Google Business Profile
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gold-500 px-3 py-1.5 text-[11px] font-semibold text-ink-900 transition-colors duration-300 group-hover:bg-gold-400">
              {action}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
      </motion.a>
    </motion.li>
  )
}

export default function Reviews() {
  usePageMeta(PAGE_META.reviews)

  return (
    <LinkPage>
      {({ item }) => (
        <>
          <Divider item={item}>Our projects on Google</Divider>
          {GOOGLE_PROFILES.map((profile, i) => (
            <GoogleCard key={profile.href} profile={profile} item={item} index={i} />
          ))}
        </>
      )}
    </LinkPage>
  )
}
