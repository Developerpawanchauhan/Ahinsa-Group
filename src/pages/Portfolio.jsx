import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Facebook, Globe, Instagram, Linkedin, MapPin, Navigation, Youtube } from 'lucide-react'
import LinkPage, { Divider } from '../components/LinkPage'
import { WHATSAPP_URL, WhatsAppIcon } from '../components/WhatsAppButton'
import { COMPANY, OFFICES } from '../data/site'
import { PAGE_META } from '../data/seo'
import usePageMeta from '../hooks/usePageMeta'

// The link-in-bio page shared on social profiles (/portfolio): the website,
// our social profiles and the head office. Its frame is LinkPage, shared with
// the Google reviews page (/reviews).

// The profiles the navbar and footer link to, plus WhatsApp.
const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@ahinsagroupagra',
    href: 'https://www.instagram.com/ahinsagroupagra/',
    icon: Instagram,
    chip: 'bg-gradient-to-br from-[#FEDA75] via-[#D62976] to-[#4F5BD5]',
  },
  {
    name: 'Facebook',
    handle: 'Ahinsa Group',
    href: 'https://www.facebook.com/profile.php?id=61589690406055',
    icon: Facebook,
    chip: 'bg-[#1877F2]',
  },
  {
    name: 'YouTube',
    handle: '@AhinsaGroupAgra',
    href: 'https://www.youtube.com/@AhinsaGroupAgra',
    icon: Youtube,
    chip: 'bg-[#FF0033]',
  },
  {
    name: 'LinkedIn',
    handle: 'Ahinsa Group Agra',
    href: 'https://www.linkedin.com/company/ahinsa-group-agra/',
    icon: Linkedin,
    chip: 'bg-[#0A66C2]',
  },
  {
    name: 'WhatsApp',
    handle: COMPANY.phone,
    href: WHATSAPP_URL,
    icon: WhatsAppIcon,
    chip: 'bg-[#25D366]',
  },
]

const HEAD_OFFICE = OFFICES.find((o) => o.isHeadOffice)

/** The head office's address, opening its Google Maps listing for directions. */
function OfficeLink({ office, item }) {
  return (
    <motion.li variants={item}>
      <motion.a
        href={office.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Head office: ${office.address}. Get directions`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group flex items-center gap-4 rounded-2xl border border-gold-500/30 bg-white/85 px-4 py-4 shadow-[0_10px_30px_-18px_rgba(135,104,24,0.45)] backdrop-blur-md transition-colors duration-300 hover:border-gold-500/60 hover:bg-white"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-700 text-white shadow-lg">
          <MapPin className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-ink-900">Head Office, Agra</span>
          <span className="mt-0.5 block text-xs leading-snug text-ink-500">{office.address}</span>
          <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-700">
            <Navigation className="h-3 w-3" />
            Get directions
          </span>
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </motion.a>
    </motion.li>
  )
}

function SocialLink({ social, item }) {
  const { name, handle, href, icon: Icon, chip } = social
  return (
    <motion.li variants={item}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name}: ${handle}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group flex h-16 items-center gap-4 rounded-2xl border border-gold-500/20 bg-white/80 px-4 shadow-[0_10px_30px_-18px_rgba(135,104,24,0.45)] backdrop-blur-md transition-colors duration-300 hover:border-gold-500/50 hover:bg-white"
      >
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-lg ${chip}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-ink-900">{name}</span>
          <span className="block truncate text-xs text-ink-500">{handle}</span>
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </motion.a>
    </motion.li>
  )
}

export default function Portfolio() {
  usePageMeta(PAGE_META.portfolio)

  return (
    <LinkPage>
      {({ item, still }) => (
        <>
          <motion.li variants={item}>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/"
                className="group relative flex h-[4.25rem] items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 px-4 text-ink-900 shadow-[0_20px_45px_-20px_rgba(168,133,29,0.7)] ring-1 ring-gold-300/70"
              >
                {/* A band of light that sweeps across every few seconds. */}
                {!still && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                    style={{ skewX: -12 }}
                    animate={{ x: ['0%', '450%'] }}
                    transition={{ duration: 1.6, delay: 1.4, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                  />
                )}
                <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-900 text-gold-400">
                  <Globe className="h-5 w-5" />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold tracking-wide">Visit Our Website</span>
                  <span className="block text-xs font-medium text-ink-800/80">ahinsagroup.in</span>
                </span>
                <ArrowUpRight className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.li>

          <Divider item={item}>Follow us</Divider>
          {SOCIALS.map((social) => (
            <SocialLink key={social.name} social={social} item={item} />
          ))}

          {HEAD_OFFICE?.mapUrl && (
            <>
              <Divider item={item}>Visit us</Divider>
              <OfficeLink office={HEAD_OFFICE} item={item} />
            </>
          )}
        </>
      )}
    </LinkPage>
  )
}
