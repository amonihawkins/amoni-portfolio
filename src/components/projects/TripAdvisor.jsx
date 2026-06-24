import { useState, useEffect } from 'react'
import './CaseStudy.css'

/* ── Participant data ───────────────────────────────────────── */
const PARTICIPANTS = [
  { id: 'P1', age: '18–24', gender: 'Female', tripAdvisor: 'Only browsed', travel: 'Frequent', tripType: 'Solo & Family', booking: 'Assisted'},
  { id: 'P2', age: '25–34', gender: 'Male', tripAdvisor: 'Only browsed', travel: 'Moderate', tripType: 'Family & Friends', booking: 'Mixed' },
  { id: 'P3', age: '18–24', gender: 'Female', tripAdvisor: 'Used multiple times', travel: 'Moderate', tripType: 'Friends', booking: 'Independent'},
  { id: 'P4', age: '25–34', gender: 'Male', tripAdvisor: 'Never used', travel: 'Moderate', tripType: 'Family & Friends', booking: 'Independent' },
  { id: 'P5', age: '18–24', gender: 'Male', tripAdvisor: 'Used multiple times', travel: 'Infrequent', tripType: 'Couple', booking: 'Mixed'},
]

/* ── Key metrics ────────────────────────────────────────────── */
const METRICS = [
  { num: '5', unit: 'participants', desc: 'recruited from 18+ screener responses' },
  { num: '80%', unit: 'satisfaction', desc: 'of participants rated confidence & satisfaction above 85%' },
  { num: '5:53', unit: 'avg mins', desc: 'longest task — hotel selection, also ranked most confident' },
  { num: '3', unit: 'severity issues', desc: 'key usability issues identified across all sessions' },
]

/* ── Key findings ───────────────────────────────────────────── */
const FINDINGS = [
  {
    severity: '3',
    title: 'Lack of Location Support',
    desc: '60% of users had to leave TripAdvisor to estimate proximity using Google Maps, disrupting the planning flow.',
  },
  {
    severity: '2',
    title: 'Low Perceived Credibility',
    desc: 'Outdated photos reduced confidence in restaurant selection, with one participant rating their choice only 60% confident.',
  },
  {
    severity: '3',
    title: 'Unexpected Search Behavior',
    desc: 'Search bar redirected a participant to the main destination page instead of contextual activity results, causing a full restart.',
  },
]

/* ── Recommendations ────────────────────────────────────────── */
const RECOMMENDATIONS = [
  {
    issue: 'Lack of Location Support',
    severity: '3',
    rec: 'Integrate a proximity tool surfacing hotel-relative listings under a "Close to your Hotel" header — consistent with TripAdvisor\'s existing ranking-based sections.',
    feasibility: 'High',
  },
  {
    issue: 'Low Perceived Credibility',
    severity: '2',
    rec: 'Incorporate short user-generated video clips alongside static photos for restaurant listings, aligning with how users evaluate food experiences on social platforms today.',
    feasibility: 'High',
  },
  {
    issue: 'Unexpected Search Behavior',
    severity: '3',
    rec: 'Scope search results to the user\'s active tab so searching under "Things to Do" returns only excursions — reducing disorienting redirects at high-friction moments.',
    feasibility: 'Medium',
  },
]

/* ── User quotes ────────────────────────────────────────────── */
const QUOTES = [
  { quote: 'It [TripAdvisor] got me 80% of the way.', participant: 'Participant 3' },
  { quote: 'The photos were outdated and old. TikTok would be better for restaurant recommendations.', participant: 'Participant 1' },
  { quote: 'I really like the idea of getting suggestions based on where I\'m staying.', participant: 'Participant 4' },
  { quote: 'It was easy and stress-free. I didn\'t feel overwhelmed at any point.', participant: 'Participant 2' },
]

