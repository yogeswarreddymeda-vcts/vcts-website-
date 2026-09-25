/**
 * Site Footer
 *
 * Provides company information, navigation groups, service links,
 * industry links, contact details, and legal information.
 */

import logo from '../../assets/image/header_footer_img/footer_logo.webp';
import './Footer.css';

/**
 * @param {Object} props
 * @param {(page: string, targetId?: string) => void} props.setCurrentPage - Updates the active client-side page and optional section target.
 */

export default function Footer({ setCurrentPage }) {
  const navigate = (event, page) => {
    event.preventDefault();
    if (!page) return;
    setCurrentPage(page, 'top');
  };

  const navigatePage = (event, page) => {
    event.preventDefault();
    if (!page) return;
    setCurrentPage(page);
  };


  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="footer-content">
        <div className="footer-grid">

          {/* Company identity and social channels */}

          <section className="footer-brand" aria-label="Company information">
            <div
              className="footer-logo"
              role="button"
              tabIndex="0"
              onClick={(event) => navigatePage(event, 'home')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  navigatePage(event, 'home');
                }
              }}
            >
              <img src={logo} alt="VConnectTech Logo" className="footer-logo-img" decoding="async" />
            </div>
            <p className="footer-description">
              Engineering intelligent systems through semiconductor design and verification services for a smarter tomorrow.
            </p>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/vconnectech-systems-private-limited/?originalSubdomain=in" className="social-icon" aria-label="VConnecTech Systems on LinkedIn" target="_blank" rel="noreferrer">
                <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://www.instagram.com/vconnectechsystems/" className="social-icon" aria-label="VConnecTech Systems on Instagram" target="_blank" rel="noreferrer">
                <svg fill="currentColor" viewBox="0 0 448 512" width="18" height="18"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141Zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7Zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8Zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S3.3 127.5 1.5 163.4c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8ZM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1Z" /></svg>
              </a>
            </div>
          </section>

          {/* Primary website navigation */}

          <nav className="footer-column" aria-label="Quick links">
            <h3 className="column-title">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              Quick Links
            </h3>
            <ul className="links-list">
              <li>
                <a
                  href="/"
                  onClick={(event) => navigatePage(event, 'home')}
                >
                  Home <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(event) => navigatePage(event, 'about')}
                >
                  About Us <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/technologies"
                  onClick={(event) => navigatePage(event, 'technologies')}
                >
                  Technologies <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/hackathon"
                  onClick={(event) => navigatePage(event, 'hackathon')}
                >
                  Marathon <span className="chevron">&gt;</span>
                </a>
              </li>
              <li><a href="#">Industries <span className="chevron">&gt;</span></a></li>
              <li>
                <a
                  href="/careers"
                  onClick={(event) => navigatePage(event, 'careers')}
                >
                  Careers <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(event) => navigatePage(event, 'contact')}
                >
                  Contact Us <span className="chevron">&gt;</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Engineering service destinations */}

          <nav className="footer-column" aria-label="Services">
            <h3 className="column-title">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              Our Services
            </h3>
            <ul className="links-list">
              <li>
                <a
                  href="/vlsi#top"
                  onClick={(event) => navigate(event, 'vlsi')}
                >
                  VLSI Engineering <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/embedded#top"
                  onClick={(event) => navigate(event, 'embedded')}
                >
                  Embedded Engineering <span className="chevron">&gt;</span>
                </a>
              </li>
              <li>
                <a
                  href="/edgeai#top"
                  onClick={(event) => navigate(event, 'edgeai')}
                >
                  Edge AI Engineering <span className="chevron">&gt;</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Industries served by the company */}

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

          {/* Direct contact information */}

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
            </ul>
          </address>
        </div>

        {/* Legal information and policy links */}

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
