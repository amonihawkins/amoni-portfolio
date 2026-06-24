import './CaseStudy.css'
import { useState, useEffect } from 'react'

const SURVEY_GROUPS = [
  {
    group: 'Military Members',
    desc: 'between 20–50 years old, across different branches (Air Force, Army etc.), who regularly communicates with parents & friends',
    color: {
      bg: '#F5EEF9',
      border: '#6B1DA7',
      text: '#4A1275',
      num: '#6B1DA7',
    },
    stats: [
      { num: '60%',      detail: 'had daily access to technology when stationed away from home' },
      { num: 'Only 20%', detail: 'lacked access to communication-type platforms and apps' },
      { num: '100%',     detail: 'preferred video calling and texting over physical media (postcards, letters)' },
      { num: '80%',      detail: 'faced communication challenges when stationed away from home' },
    ],
    takeaway: 'Communication challenges military members currently face (such as time zone differences) are unrelated to Flikshop\'s services, which does NOT indicate a need for the platform.',
  },
  {
    group: 'Elderly Relatives',
    desc: 'between 55-85 years old, with access to at least one technological device, who regularly communicates with 8+ relatives',
    color: {
      bg: '#F5EEF9',
      border: '#6B1DA7',
      text: '#4A1275',
      num: '#6B1DA7',
    },
    stats: [
      { num: '71%', detail: 'feel ‘very comfortable’ using technology to share/view photos' },
      { num: '100%', detail: 'use technology every day as a part of their routine' },
      { num: 'Only 14%', detail: 'preferred sharing and viewing photos in-person over digital formats' },
      { num: '71%', detail: 'usually receives/shares photos with their relatives through text messaging apps' },
    ],
    takeaway: 'Most individuals over the age of 55 engage in digital photo-sharing contradicting the assumption that they prefer physical methods, and showing little need for Flikshop.',
  },
]

function SurveyCarousel() {
  const [cur, setCur] = useState(0)
  const group = SURVEY_GROUPS[cur]
  const c = group.color

  return (
    <div className="cs-survey" style={{ borderColor: c.border, transition: 'border-color 0.4s' }}>

      <div className="cs-survey__head" style={{ background: c.bg, transition: 'background 0.4s' }}>
        <div>
          <p className="cs-survey__group" style={{ color: c.text }}>{group.group}</p>
          <p className="cs-survey__desc">{group.desc}</p>
        </div>
        <span className="cs-survey__counter">{cur + 1} / {SURVEY_GROUPS.length}</span>
      </div>

      <div className="cs-survey__stats">
        {group.stats.map((s, i) => (
          <div key={i} className="cs-survey__stat">
            <p className="cs-survey__num" style={{ color: c.num, transition: 'color 0.4s' }}>{s.num}</p>
            <p className="cs-survey__detail">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="cs-survey__takeaway" style={{ background: c.bg, transition: 'background 0.4s' }}>
        <span className="cs-survey__takeaway-label" style={{ color: c.text }}>Takeaway</span>
        <p>{group.takeaway}</p>
      </div>

      <div className="cs-survey__footer">
        <div className="cs-survey__dots">
          {SURVEY_GROUPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              className={`cs-carousel__dot ${i === cur ? 'cs-carousel__dot--active' : ''}`}
              style={i === cur ? { background: c.border, width: '20px' } : {}}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setCur(prev => prev - 1)} disabled={cur === 0} className="cs-carousel__btn">←</button>
          <button onClick={() => setCur(prev => prev + 1)} disabled={cur === SURVEY_GROUPS.length - 1} className="cs-carousel__btn">→</button>
        </div>
      </div>
    </div>
  )
}

const COMPETITOR_IMAGES = [
  { img: '/assets/flik-competitor-1.png', alt: 'Competitive analysis matrix 1' },
  { img: '/assets/flik-competitor-2.png', alt: 'Competitive analysis matrix 2' },
  { img: '/assets/flik-competitor-3.png', alt: 'Competitive analysis matrix 3' },
]

function ImageCarousel({ images }) {
  const [cur, setCur] = useState(0)
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {/* Lightbox overlay */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(255, 255, 255, .9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '40px',
          }}
        >
          <img
            src={images[cur].img}
            alt={images[cur].alt}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setExpanded(false)}
            style={{
              position: 'absolute', top: '20px', right: '24px',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: '#000000', fontSize: '20px', cursor: 'pointer',
              width: '36px', height: '36px', borderRadius: '50%',
            }}
          >✕</button>
        </div>
      )}

      <div className="cs-concept-single">
        <div
          className="cs-concept-single__image"
          onClick={() => setExpanded(true)}
          style={{ cursor: 'zoom-in' }}
        >
          <img
            src={images[cur].img}
            alt={images[cur].alt}
            onError={e => e.target.style.display='none'}
          />
        </div>
        <div className="cs-concept-single__footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => setCur(c => c - 1)} disabled={cur === 0} className="cs-carousel__btn">←</button>
            <button onClick={() => setCur(c => c + 1)} disabled={cur === images.length - 1} className="cs-carousel__btn">→</button>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setCur(i)}
                className={`cs-carousel__dot ${i === cur ? 'cs-carousel__dot--active' : ''}`}
              />
            ))}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
            {cur + 1} / {images.length}
          </span>
        </div>
      </div>
    </>
  )
}

