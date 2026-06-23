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
    <span className="embpg-word-clip" key={`${word}-${index}`}>
      <span className="embpg-word-inner" style={{ transitionDelay: `${0.05 + index * 0.07}s` }}>
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
    const root = document.querySelector(".embpg-embedded-page");
    if (!root) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];

    if (reducedMotion) {
      root.querySelectorAll(".embpg-scroll-reveal-item").forEach((el) => el.classList.add("embpg-active"));
      root.querySelectorAll(".embpg-enterprise-row-section").forEach((el) => el.classList.add("embpg-text-revealed"));
      root.querySelectorAll(".embpg-hero-reveal").forEach((el) => el.classList.add("embpg-active-reveal"));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("embpg-active", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" },
    );

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("embpg-text-revealed", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );

    root.querySelectorAll(".embpg-scroll-reveal-item").forEach((item) => revealObserver.observe(item));
    root.querySelectorAll(".embpg-enterprise-row-section").forEach((card) => textObserver.observe(card));

    const mobileHoverObserver = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth > 992) {
          entries.forEach((entry) => {
            entry.target.classList.remove("embpg-active-hover");
          });
          return;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("embpg-active-hover");
          } else {
            entry.target.classList.remove("embpg-active-hover");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-25% 0px -25% 0px",
      }
    );

    root.querySelectorAll(".embpg-showcase-card, .embpg-enterprise-row-section, .embpg-flow-node-item").forEach((el) => {
      mobileHoverObserver.observe(el);
    });

    const heroTimer = window.setTimeout(() => {
      root.querySelectorAll(".embpg-hero-reveal").forEach((el) => el.classList.add("embpg-active-reveal"));
    }, 80);

    const progressBar = root.querySelector(".embpg-scroll-progress-bar");
    const updateProgress = () => {
      if (!progressBar) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = `${docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    root.querySelectorAll(".embpg-magnetic-btn-anchor").forEach((btn) => {
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

    root.querySelectorAll(".embpg-enterprise-row-section, .embpg-showcase-card.embpg-anim-lift-card").forEach((card) => {
      const handleMove = (event) => {
        const rect = card.getBoundingClientRect();
        const touch = event.touches?.[0] || event.changedTouches?.[0];
        const clientX = touch ? touch.clientX : event.clientX;
        const clientY = touch ? touch.clientY : event.clientY;
        const relX = (clientX - rect.left) / rect.width - 0.5;
        const relY = (clientY - rect.top) / rect.height - 0.5;
        card.style.transition =
          "transform 0.1s ease, border-color 0.5s var(--embedded-ease-apple), box-shadow 0.5s var(--embedded-ease-apple)";
        card.style.transform = `perspective(900px) rotateX(${-relY * 1.5}deg) rotateY(${relX * 1.5}deg) translate3d(0,-8px,0)`;
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
    <main className="embpg-embedded-page">
      <div className="embpg-scroll-progress-bar" />

      {/* =========================
          Hero Section - Start
      ========================= */}
      <section className="embpg-embedded-hero-section">
        <div className="embpg-embedded-container">
          <div className="embpg-embedded-hero-grid">
            <div className="embpg-embedded-hero-copy">
              <div className="embpg-kinetic-reveal-container">
                <div className="embpg-hero-reveal">
                  <span className="embpg-embedded-kicker">Embedded Engineering Services</span>
                </div>
              </div>
              <div className="embpg-kinetic-reveal-container">
                <div className="embpg-hero-reveal">
                  <h1 className="embpg-embedded-hero-title">
                    End-to-End Embedded
                    <br />
                    Engineering <span>Solutions.</span>
                  </h1>
                </div>
              </div>
              <div className="embpg-kinetic-reveal-container">
                <div className="embpg-hero-reveal">
                  <p className="embpg-embedded-hero-description">
                    From hardware to firmware and connectivity to validation&mdash;we build reliable, secure, and
                    high-performance embedded systems that power real-world applications.
                  </p>
                </div>
              </div>
              <div className="embpg-embedded-hero-actions embpg-hero-reveal">
                <div className="embpg-hero-btn-anchor">
                  <a href="#embedded-services" className="embpg-embedded-btn embpg-embedded-btn-primary">
                    Explore Our Services
                  </a>
                </div>
                <div className="embpg-hero-btn-anchor">
                  <a href="#embedded-cta" className="embpg-embedded-btn embpg-embedded-btn-outline">
                    Talk to Our Experts
                  </a>
                </div>
              </div>
              <div className="embpg-embedded-hero-features embpg-hero-reveal">
                <div className="embpg-embedded-feature">
                  <img src={Images.i1} alt="" />
                  <span>
                    Deep Domain
                    <br />
                    Expertise
                  </span>
                </div>
                <div className="embpg-embedded-feature">
                  <img src={Images.i2} alt="" />
                  <span>
                    Agile & Scalable
                    <br />
                    Delivery
                  </span>
                </div>
                <div className="embpg-embedded-feature">
                  <img src={Images.i3} alt="" />
                  <span>
                    Quality &
                    <br />
                    Reliability
                  </span>
                </div>
              </div>
            </div>

            <div className="embpg-embedded-hero-visual embpg-hero-reveal">
              <div className="embpg-hardware-stage">
                <picture>
                  <source media="(max-width: 992px)" srcSet={Images.mhero} />
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
      <section className="embpg-process-section">
        <div className="embpg-embedded-container embpg-scroll-reveal-item">
          <div className="embpg-section-heading">
            <span>Our Embedded Engineering Process</span>
            <i aria-hidden="true" />
          </div>
          <div className="embpg-process-flow">
            {processSteps.map(([title, icon], index) => (
              <div className="embpg-process-pair" key={title}>
                <div className="embpg-flow-node-item embpg-scroll-reveal-item">
                  <div className="embpg-flow-node-circle">
                    <img src={icon} alt="" />
                  </div>
                  <p>{title}</p>
                </div>
                {index < processSteps.length - 1 && <div className="embpg-flow-arrow-icon">→</div>}
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
      <section className="embpg-expertise-section embpg-scroll-reveal-item">
        <div className="embpg-embedded-container">
          <div className="embpg-section-heading">
            <span>Our Embedded Service Areas</span>
            <i aria-hidden="true" />
          </div>
          <div className="embpg-service-area-grid">
            {serviceAreas.map(([title, icon, targetId], index) => (
              <div
                className="embpg-service-area-col embpg-scroll-reveal-item"
                style={{ transitionDelay: `${0.05 + index * 0.05}s`, cursor: "pointer" }}
                onClick={() =>
                  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                key={title}
              >
                <div className="embpg-showcase-card embpg-anim-lift-card">
                  <div className="embpg-blue-icon-box">
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
      <section className="embpg-services-matrix-section" id="embedded-services">
        <div className="embpg-embedded-container embpg-embedded-container-narrow">
          <div className="embpg-section-heading embpg-matrix-heading">
            <span>Technical Services</span>
            <h2>Our Embedded Engineering Services</h2>
            <i aria-hidden="true" />
          </div>

          <div className="embpg-subsystems-matrix-container">
            {services.map((service) => {
              const textColumn = (
                <div className={`embpg-service-copy${service.reverse ? " embpg-is-reverse" : ""}`}>
                  <div className="embpg-service-title-row">
                    <div className="embpg-alpha-badge">{service.letter}</div>
                    <h3>{titleWords(service.title)}</h3>
                  </div>
                  <p className="embpg-subsys-para">
                    <span className="embpg-subsys-para-inner">{service.description}</span>
                  </p>
                  <span className="embpg-deliver-label">What We Deliver</span>
                  <ul className="embpg-tech-list">
                    {service.items.map((item, index) => (
                      <li style={{ transitionDelay: `${0.55 + index * 0.12}s` }} key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );

              const imageColumn = (
                <div className="embpg-service-image-wrap">
                  <div className="embpg-diagram-box">
                    <img src={service.image} alt={service.title} />
                  </div>
                </div>
              );

              return (
                <article
                  className="embpg-enterprise-row-section embpg-scroll-reveal-item"
                  id={"service-" + service.letter.toLowerCase()}
                  key={service.letter}
                >
                  <div className={`embpg-enterprise-row ${service.reverse ? "embpg-is-reverse" : ""}`}>
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
      <section className="embpg-cta-section" id="embedded-cta">
        <div className="embpg-embedded-container">
          <div className="embpg-cta-blue-card">
            <div className="embpg-cta-content">
              <div>
                <h3>Let&apos;s Build Intelligent Embedded Products Together</h3>
                <p>
                  Partner with VCTS for reliable, scalable, and production-ready embedded solutions that accelerate
                  innovation from concept to deployment.
                </p>
              </div>
              <div className="embpg-magnetic-btn-anchor">
                <a href="#" className="embpg-embedded-btn embpg-cta-btn">
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
