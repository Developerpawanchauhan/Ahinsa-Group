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
    'Ahinsa Group Agra is a premier real estate developer dedicated to creating iconic residential and commercial landmarks across Agra and Firozabad. Our work is defined by architectural excellence, uncompromising quality and a deep respect for the cities we build in.',
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
    image: '/images/home/hero/slide-3.jpg',
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
    image: '/images/projects/green-valley-orchid/card.png',
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
  // {
  //   slug: 'ahinsa-mall-firozabad',
  //   name: 'Ahinsa Mall Firozabad',
  //   location: 'Firozabad, UP',
  //   type: 'Hi-Street Luxury Mall',
  //   status: 'Upcoming',
  //   image: '/images/projects/ahinsa-mall-firozabad/card.png',
  //   short:
  //     'The next-generation shopping and entertainment destination for Firozabad and surrounding districts.',
  // },
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
    type: 'Luxury Township',
    status: 'Ongoing',
    configurations: 'Residential & Commercial Plots · Grand Villas · Farm House',
    unitArea: '111.11 · 138.88 · 166.66 · 200 sq yard',
    totalArea: 'Sprawling green campus',
    possession: 'On Request',
    priceRange: 'On Request',
    mapEmbed: 'https://www.google.com/maps?q=27.0900026,78.1799518&output=embed',
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
    fullAddress: 'Mudi Crossing, Agra',
    type: 'Luxury Township',
    status: 'Ongoing',
    configurations: 'Residential & Commercial Plots · Farm House',
    unitArea: '111.11 · 138.88 · 166.66 · 200 sq yard',
    totalArea: 'Premium urban campus',
    possession: 'On Request',
    priceRange: 'On Request',
    mapEmbed: 'https://www.google.com/maps?q=27.2736831,78.0959693&output=embed',
    hero: '/images/home/hero/slide-3.jpg',
    overviewImage: '/images/projects/green-valley-empire/rich-villa.jpg',
    gallery: [
      '/images/projects/green-valley-empire/card.jpg',
      '/images/projects/green-valley-empire/rich-villa.jpg',
      '/images/projects/green-valley-empire/villa.jpg',
      '/images/projects/green-valley-empire/fountain.jpg',
      '/images/projects/green-valley-empire/office.jpg',
      '/images/projects/green-valley-empire/gym.jpg',
      
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
    type: 'Luxury Township',
    status: 'Ongoing',
    configurations: 'Residential & Commercial Plots',
    unitArea: '111.11 · 138.88 sq yard',
    totalArea: 'Sprawling integrated community',
    possession: 'Ready',
    priceRange: 'On Request',
    mapEmbed: 'https://www.google.com/maps?q=27.2322074,78.17292&output=embed',
    hero: '/images/home/hero/slide-2.jpg',
    overviewImage: '/images/projects/green-valley-township/gv-gate.jpg',
    gallery: [
      '/images/projects/green-valley-township/card.jpg',
      '/images/projects/green-valley-township/gv-mall.jpg',
      '/images/projects/green-valley-township/gv-office.jpg',
      '/images/projects/green-valley-township/gv-vsps.jpg',
      '/images/projects/green-valley-township/gv-boundary-wall.jpg',
      '/images/projects/green-valley-township/kidzon.jpg',
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
    type: 'Residential Plots',
    status: 'Ongoing',
    configurations: 'Residential & Commercial Plots',
    unitArea: '111.11 · 130.55 · 133.33 · 138.88 · 152.77 sq yard',
    totalArea: 'Premium commercial campus',
    possession: 'On Request',
    priceRange: 'On Request',
  
    mapEmbed: 'https://www.google.com/maps?q=27.2322074,78.17292&output=embed',
    hero: '/images/projects/green-valley-orchid/card.png',
    overviewImage: '/images/projects/green-valley-orchid/card.png',
    gallery: [],
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
      '/images/projects/ahinsa-complex/office1.jpeg',
      '/images/projects/ahinsa-complex/office2.jpeg',
      '/images/projects/ahinsa-complex/office3.jpeg',
      '/images/projects/ahinsa-complex/office4.jpeg',
      '/images/projects/ahinsa-complex/office5.jpeg',
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


export const MILESTONES = [
  { year: '2023', title: 'Ahinsa Green Valley Township', text: 'Launched our flagship integrated township at Kuberpur, Agra — offering premium Residential & Commercial Plots across a well-planned, green-centric community with wide roads and modern infrastructure.' },
  { year: '2024', title: 'Ahinsa The Grand Green Valley', text: 'Unveiled the Grand Green Valley on Fatehabad Road, Agra — a landmark luxury township steps from the Taj Mahal, featuring Grand Villas, Residential & Commercial Plots and Farm Houses amidst lush landscapes.' },
  { year: '2025', title: 'Ahinsa Green Valley Empire', text: 'Launched Green Valley Empire at Mudi Crossing, Agra — a premium township offering Rich Villas, Residential & Commercial Plots and Farm Houses crafted for families who value space, elegance and long-term growth.' },
  { year: '2025', title: 'Ahinsa Green Valley Orchid', text: 'Introduced Green Valley Orchid at Kuberpur, Agra — a thoughtfully designed residential destination offering premium plots and villas in a nature-integrated setting with excellent connectivity.' },
  { year: '2025', title: 'Ahinsa Complex — Fully Developed', text: 'Completed the full development of Ahinsa Complex at Ram Bagh, Agra — a vibrant mixed-use landmark combining street-level retail with professional office spaces, now fully operational and occupied.' },
  { year: '2026', title: 'Ahinsa The Grand Square Mall', text: 'Broke ground on Ahinsa The Grand Square Mall in Firozabad — the region\'s most ambitious retail and entertainment destination featuring anchor brands, a multiplex cinema, a grand food court and a signature central atrium.' },
]


// =============================================================
// MANAGEMENT — Board / Senior Leadership (deep profiles)
// =============================================================
export const MANAGEMENT = [
  {
    name: 'Mr. Rohit Jain',
    role: 'Managing Director',
    image: '/images/Team/rohit-jain.jpg',
    short:
      'Visionary leader steering Ahinsa Group toward architectural excellence and sustained growth.',
    bio: [
      'Mr. Rohit Jain leads Ahinsa Group with a commitment to real estate excellence that transforms the way cities live. His vision is rooted in transparent dealings, on-time delivery and unwavering customer trust.',
      'His emphasis on quality craftsmanship and integrity shapes every decision the company takes — from land acquisition to handover.',
      'Under his leadership, Ahinsa Group continues to expand thoughtfully across residential, commercial and lifestyle segments, staying true to the core values it was built upon.',
    ],
    achievements: [
      'Managing Director',
      'Visionary Leadership',
      'Multiple industry recognitions for excellence',
    ],
  },
  {
    name: 'Mr. Rachit Jain',
    role: 'Chief Executive Officer (CEO)',
    image: '/images/Team/rachit-jain.jpg',
    short:
      'Drives strategic vision and operational excellence across all verticals of the group.',
    bio: [
      'Mr. Rachit Jain plays a central role in shaping Ahinsa Group\'s long-term direction with a focus on innovation, strategic expansion and operational excellence.',
      'His leadership ensures seamless execution across all business functions, from project development to customer experience.',
      'With a deep commitment to quality and customer satisfaction, he drives the group\'s ambitions while maintaining the principles of integrity and transparency.',
    ],
    achievements: [
      'Chief Executive Officer',
      'Lead, Strategic Operations',
      'Architect, Business Excellence',
    ],
  },
]

// =============================================================
// TEAM MEMBERS — Operating leadership across functions
// =============================================================
export const TEAM_MEMBERS = [
  {
    name: 'Mr. Munna Chaudhary',
    role: 'Coordinator',
    department: 'Administration',
    image:
      '/images/emploi/munna.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Manages administrative operations within the Accounts department — oversees documentation, coordination between teams, and ensures smooth day-to-day functioning of accounting processes.',
  },
  {
    name: 'Mr. Akshat Jain',
    role: 'Office Managment',
    department: 'Administration',
    image:
      '/images/emploi/akshat-jain.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Manages administrative operations within the Accounts department — oversees documentation, coordination between teams, and ensures smooth day-to-day functioning of accounting processes.',
  },
  {
    name: 'Mr. Pawan Chauhan',
    role: 'Social Media Manager',
    department: 'Digital',
    image:
      '/images/emploi/pawan-chauhan.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Manages the company digital presence — handles social media content, online campaigns and audience engagement strategies.',
  },
  {
    name: 'Mr. Alok Sharma',
    role: 'Purchase Manager',
    department: 'Purchase',
    image:
      '/images/emploi/alok-sharma.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Manages procurement and vendor relationships — ensures timely sourcing of materials, cost control and smooth supplier coordination.',
  },
  {
    name: 'Mr. Akash Bansal',
    role: 'Legal and Professional Conssultant',
    department: 'Legal',
    image:
      '/images/emploi/akash-bansal.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Handles all legal matters and professional advisory — manages contracts, documentation and provides regulatory guidance to the group.',
  },
  {
    name: 'Mr. Himanshu Saxena',
    role: 'Head, Senior Accountant',
    department: 'Accounts',
    image:
      '/images/emploi/himansuh-saxena.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Oversees the entire accounts department — manages financial records, audits and senior-level accounting operations across the organization.',
  },
  {
    name: 'Mr. Anupam Chittoriya',
    role: 'Accountant',
    department: 'Accounts',
    image:
      '/images/emploi/anupam-chitoria.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Manages the Tally-based accounting system — maintains accurate entries, vouchers, GST filings and overall financial data integrity.',
  },
  {
    name: 'Mr. Rajesh Saxena',
    role: 'Legal Cum Accountant',
    department: 'Accounts',
    image:
      '/images/emploi/rajesh-saxena.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Leads day-to-day accounting operations — ensures accurate ledger management, financial reporting and reconciliation across the group.',
  },
  {
    name: 'Mr. Laxmi Narayan',
    role: 'Land Coordinator',
    department: 'Legal',
    image:
      '/images/emploi/laxmi-narayan.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Manages administrative operations within the Accounts department — oversees documentation, coordination between teams, and ensures smooth day-to-day functioning of accounting processes.',
  },
  {
    name: 'Mr. Mohit parashar',
    role: 'Project Engineer',
    department: 'Engineer',
    image:
      '/images/emploi/mohit-parashar.jpg?w=600&q=85&auto=format&fit=crop',
    bio: 'Leads the engineering team — supervises structural planning, MEP coordination and technical execution across all active sites.',
  },
  
  {
    name: 'Mr. Santosh Sharma',
    role: 'Sales manager',
    department: 'Sales',
    image:
      '/images/emploi/shantosh-sharma.jpg?w=600&q=85&auto=format&fit=crop',
    bio: ' Leads the sales team — drives client acquisition, achieves sales targets and executes effective sales strategies across the group.',
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
]

// =============================================================
// EVENTS — launches, ground-breakings, customer events
// =============================================================
export const EVENTS = [
  {
    date: 'Jan 26, 2025',
    title: 'Grand Launch \u2014 Ahinsa The Grand Green Valley',
    location: 'Fatehabad Road, Agra',
    type: 'Project Launch',
    images: [
      '/images/Events/grand-valley-launch/26Jan2025-TGGV1.jpg',
      '/images/Events/grand-valley-launch/26Jan2025-TGGV2.jpg',
      '/images/Events/grand-valley-launch/26Jan2025-TGGV3.jpg',
    ],
    excerpt:
      'Ahinsa The Grand Green Valley brings serene green living and modern luxury together, offering a peaceful, nature-inspired lifestyle for you.',
  },
  {
    date: 'July 10, 2025',
    title: 'Opening Corporate Office \u2014 Ahinsa Complex',
    location: 'Ram Bagh, Agra',
    type: 'Pujan Gallery',
    images: [
      '/images/Events/ahinsa-complex/10July2025-AhinsaComplex2.jpg',
      '/images/Events/ahinsa-complex/10July2025-AhinsaComplex3.jpg',
      '/images/Events/ahinsa-complex/10July2025-AhinsaComplex1.jpg',
    ],
    excerpt:
      'We are pleased to announce the opening of our new corporate office, marking a milestone in our journey toward growth, innovation, and excellence.',
  },
  {
    date: 'Augest 15, 2025',
    title: 'Flag Hoisting \u2014 On All Our Project',
    location: 'Agra',
    type: 'Independence Day',
    images: [
      '/images/Events/Independence-day/15-Aug-20251.jpg',
      '/images/Events/Independence-day/15-Aug-20252.jpg',
      '/images/Events/Independence-day/15-Aug-20254.jpg',
    ],
    excerpt:
      'We proudly celebrated Independence Day with great enthusiasm, honoring the spirit of freedom, unity, and the brave hearts who made it possible."',
  },
  {
    date: 'October 27, 2025',
    title: 'Launching New Office \u2014 RRR InfraZone PVT LTD',
    location: 'Ahinsa Green Valley Empire, Agra',
    type: 'pujan',
    images: [
      '/images/Events/empire-office/Empire-Office-Poojan4.jpg',
      '/images/Events/empire-office/Empire-Office-Poojan3.jpg',
      '/images/Events/empire-office/Empire-Office-Poojan1.jpg',
    ],
    excerpt:
      'A festive evening with our resident families, featuring cultural performances, dinner and recognition of long-standing customers.',
  },
  {
    date: 'March 20, 2026',
    title: 'Launching Rich Villa \u2014 with blessing of Guru Vijay Kaushal Ji',
    location: 'Ahinsa Green Valley Empire, Agra',
    type: 'Lauching',
    images: [
      '/images/Events/rich-villa/20-03-2026-Vijay-Kaushal-Ji-1.jpg',
      '/images/Events/rich-villa/20-03-2026-Vijay-Kaushal-Ji-2.jpg',
      '/images/Events/rich-villa/20-03-2026-Vijay-Kaushal-Ji-3.jpg',
    ],
    excerpt:
      'Bringing together our wider channel partner network for a day of strategy, recognition and project previews.',
  },
  {
    date: 'May 05, 2026',
    title: 'Developed for Saint \u2014 Vihasant Bhawan',
    location: 'Ahinsa The Grand Green Valley, Agra',
    type: 'Taking Blessings',
    images: [
      '/images/Events/vihasant-bhawan/05-05-2026-Vihasant-Bhawan4.jpg',
      '/images/Events/vihasant-bhawan/05-05-2026-Vihasant-Bhawan1.jpg',
      '/images/Events/vihasant-bhawan/05-05-2026-Vihasant-Bhawan3.jpg',
    ],
    excerpt:
      'A panel discussion exploring how design and planning need to evolve for fast-growing tier-2 cities.',
  },
]
