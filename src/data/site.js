// Centralized site content — replace placeholder text and image URLs
// with real data when available. Image URLs currently point to Unsplash
// placeholders; swap them with paths like
// "/images/projects/<slug>/hero.jpg" once you upload your own files.

export const COMPANY = {
  name: 'Ahinsa Group',
  city: 'Agra',
  tagline: 'Building Legacies, Crafting Lifestyles',
  founded: 2003,
  description:
    'Ahinsa Group Agra is a premier real estate developer dedicated to creating iconic residential and commercial landmarks across Agra and Firozabad. Our work is defined by architectural excellence, uncompromising quality and a deep respect for the cities we build in.',
  phone: '+91 12345 67890',
  email: 'info@ahinsagroupagra.com',
  address: 'Ahinsa Tower, Sanjay Place, Agra, Uttar Pradesh 282002',
}

export const STATS = [
  { value: '20+', label: 'Years of Excellence' },
  { value: '6+', label: 'Signature Projects' },
  { value: '50+', label: 'Acres Developed' },
  { value: '5K+', label: 'Happy Families' },
]

export const HERO_SLIDES = [
  {
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Iconic Landmarks',
    title: 'Crafting timeless\nlandmarks in Agra',
    subtitle: 'Residential and commercial spaces designed for those who appreciate the finer things.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=85&auto=format&fit=crop',
    eyebrow: 'Luxury Residences',
    title: 'Where every detail\nbecomes a legacy',
    subtitle: 'Premium homes thoughtfully designed for discerning families.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85&auto=format&fit=crop',
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
    type: 'Premium Residences',
    status: 'Ongoing',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85&auto=format&fit=crop',
    short:
      'Signature residences with resort-style amenities, set in a lush green community along Fatehabad Road.',
  },
  {
    slug: 'green-valley-empire',
    name: 'Ahinsa Green Valley Empire',
    location: 'Agra',
    type: 'Luxury Apartments',
    status: 'Ongoing',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85&auto=format&fit=crop',
    short:
      'Elegant high-rise apartments designed for families who value space, light and lifestyle.',
  },
  {
    slug: 'green-valley-township',
    name: 'Ahinsa Green Valley Township',
    location: 'Agra',
    type: 'Integrated Township',
    status: 'Completed',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop',
    short:
      'A flagship gated township with plotted developments, parks and lifestyle infrastructure.',
  },
  {
    slug: 'green-valley-orchid',
    name: 'Ahinsa Green Valley Orchid',
    location: 'Agra',
    type: 'Business Park',
    status: 'Ongoing',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop',
    short:
      'A premium business park with Grade A workspaces, retail edge and modern amenities.',
  },
  {
    slug: 'ahinsa-complex',
    name: 'Ahinsa Complex',
    location: 'Agra',
    type: 'Mixed-Use Commercial',
    status: 'Completed',
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format&fit=crop',
    short:
      'A landmark commercial complex blending retail, offices and services under one address.',
  },
  {
    slug: 'ahinsa-mall-firozabad',
    name: 'Ahinsa Mall Firozabad',
    location: 'Firozabad, UP',
    type: 'Retail & Multiplex',
    status: 'New Launch',
    image:
      'https://images.unsplash.com/photo-1519642918688-7e43b19245d8?w=1200&q=85&auto=format&fit=crop',
    short:
      'The next-generation shopping and entertainment destination for Firozabad and surrounding districts.',
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
    fullAddress: 'Fatehabad Road, near Saloni Oil, near Dauki, Kundol, Agra, Uttar Pradesh',
    type: 'Premium Residences',
    status: 'Ongoing',
    configurations: '2 & 3 BHK Apartments',
    unitArea: '930 - 1450 sq.ft.',
    totalArea: 'Sprawling green campus',
    possession: 'On Request',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85&auto=format&fit=crop',
    overviewImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85&auto=format&fit=crop',
    ],
    overview: [
      'Set along the prestigious Fatehabad Road in Kundol, Ahinsa The Grand Green Valley is a thoughtfully planned residential community that combines the calm of a green campus with the energy of one of Agra\u2019s fastest-growing corridors.',
      'Every residence has been designed to maximize natural light, ventilation and views \u2014 with floor plans that suit both nuclear and joint families. Wide internal driveways, landscaped pockets and resort-style amenities make daily life feel like a getaway.',
      'From the moment you arrive at the grand entrance arch to the moment you step into your home, the experience is engineered to feel like a permanent celebration.',
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
      { icon: 'Zap', name: 'Power Backup' },
      { icon: 'Car', name: 'Covered Parking' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Camera', name: 'CCTV Surveillance' },
      { icon: 'Droplet', name: 'Water Treatment' },
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
    floorPlans: [
      { config: '2 BHK', area: '930 \u2013 1080 sq.ft.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85&auto=format&fit=crop' },
      { config: '3 BHK', area: '1280 \u2013 1450 sq.ft.', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=85&auto=format&fit=crop' },
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

  'green-valley-empire': {
    name: 'Ahinsa Green Valley Empire',
    tagline: 'A modern address for those who lead with confidence.',
    location: 'Agra',
    fullAddress: 'Ahinsa Green Valley Empire, Agra, Uttar Pradesh',
    type: 'Luxury Apartments',
    status: 'Ongoing',
    configurations: '2, 3 & 3.5 BHK Apartments',
    unitArea: '1100 - 1850 sq.ft.',
    totalArea: 'Premium urban campus',
    possession: 'On Request',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=85&auto=format&fit=crop',
    overviewImage:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=85&auto=format&fit=crop',
    ],
    overview: [
      'Ahinsa Green Valley Empire is a refined collection of luxury apartments crafted for the modern Agra family. Generous floor plates, double-height entrance lobbies and balconies that frame the skyline give every home an unmistakable sense of arrival.',
      'The community has been planned around walkability \u2014 with a central podium connecting tower to tower, and amenities scattered like discoveries across the landscape.',
      'It is a home for those who have built their success quietly and want a setting that reflects it without shouting about it.',
    ],
    highlights: [
      { icon: 'Sparkles', title: 'Refined Interiors', text: 'High ceilings, premium fittings and finishes throughout the home.' },
      { icon: 'Sun', title: 'Light & Ventilation', text: 'Cross-ventilated layouts with abundant natural light in every room.' },
      { icon: 'Layers', title: 'Podium Living', text: 'Multi-level podium with curated amenities and landscaped decks.' },
      { icon: 'ShieldCheck', title: 'Smart Security', text: 'Multi-tier security with smart access for residents and visitors.' },
    ],
    amenities: [
      { icon: 'Waves', name: 'Infinity Pool' },
      { icon: 'Dumbbell', name: 'State-of-the-art Gym' },
      { icon: 'Users', name: 'Grand Clubhouse' },
      { icon: 'Trees', name: 'Themed Gardens' },
      { icon: 'Baby', name: 'Kids Zone' },
      { icon: 'Activity', name: 'Yoga Pavilion' },
      { icon: 'Music', name: 'Banquet Hall' },
      { icon: 'Trophy', name: 'Sports Court' },
      { icon: 'Zap', name: '100% Power Backup' },
      { icon: 'Car', name: 'Two-Tier Parking' },
      { icon: 'Coffee', name: 'Cafe Lounge' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
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
    floorPlans: [
      { config: '2 BHK', area: '1100 \u2013 1250 sq.ft.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85&auto=format&fit=crop' },
      { config: '3 BHK', area: '1450 \u2013 1650 sq.ft.', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=85&auto=format&fit=crop' },
      { config: '3.5 BHK', area: '1750 \u2013 1850 sq.ft.', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=85&auto=format&fit=crop' },
    ],
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
    fullAddress: 'Ahinsa Green Valley Township, Agra, Uttar Pradesh',
    type: 'Integrated Township',
    status: 'Completed',
    configurations: 'Plotted Development &middot; Villas &middot; Apartments',
    unitArea: 'Plot sizes 100 sq.yd. and above',
    totalArea: 'Sprawling integrated community',
    possession: 'Ready',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85&auto=format&fit=crop',
    overviewImage:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=85&auto=format&fit=crop',
    ],
    overview: [
      'Ahinsa Green Valley Township is the flagship gated community that helped redefine premium living in Agra. Wide tree-lined avenues, planned plots and a built-in lifestyle infrastructure make this address a benchmark for what an integrated township can be.',
      'Generations of families have grown up here \u2014 walking to the central park, meeting neighbours at the clubhouse and watching the city evolve around them.',
      'Today, the township remains a fully ready, fully resident community with strong appreciation, vibrant social fabric and one of the most recognized addresses Ahinsa has built.',
    ],
    highlights: [
      { icon: 'Trees', title: 'Green Belts', text: 'Wide internal greens, tree-lined avenues and central park areas.' },
      { icon: 'Layout', title: 'Planned Plots', text: 'Vaastu-compliant plot orientations with clear demarcation.' },
      { icon: 'ShieldCheck', title: 'Gated Security', text: 'Boundary wall, single entry point and round-the-clock guards.' },
      { icon: 'Building2', title: 'Lifestyle Infra', text: 'Clubhouse, sports facilities and community spaces inside the township.' },
    ],
    amenities: [
      { icon: 'Trees', name: 'Central Park' },
      { icon: 'Users', name: 'Community Clubhouse' },
      { icon: 'Trophy', name: 'Sports Courts' },
      { icon: 'Baby', name: "Children's Play Area" },
      { icon: 'Activity', name: 'Walking & Jogging Tracks' },
      { icon: 'Waves', name: 'Swimming Pool (Club)' },
      { icon: 'Droplet', name: 'Underground Water Supply' },
      { icon: 'Zap', name: 'Underground Electrification' },
      { icon: 'Car', name: 'Wide Internal Roads' },
      { icon: 'ShieldCheck', name: 'Gated Security' },
      { icon: 'Camera', name: 'CCTV Surveillance' },
      { icon: 'Sun', name: 'Streetlight Network' },
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
    floorPlans: [
      { config: '100 sq.yd. plot', area: 'Compact family plot', image: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=85&auto=format&fit=crop' },
      { config: '200 sq.yd. plot', area: 'Premium family plot', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85&auto=format&fit=crop' },
    ],
    locationAdvantages: [
      { place: 'Schools', distance: 'Within township &amp; nearby', type: 'Education' },
      { place: 'Hospitals', distance: 'Easy reach', type: 'Healthcare' },
      { place: 'Markets &amp; convenience', distance: 'Walking distance', type: 'Retail' },
      { place: 'Public transport', distance: 'On main road', type: 'Transit' },
      { place: 'Highway connectivity', distance: 'Direct', type: 'Highway' },
      { place: 'Heritage circuit', distance: 'Within Agra', type: 'Heritage' },
    ],
  },

  'green-valley-orchid': {
    name: 'Ahinsa Green Valley Orchid',
    tagline: 'A premium business address engineered for the next decade.',
    location: 'Agra',
    fullAddress: 'Ahinsa Green Valley Orchid, Agra, Uttar Pradesh',
    type: 'Business Park',
    status: 'Ongoing',
    configurations: 'Office Suites &middot; Retail &middot; Showrooms',
    unitArea: '350 - 4000 sq.ft.',
    totalArea: 'Premium commercial campus',
    possession: 'On Request',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85&auto=format&fit=crop',
    overviewImage:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop',
    ],
    overview: [
      'Ahinsa Green Valley Orchid is a premium business park designed around how modern enterprises actually work \u2014 flexibly, collaboratively and with an eye on long-term efficiency.',
      'Efficient floor plates, double-height lobbies, high-speed elevators and a smart parking strategy combine to create a workplace that feels effortlessly productive.',
      'A dedicated retail edge brings cafes, dining and convenience services into the campus \u2014 so your team and your clients never have to leave for the basics.',
    ],
    highlights: [
      { icon: 'Building2', title: 'Grade A Workspaces', text: 'Efficient floor plates with column-free interiors for flexible layouts.' },
      { icon: 'Zap', title: 'Power & Backup', text: '100% DG backup, dual-source power feeds and energy-efficient systems.' },
      { icon: 'Wifi', title: 'Future-ready Tech', text: 'Pre-provisioned for high-speed connectivity, smart access and BMS.' },
      { icon: 'Car', title: 'Smart Parking', city: 'Agra', text: 'Multi-level parking with intelligent management and EV-ready bays.' },
    ],
    amenities: [
      { icon: 'Building2', name: 'Double-Height Lobby' },
      { icon: 'Zap', name: '100% DG Backup' },
      { icon: 'Wifi', name: 'High-Speed Internet' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Camera', name: 'CCTV Surveillance' },
      { icon: 'Coffee', name: 'On-Campus Cafe' },
      { icon: 'Utensils', name: 'Food Court' },
      { icon: 'Car', name: 'Multi-Level Parking' },
      { icon: 'Layers', name: 'High-Speed Elevators' },
      { icon: 'Droplet', name: 'Water Treatment Plant' },
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
    floorPlans: [
      { config: 'Office Suite', area: '350 \u2013 1200 sq.ft.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85&auto=format&fit=crop' },
      { config: 'Showroom', area: '800 \u2013 2500 sq.ft.', image: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200&q=85&auto=format&fit=crop' },
      { config: 'Anchor Floor Plate', area: '3000 \u2013 4000 sq.ft.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85&auto=format&fit=crop' },
    ],
    locationAdvantages: [
      { place: 'Sanjay Place', distance: 'Quick reach', type: 'Commercial' },
      { place: 'Hotels &amp; restaurants', distance: 'Nearby', type: 'Hospitality' },
      { place: 'Banking &amp; financial', distance: 'Cluster nearby', type: 'BFSI' },
      { place: 'Highway access', distance: 'Direct', type: 'Highway' },
      { place: 'Railway station', distance: 'Easy connect', type: 'Transit' },
      { place: 'Airport', distance: 'Easy connect', type: 'Transit' },
    ],
  },

  'ahinsa-complex': {
    name: 'Ahinsa Complex',
    tagline: 'A landmark mixed-use complex at the heart of the city.',
    location: 'Agra',
    fullAddress: 'Ahinsa Complex, Agra, Uttar Pradesh',
    type: 'Mixed-Use Commercial',
    status: 'Completed',
    configurations: 'Retail &middot; Offices &middot; Services',
    unitArea: '200 - 2500 sq.ft.',
    totalArea: 'Established commercial address',
    possession: 'Ready',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    hero: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&auto=format&fit=crop',
    overviewImage:
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop',
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
    amenities: [
      { icon: 'Building2', name: 'Multiple Lifts' },
      { icon: 'Zap', name: 'Power Backup' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Camera', name: 'CCTV Surveillance' },
      { icon: 'Car', name: 'On-Site Parking' },
      { icon: 'Droplet', name: 'Water Supply' },
      { icon: 'Coffee', name: 'F&amp;B Tenants' },
      { icon: 'Store', name: 'Retail Mix' },
      { icon: 'Users', name: 'Common Areas' },
      { icon: 'Sun', name: 'Well-Lit Common Areas' },
      { icon: 'Activity', name: 'Active Footfall' },
      { icon: 'MapPin', name: 'Prime Address' },
    ],
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
    floorPlans: [
      { config: 'Retail Shop', area: '200 \u2013 600 sq.ft.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85&auto=format&fit=crop' },
      { config: 'Office', area: '500 \u2013 1500 sq.ft.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85&auto=format&fit=crop' },
      { config: 'Showroom', area: '1500 \u2013 2500 sq.ft.', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=85&auto=format&fit=crop' },
    ],
    locationAdvantages: [
      { place: 'Main commercial belt', distance: 'On site', type: 'Commercial' },
      { place: 'Banks &amp; ATMs', distance: 'Within walking distance', type: 'BFSI' },
      { place: 'Restaurants', distance: 'Nearby', type: 'Hospitality' },
      { place: 'Public transport', distance: 'On main road', type: 'Transit' },
      { place: 'Residential catchment', distance: 'Surrounds the project', type: 'Residential' },
      { place: 'Heritage tourism circuit', distance: 'Within Agra', type: 'Heritage' },
    ],
  },

  'ahinsa-mall-firozabad': {
    name: 'Ahinsa Mall Firozabad',
    tagline: 'The next-generation shopping and entertainment destination for Firozabad.',
    location: 'Firozabad, UP',
    fullAddress: 'Ahinsa Mall, Firozabad, Uttar Pradesh',
    type: 'Retail &amp; Multiplex',
    status: 'New Launch',
    configurations: 'Anchor Retail &middot; Hi-Street &middot; Multiplex &middot; Food Court',
    unitArea: '180 - 5000+ sq.ft.',
    totalArea: 'Regional shopping &amp; entertainment hub',
    possession: 'On Request',
    priceRange: 'On Request',
    rera: { number: 'UP-RERA Reg. No. — TBD', link: '#' },
    hero: 'https://images.unsplash.com/photo-1519642918688-7e43b19245d8?w=1920&q=85&auto=format&fit=crop',
    overviewImage:
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1567449303078-57ad995bd17a?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd17a?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=85&auto=format&fit=crop',
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
      { icon: 'Car', name: 'Multi-Level Parking' },
      { icon: 'Zap', name: '100% Power Backup' },
      { icon: 'Wifi', name: 'Free Wi-Fi' },
      { icon: 'ShieldCheck', name: '24x7 Security' },
      { icon: 'Camera', name: 'CCTV Surveillance' },
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
    floorPlans: [
      { config: 'Kiosk', area: '~ 80 \u2013 180 sq.ft.', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=85&auto=format&fit=crop' },
      { config: 'Hi-Street Shop', area: '~ 200 \u2013 600 sq.ft.', image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17a?w=1200&q=85&auto=format&fit=crop' },
      { config: 'Anchor Store', area: '~ 2500 \u2013 5000 sq.ft.', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=85&auto=format&fit=crop' },
    ],
    locationAdvantages: [
      { place: 'City centre &amp; main markets', distance: 'Quick reach', type: 'Retail' },
      { place: 'Schools &amp; colleges', distance: 'Nearby', type: 'Education' },
      { place: 'Residential catchments', distance: 'High-density around site', type: 'Residential' },
      { place: 'Highway / NH access', distance: 'Direct', type: 'Highway' },
      { place: 'Bus stand', distance: 'Easy connect', type: 'Transit' },
      { place: 'Railway station', distance: 'Easy connect', type: 'Transit' },
    ],
  },
}

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

export const TESTIMONIALS = [
  {
    name: 'Rohit Agarwal',
    role: 'Resident, The Grand Green Valley',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&q=85&auto=format&fit=crop',
    quote:
      'Moving into an Ahinsa home meant moving into a lifestyle. The attention to detail in every corner reflects true craftsmanship.',
  },
  {
    name: 'Priya Sharma',
    role: 'Owner, Green Valley Empire',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&q=85&auto=format&fit=crop',
    quote:
      'The home exceeded every expectation. The team was transparent, responsive and genuinely committed to delivering excellence.',
  },
  {
    name: 'Arjun Mehra',
    role: 'Tenant, Green Valley Orchid',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&q=85&auto=format&fit=crop',
    quote:
      'A workspace that inspires our team every day. Modern, well-managed and truly Grade A in every sense.',
  },
  {
    name: 'Sneha Kapoor',
    role: 'Resident, Green Valley Township',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&q=85&auto=format&fit=crop',
    quote:
      'Our family found more than a home, we found a community. Ahinsa truly delivers what they promise.',
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

export const LEADERSHIP = [
  {
    name: 'Mr. Rakesh Jain',
    role: 'Chairman & Managing Director',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85&auto=format&fit=crop',
    bio: 'A visionary leader with three decades of experience steering Ahinsa Group toward architectural excellence and sustained growth.',
  },
  {
    name: 'Mrs. Anita Jain',
    role: 'Executive Director',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85&auto=format&fit=crop',
    bio: 'Drives strategic vision and customer experience initiatives across all verticals of the group.',
  },
  {
    name: 'Mr. Aarav Jain',
    role: 'Director, Projects',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85&auto=format&fit=crop',
    bio: 'Leads project execution, ensuring quality and timely delivery across the portfolio.',
  },
  {
    name: 'Mr. Vikram Sethi',
    role: 'Chief Financial Officer',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=85&auto=format&fit=crop',
    bio: "Architects the financial backbone enabling the group's ambitious roadmap.",
  },
]

export const MILESTONES = [
  { year: '2003', title: 'The Foundation', text: 'Ahinsa Group is founded in Agra with a vision to redefine real estate in the city.' },
  { year: '2008', title: 'First Iconic Project', text: 'Successful delivery of our first signature residential development.' },
  { year: '2013', title: 'Commercial Expansion', text: 'Ventured into premium commercial developments with Ahinsa Complex.' },
  { year: '2018', title: 'Township Era', text: 'Launched our first integrated township redefining urban living.' },
  { year: '2022', title: 'Sustainability Pledge', text: 'Committed to green-certified construction across all upcoming projects.' },
  { year: '2026', title: 'Building Tomorrow', text: 'Multi-city expansion with the launch of Ahinsa Mall Firozabad and new residential addresses.' },
]


// =============================================================
// MANAGEMENT — Board / Senior Leadership (deep profiles)
// =============================================================
export const MANAGEMENT = [
  {
    name: 'Mr. Rakesh Jain',
    role: 'Chairman & Managing Director',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=85&auto=format&fit=crop',
    short:
      'A visionary leader with three decades of experience steering Ahinsa Group toward architectural excellence and sustained growth.',
    bio: [
      'Mr. Rakesh Jain founded Ahinsa Group with a single-minded belief that real estate, done right, has the power to transform the way a city lives. Over the last two decades, that belief has translated into one of the most respected names in Agra real estate.',
      'His emphasis on transparent dealings, on-time delivery and customer trust shapes every decision the company takes \u2014 from land acquisition to handover.',
      'Today, under his leadership, the group continues to expand thoughtfully across residential, commercial and lifestyle segments, while staying true to the core values it was founded on.',
    ],
    achievements: [
      'Founder, Ahinsa Group',
      '30+ years in real estate',
      'Multiple industry recognitions for design and trust',
    ],
  },
  {
    name: 'Mrs. Anita Jain',
    role: 'Executive Director',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85&auto=format&fit=crop',
    short:
      'Drives strategic vision and customer experience initiatives across all verticals of the group.',
    bio: [
      'Mrs. Anita Jain plays a central role in shaping the group\u2019s long-term direction, with a particular focus on customer experience, brand and people.',
      'Her insistence on detail and craftsmanship is reflected in everything from the lobbies of our towers to the way our concierge teams welcome every visitor.',
      'She is widely credited for the empathetic, family-first culture that defines life at Ahinsa.',
    ],
    achievements: [
      'Executive Director',
      'Lead, Customer Experience & Brand',
      'Patron, in-house design philosophy',
    ],
  },
  {
    name: 'Mr. Aarav Jain',
    role: 'Director, Projects',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=85&auto=format&fit=crop',
    short:
      'Leads project execution, ensuring quality and timely delivery across the portfolio.',
    bio: [
      'Mr. Aarav Jain is the driving force behind on-ground execution at Ahinsa, working closely with consultants, contractors and site teams to ensure every project hits its quality, safety and timeline targets.',
      'A firm believer in process discipline, he has championed the adoption of modern construction methods, digital tracking and stringent third-party audits across our sites.',
      'His leadership ensures that the promise made at the time of booking is the experience delivered at handover.',
    ],
    achievements: [
      'Director, Projects',
      'Lead, Site Execution & Quality',
      'Champion, Construction Technology adoption',
    ],
  },
  {
    name: 'Mr. Vikram Sethi',
    role: 'Chief Financial Officer',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=85&auto=format&fit=crop',
    short:
      "Architects the financial backbone enabling the group's ambitious roadmap.",
    bio: [
      'Mr. Vikram Sethi oversees the financial strategy, capital allocation and compliance landscape of the group.',
      'Under his stewardship, Ahinsa has built a strong, conservative financial base that allows for ambitious growth without compromising on the trust customers and partners place in the group.',
      'He works closely with banking and capital-markets partners to ensure long-term financial resilience.',
    ],
    achievements: [
      'Chief Financial Officer',
      'Lead, Capital Strategy & Compliance',
      'Architect, Long-term Financial Roadmap',
    ],
  },
]

// =============================================================
// TEAM MEMBERS — Operating leadership across functions
// =============================================================
export const TEAM_MEMBERS = [
  {
    name: 'Mr. Sandeep Verma',
    role: 'Head, Sales & Marketing',
    department: 'Sales & Marketing',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&auto=format&fit=crop',
    bio: 'Leads pre-sales, channel partnerships and brand campaigns across all active projects.',
  },
  {
    name: 'Mrs. Pooja Saxena',
    role: 'Head, Customer Experience',
    department: 'Customer Experience',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85&auto=format&fit=crop',
    bio: 'Anchors the post-booking journey, ensuring every customer feels heard and supported.',
  },
  {
    name: 'Mr. Anil Chauhan',
    role: 'Head, Construction',
    department: 'Construction',
    image:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&q=85&auto=format&fit=crop',
    bio: 'Oversees site execution, contractor coordination and on-site quality control.',
  },
  {
    name: 'Ar. Megha Tiwari',
    role: 'Principal Architect',
    department: 'Design',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=85&auto=format&fit=crop',
    bio: 'Drives the architectural language and design ethos across the portfolio.',
  },
  {
    name: 'Mr. Devansh Gupta',
    role: 'Head, Engineering',
    department: 'Engineering',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=85&auto=format&fit=crop',
    bio: 'Ensures structural integrity, MEP coordination and technical excellence on every site.',
  },
  {
    name: 'Mrs. Ritika Sharma',
    role: 'Head, Legal & Compliance',
    department: 'Legal',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=85&auto=format&fit=crop',
    bio: 'Leads regulatory compliance, RERA filings and contract negotiations group-wide.',
  },
  {
    name: 'Mr. Karan Malhotra',
    role: 'Head, Finance & Accounts',
    department: 'Finance',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85&auto=format&fit=crop',
    bio: 'Manages financial planning, audits and treasury operations across the group.',
  },
  {
    name: 'Ms. Nidhi Bansal',
    role: 'Head, Human Resources',
    department: 'Human Resources',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=85&auto=format&fit=crop',
    bio: 'Builds the people and culture practice that holds the group together.',
  },
  {
    name: 'Mr. Imran Khan',
    role: 'Head, Procurement',
    department: 'Procurement',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=85&auto=format&fit=crop',
    bio: 'Sources materials and partners that meet our uncompromising quality standards.',
  },
  {
    name: 'Ms. Aditi Rao',
    role: 'Head, Brand & Communications',
    department: 'Brand',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=85&auto=format&fit=crop',
    bio: 'Crafts the Ahinsa brand voice across digital, print and on-ground channels.',
  },
  {
    name: 'Mr. Rohan Kapoor',
    role: 'Head, Information Technology',
    department: 'Technology',
    image:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=85&auto=format&fit=crop',
    bio: 'Drives the digital backbone \u2014 from CRM to construction tech \u2014 across the group.',
  },
  {
    name: 'Mr. Yash Tomar',
    role: 'Head, Strategic Partnerships',
    department: 'Partnerships',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=85&auto=format&fit=crop',
    bio: 'Forges relationships with brands, anchors and institutional partners.',
  },
]

// =============================================================
// AWARDS & RECOGNITION
// =============================================================
export const AWARDS = [
  {
    year: '2026',
    title: 'Excellence in Architectural Design',
    awardedBy: 'Real Estate Excellence Awards',
    category: 'Design Excellence',
    image:
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1200&q=85&auto=format&fit=crop',
    description:
      'Recognized for two decades of architectural innovation and an unwavering commitment to design integrity across the portfolio.',
  },
  {
    year: '2025',
    title: 'Best Integrated Township in North India',
    awardedBy: 'India Realty Awards',
    category: 'Township',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85&auto=format&fit=crop',
    description:
      'Honoured for the Green Valley Township, celebrated as a benchmark of planned, gated community living in the region.',
  },
  {
    year: '2025',
    title: 'Most Trusted Builder \u2014 Agra',
    awardedBy: 'Times Real Estate Conclave',
    category: 'Customer Trust',
    image:
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1200&q=85&auto=format&fit=crop',
    description:
      'Awarded for sustained customer trust, on-time delivery and transparent practices over multiple project cycles.',
  },
  {
    year: '2024',
    title: 'Iconic Commercial Project of the Year',
    awardedBy: 'NCR Real Estate Excellence Awards',
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=85&auto=format&fit=crop',
    description:
      'Recognized for the Ahinsa Complex \u2014 a fully ready, fully occupied commercial landmark in the heart of the city.',
  },
  {
    year: '2024',
    title: 'Sustainability Champion',
    awardedBy: 'Green Building Council India',
    category: 'Sustainability',
    image:
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=85&auto=format&fit=crop',
    description:
      'Acknowledged for the early adoption of green building practices and sustainable construction techniques.',
  },
  {
    year: '2023',
    title: 'Emerging Developer of the Year',
    awardedBy: 'Tier-2 Cities Realty Summit',
    category: 'Developer of the Year',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=85&auto=format&fit=crop',
    description:
      'Felicitated for category-leading work in tier-2 cities and a portfolio that combines scale with refinement.',
  },
]

// =============================================================
// EVENTS — launches, ground-breakings, customer events
// =============================================================
export const EVENTS = [
  {
    date: 'May 25, 2026',
    title: 'Grand Launch \u2014 Ahinsa Mall Firozabad',
    location: 'Firozabad, UP',
    type: 'Project Launch',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85&auto=format&fit=crop',
    excerpt:
      'A red-carpet launch event introducing the city\u2019s first integrated retail and entertainment destination, attended by industry leaders and dignitaries.',
  },
  {
    date: 'April 12, 2026',
    title: 'Sales Gallery Opening \u2014 The Grand Green Valley',
    location: 'Fatehabad Road, Agra',
    type: 'Sales Gallery',
    image:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=85&auto=format&fit=crop',
    excerpt:
      'A walkthrough experience of the project with full-scale show apartments, material library and immersive 3D walkthroughs.',
  },
  {
    date: 'March 02, 2026',
    title: 'Ground-Breaking \u2014 Green Valley Empire',
    location: 'Agra',
    type: 'Bhoomi Pujan',
    image:
      'https://images.unsplash.com/photo-1581094488379-bf7a25ab2c3a?w=1200&q=85&auto=format&fit=crop',
    excerpt:
      'A traditional Bhoomi Pujan ceremony marking the start of construction at our flagship luxury residential address.',
  },
  {
    date: 'February 09, 2026',
    title: 'Customer Meet \u2014 Diwali Celebrations',
    location: 'Ahinsa Complex, Agra',
    type: 'Community',
    image:
      'https://images.unsplash.com/photo-1481653125770-b78c206c59d4?w=1200&q=85&auto=format&fit=crop',
    excerpt:
      'A festive evening with our resident families, featuring cultural performances, dinner and recognition of long-standing customers.',
  },
  {
    date: 'January 18, 2026',
    title: 'Channel Partner Conclave 2026',
    location: 'Agra',
    type: 'Partnerships',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85&auto=format&fit=crop',
    excerpt:
      'Bringing together our wider channel partner network for a day of strategy, recognition and project previews.',
  },
  {
    date: 'November 30, 2025',
    title: 'Architectural Symposium \u2014 Designing for Tier-2',
    location: 'Ahinsa Tower, Agra',
    type: 'Industry Event',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85&auto=format&fit=crop',
    excerpt:
      'A panel discussion exploring how design and planning need to evolve for fast-growing tier-2 cities.',
  },
]
