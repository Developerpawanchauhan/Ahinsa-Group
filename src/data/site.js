// Centralized site content — replace placeholder text and image URLs
// with real data when available. Image URLs currently point to Unsplash
// placeholders; swap them with paths like
// "/images/projects/<slug>/hero.jpg" once you upload your own files.

// =============================================================
// WEB3FORMS ACCESS KEY
// All contact & enquiry forms on this website send emails using
// Web3Forms (https://web3forms.com) — a free service.
//
// TO RECEIVE EMAILS AT info@ahinsagroup.in:
//   1. Go to https://web3forms.com
//   2. Enter  info@ahinsagroup.in  and click "Create Access Key"
//   3. Check your inbox and verify the email
//   4. Copy the access key and paste it below (replacing the current value)
// =============================================================
export const WEB3FORMS_KEY = '0ffd5aef-9d9a-4efe-8ee5-7a1838acd016'

export const COMPANY = {
  name: 'Ahinsa Group',
  city: 'Agra',
  tagline: 'Building Legacies, Crafting Lifestyles',
  founded: 2003,
  description:
    'Ahinsa Group Agra is a premier real estate developer dedicated to creating iconic residential and commercial landmarks. Our work is defined by architectural excellence, uncompromising quality and a deep respect for the cities we build in.',
  phone: '+91 63987 30582',
  email: 'info@ahinsagroup.in',
  address: 'Ahinsa Complex, Ram Bagh, Agra, Uttar Pradesh 282006',
}

export const STATS = [
  { value: '4+', label: 'Years of Excellence' },
  { value: '6+', label: 'Signature Projects' },
  { value: '500+', label: 'Acres Developed' },
  { value: '5K+', label: 'Happy Families' },
]

export const HERO_SLIDES = [
  {
    image: '/images/home/hero/silde-1.jpg',
    eyebrow: 'Iconic Landmarks',
    title: 'Crafting timeless\nlandmarks in Agra',
    subtitle: 'Residential and commercial spaces designed for those who appreciate the finer things.',
  },
  {
    image: '/images/home/hero/slide-2.jpg',
    eyebrow: 'Luxury Residences',
    title: 'Where every detail\nbecomes a legacy',
    subtitle: 'Premium homes thoughtfully designed for discerning families.',
  },
  {
    image: '/images/home/hero/slide-3.png',
    eyebrow: 'Commercial Excellence',
    title: 'Spaces that elevate\nbusiness ambitions',
    subtitle: 'Workspaces and retail destinations engineered for tomorrow.',
  },
]

// =============================================================
// PROJECTS — listing-grid data (used on Home + Projects pages)
// =============================================================
export const PROJECTS = [
  {
    slug: 'grand-green-valley',
    name: 'Ahinsa The Grand Green Valley',
    location: 'Fatehabad Road, Kundol, Agra',
    type: 'Luxury Township',
    status: 'Ongoing',
    image: '/images/projects/grand-green-valley/card.jpg',
    short:
      'Signature residences with resort-style amenities, set in a lush green community along Fatehabad Road.',
  },
  {
    slug: 'grand-square-mall',
    name: 'Ahinsa The Grand Square Mall',
    location: 'Fatehabad Road, Agra',
    type: 'Retail & Entertainment',
    status: 'Completed',
    image: '/images/projects/grand-square-mall/img1.png',
    short:
      'Anchor brands, a multiplex cinema, a grand food court and a signature central atrium under one roof.',
  },  {
    slug: 'green-valley-empire',
    name: 'Ahinsa Green Valley Empire',
    location: 'Agra',
    type: 'Luxury Township',
    status: 'Ongoing',
    image: '/images/projects/green-valley-empire/card.jpg',
    short:
      'Elegant high-rise apartments designed for families who value space, light and lifestyle.',
  },
  {
    slug: 'green-valley-township',
    name: 'Ahinsa Green Valley Township',
    location: 'Agra',
    type: 'Luxury Township',
    status: 'Ongoing',
    image: '/images/projects/green-valley-township/card.jpg',
    short:
      'A flagship gated township with plotted developments, parks and lifestyle infrastructure.',
  },
  {
    slug: 'green-valley-orchid',
    name: 'Ahinsa Green Valley Orchid',
    location: 'Agra',
    type: 'Residential Plots',
    status: 'Ongoing',
    image: '/images/projects/green-valley-orchid/card.jpg',
    short:
      'A premium business park with Grade A workspaces, retail edge and modern amenities.',
  },
  {
    slug: 'ahinsa-complex',
    name: 'Ahinsa Complex',
    location: 'Agra',
    type: 'Head Office',
    status: 'Completed',
    image: '/images/projects/ahinsa-complex/card.jpg',
    short:
      'A landmark commercial complex blending retail, offices and services under one address.',
  },
  {
    slug: 'corporate-office',
    name: 'Corporate Office',
    location: 'Agra',
    type: 'Head Office',
    status: 'Completed',
    image: '/images/projects/ahinsa-complex/office1.jpeg',
    short:
      'A landmark commercial complex blending retail, offices and services under one address.',
  },
  {
    slug: 'corporate-office-gwalior',
    name: 'Corporate Office, Gwalior',
    location: 'Gwalior',
    type: 'Corporate Office',
    status: 'Completed',
    image: '/images/projects/corporate-office-gwalior/corporate-office.jpeg',
    short:
      'A landmark commercial complex blending retail, offices and services under one address.',
  },
  {
    slug: 'ahinsa-office-firozabad',
    name: 'Ahinsa Office, Firozabad',
    location: 'Firozabad',
    type: 'Corporate Office',
    status: 'Completed',
    image: '/images/projects/ahinsa-office-firozabad/img1.png',
    short:
      'A landmark commercial complex blending retail, offices and services under one address.',
  },
  {
    slug: 'green-valley-lake-city',
    name: 'Ahinsa Green Valley Lake City',
    location: 'Gwalior, Madhya Pradesh',
    type: 'Luxury Township',
    status: 'Upcoming',
    image: '/images/projects/green-valley-lake-city/lake-city.jpg',
    short:
      'Signature residences with resort-style amenities, set in a lush green community along Fatehabad Road.',
  },
  {
    slug: 'ahinsa-mall-firozabad',
    name: 'Ahinsa Mall Firozabad',
    location: 'Firozabad, UP',
    type: 'Hi-Street Luxury Mall',
    status: 'Upcoming',
    image: '/images/projects/ahinsa-mall-firozabad/card.png',
    short:
      'The next-generation shopping and entertainment destination for Firozabad and surrounding districts.',
  },

]

// =============================================================
// PROPERTIES PAGE — live availability shown on /properties
//
// ⚠️ PLACEHOLDER DATA — update `available`, `total` and `units`
// with the real numbers before going live. `units` are the plot/
// shop numbers currently available; `available` should equal
// units.length.
// =============================================================

// Google Form used by the "Book Site Visit" button.
// ⚠️ REPLACE with your real form link (e.g. https://forms.gle/xxxx).
export const SITE_VISIT_FORM_URL = 'https://forms.gle/REPLACE-WITH-YOUR-FORM'

export const PROPERTY_LISTINGS = [
  {
    slug: 'grand-green-valley',
    image: '/images/projects/grand-green-valley/gate.jpeg',
    types: [
      { type: 'Residential Plots', available: 12, total: 120, units: ['P-14', 'P-27', 'P-33', 'P-41', 'P-58', 'P-66', 'P-72', 'P-89', 'P-95', 'P-104', 'P-111', 'P-118'] },
      { type: 'Commercial Plots', available: 5, total: 30, units: ['C-03', 'C-08', 'C-15', 'C-21', 'C-27'] },
      { type: 'Villas', available: 4, total: 36, units: ['V-05', 'V-12', 'V-19', 'V-30'] },
      { type: 'Farm Houses', available: 3, total: 18, units: ['F-02', 'F-09', 'F-14'] },
    ],
  },
  {
    slug: 'green-valley-township',
    image: '/images/projects/green-valley-township/gv-site-01.jpg',
    types: [
      { type: 'Shops', available: 6, total: 42, units: ['S-07', 'S-11', 'S-19', 'S-24', 'S-31', 'S-38'] },
      { type: 'Residential Plots', available: 9, total: 150, units: ['P-12', 'P-25', 'P-38', 'P-52', 'P-67', 'P-81', 'P-99', 'P-120', 'P-142'] },
      { type: 'Commercial Plots', available: 4, total: 26, units: ['C-04', 'C-09', 'C-17', 'C-22'] },
    ],
  },
  {
    slug: 'green-valley-empire',
    image: '/images/projects/green-valley-empire/add-img.jpeg',
    types: [
      { type: 'Shops', available: 5, total: 30, units: ['S-03', 'S-09', 'S-14', 'S-22', 'S-27'] },
      { type: 'Residential Plots', available: 11, total: 140, units: ['P-08', 'P-19', 'P-31', 'P-44', 'P-57', 'P-73', 'P-88', 'P-101', 'P-115', 'P-126', 'P-133'] },
      { type: 'Commercial Plots', available: 6, total: 32, units: ['C-02', 'C-07', 'C-13', 'C-19', 'C-25', 'C-30'] },
      { type: 'Farm Houses', available: 5, total: 22, units: ['F-03', 'F-08', 'F-12', 'F-17', 'F-20'] },
    ],
  },
  {
    slug: 'green-valley-orchid',
    image: '/images/projects/green-valley-orchid/site-01.jpg',
    types: [
      { type: 'Shops', available: 8, total: 36, units: ['S-02', 'S-06', 'S-10', 'S-14', 'S-21', 'S-26', 'S-30', 'S-34'] },
      { type: 'Residential Plots', available: 10, total: 90, units: ['P-05', 'P-16', 'P-24', 'P-37', 'P-45', 'P-53', 'P-61', 'P-70', 'P-78', 'P-86'] },
      { type: 'Commercial Plots', available: 7, total: 28, units: ['C-01', 'C-06', 'C-11', 'C-15', 'C-20', 'C-24', 'C-27'] },
    ],
  },
  {
    slug: 'green-valley-lake-city',
    // Launching soon — card shows a "Coming Soon" badge and no availability
    // popup. Remove this flag once bookings open (the types below then show).
    comingSoon: true,
    types: [
      { type: 'Shops', available: 7, total: 34, units: ['S-02', 'S-08', 'S-13', 'S-18', 'S-23', 'S-28', 'S-32'] },
      { type: 'Residential Plots', available: 15, total: 160, units: ['P-03', 'P-11', 'P-22', 'P-30', 'P-42', 'P-55', 'P-63', 'P-74', 'P-85', 'P-97', 'P-108', 'P-121', 'P-135', 'P-146', 'P-155'] },
      { type: 'Villas', available: 6, total: 40, units: ['V-04', 'V-09', 'V-15', 'V-22', 'V-28', 'V-35'] },
      { type: 'Farm Houses', available: 4, total: 24, units: ['F-01', 'F-07', 'F-13', 'F-19'] },
    ],
  },
]

