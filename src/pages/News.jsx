import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { MEDIA_NEWS } from '../data/site'

export default function News() {
  const [featured, ...rest] = MEDIA_NEWS

  return (
    <>
      <PageHero
        title="News & Press"
        subtitle="Press releases, media coverage and announcements from Ahinsa Group."
        breadcrumb="Media / News"
        image="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1920&q=85&auto=format&fit=crop"
      />

      <section className="section-pad bg-page">
        <div className="container-x">
          <SectionHeading
            eyebrow="Top Story"
            title={<>This <span className="gold-text">month&apos;s</span> headline</>}
          />
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 mt-12 items-center">
              <div className="img-zoom aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
                  <span className="text-gold-700 dark:text-gold-500 flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    {featured.category}
                  </span>
                  <span className="text-fg-faint">&bull;</span>
                  <span className="text-fg-soft flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {featured.date}
                  </span>
                </div>
                <h2 className="heading-serif text-fg text-3xl md:text-5xl mt-6">{featured.title}</h2>
                <div className="gold-divider mx-0 my-6" />
                <p className="text-fg-muted leading-relaxed">{featured.excerpt}</p>
                <button className="btn-gold mt-8">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-page-soft border-y border-soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="Latest Updates"
            title={<>News & <span className="gold-text">press</span></>}
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
                      <span className="text-gold-700 dark:text-gold-500">{n.category}</span>
                      <span className="text-fg-faint">&bull;</span>
                      <span className="text-fg-soft">{n.date}</span>
                    </div>
                    <h3 className="font-serif text-xl text-fg mt-4 leading-tight group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
                      {n.title}
                    </h3>
                    <p className="text-fg-soft text-sm mt-3 leading-relaxed line-clamp-3 flex-1">{n.excerpt}</p>
                    <div className="mt-5 pt-5 border-t border-faint inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest">
                      Read More <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page border-t border-soft">
        <div className="container-x py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-serif text-fg text-3xl md:text-5xl">
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
