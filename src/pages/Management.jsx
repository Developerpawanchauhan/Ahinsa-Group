import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Quote, CheckCircle2, Mail } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { MANAGEMENT } from '../data/site'

export default function Management() {
  const ownerEmails = ['rohitjain@ahinsagroup.in', 'rachitjain@ahinsagroup.in', 'jitendra.yadav@ahinsagroup.in'];
  const { hash } = useLocation()

  // Deep-link support: /about/management#<slug> scrolls to that member's
  // profile (used by the About Us page cards).
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [hash])

  return (
    <>
      <div className="management-page-hero">
        <style>{`
          /* Frame the crop on the face band of the group photo (faces sit in the
             upper-middle of the image; 'bottom' cropped the heads off). */
          .management-page-hero .hero-img {
            object-position: 50% 35% !important;
          }
        `}</style>
        <PageHero
          title="Management"
          subtitle="The leadership shaping the vision and direction of Ahinsa Group."
          breadcrumb="About / Management"
          image="/images/about/hero-about.jpg"
        />
      </div>

      <section className="section-pad bg-page">
        <div className="container-x text-center max-w-3xl mx-auto">
          <SectionHeading
            center
            eyebrow="Board & Senior Leadership"
            title={<>Visionaries <span className="gold-text">at the helm</span></>}
            subtitle="Decades of combined experience, united by an obsession with quality, integrity and the long view."
          />
        </div>
      </section>

      <section className="bg-page-soft border-y border-soft py-12 md:py-20">
        <div className="container-x space-y-20 md:space-y-28">
          {MANAGEMENT.map((m, i) => (
            <Reveal key={m.name} delay={(i % 2) * 0.05}>
              <div
                id={m.slug}
                className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-center scroll-mt-24 md:scroll-mt-36 ${
                  i % 2 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="lg:col-span-5">
                  <div className="img-zoom aspect-[4/5] overflow-hidden">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <p className="eyebrow">{m.role}</p>
                  <h2 className="heading-serif text-fg text-3xl md:text-5xl mt-5">{m.name}</h2>
                  <div className="gold-divider mx-0 my-6" />
                  <Quote className="w-8 h-8 text-gold-500/70" />
                  <p className="font-serif italic text-fg text-xl md:text-2xl leading-snug mt-3">
                    {m.short}
                  </p>
                  {ownerEmails[i] && (
                    <a href={`mailto:${ownerEmails[i]}`} className="inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-sm mt-4 hover:underline">
                      <Mail className="w-4 h-4" />
                      {ownerEmails[i]}
                    </a>
                  )}
                  <div className="text-fg-muted leading-relaxed mt-7 space-y-4">
                    {m.bio.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                  {m.achievements?.length > 0 && (
                    <ul className="grid sm:grid-cols-2 gap-3 mt-8 pt-8 border-t border-soft">
                      {m.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-3 text-fg-muted text-sm">
                          <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad bg-page">
        <div className="container-x text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-fg text-3xl md:text-5xl">
              Meet the <span className="gold-text">team</span> that brings every project to life
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fg-soft mt-6">
              Beyond the boardroom, a passionate operating team turns vision into delivered reality.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/about/team" className="btn-gold">
                Meet Our Team <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-outline-gold">Get in Touch</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
