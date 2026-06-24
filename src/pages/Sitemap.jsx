import { Link } from 'react-router-dom'
import { Home, Info, Building2, Newspaper, Phone, FileText, Map, ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { PROJECTS } from '../data/site'

const SECTIONS = [
  {
    title: 'Main Pages',
    icon: Home,
    links: [{ to: '/', label: 'Home' }],
  },
  {
    title: 'About Us',
    icon: Info,
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/about/management', label: 'Management' },
      { to: '/about/team', label: 'Team' },
    ],
  },
  {
    title: 'Our Projects',
    icon: Building2,
    links: [
      { to: '/projects', label: 'All Projects' },
      ...PROJECTS.map((p) => ({ to: `/projects/${p.slug}`, label: p.name, meta: p.location })),
    ],
  },
  {
    title: 'Media',
    icon: Newspaper,
    links: [
      { to: '/media', label: 'Media Centre' },
      { to: '/media/awards', label: 'Awards & Recognition' },
      { to: '/media/events', label: 'Events' },
    ],
  },
  {
    title: 'Contact',
    icon: Phone,
    links: [{ to: '/contact', label: 'Contact Us' }],
  },
  {
    title: 'Legal',
    icon: FileText,
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms & Conditions' },
      { to: '/sitemap', label: 'Sitemap' },
    ],
  },
]

export default function Sitemap() {
  const totalPages = SECTIONS.reduce((sum, s) => sum + s.links.length, 0)

  return (
    <>
      <PageHero
        title="Sitemap"
        subtitle="A complete map of every page on the Ahinsa Group website."
        breadcrumb="Sitemap"
        image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1920&q=85&auto=format&fit=crop"
      />

      <section className="section-pad bg-page">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-soft">
              <div>
                <p className="eyebrow">Site Index</p>
                <h2 className="heading-serif text-fg text-3xl md:text-4xl mt-3">
                  Every <span className="gold-text">page</span>, in one place
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-fg-soft text-xs uppercase tracking-[0.2em]">
                <Map className="w-4 h-4 text-gold-700 dark:text-gold-500" />
                <span>{totalPages} pages</span>
                <span className="text-fg-faint">&bull;</span>
                <span>{SECTIONS.length} sections</span>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.08}>
                  <div className="card-glass p-7 h-full">
                    <div className="flex items-center gap-4 pb-5 border-b border-faint">
                      <div className="w-12 h-12 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gold-700 dark:text-gold-500 uppercase tracking-[0.25em] text-[10px]">
                          Section
                        </p>
                        <h3 className="font-serif text-fg text-xl mt-1">{s.title}</h3>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-1.5">
                      {s.links.map((l) => (
                        <li key={l.to + l.label}>
                          <Link
                            to={l.to}
                            className="flex items-start gap-2 py-2 px-2 -mx-2 rounded-sm group hover:bg-gold-500/10 transition"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-gold-500 mt-1 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                            <div className="flex-1 min-w-0">
                              <div className="text-fg text-sm leading-tight group-hover:text-gold-700 dark:group-hover:text-gold-500 transition truncate">
                                {l.label}
                              </div>
                              {l.meta && (
                                <div className="text-fg-faint text-[10px] uppercase tracking-[0.15em] mt-0.5 truncate">
                                  {l.meta}
                                </div>
                              )}
                              <div className="text-fg-faint text-[10px] font-mono mt-0.5 truncate opacity-60">
                                {l.to}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-page-alt border-t border-soft">
        <div className="container-x py-14 grid md:grid-cols-2 gap-6 items-center">
          <Reveal>
            <p className="eyebrow">For Search Engines</p>
            <h3 className="heading-serif text-fg text-2xl md:text-3xl mt-4">
              Looking for the <span className="gold-text">XML sitemap</span>?
            </h3>
            <p className="text-fg-soft mt-3 text-sm leading-relaxed">
              An XML sitemap for crawlers and search engines is also available at the address below.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="md:text-right">
            <a
              href="/sitemap.xml"
              className="inline-flex items-center gap-3 px-6 py-3 border border-gold-500 text-gold-700 dark:text-gold-500 font-mono text-xs uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-ink-900 transition"
              target="_blank"
              rel="noreferrer"
            >
              <FileText className="w-4 h-4" />
              /sitemap.xml
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
