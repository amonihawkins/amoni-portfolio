import './CaseStudy.css'
import { useState, useEffect } from 'react'

const SLIDES = [
  {
    task: 'Task 1 — Event Creation',
    title: 'Accessibility settings page',
    desc: 'Users can adjust controls such as text size, font boldness, icon size, and customize the view and opacity for focus mode — used before creating an event to increase visibility.',
    img: '/assets/gcal-midfi-task1.jpg',
  },
  {
    task: 'Task 2 — Color Coding',
    title: 'High contrast color palette carousel',
    desc: 'A color palette carousel featuring themes such as "High Contrast" — letting users customize calendar colors to suit their visual needs before assigning them to events.',
    img: '/assets/gcal-midfi-task2.png',
  },
  {
    task: 'Task 3 — Manage/View Calendar',
    title: 'Calendar focus mode view',
    desc: 'A focus mode that temporarily disables the view of calendars that aren\'t currently selected — reducing visual noise for users managing multiple overlapping calendars.',
    img: '/assets/gcal-midfi-task3.png',
  },
  {
    task: 'Task 3 — Manage/View Calendar',
    title: 'Event management with patterns',
    desc: 'When editing a task, users can adopt an existing event color and pattern overlay. A live preview ensures text stays readable against the pattern before confirming.',
    img: '/assets/gcal-midfi-task4.png',
  },
]

const CONCEPT_PAGES = [
  [
    {
      img: '/assets/gcal-concept-accessibility.jpg',
      desc: 'An accessibility page within the settings that allows users to adjust font, icon & screen size, and choose a focus mode display.',
    },
    {
      img: '/assets/gcal-concept-palette.jpg',
      desc: 'A color palette carousel that features different specific themes such as "High Contrast" to help users customize colors.',
    },
    {
      img: '/assets/gcal-concept-focus.jpg',
      desc: 'A focus mode that can temporarily disable the view of calendars that aren\'t currently selected.',
    },
  ],
  [
    {
      img: '/assets/gcal-concept-jennifer-1.png',
      desc: 'In addition to selecting a color, users can choose a shape as an event identifier.',
    },
    {
      img: '/assets/gcal-concept-jennifer-2.png',
      desc: 'For calendar distinction, there are inclusive color sets and pattern overlays users can choose from. Additionally, there are AI Smart Assist recommendations.',
    },
    {
      img: '/assets/gcal-concept-jennifer-3.png',
      desc: 'Tasks have the ability to adopt the same colors as commonly logged events for better recognition.',
    },
  ],
]

const LABELS = ['My concepts', 'Jennifer\'s concepts']

function ScreenCarousel() {
  const [cur, setCur] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const slide = SLIDES[cur]

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '40px',
          }}
        >
          <img
            src={lightbox}
            alt="Expanded view"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '20px', right: '24px',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: '#fff', fontSize: '20px', cursor: 'pointer',
              width: '36px', height: '36px', borderRadius: '50%',
            }}
          >✕</button>
        </div>
      )}

      <div className="cs-carousel">
        <div className="cs-carousel__slide">
          <div
            className="cs-carousel__image"
            onClick={() => setLightbox(slide.img)} // ← click opens lightbox
          >
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
    </>
  )
}

