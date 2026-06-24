import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { GALLERY } from '../data/site'

export default function Media() {

  return (
    <>
      <PageHero
        title="Media & News"
        subtitle="Press releases, awards, events and stories from Ahinsa Group."
        breadcrumb="Media"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop"
      />

      {/* Video / brand film (always dark for cinematic feel) */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1448630360428-65456885c650?w=1920&q=85&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/70" />
        <div className="relative text-center container-x">
          <Reveal>
            <button className="w-20 h-20 rounded-full bg-gold-500 text-ink-900 flex items-center justify-center mx-auto hover:scale-110 transition shadow-[0_20px_60px_-15px_rgba(201,162,39,0.6)]">
              <Play className="w-7 h-7 ml-1" fill="currentColor" />
            </button>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow !text-gold-400 mt-8 justify-center">Brand Film</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="heading-serif text-cream text-3xl md:text-5xl mt-5">
              Watch the <span className="gold-text">Ahinsa Group</span> story
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad bg-page">
        <div className="container-x">
          <SectionHeading
            eyebrow="In Pictures"
            title={<>Gallery <span className="gold-text">highlights</span></>}
            subtitle="Moments from our project sites, launch events and customer interactions."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-12">
            {GALLERY.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 0.05}>
                <div className={`img-zoom overflow-hidden ${i % 5 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                  <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-fg text-4xl md:text-5xl">
              Press <span className="gold-text">enquiries</span> & media kits
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fg-soft mt-6">
              For interviews, press materials or partnership opportunities, please get in touch with our communications team.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/contact" className="btn-gold mt-8">
              Contact Press Team <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
