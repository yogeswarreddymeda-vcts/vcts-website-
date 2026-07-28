import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Bookmark,
  Box,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  ClipboardPenLine,
  FileText,
  FlaskConical,
  GraduationCap,
  Info,
  Landmark,
  Lightbulb,
  Medal,
  Megaphone,
  Monitor,
  Mountain,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  UsersRound,
} from 'lucide-react'

// Assets
import imgIdea from '../assets/image/Hackathon/hero-idea.webp'
import imgPrototype from '../assets/image/Hackathon/hero-prototype.webp'
import imgProduct from '../assets/image/Hackathon/hero-product.webp'
import imgMentors from '../assets/image/Hackathon/mentors-makerspace.webp'
import imgTeam from '../assets/image/Hackathon/engineering-team.webp'
import imgEdgeAI from '../assets/image/Hackathon/domain-edge-ai.webp'
import imgSmartRetail from '../assets/image/Hackathon/domain-smart-retail.webp'
import imgSurveillance from '../assets/image/Hackathon/domain-surveillance.webp'
import imgSmartParking from '../assets/image/Hackathon/domain-smart-parking.webp'
import imgSemiconductor from '../assets/image/Hackathon/domain-semiconductor.webp'
import imgAutomation from '../assets/image/Hackathon/domain-automation.webp'
import imgProductEng from '../assets/image/Hackathon/domain-product-engineering.webp'
import mountainImage from '../assets/image/Hackathon/journey-mountain.webp'
import whyPrototypeImage from '../assets/image/Hackathon/Why_join_car.webp'
import whyNetworkingImage from '../assets/image/Hackathon/why_join_communication.webp'
import whyGroupImage from '../assets/image/Hackathon/why_join_group.webp'
import whyPrizeImage from '../assets/image/Hackathon/why_join_money.webp'
import whySketchImage from '../assets/image/Hackathon/why_join_sketch.webp'
import imgGoldTrophyPodium from '../assets/image/Hackathon/gold_trophy_podium.webp'
import imgSilverTrophyPodium from '../assets/image/Hackathon/silver_trophy_podium.webp'
import imgBronzeTrophyPodium from '../assets/image/Hackathon/bronze_trophy_podium.webp'
import qrCodeImg from '../assets/image/qr_code.png'
import '../assets/css/Hackathon.css'

// ==========================================
// SHARED UTILITIES & HOOKS
// ==========================================
function useScrollReveal(threshold = 0.12, selector = '.reveal', activeClass = 'in') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (!('IntersectionObserver' in window)) {
      el.querySelectorAll(selector).forEach((item) => item.classList.add(activeClass))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(activeClass)
          } else {
            entry.target.classList.remove(activeClass)
          }
        })
      },
      { threshold }
    )

    const items = el.querySelectorAll(selector)
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [threshold, selector, activeClass])

  return ref
}

// ==========================================
// 1. HERO SECTION
// ==========================================
function HeroMain() {
  return (
    <div>
      <div className="badge-pill">
        <span className="dot" />
        Applications Now Open
      </div>
      <h1 className="hero-title">
        <span className="nobr">VConnecTech Systems</span> Innovation <span className="title-hl">Bootcamp 2026</span>
      </h1>
      <p className="hero-tagline">
        Don’t just learn technology.<br />
        Build the future.
      </p>
      <p className="lede">
        A 16-week innovation journey where ideas become real products through mentorship, engineering, and collaboration.
      </p>
      <div className="hero-ctas">
        <a href="#register" className="btn btn-solid">Register Now <ArrowRight className="btn-arrow-icon" aria-hidden="true" strokeWidth={2} /></a>
        <a href="#about" className="btn btn-outline">Explore Bootcamp</a>
      </div>
    </div>
  )
}

// ==========================================
// 2. HERO JOURNEY STAGES
// ==========================================
function HeroJourneyStages() {
  return (
    <div className="build-stack" aria-hidden="true">
      <div className="bs-card bs-idea">
        <div className="bs-tag">IDEA · WEEK 1</div>
        <img src={imgIdea} alt="Idea week 1" loading="eager" fetchPriority="high" decoding="async" />
      </div>
      <div className="bs-card bs-build">
        <div className="bs-tag">PROTOTYPE · WEEK 6</div>
        <img src={imgPrototype} alt="Prototype week 6" loading="eager" fetchPriority="high" decoding="async" />
      </div>
      <div className="bs-card bs-ship">
        <div className="bs-tag">PRODUCT · WEEK 16</div>
        <img src={imgProduct} alt="Product week 16" loading="eager" fetchPriority="high" decoding="async" />
      </div>
    </div>
  )
}

