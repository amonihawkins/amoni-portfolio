import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Add a subtle border when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">

        {/* Logo / name */}
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-icon">AH</span>
          <span className="navbar__logo-text">AMONI HAWKINS</span>
        </a>

        {/* Desktop nav links */}
        <nav className="navbar__links">
          <a href="/#work" className="navbar__link" data-cursor="link">WORK</a>
          <a href="/about" className="navbar__link" data-cursor="link">ABOUT</a>
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__link navbar__link--cta"
            data-cursor="link"
          >
            RESUME
          </a>
        </nav>

        {/* Mobile hamburger — YOUR TASK: wire up the menu drawer */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-bar ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="navbar__mobile-menu">
          <a href="#work"   onClick={() => setMenuOpen(false)}>Work</a>
          <a href="/about"  onClick={() => setMenuOpen(false)}>About</a>
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Resume</a>
        </nav>
      )}
    </header>
  )
}