const SLIDES = [
  {
    task: 'My Selected Concept',
    title: 'Flikshop Angels Landing Page',
    desc: 'I considered how users would want to know what the program is right off the bat. After reading this information, providing concrete numbers is a marketing strategy that instills user trust and credibility. Finally, to further promote Flikshop Angels, I included user testimonials and donor shoutouts to show a sense of connection and encouragement.',
    img: '/assets/flik-midfi1.png',
  },
  {
    task: 'Shanikka\'s Chosen Concept',
    title: 'Desktop Homepage',
    desc: 'Users can interact with a carousel that presents our hero video (Marcus\' Ted Talk) along with prominent CTAs to encourage engagement. Flikshop\'s mission statement is then followed by clear product vertical introductions for increased discoverability/findability. Finally, her sketch ends with a section highlighting the number of families Flikshop has helped to showcase impact.',
    img: '/assets/flik-midfi2.png',
  },
  {
    task: 'Nice-To-Haves',
    title: 'Add-Ons if Extra Time ',
    desc: 'A points portal/rewards system to encourage engagement and retention. Flikshop Angel subscription sign-up options',
    img: '/assets/flik-midfi3.png',
  },
]

function ScreenCarousel() {
  const [cur, setCur] = useState(0)
  const slide = SLIDES[cur]

  return (
    <div className="cs-carousel">
      <div className="cs-carousel__slide">
        <div className="cs-carousel__image">
          <img src={slide.img} alt={slide.title} onError={e => e.target.style.display='none'} />
        </div>
        <div className="cs-carousel__body">
          <span className="cs-carousel__tag">{slide.task}</span>
          <p className="cs-carousel__title">{slide.title}</p>
          <p className="cs-carousel__desc">{slide.desc}</p>
        </div>
      </div>

      <div className="cs-carousel__footer">
        <div className="cs-carousel__dots">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`cs-carousel__dot ${i === cur ? 'cs-carousel__dot--active' : ''}`}
            />
          ))}
        </div>
        <span className="cs-carousel__counter">{cur + 1} / {SLIDES.length}</span>
        <div className="cs-carousel__btns">
          <button onClick={() => setCur(c => c - 1)} disabled={cur === 0} className="cs-carousel__btn">←</button>
          <button onClick={() => setCur(c => c + 1)} disabled={cur === SLIDES.length - 1} className="cs-carousel__btn">→</button>
        </div>
      </div>
    </div>
  )
}

