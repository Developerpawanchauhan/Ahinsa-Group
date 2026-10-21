import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {}, lightOnly: false })

const THEME_KEY = 'ahinsa-theme'

// Pages designed for the light theme only (the Rohit Jain article reads like a
// printed profile; the portfolio is the link page for social bios). They show
// light whatever the visitor picked, hide the theme switch, and leave the
// saved choice alone for every other page.
const LIGHT_ONLY_PATHS = ['/rohit-jain', '/portfolio']

export function isLightOnly(pathname) {
  return LIGHT_ONLY_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch (_) {}
  // default to dark to preserve current luxury feel
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const lightOnly = isLightOnly(useLocation().pathname)

  // A layout effect, so the class is right before the browser paints — moving
  // to or from a light-only page would otherwise flash the other theme.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark' && !lightOnly)
  }, [theme, lightOnly])

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch (_) {}
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, lightOnly }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
