import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react'
import Logo from './Logo'
import { WEB3FORMS_KEY } from '../data/site'

/**
 * Visitor enquiry popup — appears five seconds after someone opens anything
 * under the Projects menu, and emails what they fill in to info@ahinsagroup.in
 * (the Web3Forms inbox every other form on the site uses).
 *
 * Project pages are where buying intent shows, so that is where we ask. Nothing
 * appears on Home, About, Contact or the media pages.
 *
 * Nothing is remembered between page loads: a refresh or a fresh visit brings
 * it back, whether the visitor filled it in last time or closed it. Within one
 * page load it appears once, so browsing four townships in a row does not mean
 * four popups.
 *
 * Mounted once in App.jsx, so it catches every route.
 */

/** How long the visitor gets to look at the page before the popup appears. */
const DELAY_MS = 5_000

/** Routes that trigger it: the projects listing and every project page. */
const isProjectRoute = (pathname) => pathname === '/projects' || pathname.startsWith('/projects/')

/**
 * Deliberately a plain variable, not sessionStorage or localStorage: it dies
 * with the page, so reloading or coming back to the site shows the popup again.
 * It only stops a second popup while the visitor moves between project pages
 * without a reload.
 */
let shownThisLoad = false

const REASONS = [
  'Buying a plot',
  'Buying a villa / house',
  'Commercial / shop space',
  'Booking a site visit',
  'Home loan & registry',
  'Investment enquiry',
  'Careers',
  'Just exploring',
]

const cleanPhone = (v) => v.replace(/\D/g, '').slice(-10)

const fieldCls =
  'w-full bg-white dark:bg-ink-800/60 border border-gold-500/25 dark:border-gold-500/20 ' +
  'px-4 py-3 text-fg text-sm placeholder:text-fg-faint focus:outline-none focus:border-gold-500 transition'

const labelCls =
  'block text-[10px] uppercase tracking-[0.2em] text-gold-700 dark:text-gold-500 mb-1.5'

export default function WelcomePopup() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: REASONS[0] })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Five seconds after a project route is entered, every time — nothing is
  // remembered from a previous load. Leaving the route before the five seconds
  // are up cancels it, and the flag is only set once the popup actually opens.
  useEffect(() => {
    if (!isProjectRoute(pathname) || shownThisLoad) return
    const t = setTimeout(() => {
      shownThisLoad = true
      setOpen(true)
    }, DELAY_MS)
    return () => clearTimeout(t)
  }, [pathname])

  // Escape closes it, and focus lands inside so keyboard users are not stranded.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && !busy && setOpen(false)
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, busy])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const phone = cleanPhone(form.phone)
    if (form.name.trim().length < 2) return setError('Please enter your name.')
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError('Please enter a valid email address.')
    if (!/^[6-9]\d{9}$/.test(phone)) return setError('Please enter a valid 10-digit mobile number.')

    setBusy(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website Visitor — ${form.reason}`,
          from_name: 'Ahinsa Website — Welcome Popup',
          replyto: form.email.trim(),
          Name: form.name.trim(),
          Email: form.email.trim(),
          Phone: `+91 ${phone}`,
          'Reason for visiting': form.reason,
          Page: window.location.pathname,
        }),
      })
      const out = await res.json()
      if (!out.success) throw new Error()
      setDone(true)
      setTimeout(() => setOpen(false), 2600)
    } catch {
      setError('Could not send your details — please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] bg-ink-900/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={busy ? undefined : () => setOpen(false)}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Tell us about your visit"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-cream dark:bg-ink-900
                       border border-gold-500/30 shadow-2xl"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              disabled={busy}
              aria-label="Close"
              className="absolute top-3 right-3 p-2 text-fg-soft hover:text-gold-500 transition
                         disabled:opacity-40 focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-7">
              {done ? (
                /* ── Success ── */
                <>
                  <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-gold-500" />
                  </div>
                  <h3 className="font-serif text-fg text-2xl">Thank you 🙏</h3>
                  <p className="text-fg-soft text-sm mt-2">
                    Our team will get in touch with you shortly.
                  </p>
                </>
              ) : (
                /* ── Form ── */
                <>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="w-11 h-11 shrink-0 bg-ink-900 border border-gold-500/50 flex items-center justify-center">
                      <Logo size="sm" />
                    </span>
                    <div>
                      <h3 className="font-serif text-fg text-xl leading-tight">Namaste 🙏</h3>
                      <p className="text-fg-soft text-xs mt-0.5">Welcome to Ahinsa Group</p>
                    </div>
                  </div>

                  <p className="text-fg-soft text-sm leading-relaxed mt-4 mb-5">
                    Tell us a little about yourself and our team will help you personally.
                  </p>

                  <form onSubmit={submit} className="space-y-3.5">
                    <div>
                      <label className={labelCls} htmlFor="wp-name">Name</label>
                      <input
                        id="wp-name"
                        className={fieldCls}
                        placeholder="Your full name"
                        value={form.name}
                        onChange={set('name')}
                        disabled={busy}
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="wp-email">Email</label>
                      <input
                        id="wp-email"
                        type="email"
                        className={fieldCls}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={set('email')}
                        disabled={busy}
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="wp-phone">Phone</label>
                      <input
                        id="wp-phone"
                        className={fieldCls}
                        placeholder="10-digit mobile number"
                        inputMode="numeric"
                        maxLength={13}
                        value={form.phone}
                        onChange={set('phone')}
                        disabled={busy}
                        autoComplete="tel"
                      />
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="wp-reason">What brings you here?</label>
                      <select
                        id="wp-reason"
                        className={`${fieldCls} appearance-none cursor-pointer`}
                        value={form.reason}
                        onChange={set('reason')}
                        disabled={busy}
                      >
                        {REASONS.map((r) => (
                          <option key={r} value={r} className="bg-white dark:bg-ink-800">{r}</option>
                        ))}
                      </select>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={busy}
                      className="btn-gold w-full justify-center disabled:opacity-60"
                    >
                      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {busy ? 'Sending…' : 'Submit'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      disabled={busy}
                      className="w-full text-center text-fg-faint text-xs hover:text-fg-muted transition py-1"
                    >
                      Maybe later
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
