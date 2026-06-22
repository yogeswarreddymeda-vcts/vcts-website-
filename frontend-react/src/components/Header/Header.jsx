import { useEffect, useState, useRef } from 'react';
import './Header.css';
import logo from '../../assets/image/header_footer_img/New Logo Light.png';

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
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3">
      <div className="container-fluid">
        {/* logo */}
        <a 
          className="navbar-brand d-flex align-items-center py-0" 
          href="#"
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
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#vctsNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="vctsNavbar">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
                href="#"
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
                className={`nav-link dropdown-toggle ${(currentPage === 'vlsi' || currentPage === 'embedded') ? 'active' : ''} ${dropdownOpen ? 'show' : ''}`} 
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
                    href="#"
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
                    href="#"
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
              </ul>
            </li>

            <li className="nav-item"><a className="nav-link" href="#">Technologies</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Industries</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Careers</a></li>
            <li className="nav-item me-2"><a className="nav-link" href="#">Contact Us</a></li>
            <li className="nav-item">
              <div className="magnetic-btn-anchor" ref={btnRef}>
                <a className="btn btn-vcts-primary py-2 px-4" href="#">Talk to Experts <i className="bi bi-arrow-right ms-1"></i></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}