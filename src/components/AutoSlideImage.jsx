import { useEffect, useRef, useState } from 'react'

const FADE_MS = 800

/* Cycles through a project's own images, one every `interval` ms.

   Every frame stays mounted and stacked; only opacity changes. Two rules keep
   the change from reading as a blink:

   - nothing is ever swapped in and out of the DOM, so there is no frame where
     the browser has dropped one image and not yet painted the next;
   - the image being replaced holds full opacity *underneath* the one arriving,
     and only drops out once it is completely covered. Fading one out while the
     other fades in leaves both half transparent in the middle, and the page
     behind shows through.

   Falls back to a single static image when only one is given. */
export default function AutoSlideImage({ images, alt, className = '', interval = 2000 }) {
  const list = (images || []).filter(Boolean)
  const key = list.join('|')

  const [index, setIndex] = useState(0)
  // The image still holding the frame beneath the one fading in.
  const [under, setUnder] = useState(null)
  const indexRef = useRef(0)

  useEffect(() => {
    if (list.length <= 1) return
    indexRef.current = 0
    setIndex(0)
    setUnder(null)

    let uncover
    const id = setInterval(() => {
      const next = (indexRef.current + 1) % list.length
      setUnder(indexRef.current)
      indexRef.current = next
      setIndex(next)
      clearTimeout(uncover)
      uncover = setTimeout(() => setUnder(null), FADE_MS)
    }, interval)

    return () => {
      clearInterval(id)
      clearTimeout(uncover)
    }
  }, [key, interval])

  if (!list.length) return null

  // Single image: render it plainly. No slideshow, no crossfade.
  if (list.length === 1) {
    return <img src={list[0]} alt={alt} className={className} />
  }

  return (
    // `isolate` keeps these z-indexes to themselves, so a badge sitting over
    // the frame is not pushed behind the photos.
    <div className="relative w-full h-full isolate">
      {list.map((src, i) => (
        <img
          key={`${src}|${i}`}
          src={src}
          alt={i === index ? alt : ''}
          aria-hidden={i === index ? undefined : 'true'}
          className={`absolute inset-0 ${className}`}
          style={{
            opacity: i === index || i === under ? 1 : 0,
            zIndex: i === index ? 2 : i === under ? 1 : 0,
            // Transform is named too, so `.img-zoom`'s hover zoom survives
            // this inline transition overriding it.
            transition: `opacity ${FADE_MS}ms ease-in-out, transform 800ms ease`,
          }}
        />
      ))}
    </div>
  )
}
