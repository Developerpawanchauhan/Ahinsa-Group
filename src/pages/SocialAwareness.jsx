import { Instagram, Youtube, Facebook, Linkedin, ArrowUpRight, MapPin } from 'lucide-react'

import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'

const SOCIALS = {
  instagram: {
    handle: 'ahinsagroupagra',
    url: 'https://www.instagram.com/ahinsagroupagra/',
    // Last 6 image posts (no reels), newest first.
    posts: [
      'https://www.instagram.com/p/DaDCkuBEyXv/',
      'https://www.instagram.com/p/DZ1MgM_Eywx/',
      'https://www.instagram.com/p/DYwanblk25d/',
      'https://www.instagram.com/p/DYrQZ6tE-zE/',
      'https://www.instagram.com/p/DYO4MgAzapX/',
      'https://www.instagram.com/p/DUYD-4rEwTL/',
    ],
  },
  youtube: {
    url: 'https://www.youtube.com/@AhinsaGroupAgra',
    // Latest 3 uploads with titles (from the channel feed).
    videos: [
      { id: '6naURT36QaY', title: "Introducing AHINSA Green Valley Lake City | Gwalior's Premium Residential Project" },
      { id: 'O0Stk5s2YU8', title: 'AHINSA New Corporate Office in Gwalior | Grand Office Tour 2026' },
      { id: 'UixAWM1hS9A', title: "AHINSA Green Valley Township | Luxury Township Cinematic Video | Agra's Premium Project" },
    ],
  },
  facebook: {
    url: 'https://www.facebook.com/profile.php?id=61589690406055',
    // Image/text posts only (no reels). Add up to 3 — copy a post's link via
    // the ⋯ menu on Facebook and paste it here.
    posts: [
      'https://www.facebook.com/permalink.php?story_fbid=pfbid02okHtGirfyVRvDJiuzWPbJx4k9ay7TTyJJrtA1J7quX3LWoBKJZKLpGL1caJNaKdBl&id=61589690406055',
      'https://www.facebook.com/permalink.php?story_fbid=pfbid02r8LJ8tqoS8RkKZi8q79i7VHxiB2Eom9hcGbk1qENHninomtxog5sMzaX6BiWK6yTl&id=61589690406055',
    ],
  },
  linkedin: {
    url: 'https://www.linkedin.com/company/ahinsa-group-agra/',
  },
}

function igEmbedSrc(url) {
  const m = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed/` : null
}

/* Section wrapper: heading on top, content, then a centred follow button. */
function SectionShell({ id, icon: Icon, eyebrow, title, subtitle, action, children, alt = false }) {
  return (
    <section id={id} className={`section-pad ${alt ? 'bg-page-alt' : 'bg-page'} border-t border-soft`}>
      <div className="container-x">
        <div className="flex items-start gap-4 mb-12">
          <span className="w-12 h-12 shrink-0 border border-gold-500/40 flex items-center justify-center text-gold-600 dark:text-gold-500">
            <Icon className="w-6 h-6" />
          </span>
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </div>

        {children}

        <div className="text-center mt-12">
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex"
          >
            {action.label} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function SocialAwareness() {
  return (
    <>
      <PageHero
        title="Social Awareness"
        subtitle="Follow the Ahinsa journey — site progress, launches and community stories, live from our official channels."
        breadcrumb="Social Awareness"
        image="/images/projects/grand-green-valley/card.jpg"
      />

      {/* 1 — INSTAGRAM: live profile + last 6 image posts */}
      <SectionShell
        id="instagram"
        icon={Instagram}
        eyebrow={`@${SOCIALS.instagram.handle}`}
        title={<>Live on <span className="gold-text">Instagram</span></>}
        subtitle="The latest six photo posts, straight from our official feed."
        action={{ href: SOCIALS.instagram.url, label: 'Follow on Instagram' }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {SOCIALS.instagram.posts.map((p, i) => {
            const src = igEmbedSrc(p)
            return (
              src && (
                <Reveal key={src} delay={(i % 3) * 0.08}>
                  <div className="card-glass overflow-hidden">
                    <iframe
                      src={src}
                      title={`Instagram post ${i + 1}`}
                      className="w-full block"
                      style={{ height: 540 }}
                      frameBorder="0"
                      scrolling="no"
                      loading="lazy"
                      allow="encrypted-media"
                    />
                  </div>
                </Reveal>
              )
            )
          })}
        </div>
      </SectionShell>

      {/* 2 — YOUTUBE: latest 3 videos with titles */}
      <SectionShell
        id="youtube"
        icon={Youtube}
        eyebrow="@AhinsaGroupAgra"
        title={<>Watch us on <span className="gold-text">YouTube</span></>}
        subtitle="Our three latest films — walkthroughs, launches and site progress."
        action={{ href: SOCIALS.youtube.url, label: 'Subscribe on YouTube' }}
        alt
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SOCIALS.youtube.videos.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.08}>
              <div className="card-glass overflow-hidden h-full flex flex-col">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    className="w-full h-full block"
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5 flex-1">
                  <h3 className="text-fg text-sm font-medium leading-relaxed">{v.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* 3 — FACEBOOK: individual posts (no reels) */}
      <SectionShell
        id="facebook"
        icon={Facebook}
        eyebrow="Ahinsa Group Agra"
        title={<>Join us on <span className="gold-text">Facebook</span></>}
        subtitle="Highlights from our official page."
        action={{ href: SOCIALS.facebook.url, label: 'Follow on Facebook' }}
      >
        <div className="flex flex-wrap justify-center gap-7">
          {SOCIALS.facebook.posts.map((postUrl, i) => (
            <Reveal key={postUrl} delay={i * 0.08} className="w-full max-w-[500px]">
              <div className="card-glass overflow-hidden">
                <iframe
                  src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(postUrl)}&width=500&show_text=true`}
                  title={`Facebook post ${i + 1}`}
                  className="w-full block"
                  style={{ height: 720 }}
                  frameBorder="0"
                  scrolling="no"
                  loading="lazy"
                  allow="encrypted-media"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* 4 — LINKEDIN: profile card (no embed exists for company pages) */}
      <SectionShell
        id="linkedin"
        icon={Linkedin}
        eyebrow="Ahinsa Group Agra"
        title={<>Connect on <span className="gold-text">LinkedIn</span></>}
        subtitle="Corporate updates, milestones and careers at Ahinsa Group."
        action={{ href: SOCIALS.linkedin.url, label: 'Follow on LinkedIn' }}
        alt
      >
        <Reveal>
          <div className="card-glass max-w-lg mx-auto overflow-hidden">
            {/* banner */}
            <div className="h-24 bg-gradient-to-r from-gold-700/40 via-gold-500/30 to-gold-700/40 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,162,39,0.25),transparent_60%)]" />
            </div>
            <div className="px-8 pb-8 -mt-10 relative">
              <div className="w-20 h-20 bg-ink-900 border border-gold-500/50 flex items-center justify-center">
                <Logo size="sm" />
              </div>
              <h3 className="font-serif text-2xl text-fg mt-4">Ahinsa Group Agra</h3>
              <p className="text-fg-soft text-sm mt-1">Real Estate Development</p>
              <div className="flex items-center gap-2 text-fg-soft text-xs mt-2">
                <MapPin className="w-3.5 h-3.5 text-gold-500" /> Agra, Uttar Pradesh · Gwalior, Madhya Pradesh
              </div>
              <p className="text-fg-soft text-sm leading-relaxed mt-4">
                Building legacies, crafting lifestyles — follow our company page for corporate news,
                project milestones and opportunities to build with us.
              </p>
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </>
  )
}
