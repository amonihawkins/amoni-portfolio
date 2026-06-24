import { useState, useEffect } from 'react'
import './Hero.css'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  // Slight delay so entrance animation triggers after paint
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero" id="top">
      <div className={`hero-grid ${mounted ? 'in' : ''}`}>

        <div className="hero-main">

          <h1 className="hero-greet">
            Hello, there! <span className="wave" aria-hidden>👋</span>
          </h1>

          <p className="hero-line">
            I&rsquo;m a{' '}
            <span className="hero-role">Human-Centered Technologist<sup>*</sup></span>
            {' '}who turns complex user problems into thoughtful digital experiences
            through curiosity, craft, and code.
          </p>

          <p className="hero-footnote">*where UX meets CS</p>

          {/* Skill pills — staggered entrance */}
          <div className="skill-pills">
            {['Prototyping', 'Storytelling', 'Synthesis', 'Front-End Dev', 'Usability'].map((s, i) => (
              <span key={s} className="pill" style={{ transitionDelay: `${0.4 + i * 0.06}s` }}>{s}</span>
            ))}
          </div>

          <ul className="prev-roles">
            <li>Curr. <strong>Technology Consultant</strong> @ EY GPS</li>
            <li>Prev. <strong>UX Designer Intern</strong> @ Blackbaud</li>
            <li>Prev. <strong>Software Development Engineer Intern</strong> @ Zillow</li>
          </ul>
        </div>

        {/* Portrait — TODO: replace src with /assets/headshot.jpg */}
        <div className="hero-portrait">
          <div className="portrait-card">
            <img
              src="/assets/AmoniHeadshot.JPG"
              alt="Amoni Hawkins"
              className="portrait-img"
              onError={e => e.target.style.display='none'}
            />
            <div className="portrait-badge">
              <span className="serif-text">designs</span>
              <span className="portrait-badge-arrow">↗</span>
              <span className="serif-text">code</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
