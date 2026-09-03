import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, X, ArrowUpRight, Phone } from 'lucide-react'
import { WEB3FORMS_KEY, PROJECT_DETAILS, mapLinkFor } from '../data/site'

/**
 * Ahinsa property assistant — a branching menu bot, not an AI. Every reply
 * below is hard-coded, so the widget can never quote a price it invented or
 * promise something the sales team did not approve.
 *
 * Its job is not to answer everything. It builds interest, then captures the
 * visitor's name and mobile number so the team can call them.
 *
 * Mounted once in App.jsx, above the floating WhatsApp button. The options for
 * the current step live inside the conversation, under the latest reply, so
 * the whole exchange reads as one thread.
 *
 * HARD RULES baked into the copy below — keep them when editing:
 *   1. Never state a rate, discount or total cost. Route to WhatsApp.
 *   2. Never promise returns, appreciation or resale value.
 *   3. Never invent amenities, approvals, bank names or dates. If it is not
 *      written here, the answer is "our team will confirm".
 *   4. No legal, tax or loan-eligibility advice. Route to the team.
 *   5. Never negotiate. Route to the team.
 *   6. Ask for the lead once. If the visitor declines, never ask again.
 *
 * Language: English. Every visible string is in this file, so a Hinglish or
 * Devanagari variant is a matter of translating the copy below.
 */

/* ------------------------------------------------------------------ *
 * CONFIG — contact details
 * ------------------------------------------------------------------ */

/** WhatsApp number: country code + number, no +, spaces or dashes. */
const WHATSAPP_NUMBER = '916398730582'
const PHONE_DISPLAY = '+91 63987 30582'
const PHONE_TEL = '+916398730582'

const BOT_NAME = 'Ahinsa Assistant'
const BOT_TAGLINE = 'Online · replies instantly'
const MENU_PROMPT = 'Choose an option'

/** How long the typing dots show before a reply lands. */
const TYPING_MS = 550

/** The one line used whenever a question falls outside the knowledge below. */
const ESCALATION =
  `For this, our property expert will assist you personally.\n📞 Call or WhatsApp: ${PHONE_DISPLAY}`

/* ------------------------------------------------------------------ *
 * KNOWLEDGE BASE — ongoing projects
 * ------------------------------------------------------------------ *
 * Facts only. Anything not listed here must fall through to ESCALATION.
 * Sizes and amenities mirror src/data/site.js — update both together. */
const PROJECTS = [
  {
    id: 'grand',
    slug: 'grand-green-valley',
    label: 'Ahinsa The Grand Green Valley',
    short: 'The Grand Green Valley',
    address: 'Fatehabad Road, Kundol, Agra',
    config: 'Residential & commercial plots, grand villas and farm house',
    sizes: '111.11 · 138.88 · 166.66 · 200 sq. yd',
    amenities:
      'Clubhouse, swimming pool, fitness centre, landscaped gardens, jogging track,\n' +
      'fountains, shops & malls, parking and 24x7 gated security.',
    connectivity:
      'Direct access from Fatehabad Road — minutes from the city’s key landmarks.',
  },
  {
    id: 'empire',
    slug: 'green-valley-empire',
    label: 'Ahinsa Green Valley Empire',
    short: 'Green Valley Empire',
    address: 'Mudi Crossing, Agra',
    config: 'Residential & commercial plots and farm house',
    sizes: '111.11 · 138.88 · 166.66 · 200 sq. yd',
    amenities:
      'Clubhouse, swimming pool, fitness centre, landscaped gardens, jogging track,\n' +
      'fountains, shops & malls, parking and 24x7 gated security.',
    connectivity: null,
  },
  {
    id: 'township',
    slug: 'green-valley-township',
    label: 'Ahinsa Green Valley Township',
    short: 'Green Valley Township',
    address: 'Kuberpur, Agra',
    config: 'Residential & commercial plots · possession ready',
    sizes: '111.11 · 138.88 sq. yd',
    amenities:
      'Clubhouse, swimming pool, fitness centre, landscaped gardens, green belts,\n' +
      'jogging track, shops & malls, parking and 24x7 gated security.',
    connectivity: null,
  },
  {
    id: 'orchid',
    slug: 'green-valley-orchid',
    label: 'Ahinsa Green Valley Orchid',
    short: 'Green Valley Orchid',
    address: 'Kuberpur, Agra',
    config: 'Residential & commercial plots',
    sizes: '111.11 · 130.55 · 133.33 · 138.88 · 152.77 sq. yd',
    amenities:
      'Green open spaces, landscaped forecourt, on-campus cafe and food court,\n' +
      'parking, high-speed internet and 24x7 gated security.',
    connectivity: null,
  },
]

