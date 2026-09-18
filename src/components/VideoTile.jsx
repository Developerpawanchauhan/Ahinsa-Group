import { useState } from 'react'
import { Play } from 'lucide-react'

/**
 * A YouTube video shown as its thumbnail until someone presses play.
 *
 * Each embedded player pulls in YouTube's whole script bundle, so loading one
 * only on request keeps the page as quick as the images around it. Used by the
 * project gallery and the profiles on the Management page.
 *
 * @param src  a YouTube embed URL — https://www.youtube.com/embed/<id>
 */
export default function VideoTile({ src, title, className = '' }) {
  const [playing, setPlaying] = useState(false)
  const id = src.split('/').pop()

  return (
    <div className={`relative aspect-video overflow-hidden border border-soft bg-ink-900 ${className}`}>
      {playing ? (
        <iframe
          title={title}
          src={`${src}?autoplay=1&rel=0`}
          className="absolute inset-0 w-full h-full"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 w-full h-full"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-80 transition duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-gold-500 text-ink-900 flex items-center justify-center shadow-lg transition group-hover:scale-110">
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
