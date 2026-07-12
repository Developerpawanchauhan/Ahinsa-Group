import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Fast start, gentle settle — makes the number "shoot up" then ease into place.
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Counts a stat value up from 0 when it scrolls into view.
 * Preserves any non-numeric suffix, e.g. "5K+" -> counts 0..5 and keeps "K+",
 * "500+" -> counts 0..500 and keeps "+".
 */
export default function CountUp({ value, duration = 2500, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  // Split "500+" into number (500) and suffix ("+").
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : String(value)
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0

  const [display, setDisplay] = useState(() => (0).toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(target.toFixed(decimals))
      return
    }
    let raf
    let startTs
    const tick = (ts) => {
      if (startTs === undefined) startTs = ts
      const progress = Math.min((ts - startTs) / duration, 1)
      setDisplay((target * easeOutCubic(progress)).toFixed(decimals))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduceMotion, target, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
