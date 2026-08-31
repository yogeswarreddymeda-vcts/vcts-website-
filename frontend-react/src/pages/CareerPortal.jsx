/** Dedicated student-application and experienced-professional career pages. */

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Search,
  Upload,
} from 'lucide-react'
import '../assets/css/Careers.css'

const jobs = [
  {
    title: 'Agentic AI Intern',
    category: 'Engineering',
    description: 'Assist in developing autonomous AI agent workflows, integrations, and automation systems using state-of-the-art AI tools and frameworks.',
    location: 'Remote',
    employment: 'Internship (3–6 months)',
    compensation: 'Upon Selection',
    experience: '0–1 year',
    skills: ['Python', 'LLM Tools & APIs', 'Prompt Engineering', 'Research & Prototyping', 'Problem Solving', 'Collaboration'],
  },
  {
    title: 'Generative AI Intern',
    category: 'Engineering',
    description: 'Assist in building GenAI-driven applications, prompt-based workflows, and model integrations for real-world use-cases.',
    location: 'Remote',
    employment: 'Internship (3–6 months)',
    compensation: 'Upon Selection',
    experience: '0–1 year',
    skills: ['Python / JS Basics', 'LLM Tools & Prompting', 'GenAI Concepts', 'Creative Thinking', 'Documentation', 'Collaboration'],
  },
  {
    title: 'AI/ML & Data Science Intern',
    category: 'Engineering',
    description: 'Assist in data preparation, model experimentation, and research activities for machine learning and data-driven applications.',
    location: 'Remote',
    employment: 'Internship (3–6 months)',
    compensation: 'Upon Selection',
    experience: '0–1 year',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'Visualization', 'Collaboration'],
  },
  {
    title: 'Business Development Intern',
    category: 'Business',
    description: 'Support market research, client outreach, and business development activities for emerging engineering and technology opportunities.',
    location: 'Remote',
    employment: 'Internship (3–6 months)',
    compensation: 'Upon Selection',
    experience: '0–1 year',
    skills: ['Market Research', 'Lead Generation', 'Communication', 'CRM Basics', 'Presentation', 'Collaboration'],
  },
  {
    title: 'UI/UX Design Intern',
    category: 'Design',
    description: 'Create clear user flows, wireframes, and interface concepts for web-based engineering and technology products.',
    location: 'Remote',
    employment: 'Internship (3–6 months)',
    compensation: 'Upon Selection',
    experience: '0–1 year',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Visual Design', 'User Research', 'Design Systems'],
  },
  {
    title: 'Project Operations Intern',
    category: 'Operations',
    description: 'Assist with project coordination, documentation, scheduling, and process tracking across multidisciplinary teams.',
    location: 'Remote',
    employment: 'Internship (3–6 months)',
    compensation: 'Upon Selection',
    experience: '0–1 year',
    skills: ['Project Coordination', 'Documentation', 'Scheduling', 'Process Tracking', 'Spreadsheets', 'Communication'],
  },
]

const categories = ['All', 'Engineering', 'Business', 'Design', 'Operations']

const indiaStatesAndUnionTerritories = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Other',
]

/**
 * @param {Object} props
 * @param {'students'|'experienced'} props.mode - Selects the application or openings experience.
 * @param {(page: string) => void} props.setCurrentPage - Updates the lightweight application route.
 */

