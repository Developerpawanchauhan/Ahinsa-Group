import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Target, Sparkles, Leaf } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { COMPANY, STATS, LEADERSHIP, MILESTONES } from '../data/site'

export default function About() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Two decades of crafting iconic landmarks in the Taj City."
        breadcrumb="About Us"
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85&auto=format&fit=crop"
      />

      {/* INTRO */}
      <section className="section-pad bg-page">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="img-zoom aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format&fit=crop"
                alt="Ahinsa Group headquarters"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title={<>Built on <span className="gold-text">trust</span>, designed for <span className="gold-text">generations</span></>}
            />
            <Reveal delay={0.2}>
              <div className="text-fg-muted leading-relaxed mt-7 space-y-5">
                <p>
                  Founded in {COMPANY.founded}, Ahinsa Group began with a simple belief &mdash; that homes
                  and workspaces shape lives. Over two decades, that belief has translated into more than
                  thirty-five iconic projects across Agra and beyond.
                </p>
                <p>
                  Today, we are recognized for our architectural integrity, uncompromising quality and the
                  trust we have earned from twelve thousand families and businesses. Every Ahinsa address
                  carries the same promise: timeless design, honest craftsmanship and lasting value.
                </p>
                <p>
                  As we look ahead, our commitment is to expand thoughtfully, build sustainably and continue
                  raising the bar for what real estate in Agra can be.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-page-alt border-y border-soft py-16">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-serif text-5xl md:text-6xl gold-text">{s.value}</div>
                <div className="text-fg-muted mt-3 text-sm uppercase tracking-[0.2em]">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="Our Direction"
              title={<>Vision & <span className="gold-text">Mission</span></>}
              subtitle="The principles that guide every brick we lay and every relationship we build."
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-7">
            <Reveal>
              <div className="card-glass p-10 h-full relative overflow-hidden">
                <Eye className="w-12 h-12 text-gold-700 dark:text-gold-500" />
                <h3 className="heading-serif text-3xl text-fg mt-6">Our Vision</h3>
                <div className="gold-divider mx-0 my-5" />
                <p className="text-fg-muted leading-relaxed">
                  To be the most trusted real estate brand in North India by creating spaces that elevate
                  lifestyles, empower businesses and stand as enduring symbols of design excellence.
                </p>
                <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-gold-500/5 blur-2xl" />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="card-glass p-10 h-full relative overflow-hidden">
                <Target className="w-12 h-12 text-gold-700 dark:text-gold-500" />
                <h3 className="heading-serif text-3xl text-fg mt-6">Our Mission</h3>
                <div className="gold-divider mx-0 my-5" />
                <p className="text-fg-muted leading-relaxed">
                  To deliver thoughtfully designed, sustainably built and meticulously executed real estate
                  &mdash; where every project enhances the lives of those who live, work or invest in it.
                </p>
                <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-gold-500/5 blur-2xl" />
              </div>
            </Reveal>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {[
              { icon: Sparkles, title: 'Excellence', text: 'Pursuit of the highest standards in everything we deliver.' },
              { icon: Leaf, title: 'Sustainability', text: 'Construction that respects the planet and future generations.' },
              { icon: Target, title: 'Integrity', text: 'Transparent dealings and promises that we always keep.' },
              { icon: Eye, title: 'Innovation', text: 'Embracing new ideas, materials and architectural thinking.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="border-t-2 border-gold-500/40 pt-6">
                  <v.icon className="w-7 h-7 text-gold-700 dark:text-gold-500" />
                  <h4 className="font-serif text-xl text-fg mt-4">{v.title}</h4>
                  <p className="text-fg-soft text-sm mt-2 leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section-pad bg-page-soft">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="The Leadership"
              title={<>Visionaries <span className="gold-text">behind Ahinsa</span></>}
              subtitle="Experienced leaders united by a shared commitment to craftsmanship and customer trust."
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {LEADERSHIP.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="group">
                  <div className="img-zoom aspect-[4/5] overflow-hidden">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                  </div>
                  <div className="pt-5">
                    <h3 className="font-serif text-xl text-fg">{m.name}</h3>
                    <p className="text-gold-700 dark:text-gold-500 text-xs uppercase tracking-[0.2em] mt-1">{m.role}</p>
                    <p className="text-fg-soft text-sm leading-relaxed mt-3">{m.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="section-pad bg-page relative overflow-hidden">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="Our Journey"
              title={<>Milestones across <span className="gold-text">two decades</span></>}
              subtitle="A timeline of moments that have shaped who we are today."
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
            <div className="space-y-12">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.05}>
                  <div className={`flex items-start gap-6 md:gap-12 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="hidden md:block flex-1" />
                    <div className="absolute md:relative left-0 md:left-auto -translate-x-1/2 md:translate-x-0 md:flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center text-ink-900 font-serif font-bold text-xs ring-4 ring-cream dark:ring-ink-900">
                        <span>{i + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 pl-12 md:pl-0">
                      <div className="card-glass p-7">
                        <div className="font-serif text-3xl gold-text">{m.year}</div>
                        <h3 className="text-fg font-medium text-lg mt-2">{m.title}</h3>
                        <p className="text-fg-soft text-sm mt-3 leading-relaxed">{m.text}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-fg text-4xl md:text-5xl">
              Build your <span className="gold-text">next chapter</span> with us
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/projects" className="btn-gold">
                Explore Our Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-outline-gold">Talk to Our Team</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