function RecommendationsCarousel() {
  const [cur, setCur] = useState(0)
  const rec = RECOMMENDATIONS[cur]

  return (
    <div className="cs-carousel">
      <div className="cs-carousel__slide" style={{flexDirection: 'column', display: 'block'}}>
        <div className="cs-carousel__body" style={{padding: '28px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px'}}>
            <span className="cs-carousel__tag" style={{fontSize: '13px', padding: '6px 14px'}}>{rec.issue}</span>
            <span 
              className={`cs-severity cs-severity--${String(rec.severity) === '2' ? 'mid' : 'high'}`}
              style={{fontSize: '13px', padding: '6px 14px'}}
            >
              Severity {rec.severity}
            </span>
            <span 
              className={`cs-feasibility cs-feasibility--${rec.feasibility.toLowerCase()}`}
              style={{fontSize: '13px', padding: '6px 14px', marginLeft: 'auto'}}
            >
              {rec.feasibility} Feasibility
            </span>
          </div>
          <p className="cs-carousel__desc">{rec.rec}</p>
        </div>
      </div>

      <div className="cs-carousel__footer">
        <div className="cs-carousel__dots">
          {RECOMMENDATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              className={`cs-carousel__dot ${i === cur ? 'cs-carousel__dot--active' : ''}`}
            />
          ))}
        </div>
        <span className="cs-carousel__counter">{cur + 1} / {RECOMMENDATIONS.length}</span>
        <div style={{display: 'flex', gap: '8px'}}>
          <button onClick={() => setCur(c => c - 1)} disabled={cur === 0} className="cs-carousel__btn">←</button>
          <button onClick={() => setCur(c => c + 1)} disabled={cur === RECOMMENDATIONS.length - 1} className="cs-carousel__btn">→</button>
        </div>
      </div>
    </div>
  )
}

