import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Sun, Moon, ChevronDown, ChevronRight, Building2 } from 'lucide-react'
import Logo from './Logo'
import { useTheme } from '../hooks/useTheme'
import { PROJECTS } from '../data/site'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  {
    to: '/about',
    label: 'About Us',
    submenuKind: 'simple',
    children: [
      { to: '/about', label: 'About Us', meta: 'Our story, vision & values' },
      { to: '/about/management', label: 'Management', meta: 'Board & senior leadership' },
      { to: '/about/team', label: 'Team', meta: 'Operating leadership across functions' },
    ],
  },
  {
    to: '/projects',
    label: 'Our Projects',
    submenuKind: 'mega',
    children: PROJECTS.map((p) => ({
      to: `/projects/${p.slug}`,
      label: p.name,
      meta: `${p.type} · ${p.location}`,
      status: p.status,
      image: p.image,
    })),
  },
  {
    to: '/media',
    label: 'Media',
    submenuKind: 'simple',
    children: [
      { to: '/media', label: 'Media Centre', meta: 'Featured stories & gallery' },
      { to: '/media/awards', label: 'Awards', meta: 'Recognition & honours' },
      { to: '/media/events', label: 'Events', meta: 'Launches, openings & meetups' },
      { to: '/media/news', label: 'News', meta: 'Press releases & coverage' },
    ],
  },
  { to: '/contact', label: 'Contact' },
]

function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`theme-toggle ${className}`}
    >
      <span className="relative w-5 h-5 block">
        <Sun
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
      </span>
    </button>
  )
}

