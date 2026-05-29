import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Tag, Play } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { MEDIA_NEWS, GALLERY } from '../data/site'

export default function Media() {
  const [featured, ...rest] = MEDIA_NEWS

  return (
    <>
      <PageHero
        title="Media & News"
        subtitle="Press releases, awards, events and stories from Ahinsa Group."
        breadcrumb="Media"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop"
      />

      {/* Featured story */}
      <section className="section-pad bg-ink-900">
        <div className="container-x">
          <SectionHeading
            eyebrow="Featured Story"
            title={<>This <span className="gold-text">month&apos;s</span> headline</>}
          />
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 mt-12 items-center">
              <div className="img-zoom aspect-[4/3] lg:aspect-[3/2]">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
                  <span className="text-gold-500 flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    {featured.category}
                  </span>
                  <span className="text-ink-400">&bull;</span>
                  <span className="text-ink-300 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {featured.date}
                  </span>
                </div>
                <h2 className="heading-serif text-cream text-3xl md:text-5xl mt-6">{featured.title}</h2>
                <div className="gold-divider mx-0 mt-6" />
                <p className="text-ink-200 mt-6 leading-relaxed">{featured.excerpt}</p>
                <p className="text-ink-300 mt-4 leading-relaxed text-sm">
                  Stay tuned to this page as we continue to share moments that define our journey.
                </p>
                <button className="btn-gold mt-8">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* News grid */}
      <section className="section-pad bg-ink-800/50 border-y border-gold-500/15">
        <div className="container-x">
          <SectionHeading
            eyebrow="Latest Updates"
            title={<>News & <span className="gold-text">Press</span></>}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
            {rest.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.08}>
                <article className="card-glass group cursor-pointer h-full flex flex-col">
                  <div className="img-zoom aspect-[16/10]">
                    <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                      <span className="text-gold-500">{n.category}</span>
                      <span className="text-ink-400">&bull;</span>
                      <span className="text-ink-300">{n.date}</span>
                    </div>
                    <h3 className="font-serif text-xl text-cream mt-4 group-hover:text-gold-500 transition">
                      {n.title}
                    </h3>
                    <p className="text-ink-300 text-sm mt-3 leading-relaxed line-clamp-3">{n.excerpt}</p>
                    <div className="mt-5 pt-5 border-t border-gold-500/10 inline-flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest">
                      Read More <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video / brand film */}
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
            <p className="eyebrow mt-8 justify-center">Brand Film</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="heading-serif text-cream text-3xl md:text-5xl mt-5">
              Watch the <span className="gold-text">Ahinsa Group</span> story
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad bg-ink-900">
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
      <section className="bg-ink-800 border-t border-gold-500/15">
        <div className="container-x py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-cream text-4xl md:text-5xl">
              Press <span className="gold-text">enquiries</span> & media kits
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-ink-300 mt-6">
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
