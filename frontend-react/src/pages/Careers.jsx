import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  ImageIcon,
  MapPin,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  X,
} from 'lucide-react'
import '../assets/css/Careers.css'
import teamImage from '../assets/image/about/Curved image.jpeg'

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
]

const benefits = [
  { title: 'Learn & Grow', description: 'Opportunities to develop your skills and experience.', icon: TrendingUp, className: 'careers-benefit--featured' },
  { title: 'Meaningful Work', description: 'Work on challenges that create real impact.', icon: Target, className: 'careers-benefit--meaningful' },
  { title: 'Collaborative Team', description: 'Learn from experienced professionals and work together.', icon: UsersRound, className: 'careers-benefit--collaborative' },
  { title: 'Make an Impact', description: 'Bring your ideas and contribute to what we build.', icon: Sparkles, className: 'careers-benefit--impact' },
]

const lifeTiles = [
  { title: 'Learning', rotate: -3, y: 0 },
  { title: 'Engineering', rotate: 2.5, y: 14 },
  { title: 'Teamwork', rotate: 2, y: -10 },
  { title: 'Celebrations', rotate: -2, y: 6 },
]

const categories = ['All', 'Engineering', 'Business', 'Design', 'Operations']

export default function Careers() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [hoveredLifeTile, setHoveredLifeTile] = useState(null)

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return jobs.filter((job) => {
      const searchable = [job.title, job.category, job.description, ...job.skills].join(' ').toLowerCase()
      return (category === 'All' || job.category === category) && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [category, query])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submitApplication = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Application: ${selectedJob?.title || 'VCTS opportunity'}`)
    window.location.href = `mailto:careers@vconnecttech.com?subject=${subject}`
  }

  return (
    <main className="careers-page">
      <section className="careers-hero">
        <img src={teamImage} alt="The VConnectTech Systems engineering team" />
        <div className="careers-hero-overlay" />
        <div className="careers-shell careers-hero-inner">
          <p className="careers-eyebrow">Careers at VCTS</p>
          <h1>Find Your Next <span>Opportunity.</span></h1>
          <p className="careers-hero-lede">Build your career. Make an impact.</p>
          <div className="careers-actions">
            <button type="button" className="careers-button careers-button--primary" onClick={() => scrollTo('open-positions')}>
              View Open Positions <ArrowRight />
            </button>
            <button type="button" className="careers-button careers-button--ghost" onClick={() => scrollTo('life-at-vcts')}>
              Learn About Our Culture
            </button>
          </div>
        </div>
      </section>

      <section className="careers-section careers-why" id="why-join">
        <div className="careers-shell">
          <div className="careers-section-heading">
            <p className="careers-eyebrow">Why join VCTS?</p>
            <h2>Great Work Starts With <span>Great People.</span></h2>
            <p>At VCTS, we believe in giving people the opportunity to learn, contribute, take on challenges, and grow.</p>
          </div>
          <div className="careers-benefits-grid">
            {benefits.map(({ title, description, icon: Icon, className }) => (
              <article className={`careers-benefit ${className}`} key={title}>
                <span className="careers-benefit-icon" aria-hidden="true"><Icon /></span>
                <div className="careers-benefit-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-section careers-life" id="life-at-vcts">
        <div className="careers-shell">
          <div className="careers-section-heading careers-section-heading--center">
            <p className="careers-eyebrow">Life at VCTS</p>
            <h2>People. Ideas. <span>Possibilities.</span></h2>
            <p>A place where people collaborate, share ideas, take on challenges, and grow together.</p>
          </div>
          <div className="careers-life-grid">
            <figure className="careers-life-tile careers-life-tile--large">
              <div className="careers-life-card careers-life-card--anchor">
                <ImageIcon aria-hidden="true" />
                <strong>Add image here</strong>
                <span>Large team photo — the anchor<br />image for this section.</span>
              </div>
            </figure>
            <div className="careers-life-supporting">
              {lifeTiles.map((tile, index) => {
                const isHovered = hoveredLifeTile === index
                const transform = isHovered
                  ? 'rotate(0deg) translateY(0px) scale(1.04)'
                  : `rotate(${tile.rotate}deg) translateY(${tile.y}px)`

                return (
                  <figure
                    className="careers-life-tile careers-life-tile--support"
                    key={tile.title}
                    onMouseEnter={() => setHoveredLifeTile(index)}
                    onMouseLeave={() => setHoveredLifeTile(null)}
                    style={{ transform, zIndex: isHovered ? 2 : 1 }}
                  >
                    <div
                      className="careers-life-card careers-life-card--small"
                      style={{
                        boxShadow: isHovered
                          ? '0 18px 36px rgba(18, 22, 27, .22), 0 6px 12px rgba(18, 22, 27, .1)'
                          : '9px 14px 26px rgba(18, 22, 27, .15), 2px 5px 9px rgba(18, 22, 27, .08)',
                      }}
                    >
                    <ImageIcon aria-hidden="true" />
                    <strong>Add image</strong>
                    </div>
                    <figcaption>{tile.title}</figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="careers-section careers-positions" id="open-positions">
        <div className="careers-shell">
          <div className="careers-section-heading">
            <p className="careers-eyebrow">Open positions</p>
            <h2>Explore Open <span>Positions.</span></h2>
            <p>Find a role that matches your skills, experience, and interests.</p>
          </div>
          <div className="careers-job-filter-panel">
            <div className="careers-job-tools">
              <label className="careers-search">
                <Search aria-hidden="true" />
                <span className="visually-hidden">Search jobs</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by job title, skill or keyword..." />
              </label>
            </div>
            <div className="careers-category-filters" aria-label="Job categories">
              {categories.map((item) => (
                <button type="button" className={category === item ? 'is-active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>
              ))}
              <button type="button" className={`careers-more-filters ${moreFiltersOpen ? 'is-open' : ''}`} onClick={() => setMoreFiltersOpen((open) => !open)}>
                More Filters
              </button>
            </div>
          </div>
          {moreFiltersOpen && (
            <div className="careers-filter-note"><BriefcaseBusiness aria-hidden="true" /> Showing remote opportunities and internships currently available.</div>
          )}
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
                <div className="careers-job-card-side">
                  <button type="button" className="careers-apply-button" onClick={() => setSelectedJob(job)}>Apply Now <ArrowRight /></button>
                </div>
              </article>
            )) : <p className="careers-empty">No roles match your search yet. Try another keyword or browse all positions.</p>}
          </div>
          <button type="button" className="careers-inline-link" onClick={() => { setQuery(''); setCategory('All'); scrollTo('open-positions') }}>View All Open Positions <ArrowRight /></button>
        </div>
      </section>

      <section className="careers-general">
        <div className="careers-shell careers-general-inner">
          <div><p className="careers-eyebrow">Keep in touch</p><h2>Didn't Find the <span>Right Role?</span></h2></div>
          <div><p>We're always interested in meeting talented people. Send us your profile and we'll keep you in mind for future opportunities.</p><a className="careers-button careers-button--light" href="mailto:careers@vconnecttech.com?subject=General%20Application">Send Your Resume <Send /></a></div>
        </div>
      </section>

      <section className="careers-final-cta">
        <div className="careers-shell"><p className="careers-eyebrow">Your next chapter</p><h2>Ready for What's <span>Next?</span></h2><p>Your next opportunity could start here.</p><button type="button" className="careers-button careers-button--primary" onClick={() => scrollTo('open-positions')}>Explore Open Positions <ArrowRight /></button></div>
      </section>

      {selectedJob && (
        <div className="careers-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedJob(null) }}>
          <div className="careers-modal" role="dialog" aria-modal="true" aria-labelledby="careers-modal-title">
            <button type="button" className="careers-modal-close" aria-label="Close application" onClick={() => setSelectedJob(null)}><X /></button>
            <p className="careers-eyebrow">Apply at VCTS</p><h2 id="careers-modal-title">{selectedJob.title}</h2><p>Share a few details and your email application will open with this role pre-selected.</p>
            <form onSubmit={submitApplication}>
              <label>Full name<input required name="name" autoComplete="name" /></label>
              <label>Email address<input required type="email" name="email" autoComplete="email" /></label>
              <label>Portfolio or LinkedIn (optional)<input name="portfolio" /></label>
              <button type="submit" className="careers-button careers-button--primary">Continue via Email <ArrowRight /></button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