export default function Flikshop() {
  const [activeSection, setActiveSection] = useState('')
  const [videoLightbox, setVideoLightbox] = useState(null)
  const [imgLightbox, setImgLightbox] = useState(null)

  useEffect(() => {
    const sections = document.querySelectorAll('.cs-section[id]')
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <main className="case-study">

      {/* ── Sticky side nav ───────────────────────────────────── */}
      <nav className="case-study__sidenav">
        {['Overview', 'Context', 'Research', 'Ideation', 'Design Iteration', 'Testing', 'Final Deliverables', 'Reflections'].map(s => (
          <a 
            key={s} 
            href={`#${s.toLowerCase().replace(' ', '-')}`} 
            className={`case-study__sidenav-link ${activeSection === s.toLowerCase().replace(' ', '-') ? 'case-study__sidenav-link--active' : ''}`}>
            {s}</a>
        ))}
      </nav>

      <div className="case-study__body">

        {imgLightbox && (
          <div
            onClick={() => setImgLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out', padding: '40px',
            }}
          >
            <img
              src={imgLightbox}
              alt="Expanded view"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setImgLightbox(null)}
              style={{
                position: 'absolute', top: '20px', right: '24px',
                background: 'rgba(255,255,255,0.1)', border: 'none',
                color: '#fff', fontSize: '20px', cursor: 'pointer',
                width: '36px', height: '36px', borderRadius: '50%',
              }}
            >✕</button>
          </div>
        )}

        {videoLightbox && (
          <div
            onClick={() => setVideoLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out', padding: '40px',
            }}
          >
            <video
              src={videoLightbox}
              autoPlay loop muted playsInline controls
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setVideoLightbox(null)}
              style={{
                position: 'absolute', top: '20px', right: '24px',
                background: 'rgba(255,255,255,0.1)', border: 'none',
                color: '#fff', fontSize: '20px', cursor: 'pointer',
                width: '36px', height: '36px', borderRadius: '50%',
              }}
            >✕</button>
          </div>
        )}

        {/* ── HERO / INTRODUCTION ───────────────────────────── */}
        <section id="overview" className="cs-section">
          <div className="cs-hero">
            <p className="cs-hero__client">Flikshop</p>
            <h1 className="cs-hero__title">
              Beyond the Postcard: Elevating Flikshop's Brand and Expanding User Engagement
            </h1>
            <div className="cs-hero__image-wrap">
              <img src="/assets/flik-hero.png" alt="Flikshop redesign overview" className="cs-hero__image" onError={e => e.target.parentElement.classList.add('cs-hero__image-wrap--empty')} />
            </div>
          </div>

          {/* About + Problem + Outcome */}
          <div className="cs-intro">
            <div className="cs-intro__text">
              <h2 className="cs-block-title">About</h2>
              <p>
                Flikshop started as a prison postcard delivery service; however, today it expands
                upon its ideals and has grown in its product offerings. Have Flikshop's users grown
                with it? Unfortunately, not. Analytics from the past calendar year indicate that the
                additional Flikshop offerings — Flikshop Angels, School of Business and Neighborhood
                — accounted for less than 2% of total page & screen views.
              </p>
              <div className="cs-problem-outcome">
                <div className="cs-callout cs-callout--problem">
                  <p className="cs-callout__label">Problem</p>
                  <p>Community members struggle to interact with services beyond Flikshop Mail, due
                  to poor marketing efforts, resulting in low app downloads, limited feature
                  engagement, and weakened brand perception.</p>
                </div>
                <div className="cs-callout cs-callout--outcome">
                  <p className="cs-callout__label">Outcome</p>
                  <p>Redesigned Flikshop's mobile & web application to incorporate new user flows
                  for Flikshop Angels, increase visibility of user testimonials, as well as update
                  the design system to strengthen brand identity and integration.</p>
                </div>
              </div>
            </div>

            <aside className="cs-meta">
              <div className="cs-meta__item">
                <p className="cs-meta__label">Team</p>
                <p>Amoni Hawkins (me)</p>
                <p>Owen Donovan</p>
                <p>Eric Yang</p>
                <p>Atin Moridian</p>
                <p>Benjamin Mao</p>
                <p>Shanikka Richardson</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">Timeline</p>
                <p>Sep 2024 – May 2025 (8 months)</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">Tools</p>
                <p>Figma, Google Analytics, Google G Suite & Zoom</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">My Main Tasks</p>
                <p>Generative Survey Analysis</p>
                <p>Evaluative Research (Test Creation)</p>
                <p>Quantitative Analysis</p>
                <p>UX Design</p>
              </div>
            </aside>
          </div>

          {/* Projected Impact */}
          <div className="cs-impact">
            <p className="cs-impact__label">
                Projected Impact —{' '}
                <a
                  href="https://www.flikshop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#AFA9EC', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  our proposed ideas are live & running ↗
                </a>
              </p>
            <div className="cs-impact__grid">
              {[
                {
                  metric: 'Increase in User Engagement',
                  chain: ['Redesigned homepage', 'Higher content discoverability', 'Fewer abandoned sessions', 'Higher click-through rates'],
                },
                {
                  metric: 'Higher Brand Recall',
                  chain: ['Updated design system', 'Improved visual consistency', 'Higher recognition rates', 'More direct traffic visits'],
                },
                {
                  metric: 'Increase in Donor Retention',
                  chain: ['Redesigned donation flow', 'Higher content engagement', 'More donations', 'Introduction of rewards program'],
                },
              ].map(item => (
                <div key={item.metric} className="cs-impact__card">
                  <div className="cs-impact__header">
                    <p className="cs-impact__arrow">↑</p>
                    <p className="cs-impact__metric">{item.metric}</p>
                  </div>
                  <div className="cs-impact__chain">
                    {item.chain.map((step, i) => (
                      <div key={step} className="cs-impact__step">
                        {i > 0 && <span className="cs-impact__chevron">→</span>}
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glance image */}
          <img src="/assets/flik-glance.png" alt="Flikshop screens at a glance" className="cs-image" onError={e => e.target.style.display='none'} />
        </section>

        {/* ── CONTEXT ───────────────────────────────────────── */}
        <section id="context" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number" style={{fontSize: '18px', fontWeight: 600}}>Context</span>
            <span>What is Flikshop?</span>
          </div>

          <p>
            Flikshop is a service-based platform that helps incarcerated individuals stay connected
            with loved ones and access reentry resources, supporting successful reintegration and
            reducing recidivism. It was founded by Marcus Bullock, who was inspired by the letters
            he received from his mother during his eight years of incarceration.
          </p>
          <p>It offers other services through Flikshop Neighborhood, Flikshop Angels, and Flikshop School of Business.</p>

          {/* Key info cards */}
          <div className="cs-findings" style={{marginTop: '4px'}}>
            {[
              {
                title: 'Target Users',
                desc: 'Flikshop primarily supports families and friends of incarcerated individuals, in addition to incarcerated individuals themselves through re-entry support programs.',
              },
              {
                title: 'Main Features',
                desc: 'Physical print creation & delivery, entrepreneurship courses/certifications, and a donor program.',
              },
              {
                title: 'Impact',
                desc: 'Flikshop has delivered at least one postcard to over 186,000 incarcerated individuals, across more than 2,200 prison facilities. In sending 400,000+ total postcards, its outreach spans across the world.',
              },
            ].map(f => (
              <div key={f.title} className="cs-finding-card">
                <div className="cs-finding-card__dot" />
                <div>
                  <p className="cs-finding-card__title">{f.title}</p>
                  <p className="cs-finding-card__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Motivation pullquote */}
          <div className="cs-pullquote">
            <p className="cs-pullquote__text">
              "Motivated by its mission to support an underserved population and drive meaningful
              change, I gained hands-on experience in client collaboration and cross-functional
              teamwork by taking on evolving roles in research, strategy and design."
            </p>
            <p className="cs-pullquote__attribution">— My motivation for this project</p>
          </div>
          <p>
            I led research efforts as the research lead, guided the team's progress as project
            manager, coordinated sprint workshops as the facilitator, and articulated design
            decisions as the presenter & stakeholder liaison, adapting my role each sprint to meet
            our evolving needs.
          </p>
        </section>

        {/* ──RESEARCH ────────────────────────────── */}
        <section id="research" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">01</span>
            <span>Understanding the Challenge through Research</span>
          </div>

          <h2 className="cs-section-title">Research Problem & Planning</h2>
          <p className="cs-section-lead">
            Flikshop was seeking strategic direction guidance on whether to expand its current
            user market or focus on improving the experience for its existing users.
          </p>
          <p>
            Due to limited access to current Flikshop users and data, we focused our research on
            competitor analysis, evaluating Flikshop's existing website and app, and 'interviewing'
            new user groups. Our client identified these groups as military members and elderly
            relatives. Through generative research, we aimed to identify our target users, usability
            gaps and growth opportunities for Flikshop.
          </p>

          {/* Competitor Analysis + Heuristic Evaluation */}
          <h2 className="cs-section-title" style={{marginTop: '32px'}}>Evaluating the Landscape</h2>
          <p className="cs-section-lead">
            To understand where Flikshop stood in its market and identify design gaps, we 
            conducted two rounds of desk research before speaking to a single user.
          </p>
          <p>
            Focusing on key features, value propositions, and marketing strategies, we explored 
            8 competitor incarceration communication and photo-sharing platforms. In parallel, 
            we evaluated Flikshop's existing product against Nielsen's 10 usability heuristics
             to pinpoint design flaws without requiring user recruitment. Together, these methods
              gave us a clear picture of both external threats and internal weaknesses.
          </p>
          <div className="cs-insights">
            <div className="cs-insight-card">
              <p className="cs-insight-card__label">Main Insight — Competitor Analysis</p>
              <p>Flikshop struggles across the areas of company size, brand visibility, power in industry connections, feature sets, and social media marketing.</p>
            </div>
            <div className="cs-insight-card">
              <p className="cs-insight-card__label">Main Insight — Heuristic Evaluation</p>
              <p>User Control and Freedom, Consistency and Standards, & Help and Documentation are Flikshop's top principles of concern.</p>
            </div>
          </div>
          <ImageCarousel images={COMPETITOR_IMAGES} />

          {/* Market Surveys */}
          <h2 className="cs-section-title" style={{marginTop: '32px'}}>Survey Findings</h2>
          <p className="cs-section-lead">
            To quickly and quantifiably assess whether new user groups had unmet needs that Flikshop 
            could address, we disseminated surveys to military members and elderly relatives — the 
            two groups our client identified as potential markets.
          </p>
          <p>With 20+ respondents across both groups, our findings pointed in a clear direction. Neither 
            group demonstrated a strong enough need for Flikshop to justify expanding the platform as 
            their communication challenges were largely unrelated to what Flikshop offers.</p>

          <SurveyCarousel />

          <p>
            With expansion off the table, I facilitated a scope negotiation with our client 
            that redirected the project toward strengthening Flikshop's existing experience by 
            surfacing the Angels program and refreshing the brand's visual language.
          </p>

            <div className="cs-hmw">
              <p className="cs-hmw__label" >Defining the Challenge</p>
              <p className="cs-hmw__text">
                How might we design a solution that encourages Flikshop users to discover, enroll in,
                and actively engage with additional product offerings beyond sending postcards?
              </p>
            </div>
        </section>

        {/* ── IDEATION ────────────────────────────── */}
        <section id="ideation" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">02</span>
            <span>Translating Findings into Concepts</span>
          </div>

          <h2 className="cs-section-title">Sprint Activities</h2>
          <p className="cs-section-lead">How can we connect all product offerings in a seamless flow?</p>

          {/* Map / Sketch / Decide / Prototype / Test steps */}
          <div className="cs-sprint-steps">
            {[
              {
                step: 'Map',
                desc: 'We collaborated with our client through a Q&A to understand branding, communication, and design choices across Flikshop\'s services. Using these insights, we generated and themed "How Might We" questions in FigJam, then prioritized two key questions to guide the next phase.',
                questions: [
                  'HMW communicate what success looks like for our users?',
                  'HMW design a desirable & easily repeatable workflow within the app that users will enjoy?',
                ],
              },
              {
                step: 'Sketch',
                desc: 'We used lightning demos and Crazy 8s to inspire rapid, diverse ideas and overcome creative blocks. Each team member iterated on solutions, then refined the strongest concept into a final sketch. My sketch is titled "Product Hub".',
                imgs: [
                  { src: '/assets/flik-lightning-demos.png', caption: 'All of the team\'s lightning demos drawn out by me' },
                  { src: '/assets/flik-sketch-hub.png', id: "producthub-sketch", caption: 'My "Product Hub" solution sketch' },
                ],
              },
              {
                step: 'Decide \u2192 Prototype',
                desc: 'We presented our solution sketches to our client, whose supervote highlighted the top concepts. With overlapping ideas, we combined them into a single concept to carry forward which we then turned into a mid-fidelity prototype for testing.',
              },
              {
                step: 'Test',
                desc: 'We conducted a remote, moderated Zoom study using the think-aloud method to observe our pilot user navigate the prototype, gather real-time insights, and validate our design',
                quotes: [
                  'I really like the idea of getting a user acquainted with the app at first as well as using the intuitive platform switcher!',
                  'The text is small... the buttons could also be a bit bigger for greater readability.',
                  'There is too much clutter on the home screen. This information could be toggled into different sections.',
                  'I liked the tooltips as they helped me to learn more about the app and different services.',
  
                ]
              },
            ].map(s => (
              <div key={s.step} className="cs-sprint-step">
                <span className="cs-sprint-step__label">{s.step}</span>
                <div style={{ minWidth: 0 }}> 
                  <p>{s.desc}</p>
                  {s.imgs && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                      {s.imgs.map((img, i) => (
                        <div key={i} style={{ cursor: 'zoom-in' }} onClick={() => setImgLightbox(img.src)}>
                          <img
                            src={img.src}
                            alt={img.caption}
                            className="cs-image"
                            style={{ height: '340px', objectFit: 'cover', objectPosition: 'top' }}
                            onError={e => e.target.style.display='none'}
                          />
                          <p className="cs-image-caption" style={{ marginTop: '8px' }}>{img.caption}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {s.questions && (
                    <div style={{marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                      {s.questions.map(q => (
                        <div key={q} className="cs-insight-card" id="flikshop-question">
                          <p className="cs-insight-card__label" id="flikshop-question-label">Question</p>
                          <p>{q}</p>
                        </div>
                      ))} 
                    </div>
                  )}
                  {s.quotes && (
                      <div className="cs-quotes" style={{ marginTop: '16px' }}>
                        {s.quotes.map((q, i) => (
                          <div key={i} className="cs-quote">
                            <span className="cs-quote__mark">"</span>
                            <p>{q}</p>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
          <p>
            Showing our client the design and findings, we discovered that the client's use of
            'mobile' referred to the website and not the app. Nevertheless we received positive
            feedback on our design direction. This shifted our focus to the mobile version of the
            website and to promoting Flikshop Angels rather than all additional offerings.
          </p>
        </section>

        {/* ── DESIGN ITERATION ──────────────── */}
        <section id="design-iteration" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">03</span>
            <span>Evolving the Design through Iteration</span>
          </div>

          <h2 className="cs-section-title">Project Re-Alignment</h2>
          <p className="cs-section-lead">
            I assembled a pre-kickoff meeting with the client to review previous feedback, align
            on upcoming goals, and ask defining questions that would set in stone the final focus
            of our project.
          </p>

          <div className="cs-concepts" style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
            {[
              { num: 'Idea 1', text: 'The mobile website has many areas that are buggy. Closing current gaps can minimize frustrations.' },
              { num: 'Idea 2', text: 'The Angels program is not very prominent within the user flows. Intentional integration can increase its discoverability.' },
              { num: 'Idea 3', text: 'Most users are unaware that there is an app. Guiding users to download the app from the website will reduce friction.' },
              { num: 'Idea 4', text: 'Purple is the prominent brand color. Use orange as a secondary color to highlight and draw the users\' attention.' },
            ].map(idea => (
              <div key={idea.num} className="cs-insight-card" id="flikshop-idea">
                <p className="cs-insight-card__label" id="flikshop-idea-label">{idea.num}</p>
                <p>{idea.text}</p>
              </div>
            ))}
          </div>

          <div className="cs-hmw">
            <p className="cs-hmw__text" id="cs-hmw_text">
              How do we create a smoother, more intuitive website experience that effortlessly
              guides users into the mobile app?
            </p>
          </div>

          {/* Design Process */}
          <h2 className="cs-section-title" style={{marginTop: '32px'}}>Sketching the Direction</h2>
          <p className="cs-section-lead">
            We each mapped two key user journeys: 1) sending a postcard and 2) donating to Flikshop Angels, 
            then independently sketched homepage and Angels landing page concepts for our client to vote on.
          </p>
          <p>
            Marcus used a supervote to select the two strongest concepts (one of them being mine) as well as hearted
            three nice-to-have additions.
          </p>
          <ScreenCarousel />

          {/* Wireframing */}
          <h2 className="cs-section-title" style={{marginTop: '32px'}}>Testing our Wireframes</h2>
          <p className="cs-section-lead">
            In this round, we prioritized information and visual hierarchy to create a
            straightforward user flow and added sections that highlighted impact metrics for
            stronger emotional appeal.
          </p>
          <p>
            Using a storyboard for guidance, we illustrated the storyline of a user visiting
            Flikshop's website for the first time via desktop. This visualization carefully
            combines both the solution sketches and the nice-to-haves together.
          </p>

          {/* Storyboard images */}
          <img 
            src="/assets/flik-storyboard-1.png" 
            alt="Storyboard" 
            className="cs-image"
            style={{maxWidth: '560px', display: 'block', cursor: 'zoom-in'}}
            onClick={() => setImgLightbox('/assets/flik-storyboard-1.png')} 
            onError={e => e.target.style.display='none'} 
          />
          <img 
            src="/assets/flik-wireframes.png" 
            alt="Wireframes annotation" 
            className="cs-image" 
            style={{marginTop: '8px', cursor: 'zoom-in'}}
            onClick={() => setImgLightbox('/assets/flik-wireframes.png')} 
            onError={e => e.target.style.display='none'} 
          />

          <p className="cs-section-lead">
            We conducted concept testing sessions with 2 new users (never heard of Flikshop) and
            2 current Flikshop employees with diverse technical backgrounds to validate and refine
            our concepts.
          </p>
          <p>
            Using the think-aloud method, participants navigated our prototype while we captured real-time reactions. Though we had 
            originally planned to recruit Flikshop users, a lack of response from recruitment emails led us to pivot to Flikshop employees — 
            a change that ultimately gave us richer, more informed feedback alongside the fresh perspectives of our new users. Here's what 
            they told us:
          </p>
          <div className="cs-quotes">
            {[
              'Usually with donations, people aren’t tracking for a reward. Usually they’ve been moved to do it.',
              'Changing messaging would help. \'Get involved\' is ambiguous, maybe talk about giving credits.',
              'It feels impactful seeing statistics and the map that shows reach.... More photos would make me feel connected to the mission.',
              'Easy to use, easy to navigate. On a scale of 1-10, I would give it a 10.',
            ].map((q, i) => (
              <div key={i} className="cs-quote">
                <span className="cs-quote__mark">"</span>
                <p>{q}</p>
              </div>
            ))}
          </div>

          <p>From these sessions, three clear directions emerged — de-gamifying the rewards tracker, adding more contextual detail throughout, and diversifying brand assets.</p>
        </section>

        {/* ── FINAL DELIVERABLES ───────────────────────────────────────── */}
        <section id="testing" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">04</span>
            <span>Delivering the Final Product from Testing</span>
          </div>

          <h2 className="cs-section-title">Final App & Website</h2>
          <p className="cs-section-lead">Here's how our ideas came to life!</p>
          <p>
            We delivered polished interactive high-fidelity prototypes of the Flikshop mobile
            application & Flikshop website (both desktop/mobile versions), an organized design
            system library, and a document summary of our work across all sprints.
          </p>
          <p>
            Our final prototype aligns with our goals to strengthen brand perception, amplify the
            discoverability of Flikshop Angels, and reduce website-to-app friction by integrating
            flows that take users through the full journey and skillfully make them feel connected
            through emotive images and testimonials.
          </p>

          {[
            {
              label: 'Mobile App — Flikshop Angels Home & Gift',
              color: '#6B1DA7',
              subtitle: 'Streamlined the process for navigating Flikshop Angels in-app & submitting a donation',
              body: 'Adhering to client feedback, Flikshop Angels now replaces the School of Business in the main button, with a redesigned homepage that surfaces active subscriptions, renewal dates, and recent donations upfront. The gift flow guides users through a simple 3-step donation process with direct context about the Angels program and a downloadable receipt for confirmation.',
              video: '/assets/flik-final-app-angels.mp4',
            },
            {
              label: 'Mobile App — Flikshop Angels Rewards & Settings',
              color: '#6B1DA7',
              subtitle: 'Standardized the Rewards store & implemented account management',
              body: 'Adhering to user feedback, we redesigned the rewards tracker to resemble a store which reduces the gimmicky feeling and gives users more control over which reward they cash in. The new settings page addresses the previous design\'s Help and Documentation gap by surfacing a dedicated Help & Support section.',
              video: '/assets/flik-final-app-rewards.mp4',
            },
            {
              label: 'Mobile Website — Flikshop Home',
              color: '#6B1DA7',
              subtitle: 'Enhanced brand messaging/imagery & spotlighted product verticals',
              body: 'Marcus\' Ted Talk is featured as a looping gif at the top to immediately establish personal connection to the mission, followed by a structured flow of Mission → Business Verticals → Impact Metrics → Angels CTA → Testimonials → Partners. This hierarchy was designed to inform and emotionally engage users in one seamless scroll.',
              video: '/assets/flik-final-website-home.mp4',
            },
            {
              label: 'Mobile Website — Flikshop Angels',
              color: '#6B1DA7',
              subtitle: 'Personalized donation process through testimonials and donor highlights',
              body: 'The Angels landing page was humanized through impact metrics, user testimonials, and a notable donors section to emotionally connect visitors to the mission before asking them to give. Donor highlights act as intrinsic motivation, showing contributors how their involvement can be recognized within the community.',
              video: '/assets/flik-final-website-angels.mp4',
            },
          ].map((task, index) => (
            <div key={task.label} className="cs-task-card" style={{
              display: 'grid',
              gridTemplateColumns: index % 2 === 1 ? '1fr 200px' : '200px 1fr',
              gap: '24px',
              alignItems: 'start',
              borderLeft: `3px solid ${task.color}`,
              padding: '16px',
              marginTop: '16px',
            }}>
              <div style={{ position: 'relative', cursor: 'zoom-in', order: index % 2 === 1 ? 2 : 1}} onClick={() => setVideoLightbox(task.video)}>
                <video
                  src={task.video}
                  className="cs-image"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', borderRadius: 'var(--radius-md)', display: 'block', aspectRatio: '9 / 16', objectFit: 'contain',}}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.2s',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: 'var(--radius-md)',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0}
                  >
                    <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em' }}>
                      EXPAND ↗
                    </span>
                  </div>
                </div>
                <div style={{ order: index % 2 === 1 ? 1 : 2 }}>
                  <p className="cs-task-card__label" style={{ color: task.color, marginBottom: '8px' }}>{task.label}</p>
                  <p className="cs-task-card__subtitle" style={{fontSize: '16px', marginBottom: '12px' }}>{task.subtitle}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-altprimary)', lineHeight: 1.7, maxWidth: '600px' }}>{task.body}</p>
                </div>
              </div>
          ))}
        </section> 

        {/* ── REFLECTIONS ───────────────────────────────────── */}
        <section id="reflections" className="cs-section">
          <h2 className="cs-section-title">What I Learned from this Project</h2>

          <div className="cs-pullquote">
            <p className="cs-pullquote__text">
              Acknowledging how I've grown from this project and what I will integrate in the future.
            </p>
          </div>

          <div className="cs-takeaways">
            {[
              {
                num: '1',
                title: 'Redirection is a natural part of design and does not indicate failure.',
                desc: 'Processes evolve and goals shift all the time, so it is important to be quick on your feet and adaptable.',
              },
              {
                num: '2',
                title: 'Strategic communication and alignment saves time.',
                desc: 'Taking the extra step to communicate prevents misunderstandings and reduces unnecessary back-and-forth.',
              },
              {
                num: '3',
                title: 'Deliver with confidence.',
                desc: 'Have trust in your project\'s process, back your decisions with reasoning, and present your work proudly no matter the audience.',
              },
            ].map(t => (
              <div key={t.num} className="cs-takeaway">
                <span className="cs-takeaway__num">{t.num}</span>
                <div>
                  <p className="cs-takeaway__title">{t.title}</p>
                  <p className="cs-takeaway__desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{marginTop: '32px', color: 'var(--text-secondary)', lineHeight: 1.8}}>
            Overall, I had so much fun and learned a lot in this capstone project. I thank my team
            members as well as our client, Marcus, for making this a memorable experience.
          </p>
        </section>

        {/* ── VIEW MORE ─────────────────────────────────────── */}
        <section className="cs-section cs-more">
          <p className="section-label">View More</p>
          <div className="cs-more__grid">
            <a
            href="/projects/google-calendar"
            className="cs-more__card"
            onClick={e => {
              e.preventDefault()
              window.history.pushState({}, '', '/projects/google-calendar')
              window.dispatchEvent(new PopStateEvent('popstate'))
            }}>
              <img src="/assets/project-gcal.png" alt="Google Calendar" onError={e => e.target.style.display='none'} />
              <p className="cs-more__card-title" style={{fontSize: '16px'}}>Google Calendar</p>
              <p className="cs-more__card-sub" style={{
                fontSize: 'clamp(12px, 2.4vw, 20px)',
                fontWeight: '500',
                letterSpacing: '-0.015em',
                lineHeight: '1.25',
                color: 'var(--text-primary)'
              }}>Adapting an Existing Design for Users with Low Vision</p>
               <p className="feat-link" data-cursor="link" style={{color: 'var(--brand)', margin: '8px 10px'}}>View case study <span className="feat-link-arrow">→</span></p>
            </a>
            <a href="/projects/tripadvisor" 
                className="cs-more__card"
                onClick={e => {
                  e.preventDefault()
                  window.history.pushState({}, '', '/projects/tripadvisor')
                  window.dispatchEvent(new PopStateEvent('popstate'))
                }}>
              <img 
                src="/assets/project-tripadvisor.png" 
                alt="TripAdvisor"
                style={{ height: '300px', width: '100%', objectFit: 'cover', objectPosition: 'center' , marginTop: '2px'}} 
                onError={e => e.target.style.display='none'} 
                />
              <p className="cs-more__card-title" style={{fontSize: '16px'}}>HortiCare</p>
              <p className="cs-more__card-sub" style={{
                fontSize: 'clamp(12px, 2.4vw, 20px)',
                fontWeight: '500',
                letterSpacing: '-0.015em',
                lineHeight: '1.25',
                color: 'var(--text-primary)'
              }}>Evaluating Cognitive Load in a Travel Guidance Platform</p>
               <p className="feat-link" data-cursor="link" style={{color: 'var(--brand)', margin: '8px 10px'}}>View case study <span className="feat-link-arrow">→</span></p>
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}