/* ------------------------------------------------------------------ *
 * THE TREE
 * ------------------------------------------------------------------ *
 * Every node: { text, options }. Every option is { label } plus one of:
 *   to     — go to that node id
 *   form   — open the lead form
 *   href   — 'whatsapp', 'call', or any URL to open in a new tab
 * `lead: true` on a node marks buying intent and arms the lead request. */

const WELCOME =
  'Namaste 🙏 Welcome to **Ahinsa Group**.\n' +
  'I’m your property assistant.\n' +
  'How may I help you today?'

const MAIN_OPTIONS = [
  { label: '🏗️ Ongoing Projects', to: 'ongoing' },
  { label: '🌟 Upcoming Projects', to: 'upcoming' },
  { label: '💰 Prices', to: 'prices' },
  { label: '📍 Book a Site Visit', to: 'visit' },
  { label: '➕ More', to: 'more' },
]

const NODES = {
  main: { text: WELCOME, options: MAIN_OPTIONS },

  /* ---------------- Ongoing projects ---------------- */
  ongoing: {
    text: 'We have four ongoing projects in Agra 🏗️\nWhich one may I tell you about?',
    options: PROJECTS.map((p) => ({ label: p.short, to: `p_${p.id}` })),
  },

  /* ---------------- Prices ---------------- */
  prices: {
    lead: true,
    text:
      'Pricing depends on the project, plot size and location — corner and park-facing plots are priced higher.\n' +
      'Plots are available from 111.11 up to 200 sq. yd.\n' +
      'Our team will share the current rate list on WhatsApp.',
    options: [
      { label: 'Payment Plan / EMI', to: 'payment' },
      { label: 'Smallest budget option', to: 'smallest' },
      { label: 'Current offers', to: 'offers' },
      { label: '💬 Get Rate List', href: 'whatsapp' },
    ],
  },
  payment: {
    lead: true,
    text:
      'Payment plans vary by project and plot size.\n' +
      'Our team will walk you through the booking amount and instalment options.\n' +
      ESCALATION,
    options: [
      { label: '💬 Get Rate List', href: 'whatsapp' },
      { label: '📍 Book a Site Visit', to: 'visit' },
      { label: '🏗️ Ongoing Projects', to: 'ongoing' },
    ],
  },
  smallest: {
    lead: true,
    text:
      'Our smallest plot size is 111.11 sq. yd, offered across our ongoing projects.\n' +
      'The current rate for it will be shared by our team on WhatsApp.',
    options: [
      { label: '💬 Get Rate List', href: 'whatsapp' },
      { label: '🏗️ See the projects', to: 'ongoing' },
      { label: '📍 Book a Site Visit', to: 'visit' },
    ],
  },
  offers: {
    lead: true,
    text:
      'Offers change from time to time, so I would not want to quote an outdated one.\n' + ESCALATION,
    options: [
      { label: '💬 WhatsApp us', href: 'whatsapp' },
      { label: `📞 Call ${PHONE_DISPLAY}`, href: 'call' },
      { label: '🏗️ Ongoing Projects', to: 'ongoing' },
    ],
  },

  /* ---------------- Site visit ---------------- */
  visit: {
    lead: true,
    text: 'Happy to arrange that 🙏\nWhich project would you like to visit?',
    options: PROJECTS.map((p) => ({ label: p.short, to: `v_${p.id}` })),
  },
  visitDone: {
    text:
      'Thank you 🙏 Your site visit request is noted.\n' +
      `Our executive will call you shortly to confirm. For instant help, WhatsApp us on ${PHONE_DISPLAY}`,
    options: [
      { label: 'Site office location', to: 'office' },
      { label: 'Visit timings', to: 'timings' },
      { label: 'Pickup available?', to: 'pickup' },
    ],
  },
  office: {
    text:
      'Our head office is at Ahinsa Complex, Ram Bagh, Agra, Uttar Pradesh 282006.\n' +
      'For the site office of a particular project, our team will send you the exact location pin on WhatsApp.',
    options: [
      { label: '💬 Get location pin', href: 'whatsapp' },
      { label: 'Visit timings', to: 'timings' },
      { label: '📍 Book a Site Visit', to: 'visit' },
    ],
  },
  timings: {
    text: `Our team will confirm the visiting hours for your chosen project.\n${ESCALATION}`,
    options: [
      { label: '💬 WhatsApp us', href: 'whatsapp' },
      { label: 'Site office location', to: 'office' },
      { label: '📍 Book a Site Visit', to: 'visit' },
    ],
  },
  pickup: {
    text: `Our team will confirm pickup and drop for your location.\n${ESCALATION}`,
    options: [
      { label: '💬 WhatsApp us', href: 'whatsapp' },
      { label: 'Visit timings', to: 'timings' },
      { label: '📍 Book a Site Visit', to: 'visit' },
    ],
  },

  /* ---------------- Home loan & registry ---------------- */
  loan: {
    text:
      'Yes 🏦 Our projects are approved by leading banks.\n' +
      'Our team supports you through the whole process — from loan documentation right up to registry.',
    options: [
      { label: 'Which banks?', to: 'banks' },
      { label: 'Documents required', to: 'docs' },
      { label: 'Registry charges', to: 'registry' },
      { label: '💬 Talk to Loan Expert', href: 'whatsapp' },
    ],
  },
  banks: {
    text:
      'Our team will confirm which banks are empanelled for the project you are considering.\n' +
      ESCALATION,
    options: [
      { label: '💬 Talk to Loan Expert', href: 'whatsapp' },
      { label: 'Documents required', to: 'docs' },
      { label: 'Registry charges', to: 'registry' },
    ],
  },
  docs: {
    text:
      'Usually: Aadhaar, PAN, 6-month bank statement, income proof (salary slip or ITR) and photographs.\n' +
      'The exact list varies by bank — our team will share the final checklist.',
    options: [
      { label: 'Which banks?', to: 'banks' },
      { label: 'Registry charges', to: 'registry' },
      { label: '💬 Talk to Loan Expert', href: 'whatsapp' },
    ],
  },
  registry: {
    text:
      'Registry and stamp duty are charged as per current UP Government rates, and our team handles the process.\n' +
      'There are no hidden charges — every cost is shared upfront in writing.',
    options: [
      { label: 'Documents required', to: 'docs' },
      { label: '📍 Book a Site Visit', to: 'visit' },
      { label: '💬 Talk to Loan Expert', href: 'whatsapp' },
    ],
  },

  /* ---------------- Upcoming ---------------- */
  upcoming: {
    text:
      'Two projects are on the way 🌟\n' +
      '• Ahinsa Green Valley Lake City — Gwalior, Madhya Pradesh\n' +
      '• Ahinsa City Centre Mall — Firozabad, Uttar Pradesh',
    options: [
      { label: 'Lake City, Gwalior', to: 'lakecity' },
      { label: 'City Centre Mall, Firozabad', to: 'mall' },
      { label: 'Pre-book / Early Bird', to: 'prebook' },
    ],
  },
  lakecity: {
    lead: true,
    text:
      'Ahinsa Green Valley Lake City is coming up in Gwalior, Madhya Pradesh.\n' +
      'Full details will be announced at launch, and pre-registration is open for early-bird benefits.',
    options: [
      { label: 'Pre-book / Early Bird', to: 'prebook' },
      { label: 'City Centre Mall, Firozabad', to: 'mall' },
      { label: '💬 WhatsApp us', href: 'whatsapp' },
    ],
  },
  mall: {
    lead: true,
    text:
      'Ahinsa City Centre Mall is our upcoming commercial project in Firozabad, Uttar Pradesh.\n' +
      'Details will be announced at launch, and pre-registration is open.',
    options: [
      { label: 'Pre-book / Early Bird', to: 'prebook' },
      { label: 'Lake City, Gwalior', to: 'lakecity' },
      { label: '💬 WhatsApp us', href: 'whatsapp' },
    ],
  },
  prebook: {
    lead: true,
    text:
      'Pre-registration is open for both upcoming projects 🌟\n' +
      'Share your details and our team will inform you first, with early-bird benefits.',
    options: [
      { label: '📝 Notify me at launch', form: 'lead' },
      { label: '💬 WhatsApp us', href: 'whatsapp' },
      { label: '🏗️ Ongoing Projects', to: 'ongoing' },
    ],
  },

  /* ---------------- More / trust ---------------- */
  more: {
    text:
      'Clear titles, bank-approved projects and on-time possession — that is our commitment.\n' +
      '6+ signature projects and 5,000+ happy families across Agra and Gwalior.',
    options: [
      { label: 'Are projects approved?', to: 'approved' },
      { label: '🏦 Home Loan & Registry', to: 'loan' },
      { label: '🌟 Upcoming Projects', to: 'upcoming' },
      { label: '💬 Talk to Us', href: 'whatsapp' },
    ],
  },
  approved: {
    text:
      'Yes — our projects are approved and bank-financeable.\n' +
      'Our team will share the approval and registration details for the specific project you are considering.',
    options: [
      { label: '💬 Get approval details', href: 'whatsapp' },
      { label: '🏦 Home Loan & Registry', to: 'loan' },
      { label: '🏗️ Ongoing Projects', to: 'ongoing' },
    ],
  },

  /* ---------------- After the lead form ---------------- */
  leadDone: {
    text:
      'Thank you 🙏 Our executive will call you shortly.\n' +
      `For instant help, WhatsApp us on ${PHONE_DISPLAY}`,
    options: [
      { label: '🏗️ Ongoing Projects', to: 'ongoing' },
      { label: '📍 Book a Site Visit', to: 'visit' },
      { label: '💬 WhatsApp us', href: 'whatsapp' },
    ],
  },
}

