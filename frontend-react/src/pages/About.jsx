/**
 * About Page
 *
 * Presents the company story, engineering capabilities, mission and vision,
 * leadership profiles, workplace gallery, and contact CTA.
 */

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../assets/css/About.css'
import teamImage from '../assets/image/about/Curved image.jpeg'
import heroImage from '../assets/image/about/hero_image.webp'
import sectionThreeImage from '../assets/image/about/exec-bb0ffd4a-f6a0-462b-96be-c9c4fea60e89.webp'
import missionImage from '../assets/image/about/purpose-mission-engineering-lab.webp'
import visionImage from '../assets/image/about/purpose-vision-connected-city.webp'
import galleryImg1 from '../assets/image/about/DSC01138.JPG'
import galleryImg2 from '../assets/image/about/DSC01330.JPG'
import galleryImg3 from '../assets/image/about/DSC01344.JPG'
import galleryImg4 from '../assets/image/about/DSC01402.JPG'

gsap.registerPlugin(ScrollTrigger)

// Engineering capabilities displayed around the Who We Are visual.

const highlights = [
  {
    number: '01',
    title: 'Systems Engineering',
    description: 'End-to-end engineering expertise',
  },
  {
    number: '02',
    title: 'Product Development',
    description: 'From architecture to deployment',
  },
  {
    number: '03',
    title: 'Engineering Excellence',
    description: 'Quality-driven and performance-focused solutions',
  },
]

// Leadership profiles rendered in the engineering-leadership section.

const leaders = [
  {
    name: 'Venkata Rajesh',
    role: 'Head of PCB & Packaging Design',
    description:
      'Systems engineering professional with 22+ years of experience in PCB and package design, post-silicon validation, bring-up, application tuning, verification, and production sign-off. Experienced across processors, hardware, protocols, and interface technologies.',
  },
]

// Image and accessibility metadata used by the workplace gallery.

const galleryItems = [
  { image: galleryImg1, alt: 'Engineers working on electronic camera and system board' },
  { image: galleryImg2, alt: 'Electronics testing and circuit inspection in laboratory' },
  { image: galleryImg3, alt: 'Hardware testing and circuit design workbench' },
  { image: galleryImg4, alt: 'Hardware engineering and system validation setup' },
]

/**
 * Renders the complete About page and its interactive gallery.
 *
 * @param {Object} props
 * @param {(page: string) => void} props.setCurrentPage - Updates the active client-side page.
 */

