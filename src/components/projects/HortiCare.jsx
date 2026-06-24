import { useState, useEffect } from 'react'
import './CaseStudy.css'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.cs-reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useActiveSection(setActive, tab) {
  useEffect(() => {
    const sections = document.querySelectorAll('.cs-section[id]')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id)
      }),
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [tab])
}

function CritiqueCarousel() {
  const [cur, setCur] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const item = CRITIQUE_ITEMS[cur]

  return (
    <>
      {/* Lightbox */}
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
    <div className="cs-carousel">
      <div className="cs-carousel__slide">
        <div
          className="cs-carousel__image"
          style={{ cursor: 'zoom-in' }}
          onClick={() => setLightbox(item.img)}
        >
          <img src={item.img} alt={item.alt} onError={e => e.target.style.display='none'} />
        </div>
        <div className="cs-carousel__body">
          <span className="cs-carousel__tag">{item.task}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px',  maxHeight: '250px', overflowY: 'auto' }}>
            {item.quotes.map((q, i) => (
              <div key={i} className="cs-quote" style={{ margin: 0 }}>
                <span className="cs-quote__mark">"</span>
                <p style={{ fontStyle: 'italic' }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cs-carousel__footer">
        <div className="cs-carousel__dots">
          {CRITIQUE_ITEMS.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`cs-carousel__dot ${i === cur ? 'cs-carousel__dot--active' : ''}`}
            />
          ))}
        </div>
        <span className="cs-carousel__counter">{cur + 1} / {CRITIQUE_ITEMS.length}</span>
        <div className="cs-carousel__btns">
          <button onClick={() => setCur(c => c - 1)} disabled={cur === 0} className="cs-carousel__btn">←</button>
          <button onClick={() => setCur(c => c + 1)} disabled={cur === CRITIQUE_ITEMS.length - 1} className="cs-carousel__btn">→</button>
        </div>
      </div>
    </div>
    </>
  )
}

function ChangesCarousel() {
  const [cur, setCur] = useState(0)
  const item = CHANGES[cur]

  return (
    <div className="cs-carousel">
      <div className="cs-carousel__slide">
        {/* Before */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div className="hc-evolution__label hc-evolution__label--before" style={{ marginTop: '10px' }}>Mid-Fi</div>
          <div
            className="cs-carousel__image"
            style={{ cursor: 'zoom-in', borderRight: 'none', flex: 1 }}
          >
            <img src={item.before} alt={`Before: ${item.label}`} onError={e => e.target.style.display='none'} />
          </div>
        </div>
        {/* After */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div className="hc-evolution__label hc-evolution__label--after" style={{ marginTop: '10px' }}>Final</div>
          <div
            className="cs-carousel__image"
            style={{ cursor: 'zoom-in', borderRight: 'none', flex: 1 }}
          >
            <img src={item.after} alt={`After: ${item.label}`} onError={e => e.target.style.display='none'} />
          </div>
        </div>
      </div>
      <div className="cs-carousel__footer">
        <div className="cs-carousel__dots">
          {CHANGES.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`cs-carousel__dot ${i === cur ? 'cs-carousel__dot--active' : ''}`}
            />
          ))}
        </div>
        <div style={{ flex: 1, padding: '0 16px' }}>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '3px' }}>{item.label}</p>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
        </div>
        <span className="cs-carousel__counter">{cur + 1} / {CHANGES.length}</span>
        <div className="cs-carousel__btns">
          <button onClick={() => setCur(c => c - 1)} disabled={cur === 0} className="cs-carousel__btn">←</button>
          <button onClick={() => setCur(c => c + 1)} disabled={cur === CHANGES.length - 1} className="cs-carousel__btn">→</button>
        </div>
      </div>
    </div>
  )
}

function MidFiStrip({ onExpand }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      paddingBottom: '12px',
      scrollSnapType: 'x mandatory',
    }}>
      {MIDFI_SLIDES.map((s, i) => (
        <div
          key={i}
          style={{ flexShrink: 0, width: '200px', scrollSnapAlign: 'start', cursor: 'zoom-in', position: 'relative' }}
          onClick={() => onExpand(s.img)}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            src={s.img}
            alt={s.title}
            className="cs-image"
            style={{ borderRadius: 'var(--radius-md)', display: 'block' }}
            onError={e => e.target.style.display='none'}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            opacity: hoveredIndex === i ? 1 : 0,
            transition: 'opacity 0.2s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pointerEvents: 'none',
          }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: '#fff', marginBottom: '4px' }}>{s.title}</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{s.tooltip}</p>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-altprimary)', marginTop: '6px', textAlign: 'center' }}>{s.task}</p>
        </div>
      ))}
    </div>
  )
}

