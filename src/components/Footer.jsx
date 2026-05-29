import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-200 border-t border-gold-500/15 relative overflow-hidden">
      {/* decorative gold gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* Newsletter */}
      <div className="container-x py-14 border-b border-gold-500/10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-cream">
              Stay informed about our <span className="gold-text">latest launches</span>
            </h3>
            <p className="text-ink-300 mt-3 max-w-md">
              Subscribe to receive exclusive news, project announcements and curated insights from Ahinsa Group.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 bg-ink-800/60 border border-gold-500/20 px-5 py-4 text-cream placeholder:text-ink-400
                         focus:outline-none focus:border-gold-500 transition"
            />
            <button type="submit" className="btn-gold justify-center whitespace-nowrap">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-x py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <Logo size="md" />
          <p className="text-ink-300 text-sm leading-relaxed mt-6">
            Ahinsa Group Agra is a premier real estate developer crafting iconic landmarks
            with luxury, integrity and timeless design across Agra and beyond.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { icon: Facebook, href: '#' },
              { icon: Instagram, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Youtube, href: '#' },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-10 h-10 border border-gold-500/30 flex items-center justify-center text-gold-500
                           hover:bg-gold-500 hover:text-ink-900 transition-all duration-300"
                aria-label="Social link"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-cream font-serif text-lg mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: '/projects', label: 'Our Projects' },
              { to: '/media', label: 'Media & News' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ink-300 hover:text-gold-500 transition link-shimmer">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-serif text-lg mb-5">Reach Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 text-ink-300">
              <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <span>
                Ahinsa Tower, Sanjay Place,
                <br />
                Agra, Uttar Pradesh 282002
              </span>
            </li>
            <li className="flex gap-3 text-ink-300">
              <Phone className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <a href="tel:+911234567890" className="hover:text-gold-500 transition">
                +91 12345 67890
              </a>
            </li>
            <li className="flex gap-3 text-ink-300">
              <Mail className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <a href="mailto:info@ahinsagroupagra.com" className="hover:text-gold-500 transition">
                info@ahinsagroupagra.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-serif text-lg mb-5">Office Hours</h4>
          <ul className="space-y-3 text-sm text-ink-300">
            <li className="flex justify-between border-b border-gold-500/10 pb-2">
              <span>Monday &ndash; Friday</span>
              <span className="text-cream">10:00 &ndash; 19:00</span>
            </li>
            <li className="flex justify-between border-b border-gold-500/10 pb-2">
              <span>Saturday</span>
              <span className="text-cream">10:00 &ndash; 17:00</span>
            </li>
            <li className="flex justify-between border-b border-gold-500/10 pb-2">
              <span>Sunday</span>
              <span className="text-gold-500">By Appointment</span>
            </li>
          </ul>
          <Link to="/contact" className="btn-outline-gold text-xs mt-6 w-full justify-center">
            Schedule a Visit
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-500/10">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-ink-400">
          <p>
            &copy; {new Date().getFullYear()} Ahinsa Group Agra. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500 transition">Terms of Service</a>
            <a href="#" className="hover:text-gold-500 transition">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
