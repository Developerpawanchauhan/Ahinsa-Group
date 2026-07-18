import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Linear pacing. These stats span very different magnitudes (4 vs 500), and an
// ease-out parks a small counter on its second-to-last value for most of the run
// (counting to 4, "3" would hold for ~1.5s). Linear keeps every counter ticking
// steadily so they all climb and land together.
const linear = (t) => t

/**
 * Counts a stat value up from 0 when it scrolls into view.
 * Preserves any non-numeric suffix, e.g. "5K+" -> counts 0..5 and keeps "K+",
 * "500+" -> counts 0..500 and keeps "+".
 */
export default function CountUp({ value, duration = 2000, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Split "500+" into number (500) and suffix ("+").
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : String(value)
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0

  const [display, setDisplay] = useState(() => (0).toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    // Truncate rather than round, so the final value is reached at the end of the
    // duration instead of rounding up to it partway through.
    const factor = 10 ** decimals
    let raf
    let startTs
    const tick = (ts) => {
      if (startTs === undefined) startTs = ts
      const progress = Math.min((ts - startTs) / duration, 1)
      const current = target * linear(progress)
      setDisplay((Math.floor(current * factor) / factor).toFixed(decimals))
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(target.toFixed(decimals))
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