function ConceptPages() {
  const [page, setPage] = useState(0)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', marginBottom: '16px' }}>
        <p style={{ fontWeight: 500 }}>{LABELS[page]}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setPage(0)} disabled={page === 0} className="cs-carousel__btn">←</button>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{page + 1} / {CONCEPT_PAGES.length}</span>
          <button onClick={() => setPage(1)} disabled={page === 1} className="cs-carousel__btn">→</button>
        </div>
      </div>
      <div className="cs-concepts">
        {CONCEPT_PAGES[page].map((c, i) => (
          <div key={i} className="cs-concept-card">
            <div className="cs-concept-card__img-wrap">
              <img src={c.img} alt={`Feature concept ${i + 1}`} onError={e => e.target.style.display='none'} />
            </div>
            <p className="cs-concept-card__desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GoogleCalendar() {
  const [lightbox, setLightbox] = useState(null)
  const [videoLightbox, setVideoLightbox] = useState(null)
  const [activeSection, setActiveSection] = useState('')

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

      {/* ── Sticky side nav (mirrors your Wix page sections) ── */}
      <nav className="case-study__sidenav">
        {['Overview', 'Research', 'Ideate', 'Design', 'Test', 'Deliver', 'Reflections'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} className={`case-study__sidenav-link ${activeSection === s.toLowerCase() ? 'case-study__sidenav-link--active' : ''}`}>{s}</a>
        ))}
      </nav>

      <div className="case-study__body">

        {/* Lightbox overlay */}
          {lightbox && (
            <div
              onClick={() => setLightbox(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                background: 'rgba(0,0,0,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'zoom-out', padding: '40px',
              }}
            >
              <img
                src={lightbox}
                alt="Expanded view"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }}
                onClick={e => e.stopPropagation()}
              />
              <button
                onClick={() => setLightbox(null)}
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
                autoPlay
                loop
                muted
                playsInline
                controls
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

        {/* ── HERO ─────────────────────────────────────────── */}
        <section id="overview" className="cs-section">
          <div className="cs-hero">
            <p className="cs-hero__client">Google Calendar</p>
            <h1 className="cs-hero__title">
              Seeing the Unseen: Reimagining Google Calendar for Users with Low Vision
            </h1>

            <div className="cs-hero__image-wrap">
              <img
                src="/assets/gcal-hero.png"
                alt="Google Calendar redesign overview"
                className="cs-hero__image"
                onError={e => { e.target.parentElement.classList.add('cs-hero__image-wrap--empty') }}
              />
            </div>
          </div>

          {/* About + Problem + Outcome */}
          <div className="cs-intro">
            <div className="cs-intro__text">
              <h2 className="cs-block-title">About</h2>
              <p>
                As a free scheduling and time management tool, Google Calendar didn't
                 adequately support our graduate student with low vision — creating
                  barriers in color perception, text sizing, and overall usability.
                   Through a participatory design process, we co-created personalized
                    features that enhanced her accessibility while highlighting
                     opportunities for the broader low vision community.
              </p>

              <div className="cs-problem-outcome">
                <div className="cs-callout cs-callout--problem">
                  <p className="cs-callout__label">Problem</p>
                  <p>Our student with low vision faces challenges using Google Calendar due to
                  the lack of flexible customization options, leading to difficulties with
                  processing information and reduced readability.</p>
                </div>
                <div className="cs-callout cs-callout--outcome">
                  <p className="cs-callout__label">Outcome</p>
                  <p>Designed an adapted version of Google Calendar tailored for low vision
                  use by incorporating customizable text/icon sizing, accessible color
                  palettes, and focused viewing modes within the current interface.</p>
                </div>
              </div>
            </div>

            {/* Meta sidebar */}
            <aside className="cs-meta">
              <div className="cs-meta__item">
                <p className="cs-meta__label">Team</p>
                <p>Amoni Hawkins (me)</p>
                <p>Jennifer Metumbe</p>
                <p>Participant</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">Timeline</p>
                <p>Oct 2024 – Dec 2024 (2 months)</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">Tools</p>
                <p>Figma, Google G Suite, Zoom</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">My Main Tasks</p>
                <p>Research Study Creator</p>
                <p>Qualitative Analysis</p>
                <p>Stakeholder Liaison</p>
                <p>Final Research Report</p>
              </div>
            </aside>
          </div>

          {/* Motivation quote */}
          <div className="cs-pullquote">
            <p className="cs-pullquote__text">
              "It gave me the opportunity to step outside of my own lived experience and prioritize 
              accessibility — creating something meaningful for individuals with different challenges."
            </p>
            <p className="cs-pullquote__attribution">— My motivation for this project</p>
          </div>
          <p>
            This project deepened my understanding of accessible design through direct collaboration 
            with a low vision user. As user researcher and project manager, I led all session protocols,
             analysis, and the final report while managing the timeline and acting as stakeholder liaison.
          </p>
        </section>

        {/* ── 01 RESEARCH ──────────────────────────────────── */}
        <section id="research" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">01</span>
            <span>Understanding the Challenge through Research</span>
          </div>

          <h2 className="cs-section-title">Problem Understanding</h2>
          <p className="cs-section-lead">
            Our study focused on one individual who has low vision, a female UMD staff member
            who has interests in HCI and Information Studies.
          </p>
          <p>
            We conducted a semi-structured interview to better understand our user's lived
            experience, revealing both her tech-savvy habits and key accessibility challenges.
          </p>

          {/* Finding cards */}
          <div className="cs-findings">
            {[
              { title: 'Text is the Biggest Visual Challenge', desc: 'Poor color contrast on screens makes reading especially difficult for her.' },
              { title: 'Experiences Light Hypersensitivity Outside of Screens', desc: 'She uses transition polarized sunglasses while regular glasses have anti-fatigue and blue ray lenses.' },
              { title: 'Digital Challenges Exceed Physical Ones', desc: 'Poor accessibility design, low contrast, and non-adjustable features make digital experiences harder to navigate.' },
              { title: 'Frustrated by Constantly Adjusting Devices', desc: 'She always has to correct her iPhone and gaming consoles, working with settings to fix brightness and text size.' },
            ].map((f, i) => (
              <div key={f.title} className="cs-finding-card">
                <div className="cs-finding-card__num">{String(i + 1).padStart(2, '0')}</div>
                <p className="cs-finding-card__title">{f.title}</p>
                <p className="cs-finding-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Goal pivot */}
          <h2 className="cs-section-title" style={{marginTop: '48px'}}>Goal Pivot</h2>
          <p className="cs-section-lead">
            In mutual agreement with our user, we shifted focus to Google Calendar, a 
            tool she uses daily that poses challenges due to limited color customization 
            and the inability to adjust text size.
          </p>

          <div className="cs-hmw">
            <p className="cs-hmw__label">Defining the Challenge</p>
            <p className="cs-hmw__text">
              How might we refine Google Calendar to increase its accessibility for users
              with low vision, making it easier to use?
            </p>
          </div>
        </section>

        {/* ── 02 IDEATE ────────────────────────────────────── */}
        <section id="ideate" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">02</span>
            <span>Translating Findings into Concepts</span>
          </div>

          <h2 className="cs-section-title">Feature Development</h2>
          <p className="cs-section-lead">
            We identified 3 key tasks on Google Calendar: creating events, color-coding
            items, and managing calendars — then sketched feature ideas inspired by
            participant needs.
          </p>
          <p>My partner Jennifer and I drew 3 separate feature concepts:</p>

          {/* Feature concept cards */}
          <ConceptPages />

          {/* User testing */}
          <h2 className="cs-section-title" style={{marginTop: '48px'}}>Concept Testing</h2>
          <p className="cs-section-lead">
            We built two low-fidelity prototypes for our participant to directly engage with
            in order to provide meaningful, in-depth feedback that would shape our final direction.
          </p>
          <p>
            I facilitated a remote, moderated session using the think-aloud method while Jennifer 
            captured notes and insights. We began with a brief problem recap, then guided our 
            participant through both prototypes, followed by targeted questions to evaluate 
            usability and effectiveness. Two key themes emerged:
          </p>

          <div className="cs-insights">
            <div className="cs-insight-card">
              <p className="cs-insight-card__label">Main Insight</p>
              <p>Visual choices like increased color contrast were well received, though there were concerns about the practicality of incorporating AI.</p>
            </div>
            <div className="cs-insight-card">
              <p className="cs-insight-card__label">Main Insight</p>
              <p>Accessibility features should be seamlessly integrated into the core interface rather than optional add-ons.</p>
            </div>
          </div>
        </section>

        {/* ── 03 DESIGN ────────────────────────────────────── */}
        <section id="design" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">03</span>
            <span>Evolving the Design through Iteration</span>
          </div>

          <h2 className="cs-section-title">Co-Design Activity</h2>
          <p className="cs-section-lead">
            During a co-design session, our participant sketched her 'perfect week' on a
            calendar, blending our proposed features with her own ideas to help us better
            understand her ideal experience.
          </p>
          <p>
            The challenge of the activity was to create mini event stories that represented
            both old/new features as well as add a reflection on design choices. Her
            constructions of a perfect calendar are displayed here in a weekly and monthly view.
          </p>

          <div className="cs-image-row">
              <img
                src="/assets/gcal-codesign-weekly.png"
                alt="Participant's perfect calendar: weekly view"
                className="cs-image"
                style={{ cursor: 'zoom-in' }}
                onClick={() => setLightbox('/assets/gcal-codesign-weekly.png')}
                onError={e => e.target.style.display='none'}
              />
              <img
                src="/assets/gcal-codesign-monthly.png"
                alt="Participant's perfect calendar: monthly view"
                className="cs-image"
                style={{ cursor: 'zoom-in' }}
                onClick={() => setLightbox('/assets/gcal-codesign-monthly.png')}
                onError={e => e.target.style.display='none'}
              />
            </div>
          <p className="cs-image-caption">Participant's weekly and monthly view sketch</p>

          {/* Mid-fi */}
          <h2 className="cs-section-title" style={{marginTop: '48px'}}>Mid-Fi Prototype</h2>
          <p className="cs-section-lead">
            Building on concept testing feedback, we translated our strongest lo-fi ideas 
            into a mid-fidelity prototype that more concretely visualized the user journey 
            across our three key tasks.
          </p>
          <ScreenCarousel />
        </section>

        {/* ── 04 TEST ──────────────────────────────────────── */}
        <section id="test" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">04</span>
            <span>Shaping the Solution with User Testing</span>
          </div>

          <h2 className="cs-section-title">Final Critique</h2>
          <p className="cs-section-lead">
            We sent a video demonstration of our prototype that walks through all three tasks
            to our user, requesting feedback of any notable concerns.
          </p>
          <p>
            In addition to the video file, we asked questions that gauged any unmet needs,
            evaluated the effectiveness of newly added features, and determined the product's
            relevancy for our target audience. From the design critique, we learned:
          </p>

          {/* User quotes */}
          <div className="cs-quotes">
            {[
              'I still don\'t think the AI feature is helpful.',
              'The main thing is the text on the pattern; for the text, it is still hard to read against the pattern.',
              'Seeing it in action, the patterns can be a bit more distracting than I thought.',
              'I would say the color contrast feature is still a plus and being able to apply event attributes is great.',
            ].map((q, i) => (
              <div key={i} className="cs-quote">
                <span className="cs-quote__mark">"</span>
                <p>{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 05 DELIVER ───────────────────────────────────── */}
        <section id="deliver" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">05</span>
            <span>Delivering the Final Product</span>
          </div>

          <h2 className="cs-section-title">Final Deliverables</h2>
          <p className="cs-section-lead">Here's how our ideas came to life!</p>
          <p>
            We delivered a polished interactive high-fidelity prototype of the enhanced Google
            Calendar, and a full design{' '}
            <a href="https://portfolium.com/entry/co-design-accessibility-project" target="_blank" rel="noopener noreferrer" className="cs-link">
              report ↗
            </a>{' '}
            of our process.
          </p>

          {/* Task deliverable cards */}
          {[
            {
              num: '#1',
              color: '#4A5AE8',
              title: 'Event Creation',
              subtitle: 'Refined event creation flow by integrating new accessibility settings panel',
              body: 'Adhering to participant feedback, we removed the AI event template auto fill-in and purely focused on accessibility settings. With the accessibility page, users can adjust settings to their liking. We wanted to make sure that this addition was integrated into the current functionality of Google Calendar which is why we added a page to the existing settings bar.',
              video: '/assets/gcal-final-task1.mp4',
            },
            {
              num: '#2',
              color: '#4A5AE8',
              title: 'Color Coding Items',
              subtitle: 'Enhanced calendar customization for better visibility and differentiation',
              body: 'In the customization panel, users can create new combinations of colors, patterns, and shapes to assign to their calendars. Unlike before, we added a live preview section with a built-in WCAG contrast checker, so that users can test out their selections before confirming.',
              video: '/assets/gcal-final-task2.mp4',
            },
            {
              num: '#3',
              color: '#4A5AE8',
              title: 'Manage/View Calendars',
              subtitle: 'Introduced focus mode and event-adopted tasks for managing separate calendars',
              body: 'When editing a task, users can adopt an existing event color and a pattern overlay to the task. We decided to include the live preview here as well for additional support.',
              video: '/assets/gcal-final-task3.mp4',
            },
          ].map((task, index) => (
            <div key={task.num} className="cs-task-card" style={{
              display: 'grid',
              gridTemplateColumns: index % 2 === 1 ?  '1fr 1.4fr' : '1.4fr 1fr' ,
              gap: '24px',
              alignItems: 'start',
              borderLeft: `3px solid ${task.color}`,
            }}>
              <div style={{ position: 'relative', cursor: 'zoom-in', order: index % 2 === 1 ? 2 : 1 }} onClick={() => setVideoLightbox(task.video)}>
                <video
                  src={task.video}
                  className="cs-image"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s',
                  background: 'rgba(0, 0, 0, 0.3)',
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
                <p className="cs-task-card__label" style={{color: task.color, marginBottom: '12px'}}>Task {task.num}: {task.title}</p>
                <p className="cs-task-card__subtitle" style={{fontSize: '16px', marginBottom: '12px'}}>{task.subtitle}</p>
                <p style={{fontSize: '15px', color: 'var(--text-altprimary)', lineHeight: 1.7}}>{task.body}</p>
              </div>
            </div>
          ))}

          {/* Generalizability note */}
          <div className="cs-callout cs-callout--note" style={{marginTop: '48px'}}>
            <p className="cs-callout__label">Design Generalizability</p>
            <p>
              Our solution reflects the valuable perspective of one individual with low vision
              rather than the broader low vision community. Although we enhanced some features
              of Google Calendar's existing capabilities, they were not perfect. Further testing
              to refine accessibility features and expand its reach is required in the future.
            </p>
          </div>
        </section>

        {/* ── REFLECTIONS ──────────────────────────────────── */}
        <section id="reflections" className="cs-section">
          <h2 className="cs-section-title">What I Learned from this Project</h2>

          <div className="cs-pullquote">
            <p className="cs-pullquote__text">
              Through inclusive design, we can create an immersive experience for all!
            </p>
          </div>

          <div className="cs-takeaways">
            {[
              {
                num: '1',
                title: 'Empathy is essential to meaningful design.',
                desc: 'Creating a space where participants feel comfortable and heard leads to deeper insights and more authentic collaboration.',
              },
              {
                num: '2',
                title: 'Adaptability strengthens the process.',
                desc: 'Being flexible and responsive to both user needs and shifting project dynamics is key to effective co-design.',
              },
              {
                num: '3',
                title: 'Co-design is a beginning, not an end.',
                desc: 'Design is iterative. There is always more to learn, test, and improve as we strive toward more inclusive solutions.',
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

          <p style={{marginTop: '12px', color: 'var(--text-altprimary)', lineHeight: 1.8}}>
            I'm deeply grateful to my partner Jennifer and our participant for making this
            such a meaningful experience. Thank you for sharing your journey with us.
          </p>
        </section>

        {/* ── VIEW MORE ────────────────────────────────────── */}
        <section className="cs-section cs-more">
          <p className="section-label">View More</p>
          <div className="cs-more__grid">
            <a 
              href="/projects/horticare" 
              className="cs-more__card"
              onClick={e => {
                  e.preventDefault()
                  window.history.pushState({}, '', '/projects/horticare')
                  window.dispatchEvent(new PopStateEvent('popstate'))
                }}
              >
              <img src="/assets/project-horticare.png" alt="HortiCare" onError={e => e.target.style.display='none'} />
              <p className="cs-more__card-title" style={{fontSize: '16px'}}>HortiCare</p>
              <p className="cs-more__card-sub" style= {{
                fontSize: 'clamp(12px, 2.4vw, 20px)',
                fontWeight: '500',
                letterSpacing: '-0.015em',
                lineHeight: '1.25',
                color: 'var(--text-primary)'
              }}>Cultivating an Identity for my Original Plant Care App</p>
              <p className="feat-link" data-cursor="link" style={{color: 'var(--brand)', margin: '8px 10px'}}>View case study <span className="feat-link-arrow">→</span></p>
            </a>
            <a 
              href="/projects/flikshop" 
              className="cs-more__card"
              onClick={e => {
                    e.preventDefault()
                    window.history.pushState({}, '', '/projects/flikshop')
                    window.dispatchEvent(new PopStateEvent('popstate'))
                  }}>
              <img src="/assets/project-flikshop.png" alt="Flikshop" onError={e => e.target.style.display='none'} />
              <p className="cs-more__card-title" style={{fontSize: '16px'}}>Flikshop</p>
              <p className="cs-more__card-sub" style= {{
                fontSize: 'clamp(12px, 2.4vw, 20px)',
                fontWeight: '500',
                letterSpacing: '-0.015em',
                lineHeight: '1.25',
                color: 'var(--text-primary)'
              }}>Boosting Product Discoverability through UX Redesign</p>
              <p className="feat-link" data-cursor="link" style={{color: 'var(--brand)', margin: '8px 10px'}}>View case study <span className="feat-link-arrow">→</span></p>
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}
