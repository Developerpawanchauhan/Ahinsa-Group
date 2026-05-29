import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Our Projects' },
  { to: '/media', label: 'Media' },
  { to: '/contact', label: 'Contact' },
]

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

  // Top announcement bar
  return (
    <>
      <div className="hidden md:block bg-ink-900 text-ink-200 text-xs border-b border-gold-500/10">
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
            ? 'top-0 bg-ink-900/95 backdrop-blur-md border-b border-gold-500/15 py-2'
            : 'top-0 md:top-9 bg-transparent py-4'
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo size={scrolled ? 'sm' : 'md'} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 link-shimmer ${
                    isActive ? 'text-gold-500' : 'text-cream/90 hover:text-gold-500'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link to="/contact" className="btn-gold text-xs">
              Enquire Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-gold-500 p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            open ? 'max-h-[600px] mt-4' : 'max-h-0'
          }`}
        >
          <div className="container-x py-6 bg-ink-900/98 backdrop-blur-md border-t border-gold-500/15">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `py-3 px-2 text-sm uppercase tracking-[0.2em] border-b border-gold-500/10 ${
                      isActive ? 'text-gold-500' : 'text-cream/80'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-gold mt-6 justify-center">
                Enquire Now
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
