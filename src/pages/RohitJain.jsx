import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CalendarDays, Check, ChevronDown, ChevronRight, Clock, Facebook, Gem, Leaf,
  Link2, Linkedin, MapPin, MessageCircle, Quote, ShieldCheck, Twitter, Users,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import VideoTile from '../components/VideoTile'
import { AWARDS, COMPANY, DEVELOPMENTS, EVENTS, MANAGEMENT } from '../data/site'
import { PAGE_META, ROHIT_JAIN_ARTICLE, pageUrl } from '../data/seo'
import usePageMeta from '../hooks/usePageMeta'

// This page is light-only (see LIGHT_ONLY_PATHS in hooks/useTheme.jsx), so it
// is styled for the light theme alone — no `dark:` variants anywhere below.

// The article's sections, in order: `label` in the contents list, `title` as
// the heading on the page.
const SECTIONS = [
  { id: 'entrepreneur-to-builder', label: 'Entrepreneur to Builder', title: 'From Entrepreneur to Builder: The Rohit Jain Story' },
  { id: 'the-name-ahinsa', label: 'Why “Ahinsa”', title: 'Why Rohit Jain Named His Company Ahinsa' },
  { id: 'projects', label: 'Projects', title: 'Rohit Jain’s Projects with Ahinsa Group' },
  { id: 'leadership-philosophy', label: 'Leadership Philosophy', title: 'Leadership Philosophy and Values' },
  { id: 'awards', label: 'Awards & Recognition', title: 'Rohit Jain: Awards and Recognition' },
  { id: 'media', label: 'In the Media', title: 'Rohit Jain in the Media' },
  { id: 'social-leadership', label: 'Social Leadership', title: 'Social Leadership and Community Work in Agra' },
  { id: 'video', label: 'Watch', title: 'Watch: Rohit Jain of Ahinsa Group' },
  { id: 'chairmans-message', label: 'Chairman’s Message', title: 'Chairman’s Message' },
  { id: 'faq', label: 'FAQs', title: 'Frequently Asked Questions About Rohit Jain' },
]
const SECTION_IDS = SECTIONS.map((s) => s.id)

const HERO_STATS = [
  { value: '25+', label: 'Years in business' },
  { value: '18+', label: 'Awards & honours' },
  { value: '6+', label: 'Projects' },
  { value: '3', label: 'Cities' },
]

const FACTS = [
  ['Full name', 'Mr. Rohit Jain'],
  ['Role', 'Chairman, Ahinsa Group'],
  ['Based in', 'Agra, Uttar Pradesh'],
  ['In business', 'More than 25 years'],
  ['In real estate since', '2024'],
  ['Projects', '6+ across Agra, Gwalior and Firozabad'],
  ['Awards', '18+ national and international'],
  ['Social roles', 'President, BJS-UP · VSPS Trust'],
]

// One line per project, in the article's own words. Names, places, photos and
// links come from the project data, so they stay in step with the rest of the site.
const PROJECT_NOTES = {
  'grand-green-valley':
    'The flagship: plots and grand villas on Fatehabad Road, the corridor that leads from the Taj Mahal, with The Grand Square Mall inside it.',
  'green-valley-township':
    'The first Ahinsa township, near where the Inner Ring Road links the Yamuna and Agra–Lucknow expressways.',
  'green-valley-empire':
    'Plots, rich villas and farm houses at Mudi Crossing, on Agra’s growing eastern belt.',
  'green-valley-orchid':
    'The group’s second project in Kuberpur — residential and commercial plots in a gated green campus.',
  'green-valley-residency':
    'The newest Green Valley address — a gated residential community on NH2 National Highway at Etmadpur.',
  'ahinsa-complex':
    'A fully occupied mixed-use landmark at Ram Bagh, and home to the group’s head office.',
  'green-valley-lake-city':
    'The group’s first township in Madhya Pradesh, on Shivpuri Road, Gwalior.',
  'ahinsa-mall-firozabad':
    'A hi-street luxury mall on MG Road in Firozabad, India’s glass city.',
}
const AGRA_PROJECTS = DEVELOPMENTS.filter((p) => p.location.includes('Agra'))
const OTHER_PROJECTS = DEVELOPMENTS.filter((p) => !p.location.includes('Agra'))

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Integrity First',
    text: 'Every decision is grounded in transparency — from land acquisition to final possession.',
  },
  {
    icon: Users,
    title: 'Customer-Centric Culture',
    text: 'Families and investors are partners in building a better Agra. Every project is designed around how people live, not how buildings look on paper.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Development',
    text: 'Eco-friendly, green community design — championed long before it became industry vocabulary.',
  },
  {
    icon: Gem,
    title: 'Uncompromising Quality',
    text: 'From structural engineering to landscape aesthetics, quality is non-negotiable.',
  },
]

