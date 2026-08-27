import { useCallback, useEffect, useRef, useState } from 'react';
import './Header.css';
import logo from '../../assets/image/header_footer_img/header_logo.webp';

const services = [
  {
    page: 'vlsi',
    href: '/vlsi',
    label: 'VLSI Engineering',
    eyebrow: 'VLSI ENGINEERING',
    title: 'End-to-End Silicon Engineering',
    description: 'Design, verification, and implementation expertise across the complete chip lifecycle.',
    cta: 'Explore VLSI Engineering',
  },
  {
    page: 'embedded',
    href: '/embedded',
    label: 'Embedded Engineering',
    eyebrow: 'EMBEDDED ENGINEERING',
    title: 'Reliable Embedded Systems',
    description: 'Integrated hardware and firmware engineered for dependable real-world performance.',
    cta: 'Explore Embedded Engineering',
  },
  {
    page: 'edgeai',
    href: '/edgeai',
    label: 'Edge AI Engineering',
    eyebrow: 'EDGE AI ENGINEERING',
    title: 'Intelligence at the Edge',
    description: 'Optimized AI solutions spanning model development, hardware acceleration, and edge deployment.',
    cta: 'Explore Edge AI Engineering',
  },
];

const ChevronDown = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
    <path d="m4 6 4 4 4-4" />
  </svg>
);

const ArrowRight = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 18 18" aria-hidden="true">
    <path d="M3 9h12M10.5 4.5 15 9l-4.5 4.5" />
  </svg>
);

