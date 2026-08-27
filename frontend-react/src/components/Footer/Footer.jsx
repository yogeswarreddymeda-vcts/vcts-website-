import logo from '../../assets/image/header_footer_img/footer_logo.webp';
import './Footer.css';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="footer-content">
        <div className="footer-grid">

          {/* Column 1: Brand Logo & Socials */}
          <section className="footer-brand" aria-label="Company information">
            <div
              className="footer-logo"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img src={logo} alt="VConnectTech Logo" className="footer-logo-img" decoding="async" />
            </div>
            <p className="footer-description">
              Engineering intelligent systems through semiconductor design and verification services for a smarter tomorrow.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </section>

          {/* Column 2: Quick Links */}
          <nav className="footer-column" aria-label="Quick links">
            <h3 className="column-title">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              Quick Links
            </h3>
            <ul className="links-list">
              <li>
                <a 
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Home <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  About Us <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a 
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('home');
                    setTimeout(() => {
                      document.getElementById('our-services')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                >
                  Services <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/technologies"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('technologies');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Technologies <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/hackathon"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('hackathon');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Hackathon <span className="chevron">&gt;</span>
                </a>
              </li>
              <li><a href="#">Industries <span className="chevron">&gt;</span></a></li>
              <li>
                <a
                  href="/careers"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('careers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Careers <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Contact Us <span className="chevron">&gt;</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3: Our Services */}
          <nav className="footer-column" aria-label="Services">
            <h3 className="column-title">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              Our Services
            </h3>
            <ul className="links-list">
              <li>
                <a 
                  href="/vlsi"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('vlsi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  VLSI Engineering <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a 
                  href="/embedded"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('embedded');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Embedded Engineering <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/edgeai"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('edgeai');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Edge AI Engineering <span className="chevron">&gt;</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 4: Industries */}
          <nav className="footer-column" aria-label="Industries">
            <h3 className="column-title">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              Industries
            </h3>
            <ul className="links-list">
              <li><a href="#">Automotive <span className="chevron">&gt;</span></a></li>
              <li><a href="#">Healthcare <span className="chevron">&gt;</span></a></li>
              <li><a href="#">Industrial <span className="chevron">&gt;</span></a></li>
              <li><a href="#">Consumer Electronics <span className="chevron">&gt;</span></a></li>
              <li><a href="#">Communication <span className="chevron">&gt;</span></a></li>
              <li><a href="#">Aerospace & Defense <span className="chevron">&gt;</span></a></li>
            </ul>
          </nav>

          {/* Column 5: Contact Us */}
          <address className="footer-column footer-contact" aria-label="Contact Us">
            <h3 className="column-title">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Contact Us
            </h3>
            <ul className="contact-list">
              <li>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00 2 2z"></path></svg>
                <a href="mailto:hr@vconnectech.in" style={{ color: '#ffffff' }}>hr@vconnectech.in</a>
              </li>
              <li>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="tel:+917032305762">+91 7032305762</a>
              </li>
              <li>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>VConnecTech Systems<br />4th floor, Plot No:6, Sector-3, HUDA Techno Enclave, Madhapur, Hyderabad, Telangana, India - 500081</span>
              </li>
            </ul>
            <div className="map-bg"></div>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>&copy; 2026 VConnect Tech Systems Pvt. Ltd. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
