import { useEffect, useState } from 'react'

/**
 * Subscribes to a CSS media query. SSR/first-paint safe — returns `false`
 * until the browser has been measured.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True on phone-sized viewports — where the mobile reveal choreography runs. */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}

export default useMediaQuery
