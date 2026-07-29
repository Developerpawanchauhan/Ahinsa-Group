import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, X, ArrowUpRight } from 'lucide-react'

/**
 * Menu-based chat widget — a fixed decision tree, not an AI. Every answer
 * below is hard-coded; nothing is fetched and no API is called.
 *
 * Sits above the floating WhatsApp button on every page (mounted once in
 * App.jsx). The question options live inside the conversation, appearing under
 * the latest reply, so the whole exchange reads as one thread. "Talk to a real
 * person" hands off to WhatsApp with the full transcript pre-filled.
 */

/* ------------------------------------------------------------------ *
 * EDIT ME — questions, answers and copy
 * ------------------------------------------------------------------ *
 * Sample content for now. Replace `question` / `answer` with the real
 * ones — add or remove entries freely, the menu adapts to the length. */
const CHAT_FAQS = [
  {
    id: 'projects',
    question: 'Which projects are currently ongoing?',
    answer:
      'We are currently developing Ahinsa The Grand Green Valley (Fatehabad Road), Green Valley Empire ' +
      '(Mudi Crossing), Green Valley Township and Green Valley Orchid (Kuberpur). Each offers both ' +
      'residential and commercial options.',
  },
  {
    id: 'pricing',
    question: 'What are your plot and villa prices?',
    answer:
      'Pricing depends on the project, plot size and location. Plots are available from 111.11 up to ' +
      '200 sq yard. Our team will share the current rate list and payment plan with you.',
  },
  {
    id: 'visit',
    question: 'How do I book a site visit?',
    answer:
      'Site visits are completely free, and pick-up can be arranged. Just share your name, number and a ' +
      'preferred day, and our team will confirm the details with you.',
  },
  {
    id: 'loan',
    question: 'Do you help with home loans and registry?',
    answer:
      'Yes. Our projects are approved by leading banks, and our team supports you through the entire ' +
      'process — from loan documentation right up to registry.',
  },
]

/** Same number as the floating WhatsApp button (intl format, no + or spaces). */
const WHATSAPP_NUMBER = '916398730582'

const BOT_NAME = 'Ahinsa Assistant'
const BOT_TAGLINE = 'Online · replies instantly'
const WELCOME_MESSAGE = 'Hello! 👋 I can help you with our projects. Pick a question below to get started.'
const MENU_PROMPT = 'Anything else?'
const HUMAN_HANDOFF_LABEL = 'Talk to our consultant'

/** How long the typing dots show before an answer lands. */
const TYPING_MS = 550

/* ------------------------------------------------------------------ *
 * Internals
 * ------------------------------------------------------------------ */

/** Builds the wa.me link with the full Q&A transcript pre-filled. */
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

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ id: 0, role: 'bot', text: WELCOME_MESSAGE }])
  const [log, setLog] = useState([])
  const [typing, setTyping] = useState(false)

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
  }, [messages, typing, open])

  useEffect(() => () => clearTimeout(typingTimer.current), [])

  const ask = (faq) => {
    if (typing) return
    setMessages((prev) => [...prev, { id: nextId.current++, role: 'user', text: faq.question }])
    setTyping(true)

    // A brief pause before the reply — an instant answer reads as a page jump
    // rather than a conversation.
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId.current++, role: 'bot', text: faq.answer }])
      setLog((prev) => [...prev, { question: faq.question, answer: faq.answer }])
      setTyping(false)
    }, TYPING_MS)
  }

  const asked = log.length > 0

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

            {/* Conversation — messages AND the question options live here */}
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
                    {m.text}
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

              {/* Question options, in the thread under the latest reply */}
              {!typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
                  className="flex flex-col items-start gap-2 pl-9"
                >
                  {asked && (
                    <p className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">{MENU_PROMPT}</p>
                  )}
                  {CHAT_FAQS.map((faq) => (
                    <button
                      key={faq.id}
                      type="button"
                      onClick={() => ask(faq)}
                      className="max-w-[85%] rounded-full border border-gold-500/40 bg-page px-3.5 py-2
                                 text-left text-[12.5px] leading-snug text-gold-700 shadow-sm transition
                                 hover:border-gold-500 hover:bg-gold-500 hover:text-ink-900
                                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                 focus-visible:outline-gold-500 dark:text-gold-400 dark:hover:text-ink-900"
                    >
                      {faq.question}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Permanent hand-off to a human */}
            <div className="border-t border-soft bg-page p-3">
              <a
                href={buildWhatsAppUrl(log)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5
                           text-[13px] font-semibold text-white shadow-sm transition hover:brightness-110
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-[#25D366]"
              >
                <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M16 3.2A12.8 12.8 0 0 0 4.93 22.4L3.2 28.8l6.57-1.72A12.8 12.8 0 1 0 16 3.2zm0 23.36a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-4 1.05 1.07-3.9-.25-.4A10.63 10.63 0 1 1 16 26.56zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.82.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
                </svg>
                {HUMAN_HANDOFF_LABEL}
                <ArrowUpRight className="h-3.5 w-3.5" />
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
