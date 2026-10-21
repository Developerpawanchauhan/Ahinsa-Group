import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Facebook, Globe, Instagram, Linkedin, MapPin, Youtube } from 'lucide-react'
import { WHATSAPP_URL, WhatsAppIcon } from '../components/WhatsAppButton'
import { COMPANY } from '../data/site'
import { PAGE_META } from '../data/seo'
import usePageMeta from '../hooks/usePageMeta'

// The link-in-bio page shared on social profiles (/portfolio). It stands on
// its own — App.jsx leaves the site's navbar, footer and floating buttons off
// it — and is dark and gold whichever theme the visitor has picked. Built for
// a phone first; on a desktop it is the same column, centred.

const EASE = [0.22, 1, 0.36, 1]

// The profiles the navbar and footer link to, plus WhatsApp.
const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@ahinsagroupagra',
    href: 'https://www.instagram.com/ahinsagroupagra/',
    icon: Instagram,
    chip: 'bg-gradient-to-br from-[#FEDA75] via-[#D62976] to-[#4F5BD5]',
  },
  {
    name: 'Facebook',
    handle: 'Ahinsa Group',
    href: 'https://www.facebook.com/profile.php?id=61589690406055',
    icon: Facebook,
    chip: 'bg-[#1877F2]',
  },
  {
    name: 'YouTube',
    handle: '@AhinsaGroupAgra',
    href: 'https://www.youtube.com/@AhinsaGroupAgra',
    icon: Youtube,
    chip: 'bg-[#FF0033]',
  },
  {
    name: 'LinkedIn',
    handle: 'Ahinsa Group Agra',
    href: 'https://www.linkedin.com/company/ahinsa-group-agra/',
    icon: Linkedin,
    chip: 'bg-[#0A66C2]',
  },
  {
    name: 'WhatsApp',
    handle: COMPANY.phone,
    href: WHATSAPP_URL,
    icon: WhatsAppIcon,
    chip: 'bg-[#25D366]',
  },
]

// Gold specks drifting up the screen: [left %, size px, seconds to rise, delay].
const SPECKS = [
  [6, 3, 15, 0], [16, 2, 19, 3], [25, 4, 17, 7], [34, 2, 21, 1], [44, 3, 16, 5], [53, 2, 20, 9],
  [62, 4, 18, 2], [71, 2, 22, 6], [80, 3, 17, 4], [90, 2, 19, 8], [12, 2, 23, 11], [57, 3, 21, 12],
]

// Shows only the outer 2px of a filled circle — the logo's turning gold ring.
const RING_MASK = 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))'

// The links arrive one after another once the logo has landed.
const LIST = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.65 } } }
const RISE = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE } },
}
const FADE = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }

