import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './hooks/useTheme.jsx'
import './index.css'

// Apply theme class as early as possible to avoid flash of wrong theme
;(function applyInitialTheme() {
  try {
    const saved = localStorage.getItem('ahinsa-theme')
    const theme = saved === 'light' || saved === 'dark' ? saved : 'dark'
    if (theme === 'dark') document.documentElement.classList.add('dark')
  } catch (_) {
    document.documentElement.classList.add('dark')
  }
})()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
