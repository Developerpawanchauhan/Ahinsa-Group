import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PageHero({ title, subtitle, image, breadcrumb }) {
  return (
    <section className="relative h-[70vh] min-h-[420px] flex items-end overflow-hidden">
      <div className="absolute inset-0 bg-ink-900">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-50 hero-img"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/40 to-ink-900 dark:to-ink-900" />
        {/* Light-mode bottom fade to page bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream dark:to-transparent pointer-events-none" />
      </div>
      <div className="container-x relative pb-16 md:pb-24">
        <div className="max-w-3xl">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-400 dark:text-gold-500 mb-6">
            <Link to="/" className="hover:text-gold-300 dark:hover:text-gold-400 transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cream/70">{breadcrumb || title}</span>
          </nav>
          <h1 className="heading-serif text-5xl md:text-7xl text-cream">{title}</h1>
          {subtitle && (
            <p className="text-ink-200 mt-6 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
          )}
          <div className="gold-divider mx-0 mt-8" />
        </div>
      </div>
    </section>
  )
}
