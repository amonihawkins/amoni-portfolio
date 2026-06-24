import './AboutTeaser.css'

export default function AboutTeaser() {
  return (
    <section className="about-teaser" id="about">
      <div className="about-teaser__inner">
        <p className="mono section-kicker">A Little About Me</p>
        <div className="about-teaser__grid">

          <div className="about-teaser__body">
            <p className="about-teaser__lede">
              Hi, I&rsquo;m Amoni — a DMV-based multidisciplinary technologist
              with a computer science background. I&rsquo;m a researcher who
              writes her own prototypes.
            </p>
            <p>
              I&rsquo;ve led research for accessibility tools, civic-tech
              platforms, and social enterprise clients. Lately I&rsquo;m
              thinking a lot about{' '}
              <em>how we design affirming digital spaces for under-heard
              communities</em>.
            </p>
            <a
              href="/about"
              className="about-teaser__btn"
              onClick={e => {
                e.preventDefault()
                window.history.pushState({}, '', '/about')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
            >
              More about me <span className="feat-link-arrow">→</span>
            </a>
          </div>

          <dl className="about-teaser__facts">
            <div><dt>Based</dt><dd>Suitland, MD</dd></div>
            <div><dt>Studied</dt><dd>BS CS · MS HCI</dd></div>
            <div><dt>Tools</dt><dd>Figma · Miro · React</dd></div>
            <div><dt>Values</dt><dd>Inclusivity · Empathy · Empowerment</dd></div>
          </dl>

        </div>
      </div>
    </section>
  )
}