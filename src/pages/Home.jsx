import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Award,
  Clock,
  HeartHandshake,
  Quote,
  Star,
  MapPin,
  Building2,
  Trophy,
} from 'lucide-react'

import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import BrochureGallery from '../components/BrochureGallery'
import CountUp from '../components/CountUp'
import { HERO_SLIDES, STATS, PROJECTS, FEATURES, TESTIMONIALS, AWARDS, COMPANY, PROPERTY_LISTINGS } from '../data/site'

const ICON_MAP = { Compass, Award, Clock, HeartHandshake }

// Live availability per category, summed from the Properties-page data
// (coming-soon projects excluded) — stays in sync automatically.
function availableOf(...types) {
  return PROPERTY_LISTINGS.filter((l) => !l.comingSoon)
    .flatMap((l) => l.types)
    .filter((t) => types.includes(t.type))
    .reduce((n, t) => n + t.available, 0)
}

const PROPERTY_CATEGORIES = [
  {
    label: 'Shops',
    image: '/images/projects/grand-green-valley/mall.jpeg',
    count: availableOf('Shops'),
    text: 'High-street retail spaces in thriving township markets.',
  },
  {
    label: 'Plots',
    image: '/images/projects/green-valley-empire/site-05.jpg',
    count: availableOf('Residential Plots', 'Commercial Plots'),
    text: 'Vaastu-friendly residential & commercial plots, ready for registry.',
  },
  {
    label: 'Villas',
    image: '/images/projects/green-valley-empire/rich-villa.jpg',
    count: availableOf('Villas'),
    text: 'Signature villas crafted for spacious, resort-style living.',
  },
]

// "Rajesh Bansal" → "RB", "Col. R. K. Chauhan (Retd.)" → "RC"
function initials(name) {
  return name
    .replace(/\b(Dr|CA|Col|Retd|Er|Adv)\.?/gi, '')
    .replace(/[()]/g, '')
    .trim()
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .join('')
}

