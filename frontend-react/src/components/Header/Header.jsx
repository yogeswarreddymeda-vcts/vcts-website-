import { useEffect, useRef } from 'react';
import './Header.css';

export default function Header() {
  const btnRef = useRef(null);

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

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center fw-bold fs-4 text-dark" href="#" style={{ letterSpacing: '-0.5px' }}>
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
            <rect x="2" y="2" width="36" height="36" rx="4" stroke="#0A369D" strokeWidth="2.5" />
            <rect x="9" y="9" width="22" height="22" rx="2" stroke="#051B4E" strokeWidth="1.5" />
          </svg>
          <div>
            <span className="fw-bold fs-4 d-block lh-1" style={{ color: 'var(--deep-navy)' }}>VCTS</span>
            <span className="text-muted d-block" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Engineering Intelligence</span>
          </div>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#vctsNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="vctsNavbar">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
            <li className="nav-item"><a className="nav-link active" href="#">Services</a></li>
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
