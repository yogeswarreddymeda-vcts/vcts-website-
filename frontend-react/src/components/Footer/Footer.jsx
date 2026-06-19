import linkedInIcon from '../../assets/image/H ana F/Icon31.png';
import twitterIcon from '../../assets/image/H ana F/Icon32.png';
import youtubeIcon from '../../assets/image/H ana F/Icon33.png';
import logo from '../../assets/image/H ana F/New Logo Light.png';
import './Footer.css';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="footer-content">
        <div className="footer-grid">
          <section className="footer-brand" aria-label="Company information">
            <div 
              className="footer-logo" 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img src={logo} alt="VConnectTech Logo" className="footer-logo-img" />
            </div>
            <p className="footer-description">
              Engineering intelligent systems through semiconductor design and verification services for a smarter tomorrow.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="LinkedIn"><img src={linkedInIcon} alt="" /></a>
              <a href="#" className="social-link" aria-label="Twitter/X"><img src={twitterIcon} alt="" /></a>
              <a href="#" className="social-link" aria-label="YouTube"><img src={youtubeIcon} alt="" /></a>
            </div>
          </section>

          <nav className="footer-column" aria-label="Quick links">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
              </li>
              <li><a href="#">About Us</a></li>
              <li>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('home');
                    setTimeout(() => {
                      document.getElementById('our-services')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                >
                  Services
                </a>
              </li>
              <li><a href="#">Technologies</a></li>
              <li><a href="#">Industries</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </nav>

          <nav className="footer-column" aria-label="Services">
            <h5>Our Services</h5>
            <ul>
              <li>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('vlsi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  VLSI Engineering
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('embedded');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Embedded Engineering
                </a>
              </li>
              <li><a href="#">Edge AI Engineering</a></li>
            </ul>
          </nav>

          <nav className="footer-column" aria-label="Industries">
            <h5>Industries</h5>
            <ul>
              <li><a href="#">Automotive</a></li>
              <li><a href="#">Healthcare</a></li>
              <li><a href="#">Industrial</a></li>
              <li><a href="#">Consumer Electronics</a></li>
              <li><a href="#">Communication</a></li>
              <li><a href="#">Aerospace & Defense</a></li>
            </ul>
          </nav>

          <address className="footer-column footer-contact">
            <h5>Contact Us</h5>
            <ul>
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span>info@vctech.com</span>
              </li>
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>VConnect Tech Systems Pvt. Ltd.<br />Bengaluru, India</span>
              </li>
            </ul>
          </address>
        </div>

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