/* Per-project nodes, generated from PROJECTS so the four branches stay in step. */
for (const p of PROJECTS) {
  // Open the project’s Google Maps listing by name. A lat/long link only
  // drops an unnamed pin and shows a plus code, which is not recognisable —
  // searching the listing name lands on the actual entry. Coordinates stay as
  // the fallback for anything without a listing yet.
  const mapUrl = mapLinkFor(PROJECT_DETAILS[p.slug])

  NODES[`p_${p.id}`] = {
    text: `${p.label} — ${p.address}.\n${p.config}.\nPlot sizes: ${p.sizes}`,
    options: [
      { label: 'Sizes & Price', to: `pp_${p.id}` },
      { label: 'Amenities', to: `pa_${p.id}` },
      { label: 'Location & Connectivity', to: `pl_${p.id}` },
      { label: '📍 Book Site Visit', to: `v_${p.id}` },
    ],
  }

  NODES[`pp_${p.id}`] = {
    lead: true,
    text:
      `${p.short} is available in ${p.sizes}.\n` +
      'Rates depend on the plot you choose — corner and park-facing plots are priced higher.\n' +
      'Our team will share the current rate list on WhatsApp.',
    options: [
      { label: '💬 Get Rate List', href: 'whatsapp' },
      { label: 'Amenities', to: `pa_${p.id}` },
      { label: '📍 Book Site Visit', to: `v_${p.id}` },
    ],
  }

  NODES[`pa_${p.id}`] = {
    text: `At ${p.short} you get:\n${p.amenities}`,
    options: [
      { label: 'Sizes & Price', to: `pp_${p.id}` },
      { label: 'Location & Connectivity', to: `pl_${p.id}` },
      { label: '📍 Book Site Visit', to: `v_${p.id}` },
    ],
  }

  NODES[`pl_${p.id}`] = {
    text: p.connectivity
      ? `${p.short} is at ${p.address}.\n${p.connectivity}`
      : `${p.short} is at ${p.address}.\n` +
        'Tap below to open the exact location on Google Maps.',
    options: [
      mapUrl
        ? { label: '🗺️ Open in Google Maps', href: mapUrl }
        : { label: '💬 Get location pin', href: 'whatsapp' },
      { label: 'Amenities', to: `pa_${p.id}` },
      { label: '📍 Book Site Visit', to: `v_${p.id}` },
    ],
  }

  /* Site-visit booking for this project — opens the visit form straight away. */
  NODES[`v_${p.id}`] = {
    lead: true,
    text: `Wonderful choice 🙏\nLet us get your visit to ${p.short} arranged.`,
    autoForm: { kind: 'visit', project: p.label },
    options: [
      { label: '💬 Book on WhatsApp instead', href: 'whatsapp' },
      { label: '🏗️ Ongoing Projects', to: 'ongoing' },
    ],
  }
}

