import { useEffect, useState } from 'react'
import { X, Download, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react'
import { BROCHURE_PROJECTS } from './BrochureGallery'
import { BROCHURE_LEADS_ENDPOINT, WEB3FORMS_KEY } from '../data/site'

/*
 * Brochure download popup — 3 steps:
 *   1. details  — select brochure + name + city + phone
 *   2. otp      — 6-digit code sent to the phone; must match to continue
 *   3. download — generates the brochure PDF from its page images
 *
 * On successful OTP verification the lead (brochure, name, city, phone) is
 * emailed to info@ahinsagroup.in via Web3Forms — same service as the site's
 * contact forms.
 *
 * OTP SMS backend: google-apps-script/brochure-otp.gs. Until
 * BROCHURE_LEADS_ENDPOINT is configured the modal runs in demo mode and
 * displays the OTP on screen.
 */

const OTP_RESEND_SECONDS = 30

const inputCls =
  'w-full bg-white dark:bg-ink-800/60 border border-gold-500/25 dark:border-gold-500/20 ' +
  'px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-gold-500 transition'

const labelCls = 'block text-xs uppercase tracking-[0.2em] text-gold-700 dark:text-gold-500 mb-2'

function cleanPhone(raw) {
  return raw.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
}

async function callApi(payload) {
  // Plain-text body keeps this a CORS "simple request" (no preflight),
  // which Google Apps Script web apps require.
  const res = await fetch(BROCHURE_LEADS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Network error — please try again.')
  return res.json()
}

/* Emails the verified lead to info@ahinsagroup.in via Web3Forms
   (the same service the site's contact forms use). */
async function sendLeadEmail({ brochure, name, city, phone }) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Brochure Download — ${brochure}`,
      from_name: 'Ahinsa Website — Brochure Download',
      Brochure: brochure,
      Name: name,
      City: city,
      Phone: `+91 ${phone}`,
      'Verified via': 'Phone OTP',
    }),
  })
  const out = await res.json()
  if (!out.success) throw new Error('Could not submit your details — please try again.')
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load a brochure page.'))
    img.src = src
  })
}

/* Builds the PDF in the browser from the brochure's page images,
   re-compressed to JPEG so the file stays a reasonable size. */
async function generatePdf(project, onProgress) {
  const { jsPDF } = await import('jspdf')
  let pdf = null
  for (let i = 0; i < project.images.length; i++) {
    const img = await loadImage(`/images/brochure/${project.folder}/${project.images[i]}`)
    const scale = Math.min(1, 1600 / img.naturalWidth)
    const w = Math.round(img.naturalWidth * scale)
    const h = Math.round(img.naturalHeight * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    canvas.getContext('2d').drawImage(img, 0, 0, w, h)
    const jpeg = canvas.toDataURL('image/jpeg', 0.78)
    const orientation = w >= h ? 'l' : 'p'
    if (!pdf) pdf = new jsPDF({ orientation, unit: 'px', format: [w, h], compress: true })
    else pdf.addPage([w, h], orientation)
    pdf.addImage(jpeg, 'JPEG', 0, 0, w, h)
    onProgress(Math.round(((i + 1) / project.images.length) * 100))
  }
  pdf.save(`${project.label}.pdf`)
}

export default function BrochureDownloadModal({ open, onClose, defaultBrochureId = 'grand' }) {
  const [step, setStep] = useState('details') // details | otp | download
  const [form, setForm] = useState({ brochure: defaultBrochureId, name: '', city: '', phone: '' })
  const [otp, setOtp] = useState('')
  const [demoOtp, setDemoOtp] = useState(null) // set when no backend / no SMS key
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [resendIn, setResendIn] = useState(0)
  const [progress, setProgress] = useState(null) // null | 0-100

  const project = BROCHURE_PROJECTS.find((p) => p.id === form.brochure)

  // Reset whenever the popup opens
  useEffect(() => {
    if (open) {
      setStep('details')
      setForm({ brochure: defaultBrochureId, name: '', city: '', phone: '' })
      setOtp('')
      setDemoOtp(null)
      setError('')
      setBusy(false)
      setProgress(null)
    }
  }, [open, defaultBrochureId])

  // Resend cooldown tick
  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const sendOtp = async () => {
    setError('')
    const phone = cleanPhone(form.phone)
    if (form.name.trim().length < 2) return setError('Please enter your name.')
    if (form.city.trim().length < 2) return setError('Please enter your city.')
    if (!/^[6-9]\d{9}$/.test(phone)) return setError('Please enter a valid 10-digit mobile number.')

    setBusy(true)
    try {
      if (!BROCHURE_LEADS_ENDPOINT) {
        // Demo mode — no backend configured yet
        setDemoOtp(String(Math.floor(100000 + Math.random() * 900000)))
      } else {
        const out = await callApi({ action: 'send_otp', phone })
        if (!out.ok) throw new Error(out.error || 'Could not send OTP.')
        // Backend deployed but SMS key not configured — it returns the code
        setDemoOtp(out.testOtp || null)
      }
      setOtp('')
      setResendIn(OTP_RESEND_SECONDS)
      setStep('otp')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const verifyOtp = async () => {
    setError('')
    if (!/^\d{6}$/.test(otp)) return setError('Enter the 6-digit code.')
    setBusy(true)
    try {
      if (!BROCHURE_LEADS_ENDPOINT) {
        if (otp !== demoOtp) throw new Error('Incorrect OTP — please try again.')
      } else {
        const out = await callApi({ action: 'verify_otp', phone: cleanPhone(form.phone), otp })
        if (!out.ok) throw new Error(out.error || 'Incorrect OTP — please try again.')
      }

      // OTP confirmed → email the lead to info@ahinsagroup.in
      await sendLeadEmail({
        brochure: project?.label || form.brochure,
        name: form.name.trim(),
        city: form.city.trim(),
        phone: cleanPhone(form.phone),
      })

      setStep('download')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const download = async () => {
    if (!project) return
    setError('')
    setProgress(0)
    try {
      await generatePdf(project, setProgress)
      setProgress(null)
    } catch (err) {
      setProgress(null)
      setError(err.message || 'Download failed — please try again.')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-900/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-cream dark:bg-ink-900 border border-gold-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 text-fg-soft hover:text-gold-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7">
          {/* ── STEP 1 — details ── */}
          {step === 'details' && (
            <>
              <h3 className="font-serif text-fg text-2xl">Download Brochure</h3>
              <p className="text-fg-soft text-sm mt-1 mb-6">
                Fill in your details — we&apos;ll verify your number with an OTP.
              </p>

              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Select the Brochure</label>
                  <select value={form.brochure} onChange={set('brochure')} className={inputCls}>
                    {BROCHURE_PROJECTS.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Name</label>
                  <input value={form.name} onChange={set('name')} placeholder="Your full name" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input value={form.city} onChange={set('city')} placeholder="Your city" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength={13}
                    className={inputCls}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

              <button onClick={sendOtp} disabled={busy} className="btn-gold w-full justify-center mt-6 disabled:opacity-60">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {busy ? 'Sending OTP…' : 'Send OTP'}
              </button>
            </>
          )}

          {/* ── STEP 2 — OTP ── */}
          {step === 'otp' && (
            <>
              <button
                onClick={() => { setStep('details'); setError('') }}
                className="inline-flex items-center gap-1.5 text-fg-soft hover:text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Edit details
              </button>

              <h3 className="font-serif text-fg text-2xl">Verify your number</h3>
              <p className="text-fg-soft text-sm mt-1 mb-6">
                Enter the 6-digit code sent to <span className="text-fg font-medium">+91 {cleanPhone(form.phone)}</span>
              </p>

              {demoOtp && (
                <p className="text-xs bg-gold-500/10 border border-gold-500/30 text-gold-700 dark:text-gold-400 px-4 py-3 mb-4">
                  SMS service not configured yet — your test OTP is <span className="font-bold tracking-widest">{demoOtp}</span>
                </p>
              )}

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="••••••"
                inputMode="numeric"
                autoFocus
                className={`${inputCls} text-center text-2xl tracking-[0.5em] font-mono`}
              />

              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

              <button onClick={verifyOtp} disabled={busy} className="btn-gold w-full justify-center mt-6 disabled:opacity-60">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                {busy ? 'Verifying…' : 'Verify OTP'}
              </button>

              <button
                onClick={sendOtp}
                disabled={busy || resendIn > 0}
                className="w-full text-center text-xs uppercase tracking-[0.2em] text-fg-soft hover:text-gold-500 disabled:opacity-50 disabled:hover:text-fg-soft mt-4 transition"
              >
                {resendIn > 0 ? `Resend OTP in ${resendIn}s` : 'Resend OTP'}
              </button>
            </>
          )}

          {/* ── STEP 3 — download ── */}
          {step === 'download' && (
            <>
              <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="font-serif text-fg text-2xl">Number verified!</h3>
              <p className="text-fg-soft text-sm mt-1 mb-6">
                Thank you, {form.name.trim()}. Your brochure is ready —{' '}
                <span className="text-fg font-medium">{project?.label}</span> ({project?.images.length} pages).
              </p>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {progress !== null ? (
                <div>
                  <div className="flex justify-between text-xs text-fg-soft mb-2">
                    <span>Preparing PDF…</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gold-500/15 overflow-hidden">
                    <div className="h-full bg-gold-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-fg-faint text-xs mt-3">Large brochures can take a little while — please keep this window open.</p>
                </div>
              ) : (
                <button onClick={download} className="btn-gold w-full justify-center">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
