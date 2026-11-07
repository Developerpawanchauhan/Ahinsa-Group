import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import LinkPage, { Divider } from '../components/LinkPage'
import { PAGE_META } from '../data/seo'
import usePageMeta from '../hooks/usePageMeta'

// Our projects' Google Business Profiles (/reviews), on the same frame as the
// portfolio page. Not linked from the site, and noindex (PAGE_META.reviews).

// The g.page/…/review links open straight on "write a review"; the
// share.google links open the profile.
const GOOGLE_PROFILES = [
  { name: 'Ahinsa The Grand Green Valley', href: 'https://g.page/r/CeIEu1N9yLKQEAE/review', review: true },
  { name: 'Ahinsa Green Valley', href: 'https://share.google/XIEeBVpbPLI7XDNPm' },
  { name: 'Ahinsa Green Valley Empire', href: 'https://share.google/nKeoBR40d4TuBpgMv' },
  { name: 'Ahinsa Green Valley Orchid', href: 'https://g.page/r/CVzO-RKs920yEAI/review', review: true },
  { name: 'The Pride - Ahinsa Green Valley Residency', href: 'https://share.google/xm8e6J9PLZ7slGryi' },
]

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

/** A project's Google Business Profile. Names can run to two lines, so the row grows with them. */
function GoogleLink({ profile, item }) {
  const action = profile.review ? 'Write a review on Google' : 'View on Google'
  return (
    <motion.li variants={item}>
      <motion.a
        href={profile.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${profile.name}: ${action}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group flex min-h-16 items-center gap-4 rounded-2xl border border-gold-500/20 bg-white/80 px-4 py-3 shadow-[0_10px_30px_-18px_rgba(135,104,24,0.45)] backdrop-blur-md transition-colors duration-300 hover:border-gold-500/50 hover:bg-white"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-100 bg-white shadow-sm">
          <GoogleIcon />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium leading-snug text-ink-900">{profile.name}</span>
          <span className="mt-0.5 block text-xs text-ink-500">{action}</span>
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
          {GOOGLE_PROFILES.map((profile) => (
            <GoogleLink key={profile.href} profile={profile} item={item} />
          ))}
        </>
      )}
    </LinkPage>
  )
}