/* Desktop dropdown — supports two kinds: 'mega' (rich cards) | 'simple' (text list) */
function DesktopDropdown({ link }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)
  const location = useLocation()

  const isActive =
    location.pathname === link.to || location.pathname.startsWith(link.to + '/')

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  const isMega = link.submenuKind === 'mega'

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        to={link.to}
        className={`flex items-center gap-1.5 text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 link-shimmer ${
          isActive
            ? 'text-gold-700 dark:text-gold-500'
            : 'text-ink-800 dark:text-cream/90 hover:text-gold-700 dark:hover:text-gold-500'
        }`}
      >
        {link.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </Link>

      {/* DROPDOWN */}
      <div
        className={`absolute ${
          isMega ? 'left-1/2 -translate-x-1/2' : 'left-0'
        } top-full pt-5 transition-all duration-300 ${
          open
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
      >
        {isMega ? (
          <MegaPanel link={link} />
        ) : (
          <SimplePanel link={link} />
        )}
      </div>
    </div>
  )
}

function MegaPanel({ link }) {
  return (
    <div className="w-[680px] bg-cream/98 dark:bg-ink-900/98 backdrop-blur-xl border border-gold-500/25 dark:border-gold-500/20 shadow-2xl">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-gold-700 dark:text-gold-500 uppercase tracking-[0.3em] text-[10px] font-medium">
              Our Portfolio
            </p>
            <h3 className="font-serif text-fg text-xl mt-1">Signature Projects</h3>
          </div>
          <Link
            to={link.to}
            className="inline-flex items-center gap-1.5 text-gold-700 dark:text-gold-500 text-[11px] uppercase tracking-[0.2em] hover:underline"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {link.children.map((child) => (
            <Link
              key={child.to}
              to={child.to}
              className="flex items-start gap-3 p-3 group hover:bg-gold-500/10 transition rounded-sm"
            >
              <div className="img-zoom relative w-16 h-16 flex-shrink-0 overflow-hidden">
                <img src={child.image} alt={child.label} className="w-full h-full object-cover" />
                <span className="absolute top-1 left-1 bg-gold-500 text-ink-900 text-[7px] uppercase tracking-wider px-1 py-0.5 leading-none">
                  {child.status}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-fg text-sm leading-tight group-hover:text-gold-700 dark:group-hover:text-gold-500 transition truncate">
                  {child.label}
                </h4>
                <p className="text-fg-soft text-[10px] uppercase tracking-[0.15em] mt-1 truncate">
                  {child.meta}
                </p>
                <span className="inline-flex items-center gap-1 text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-widest mt-1.5 opacity-0 group-hover:opacity-100 transition">
                  Discover <ChevronRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function SimplePanel({ link }) {
  return (
    <div className="w-[320px] bg-cream/98 dark:bg-ink-900/98 backdrop-blur-xl border border-gold-500/25 dark:border-gold-500/20 shadow-2xl">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      <div className="py-3">
        {link.children.map((child) => (
          <Link
            key={child.to + child.label}
            to={child.to}
            className="flex items-start gap-3 px-5 py-3 group hover:bg-gold-500/10 transition"
          >
            <ChevronRight className="w-3 h-3 text-gold-500 mt-1.5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
            <div className="flex-1">
              <div className="font-serif text-fg text-base leading-tight group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
                {child.label}
              </div>
              <div className="text-fg-soft text-[10px] uppercase tracking-[0.2em] mt-1">
                {child.meta}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* Mobile accordion — same shape for both submenu kinds */
function MobileAccordion({ link, onItemClick }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/')
  const isMega = link.submenuKind === 'mega'

  return (
    <div className="border-b border-gold-500/10">
      <div className="flex items-center">
        <NavLink
          to={link.to}
          end={link.to === '/'}
          onClick={onItemClick}
          className={({ isActive: a }) =>
            `flex-1 py-3 px-2 text-sm uppercase tracking-[0.2em] ${
              a || isActive ? 'text-gold-700 dark:text-gold-500' : 'text-ink-800 dark:text-cream/80'
            }`
          }
        >
          {link.label}
        </NavLink>
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-3 text-gold-700 dark:text-gold-500"
          aria-label="Toggle submenu"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[800px] pb-3' : 'max-h-0'
        }`}
      >
        <div className="pl-4 space-y-1">
          {link.children.map((child) => (
            <NavLink
              key={child.to + child.label}
              to={child.to}
              end
              onClick={onItemClick}
              className={({ isActive: a }) =>
                `flex items-center gap-3 py-2.5 px-2 border-l-2 transition ${
                  a
                    ? 'border-gold-500 text-gold-700 dark:text-gold-500'
                    : 'border-gold-500/15 text-ink-700 dark:text-cream/70'
                }`
              }
            >
              {isMega ? (
                <Building2 className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium leading-tight">{child.label}</div>
                <div className="text-[10px] text-fg-faint uppercase tracking-widest mt-0.5 truncate">
                  {child.meta}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <div className="hidden md:block bg-ink-900 text-ink-200 text-xs border-b border-gold-500/15">
        <div className="container-x flex justify-between items-center h-9">
          <div className="flex items-center gap-6">
            <span className="text-ink-300">Crafting iconic landmarks since 2003</span>
          </div>
          <div className="flex items-center gap-6 text-ink-300">
            <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-gold-500 transition">
              <Phone className="w-3.5 h-3.5" />
              +91 12345 67890
            </a>
            <a href="mailto:info@ahinsagroupagra.com" className="hover:text-gold-500 transition">
              info@ahinsagroupagra.com
            </a>
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'top-0 bg-cream/95 dark:bg-ink-900/95 backdrop-blur-md border-b border-gold-500/15 py-2'
            : 'top-0 md:top-9 bg-transparent py-4'
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo size={scrolled ? 'sm' : 'md'} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <DesktopDropdown key={link.to} link={link} />
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 link-shimmer ${
                      isActive
                        ? 'text-gold-700 dark:text-gold-500'
                        : 'text-ink-800 dark:text-cream/90 hover:text-gold-700 dark:hover:text-gold-500'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link to="/contact" className="btn-gold text-xs">
              Enquire Now
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="text-gold-700 dark:text-gold-500 p-2"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            open ? 'max-h-[1400px] mt-4' : 'max-h-0'
          }`}
        >
          <div className="container-x py-4 bg-cream/98 dark:bg-ink-900/98 backdrop-blur-md border-t border-gold-500/15">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <MobileAccordion
                    key={link.to}
                    link={link}
                    onItemClick={() => setOpen(false)}
                  />
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `py-3 px-2 text-sm uppercase tracking-[0.2em] border-b border-gold-500/10 ${
                        isActive
                          ? 'text-gold-700 dark:text-gold-500'
                          : 'text-ink-800 dark:text-cream/80'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-6 justify-center">
                Enquire Now
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
