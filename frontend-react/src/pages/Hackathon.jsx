/**
 * Hackathon Page
 *
 * Describes the Engineering Marathon, eligible participants, focus domains,
 * cross-functional journey, resources, outcomes, and registration.
 */

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Box,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardPenLine,
  FileText,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  Megaphone,
  Monitor,
  Mountain,
  RefreshCw,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  UsersRound,
} from 'lucide-react'

// Assets

import imgMentors from '../assets/image/Hackathon/mentors-makerspace.webp'
import heroBackgroundImage from '../assets/image/Hackathon/ChatGPT Image Sep 2, 2026, 03_45_46 PM.png'
import buildMainProductImage from '../assets/image/Hackathon/build-main-product-showcase.png'
import buildIdeaImage from '../assets/image/Hackathon/build-stage-idea.png'
import buildArchitectureImage from '../assets/image/Hackathon/build-stage-architecture.png'
import buildDesignImage from '../assets/image/Hackathon/build-stage-design.png'
import buildPrototypeImage from '../assets/image/Hackathon/build-stage-prototype.png'
import buildImpactImage from '../assets/image/Hackathon/build-stage-impact.png'
import engineeringTeamImage from '../assets/image/Hackathon/team-crossfunctional-nobg.png'
import engineeringEmbeddedImage from '../assets/image/Hackathon/ChatGPT Image Sep 2, 2026, 06_12_15 PM (2).png'
import engineeringFpgaImage from '../assets/image/Hackathon/ChatGPT Image Sep 2, 2026, 06_12_14 PM (1).png'
import engineeringBoardImage from '../assets/image/Hackathon/ChatGPT Image Sep 2, 2026, 06_12_18 PM (4).png'
import engineeringProductImage from '../assets/image/Hackathon/ChatGPT Image Sep 2, 2026, 06_12_16 PM (3).png'
import imgTeam from '../assets/image/Hackathon/engineering-team.webp'
import imgProductEng from '../assets/image/Hackathon/domain-product-engineering.webp'
import focusDomainsShowcase from '../assets/image/Hackathon/ChatGPT Image Sep 2, 2026, 11_57_03 AM.png'
import mountainImage from '../assets/image/Hackathon/journey-mountain.webp'
import whyPrototypeImage from '../assets/image/Hackathon/Why_join_car.webp'
import whyNetworkingImage from '../assets/image/Hackathon/why_join_communication.webp'
import whyGroupImage from '../assets/image/Hackathon/why_join_group.webp'
import whyPrizeImage from '../assets/image/Hackathon/why_join_money.webp'
import whySketchImage from '../assets/image/Hackathon/why_join_sketch.webp'
import imgGoldTrophyPodium from '../assets/image/Hackathon/gold_trophy_podium.webp'
import imgSilverTrophyPodium from '../assets/image/Hackathon/silver_trophy_podium.webp'
import imgBronzeTrophyPodium from '../assets/image/Hackathon/bronze_trophy_podium.webp'
import qrCodeImg from '../assets/image/qr_code.webp'
import '../assets/css/Hackathon.css'

// ==========================================
// SHARED UTILITIES & HOOKS
// ==========================================

function useScrollReveal(threshold = 0.12, selector = '.reveal', activeClass = 'in') {
  const ref = useRef(null)

  // Toggle reveal classes as matching descendants enter and leave the viewport,
  // with an immediate fallback for browsers without IntersectionObserver.

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
    // Disconnect on unmount so the observer releases all descendant references.

    return () => observer.disconnect()
  }, [threshold, selector, activeClass])

  return ref
}

// ==========================================
// 1. HERO SECTION
// ==========================================

function HeroMain() {
  return (
    <div className="hero-main">
      <p className="hero-event-name">VConnecTech <strong>Engineering</strong> <strong>Marathon</strong></p>
      <p className="hero-audience">Open to all degrees and disciplines.</p>
      <h1 className="hero-title">
        <span>One Problem.</span>
        <span>One Team.</span>
        <span className="hero-impact-line">Real Impact.</span>
      </h1>
      <p className="lede">
        A two-month cross-functional engineering challenge that turns ideas into working solutions. We provide the resources, infrastructure, and mentorship you build the impact.
      </p>
    </div>
  )
}

// ==========================================
// 2. HERO JOURNEY STAGES
// ==========================================

function HeroJourneyStages() {
  return (
    <div className="hero-flow" aria-label="Engineering Marathon process">
      <span>Idea Submission</span>
      <ArrowRight aria-hidden="true" />
      <span>Architecture &amp; Design</span>
      <ArrowRight aria-hidden="true" />
      <span>Prototype &amp; Impact</span>
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
          <CalendarDays aria-hidden="true" />
          <div><div className="lbl">Development period</div><div className="num">2 months</div></div>
        </div>
        <div className="stat">
          <UsersRound aria-hidden="true" />
          <div><div className="lbl">Team size</div><div className="num">5–8 members</div></div>
        </div>
        <div className="stat">
          <ClipboardPenLine aria-hidden="true" />
          <div><div className="lbl">Project selection</div><div className="num">Based on quality and feasibility</div></div>
        </div>
        <div className="stat">
          <RefreshCw aria-hidden="true" />
          <div><div className="lbl">Program frequency</div><div className="num">Once every 3 or 6 months</div></div>
        </div>
      </div>
    </div>
  )
}