// Long reviews are clamped to 4 lines with a Read more toggle so every card
// stays compact; slides stretch to equal height (see !h-auto on SwiperSlide).
function TestimonialCard({ t }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = t.quote.length > 250

  return (
    <div className="card-glass p-8 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Quote className="w-8 h-8 text-gold-500/70" />
          <div className="flex gap-1">
            {Array.from({ length: t.rating || 5 }).map((_, s) => (
              <Star key={s} className="w-4 h-4 text-gold-500 fill-gold-500" />
            ))}
          </div>
        </div>
        <p
          className={`text-fg-muted leading-relaxed mt-5 text-sm md:text-base whitespace-pre-line ${
            isLong && !expanded ? 'line-clamp-4' : ''
          }`}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 text-xs uppercase tracking-widest text-gold-700 dark:text-gold-500 hover:opacity-70 transition"
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
      <div className="flex items-center gap-4 mt-7 pt-6 border-t border-soft">
        {t.image ? (
          <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 shrink-0 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center font-serif text-gold-700 dark:text-gold-400">
            {initials(t.name)}
          </div>
        )}
        <div>
          <div className="text-fg font-medium">{t.name}</div>
          <div className="text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest mt-1">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* HERO SLIDER (always dark for cinematic feel) */}
      <section className="relative h-screen min-h-[640px]">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect="fade"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-full"
        >
          {HERO_SLIDES.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover hero-img"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/55 to-ink-900/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-transparent to-ink-900/70" />
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full pl-6 md:pl-12 lg:pl-16">
                    <div className="max-w-3xl">
                      <span className="eyebrow !text-gold-400">{slide.eyebrow}</span>
                      <h1 className="heading-serif text-cream text-5xl md:text-7xl lg:text-8xl mt-6 whitespace-pre-line">
                        {slide.title}
                      </h1>
                      <p className="text-ink-200 mt-7 text-lg md:text-xl max-w-xl leading-relaxed">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-10">
                        <Link to="/projects" className="btn-gold">
                          Explore Projects <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold-500 text-gold-500
                                     font-medium tracking-wide uppercase text-sm transition-all duration-300
                                     hover:bg-gold-500 hover:text-ink-900"
                        >
                          Get In Touch
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-3 text-cream/80 text-xs uppercase tracking-[0.3em]">
          <span className="rotate-90 origin-center">Scroll</span>
          <span className="w-px h-16 bg-gradient-to-b from-gold-500 to-transparent" />
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="relative -mt-1 bg-page border-y border-soft">
        <div className="container-x py-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <Reveal>
              <p className="eyebrow">Welcome to Ahinsa Group</p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-2">
              <p className="font-serif text-fg text-2xl md:text-3xl leading-snug">
                Two decades of craftsmanship, &mdash;
                <span className="gold-text"> redefining how Agra lives, works and grows.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-pad bg-page relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal y={40}>
            <div className="relative">
              <div className="img-zoom aspect-[4/5] overflow-hidden">
                <img
                  src="/images/home/about/Office.jpg"
                  alt="Ahinsa Group office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 hidden md:block">
                <div className="img-zoom aspect-square overflow-hidden border-8 border-cream dark:border-ink-900">
                  <img
                    src="/images/home/about/AhinsaComplex.jpg"
                    alt="Ahinsa Complex"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-6 -left-6 hidden md:flex flex-col items-center justify-center w-32 h-32 bg-gold-500 text-ink-900">
                <span className="font-serif text-4xl font-bold">4+</span>
                <span className="text-[10px] uppercase tracking-widest mt-1">Years</span>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="About Ahinsa Group"
              title={<>A legacy crafted with <span className="gold-text">passion & precision</span></>}
              subtitle={COMPANY.description}
            />
            <Reveal delay={0.2}>
              <ul className="grid grid-cols-2 gap-6 mt-10">
                {[
                  'Certified Projects',
                  'Award Winning Designs',
                  'Sustainable Construction',
                  'Trusted by 5,000+ Families',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-fg-muted">
                    <span className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <Link to="/about" className="btn-gold mt-10">
                Discover Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-20 bg-page-alt border-y border-soft">
        <div
          className="absolute inset-0 opacity-10 dark:opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container-x relative grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center border-l border-gold-500/30 pl-6">
                <div className="font-serif text-5xl md:text-6xl gold-text">
                  <CountUp value={s.value} />
                </div>
                <div className="text-fg-muted mt-3 text-sm uppercase tracking-[0.2em]">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Our Portfolio"
              title={<>Iconic projects that <span className="gold-text">define skylines</span></>}
              subtitle="A curated selection of our finest residential and commercial landmarks across Agra."
            />
            <Link to="/projects" className="btn-outline-gold self-start lg:self-end whitespace-nowrap">
              View All Projects <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABLE PROPERTIES — quick category cards linking to /properties */}
      <section className="section-pad bg-page-alt border-t border-soft">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="Own With Ahinsa"
              title={<>Properties <span className="gold-text">available today</span></>}
              subtitle="Shops, plots and villas across our townships — see live availability and book a site visit."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {PROPERTY_CATEGORIES.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.1}>
                <div className="card-glass group overflow-hidden h-full flex flex-col">
                  <div className="img-zoom aspect-[4/3] relative">
                    <img src={c.image} alt={c.label} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-gold-500 text-ink-900 px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                      {c.count} Available
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent" />
                    <h3 className="absolute bottom-4 left-5 font-serif text-3xl text-cream">{c.label}</h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-fg-soft text-sm leading-relaxed flex-1">{c.text}</p>
                    <Link to="/properties" className="btn-outline-gold justify-center mt-6 w-full">
                      Check Availability <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad bg-page-soft relative">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container-x relative">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="The Ahinsa Promise"
              title={<>Why discerning families <span className="gold-text">choose us</span></>}
              subtitle="Our principles are non-negotiable. They define every project we craft and every relationship we build."
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = ICON_MAP[f.icon] || Compass
              return (
                <Reveal key={f.title} delay={i * 0.1}>
                  <div className="card-glass p-8 h-full">
                    <div className="w-14 h-14 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl text-fg mt-6">{f.title}</h3>
                    <p className="text-fg-soft text-sm leading-relaxed mt-3">{f.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* AWARDS SECTION */}
      <section className="section-pad bg-page border-t border-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,162,39,0.08),transparent_60%)] pointer-events-none" />
        <div className="container-x relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Awards & Recognition"
              title={<>Recognized for the <span className="gold-text">work we love</span></>}
              subtitle="A glimpse of the honours that mark our two decades of crafting iconic landmarks."
            />
            <Link to="/media/awards" className="btn-outline-gold self-start lg:self-end whitespace-nowrap">
              View All Awards <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...AWARDS]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3)
              .map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <article className="card-glass overflow-hidden group h-full flex flex-col">
                  <div className="img-zoom aspect-[16/10]">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500 flex-shrink-0">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.25em]">
                          {a.category} &middot; {a.year}
                        </p>
                        <h3 className="font-serif text-lg text-fg mt-1 leading-tight group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
                          {a.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-fg-soft text-xs uppercase tracking-[0.2em] mt-4">
                      {a.awardedBy}
                    </p>
                    <p className="text-fg-soft text-sm mt-3 leading-relaxed line-clamp-3 flex-1">
                      {a.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Award strip / count badge */}
          <Reveal delay={0.3}>
            <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 p-7 border border-soft bg-page-soft">
              <div className="flex items-center gap-4">
                <Award className="w-10 h-10 text-gold-700 dark:text-gold-500" />
                <div>
                  <p className="text-gold-700 dark:text-gold-500 uppercase tracking-[0.3em] text-[10px]">
                    Industry Recognition
                  </p>
                  <p className="font-serif text-fg text-2xl mt-1">
                    {AWARDS.length}+ awards across two decades of work
                  </p>
                </div>
              </div>
              <Link to="/media/awards" className="btn-gold whitespace-nowrap">
                Explore Honours <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARALLAX QUOTE (always dark) */}
      <section
        className="relative py-32 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,11,8,0.85), rgba(11,11,8,0.85)), url('/images/home/backgrounds/parallax-quote.jpg')",
        }}
      >
        <div className="container-x text-center max-w-4xl">
          <Reveal>
            <Quote className="w-12 h-12 text-gold-500 mx-auto" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif text-cream text-3xl md:text-5xl leading-snug mt-8">
              We don&apos;t just build buildings. We build the <span className="gold-text">stories</span> that
              families and businesses will live for generations.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="gold-divider" />
            <p className="text-gold-500 uppercase tracking-[0.3em] text-sm">Ahinsa Group Philosophy</p>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="Voices of Trust"
              title={<>Stories from our <span className="gold-text">community</span></>}
              subtitle="Hear from the families and businesses who call an Ahinsa address home."
            />
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <TestimonialCard t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* BROCHURE GALLERY */}
      <BrochureGallery />

      {/* CTA STRIP (always dark for drama) */}
      <section className="bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,162,39,0.12),transparent_60%)]" />
        <div className="container-x py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2">
              <Reveal>
                <span className="eyebrow !text-gold-400">Begin Your Journey</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="heading-serif text-cream text-4xl md:text-6xl mt-5">
                  Ready to find your <span className="gold-text">forever address</span>?
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-ink-300 mt-6 max-w-2xl">
                  Speak with our concierge team to schedule a private site visit, request a brochure or
                  explore investment opportunities across our portfolio.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.3} className="flex flex-col gap-4 lg:items-end">
              <Link to="/contact" className="btn-gold w-full lg:w-auto justify-center">
                Schedule a Visit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold-500 text-gold-500
                           font-medium tracking-wide uppercase text-sm transition-all duration-300
                           hover:bg-gold-500 hover:text-ink-900 w-full lg:w-auto justify-center"
              >
                Browse Projects
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="block card-glass group overflow-hidden">
      <div className="img-zoom aspect-[4/3] relative">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-gold-500 text-ink-900 px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
          {project.status}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gold-700 dark:text-gold-500 uppercase tracking-[0.2em]">
          <Building2 className="w-3.5 h-3.5" />
          {project.type}
        </div>
        <h3 className="font-serif text-2xl text-fg mt-3 group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
          {project.name}
        </h3>
        <div className="flex items-center gap-2 text-fg-soft text-sm mt-2">
          <MapPin className="w-3.5 h-3.5 text-gold-500" />
          {project.location}
        </div>
        <p className="text-fg-soft text-sm mt-4 leading-relaxed line-clamp-2">{project.short}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest">
          Discover <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  )
}
