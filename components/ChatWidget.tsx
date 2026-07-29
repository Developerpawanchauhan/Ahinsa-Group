'use client'

/**
 * ChatWidget — menu-based (decision-tree) chat bubble. No AI/LLM, no API calls,
 * no external libraries: every answer below is hard-coded.
 *
 * HOW TO USE (Next.js App Router)
 * -------------------------------
 * Site-wide — add it once in `app/layout.tsx`, inside <body>:
 *
 *     import ChatWidget from '@/components/ChatWidget'
 *     ...
 *     <body>
 *       {children}
 *       <ChatWidget />
 *     </body>
 *
 * Single page instead — drop <ChatWidget /> anywhere in that page's JSX.
 * The widget is `position: fixed`, so where you place it in the tree does not
 * affect where it appears on screen.
 *
 * STYLING: inline styles + one small injected <style> block. Inline styles
 * cannot express keyframes, media queries or :focus-visible, so those four
 * things live in the <style> block; everything else is inline. No CSS modules,
 * no Tailwind — the file is self-contained and drops into any project.
 *
 * WHAT TO EDIT: the CONFIG block directly below — number, colour, copy, and
 * the FAQS array. Nothing below that block needs touching for normal changes.
 */

import { useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------ *
 * CONFIG — edit this block
 * ------------------------------------------------------------------ */

/** WhatsApp number: country code + number, no +, spaces or dashes. */
const WHATSAPP_NUMBER = '916398730582'

/** Primary accent. Change this one value to re-skin the widget. */
const ACCENT = '#C9A227'
const ACCENT_TEXT = '#1A1A1A' // text drawn on top of ACCENT

const BOT_NAME = 'Ahinsa Assistant'
const BOT_TAGLINE = 'Usually replies instantly'
const WELCOME_MESSAGE = 'Namaste! 👋 Neeche diye gaye sawaalon me se koi chunein — main turant jawab dunga.'
const MENU_PROMPT = 'Aur kuch poochna chahenge?'
const HUMAN_HANDOFF_LABEL = 'Real person se baat karein'

/** The decision tree. Add/remove/edit freely — the UI adapts to the length. */
type QA = {
  /** Any unique string. Used as the React key. */
  id: string
  question: string
  answer: string
}

const FAQS: QA[] = [
  {
    id: 'pricing',
    question: 'Aapki pricing kya hai?',
    answer:
      'Har project ki pricing uske location, plot size aur configuration par depend karti hai. ' +
      'Current price list aur payment plan ke liye hum aapko detailed brochure bhej sakte hain.',
  },
  {
    id: 'delivery',
    question: 'Possession kitne time me milta hai?',
    answer:
      'Ready-to-move units me registry ke turant baad possession mil jaata hai. ' +
      'Ongoing projects me timeline project ke hisaab se alag hoti hai — team aapko exact date bata degi.',
  },
  {
    id: 'visit',
    question: 'Site visit kaise book karein?',
    answer:
      'Site visit bilkul free hai aur pick-up facility bhi available hai. ' +
      'Apna preferred din aur time bata dijiye, hamari team confirm kar degi.',
  },
  {
    id: 'loan',
    question: 'Home loan ki facility hai?',
    answer:
      'Ji haan. Hamare projects leading banks se approved hain aur loan documentation me hamari team ' +
      'poori madad karti hai — eligibility check se lekar disbursement tak.',
  },
]

/* Placement: sits directly ABOVE the floating WhatsApp button.
   Those numbers mirror the WhatsApp button on this site (bottom-5 right-5 = 20px,
   size h-14 w-14 = 56px). Change EDGE / WA_BUTTON_SIZE if yours differs. */
const EDGE = 20 // distance from the screen edge
const WA_BUTTON_SIZE = 56 // the WhatsApp button's diameter
const GAP = 12 // breathing room between the two buttons
const LAUNCHER_BOTTOM = EDGE + WA_BUTTON_SIZE + GAP // 88px
const LAUNCHER_SIZE = 56
const PANEL_BOTTOM = LAUNCHER_BOTTOM + LAUNCHER_SIZE + GAP // panel clears the launcher
const Z = 50 // above the WhatsApp button (which sits at z-40 on this site)

/* ------------------------------------------------------------------ *
 * Internals — no edits needed below
 * ------------------------------------------------------------------ */

type Role = 'bot' | 'user'
type Message = { id: number; role: Role; text: string }
type LogEntry = { question: string; answer: string }

/** Builds the wa.me link, embedding the whole Q&A transcript so far. */
function buildWhatsAppUrl(log: LogEntry[]): string {
  const lines: string[] = [
    'Namaste Ahinsa Group,',
    '',
    'Main website ke chat assistant par tha aur ab kisi se seedhe baat karna chahta/chahti hoon.',
  ]

  if (log.length === 0) {
    lines.push('', '(Abhi tak koi sawaal nahi poocha.)')
  } else {
    lines.push('', '--- Ab tak ki baat-cheet ---')
    log.forEach((entry, i) => {
      lines.push('', `${i + 1}) Sawaal: ${entry.question}`, `Jawab: ${entry.answer}`)
    })
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}

/* Keyframes, media query and focus rings — the things inline styles can't do. */
const CSS = `
@keyframes cw-in  { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: none; } }
@keyframes cw-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(14px) scale(.97); } }
.cw-panel  { animation: cw-in .22s cubic-bezier(.22,1,.36,1) both; }
.cw-panel[data-leaving="true"] { animation: cw-out .18s ease-in both; }
.cw-focusable:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }
.cw-chip:hover:not(:disabled) { border-color: ${ACCENT}; background: #FFFDF5; }
.cw-launcher:hover { transform: scale(1.06); }
@media (prefers-reduced-motion: reduce) {
  .cw-panel, .cw-panel[data-leaving="true"] { animation: none; }
  .cw-launcher:hover { transform: none; }
}
@media (max-width: 480px) {
  .cw-panel {
    left: 12px; right: 12px; width: auto !important;
    bottom: ${LAUNCHER_BOTTOM + LAUNCHER_SIZE + GAP}px;
    max-height: 68vh;
  }
}
`

export default function ChatWidget() {
  const [open, setOpen] = useState<boolean>(false)
  const [leaving, setLeaving] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: 'bot', text: WELCOME_MESSAGE }])
  const [log, setLog] = useState<LogEntry[]>([])

  const nextId = useRef<number>(1)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const feedRef = useRef<HTMLDivElement | null>(null)
  const launcherRef = useRef<HTMLButtonElement | null>(null)
  const closeTimer = useRef<number | null>(null)

  const closePanel = (): void => {
    setLeaving(true)
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setOpen(false)
      setLeaving(false)
      launcherRef.current?.focus() // return focus to where it came from
    }, 180)
  }

  // Escape closes the panel from anywhere.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') closePanel()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Move focus into the panel when it opens, so keyboard users land inside it.
  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  // Keep the newest message in view.
  useEffect(() => {
    const el = feedRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, open])

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }, [])

  const ask = (qa: QA): void => {
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: 'user', text: qa.question },
      { id: nextId.current++, role: 'bot', text: qa.answer },
    ])
    setLog((prev) => [...prev, { question: qa.question, answer: qa.answer }])
  }

  const asked = messages.some((m) => m.role === 'user')

  return (
    <>
      <style>{CSS}</style>

      {/* ---------------- Panel ---------------- */}
      {open && (
        <div
          ref={panelRef}
          className="cw-panel cw-focusable"
          role="dialog"
          aria-modal="false"
          aria-label={`${BOT_NAME} chat`}
          tabIndex={-1}
          data-leaving={leaving ? 'true' : 'false'}
          style={{
            position: 'fixed',
            right: EDGE,
            bottom: PANEL_BOTTOM,
            zIndex: Z,
            width: 360,
            maxHeight: 'min(560px, 70vh)',
            display: 'flex',
            flexDirection: 'column',
            background: '#FFFFFF',
            color: '#1A1A1A',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,.22), 0 2px 8px rgba(0,0,0,.10)',
            fontFamily: 'inherit',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              background: ACCENT,
              color: ACCENT_TEXT,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              💬
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>{BOT_NAME}</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{BOT_TAGLINE}</div>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Chat band karein"
              className="cw-focusable"
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: 'rgba(0,0,0,.10)',
                color: ACCENT_TEXT,
                fontSize: 17,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={feedRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 16,
              background: '#F7F7F8',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '10px 13px',
                  borderRadius: 14,
                  borderBottomRightRadius: m.role === 'user' ? 4 : 14,
                  borderBottomLeftRadius: m.role === 'bot' ? 4 : 14,
                  background: m.role === 'user' ? ACCENT : '#FFFFFF',
                  color: m.role === 'user' ? ACCENT_TEXT : '#2A2A2A',
                  boxShadow: m.role === 'bot' ? '0 1px 2px rgba(0,0,0,.08)' : 'none',
                  fontSize: 14,
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Question menu — always re-shown after every answer */}
          <div style={{ padding: 14, borderTop: '1px solid #ECECEC', background: '#FFFFFF' }}>
            {asked && (
              <div style={{ fontSize: 11, color: '#8A8A8A', marginBottom: 8, letterSpacing: '.03em' }}>
                {MENU_PROMPT}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FAQS.map((qa) => (
                <button
                  key={qa.id}
                  type="button"
                  onClick={() => ask(qa)}
                  className="cw-chip cw-focusable"
                  style={{
                    textAlign: 'left',
                    padding: '9px 12px',
                    borderRadius: 10,
                    border: '1px solid #E2E2E2',
                    background: '#FFFFFF',
                    color: '#2A2A2A',
                    fontSize: 13,
                    lineHeight: 1.4,
                    cursor: 'pointer',
                    transition: 'background .15s, border-color .15s',
                    fontFamily: 'inherit',
                  }}
                >
                  {qa.question}
                </button>
              ))}
            </div>

            {/* Permanent hand-off to a human */}
            <a
              href={buildWhatsAppUrl(log)}
              target="_blank"
              rel="noopener noreferrer"
              className="cw-focusable"
              style={{
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '11px 12px',
                borderRadius: 10,
                background: '#25D366',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <svg viewBox="0 0 32 32" width={17} height={17} fill="currentColor" aria-hidden="true">
                <path d="M16 3.2A12.8 12.8 0 0 0 4.93 22.4L3.2 28.8l6.57-1.72A12.8 12.8 0 1 0 16 3.2zm0 23.36a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-4 1.05 1.07-3.9-.25-.4A10.63 10.63 0 1 1 16 26.56zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
              </svg>
              {HUMAN_HANDOFF_LABEL}
            </a>
          </div>
        </div>
      )}

      {/* ---------------- Launcher ---------------- */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? closePanel() : setOpen(true))}
        aria-expanded={open}
        aria-label={open ? 'Chat band karein' : 'Chat kholein'}
        title={open ? 'Chat band karein' : 'Chat kholein'}
        className="cw-launcher cw-focusable"
        style={{
          position: 'fixed',
          right: EDGE,
          bottom: LAUNCHER_BOTTOM,
          zIndex: Z,
          width: LAUNCHER_SIZE,
          height: LAUNCHER_SIZE,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: ACCENT,
          color: ACCENT_TEXT,
          fontSize: 24,
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,.30)',
          transition: 'transform .25s ease',
        }}
      >
        <span aria-hidden="true">{open ? '×' : '💬'}</span>
      </button>
    </>
  )
}