export default function CareerPortal({ mode, setCurrentPage }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false)
  const [studentResumeName, setStudentResumeName] = useState('')
  const [activeApplicationStep, setActiveApplicationStep] = useState(1)

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return jobs.filter((job) => {
      const searchable = [job.title, job.category, job.description, ...job.skills].join(' ').toLowerCase()
      return (category === 'All' || job.category === category) && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [category, query])

  const navigateBack = (event) => {
    event.preventDefault()
    setCurrentPage('careers')
    window.history.replaceState({ page: 'careers', returnTo: 'open-positions' }, '', '/careers#open-positions')
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById('open-positions')?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
    })
  }

  const submitStudentApplication = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const body = encodeURIComponent([
      `Name: ${form.get('name')}`,
      `Email: ${form.get('email')}`,
      `Contact number: ${form.get('phone')}`,
      `Date of birth: ${form.get('dateOfBirth')}`,
      `Country: ${form.get('country')}`,
      `State: ${form.get('state')}`,
      `City: ${form.get('city')}`,
      `Gender: ${form.get('gender')}`,
      `Course: ${form.get('course')}`,
      `Course branch: ${form.get('courseBranch')}`,
      `Year of passing: ${form.get('passingYear')}`,
      `College: ${form.get('college')}`,
      `SSLC mark percentage: ${form.get('sslc')}`,
      `HSC mark percentage: ${form.get('hsc') || 'Not provided'}`,
      `Diploma mark percentage: ${form.get('diploma') || 'Not provided'}`,
      `UG mark percentage: ${form.get('ug') || 'Not provided'}`,
      `PG mark percentage: ${form.get('pg') || 'Not provided'}`,
      `Preferred job location: ${form.get('preferredLocation')}`,
      `Resume selected: ${form.get('resume')?.name || 'Not provided'} (please attach to this email)`,
    ].join('\n'))

    window.location.href = `mailto:careers@vconnecttech.com?subject=${encodeURIComponent('Student / Graduate Application')}&body=${body}`
  }

  const isStudentPage = mode === 'students'
  const applicationStepTitles = ['Personal Details', 'Academic Credentials', 'Resume']

  return (
    <main className={`careers-page careers-portal-page${isStudentPage ? ' careers-student-portal' : ''}`}>
      <section className="careers-section careers-positions careers-portal-section">
        <div className="careers-shell">
          <a className="careers-back-link" href="/careers#open-positions" onClick={navigateBack}><ArrowLeft aria-hidden="true" /> Back to Careers</a>
          <header className="careers-portal-heading">
            <p className="careers-eyebrow">{isStudentPage ? 'Students & Graduates' : 'Experienced Professionals'}</p>
            <h1>{isStudentPage ? 'Student Application.' : 'Explore Open Positions.'}</h1>
            <p>{isStudentPage ? 'Complete the required details to begin your application.' : 'Find a role that matches your skills, experience, and interests.'}</p>
          </header>

          {isStudentPage ? (
            <form className="careers-student-form careers-path-content" onSubmit={submitStudentApplication}>
              <div className="careers-application-layout">
                <aside className="careers-application-steps" aria-label="Application progress">
                  <button type="button" className={activeApplicationStep === 1 ? 'is-active' : activeApplicationStep > 1 ? 'is-complete' : ''} onClick={() => setActiveApplicationStep(1)} aria-current={activeApplicationStep === 1 ? 'step' : undefined}><span>01</span><strong>Personal Details</strong></button>
                  <button type="button" className={activeApplicationStep === 2 ? 'is-active' : activeApplicationStep > 2 ? 'is-complete' : ''} onClick={() => setActiveApplicationStep(2)} aria-current={activeApplicationStep === 2 ? 'step' : undefined}><span>02</span><strong>Academic Credentials</strong></button>
                  <button type="button" className={activeApplicationStep === 3 ? 'is-active' : ''} onClick={() => setActiveApplicationStep(3)} aria-current={activeApplicationStep === 3 ? 'step' : undefined}><span>03</span><strong>Resume</strong></button>
                </aside>

                <div className="careers-application-main">
                  <section className="careers-application-card is-active">
                    <div className="careers-application-card-header">
                      <h2>{applicationStepTitles[activeApplicationStep - 1]}</h2>
                      <span>Step {activeApplicationStep} of 3</span>
                    </div>
                    <div className="careers-application-card-body">
                      <p className="careers-required-note"><span aria-hidden="true">*</span> Required</p>
                      <fieldset className={`careers-form-section careers-application-step-content careers-form-section--personal${activeApplicationStep === 1 ? ' is-active' : ''}`}>
                        <legend className="visually-hidden">Personal Details</legend>
                        <div className="careers-form-grid">
                          <label><span className="careers-field-label">Full Name <span aria-hidden="true">*</span></span><input required name="name" autoComplete="name" placeholder="Enter your full name" /></label>
                          <label><span className="careers-field-label">Email <span aria-hidden="true">*</span></span><input required type="email" name="email" autoComplete="email" placeholder="Enter your email address" /></label>
                          <label><span className="careers-field-label">Phone <span aria-hidden="true">*</span></span><input required type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="Enter your phone number" /></label>
                          <label><span className="careers-field-label">Date of Birth <span aria-hidden="true">*</span></span><input required type="date" name="dateOfBirth" autoComplete="bday" /></label>
                          <label><span className="careers-field-label">Country <span aria-hidden="true">*</span></span><select required name="country" defaultValue=""><option value="" disabled>Select country</option><option>India</option></select></label>
                          <label><span className="careers-field-label">State <span aria-hidden="true">*</span></span><select required name="state" defaultValue=""><option value="" disabled>Select state</option>{indiaStatesAndUnionTerritories.map((state) => <option key={state}>{state}</option>)}</select></label>
                          <label><span className="careers-field-label">City <span aria-hidden="true">*</span></span><input required name="city" placeholder="Enter your city" /></label>
                          <fieldset className="careers-gender-field"><legend>Gender <span aria-hidden="true">*</span></legend><label><input required type="radio" name="gender" value="Male" /> <span>Male</span></label><label><input type="radio" name="gender" value="Female" /> <span>Female</span></label><label><input type="radio" name="gender" value="Other" /> <span>Other</span></label></fieldset>
                        </div>
                      </fieldset>
                      {activeApplicationStep === 1 && <div className="careers-form-actions"><button type="button" className="careers-student-submit" onClick={() => setActiveApplicationStep(2)}>Continue <ArrowRight aria-hidden="true" /></button></div>}

                      <fieldset className={`careers-form-section careers-application-step-content careers-form-section--academic${activeApplicationStep === 2 ? ' is-active' : ''}`}>
                        <legend className="visually-hidden">Academic Credentials</legend>
                        <div className="careers-form-grid">
                          <label><span className="careers-field-label">Course <span aria-hidden="true">*</span></span><select required name="course" defaultValue=""><option value="" disabled>Select Course</option><option>B.Tech / B.E.</option><option>M.Tech / M.E.</option><option>B.Sc.</option><option>M.Sc.</option><option>BCA</option><option>MCA</option><option>Diploma</option><option>Other</option></select></label>
                          <label><span className="careers-field-label">Course Branch <span aria-hidden="true">*</span></span><select required name="courseBranch" defaultValue=""><option value="" disabled>Select Course Branch</option><option>Computer Science</option><option>Electronics &amp; Communication</option><option>Electrical &amp; Electronics</option><option>Information Technology</option><option>Mechanical Engineering</option><option>Other</option></select></label>
                          <label><span className="careers-field-label">Year of Passing <span aria-hidden="true">*</span></span><select required name="passingYear" defaultValue=""><option value="" disabled>Select Year</option>{[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year) => <option key={year}>{year}</option>)}</select></label>
                          <label><span className="careers-field-label">College <span aria-hidden="true">*</span></span><input required name="college" /></label>
                          <label><span className="careers-field-label">SSLC Mark Percentage <span aria-hidden="true">*</span></span><input required name="sslc" inputMode="decimal" /></label>
                          <label><span className="careers-field-label">HSC Mark Percentage</span><input name="hsc" inputMode="decimal" /></label>
                          <label><span className="careers-field-label">Diploma Mark Percentage</span><input name="diploma" inputMode="decimal" /></label>
                          <label><span className="careers-field-label">UG Mark Percentage</span><input name="ug" inputMode="decimal" /></label>
                          <label><span className="careers-field-label">PG Mark Percentage</span><input name="pg" inputMode="decimal" /></label>
                          <label><span className="careers-field-label">Preferred Job Location <span aria-hidden="true">*</span></span><select required name="preferredLocation" defaultValue=""><option value="" disabled>None selected</option><option>Hyderabad</option><option>Visakhapatnam</option><option>Remote</option><option>Open to relocate</option></select></label>
                        </div>
                        {activeApplicationStep === 2 && <div className="careers-form-actions"><button type="button" className="careers-student-submit" onClick={() => setActiveApplicationStep(3)}>Continue <ArrowRight aria-hidden="true" /></button></div>}
                      </fieldset>

                      <fieldset className={`careers-form-section careers-application-step-content careers-form-section--resume${activeApplicationStep === 3 ? ' is-active' : ''}`}>
                        <legend className="visually-hidden">Resume</legend>
                        <div className="careers-form-grid careers-resume-grid"><label className="careers-resume-field"><span className="careers-field-label">Upload your resume <span aria-hidden="true">*</span></span><span className="careers-resume-control"><Upload aria-hidden="true" /> {studentResumeName || 'Choose file'}</span><input required type="file" name="resume" accept=".pdf,.doc,.docx" onChange={(event) => setStudentResumeName(event.target.files?.[0]?.name || '')} /></label></div>
                        {activeApplicationStep === 3 && <><label className="careers-consent"><input required type="checkbox" name="consent" /> <span>I acknowledge and consent to the use of my information for recruitment purposes.</span></label><div className="careers-form-actions"><button type="submit" className="careers-student-submit">Submit <ArrowRight aria-hidden="true" /></button></div></>}
                      </fieldset>
                    </div>
                  </section>
                </div>
              </div>
            </form>
          ) : (
            <div className="careers-experienced-content careers-path-content">
              <div className="careers-job-filter-panel">
                <div className="careers-job-tools">
                  <label className="careers-search">
                    <Search aria-hidden="true" />
                    <span className="visually-hidden">Search jobs</span>
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by job title, skill or keyword..." />
                  </label>
                </div>
                <div className="careers-category-filters" aria-label="Job categories">
                  {categories.map((item) => <button type="button" className={category === item ? 'is-active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}
                  <button type="button" className={`careers-more-filters ${moreFiltersOpen ? 'is-open' : ''}`} onClick={() => setMoreFiltersOpen((open) => !open)}>More Filters</button>
                </div>
              </div>
              {moreFiltersOpen && <div className="careers-filter-note"><BriefcaseBusiness aria-hidden="true" /> Showing remote opportunities and internships currently available.</div>}
              <div className="careers-job-list" aria-live="polite">
                {filteredJobs.length ? filteredJobs.map((job) => (
                  <article className="careers-job-card" key={job.title}>
                    <div className="careers-job-card-main">
                      <span className="careers-job-category">{job.category}</span>
                      <h3>{job.title}</h3>
                      <p>{job.description}</p>
                      <div className="careers-skills">{job.skills.map((skill) => <span className="careers-skill-tag" key={skill}>{skill}</span>)}</div>
                    </div>
                    <div className="careers-job-details">
                      <div><span>Location</span><strong><MapPin aria-hidden="true" />{job.location}</strong></div>
                      <div><span>Employment</span><strong><Clock3 aria-hidden="true" />{job.employment}</strong></div>
                      <div><span>Compensation</span><strong>{job.compensation}</strong></div>
                      <div><span>Experience</span><strong>{job.experience}</strong></div>
                    </div>
                    <div className="careers-job-card-side"><a className="careers-apply-button" href={`mailto:careers@vconnecttech.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}>Apply Now <ArrowRight /></a></div>
                  </article>
                )) : <p className="careers-empty">No roles match your search yet. Try another keyword or browse all positions.</p>}
              </div>
              <button type="button" className="careers-inline-link" onClick={() => { setQuery(''); setCategory('All'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>View All Open Positions <ArrowRight /></button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