// Newest year first; each year's honours as the awards page lists them.
const AWARD_YEARS = [...new Set(AWARDS.map((a) => a.year))]
  .sort((a, b) => b - a)
  .map((year) => ({ year, awards: AWARDS.filter((a) => a.year === year) }))

const MEDIA = [
  {
    outlet: 'Zee Media',
    title: 'Uttar Pradesh Ki Baat',
    text: 'A prime-time interview on Zee UP/Uttarakhand about Agra’s urban development and the future of real estate in the Braj region.',
  },
  {
    outlet: 'Zee Media',
    title: 'Global Innovation & Leadership Summit, London',
    text: 'Recognised at the House of Lords, UK Parliament, in December 2025, alongside 30 distinguished Indian MSME leaders, for excellence in real estate and entrepreneurship.',
  },
  {
    outlet: 'Dainik Jagran',
    title: 'My Pride My Agra',
    text: 'Featured across editions of Dainik Jagran’s Agra civic excellence series as one of the city’s most impactful business leaders.',
  },
  {
    outlet: 'Times of India',
    title: 'Agra Police Pride',
    text: 'Recognised for civic and business contributions through the Agra Police Pride initiative — a tribute to leaders who strengthen the city’s social fabric.',
  },
  {
    outlet: 'National portals',
    title: '99acres, RealEstateIndia.com and regional news',
    text: 'Ahinsa Group’s projects and market presence feature regularly on national property portals and regional news platforms.',
  },
]

const FAQS = [
  [
    'Who is Rohit Jain?',
    'Rohit Jain is the Chairman of Ahinsa Group, a real estate developer based in Agra, Uttar Pradesh. An entrepreneur for more than two decades, he leads the group’s townships, villas and commercial projects in Agra, Gwalior and Firozabad.',
  ],
  [
    'What is Rohit Jain of Ahinsa Group known for in Agra?',
    'For the Ahinsa Green Valley townships and Ahinsa The Grand Green Valley on Fatehabad Road, and for civic and cultural work that has earned him the Pride of Agra and Braj Ratna honours.',
  ],
  [
    'Which projects has Rohit Jain built with Ahinsa Group?',
    'In Agra: Ahinsa The Grand Green Valley, Ahinsa Green Valley Township, Ahinsa Green Valley Empire, Ahinsa Green Valley Orchid, THE PRIDE – Ahinsa Green Valley Residency and Ahinsa Complex. Beyond Agra: Ahinsa Green Valley Lake City in Gwalior and Ahinsa City Centre in Firozabad.',
  ],
  [
    'What awards has Rohit Jain received?',
    'More than 18, including the Real Estate Excellence Award at the Global Innovation & Leadership Summit in London (Zee Media, 2025), Excellence in Real Estate at the India–Sri Lanka Business Summit (2026), the Braj Ratna Award and Braj Ratna Alankaran Samman from the Incredible India Foundation, Pride of Agra from Hindustan and the Legend Award 2025 at MSME Power Talk.',
  ],
  [
    'Which social organisations is Rohit Jain associated with?',
    'He is President of BJS-UP, the Uttar Pradesh unit of Bharatiya Jain Sanghatana, and holds a leadership role at VSPS Trust.',
  ],
  [
    'How can I contact Rohit Jain or Ahinsa Group?',
    `Write to rohitjain@ahinsagroup.in, call Ahinsa Group on ${COMPANY.phone}, or visit the head office at ${COMPANY.address}.`,
  ],
]