export default function Header({ currentPage, setCurrentPage }) {
  const headerRef = useRef(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [activeCompanyCategory, setActiveCompanyCategory] = useState('about');
  const [activeCategory, setActiveCategory] = useState('services');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  const clearTimers = useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    window.clearTimeout(closeTimerRef.current);
  }, []);

  const closeAll = useCallback(() => {
    clearTimers();
    setMegaOpen(false);
    setCompanyOpen(false);
    setMobileOpen(false);
    setMobileSection(null);
  }, [clearTimers]);

  const openMegaWithDelay = () => {
    window.clearTimeout(closeTimerRef.current);
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      if (services.some((service) => service.page === currentPage)) {
        setActiveCategory('services');
      } else if (currentPage === 'technologies') {
        setActiveCategory('technologies');
      }
      setCompanyOpen(false);
      setMegaOpen(true);
    }, 120);
  };

  const openCompanyWithDelay = () => {
    window.clearTimeout(closeTimerRef.current);
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
      setCompanyOpen(true);
      setActiveCompanyCategory(currentPage === 'careers' ? 'careers' : 'about');
    }, 120);
  };

  const closeMenusWithDelay = () => {
    window.clearTimeout(openTimerRef.current);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
      setCompanyOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) closeAll();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeAll();
    };

    const handlePopState = () => closeAll();

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      clearTimers();
    };
  }, [clearTimers, closeAll]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const navigate = (event, page) => {
    event.preventDefault();
    closeAll();
    if (!page) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const toggleMobileSection = (section) => {
    setMobileSection((openSection) => (openSection === section ? null : section));
  };

  const whatWeDoActive = ['vlsi', 'embedded', 'edgeai', 'technologies'].includes(currentPage);
  const companyActive = ['about', 'careers'].includes(currentPage);
  return (
    <header
      className="site-header"
      ref={headerRef}
      onMouseEnter={() => window.clearTimeout(closeTimerRef.current)}
      onMouseLeave={closeMenusWithDelay}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenusWithDelay();
      }}
    >
      <nav className="primary-nav" aria-label="Primary navigation">
        <div className="header-container primary-nav-inner">
          <a
            className="brand-link"
            href="/"
            aria-label="VConnectTech Systems home"
            onClick={(event) => navigate(event, 'home')}
          >
            <img src={logo} alt="VConnectTech Systems" className="brand-logo" />
          </a>

          <div className="desktop-navigation">
            <a
              className={`desktop-nav-link ${currentPage === 'home' ? 'is-active' : ''}`}
              href="/"
              aria-current={currentPage === 'home' ? 'page' : undefined}
              onClick={(event) => navigate(event, 'home')}
            >
              Home
            </a>

            <div className="desktop-nav-group company-nav-group" onMouseEnter={openCompanyWithDelay}>
              <button
                type="button"
                className={`desktop-nav-link nav-trigger ${companyActive ? 'is-active' : ''} ${companyOpen ? 'is-open' : ''}`}
                aria-expanded={companyOpen}
                aria-controls="company-menu"
                onClick={() => {
                  clearTimers();
                  setMegaOpen(false);
                  setCompanyOpen((open) => !open);
                }}
              >
                Company <ChevronDown className="nav-chevron" />
              </button>
            </div>

            <div className="desktop-nav-group" onMouseEnter={openMegaWithDelay}>
              <button
                type="button"
                className={`desktop-nav-link nav-trigger ${whatWeDoActive ? 'is-active' : ''} ${megaOpen ? 'is-open' : ''}`}
                aria-expanded={megaOpen}
                aria-controls="what-we-do-menu"
                onClick={() => {
                  clearTimers();
                  if (services.some((service) => service.page === currentPage)) {
                    setActiveCategory('services');
                  } else if (currentPage === 'technologies') {
                    setActiveCategory('technologies');
                  }
                  setCompanyOpen(false);
                  setMegaOpen((open) => !open);
                }}
              >
                What We Do <ChevronDown className="nav-chevron" />
              </button>
            </div>

            <a
              className={`desktop-nav-link hackathon-nav-link ${currentPage === 'hackathon' ? 'is-active' : ''}`}
              href="/hackathon"
              aria-current={currentPage === 'hackathon' ? 'page' : undefined}
              onClick={(event) => navigate(event, 'hackathon')}
            >
              Hackathon
            </a>
            <a
              className={`desktop-nav-link ${currentPage === 'contact' ? 'is-active' : ''}`}
              href="/contact"
              aria-current={currentPage === 'contact' ? 'page' : undefined}
              onClick={(event) => navigate(event, 'contact')}
            >
              Contact Us
            </a>
          </div>

          <a className="login-link desktop-login" href="#" onClick={(event) => navigate(event, null)}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="6.4" r="3.2" />
              <path d="M3.8 17c.4-3.1 2.4-5 6.2-5s5.8 1.9 6.2 5" />
            </svg>
            Log In
          </a>

          <button
            type="button"
            className={`mobile-menu-button ${mobileOpen ? 'is-open' : ''}`}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mega-shell company-mega-shell ${companyOpen ? 'is-open' : ''}`} id="company-menu">
        <section className="mega-menu" aria-label="Company menu">
          <div className="header-container mega-menu-grid">
            <nav className="mega-index" aria-label="Company category">
              <button type="button" className={activeCompanyCategory === 'about' ? 'is-active' : ''} aria-current={currentPage === 'about' ? 'page' : undefined} onMouseEnter={() => setActiveCompanyCategory('about')} onFocus={() => setActiveCompanyCategory('about')} onClick={(event) => navigate(event, 'about')}>
                <span>About Us</span>
                <ArrowRight />
              </button>
              <button type="button" className={activeCompanyCategory === 'careers' ? 'is-active' : ''} aria-current={currentPage === 'careers' ? 'page' : undefined} onMouseEnter={() => setActiveCompanyCategory('careers')} onFocus={() => setActiveCompanyCategory('careers')} onClick={(event) => navigate(event, 'careers')}>
                <span>Careers</span>
                <ArrowRight />
              </button>
              <button type="button" className={activeCompanyCategory === 'blog' ? 'is-active' : ''} onMouseEnter={() => setActiveCompanyCategory('blog')} onFocus={() => setActiveCompanyCategory('blog')} onClick={() => setActiveCompanyCategory('blog')}>
                <span>Blog</span>
                <ArrowRight />
              </button>
            </nav>
            <aside className="mega-detail company-mega-detail" aria-label={`${activeCompanyCategory} section`}>
              <div className="mega-detail-copy">
                {activeCompanyCategory === 'careers' ? (
                  <>
                    <span className="mega-eyebrow">CAREERS AT VCONNECTTECH SYSTEMS</span>
                    <h2>Find your next opportunity.</h2>
                    <p>Build your career, work with great people, and make an impact on the engineering challenges that matter.</p>
                    <a href="/careers" onClick={(event) => navigate(event, 'careers')}>
                      Explore Careers <ArrowRight />
                    </a>
                  </>
                ) : activeCompanyCategory === 'blog' ? (
                  <>
                    <span className="mega-eyebrow">VCONNECTTECH INSIGHTS</span>
                    <h2>Ideas, insights, and engineering in motion.</h2>
                    <p>Explore practical perspectives on systems engineering, intelligent products, and the technologies shaping what comes next.</p>
                    <a href="#" onClick={(event) => event.preventDefault()}>
                      Explore the Blog <ArrowRight />
                    </a>
                  </>
                ) : (
                  <>
                    <span className="mega-eyebrow">ABOUT VCONNECTTECH SYSTEMS</span>
                    <h2>Engineering ideas into real-world impact.</h2>
                    <p>
                      Discover our purpose, engineering expertise, leadership, and the people building reliable
                      technology solutions for complex challenges.
                    </p>
                    <a href="/about" onClick={(event) => navigate(event, 'about')}>
                      Explore About Us <ArrowRight />
                    </a>
                  </>
                )}
              </div>
            </aside>
          </div>
        </section>
      </div>

      <div className={`mega-shell ${megaOpen ? 'is-open' : ''}`} id="what-we-do-menu">
        <section className="mega-menu" aria-label="What We Do menu">
          <div className="header-container mega-menu-grid">
            <nav className="mega-index" aria-label="What We Do categories">
              {['services', 'technologies', 'industries'].map((category) => (
                <button
                  type="button"
                  key={category}
                  className={activeCategory === category ? 'is-active' : ''}
                  aria-pressed={activeCategory === category}
                  onMouseEnter={() => setActiveCategory(category)}
                  onFocus={() => setActiveCategory(category)}
                  onClick={(event) => {
                    if (category === 'technologies') {
                      navigate(event, 'technologies');
                      return;
                    }
                    setActiveCategory(category);
                  }}
                >
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  <ArrowRight />
                </button>
              ))}
            </nav>

            {activeCategory === 'services' && (
              <div className="mega-services-overview" aria-live="polite">
                {services.map((service) => (
                  <article className="mega-service-summary" key={service.page}>
                    <span className="mega-eyebrow">{service.eyebrow}</span>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <a href={service.href} onClick={(event) => navigate(event, service.page)}>
                      {service.cta} <ArrowRight />
                    </a>
                  </article>
                ))}
              </div>
            )}

            {activeCategory === 'technologies' && (
              <div className="mega-overview">
                <div className="mega-overview-heading">
                  <span className="mega-eyebrow">TECHNOLOGY DOMAINS</span>
                  <h2>Engineering across the complete product stack</h2>
                  <p>Explore the architectures, platforms, tools, and standards used across our engineering practice.</p>
                </div>
                <a className="mega-overview-link" href="/technologies" onClick={(event) => navigate(event, 'technologies')}>
                  Explore Technologies <ArrowRight />
                </a>
              </div>
            )}

            {activeCategory === 'industries' && <div className="mega-detail" />}
          </div>
        </section>
      </div>

      <div className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`} id="mobile-navigation">
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="/" aria-current={currentPage === 'home' ? 'page' : undefined} onClick={(event) => navigate(event, 'home')}>Home</a>

          <div className="mobile-accordion">
            <button
              type="button"
              aria-expanded={mobileSection === 'company'}
              aria-controls="mobile-company-menu"
              onClick={() => toggleMobileSection('company')}
            >
              Company <ChevronDown />
            </button>
            <div className={`mobile-accordion-panel ${mobileSection === 'company' ? 'is-open' : ''}`} id="mobile-company-menu">
              <a href="/about" aria-current={currentPage === 'about' ? 'page' : undefined} onClick={(event) => navigate(event, 'about')}>About Us</a>
              <a href="/careers" aria-current={currentPage === 'careers' ? 'page' : undefined} onClick={(event) => navigate(event, 'careers')}>Careers</a>
              <a href="#" onClick={(event) => navigate(event, null)}>Blog</a>
            </div>
          </div>

          <div className="mobile-accordion">
            <button
              type="button"
              aria-expanded={mobileSection === 'what-we-do'}
              aria-controls="mobile-what-we-do-menu"
              onClick={() => toggleMobileSection('what-we-do')}
            >
              What We Do <ChevronDown />
            </button>
            <div className={`mobile-accordion-panel mobile-what-panel ${mobileSection === 'what-we-do' ? 'is-open' : ''}`} id="mobile-what-we-do-menu">
              <span className="mobile-group-label">Services</span>
              {services.map((service) => (
                <a key={service.page} href={service.href} aria-current={currentPage === service.page ? 'page' : undefined} onClick={(event) => navigate(event, service.page)}>
                  {service.label}
                </a>
              ))}
              <a className="mobile-category-link" href="/technologies" aria-current={currentPage === 'technologies' ? 'page' : undefined} onClick={(event) => navigate(event, 'technologies')}>Technologies</a>
              <a className="mobile-category-link" href="#" onClick={(event) => navigate(event, null)}>Industries</a>
            </div>
          </div>

          <a href="/hackathon" aria-current={currentPage === 'hackathon' ? 'page' : undefined} onClick={(event) => navigate(event, 'hackathon')}>Hackathon</a>
          <a href="/contact" aria-current={currentPage === 'contact' ? 'page' : undefined} onClick={(event) => navigate(event, 'contact')}>Contact Us</a>
          <a className="mobile-login-link" href="#" onClick={(event) => navigate(event, null)}>Log In <ArrowRight /></a>
        </nav>
      </div>
    </header>
  );
}
