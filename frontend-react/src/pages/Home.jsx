import '../assets/css/Home.css'
import { useEffect } from 'react'
import { Activity, ArrowRight, CarFront, Cpu, Download, Server } from 'lucide-react'
import heroImage from '../assets/image/Home/home-hero-hardware.webp'
import heroMobileImage from '../assets/image/Home/home-hero-hardware-mobile.webp'
import valueSectionImage from '../assets/image/Home/home-section-01.webp'
import capabilityVlsiImage from '../assets/image/Home/home-section-02.webp'
import capabilityEmbeddedImage from '../assets/image/Home/home-section-03.webp'
import capabilityEdgeAiImage from '../assets/image/Home/home-section-04.webp'
import engagementImage from '../assets/image/Home/unnamed.webp'
import automotiveImage from '../assets/image/Home/home-section-05.webp'
import industrialImage from '../assets/image/Home/home-section-06.webp'
import healthcareImage from '../assets/image/Home/home-section-07.webp'
import consumerImage from '../assets/image/Home/home-section-08.webp'
import industriesBackdrop from '../assets/image/Home/home-section-09.webp'

const valueTraceSquares = Array.from({ length: 20 }, (_, index) => index)

export default function Home({ setCurrentPage }) {
  useEffect(() => {
    const sections = document.querySelectorAll('.home-page-container > section')

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        window.requestAnimationFrame(() => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' })

    sections.forEach((section) => {
      section.classList.add('home-animated-section')

      if (section.classList.contains('home-hero')) {
        section.classList.add('is-visible')
        return
      }

      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const openPage = (page) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    setCurrentPage?.(page)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }))
  }

  return (
    <main className="home-page-container">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero-glow" aria-hidden="true" />
        <div className="home-hero-shell">
          <div className="home-hero-copy">
            <div className="home-hero-eyebrow">From Silicon to Intelligent Edge</div>
            <h1 id="home-hero-title">
              <span className="home-hero-title-line">Engineering the Future.</span>
              <strong className="home-hero-title-line">From the Inside Out.</strong>
            </h1>
            <p>Best-in-class engineering for complex systems, intelligent products, and real-world applications.</p>
            <div className="home-hero-actions">
              <button type="button" className="home-hero-button home-hero-button--primary" onClick={() => openPage('contact')}>Talk to an Engineering Architect <ArrowRight aria-hidden="true" /></button>
              <button type="button" className="home-hero-button home-hero-button--secondary" onClick={() => openPage('technologies')}>Download Capabilities Deck <Download aria-hidden="true" /></button>
            </div>
          </div>
          <div className="home-hero-art" aria-hidden="true">
            <picture>
              <source media="(max-width: 1100px)" srcSet={heroMobileImage} />
              <img src={heroImage} alt="" loading="eager" decoding="async" fetchPriority="high" draggable="false" />
            </picture>
          </div>
        </div>
      </section>

      <section className="home-trust-section home-animated-section home-animate-trust" aria-labelledby="home-trust-title">
        <div className="home-trust-shell">
          <h2 id="home-trust-title">Trusted Engineering Partner for Industry Pioneers</h2>
          <p>Powering mission-critical electronics across Semiconductor, Automotive, Industrial IoT,<br className="home-trust-break" /> and MedTech sectors.</p>
          <div className="home-trust-pillars">
            <div className="home-trust-pillar"><Cpu aria-hidden="true" /><span>Semiconductor</span></div>
            <div className="home-trust-pillar"><CarFront aria-hidden="true" /><span>Automotive</span></div>
            <div className="home-trust-pillar"><Server aria-hidden="true" /><span>Industrial IoT</span></div>
            <div className="home-trust-pillar"><Activity aria-hidden="true" /><span>MedTech</span></div>
          </div>
        </div>
      </section>

      <section className="home-value-section home-animated-section home-animate-value" aria-labelledby="home-value-title">
        <img className="home-value-image" src={valueSectionImage} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="home-value-shell">
          <div className="home-value-copy">
            <span className="home-value-eyebrow">Why VConnectTech?</span>
            <h2 id="home-value-title">Unified Engineering Across the<br className="home-value-break" /> Silicon and Software <span className="home-gradient-text">Stack</span></h2>
            <p>Traditional product development fails due to fragmented vendors. We close the gap by owning the entire hardware, firmware, and intelligence pipeline under one roof.</p>
          </div>
          <div className="home-value-cards">
            <article className="home-value-card"><span className="home-value-trace" aria-hidden="true">{valueTraceSquares.map((index) => <span className="home-value-trace-slot" key={index}><i style={{ '--trace-index': index }} /></span>)}</span><span className="home-value-dot" /><h3>Zero-Fragmentation Execution</h3><p>We eliminate communication gaps between chip designers, hardware engineers, and AI developers, resulting in optimal power, performance, and area (PPA).</p></article>
            <article className="home-value-card"><span className="home-value-trace" aria-hidden="true">{valueTraceSquares.map((index) => <span className="home-value-trace-slot" key={index}><i style={{ '--trace-index': index }} /></span>)}</span><span className="home-value-dot" /><h3>Silicon-to-Application Scale</h3><p>Our expertise scales seamlessly down to microscopic chip layout verification and up to robust, connected system architectures.</p></article>
            <article className="home-value-card"><span className="home-value-trace" aria-hidden="true">{valueTraceSquares.map((index) => <span className="home-value-trace-slot" key={index}><i style={{ '--trace-index': index }} /></span>)}</span><span className="home-value-dot" /><h3>Accelerated Time-to-Market</h3><p>By leveraging pre-verified IP blocks and optimized baseline AI frameworks, we cut months off your traditional hardware R&amp;D cycles.</p></article>
          </div>
        </div>
      </section>

      <section className="home-capabilities-section home-animated-section home-animate-capabilities" aria-labelledby="home-capabilities-title">
        <div className="home-capabilities-shell">
          <header className="home-capabilities-heading">
            <span className="home-capabilities-kicker">Technical pillars</span>
            <h2 id="home-capabilities-title">Our Core Pillars of <span className="home-gradient-text">Expertise</span></h2>
            <p>Deep engineering capabilities designed to solve your most complex hardware and computational challenges.</p>
          </header>
          <div className="home-capability-grid">
            <article className="home-capability-card">
              <div className="home-capability-media"><img src={capabilityVlsiImage} alt="VLSI and silicon engineering hardware" loading="lazy" decoding="async" /><span>01</span></div>
              <div className="home-capability-content">
                <div className="home-capability-category">Category 01</div>
                <h3>VLSI &amp; Silicon Engineering</h3>
                <div className="home-capability-item"><h4>ASIC &amp; RTL Design</h4><p>End-to-end front-end architecture, IP core development, and SoC design integration.</p></div>
                <div className="home-capability-item"><h4>Advanced Verification</h4><p>Robust UVM and SystemVerilog environments to ensure functional accuracy and zero-defect silicon.</p></div>
                <div className="home-capability-item"><h4>FPGA Prototyping</h4><p>High-speed emulation, post-silicon validation, and hardware acceleration targeting major FPGA platforms.</p></div>
                <button className="home-capability-more" type="button" onClick={() => openPage('vlsi')}>View More Details <ArrowRight aria-hidden="true" /></button>
              </div>
            </article>
            <article className="home-capability-card">
              <div className="home-capability-media"><img src={capabilityEmbeddedImage} alt="Embedded systems architecture hardware" loading="lazy" decoding="async" /><span>02</span></div>
              <div className="home-capability-content">
                <div className="home-capability-category">Category 02</div>
                <h3>Embedded Systems Architecture</h3>
                <div className="home-capability-item"><h4>Hardware &amp; PCB Design</h4><p>High-speed, multi-layer digital board layouts optimized for thermal management and low-power constraints.</p></div>
                <div className="home-capability-item"><h4>Firmware &amp; RTOS</h4><p>Custom bootloaders, low-level device drivers, and real-time operating system optimization for microcontrollers and microprocessors.</p></div>
                <div className="home-capability-item"><h4>Secure IoT Connectivity</h4><p>Implementation of highly secure, ultra-low-latency communication protocols including BLE, Wi-Fi, 5G, and Thread.</p></div>
                <button className="home-capability-more" type="button" onClick={() => openPage('embedded')}>View More Details <ArrowRight aria-hidden="true" /></button>
              </div>
            </article>
            <article className="home-capability-card">
              <div className="home-capability-media"><img src={capabilityEdgeAiImage} alt="Edge AI and computer vision hardware" loading="lazy" decoding="async" /><span>03</span></div>
              <div className="home-capability-content">
                <div className="home-capability-category">Category 03</div>
                <h3>Edge AI &amp; Computer Vision</h3>
                <div className="home-capability-item"><h4>Model Optimization &amp; TinyML</h4><p>Deep learning model compression via quantization, pruning, and compiling to run smoothly on resource-constrained hardware.</p></div>
                <div className="home-capability-item"><h4>Edge Computer Vision</h4><p>Low-power, real-time object detection, spatial segmentation, and tracking directly on the device.</p></div>
                <div className="home-capability-item"><h4>On-Device Analytics</h4><p>Secure, local data processing that removes the latency, privacy risks, and high costs of cloud-dependent computing.</p></div>
                <button className="home-capability-more" type="button" onClick={() => openPage('edgeai')}>View More Details <ArrowRight aria-hidden="true" /></button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-engagement-section home-animated-section home-animate-engagement" aria-labelledby="home-engagement-title">
        <div className="home-engagement-shell">
          <div className="home-engagement-heading">
            <h2 id="home-engagement-title">Flexible Engagement <span className="home-gradient-text">Frameworks</span></h2>
            <p>Whether you need standalone engineering services, ready-to-use IP, or a completely built product, we adapt to your operational workflow.</p>
          </div>
          <div className="home-engagement-image"><img src={engagementImage} alt="Production line with circuit board hardware" loading="lazy" decoding="async" /></div>
          <div className="home-engagement-grid">
            <article className="home-engagement-card home-engagement-card--blue"><div className="home-engagement-label">Staff Augmentation</div><h3>Custom Engineering Services</h3><p>Inject niche technical expertise directly into your existing workflow. Scale up your team with our dedicated verification engineers, firmware developers, or Edge AI specialists.</p></article>
            <article className="home-engagement-card home-engagement-card--blue"><div className="home-engagement-label">End-to-End</div><h3>Turnkey Product Development</h3><p>Bring us your product requirement sheet. We handle the entire engineering lifecycle—from initial architectural specs and custom silicon to manufactured, enclosed hardware.</p></article>
            <article className="home-engagement-card home-engagement-card--gold"><div className="home-engagement-label">IP Licensing</div><h3>Ready-to-Deploy Solutions</h3><p>Speed up your roadmap. License our pre-validated hardware IPs, custom board designs, or optimized Edge AI software modules to bypass early-stage R&amp;D.</p></article>
            <article className="home-engagement-card home-engagement-card--navy"><div className="home-engagement-label">Modernization</div><h3>System Integration &amp; Upgrades</h3><p>Modernize your existing infrastructure. We seamlessly inject intelligent Edge AI capabilities and secure IoT connectivity into legacy electronic and mechanical systems.</p></article>
          </div>
        </div>
      </section>

      <section className="home-industries-section home-animated-section home-animate-industries" aria-labelledby="home-industries-title">
        <div className="home-industries-shell">
          <header className="home-industries-heading">
            <h2 id="home-industries-title">Engineered for High-Stakes <span className="home-gradient-text">Industries</span></h2>
            <p>Our core technologies are deployed across harsh environments, regulated spaces, and ultra-high-reliability markets.</p>
          </header>
          <div className="home-industries-grid">
            <article className="home-industry-card home-industry-card--wide" style={{ '--industry-image': `url(${automotiveImage})` }}><img className="home-industry-card-image" src={automotiveImage} alt="Automotive engineering vehicle" loading="lazy" decoding="async" /><div className="home-industry-overlay"><div className="home-industry-label">Automotive &amp; Mobility</div><p>Designing functional safety into ADAS, intelligent cabin tracking, and high-compute electronic control units (ECUs).</p></div></article>
            <article className="home-industry-card" style={{ '--industry-image': `url(${industrialImage})` }}><div className="home-industry-overlay"><div className="home-industry-label">Industrial IoT &amp; Smart Factories</div><p>Powering predictive maintenance, localized computer vision for automated quality control, and robotic control systems.</p></div></article>
            <article className="home-industry-card" style={{ '--industry-image': `url(${healthcareImage})` }}><div className="home-industry-overlay"><div className="home-industry-label">Healthcare &amp; Life Sciences</div><p>Engineering low-power, regulatory-compliant wearable medical monitors and real-time biosensor processing devices.</p></div></article>
            <article className="home-industry-card home-industry-card--wide-bottom" style={{ '--industry-image': `url(${consumerImage})` }}><div className="home-industry-overlay"><div className="home-industry-label">Consumer &amp; Smart Spaces</div><p>Creating battery-optimized smart home hubs, secure edge cameras, and context-aware consumer electronics.</p></div></article>
          </div>
        </div>
      </section>

      <section className="home-final-cta home-animated-section home-animate-final-cta" aria-labelledby="home-final-cta-title">
        <img className="home-final-cta-backdrop" src={industriesBackdrop} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="home-final-cta-content">
          <h2 id="home-final-cta-title">Ready to Accelerate Your Engineering <span className="home-gradient-text">Roadmap?</span></h2>
          <p>Whether you need to clear a complex chip verification bottleneck or build an entirely new intelligent device, our engineering architects are ready to assist.</p>
          <div className="home-final-cta-actions">
            <button type="button" className="home-final-cta-button home-final-cta-button--primary" onClick={() => openPage('contact')}>Schedule a Technical Consultation</button>
            <button type="button" className="home-final-cta-button home-final-cta-button--secondary" onClick={() => openPage('contact')}>Contact Our Sales Team</button>
          </div>
        </div>
      </section>
    </main>
  )
}