const PILLARS = [
  { icon: '🎨', title: 'Balanced Color Scheme', desc: 'Green reflects growth and plant life. I explored other neutral, earth tones that evoke stability, care, and tranquility rather than leaning on green alone.' },
  { icon: '✦', title: 'Clean Typography', desc: 'An expressive yet readable typeface to match the brand personality — youthful, earthy, and natural. I landed on Syne for its modern character and energy.' },
  { icon: '🌿', title: 'Clear, Soothing Brand Voice', desc: 'Using visual design principles, HortiCare needed a tone of clarity and serenity — a nurturing presence that encourages rather than overwhelms.' },
]

const MIDFI_SLIDES = [
  {
    task: 'Home Screen',
    title: 'Plant spotlights & daily tasks',
    tooltip: 'Plant spotlight, current weather, and today\'s task list give users an at-a-glance summary of what needs attention.',
    img: '/assets/horticare-midfi-home.png',
  },
  {
    task: 'My Plants',
    title: 'Plant collection view',
    tooltip: 'A searchable grid of all plants with birthday spotlights and pending task counts visible at a glance.',
    img: '/assets/horticare-midfi-plants.png',
  },
  {
    task: 'View Plant',
    title: 'Individual Plant Profile',
    tooltip: 'Full plant details including scientific name, location, care needs, health status, and photo history.',
    img: '/assets/horticare-midfi-view.png',
  },
  {
    task: 'Tasks',
    title: 'Task Management',
    tooltip: 'Monthly calendar and daily breakdown of care tasks, each showing scheduled time, plant name, and location.',
    img: '/assets/horticare-midfi-tasks.png',
  },
  {
    task: 'Guide',
    title: 'Plant Care Guide',
    tooltip: 'Curated plant care articles across topics like soil maintenance, with a featured article at the top.',
    img: '/assets/horticare-midfi-guide.png',
  },
  {
    task: 'Profile',
    title: 'User Profile & Settings',
    tooltip: 'Account details, notification preferences, and full plant care history in one place.',
    img: '/assets/horticare-midfi-profile.png',
  },
]

const CRITIQUE_ITEMS = [
  {
    quotes: [
      '"Today" and the current date say the same thing.',
      'The homepage is a bit cramped — break containment and generate more breathing room.',
      'Maintain text alignment consistency.',
      'Reconsider the task card layout — the green circle is quite jarring.',
      'Should the articles be here? Give more emphasis to ‘Today’s Tasks’.',
    ],
    img: '/assets/horticare-midfi-home.png',
    alt: 'HortiCare mid-fi home screen',
    task: 'Home Screen',
  },
  {
    quotes: [
      'Move reminder to right-hand side.',
      'Spruce up this page with color.',
      'Add a delete plant action to this page.',
    ],
    img: '/assets/horticare-midfi-view.png',
    alt: 'HortiCare mid-fi individual plant screen',
    task: 'View Plant Screen',
  },
  {
    quotes: [ 
      'The profile photo carries a lot of visual weight... try resizing it to make it less distracting.',
      'Make it more apparent that the calendar icon is clickable.',
      'Make the task card more flexible and elegant.',
    ],
    img: '/assets/horticare-midfi-tasks.png',
    alt: 'HortiCare mid-fi tasks screen',
    task: 'Tasks Screen',
  },
  {
    quotes: [
      'This is a container of containers; try removing them and see how you feel.',
      'The tan color does not serve much of a purpose here... consider removing it.',
      'Trying adding some decor as current design language is simple.',
    ],
    img: '/assets/horticare-midfi-profile.png',
    alt: 'HortiCare mid-fi profile screen',
    task: 'Profile Screen',
  },
]

const CHANGES = [
  {
    label: 'Homepage simplification',
    before: '/assets/horticare-midfi-home.png',
    after: '/assets/horticare-final-home.png',
    desc: 'Renamed the page to "Home", removed excess containers, and narrowed the focus to today\'s tasks to give the page breathing room.',
  },
  {
    label: 'Individual plant view',
    before: '/assets/horticare-midfi-view.png',
    after: '/assets/horticare-final-view.png',
    desc: 'Added a delete action, brought more visual weight to the schedules, and moved the reminder to the right side for a cleaner layout.',
  },
  {
    label: 'Calendar interaction & task format',
    before: '/assets/horticare-midfi-tasks.png',
    after: '/assets/horticare-final-tasks.png',
    desc: 'Added a mini tooltip for the calendar, and converted plant tasks into a to-do list format for a more flexible and intuitive interaction.',
  },
  {
    label: 'Profile page cleanup',
    before: '/assets/horticare-midfi-profile.png',
    after: '/assets/horticare-final-profile.png',
    desc: 'Removed excess containers and the tan color, added a quick-view summary of overall plant statistics, and reorganized settings.',
  },
]