// Two event photos for the community section. Vihasant Bhawan's is the one
// taken at the building's entrance — its first photo is of the site model.
const VIHASANT = EVENTS.find((e) => e.title.includes('Vihasant'))
const BHAJAN = EVENTS.find((e) => e.title === 'Bhajan Sandhya')
const COMMUNITY_PHOTOS = VIHASANT && BHAJAN
  ? [
      [
        VIHASANT.images.find((src) => src.includes('Bhawan4')) || VIHASANT.images[0],
        'Vihasant Bhawan at Ahinsa The Grand Green Valley, offered to the saint community in May 2026.',
      ],
      [BHAJAN.images[0], 'Bhajan Sandhya, an evening of devotional music with residents and guests, September 2025.'],
    ]
  : []

const LINK = 'text-gold-700 underline decoration-gold-500/40 underline-offset-4 hover:decoration-gold-600 transition'

/** Which section the reader is in — the one crossing the upper part of the screen. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

/** A thin gold bar across the top of the screen that fills as the reader scrolls. */
function ReadingProgress() {
  const bar = useRef(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const root = document.documentElement
      const total = root.scrollHeight - window.innerHeight
      const done = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${done})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[3px] z-[70] pointer-events-none">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-gold-700 via-gold-500 to-gold-300"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

/** Desktop contents: a numbered list in the sticky side column. */
function Contents({ active }) {
  return (
    <ol className="space-y-0.5 border-l border-gold-500/25">
      {SECTIONS.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition ${
              active === s.id ? 'border-gold-600 text-gold-700 font-medium' : 'border-transparent text-ink-500 hover:text-ink-900'
            }`}
          >
            <span className="tabular-nums text-xs leading-5 text-gold-600/80">{String(i + 1).padStart(2, '0')}</span>
            {s.label}
          </a>
        </li>
      ))}
    </ol>
  )
}

/**
 * Phone and tablet contents: a strip of section chips that sticks under the
 * navbar while the article scrolls, and keeps the current section's chip in view.
 */
function ContentsStrip({ active }) {
  const strip = useRef(null)
  useEffect(() => {
    const el = strip.current?.querySelector(`[data-section="${active}"]`)
    // Scroll the strip sideways only — scrollIntoView would move the page too.
    if (el) strip.current.scrollTo({ left: el.offsetLeft - 20, behavior: 'smooth' })
  }, [active])
  return (
    <nav
      aria-label="In this article"
      className="lg:hidden sticky top-16 z-30 -mx-5 md:-mx-8 mb-10 bg-cream/90 backdrop-blur-md border-y border-gold-500/20"
    >
      <div ref={strip} className="flex gap-2 overflow-x-auto px-5 md:px-8 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-section={s.id}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              active === s.id
                ? 'border-gold-500 bg-gold-500 text-ink-900'
                : 'border-gold-500/30 bg-white/70 text-ink-600'
            }`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

function Share() {
  const url = pageUrl(PAGE_META.rohitJain)
  const text = 'Rohit Jain – Chairman, Ahinsa Group Agra'
  const [copied, setCopied] = useState(false)
  const links = [
    { label: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
    { label: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    {
      label: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
  ]
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (old browser, no permission) — the share links still work.
    }
  }
  const button =
    'w-10 h-10 flex items-center justify-center rounded-full border border-gold-500/30 bg-white text-ink-600 hover:border-gold-500 hover:text-gold-700 transition'
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.3em] text-ink-500">Share this article</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map(({ label, icon: Icon, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`} className={button}>
            <Icon className="w-4 h-4" />
          </a>
        ))}
        <button type="button" onClick={copy} aria-label="Copy link" className={button}>
          {copied ? <Check className="w-4 h-4 text-gold-600" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

/** A numbered article section. Plain <p> children get the article's reading style. */
function Section({ id, children }) {
  const index = SECTION_IDS.indexOf(id)
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      // Clears the navbar, plus the contents strip below lg.
      className="scroll-mt-32 lg:scroll-mt-28 border-t border-gold-500/20 pt-12 mt-12 md:pt-20 md:mt-20"
    >
      <p className="tabular-nums text-xs font-medium tracking-[0.35em] text-gold-700">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h2 id={`${id}-title`} className="heading-serif text-ink-900 text-[1.75rem] leading-tight md:text-[2.6rem] mt-3 max-w-3xl text-balance">
        {SECTIONS[index].title}
      </h2>
      <div className="mt-6 md:mt-8 space-y-6 [&>p]:max-w-3xl [&>p]:text-ink-700 [&>p]:text-[17px] [&>p]:leading-[1.8] md:[&>p]:text-lg md:[&>p]:leading-[1.85]">
        {children}
      </div>
    </section>
  )
}

function PullQuote({ children, cite }) {
  return (
    <figure className="relative !my-10 md:!my-12 max-w-3xl border-l-2 border-gold-500 pl-6 md:pl-12">
      <Quote aria-hidden="true" className="absolute -left-[17px] -top-1 w-8 h-8 p-1.5 bg-cream text-gold-500" />
      <blockquote className="font-display italic text-[1.4rem] md:text-3xl leading-snug text-ink-900">{children}</blockquote>
      <figcaption className="mt-4 text-[11px] uppercase tracking-[0.3em] text-ink-500">— {cite}</figcaption>
    </figure>
  )
}

/** A project tile: a row with a thumbnail on phones, a card from sm up. */
function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex sm:block h-full overflow-hidden bg-white border border-gold-500/20 shadow-sm hover:border-gold-500/60 hover:shadow-md transition"
    >
      <div className="img-zoom w-28 shrink-0 sm:w-auto aspect-square sm:aspect-[16/10] overflow-hidden">
        <img src={project.image} alt={`${project.name}, ${project.location}`} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="p-4 sm:p-5 min-w-0">
        <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-700">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{project.location}</span>
        </p>
        <h4 className="font-serif text-lg sm:text-xl text-ink-900 mt-1.5 sm:mt-2 leading-snug group-hover:text-gold-700 transition">
          {project.name}
        </h4>
        <p className="text-ink-600 text-[13px] sm:text-sm leading-relaxed mt-1.5 sm:mt-2 line-clamp-3 sm:line-clamp-none">
          {PROJECT_NOTES[project.slug] || project.short}
        </p>
      </div>
    </Link>
  )
}