export default function TripAdvisor() {
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

      {/* ── Sticky side nav ───────────────────────────────── */}
      <nav className="case-study__sidenav">
        {[
          'Overview',
          'Research',
          'Planning',
          'Conducting',
          'Analysis',
          'Recommendations',
          'Reflections',
        ].map(s => (
          <a 
          key={s} 
          href={`#${s.toLowerCase()}`} 
          className={`case-study__sidenav-link ${activeSection === s.toLowerCase() ? 'case-study__sidenav-link--active' : ''}`}
          >
            {s}
          </a>
        ))}
      </nav>

      <div className="case-study__body">

        {/* ── HERO ──────────────────────────────────────────── */}
        <section id="overview" className="cs-section">
          <div className="cs-hero">
            <p className="cs-hero__client">TripAdvisor</p>
            <h1 className="cs-hero__title">
              Evaluating Cognitive Load in a Travel Guidance Platform
            </h1>
            {/* TODO: replace with /assets/tripadvisor-hero.png */}
            <div className="cs-hero__image-wrap">
              <img
                src="/assets/tripadvisor-hero.png"
                alt="TripAdvisor usability study overview"
                className="cs-hero__image"
                onError={e => e.target.parentElement.classList.add('cs-hero__image-wrap--empty')}
              />
            </div>
          </div>

          {/* About + Problem + Outcome */}
          <div className="cs-intro">
            <div className="cs-intro__text">
              <h2 className="cs-block-title">About</h2>
              <p>
                TripAdvisor is the world's largest travel guidance platform, connecting travelers 
                to millions of user-generated reviews, booking tools, and recommendations across 
                hotels, airlines, experiences, and restaurants. Given the complexity of trip 
                planning, users expect the platform to organize and guide them seamlessly — 
                and this usability study examines exactly how well it delivers on that promise.
              </p>
              
              <div className="cs-problem-outcome">
                <div className="cs-callout cs-callout--problem">
                  <p className="cs-callout__label">Problem</p>
                  <p>Travelers encounter difficulties when planning trips due to site navigation challenges, difficulty 
                    keeping track of trip details and overall confusion, leading to frustration and abandoned bookings.</p>
                </div>
                <div className="cs-callout cs-callout--outcome">
                  <p className="cs-callout__label">Outcome</p>
                  <p>Culminated a findings report informed by 5 user sessions that identified key usability gaps in TripAdvisor 
                    and proposed UX-driven recommendations for improvements across the trip planning experience.</p>
                </div>
              </div>
            </div>

            {/* Meta sidebar */}
            <aside className="cs-meta">
              <div className="cs-meta__item">
                <p className="cs-meta__label">Team</p>
                <p>Amoni Hawkins (me)</p>
                <p>5 Participants</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">Timeline</p>
                <p>Mar 2025 - May 2025 (2 months)</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">Tools</p>
                <p>Loop11, Zoom, Google Forms</p>
              </div>
              <div className="cs-meta__item">
                <p className="cs-meta__label">My Role</p>
                <p>Solo Researcher</p>
                <p>Participant Recruiter</p>
                <p>Study Design</p>
                <p>Facilitation</p>
                <p>Analysis & Reporting</p>
              </div>
            </aside>
          </div>

          {/* Motivation quote */}
          <div className="cs-pullquote">
            <p className="cs-pullquote__text">
              "Giving me the opportunity to evaluate one of travel's most recognized platforms, I independently led 
              the full research process from concept to analysis, gaining hands-on experience conducting evaluative 
              research across a complex, content-rich site."
            </p>
            <p className="cs-pullquote__attribution">— My motivation for this project</p>
          </div>
          <p>
            Trip planning is time-consuming and cognitively demanding — and TripAdvisor, as a one-stop platform 
            for flights, hotels, excursions, and dining, is the ideal environment to examine how well users 
            manage that complexity. As the sole researcher, I owned the full process from study design through 
            final reporting, approaching the work through a business lens with retention, conversion, and 
            revenue in mind.
          </p>
        </section>

        {/* ── 01 RESEARCH ───────────────────────────────────── */}
        <section id="research" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">01</span>
            <span>Understanding the Problem through Research</span>
          </div>

          <h2 className="cs-section-title">Research & Business Objectives</h2>
          <p className="cs-section-lead">
            Exploring the intersection of usability and business impact, I sought to investigate how complexity & cognitive 
            load shape the user experience and what those friction points mean for variables like  user retention and revenue.
          </p>

          {/* Research goals */}
          <div className="cs-findings">
            {[
              {
                title: 'Task Complexity',
                desc: 'How difficult is it for users to complete sequential booking tasks within a single session?',
              },
              {
                title: 'Information Processing Efficiency',
                desc: 'Can users navigate and process TripAdvisor\'s content-rich interface without becoming overwhelmed?',
              },
              {
                title: 'Decision Clarity',
                desc: 'Do users feel confident in their final choices, or does the volume of information create hesitation?',
              },
              {
                title: 'User Satisfaction & Confidence',
                desc: 'How do users feel about TripAdvisor after completing a full end-to-end planning experience?',
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

          {/* Success metrics */}
          <h2 className="cs-section-title" style={{marginTop: '32px'}}>Success Metrics</h2>
          <p className="cs-section-lead">
            I chose to track both quantitative and qualitative metrics to fully assess the users’ ability to navigate, 
            process information, and make decisions.
          </p>
          <p>
            Given how complex TripAdvisor is, this combination of metrics paints a greater picture of the entire user experience. 
            Observational notes and direct user feedback allowed me to track decision-making patterns, information processing 
            behaviors, and emotional responses, providing that qualitative context. To align with my research objectives, 
            the quantitative data I collected were the following:
          </p>

          <div className="cs-insights">
            {[
              {
                label: 'Task Completion Time',
                desc: 'Measuring the time a user spent overall and with each specific task to assess their ability to process information and make confident decisions.',
              },
              {
                label: 'Cognitive Load Score',
                desc: 'Measuring the average frequency of backtracking and asking users to recall information to assess their ability to navigate the website efficiently.',
              },
              {
                label: 'Confidence Rate',
                desc: 'Measuring confidence by asking users to rate their overall experience and confidence in their choices.',
              },
              {
                label: 'Satisfaction Rate',
                desc: 'Measuring satisfaction by asking users to rate their overall experience and satisfaction in their choices.',
              },
            ].map(m => (
              <div key={m.label} className="cs-insight-card" id="trip-metric">
                <p className="cs-insight-card__label" id="trip-metric-label">{m.label}</p>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="cs-hmw">
            <p className="cs-hmw__label">Research Question</p>
            <p className="cs-hmw__text">
              How might I determine whether users can manage the complexity of 
              planning a full trip without experiencing information overload?
            </p>
          </div>
        </section>

        {/* ── 02 PLANNING ───────────────────────────────────── */}
        <section id="planning" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">02</span>
            <span>Planning and Preparing the Study</span>
          </div>

          <h2 className="cs-section-title">Methodology</h2>
          <p className="cs-section-lead">
            I administered a remote, moderated task-based test built around a realistic trip planning 
            scenario with each session concluding in a post-test survey, balancing authenticity and control.
          </p>
          <p>
            Each participant planned a 3-day leisure trip to Montego Bay, Jamaica, completing four 
            sequential tasks covering flights, hotels, activities, and dining then answered follow-up 
            questions to assess decision-making. After all tasks, participants were asked recall questions 
            that assessed their cognitive load and retention. Finally, a post-test survey measured their 
            satisfaction, decision confidence, and cognitive load.
          </p>

          {/* Participant Recruitment */}
          <h2 className="cs-section-title" style={{marginTop: '32px'}}>Participant Recruitment & Screener</h2>
          <p className="cs-section-lead">
            To reflect TripAdvisor's target audience, I recruited 5 participants from
            my personal network using a screener that assessed travel habits, platform
            preferences, and familiarity with TripAdvisor.
          </p>
          <p>
            I disseminated the screener across multiple forums and chats, receiving more
            than 18 responses. I prioritized ages 18–34 with varying degrees of TripAdvisor
            experience (first-time and occasional users), aiming for meaningful diversity
            in travel and technical habits despite recruiting from my personal network.
          </p>

          {/* Participant profile cards */}
          <div className="cs-participants-grid">
            {PARTICIPANTS.map(p => (
              <div key={p.id} className="cs-participant-card-v2">
                <div className="cs-participant-card-v2__avatar">{p.id}</div>
                <p className="cs-participant-card-v2__age">{p.age} · {p.gender}</p>
                <div className="cs-participant-card-v2__tags">
                  <div className="cs-participant-card-v2__tag-row">
                    <span className="cs-participant-tag-v2__label">TA Familiarity</span>
                    <span className="cs-participant-tag-v2">{p.tripAdvisor}</span>
                  </div>
                  <div className="cs-participant-card-v2__tag-row">
                    <span className="cs-participant-tag-v2__label">Travel Frequency</span>
                    <span className="cs-participant-tag-v2">{p.travel}</span>
                  </div>
                  <div className="cs-participant-card-v2__tag-row">
                    <span className="cs-participant-tag-v2__label">Trip Type</span>
                    <span className="cs-participant-tag-v2">{p.tripType}</span>
                  </div>
                  <div className="cs-participant-card-v2__tag-row">
                    <span className="cs-participant-tag-v2__label">Booking</span>
                    <span className="cs-participant-tag-v2">{p.booking}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pilot Study */}
          <h2 className="cs-section-title" style={{marginTop: '32px'}}>Pilot Study</h2>
          <p className="cs-section-lead">
            Before conducting live sessions, I ran a pilot study to stress-test both
            the script and the tooling — including working with Loop11 for the first time.
          </p>
          <p>
            I used this session to identify any technical issues my participants might
            encounter, from screen share setup to task navigation within Loop11. Two
            content adjustments also emerged that meaningfully improved session quality.
          </p>

          {/* Pilot insight cards */}
          <div className="cs-insights" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {[
              {
                label: 'Technical Check',
                desc: 'Identified potential Loop11 setup issues and screen share friction before participants encountered them.',
              },
              {
                label: 'Task Reordering',
                desc: 'Moved flights before hotel booking to reflect how travelers actually plan — destination and dates first.',
              },
              {
                label: 'Question Refinement',
                desc: '"Two words" was changed to "two adjectives" for more descriptive, targeted participant responses.',
              },
            ].map(i => (
              <div key={i.label} className="cs-insight-card" id="trip-pilot">
                <p className="cs-insight-card__label" id="trip-pilot-label">{i.label}</p>
                <p>{i.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 CONDUCTING ─────────────────────────────────── */}
        <section id="conducting" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">03</span>
            <span>Conducting the Study</span>
          </div>

          <h2 className="cs-section-title">Study Execution</h2>
          <p className="cs-section-lead">
            Each session followed the same remote, moderated format — participants
            completed four sequential booking tasks thinking aloud as they navigated
            TripAdvisor on their own devices.
          </p>
          <p>
            After the tasks, recall questions assessed information retention, followed
            by a post-test survey covering satisfaction, confidence, and cognitive load.
            Running sessions in participants' natural environments via remote testing
            allowed me to observe genuine, uninfluenced behavior.
          </p>

          {/* Task flow steps */}
          <div className="cs-sprint-steps">
            {[
              { step: 'Task 1', desc: 'Book a convenient round-trip flight to Montego Bay, Jamaica from August 1–3, 2025.' },
              { step: 'Task 2', desc: 'Book a modern hotel with at least 4 stars. Keep in mind where you fly in.' },
              { step: 'Task 3', desc: 'Book a day activity on Day 2 of the trip. Leave time to relax in the evening and keep in mind details like transportation.' },
              { step: 'Task 4', desc: 'Book a nearby restaurant after the Day 2 activity.' },
            ].map(t => (
              <div key={t.step} className="cs-sprint-step">
                <span className="cs-sprint-step__label">{t.step}</span>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <p>
            Across sessions, a few notable behaviors emerged. Most participants naturally
            paused and cross-referenced other tabs or apps during the activity and restaurant
            tasks, with one participant opening Google Maps mid-session without prompting.
            One unexpected moment came when a participant's search bar interaction redirected 
            them entirely out of their task flow, triggering visible frustration that stood 
            out against the otherwise calm sessions.
          </p>
        </section>

        {/* ── 04 ANALYSIS ───────────────────────────────────── */}
        <section id="analysis" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">04</span>
            <span>Making Sense of the Data</span>
          </div>

          <h2 className="cs-section-title">Data Analysis</h2>
          <p className="cs-section-lead">
            I collected both qualitative and quantitative data, then triangulated them
            to distinguish isolated incidents from meaningful patterns.
          </p>
          <p>
            Quantitative scores without qualitative context would have misread high
            completion times as confusion. Together they revealed the opposite: the
            two tasks with the highest average completion times, hotel at 5:53 minutes
            and activity at 5:43 minutes, were also the most confidently rated,
            suggesting deliberate browsing rather than struggle.
          </p>

          <div className="cs-metrics-grid">
          {[
            { num: '4:32', unit: 'avg mins', desc: 'average task completion time across all 4 tasks' },
            { num: 'Low',  unit: 'cognitive load', desc: 'average score across backtracking rate and retention' },
            { num: '85%+', unit: 'satisfaction', desc: 'of participants rated overall satisfaction above this threshold' },
            { num: '85%+', unit: 'confidence', desc: 'of participants rated final choice confidence above this threshold' },
          ].map(m => (
            <div key={m.unit} className="cs-metric-card">
              <p className="cs-metric-card__num">{m.num}</p>
              <p className="cs-metric-card__unit">{m.unit}</p>
              <p className="cs-metric-card__desc">{m.desc}</p>
            </div>
          ))}
        </div>


          {/* Key Findings */}
          <h2 className="cs-section-title" style={{marginTop: '40px'}}>Key Findings</h2>
          <p className="cs-section-lead">
            TripAdvisor is intuitive and manageable but three specific usability issues 
            surfaced that create friction at critical moments in the planning journey.
          </p>
          <p>
            80% of participants rated satisfaction and confidence above 85%, describing
            TripAdvisor as easy, organized, and stress-free.
          </p>

          {/* User quotes */}
          <div className="cs-quotes">
            {QUOTES.map((q, i) => (
              <div key={i} className="cs-quote">
                <span className="cs-quote__mark">"</span>
                <div>
                  <p>{q.quote}</p>
                  <p style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500}}>— {q.participant}</p>
                </div>
              </div>
            ))}
          </div>
          
          <img
            src="/assets/tripadvisor-wordmap.png"
            alt="Loop11 generated word map of participant responses"
            className="cs-image"
            onError={e => e.target.style.display='none'}
          />
          <p className="cs-image-caption">Fig. 1 — Loop11 generated word map from participant text responses</p>

          {/* Severity finding cards */}
          <div className="cs-findings">
            {FINDINGS.map(f => (
              <div key={f.title} className="cs-finding-card">
                <div className="cs-finding-card__dot" />
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                    <p className="cs-finding-card__title" style={{fontSize: '16px'}}>{f.title}</p>
                    <span 
                    className={`cs-severity cs-severity--${f.severity === '2' ? 'mid' : 'high'}`}
                    style={{fontSize: '13px', padding: '6px 14px'}}
                    >
                      Severity {f.severity}
                    </span>
                  </div>
                  <p className="cs-finding-card__desc" style={{fontSize: '14px'}}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ── 05 RECOMMENDATIONS ────────────────────────────── */}
        <section id="recommendations" className="cs-section">
          <div className="cs-phase-label">
            <span className="cs-phase-number">05</span>
            <span>Delivering the Final Recommendations</span>
          </div>

          <h2 className="cs-section-title">Recommendations</h2>
          <p className="cs-section-lead">
            Each identified issue was paired with an actionable, feasibility-weighted recommendation 
            designed to increase user trust, retention, and conversion.
          </p>

          <RecommendationsCarousel />

          {/* Research Report */}
          <h2 className="cs-section-title" style={{marginTop: '32px'}}>Research Report</h2>
          <p className="cs-section-lead">
            A full documentation of the study's methodology, findings, and recommendations
            was compiled into a formal research report.
          </p>
          <p>
            The report details the complete study process from screener design through
            final analysis, including participant data, metric breakdowns, and prioritized
            recommendations for the TripAdvisor product team.
          </p>
          <a
            href="/assets/tripadvisor-report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cs-report-link"
          >
            View full research report ↗
          </a>
        </section>

        {/* ── REFLECTIONS ───────────────────────────────────── */}
        <section id="reflections" className="cs-section">
          <h2 className="cs-section-title">What I Learned from this Project</h2>

          <div className="cs-pullquote">
            <p className="cs-pullquote__text">
              Managing complexity is not just a user challenge — it is a design responsibility.
            </p>
          </div>

          <div className="cs-takeaways">
            {[
              {
                num: '1',
                title: 'Mixed methods tell a richer story.',
                desc: 'Quantitative scores without qualitative context would have misread high completion times as confusion. Together they revealed the opposite.',
              },
              {
                num: '2',
                title: 'Pilot studies are non-negotiable.',
                desc: 'Two small changes from the pilot — task ordering and question wording — had an outsized impact on session quality.',
              },
              {
                num: '3',
                title: 'Recruit beyond your network when possible.',
                desc: 'Personal network recruitment limits generalizability. Future studies would prioritize broader age and demographic diversity.',
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

          <p style={{marginTop: '32px', color: 'var(--text-altprimary)', lineHeight: 1.8}}>
            This study reinforced how much more actionable research becomes when findings
            are framed in business terms. Connecting usability gaps to retention, conversion,
            and revenue gave the recommendations a life beyond the classroom.
          </p>
        </section>

        {/* ── VIEW MORE ─────────────────────────────────────── */}
        <section className="cs-section cs-more">
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
              <p className="cs-more__card-sub" style= {{
                fontSize: 'clamp(12px, 2.4vw, 20px)',
                fontWeight: '500',
                letterSpacing: '-0.015em',
                lineHeight: '1.25',
                color: 'var(--text-primary)'
              }}>Boosting Product Discoverability Through UX Redesign</p>
              <p className="feat-link" data-cursor="link" style={{color: 'var(--brand)', margin: '8px 10px'}}>View case study <span className="feat-link-arrow">→</span></p>
            </a>
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
              <p className="cs-more__card-sub" style= {{
                fontSize: 'clamp(12px, 2.4vw, 20px)',
                fontWeight: '500',
                letterSpacing: '-0.015em',
                lineHeight: '1.25',
                color: 'var(--text-primary)'
              }}>Adapting an Existing Design for Users with Low Vision</p>
              <p className="feat-link" data-cursor="link" style={{color: 'var(--brand)', margin: '8px 10px'}}>View case study <span className="feat-link-arrow">→</span></p>
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}