const BUILD_NAV = ['Overview', 'Context', 'Why I Built This', 'The Stack', 'What I Built', 'Challenges', 'Future Directions', 'Reflections']
const DESIGN_NAV = ['Overview', 'Context', 'Strategy', 'Ideation', 'Iteration', 'Critique', 'Deliver', 'Reflections']

export default function HortiCare() {
  const [tab, setTab] = useState('build')
  const [activeSection, setActiveSection] = useState('')
  const [lightbox, setLightbox] = useState(null)
  const [videoLightbox, setVideoLightbox] = useState(null)

  useScrollReveal()
  useActiveSection(setActiveSection, tab)

  const nav = tab === 'build' ? BUILD_NAV : DESIGN_NAV

  const switchTab = (t) => {
  setTab(t)
  setTimeout(() => {
    if (t === 'design') {
      document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      document.getElementById('what-i-built')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, 50)
}

  return (
    <main className="case-study">
      <nav className="case-study__sidenav">
        {nav.map(s => (
          <a key={s} href={`#${s.toLowerCase().replace(/\s+/g, '-')}`}
            className={`case-study__sidenav-link ${activeSection === s.toLowerCase().replace(/\s+/g, '-') ? 'case-study__sidenav-link--active' : ''}`}>
            {s}
          </a>
        ))}
      </nav>

      <div className="case-study__body">

        {lightbox && (
          <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '40px' }}>
            <img src={lightbox} alt="Expanded view" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }} onClick={e => e.stopPropagation()} />
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '20px', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%' }}>✕</button>
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

        {/* ── HERO always visible ── */}
        <section id="overview" className="cs-section">
          <div className="cs-hero">
            <p className="cs-hero__client">HortiCare</p>
            <h1 className="cs-hero__title">Growing with Care: Cultivating an Identity for my Original Plant Care App</h1>
            <div className="cs-hero__image-wrap">
              <img src="/assets/horticare-hero.png" alt="HortiCare app overview" className="cs-hero__image" onError={e => e.target.parentElement.classList.add('cs-hero__image-wrap--empty')} />
            </div>
          </div>

          <div className="cs-intro">
            <div className="cs-intro__text">
              <h2 className="cs-block-title">About</h2>
              <p>During the height of COVID-19, succulents became everyone's go-to plant, 
                and like many owners, I still managed to neglect mine. Motivated to improve 
                my own and others' plant care habits, I built HortiCare in Swift/SwiftUI, 
                then returned a year later to apply visual design principles to it. 
                This project showcases my duality as both a developer and a designer.</p>
              <div className="cs-problem-outcome">
                <div className="cs-callout cs-callout--problem">
                  <p className="cs-callout__label">Problem</p>
                  <p>As a plant owner, I often struggled to keep my plants healthy due to overwatering, inconsistent care, and limited knowledge, leading to discouragement and a history of failed plant care.</p>
                </div>
                <div className="cs-callout cs-callout--outcome">
                  <p className="cs-callout__label">Outcome</p>
                  <p>A functional iOS plant care app backed by a real-time Firebase database, later redesigned with a polished design system, cohesive brand voice, and intentional visual hierarchy.</p>
                </div>
              </div>
            </div>
            <aside className="cs-meta">
              <div className="cs-meta__item">
                <p className="cs-meta__label">Team</p>
                <p>Amoni Hawkins (me)</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">Timeline</p>
                <p>Build ~ Mar – May 2023 (2 months)</p>
                <p>Design ~ Mar – May 2024 (2 months)</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">Tools</p>
                <p>Figma, Xcode, Google G Suite</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">My Main Tasks</p>
                <p>iOS Programming</p>
                <p>Visual Design</p>
                <p>Brand Strategy</p>
              </div>
            </aside>
          </div>
          </section>

          {/* ── CONTEXT ───────────────────────────────────────── */}
        <section id="context" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number" style={{fontSize: '18px', fontWeight: 600}}>Context</span>
            <span>What is HortiCare?</span>
          </div>

          <p>
            HortiCare is an app idea I came up with for my final project in my Programming 
            Handheld Devices course. Its name comes from the combination of horticulture 
            (the cultivation of plants) and care, It is a plant care app that allows the 
            user to track and manage their house plants, including what type of plant it is, 
            where it is stored, when it is watered and other helpful assorted information.
          </p>

          {/* Key info cards */}
          <div className="cs-findings" style={{marginTop: '4px'}}>
            {[
              {
                title: 'Target Users',
                desc: 'HortiCare was created to support beginner and casual houseplant owners who struggle with consistent care due to busy schedules, limited experience, or forgetfulness.',
              },
              {
                title: 'Main Features',
                desc: 'Plant profile creation/deletion, task management, and synced notifications',
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

          <div className="cs-pullquote">
            <p className="cs-pullquote__text">"Motivated by my personal struggle to care for my plants, I independently led HortiCare's development and design evolution from the ground up, creating a supportive tool for those like me."</p>
            <p className="cs-pullquote__attribution">— My motivation for this project</p>
          </div>

          {/* Tab switcher */}
          <div className="hc-tabs">
            <button className={`hc-tab ${tab === 'build' ? 'hc-tab--active' : ''}`} onClick={() => switchTab('build')}>
              <span className="hc-tab__title">The Build</span>
              <span className="hc-tab__sub">Swift / SwiftUI / Firebase</span>
            </button>
            <button className={`hc-tab ${tab === 'design' ? 'hc-tab--active' : ''}`} onClick={() => switchTab('design')}>
              <span className="hc-tab__title">The Redesign</span>
              <span className="hc-tab__sub">Visual Design / Brand Strategy</span>
            </button>
          </div>
        </section>

        {/* ══ TAB 01 — THE BUILD ══ */}
        {tab === 'build' && (
          <>
            {/* ── 01 WHY I BUILT THIS ── */}
            <section id="why-i-built-this" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">01</span>
                <span>Understanding the Need</span>
              </div>
              <h2 className="cs-section-title">Why I Built This</h2>
              <p className="cs-section-lead">
                I am an optimistic yet irresponsible succulent mom, and HortiCare was my solution.
              </p>
              <p>
                During COVID-19, houseplants became everyone's quarantine companion. I fell in love
                with succulents but struggled to keep track of watering schedules, plant locations,
                and care routines across multiple plants. Nothing on the market felt personal enough,
                so I built my own. Derived from horticulture and care, HortiCare lets users maintain
                a living record of their plants such as what they are, where they live, and how to keep
                them thriving.
              </p>

              <div className="cs-hmw" style={{ marginTop: '24px' }}>
                <p className="cs-hmw__label">Primary Goal</p>
                <p className="cs-hmw__text">
                  Build a dynamic, personalized plant tracking app that helps users manage
                  their plants and grow as plant parents through accessible guidance.
                </p>
              </div>
            </section>

            {/* ── 02 THE STACK ── */}
            <section id="the-stack" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">02</span>
                <span>Laying the Foundation</span>
              </div>
              <h2 className="cs-section-title">The Stack</h2>
              <p className="cs-section-lead">
                I chose Swift/SwiftUI for native iOS performance and Firebase for real-time
                data sync to deliver a seamless, persistent experience.
              </p>

              <div className="cs-insights">
                {[
                  {
                    label: 'Swift / SwiftUI',
                    desc: 'Native iOS framework chosen for its declarative UI syntax, performance, and seamless integration with device features like the camera and push notifications.',
                  },
                  {
                    label: 'Firebase Realtime Database',
                    desc: 'Syncs plant data in real time so changes persist after the app closes. This was added mid-project after a TA\'s feedback and learned from scratch.',
                  },
                  {
                    label: 'PhotosUI / AVFoundation',
                    desc: 'Enabled users to photograph their plants directly or pull from their photo library. A stretch goal I successfully implemented that works similarly to major consumer apps.',
                  },
                  {
                    label: 'UserNotifications',
                    desc: 'Apple\'s native framework used to schedule local push notifications per plant based on each plant\'s watering frequency that reminds users before they forget.',
                  },
                ].map(m => (
                  <div key={m.label} className="cs-insight-card" style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                  }}>
                    <p className="cs-insight-card__label" style={{ color: 'var(--text-primary)' }}>{m.label}</p>
                    <p>{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 03 WHAT I BUILT ── */}
            <section id="what-i-built" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">03</span>
                <span>Building the Experience</span>
              </div>
              <h2 className="cs-section-title">What I Built</h2>
              <p className="cs-section-lead">
                HortiCare delivers four core features that together solve the plant care
                tracking problem end to end.
              </p>

              <div className="cs-sprint-steps">
                {[
                  {
                    step: 'Plant Profiles',
                    desc: 'Users can create a profile for each plant with a name, scientific name, photo, location, watering schedule, and health status. A heart icon on the list view gives a quick visual indicator of each plant\'s condition.',
                  },
                  {
                    step: 'Real-Time Database',
                    desc: 'All plant data is stored and synced through Firebase which means changes persist after the app closes and the full plant list is restored on every launch.',
                  },
                  {
                    step: 'Task Management',
                    desc: 'Each plant has an editable watering schedule accessible in the detail view. Users can update care routines as their plants\' needs change over time.',
                  },
                  {
                    step: 'Push Notifications',
                    desc: 'Users can opt into notifications per plant at creation time. The app schedules local push notifications based on each plant\'s watering frequency, surfacing reminders on the home screen.',
                  },
                  {
                    step: 'Plant Guide',
                    desc: 'A curated tab of external links and resources giving users consistent access to plant care advice, fulfilling the goal of making the app educational as well as functional.',
                  },
                ].map(s => (
                  <div key={s.step} className="cs-sprint-step">
                    <span className="cs-sprint-step__label">{s.step}</span>
                    <div style={{ minWidth: 0 }}>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Original screens strip */}
              <h2 className="cs-section-title" style={{ marginTop: '32px' }}>Original Screens</h2>
              <p className="cs-section-lead">
                The functional app — built before formal design training. It worked,
                but the visual experience left room to grow.
              </p>
              <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '12px',
                scrollSnapType: 'x mandatory',
              }}>
                {[
                  { src: '/assets/horticare-original-1.png', label: 'Plant List' },
                  { src: '/assets/horticare-original-2.png', label: 'Add Plant' },
                  { src: '/assets/horticare-original-3.png', label: 'Plant Detail' },
                  { src: '/assets/horticare-original-4.png', label: 'Edit Plant' },
                  { src: '/assets/horticare-original-6.png', label: 'Plant Guide' },
                ].map((img, i) => (
                  <div key={i} style={{ flexShrink: 0, width: '160px', scrollSnapAlign: 'start' }}>
                    <img
                      src={img.src}
                      alt={img.label}
                      className="cs-image"
                      style={{ borderRadius: 'var(--radius-md)', cursor: 'zoom-in' }}
                      onClick={() => setLightbox(img.src)}
                      onError={e => e.target.style.display='none'}
                    />
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'center' }}>{img.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 04 CHALLENGES ── */}
            <section id="challenges" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">04</span>
                <span>Navigating the Challenges</span>
              </div>
              <h2 className="cs-section-title">Challenges I Solved</h2>
              <p className="cs-section-lead">
                Two technical challenges stood out: both were outside my original plan
                and required learning new concepts independently mid-project.
              </p>

              <div className="cs-findings">
                {[
                  {
                    title: 'Firebase Data Modeling',
                    desc: 'Connecting Firebase auth to per-user plant data wasn\'t in my original plan. I restructured the database mid-project so each user\'s plants lived under their unique auth ID, requiring me to learn Firebase security rules and data architecture from scratch.',
                  },
                  {
                    title: 'Camera & Photo Library Access',
                    desc: 'A stretch goal I successfully delivered. Getting PhotosUI to work with plant profiles required navigating Apple\'s permission system and async image handling independently, outside of class resources.',
                  },
                ].map((f, i) => (
                  <div key={f.title} className="cs-finding-card">
                    <div className="cs-finding-card__num">{i + 1}</div>
                    <div>
                      <p className="cs-finding-card__title">{f.title}</p>
                      <p className="cs-finding-card__desc">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Code snippets */}
              <h2 className="cs-section-title" style={{ marginTop: '32px' }}>A Glimpse at the Code</h2>
              <p className="cs-section-lead">
                Two of the more technically involved pieces of the build that I learned
                independently outside of class resources.
              </p>

              <div className="cs-image-row" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
                <div className="cs-task-card">
                  <p className="cs-task-card__label" style={{ marginBottom: '6px' }}>Real-Time Sync</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                    Three simultaneous Firebase observers keep the local plant list in sync
                    with the database for adding, removing, and updating without a manual refresh.
                  </p>
                  <img
                    src="/assets/horticare-code-firebase.png"
                    alt="Firebase real-time sync code"
                    className="cs-image"
                    style={{ cursor: 'zoom-in', borderRadius: 'var(--radius-md)', height: '350px', objectFit: 'cover', objectPosition: 'top'}}
                    onClick={() => setLightbox('/assets/horticare-code-firebase.png')}
                    onError={e => e.target.style.display='none'}
                  />
                </div>

                <div className="cs-task-card">
                  <p className="cs-task-card__label" style={{ marginBottom: '6px' }}>Bridging UIKit & SwiftUI</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                    To enable camera and photo library access, I built a custom bridge between
                    UIKit's image picker and SwiftUI using UIViewControllerRepresentable.
                  </p>
                  <img
                    src="/assets/horticare-code-imageselector.png"
                    alt="UIViewControllerRepresentable image picker bridge code"
                    className="cs-image"
                    style={{ cursor: 'zoom-in', borderRadius: 'var(--radius-md)', height: '350px', objectFit: 'cover', objectPosition: 'top' }}
                    onClick={() => setLightbox('/assets/horticare-code-imageselector.png')}
                    onError={e => e.target.style.display='none'}
                  />
                </div>
              </div>
            </section>

            {/* ── 05 FUTURE DIRECTIONS ── */}
            <section id="future-directions" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">05</span>
                <span>Envisioning What's Next</span>
              </div>
              <h2 className="cs-section-title">Future Directions</h2>
              <p className="cs-section-lead">
                If I returned to HortiCare for a third time, here's where I'd take it next.
              </p>

              <div className="cs-insights">
                {[
                  {
                    label: 'Light Detection',
                    desc: 'Using the camera to measure ambient light levels and suggest optimal plant placement — a stretch goal I didn\'t have time to complete.',
                  },
                  {
                    label: 'Plant Identification',
                    desc: 'Camera-based plant recognition that auto-fills profile details and suggests care instructions to reduce friction for new plant parents.',
                  },
                  {
                    label: 'Community Features',
                    desc: 'A blog and photo sharing tab where users can swap advice, show off their collections, and receive tips from curated Plant Guide articles.',
                  },
                ].map(m => (
                  <div key={m.label} className="cs-insight-card" style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                  }}>
                    <p className="cs-insight-card__label" style={{ color: 'var(--text-primary)' }}>{m.label}</p>
                    <p>{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── REFLECTIONS (BUILD) ── */}
            <section id="reflections" className="cs-section cs-reveal">
              <h2 className="cs-section-title">What I Learned from Building This</h2>

              <div className="cs-pullquote">
                <p className="cs-pullquote__text">
                  "HortiCare is the first of many for me — and it has inspired me to see what else I am capable of."
                </p>
                <p className="cs-pullquote__attribution">— Final reflection</p>
              </div>

              <div className="cs-takeaways">
                {[
                  {
                    num: '1',
                    title: 'Resilience is a skill.',
                    desc: 'Between unexpected life setbacks and steep learning curves, I delivered a functional app solo. Breaking large goals into small daily tasks kept me moving forward.',
                  },
                  {
                    num: '2',
                    title: 'Teams exist for a reason.',
                    desc: 'Building alone gave me deep appreciation for collaborative development. The hardest moments were the ones where I wished someone else could debug alongside me.',
                  },
                  {
                    num: '3',
                    title: 'Stretch goals are worth attempting.',
                    desc: 'Camera access and Firebase were both outside my comfort zone. Getting them to work — on my own, without class resources — was the most rewarding part of the build.',
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

              {/* CTA to switch tab */}
              <div className="hc-tab-cta" style={{ marginTop: '32px' }}>
                <p>Ready to see what happened when I came back with design skills?</p>
                <button
                  className="hc-tab-cta__btn"
                  onClick={() => switchTab('design')}
                >
                  View The Redesign →
                </button>
              </div>
            </section>
          </>
        )}

        {/* ══ TAB 02 — THE REDESIGN ══ */}
        {tab === 'design' && (
          <>
            <section id="strategy" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">01</span>
                <span>Establishing a Design Direction</span>
              </div>

              <h2 className="cs-section-title">Introduction</h2>
              <p className="cs-section-lead">HortiCare needed a refreshed visual direction to better reflect its nurturing purpose and enhance the user experience through a more intentional, user-centered approach.</p>
              <p>For my Visual Design Studio course, I chose to redesign HortiCare for my final project. I developed this app when I did not have the fundamental skills of a designer, so it was the perfect opportunity for me to apply my new knowledge/experience.</p>

              <h2 className="cs-section-title">Redesign Pillars</h2>
              <p className="cs-section-lead">To guide my visual redesign, I established three core pillars: balanced color scheme, clean typography, and a clear, soothing brand voice.</p>
              <div className="val-grid" style={{ marginTop: '8px' }}>
                {PILLARS.map(p => (
                  <div key={p.title} className="val-card" style={{
                    transition: 'none',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                    <div className="val-icon">{p.icon}</div>
                    <h3 className="val-title">{p.title}</h3>
                    <p className="val-body">{p.desc}</p>
                  </div>
                ))}
              </div>
              <div className="cs-hmw" style={{ marginTop: '32px' }}>
                <p className="cs-hmw__label">Defining the Challenge</p>
                <p className="cs-hmw__text">How might I redesign HortiCare to help plant owners track their plants in a clear, efficient, and visually appealing way?</p>
              </div>
            </section>

            <section id="ideation" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">02</span>
                <span>Turning Inspirations into Concepts</span>
              </div>
              <h2 className="cs-section-title">Mood Board</h2>
              <p className="cs-section-lead">I collected a plethora of photos of plants, homes, and nature for inspiration, guiding my search for visual elements like color and text.</p>
              <p>I wished to evoke the feelings of comfort, calmness, earthiness and relaxation in combination with an interface that is clear. This collection of photos soothed me and so I looked for colors and fonts that matched this vibe.</p>
              <img
                src="/assets/horticare-moodboard.png"
                alt="HortiCare neutral plant mood board"
                className="cs-image"
                style={{ cursor: 'zoom-in', maxHeight: '360px', objectFit: 'cover' }}
                onClick={() => setLightbox('/assets/horticare-moodboard.png')}
                onError={e => e.target.style.display='none'}
              />

              <h2 className="cs-section-title" style={{ marginTop: '32px' }}>Color & Font Exploration</h2>
              <p className="cs-section-lead">I explored expressive typefaces alongside a balanced, growth-inspired color palette to capture HortiCare’s youthful personality while maintaining its calm, plant-centered aesthetic.</p>
              <p>I explored earth-toned palettes centered on green, complemented by nude and blue hues, while testing serif and sans-serif typefaces for flexibility and versatility across the app.</p>
              <div className="cs-image-row">
                <img src="/assets/horticare-colors-exploration.png" alt="HortiCare color exploration" className="cs-image" style={{ cursor: 'zoom-in' }} onClick={() => setLightbox('/assets/horticare-colors-exploration.png')} onError={e => e.target.style.display='none'} />
                <img src="/assets/horticare-font-exploration.png" alt="HortiCare typography exploration" className="cs-image" style={{ cursor: 'zoom-in' }} onClick={() => setLightbox('/assets/horticare-font-exploration.png')} onError={e => e.target.style.display='none'} />
              </div>

              <h2 className="cs-section-title" style={{ marginTop: '32px' }}>Paper Prototypes</h2>
              <p className="cs-section-lead">I sketched concepts for the new layout across the main user flows, quickly drafting the foundation of my redesign before touching Figma.</p>
              <p>This new layout includes a homepage with plant spotlights and task reminders, a plants page with a search bar, a calendar-view tasks page, and a user profile page.</p>
              <div className="cs-image-row">
                <img
                  src="/assets/horticare-sketch-1.png"
                  alt="HortiCare paper sketch 1/2"
                  className="cs-image"
                  style={{ cursor: 'zoom-in', height: '330px', objectFit: 'cover', objectPosition: 'top' }}
                  onClick={() => setLightbox('/assets/horticare-sketch-1.png')}
                  onError={e => e.target.style.display='none'}
                />
                <img
                  src="/assets/horticare-sketch-2.png"
                  alt="HortiCare paper sketch 2/2"
                  className="cs-image"
                  style={{ cursor: 'zoom-in', height: '330px', objectFit: 'cover', objectPosition: 'top' }}
                  onClick={() => setLightbox('/assets/horticare-sketch-2.png')}
                  onError={e => e.target.style.display='none'}
                />
              </div>
            </section>

            <section id="iteration" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">03</span>
                <span>Evolving the Design through Iteration</span>
              </div>

              <h2 className="cs-section-title" style={{ marginTop: '32px' }}>Mid-Fidelity Screens</h2>
            <p className="cs-section-lead">
              Before finalizing any visual decisions, I translated my paper sketches into 
              mid-fidelity screens across the app's main flows to test the layout and structure.
            </p>
              <MidFiStrip onExpand={setLightbox} />
            </section>

            <section id="critique" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">04</span>
                <span>Shaping the Solution with Feedback</span>
              </div>
              <h2 className="cs-section-title">Design Critique</h2>
              <p className="cs-section-lead">
                While presenting my mid-fidelity prototype, I received live feedback from
                peers and my visual design professor that directly shaped the final iteration.
              </p>
              <CritiqueCarousel />

              <h2 className="cs-section-title">Final Design System</h2>
              <p className="cs-section-lead">I established HortiCare’s final color palette and primary typeface, choosing the most fitting options that reflected tranquility and organic.</p>
              <p>Green anchors the palette to reflect nature and health, supported by nude and muted blue tones for calm and balance. Paired with Syne, a youthful yet balanced typeface that adds modern character to the app.</p>
              <div className="cs-image-row">
                <img
                  src="/assets/horticare-final-colors.png"
                  alt="HortiCare final color palette"
                  className="cs-image"
                  style={{ cursor: 'zoom-in', height: '350px', objectFit: 'cover', objectPosition: 'top' }}
                  onClick={() => setLightbox('/assets/horticare-final-colors.png')}
                  onError={e => e.target.style.display='none'}
                />
                <img
                  src="/assets/horticare-final-typography.png"
                  alt="HortiCare final typography"
                  className="cs-image"
                  style={{ cursor: 'zoom-in', height: '350px', objectFit: 'cover', objectPosition: 'top' }}
                  onClick={() => setLightbox('/assets/horticare-final-typography.png')}
                  onError={e => e.target.style.display='none'}
                />
              </div>
            </section>

            <section id="deliver" className="cs-section cs-reveal">
              <div className="cs-phase-label">
                <span className="cs-phase-number">05</span>
                <span>Delivering the Final Product</span>
              </div>

              <h2 className="cs-section-title">What Changed</h2>
              <p className="cs-section-lead">
                Here's how the critique translated into design decisions.
              </p>
              <ChangesCarousel />

              <h2 className="cs-section-title" style={{ marginTop: '40px' }}>Final Prototype</h2>
              <p className="cs-section-lead">Here's how the redesign came to life!</p>
              <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '24px',
                  alignItems: 'start',
                  borderLeft: `3px solid #143109`,
                  padding: '16px',
                  marginTop: '16px',
                }} className="cs-task-card">
                  {/* Video left */}
                  <div style={{ position: 'relative', cursor: 'zoom-in' }} onClick={() => setVideoLightbox('/assets/horticare-final-demo.mp4')}>
                    <video
                      src="https://res.cloudinary.com/dp14rewbz/video/upload/v1782319096/horticare-final-demo_yuclru.mp4"
                      autoPlay loop muted playsInline
                      onLoadedMetadata={e => e.target.playbackRate = 1.25}
                      style={{ width: '100%', borderRadius: 'var(--radius-md)', display: 'block', objectFit: 'contain', aspectRatio: '9 / 16', background: 'var(--bg-secondary)' }}
                    />
                    <div
                      style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = 0}
                    >
                      <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em' }}>EXPAND ↗</span>
                    </div>
                  </div>

                  {/* Text right */}
                  <div>
                    <p className="cs-task-card__label" style={{ marginBottom: '8px', color: ' #143109'}}>Mobile App - HortiCare</p>
                    <p className="cs-task-card__subtitle" style={{ marginBottom: '12px' }}>A fully redesigned iOS experience applying visual design principles to a functional app</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-altprimary)', lineHeight: 1.7 }}>
                      The final prototype brings together all three redesign pillars — balanced color, clean typography,
                       and a soothing brand voice. The homepage was simplified to focus on today's tasks, the plant 
                       profile was enriched with color-coded care schedules, and the task page was reimagined as 
                       an interactive to-do list with a collapsible calendar. Each screen reflects a deliberate design 
                       decision informed by the critique, resulting in a cohesive and visually refined experience.
                    </p>
                  </div>
                </div>
          </section>
           <section id="reflections" className="cs-section cs-reveal">
              <h2 className="cs-section-title">What I Learned from this Project</h2>
              <div className="cs-pullquote">
                <p className="cs-pullquote__text">Recognizing the growth and skills gained through my solo endeavor.</p>
              </div>
              <div className="cs-takeaways">
                {[
                  { num: '1', title: 'Planning guides creativity.', desc: 'Tools like paper prototypes and mood boards helped focus my ideas, streamline the process, and lead to a more cohesive, productive project.' },
                  { num: '2', title: 'Resilience fuels growth.', desc: 'Learning to embrace feedback and navigate challenges independently has strengthened my determination and motivated me to continually improve.' },
                  { num: '3', title: 'Thoughtful design enhances experience.', desc: 'Refreshing HortiCare highlighted how intentional visual design can make an app more engaging and enjoyable for users.' },
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
              <p style={{ marginTop: '32px', color: 'var(--text-altprimary)', lineHeight: 1.8 }}>I am very proud of the work I accomplished in this project. It was heartwarming to see how far I had come as a designer — and it truly speaks to how there is always something more to learn.</p>
            </section>
          </>
        )}
       

            <section className="cs-section cs-more cs-reveal">
              <p className="section-label">View More</p>
              <div className="cs-more__grid">
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
                  <p className="cs-more__card-sub" style={{
                    fontSize: 'clamp(12px, 2.4vw, 20px)',
                    fontWeight: '500',
                    letterSpacing: '-0.015em',
                    lineHeight: '1.25',
                    color: 'var(--text-primary)'
                  }}>Boosting Product Discoverability through UX Redesign</p>
                  <p className="feat-link" data-cursor="link" style={{color: 'var(--brand)', margin: '8px 10px'}}>View case study <span className="feat-link-arrow">→</span></p>
                </a>
                <a 
                  href="/projects/tripadvisor" 
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
                  <p className="cs-more__card-title" style={{fontSize: '16px'}}>TripAdvisor</p>
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