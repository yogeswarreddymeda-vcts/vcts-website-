/**
 * Careers Page
 *
 * Presents career opportunities, employee benefits, workplace culture,
 * open positions, application guidance, and supporting calls to action.
 */

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ImageIcon,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import '../assets/css/Careers.css'
import engineeringTeam from '../assets/image/about/Curved image.jpeg'
import teamTripOne from '../assets/image/careers/trip-vcon-1.jpeg'
import teamTripTwo from '../assets/image/careers/trip-vcon-2.jpeg'

// Team photography displayed by the automatic hero carousel.

const heroSlides = [
  { src: teamTripOne, label: 'VCTS team gathering' },
  { src: teamTripTwo, label: 'VCTS team outing' },
  { src: engineeringTeam, label: 'VCTS engineering team' },
]

// Employee benefits retain their intended visual order and grid placement.

const benefits = [
  { title: 'Learn & Grow', description: 'Opportunities to develop your skills and experience.', icon: TrendingUp, className: 'careers-benefit--featured' },
  { title: 'Meaningful Work', description: 'Work on challenges that create real impact.', icon: Target, className: 'careers-benefit--meaningful' },
  { title: 'Collaborative Team', description: 'Learn from experienced professionals and work together.', icon: UsersRound, className: 'careers-benefit--collaborative' },
  { title: 'Make an Impact', description: 'Bring your ideas and contribute to what we build.', icon: Sparkles, className: 'careers-benefit--impact' },
]

// Placeholder tiles preserve the supporting gallery labels and tilt values.

const lifeTiles = [
  { title: 'Learning', rotate: -3, y: 0 },
  { title: 'Engineering', rotate: 2.5, y: 14 },
  { title: 'Teamwork', rotate: 2, y: -10 },
  { title: 'Celebrations', rotate: -2, y: 6 },
]

/** Renders the fixed-ratio careers path selector used inside this page. */

function VctsHero({ onStudentsApply, onProfessionalsApply }) {
  return (
    <div className="vcts-hero-root">
      {/* Desktop and tablet use one uniformly scaled composition. */}
      <div className="hero-wrapper">
        <div className="hero-canvas">
          <svg className="headline-svg" width="1568" height="609" viewBox="0 0 1568 609" aria-hidden="true">
            <g transform="translate(500,306) rotate(90)">
              <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" textLength="520" lengthAdjust="spacingAndGlyphs" fontFamily="Anton, Impact, sans-serif" fontSize="138" fill="none" stroke="#8bbaf4" strokeWidth="1.6">
                STUDENTS
              </text>
            </g>
            <text x="947" y="306" textAnchor="middle" dominantBaseline="middle" textLength="455" lengthAdjust="spacingAndGlyphs" fontFamily="Anton, Impact, sans-serif" fontSize="172" fill="#0b1e52">
              PROFESSIONALS
            </text>
          </svg>

          <div className="el card-left" aria-hidden="true" />
          <div className="el notch-left" aria-hidden="true" />
          <span className="el arrow-left" aria-hidden="true">
            <svg viewBox="0 0 225 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="214" y2="10" stroke="#17b3ad" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M200 3 L214 10 L200 17" fill="none" stroke="#17b3ad" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="el title-left">Students &amp; Graduates</div>
          <a className="el apply-left" href="/careers/students" onClick={onStudentsApply}>Apply now</a>

          <p className="el question">Where would you like to begin your journey with VCTS?</p>

          <div className="el notch-right" aria-hidden="true" />
          <div className="el card-right" aria-hidden="true" />
          <span className="el arrow-right" aria-hidden="true">
            <svg viewBox="0 0 230 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="219" y2="10" stroke="#6f9bf0" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M205 3 L219 10 L205 17" fill="none" stroke="#6f9bf0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="el title-right">Experienced Professionals</div>
          <a className="el apply-right" href="/careers/experienced" onClick={onProfessionalsApply}>Apply now</a>
        </div>
      </div>

      {/* Mobile uses real stacked cards instead of shrinking the desktop canvas. */}
      <div className="hero-mobile">
        <p className="m-question">Where would you like to begin your journey with VCTS?</p>

        <div className="m-card left">
          <span className="m-arrow" aria-hidden="true">
            <svg viewBox="0 0 170 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="155" y2="10" stroke="#17b3ad" strokeWidth="1.6" />
              <path d="M147 3 L158 10 L147 17" fill="none" stroke="#17b3ad" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="m-title">Students &amp; Graduates</div>
          <a className="m-apply" href="/careers/students" onClick={onStudentsApply}>Apply now</a>
        </div>

        <div className="m-card right">
          <span className="m-arrow" aria-hidden="true">
            <svg viewBox="0 0 170 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="155" y2="10" stroke="#6f9bf0" strokeWidth="1.6" />
              <path d="M147 3 L158 10 L147 17" fill="none" stroke="#6f9bf0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="m-title">Experienced Professionals</div>
          <a className="m-apply" href="/careers/experienced" onClick={onProfessionalsApply}>Apply now</a>
        </div>
      </div>
    </div>
  )
}

