import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { COMPANY } from '../data/site'

// The shared frame of the link pages (/portfolio, /reviews): one phone-width
// column on a light, animated cream-and-gold backdrop — logo, name, tagline,
// then the page's own list of links. They stand on their own (STANDALONE_PATHS
// in App.jsx) and are light-only (LIGHT_ONLY_PATHS in hooks/useTheme.jsx).

export const EASE = [0.22, 1, 0.36, 1]

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#F1E9D6] via-[#F7F2E7] to-[#FBF8F1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.20),transparent_60%)]" />
      <motion.div
        className="absolute -left-36 top-1/4 h-80 w-80 rounded-full bg-gold-300/35 blur-[90px]"
        animate={still ? undefined : { x: [0, 70, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-36 bottom-6 h-96 w-96 rounded-full bg-gold-200/50 blur-[100px]"
        animate={still ? undefined : { x: [0, -60, 0], y: [0, 30, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
      />
      {!still &&
        SPECKS.map(([left, size, duration, delay], i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full bg-gold-500 shadow-[0_0_6px_rgba(201,162,39,0.7)]"
            style={{ left: `${left}%`, width: size, height: size }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-105vh', opacity: [0, 0.7, 0.7, 0] }}
            transition={{
              y: { duration, delay, repeat: Infinity, ease: 'linear' },
              opacity: { duration, delay, repeat: Infinity, times: [0, 0.1, 0.8, 1] },
            }}
          />
        ))}
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
        className="absolute inset-3 rounded-full bg-gold-300/45 blur-2xl"
        animate={still ? undefined : { opacity: [0.45, 0.9, 0.45], scale: [0.92, 1.05, 0.92] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-gold-500/30" />
      <span
        aria-hidden="true"
        className="absolute inset-[10px] rounded-full bg-white/85 shadow-[0_24px_50px_-24px_rgba(135,104,24,0.55)]"
      />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(201,162,39,0.95) 70deg, transparent 140deg)',
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

/** A small gold heading between groups of links: "Follow us", "Visit us"… */
export function Divider({ item, children }) {
  return (
    <motion.li
      variants={item}
      className="flex items-center gap-3 pb-1 pt-5 text-[10px] uppercase tracking-[0.35em] text-gold-700"
    >
      <span className="h-px flex-1 bg-gold-500/35" />
      {children}
      <span className="h-px flex-1 bg-gold-500/35" />
    </motion.li>
  )
}

/**
 * The page frame. `children` is a function given `{ item, still }` — `item` is
 * the entrance animation each list row takes as its `variants` — returning the
 * page's <li> rows.
 */
export default function LinkPage({ children }) {
  const still = useReducedMotion()
  const item = still ? FADE : RISE

  // Tint the phone's browser bar cream to match while here (the site's default
  // is the dark theme's ink).
  useEffect(() => {
    const tag = document.querySelector('meta[name="theme-color"]')
    const previous = tag?.getAttribute('content')
    tag?.setAttribute('content', '#F1E9D6')
    return () => {
      if (tag && previous) tag.setAttribute('content', previous)
    }
  }, [])

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-cream text-ink-800">
      <Backdrop still={still} />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[26rem] flex-col items-center px-5 pt-[max(2.75rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
        <LogoMark still={still} />

        <h1 className="mt-6 text-center font-serif text-[2.1rem] leading-none text-ink-900">
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
          className="mt-4 text-center font-display text-lg italic text-gold-700"
          initial={{ opacity: 0, y: still ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        >
          {COMPANY.tagline}
        </motion.p>
        <motion.p
          className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-ink-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <MapPin className="h-3.5 w-3.5 text-gold-600" />
          Agra · Gwalior
        </motion.p>

        <motion.ul variants={LIST} initial="hidden" animate="show" className="mt-8 w-full space-y-3">
          {children({ item, still })}
        </motion.ul>

        <motion.p
          className="mt-auto pt-12 text-center text-[11px] tracking-wide text-ink-500"
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
