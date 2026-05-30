import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Management from './pages/Management'
import TeamMembers from './pages/TeamMembers'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Media from './pages/Media'
import Awards from './pages/Awards'
import Events from './pages/Events'
import News from './pages/News'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* About + sub-pages */}
          <Route path="/about" element={<About />} />
          <Route path="/about/management" element={<Management />} />
          <Route path="/about/team" element={<TeamMembers />} />

          {/* Projects + dynamic detail */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          {/* Media + sub-pages */}
          <Route path="/media" element={<Media />} />
          <Route path="/media/awards" element={<Awards />} />
          <Route path="/media/events" element={<Events />} />
          <Route path="/media/news" element={<News />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
