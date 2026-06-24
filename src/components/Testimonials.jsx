import { useState, useRef } from 'react'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    q: "Amoni, it's been a pleasure to read your work this course. Your work is very polished, personable, professional, and well organized. You are a true UX Researcher and I'm excited for what's next in your career!",
    name: 'LaRia Rogers, MIM',
    role: "Adjunct Professor for UMD's iSchool & Senior Product Manager @ Nava",
    initials: 'LR',
  },
  {
    q: "You were praised for your incredible work ethic, helpful nature, and ability to support wherever needed. Your gift for communication and public speaking was repeatedly noted. It was such a pleasure having you in my class, Amoni!",
    name: 'Heera Lee',
    role: 'Lecturer & Director of HCIM Program @ UMD',
    initials: 'HL',
  },
  {
    q: "Very nice Amoni. There are some natural abilities here and honestly if you keep on going you will blossom quite nicely. It's like you have an innate sense of design, maybe by observation but it's there so who cares.",
    name: 'Jason Aston',
    role: 'University Professor @ UMD',
    initials: 'JA',
  },
]

export default function Testimonials() {
  return (
    <section className="testis">
      <div className="testis-inner">
        <p className="mono section-kicker">Kind Words From Others</p>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <TestiCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* 3D tilt card — follows mouse position */
function TestiCard({ t }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: px * 6, y: -py * 6 })
  }

  return (
    <figure
      ref={ref}
      className="testi"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
    >
      {/* Decorative quote mark */}
      <svg className="testi-quote" width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden>
        <path d="M0 13.5C0 8 3.2 3 8.5 0l1.8 3C7 4.9 5 7.6 4.8 10.5h4v8H0v-5zm12 0c0-5.5 3.2-10.5 8.5-13.5l1.8 3c-3.3 1.9-5.3 4.6-5.5 7.5h4v8H12v-5z"/>
      </svg>

      <blockquote>{t.q}</blockquote>

      <figcaption>
        <span className="testi-avatar">{t.initials}</span>
        <span className="testi-who">
          <span className="testi-name">{t.name}</span>
          <span className="testi-role">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
