import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* Cycles through a project's own images with a crossfade, one image every
   `interval` ms. Falls back to a single static image when only one is given. */
export default function AutoSlideImage({ images, alt, className = '', interval = 2000 }) {
  const list = (images || []).filter(Boolean)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (list.length <= 1) return
    setIndex(0)
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), interval)
    return () => clearInterval(id)
  }, [list.join('|'), interval])

  if (!list.length) return null

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        <motion.img
          key={list[index]}
          src={list[index]}
          alt={alt}
          className={`absolute inset-0 ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  )
}
