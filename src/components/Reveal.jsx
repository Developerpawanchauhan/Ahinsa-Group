import { useId } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'

/**
 * Scroll reveal primitive.
 *
 * Same animation everywhere — fade in over 0.7s with the original easing.
 * The only difference on phones is the direction it travels from: most
 * elements still rise from the bottom, some slide in from the left, some
 * from the right.
 *
 * Pass `from` ('up' | 'left' | 'right') to pin a direction; otherwise each
 * instance picks one from the cycle below, stable across re-renders.
 */

// Mostly 'up' so the page still feels settled, with sides mixed through it.
const MOBILE_DIRECTIONS = ['up', 'left', 'up', 'right', 'up', 'left', 'up', 'right']

const SLIDE = 36

function pickDirection(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return MOBILE_DIRECTIONS[hash % MOBILE_DIRECTIONS.length]
}

export default function Reveal({ children, delay = 0, y = 30, from, className = '', once = true }) {
  const id = useId()
  const isMobile = useIsMobile()

  let offset = { y }
  if (isMobile) {
    const direction = from || pickDirection(id)
    if (direction === 'left') offset = { x: -SLIDE }
    else if (direction === 'right') offset = { x: SLIDE }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
