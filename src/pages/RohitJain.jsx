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

const LINK = 'text-gold-700 dark:text-gold-500 underline decoration-gold-500/40 underline-offset-4 hover:decoration-gold-500 transition'

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
      { rootMargin: '-20% 0px -70% 0px' },
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

function Contents({ active }) {
  return (
    <ol className="space-y-0.5 border-l border-soft">
      {SECTIONS.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition ${
              active === s.id
                ? 'border-gold-500 text-gold-700 dark:text-gold-400'
                : 'border-transparent text-fg-soft hover:text-fg'
            }`}
          >
            <span className="tabular-nums text-xs leading-5 text-gold-600/80 dark:text-gold-500/70">{String(i + 1).padStart(2, '0')}</span>
            {s.label}
          </a>
        </li>
      ))}
    </ol>
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
    'w-10 h-10 flex items-center justify-center border border-soft text-fg-soft hover:border-gold-500 hover:text-gold-700 dark:hover:text-gold-500 transition'
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.3em] text-fg-faint">Share this article</p>
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
      className="scroll-mt-28 border-t border-soft pt-14 mt-14 md:pt-20 md:mt-20"
    >
      <p className="tabular-nums text-xs font-medium tracking-[0.35em] text-gold-700 dark:text-gold-500">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h2 id={`${id}-title`} className="heading-serif text-fg text-3xl md:text-[2.6rem] mt-3 max-w-3xl text-balance">
        {SECTIONS[index].title}
      </h2>
      <div className="mt-8 space-y-6 [&>p]:max-w-3xl [&>p]:text-fg-muted [&>p]:text-[17px] [&>p]:leading-[1.85] md:[&>p]:text-lg">
        {children}
      </div>
    </section>
  )
}

function PullQuote({ children, cite }) {
  return (
    <figure className="relative !my-12 max-w-3xl border-l-2 border-gold-500 pl-8 md:pl-12">
      <Quote aria-hidden="true" className="absolute -left-[17px] -top-1 w-8 h-8 p-1.5 bg-page text-gold-500" />
      <blockquote className="font-display italic text-2xl md:text-3xl leading-snug text-fg">{children}</blockquote>
      <figcaption className="mt-4 text-xs uppercase tracking-[0.3em] text-fg-faint">— {cite}</figcaption>
    </figure>
  )
}

function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block card-glass overflow-hidden h-full">
      <div className="img-zoom aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name}, ${project.location}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-gold-700 dark:text-gold-500">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {project.location}
        </p>
        <h4 className="font-serif text-xl text-fg mt-2 leading-snug group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
          {project.name}
        </h4>
        <p className="text-fg-soft text-sm leading-relaxed mt-2">{PROJECT_NOTES[project.slug] || project.short}</p>
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
  const { published, images, portrait, avatar } = ROHIT_JAIN_ARTICLE
  const publishedOn = new Date(published).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  // Reading time from the article's own text, so it stays right as it is edited.
  useEffect(() => {
    const words = article.current?.textContent.trim().split(/\s+/).length || 0
    setMinutes(Math.max(1, Math.round(words / 200)))
  }, [])

  return (
    <>
      <ReadingProgress />

      {/* HERO — dark, like every page's hero, so the clear navbar reads over it. */}
      <header className="relative overflow-hidden bg-ink-900 text-cream pt-36 pb-16 md:pt-48 md:pb-24">
        <div aria-hidden="true" className="absolute -left-40 -top-40 w-[36rem] h-[36rem] rounded-full bg-gold-500/10 blur-3xl" />
        <span
          aria-hidden="true"
          className="hidden md:block absolute -right-6 bottom-0 font-display text-[24rem] leading-none text-gold-500/[0.05] select-none"
        >
          RJ
        </span>

        <div className="container-x relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold-400">
              <Link to="/" className="hover:text-gold-300 transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/about" className="hover:text-gold-300 transition">About Us</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/about/management" className="hover:text-gold-300 transition">Management</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-cream/70">Rohit Jain</span>
            </nav>

            <p className="eyebrow !text-gold-400 mt-10 before:!bg-gold-400/50 after:!bg-gold-400/50">Leadership Profile</p>
            <h1 className="mt-6">
              <span className="block heading-serif text-6xl md:text-8xl text-cream">Rohit Jain</span>
              <span className="block mt-4 font-display italic text-2xl md:text-3xl text-gold-400">
                Chairman, Ahinsa Group · Agra
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-ink-200 leading-relaxed max-w-2xl">
              An entrepreneur for more than two decades, Mr. Rohit Jain leads Ahinsa Group — the Agra developer
              behind The Grand Green Valley and the Green Valley townships — on a simple standard: build communities,
              inspire trust and leave a legacy.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-300">
              <span>
                By <span className="text-cream">Ahinsa Group</span>
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gold-500" />
                <time dateTime={published}>{publishedOn}</time>
              </span>
              {minutes && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-500" />
                  {minutes} min read
                </span>
              )}
            </div>

            <dl className="mt-10 pt-8 border-t border-gold-500/20 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-serif text-4xl md:text-5xl gold-text">{s.value}</span>
                    <span className="block mt-2 text-[11px] uppercase tracking-[0.2em] text-ink-300">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="lg:col-span-5 order-1 lg:order-2 max-w-[18rem] sm:max-w-sm mx-auto w-full lg:max-w-none">
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 border border-gold-500/40 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" />
              <img
                src={portrait}
                alt="Rohit Jain, Chairman of Ahinsa Group, at his office in Agra"
                width="1200"
                height="1500"
                fetchpriority="high"
                className="relative w-full aspect-[4/5] object-cover"
              />
            </div>
            <figcaption className="mt-10 text-[11px] uppercase tracking-[0.25em] text-ink-300">
              Mr. Rohit Jain at the Ahinsa Group office, Agra
            </figcaption>
          </figure>
        </div>
      </header>

      {/* MOTTO */}
      <section aria-label="Motto" className="bg-page-alt border-y border-soft">
        <div className="container-x py-10 md:py-14 text-center">
          <p className="font-display italic text-2xl md:text-4xl text-fg text-balance">
            “Building Communities. Inspiring Trust. <span className="gold-text">Leaving a Legacy.</span>”
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-fg-faint">— Mr. Rohit Jain</p>
        </div>
      </section>

      {/* ARTICLE */}
      <div className="bg-page">
        <div className="container-x py-16 md:py-24 grid lg:grid-cols-12 gap-12 xl:gap-16">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-10">
              <nav aria-label="In this article">
                <p className="text-[11px] uppercase tracking-[0.3em] text-fg-faint mb-5">In this article</p>
                <Contents active={active} />
              </nav>
              <Share />
            </div>
          </aside>

          <article ref={article} className="lg:col-span-9 min-w-0">
            <details className="lg:hidden card-glass p-5 mb-10">
              <summary className="cursor-pointer text-[11px] uppercase tracking-[0.3em] text-fg-faint">In this article</summary>
              <div className="mt-5">
                <Contents active={active} />
              </div>
            </details>

            {/* Introduction */}
            <div className="space-y-6 max-w-3xl text-fg-muted text-[17px] md:text-lg leading-[1.85]">
              <p className="first-letter:float-left first-letter:font-serif first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-2 first-letter:text-gold-600 dark:first-letter:text-gold-500">
                <strong className="text-fg font-semibold">Rohit Jain</strong> is the Chairman of Ahinsa Group, a real
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

            {/* The article's lead photo — the one search results and link
                previews use — so it is never held back by a scroll animation. */}
            <figure className="mt-12">
              <img
                src={images[0]}
                alt="Rohit Jain at the Ahinsa Group office in Agra, beneath the Ahinsa lotus emblem"
                width="1600"
                height="900"
                className="w-full aspect-video object-cover"
              />
              <figcaption className="mt-3 text-sm text-fg-faint">
                Rohit Jain, Chairman of Ahinsa Group, at the group’s office in Agra.
              </figcaption>
            </figure>

            <aside aria-label="Rohit Jain at a glance" className="card-glass p-6 md:p-8 mt-12">
              <p className="eyebrow">At a glance</p>
              <dl className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-5">
                {FACTS.map(([term, value]) => (
                  <div key={term} className="border-b border-faint pb-3">
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-fg-faint">{term}</dt>
                    <dd className="mt-1 text-fg font-medium">{value}</dd>
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

              <h3 className="font-serif text-2xl text-fg !mt-10">In Agra</h3>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {AGRA_PROJECTS.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                    <ProjectCard project={p} />
                  </Reveal>
                ))}
              </div>

              <h3 className="font-serif text-2xl text-fg !mt-12">Beyond Agra</h3>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
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

              <div className="grid sm:grid-cols-2 gap-5">
                {VALUES.map((v, i) => (
                  <Reveal key={v.title} delay={(i % 2) * 0.08}>
                    <div className="h-full border border-soft p-6 md:p-7 hover:border-gold-500/60 transition-colors duration-300">
                      <span className="w-11 h-11 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500">
                        <v.icon className="w-5 h-5" />
                      </span>
                      <h3 className="font-serif text-xl text-fg mt-5">{v.title}</h3>
                      <p className="text-fg-soft text-sm leading-relaxed mt-3">{v.text}</p>
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

              <div className="space-y-10 !mt-10">
                {AWARD_YEARS.map(({ year, awards }) => (
                  <div key={year}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-serif text-3xl gold-text">{year}</span>
                      <span className="h-px flex-1 bg-gold-500/25" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-fg-faint whitespace-nowrap">
                        {awards.length} {awards.length === 1 ? 'Honour' : 'Honours'}
                      </span>
                    </div>
                    <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                      {awards.map((a) => (
                        <li key={a.title} className="flex items-start gap-4">
                          <img
                            src={a.image}
                            alt={`${a.title}, ${a.awardedBy}`}
                            loading="lazy"
                            className="w-16 h-16 flex-shrink-0 object-cover border border-soft"
                          />
                          <div>
                            <p className="text-fg font-medium leading-snug">{a.title}</p>
                            <p className="text-fg-soft text-sm mt-1">{a.awardedBy}</p>
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
                <Link to="/media/awards" className="btn-outline-gold">
                  See every award <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Section>

            <Section id="media">
              <p>
                Rohit Jain’s work at Ahinsa Group has been covered by national media houses and property platforms alike.
              </p>
              <ul className="max-w-3xl divide-y divide-gold-500/15 border-y border-soft">
                {MEDIA.map((m) => (
                  <li key={m.title} className="py-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold-700 dark:text-gold-500">{m.outlet}</p>
                    <h3 className="font-serif text-xl text-fg mt-2">{m.title}</h3>
                    <p className="text-fg-soft leading-relaxed mt-2">{m.text}</p>
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
                <div className="grid sm:grid-cols-2 gap-5 !mt-10">
                  {COMMUNITY_PHOTOS.map(([src, caption]) => (
                    <Reveal key={src}>
                      <figure>
                        <div className="img-zoom aspect-[4/3] overflow-hidden">
                          <img src={src} alt={caption} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <figcaption className="mt-3 text-sm text-fg-faint">{caption}</figcaption>
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
              {/* Dark in both themes; a shade lifted in dark mode so it doesn't vanish into the page. */}
              <figure className="relative overflow-hidden bg-ink-900 dark:bg-ink-800 border border-gold-500/20 text-cream p-8 md:p-14">
                <span aria-hidden="true" className="absolute -right-4 -bottom-16 font-display text-[14rem] leading-none text-gold-500/[0.06] select-none">
                  ”
                </span>
                <Quote aria-hidden="true" className="w-10 h-10 text-gold-500/60" />
                <blockquote className="relative mt-6 space-y-6 font-display italic text-xl md:text-[1.75rem] leading-snug text-cream">
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
                <figcaption className="relative mt-10 flex items-center gap-4">
                  <img src={avatar} alt="" width="56" height="56" className="w-14 h-14 rounded-full object-cover border border-gold-500/40" />
                  <span>
                    <span className="block font-serif text-lg text-cream">Mr. Rohit Jain</span>
                    <span className="block text-[11px] uppercase tracking-[0.25em] text-gold-400 mt-1">Chairman, Ahinsa Group</span>
                  </span>
                </figcaption>
              </figure>
            </Section>

            <Section id="faq">
              <div className="max-w-3xl divide-y divide-gold-500/15 border-y border-soft">
                {FAQS.map(([question, answer], i) => (
                  <details key={question} open={i === 0} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-serif text-lg md:text-xl text-fg">{question}</h3>
                      <ChevronDown className="w-5 h-5 mt-1 flex-shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-fg-muted leading-relaxed">{answer}</p>
                  </details>
                ))}
              </div>
            </Section>

            <div className="lg:hidden border-t border-soft pt-10 mt-14">
              <Share />
            </div>
          </article>
        </div>
      </div>

      {/* CLOSE */}
      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-fg text-4xl md:text-5xl text-balance">
              Meet the people behind <span className="gold-text">every Ahinsa address</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/about/management" className="btn-gold">
                Meet the Management <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="btn-outline-gold">Explore Our Projects</Link>
              <Link to="/contact" className="btn-outline-gold">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
