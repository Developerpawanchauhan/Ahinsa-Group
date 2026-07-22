import { useEffect, useRef, useState } from 'react'

// Load the YouTube IFrame API once, shared across all instances.
let ytApiPromise = null
function loadYouTubeAPI() {
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev()
      resolve(window.YT)
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })
  return ytApiPromise
}

/**
 * Chromeless background video for hero sections.
 *
 * The YouTube player paints its own controls (play/pause, prev/next) during
 * start-up — `controls=0` alone doesn't hide them on the touch UI. So:
 *  - a poster image always sits underneath at the same opacity
 *  - the video only fades in a few seconds AFTER playback starts, once the
 *    player's start-up chrome has auto-hidden
 *  - looping is done manually (seek back to 0 behind the poster) instead of
 *    the `playlist` param, so the prev/next playlist buttons never exist
 *  - the iframe never receives pointer events, so no hover/tap chrome either
 */
export default function HeroVideo({ videoId, poster, alt = '' }) {
  const hostRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let player = null
    let revealTimer = null
    let destroyed = false

    loadYouTubeAPI().then((YT) => {
      if (destroyed || !hostRef.current || !YT) return
      player = new YT.Player(hostRef.current, {
        width: '100%',
        height: '100%',
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
        },
        events: {
          onReady: (e) => {
            e.target.mute()
            e.target.playVideo()
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) {
              // Reveal only after the start-up controls have auto-hidden.
              clearTimeout(revealTimer)
              revealTimer = setTimeout(() => setVisible(true), 3500)
            } else if (e.data === YT.PlayerState.ENDED) {
              // Manual loop: hide behind the poster, restart, fade back in.
              clearTimeout(revealTimer)
              setVisible(false)
              e.target.seekTo(0)
              e.target.playVideo()
            }
          },
        },
      })
    })

    return () => {
      destroyed = true
      clearTimeout(revealTimer)
      if (player && player.destroy) player.destroy()
    }
  }, [videoId])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Poster: always present, covers loading + loop restarts */}
      <img src={poster} alt={alt} className="absolute inset-0 w-full h-full object-cover opacity-60 hero-img" />

      {/* Oversized 16:9 frame that covers the section, video fades in over the poster */}
      <div
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none transition-opacity duration-1000 ${
          visible ? 'opacity-60' : 'opacity-0'
        }`}
      >
        <div ref={hostRef} className="w-full h-full" />
      </div>

      {/* Transparent shield so clicks/taps never reach the player */}
      <div className="absolute inset-0 z-10" aria-hidden="true" />
    </div>
  )
}