/* ------------------------------------------------------------------ *
 * Lead delivery — the same Web3Forms inbox the brochure form uses
 * ------------------------------------------------------------------ */

const cleanPhone = (v) => v.replace(/\D/g, '').slice(-10)

async function sendLead(fields) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      from_name: 'Ahinsa Website — Chat Assistant',
      ...fields,
    }),
  })
  const out = await res.json()
  if (!out.success) throw new Error('Could not submit your details — please try again.')
}

/** Builds the wa.me link with the conversation so far pre-filled. */
function buildWhatsAppUrl(log) {
  const lines = [
    'Hello Ahinsa Group,',
    '',
    'I was using the chat assistant on your website and would like to speak to someone.',
  ]

  if (log.length === 0) {
    lines.push('', '(No questions asked yet.)')
  } else {
    lines.push('', '--- My chat so far ---')
    log.forEach((entry, i) => {
      lines.push('', `${i + 1}) Q: ${entry.question}`, `A: ${entry.answer}`)
    })
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}

/* ------------------------------------------------------------------ *
 * Presentation helpers
 * ------------------------------------------------------------------ */

/** Renders **bold** spans — the only markup the copy above uses. */
function RichText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-fg">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function BotAvatar() {
  return (
    <span
      aria-hidden="true"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full
                 bg-gold-500/15 text-gold-700 ring-1 ring-gold-500/30 dark:text-gold-400"
    >
      <Bot className="h-4 w-4" />
    </span>
  )
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-fg-faint"
          style={{ animation: 'cw-blink 1.2s ease-in-out infinite', animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  )
}

const FIELD_CLASS =
  'w-full rounded-lg border border-soft bg-page px-3 py-2 text-[13px] text-fg outline-none ' +
  'transition placeholder:text-fg-faint focus:border-gold-500'

const PURPOSES = ['Investment', 'Own Use', 'Just Exploring']

/**
 * The lead form. Two variants, never more than three fields — name, mobile and
 * one qualifier. Never email, address or income.
 */
function LeadForm({ kind, project, onSubmit, onSkip }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [purpose, setPurpose] = useState('')
  const [day, setDay] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const isVisit = kind === 'visit'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const mobile = cleanPhone(phone)
    if (name.trim().length < 2) return setError('Please enter your name.')
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError('Please enter a valid 10-digit mobile number.')
    if (!isVisit && !purpose) return setError('Please choose a purpose.')

    setBusy(true)
    try {
      await onSubmit({ name: name.trim(), mobile, purpose, day: day.trim(), project })
    } catch (err) {
      setBusy(false)
      setError(err.message || 'Something went wrong — please try again.')
    }
  }

  return (
    <form
      onSubmit={submit}
      className="ml-9 w-[85%] rounded-2xl rounded-bl-sm border border-gold-500/30 bg-page p-3.5 shadow-sm"
    >
      <p className="mb-2.5 text-[12.5px] leading-relaxed text-fg-muted">
        {isVisit
          ? 'To confirm your visit, may I have your details?'
          : 'To share the exact rate list and current offers, may I have your details?'}
      </p>

      <div className="flex flex-col gap-2">
        <label className="sr-only" htmlFor="cw-name">Name</label>
        <input
          id="cw-name"
          className={FIELD_CLASS}
          placeholder="👤 Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <label className="sr-only" htmlFor="cw-phone">Mobile number</label>
        <input
          id="cw-phone"
          className={FIELD_CLASS}
          placeholder="📱 Mobile Number"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />

        {isVisit ? (
          <>
            <label className="sr-only" htmlFor="cw-day">Preferred day</label>
            <input
              id="cw-day"
              className={FIELD_CLASS}
              placeholder="📅 Preferred day (optional)"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </>
        ) : (
          <fieldset className="mt-0.5">
            <legend className="mb-1.5 text-[11px] text-fg-faint">🎯 Purpose</legend>
            <div className="flex flex-wrap gap-1.5">
              {PURPOSES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPurpose(p)}
                  aria-pressed={purpose === p}
                  className={`rounded-full border px-2.5 py-1.5 text-[11.5px] transition ${
                    purpose === p
                      ? 'border-gold-500 bg-gold-500 font-medium text-ink-900'
                      : 'border-gold-500/40 text-gold-700 hover:border-gold-500 dark:text-gold-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      {error && <p className="mt-2 text-[11.5px] text-red-500">{error}</p>}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-gold-gradient px-4 py-2 text-[12.5px] font-semibold text-ink-900
                     shadow-sm transition hover:brightness-105 disabled:opacity-60"
        >
          {busy ? 'Sending…' : isVisit ? 'Confirm visit' : 'Send my details'}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full px-3 py-2 text-[12px] text-fg-faint transition hover:text-fg-muted"
        >
          Not now
        </button>
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------ *
 * Widget
 * ------------------------------------------------------------------ */

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ id: 0, role: 'bot', text: WELCOME }])
  const [node, setNode] = useState('main')
  const [log, setLog] = useState([])
  const [typing, setTyping] = useState(false)

  /* Lead state: 'idle' → 'open' (form showing) → 'sent' | 'declined'.
     Once it is 'sent' or 'declined' we never ask again. */
  const [lead, setLead] = useState('idle')
  const [form, setForm] = useState(null) // { kind, project } while a form is open
  const turns = useRef(0)

  const nextId = useRef(1)
  const panelRef = useRef(null)
  const feedRef = useRef(null)
  const launcherRef = useRef(null)
  const typingTimer = useRef(null)

  // Escape closes the panel and hands focus back to the launcher.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Move focus into the panel when it opens, so keyboard users land inside it.
  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  // Keep the newest message (and the option list) in view.
  useEffect(() => {
    const el = feedRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, form, open])

  useEffect(() => () => clearTimeout(typingTimer.current), [])

  const say = (text) => setMessages((prev) => [...prev, { id: nextId.current++, role: 'bot', text }])

  /** Walks to a node: echoes the tap, pauses, then answers. */
  const go = (option) => {
    if (typing || form) return
    const target = NODES[option.to]
    if (!target) return

    turns.current += 1
    setMessages((prev) => [...prev, { id: nextId.current++, role: 'user', text: option.label }])
    setTyping(true)

    // A brief pause before the reply — an instant answer reads as a page jump
    // rather than a conversation.
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      say(target.text)
      setLog((prev) => [...prev, { question: option.label, answer: target.text }])
      setNode(option.to)
      setTyping(false)

      // A node may open its own form — the site-visit branch does.
      if (target.autoForm) {
        // Already have their number — confirm rather than ask for it again.
        if (lead === 'sent') {
          say(
            `Our executive already has your number and will confirm the visit.\n` +
              `For anything urgent, WhatsApp us on ${PHONE_DISPLAY}`,
          )
          return
        }
        setForm(target.autoForm)
        setLead('open')
        return
      }

      // Otherwise ask once, on buying intent or after three exchanges.
      if (lead === 'idle' && (target.lead || turns.current >= 3)) {
        setForm({ kind: 'lead' })
        setLead('open')
      }
    }, TYPING_MS)
  }

  const openForm = (kind) => {
    if (lead === 'sent') return
    setForm({ kind })
    setLead('open')
  }

  const submitLead = async (values) => {
    const isVisit = form?.kind === 'visit'
    await sendLead({
      subject: isVisit
        ? `Site Visit Request — ${values.project || 'Chat Assistant'}`
        : 'Chatbot Lead — Ahinsa Website',
      Name: values.name,
      Mobile: `+91 ${values.mobile}`,
      ...(isVisit
        ? { Project: values.project || '—', 'Preferred day': values.day || 'Not specified' }
        : { Purpose: values.purpose }),
      'Chat so far': log.map((e, i) => `${i + 1}) ${e.question}`).join(' → ') || 'Opened the chat',
    })

    setMessages((prev) => [
      ...prev,
      {
        id: nextId.current++,
        role: 'user',
        text: `${values.name} · +91 ${values.mobile}${values.purpose ? ` · ${values.purpose}` : ''}`,
      },
    ])
    setForm(null)
    setLead('sent')
    setTyping(true)
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      const done = isVisit ? 'visitDone' : 'leadDone'
      say(NODES[done].text)
      setNode(done)
      setTyping(false)
    }, TYPING_MS)
  }

  /* Declined — respect it, carry on helping, and never ask again. */
  const skipLead = () => {
    const wasVisit = form?.kind === 'visit'
    setForm(null)
    setLead('declined')
    say(
      wasVisit
        ? `No problem 🙏 You can book a visit any time on WhatsApp: ${PHONE_DISPLAY}\nHow else may I help you?`
        : 'No problem 🙏 Ask me anything else — I am happy to help.',
    )
    setNode(wasVisit ? 'main' : node)
  }

  const current = NODES[node] ?? NODES.main
  const waUrl = buildWhatsAppUrl(log)

  /* Options for this step, plus the always-available way back. */
  const options = [
    ...(current.options ?? []),
    ...(node === 'main' ? [] : [{ label: '🔙 Main Menu', to: 'main' }]),
  ]

  const optionHref = (option) => {
    if (option.href === 'call') return `tel:${PHONE_TEL}`
    if (option.href === 'whatsapp') return waUrl
    return option.href
  }

  return (
    <>
      <style>{`
        @keyframes cw-blink { 0%, 60%, 100% { opacity: .25; transform: translateY(0); }
                              30% { opacity: 1; transform: translateY(-2px); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="cw-blink"] { animation: none !important; opacity: .6 !important; }
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label={`${BOT_NAME} chat`}
            tabIndex={-1}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[60] flex flex-col overflow-hidden rounded-2xl border border-gold-500/25
                       bg-page shadow-[0_24px_60px_rgba(0,0,0,0.35)] outline-none
                       bottom-[196px] right-5 w-[370px] max-h-[min(580px,72vh)]
                       max-sm:left-3 max-sm:right-3 max-sm:w-auto max-sm:max-h-[68vh]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gold-gradient px-4 py-3.5 text-ink-900">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-900/15">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#E4C656]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-[16px] leading-tight">{BOT_NAME}</div>
                <div className="mt-0.5 text-[11px] font-medium opacity-70">{BOT_TAGLINE}</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900/10
                           transition hover:bg-ink-900/25 focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-ink-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation — messages, the lead form AND the options live here */}
            <div ref={feedRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-page-soft p-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'bot' && <BotAvatar />}
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-sm bg-gold-gradient font-medium text-ink-900 shadow-sm'
                        : 'rounded-bl-sm border border-soft bg-page text-fg-muted shadow-sm'
                    }`}
                  >
                    <RichText text={m.text} />
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <BotAvatar />
                  <div className="rounded-2xl rounded-bl-sm border border-soft bg-page px-3.5 py-2.5 shadow-sm">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Lead capture — takes the place of the options while it is open */}
              {!typing && form && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <LeadForm
                    kind={form.kind}
                    project={form.project}
                    onSubmit={submitLead}
                    onSkip={skipLead}
                  />
                </motion.div>
              )}

              {/* Options for this step, in the thread under the latest reply */}
              {!typing && !form && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
                  className="flex flex-col items-start gap-2 pl-9"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">{MENU_PROMPT}</p>
                  {options.map((option) =>
                    option.href ? (
                      <a
                        key={option.label}
                        href={optionHref(option)}
                        target={option.href === 'call' ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="max-w-[85%] rounded-full border border-gold-500/40 bg-page px-3.5 py-2
                                   text-left text-[12.5px] leading-snug text-gold-700 shadow-sm transition
                                   hover:border-gold-500 hover:bg-gold-500 hover:text-ink-900
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                   focus-visible:outline-gold-500 dark:text-gold-400 dark:hover:text-ink-900"
                      >
                        {option.label}
                      </a>
                    ) : (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => (option.form ? openForm(option.form) : go(option))}
                        className="max-w-[85%] rounded-full border border-gold-500/40 bg-page px-3.5 py-2
                                   text-left text-[12.5px] leading-snug text-gold-700 shadow-sm transition
                                   hover:border-gold-500 hover:bg-gold-500 hover:text-ink-900
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                   focus-visible:outline-gold-500 dark:text-gold-400 dark:hover:text-ink-900"
                      >
                        {option.label}
                      </button>
                    ),
                  )}
                </motion.div>
              )}
            </div>

            {/* Permanent hand-off to a human */}
            <div className="flex items-center gap-2 border-t border-soft bg-page p-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5
                           text-[13px] font-semibold text-white shadow-sm transition hover:brightness-110
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-[#25D366]"
              >
                <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M16 3.2A12.8 12.8 0 0 0 4.93 22.4L3.2 28.8l6.57-1.72A12.8 12.8 0 1 0 16 3.2zm0 23.36a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-4 1.05 1.07-3.9-.25-.4A10.63 10.63 0 1 1 16 26.56zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
                </svg>
                WhatsApp
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-gold-500/40
                           px-3 py-2.5 text-[13px] font-semibold text-gold-700 transition
                           hover:border-gold-500 hover:bg-gold-500 hover:text-ink-900
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-gold-500 dark:text-gold-400 dark:hover:text-ink-900"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher — sits above the WhatsApp button, which is at bottom-5 (20px)
          and 56px tall. 124px leaves a clear ~48px gap between the two. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
        title={open ? 'Close chat' : 'Chat with our assistant'}
        className="group fixed bottom-[124px] right-5 z-40 flex h-14 w-14 items-center justify-center
                   rounded-full bg-gold-gradient text-ink-900 shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                   ring-1 ring-white/25 transition-transform duration-300 hover:scale-110
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-gold-500"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-7 w-7" />}
        {/* Tooltip (desktop) */}
        {!open && (
          <span
            className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-md
                       bg-ink-900/95 px-3 py-2 text-xs font-medium text-cream opacity-0 shadow-lg
                       ring-1 ring-white/10 transition-opacity duration-300 group-hover:opacity-100 md:block"
          >
            Ask our assistant
          </span>
        )}
      </button>
    </>
  )
}
