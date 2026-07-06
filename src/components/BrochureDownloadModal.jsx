import { useEffect, useState } from 'react'
import { X, Download, Loader2, CheckCircle2 } from 'lucide-react'
import { BROCHURE_PROJECTS } from './BrochureGallery'
import { WEB3FORMS_KEY } from '../data/site'

/*
 * Brochure download popup — fill details (brochure, name, city, phone),
 * click Download: the lead is emailed to info@ahinsagroup.in via Web3Forms
 * (same service as the site's contact forms), then the brochure PDF is
 * generated from its page images and saved to the visitor's device.
 */

const inputCls =
  'w-full bg-white dark:bg-ink-800/60 border border-gold-500/25 dark:border-gold-500/20 ' +
  'px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-gold-500 transition'

const labelCls = 'block text-xs uppercase tracking-[0.2em] text-gold-700 dark:text-gold-500 mb-2'

function cleanPhone(raw) {
  return raw.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
}

/* Emails the lead to info@ahinsagroup.in via Web3Forms. */
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
  const [form, setForm] = useState({ brochure: defaultBrochureId, name: '', city: '', phone: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)       // sending the email
  const [progress, setProgress] = useState(null) // null | 0-100 while building PDF
  const [done, setDone] = useState(false)

  const project = BROCHURE_PROJECTS.find((p) => p.id === form.brochure)

  // Reset whenever the popup opens
  useEffect(() => {
    if (open) {
      setForm({ brochure: defaultBrochureId, name: '', city: '', phone: '' })
      setError('')
      setBusy(false)
      setProgress(null)
      setDone(false)
    }
  }, [open, defaultBrochureId])

  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleDownload = async () => {
    setError('')
    const phone = cleanPhone(form.phone)
    if (form.name.trim().length < 2) return setError('Please enter your name.')
    if (form.city.trim().length < 2) return setError('Please enter your city.')
    if (!/^[6-9]\d{9}$/.test(phone)) return setError('Please enter a valid 10-digit mobile number.')
    if (!project) return setError('Please select a brochure.')

    setBusy(true)
    try {
      // 1. Send the lead to info@ahinsagroup.in
      await sendLeadEmail({
        brochure: project.label,
        name: form.name.trim(),
        city: form.city.trim(),
        phone,
      })

      // 2. Build and save the PDF
      setBusy(false)
      setProgress(0)
      await generatePdf(project, setProgress)
      setProgress(null)
      setDone(true)
    } catch (err) {
      setBusy(false)
      setProgress(null)
      setError(err.message || 'Something went wrong — please try again.')
    }
  }

  const working = busy || progress !== null

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-900/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={working ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-md bg-cream dark:bg-ink-900 border border-gold-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <button
          onClick={onClose}
          disabled={working}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 text-fg-soft hover:text-gold-500 transition disabled:opacity-40"
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
              <h3 className="font-serif text-fg text-2xl">Download started!</h3>
              <p className="text-fg-soft text-sm mt-1 mb-6">
                Thank you, {form.name.trim()} — <span className="text-fg font-medium">{project?.label}</span> has
                been saved to your device. Our team will be in touch soon.
              </p>
              <button onClick={onClose} className="btn-gold w-full justify-center">
                Close
              </button>
            </>
          ) : (
            /* ── Form ── */
            <>
              <h3 className="font-serif text-fg text-2xl">Download Brochure</h3>
              <p className="text-fg-soft text-sm mt-1 mb-6">
                Fill in your details and the brochure PDF will download to your device.
              </p>

              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Select the Brochure</label>
                  <select value={form.brochure} onChange={set('brochure')} disabled={working} className={inputCls}>
                    {BROCHURE_PROJECTS.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Name</label>
                  <input value={form.name} onChange={set('name')} disabled={working} placeholder="Your full name" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input value={form.city} onChange={set('city')} disabled={working} placeholder="Your city" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    disabled={working}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength={13}
                    className={inputCls}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

              {progress !== null ? (
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-fg-soft mb-2">
                    <span>Preparing your PDF…</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gold-500/15 overflow-hidden">
                    <div className="h-full bg-gold-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-fg-faint text-xs mt-3">
                    Large brochures can take a little while — please keep this window open.
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleDownload}
                  disabled={busy}
                  className="btn-gold w-full justify-center mt-6 disabled:opacity-60"
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  {busy ? 'Submitting…' : 'Download PDF'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