export default function About({ setCurrentPage }) {
  const [gallerySlide, setGallerySlide] = useState(0)
  const aboutPageRef = useRef(null)
  // Stores the touch origin without causing a render during swipe gestures.

  const galleryTouchStart = useRef(null)
  // Scopes the circular capability animation to the Who We Are visual.

  const whoVisualRef = useRef(null)
  const activeGalleryItem = galleryItems[gallerySlide]

  // Build the Who We Are sequence in reading order: copy, photo,
  // engineering arc, connection points, and capability labels.

  useEffect(() => {
    const visual = whoVisualRef.current
    // Skip translated motion when the visitor requests reduced motion.

    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    // Scope GSAP selectors and animations to this visual so they cannot
    // affect similarly named elements elsewhere in the application.

    const context = gsap.context(() => {
      const section = visual.closest('.about-who')
      const heading = section.querySelector('.about-who-heading')
      const copyItems = section.querySelectorAll('.about-who-copy p')
      const photo = visual.querySelector('.about-who-photo')
      const arc = visual.querySelector('.about-who-arc-path')
      const connectors = visual.querySelectorAll('.about-who-connector')
      const nodes = visual.querySelectorAll('.about-who-node')
      const capabilityItems = visual.querySelectorAll('.about-who-capability')

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          end: 'bottom 18%',
          toggleActions: 'restart reverse restart reverse',
        },
      })

      timeline
        .fromTo(
          heading,
          { opacity: 0, x: -54 },
          { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out', immediateRender: false },
        )
        .fromTo(
          copyItems,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out', immediateRender: false },
          0.16,
        )
        .fromTo(
          photo,
          { clipPath: 'circle(7% at 50% 50%)', scale: 1.12 },
          {
            clipPath: 'circle(50% at 50% 50%)',
            scale: 1,
            duration: 1,
            ease: 'power3.inOut',
            immediateRender: false,
          },
          0.08,
        )
        .fromTo(
          arc,
          { strokeDasharray: '0 100' },
          { strokeDasharray: '50 50', duration: 1.15, ease: 'power2.out', immediateRender: false },
          0.42,
        )
        .fromTo(
          connectors,
          { opacity: 0, scaleX: 0, transformOrigin: 'left center' },
          { opacity: 1, scaleX: 1, duration: 0.28, stagger: 0.12, ease: 'power2.out', immediateRender: false },
          0.72,
        )
        .fromTo(
          nodes,
          { opacity: 0, scale: 0, transformOrigin: 'center center' },
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.12, ease: 'back.out(2)', immediateRender: false },
          0.72,
        )
        .fromTo(
          capabilityItems,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
            immediateRender: false,
          },
          0.82,
        )
    }, visual)

    // Revert GSAP styles and ScrollTriggers on unmount to avoid stale references.

    return () => context.revert()
  }, [])

  // Run a single coordinated hero entrance while keeping the headline
  // together as one readable block.

  useEffect(() => {
    const hero = aboutPageRef.current?.querySelector('.about-hero')
    // Keep the static hero visible when reduced motion is preferred.

    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    // The scoped timeline settles the image, grid, and copy without
    // leaking inline animation styles outside the hero.

    const context = gsap.context(() => {
      gsap.set('.about-hero-image', { autoAlpha: 0.72, scale: 1.045 })
      gsap.set('.about-hero-grid', { opacity: 0 })
      gsap.set('.about-hero-copy', { autoAlpha: 0, y: 30 })

      gsap.timeline()
        .to('.about-hero-image', {
          autoAlpha: 1,
          scale: 1,
          duration: 1.35,
          ease: 'sine.out',
        })
        .to('.about-hero-grid', {
          opacity: 0.12,
          duration: 1.1,
          ease: 'sine.out',
        }, 0.05)
        .to('.about-hero-copy', {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: 'power2.out',
        }, 0.2)
    }, hero)

    // Remove timeline-owned inline styles when the page unmounts.

    return () => context.revert()
  }, [])

  // Animate the remaining page sections as they enter or leave the viewport,
  // reversing the travel direction when the visitor scrolls upward.

  useEffect(() => {
    const page = aboutPageRef.current
    // Reduced-motion visitors receive the normal document flow without transforms.

    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    // One GSAP context owns all section triggers and centralizes cleanup.

    const context = gsap.context(() => {
      const sections = Array.from(page.children).filter(
        (element) => element.tagName === 'SECTION' && !element.matches('.about-hero, .about-who'),
      )

      sections.forEach((section) => {
        gsap.set(section, { autoAlpha: 0, y: 52 })

        const revealSection = (direction) => {
          gsap.killTweensOf(section)
          gsap.fromTo(
            section,
            {
              autoAlpha: 0,
              y: direction === 1 ? 52 : -42,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              overwrite: 'auto',
            },
          )
        }

        const hideSection = (direction) => {
          gsap.killTweensOf(section)
          gsap.to(section, {
            autoAlpha: 0,
            y: direction === 1 ? -34 : 34,
            duration: 0.35,
            ease: 'power2.in',
            overwrite: 'auto',
          })
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 88%',
          end: 'bottom 12%',
          onEnter: () => revealSection(1),
          onEnterBack: () => revealSection(-1),
          onLeave: () => hideSection(1),
          onLeaveBack: () => hideSection(-1),
        })
      })
    }, page)

    // Revert every generated ScrollTrigger to prevent duplicate callbacks after remounting.

    return () => context.revert()
  }, [])

  const showPreviousGalleryItem = () => {
    setGallerySlide((current) => (current - 1 + galleryItems.length) % galleryItems.length)
  }

  const showNextGalleryItem = () => {
    setGallerySlide((current) => (current + 1) % galleryItems.length)
  }

  const handleGalleryTouchStart = (event) => {
    galleryTouchStart.current = event.touches[0].clientX
  }

  /**
   * Converts a horizontal swipe into gallery navigation and clears the
   * stored touch position after each completed gesture.
   */

  const handleGalleryTouchEnd = (event) => {
    if (galleryTouchStart.current === null) return

    const distance = event.changedTouches[0].clientX - galleryTouchStart.current
    if (Math.abs(distance) > 45) {
      if (distance < 0) showNextGalleryItem()
      else showPreviousGalleryItem()
    }
    galleryTouchStart.current = null
  }

  /**
   * Uses the existing client-side navigation callback for the Contact page
   * and resets the viewport so the destination opens from its beginning.
   */

  const openContact = (event) => {
    event.preventDefault()
    setCurrentPage('contact')
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  return (
    <main className="about-page" ref={aboutPageRef}>
      {/* =========================================================
          About Hero
          Introduces VConnecTech Systems and its engineering values.
      ========================================================= */}

      <section className="about-hero" aria-labelledby="about-hero-title">
        <img
          className="about-hero-image"
          src={heroImage}
          alt="Engineer testing a semiconductor development board"
        />
        <div className="about-hero-grid" aria-hidden="true" />
        <div className="about-shell about-hero-inner">
          {/* Hero heading and core company values */}

          <div className="about-hero-copy">
            <p className="about-eyebrow">About VConnecTech Systems</p>
            <h1 id="about-hero-title">
              <span className="about-hero-title-line">
                Built From <span className="about-hero-passion">Passion</span>
              </span>
              <span className="about-hero-title-line">
                Driven By <span>Excellence.</span>
              </span>
            </h1>
            <div className="about-hero-values" aria-label="Engineering, Innovation, Excellence">
              <span>Engineering</span>
              <i aria-hidden="true" />
              <span>Innovation</span>
              <i aria-hidden="true" />
              <span>Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Who We Are
          Explains the company and visualizes its engineering capabilities.
      ========================================================= */}

      <section className="about-who" aria-labelledby="about-who-title">
        <div className="about-shell about-who-layout">
          {/* Company introduction and product-development experience */}

          <div className="about-who-content">
            <div className="about-who-heading">
              <p className="about-section-number">Who We Are</p>
              <h2 id="about-who-title">Engineering Innovation.<br /><span>Delivering Excellence.</span></h2>
            </div>
            <div className="about-who-copy">
              <p>
                VConnecTech Systems is a <strong>systems engineering company based in India</strong>, delivering
                high-quality engineering solutions for complex technology challenges.
              </p>
              <p>
                Our experienced engineering team brings expertise across the <strong>complete product development
                lifecycle</strong> — from architecture and design to verification, validation, and deployment.
              </p>
              <p>
                With a strong focus on <strong>engineering quality, innovation, and first-pass success</strong>, we help
                businesses develop reliable solutions built for real-world performance.
              </p>
            </div>
          </div>

          {/* Circular engineering visual and capability labels */}

          <div className="about-who-visual" ref={whoVisualRef}>
            <div className="about-who-orbit-stage">
              <figure className="about-who-photo">
                <img
                  src={sectionThreeImage}
                  alt="Engineers testing a PCB with an oscilloscope and camera modules in an electronics laboratory"
                />
              </figure>

              <svg className="about-who-arc" viewBox="0 0 100 100" aria-hidden="true">
                <circle
                  className="about-who-arc-path"
                  cx="50"
                  cy="50"
                  r="45"
                  pathLength="100"
                  transform="rotate(-90 50 50)"
                />
                <line className="about-who-connector" x1="81.82" y1="18.18" x2="87" y2="18.18" />
                <line className="about-who-connector" x1="95" y1="50" x2="100" y2="50" />
                <line className="about-who-connector" x1="83.44" y1="80.11" x2="88.5" y2="80.11" />
                <circle className="about-who-node" cx="81.82" cy="18.18" r="1.25" />
                <circle className="about-who-node" cx="95" cy="50" r="1.25" />
                <circle className="about-who-node" cx="83.44" cy="80.11" r="1.25" />
              </svg>
            </div>

            <ol className="about-who-capabilities" aria-label="Engineering capabilities">
              {highlights.map(({ number, title, description }) => (
                <li className="about-who-capability" key={title}>
                  <span className="about-who-capability-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* =========================================================
          Mission and Vision
          Defines the company purpose through two complementary panels.
      ========================================================= */}

      <section className="about-purpose" aria-labelledby="about-purpose-title">
        <div className="about-shell">
          <div className="about-purpose-heading scroll-reveal-item">
            <p className="about-section-number">Our Purpose</p>
            <h2 id="about-purpose-title">Mission &amp; Vision</h2>
          </div>

          {/* Mission and vision image panels */}

          <div className="about-purpose-grid">
            <article className="about-purpose-card scroll-reveal-item" data-index="01">
              <img className="about-purpose-image" src={missionImage} alt="" />
              <span>Mission</span>
              <p>To engineer reliable and intelligent technology solutions that solve real-world challenges and create lasting value.</p>
            </article>
            <article className="about-purpose-card about-purpose-card-blue scroll-reveal-item" data-index="02">
              <img className="about-purpose-image" src={visionImage} alt="" />
              <span>Vision</span>
              <p>To build a future where advanced engineering and intelligent technologies enable smarter, connected systems.</p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          Leadership Introduction
          Frames the experience represented by the leadership profiles.
      ========================================================= */}

      <section className="about-leadership-intro" aria-labelledby="about-leadership-title">
        <div className="about-shell">
          <header className="about-leadership-heading scroll-reveal-item">
            <div>
              <p className="about-section-number">People Behind VCTS</p>
              <h2 id="about-leadership-title">Engineering Leadership</h2>
            </div>
            <p>Decades of hands-on engineering experience, focused on building dependable products and high-performing teams.</p>
          </header>
        </div>
      </section>

      {/* =========================================================
          Founder Message
          Shares the founder's engineering philosophy and profile.
      ========================================================= */}

      <section
        className="about-founder-message"
        aria-labelledby="about-founder-message-title"
      >
        <div className="about-shell about-founder-message-inner scroll-reveal-item">
          {/* Founder message, signature, and professional profile */}

          <div className="about-founder-message-copy">
            <p className="about-founder-message-kicker">A message from <span>our Founder &amp; CEO</span></p>
            <h2 id="about-founder-message-title">Engineering ideas into impact.<br /><span>Building what&apos;s next.</span></h2>
            <blockquote>
              <p>At VConnecTech, we believe technology has the power to transform businesses and enrich lives. My mission is to build a company where great people come together to solve meaningful problems and create solutions that shape a better tomorrow.</p>
              <p>We don&apos;t chase trends. We focus on what matters — innovation with purpose, engineering with excellence, and partnerships built on trust.</p>
            </blockquote>
            <div className="about-founder-signature">
              <strong>Srikanth Neelam</strong>
              <span>Founder &amp; CEO, VConnecTech</span>
            </div>
            <div className="about-founder-profile">
              <p>
                Design engineering professional with 22+ years of experience in hardware, software, embedded systems,
                AI/HPC, automotive, consumer, and medical applications.
              </p>
              <span className="about-founder-linkedin" aria-label="Srikanth Neelam LinkedIn profile link pending">
                LinkedIn <ArrowRight aria-hidden="true" />
              </span>
            </div>
          </div>
          {/* Reserved founder portrait area */}

          <figure className="about-founder-message-image">
            <div className="about-portrait-placeholder" role="img" aria-label="Founder portrait placeholder">
              <span>Founder portrait</span>
            </div>
          </figure>
        </div>
      </section>

      {/* =========================================================
          Engineering Leadership and Team
          Presents leadership experience and the multidisciplinary team.
      ========================================================= */}

      <section className="about-leadership" aria-labelledby="about-leadership-title">
        <div className="about-shell">
          {/* Leadership profiles sourced from the centralized data */}

          {leaders.map((leader) => (
            <article
              className="about-leader-showcase scroll-reveal-item"
              key={leader.name}
            >
              <div className="about-leader-experience">
                <strong>22+</strong>
                <span>Years of experience</span>
              </div>
              <div className="about-leader-showcase-copy">
                <p>{leader.role}</p>
                <h3>{leader.name}</h3>
                <div>{leader.description}</div>
                <span className="about-linkedin-label" aria-label={`${leader.name} LinkedIn profile link pending`}>
                  LinkedIn <ArrowRight aria-hidden="true" />
                </span>
              </div>
              <div className="about-leader-showcase-image">
                <div className="about-portrait-placeholder" role="img" aria-label={`${leader.name} portrait placeholder`}>
                  <span>Leadership portrait</span>
                </div>
              </div>
            </article>
          ))}

          {/* Team introduction and engineering-group image */}

          <article className="about-team-card scroll-reveal-item">
            <div className="about-team-copy">
              <p className="about-section-number">Meet Our Team</p>
              <h2>Built by Engineers.<br /><span>Driven by Collaboration.</span></h2>
              <p>
                Our multidisciplinary team brings together expertise across{' '}
                <strong>semiconductor, embedded systems, software, and AI</strong> to engineer solutions that move
                from concept to real-world implementation.
              </p>
            </div>
            <div className="about-team-image">
              <img src={teamImage} alt="VConnecTech Systems multidisciplinary engineering team" />
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================
          Workplace Gallery
          Shows the team, engineering environment, and project imagery.
      ========================================================= */}

      <section className="about-gallery" aria-labelledby="about-gallery-title">
        <div className="about-shell">
          <header className="about-gallery-heading scroll-reveal-item">
            <div>
              <p className="about-section-number">Inside VCTS</p>
              <h2 id="about-gallery-title">Our Gallery</h2>
            </div>
            <p>A look at our people, engineering environment, and the technologies we work with.</p>
          </header>
          {/* Swipe-enabled gallery with arrows and thumbnail navigation */}

          <div
            className="about-gallery-slider scroll-reveal-item"
            onTouchStart={handleGalleryTouchStart}
            onTouchEnd={handleGalleryTouchEnd}
          >
            <span className="about-gallery-count">{gallerySlide + 1} / {galleryItems.length}</span>
            <figure className="about-gallery-slide" key={gallerySlide} aria-live="polite">
              <img src={activeGalleryItem.image} alt={activeGalleryItem.alt} />
            </figure>
            <button className="about-gallery-arrow about-gallery-arrow-left" type="button" onClick={showPreviousGalleryItem} aria-label="Show previous gallery image">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button className="about-gallery-arrow about-gallery-arrow-right" type="button" onClick={showNextGalleryItem} aria-label="Show next gallery image">
              <ChevronRight aria-hidden="true" />
            </button>
            {/* Thumbnail controls support click, hover, and keyboard focus */}

            <div className="about-gallery-thumbnails" aria-label="Choose a gallery image">
              {galleryItems.map((item, index) => (
                <button
                  className={index === gallerySlide ? 'active' : ''}
                  type="button"
                  key={index}
                  onClick={() => setGallerySlide(index)}
                  onMouseEnter={() => setGallerySlide(index)}
                  onFocus={() => setGallerySlide(index)}
                  aria-label={`Show gallery slide ${index + 1}`}
                  aria-current={index === gallerySlide ? 'true' : undefined}
                >
                  <img src={item.image} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Contact Call to Action
          Directs visitors with engineering needs to the Contact page.
      ========================================================= */}

      <section className="about-cta" aria-labelledby="about-cta-title">
        <div className="about-shell about-cta-inner scroll-reveal-item">
          <div>
            <p className="about-eyebrow">Start a Conversation</p>
            <h2 id="about-cta-title">Have an Engineering Challenge?</h2>
            <p>Let&apos;s build the right solution together.</p>
          </div>
          <a href="/contact" onClick={openContact}>
            Talk to Our Engineering Team <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}
