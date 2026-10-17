// =============================================================
// SEO — the <title> and meta description of every page
// =============================================================
// Every page has its own pair, so no two pages share a title or a description.
// `usePageMeta` appends " | AHINSA GROUP" to each title, so the titles below
// leave it off. Keep a title under ~45 characters (≈60 with the suffix) and a
// description between ~120 and ~160 — the lengths Google shows in full.
import { AWARDS, COMPANY } from './site'

export const SITE_NAME = 'AHINSA GROUP'

// The live address. Canonical links, share previews and structured data all
// use it, so www.ahinsagroup.in and ahinsagroup.in count as one site.
export const SITE_URL = 'https://ahinsagroup.in'

// Share image for a page that does not name its own.
const DEFAULT_IMAGE = '/logo.png'

// The Rohit Jain article, /rohit-jain/. Its photos come in the three shapes
// Google asks for in an article result — 16:9, 4:3 and 1:1, each 1200px+ wide.
export const ROHIT_JAIN_ARTICLE = {
  path: '/rohit-jain/',
  headline: 'Rohit Jain – Chairman of Ahinsa Group, Agra: Entrepreneur, Builder and Social Leader',
  published: '2026-10-17T10:00:00+05:30',
  modified: '2026-10-17T10:00:00+05:30',
  images: [
    '/images/rohit-jain/rohit-jain-chairman-ahinsa-group-agra.jpg',
    '/images/rohit-jain/rohit-jain-ahinsa-group-4x3.jpg',
    '/images/rohit-jain/rohit-jain-agra-1x1.jpg',
  ],
  // 4:5. Also the article's lead photo, beside the title.
  portrait: '/images/Team/rohit-jain-office.jpg',
  avatar: '/images/rohit-jain/rohit-jain-avatar.jpg',
}

const ROHIT_JAIN_DESCRIPTION =
  'Rohit Jain, Chairman of Ahinsa Group Agra: the entrepreneur behind The Grand Green Valley and Green Valley townships, social leader and winner of 18+ awards.'

// Structured data for the article: the article itself, the person it is about,
// the company, and the breadcrumb trail Google can show in place of the URL.
function rohitJainJsonLd() {
  const a = ROHIT_JAIN_ARTICLE
  const url = SITE_URL + a.path
  const org = `${SITE_URL}/#organization`
  const person = `${url}#person`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: a.headline,
        description: ROHIT_JAIN_DESCRIPTION,
        image: a.images.map((src) => SITE_URL + src),
        datePublished: a.published,
        dateModified: a.modified,
        author: { '@type': 'Organization', name: 'Ahinsa Group', url: SITE_URL },
        publisher: { '@id': org },
        mainEntityOfPage: url,
        about: { '@id': person },
        keywords: 'Rohit Jain, Rohit Jain Ahinsa, Rohit Jain Agra, Rohit Jain Ahinsa Group Agra',
        inLanguage: 'en-IN',
      },
      {
        '@type': 'Person',
        '@id': person,
        name: 'Rohit Jain',
        honorificPrefix: 'Mr.',
        jobTitle: 'Chairman',
        worksFor: { '@id': org },
        image: SITE_URL + a.portrait,
        url,
        email: 'mailto:rohitjain@ahinsagroup.in',
        homeLocation: { '@type': 'Place', name: 'Agra, Uttar Pradesh, India' },
        memberOf: [
          { '@type': 'Organization', name: 'Bharatiya Jain Sanghatana, Uttar Pradesh (BJS-UP)' },
          { '@type': 'Organization', name: 'VSPS Trust' },
        ],
        award: AWARDS.map((w) => `${w.title} — ${w.awardedBy} (${w.year})`),
        knowsAbout: ['Real estate development', 'Township planning', 'Entrepreneurship', 'Community service'],
      },
      {
        '@type': 'Organization',
        '@id': org,
        name: 'Ahinsa Group',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '11/49B, Ahinsa Complex, Gulab Nagar, Rambagh',
          addressLocality: 'Agra',
          addressRegion: 'Uttar Pradesh',
          postalCode: '282006',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          ['Home', '/'],
          ['About Us', '/about'],
          ['Management', '/about/management'],
          ['Rohit Jain', a.path],
        ].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE_URL + path })),
      },
    ],
  }
}