// =============================================================
// PROJECT_DETAILS — detail-page data, keyed by slug
// =============================================================
export const PROJECT_DETAILS = {
  'grand-green-valley': {
    name: 'Ahinsa The Grand Green Valley',
    tagline: 'Where everyday living meets resort-style luxury.',
    location: 'Fatehabad Road, Kundol, Agra',
    fullAddress: 'Fatehabad Road, Agra',
    // Project-specific Instagram posts (overrides the site-wide INSTAGRAM default).
    instagram: {
      handle: 'ahinsagroupagra',
      posts: [
        'https://www.instagram.com/p/DZ9jGzszijS/',
        'https://www.instagram.com/p/DQ3dJ8qE_Tc/',
        'https://www.instagram.com/p/DUFXmFzE2ks/',
      ],
    },
    type: 'Luxury Township',
    status: 'Ongoing',
    configurations: 'Residential & Commercial Plots · Grand Villas · Farm House',
    unitArea: '111.11 · 138.88 · 166.66 · 200 sq yard',
    totalArea: 'Sprawling green campus',
    possession: 'On Request',
    priceRange: 'On Request',
    mapEmbed: 'https://www.google.com/maps?q=27.0900026,78.1799518&output=embed',
    videoEmbed: 'https://www.youtube.com/embed/MRN5CEBla64',
    hero: '/images/home/hero/silde-1.jpg',
    overviewImage:
      '/images/projects/grand-green-valley/fountain.jpg',
    gallery: [
      '/images/projects/grand-green-valley/boundary-wall.jpg',
      '/images/projects/grand-green-valley/club-house (1).jpg',
      '/images/projects/grand-green-valley/cricket-stadium.jpg',
      '/images/projects/grand-green-valley/grand-mall.jpg',
      '/images/projects/grand-green-valley/grand-villa.jpg',
      '/images/projects/grand-green-valley/office.jpg',
    ],
    // Gallery split into browsable sections (see `galleryGroups` in
    // ProjectDetail). Only groups listed here render as filter tabs.
    galleryGroups: [
      {
        label: 'Main Entrance',
        images: [
          '/images/projects/grand-green-valley/card.jpg',
          '/images/projects/grand-green-valley/gate.jpeg',
        ],
      },
      {
        label: 'Shops',
        images: [
          '/images/projects/grand-green-valley/grand-mall.jpg',
          '/images/projects/grand-green-valley/mall.jpeg',
        ],
      },
      {
        label: 'Parks',
        images: ['/images/projects/grand-green-valley/cricket-stadium.jpg'],
      },
      {
        label: 'Club House',
        images: ['/images/projects/grand-green-valley/club-house (1).jpg'],
      },
      {
        label: 'Villas',
        images: ['/images/projects/grand-green-valley/grand-villa.jpg'],
      },
      {
        label: 'Fountains',
        images: ['/images/projects/grand-green-valley/fountain.jpg'],
      },
      {
        label: 'Township Views',
        images: [
          '/images/projects/grand-green-valley/boundary-wall.jpg',
          '/images/projects/grand-green-valley/office.jpg',
        ],
      },
    ],
    overview: [
      'Nestled amidst expansive green landscapes and thoughtfully planned infrastructure, Ahinsa The Grand Green Valley is a landmark integrated township designed to redefine modern living in Agra. Combining premium residential plots, elegant villas, commercial destinations, and lifestyle-driven amenities, the township offers a harmonious balance between urban convenience and natural serenity.',
      'Every aspect of the development has been carefully envisioned to create a vibrant community where residents can enjoy spacious surroundings, seamless connectivity, and a superior quality of life. Wide internal roads, landscaped green zones, recreational spaces, and contemporary infrastructure come together to create an address that reflects both prestige and long-term value.',
      'Strategically located with excellent access to Agra\'s major highways, educational institutions, business hubs, and cultural landmarks, The Grand Green Valley is more than a residential destination — it\'s a thriving ecosystem designed for families, investors, and future generations.',
    ],
    highlights: [
      { icon: 'Trees', title: 'Lush Green Campus', text: 'Acres of landscaped greens and walking trails surround every tower.' },
      { icon: 'Building2', title: 'Iconic Architecture', text: 'Contemporary elevations with timeless detailing and premium finishes.' },
      { icon: 'ShieldCheck', title: 'Gated & Secure', text: '24x7 multi-tier security with CCTV and access-controlled entry.' },
      { icon: 'MapPin', title: 'Prime Connectivity', text: 'Direct access from Fatehabad Road \u2014 minutes from the city\u2019s key landmarks.' },
    ],
    amenities: [
      { icon: 'Waves', name: 'Swimming Pool' },
      { icon: 'Dumbbell', name: 'Fitness Centre' },
      { icon: 'Users', name: 'Clubhouse' },
      { icon: 'Trees', name: 'Landscaped Gardens' },
      { icon: 'Baby', name: "Children's Play Area" },
      { icon: 'Trophy', name: 'Indoor Games' },
      { icon: 'Activity', name: 'Jogging Track' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Droplet', name: 'Fountains' },
      { icon: 'Building2', name: 'Villas' },
      { icon: 'Store', name: 'Shops & Malls' },
      { icon: 'Car', name: 'Parking Area' },
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          'Earthquake-resistant RCC framed structure',
          'External walls of 230mm and internal of 115mm',
          'Premium quality fly-ash bricks',
        ],
      },
      {
        category: 'Flooring',
        items: [
          'Vitrified tile flooring in living, dining and bedrooms',
          'Anti-skid ceramic tiles in bathrooms and balconies',
          'Granite / quartz counters in kitchen',
        ],
      },
      {
        category: 'Doors & Windows',
        items: [
          'Engineered wood main door with branded fittings',
          'Flush doors for internal rooms',
          'UPVC / aluminium glazed windows',
        ],
      },
      {
        category: 'Electrical',
        items: [
          'Concealed copper wiring with modular switches',
          'Adequate light, fan and AC points in every room',
          'Backup power for common areas and select utilities',
        ],
      },
    ],
    locationAdvantages: [
      { place: 'Taj Mahal', distance: '~ 8 km', type: 'Heritage' },
      { place: 'Agra Cantt Railway Station', distance: '~ 10 km', type: 'Transit' },
      { place: 'Fatehabad Road retail strip', distance: 'Adjacent', type: 'Retail' },
      { place: 'Agra International Airport', distance: '~ 13 km', type: 'Transit' },
      { place: 'Schools & hospitals', distance: '5 \u2013 7 km', type: 'Civic' },
      { place: 'Yamuna Expressway access', distance: '~ 15 km', type: 'Highway' },
    ],
  },

  'green-valley-lake-city': {
    name: 'Ahinsa Green Valley Lake City',
    tagline: 'Where everyday living meets resort-style luxury.',
    location: 'Gwalior, Madhya Pradesh',
    fullAddress: 'Gwalior, Madhya Pradesh',
    instagram: null, // no Instagram section on this page
    type: 'Luxury Township',
    status: 'Upcoming',
    configurations: 'Residential & Commercial Plots · Grand Villas · Farm House',
    unitArea: '111.11 · 138.88 · 166.66 · 200 sq yard',
    totalArea: 'Sprawling green campus',
    possession: 'On Request',
    priceRange: 'On Request',
    // TODO: exact site coordinates. This was a copy of Grand Green Valley’s
    // Agra pin — ~100 km from Gwalior — so it points at the city for now.
    mapEmbed: 'https://www.google.com/maps?q=Gwalior,+Madhya+Pradesh&output=embed',
    overviewVideo: 'https://www.youtube.com/embed/6naURT36QaY',
    hero: '/images/projects/green-valley-lake-city/lake-city.jpg',
    overviewImage:
      '/images/projects/green-valley-lake-city/lake-city.jpg',
    gallery: [
      // '/images/projects/grand-green-valley/boundary-wall.jpg',
      // '/images/projects/grand-green-valley/club-house (1).jpg',
      // '/images/projects/grand-green-valley/cricket-stadium.jpg',
      // '/images/projects/grand-green-valley/grand-mall.jpg',
      // '/images/projects/grand-green-valley/grand-villa.jpg',
      // '/images/projects/grand-green-valley/office.jpg',
    ],
    overview: [
      'Nestled amidst expansive green landscapes and thoughtfully planned infrastructure, Ahinsa Green Valley Lake City is a landmark integrated township designed to redefine modern living in Agra. Combining premium residential plots, elegant villas, commercial destinations, and lifestyle-driven amenities, the township offers a harmonious balance between urban convenience and natural serenity.',
      'Every aspect of the development has been carefully envisioned to create a vibrant community where residents can enjoy spacious surroundings, seamless connectivity, and a superior quality of life. Wide internal roads, landscaped green zones, recreational spaces, and contemporary infrastructure come together to create an address that reflects both prestige and long-term value.',
      'Strategically located with excellent access to Agra\'s major highways, educational institutions, business hubs, and cultural landmarks, Green Valley Lake City is more than a residential destination — it\'s a thriving ecosystem designed for families, investors, and future generations.',
    ],
    highlights: [
      { icon: 'Trees', title: 'Lush Green Campus', text: 'Acres of landscaped greens and walking trails surround every tower.' },
      { icon: 'Building2', title: 'Iconic Architecture', text: 'Contemporary elevations with timeless detailing and premium finishes.' },
      { icon: 'ShieldCheck', title: 'Gated & Secure', text: '24x7 multi-tier security with CCTV and access-controlled entry.' },
      { icon: 'MapPin', title: 'Prime Connectivity', text: 'Direct access from Fatehabad Road — minutes from the city’s key landmarks.' },
    ],
    amenities: [
      { icon: 'Waves', name: 'Swimming Pool' },
      { icon: 'Dumbbell', name: 'Fitness Centre' },
      { icon: 'Users', name: 'Clubhouse' },
      { icon: 'Trees', name: 'Landscaped Gardens' },
      { icon: 'Baby', name: "Children's Play Area" },
      { icon: 'Trophy', name: 'Indoor Games' },
      { icon: 'Activity', name: 'Jogging Track' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Droplet', name: 'Fountains' },
      { icon: 'Building2', name: 'Villas' },
      { icon: 'Store', name: 'Shops & Malls' },
      { icon: 'Car', name: 'Parking Area' },
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          'Earthquake-resistant RCC framed structure',
          'External walls of 230mm and internal of 115mm',
          'Premium quality fly-ash bricks',
        ],
      },
      {
        category: 'Flooring',
        items: [
          'Vitrified tile flooring in living, dining and bedrooms',
          'Anti-skid ceramic tiles in bathrooms and balconies',
          'Granite / quartz counters in kitchen',
        ],
      },
      {
        category: 'Doors & Windows',
        items: [
          'Engineered wood main door with branded fittings',
          'Flush doors for internal rooms',
          'UPVC / aluminium glazed windows',
        ],
      },
      {
        category: 'Electrical',
        items: [
          'Concealed copper wiring with modular switches',
          'Adequate light, fan and AC points in every room',
          'Backup power for common areas and select utilities',
        ],
      },
    ],
    locationAdvantages: [
      { place: 'Taj Mahal', distance: '~ 8 km', type: 'Heritage' },
      { place: 'Agra Cantt Railway Station', distance: '~ 10 km', type: 'Transit' },
      { place: 'Fatehabad Road retail strip', distance: 'Adjacent', type: 'Retail' },
      { place: 'Agra International Airport', distance: '~ 13 km', type: 'Transit' },
      { place: 'Schools & hospitals', distance: '5 – 7 km', type: 'Civic' },
      { place: 'Yamuna Expressway access', distance: '~ 15 km', type: 'Highway' },
    ],
  },

  'green-valley-empire': {
    name: 'Ahinsa Green Valley Empire',
    tagline: 'A modern address for those who lead with confidence.',
    location: 'Agra',
    fullAddress: 'Mudi Crossing, Agra',
    // Project-specific Instagram posts (overrides the site-wide INSTAGRAM default).
    instagram: {
      handle: 'ahinsagroupagra',
      posts: [
        'https://www.instagram.com/p/DYwanblk25d/',
        'https://www.instagram.com/p/DObjEdxEw90/',
        'https://www.instagram.com/p/DV3Kktqk6wQ/',
      ],
    },
    type: 'Luxury Township',
    status: 'Ongoing',
    configurations: 'Residential & Commercial Plots · Farm House',
    unitArea: '111.11 · 138.88 · 166.66 · 200 sq yard',
    totalArea: 'Premium urban campus',
    possession: 'On Request',
    priceRange: 'On Request',
    mapEmbed: 'https://www.google.com/maps?q=27.2736831,78.0959693&output=embed',
    videoEmbed: 'https://www.youtube.com/embed/cMfuRv97hRI',
    hero: '/images/home/hero/slide-3.jpg',
    overviewImage: '/images/projects/green-valley-empire/rich-villa.jpg',
    gallery: [
      '/images/projects/green-valley-empire/card.jpg',
      '/images/projects/green-valley-empire/rich-villa.jpg',
      '/images/projects/green-valley-empire/villa.jpg',
      '/images/projects/green-valley-empire/fountain.jpg',
      '/images/projects/green-valley-empire/office.jpg',
      '/images/projects/green-valley-empire/gym.jpg',
      // Site-progress photos (July 2026), in series
      '/images/projects/green-valley-empire/site-01.jpg',
      '/images/projects/green-valley-empire/site-02.jpg',
      '/images/projects/green-valley-empire/site-03.jpg',
      '/images/projects/green-valley-empire/site-04.jpg',
      '/images/projects/green-valley-empire/site-05.jpg',
      '/images/projects/green-valley-empire/site-06.jpg',
      '/images/projects/green-valley-empire/site-07.jpg',
      '/images/projects/green-valley-empire/site-08.jpg',
      '/images/projects/green-valley-empire/site-09.jpg',
    ],
    // Gallery split into browsable sections (see `galleryGroups` in
    // ProjectDetail). Only groups listed here render as filter tabs.
    galleryGroups: [
      {
        label: 'Main Entrance',
        images: [
          '/images/projects/green-valley-empire/card.jpg',
          '/images/projects/green-valley-empire/site-01.jpg',
        ],
      },
      {
        label: 'Parks',
        images: [
          '/images/projects/green-valley-empire/kidszone.jpg',
          '/images/projects/green-valley-empire/site-06.jpg',
        ],
      },
      {
        label: 'Club House',
        images: ['/images/projects/green-valley-empire/gym.jpg'],
      },
      {
        label: 'Villas',
        images: [
          '/images/projects/green-valley-empire/rich-villa.jpg',
          '/images/projects/green-valley-empire/villa.jpg',
          '/images/projects/green-valley-empire/site-07.jpg',
          '/images/projects/green-valley-empire/site-08.jpg',
        ],
      },
      {
        label: 'Fountains',
        images: ['/images/projects/green-valley-empire/fountain.jpg'],
      },
      {
        label: 'Site Office',
        images: [
          '/images/projects/green-valley-empire/office.jpg',
          '/images/projects/green-valley-empire/site-02.jpg',
          '/images/projects/green-valley-empire/site-03.jpg',
          '/images/projects/green-valley-empire/site-04.jpg',
          '/images/projects/green-valley-empire/site-09.jpg',
        ],
      },
      {
        label: 'Township Views',
        images: ['/images/projects/green-valley-empire/site-05.jpg'],
      },
    ],
    overview: [
      'Ahinsa Green Valley Empire represents the next chapter in premium township development, offering a refined blend of contemporary planning, world-class infrastructure, and expansive green surroundings. Created for discerning homeowners and investors, the project delivers an elevated lifestyle within a secure and well-designed community.',
      'From wide roads and landscaped avenues to modern amenities and thoughtfully planned residential spaces, every element has been designed to enhance comfort, convenience, and long-term value. The township fosters a vibrant community atmosphere while ensuring privacy, security, and accessibility.',
      'With its strategic location, robust infrastructure, and commitment to quality development, Green Valley Empire stands as an exceptional destination for those seeking a future-ready address in Agra.',
    ],
    highlights: [
      { icon: 'Sparkles', title: 'Rich Villas', text: 'Elegantly designed luxury villas offering generous spaces, premium finishes and private gardens.' },
      { icon: 'Building2', title: 'Residential & Commercial Plots', text: 'Wide-road planned plots to build your dream home or establish a thriving business.' },
      { icon: 'Trees', title: 'Nature-Integrated Living', text: 'Landscaped surroundings that blend modern lifestyle with natural beauty and open spaces.' },
      { icon: 'ShieldCheck', title: 'Gated Security', text: 'Multi-tier security with 24x7 surveillance and access-controlled entry for all residents.' },
    ],
    amenities: [
      { icon: 'Waves', name: 'Swimming Pool' },
      { icon: 'Dumbbell', name: 'Fitness Centre' },
      { icon: 'Users', name: 'Clubhouse' },
      { icon: 'Trees', name: 'Landscaped Gardens' },
      { icon: 'Baby', name: "Children's Play Area" },
      { icon: 'Trophy', name: 'Indoor Games' },
      { icon: 'Activity', name: 'Jogging Track' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Droplet', name: 'Fountains' },
      { icon: 'Building2', name: 'Villas' },
      { icon: 'Store', name: 'Shops & Malls' },
      { icon: 'Car', name: 'Parking Area' },
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          'Earthquake-resistant RCC framed structure',
          'High-grade concrete and rebar',
          'Expansion joints designed for durability',
        ],
      },
      {
        category: 'Living & Bedrooms',
        items: [
          'Double-charged vitrified tile flooring',
          'Premium emulsion paint on walls and ceilings',
          'Dedicated AC, fan and light points',
        ],
      },
      {
        category: 'Kitchen',
        items: [
          'Modular kitchen platform with quartz / granite counter',
          'Stainless steel sink with branded fittings',
          'Provision for chimney, hob and water purifier',
        ],
      },
      {
        category: 'Bathrooms',
        items: [
          'Designer tiles up to false ceiling height',
          'Branded sanitary ware and CP fittings',
          'Geyser provision in all bathrooms',
        ],
      },
    ],
    floorPlans: [],
    locationAdvantages: [
      { place: 'Sanjay Place commercial hub', distance: 'Within city', type: 'Commercial' },
      { place: 'Top schools', distance: '3 \u2013 6 km', type: 'Education' },
      { place: 'Multispecialty hospitals', distance: '4 \u2013 7 km', type: 'Healthcare' },
      { place: 'Highway access', distance: 'Quick connect', type: 'Highway' },
      { place: 'Shopping malls & retail', distance: 'Easy reach', type: 'Retail' },
      { place: 'Heritage tourism circuit', distance: 'Within city', type: 'Heritage' },
    ],
  },

  'green-valley-township': {
    name: 'Ahinsa Green Valley Township',
    tagline: 'A flagship gated community where Agra learnt to live larger.',
    location: 'Agra',
    fullAddress: 'Kuberpur, Agra',
    // Project-specific Instagram posts (overrides the site-wide INSTAGRAM default).
    // The middle card needs carousel slide 3, which an embed can't open at, so
    // it stays a local image linking to that slide.
    instagram: {
      handle: 'ahinsagroupagra',
      posts: [
        'https://www.instagram.com/p/DaavDLETukL/',
        {
          image: '/images/instagram/DUYD-4rEwTL-3.webp',
          url: 'https://www.instagram.com/p/DUYD-4rEwTL/?img_index=3',
        },
        'https://www.instagram.com/p/DSKBRbVkyrV/',
      ],
    },
    type: 'Luxury Township',
    status: 'Ongoing',
    configurations: 'Residential & Commercial Plots',
    unitArea: '111.11 · 138.88 sq yard',
    totalArea: 'Sprawling integrated community',
    possession: 'Ready',
    priceRange: 'On Request',
    mapEmbed: 'https://www.google.com/maps?q=27.2322074,78.17292&output=embed',
    videoEmbed: 'https://www.youtube.com/embed/UixAWM1hS9A',
    hero: '/images/home/hero/slide-2.jpg',
    overviewImage: '/images/projects/green-valley-township/gv-gate.jpg',
    gallery: [
      '/images/projects/green-valley-township/card.jpg',
      '/images/projects/green-valley-township/gv-mall.jpg',
      '/images/projects/green-valley-township/gv-office.jpg',
      '/images/projects/green-valley-township/gv-vsps.jpg',
      '/images/projects/green-valley-township/gv-boundary-wall.jpg',
      '/images/projects/green-valley-township/kidzon.jpg',
      // Site-progress photos (July 2026), in series
      '/images/projects/green-valley-township/gv-site-01.jpg',
      '/images/projects/green-valley-township/gv-site-02.jpg',
      '/images/projects/green-valley-township/gv-site-03.jpg',
      '/images/projects/green-valley-township/gv-site-04.jpg',
      '/images/projects/green-valley-township/gv-site-05.jpg',
      '/images/projects/green-valley-township/gv-site-06.jpg',
      '/images/projects/green-valley-township/gv-site-07.jpg',
      '/images/projects/green-valley-township/gv-site-08.jpg',
      '/images/projects/green-valley-township/gv-site-09.jpg',
      '/images/projects/green-valley-township/gv-site-10.jpg',
      '/images/projects/green-valley-township/gv-site-11.jpg',
    ],
    // Gallery split into browsable sections (see `galleryGroups` in
    // ProjectDetail). Only groups listed here render as filter tabs.
    galleryGroups: [
      {
        label: 'Main Entrance',
        images: [
          '/images/projects/green-valley-township/card.jpg',
          '/images/projects/green-valley-township/gv-gate.jpg',
          '/images/projects/green-valley-township/gv-site-01.jpg',
        ],
      },
      {
        label: 'Shops',
        images: [
          '/images/projects/green-valley-township/gv-mall.jpg',
          '/images/projects/green-valley-township/gv-site-02.jpg',
        ],
      },
      {
        label: 'Parks',
        images: [
          '/images/projects/green-valley-township/kidzon.jpg',
          '/images/projects/green-valley-township/gv-site-08.jpg',
          '/images/projects/green-valley-township/gv-site-07.jpg',
          '/images/projects/green-valley-township/gv-site-09.jpg',
        ],
      },
      {
        label: 'Club House',
        images: [
          '/images/projects/green-valley-township/gv-site-03.jpg',
          '/images/projects/green-valley-township/gv-site-06.jpg',
        ],
      },
      {
        label: 'Villas',
        images: [
          '/images/projects/green-valley-township/gv-site-04.jpg',
          '/images/projects/green-valley-township/gv-site-05.jpg',
          '/images/projects/green-valley-township/gv-site-11.jpg',
        ],
      },
      {
        label: 'Fountains',
        images: ['/images/projects/green-valley-township/gv-site-10.jpg'],
      },
      {
        label: 'Township Views',
        images: [
          '/images/projects/green-valley-township/gv-boundary-wall.jpg',
          '/images/projects/green-valley-township/gv-office.jpg',
          '/images/projects/green-valley-township/gv-vsps.jpg',
        ],
      },
    ],
    overview: [
      'Ahinsa Green Valley is a thoughtfully planned township that brings together modern infrastructure, open green spaces, and a community-centric lifestyle. Designed to offer residents a peaceful and well-connected living environment, the development combines residential opportunities with essential conveniences, creating a destination where comfort and growth coexist.',
      'The township features well-planned road networks, landscaped surroundings, and future-ready infrastructure that supports both residential living and investment potential. Its strategic location provides excellent connectivity while maintaining a tranquil atmosphere away from the congestion of the city.',
      'Whether you are building your dream home or securing a valuable real estate investment, Ahinsa Green Valley offers an environment designed to support a prosperous and fulfilling future.',
    ],
    highlights: [
      { icon: 'Home', title: 'Residential Plots', text: 'Vaastu-compliant residential plots offering the freedom to design and build your dream home.' },
      { icon: 'Store', title: 'Commercial Plots', text: 'Strategically located commercial plots for establishing a business in a fast-growing community.' },
      { icon: 'Trees', title: 'Green Belts', text: 'Wide internal greens, tree-lined avenues and a central park for everyday recreation.' },
      { icon: 'ShieldCheck', title: 'Gated Security', text: 'Boundary wall, single entry point and round-the-clock guards for a safe, secure community.' },
    ],
    amenities: [
      { icon: 'Waves', name: 'Swimming Pool' },
      { icon: 'Dumbbell', name: 'Fitness Centre' },
      { icon: 'Users', name: 'Clubhouse' },
      { icon: 'Trees', name: 'Landscaped Gardens' },
      { icon: 'Baby', name: "Children's Play Area" },
      { icon: 'Trophy', name: 'Indoor Games' },
      { icon: 'Activity', name: 'Jogging Track' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Droplet', name: 'Fountains' },
      { icon: 'Building2', name: 'Villas' },
      { icon: 'Store', name: 'Shops & Malls' },
      { icon: 'Car', name: 'Parking Area' },
    ],
    specifications: [
      {
        category: 'Township Infrastructure',
        items: [
          'Wide bituminous internal roads with paver-block sidewalks',
          'Underground sewerage and stormwater drainage',
          'Underground electric cabling with feeder pillars',
          'Centralized water tank and supply network',
        ],
      },
      {
        category: 'Plot Specifications',
        items: [
          'Clearly demarcated boundary on each plot',
          'Vaastu-friendly orientations available',
          'Multiple plot sizes to suit varying budgets',
        ],
      },
      {
        category: 'Common Areas',
        items: [
          'Landscaped central park and pocket gardens',
          'Community clubhouse with banquet and indoor games',
          'Sports courts and outdoor gym equipment',
        ],
      },
    ],
    floorPlans: [],
    locationAdvantages: [
      { place: 'Kuberpur Market', distance: 'Adjacent', type: 'Retail' },
      { place: 'Agra–Aligarh Highway (NH-19)', distance: '~ 3 km', type: 'Highway' },
      { place: 'Agra Fort', distance: '~ 10 km', type: 'Heritage' },
      { place: 'Taj Mahal', distance: '~ 12 km', type: 'Heritage' },
      { place: 'Agra Cantt Railway Station', distance: '~ 12 km', type: 'Transit' },
      { place: 'Agra International Airport', distance: '~ 18 km', type: 'Transit' },
    ],
  },

  'green-valley-orchid': {
    name: 'Ahinsa Green Valley Orchid',
    tagline: 'A premium business address engineered for the next decade.',
    location: 'Agra',
    fullAddress: 'Kuberpur, Agra',
    instagram: null, // no Instagram section on this page
    type: 'Residential Plots',
    status: 'Ongoing',
    configurations: 'Residential & Commercial Plots',
    unitArea: '111.11 · 130.55 · 133.33 · 138.88 · 152.77 sq yard',
    totalArea: 'Premium commercial campus',
    possession: 'On Request',
    priceRange: 'On Request',
  
    mapEmbed: 'https://www.google.com/maps?q=27.2322074,78.17292&output=embed',
    hero: '/images/projects/green-valley-orchid/card.jpg',
    overviewImage: '/images/projects/green-valley-orchid/card.jpg',
    gallery: [
      // Site-progress photos (July 2026), in series
      '/images/projects/green-valley-orchid/site-01.jpg',
      '/images/projects/green-valley-orchid/site-02.jpg',
    ],
    overview: [
      'Ahinsa Green Valley Orchid is a premier commercial and industrial development strategically positioned to support the evolving needs of modern businesses. The project offers a unique opportunity for entrepreneurs, investors, manufacturers, and commercial enterprises to establish a strong presence in one of Agra\'s emerging growth zones.',,
      'Designed with accessibility, connectivity, and business efficiency in mind, the development benefits from proximity to major expressways, transportation networks, and key commercial destinations. The project combines modern planning with strategic location advantages, creating an ideal environment for business growth, warehousing, industrial operations, commercial establishments, and long-term investment.',
      'As part of the Ahinsa Group\'s commitment to quality development, Ahinsa Green Valley Orchid is envisioned as a dynamic commercial destination that supports innovation, productivity, and sustainable growth.',
    ],
    highlights: [
      { icon: 'Home', title: 'Residential Plots', text: 'Premium Vaastu-compliant residential plots designed for your ideal home and lifestyle.' },
      { icon: 'Store', title: 'Commercial Plots', text: 'Prime commercial plots positioned for visibility, accessibility and long-term business growth.' },
      { icon: 'Trees', title: 'Green Open Spaces', text: 'Wide roads, open green belts and landscaped areas creating a refreshing living environment.' },
      { icon: 'ShieldCheck', title: 'Gated Community', text: 'Secure boundary with controlled entry and 24x7 CCTV surveillance for complete peace of mind.' },
    ],
    amenities: [
      { icon: 'Building2', name: 'Double-Height Lobby' },
      { icon: 'Baby', name: "Children's Play Area" },
      { icon: 'Wifi', name: 'High-Speed Internet' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Droplet', name: 'Fountains' },
      { icon: 'Coffee', name: 'On-Campus Cafe' },
      { icon: 'Utensils', name: 'Food Court' },
      { icon: 'Car', name: 'Parking Area' },
      { icon: 'Layers', name: 'High-Speed Elevators' },
      { icon: 'Leaf', name: 'Green Open Spaces' },
      { icon: 'Trees', name: 'Landscaped Forecourt' },
      { icon: 'Sun', name: 'Energy-Efficient Lighting' },
    ],
    specifications: [
      {
        category: 'Building',
        items: [
          'RCC framed structure designed for commercial loading',
          'Glazed facade with high-performance glass',
          'Earthquake-resistant design as per IS codes',
        ],
      },
      {
        category: 'Office Floors',
        items: [
          'Bare-shell delivery for flexible fit-outs',
          'False-ceiling friendly height with concealed services',
          'Multiple lift cores with stack effect for peak loads',
        ],
      },
      {
        category: 'MEP',
        items: [
          'Centralized HVAC provisioning',
          'Wet-point provisions in every office floor',
          'BMS-ready building services',
        ],
      },
    ],
    floorPlans: [],
    locationAdvantages: [
      { place: 'Kuberpur Market', distance: 'Adjacent', type: 'Retail' },
      { place: 'Agra–Aligarh Highway (NH-19)', distance: '~ 3 km', type: 'Highway' },
      { place: 'Agra Fort', distance: '~ 10 km', type: 'Heritage' },
      { place: 'Taj Mahal', distance: '~ 12 km', type: 'Heritage' },
      { place: 'Agra Cantt Railway Station', distance: '~ 12 km', type: 'Transit' },
      { place: 'Agra International Airport', distance: '~ 18 km', type: 'Transit' },
    ],
  },

  'ahinsa-complex': {
    name: 'Ahinsa Complex',
    tagline: 'A landmark mixed-use complex at the heart of the city.',
    location: 'Agra',
    fullAddress: 'Ram Bagh, Agra',
    instagram: null, // no Instagram section on this page
    type: 'Head Office',
    status: 'Completed',
    configurations: 'Retail Office Services',
    unitArea: '',
    totalArea: 'Established commercial address',
    possession: 'Ready',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    mapEmbed: 'https://www.google.com/maps?q=27.2059136,78.0413203&output=embed',
    hero: '/images/projects/ahinsa-complex/card.jpg',
    overviewImage: '/images/projects/ahinsa-complex/ongoing.jpeg',
    gallery: [
      '/images/projects/ahinsa-complex/card.jpg',
      '/images/projects/ahinsa-complex/office6.jpeg',
      '/images/projects/ahinsa-complex/office8.jpeg',
      '/images/projects/ahinsa-complex/office9.jpeg',
      '/images/projects/ahinsa-complex/office10.jpeg',
      '/images/projects/ahinsa-complex/office11.jpeg',
    ],
    overview: [
      'Ahinsa Complex is one of our most established commercial addresses \u2014 a fully ready, fully active mixed-use destination home to brands, professional services and a steady footfall of regular visitors.',
      'The building combines street-facing retail with upper-floor offices, designed so that businesses get visibility, accessibility and the prestige of a known address.',
      'For investors and tenants alike, Ahinsa Complex offers the comfort of a proven asset with strong fundamentals and consistent demand.',
    ],
    highlights: [
      { icon: 'MapPin', title: 'Central Location', text: 'High-visibility, high-footfall site with easy approach.' },
      { icon: 'Store', title: 'Retail + Office Mix', text: 'Ground-floor retail with upper-level office and service tenants.' },
      { icon: 'Award', title: 'Established Address', text: 'A known and trusted commercial landmark in the city.' },
      { icon: 'Car', title: 'Approachable Parking', text: 'Designated parking with easy in-out movement.' },
    ],
    // Offices skip the "Lifestyle, delivered" amenities section — that copy
    // is written for homes. Add entries here to bring the section back.
    amenities: [],
    specifications: [
      {
        category: 'Building',
        items: [
          'RCC framed structure',
          'Designed for mixed retail and office occupancy',
          'Multiple staircases and emergency exits',
        ],
      },
      {
        category: 'Common Areas',
        items: [
          'Vitrified-tile flooring in lobbies and corridors',
          'Multiple lift wells and adequate stairwells',
          'Designated public restrooms on shared floors',
        ],
      },
      {
        category: 'Services',
        items: [
          'DG backup for common services',
          'Centralized water tank and supply',
          'Fire detection &amp; protection systems',
        ],
      },
    ],
    floorPlans: [],
    locationAdvantages: [
      { place: 'Aram Bagh (Ram Bagh Garden)', distance: 'Adjacent (~300 m)', type: 'Heritage' },
      { place: 'Chini Ka Rauza', distance: '~ 1 km', type: 'Heritage' },
      { place: 'Itmad-ud-Daula (Baby Taj)', distance: '~ 1.5 km', type: 'Heritage' },
      { place: 'Taj Mahal', distance: '~ 3.5 km', type: 'Heritage' },
      { place: 'Agra Fort', distance: '~ 4 km', type: 'Heritage' },
      { place: 'Agra Cantt Railway Station', distance: '~ 5 km', type: 'Transit' },
    ],
  },

  'corporate-office': {
    name: 'Corporate Office',
    tagline: 'A landmark mixed-use complex at the heart of the city.',
    location: 'Agra',
    fullAddress: 'Ram Bagh, Agra',
    instagram: null, // no Instagram section on this page
    type: 'Head Office',
    status: 'Completed',
    configurations: 'Retail Office Services',
    unitArea: '',
    totalArea: 'Established commercial address',
    possession: 'Ready',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    mapEmbed: 'https://www.google.com/maps?q=27.2059136,78.0413203&output=embed',
    hero: '/images/projects/ahinsa-complex/card.jpg',
    overviewImage: '/images/projects/ahinsa-complex/ongoing.jpeg',
    gallery: [
      '/images/projects/ahinsa-complex/office12.jpeg',
      '/images/projects/ahinsa-complex/office1.jpeg',
      '/images/projects/ahinsa-complex/office2.jpeg',
      '/images/projects/ahinsa-complex/office3.jpeg',
      '/images/projects/ahinsa-complex/office4.jpeg',
      '/images/projects/ahinsa-complex/office5.jpeg',
      '/images/Events/2025-07-10 - ahinsa-complex/img1.jpg',
      '/images/Events/2025-07-10 - ahinsa-complex/img2.jpg',
      '/images/Events/2025-07-10 - ahinsa-complex/img3.JPG',
    ],
    overview: [
      'Ahinsa Complex is one of our most established commercial addresses — a fully ready, fully active mixed-use destination home to brands, professional services and a steady footfall of regular visitors.',
      'The building combines street-facing retail with upper-floor offices, designed so that businesses get visibility, accessibility and the prestige of a known address.',
      'For investors and tenants alike, Ahinsa Complex offers the comfort of a proven asset with strong fundamentals and consistent demand.',
    ],
    highlights: [
      { icon: 'MapPin', title: 'Central Location', text: 'High-visibility, high-footfall site with easy approach.' },
      { icon: 'Store', title: 'Retail + Office Mix', text: 'Ground-floor retail with upper-level office and service tenants.' },
      { icon: 'Award', title: 'Established Address', text: 'A known and trusted commercial landmark in the city.' },
      { icon: 'Car', title: 'Approachable Parking', text: 'Designated parking with easy in-out movement.' },
    ],
    // Offices skip the "Lifestyle, delivered" amenities section — that copy
    // is written for homes. Add entries here to bring the section back.
    amenities: [],
    specifications: [
      {
        category: 'Building',
        items: [
          'RCC framed structure',
          'Designed for mixed retail and office occupancy',
          'Multiple staircases and emergency exits',
        ],
      },
      {
        category: 'Common Areas',
        items: [
          'Vitrified-tile flooring in lobbies and corridors',
          'Multiple lift wells and adequate stairwells',
          'Designated public restrooms on shared floors',
        ],
      },
      {
        category: 'Services',
        items: [
          'DG backup for common services',
          'Centralized water tank and supply',
          'Fire detection &amp; protection systems',
        ],
      },
    ],
    floorPlans: [],
    locationAdvantages: [
      { place: 'Aram Bagh (Ram Bagh Garden)', distance: 'Adjacent (~300 m)', type: 'Heritage' },
      { place: 'Chini Ka Rauza', distance: '~ 1 km', type: 'Heritage' },
      { place: 'Itmad-ud-Daula (Baby Taj)', distance: '~ 1.5 km', type: 'Heritage' },
      { place: 'Taj Mahal', distance: '~ 3.5 km', type: 'Heritage' },
      { place: 'Agra Fort', distance: '~ 4 km', type: 'Heritage' },
      { place: 'Agra Cantt Railway Station', distance: '~ 5 km', type: 'Transit' },
    ],
  },

  'corporate-office-gwalior': {
    name: 'Corporate Office, Gwalior',
    tagline: 'A landmark mixed-use complex at the heart of the city.',
    location: 'Gwalior',
    fullAddress: 'Gwalior, Madhya Pradesh',
    instagram: null, // no Instagram section on this page
    type: 'Corporate Office',
    status: 'Completed',
    configurations: 'Retail Office Services',
    unitArea: '',
    totalArea: 'Established commercial address',
    possession: 'Ready',
    priceRange: 'On Request',
    rera: { number: 'MP-RERA Reg. No. — TBD', link: '#' },
    mapEmbed: 'https://www.google.com/maps?q=Gwalior,+Madhya+Pradesh&output=embed',
    videoEmbed: 'https://www.youtube.com/embed/O0Stk5s2YU8',
    hero: '/images/projects/corporate-office-gwalior/corporate-office.jpeg',
    overviewImage: '/images/projects/corporate-office-gwalior/office.jpeg',
    gallery: [
      '/images/projects/corporate-office-gwalior/main.jpeg',
      '/images/projects/corporate-office-gwalior/corporate-office.jpeg',
      '/images/projects/corporate-office-gwalior/office.jpeg',
      '/images/projects/corporate-office-gwalior/img.jpeg',
      '/images/projects/corporate-office-gwalior/img2.jpeg',
      '/images/projects/corporate-office-gwalior/img3.jpeg',
      '/images/Events/2026-07-08 - gwalior-office/img5.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img6.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img8.JPG',
    ],
    overview: [
      'Our Gwalior corporate office is a fully ready, fully active mixed-use destination home to brands, professional services and a steady footfall of regular visitors.',
      'The building combines street-facing retail with upper-floor offices, designed so that businesses get visibility, accessibility and the prestige of a known address.',
      'For investors and tenants alike, the Gwalior corporate office offers the comfort of a proven asset with strong fundamentals and consistent demand.',
    ],
    highlights: [
      { icon: 'MapPin', title: 'Central Location', text: 'High-visibility, high-footfall site with easy approach.' },
      { icon: 'Store', title: 'Retail + Office Mix', text: 'Ground-floor retail with upper-level office and service tenants.' },
      { icon: 'Award', title: 'Established Address', text: 'A known and trusted commercial landmark in the city.' },
      { icon: 'Car', title: 'Approachable Parking', text: 'Designated parking with easy in-out movement.' },
    ],
    // Offices skip the "Lifestyle, delivered" amenities section — that copy
    // is written for homes. Add entries here to bring the section back.
    amenities: [],
    specifications: [
      {
        category: 'Building',
        items: [
          'RCC framed structure',
          'Designed for mixed retail and office occupancy',
          'Multiple staircases and emergency exits',
        ],
      },
      {
        category: 'Common Areas',
        items: [
          'Vitrified-tile flooring in lobbies and corridors',
          'Multiple lift wells and adequate stairwells',
          'Designated public restrooms on shared floors',
        ],
      },
      {
        category: 'Services',
        items: [
          'DG backup for common services',
          'Centralized water tank and supply',
          'Fire detection &amp; protection systems',
        ],
      },
    ],
    floorPlans: [],
    locationAdvantages: [
      { place: 'Gwalior Fort', distance: '~ 3 km', type: 'Heritage' },
      { place: 'Jai Vilas Palace', distance: '~ 2 km', type: 'Heritage' },
      { place: 'Gwalior Junction Railway Station', distance: '~ 2 km', type: 'Transit' },
      { place: 'Rajmata Vijaya Raje Scindia Airport', distance: '~ 10 km', type: 'Transit' },
    ],
  },

  'ahinsa-office-firozabad': {
    name: 'Ahinsa Office, Firozabad',
    tagline: 'A landmark mixed-use complex at the heart of the city.',
    location: 'Firozabad',
    fullAddress: 'Firozabad, Uttar Pradesh',
    instagram: null, // no Instagram section on this page
    type: 'Corporate Office',
    status: 'Completed',
    configurations: 'Retail Office Services',
    unitArea: '',
    totalArea: 'Established commercial address',
    possession: 'Ready',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    mapEmbed: 'https://www.google.com/maps?q=Firozabad,+Uttar+Pradesh&output=embed',
    // ⚠️ The Gwalior walkthrough does not belong on this page. Null until a
    // Firozabad video exists — the hero falls back to the still image.
    videoEmbed: null,
    // Wide facade shot — the hero crops to 80vh, so the landscape frame works
    // better here than the portrait `uper.png`.
    hero: '/images/projects/ahinsa-office-firozabad/img1.png',
    overviewImage: '/images/projects/ahinsa-office-firozabad/img2.png',
    gallery: [
      '/images/projects/ahinsa-office-firozabad/img1.png',
      '/images/projects/ahinsa-office-firozabad/uper.png',
      '/images/projects/ahinsa-office-firozabad/img2.png',
      '/images/projects/ahinsa-office-firozabad/img3.png',
      '/images/projects/ahinsa-office-firozabad/img4.png',
    ],
    overview: [
      'Our Firozabad office is a fully ready, fully active mixed-use destination home to brands, professional services and a steady footfall of regular visitors.',
      'The building combines street-facing retail with upper-floor offices, designed so that businesses get visibility, accessibility and the prestige of a known address.',
      'For investors and tenants alike, the Firozabad office offers the comfort of a proven asset with strong fundamentals and consistent demand.',
    ],
    highlights: [
      { icon: 'MapPin', title: 'Central Location', text: 'High-visibility, high-footfall site with easy approach.' },
      { icon: 'Store', title: 'Retail + Office Mix', text: 'Ground-floor retail with upper-level office and service tenants.' },
      { icon: 'Award', title: 'Established Address', text: 'A known and trusted commercial landmark in the city.' },
    ],
    // Offices skip the "Lifestyle, delivered" amenities section — that copy
    // is written for homes. Add entries here to bring the section back.
    amenities: [],
    specifications: [
      {
        category: 'Building',
        items: [
          'RCC framed structure',
          'Designed for mixed retail and office occupancy',
          'Multiple staircases and emergency exits',
        ],
      },
      {
        category: 'Common Areas',
        items: [
          'Vitrified-tile flooring in lobbies and corridors',
          'Multiple lift wells and adequate stairwells',
          'Designated public restrooms on shared floors',
        ],
      },
      {
        category: 'Services',
        items: [
          'DG backup for common services',
          'Centralized water tank and supply',
          'Fire detection &amp; protection systems',
        ],
      },
    ],
    floorPlans: [],
    // ⚠️ Gwalior landmarks removed — fill in real Firozabad distances.
    locationAdvantages: [],
  },

  'grand-square-mall': {
    name: 'Ahinsa The Grand Square Mall',
    tagline: 'Retail, dining and entertainment under one roof.',
    location: 'Fatehabad Road, Agra',
    fullAddress: 'Ahinsa The Grand Green Valley, Fatehabad Road, Agra',
    instagram: null,
    type: 'Retail & Entertainment',
    status: 'Completed',
    configurations: 'Anchor Retail · Multiplex · Food Court',
    unitArea: 'On Request',
    totalArea: 'On Request',
    possession: 'Ready',
    priceRange: 'On Request',
    // The mall stands inside the Grand Green Valley township, so it shares that
    // township's pin — the matching coordinates here are deliberate.
    mapEmbed: 'https://www.google.com/maps?q=27.0900026,78.1799518&output=embed',
    videoEmbed: null,
    // Dusk render leads the gallery — the hero lays a dark gradient over it.
    hero: '/images/projects/grand-square-mall/hero.png',
    overviewImage: '/images/projects/grand-square-mall/img5.png',
    gallery: [
      '/images/projects/grand-square-mall/hero.png',
      '/images/projects/grand-square-mall/img1.png',
      '/images/projects/grand-square-mall/img5.png',
    ],
    overview: [
      'Ahinsa The Grand Square Mall is the group’s most ambitious retail and entertainment destination — anchor brands, a multiplex cinema, a grand food court and a signature central atrium, all under one roof.',
      // TODO: add the full write-up.
    ],
    highlights: [], // TODO
    amenities: [], // TODO
    specifications: [],
    floorPlans: [],
    locationAdvantages: [], // TODO: key distances
  },
  'ahinsa-mall-firozabad': {
    name: 'Ahinsa Mall Firozabad',
    tagline: 'The next-generation shopping and entertainment destination for Firozabad.',
    location: 'Firozabad, UP',
    fullAddress: 'Near Railway Station, Firozabad',
    type: 'Hi-Street Luxury Mall',
    status: 'Upcoming',
    configurations: 'Anchor Retail · Hi-Street · Multiplex · Food Court',
    unitArea: '180 - 5000+ sq.ft.',
    totalArea: 'Regional shopping &amp; entertainment hub',
    possession: 'On Request',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    mapEmbed: 'https://www.google.com/maps?q=27.1465789,78.388868&output=embed',
    hero: '/images/projects/ahinsa-mall-firozabad/mall.jpg',
    overviewImage:
      '/images/projects/ahinsa-mall-firozabad/ongoing.jpg',
    gallery: [
      '/images/projects/ahinsa-mall-firozabad/mall.jpg',
      '/images/projects/ahinsa-mall-firozabad/mall-out.jpg',
      '/images/projects/ahinsa-mall-firozabad/inside.jpg',
      '/images/projects/ahinsa-mall-firozabad/inside2.jpg',
      '/images/projects/ahinsa-mall-firozabad/mall-eve.jpg',
      '/images/projects/ahinsa-mall-firozabad/laung.jpg',
    ],
    overview: [
      'Ahinsa Mall Firozabad is conceived as the regional shopping, dining and entertainment destination that Firozabad and the surrounding districts have been waiting for. A bold mixed-format mall \u2014 anchor stores, hi-street brands, food court, multiplex and family entertainment, all under one roof.',
      'The mall is being designed to deliver an aspirational yet accessible experience, with carefully curated brand zones, weekend programming and a vibrant central atrium that becomes the heartbeat of the city.',
      'For brands, it is a chance to lead a new market. For Firozabad, it is a destination that finally matches the energy of its people.',
    ],
    highlights: [
      { icon: 'Store', title: 'Anchor + Hi-Street', text: 'Curated mix of large anchor stores and signature hi-street labels.' },
      { icon: 'Film', title: 'Multiplex Cinema', text: 'A modern multi-screen cinema as the entertainment anchor.' },
      { icon: 'Utensils', title: 'Grand Food Court', text: 'Multi-cuisine food court plus signature restaurants.' },
      { icon: 'Sparkles', title: 'Iconic Atrium', text: 'A central atrium with skylight \u2014 the social heart of the mall.' },
    ],
    amenities: [
      { icon: 'Film', name: 'Multiplex Cinema' },
      { icon: 'Utensils', name: 'Food Court' },
      { icon: 'Coffee', name: 'Cafes &amp; Casual Dining' },
      { icon: 'Store', name: 'Anchor Brand Zones' },
      { icon: 'Baby', name: 'Kids Play Zone' },
      { icon: 'Trophy', name: 'Family Entertainment' },
      { icon: 'Car', name: 'Parking Area' },
      { icon: 'Layout', name: 'Grand Central Atrium' },
      { icon: 'Wifi', name: 'Free Wi-Fi' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Users', name: 'Family Lounge Areas' },
      { icon: 'Layers', name: 'High-Speed Elevators &amp; Escalators' },
    ],
    specifications: [
      {
        category: 'Architecture',
        items: [
          'Iconic facade with bold lighting',
          'Central atrium with skylight',
          'Wide internal circulation aisles',
        ],
      },
      {
        category: 'Retail Units',
        items: [
          'Bare-shell delivery for tenant fit-outs',
          'Provision for anchor, hi-street and kiosk formats',
          'Glazed shopfronts on prime frontages',
        ],
      },
      {
        category: 'Services',
        items: [
          'Centralized HVAC across all common areas',
          '100% power backup for shops and common services',
          'Fire detection, sprinklers and emergency systems as per code',
        ],
      },
    ],
    floorPlans: [],
    locationAdvantages: [
      { place: 'Firozabad Railway Station', distance: 'Adjacent (~500 m)', type: 'Transit' },
      { place: 'Firozabad Bus Stand', distance: '~ 1 km', type: 'Transit' },
      { place: 'Firozabad City Centre', distance: '~ 2 km', type: 'Commercial' },
      { place: 'District Hospital Firozabad', distance: '~ 2 km', type: 'Healthcare' },
      { place: 'NH-19 Agra–Kanpur Highway', distance: '~ 3 km', type: 'Highway' },
      { place: 'Shikohabad Town', distance: '~ 20 km', type: 'Civic' },
    ],
  },
}

// =============================================================
// OFFICES vs DEVELOPMENTS
//
// Our corporate offices are not something a buyer shops for, so they are kept
// out of the homepage portfolio grid and shown on the About and Contact pages
// instead. Ahinsa Complex stays in the portfolio — it is a landmark project in
// its own right. Move an entry between the two lists by editing OFFICE_SLUGS.
// =============================================================
export const OFFICE_SLUGS = [
  'corporate-office',
  'corporate-office-gwalior',
  'ahinsa-office-firozabad',
]

/** Company premises — rendered by <OfficeCard> on /about and /contact. */
export const OFFICES = PROJECTS.filter((p) => OFFICE_SLUGS.includes(p.slug)).map((p) => {
  const detail = PROJECT_DETAILS[p.slug] || {}
  return {
    ...p,
    address: detail.fullAddress || p.location,
    // The detail page embeds this; strip the embed flag for a directions link.
    mapUrl: detail.mapEmbed ? detail.mapEmbed.replace('&output=embed', '') : null,
  }
})

/** Everything a buyer can actually buy — the homepage portfolio grid. */
export const DEVELOPMENTS = PROJECTS.filter((p) => !OFFICE_SLUGS.includes(p.slug))

// =============================================================
// FEATURES — "The Ahinsa Promise" pillars
// =============================================================
export const FEATURES = [
  {
    title: 'Architectural Excellence',
    text: 'Every project is conceptualized with award-winning architects to deliver designs that stand the test of time.',
    icon: 'Compass',
  },
  {
    title: 'Uncompromising Quality',
    text: 'From foundation to finish, only the finest materials and most rigorous standards make it to our sites.',
    icon: 'Award',
  },
  {
    title: 'On-Time Delivery',
    text: 'A track record of timely possessions backed by transparent processes and trusted partners.',
    icon: 'Clock',
  },
  {
    title: 'Customer First',
    text: 'A dedicated relationship team that walks with you from booking through possession and beyond.',
    icon: 'HeartHandshake',
  },
]

// Official Instagram embeds shown on every project page after the brochure
// section (image posts only, in this exact order). A project can override
// this by defining its own `instagram: { handle, posts }` in PROJECT_DETAILS.
export const INSTAGRAM = {
  handle: 'ahinsagroupagra',
  posts: [
    'https://www.instagram.com/p/DYO4MgAzapX/',
    'https://www.instagram.com/p/DZ1MgM_Eywx/',
    'https://www.instagram.com/p/DYrQZ6tE-zE/',
  ],
}

// Real Google Business Profile reviews, transcribed verbatim. Cards render a
// gold monogram avatar unless an `image` field is provided (paste the
// reviewer's Google photo URL to show their real picture).
export const TESTIMONIALS = [
  {
    name: 'Pranjal',
    role: 'Google Review',
    rating: 5,
    quote:
      'Bahut acha project hai location aur planning dono pasand aayi staff ne har cheez clearly explain ki aur booking process bahut smooth rha',
  },
  {
    name: 'Santosh Sharma',
    role: 'Google Review',
    rating: 5,
    quote:
      'I recently bought a plot here and had a really good experience. The team was supportive, explained everything clearly, and the paperwork was completed without any hassle. The location is also good. Happy with my purchase.',
  },
  {
    name: 'pramod yadav',
    role: 'Google Review',
    rating: 5,
    quote:
      'This is a wonderful project. The location is excellent, the team is professional, and the entire process was transparent. This is an excellent option for future investment. I definitely recommend this project.',
  },
  {
    name: 'Pawan Chauhan',
    role: 'Google Review',
    rating: 5,
    quote:
      'Great experience buying a plot. The staff was helpful, and the process was smooth. Highly recommended!',
  },
  {
    name: 'Rahul Sharma',
    role: 'Google Review',
    rating: 5,
    quote:
      'This Township positive aspects including good connectivity, availability of schools and hospitals, well-maintained parks.\nJust 10 km far from Saura Hotel Agra.',
  },
  {
    name: 'Riya Gupta',
    role: 'Google Review',
    rating: 5,
    quote:
      'The location of the project is very good and future appreciation is very good.',
  },
  {
    name: 'Dev tech video',
    role: 'Google Review',
    rating: 5,
    quote:
      '1. The best property is one that provides passive income and doesn’t sit idle.\n2. Location is king – even a small property in a good location can yield significant returns.\n3. Land is something that never depletes; it only becomes more valuable over time.\n4. Your real wealth is your health and skills – no one can steal them.\n5. The best property is one that reduces your stress after purchasing, not increases it.',
  },
]

export const MEDIA_NEWS = [
  {
    date: 'May 18, 2026',
    category: 'Press Release',
    title: 'Ahinsa Group announces flagship retail destination in Firozabad',
    excerpt:
      'Ahinsa Mall Firozabad is poised to redefine retail and entertainment for the region, with a multi-format programme spanning anchor stores, hi-street, multiplex and family entertainment.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop',
  },
  {
    date: 'April 02, 2026',
    category: 'In the News',
    title: 'Agra emerges as a premium real estate destination',
    excerpt:
      'Industry analysts highlight Ahinsa Group as a leading developer fuelling demand for high-end residences in tier-2 cities.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85&auto=format&fit=crop',
  },
  {
    date: 'March 15, 2026',
    category: 'Award',
    title: 'Ahinsa Group receives Excellence in Design 2026',
    excerpt:
      'The recognition celebrates two decades of architectural innovation and unwavering commitment to quality.',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85&auto=format&fit=crop',
  },
  {
    date: 'February 09, 2026',
    category: 'Event',
    title: 'New construction milestone at Green Valley Empire',
    excerpt:
      'Celebrating a key milestone on site as one of our most anticipated residential addresses moves into the next phase of build.',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85&auto=format&fit=crop',
  },
  {
    date: 'January 12, 2026',
    category: 'Press Release',
    title: 'Ahinsa Complex achieves full occupancy',
    excerpt:
      'The flagship commercial complex reaches a milestone of complete tenant occupancy, reaffirming its status as a trusted business address.',
    image:
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=85&auto=format&fit=crop',
  },
  {
    date: 'November 25, 2025',
    category: 'In the News',
    title: 'Sustainable construction practices at Ahinsa projects',
    excerpt:
      'A look inside how Ahinsa Group is integrating green building techniques across its upcoming developments.',
    image:
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=85&auto=format&fit=crop',
  },
]

export const GALLERY = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1448630360428-65456885c650?w=900&q=85&auto=format&fit=crop',
]


export const MILESTONES = [
  { month: 'Jan', year: '2024', title: 'Ahinsa Green Valley Township', text: 'Launched our flagship integrated township at Kuberpur, Agra \u2014 offering premium Residential & Commercial Plots across a well-planned, green-centric community with wide roads and modern infrastructure.' },
  { month: 'Oct', year: '2024', title: 'Ahinsa The Grand Green Valley', text: 'Unveiled the Grand Green Valley on Fatehabad Road, Agra \u2014 a landmark luxury township steps from the Taj Mahal, featuring Grand Villas, Residential & Commercial Plots and Farm Houses amidst lush landscapes.' },
  { month: 'Jan', year: '2025', title: 'Ahinsa The Grand Green Valley \u2014 Grand Launch', text: 'Opened the Grand Green Valley to buyers with a grand launch on Republic Day \u2014 the township\u2019s villas, plots and farm houses went on offer to families and investors across Agra.' },
  { month: 'Apr', year: '2025', title: 'Ahinsa Green Valley Empire', text: 'Launched Green Valley Empire at Mudi Crossing, Agra \u2014 a premium township offering Rich Villas, Residential & Commercial Plots and Farm Houses crafted for families who value space, elegance and long-term growth.' },
  { month: 'Jul', year: '2025', title: 'Ahinsa Complex', text: 'Opened the corporate office at Ahinsa Complex, Ram Bagh, Agra \u2014 completing a vibrant mixed-use landmark that pairs street-level retail with professional office space, now fully operational and occupied.' },
  { month: 'Nov', year: '2025', title: 'Ahinsa Green Valley Orchid', text: 'Introduced Green Valley Orchid at Kuberpur, Agra \u2014 a thoughtfully designed residential destination offering premium plots in a nature-integrated setting with excellent connectivity.' },
  { month: 'Jan', year: '2026', title: 'Ahinsa The Grand Green Valley \u2014 Inauguration', text: 'Inaugurated Ahinsa The Grand Green Valley on Fatehabad Road, Agra \u2014 the township\u2019s completed infrastructure, entrance gate and landscaped commons formally opened to residents.' },
  { month: 'Mar', year: '2026', title: 'Rich Villa \u2014 Green Valley Empire', text: 'Inaugurated the Rich Villas at Ahinsa Green Valley Empire, Mudi Crossing, Agra \u2014 elegantly designed luxury homes with generous interiors, premium finishes and private gardens, launched with the blessings of Guru Vijay Kaushal Ji.' },
  { month: 'Jul', year: '2026', title: 'Ahinsa Corporate Office, Gwalior \u2014 Inauguration', text: 'Inaugurated the Ahinsa Corporate Office in Gwalior, Madhya Pradesh \u2014 marking the group\u2019s expansion beyond Uttar Pradesh with a centrally located mixed-use landmark pairing street-facing retail with upper-floor office suites.' },
  { month: 'Aug', year: '2026', title: 'Ahinsa Corporate Office, Firozabad \u2014 Inauguration', text: 'Inaugurated the Ahinsa Office in Firozabad, Uttar Pradesh \u2014 a ready, fully active address bringing the group closer to buyers across the district, with street-facing retail below and office suites above.' },
]


// =============================================================
// MANAGEMENT — Board / Senior Leadership (deep profiles)
// =============================================================
export const MANAGEMENT = [
  {
    slug: 'rohit-jain',
    name: 'Mr. Rohit Jain',
    role: 'Chairman',
    image: '/images/Team/rohit-jain.jpg',
    short:
      'Visionary leader steering Ahinsa Group toward architectural excellence and sustained growth.',
    bio: [
      'Mr. Rohit Jain is the Chairman of Ahinsa Group, one of Agra\'s most respected and trusted real estate development companies. A visionary entrepreneur with deep roots in the city of the Taj Mahal, he has dedicated over two decades to transforming the way communities are built, lived in, and experienced across Uttar Pradesh.',
      'Ahinsa Group is a legacy carried forward across decades — a name that Mr. Rohit Jain has nurtured and continued with unwavering dedication, building it into one of the most trusted names in Agra\'s real estate sector. Through his hands-on leadership and long-term vision, he has shaped Ahinsa into a brand synonymous with integrity, quality, and lasting community value.',
      'Starting from a powerful conviction that quality real estate must be accessible, transparent, and built to last, Mr. Jain established Ahinsa Group on the timeless principle of Ahimsa — non-violence — which guides every aspect of how the company operates: with care for its customers, deep respect for the environment, and integrity in every single transaction.',
      'Under his stewardship, Ahinsa Group has grown into a multi-project developer with landmark townships and residential developments across Agra, earning the trust of thousands of families and investors. His leadership is defined by a hands-on approach, uncompromising commitment to quality, and an overarching vision of building communities — not just structures.',
      'Recognized nationally and internationally — from CCLA and Zee Media to Dainik Jagran, the India–Sri Lanka Real Estate Summit, and the Global Innovation & Leadership Summit in London — Mr. Jain stands as one of Agra\'s most decorated and respected business leaders, with over 18 awards across entrepreneurship, real estate excellence, and community leadership.',
    ],
    achievements: [
      'Chairman, Ahinsa Group',
      '20+ Years in Real Estate',
      '18+ Awards & Recognitions',
    ],
  },
  {
    slug: 'rachit-jain',
    name: 'Mr. Rachit Jain',
    role: 'Chief Executive Officer (CEO)',
    image: '/images/Team/rachit-jain.jpg',
    short:
      'Drives strategic vision and operational excellence across all verticals of the group.',
    // In his own voice \u2014 a message to the Ahinsa family, not a third-person profile.
    bio: [
      'Today, we are more than 5,000 people strong \u2014 and every single day, that family grows a little bigger.',
      'When I look back, it\u2019s hard to believe how far we\u2019ve come. One project became six. One city became three. And we are only getting started.',
      'But if you ask me what I\u2019m most proud of, it isn\u2019t the numbers. It\u2019s the reason behind them.',
      'Every person who joined us did so because someone they trusted told them they could. That trust wasn\u2019t given to us \u2014 we earned it, promise by promise, delivery by delivery.',
      'That is the only principle we have ever followed at AHINSA GROUP, whatever we promise, we deliver.',
      'Thank you to every family member who believed in us early, and to every new one joining us today. The next chapter belongs to all of us.',
    ],
    achievements: [
      'Chief Executive Officer',
      'Lead, Strategic Operations',
      'Architect, Business Excellence',
    ],
  },
  {
    slug: 'jitendra-yadav',
    name: 'Mr. Jitendra Yadav',
    role: 'Director',
    image: '/images/Team/jitendra-yadav.jpeg',
    short:
      'Two decades of leadership across retail, insurance, banking and real estate, bringing deep industry expertise to Ahinsa Group.',
    bio: [
      'His professional journey began in retail and consumer products before advancing into senior leadership roles with leading financial institutions, including Reliance Life Insurance and Bank of Baroda Life Insurance. During this period, he successfully led regional operations, built high-performing teams, and drove business growth across multiple markets in North India.',
      'In 2014, Mr. Yadav ventured into the real estate sector as a Founder and Director, where he established a strong reputation for integrity, customer-centricity, and value creation. His decade-long experience in real estate has provided deep insights into land development, project execution, and sustainable community building.',
      'As Director of Ahinsa Group, Mr. Yadav is focused on driving strategic growth, delivering exceptional developments, and upholding the highest standards of quality and trust. His leadership is guided by a simple philosophy: creating lasting value through transparency, innovation, and customer satisfaction.',
      '“We believe real estate is not just about developing properties—it is about creating spaces that enrich lives and inspire future generations.”',
    ],
    achievements: [
      'Director, Ahinsa Group',
      '20+ Years Cross-Industry Leadership',
      "Founder & Director, Real Estate (2014–Present)",
    ],
  },
]

// =============================================================
// TEAM MEMBERS — Operating leadership across functions
// =============================================================
export const TEAM_MEMBERS = [
  // {
  //   name: 'Mr. Akash Bansal',
  //   role: 'Legal and Professional Conssultant',
  //   department: 'Legal',
  //   image:
  //     '/images/emploi/akash-bansal.jpg?w=600&q=85&auto=format&fit=crop',
  //   bio: 'Handles all legal matters and professional advisory — manages contracts, documentation and provides regulatory guidance to the group.',
  // },
  {
    name: 'Mr. Munna Chaudhary',
    role: 'Administration Coordinator',
    department: 'Administration',
    image:
      '/images/emploi/munna.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Keeps day-to-day administration running — coordinates between departments, maintains office records and follow-ups, and makes sure routine operations stay on schedule.',
  },
  {
    name: 'Mr. Akshat Jain',
    role: 'Office Manager',
    department: 'Administration',
    image:
      '/images/emploi/akshat-jain.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Runs the corporate office end to end — manages facilities, staff scheduling, visitor and vendor coordination, and the systems that keep the workplace organised.',
  },
  {
    name: 'Mr. Himanshu Saxena',
    role: 'Head of Accounts',
    department: 'Accounts',
    image:
      '/images/emploi/himansuh-saxena.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Heads the accounts function for the group — owns financial records, audits, statutory compliance and periodic reporting to the management.',
  },
  {
    name: 'Mr. Alok Sharma',
    role: 'Purchase Manager',
    department: 'Purchase',
    image:
      '/images/emploi/alok-sharma.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Owns procurement from requisition to delivery — sources construction materials, negotiates with vendors, controls costs and keeps site supply on schedule.',
  },
  {
    name: 'Mr. Pawan Chauhan',
    role: 'Social Media Manager',
    department: 'IT & Digital',
    image:
      '/images/emploi/pawan-chauhan.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Builds the group’s digital presence — plans and produces social content, runs online campaigns and grows audience engagement across platforms.',
  },
  {
    name: 'Mr. Anupam Chittoriya',
    role: 'Accountant',
    department: 'Accounts',
    image:
      '/images/emploi/anupam-chitoria.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Runs the Tally-based accounting system — books entries and vouchers, prepares GST filings and safeguards the accuracy of the group’s financial data.',
  },
  {
    name: 'Mr. Rajesh Saxena',
    role: 'Legal & Accounts Executive',
    department: 'Accounts',
    image:
      '/images/emploi/rajesh-saxena.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Works across accounts and legal — maintains ledgers, reconciliations and financial reporting while supporting agreements, statutory paperwork and compliance documentation.',
  },
  {
    name: 'Mr. Laxmi Narayan',
    role: 'Land Coordinator',
    department: 'Legal',
    image:
      '/images/emploi/laxmi-narayan.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Coordinates land records and acquisition paperwork — manages title documentation and registry formalities, and liaises with landowners and revenue authorities for new sites.',
  },
  {
    name: 'Mr. Mohit Parashar',
    role: 'Project Engineer',
    department: 'Engineering',
    image:
      '/images/emploi/mohit-parashar.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Drives technical execution on site — supervises structural work, coordinates MEP and contractor teams, and tracks quality and progress against project schedules.',
  },

  {
    name: 'Mr. Santosh Sharma',
    role: 'Sales Manager',
    department: 'Sales',
    image:
      '/images/emploi/shantosh-sharma.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Leads the sales team — drives client acquisition, manages site visits and closings, and delivers on sales targets across the group’s projects.',
  },

]

// =============================================================
// AWARDS & RECOGNITION
// =============================================================
export const AWARDS = [
  {
    year: '2024',
    date: '16 February 2024',
    title: 'PRIDE OF AGRA',
    awardedBy: 'Hindustan',
    category: 'Society Upliftment',
    image: '/images/awards/2024/pride-of-agra.jpg',
    description: 'Recognized for outstanding contributions to society and community development in Agra.',
  },
  {
    year: '2024',
    date: '18 October 2024',
    title: 'Braj Ratna Award',
    awardedBy: 'Incredible India Foundation (IIF)',
    category: 'Cultural and Social Excellence',
    image: '/images/awards/2024/braj-ratna-award.jpg',
    description: 'Honoured for cultural and social excellence and contributions to preserving the heritage of Braj region.',
  },
  {
    year: '2025',
    date: '23 March 2025',
    title: 'Sur Vidya Grand Finale Honour',
    awardedBy: 'Jinwani Channel',
    category: 'Special Guest Honour',
    image: '/images/awards/2025/sur-vidya-grand-finale-honour.jpg',
    description: 'Recognized as Special Guest of Honour at the Sur Vidya Grand Finale.',
  },
  {
    year: '2025',
    date: '28 March 2025',
    title: 'My Pride My Agra',
    awardedBy: 'Dainik Jagran Agra',
    category: 'Media Conclave Honour',
    image: '/images/awards/2025/my-pride-my-agra.jpg',
    description: 'Felicitated for contributions to Agra\'s growth and development at the Media Conclave.',
  },
  {
    year: '2025',
    date: '16 July 2025',
    title: 'Legend Award 2025',
    awardedBy: 'MSME Power Talk 2025',
    category: 'Industry Recognition',
    image: '/images/awards/2025/legend-award-2025.jpg',
    description: 'Recognized as an industry leader and legend in real estate development and entrepreneurship.',
  },
  {
    year: '2025',
    date: '12 August 2025',
    title: 'Chief Guest Honour',
    awardedBy: 'Haveniize Infratech Pvt. Ltd.',
    category: 'Guest of Honour',
    image: '/images/awards/2025/chief-guest-honour.jpg',
    description: 'Honoured as Chief Guest for expertise and contributions to the real estate and infrastructure sector.',
  },
  {
    year: '2025',
    date: '24 September 2025',
    title: 'Emerging Real Estate Developers 2025',
    awardedBy: 'Bharat 24 News Channel (Real Estate Conclave 2025)',
    category: 'Real Estate Excellence',
    image: '/images/awards/2025/emerging-real-estate-developers-2025.jpg',
    description: 'Recognized as emerging real estate developers driving innovation and excellence in the sector.',
  },
  {
    year: '2025',
    date: '26 November 2025',
    title: 'Zee News Conclave Honour',
    awardedBy: 'Zee News',
    category: 'Media Conclave Honour',
    image: '/images/awards/2025/zee-news-conclave-honour.jpg',
    description: 'Felicitated for outstanding contributions at the Zee News Media Conclave.',
  },
  {
    year: '2025',
    date: '13 December 2025',
    title: 'Real Estate Excellence Award',
    awardedBy: 'Zee Media (Global Innovation & Leadership Summit, London)',
    category: 'Design Excellence / Real Estate Excellence',
    image: '/images/awards/2025/real-estate-excellence-award-london.jpg',
    description: 'Honoured for real estate excellence and design innovation at the Global Innovation & Leadership Summit in London.',
  },
  {
    year: '2025',
    date: '30 December 2025',
    title: 'Agra Police Pride Felicitation (Special Guest / Supporter Honour)',
    awardedBy: 'Times of India Group',
    category: 'Community and Social Recognition',
    image: '/images/awards/2025/agra-police-pride-felicitation.jpg',
    description: 'Recognized as a supporter and contributor to community welfare and social causes.',
  },
  {
    year: '2026',
    date: '10 January 2026',
    title: '2nd All India Seminar Honour',
    awardedBy: 'All India Homeopathy Doctors Association',
    category: 'Special Guest Honour',
    image: '/images/awards/2026/all-india-homeopathy-seminar-honour.jpg',
    description: 'Honoured as Special Guest at the 2nd All India Seminar on Healthcare and Wellness.',
  },
  {
    year: '2026',
    date: '12 February 2026',
    title: 'Braj Ratna Alankaran Samman',
    awardedBy: 'Incredible India Foundation (In partnership with Bihar Governor\'s presence)',
    category: 'Cultural and Social Excellence',
    image: '/images/awards/2026/braj-ratna-alankaran-samman.jpg',
    description: 'Felicitated with the prestigious Braj Ratna Alankaran Samman for cultural and social excellence.',
  },
  {
    year: '2026',
    date: '22 February 2026',
    title: '14th Leaders Agra Awards 2026',
    awardedBy: 'Leaders Agra',
    category: 'Business Excellence',
    image: '/images/awards/2026/leaders-agra-awards-2026.jpg',
    description: 'Recognized for business excellence and leadership at the 14th Leaders Agra Awards.',
  },
  {
    year: '2026',
    date: '28 April 2026',
    title: 'My Pride, My Agra (Agra My Pride Conclave & Awards)',
    awardedBy: 'Dainik Jagran iNext',
    category: 'Media Conclave Honour',
    image: '/images/awards/2026/dainik-jagran-inext-my-pride-my-agra.jpg',
    description: 'Honoured for being a source of pride for Agra at the Agra My Pride Conclave & Awards.',
  },
  {
    year: '2026',
    date: '5 May 2026',
    title: 'Excellence in Real Estate',
    awardedBy: 'India–Sri Lanka Business Summit & Global Innovation Leadership Summit',
    category: 'Design Excellence / Real Estate Excellence',
    image: '/images/awards/2026/india-sri-lanka-real-estate-excellence.jpg',
    description: 'Recognized for excellence in real estate and innovation at the India–Sri Lanka Business Summit.',
  },
  {
    year: '2026',
    date: '6 June 2026',
    title: 'Kushal Netritva – Badhta Uttar Pradesh Conclave Honour',
    awardedBy: 'Bharat Update News Channel',
    category: 'Media Conclave Honour',
    image: '/images/awards/2026/bharat-update-badhta-up-conclave.jpg',
    description: 'Honoured for visionary leadership and contributions to Uttar Pradesh\'s growth at the Kushal Netritva Conclave.',
  },
  {
    year: '2026',
    date: '15 June 2026',
    title: 'Food Expo & Conclave 2026 Honour',
    awardedBy: 'Chamber of Food Processing Industries Association (CFPIA)',
    category: 'Business Excellence & Special Guest Honour',
    image: '/images/awards/2026/food-expo.jpeg',
    description: 'Felicitated at the 2nd edition of the Food Expo & Conclave 2026 in Agra — presented by CFPIA and supported by APEDA and the Ministry of MSME, Government of India.',
  },
]

// =============================================================
// EVENTS — launches, ground-breakings, customer events
// =============================================================
export const EVENTS = [
  {
    date: 'August 15, 2026',
    title: 'Ahinsa City Centre Mall, Firozabad — Grand Pre-Launch',
    location: 'Firozabad, Uttar Pradesh',
    type: 'Pre-Launch',
    images: [
      '/images/Events/2026-08-15/1.JPG',
      '/images/Events/2026-08-15/2.JPG',
      '/images/Events/2026-08-15/3.JPG',
      '/images/Events/2026-08-15/4.JPG',
      '/images/Events/2026-08-15/5.JPG',
      '/images/Events/2026-08-15/6.JPG',
      '/images/Events/2026-08-15/7.JPG',
      '/images/Events/2026-08-15/8.JPG',
      '/images/Events/2026-08-15/9.JPG',
      '/images/Events/2026-08-15/10.JPG',
      '/images/Events/2026-08-15/11.JPG',
      '/images/Events/2026-08-15/12.JPG',
      '/images/Events/2026-08-15/13.JPG',
      '/images/Events/2026-08-15/14.JPG',
      '/images/Events/2026-08-15/15.JPG',
      '/images/Events/2026-08-15/16.JPG',
      '/images/Events/2026-08-15/17.JPG',
      '/images/Events/2026-08-15/18.JPG',
      '/images/Events/2026-08-15/19.JPG',
      '/images/Events/2026-08-15/20.JPG',
      '/images/Events/2026-08-15/21.JPG',
      '/images/Events/2026-08-15/22.JPG',
      '/images/Events/2026-08-15/23.JPG',
      '/images/Events/2026-08-15/24.JPG',
      '/images/Events/2026-08-15/25.JPG',
      '/images/Events/2026-08-15/26.JPG',
      '/images/Events/2026-08-15/27.JPG',
      '/images/Events/2026-08-15/28.JPG',
      '/images/Events/2026-08-15/29.JPG',
      '/images/Events/2026-08-15/30.JPG',
      '/images/Events/2026-08-15/31.JPG',
      '/images/Events/2026-08-15/32.JPG',
      '/images/Events/2026-08-15/33.JPG',
      '/images/Events/2026-08-15/34.JPG',
      '/images/Events/2026-08-15/35.JPG',
      '/images/Events/2026-08-15/36.JPG',
    ],
    excerpt:
      'Grand pre-launch of Ahinsa City Centre Mall in Firozabad — the region’s next shopping and entertainment destination.',
  },
  {
    date: 'August 3, 2026',
    title: 'Ahinsa Office, Firozabad — Inauguration',
    location: 'Firozabad, Uttar Pradesh',
    type: 'Inauguration',
    images: [
      '/images/Events/2026-08-03/img1.jpg',
      '/images/Events/2026-08-03/img2.JPG',
      '/images/Events/2026-08-03/img3.JPG',
      '/images/Events/2026-08-03/img4.JPG',
      '/images/Events/2026-08-03/img5.JPG',
      '/images/Events/2026-08-03/img6.jpg',
      '/images/Events/2026-08-03/img7.jpg',
      '/images/Events/2026-08-03/img8.jpg',
    ],
    excerpt:
      'Inauguration of the Ahinsa Office in Firozabad — a new address for the group in western Uttar Pradesh.',
  },
  {
    date: 'July 8, 2026',
    title: 'Ahinsa Corporate Office, Gwalior — Inauguration',
    location: 'Gwalior, Madhya Pradesh',
    type: 'Inauguration',
    images: [
      '/images/Events/2026-07-08 - gwalior-office/img1.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img2.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img3.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img4.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img5.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img6.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img7.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img8.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img9.JPG',
      '/images/Events/2026-07-08 - gwalior-office/img10.jpg',
      '/images/Events/2026-07-08 - gwalior-office/img11.JPG',
    ],
    excerpt:
      'Inauguration of the Ahinsa Corporate Office in Gwalior — the group’s first address beyond Uttar Pradesh.',
  },
  {
    date: 'May 14, 2026',
    title: 'Developed for Saint — Vihasant Bhawan',
    location: 'Ahinsa The Grand Green Valley, Agra',
    type: 'Taking Blessings',
    images: [
      '/images/Events/2026-05-14 - vihasant-bhawan/05-05-2026-Vihasant-Bhawan1.jpg',
      '/images/Events/2026-05-14 - vihasant-bhawan/05-05-2026-Vihasant-Bhawan2.jpg',
      '/images/Events/2026-05-14 - vihasant-bhawan/05-05-2026-Vihasant-Bhawan3.jpg',
      '/images/Events/2026-05-14 - vihasant-bhawan/05-05-2026-Vihasant-Bhawan4.jpg',
    ],
    excerpt:
      'Vihasant Bhawan, developed and offered for the saint community at Ahinsa The Grand Green Valley.',
  },
  {
    date: 'March 13, 2026',
    title: 'Launching Rich Villa — with blessing of Guru Vijay Kaushal Ji',
    location: 'Ahinsa Green Valley Empire, Agra',
    type: 'Launching',
    images: [
      '/images/Events/2026-03-13 - rich-villa/img1.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img2.jpg',
      '/images/Events/2026-03-13 - rich-villa/img3.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img4.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img5.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img6.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img7.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img8.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img9.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img10.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img11.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img12.jpeg',
      '/images/Events/2026-03-13 - rich-villa/img13.jpeg',
    ],
    excerpt:
      'The Rich Villas at Ahinsa Green Valley Empire were launched with the blessings of Guru Vijay Kaushal Ji.',
  },
  {
    date: 'December 31, 2025',
    title: 'Devotional Evening — Kirti Kishori Ji',
    location: 'Agra',
    type: 'Cultural Evening',
    images: [
      '/images/Events/2025-12-31 - kirti-kishori/img1.jpg',
      '/images/Events/2025-12-31 - kirti-kishori/img2.jpg',
      '/images/Events/2025-12-31 - kirti-kishori/img3.jpg',
      '/images/Events/2025-12-31 - kirti-kishori/img4.jpg',
      '/images/Events/2025-12-31 - kirti-kishori/img5.jpg',
      '/images/Events/2025-12-31 - kirti-kishori/img6.jpg',
    ],
    excerpt:
      'A devotional evening with Kirti Kishori Ji, hosted for our residents, customers and well-wishers.',
  },
  {
    date: 'November 21, 2025',
    title: 'Launching New Office — RRR InfraZone PVT LTD',
    location: 'Ahinsa Green Valley Empire, Agra',
    type: 'Pujan',
    images: [
      '/images/Events/2025-11-21 - empire-office/img1.png',
      '/images/Events/2025-11-21 - empire-office/img2.jpg',
      '/images/Events/2025-11-21 - empire-office/img3.JPG',
      '/images/Events/2025-11-21 - empire-office/img4.jpg',
      '/images/Events/2025-11-21 - empire-office/img5.jpg',
      '/images/Events/2025-11-21 - empire-office/img6.JPG',
      '/images/Events/2025-11-21 - empire-office/img7.jpg',
    ],
    excerpt:
      'Pujan ceremony for the new RRR InfraZone Pvt Ltd office at Ahinsa Green Valley Empire.',
  },
  {
    date: 'September 28, 2025',
    title: 'Bhajan Sandhya',
    location: 'Agra',
    type: 'Cultural Evening',
    images: [
      '/images/Events/2025-09-28 - bhajan-sandhya/img1.JPG',
      '/images/Events/2025-09-28 - bhajan-sandhya/img2.JPG',
      '/images/Events/2025-09-28 - bhajan-sandhya/img3.JPG',
      '/images/Events/2025-09-28 - bhajan-sandhya/img4.JPG',
      '/images/Events/2025-09-28 - bhajan-sandhya/img5.JPG',
      '/images/Events/2025-09-28 - bhajan-sandhya/img6.JPG',
      '/images/Events/2025-09-28 - bhajan-sandhya/img7.JPG',
      '/images/Events/2025-09-28 - bhajan-sandhya/img8.JPG',
      '/images/Events/2025-09-28 - bhajan-sandhya/img9.JPG',
    ],
    excerpt:
      'An evening of devotional music and community celebration with our residents and guests.',
  },
  {
    date: 'August 15, 2025',
    title: 'Flag Hoisting — On All Our Projects',
    location: 'Agra',
    type: 'Independence Day',
    images: [
      '/images/Events/2025-08-15 - Independence-day/img1.JPG',
      '/images/Events/2025-08-15 - Independence-day/img2.jpg',
      '/images/Events/2025-08-15 - Independence-day/img3.jpg',
      '/images/Events/2025-08-15 - Independence-day/img4.JPG',
      '/images/Events/2025-08-15 - Independence-day/img5.JPG',
      '/images/Events/2025-08-15 - Independence-day/img6.JPG',
      '/images/Events/2025-08-15 - Independence-day/img7.JPG',
      '/images/Events/2025-08-15 - Independence-day/img8.jpg',
      '/images/Events/2025-08-15 - Independence-day/img9.JPG',
      '/images/Events/2025-08-15 - Independence-day/img10.JPG',
      '/images/Events/2025-08-15 - Independence-day/img11.JPG',
      '/images/Events/2025-08-15 - Independence-day/img12.jpg',
    ],
    excerpt:
      'We proudly celebrated Independence Day with great enthusiasm, honouring the spirit of freedom, unity, and the brave hearts who made it possible.',
  },
  {
    date: 'July 10, 2025',
    title: 'Opening Corporate Office — Ahinsa Complex',
    location: 'Ram Bagh, Agra',
    type: 'Pujan Gallery',
    images: [
      '/images/Events/2025-07-10 - ahinsa-complex/img1.jpg',
      '/images/Events/2025-07-10 - ahinsa-complex/img2.jpg',
      '/images/Events/2025-07-10 - ahinsa-complex/img3.JPG',
      '/images/Events/2025-07-10 - ahinsa-complex/img4.jpg',
      '/images/Events/2025-07-10 - ahinsa-complex/img5.JPG',
      '/images/Events/2025-07-10 - ahinsa-complex/img6.JPG',
      '/images/Events/2025-07-10 - ahinsa-complex/img7.jpg',
      '/images/Events/2025-07-10 - ahinsa-complex/img8.JPG',
    ],
    excerpt:
      'We are pleased to announce the opening of our new corporate office, marking a milestone in our journey toward growth, innovation, and excellence.',
  },
  {
    date: 'April 30, 2025',
    title: 'Grand Launch — Ahinsa Green Valley Empire',
    location: 'Mudi Crossing, Agra',
    type: 'Project Launch',
    images: [
      '/images/Events/2025-04-30 - empire-lauch/img1.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img2.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img3.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img4.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img5.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img6.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img7.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img8.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img9.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img10.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img11.JPG',
      '/images/Events/2025-04-30 - empire-lauch/img12.JPG',
    ],
    excerpt:
      'The launch of Ahinsa Green Valley Empire — a new-generation township of Rich Villas, residential and commercial plots.',
  },
  {
    date: 'January 26, 2025',
    title: 'Grand Launch — Ahinsa The Grand Green Valley',
    location: 'Fatehabad Road, Agra',
    type: 'Project Launch',
    images: [
      '/images/Events/2025-01-26 - grand-valley-launch/img1.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img2.jpg',
      '/images/Events/2025-01-26 - grand-valley-launch/img3.jpg',
      '/images/Events/2025-01-26 - grand-valley-launch/img4.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img5.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img6.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img7.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img8.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img9.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img10.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img11.jpg',
      '/images/Events/2025-01-26 - grand-valley-launch/img12.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img13.JPG',
      '/images/Events/2025-01-26 - grand-valley-launch/img14.JPG',
    ],
    excerpt:
      'Ahinsa The Grand Green Valley brings serene green living and modern luxury together, offering a peaceful, nature-inspired lifestyle for you.',
  },
]
