import { useEffect, useState, useRef } from 'react';
import './Header.css';
import logo from '../../assets/image/header_footer_img/header_logo.png';

export default function Header({ currentPage, setCurrentPage }) {
  const btnRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
      const y = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 5;
      btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const handleMouseLeave = () => {
      btn.style.transform = 'translate3d(0,0,0)';
    };

    btn.addEventListener('mousemove', handleMouseMove, { passive: true });
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('#servicesDropdown') && !e.target.closest('.dropdown-menu')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const closeMenu = () => {
    // Close Dropdown in React state
    setDropdownOpen(false);

    // Close mobile navbar collapse if open
    const navbarCollapseEl = document.getElementById('vctsNavbar');
    if (navbarCollapseEl && navbarCollapseEl.classList.contains('show') && window.bootstrap) {
      const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top py-3 header-floating-nav">
      <div className="container-fluid header-nav-container">
        {/* Left Section: Logo block with diagonal cut */}
        <div className="header-logo-block">
          <a
            className="navbar-brand d-flex align-items-center py-0"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              closeMenu();
            }}
          >
            <img
              src={logo}
              alt="VConnectTech Logo"
              className="navbar-logo-img"
            />
          </a>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#vctsNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="vctsNavbar">
          {/* Middle Section: Pill navigation menu */}
          <div className="header-nav-pill-wrapper">
            <ul className="navbar-nav align-items-center gap-3">
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    closeMenu();
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>

              {/* Services Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${(currentPage === 'vlsi' || currentPage === 'embedded' || currentPage === 'edgeai') ? 'active' : ''} ${dropdownOpen ? 'show' : ''}`}
                  href="#"
                  id="servicesDropdown"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  aria-expanded={dropdownOpen}
                >
                  Services
                </a>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="servicesDropdown">
                  <li>
                    <a
                      className={`dropdown-item ${currentPage === 'vlsi' ? 'active' : ''}`}
                      href="/vlsi"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('vlsi');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        closeMenu();
                      }}
                    >
                      VLSI Engineering
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${currentPage === 'embedded' ? 'active' : ''}`}
                      href="/embedded"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('embedded');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        closeMenu();
                      }}
                    >
                      Embedded Engineering
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${currentPage === 'edgeai' ? 'active' : ''}`}
                      href="/edgeai"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('edgeai');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        closeMenu();
                      }}
                    >
                      Edge AI Engineering
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === 'technologies' ? 'active' : ''}`}
                  href="/technologies"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('technologies');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    closeMenu();
                  }}
                >
                  Technologies
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === 'hackathon' ? 'active' : ''}`}
                  href="/hackathon"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('hackathon');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    closeMenu();
                  }}
                >
                  Hackathon
                </a>
              </li>
              <li className="nav-item"><a className="nav-link" href="#">Industries</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Careers</a></li>
              <li className="nav-item header-contact-margin-desktop"><a className="nav-link" href="#">Contact Us</a></li>

              {/* Mobile Only Login Link */}
              <li className="nav-item header-mobile-only mt-2 w-100">
                <a className="nav-link mobile-login-link d-flex align-items-center justify-content-center py-2" href="#">
                  <svg className="login-icon-mobile me-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Log In
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section: Blue block with chevron cut (Desktop Only) */}
          <div className="header-login-block-wrapper header-desktop-only">
            <div className="header-login-block">
              <a href="#" className="login-btn">
                <svg className="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Log In</span>
                <svg className="login-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
