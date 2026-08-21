import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  UserRound,
} from 'lucide-react'
import '../assets/css/Contact.css'
import charminarImage from '../assets/image/Contact/charminar.webp'
import vizagImage from '../assets/image/Contact/visakhapatnam.webp'

const locationUrl = 'https://www.google.com/maps/place/VConnecTech+Systems/@17.4418347,78.3758634,62m/data=!3m1!1e3!4m6!3m5!1s0x3bcb930038fa06a1:0x473ca079d63401c8!8m2!3d17.4419942!4d78.3762469!16s%2Fg%2F11whlhpcg_?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D'
const vizagLocationUrl = 'https://maps.app.goo.gl/hPqE2XTUW2RXk9Qk6?g_st=ic'

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent('Website contact enquiry')
    const body = encodeURIComponent(
      `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nPhone: ${form.get('phone') || 'Not provided'}\n\n${form.get('message')}`
    )

    window.location.href = `mailto:hr@vconnectech.in?subject=${subject}&body=${body}`
  }

  return (
    <main className="contact-page">
      <div className="contact-pattern contact-pattern-top" aria-hidden="true" />
      <div className="contact-pattern contact-pattern-bottom" aria-hidden="true" />

      <div className="contact-layout">
        <div className="contact-hero">
          <header className="contact-heading">
            <h1 id="contact-title">Let&apos;s <span>Connect</span></h1>
            <i aria-hidden="true" />
            <p>We&apos;re here to help and answer any question you might have.</p>
          </header>

          <section className="contact-info-card">
            <h2>Contact Information</h2>

            <a className="contact-info-row" href="tel:+917032305762">
              <Phone aria-hidden="true" />
              <span>
                <strong>+91 7032305762</strong>
                <small><Clock3 aria-hidden="true" /> Monday – Saturday, 9:00 AM – 6:00 PM</small>
              </span>
            </a>

            <a className="contact-info-row" href="mailto:hr@vconnectech.in">
              <Mail aria-hidden="true" />
              <span>
                <strong>hr@vconnectech.in</strong>
                <small>We reply within 24 hours</small>
              </span>
            </a>
          </section>
        </div>

        <div className="contact-content-grid">
        <section className="contact-message-section contact-form-card" aria-labelledby="contact-title">
          <h2 className="contact-form-title">Send us a message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-input-row">
              <UserRound aria-hidden="true" />
              <span className="sr-only">Your name</span>
              <input name="name" type="text" placeholder="Your Name" autoComplete="name" required />
            </label>

            <label className="contact-input-row">
              <Phone aria-hidden="true" />
              <span className="sr-only">Phone number</span>
              <input name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" />
            </label>

            <label className="contact-input-row">
              <Mail aria-hidden="true" />
              <span className="sr-only">Email address</span>
              <input name="email" type="email" placeholder="name@yourcompany.com" autoComplete="email" required />
            </label>

            <label className="contact-input-row contact-message-row">
              <span className="sr-only">Your message</span>
              <textarea name="message" placeholder="Your Message" rows="5" required />
            </label>

            <button type="submit" className="contact-submit">
              <span>Send message</span>
              <Send aria-hidden="true" />
            </button>
          </form>
        </section>

        <aside className="contact-sidebar" aria-label="VCTS locations and addresses">
          <h2 className="contact-locations-title">Our Locations</h2>
          <div className="contact-location-list">
            <div className="contact-location-group">
              <a className="contact-location-card" href={locationUrl} target="_blank" rel="noreferrer">
              <span className="contact-location-copy">
                <small>Our Location</small>
                <strong>Hyderabad</strong>
                <span>Open in Google Maps</span>
              </span>
              <span className="contact-location-icon" aria-hidden="true">
                <img src={charminarImage} alt="Charminar, Hyderabad" />
              </span>
              </a>

              <section className="contact-address-card" aria-label="Hyderabad office address">
                <a className="contact-info-row" href={locationUrl} target="_blank" rel="noreferrer">
                <MapPin aria-hidden="true" />
                <span>
                  <strong>VConnectTech Systems</strong>
                  <small>4th floor, Plot No:6, Sector-3, HUDA Techno Enclave, Madhapur, Hyderabad, Telangana, India - 500081</small>
                </span>
                </a>
              </section>
            </div>

            <div className="contact-location-group">
              <a className="contact-location-card contact-location-card--vizag" href={vizagLocationUrl} target="_blank" rel="noreferrer">
              <span className="contact-location-copy">
                <small>Our Location</small>
                <strong>Visakhapatnam</strong>
                <span>VConnectTech Systems · Open in Google Maps</span>
              </span>
              <span className="contact-location-icon" aria-hidden="true">
                <img src={vizagImage} alt="Submarine and lighthouse, Visakhapatnam" />
              </span>
              </a>

              <section className="contact-address-card" aria-label="Visakhapatnam branch address">
                <a className="contact-info-row" href={vizagLocationUrl} target="_blank" rel="noreferrer">
                <MapPin aria-hidden="true" />
                <span>
                  <strong>VConnectTech Systems — Visakhapatnam Branch</strong>
                  <small>5th Floor, A Wing, Do No. 10-28-2/1/6, Flat no 501, Waltair Main Road, Waltair, Visakhapatnam, Andhra Pradesh – 530002</small>
                </span>
                </a>
              </section>
            </div>
          </div>
        </aside>
        </div>
      </div>
    </main>
  )
}
