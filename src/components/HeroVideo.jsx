import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

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
 * Chromeless background video for hero sections, with a volume control.
 *
 * The YouTube player paints its own controls (play/pause, prev/next) during
 * start-up — `controls=0` alone doesn't hide them on the touch UI. So:
 *  - a poster image always sits underneath at the same opacity
 *  - the video only fades in a few seconds AFTER playback starts, once the
 *    player's start-up chrome has auto-hidden
 *  - looping is done manually (seek back to 0 behind the poster) instead of
 *    the `playlist` param, so the prev/next playlist buttons never exist
 *  - the iframe never receives pointer events, so no hover/tap chrome either
 *
 * Sound: the video tries to start UNMUTED. Browsers block unmuted autoplay
 * unless the visitor has already engaged with the site, so when that happens we
 * fall back to muted playback (the hero still moves) and unmute on the very
 * first click/tap/keypress, which counts as the required user gesture.
 */
export default function HeroVideo({ videoId, poster, alt = '', defaultVolume = 60 }) {
  const hostRef = useRef(null)
  const playerRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const [volume, setVolume] = useState(defaultVolume)
  const [muted, setMuted] = useState(false)

  // Mirrors of the state for use inside listeners that outlive a render.
  const mutedRef = useRef(muted)
  const volumeRef = useRef(volume)
  // True only while the player is muted because autoplay-with-sound was
  // blocked — never when the visitor muted it themselves.
  const autoMutedRef = useRef(false)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])
  useEffect(() => {
    volumeRef.current = volume
  }, [volume])

  useEffect(() => {
    let player = null
    let revealTimer = null
    let blockedTimer = null
    let destroyed = false
    let started = false
    let gestureEvents = null

    // The visitor's first gesture lets us turn sound on after a blocked start.
    const unmuteOnGesture = () => {
      if (!autoMutedRef.current || !playerRef.current) return
      autoMutedRef.current = false
      playerRef.current.unMute()
      playerRef.current.setVolume(volumeRef.current)
      setMuted(false)
      removeGestureListeners()
    }
    const removeGestureListeners = () => {
      if (!gestureEvents) return
      gestureEvents.forEach((ev) => window.removeEventListener(ev, unmuteOnGesture))
      gestureEvents = null
    }
    const addGestureListeners = () => {
      if (gestureEvents) return
      gestureEvents = ['pointerdown', 'touchstart', 'keydown']
      gestureEvents.forEach((ev) =>
        window.addEventListener(ev, unmuteOnGesture, { once: false, passive: true })
      )
    }

    loadYouTubeAPI().then((YT) => {
      if (destroyed || !hostRef.current || !YT) return
      player = new YT.Player(hostRef.current, {
        width: '100%',
        height: '100%',
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 0,
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
            playerRef.current = e.target
            e.target.setVolume(defaultVolume)
            e.target.unMute()
            e.target.playVideo()
            setReady(true)

            // If sound-on autoplay was refused, playback never reaches PLAYING.
            // Retry muted so the hero isn't a frozen poster.
            blockedTimer = setTimeout(() => {
              if (started || destroyed) return
              autoMutedRef.current = true
              setMuted(true)
              e.target.mute()
              e.target.playVideo()
              addGestureListeners()
            }, 1500)
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) {
              started = true
              clearTimeout(blockedTimer)
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
      clearTimeout(blockedTimer)
      removeGestureListeners()
      playerRef.current = null
      if (player && player.destroy) player.destroy()
    }
  }, [videoId, defaultVolume])

  const toggleMute = () => {
    const next = !muted
    autoMutedRef.current = false
    setMuted(next)
    const p = playerRef.current
    if (!p) return
    if (next) {
      p.mute()
    } else {
      // Unmuting at zero would be a silent "on" — give it an audible level.
      const level = volume > 0 ? volume : defaultVolume
      setVolume(level)
      p.setVolume(level)
      p.unMute()
    }
  }

  const changeVolume = (value) => {
    const level = Number(value)
    autoMutedRef.current = false
    setVolume(level)
    const p = playerRef.current
    if (p) p.setVolume(level)

    if (level === 0 && !muted) {
      setMuted(true)
      if (p) p.mute()
    } else if (level > 0 && muted) {
      setMuted(false)
      if (p) p.unMute()
    }
  }

  const sliderValue = muted ? 0 : volume

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        .hero-vol {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          height: 16px;
          cursor: pointer;
        }
        .hero-vol::-webkit-slider-runnable-track {
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.28);
        }
        .hero-vol::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          margin-top: -4.5px;
          border-radius: 50%;
          background: #C9A227;
        }
        .hero-vol::-moz-range-track {
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.28);
        }
        .hero-vol::-moz-range-progress {
          height: 3px;
          border-radius: 999px;
          background: #C9A227;
        }
        .hero-vol::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border: 0;
          border-radius: 50%;
          background: #C9A227;
        }
        .hero-vol:focus-visible {
          outline: 2px solid #C9A227;
          outline-offset: 4px;
        }
      `}</style>

      {/* Poster: covers loading + loop restarts, crossfades OUT when the video
          is revealed so the two never show at the same time (no ghosting) */}
      <img
        src={poster}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover hero-img transition-opacity duration-1000 ${
          visible ? 'opacity-0' : 'opacity-60'
        }`}
      />

      {/* Oversized 16:9 frame that covers the section, video crossfades in */}
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

      {/* VOLUME — right edge, above the shield. Vertically centred so it stays
          clear of the hero copy (bottom-left) and the WhatsApp button. Only the
          speaker button shows at rest; the vertical slider rises out of it on
          hover (and on keyboard focus, so it stays reachable without a mouse). */}
      {ready && (
        <div className="group absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          {/* The wrapper's bottom padding bridges the gap to the button, so the
              slider doesn't vanish as the pointer travels up to it. */}
          <div className="absolute bottom-full pb-3 opacity-0 translate-y-1 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
            <div className="rounded-full border border-gold-500/30 bg-ink-900/70 px-2 py-3 backdrop-blur-sm">
              <div className="relative h-28 w-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={sliderValue}
                  onChange={(e) => changeVolume(e.target.value)}
                  aria-label="Video volume"
                  className="hero-vol absolute left-1/2 top-1/2 w-28 -translate-x-1/2 -translate-y-1/2 -rotate-90"
                  style={{
                    background: `linear-gradient(to right, #C9A227 ${sliderValue}%, transparent ${sliderValue}%)`,
                    backgroundSize: '100% 3px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            className="rounded-full border border-gold-500/30 bg-ink-900/60 p-2.5 text-cream/90 backdrop-blur-sm transition hover:border-gold-500/60 hover:text-gold-400"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      )}
    </div>
  )
}
