import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="foot" id="contact">
      <div className="foot-inner">
        <div className="foot-grid">
          <div className="foot-main">
            <h2 className="foot-title">
              Like what you see?{' '}
              <span className="foot-talk">Let&rsquo;s talk!</span>
            </h2>
            <p className="foot-sub">Based in Suitland, MD</p>

            <div className="foot-rows">
              <div className="foot-row">
                <p className="mono foot-label">Contact Me</p>
                <a href="mailto:amoni.hawkins@gmail.com" className="foot-link">
                  amoni.hawkins@gmail.com
                </a>
              </div>
              <div className="foot-row">
                <p className="mono foot-label">Connect With Me</p>
                <div className="foot-link-row">
                  <a href="https://www.linkedin.com/in/amonihawkins/" target="_blank" rel="noopener noreferrer" className="foot-link">
                    LinkedIn <span className="ext">↗</span>
                  </a>
                  <a href="https://github.com/amonihawkins" target="_blank" rel="noopener noreferrer" className="foot-link">
                    GitHub <span className="ext">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <nav className="foot-nav">
            <a href="#work">WORK</a>
            <a href="/about">ABOUT</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a>
          </nav>
        </div>

        <div className="foot-base">
          <div className="foot-base-left">
            <div className="foot-base-name">AMONI HAWKINS</div>
            <div className="foot-base-sub">UX Researcher &amp; Front-End Developer</div>
          </div>
          <div className="foot-base-right">
            <div>© {year} Amoni Hawkins. All rights reserved.</div>
            <div className="foot-base-sub">Last updated June 2026</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