// ==========================================
// 3. HERO STATS
// ==========================================
function HeroStats() {
  return (
    <div className="trace-wrap reveal">
      <div className="stats-strip">
        <div className="stat">
          <div className="num">16 Weeks</div>
          <div className="lbl">PROGRAM LENGTH</div>
        </div>
        <div className="stat">
          <div className="num">₹3.25L</div>
          <div className="lbl">PRIZE POOL</div>
        </div>
        <div className="stat">
          <div className="num">Industry</div>
          <div className="lbl">EXPERT MENTORS</div>
        </div>
        <div className="stat">
          <div className="num">Direct</div>
          <div className="lbl">HIRING PIPELINE</div>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  const sectionRef = useScrollReveal(0.08)

  return (
    <section className="hero" ref={sectionRef}>
      <div className="wrap hero-inner">
        <div className="hero-top">
          <HeroMain />
          <HeroJourneyStages />
        </div>
        <HeroStats />
      </div>
    </section>
  )
}

// ==========================================
// 4. ABOUT THE BOOTCAMP
// ==========================================
function AboutSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="about" ref={ref}>
      <div className="wrap">
        <div className="about-grid">
          <div className="about-copy reveal">
            <h2 className="about-title">
              About the <br />
              <span className="title-hl">Bootcamp</span>
            </h2>

            <p className="about-tagline">Where ideas become products.</p>

            <p className="about-lede">
              The VConnecTech Innovation Bootcamp is a 16-week innovation and product development program where participants solve real-world engineering challenges, build working prototypes, receive industry mentorship, and transform ideas into impactful solutions.
            </p>

            <div className="about-cards-grid">
              <div className="about-feature-card">
                <div className="card-icon-box">
                  <Target className="card-icon" aria-hidden="true" />
                </div>
                <span className="card-text">Solve real-world engineering problems</span>
                <span className="card-accent-bar" aria-hidden="true" />
              </div>

              <div className="about-feature-card">
                <div className="card-icon-box">
                  <Box className="card-icon" aria-hidden="true" />
                </div>
                <span className="card-text">Build working prototypes, not just slides</span>
                <span className="card-accent-bar" aria-hidden="true" />
              </div>

              <div className="about-feature-card">
                <div className="card-icon-box">
                  <UsersRound className="card-icon" aria-hidden="true" />
                </div>
                <span className="card-text">Learn directly from industry experts</span>
                <span className="card-accent-bar" aria-hidden="true" />
              </div>

              <div className="about-feature-card">
                <div className="card-icon-box">
                  <TrendingUp className="card-icon" aria-hidden="true" />
                </div>
                <span className="card-text">Launch your engineering career</span>
                <span className="card-accent-bar" aria-hidden="true" />
              </div>
            </div>
          </div>

          <figure className="about-visual reveal">
            <div className="about-visual-bar" aria-hidden="true">
              <div className="bar-left">
                <FlaskConical className="bar-icon" />
                <span>VCT INNOVATION LAB</span>
              </div>
              <span className="bar-right">• WEEK 06</span>
            </div>

            <div className="about-photo-wrapper">
              <img
                className="section-photo"
                src={imgMentors}
                alt="A mentor guides engineering students building robotics prototypes in a makerspace"
                loading="lazy"
                decoding="async"
              />
            </div>

            <figcaption>
              <div className="caption-left">
                <UsersRound className="caption-icon" />
                <span>Collaborate. Prototype. Build the future.</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 5. WHO CAN JOIN
// ==========================================
const whoCards = [
  {
    icon: <GraduationCap className="icon" aria-hidden="true" strokeWidth={1.6} />,
    title: 'Engineering Students',
    items: ['Final Year'],
  },
  {
    icon: <UserRound className="icon" aria-hidden="true" strokeWidth={1.6} />,
    title: 'Recent Graduates',
    items: ['2025 Graduates', '2026 Graduates'],
  },
  {
    icon: <BriefcaseBusiness className="icon" aria-hidden="true" strokeWidth={1.6} />,
    title: 'Working Professionals',
    items: ['0–5 Years Experience'],
  },
  {
    icon: <Sparkles className="icon" aria-hidden="true" strokeWidth={1.6} />,
    title: 'Tech Enthusiasts',
    items: ['Innovators', 'Startup Founders / Makers', 'Researchers'],
  },
]

function WhoSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="who" ref={ref}>
      <div className="wrap">

        <h2 className="section-title reveal">Who Can <span className="title-hl">Join</span></h2>
        <p className="section-tagline section-tagline--center reveal">Innovators. Builders. Future engineers.</p>
        <p className="lede reveal">Whether you're a student with a bold idea or a professional looking to build the next breakthrough, the bootcamp welcomes passionate problem solvers ready to innovate.</p>
        <div className="who-grid">
          {whoCards.map((card) => (
            <div className="brk who-card reveal" key={card.title}>
              {card.icon}
              <h3>{card.title}</h3>
              <ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 6. MODES OF PARTICIPATION
// ==========================================
function ModesSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="modes" ref={ref}>
      <div className="wrap">

        <h2 className="section-title modes-title reveal">Modes of <span className="title-hl">Participation</span></h2>
        <p className="section-tagline section-tagline--center reveal">Learn your way.</p>

        <div className="modes-flow reveal">
          <article className="mode-summary mode-summary--featured">
            <div className="mode-ribbon" title="Featured Track" aria-hidden="true">
              <Bookmark size={14} fill="#ffffff" stroke="#ffffff" />
            </div>
            <div className="mode-summary-visual">
              <div className="mode-icon-outer-ring">
                <div className="mode-icon-inner-ring">
                  <Landmark strokeWidth={1.8} />
                </div>
              </div>
            </div>
            <div className="mode-summary-content">
              <h3>Offline Bootcamp</h3>
              <span className="mode-title-underline" aria-hidden="true" />
              <p className="mode-summary-description">Immerse yourself in hands-on learning, collaborative sessions, and real-world challenges at our in-person bootcamp.</p>
              <div className="tag-list">
                <span className="tag">Students</span>
                <span className="tag">Graduates</span>
                <span className="tag">Working Professionals</span>
              </div>
            </div>
          </article>

          <article className="mode-summary">
            <div className="mode-summary-visual">
              <div className="mode-icon-outer-ring">
                <div className="mode-icon-inner-ring">
                  <Monitor strokeWidth={1.8} />
                </div>
              </div>
            </div>
            <div className="mode-summary-content">
              <h3>Virtual Bootcamp</h3>
              <span className="mode-title-underline" aria-hidden="true" />
              <p className="mode-summary-description">Learn from anywhere with expert-led sessions, interactive discussions, and practical projects in a live virtual environment.</p>
              <div className="tag-list">
                <span className="tag">Working Professionals Only</span>
              </div>
            </div>
          </article>
        </div>

        <div className="note-box modes-note reveal">
          <span className="note-icon" aria-hidden="true"><Info strokeWidth={2} /></span>
          <p><strong>Please note</strong> — the Grand Finale, Prototype Demonstration, Jury Evaluation, and Awards Ceremony are conducted only in offline mode. All participants, including those in the virtual track, must attend the Final Evaluation in person.</p>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 7. INNOVATION DOMAINS
// ==========================================
const domains = [
  { id: 'edge-ai', title: 'Edge AI', img: imgEdgeAI, alt: 'Edge AI vision sensor inspecting a component', featured: true },
  { id: 'smart-retail', title: 'Smart Retail', img: imgSmartRetail, alt: 'Sensor-equipped smart retail shelf' },
  { id: 'smart-surveillance', title: 'Smart Surveillance', img: imgSurveillance, alt: 'Smart surveillance camera at a modern campus' },
  { id: 'smart-parking', title: 'Smart Parking', img: imgSmartParking, alt: 'Smart parking bays with occupancy sensors' },
  { id: 'semiconductor', title: 'Semiconductor Engineering', img: imgSemiconductor, alt: 'Engineer inspecting a semiconductor wafer' },
  { id: 'automation', title: 'Industrial Automation', img: imgAutomation, alt: 'Industrial robotic arm handling precision components' },
  { id: 'product-eng', title: 'Product Engineering', img: imgProductEng, alt: 'Product engineers reviewing a hardware prototype' },
]

function DomainsSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="domains" ref={ref}>
      <div className="wrap">

        <h2 className="section-title reveal">Innovation <span className="title-hl">Domains</span></h2>
        <p className="section-tagline reveal">Choose your innovation domain.</p>
        <p className="lede reveal">Identify a real-world challenge from your preferred engineering domain and develop an innovative solution with expert mentorship.</p>
        <div className="domain-grid" style={{ marginTop: '40px' }}>
          {domains.map((d) => (
            <div className={`brk domain-card reveal${d.featured ? ' featured' : ''}`} key={d.id}>
              {d.label && <span className="idx">{d.label}</span>}
              <img className="domain-image" src={d.img} alt={d.alt} loading="lazy" decoding="async" />
              <h3>{d.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 8. YOUR JOURNEY
// ==========================================
const steps = [
  { num: '01', label: 'Registration', desc: 'Sign up individually or as a team to enter.', icon: 'registration', left: '6%', top: '84%', iconTop: '71%' },
  { num: '02', label: 'Abstract Submission', desc: 'Submit problem statement & solution summary.', icon: 'abstract', left: '20%', top: '74%', iconTop: '61%' },
  { num: '03', label: 'Detailed Project Report', desc: 'Provide architecture, tech stack & methodology.', icon: 'report', left: '32%', top: '66%', iconTop: '53%' },
  { num: '04', label: 'Presentation Round', desc: 'Pitch to panel of expert mentors.', icon: 'presentation', left: '45%', top: '56%', iconTop: '43%' },
  { num: '05', label: 'Innovation Bootcamp', desc: 'Hands-on training with industry guidance.', icon: 'bootcamp', left: '56%', top: '48%', iconTop: '35%' },
  { num: '06', label: 'Prototype Development', desc: 'Build a functional working MVP.', icon: 'prototype', left: '67%', top: '40%', iconTop: '27%' },
  { num: '07', label: 'Demo Day', desc: 'Showcase prototype live to judges.', icon: 'demo', left: '78%', top: '31%', iconTop: '18%' },
  { num: '08', label: 'Win & Get Hired', desc: 'Win cash prizes & land job offers.', icon: 'hired', left: '88%', top: '20%', final: true },
]

const summary = [
  { value: '8', label: 'Checkpoints', icon: 'summit' },
  { value: '1', label: 'Purpose', icon: 'target' },
  { value: '\u221e', label: 'Opportunities', icon: 'opportunities' },
  { value: 'You', label: 'At the summit', icon: 'trophy' },
]

function CheckpointIcon({ type }) {
  const common = { 'aria-hidden': true, strokeWidth: 1.7 }
  const icons = {
    registration: UserRound,
    abstract: FileText,
    report: ClipboardPenLine,
    presentation: UsersRound,
    bootcamp: Box,
    prototype: Lightbulb,
    demo: Megaphone,
    hired: Trophy,
  }
  const Icon = icons[type]
  return Icon ? <Icon {...common} /> : null
}

function SummaryIcon({ type }) {
  const common = { 'aria-hidden': true, strokeWidth: 1.7 }
  const icons = {
    summit: Mountain,
    target: Target,
    opportunities: UsersRound,
    trophy: Trophy,
  }
  const Icon = icons[type] || Trophy
  return <Icon {...common} />
}

function JourneySection() {
  const ref = useScrollReveal(0.12)
  const [activeStepIndex, setActiveStepIndex] = useState(7)
  const [userInteracted, setUserInteracted] = useState(false)

  useEffect(() => {
    if (userInteracted) return
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % steps.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [userInteracted])

  const handleStepHover = (index) => {
    setUserInteracted(true)
    setActiveStepIndex(index)
  }

  return (
    <section id="journey" ref={ref}>
      <div className="wrap">
        <h2 className="section-title reveal">Your <span className="title-hl">Journey</span></h2>
        <p className="section-tagline reveal">Eight checkpoints. One innovation journey.</p>
        <p className="lede reveal">From initial registration to final demo day, follow a structured 8-step roadmap to build, refine, and present your engineering project.</p>

        <div className="journey-layout" style={{ marginTop: '40px' }}>
          <div className="journey-copy">
            <div className="journey reveal" onMouseLeave={() => setUserInteracted(false)}>
              <div className="journey-line" />
              {steps.map((step, idx) => {
                const isActive = idx === activeStepIndex
                return (
                  <div
                    className={`j-step${step.final ? ' final' : ''}${isActive ? ' active' : ''}`}
                    key={step.num}
                    onMouseEnter={() => handleStepHover(idx)}
                  >
                    <div className="j-num">{step.num}</div>
                    <div className="j-body">
                      <h3>{step.label}</h3>
                      {step.desc && <p className="j-desc">{step.desc}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="journey-visual reveal">
            <div className="journey-map">
              <img src={mountainImage} alt="A mountain ascent representing the innovation journey" />

              <svg className="journey-route" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
                <path d="M60 521 C125 521 135 459 200 459 S265 409 320 409 S395 347 450 347 S505 298 560 298 S615 248 670 248 S725 192 780 192 S825 125 880 125" />
              </svg>

              {steps.filter((step) => step.icon && !step.final).map((step, index) => {
                const stepIdx = steps.findIndex((s) => s.num === step.num)
                const isActive = stepIdx === activeStepIndex
                return (
                  <span
                    className={`journey-checkpoint-icon${isActive ? ' active' : ''}`}
                    key={`${step.num}-icon`}
                    style={{ left: step.left, top: step.iconTop, '--marker-delay': `${0.4 + index * 0.1}s` }}
                    onMouseEnter={() => handleStepHover(stepIdx)}
                    aria-hidden="true"
                  >
                    <CheckpointIcon type={step.icon} />
                  </span>
                )
              })}

              {steps.map((step, index) => {
                const isActive = index === activeStepIndex
                return (
                  <span
                    className={`journey-map-marker${step.final ? ' final' : ''}${isActive ? ' active' : ''}`}
                    key={step.num}
                    style={{ left: step.left, top: step.top, '--marker-delay': `${0.35 + index * 0.1}s` }}
                    onMouseEnter={() => handleStepHover(index)}
                    aria-hidden="true"
                  >
                    {step.num}
                    {isActive && <span className="journey-marker-ring" />}
                  </span>
                )
              })}

              <div className="journey-flag" aria-hidden="true">
                <span className="journey-flag-pole" />
                <span className="journey-flag-cloth" />
              </div>
            </div>

            <div className="journey-summary" aria-label="Journey summary">
              {summary.map((item) => (
                <div className="journey-summary-item" key={item.label}>
                  <span className="journey-summary-icon" aria-hidden="true">
                    <SummaryIcon type={item.icon} />
                  </span>
                  <span className="journey-summary-copy">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 9. PROGRAM TIMELINE
// ==========================================
const roadmapWeeks = Array.from({ length: 16 }, (_, index) => index + 1)

const roadmapRows = [
  { title: 'Registration & Abstract', duration: '3 weeks', start: 1, span: 3, range: '1–3' },
  { title: 'Detailed Project Report', duration: '2 weeks', start: 4, span: 2, range: '4–5' },
  { title: 'Presentation Round', duration: '2 weeks', start: 6, span: 2, range: '6–7' },
  { title: 'Innovation Bootcamp', duration: '10 weeks', start: 8, span: 8, range: '8–15' },
  { title: 'Grand Finale', duration: '1 week', start: 16, span: 1, range: '16', isFinale: true },
]

function RoadmapSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="timeline" ref={ref}>
      <div className="roadmap-shell">
        <div className="roadmap-header reveal">
          <h2 className="roadmap-heading">Program <span className="title-hl">Timeline</span></h2>
          <p className="roadmap-tagline">Your 16-week innovation roadmap.</p>
          <p className="roadmap-subtitle">See the big picture, plan your weeks.</p>
        </div>
        <div className="roadmap-scroll reveal" tabIndex="0" aria-label="Scrollable 16-week program timeline">
          <div className="roadmap-chart">
            <div className="roadmap-week-header" aria-hidden="true">
              <span />
              <div className="roadmap-week-numbers">
                {roadmapWeeks.map((week) => <span key={week}>{week}</span>)}
              </div>
            </div>
            <div className="roadmap-rows">
              {roadmapRows.map((item, idx) => (
                <div className="roadmap-row" key={item.title}>
                  <div className="roadmap-row-label">
                    <strong>{item.title}</strong>
                    <span>{item.duration}</span>
                  </div>
                  <div className="roadmap-grid" aria-label={`${item.title}: weeks ${item.range}`}>
                    {roadmapWeeks.map((week) => <span className="roadmap-grid-cell" key={week} aria-hidden="true" />)}
                    <span
                      className={`roadmap-bar${item.isFinale ? ' roadmap-bar--finale' : ''}`}
                      style={{ '--roadmap-start': item.start, '--roadmap-span': item.span, '--bar-delay': `${idx * 0.12}s` }}
                    >
                      {item.range}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 10. PROGRAM PRIZES
// ==========================================
function ProgramPrizes() {
  return (
    <>
      <div className="prizes-pill-badge prizes-reveal">
        <Trophy size={14} className="badge-icon" />
        <span>REWARDS & RECOGNITION</span>
      </div>

      <h2 className="prizes-title prizes-reveal">
        Program <span className="title-hl">Prizes</span>
      </h2>
      <p className="prizes-tagline prizes-reveal">
        Win recognition. Build your career.
      </p>

      <div className="prize-stage">

        <article className="prize-award-card runner-card prizes-reveal">
          <div className="top-badge-circle silver-badge">
            <Medal size={22} />
          </div>
          <div className="rank-label-wrap">
            <span className="rank-line" />
            <p className="prize-rank">RUNNER-UP</p>
            <span className="rank-line" />
          </div>
          <p className="prize-amount">₹75,000</p>
          <div className="podium-graphic-wrap">
            <img src={imgSilverTrophyPodium} alt="Runner-Up 2nd Place Silver Trophy" className="real-podium-img" />
          </div>
        </article>

        <article className="prize-award-card is-winner gold-card prizes-reveal">
          <div className="top-badge-circle gold-badge">
            <Trophy size={24} />
          </div>
          <div className="rank-label-wrap winner-rank-wrap">
            <span className="rank-line gold-line" />
            <p className="prize-rank gold-rank">WINNER</p>
            <span className="rank-line gold-line" />
          </div>
          <p className="prize-amount winner-amount">₹1,50,000</p>
          <div className="podium-graphic-wrap">
            <img src={imgGoldTrophyPodium} alt="Winner 1st Place Gold Trophy" className="real-podium-img" />
          </div>
        </article>

        <article className="prize-award-card second-runner-card prizes-reveal">
          <div className="top-badge-circle bronze-badge">
            <Medal size={22} />
          </div>
          <div className="rank-label-wrap">
            <span className="rank-line" />
            <p className="prize-rank">SECOND RUNNER-UP</p>
            <span className="rank-line" />
          </div>
          <p className="prize-amount">₹50,000</p>
          <div className="podium-graphic-wrap">
            <img src={imgBronzeTrophyPodium} alt="Second Runner-Up 3rd Place Bronze Trophy" className="real-podium-img" />
          </div>
        </article>

      </div>
    </>
  )
}

// ==========================================
// 11. REWARDS AND BENEFITS
// ==========================================
function RewardsAndBenefits() {
  return (
    <div className="prizes-perks-row prizes-reveal" aria-label="Program benefits">
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Certificates</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Internships</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Hiring Opportunities</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Mentorship</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Networking</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Industry Recognition</span>
      </div>
    </div>
  )
}

function PrizesSection() {
  const sectionRef = useScrollReveal(0.1, '.prizes-reveal', 'is-visible')

  return (
    <section id="prizes" className="prizes-section" ref={sectionRef}>
      <div className="prizes-container">
        <ProgramPrizes />
        <RewardsAndBenefits />
      </div>
    </section>
  )
}

// ==========================================
// 12. WHY JOIN
// ==========================================
const engineeringTeam = imgTeam
const workshopImage = whyGroupImage
const projectImage = whySketchImage
const prototypeImage = whyPrototypeImage
const productTeamImage = imgProductEng
const careerImage = imgProductEng
const networkingImage = whyNetworkingImage
const prizeImage = whyPrizeImage

const whyIcons = {
  project: <Sparkles aria-hidden="true" strokeWidth={1.8} />,
  prototype: <Settings aria-hidden="true" strokeWidth={1.8} />,
  career: <BriefcaseBusiness aria-hidden="true" strokeWidth={1.8} />,
  network: <UsersRound aria-hidden="true" strokeWidth={1.8} />,
  prize: <Trophy aria-hidden="true" strokeWidth={1.8} />,
}

function FeatureCard({ className = '', icon, title, image, imagePosition }) {
  return (
    <article className={`why-feature-card ${className} reveal`}>
      <div className="why-feature-heading">
        <span className="why-feature-icon">{whyIcons[icon]}</span>
        <h3>{title}</h3>
      </div>
      <img src={image} alt={`${title} at the innovation bootcamp`} loading="lazy" decoding="async" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
    </article>
  )
}

function WhyJoinSection() {
  const ref = useScrollReveal(0.1)

  return (
    <section id="why" ref={ref}>
      <div className="wrap">


        <div className="why-layout">
          <div className="why-copy reveal">
            <h2>Why <span className="title-hl">Join</span></h2>
            <p className="why-tagline">More than a bootcamp. A launchpad for your career.</p>
            <span className="why-copy-rule" aria-hidden="true" />
            <p>Solve real-world challenges, collaborate with industry mentors, build working prototypes, and gain the experience needed to launch your engineering career.</p>
            <span className="why-dot-pattern" aria-hidden="true" />
          </div>

          <div className="why-rail why-rail-left">
            <FeatureCard icon="project" title="Real Projects" image={projectImage} imagePosition="center 54%" />
            <FeatureCard icon="career" title="Career Opportunities" image={careerImage} imagePosition="center" />
          </div>

          <div className="why-center">
            <div className="why-main-visual reveal">
              <div className="why-main-image">
                <img src={workshopImage} alt="Engineering students collaborating on a robotics prototype" loading="lazy" decoding="async" />
              </div>
              <div className="why-mini-photo why-mini-photo-top" aria-hidden="true">
                <img src={engineeringTeam} alt="" />
              </div>
              <div className="why-mini-photo why-mini-photo-bottom" aria-hidden="true">
                <img src={productTeamImage} alt="" />
              </div>
              <p className="why-hand-note">
                Real experience.<br />Real impact.
                <svg className="why-hand-arrow" viewBox="0 0 32 54" fill="none" aria-hidden="true">
                  <path d="M8 3c10 13 12 29 4 43" />
                  <path d="m5 39 7 7 8-6" />
                </svg>
              </p>
            </div>

            <FeatureCard className="why-network-card" icon="network" title="Networking" image={networkingImage} imagePosition="center 43%" />
          </div>

          <div className="why-rail why-rail-right">
            <FeatureCard icon="prototype" title="Prototype Development" image={prototypeImage} imagePosition="center" />
            <FeatureCard className="why-prize-card" icon="prize" title="Cash Prizes" image={prizeImage} imagePosition="center 44%" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 13. CAREER OPPORTUNITIES
// ==========================================
const careerFeats = [
  { title: 'Full-Time Employment', icon: <BriefcaseBusiness className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Internships', icon: <GraduationCap className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Research Opportunities', icon: <FlaskConical className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Innovation Projects', icon: <Sparkles className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Future Hiring Pipeline', icon: <TrendingUp className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Talent Pool', icon: <UsersRound className="icon" aria-hidden="true" strokeWidth={1.6} /> },
]

function CareerSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="career" ref={ref}>
      <div className="wrap">
        <div className="career-split-grid">
          <div className="career-content-col reveal">
            <h2 className="career-main-title">Career Opportunities</h2>
            <h3 className="career-subtitle">Get hired by VConnecTech.</h3>
            <span className="career-accent-rule" aria-hidden="true" />
            <p className="career-description">
              Outstanding performers don't just win prizes — they earn opportunities to build their careers with VConnecTech Systems.
            </p>

            <div className="career-cards-grid">
              {careerFeats.map((f) => (
                <div className="career-card" key={f.title}>
                  <div className="career-card-left">
                    <span className="career-card-icon">{f.icon}</span>
                    <span className="career-card-title">{f.title}</span>
                  </div>
                  <span className="career-card-chevron" aria-hidden="true">
                    <ChevronRight size={14} strokeWidth={2.5} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="career-visual-col reveal">
            <div className="career-photo-frame-wrap">
              <div className="career-blue-corner-accent" aria-hidden="true" />
              <div className="career-photo-frame">
                <img
                  src={imgTeam}
                  alt="VConnecTech engineers reviewing a robotics prototype together"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 14. REGISTRATION CTA
// ==========================================
const QrSvg = () => (
  <svg width="140" height="140" viewBox="0 0 140 140">
    <rect width="140" height="140" fill="#fff" />
    <g fill="#16233D">
      <rect x="8" y="8" width="30" height="30" /><rect x="16" y="16" width="14" height="14" fill="#fff" /><rect x="21" y="21" width="4" height="4" fill="#16233D" />
      <rect x="102" y="8" width="30" height="30" /><rect x="110" y="16" width="14" height="14" fill="#fff" /><rect x="115" y="21" width="4" height="4" fill="#16233D" />
      <rect x="8" y="102" width="30" height="30" /><rect x="16" y="110" width="14" height="14" fill="#fff" /><rect x="21" y="115" width="4" height="4" fill="#16233D" />
      <rect x="48" y="8" width="6" height="6" /><rect x="60" y="8" width="6" height="6" /><rect x="76" y="8" width="6" height="6" />
      <rect x="48" y="20" width="6" height="6" /><rect x="66" y="20" width="6" height="6" /><rect x="86" y="20" width="6" height="6" />
      <rect x="52" y="34" width="6" height="6" /><rect x="70" y="34" width="6" height="6" /><rect x="90" y="34" width="6" height="6" />
      <rect x="48" y="48" width="6" height="6" /><rect x="60" y="48" width="6" height="6" /><rect x="76" y="48" width="6" height="6" /><rect x="94" y="48" width="6" height="6" />
      <rect x="108" y="52" width="6" height="6" /><rect x="120" y="60" width="6" height="6" /><rect x="102" y="66" width="6" height="6" />
      <rect x="48" y="62" width="6" height="6" /><rect x="66" y="62" width="6" height="6" /><rect x="82" y="62" width="6" height="6" />
      <rect x="48" y="76" width="6" height="6" /><rect x="60" y="76" width="6" height="6" /><rect x="78" y="76" width="6" height="6" /><rect x="94" y="76" width="6" height="6" />
      <rect x="108" y="80" width="6" height="6" /><rect x="120" y="88" width="6" height="6" />
      <rect x="52" y="90" width="6" height="6" /><rect x="70" y="90" width="6" height="6" /><rect x="88" y="90" width="6" height="6" />
      <rect x="102" y="102" width="6" height="6" /><rect x="114" y="108" width="6" height="6" /><rect x="126" y="102" width="6" height="6" />
      <rect x="102" y="114" width="6" height="6" /><rect x="118" y="120" width="6" height="6" /><rect x="102" y="126" width="6" height="6" />
      <rect x="48" y="104" width="6" height="6" /><rect x="60" y="112" width="6" height="6" /><rect x="72" y="104" width="6" height="6" /><rect x="84" y="118" width="6" height="6" /><rect x="94" y="126" width="6" height="6" />
    </g>
  </svg>
)

function RegisterSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="register" ref={ref}>
      <div className="wrap">
        <div className="register-card-hero reveal">
          <div className="register-glow-top" aria-hidden="true" />
          <div className="register-glow-bottom" aria-hidden="true" />

          <div className="register-inner-grid">
            <div className="register-content-left">
              <div className="register-kicker">
                <span className="diamond" aria-hidden="true">◆</span>
                START YOUR JOURNEY
              </div>
              <h2 className="register-title">
                Ready to <span className="register-title-hl">build the future?</span>
              </h2>
              <p className="register-lede">
                Take the first step toward innovation, recognition, and career opportunities.
                Register today and begin your journey with VConnecTech Innovation Bootcamp 2026.
              </p>



              <div className="register-cta-wrap">
                <a href="#" className="register-btn-primary">
                  <span>Register Now</span>
                  <ArrowRight className="register-btn-arrow" aria-hidden="true" strokeWidth={2.2} />
                </a>
              </div>
            </div>

            <div className="register-qr-col">
              <div className="register-qr-card">
                <div className="qr-img-wrapper">
                  <img src={qrCodeImg} alt="Register QR Code" className="qr-code-img" />
                </div>
                <div className="qr-label-pill">
                  <span className="pulse-dot" aria-hidden="true" />
                  <span>SCAN TO REGISTER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 15. FAQ SECTION
// ==========================================
const faqs = [
  { q: 'Who can participate?', a: 'Final-year students, recent graduates, working professionals, and technology enthusiasts.' },
  { q: 'Is there any registration fee?', a: 'Registration is free. If a fee applies for your track, it will be confirmed during registration.' },
  { q: 'Can I participate individually?', a: 'Yes. You can register individually or as part of a team — team guidelines are shared after registration.' },
  { q: 'Can I participate virtually?', a: 'Yes, but only working professionals are eligible for the Virtual Bootcamp track.' },
  { q: 'Is offline attendance mandatory?', a: 'Yes. All participants must attend the Grand Finale and Final Evaluation in person.' },
  { q: 'Will I receive a certificate?', a: 'Yes. Eligible participants receive certificates based on their participation and performance.' },
]

function FaqSection() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0)
  const ref = useScrollReveal(0.12)

  return (
    <section id="faq" ref={ref}>
      <div className="wrap">
        <h2 className="section-title reveal">Frequently asked <span className="title-hl">questions.</span></h2>
        <p className="lede reveal">Quick answers regarding registration, tracks, eligibility, and certificates.</p>
        <div className="faq-list reveal">
          {faqs.map((item, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div
                key={item.q}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
                onMouseEnter={() => setActiveFaqIndex(index)}
              >
                <div
                  className="faq-question"
                  onClick={() => setActiveFaqIndex(index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon-indicator" />
                </div>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer-content">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

// ==========================================
// MAIN HACKATHON PAGE COMPONENT
// ==========================================
export default function Hackathon() {
  return (
    <main className="hackathon-page">
      <HeroSection />
      <AboutSection />
      <WhoSection />
      <ModesSection />
      <DomainsSection />
      <JourneySection />
      <RoadmapSection />
      <PrizesSection />
      <WhyJoinSection />
      <CareerSection />
      <RegisterSection />
      <FaqSection />
    </main>
  )
}