/** Renders the hackathon introduction, journey graphic, and key program metrics. */

function HeroSection() {
  const sectionRef = useScrollReveal(0.08)

  return (
    <section className="hero" ref={sectionRef}>
      <img className="hero-background" src={heroBackgroundImage} alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async" />
      <div className="wrap hero-inner">
        <div className="hero-top">
          <HeroMain />
        </div>
        <HeroJourneyStages />
        <HeroStats />
      </div>
    </section>
  )
}

// ==========================================
// 4. ABOUT THE ENGINEERING MARATHON
// ==========================================

/** Explains the program purpose and participation value. */

function AboutSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="about" ref={ref}>
      <div className="wrap">
        <div className="about-grid">
          <div className="about-copy reveal">
            <h2 className="about-title">
              What Is the <br />
              <span className="title-hl">Engineering Marathon?</span>
            </h2>

            <p className="about-tagline">From concept to real-world impact.</p>

            <p className="about-lede">
              The VConnecTech Engineering Marathon is an open innovation program where individuals submit ideas and selected teams turn them into real, working prototypes. We provide the tools, infrastructure, expert guidance, and ecosystem support to help you build from concept to demo in two months.
            </p>

            <div className="about-cards-grid">
              <div className="about-feature-card">
                <div className="card-icon-box">
                  <Target className="card-icon" aria-hidden="true" />
                </div>
                <span className="card-text">Open to all degrees and disciplines</span>
                <span className="card-accent-bar" aria-hidden="true" />
              </div>

              <div className="about-feature-card">
                <div className="card-icon-box">
                  <Box className="card-icon" aria-hidden="true" />
                </div>
                <span className="card-text">Build in balanced cross-functional teams</span>
                <span className="card-accent-bar" aria-hidden="true" />
              </div>

              <div className="about-feature-card">
                <div className="card-icon-box">
                  <UsersRound className="card-icon" aria-hidden="true" />
                </div>
                <span className="card-text">Access resources, mentorship, and infrastructure</span>
                <span className="card-accent-bar" aria-hidden="true" />
              </div>

              <div className="about-feature-card">
                <div className="card-icon-box">
                  <TrendingUp className="card-icon" aria-hidden="true" />
                </div>
                <span className="card-text">Create working solutions with real-world impact</span>
                <span className="card-accent-bar" aria-hidden="true" />
              </div>
            </div>
          </div>

          <figure className="about-visual reveal">
            <div className="about-visual-bar" aria-hidden="true">
              <div className="bar-left">
                <FlaskConical className="bar-icon" />
                <span>INDUSTRY-GRADE LAB &amp; TOOLS</span>
              </div>
              <span className="bar-right">• BUILD &amp; VALIDATE</span>
            </div>

            <div className="about-photo-wrapper">
              <img
                className="section-photo"
                src={imgMentors}
                alt="A mentor guides a cross-functional team building an engineering prototype"
                decoding="async"
              />
            </div>

            <figcaption>
              <div className="caption-left">
                <UsersRound className="caption-icon" />
                <span>Resources. Mentorship. Infrastructure.</span>
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
    title: 'Students',
    items: ['All Degrees & Disciplines'],
  },
  {
    icon: <UserRound className="icon" aria-hidden="true" strokeWidth={1.6} />,
    title: 'Graduates & Freshers',
    items: ['Early-Career Innovators'],
  },
  {
    icon: <BriefcaseBusiness className="icon" aria-hidden="true" strokeWidth={1.6} />,
    title: 'Working Professionals',
    items: ['Industry Problem Solvers'],
  },
  {
    icon: <Sparkles className="icon" aria-hidden="true" strokeWidth={1.6} />,
    title: 'Independent Innovators',
    items: ['Builders & Makers'],
  },
  {
    icon: <FlaskConical className="icon" aria-hidden="true" strokeWidth={1.6} />,
    title: 'Researchers & Entrepreneurs',
    items: ['Research-Led Problem Solvers'],
  },
]

/** Lists the participant profiles for whom the program is designed. */

function WhoSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="who" ref={ref}>
      <div className="wrap">

        <h2 className="section-title reveal">Who Can <span className="title-hl">Participate?</span></h2>
        <p className="section-tagline section-tagline--center reveal">Open to all degrees and disciplines.</p>
        <p className="lede reveal">Students, freshers, professionals, independent innovators, and researchers are welcome to bring forward meaningful ideas and help turn them into working solutions.</p>
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
// 6. WHAT WE ENGINEER
// ==========================================

