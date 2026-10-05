import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, MapPin, Building2, Calendar, Ruler, Layers,
  ShieldCheck, Award, Compass, Trees, Waves, Dumbbell, Users, Baby, Trophy,
  Activity, Zap, Car, Camera, Droplet, Sparkles, Sun, Layout, Wifi, Coffee,
  Utensils, Store, Film, Music, HeartHandshake, Clock, Eye, Target, Leaf,
  Send, CheckCircle2, Phone, Mail, ChevronRight, Landmark, Home, Maximize2,
  ArrowUpDown, Toilet, SquareParking, Cctv, FireExtinguisher, Snowflake,
} from 'lucide-react'

import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import BrochureGallery, { BROCHURE_PROJECTS } from '../components/BrochureGallery'
import BrochureDownloadModal from '../components/BrochureDownloadModal'
import AutoSlideImage from '../components/AutoSlideImage'
import HeroVideo from '../components/HeroVideo'
import InstagramFeed from '../components/InstagramFeed'
import ImageLightbox from '../components/ImageLightbox'
import VideoTile from '../components/VideoTile'
import PhotoStrip, { PhotoStripStyles, useStripArbiter } from '../components/PhotoStrip'
import { sendToGoogleSheet } from '../lib/googleSheet'
import {
  PROJECT_DETAILS, LISTED_PROJECTS, COMPANY, WEB3FORMS_KEY, INSTAGRAM, OFFICE_SLUGS,
  mapEmbedFor, parentOf, subProjectsOf,
} from '../data/site'

const ICON_MAP = {
  ArrowRight, MapPin, Building2, Calendar, Ruler, Layers, ShieldCheck, Award,
  Compass, Trees, Waves, Dumbbell, Users, Baby, Trophy, Activity, Zap, Car,
  Camera, Droplet, Sparkles, Sun, Layout, Wifi, Coffee, Utensils, Store, Film,
  Music, HeartHandshake, Clock, Eye, Target, Leaf, Landmark, Home,
  ArrowUpDown, Toilet, SquareParking, Cctv, FireExtinguisher, Snowflake,
}

/* One cell of the still gallery grid: two to a row on a phone, three from md
   up. The widths take the gap-4 between cells out first, so a row of three
   adds up to exactly 100%. Laid out with flex rather than grid so a short last
   row is centred instead of hanging off the left. */
const GRID_CELL = 'w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)]'