export const PAGE_META = {
  home: {
    path: '/',
    title: 'Luxury Townships, Villas & Plots in Agra',
    description:
      'Ahinsa Group builds luxury townships, villas and residential & commercial plots in Agra, Gwalior and Firozabad. Explore our projects and book a site visit.',
  },
  about: {
    path: '/about',
    title: 'About Us – Real Estate Developer in Agra',
    description:
      'Discover Ahinsa Group, the Agra real estate developer trusted by 5,000+ families — our story, vision, values, leadership, offices and milestones.',
  },
  management: {
    path: '/about/management',
    title: 'Management – Rohit Jain & Rachit Jain',
    description:
      'Meet Ahinsa Group’s leadership: Chairman Mr. Rohit Jain, honoured with 18+ awards, and CEO Mr. Rachit Jain, leading every project with integrity and vision.',
  },
  projects: {
    path: '/projects',
    title: 'Our Projects – Townships & Plots in Agra',
    description:
      'Explore our projects: The Grand Green Valley, Green Valley Empire, Township, Orchid and The Pride in Agra, Lake City in Gwalior and City Centre in Firozabad.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Us – Book a Site Visit in Agra',
    description:
      'Contact Ahinsa Group to book a site visit, get a brochure or ask about plots and villas. Call +91 63987 30582 or visit us at Ahinsa Complex, Rambagh, Agra.',
  },
  awards: {
    path: '/media/awards',
    title: 'Awards & Recognition in Real Estate',
    description: `${AWARDS.length} awards and honours for Ahinsa Group and Chairman Mr. Rohit Jain — from Hindustan, Dainik Jagran and Zee Media to the Global Leadership Summit, London.`,
  },
  events: {
    path: '/media/events',
    title: 'Events – Project Launches & Celebrations',
    description:
      'Photos from Ahinsa Group events: project launches, office openings in Gwalior and Firozabad, Independence Day flag hoisting and devotional evenings in Agra.',
  },
  media: {
    path: '/media',
    title: 'Media & News – Brand Film & Gallery',
    description:
      'Watch the Ahinsa Group brand film and browse photos from our project sites, launch events and customer moments, plus our press, awards and event highlights.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy',
    description:
      'How Ahinsa Group collects, uses, shares and protects the personal information you give us through this website, enquiry forms, phone calls and WhatsApp.',
  },
  terms: {
    path: '/terms',
    title: 'Terms & Conditions',
    description:
      'The terms for using the Ahinsa Group website — project information and visuals, RERA disclosures, enquiries, intellectual property and governing law.',
  },
  rohitJain: {
    path: ROHIT_JAIN_ARTICLE.path,
    title: 'Rohit Jain – Chairman, Ahinsa Group Agra',
    description: ROHIT_JAIN_DESCRIPTION,
    type: 'article',
    image: ROHIT_JAIN_ARTICLE.images[0],
    jsonLd: rohitJainJsonLd(),
  },
  sitemap: {
    path: '/sitemap',
    title: 'Sitemap',
    description:
      'Every page of the Ahinsa Group website in one place: about us, management, our projects in Agra, Gwalior and Firozabad, media, awards, events and contact.',
  },
}

