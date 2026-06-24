import { useState, useRef, useEffect } from 'react'
import './Projects.css'

const PROJECTS = [
  {
    id: 'flikshop',
    client: 'Flikshop',
    title: 'Boosting Product Discoverability Through UX Redesign',
    desc: "Along with my team, I uncovered noteworthy research insights to drive the redesign of Flikshop's app and website, strengthening its usability and brand cohesion.",
    metric: 'Projected increase in user engagement & recall',
    tags: ['UX/UI Redesign', 'Social Enterprise Client', 'Brand Strategy'],
    slug: '/projects/flikshop',
    img: '/assets/project-flikshop.png',
  },
  {
    id: 'tripadvisor',
    client: 'TripAdvisor',
    title: 'Evaluating Cognitive Load in a Travel Guidance Platform',
    desc: "I led an end-to-end research test that evaluated how well TripAdvisor manages users' cognitive load while planning a full trip.",
    metric: 'Increase in user trust & conversion',
    tags: ['UX Research', 'Usability Study', 'Data Analysis'],
    slug: '/projects/tripadvisor',
    img: '/assets/project-tripadvisor.png',
  },
  {
    id: 'google-calendar',
    client: 'Google Calendar',
    title: 'Adapting an Existing Design for Users with Low Vision',
    desc: "I co-designed personalized features for Google Calendar, based off our participant's experience, through extensive participatory research to enhance its visual accessibility.",
    metric: 'Reimagined version with 3+ new design features',
    tags: ['Accessibility', 'Participatory Design', 'Concept'],
    slug: '/projects/google-calendar',
    img: '/assets/project-gcal.png',
  },
  {
    id: 'horticare',
    client: 'HortiCare',
    title: 'Cultivating an Identity for my Original Plant Care App',
    desc: 'I programmed an app from scratch for a course project, and later applied essential design principles (typography, color, etc.) to it for a cohesive user experience.',
    metric: 'iOS app equipped with new design system',
    tags: ['iOS Development', 'Visual Design', 'Brand Development'],
    slug: '/projects/horticare',
    img: '/assets/project-horticare.png',
  },
]

export default function Projects() {
  return (
    <section id="work" className="featured">
      <div className="featured-inner">
        <p className="mono section-kicker">Featured Projects</p>
        <div className="feat-list">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, i }) {
  const reverse = i % 2 === 1

  return (
    <article
      className={`feat ${reverse ? 'rev' : ''}`}
    >
      {/* Image side */}
      <a
        href={p.slug}
        className="feat-media"
        data-cursor="view" 
        data-cursor-label="View"
        onClick={e => { e.preventDefault(); window.history.pushState({}, '', p.slug); window.dispatchEvent(new PopStateEvent('popstate')) }}
      >
        <img
          src={p.img}
          alt={p.client}
          className="feat-img"
          onError={e => e.target.style.display='none'}
        />
      </a>

      {/* Body side */}
      <div className="feat-body">
        <div className="feat-tags">
          {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
        </div>
        <p className="mono feat-kicker">{p.client}</p>
        <h3 className="feat-title">{p.title}</h3>
        <p className="feat-desc">{p.desc}</p>
        {p.metric && (
          <div className="feat-metric">
            <span className="metric-arrow">↑</span>
            {p.metric}
          </div>
        )}
        <a
          href={p.slug}
          className="feat-link"
          data-cursor="link"
          onClick={e => { e.preventDefault(); window.history.pushState({}, '', p.slug); window.dispatchEvent(new PopStateEvent('popstate')) }}
        >
          View case study <span className="feat-link-arrow">→</span>
        </a>
      </div>
    </article>
  )
}
