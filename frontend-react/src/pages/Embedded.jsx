import { useEffect } from "react";
import "../assets/css/Embedded.css";
import Images from "../assets/image/Embedded/emi";

const serviceAreas = [
  ["Embedded Hardware", Images.i12, "service-a"],
  ["Firmware Development", Images.i10, "service-b"],
  ["BSP & Platform Enablement", Images.i11, "service-c"],
  ["RTOS Solutions", Images.i7, "service-d"],
  ["Embedded Linux", Images.i13, "service-e"],
  ["Device Drivers", Images.i14, "service-f"],
  ["Connectivity Solutions", Images.i15, "service-g"],
  ["Automotive & Functional Safety", Images.i16, "service-h"],
  ["Testing & Validation", Images.i17, "service-i"],
  ["Manufacturing Support", Images.i18, "service-j"],
];

const processSteps = [
  ["Requirement Analysis & Feasibility", Images.i4],
  ["Architecture & System Design", Images.i5],
  ["Firmware Development", Images.i10],
  ["Integration & Testing", Images.i9],
  ["Validation & Certification", Images.i71],
  ["Sustenance & Product Evolution", Images.i8],
];

const services = [
  {
    letter: "A",
    title: "Embedded Hardware Engineering",
    description:
      "We design and develop production-ready embedded hardware platforms optimized for performance, reliability, manufacturability, and long-term product scalability.",
    image: Images.m1,
    items: [
      "Architecture & Hardware Planning",
      "Component Selection & BOM Engineering",
      "Schematic & PCB Design",
      "Power Management Design",
      "Sensor & MCU Integration",
      "Board Bring-Up & Validation",
      "DFM & DFT Implementation",
      "EMI/EMC, Thermal & Signal Integrity Analysis",
    ],
  },
  {
    letter: "B",
    title: "Bare-Metal & Firmware Development",
    description:
      "We develop efficient firmware and low-level software that provide deterministic control, optimized resource utilization, and seamless hardware interaction.",
    image: Images.m2,
    reverse: true,
    items: [
      "Firmware Architecture & Development",
      "Embedded C/C++ Programming",
      "Bare-Metal Firmware Development",
      "Bootloader Design & Customization",
      "BSP & HAL Development",
      "Peripheral Integration",
      "Algorithm Implementation",
      "Code, Memory & Performance Optimization",
      "Unit Testing, Debugging & Validation",
    ],
  },
  {
    letter: "C",
    title: "BSP Development & Platform Enablement",
    description:
      "We enable custom hardware platforms through BSP development, hardware abstraction, platform bring-up, and system-level integration.",
    image: Images.m3,
    items: [
      "BSP Architecture & Development",
      "Board Bring-Up & Platform Enablement",
      "Hardware Abstraction Layer (HAL) Development",
      "Linux & RTOS Porting",
      "Peripheral & Interface Enablement",
      "Hardware-Software Integration",
      "Middleware Integration",
      "Platform Performance Optimization",
    ],
  },
  {
    letter: "D",
    title: "Real-Time Operating Systems (RTOS)",
    description:
      "We build deterministic real-time systems that deliver predictable task execution, low-latency response, and reliable multitasking performance.",
    image: Images.m4,
    reverse: true,
    items: [
      "RTOS Architecture & Integration",
      "Task Scheduling & Prioritization",
      "Message Queues, Mutexes & Semaphores",
      "Interrupt Management",
      "Multi-Threaded System Design",
      "Deterministic Control Implementation",
      "Memory & Resource Management",
      "Real-Time Performance Optimization",
    ],
  },
  {
    letter: "E",
    title: "Embedded Linux & High-Level OS",
    description:
      "We customize and optimize embedded operating systems to deliver stable, scalable, and feature-rich software platforms.",
    image: Images.m5,
    items: [
      "Embedded Linux Porting & Customization",
      "Yocto & Buildroot Development",
      "Kernel Configuration & Optimization",
      "Linux Device Driver Development",
      "Root Filesystem Optimization",
      "System Services Development",
      "Networking & File System Integration",
      "Secure Boot & OTA Enablement",
    ],
  },
  {
    letter: "F",
    title: "Device Drivers Development",
    description:
      "We develop robust device drivers that ensure reliable communication between hardware peripherals and software applications.",
    image: Images.m6,
    reverse: true,
    items: [
      "Peripheral Driver Development",
      "Sensor & Actuator Driver Integration",
      "Communication Drivers (I2C, SPI, UART, CAN, LIN)",
      "Linux Device Drivers",
      "RTOS Device Drivers",
      "Driver Porting & Adaptation",
      "Low-Power Driver Optimization",
      "Driver Debugging & Verification",
    ],
  },
  {
    letter: "G",
    title: "Wireless & Wired Connectivity",
    description:
      "We implement secure and reliable connectivity solutions that enable seamless communication between devices, gateways, cloud platforms, and enterprise systems.",
    image: Images.m7,
    items: [
      "BLE, Wi-Fi, Zigbee, Thread & Matter Integration",
      "LoRaWAN, NB-IoT & LTE-M Solutions",
      "CAN, RS485, Modbus, Ethernet & USB Integration",
      "MQTT, CoAP, HTTP & AMQP Protocols",
      "IoT Gateway Development",
      "Edge-to-Cloud Connectivity",
      "Edge AI Enablement",
      "Cloud & Embedded UI Integration",
    ],
  },
  {
    letter: "H",
    title: "Automotive & Functional Safety",
    description:
      "We develop automotive and safety-critical embedded systems with a focus on reliability, compliance, diagnostics, and real-time operation.",
    image: Images.m8,
    reverse: true,
    items: [
      "Automotive ECU Development",
      "CAN/LIN & UDS Integration",
      "Vehicle Communication Systems",
      "Diagnostic & Calibration Support",
      "Functional Safety Architecture",
      "Hazard & Risk Analysis (FMEA, FMEDA, HARA)",
      "Secure Boot & Firmware Security",
      "Certification & Compliance Support",
    ],
  },
  {
    letter: "I",
    title: "Testing, Validation & Embedded CI/CD",
    description:
      "We establish structured verification and validation workflows to improve software quality, accelerate development cycles, and ensure production-ready embedded systems.",
    image: Images.m9,
    items: [
      "Unit & Integration Testing",
      "System-Level Validation",
      "Regression Testing & Automation",
      "Hardware-in-the-Loop (HIL) Testing",
      "Embedded CI/CD Pipeline Development",
      "Performance & Stress Testing",
      "Test Framework Development",
      "Root Cause Analysis & Defect Resolution",
    ],
  },
  {
    letter: "J",
    title: "Manufacturing & Production Support",
    description:
      "We support the transition from prototype to production through manufacturing readiness, test infrastructure, programming workflows, and production engineering support.",
    image: Images.m10,
    reverse: true,
    items: [
      "DFM & DFT Review",
      "Test Fixture & Programming Jig Design",
      "In-System Programming (ISP)",
      "Production Test Planning",
      "Manufacturing Documentation",
      "Contract Manufacturer Support",
      "Yield Optimization",
      "Failure Analysis & Production Validation",
    ],
  },
];