export default function RohitJain() {
  usePageMeta(PAGE_META.rohitJain)
  const active = useActiveSection(SECTION_IDS)
  const article = useRef(null)
  const [minutes, setMinutes] = useState(null)
  const chairman = MANAGEMENT.find((m) => m.slug === 'rohit-jain')
  const { published, portrait, avatar } = ROHIT_JAIN_ARTICLE
  const publishedOn = new Date(published).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  // Reading time from the article's own text, so it stays right as it is edited.
  useEffect(() => {
    const words = article.current?.textContent.trim().split(/\s+/).length || 0
    setMinutes(Math.max(1, Math.round(words / 200)))
  }, [])

  return (
    <div className="bg-cream text-ink-800">
      <ReadingProgress />

      {/* HERO. Phones: name, then the main photo edge to edge, then the
          standfirst and numbers. From lg: two columns — the text on the left,
          the photo on the right; the empty 1fr rows above and below the text
          centre it against the photo. */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#F1EADA] via-[#F6F1E5] to-cream pt-28 md:pt-40 pb-12 md:pb-20 lg:pb-24">
        <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-40 -top-48 w-[52rem] h-[52rem] rounded-full bg-gold-300/20 blur-3xl" />

        <div className="container-x relative flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-12 xl:gap-x-16">
          <div className="order-1 lg:col-start-1 lg:col-span-7 lg:row-start-2 text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gold-700">
              <Link to="/" className="hover:text-gold-600 transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/about" className="hidden sm:inline hover:text-gold-600 transition">About Us</Link>
              <ChevronRight className="hidden sm:block w-3 h-3" />
              <Link to="/about/management" className="hover:text-gold-600 transition">Management</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-ink-500">Rohit Jain</span>
            </nav>

            <p className="eyebrow mt-7 md:mt-9 justify-center lg:justify-start">Leadership Profile</p>
            <h1 className="mt-4 md:mt-6">
              <span className="block heading-serif text-[3.4rem] md:text-8xl text-ink-900 leading-none">Rohit Jain</span>
              <span className="block mt-3 md:mt-5 font-display italic text-xl md:text-3xl text-gold-700">
                Chairman, Ahinsa Group · Agra
              </span>
            </h1>
          </div>

          <div className="order-3 lg:col-start-1 lg:col-span-7 lg:row-start-3 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 mt-8">
            <p className="text-[17px] md:text-xl text-ink-600 leading-relaxed text-balance">
              An entrepreneur for more than two decades, Mr. Rohit Jain leads Ahinsa Group — the Agra developer
              behind The Grand Green Valley and the Green Valley townships — on a simple standard: build communities,
              inspire trust and leave a legacy.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <img src={avatar} alt="" width="28" height="28" className="w-7 h-7 rounded-full object-cover border border-gold-500/40" />
                By <span className="text-ink-900 font-medium">Ahinsa Group</span>
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gold-600" />
                <time dateTime={published}>{publishedOn}</time>
              </span>
              {minutes && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-600" />
                  {minutes} min read
                </span>
              )}
            </div>
          </div>

          {/* THE MAIN PHOTO, 4:5 portrait. Edge to edge on a phone, framed in
              gold from md — on its own line up to lg, then beside the text. */}
          <figure className="order-2 lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-5 lg:self-center relative -mx-5 md:mx-auto md:w-full md:max-w-md lg:max-w-none mt-8 lg:mt-0">
            <div aria-hidden="true" className="hidden md:block absolute inset-0 translate-x-5 translate-y-5 border border-gold-500/50" />
            <img
              src={portrait}
              alt="Rohit Jain, Chairman of Ahinsa Group, at the Ahinsa Group office in Agra"
              width="1200"
              height="1500"
              fetchpriority="high"
              className="relative block w-full aspect-[4/5] object-cover shadow-[0_40px_80px_-30px_rgba(58,45,10,0.55)]"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/60 to-transparent" />
            <figcaption className="absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink-800 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Mr. Rohit Jain · Ahinsa Group office, Agra
            </figcaption>
          </figure>

          {/* Two by two on phones, one row from lg — with rules between the cells. */}
          <dl className="order-4 lg:col-start-1 lg:col-span-7 lg:row-start-4 relative mt-8 lg:mt-10 mx-auto w-full grid grid-cols-2 lg:grid-cols-4 bg-white border border-gold-500/25 shadow-[0_24px_60px_-30px_rgba(58,45,10,0.45)]">
            {HERO_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`text-center p-5 md:p-7 lg:p-5 xl:p-6 border-gold-500/20 ${i % 2 === 0 ? 'border-r' : ''} ${
                  i < 2 ? 'border-b lg:border-b-0' : ''
                } ${i < HERO_STATS.length - 1 ? 'lg:border-r' : ''}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-4xl md:text-5xl gold-text">{s.value}</span>
                  <span className="block mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink-500">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* MOTTO */}
      <section aria-label="Motto" className="bg-[#F0EBDC] border-y border-gold-500/20">
        <div className="container-x py-9 md:py-14 text-center">
          <p className="font-display italic text-[1.4rem] md:text-4xl text-ink-900 text-balance leading-snug">
            “Building Communities. Inspiring Trust. <span className="gold-text">Leaving a Legacy.</span>”
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-ink-500">— Mr. Rohit Jain</p>
        </div>
      </section>

      {/* ARTICLE */}
      <div className="container-x pt-0 pb-16 lg:py-24 grid lg:grid-cols-12 gap-12 xl:gap-16">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 space-y-10">
            <nav aria-label="In this article">
              <p className="text-[11px] uppercase tracking-[0.3em] text-ink-500 mb-5">In this article</p>
              <Contents active={active} />
            </nav>
            <Share />
          </div>
        </aside>

        <article ref={article} className="lg:col-span-9 min-w-0">
          <ContentsStrip active={active} />

          {/* Introduction */}
          <div className="space-y-6 max-w-3xl text-ink-700 text-[17px] leading-[1.8] md:text-lg md:leading-[1.85]">
            <p className="first-letter:float-left first-letter:font-serif first-letter:text-[4.2rem] md:first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-2 first-letter:text-gold-600">
              <strong className="text-ink-900 font-semibold">Rohit Jain</strong> is the Chairman of Ahinsa Group, a real
              estate and construction company based in Agra, Uttar Pradesh. Under his leadership the group has built a
              portfolio of gated townships, villas, plots and commercial landmarks along Agra’s fastest-growing
              corridors, and has carried the Ahinsa name to Gwalior and Firozabad. For the thousands of families who
              have chosen an Ahinsa address, he is the face behind the promise — a chairman who lives in the city he
              builds in, and who can be found when it matters.
            </p>
            <p>
              He is also one of Agra’s most widely recognised business leaders. Between 2024 and 2026 alone, Rohit
              Jain was honoured by Hindustan, Dainik Jagran, Zee Media, the Times of India group and the Incredible
              India Foundation, and was recognised for real estate excellence at the Global Innovation & Leadership
              Summit in London. Beyond business, he serves as President of BJS-UP, the Uttar Pradesh unit of
              Bharatiya Jain Sanghatana.
            </p>
          </div>

          <aside aria-label="Rohit Jain at a glance" className="mt-10 md:mt-12 bg-white border border-gold-500/25 shadow-sm p-5 md:p-8">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-5 md:mt-6 grid grid-cols-2 gap-x-5 md:gap-x-10 gap-y-4 md:gap-y-5">
              {FACTS.map(([term, value]) => (
                <div key={term} className="border-b border-gold-500/15 pb-3">
                  <dt className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-ink-500">{term}</dt>
                  <dd className="mt-1 text-sm md:text-base text-ink-900 font-medium leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <Section id="entrepreneur-to-builder">
            <p>
              Long before Ahinsa Group put up its first township gate, Rohit Jain was building businesses in Agra. His
              career as an entrepreneur spans more than twenty-five years, and the Ahinsa name was known in the city’s
              trade long before it appeared on a project: Ahinsa Distributors, Agra was recognised by Reliance Retail
              with a Best Performance Award, and in 2018 the CCLA Award Ceremony named him Indian Innovative
              Entrepreneur of the Year.
            </p>
            <p>
              In 2024 he took that name into real estate. The first township,{' '}
              <Link to="/projects/green-valley-township" className={LINK}>Ahinsa Green Valley</Link> in Kuberpur, was
              followed within months by{' '}
              <Link to="/projects/grand-green-valley" className={LINK}>Ahinsa The Grand Green Valley</Link> on
              Fatehabad Road — and by 2026 the portfolio had grown to more than six projects across three cities. It is
              a fast start for a young real estate company, built on an old foundation: a name the city already trusted.
            </p>
          </Section>

          <Section id="the-name-ahinsa">
            <p>
              <em>Ahinsa</em> — non-violence — is the founding principle of Jain ethics: the idea that one’s conduct
              should cause no harm to any living being. Jain teaching carries it well beyond physical injury. Deceit,
              broken promises and exploitation are themselves understood as forms of harm.
            </p>
            <p>
              Rohit Jain chose that word for a real estate company on purpose. In an industry not always known for
              transparency, the name sets a standard the business has to answer to: honest dealing with buyers,
              clarity in documentation and delivery on what was promised. He believes a developer’s greatest asset is
              the trust families place in him.
            </p>
            <p>
              It is also why Ahinsa townships are planned around their greens — open landscapes, parks and
              tree-lined streets — reflecting a respect for the environment he championed long before “sustainable”
              became industry vocabulary.
            </p>
          </Section>

          <Section id="projects">
            <p>
              Under Rohit Jain, Ahinsa Group has focused on plotted townships along Agra’s growth corridors, where the
              Yamuna Expressway, the Agra–Lucknow Expressway and the Inner Ring Road are drawing families out of the
              crowded old city — and has since taken the Green Valley name beyond Agra.
            </p>

            <h3 className="font-serif text-xl md:text-2xl text-ink-900 !mt-10">In Agra</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {AGRA_PROJECTS.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>

            <h3 className="font-serif text-xl md:text-2xl text-ink-900 !mt-10 md:!mt-12">Beyond Agra</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {OTHER_PROJECTS.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>

            <p className="!mt-10">
              Across these projects the range covers residential and commercial plots, villas, farm houses,
              commercial complexes and retail — with land acquisition, construction and design handled within the
              group, so a buyer deals with one company from empty land to the handover of keys.{' '}
              <Link to="/projects" className={LINK}>See all Ahinsa Group projects</Link>.
            </p>
          </Section>

          <Section id="leadership-philosophy">
            <p>
              Ahinsa Group’s positioning under Rohit Jain rests on three commitments: quality of construction,
              transparency in dealing, and timely execution.
            </p>
            <p>
              The third is the sharpest. Delayed possession is the most common complaint in Indian real estate, and a
              builder who leads with timelines makes himself measurable. A chairman who lives in the city is a
              chairman who can be found when a deadline slips.
            </p>

            <PullQuote cite="Mr. Rohit Jain, Chairman, Ahinsa Group">
              My vision has always been simple: build homes that families are proud of, in communities they want to
              belong to — and always keep the customer’s trust at the centre of everything we do.
            </PullQuote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={(i % 2) * 0.08}>
                  <div className="h-full flex sm:block gap-4 bg-white border border-gold-500/20 p-5 md:p-7 hover:border-gold-500/60 transition-colors duration-300">
                    <span className="w-11 h-11 shrink-0 border border-gold-500/40 flex items-center justify-center text-gold-700">
                      <v.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg md:text-xl text-ink-900 sm:mt-5">{v.title}</h3>
                      <p className="text-ink-600 text-sm leading-relaxed mt-1.5 sm:mt-3">{v.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="awards">
            <p>
              Rohit Jain has received more than 18 national and international awards across entrepreneurship, real
              estate excellence and community leadership. The most notable came in December 2025, when he was
              recognised for real estate excellence at the Global Innovation & Leadership Summit in London — held at
              the House of Lords, UK Parliament, alongside 30 distinguished Indian MSME leaders.
            </p>
            <p>
              In 2026 he was honoured for excellence in real estate at the India–Sri Lanka Business Summit, received
              the Braj Ratna Alankaran Samman from the Incredible India Foundation in the presence of the Governor of
              Bihar, and was named among the 14th Leaders Agra Awards. The pattern is telling: his honours divide
              almost evenly between business and civic recognition — Braj Ratna twice, Pride of Agra, the Agra Police
              felicitation. For a builder, that balance says as much about what he has given the city as what he has
              built in it.
            </p>

            <div className="space-y-8 md:space-y-10 !mt-10">
              {AWARD_YEARS.map(({ year, awards }) => (
                <div key={year}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-3xl gold-text">{year}</span>
                    <span className="h-px flex-1 bg-gold-500/30" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-ink-500 whitespace-nowrap">
                      {awards.length} {awards.length === 1 ? 'Honour' : 'Honours'}
                    </span>
                  </div>
                  <ul className="mt-4 md:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-5">
                    {awards.map((a) => (
                      <li key={a.title} className="flex items-start gap-4 bg-white sm:bg-transparent border border-gold-500/15 sm:border-0 p-3 sm:p-0">
                        <img
                          src={a.image}
                          alt={`${a.title}, ${a.awardedBy}`}
                          loading="lazy"
                          className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 object-cover border border-gold-500/20"
                        />
                        <div className="min-w-0">
                          <p className="text-ink-900 font-medium leading-snug">{a.title}</p>
                          <p className="text-ink-500 text-sm mt-1">{a.awardedBy}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="!mt-10">
              Earlier recognitions include Indian Innovative Entrepreneur of the Year 2018 at the CCLA Award Ceremony
              and a Best Performance Award from Reliance Retail.
            </p>
            <div>
              <Link to="/media/awards" className="btn-outline-gold w-full sm:w-auto justify-center">
                See every award <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Section>

          <Section id="media">
            <p>
              Rohit Jain’s work at Ahinsa Group has been covered by national media houses and property platforms alike.
            </p>
            <ul className="max-w-3xl divide-y divide-gold-500/20 border-y border-gold-500/20">
              {MEDIA.map((m) => (
                <li key={m.title} className="py-5 md:py-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-700">{m.outlet}</p>
                  <h3 className="font-serif text-lg md:text-xl text-ink-900 mt-2">{m.title}</h3>
                  <p className="text-ink-600 text-[15px] md:text-base leading-relaxed mt-2">{m.text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="social-leadership">
            <p>
              Rohit Jain is President of BJS-UP, the Uttar Pradesh unit of Bharatiya Jain Sanghatana, and holds a
              leadership role at VSPS Trust. Guided by the very name he chose for his enterprise, he believes business
              and community are inseparable — that a township should improve life for every resident, not just the
              investor.
            </p>
            <p>
              That belief shows in the group’s own calendar. In May 2026, Ahinsa Group developed and offered Vihasant
              Bhawan for the saint community at Ahinsa The Grand Green Valley. Its project sites host devotional
              evenings — a Bhajan Sandhya in September 2025 and an evening with Kirti Kishori Ji that December — and
              every Independence Day the tricolour is raised on all its projects, with a tiranga rally through the
              city. <Link to="/media/events" className={LINK}>See the events</Link>.
            </p>

            {COMMUNITY_PHOTOS.length > 0 && (
              <div className="grid grid-cols-2 gap-3 md:gap-5 !mt-10">
                {COMMUNITY_PHOTOS.map(([src, caption]) => (
                  <Reveal key={src}>
                    <figure>
                      <div className="img-zoom aspect-[4/5] sm:aspect-[4/3] overflow-hidden">
                        <img src={src} alt={caption} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                      <figcaption className="mt-2 md:mt-3 text-xs md:text-sm text-ink-500 leading-snug">{caption}</figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}

            <p className="!mt-10">
              His civic honours reflect the same work: the Braj Ratna Award in 2024 for helping preserve the heritage
              of the Braj region, Pride of Agra from Hindustan for contributions to society, and the Times of India
              group’s Agra Police felicitation in 2025 as a supporter of community welfare.
            </p>
          </Section>

          {chairman?.video && (
            <Section id="video">
              <p>Hear Rohit Jain on Ahinsa Group, its projects and the city it builds in.</p>
              <Reveal>
                <VideoTile src={chairman.video} title="Rohit Jain, Chairman of Ahinsa Group, Agra" className="max-w-4xl" />
              </Reveal>
            </Section>
          )}

          <Section id="chairmans-message">
            <figure className="relative overflow-hidden bg-white border border-gold-500/30 shadow-[0_24px_60px_-35px_rgba(58,45,10,0.5)] p-6 md:p-14">
              <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700" />
              <span aria-hidden="true" className="absolute -right-4 -bottom-16 font-display text-[12rem] md:text-[14rem] leading-none text-gold-500/10 select-none">
                ”
              </span>
              <Quote aria-hidden="true" className="w-9 h-9 md:w-10 md:h-10 text-gold-500" />
              <blockquote className="relative mt-5 md:mt-6 space-y-5 md:space-y-6 font-display italic text-lg md:text-[1.75rem] leading-snug text-ink-900">
                <p>
                  Ahinsa Group was not built on transactions. It was built on relationships — with the families who
                  trusted us with their life savings, with the teams who gave their best to every brick and beam, and
                  with the city of Agra, which has been the soil from which everything we have built has grown.
                </p>
                <p>
                  My commitment remains unchanged: to build with integrity, to deliver with honour, and to leave
                  behind communities that make Agra proud.
                </p>
              </blockquote>
              <figcaption className="relative mt-8 md:mt-10 flex items-center gap-4">
                <img src={avatar} alt="" width="56" height="56" className="w-14 h-14 rounded-full object-cover border-2 border-gold-500/50" />
                <span>
                  <span className="block font-serif text-lg text-ink-900">Mr. Rohit Jain</span>
                  <span className="block text-[11px] uppercase tracking-[0.25em] text-gold-700 mt-1">Chairman, Ahinsa Group</span>
                </span>
              </figcaption>
            </figure>
          </Section>

          <Section id="faq">
            <div className="max-w-3xl divide-y divide-gold-500/20 border-y border-gold-500/20">
              {FAQS.map(([question, answer], i) => (
                <details key={question} open={i === 0} className="group py-4 md:py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-serif text-[17px] md:text-xl text-ink-900 leading-snug">{question}</h3>
                    <ChevronDown className="w-5 h-5 mt-0.5 flex-shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 md:mt-4 text-ink-700 text-[15px] md:text-base leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </Section>

          <div className="lg:hidden border-t border-gold-500/20 pt-10 mt-12">
            <Share />
          </div>
        </article>
      </div>

      {/* CLOSE */}
      <section className="bg-[#F0EBDC] border-t border-gold-500/20">
        <div className="container-x py-16 md:py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-ink-900 text-3xl md:text-5xl text-balance">
              Meet the people behind <span className="gold-text">every Ahinsa address</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 mt-8 md:mt-10">
              <Link to="/about/management" className="btn-gold justify-center">
                Meet the Management <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="btn-outline-gold justify-center">Explore Our Projects</Link>
              <Link to="/contact" className="btn-outline-gold justify-center">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
