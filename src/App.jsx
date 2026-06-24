import { useState, useEffect } from 'react'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Testimonials from './components/Testimonials.jsx'
import Footer from './components/Footer.jsx'
import About from './components/About.jsx'
import GoogleCalendar from './components/projects/GoogleCalendar.jsx'
import Flikshop from './components/projects/Flikshop.jsx'
import TripAdvisor from './components/projects/TripAdvisor.jsx'
import HortiCare from './components/projects/HortiCare.jsx'
import AboutTeaser from './components/AboutTeaser.jsx'

function usePage() {
  const [page, setPage] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPage(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return page
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const page = usePage()
  useScrollReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page])

  useEffect(() => {
    if (window.location.hash === '#work') {
      setTimeout(() => {
        const el = document.getElementById('work')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          window.history.replaceState({}, '', '/')
        }
      }, 100)
    }
  }, [page])


  const renderPage = () => {
    if (page === '/about') return <About />
    if (page === '/work') return <Projects />
    if (page === '/projects/google-calendar') return <GoogleCalendar />
    if (page === '/projects/flikshop') return <Flikshop />
    if (page === '/projects/tripadvisor') return <TripAdvisor />
    if (page === '/projects/horticare') return <HortiCare />
    return (
      <>
        <Hero />
        <div data-reveal><Projects /></div>
        <div data-reveal><AboutTeaser /></div>
        <div data-reveal><Testimonials /></div>
      </>
    )
  }

  return (
    <>
      <Cursor />
      <Navbar />
      {renderPage()}
      <Footer />
    </>
  )
}