/** Renders the complete Careers page and its filtering and application interactions. */

export default function Careers({ setCurrentPage }) {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [hoveredLifeTile, setHoveredLifeTile] = useState(null)
  const lifeAtVctsRef = useRef(null)
  const whyJoinRef = useRef(null)
  const openPositionsRef = useRef(null)
  const generalApplicationRef = useRef(null)
  const finalCtaRef = useRef(null)

  // Advance the decorative hero photography unless reduced motion is requested.

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const slideTimer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length)
    }, 6000)

    // Clear the interval on unmount to prevent updates against a removed page.

    return () => window.clearInterval(slideTimer)
  }, [])

  // Replay each section from the direction in which it enters the viewport.

  useEffect(() => {
    const sections = [
      whyJoinRef.current,
      lifeAtVctsRef.current,
      openPositionsRef.current,
      generalApplicationRef.current,
      finalCtaRef.current,
    ].filter(Boolean)
    if (!sections.length) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return undefined
    }

    let previousScrollY = window.scrollY
    let scrollDirection = 'down'

    const detectScrollDirection = () => {
      const currentScrollY = window.scrollY
      if (Math.abs(currentScrollY - previousScrollY) > 2) {
        scrollDirection = currentScrollY > previousScrollY ? 'down' : 'up'
        previousScrollY = currentScrollY
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.08

        if (isVisible) {
          entry.target.classList.remove('is-entering-up', 'is-entering-down')
          entry.target.classList.add(`is-entering-${scrollDirection}`)
          void entry.target.offsetWidth
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    }, { threshold: [0, 0.08], rootMargin: '0px 0px -8% 0px' })

    window.addEventListener('scroll', detectScrollDirection, { passive: true })
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', detectScrollDirection)
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navigateToCareerPath = (event, page) => {
    event.preventDefault()
    window.history.replaceState({ page: 'careers', returnTo: 'open-positions' }, '', '/careers#open-positions')
    setCurrentPage(page)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  return (
    <main className="careers-page">
      {/* Careers hero with rotating team photography and primary navigation actions */}

      <section className="careers-hero">
        <div className="careers-hero-media" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              className={`careers-hero-slide${activeHeroSlide === index ? ' is-active' : ''}`}
              src={slide.src}
              alt=""
              key={slide.src}
            />
          ))}
        </div>
        <div className="careers-hero-overlay" />
        <div className="careers-shell careers-hero-inner">
          <p className="careers-eyebrow">Careers at VCTS</p>
          <h1>Join us on our path to <span>excellence.</span></h1>
          <p className="careers-hero-lede">Let’s innovate and grow together!</p>
          <div className="careers-actions">
            <button type="button" className="careers-hero-apply" onClick={() => scrollTo('open-positions')}>
              <span>Apply now</span>
              <span className="careers-hero-apply-icon"><ArrowRight aria-hidden="true" /></span>
            </button>
          </div>
        </div>
        <div className="careers-hero-pagination" aria-label="Choose hero image" role="group">
          {heroSlides.map((slide, index) => (
            <button
              type="button"
              className={activeHeroSlide === index ? 'is-active' : ''}
              aria-label={`Show ${slide.label}`}
              aria-pressed={activeHeroSlide === index}
              onClick={() => setActiveHeroSlide(index)}
              key={slide.src}
            />
          ))}
        </div>
      </section>

      {/* Employee benefits presented in an asymmetric feature grid */}

      <section ref={whyJoinRef} className="careers-section careers-why" id="why-join">
        <div className="careers-shell">
          <div className="careers-section-heading">
            <p className="careers-eyebrow">Why join VCTS?</p>
            <h2>Great Work Starts With <span>Great People.</span></h2>
            <p>At VCTS, we believe in giving people the opportunity to learn, contribute, take on challenges, and grow.</p>
          </div>
          <div className="careers-benefits-grid">
            {benefits.map(({ title, description, icon: Icon, className }) => (
              <article className={`careers-benefit ${className}`} key={title}>
                <span className="careers-benefit-icon" aria-hidden="true"><Icon /></span>
                <div className="careers-benefit-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workplace culture and engineering-team imagery */}

      <section ref={lifeAtVctsRef} className="careers-section careers-life" id="life-at-vcts">
        <div className="careers-shell">
          <div className="careers-section-heading careers-section-heading--center">
            <p className="careers-eyebrow">Life at VCTS</p>
            <h2>People. Ideas. <span>Possibilities.</span></h2>
            <p>A place where people collaborate, share ideas, take on challenges, and grow together.</p>
          </div>
          <div className="careers-life-grid">
            <figure className="careers-life-tile careers-life-tile--large">
              <img
                className="careers-life-image"
                src={engineeringTeam}
                alt="The VConnectTech Systems engineering team"
              />
            </figure>
            <div className="careers-life-supporting">
              {lifeTiles.map((tile, index) => {
                const isHovered = hoveredLifeTile === index
                const transform = isHovered
                  ? 'rotate(0deg) translateY(0px) scale(1.04)'
                  : `rotate(${tile.rotate}deg) translateY(${tile.y}px)`

                return (
                  <figure
                    className="careers-life-tile careers-life-tile--support"
                    key={tile.title}
                    onMouseEnter={() => setHoveredLifeTile(index)}
                    onMouseLeave={() => setHoveredLifeTile(null)}
                    style={{ transform, zIndex: isHovered ? 2 : 1 }}
                  >
                    <div
                      className="careers-life-card careers-life-card--small"
                      style={{
                        boxShadow: isHovered
                          ? '0 18px 36px rgba(18, 22, 27, .22), 0 6px 12px rgba(18, 22, 27, .1)'
                          : '9px 14px 26px rgba(18, 22, 27, .15), 2px 5px 9px rgba(18, 22, 27, .08)',
                      }}
                    >
                    <ImageIcon aria-hidden="true" />
                    <strong>Add image</strong>
                    </div>
                    <figcaption>{tile.title}</figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Searchable and category-filtered job openings */}

      <section ref={openPositionsRef} className="careers-section careers-positions" id="open-positions">
        <div className="careers-shell">
          <div className="careers-section-heading">
            <p className="careers-eyebrow">Open positions</p>
            <h2>Explore Open <span>Positions.</span></h2>
            <p>Find a role that matches your skills, experience, and interests.</p>
          </div>
        </div>

        {/* Full-width kinetic typography connects both career destinations. */}

        <VctsHero
          onStudentsApply={(event) => navigateToCareerPath(event, 'career-students')}
          onProfessionalsApply={(event) => navigateToCareerPath(event, 'career-experienced')}
        />
      </section>

      {/* General application prompt for candidates without a matching role */}

      <section ref={generalApplicationRef} className="careers-general">
        <div className="careers-shell careers-general-inner">
          <div><p className="careers-eyebrow">Keep in touch</p><h2>Didn't Find the <span>Right Role?</span></h2></div>
          <div><p>We're always interested in meeting talented people. Send us your profile and we'll keep you in mind for future opportunities.</p><a className="careers-button careers-button--light" href="/careers/students" onClick={(event) => navigateToCareerPath(event, 'career-students')}>Send Your Resume <Send /></a></div>
        </div>
      </section>

      {/* Final careers call to action */}

      <section ref={finalCtaRef} className="careers-final-cta">
        <div className="careers-shell"><p className="careers-eyebrow">Your next chapter</p><h2>Ready for What's <span>Next?</span></h2><p>Your next opportunity could start here.</p><button type="button" className="careers-button careers-button--primary" onClick={() => scrollTo('open-positions')}>Explore Open Positions <ArrowRight /></button></div>
      </section>
    </main>
  )
}