function EngineeringShowcase() {
  const ref = useScrollReveal(0.08, '.engineering-showcase__animate', 'is-visible')

  return (
    <section id="engineering-showcase" ref={ref} className="engineering-showcase" aria-label="What We Engineer at VConnectTech Systems">
      <h2 className="sr-only">What We Engineer</h2>
      <svg className="engineering-showcase__artwork" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Four engineering capabilities connected by a cross-functional team">
        <desc>Four engineering disciplines connected around a cross-functional team.</desc>
        <defs>
          <filter id="engineering-ribbon-shadow" x="-15%" y="-25%" width="130%" height="160%"><feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#173963" floodOpacity=".12" /></filter>
          <clipPath id="engineering-embedded-clip"><path d="M0 0 H49 C193 83 370 200 629 333 C510 409 322 505 0 548 Z" /></clipPath>
          <clipPath id="engineering-fpga-clip"><path d="M1672 0 H1623 C1478 83 1300 200 1044 333 C1162 409 1350 505 1672 548 Z" /></clipPath>
          <clipPath id="engineering-board-clip"><path d="M0 620 C130 610 250 579 346 542 L676 772 C558 857 419 913 269 941 H0 Z" /></clipPath>
          <clipPath id="engineering-product-clip"><path d="M1672 620 C1542 610 1421 579 1314 542 L982 772 C1101 857 1241 913 1403 941 H1672 Z" /></clipPath>
          <path id="engineering-embedded-copy" d="M108 559 C264 545 443 486 594 391" />
          <path id="engineering-fpga-copy" d="M1078 389 C1229 486 1408 545 1564 559" />
          <path id="engineering-board-copy" d="M374 913 C478 873 567 822 648 766" />
          <path id="engineering-system-copy" d="M1024 767 C1106 824 1195 874 1298 914" />
        </defs>

        <rect width="1672" height="941" fill="#fff" />

        <g className="engineering-showcase__photos" aria-hidden="true">
          <g className="engineering-showcase__photo engineering-showcase__photo--left engineering-showcase__animate" clipPath="url(#engineering-embedded-clip)">
            <image href={engineeringEmbeddedImage} x="0" y="0" width="650" height="548" preserveAspectRatio="xMidYMid slice" />
            <path d="M0 0 H49 C193 83 370 200 629 333 C510 409 322 505 0 548 Z" />
          </g>
          <g className="engineering-showcase__photo engineering-showcase__photo--right engineering-showcase__animate" clipPath="url(#engineering-fpga-clip)">
            <image href={engineeringFpgaImage} x="1022" y="0" width="650" height="548" preserveAspectRatio="xMidYMid slice" />
            <path d="M1672 0 H1623 C1478 83 1300 200 1044 333 C1162 409 1350 505 1672 548 Z" />
          </g>
          <g className="engineering-showcase__photo engineering-showcase__photo--left engineering-showcase__photo--lower engineering-showcase__animate" clipPath="url(#engineering-board-clip)">
            <image href={engineeringBoardImage} x="0" y="542" width="676" height="399" preserveAspectRatio="xMidYMid slice" />
            <path d="M0 620 C130 610 250 579 346 542 L676 772 C558 857 419 913 269 941 H0 Z" />
          </g>
          <g className="engineering-showcase__photo engineering-showcase__photo--right engineering-showcase__photo--lower engineering-showcase__animate" clipPath="url(#engineering-product-clip)">
            <image href={engineeringProductImage} x="982" y="542" width="690" height="399" preserveAspectRatio="xMidYMid slice" />
            <path d="M1672 620 C1542 610 1421 579 1314 542 L982 772 C1101 857 1241 913 1403 941 H1672 Z" />
          </g>
        </g>

        <g className="engineering-showcase__ribbons engineering-showcase__animate" filter="url(#engineering-ribbon-shadow)" aria-hidden="true">
          <path className="engineering-showcase__ribbon engineering-showcase__ribbon--left" d="M44 0 C196 84 374 205 629 333 C532 397 429 458 330 504 C236 548 127 578 0 588 V610 C136 599 253 568 353 522 C457 474 565 410 675 335 C566 252 397 137 214 29 L165 0 Z" fill="#fff" />
          <path className="engineering-showcase__ribbon engineering-showcase__ribbon--right" d="M1628 0 C1477 84 1299 205 1044 333 C1140 397 1244 458 1342 504 C1437 548 1545 578 1672 588 V610 C1536 599 1419 568 1319 522 C1215 474 1107 410 997 335 C1106 252 1275 137 1458 29 L1507 0 Z" fill="#fff" />
          <path className="engineering-showcase__ribbon engineering-showcase__ribbon--left engineering-showcase__ribbon--lower" d="M346 542 L676 772 C568 852 461 907 357 941 H268 C395 904 508 844 628 767 L326 556 Z" fill="#fff" />
          <path className="engineering-showcase__ribbon engineering-showcase__ribbon--right engineering-showcase__ribbon--lower" d="M1314 542 L982 772 C1091 852 1198 907 1314 941 H1404 C1277 904 1164 844 1044 767 L1334 556 Z" fill="#fff" />
        </g>

        <image className="engineering-showcase__team-image engineering-showcase__animate engineering-showcase__animate--team" href={engineeringTeamImage} x="526" y="250" width="620" height="266" preserveAspectRatio="xMidYMid meet" aria-hidden="true" />

        <g className="engineering-showcase__body-copy engineering-showcase__animate engineering-showcase__animate--copy">
          <g fill="#fff">
            <rect x="32" y="264" width="28" height="3" fill="#087df2" />
            <text className="engineering-showcase__heading" x="32" y="305" fontSize="25" fontWeight="700">Embedded Systems</text><text className="engineering-showcase__heading" x="32" y="337" fontSize="25" fontWeight="700">&amp; Firmware</text>
            <text x="32" y="372" fontSize="15" fontWeight="500">Build dependable embedded platforms</text><text x="32" y="395" fontSize="15" fontWeight="500">from low-level firmware through</text><text x="32" y="418" fontSize="15" fontWeight="500">complete system integration.</text>
            <rect x="1612" y="264" width="28" height="3" fill="#087df2" />
            <text className="engineering-showcase__heading" x="1640" y="305" fontSize="25" fontWeight="700" textAnchor="end">FPGA Design</text><text className="engineering-showcase__heading" x="1640" y="337" fontSize="25" fontWeight="700" textAnchor="end">&amp; Verification</text>
            <text x="1640" y="372" fontSize="15" fontWeight="500" textAnchor="end">Design, verify, and validate</text><text x="1640" y="395" fontSize="15" fontWeight="500" textAnchor="end">programmable hardware for</text><text x="1640" y="418" fontSize="15" fontWeight="500" textAnchor="end">demanding real-world applications.</text>
            <rect x="32" y="682" width="28" height="3" fill="#087df2" />
            <text className="engineering-showcase__heading" x="32" y="720" fontSize="25" fontWeight="700">Board Design &amp;</text><text className="engineering-showcase__heading" x="32" y="752" fontSize="25" fontWeight="700">Hardware Engineering</text>
            <text x="32" y="788" fontSize="15" fontWeight="500">Take electronics from schematic and</text><text x="32" y="811" fontSize="15" fontWeight="500">PCB design through prototype bring-up</text><text x="32" y="834" fontSize="15" fontWeight="500">and validation.</text>
            <rect x="1612" y="682" width="28" height="3" fill="#087df2" />
            <text className="engineering-showcase__heading" x="1640" y="720" fontSize="25" fontWeight="700" textAnchor="end">System &amp; Product</text><text className="engineering-showcase__heading" x="1640" y="752" fontSize="25" fontWeight="700" textAnchor="end">Engineering</text>
            <text x="1640" y="788" fontSize="15" fontWeight="500" textAnchor="end">Turn engineering concepts into</text><text x="1640" y="811" fontSize="15" fontWeight="500" textAnchor="end">integrated, tested, and</text><text x="1640" y="834" fontSize="15" fontWeight="500" textAnchor="end">product-ready solutions.</text>
          </g>

          <g className="engineering-showcase__technical-copy" fill="#062653" fontSize="10.4" fontWeight="500"><text textLength="460" lengthAdjust="spacingAndGlyphs"><textPath href="#engineering-embedded-copy">● Embedded Firmware • BSP &amp; Device Drivers • RTOS &amp; Middleware • System Integration</textPath></text><text textLength="460" lengthAdjust="spacingAndGlyphs"><textPath href="#engineering-fpga-copy">● FPGA Design (RTL) • Verification &amp; Validation • IP Development • High-Speed Interfaces</textPath></text><text textLength="265" lengthAdjust="spacingAndGlyphs"><textPath href="#engineering-board-copy">● Power &amp; Signal Integrity • Prototyping • Hardware Validation</textPath></text><text textLength="265" lengthAdjust="spacingAndGlyphs"><textPath href="#engineering-system-copy">● System Architecture • Prototype Development • Integration &amp; Testing</textPath></text></g>

          <text className="engineering-showcase__heading" x="836" y="565" fill="#062653" fontSize="20" fontWeight="700" textAnchor="middle">Cross-functional team</text>
          <text x="836" y="592" fill="#62718b" fontSize="15" fontWeight="500" textAnchor="middle">Balanced teams of 5–8 members</text>
          <g fill="none" stroke="#087df2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <g transform="translate(657 625)"><rect x="10" y="10" width="25" height="25" rx="2" /><path d="M16 5v6m7-6v6m7-6v6m7 5h6m-6 8h6m-6 8h6M16 35v6m7-6v6m7-6v6M5 16h6m-6 8h6m-6 8h6" /><rect x="18" y="18" width="9" height="9" /></g>
            <g transform="translate(732 625)"><rect x="6" y="8" width="34" height="28" rx="3" /><path d="m17 18-5 5 5 5m12-10 5 5-5 5m-7 3 4-16" /></g>
            <g transform="translate(808 625)"><path d="m23 6 15 8v18l-15 8-15-8V14zM8 14l15 8 15-8M23 22v18" /></g>
            <g transform="translate(883 625)"><rect x="9" y="10" width="31" height="31" rx="3" /><path d="M17 6v8m15-8v8M15 21h19m-19 7h12m-12 6h8" /></g>
            <g transform="translate(959 625)"><path d="M8 40h34M12 40V26h8v14m5 0V18h8v22m5 0V8h8v32" /></g>
          </g>
          <g className="engineering-showcase__technical-copy" fill="#062653" fontSize="11" fontWeight="500" textAnchor="middle"><text x="680" y="684">Hardware</text><text x="755" y="684">Software</text><text x="831" y="684">Product</text><text x="906" y="684">Project</text><text x="982" y="684">Business</text></g>
          <text className="engineering-showcase__display" x="836" y="128" fill="#062653" fontSize="64" fontWeight="700" textAnchor="middle" letterSpacing="-2.3">What We <tspan fill="#087df2">Engineer</tspan></text>
          <text className="engineering-showcase__heading" x="836" y="184" fill="#062653" fontSize="27" fontWeight="700" textAnchor="middle">At VConnectTech Systems.</text>
        </g>
      </svg>

      <div className="engineering-showcase__mobile">
        <h2 className="engineering-showcase__animate">What We <span>Engineer</span></h2><p className="engineering-showcase__animate">At VConnectTech Systems.</p>
        <article className="engineering-showcase__animate"><img src={engineeringEmbeddedImage} alt="" aria-hidden="true" /><h3>Embedded Systems &amp; Firmware</h3><p>Build dependable embedded platforms from low-level firmware through complete system integration.</p><p className="engineering-showcase__capabilities">Embedded Firmware • BSP &amp; Device Drivers • RTOS &amp; Middleware • System Integration</p></article>
        <article className="engineering-showcase__animate"><img src={engineeringFpgaImage} alt="" aria-hidden="true" /><h3>FPGA Design &amp; Verification</h3><p>Design, verify, and validate programmable hardware for demanding real-world applications.</p><p className="engineering-showcase__capabilities">FPGA Design (RTL) • Verification &amp; Validation • IP Development • High-Speed Interfaces</p></article>
        <div className="engineering-showcase__mobile-team engineering-showcase__animate"><img src={engineeringTeamImage} alt="A cross-functional engineering team collaborating around a table" /><h3>Cross-functional team</h3><p>Balanced teams of 5–8 members</p></div>
        <article className="engineering-showcase__animate"><img src={engineeringBoardImage} alt="" aria-hidden="true" /><h3>Board Design &amp; Hardware Engineering</h3><p>Take electronics from schematic and PCB design through prototype bring-up and validation.</p><p className="engineering-showcase__capabilities">Power &amp; Signal Integrity • Prototyping • Hardware Validation</p></article>
        <article className="engineering-showcase__animate"><img src={engineeringProductImage} alt="" aria-hidden="true" /><h3>System &amp; Product Engineering</h3><p>Turn engineering concepts into integrated, tested, and product-ready solutions.</p><p className="engineering-showcase__capabilities">System Architecture • Prototype Development • Integration &amp; Testing</p></article>
      </div>
    </section>
  )
}