/** Slow gold light and rising specks behind everything. Still when `still`. */
function Backdrop({ still }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.22),transparent_60%)]" />
      <motion.div
        className="absolute -left-36 top-1/4 h-80 w-80 rounded-full bg-gold-500/20 blur-[90px]"
        animate={still ? undefined : { x: [0, 70, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-36 bottom-6 h-96 w-96 rounded-full bg-gold-700/25 blur-[100px]"
        animate={still ? undefined : { x: [0, -60, 0], y: [0, 30, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
      />
      {!still &&
        SPECKS.map(([left, size, duration, delay], i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full bg-gold-300 shadow-[0_0_6px_rgba(228,198,86,0.9)]"
            style={{ left: `${left}%`, width: size, height: size }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-105vh', opacity: [0, 0.9, 0.9, 0] }}
            transition={{
              y: { duration, delay, repeat: Infinity, ease: 'linear' },
              opacity: { duration, delay, repeat: Infinity, times: [0, 0.1, 0.8, 1] },
            }}
          />
        ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6))]" />
    </div>
  )
}

/** The logo, landing out of a blur, inside a glowing circle with a turning gold arc. */
function LogoMark({ still }) {
  return (
    <motion.div
      className="relative grid h-40 w-40 place-items-center sm:h-52 sm:w-52"
      initial={still ? { opacity: 0 } : { opacity: 0, scale: 0.6, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: still ? 0.4 : 0.9, ease: EASE }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-3 rounded-full bg-gold-500/25 blur-2xl"
        animate={still ? undefined : { opacity: [0.45, 0.9, 0.45], scale: [0.92, 1.05, 0.92] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-gold-500/20" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(228,198,86,0.95) 70deg, transparent 140deg)',
          WebkitMask: RING_MASK,
          mask: RING_MASK,
        }}
        animate={still ? undefined : { rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        src="/logo.png"
        alt="Ahinsa Group"
        width="500"
        height="500"
        draggable="false"
        className="relative w-[88%] select-none"
        animate={still ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

function SocialLink({ social, item }) {
  const { name, handle, href, icon: Icon, chip } = social
  return (
    <motion.li variants={item}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name}: ${handle}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group flex h-16 items-center gap-4 rounded-2xl border border-gold-500/20 bg-white/[0.04] px-4 backdrop-blur-md transition-colors duration-300 hover:border-gold-500/50 hover:bg-white/[0.07]"
      >
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-lg ${chip}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-cream">{name}</span>
          <span className="block truncate text-xs text-ink-300">{handle}</span>
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </motion.a>
    </motion.li>
  )
}

export default function Portfolio() {
  usePageMeta(PAGE_META.portfolio)
  const still = useReducedMotion()
  const item = still ? FADE : RISE

  // The page is dark in either theme; match the body so an iPhone's overscroll
  // bounce shows dark too, not the light theme's cream.
  useEffect(() => {
    const previous = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#0B0B08'
    return () => {
      document.body.style.backgroundColor = previous
    }
  }, [])

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-ink-900 text-cream">
      <Backdrop still={still} />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[26rem] flex-col items-center px-5 pt-[max(2.75rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
        <LogoMark still={still} />

        <h1 className="mt-6 text-center font-serif text-[2.1rem] leading-none text-cream">
          {['Ahinsa', 'Group'].map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block"
                initial={still ? { opacity: 0 } : { y: '110%' }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
              >
                {word}
                {i === 0 && ' '}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.span
          aria-hidden="true"
          className="mt-4 h-px w-16 origin-center bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        />

        <motion.p
          className="mt-4 text-center font-display text-lg italic text-gold-400"
          initial={{ opacity: 0, y: still ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        >
          {COMPANY.tagline}
        </motion.p>
        <motion.p
          className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-ink-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <MapPin className="h-3.5 w-3.5 text-gold-500" />
          Agra · Gwalior · Firozabad
        </motion.p>

        <motion.ul variants={LIST} initial="hidden" animate="show" className="mt-8 w-full space-y-3">
          <motion.li variants={item}>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/"
                className="group relative flex h-[4.25rem] items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 px-4 text-ink-900 shadow-[0_20px_45px_-20px_rgba(201,162,39,0.85)] ring-1 ring-gold-300/60"
              >
                {/* A band of light that sweeps across every few seconds. */}
                {!still && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                    style={{ skewX: -12 }}
                    animate={{ x: ['0%', '450%'] }}
                    transition={{ duration: 1.6, delay: 1.4, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                  />
                )}
                <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-900 text-gold-400">
                  <Globe className="h-5 w-5" />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold tracking-wide">Visit Our Website</span>
                  <span className="block text-xs font-medium text-ink-800/80">ahinsagroup.in</span>
                </span>
                <ArrowUpRight className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.li>

          <motion.li
            variants={item}
            className="flex items-center gap-3 pb-1 pt-5 text-[10px] uppercase tracking-[0.35em] text-gold-400/80"
          >
            <span className="h-px flex-1 bg-gold-500/25" />
            Follow us
            <span className="h-px flex-1 bg-gold-500/25" />
          </motion.li>

          {SOCIALS.map((social) => (
            <SocialLink key={social.name} social={social} item={item} />
          ))}
        </motion.ul>

        <motion.p
          className="mt-auto pt-12 text-center text-[11px] tracking-wide text-ink-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          © {new Date().getFullYear()} Ahinsa Group · Agra
        </motion.p>
      </div>
    </div>
  )
}
