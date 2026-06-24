import { useEffect } from 'react'
import './About.css'

const VALUES = [
  { icon: '👥', title: 'Inclusivity',  desc: 'I intentionally cultivate a shared space for all to participate with an emphasis on a sense of belonging.' },
  { icon: '🫶', title: 'Empathy',      desc: 'I connect with my users more deeply through immersion and open communication, aiming to listen first without making assumptions.' },
  { icon: '💡', title: 'Empowerment',  desc: 'I use my research to amplify users\' voices, translating their needs to inform designs that uplift them.' },
]

const SERVICES = [
  {
    icon: '🔎', title: 'User Research',
    skills: 'Interviews, Usability Testing, Affinity Mapping, Heuristic Evaluations, Survey Design, Competitor Analysis, User Personas, A/B Testing, Data Analysis',
    tools: ['Miro', 'Rally', 'Loop11'],
  },
  {
    icon: '🎨', title: 'UX/UI Design',
    skills: 'Information Architecture, User Flows, Prototyping & Wireframing, Interaction Design, Accessibility, Visual Design, Storyboarding',
    tools: ['Figma', 'Adobe XD', 'Coolors'],
  },
  {
    icon: '💻', title: 'Front-End Development',
    skills: 'HTML/CSS/JavaScript Fundamentals, React, Swift, Section 508 Standards, Responsive Design, Version Control, Testing & Debugging',
    tools: ['VS Code', 'Git/GitHub', 'Xcode'],
  },
]

const SCOOP = [
  { k: "What show/movie I'm watching now...", v: "Severance (Season 2)" },
  { k: "The last trip I've been on...",       v: "Atlanta, GA" },
  { k: "My current craving...",               v: "Banana Bread Matcha Lattes" },
  { k: "What I've been working on lately...", v: "Perfecting my work-life balance" },
]

function useReveal() {
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

export default function About() {
  useReveal()

  return (
    <main className="about-page">

      <section className="ab-hero">
        <div className="ab-hero-grid">
          <div className="ab-hero-text">
            <h1 className="ab-greet">Hi, I'm Amoni! <span className="wave" aria-hidden>👋</span></h1>
            <p className="ab-pron serif">pronounced as /uh-mahn-knee/</p>
            <div className="ab-body">
              <p>Allow me to formally introduce myself! I am a <strong>DMV-based multidisciplinary technologist</strong>. I earned my <strong>B.S. in Computer Science</strong> from the University of Maryland, College Park, and just finished my <strong>M.S. in Human-Computer Interaction</strong> from there as well.</p>
              <p>Rooted in empathy, inclusivity, and empowerment, <strong>my approach is driven by a desire to understand human motivations and shape empathetic solutions that make users feel seen.</strong> My proficiency in front-end development, interaction design, and UX research enables me to understand and execute the full UX process from sticky notes to polished code.</p>
              <p>Outside of work, you can find me watching TV series & movies, going on fun adventures, trying to satisfy my traveling itch, or engaging in community service with my sorority!</p>
            </div>
          </div>
          <div className="ab-portrait">
            <div className="portrait-card">
              <img 
                src="/assets/about-photo.JPG" 
                alt="Amoni Hawkins" className="ab-portrait-img"
                style={{ height: '580px', objectFit: 'cover', objectPosition: 'center 90%' }} 
                onError={e => e.target.style.display='none'} 
                />
            </div>
          </div>
        </div>
      </section>

      <div data-reveal>
        <section className="ab-section">
          <div className="ab-inner">
            <p className="mono section-kicker">My Latest Scoop</p>
            <ul className="scoop-list">
              {SCOOP.map(it => (
                <li key={it.k}>
                  <span className="scoop-k">{it.k}</span>
                  <span className="scoop-v">{it.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div data-reveal>
        <section className="ab-section">
          <div className="ab-inner">
            <p className="mono section-kicker">Who I Am As A Researcher — My Values</p>
            <div className="val-grid">
              {VALUES.map(v => (
                <div className="val-card" key={v.title}>
                  <div className="val-icon">{v.icon}</div>
                  <h3 className="val-title">{v.title}</h3>
                  <p className="val-body">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div data-reveal>
        <section className="ab-section">
          <div className="ab-inner">
            <p className="mono section-kicker">My Services</p>
            <p className="services-lede">I offer a wide range of services that span across research, design and development, making me the full package to help you bring your vision to life!</p>
            <div className="svc-grid">
              {SERVICES.map(s => (
                <div className="svc-card" key={s.title}>
                  <div className="svc-icon"><span>{s.icon}</span></div>
                  <h3 className="svc-title">{s.title}</h3>
                  <p className="svc-label mono">Top Skills:</p>
                  <p className="svc-skills">{s.skills}</p>
                  <p className="svc-label mono">Tools:</p>
                  <div className="svc-tools">
                    {s.tools.map(t => <span className="tool-pill" key={t}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

    </main>
  )
}
