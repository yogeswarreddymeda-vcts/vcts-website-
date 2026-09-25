/**
 * Contact Page
 *
 * Provides company contact channels, inquiry form guidance,
 * office locations, operating hours, and map destinations.
 */

import { useState } from 'react'
import {
  Building2,
  ChevronDown,
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

// Country dial codes drive the phone selector and digit-count validation.

const countries = [
  { name: 'India', dial: '+91', min: 10, max: 10 },
  { name: 'United States', dial: '+1', min: 10, max: 10 },
  { name: 'United Kingdom', dial: '+44', min: 10, max: 10 },
  { name: 'Canada', dial: '+1', min: 10, max: 10 },
  { name: 'Australia', dial: '+61', min: 9, max: 10 },
  { name: 'Germany', dial: '+49', min: 6, max: 11 },
  { name: 'France', dial: '+33', min: 9, max: 9 },
  { name: 'Netherlands', dial: '+31', min: 9, max: 9 },
  { name: 'Sweden', dial: '+46', min: 7, max: 9 },
  { name: 'Switzerland', dial: '+41', min: 9, max: 9 },
  { name: 'United Arab Emirates', dial: '+971', min: 8, max: 9 },
  { name: 'Saudi Arabia', dial: '+966', min: 9, max: 9 },
  { name: 'Qatar', dial: '+974', min: 8, max: 8 },
  { name: 'Kuwait', dial: '+965', min: 8, max: 8 },
  { name: 'Bahrain', dial: '+973', min: 8, max: 8 },
  { name: 'Oman', dial: '+968', min: 8, max: 8 },
  { name: 'Israel', dial: '+972', min: 8, max: 9 },
  { name: 'China', dial: '+86', min: 11, max: 11 },
  { name: 'Japan', dial: '+81', min: 10, max: 10 },
  { name: 'South Korea', dial: '+82', min: 9, max: 10 },
  { name: 'Singapore', dial: '+65', min: 8, max: 8 },
  { name: 'Malaysia', dial: '+60', min: 9, max: 10 },
  { name: 'Indonesia', dial: '+62', min: 8, max: 12 },
  { name: 'Thailand', dial: '+66', min: 8, max: 9 },
  { name: 'Vietnam', dial: '+84', min: 9, max: 10 },
  { name: 'Philippines', dial: '+63', min: 10, max: 10 },
  { name: 'Sri Lanka', dial: '+94', min: 9, max: 9 },
  { name: 'Bangladesh', dial: '+880', min: 10, max: 10 },
  { name: 'Nepal', dial: '+977', min: 8, max: 8 },
  { name: 'Brazil', dial: '+55', min: 10, max: 11 },
  { name: 'Mexico', dial: '+52', min: 10, max: 10 },
  { name: 'South Africa', dial: '+27', min: 9, max: 9 },
  { name: 'Nigeria', dial: '+234', min: 7, max: 11 },
  { name: 'Kenya', dial: '+254', min: 9, max: 9 },
]

const phoneErrorFor = (dial, value) => {
  const country = countries.find((item) => item.dial === dial)
  const digits = (value || '').replace(/\D/g, '')
  if (!country || !digits) return null
  if (digits.length < country.min || digits.length > country.max) {
    return `${country.name} numbers need ${country.min === country.max ? country.min : `${country.min}-${country.max}`} digits (you entered ${digits.length}).`
  }
  return null
}

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [phoneCountry, setPhoneCountry] = useState(countries[0])
  const [phoneValue, setPhoneValue] = useState('')
  const [phoneError, setPhoneError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const formElement = event.currentTarget
    const form = new FormData(formElement)

    // Digits are optional but must match the selected country when provided.

    const enteredPhone = (form.get('phone') || '').trim()
    const phoneValidationError = phoneErrorFor(phoneCountry.dial, enteredPhone)
    if (phoneValidationError) {
      setSubmissionStatus(null)
      setPhoneError(phoneValidationError)
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus(null)
    setPhoneError(null)

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          full_name: form.get('name'),
          work_email: form.get('email'),
          phone_number: enteredPhone ? `${phoneCountry.dial}${enteredPhone.replace(/\D/g, '')}` : null,
          company_name: form.get('company') || null,
          message: form.get('message'),
        }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        const message = response.status === 422
          ? Object.values(result?.errors || {}).flat().join(' ')
          : response.status === 429
            ? 'Too many enquiries. Please wait a minute and try again.'
            : null
        throw new Error(message || 'We could not save your enquiry. Please try again later.')
      }

      if (response.status !== 201) {
        throw new Error('We could not confirm your enquiry. Please try again later.')
      }

      formElement.reset()
      setSubmissionStatus({ type: 'success', message: 'Thank you! Your enquiry has been received.' })
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message: error instanceof TypeError
          ? 'Unable to connect. Please check your connection and try again.'
          : error.message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneChange = (event) => {
    const nextValue = event.target.value
    setPhoneValue(nextValue)
    if (phoneError) setPhoneError(phoneErrorFor(phoneCountry.dial, nextValue))
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

          {/* Inquiry form connected to the backend */}

          <section className="contact-form-card" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title">Start a conversation</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-field">
                <UserRound aria-hidden="true" />
                <span className="sr-only">Full name</span>
                <input name="name" type="text" placeholder="Full Name" autoComplete="name" maxLength={150} required />
              </label>
              <label className="contact-field">
                <Mail aria-hidden="true" />
                <span className="sr-only">Work email</span>
                <input name="email" type="email" placeholder="Work Email" autoComplete="email" maxLength={254} required />
              </label>
              <label className="contact-field contact-field--phone">
                <Phone aria-hidden="true" />
                <span className="sr-only">Phone number</span>
                <span className="contact-country-select">
                  <select
                    name="phoneCountry"
                    className="contact-country-code"
                    aria-label="Country dial code"
                    value={phoneCountry.dial}
                    onChange={(event) => setPhoneCountry(countries.find((item) => item.dial === event.target.value))}
                  >
                    {countries.map((country) => (
                      <option key={`${country.name}-${country.dial}`} value={country.dial}>+{country.dial.replace('+', '')}</option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" />
                </span>
                <input
                  name="phone"
                  type="tel"
                  placeholder={`${phoneCountry.name} number`}
                  autoComplete="tel-national"
                  maxLength={15}
                  value={phoneValue}
                  onChange={handlePhoneChange}
                />
                {phoneError && (
                  <p className="contact-field-error" role="alert">{phoneError}</p>
                )}
              </label>
              <label className="contact-field">
                <Building2 aria-hidden="true" />
                <span className="sr-only">Company or organization</span>
                <input name="company" type="text" placeholder="Company / Organization" autoComplete="organization" maxLength={200} />
              </label>
              <label className="contact-field contact-message-field">
                <MessageSquareText aria-hidden="true" />
                <span className="sr-only">How can we help?</span>
                <textarea name="message" placeholder="How can we help?" rows="4" maxLength={10000} required />
              </label>
              <button type="submit" className="contact-submit" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending…' : 'Send enquiry'}</span>
                <Send aria-hidden="true" />
              </button>
            </form>
            {submissionStatus && (
              <p
                className={`contact-submission-status contact-submission-status--${submissionStatus.type}`}
                role={submissionStatus.type === 'error' ? 'alert' : 'status'}
              >
                {submissionStatus.message}
              </p>
            )}
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