// ==========================================
// 7. INNOVATION DOMAINS
// ==========================================

/** Presents the engineering domains available to hackathon teams. */

function DomainsSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="domains" ref={ref}>
      <div className="wrap">

        <h2 className="section-title reveal">Focus <span className="title-hl">Domains</span></h2>
        <p className="section-tagline reveal">Build where engineering creates impact.</p>
        <p className="lede reveal">Projects may address these example domains or another emerging engineering challenge with meaningful real-world potential.</p>
        <figure className="focus-domains-showcase reveal">
          <img
            src={focusDomainsShowcase}
            alt="Engineering focus domains including embedded systems, FPGA verification, board design, system integration, automotive electronics, industrial automation, and IoT connectivity"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}

// ==========================================
// 8. YOUR JOURNEY
// ==========================================

const steps = [
  { num: '01', label: 'Idea Submission', desc: 'Submit your problem, solution, concept, and expected impact.', icon: 'abstract', left: '6%', top: '84%', iconTop: '71%' },
  { num: '02', label: 'Screening', desc: 'Ideas are evaluated for value, feasibility, innovation, and impact.', icon: 'report', left: '20%', top: '74%', iconTop: '61%' },
  { num: '03', label: 'Team Formation', desc: 'Cross-functional teams are formed around selected projects.', icon: 'presentation', left: '32%', top: '66%', iconTop: '53%' },
  { num: '04', label: 'Enablement', desc: 'We provide resources, tools, infrastructure, and mentorship.', icon: 'bootcamp', left: '45%', top: '56%', iconTop: '43%' },
  { num: '05', label: 'Build & Develop', desc: 'Build, integrate, test, and validate during the two-month Engineering Marathon.', icon: 'prototype', left: '60%', top: '46%', iconTop: '33%' },
  { num: '06', label: 'Final Demo', desc: 'Present a live demo for engineering, product, business, and jury validation.', icon: 'demo', left: '76%', top: '32%', iconTop: '19%' },
  { num: '07', label: 'Recognition & Next Steps', desc: 'Unlock awards, opportunities, incubation, or potential pilot projects.', icon: 'hired', left: '88%', top: '20%', final: true },
]