function Icon({ name, className = 'w-5 h-5' }) {
  const C = ICON_MAP[name] || Sparkles
  return <C className={className} />
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = PROJECT_DETAILS[slug]

  // This page shows and offers only its own brochure. Each brochure names the
  // project it belongs to (see BROCHURE_PROJECTS), so projects without one —
  // Lake City and the offices — simply get no gallery and no download button.
  const brochure = BROCHURE_PROJECTS.find((b) => b.slug === slug)
  const brochureId = brochure?.id

  // Ahinsa Complex is deliberately not in OFFICE_SLUGS — it is a project, so
  // it keeps the status badge, highlights and distances like any other.
  const isOffice = OFFICE_SLUGS.includes(slug)

  // The offices are working addresses, not somewhere a buyer is choosing
  // between locations, so they show the map without the "Key Distances" card.
  const hasDistances = !isOffice && project?.locationAdvantages?.length > 0

  // The photos the full-screen viewer is stepping through and where it is
  // in them: { images, index }, or null when closed. It holds one gallery
  // section at a time, so the arrows never wander into another section.
  // Declared before the redirect below so the hook order never changes.
  const [lightbox, setLightbox] = useState(null)
  // Gallery sections scroll sideways; only the one on screen autoscrolls.
  const { activeStrip, onVisibility } = useStripArbiter()
  const [downloadOpen, setDownloadOpen] = useState(false)
  // Set once a gallery video's player loads, so the row it sits in stops
  // autoscrolling under it. Declared here, above the redirect, with the rest.
  const [videoPlaying, setVideoPlaying] = useState(false)

  // The router reuses this page for every /projects/:slug, so moving from one
  // project to another re-renders it without unmounting. Anything tied to a
  // single project has to be cleared by hand or it follows the visitor over.
  useEffect(() => {
    setLightbox(null)
    setDownloadOpen(false)
    setVideoPlaying(false)
  }, [slug])

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  // What closes the page. An office points at our other offices — someone on
  // the Gwalior page is looking for where else to find us, not for a township
  // to buy into. Every other project points at other projects.
  const related = (isOffice ? LISTED_PROJECTS.filter((p) => OFFICE_SLUGS.includes(p.slug)) : LISTED_PROJECTS)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  // Where this project sits in the portfolio: the township a project is built
  // inside (for the breadcrumb), and the projects built inside this one.
  const parent = parentOf(slug)
  const subProjects = subProjectsOf(slug)

  // Overview image auto-slide. A project lists the frames itself in
  // `overviewImages`, and those are its renders only — cycling the whole
  // gallery pulled in site and construction photographs, which sat badly
  // against the render the section opens on. Without a list it stays on the
  // single overview image rather than falling back to the gallery.
  const overviewImages = (
    project.overviewImages?.length ? project.overviewImages : [project.overviewImage]
  ).filter((src, i, arr) => src && arr.indexOf(src) === i)

  // Instagram feed: the project's own posts when it defines them, the site-wide
  // feed when it says nothing, and none at all when it sets `instagram: null`.
  const feed = 'instagram' in project ? project.instagram : INSTAGRAM

  // Gallery. Projects that define `galleryGroups` render one continuous
  // gallery split into titled blocks (Main Entrance, Parks, …); the rest
  // fall back to a single flat grid of `gallery`.
  const groups = project.galleryGroups
  // Flattened only to decide whether the section has anything to show, and
  // for projects with no blocks at all. Each block opens its own viewer.
  const galleryImages = groups ? groups.flatMap((g) => g.images) : project.gallery || []

  // Amenity tiles: the widest column count that divides the list evenly.
  const amenityCount = project.amenities?.length || 0
  const amenityCols =
    amenityCount % 6 === 0
      ? 'sm:grid-cols-3 lg:grid-cols-6'
      : amenityCount % 5 === 0
        ? 'sm:grid-cols-3 lg:grid-cols-5'
        : amenityCount % 4 === 0
          ? 'sm:grid-cols-4'
          : 'sm:grid-cols-3 lg:grid-cols-6'

  // Gallery videos are YouTube only. Instagram reels belong to the "Moments
  // from Instagram" section further down, under the project's `instagram`
  // posts — one put in `galleryVideos` by mistake is ignored rather than
  // rendered as a broken tile here.
  const galleryVideos = (project.galleryVideos || []).filter(
    (url) => !/instagram\.com\//i.test(url)
  )
  // The strip arbiter gives one row at a time the autoscroll, keyed by index.
  // The photo rows take 0..n-1, so the video row follows them.
  const videoStripIndex = groups ? groups.length : 1
  // `galleryLayout: 'grid'` lays the flat gallery and its videos out still,
  // three to a row, instead of in the scrolling strip. For the malls, whose
  // galleries are short enough to see whole.
  const galleryGrid = project.galleryLayout === 'grid'

  // Offices and the mall carry no unit-area figure. Drop any fact without a
  // value so the strip never shows an empty tile, and centre what is left.
  const quickFacts = [
    { icon: Building2, label: 'Type', value: project.type },
    { icon: Layers, label: 'Configuration', value: project.configurations },
    { icon: Ruler, label: 'Unit Area', value: project.unitArea },
    { icon: Calendar, label: 'Possession', value: project.possession },
  ].filter((f) => f.value && String(f.value).trim())

  return (
    <>
      {/* HERO (always dark cinematic) */}
      {/* lg:h-[100vh] is 80vh once the page zoom is applied — see index.css. */}
      <section className="relative h-[80vh] lg:h-[100vh] min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-ink-900">
          {project.videoEmbed ? (
            <HeroVideo
              videoId={project.videoEmbed.split('/').pop()}
              poster={project.hero}
              alt={project.name}
            />
          ) : (
            <img src={project.hero} alt={project.name} className="w-full h-full object-cover opacity-60 hero-img" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/40 to-ink-900" />
        </div>
        <div className="container-x relative pb-20 md:pb-28">
          <Reveal>
            {/* Wraps: a project inside a township has a four-step trail. */}
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-[0.25em] text-gold-400 mb-6">
              <Link to="/" className="hover:text-gold-300 transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/projects" className="hover:text-gold-300 transition">Our Projects</Link>
              <ChevronRight className="w-3 h-3" />
              {parent && (
                <>
                  <Link to={`/projects/${parent.slug}`} className="hover:text-gold-300 transition">
                    {parent.name}
                  </Link>
                  <ChevronRight className="w-3 h-3" />
                </>
              )}
              <span className="text-cream/70">{project.name}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-gold-500 text-ink-900 px-4 py-1.5 text-[10px] uppercase tracking-widest font-medium">
                {project.status}
              </span>
              <span className="text-gold-400 uppercase tracking-[0.3em] text-xs">{project.type}</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="heading-serif text-cream text-4xl md:text-6xl lg:text-7xl max-w-5xl">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif italic text-gold-300 text-xl md:text-2xl mt-5 max-w-3xl">
              {project.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 text-cream/90 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" />
                {project.location}
              </span>
              <span className="hidden md:inline text-cream/30">|</span>
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gold-500" />
                {project.configurations}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="gold-divider mx-0 mt-8" />
          </Reveal>
        </div>
      </section>

      {/* QUICK FACTS STRIP */}
      <section className="bg-page-alt border-y border-soft">
        <div
          className={`container-x py-8 grid gap-6 ${
            quickFacts.length < 4
              ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto'
              : 'grid-cols-2 md:grid-cols-4'
          }`}
        >
          {quickFacts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <Fact icon={f.icon} label={f.label} value={f.value} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section-pad bg-page">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="img-zoom aspect-[4/5] overflow-hidden">
                <AutoSlideImage images={overviewImages} alt={project.name} className="w-full h-full object-cover" />
              </div>
              {!isOffice && (
                <div className="absolute -top-6 -left-6 hidden md:flex flex-col items-center justify-center w-28 h-28 bg-gold-500 text-ink-900">
                  <span className="font-serif text-2xl font-bold leading-none">{project.status}</span>
                </div>
              )}
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Project Overview"
              title={<>About <span className="gold-text">{project.name}</span></>}
            />
            <Reveal delay={0.2}>
              <div className="text-fg-muted leading-relaxed mt-7 space-y-5">
                {project.overview.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-soft">
                <KV label="Address" value={project.fullAddress} />
              </div>
            </Reveal>
          </div>
        </div>

        {project.overviewVideo && (
          <div className="container-x mt-16">
            <Reveal>
              <div className="relative aspect-video overflow-hidden border border-soft">
                <iframe
                  title={`${project.name} overview video`}
                  src={project.overviewVideo}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        )}
      </section>

      {/* WITHIN THE TOWNSHIP — projects built inside this one (the Grand
          Square Mall, on the Grand Green Valley page). They are not listed as
          projects of their own, so this is where visitors find them. */}
      {subProjects.length > 0 && (
        <section className="section-pad bg-page-alt border-y border-soft">
          <div className="container-x">
            <SectionHeading
              eyebrow="Within the Township"
              title={<>Also inside <span className="gold-text">{project.name}</span></>}
            />
            <div className="grid gap-6 mt-12">
              {subProjects.map((sp, i) => (
                <Reveal key={sp.slug} delay={i * 0.08}>
                  <Link
                    to={`/projects/${sp.slug}`}
                    className="card-glass overflow-hidden group grid md:grid-cols-2"
                  >
                    <div className="img-zoom relative aspect-[16/10] md:aspect-auto md:min-h-[340px]">
                      <img src={sp.image} alt={sp.name} className="absolute inset-0 w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-gold-500 text-ink-900 px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                        {sp.status}
                      </span>
                    </div>
                    <div className="p-6 md:p-10 flex flex-col justify-center">
                      <p className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.25em]">
                        {sp.type}
                      </p>
                      <h3 className="font-serif text-2xl md:text-4xl text-fg mt-3 leading-tight group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
                        {sp.name}
                      </h3>
                      <p className="text-fg-soft text-sm md:text-base leading-relaxed mt-4">{sp.short}</p>
                      <span className="inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-[0.2em] mt-6">
                        Explore
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HIGHLIGHTS — skipped while a project has none, so the heading never
          appears above an empty row, and on the group's own offices, which are
          working addresses rather than something being sold. */}
      {!isOffice && project.highlights?.length > 0 && (
      <section className="section-pad bg-page-soft">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionHeading
              center
              eyebrow="Project Highlights"
              title={<>What makes it <span className="gold-text">special</span></>}
            />
          </div>
          {/* Two to a row on phones as well — one full-width card per row left
              the section very tall. The card scales down to suit the narrower
              column; from md up it is unchanged. */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {project.highlights.map((h, i) => (
              <Reveal
                key={h.title}
                delay={i * 0.08}
                className="w-[calc(50%-0.375rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
              >
                <div className="card-glass p-4 md:p-7 h-full">
                  <div className="w-11 h-11 md:w-14 md:h-14 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500">
                    <Icon name={h.icon} className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="font-serif text-base md:text-xl text-fg mt-4 md:mt-5">{h.title}</h3>
                  <p className="text-fg-soft text-xs md:text-sm leading-relaxed mt-2 md:mt-3">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* FEATURE — a brochure-style spread: one statement on the left, the
          renders it talks about stacked on the right. */}
      {project.feature && (
        <section className="section-pad bg-page-soft border-y border-soft">
          <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <Reveal>
                <p className="eyebrow">{project.feature.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="heading-serif text-fg text-4xl md:text-5xl lg:text-6xl mt-5 leading-[1.05]">
                  {project.feature.title}
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="gold-divider mx-0 my-7" />
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-fg-muted text-base md:text-lg leading-relaxed">
                  {project.feature.text}
                </p>
              </Reveal>
            </div>

            <div className="grid gap-4 md:gap-5">
              {project.feature.images.map((src, i) => (
                <Reveal key={src} delay={0.1 + i * 0.1}>
                  {/* A lone image stands taller, so it holds its half of the
                      spread against the text; stacked ones stay letterboxed. */}
                  <div
                    className={`img-zoom overflow-hidden border border-soft ${
                      project.feature.images.length === 1 ? 'aspect-[4/3]' : 'aspect-[16/10]'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${project.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VISION — the brochure's concept diagram: the ideas behind the design
          on one side, the centrepiece in the middle, and what each idea looks
          like built on the other. */}
      {project.vision && (
        <section className="section-pad bg-page">
          <div className="container-x">
            <SectionHeading eyebrow={project.vision.eyebrow} title={project.vision.title} />

            <div className="grid gap-14 lg:gap-10 lg:grid-cols-12 items-center mt-14">
              {/* The three ideas. A row on phones, a column beside the circle
                  from lg up, as in the brochure. */}
              <div className="lg:col-span-3 flex lg:flex-col justify-center gap-6 sm:gap-10">
                {project.vision.pillars.map((p, i) => (
                  <Reveal key={p.label} delay={i * 0.08}>
                    <div className="flex flex-col items-center gap-3">
                      <span className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-500/50 flex items-center justify-center text-gold-700 dark:text-gold-500">
                        <Icon name={p.icon} className="w-6 h-6 md:w-7 md:h-7" />
                      </span>
                      <span className="bg-gold-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-fg-soft whitespace-nowrap">
                        {p.label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* The centrepiece */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <Reveal>
                  <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full border border-gold-500/40 p-2">
                    <img
                      src={project.vision.image}
                      alt={project.name}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="font-serif italic text-fg text-lg md:text-xl leading-relaxed mt-7 max-w-md">
                    {project.vision.text}
                  </p>
                </Reveal>
                {/* Renders rather than photographs are labelled, as the
                    brochure labels them. */}
                {project.vision.note && (
                  <Reveal delay={0.15}>
                    <p className="text-fg-muted text-xs italic mt-4 max-w-md">{project.vision.note}</p>
                  </Reveal>
                )}
              </div>

              {/* What each idea looks like built */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                {project.vision.cards.map((c, i) => (
                  <Reveal key={c.label} delay={i * 0.08}>
                    <div className="flex items-start gap-5">
                      <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-full border border-gold-500/40 p-1.5">
                        <img
                          src={c.image}
                          alt={c.label}
                          className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block bg-gold-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold-700 dark:text-gold-500">
                          {c.label}
                        </span>
                        <p className="text-fg-muted text-sm md:text-base leading-relaxed mt-3">{c.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AMENITIES — the "Lifestyle, delivered" copy is residential, so an
          office with an empty `amenities` list skips the section entirely. */}
      {project.amenities?.length > 0 && (
      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-14">
            {/* A project can re-head this grid when the tiles are not
                amenities — the mall lists the tenants it is looking for. */}
            <SectionHeading
              center
              eyebrow={project.amenitiesHeading?.eyebrow || 'World-Class Amenities'}
              title={
                project.amenitiesHeading ? (
                  <>
                    {project.amenitiesHeading.title}{' '}
                    <span className="gold-text">{project.amenitiesHeading.accent}</span>
                  </>
                ) : (
                  <>Lifestyle, <span className="gold-text">delivered</span></>
                )
              }
              subtitle={
                project.amenitiesHeading?.subtitle || 'Every detail designed to elevate everyday living.'
              }
            />
          </div>
          {/* Phones get chips that wrap and pack tight — square tiles two to a
              row left long names cramped and the section metres tall. From sm
              up it is the tile grid, where there is width for it, with the
              column count picked to divide the list evenly: six for the usual
              twelve, five for ten, four for eight. Otherwise a row ends with a
              stray tile or two hanging off the left. */}
          <div className={`flex flex-wrap justify-center gap-2 sm:grid sm:gap-4 ${amenityCols}`}>
            {project.amenities.map((a, i) => (
              <Reveal key={a.name + i} delay={(i % 6) * 0.05}>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 sm:flex-col sm:justify-center sm:gap-0 sm:text-center sm:p-5 border border-soft hover:border-gold-500/60 hover:bg-gold-500/5 transition-all duration-300 group h-full">
                  <div className="w-6 h-6 sm:w-12 sm:h-12 flex items-center justify-center text-gold-700 dark:text-gold-500 flex-shrink-0 group-hover:scale-110 transition">
                    <Icon name={a.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-fg text-xs md:text-sm whitespace-nowrap sm:whitespace-normal sm:mt-3 leading-tight">
                    {a.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* FACILITIES — the brochure's own grouped lists, kept in its groups:
          what the township runs on, or how a building is laid out floor by
          floor. Four short columns rather than one long run of bullets. */}
      {project.facilities?.groups?.length > 0 && (
        <section className="section-pad bg-page-alt border-y border-soft">
          <div className="container-x">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <SectionHeading
                center
                eyebrow={project.facilities.eyebrow}
                title={
                  <>
                    {project.facilities.title}{' '}
                    <span className="gold-text">{project.facilities.accent}</span>
                  </>
                }
                subtitle={project.facilities.subtitle}
              />
            </div>
            {/* Two across on a phone, four from lg — the lists are short. */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
              {project.facilities.groups.map((g, i) => (
                <Reveal key={g.label} delay={i * 0.08}>
                  <div className="h-full border border-soft p-4 sm:p-6 hover:border-gold-500/60 transition-colors duration-300">
                    <span className="w-10 h-10 sm:w-11 sm:h-11 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500">
                      <Icon name={g.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                    <h3 className="font-serif text-base sm:text-xl text-fg mt-4 leading-tight">{g.label}</h3>
                    <div className="gold-divider mx-0 my-3 sm:my-4" />
                    <ul className="space-y-1.5 sm:space-y-2">
                      {g.items.map((item) => (
                        <li key={item} className="flex gap-2 text-fg-muted text-xs sm:text-sm leading-relaxed">
                          <span className="text-gold-500 flex-shrink-0">&middot;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {(galleryImages.length > 0 || project.galleryVideos?.length > 0) && (
        <section className="section-pad bg-page-soft border-y border-soft">
          <PhotoStripStyles />
          <div className="container-x">
            <SectionHeading
              eyebrow="Gallery"
              title={<>A <span className="gold-text">closer look</span></>}
              subtitle={groups ? 'Every corner of the township, section by section.' : undefined}
            />

            {groups ? (
              /* One continuous gallery, split into titled blocks */
              groups.map((block, blockIndex) => (
                <div key={block.label} className="mt-14 first:mt-12">
                  <Reveal>
                    <div className="flex items-baseline gap-5 mb-6">
                      <h3 className="heading-serif text-fg text-2xl md:text-3xl whitespace-nowrap">
                        {block.label}
                      </h3>
                      <span className="h-px flex-1 bg-gold-500/25" />
                      <span className="text-fg-soft text-[10px] uppercase tracking-[0.25em] whitespace-nowrap">
                        {block.images.length} {block.images.length === 1 ? 'Photo' : 'Photos'}
                      </span>
                    </div>
                  </Reveal>
                  <PhotoStrip
                    items={block.images}
                    label={`${project.name} — ${block.label}`}
                    index={blockIndex}
                    active={activeStrip === blockIndex}
                    onVisibility={onVisibility}
                    onOpen={(i) => setLightbox({ images: block.images, index: i })}
                    frozen={lightbox !== null}
                    countLabel={false}
                  />
                </div>
              ))
            ) : galleryImages.length > 0 && galleryGrid ? (
              <div className="mt-12">
                <p className="text-fg-soft text-[10px] uppercase tracking-[0.25em] mb-3">
                  {galleryImages.length} {galleryImages.length === 1 ? 'Photo' : 'Photos'}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {galleryImages.map((src, i) => (
                    <Reveal key={src} delay={(i % 3) * 0.08} className={GRID_CELL}>
                      <button
                        type="button"
                        onClick={() => setLightbox({ images: galleryImages, index: i })}
                        aria-label={`View ${project.name} photo ${i + 1} full screen`}
                        className="img-zoom group relative block w-full aspect-[16/10] overflow-hidden cursor-zoom-in"
                      >
                        <img
                          src={src}
                          alt={`${project.name} ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-ink-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <Maximize2 className="w-6 h-6 text-cream" />
                        </span>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : (
              galleryImages.length > 0 && (
                <div className="mt-4">
                  <PhotoStrip
                    items={galleryImages}
                    label={`${project.name} gallery`}
                    index={0}
                    active={activeStrip === 0}
                    onVisibility={onVisibility}
                    onOpen={(i) => setLightbox({ images: galleryImages, index: i })}
                    frozen={lightbox !== null}
                  />
                </div>
              )
            )}

            {/* Videos sit under the photos with a heading like a gallery
                section, and scroll the same way the photo rows do. */}
            {galleryVideos.length > 0 && (
              <div className="mt-14">
                <Reveal>
                  <div className="flex items-baseline gap-5 mb-6">
                    <h3 className="heading-serif text-fg text-2xl md:text-3xl whitespace-nowrap">Videos</h3>
                    <span className="h-px flex-1 bg-gold-500/25" />
                    <span className="text-fg-soft text-[10px] uppercase tracking-[0.25em] whitespace-nowrap">
                      {galleryVideos.length} {galleryVideos.length === 1 ? 'Video' : 'Videos'}
                    </span>
                  </div>
                </Reveal>
                {galleryVideos.length === 1 ? (
                  /* One video has nothing to scroll to — in a strip it would sit
                     a third wide in the left corner. Centred and large instead. */
                  <Reveal>
                    <div className="max-w-3xl mx-auto">
                      <VideoTile src={galleryVideos[0]} title={`${project.name} video`} />
                    </div>
                  </Reveal>
                ) : galleryGrid ? (
                  <div className="flex flex-wrap justify-center gap-4">
                    {galleryVideos.map((src, i) => (
                      <Reveal key={src} delay={(i % 3) * 0.08} className={GRID_CELL}>
                        <VideoTile src={src} title={`${project.name} video ${i + 1}`} />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  /* The autoscroll stops as soon as a player loads, so the row
                     never slides out from under a video someone is watching. */
                  <PhotoStrip
                    items={galleryVideos}
                    label={`${project.name} video`}
                    index={videoStripIndex}
                    active={activeStrip === videoStripIndex}
                    onVisibility={onVisibility}
                    cardClass="w-[80%] sm:w-[48%] lg:w-[32%]"
                    frozen={lightbox !== null || videoPlaying}
                    countLabel={false}
                    renderItem={(src, i) => (
                      <VideoTile
                        src={src}
                        title={`${project.name} video ${i + 1}`}
                        onPlay={() => setVideoPlaying(true)}
                      />
                    )}
                  />
                )}
              </div>
            )}
          </div>

          <ImageLightbox
            images={lightbox?.images || []}
            index={lightbox ? lightbox.index : null}
            onClose={() => setLightbox(null)}
            onNavigate={(i) => setLightbox((lb) => lb && { ...lb, index: i })}
            alt={`${project.name} gallery image`}
          />
        </section>
      )}

      {/* FLOOR PLANS / CONFIGURATIONS */}
      {project.floorPlans?.length > 0 && (
        <section className="section-pad bg-page-alt border-y border-soft">
          <div className="container-x">
            <SectionHeading
              eyebrow="Configurations"
              title={<>Plans & <span className="gold-text">layouts</span></>}
              subtitle={project.floorPlansNote || 'Thoughtfully designed configurations to suit different family needs and budgets.'}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
              {project.floorPlans.map((f, i) => (
                <Reveal key={f.config} delay={i * 0.08}>
                  <div className="card-glass overflow-hidden group">
                    {/* Plans are drawings, not photographs: they are shown whole
                        on a light ground rather than cropped to fill the frame. */}
                    <div className="aspect-[16/10] bg-white dark:bg-cream/95 p-2">
                      <img src={f.image} alt={f.config} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl text-fg">{f.config}</h3>
                      <p className="text-gold-700 dark:text-gold-500 text-xs uppercase tracking-[0.2em] mt-2">{f.area}</p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-xs uppercase tracking-widest mt-5"
                      >
                        Request Plan <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SITE — the brochure's location page: what the plot is on the left,
          the annotated site map on the right. */}
      {project.site && (
        <section className="section-pad bg-page">
          <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <SectionHeading eyebrow={project.site.eyebrow} title={project.site.title} />
              <Reveal delay={0.15}>
                <p className="text-fg-muted text-base md:text-lg leading-relaxed mt-6">
                  {project.site.text}
                </p>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                {project.site.facts.map((f, i) => (
                  <Reveal key={f.label} delay={0.2 + i * 0.06}>
                    <div className="flex items-start gap-4 border border-soft p-4 h-full">
                      <span className="w-10 h-10 flex-shrink-0 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-700 dark:text-gold-500">
                        <Icon name={f.icon} className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="font-serif text-fg text-base leading-tight">{f.label}</h3>
                        <p className="text-fg-soft text-xs md:text-sm leading-relaxed mt-1">{f.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal delay={0.1}>
                <div className="border border-soft overflow-hidden bg-white">
                  <img
                    src={project.site.map}
                    alt={`${project.name} site location map`}
                    className="w-full block"
                    loading="lazy"
                  />
                </div>
              </Reveal>
              {project.site.mapNote && (
                <Reveal delay={0.15}>
                  <p className="text-fg-faint text-xs italic mt-3">{project.site.mapNote}</p>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* BROCHURE GALLERY — only this project's own brochure */}
      {brochureId && (
        <BrochureGallery
          defaultId={brochureId}
          single
          onDownload={() => setDownloadOpen(true)}
        />
      )}

      {/* Locked to this project — the visitor cannot pick another brochure here. */}
      {brochureId && (
        <BrochureDownloadModal
          open={downloadOpen}
          onClose={() => setDownloadOpen(false)}
          defaultBrochureId={brochureId}
          lockBrochure
        />
      )}

      {/* INSTAGRAM — site-wide feed by default; a project can override it with
          its own `instagram` field, or set `instagram: null` to hide the
          section entirely (see `feed` above). */}
      {feed && <InstagramFeed handle={feed.handle} posts={feed.posts} />}

      {/* LOCATION ADVANTAGES — a project sets `showLocation: false` when it has
          no site map or distances worth standing behind yet. */}
      {project.showLocation !== false && (
      <section className="section-pad bg-page">
        <div
          className={`container-x grid gap-12 ${
            hasDistances ? 'lg:grid-cols-2' : ''
          }`}
        >
          <div>
            <SectionHeading
              eyebrow="Location Advantage"
              title={<>Connected to <span className="gold-text">everything that matters</span></>}
              subtitle="Strategic location that puts education, healthcare, retail and transit within easy reach."
            />
            <Reveal delay={0.2}>
              <div className="mt-10 aspect-[4/3] overflow-hidden border border-soft">
                <iframe
                  title={`${project.name} location`}
                  src={mapEmbedFor(project) || `https://www.google.com/maps?q=${encodeURIComponent(project.location + ', India')}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
          {hasDistances && (
          <Reveal delay={0.15}>
            <div className="card-glass p-8">
              <h3 className="font-serif text-2xl text-fg">Key Distances</h3>
              <div className="gold-divider mx-0 my-5" />
              <ul className="divide-y divide-gold-500/15">
                {project.locationAdvantages.map((l, i) => (
                  <li key={i} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-fg text-sm font-medium">{l.place}</div>
                        <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.2em] mt-0.5">{l.type}</div>
                      </div>
                    </div>
                    <div className="text-fg-soft text-sm font-medium whitespace-nowrap">{l.distance}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          )}
        </div>
      </section>
      )}

      {/* ENQUIRY FORM */}
      {/* Keyed, so a part-filled form or a "thank you" does not carry over
          from the project the visitor was looking at before. */}
      <EnquirySection key={slug} projectName={project.name} />

      {/* RELATED PROJECTS */}
      <section className="section-pad bg-page">
        <div className="container-x">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow={isOffice ? 'Find Us' : 'Explore More'}
              title={
                isOffice ? (
                  <>Our other <span className="gold-text">offices</span></>
                ) : (
                  <>Other <span className="gold-text">signature</span> projects</>
                )
              }
            />
            <Link
              to={isOffice ? '/contact' : '/projects'}
              className="btn-outline-gold self-start lg:self-end whitespace-nowrap"
            >
              {isOffice ? 'Contact Us' : 'View All Projects'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <Link to={`/projects/${r.slug}`} className="block card-glass overflow-hidden group h-full">
                  <div className="img-zoom aspect-[4/3] relative">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    {/* Offices carry no status badge anywhere else on the
                        site, so they do not get one here either. */}
                    {!isOffice && (
                      <div className="absolute top-3 left-3 bg-gold-500 text-ink-900 px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                        {r.status}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.2em]">{r.type}</div>
                    <h3 className="font-serif text-xl text-fg mt-2 group-hover:text-gold-700 dark:group-hover:text-gold-500 transition">
                      {r.name}
                    </h3>
                    <div className="flex items-center gap-2 text-fg-soft text-xs mt-2">
                      <MapPin className="w-3 h-3 text-gold-500" />
                      {r.location}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 text-gold-700 dark:text-gold-500 text-sm uppercase tracking-[0.2em] hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to all projects
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Fact({ icon: I, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-500 flex-shrink-0">
        <I className="w-4 h-4" />
      </div>
      <div>
        <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.25em]">{label}</div>
        <div className="text-fg text-sm mt-1">{value}</div>
      </div>
    </div>
  )
}

function KV({ label, value }) {
  return (
    <div>
      <div className="text-gold-700 dark:text-gold-500 text-[10px] uppercase tracking-[0.25em]">{label}</div>
      <div className="text-fg text-sm mt-1">{value}</div>
    </div>
  )
}

function EnquirySection({ projectName }) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          // IMPORTANT: Replace with your own access key from web3forms.com
          access_key: WEB3FORMS_KEY,
          subject: `New Enquiry for: ${projectName}`,
          from_name: 'Ahinsa Group Website (Project Page)',
          replyto: form.email,
          ...form,
        }),
      })
      const result = await response.json()
      if (result.success) {
        // Same details, also as a row in the Google Sheet. Not awaited.
        sendToGoogleSheet({ ...form, project: projectName }, 'Project Enquiry')
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', city: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // You can add user-facing error handling here if you want
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-ink-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,162,39,0.12),transparent_60%)]" />
      <div className="container-x py-20 md:py-28 relative grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <Reveal>
            <span className="eyebrow !text-gold-400">Interested in {projectName}?</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-serif text-cream text-4xl md:text-5xl mt-5">
              Let&apos;s schedule your <span className="gold-text">private visit</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink-300 mt-6 leading-relaxed max-w-lg">
              Share a few details and our concierge team will reach out within one business day with
              floor plans, pricing and a personalised site-visit slot.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 space-y-3">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-cream hover:text-gold-400 transition">
                <Phone className="w-4 h-4 text-gold-500" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-cream hover:text-gold-400 transition">
                <Mail className="w-4 h-4 text-gold-500" />
                {COMPANY.email}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="bg-ink-800/60 border border-gold-500/15 p-7 backdrop-blur-sm space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">Full Name *</label>
              <input
                required name="name" value={form.name} onChange={handleChange}
                className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">Email *</label>
                <input
                  required type="email" name="email" value={form.email} onChange={handleChange}
                  className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">Phone *</label>
                <input
                  required type="tel" name="phone" value={form.phone} onChange={handleChange}
                  className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">City *</label>
              <input
                required name="city" value={form.city} onChange={handleChange}
                className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">Message</label>
              <textarea
                rows={4} name="message" value={form.message} onChange={handleChange}
                placeholder={`I'm interested in ${projectName}...`}
                className="w-full bg-ink-900/60 border border-gold-500/20 px-4 py-3 text-cream placeholder:text-ink-400 focus:outline-none focus:border-gold-500 transition resize-none"
              />
            </div>
            <button type="submit" disabled={isSubmitting || submitted} className="btn-gold w-full justify-center disabled:opacity-50">
              {isSubmitting ? (
                'Sending...'
              ) : submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Enquiry Received
                </>
              ) : (
                <>
                  Send Enquiry
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
            {submitted && <p className="text-gold-400 text-sm text-center">Thank you! Our team will be in touch shortly.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