function titleWords(title) {
  return title.split(/\s+/).map((word, index) => (
    <span className="word-clip" key={`${word}-${index}`}>
      <span className="word-inner" style={{ transitionDelay: `${0.05 + index * 0.07}s` }}>
        {word}
      </span>
    </span>
  ));
}

export default function Embedded() {
  {/* =========================
      Animations - Start
  ========================= */}
  useEffect(() => {
    const root = document.querySelector(".embedded-page");
    if (!root) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];

    if (reducedMotion) {
      root.querySelectorAll(".scroll-reveal-item").forEach((el) => el.classList.add("active"));
      root.querySelectorAll(".enterprise-row-section").forEach((el) => el.classList.add("text-revealed"));
      root.querySelectorAll(".hero-reveal").forEach((el) => el.classList.add("active-reveal"));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" },
    );

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("text-revealed", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );

    root.querySelectorAll(".scroll-reveal-item").forEach((item) => revealObserver.observe(item));
    root.querySelectorAll(".enterprise-row-section").forEach((card) => textObserver.observe(card));

    const mobileHoverObserver = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth > 992) {
          entries.forEach((entry) => {
            entry.target.classList.remove("active-hover");
          });
          return;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active-hover");
          } else {
            entry.target.classList.remove("active-hover");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-25% 0px -25% 0px",
      }
    );

    root.querySelectorAll(".showcase-card, .enterprise-row-section, .flow-node-item").forEach((el) => {
      mobileHoverObserver.observe(el);
    });

    const heroTimer = window.setTimeout(() => {
      root.querySelectorAll(".hero-reveal").forEach((el) => el.classList.add("active-reveal"));
    }, 80);

    const progressBar = root.querySelector(".scroll-progress-bar");
    const updateProgress = () => {
      if (!progressBar) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = `${docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    root.querySelectorAll(".magnetic-btn-anchor").forEach((btn) => {
      const handleMove = (event) => {
        const rect = btn.getBoundingClientRect();
        const touch = event.touches?.[0] || event.changedTouches?.[0];
        const clientX = touch ? touch.clientX : event.clientX;
        const clientY = touch ? touch.clientY : event.clientY;
        const x = ((clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
        const y = ((clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 5;
        btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const handleLeave = () => {
        btn.style.transform = "translate3d(0,0,0)";
      };
      btn.addEventListener("mousemove", handleMove, { passive: true });
      btn.addEventListener("mouseleave", handleLeave);
      btn.addEventListener("touchstart", handleMove, { passive: true });
      btn.addEventListener("touchmove", handleMove, { passive: true });
      btn.addEventListener("touchend", handleLeave, { passive: true });
      btn.addEventListener("touchcancel", handleLeave, { passive: true });
      cleanups.push(() => {
        btn.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", handleLeave);
        btn.removeEventListener("touchstart", handleMove);
        btn.removeEventListener("touchmove", handleMove);
        btn.removeEventListener("touchend", handleLeave);
        btn.removeEventListener("touchcancel", handleLeave);
      });
    });

    root.querySelectorAll(".enterprise-row-section, .showcase-card.anim-lift-card").forEach((card) => {
      const handleMove = (event) => {
        const rect = card.getBoundingClientRect();
        const touch = event.touches?.[0] || event.changedTouches?.[0];
        const clientX = touch ? touch.clientX : event.clientX;
        const clientY = touch ? touch.clientY : event.clientY;
        const relX = (clientX - rect.left) / rect.width - 0.5;
        const relY = (clientY - rect.top) / rect.height - 0.5;
        card.style.transition =
          "transform 0.1s ease, border-color 0.5s var(--embedded-ease-apple), box-shadow 0.5s var(--embedded-ease-apple)";
        card.style.transform = `perspective(900px) rotateX(${-relY * 1}deg) rotateY(${relX * 1}deg) translate3d(0,-1px,0)`;
        card.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
      };
      const handleLeave = () => {
        card.style.transition =
          "transform 0.55s var(--embedded-ease-apple), border-color 0.5s var(--embedded-ease-apple), box-shadow 0.5s var(--embedded-ease-apple)";
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";
      };
      card.addEventListener("mousemove", handleMove, { passive: true });
      card.addEventListener("mouseleave", handleLeave);
      card.addEventListener("touchstart", handleMove, { passive: true });
      card.addEventListener("touchmove", handleMove, { passive: true });
      card.addEventListener("touchend", handleLeave, { passive: true });
      card.addEventListener("touchcancel", handleLeave, { passive: true });
      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
        card.removeEventListener("touchstart", handleMove);
        card.removeEventListener("touchmove", handleMove);
        card.removeEventListener("touchend", handleLeave);
        card.removeEventListener("touchcancel", handleLeave);
      });
    });

    return () => {
      window.clearTimeout(heroTimer);
      window.removeEventListener("scroll", updateProgress);
      revealObserver.disconnect();
      textObserver.disconnect();
      mobileHoverObserver.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
  {/* =========================
      Animations - End
  ========================= */}

  return (
    <main className="embedded-page">
      <div className="scroll-progress-bar" />

      {/* =========================
          Hero Section - Start
      ========================= */}
      <section className="embedded-hero-section">
        <div className="embedded-container">
          <div className="embedded-hero-grid">
            <div className="embedded-hero-copy">
              <div className="kinetic-reveal-container">
                <div className="hero-reveal">
                  <span className="embedded-kicker">Embedded Engineering Services</span>
                </div>
              </div>
              <div className="kinetic-reveal-container">
                <div className="hero-reveal">
                  <h1 className="embedded-hero-title">
                    End-to-End Embedded
                    <br />
                    Engineering <span>Solutions.</span>
                  </h1>
                </div>
              </div>
              <div className="kinetic-reveal-container">
                <div className="hero-reveal">
                  <p className="embedded-hero-description">
                    From hardware to firmware and connectivity to validation&mdash;we build reliable, secure, and
                    high-performance embedded systems that power real-world applications.
                  </p>
                </div>
              </div>
              <div className="embedded-hero-actions hero-reveal">
                <div className="hero-btn-anchor">
                  <a href="#embedded-services" className="embedded-btn embedded-btn-primary">
                    Explore Our Services
                  </a>
                </div>
                <div className="hero-btn-anchor">
                  <a href="#embedded-cta" className="embedded-btn embedded-btn-outline">
                    Talk to Our Experts
                  </a>
                </div>
              </div>
              <div className="embedded-hero-features hero-reveal">
                <div className="embedded-feature">
                  <img src={Images.i1} alt="" />
                  <span>
                    Deep Domain
                    <br />
                    Expertise
                  </span>
                </div>
                <div className="embedded-feature">
                  <img src={Images.i2} alt="" />
                  <span>
                    Agile & Scalable
                    <br />
                    Delivery
                  </span>
                </div>
                <div className="embedded-feature">
                  <img src={Images.i3} alt="" />
                  <span>
                    Quality &
                    <br />
                    Reliability
                  </span>
                </div>
              </div>
            </div>

            <div className="embedded-hero-visual hero-reveal">
              <div className="hardware-stage">
                <picture>
                  <source media="(max-width: 768px)" srcSet={Images.mhero} />
                  <img src={Images.hero} alt="Embedded Engineering Solutions" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =========================
          Hero Section - End
      ========================= */}

      {/* =========================
          Embedded Engineering Process - Start
      ========================= */}
      <section className="process-section">
        <div className="embedded-container scroll-reveal-item">
          <div className="section-heading">
            <span>Our Embedded Engineering Process</span>
            <i aria-hidden="true" />
          </div>
          <div className="process-flow">
            {processSteps.map(([title, icon], index) => (
              <div className="process-pair" key={title}>
                <div className="flow-node-item scroll-reveal-item">
                  <div className="flow-node-circle">
                    <img src={icon} alt="" />
                  </div>
                  <p>{title}</p>
                </div>
                {index < processSteps.length - 1 && <div className="flow-arrow-icon">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* =========================
          Embedded Engineering Process - End
      ========================= */}

      {/* =========================
          Our Embedded Service Areas - Start
      ========================= */}
      <section className="expertise-section scroll-reveal-item">
        <div className="embedded-container">
          <div className="section-heading">
            <span>Our Embedded Service Areas</span>
            <i aria-hidden="true" />
          </div>
          <div className="service-area-grid">
            {serviceAreas.map(([title, icon, targetId], index) => (
              <div
                className="service-area-col scroll-reveal-item"
                style={{ transitionDelay: `${0.05 + index * 0.05}s`, cursor: "pointer" }}
                onClick={() =>
                  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                key={title}
              >
                <div className="showcase-card anim-lift-card">
                  <div className="blue-icon-box">
                    <img src={icon} alt="" />
                  </div>
                  <h4>{title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* =========================
          Our Embedded Service Areas - End
      ========================= */}

      {/* =========================
          Technical Services - Start
      ========================= */}
      <section className="services-matrix-section" id="embedded-services">
        <div className="embedded-container embedded-container-narrow">
          <div className="section-heading matrix-heading">
            <span>Technical Services</span>
            <h2>Our Embedded Engineering Services</h2>
            <i aria-hidden="true" />
          </div>

          <div className="subsystems-matrix-container">
            {services.map((service) => {
              const textColumn = (
                <div className="service-copy">
                  <div className="service-title-row">
                    <div className="alpha-badge">{service.letter}</div>
                    <h3>{titleWords(service.title)}</h3>
                  </div>
                  <p className="subsys-para">
                    <span className="subsys-para-inner">{service.description}</span>
                  </p>
                  <span className="deliver-label">What We Deliver</span>
                  <ul className="tech-list">
                    {service.items.map((item, index) => (
                      <li style={{ transitionDelay: `${0.55 + index * 0.12}s` }} key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );

              const imageColumn = (
                <div className="service-image-wrap">
                  <div className="diagram-box">
                    <img src={service.image} alt={service.title} />
                  </div>
                </div>
              );

              return (
                <article
                  className="enterprise-row-section scroll-reveal-item"
                  id={"service-" + service.letter.toLowerCase()}
                  key={service.letter}
                >
                  <div className={`enterprise-row ${service.reverse ? "is-reverse" : ""}`}>
                    {service.reverse ? imageColumn : textColumn}
                    {service.reverse ? textColumn : imageColumn}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* =========================
          Technical Services - End
      ========================= */}

      {/* =========================
          Call To Action (CTA) - Start
      ========================= */}
      <section className="cta-section" id="embedded-cta">
        <div className="embedded-container">
          <div className="cta-blue-card">
            <div className="cta-content">
              <div>
                <h3>Let&apos;s Build Intelligent Embedded Products Together</h3>
                <p>
                  Partner with VCTS for reliable, scalable, and production-ready embedded solutions that accelerate
                  innovation from concept to deployment.
                </p>
              </div>
              <div className="magnetic-btn-anchor">
                <a href="#" className="embedded-btn cta-btn">
                  Talk to Our Experts <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =========================
          Call To Action (CTA) - End
      ========================= */}
    </main>
  );
}
