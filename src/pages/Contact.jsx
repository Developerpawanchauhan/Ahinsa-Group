import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { COMPANY } from '../data/site'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Residential',
    message: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', phone: '', interest: 'Residential', message: '' })
    }, 3500)
  }

  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="We&apos;d love to hear from you. Schedule a visit, request a brochure or simply say hello."
        breadcrumb="Contact"
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=85&auto=format&fit=crop"
      />

      {/* Contact info cards */}
      <section className="bg-page-alt border-b border-soft">
        <div className="container-x py-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: Phone, title: 'Call Us', lines: [COMPANY.phone, '+91 98765 43210'] },
            { icon: Mail, title: 'Email Us', lines: [COMPANY.email, 'sales@ahinsagroupagra.com'] },
            { icon: MapPin, title: 'Visit Us', lines: [COMPANY.address] },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500 flex-shrink-0">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-fg">{c.title}</h3>
                  <div className="text-fg-soft text-sm mt-2 space-y-1">
                    {c.lines.map((l, j) => (
                      <p key={j}>{l}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + side info */}
      <section className="section-pad bg-page">
        <div className="container-x grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <SectionHeading
              eyebrow="Send a Message"
              title={<>Let&apos;s start a <span className="gold-text">conversation</span></>}
              subtitle="Share a few details and our concierge team will reach out within one business day."
            />

            <Reveal>
              <form onSubmit={handleSubmit} className="mt-10 grid md:grid-cols-2 gap-5">
                <Field name="name" label="Full Name *" value={form.name} onChange={handleChange} required />
                <Field name="email" label="Email Address *" type="email" value={form.email} onChange={handleChange} required />
                <Field name="phone" label="Phone Number *" type="tel" value={form.phone} onChange={handleChange} required />
                <SelectField
                  name="interest"
                  label="I'm Interested In"
                  value={form.interest}
                  onChange={handleChange}
                  options={['Residential', 'Commercial', 'Investment', 'General Enquiry']}
                />
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-[0.2em] text-gold-700 dark:text-gold-500 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about what you&apos;re looking for..."
                    className="w-full bg-white dark:bg-ink-800/60 border border-gold-500/25 dark:border-gold-500/20
                               px-5 py-4 text-fg placeholder:text-fg-faint
                               focus:outline-none focus:border-gold-500 transition resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={submitted} className="btn-gold disabled:opacity-50">
                    {submitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  {submitted && (
                    <p className="text-gold-700 dark:text-gold-500 text-sm mt-4">
                      Thank you! Our team will be in touch shortly.
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>

          {/* Side */}
          <aside className="lg:col-span-2 space-y-6">
            <Reveal>
              <div className="card-glass p-7">
                <h3 className="font-serif text-2xl text-fg">Corporate Office</h3>
                <div className="gold-divider mx-0 my-4" />
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-3 text-fg-muted">
                    <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{COMPANY.address}</span>
                  </li>
                  <li className="flex gap-3 text-fg-muted">
                    <Phone className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                    <a href={`tel:${COMPANY.phone}`} className="hover:text-gold-700 dark:hover:text-gold-500">{COMPANY.phone}</a>
                  </li>
                  <li className="flex gap-3 text-fg-muted">
                    <Mail className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                    <a href={`mailto:${COMPANY.email}`} className="hover:text-gold-700 dark:hover:text-gold-500">{COMPANY.email}</a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="card-glass p-7">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold-700 dark:text-gold-500" />
                  <h3 className="font-serif text-xl text-fg">Office Hours</h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-fg-muted">
                  <li className="flex justify-between border-b border-faint pb-2">
                    <span>Mon &mdash; Fri</span>
                    <span className="text-fg">10:00 &ndash; 19:00</span>
                  </li>
                  <li className="flex justify-between border-b border-faint pb-2">
                    <span>Saturday</span>
                    <span className="text-fg">10:00 &ndash; 17:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gold-700 dark:text-gold-500">By Appointment</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card-glass p-7">
                <h3 className="font-serif text-xl text-fg">Site Visits</h3>
                <p className="text-fg-soft text-sm mt-3 leading-relaxed">
                  Schedule a private tour of any of our project sites. Complimentary pickup available
                  within Agra city limits.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-16">
          <SectionHeading
            eyebrow="Find Us"
            title={<>On the <span className="gold-text">map</span></>}
          />
          <Reveal>
            <div className="mt-10 aspect-[16/9] md:aspect-[21/8] overflow-hidden border border-gold-500/25 dark:border-gold-500/20">
              <iframe
                title="Ahinsa Group Agra location"
                src="https://www.google.com/maps?q=Sanjay+Place,+Agra,+Uttar+Pradesh&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({ name, label, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-gold-700 dark:text-gold-500 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white dark:bg-ink-800/60 border border-gold-500/25 dark:border-gold-500/20
                   px-5 py-4 text-fg placeholder:text-fg-faint
                   focus:outline-none focus:border-gold-500 transition"
      />
    </div>
  )
}

function SelectField({ name, label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-gold-700 dark:text-gold-500 mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white dark:bg-ink-800/60 border border-gold-500/25 dark:border-gold-500/20
                   px-5 py-4 text-fg
                   focus:outline-none focus:border-gold-500 transition appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-white dark:bg-ink-800">{o}</option>
        ))}
      </select>
    </div>
  )
}
