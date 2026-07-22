import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, MapPin, Building2, Calendar, Ruler, Layers,
  ShieldCheck, Award, Compass, Trees, Waves, Dumbbell, Users, Baby, Trophy,
  Activity, Zap, Car, Camera, Droplet, Sparkles, Sun, Layout, Wifi, Coffee,
  Utensils, Store, Film, Music, HeartHandshake, Clock, Eye, Target, Leaf,
  Send, CheckCircle2, Phone, Mail, ChevronRight,
} from 'lucide-react'

import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import BrochureGallery from '../components/BrochureGallery'
import AutoSlideImage from '../components/AutoSlideImage'
import HeroVideo from '../components/HeroVideo'
import { PROJECT_DETAILS, PROJECTS, COMPANY, WEB3FORMS_KEY } from '../data/site'

const ICON_MAP = {
  ArrowRight, MapPin, Building2, Calendar, Ruler, Layers, ShieldCheck, Award,
  Compass, Trees, Waves, Dumbbell, Users, Baby, Trophy, Activity, Zap, Car,
  Camera, Droplet, Sparkles, Sun, Layout, Wifi, Coffee, Utensils, Store, Film,
  Music, HeartHandshake, Clock, Eye, Target, Leaf,
}

function Icon({ name, className = 'w-5 h-5' }) {
  const C = ICON_MAP[name] || Sparkles
  return <C className={className} />
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = PROJECT_DETAILS[slug]

  // Map project slug → brochure tab id
  // Only slugs that actually have a matching brochure appear here — each
  // project page shows its own brochure only (no orchid brochure exists).
  const SLUG_TO_BROCHURE = {
    'grand-green-valley':     'grand',
    'green-valley-empire':    'empire',
    'green-valley-township':  'township',
    'ahinsa-mall-firozabad':  'firozabad',
  }
  const brochureId = SLUG_TO_BROCHURE[slug]

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  // related projects (everything except current)
  const related = PROJECTS.filter((p) => p.slug !== slug).slice(0, 3)

  // Overview image auto-slide: this project's own overview + gallery shots,
  // deduplicated, so it only ever cycles through images of THIS project.
  const overviewImages = [project.overviewImage, ...(project.gallery || [])].filter(
    (src, i, arr) => src && arr.indexOf(src) === i
  )

  return (
    <>
      {/* HERO (always dark cinematic) */}
      <section className="relative h-[80vh] min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-ink-900">
          {project.videoEmbed ? (
            <HeroVideo
              videoId={project.videoEmbed.split('/').pop()}
              poster={project.hero}
              alt={project.name}
            />
          ) : (
            <img src={project.hero} alt={project.name} className="w-full h-full object-cover opacity-60 hero-img" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/40 to-ink-900" />
        </div>
        <div className="container-x relative pb-20 md:pb-28">
          <Reveal>
            <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-400 mb-6">
              <Link to="/" className="hover:text-gold-300 transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/projects" className="hover:text-gold-300 transition">Our Projects</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-cream/70">{project.name}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-gold-500 text-ink-900 px-4 py-1.5 text-[10px] uppercase tracking-widest font-medium">
                {project.status}
              </span>
              <span className="text-gold-400 uppercase tracking-[0.3em] text-xs">{project.type}</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="heading-serif text-cream text-4xl md:text-6xl lg:text-7xl max-w-5xl">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif italic text-gold-300 text-xl md:text-2xl mt-5 max-w-3xl">
              {project.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-cream/90 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" />
                {project.location}
              </span>
              <span className="hidden md:inline text-cream/30">|</span>
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gold-500" />
                {project.configurations}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="gold-divider mx-0 mt-8" />
          </Reveal>
        </div>
      </section>

      {/* QUICK FACTS STRIP */}
      <section className="bg-page-alt border-y border-soft">
        <div className="container-x py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Fact icon={Building2} label="Type" value={project.type} />
          <Fact icon={Layers} label="Configuration" value={project.configurations} />
          <Fact icon={Ruler} label="Unit Area" value={project.unitArea} />
          <Fact icon={Calendar} label="Possession" value={project.possession} />
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section-pad bg-page">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="img-zoom aspect-[4/5] overflow-hidden">
                <AutoSlideImage images={overviewImages} alt={project.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-6 -left-6 hidden md:flex flex-col items-center justify-center w-28 h-28 bg-gold-500 text-ink-900">
                <span className="font-serif text-2xl font-bold leading-none">{project.status}</span>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Project Overview"
              title={<>About <span className="gold-text">{project.name}</span></>}
            />
            <Reveal delay={0.2}>
              <div className="text-fg-muted leading-relaxed mt-7 space-y-5">
                {project.overview.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-soft">
                <KV label="Address" value={project.fullAddress} />
                <KV label="REG" value={project.rera?.number || 'On Request'} />
              </div>
            </Reveal>
          </div>
        </div>

        {project.overviewVideo && (
          <div className="container-x mt-16">
            <Reveal>
              <div className="relative aspect-video overflow-hidden border border-soft">
                <iframe
                  title={`${project.name} overview video`}
                  src={project.overviewVideo}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        )}
      </section>

      {/* HIGHLIGHTS */}
      <section className="section-pad bg-page-soft">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="Project Highlights"
              title={<>What makes it <span className="gold-text">special</span></>}
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <div className="card-glass p-7 h-full">
                  <div className="w-14 h-14 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500">
                    <Icon name={h.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl text-fg mt-5">{h.title}</h3>
                  <p className="text-fg-soft text-sm leading-relaxed mt-3">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="World-Class Amenities"
              title={<>Lifestyle, <span className="gold-text">delivered</span></>}
              subtitle="Every detail designed to elevate everyday living."
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {project.amenities.map((a, i) => (
              <Reveal key={a.name + i} delay={(i % 6) * 0.05}>
                <div className="flex flex-col items-center justify-center text-center p-5 border border-soft hover:border-gold-500/60 hover:bg-gold-500/5 transition-all duration-300 group h-full">
                  <div className="w-12 h-12 flex items-center justify-center text-gold-700 dark:text-gold-500 group-hover:scale-110 transition">
                    <Icon name={a.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-fg text-xs md:text-sm mt-3 leading-tight">{a.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLOOR PLANS / CONFIGURATIONS */}
      {project.floorPlans?.length > 0 && (
        <section className="section-pad bg-page-alt border-y border-soft">
          <div className="container-x">
            <SectionHeading
              eyebrow="Configurations"
              title={<>Plans & <span className="gold-text">layouts</span></>}
              subtitle="Thoughtfully designed configurations to suit different family needs and budgets."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
              {project.floorPlans.map((f, i) => (
                <Reveal key={f.config} delay={i * 0.08}>
                  <div className="card-glass overflow-hidden group">
                    <div className="img-zoom aspect-[4/3] bg-ink-800/40">
                      <img src={f.image} alt={f.config} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl text-fg">{f.config}</h3>
                      <p className="text-gold-700 dark:text-gold-500 text-xs uppercase tracking-[0.2em] mt-2">{f.area}</p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest mt-5"
                      >
                        Request Plan <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {project.gallery?.length > 0 && (
        <section className="section-pad bg-page-soft border-y border-soft">
          <div className="container-x">
            <SectionHeading
              eyebrow="Gallery"
              title={<>A <span className="gold-text">closer look</span></>}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-12">
              {project.gallery.map((src, i) => (
                <Reveal key={src + i} delay={(i % 3) * 0.08}>
                  <div className={`img-zoom overflow-hidden ${i === 0 || i === 5 ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'}`}>
                    <img src={src} alt={`${project.name} gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BROCHURE GALLERY — only this project's own brochure */}
      {brochureId && <BrochureGallery defaultId={brochureId} single />}

      {/* LOCATION ADVANTAGES */}
      <section className="section-pad bg-page">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              eyebrow="Location Advantage"
              title={<>Connected to <span className="gold-text">everything that matters</span></>}
              subtitle="Strategic location that puts education, healthcare, retail and transit within easy reach."
            />
            <Reveal delay={0.2}>
              <div className="mt-10 aspect-[4/3] overflow-hidden border border-soft">
                <iframe
                  title={`${project.name} location`}
                  src={project.mapEmbed || `https://www.google.com/maps?q=${encodeURIComponent(project.location + ', India')}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="card-glass p-8">
              <h3 className="font-serif text-2xl text-fg">Key Distances</h3>
              <div className="gold-divider mx-0 my-5" />
              <ul className="divide-y divide-gold-500/15">
                {project.locationAdvantages.map((l, i) => (
                  <li key={i} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-fg text-sm font-medium">{l.place}</div>
                        <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.2em] mt-0.5">{l.type}</div>
                      </div>
                    </div>
                    <div className="text-fg-soft text-sm font-medium whitespace-nowrap">{l.distance}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RERA DISCLOSURE */}
      <section className="bg-page-alt border-y border-soft">
        <div className="container-x py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gold-700 dark:text-gold-500 uppercase tracking-[0.25em] text-xs">Approval Disclosure</p>
              <p className="text-fg text-sm mt-1">{project.rera?.number || 'RERA registration details available on request.'}</p>
              <p className="text-fg-soft text-xs mt-2 max-w-3xl">
                Visuals, configurations and amenities indicated on this page are for representational purposes.
                Final details may vary as per the approved plans and on-site delivery.
              </p>
            </div>
          </div>
          {project.rera?.link && project.rera.link !== '#' && (
            <a href={project.rera.link} target="_blank" rel="noreferrer" className="btn-outline-gold whitespace-nowrap">
              View on RERA <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <EnquirySection projectName={project.name} />

      {/* RELATED PROJECTS */}
      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Explore More"
              title={<>Other <span className="gold-text">signature</span> projects</>}
            />
            <Link to="/projects" className="btn-outline-gold self-start lg:self-end whitespace-nowrap">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <Link to={`/projects/${r.slug}`} className="block card-glass overflow-hidden group h-full">
                  <div className="img-zoom aspect-[4/3] relative">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-gold-500 text-ink-900 px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                      {r.status}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.2em]">{r.type}</div>
                    <h3 className="font-serif text-xl text-fg mt-2 group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
                      {r.name}
                    </h3>
                    <div className="flex items-center gap-2 text-fg-soft text-xs mt-2">
                      <MapPin className="w-3 h-3 text-gold-500" />
                      {r.location}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-sm uppercase tracking-[0.2em] hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to all projects
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Fact({ icon: I, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500 flex-shrink-0">
        <I className="w-4 h-4" />
      </div>
      <div>
        <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.25em]">{label}</div>
        <div className="text-fg text-sm mt-1">{value}</div>
      </div>
    </div>
  )
}

function KV({ label, value }) {
  return (
    <div>
      <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.25em]">{label}</div>
      <div className="text-fg text-sm mt-1">{value}</div>
    </div>
  )
}

function EnquirySection({ projectName }) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          // IMPORTANT: Replace with your own access key from web3forms.com
          access_key: WEB3FORMS_KEY,
          subject: `New Enquiry for: ${projectName}`,
          from_name: 'Ahinsa Group Website (Project Page)',
          replyto: form.email,
          ...form,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // You can add user-facing error handling here if you want
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-ink-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,162,39,0.12),transparent_60%)]" />
      <div className="container-x py-20 md:py-28 relative grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <Reveal>
            <span className="eyebrow !text-gold-400">Interested in {projectName}?</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-serif text-cream text-4xl md:text-5xl mt-5">
              Let&apos;s schedule your <span className="gold-text">private visit</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink-300 mt-6 leading-relaxed max-w-lg">
              Share a few details and our concierge team will reach out within one business day with
              floor plans, pricing and a personalised site-visit slot.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 space-y-3">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-cream hover:text-gold-400 transition">
                <Phone className="w-4 h-4 text-gold-500" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-cream hover:text-gold-400 transition">
                <Mail className="w-4 h-4 text-gold-500" />
                {COMPANY.email}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="bg-ink-800/60 border border-gold-500/15 p-7 backdrop-blur-sm space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">Full Name *</label>
              <input
                required name="name" value={form.name} onChange={handleChange}
                className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">Email *</label>
                <input
                  required type="email" name="email" value={form.email} onChange={handleChange}
                  className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">Phone *</label>
                <input
                  required type="tel" name="phone" value={form.phone} onChange={handleChange}
                  className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">Message</label>
              <textarea
                rows={4} name="message" value={form.message} onChange={handleChange}
                placeholder={`I'm interested in ${projectName}...`}
                className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition resize-none"
              />
            </div>
            <button type="submit" disabled={isSubmitting || submitted} className="btn-gold w-full justify-center disabled:opacity-50">
              {isSubmitting ? (
                'Sending...'
              ) : submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Enquiry Received
                </>
              ) : (
                <>
                  Send Enquiry
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
            {submitted && <p className="text-gold-400 text-sm text-center">Thank you! Our team will be in touch shortly.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
