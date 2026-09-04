/**
 * Contact Page
 *
 * Provides company contact channels, inquiry form guidance,
 * office locations, operating hours, and map destinations.
 */

import {
  Building2,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  UserRound,
} from 'lucide-react'
import '../assets/css/Contact.css'
import charminarImage from '../assets/image/Contact/charminar.webp'
import vizagImage from '../assets/image/Contact/visakhapatnam.webp'

const hyderabadLocationUrl = 'https://www.google.com/maps/place/VConnecTech+Systems/@17.4418347,78.3758634,62m/data=!3m1!1e3!4m6!3m5!1s0x3bcb930038fa06a1:0x473ca079d63401c8!8m2!3d17.4419942!4d78.3762469!16s%2Fg%2F11whlhpcg_?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D'
const vizagLocationUrl = 'https://maps.app.goo.gl/hPqE2XTUW2RXk9Qk6?g_st=ic'

// Office metadata drives both location cards and their external map destinations.

const locations = [
  {
    city: 'Hyderabad',
    officeType: 'Head Office',
    address: '4th floor, Plot No:6, Sector-3, HUDA Techno Enclave, Madhapur, Hyderabad, Telangana, India – 500081',
    href: hyderabadLocationUrl,
    mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=78.3725%2C17.4395%2C78.3799%2C17.4445&layer=mapnik&marker=17.4419942%2C78.3762469',
    image: charminarImage,
    alt: 'Charminar illustration representing Hyderabad',
  },
  {
    city: 'Visakhapatnam',
    officeType: 'Branch Office',
    address: '5th Floor, A Wing, Door No. 10-28-2/1/6, Flat No. 501, Waltair Main Road, Visakhapatnam, Andhra Pradesh – 530002',
    href: vizagLocationUrl,
    mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=83.3038%2C17.7129%2C83.3098%2C17.7179&layer=mapnik&marker=17.7153934%2C83.3068199',
    image: vizagImage,
    alt: 'Submarine and lighthouse illustration representing Visakhapatnam',
  },
]

/** Renders contact details, the inquiry form, and regional office cards. */

export default function Contact() {
  /**
   * Converts the inquiry fields into an encoded email draft while preserving
   * optional contact details when supplied.
   */

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent('Website contact enquiry')
    const body = encodeURIComponent(
      `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nPhone: ${form.get('phone') || 'Not provided'}\nCompany: ${form.get('company') || 'Not provided'}\n\n${form.get('message')}`
    )

    window.location.href = `mailto:hr@vconnectech.in?subject=${subject}&body=${body}`
  }

  return (
    <main className="contact-page">
      {/* Contact introduction, direct channels, and inquiry form */}

      <section className="contact-top" aria-labelledby="contact-title">
        <div className="contact-shell contact-top-grid">
          {/* Company contact details and response expectations */}

          <section className="contact-introduction">
            <p className="contact-eyebrow">Contact VConnecTech</p>
            <h1 id="contact-title">Let&apos;s build<br />what&apos;s next<span>.</span></h1>
            <i className="contact-heading-line" aria-hidden="true" />
            <p className="contact-lead">
              Tell us about your product, engineering challenge, or partnership opportunity.
              Our team will respond within one business day.
            </p>

            <ul className="contact-direct-list" aria-label="Direct contact information">
              <li>
                <a href="tel:+917032305762">
                  <span className="contact-direct-icon"><Phone aria-hidden="true" /></span>
                  <strong>+91 7032305762</strong>
                </a>
              </li>
              <li>
                <a href="mailto:hr@vconnectech.in">
                  <span className="contact-direct-icon"><Mail aria-hidden="true" /></span>
                  <strong>hr@vconnectech.in</strong>
                </a>
              </li>
              <li>
                <span className="contact-direct-row">
                  <span className="contact-direct-icon"><Clock3 aria-hidden="true" /></span>
                  <strong>Monday – Friday, 9:00 AM – 6:00 PM</strong>
                </span>
              </li>
            </ul>
          </section>

          {/* Email-backed inquiry form */}

          <section className="contact-form-card" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title">Start a conversation</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-field">
                <UserRound aria-hidden="true" />
                <span className="sr-only">Full name</span>
                <input name="name" type="text" placeholder="Full Name" autoComplete="name" required />
              </label>
              <label className="contact-field">
                <Mail aria-hidden="true" />
                <span className="sr-only">Work email</span>
                <input name="email" type="email" placeholder="Work Email" autoComplete="email" required />
              </label>
              <label className="contact-field">
                <Phone aria-hidden="true" />
                <span className="sr-only">Phone number</span>
                <input name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" />
              </label>
              <label className="contact-field">
                <Building2 aria-hidden="true" />
                <span className="sr-only">Company or organization</span>
                <input name="company" type="text" placeholder="Company / Organization" autoComplete="organization" />
              </label>
              <label className="contact-field contact-message-field">
                <MessageSquareText aria-hidden="true" />
                <span className="sr-only">How can we help?</span>
                <textarea name="message" placeholder="How can we help?" rows="4" required />
              </label>
              <button type="submit" className="contact-submit">
                <span>Send enquiry</span>
                <Send aria-hidden="true" />
              </button>
            </form>
          </section>
        </div>
      </section>

      {/* Regional offices with map previews and external directions */}

      <section className="contact-locations" aria-labelledby="contact-locations-title">
        <div className="contact-shell">
          <header className="contact-locations-heading">
            <i aria-hidden="true" />
            <h2 id="contact-locations-title">Our locations</h2>
            <i aria-hidden="true" />
          </header>

          <div className="contact-location-grid">
            {locations.map((location) => (
              <article className="contact-location-card" key={location.city}>
                <div className="contact-location-art">
                  <img src={location.image} alt={location.alt} loading="lazy" decoding="async" />
                </div>
                <div className="contact-location-copy">
                  <span className="contact-location-eyebrow">{location.officeType}</span>
                  <h3>{location.city}</h3>
                  <p className="contact-location-address">
                    <MapPin aria-hidden="true" />
                    <span>{location.address}</span>
                  </p>
                </div>
                <div className="contact-location-actions">
                  <div className="contact-map-preview">
                    <iframe
                      src={location.mapEmbedUrl}
                      title={`${location.city} office map`}
                      referrerPolicy="no-referrer-when-downgrade"
                      loading="lazy"
                    />
                    <a
                      className="contact-map-attribution"
                      href="https://www.openstreetmap.org/copyright"
                      target="_blank"
                      rel="noreferrer"
                    >
                      © OpenStreetMap contributors
                    </a>
                  </div>
                  <a className="contact-map-button" href={location.href} target="_blank" rel="noreferrer">
                    Open in Maps
                    <ExternalLink aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