const summary = [
  { value: '7', label: 'Journey Stages', icon: 'summit' },
  { value: '2', label: 'Months to Build', icon: 'target' },
  { value: '5–8', label: 'Team Members', icon: 'opportunities' },
  { value: 'Impact', label: 'The Destination', icon: 'trophy' },
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

/** Visualizes the participant journey from application through completion. */

function JourneySection() {
  const ref = useScrollReveal(0.12)
  const [activeStepIndex, setActiveStepIndex] = useState(6)
  const [userInteracted, setUserInteracted] = useState(false)

  // Advance the journey automatically until direct interaction gives the visitor control.

  useEffect(() => {
    if (userInteracted) return
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % steps.length)
    }, 2800)
    // Clear the interval whenever interaction state changes or the section unmounts.

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
        <p className="section-tagline reveal">One problem. One team. Real impact.</p>
        <p className="lede reveal">Move from idea submission and screening through team formation, enablement, hands-on development, a final demo, and meaningful next steps.</p>

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
              <img src={mountainImage} alt="A mountain ascent representing the innovation journey" decoding="async" />

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
// 9. PROGRAM OUTCOMES
// ==========================================

function ProgramOutcomes() {
  return (
    <>
      <div className="prizes-pill-badge prizes-reveal">
        <Trophy size={14} className="badge-icon" />
        <span>RECOGNITION &amp; NEXT STEPS</span>
      </div>

      <h2 className="prizes-title prizes-reveal">
        Marathon <span className="title-hl">Outcomes</span>
      </h2>
      <p className="prizes-tagline prizes-reveal">
        Turn a working prototype into meaningful opportunities.
      </p>

      <div className="prize-stage" aria-label="Engineering Marathon recognition">
        <article className="prize-award-card runner-card prizes-reveal">
          <span className="top-badge-circle silver-badge" aria-hidden="true"><Trophy size={25} strokeWidth={1.8} /></span>
          <div className="rank-label-wrap">
            <span className="rank-line" />
            <p className="prize-rank">RUNNER-UP</p>
            <span className="rank-line" />
          </div>
          <p className="prize-amount">₹75,000</p>
          <div className="podium-graphic-wrap">
            <img src={imgSilverTrophyPodium} alt="Silver recognition trophy" className="real-podium-img" decoding="async" />
          </div>
        </article>

        <article className="prize-award-card is-winner gold-card prizes-reveal">
          <span className="top-badge-circle gold-badge" aria-hidden="true"><Trophy size={27} strokeWidth={1.8} /></span>
          <div className="rank-label-wrap winner-rank-wrap">
            <span className="rank-line gold-line" />
            <p className="prize-rank gold-rank">WINNER</p>
            <span className="rank-line gold-line" />
          </div>
          <p className="prize-amount winner-amount">₹1,50,000</p>
          <div className="podium-graphic-wrap">
            <img src={imgGoldTrophyPodium} alt="Gold recognition trophy" className="real-podium-img" decoding="async" />
          </div>
        </article>

        <article className="prize-award-card second-runner-card prizes-reveal">
          <span className="top-badge-circle bronze-badge" aria-hidden="true"><Trophy size={25} strokeWidth={1.8} /></span>
          <div className="rank-label-wrap">
            <span className="rank-line" />
            <p className="prize-rank">SECOND RUNNER-UP</p>
            <span className="rank-line" />
          </div>
          <p className="prize-amount">₹50,000</p>
          <div className="podium-graphic-wrap">
            <img src={imgBronzeTrophyPodium} alt="Bronze recognition trophy" className="real-podium-img" decoding="async" />
          </div>
        </article>
      </div>
    </>
  )
}

// ==========================================
// 10. REWARDS AND BENEFITS
// ==========================================

function RewardsAndBenefits() {
  return (
    <div className="prizes-perks-row prizes-reveal" aria-label="Engineering Marathon outcomes">
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Recognition &amp; Awards</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Internship &amp; Job Opportunities</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Potential Incubation &amp; Support</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Industry Pilots &amp; Collaborations</span>
      </div>
      <div className="prize-perk-pill">
        <Check size={14} className="perk-check-icon" />
        <span>Real-World Impact</span>
      </div>
    </div>
  )
}

/** Presents recognition and potential next-step outcomes. */

function OutcomesSection() {
  const sectionRef = useScrollReveal(0.1, '.prizes-reveal', 'is-visible')

  return (
    <section id="outcomes" className="prizes-section" ref={sectionRef}>
      <div className="prizes-container">
        <ProgramOutcomes />
        <RewardsAndBenefits />
      </div>
    </section>
  )
}

// ==========================================
// 11. WHY JOIN
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

/**
 * Renders one illustrated reason to join the program.
 *
 * @param {Object} props
 * @param {string} props.className - Optional visual variant.
 * @param {React.ReactNode} props.icon - Decorative feature icon.
 * @param {string} props.title - Feature heading.
 * @param {string} props.image - Supporting image source.
 * @param {string} props.imagePosition - Optional image focal position.
 */

function FeatureCard({ className = '', icon, title, image, imagePosition }) {
  return (
    <article className={`why-feature-card ${className} reveal`}>
      <div className="why-feature-heading">
        <span className="why-feature-icon">{whyIcons[icon]}</span>
        <h3>{title}</h3>
      </div>
      <img src={image} alt={`${title} during the Engineering Marathon`} decoding="async" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
    </article>
  )
}

/** Presents the principal benefits of joining the Engineering Marathon. */

function WhyJoinSection() {
  const ref = useScrollReveal(0.1)

  return (
    <section id="why" ref={ref}>
      <div className="wrap">


        <div className="why-layout">
          <div className="why-copy reveal">
            <h2>Why <span className="title-hl">Participate?</span></h2>
            <p className="why-tagline">Turn your idea into a real-world prototype.</p>
            <span className="why-copy-rule" aria-hidden="true" />
            <p>Work with cross-functional teams, access cutting-edge tools and infrastructure, learn from industry mentors, showcase your talent on a larger platform, and explore opportunities for future collaboration and career growth.</p>
            <span className="why-dot-pattern" aria-hidden="true" />
          </div>

          <div className="why-rail why-rail-left">
            <FeatureCard icon="project" title="Real-World Prototype" image={projectImage} imagePosition="center 54%" />
            <FeatureCard icon="career" title="Future Opportunities" image={careerImage} imagePosition="center" />
          </div>

          <div className="why-center">
            <div className="why-main-visual reveal">
              <div className="why-main-image">
                <img src={workshopImage} alt="Engineering students collaborating on a robotics prototype" decoding="async" />
              </div>
              <div className="why-mini-photo why-mini-photo-top" aria-hidden="true">
                <img src={engineeringTeam} alt="" decoding="async" />
              </div>
              <div className="why-mini-photo why-mini-photo-bottom" aria-hidden="true">
                <img src={productTeamImage} alt="" decoding="async" />
              </div>
              <p className="why-hand-note">
                From concept.<br />To real impact.
                <svg className="why-hand-arrow" viewBox="0 0 32 54" fill="none" aria-hidden="true">
                  <path d="M8 3c10 13 12 29 4 43" />
                  <path d="m5 39 7 7 8-6" />
                </svg>
              </p>
            </div>

            <FeatureCard className="why-network-card" icon="network" title="Industry Mentorship" image={networkingImage} imagePosition="center 43%" />
          </div>

          <div className="why-rail why-rail-right">
            <FeatureCard icon="prototype" title="Advanced Tools & Infrastructure" image={prototypeImage} imagePosition="center" />
            <FeatureCard className="why-prize-card" icon="prize" title="Showcase Your Talent" image={prizeImage} imagePosition="center 44%" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 12. WHAT WE PROVIDE
// ==========================================

const careerFeats = [
  { title: 'Development Equipment & Tools', icon: <Settings className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Workspace & Lab Infrastructure', icon: <FlaskConical className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Technical Architecture Guidance', icon: <Target className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Mentorship from Industry Experts', icon: <UsersRound className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Compute & Test Infrastructure', icon: <Monitor className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Access to Advanced Tools', icon: <Sparkles className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Support for Testing & Validation', icon: <Check className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Support for Productization', icon: <Box className="icon" aria-hidden="true" strokeWidth={1.6} /> },
  { title: 'Industry Connect & Exposure', icon: <TrendingUp className="icon" aria-hidden="true" strokeWidth={1.6} /> },
]

const buildStages = [
  { title: 'Idea', image: buildIdeaImage, className: 'build-showcase-callout--idea', alt: 'Early product concept sketches' },
  { title: 'Architecture', image: buildArchitectureImage, className: 'build-showcase-callout--architecture', alt: 'System architecture diagram' },
  { title: 'Design', image: buildDesignImage, className: 'build-showcase-callout--design', alt: 'Electronic circuit board design' },
  { title: 'Prototype', image: buildPrototypeImage, className: 'build-showcase-callout--prototype', alt: 'Engineering prototype under test' },
  { title: 'Impact', image: buildImpactImage, className: 'build-showcase-callout--impact', alt: 'Connected product deployed in the field' },
]

/** Lists the practical support supplied to selected teams. */

function CareerSection() {
  const ref = useScrollReveal(0.12)

  return (
    <section id="career" ref={ref}>
      <div className="wrap">
        <div className="career-split-grid">
          <div className="career-content-col reveal">
            <h2 className="career-main-title">What We Provide</h2>
            <h3 className="career-subtitle">Everything your team needs to build.</h3>
            <span className="career-accent-rule" aria-hidden="true" />
            <p className="career-description">
              Selected teams receive access to advanced tools, technical guidance, testing and validation support, productization support, and the VConnecTech industry ecosystem.
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
                  alt="VConnecTech engineers providing technical mentorship and prototype support"
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

/** Shows how an idea progresses through architecture, design, prototype, and impact. */

function BuildOutputSection() {
  const ref = useScrollReveal(0.1)

  return (
    <section id="build-output" className="build-showcase-section" ref={ref}>
      <div className="wrap">
        <div className="build-showcase-visual reveal">
          <header className="build-showcase-heading">
            <div>
              <p>From Concept to Real-World Impact</p>
              <h2>What You Will <span>Build</span></h2>
            </div>
            <span className="build-showcase-heading-rule" aria-hidden="true" />
            <p className="build-showcase-intro">From idea to a working prototype that solves real-world problems and creates value.</p>
          </header>

          <div className="build-showcase-stage">
            <img className="build-showcase-main-image" src={buildMainProductImage} alt="A working connected hardware prototype developed from engineering drawings" decoding="async" />

            <svg className="build-showcase-connectors" viewBox="0 0 1536 614" preserveAspectRatio="none" aria-hidden="true">
              <path d="M307 88 H412 L501 195" pathLength="1" />
              <path d="M291 329 H377 L420 311" pathLength="1" />
              <path d="M566 420 L610 392" pathLength="1" />
              <path d="M1190 89 H1101 L1010 206" pathLength="1" />
              <path d="M1183 329 H1121 L1090 361" pathLength="1" />
              <circle cx="307" cy="88" r="4" /><circle cx="501" cy="195" r="4" />
              <circle cx="291" cy="329" r="4" /><circle cx="420" cy="311" r="4" />
              <circle cx="566" cy="420" r="4" /><circle cx="610" cy="392" r="4" />
              <circle cx="1190" cy="89" r="4" /><circle cx="1010" cy="206" r="4" />
              <circle cx="1183" cy="329" r="4" /><circle cx="1090" cy="361" r="4" />
            </svg>

            <div className="build-showcase-callouts">
              {buildStages.map((stage) => (
                <figure className={`build-showcase-callout ${stage.className}`} key={stage.title}>
                  <img src={stage.image} alt={stage.alt} decoding="async" />
                  <figcaption>{stage.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==========================================
// 13. REGISTRATION CTA
// ==========================================

/** Provides registration details and primary enrollment actions. */

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
                START YOUR ENGINEERING MARATHON
              </div>
              <h2 className="register-title">
                Ready to <span className="register-title-hl">build the future?</span>
              </h2>
              <p className="register-lede">
                Bring your idea. Join the Engineering Marathon. Let’s engineer impact together.
              </p>



              <div className="register-cta-wrap">
                <a href="mailto:marathon@vconnectechsystems.com?subject=Engineering%20Marathon%20Registration" className="register-btn-primary">
                  <span>Register Now</span>
                  <ArrowRight className="register-btn-arrow" aria-hidden="true" strokeWidth={2.2} />
                </a>
              </div>
            </div>

            <div className="register-qr-col">
              <div className="register-qr-card">
                <div className="qr-img-wrapper">
                  <img src={qrCodeImg} alt="Register QR Code" className="qr-code-img" decoding="async" />
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
// MAIN HACKATHON PAGE COMPONENT
// ==========================================

/** Composes every hackathon section into the complete program page. */

export default function Hackathon() {
  return (
    <main className="hackathon-page">
      <HeroSection />
      <AboutSection />
      <WhoSection />
      <EngineeringShowcase />
      <DomainsSection />
      <JourneySection />
      <OutcomesSection />
      <WhyJoinSection />
      <CareerSection />
      <BuildOutputSection />
      <RegisterSection />
    </main>
  )
}