// One pair per project page, keyed by slug. Written by hand because the project
// data repeats itself — the offices share a tagline, and Corporate Office
// shares Ahinsa Complex's overview — so text built from it would repeat too.
const PROJECT_META = {
  'grand-green-valley': {
    title: 'The Grand Green Valley – Villas & Plots, Agra',
    description:
      'Ahinsa The Grand Green Valley on Fatehabad Road, Agra — a gated luxury township with residential & commercial plots of 111 to 200 sq yd and grand villas.',
  },
  'green-valley-empire': {
    title: 'Green Valley Empire – Plots & Villas, Agra',
    description:
      'Ahinsa Green Valley Empire at Mudi Crossing, Agra: a premium gated township with residential & commercial plots, rich villas and farm houses. Book a site visit.',
  },
  'green-valley-township': {
    title: 'Green Valley Township – Plots, Kuberpur Agra',
    description:
      'Ahinsa Green Valley Township in Kuberpur, Agra — a flagship gated community with residential & commercial plots of 111 and 138 sq yd set among green belts.',
  },
  'green-valley-orchid': {
    title: 'Green Valley Orchid – Business Plots, Agra',
    description:
      'Ahinsa Green Valley Orchid in Kuberpur, Agra: residential & commercial plots of 111 to 152 sq yd for homes, businesses and investors, in a gated green campus.',
  },
  'green-valley-residency': {
    title: 'The Pride – Green Valley Residency, Etmadpur',
    description:
      'THE PRIDE – Ahinsa Green Valley Residency: a gated residential community on NH2 National Highway, Etmadpur, Agra, with a club house, gym, temple and greenery.',
  },
  'green-valley-lake-city': {
    title: 'Green Valley Lake City – Township, Gwalior',
    description:
      'Ahinsa Green Valley Lake City, an upcoming township on Shivpuri Road, Gwalior, with residential & commercial plots and villas — our first in Madhya Pradesh.',
  },
  'grand-square-mall': {
    title: 'The Grand Square Mall – Shopping in Agra',
    description:
      'Ahinsa The Grand Square Mall on Fatehabad Road, Agra: four levels of shopping, dining and entertainment inside The Grand Green Valley, with ample parking.',
  },
  'ahinsa-mall-firozabad': {
    title: 'Ahinsa City Centre – Hi-Street Mall, Firozabad',
    description:
      'Ahinsa City Centre, a hi-street luxury mall on MG Road, Firozabad: five retail levels on a 2-acre site near the railway station, designed by ACPL.',
  },
  'ahinsa-complex': {
    title: 'Ahinsa Complex – Retail & Offices, Agra',
    description:
      'Ahinsa Complex, Ram Bagh, Agra: a fully occupied mixed-use landmark with street-level shops and offices, home to brands, professional services and our office.',
  },
  'corporate-office': {
    title: 'Head Office – Ahinsa Complex, Rambagh Agra',
    description:
      'Visit the Ahinsa Group head office at Ahinsa Complex, Gulab Nagar, Rambagh, Agra — meet our team and book a site visit. Call +91 63987 30582.',
  },
  'corporate-office-gwalior': {
    title: 'Ahinsa Office, Gwalior – Athena Tower',
    description:
      'The Ahinsa Group office in Gwalior, at Athena Tower in the heart of the city since July 2026 — meet our team about Green Valley Lake City and book a site visit.',
  },
  'ahinsa-office-firozabad': {
    title: 'Ahinsa Office, Firozabad',
    description:
      'The Ahinsa Group office in Firozabad, open since August 2026 in the heart of the district — meet our team for project details, brochures and site visits.',
  },
}

// The meta for /projects/<slug>. A project added later without its own entry
// above still gets a title and description of its own, built from its data.
export function projectMeta(slug, project) {
  const meta = PROJECT_META[slug] || {
    title: project.name,
    description: `${project.name}: ${project.type.toLowerCase()} at ${project.location} by Ahinsa Group. See photos, amenities and location, and book a site visit.`,
  }
  return { ...meta, path: `/projects/${slug}` }
}

export const fullTitle = (meta) => `${meta.title} | ${SITE_NAME}`
export const pageUrl = (meta) => SITE_URL + meta.path

// The <meta> tags a page carries, as [attribute, name, content]. The browser
// sets them through usePageMeta; the build writes them into STATIC_PAGES.
export function metaTags(meta) {
  const title = fullTitle(meta)
  const image = SITE_URL + (meta.image || DEFAULT_IMAGE)
  return [
    ['name', 'description', meta.description],
    ['property', 'og:site_name', 'Ahinsa Group'],
    ['property', 'og:type', meta.type || 'website'],
    ['property', 'og:title', title],
    ['property', 'og:description', meta.description],
    ['property', 'og:url', pageUrl(meta)],
    ['property', 'og:image', image],
    ['name', 'twitter:card', meta.image ? 'summary_large_image' : 'summary'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', meta.description],
    ['name', 'twitter:image', image],
  ]
}

// Pages that also get an HTML file of their own at build time (vite.config.js),
// with their title, tags and structured data already in it — for crawlers and
// link previews (WhatsApp, Facebook) that never run the site's JavaScript. Each
// path must end in "/": Apache serves the page from that folder's index.html.
export const STATIC_PAGES = [PAGE_META.rohitJain]
