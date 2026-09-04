/**
 * VLSI Page
 *
 * Presents semiconductor engineering services, process capabilities,
 * engagement options, brochure access, and frequently asked questions.
 */

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../assets/css/VLSI.css";

const imageUrl = (fileName) => new URL(`../assets/image/VLSI/${fileName}`, import.meta.url).href;

// ==========================================
// 1. HERO SECTION DATA & CONSTANTS
// ==========================================

const heroData = {
  eyebrow: "Semiconductor Engineering",
  titleLine1: "End-to-End",
  titleLine2: "Semiconductor",
  titleHighlight: "Solutions.",
  lede: "From Architecture to Production-Ready Silicon — delivering specialized front-end design, back-end physical design, and post-silicon validation services.",
  stats: [
    {
      value: "03",
      labelLine1: "Main service",
      labelLine2: "phases"
    },
    {
      value: "11",
      labelLine1: "Core engineering",
      labelLine2: "capabilities"
    }
  ],
  image: "hero_chip.webp",
  caption: {
    fig: "Fig. 001",
    title: "Custom Silicon — 7nm Architecture",
    loc: "In-house lab · Bengaluru"
  },
  badge: {
    title: "Silicon Success",
    subtitle: "100% tapeout rate · 7nm / 5nm / 3nm"
  }
};

// ==========================================
// 2. MARQUEE BANNER SECTION DATA & COMPONENTS
// ==========================================

const marqueeItems = [
  "RISC-V & ARM",
  "SystemC & TLM",
  "Verilog / VHDL",
  "UVM Methodology",
  "FPGA Emulation",
  "RTL-to-GDSII",
  "DFT / ATPG",
  "Logic Synthesis",
  "Floorplanning",
  "CTS",
  "Static Timing Analysis",
  "FinFET / GAA",
  "2.5D / 3D Packaging",
  "Silicon Bring-Up",
];

/** Renders the continuously repeated semiconductor service marquee. */

function Marquee() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span>{item}</span>
            <i>·</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. CAPABILITIES SECTION DATA & COMPONENTS
// ==========================================

const phases = [
  { id: "frontend", label: "Front-End Design" },
  { id: "backend", label: "Back-End Design" },
  { id: "postsilicon", label: "Post-Silicon Engineering" },
];

const services = {
  frontend: [
    {
      letter: "A",
      cardClass: "card-a",
      title: "Architecture Design & System Modeling",
      desc: "Designing scalable semiconductor architectures and intelligent system-level platforms.",
      image: "chip_card_a_hover.webp",
      hoverImage: "s1.webp",
      items: [
        "System & SoC Architecture",
        "ARM & RISC-V Platform Design",
        "Third-Party IP Evaluation & Selection",
        "Micro-Architecture Development",
        "Compute & Memory Architecture",
        "SystemC & TLM Modeling",
        "Virtual Prototyping",
      ],
    },
    {
      letter: "B",
      cardClass: "card-b",
      title: "RTL Design & Digital Design",
      desc: "Developing optimized RTL solutions for high-performance ASIC and FPGA designs.",
      image: "chip_card_b_hover1.webp",
      hoverImage: "s2.webp",
      items: [
        "RTL Architecture Development",
        "Verilog, VHDL & SystemVerilog Design",
        "Logic & FSM Design",
        "IP & Subsystem Integration",
        "Clock Domain Crossing (CDC) & Reset Domain Crossing (RDC) Analysis",
        "Area & Power Optimization",
      ],
    },
    {
      letter: "C",
      cardClass: "card-c",
      title: "Functional Verification",
      desc: "Ensuring functional correctness and design reliability using advanced verification methodologies.",
      image: "chip_card_c_hover.webp",
      hoverImage: "s3.webp",
      items: [
        "UVM-Based Verification",
        "Testbench Development",
        "Coverage-Driven Verification",
        "Assertion-Based & Formal Verification",
        "Regression Testing",
        "Protocol Verification (PCIe, DDR, USB, etc.)",
      ],
    },
    {
      letter: "D",
      cardClass: "card-d",
      title: "FPGA Design, Prototyping & Emulation",
      desc: "Accelerating development through FPGA implementation and enterprise hardware emulation.",
      image: "chip_card_d_hover.webp",
      hoverImage: "s4.webp",
      items: [
        "FPGA RTL Design",
        "FPGA Prototyping & Enterprise Emulation",
        "High-Speed Interface Integration (PCIe/Ethernet/USB/DDR)",
        "Place & Route",
        "Timing Closure",
        "Hardware Validation",
      ],
    },
  ],
  backend: [
    {
      letter: "E",
      cardClass: "card-e",
      title: "Synthesis & Netlist Optimization",
      desc: "Transforming RTL into optimized gate-level implementations for performance and power targets.",
      image: "chip_card_e_hover.webp",
      hoverImage: "s5.webp",
      items: [
        "RTL-to-Gate-Level Synthesis",
        "Timing Constraint Optimization",
        "Area & Power Optimization",
        "Clock Gating",
        "Netlist Generation",
      ],
    },
    {
      letter: "F",
      cardClass: "card-f",
      title: "Design for Testability (DFT)",
      desc: "Enhancing silicon testability and manufacturing readiness through robust DFT methodologies.",
      image: "chip_card_f_hover2.webp",
      hoverImage: "s6.webp",
      items: [
        "Scan Insertion & Compression",
        "Memory BIST (MBIST) & Logic BIST (LBIST)",
        "Boundary Scan (JTAG) Architecture",
        "ATPG & Fault Modeling",
      ],
    },
    {
      letter: "G",
      cardClass: "card-g",
      title: "Physical Design Implementation",
      desc: "Executing complete RTL-to-GDSII implementation flows with a focus on timing and physical convergence.",
      image: "chip_card_g_hover.webp",
      hoverImage: "s7.webp",
      items: [
        "Floorplanning & Partitioning",
        "Placement & Routing (P&R)",
        "Clock Tree Synthesis (CTS)",
        "Congestion & Cross-talk Management",
        "Low-Power Design (UPF/CPF Integration)",
        "Timing Closure",
      ],
    },
  ],
  postsilicon: [
    {
      letter: "I",
      cardClass: "card-i",
      title: "Fabrication Support",
      desc: "Supporting seamless transition from tapeout to wafer fabrication through foundry engagement and manufacturing coordination.",
      image: "chip_card_i_hover.webp",
      hoverImage: "s9.webp",
      items: [
        "Foundry Coordination",
        "Process Technology Support (FinFET/GAA)",
        "Tapeout Package Preparation",
        "Manufacturing Documentation",
        "Wafer Fabrication Monitoring",
        "Yield Estimation & Management",
      ],
    },
    {
      letter: "J",
      cardClass: "card-j",
      title: "Semiconductor Packaging & Assembly Support",
      desc: "Enabling reliable device packaging, assembly, and advanced integration for production deployment.",
      image: "chip_card_j_hover1.webp",
      hoverImage: "s10.webp",
      items: [
        "Package Selection & Planning",
        "Advanced Packaging Support (2.5D, 3D IC, Chiplets)",
        "Assembly Support",
        "Thermal Considerations",
        "Signal & Power Integrity Review",
        "Package Qualification Support",
      ],
    },
    {
      letter: "K",
      cardClass: "card-k",
      title: "Silicon Bring-Up & Characterization",
      desc: "Enabling first-silicon validation and device characterization for functional and performance verification.",
      image: "chip_card_k_hover.webp",
      hoverImage: "s11.webp",
      items: [
        "Silicon Bring-Up & First-Silicon Validation",
        "Device Characterization",
        "Board Bring-Up Support",
        "Functional Debug & Performance Characterization (Schmoo Plots)",
        "Hardware Debug & Analysis",
        "ATE Test Program Development (Wafers/Package)",
      ],
    },
    {
      letter: "L",
      cardClass: "card-l",
      title: "Post-Silicon Validation & Production Readiness",
      desc: "Validating silicon functionality, software stack, reliability, and production readiness for successful deployment.",
      image: "chip_card_l_hover.webp",
      hoverImage: "s12.webp",
      items: [
        "Functional & System-Level Validation",
        "Firmware, Driver & SDK Development",
        "Protocol Compliance & Interoperability Testing",
        "Reliability Testing Support (HTOL/ESD)",
        "Performance Validation",
        "Failure Analysis Support",
        "Production Readiness & Yield Optimization",
      ],
    },
  ],
};

const allServices = [
  ...services.frontend,
  ...services.backend,
  ...services.postsilicon
];

const phaseStartIndexes = {
  frontend: 0,
  backend: services.frontend.length,
  postsilicon: services.frontend.length + services.backend.length,
};

const getPhaseForServiceIndex = (index) => {
  if (index >= phaseStartIndexes.postsilicon) return "postsilicon";
  if (index >= phaseStartIndexes.backend) return "backend";
  return "frontend";
};

/**
 * Renders one lifecycle service card and its active visual state.
 *
 * @param {Object} props
 * @param {Object} props.service - Service content and supporting imagery.
 * @param {boolean} props.isActive - Whether the card is centered in the viewport.
 */

function ServiceCard({ service, isActive }) {
  return (
    <article className={`service-card ${service.cardClass} ${isActive ? "is-active" : ""}`}>
      <div className="service-card__bg">
        {service.image && <img className="service-card__bg-mask" src={imageUrl(service.image)} alt="" decoding="async" />}
        <img className="service-card__bg-hover" src={imageUrl(service.hoverImage)} alt="" decoding="async" />
      </div>
      <h3>{service.title}</h3>
      <p className="card-desc">{service.desc}</p>
      <ul>
        {service.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

// ==========================================
// 4. FAQ SECTION DATA & COMPONENTS
// ==========================================

const faqItems = [
  {
    q: "Can VCTS support a project from architecture through production?",
    a: "Yes. VCTS covers front-end architecture and RTL, verification, physical design and signoff, tapeout support, silicon bring-up, validation, and production-readiness activities."
  },
  {
    q: "Do you work on both ASIC and FPGA designs?",
    a: "Yes. The team supports ASIC and SoC programs as well as FPGA design, prototyping, emulation, timing closure, hardware validation, and high-speed interface integration."
  },
  {
    q: "Which verification methodologies and protocols do you handle?",
    a: "VCTS supports UVM-based verification, testbench development, coverage-driven verification, assertions, formal methods, regressions, and protocol verification for interfaces such as PCIe, DDR, USB, Ethernet, and related IP."
  },
  {
    q: "Can you join only one phase of an existing program?",
    a: "Yes. Engagements can start at a specific phase, such as RTL cleanup, verification closure, DFT, place and route, STA, physical verification, bring-up, failure analysis, or yield optimization."
  },
  {
    q: "Do you support foundry, packaging, and tapeout coordination?",
    a: "Yes. VCTS can assist with foundry coordination, tapeout package preparation, manufacturing documentation, advanced packaging support, qualification support, and wafer fabrication monitoring."
  },
  {
    q: "How do we start a new engagement?",
    a: "Send a short project brief, target technology or platform, current design phase, schedule expectations, and support areas needed. VCTS can then scope the work and align the right engineering plan."
  }
];

/** Renders the complete VLSI service page and its scroll-driven lifecycle. */

export default function Vlsi({ navigationRequest }) {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const gridRef = useRef(null);
  const activePhaseRef = useRef("frontend");
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [activePhase, setActivePhase] = useState("frontend");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const centeredIndexRef = useRef(0);
  const [formSent, setFormSent] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef(null);
  const isRouteNavigationRef = useRef(false);
  const isSkippingUpRef = useRef(false);
  const lastScrollYRef = useRef(0);

  const isAtHeroPosition = () => {
    const hero = rootRef.current?.querySelector(".vlsipg-hero");
    if (!hero) return false;

    const heroTop = hero.getBoundingClientRect().top + window.scrollY;
    return Math.abs(window.scrollY - heroTop) <= 1;
  };

  const releaseNavigationLock = () => {
    isRouteNavigationRef.current = false;
    isNavigatingRef.current = false;
    isSkippingUpRef.current = false;
    lastScrollYRef.current = window.scrollY;
    gridRef.current?.classList.remove("transitioning-back");
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
  };

  const startRouteNavigationLock = () => {
    isRouteNavigationRef.current = true;
    isNavigatingRef.current = true;
    isSkippingUpRef.current = false;
    lastScrollYRef.current = 0;
    gridRef.current?.classList.remove("transitioning-back");
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }

    // The App scroll runs after this page mounts. Release only once that
    // immediate route scroll has actually reached the hero.
    requestAnimationFrame(() => {
      if (isRouteNavigationRef.current && isAtHeroPosition()) {
        releaseNavigationLock();
      }
    });
  };

  const startNavigationLock = () => {
    isNavigatingRef.current = true;
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  // Coordinate with the application shell before it performs a route scroll.

  useEffect(() => {
    const handleNavigationStart = () => startRouteNavigationLock();

    window.addEventListener("vcts:navigation-start", handleNavigationStart);
    return () => window.removeEventListener("vcts:navigation-start", handleNavigationStart);
  }, []);

  // A newly mounted VLSI page cannot receive the synchronous event dispatched
  // by the previous page, so carry the navigation request into this instance.

  useEffect(() => {
    if (navigationRequest?.key > 0 || navigationRequest?.targetId === "top") {
      startRouteNavigationLock();
    }
  }, [navigationRequest?.key, navigationRequest?.targetId]);

  // Add the compact navigation treatment after the page begins scrolling.

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const nav = root.querySelector("#nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 20);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Remove the global listener when the VLSI page unmounts.

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate background blobs only while their layer is visible.

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const blobs = Array.from(root.querySelectorAll(".blob"));
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let frameId = 0;
    let isVisible = true;

    const onMouseMove = (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      if (!isVisible) {
        frameId = 0;
        return;
      }

      curX += (mouseX * 35 - curX) * 0.08;
      curY += (mouseY * 35 - curY) * 0.08;

      blobs.forEach((blob, index) => {
        const speed = [0.15, -0.22, 0.28, -0.18][index] || 0.2;
        blob.style.transform = `translate3d(0, ${window.scrollY * speed + curY * 0.08 + curX * 0.04}px, 0)`;
      });

      frameId = requestAnimationFrame(tick);
    };

    const bgLayer = root.querySelector(".bg-layer");
    let observer = null;
    if (bgLayer && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !frameId) {
          frameId = requestAnimationFrame(tick);
        }
      }, { threshold: 0 });
      observer.observe(bgLayer);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Stop pointer and visibility observers before the decorative layer is detached.

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (observer) {
        observer.disconnect();
      }
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Coordinate the hero entrance and one-time viewport reveals for later content.

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const heroFigure = root.querySelector(".vlsipg-hero-figure");
    if (heroFigure) {
      heroFigure.classList.remove("vlsipg-scanned");
    }

    // Set initial states for clean vertical text entrance & image lens zoom

    gsap.set(".vlsipg-eyebrow", { opacity: 0, y: 12 });
    gsap.set(".vlsipg-line-inner", { opacity: 0, yPercent: 110 });
    gsap.set(".vlsipg-lede", { opacity: 0, y: 16 });
    gsap.set(".vlsipg-hero-actions", { opacity: 0, y: 14 });
    gsap.set(".vlsipg-hero-meta", { opacity: 1, transform: "none" });
    gsap.set(".vlsipg-hero-meta > div", { opacity: 0, y: 14 });
    gsap.set(".vlsipg-hero-right", { opacity: 0, y: 20 });
    gsap.set(".vlsipg-hero-badge", { opacity: 0, y: 14 });
    gsap.set(".vlsipg-hero-figure img", { scale: 1.1, filter: "brightness(0.92)" });

    const heroTL = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        root.querySelectorAll(".vlsipg-hero .vlsipg-reveal").forEach((el) => el.classList.add("in"));
        gsap.set([".vlsipg-eyebrow", ".vlsipg-line-inner", ".vlsipg-lede", ".vlsipg-hero-actions", ".vlsipg-hero-meta", ".vlsipg-hero-meta > div", ".vlsipg-hero-right", ".vlsipg-hero-badge", ".vlsipg-hero-figure img"], {
          clearProps: "transform,filter,willChange,perspective,scale"
        });
      }
    });

    heroTL
      .to(".vlsipg-eyebrow", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      .to(".vlsipg-line-inner", {
        opacity: 1,
        yPercent: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power4.out"
      }, "-=0.2")
      .to(".vlsipg-hero-right", { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out" }, "-=0.6")
      .to(".vlsipg-hero-figure img", { scale: 1, filter: "brightness(1)", duration: 0.8, ease: "power2.out" }, "-=0.75")
      .to(".vlsipg-lede", { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.55")
      .to(".vlsipg-hero-actions", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.35")
      .to(".vlsipg-hero-meta > div", { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.25")
      .to(".vlsipg-hero-badge", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25");

    if (!("IntersectionObserver" in window)) {
      root?.querySelectorAll(".vlsipg-reveal").forEach((element) => element.classList.add("in"));
      // Stop the hero timeline when no reveal observer was created.

      return () => heroTL.kill();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 100px -40px 100px" }
    );

    root.querySelectorAll(".vlsipg-reveal:not(.vlsipg-hero *):not(.in)").forEach((element) => observer.observe(element));

    // Disconnect reveal observation and destroy the hero timeline on navigation.

    return () => {
      heroTL.kill();
      observer.disconnect();
    };
  }, []);

  // Apply pointer-responsive perspective to the hero image on capable devices.

  useEffect(() => {
    const tilt = tiltRef.current;
    const parent = tilt?.parentElement;
    if (!tilt || !parent) return undefined;

    const onMouseMove = (event) => {
      const rect = parent.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = `perspective(1200px) rotateY(${-4 + x * 4}deg) rotateX(${2 - y * 4}deg)`;
    };

    const onMouseLeave = () => {
      tilt.style.transform = "";
    };

    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);

    // Detach pointer listeners when the tilted artwork leaves the page.

    return () => {
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  /* Track the pointer position shared by the background canvas simulation. */

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    // Remove the pointer listener shared with the background simulation.

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* Render and resize the interactive semiconductor network background. */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let nodes = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(25, Math.min(65, Math.floor((W * H) / 28000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 2 + 1.5,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.03
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const draw = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const dt = (timestamp - lastTime) / 16.666;
      lastTime = timestamp;

      const scrollY = window.scrollY || window.pageYOffset;
      const startFade = 50;
      const endFade = window.innerHeight * 0.85;
      let opacity = 0;
      if (scrollY > startFade) {
        opacity = Math.min(1, (scrollY - startFade) / (endFade - startFade));
      }
      canvas.style.opacity = opacity;

      if (opacity === 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);
      const mouse = mouseRef.current;

      // Draw subtle background circuit grid

      ctx.strokeStyle = "rgba(15, 58, 133, 0.02)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      nodes.forEach((n) => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 150 && d > 0.1) {
          const force = (150 - d) / 150;
          n.x += (dx / d) * force * 1.5;
          n.y += (dy / d) * force * 1.5;
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 160) {
            const alpha = (1 - d / 160) * 0.35;

            ctx.strokeStyle = `rgba(15, 58, 133, ${alpha * 0.5})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            const time = (timestamp * 0.001 * (0.8 + a.pulseSpeed)) % 1;
            let px = a.x;
            let py = a.y;

            if (time < 0.5) {
              const t = time * 2;
              px = a.x + (b.x - a.x) * t;
              py = a.y;
            } else {
              const t = (time - 0.5) * 2;
              px = b.x;
              py = a.y + (b.y - a.y) * t;
            }

            ctx.beginPath();
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(15, 58, 133, ${alpha * 0.8})`;
            ctx.fill();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(15, 58, 133, 0.35)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    // Cancel drawing and resizing work before the canvas is removed.

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const geometryRef = useRef({
    cardCenters: [],
    startTranslation: 0,
    maxTranslation: 0,
  });

  const computeGeometry = () => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".service-card");
    if (cards.length === 0) return;

    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];

    const firstCardCenter = firstCard.offsetLeft + firstCard.clientWidth / 2;
    const lastCardCenter = lastCard.offsetLeft + lastCard.clientWidth / 2;
    const viewportCenter = window.innerWidth / 2;
    const startTranslation = Math.max(0, firstCardCenter - viewportCenter);
    const maxTranslation = Math.max(startTranslation, lastCardCenter - viewportCenter);

    const cardCenters = Array.from(cards).map((card) => {
      return card.offsetLeft + card.clientWidth / 2;
    });

    geometryRef.current = {
      cardCenters,
      startTranslation,
      maxTranslation,
    };
  };

  // Recompute geometry after active-card styling changes dimensions or offsets.
  // Synchronize desktop scroll progress, mobile horizontal scrolling,
  // lifecycle tabs, active cards, and responsive geometry.

  useEffect(() => {
    computeGeometry();
  }, [activeIndex]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleScrollEnd = () => {
      if (isRouteNavigationRef.current) return;

      isNavigatingRef.current = false;
      isSkippingUpRef.current = false;
      grid.classList.remove("transitioning-back");
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };

    const handleGridScroll = () => {
      // Only run on mobile

      const isDesktop = window.innerWidth >= 1025;
      if (isDesktop) return;

      if (isNavigatingRef.current) return;

      const scrollLeft = grid.scrollLeft;
      const center = scrollLeft + grid.clientWidth / 2;
      const cards = Array.from(grid.querySelectorAll(".service-card"));
      if (cards.length === 0) return;

      let nearestIndex = 0;
      let minDistance = Infinity;

      const centers = geometryRef.current.cardCenters;

      cards.forEach((card, currentIndex) => {
        const cardCenter = (centers && centers[currentIndex] !== undefined)
          ? centers[currentIndex]
          : (card.offsetLeft + card.clientWidth / 2);
        const dist = Math.abs(cardCenter - center);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIndex = currentIndex;
        }
      });

      if (nearestIndex !== activeIndexRef.current) {
        activeIndexRef.current = nearestIndex;
        setActiveIndex(nearestIndex);
      }

      if (nearestIndex !== centeredIndexRef.current) {
        centeredIndexRef.current = nearestIndex;
        setCenteredIndex(nearestIndex);
      }

      const currentPhase = getPhaseForServiceIndex(nearestIndex);
      if (currentPhase !== activePhaseRef.current) {
        activePhaseRef.current = currentPhase;
        setActivePhase(currentPhase);
      }
    };

    const handleWindowScroll = () => {
      const isDesktop = window.innerWidth >= 1025;
      if (!isDesktop) {
        if (grid) {
          grid.style.transform = "";
        }
        return;
      }

      const container = scrollSectionRef.current;
      if (!container || !grid) return;

      // Application navigation owns the route scroll. Do not let the
      // capabilities section interpret that movement as an upward skip.
      if (isRouteNavigationRef.current) {
        if (isAtHeroPosition()) {
          releaseNavigationLock();
        }
        return;
      }

      const rect = container.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const end = start + container.clientHeight - window.innerHeight;

      const currentScroll = window.scrollY;
      const prevScroll = lastScrollYRef.current;
      lastScrollYRef.current = currentScroll;

      const isScrollingUp = currentScroll < prevScroll;

      // Cancel skipping if scrolling direction becomes down

      if (!isScrollingUp && isSkippingUpRef.current) {
        isSkippingUpRef.current = false;
        grid.classList.remove("transitioning-back");
      }

      // Detect entering the capabilities scroll section from the bottom (scrolling up)

      if (
        isScrollingUp
        && !isSkippingUpRef.current
        && !isNavigatingRef.current
        && prevScroll >= end
        && currentScroll >= start
        && currentScroll < end
      ) {
        isSkippingUpRef.current = true;
        grid.classList.add("transitioning-back");
        startNavigationLock();
        window.scrollTo({
          top: start,
          behavior: "smooth"
        });
      }

      // If we are currently skipping up, force translate to start (first card) and don't animate

      if (isSkippingUpRef.current) {
        const { startTranslation } = geometryRef.current;
        grid.style.transform = `translate3d(${-startTranslation}px, 0, 0)`;

        if (activeIndexRef.current !== 0) {
          activeIndexRef.current = 0;
          setActiveIndex(0);
        }
        if (centeredIndexRef.current !== 0) {
          centeredIndexRef.current = 0;
          setCenteredIndex(0);
        }
        if (activePhaseRef.current !== "frontend") {
          activePhaseRef.current = "frontend";
          setActivePhase("frontend");
        }
        return;
      }

      const startBuffer = window.innerHeight * 0.2;
      const endBuffer = window.innerHeight * 0.2;
      const activeStart = start + startBuffer;
      const activeEnd = end - endBuffer;

      let progress = 0;
      if (currentScroll > activeStart) {
        progress = Math.max(0, Math.min(1, (currentScroll - activeStart) / (activeEnd - activeStart)));
      }

      const { cardCenters, startTranslation, maxTranslation } = geometryRef.current;
      const translation = startTranslation + progress * (maxTranslation - startTranslation);
      grid.style.transform = `translate3d(${-translation}px, 0, 0)`;

      // If programmatically navigating, lock active index updates to prevent layout-shift race conditions

      if (isNavigatingRef.current) return;

      const viewportCenter = window.innerWidth / 2;
      const targetCenterInGrid = translation + viewportCenter;

      let nearestIndex = 0;
      let minDistance = Infinity;

      const cards = grid.querySelectorAll(".service-card");
      if (cards.length === 0) return;

      cards.forEach((card, currentIndex) => {
        const cardCenter = (cardCenters && cardCenters[currentIndex] !== undefined)
          ? cardCenters[currentIndex]
          : (card.offsetLeft + card.clientWidth / 2);

        const dist = Math.abs(cardCenter - targetCenterInGrid);

        if (dist < minDistance) {
          minDistance = dist;
          nearestIndex = currentIndex;
        }
      });

      if (nearestIndex !== activeIndexRef.current) {
        activeIndexRef.current = nearestIndex;
        setActiveIndex(nearestIndex);
      }

      if (nearestIndex !== centeredIndexRef.current) {
        centeredIndexRef.current = nearestIndex;
        setCenteredIndex(nearestIndex);
      }

      const currentPhase = getPhaseForServiceIndex(nearestIndex);
      if (currentPhase !== activePhaseRef.current) {
        activePhaseRef.current = currentPhase;
        setActivePhase(currentPhase);
      }
    };

    const handleResize = () => {
      computeGeometry();
      handleWindowScroll();
      handleGridScroll();
    };

    // Initialize geometry before subscribing to scroll and resize events.
    // Defer the initial scroll-position read to a rAF so the browser flushes
    // any pending scrollTo(0, 0) call first. Initialising lastScrollYRef to 0
    // prevents the first scroll event from thinking we're scrolled way down.

    computeGeometry();
    lastScrollYRef.current = 0;
    requestAnimationFrame(() => {
      lastScrollYRef.current = window.scrollY;
      handleWindowScroll();
      handleGridScroll();
    });

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    grid.addEventListener("scroll", handleGridScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    grid.addEventListener("scrollend", handleScrollEnd, { passive: true });

    // Remove all global and grid listeners and clear delayed navigation state.

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      grid.removeEventListener("scroll", handleGridScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scrollend", handleScrollEnd);
      grid.removeEventListener("scrollend", handleScrollEnd);
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const setActiveCardState = (index) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    centeredIndexRef.current = index;
    setCenteredIndex(index);

    const currentPhase = getPhaseForServiceIndex(index);

    if (currentPhase !== activePhaseRef.current) {
      activePhaseRef.current = currentPhase;
      setActivePhase(currentPhase);
    }
  };

  const scrollToCard = (index, behavior = "smooth") => {
    if (index < 0 || index >= allServices.length) return;

    setActiveCardState(index);
    startNavigationLock();
    const isInstant = behavior === "instant";
    const isDesktop = window.innerWidth >= 1025;
    if (!isDesktop) {
      const grid = gridRef.current;
      if (!grid) return;
      const card = grid.querySelectorAll(".service-card")[index];
      if (card) {
        const maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth);
        const targetLeft = Math.max(
          0,
          Math.min(maxScroll, card.offsetLeft + card.clientWidth / 2 - grid.clientWidth / 2)
        );

        if (isInstant) {
          const previousScrollBehavior = grid.style.scrollBehavior;
          grid.style.scrollBehavior = "auto";
          grid.scrollLeft = targetLeft;
          requestAnimationFrame(() => {
            grid.style.scrollBehavior = previousScrollBehavior;
            isNavigatingRef.current = false;
          });
        } else {
          grid.scrollTo({
            left: targetLeft,
            behavior,
          });
        }
      }
      return;
    }

    const container = scrollSectionRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const rect = container.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const end = start + container.clientHeight - window.innerHeight;

    const cards = grid.querySelectorAll(".service-card");
    if (cards.length === 0) return;

    const { cardCenters, startTranslation, maxTranslation } = geometryRef.current;
    const targetCardCenter = (cardCenters && cardCenters[index] !== undefined)
      ? cardCenters[index]
      : (cards[index].offsetLeft + cards[index].clientWidth / 2);

    const viewportCenter = window.innerWidth / 2;
    const targetTranslation = Math.max(
      startTranslation,
      Math.min(maxTranslation, targetCardCenter - viewportCenter)
    );

    const progress = maxTranslation > startTranslation
      ? (targetTranslation - startTranslation) / (maxTranslation - startTranslation)
      : 0;

    const startBuffer = window.innerHeight * 0.2;
    const endBuffer = window.innerHeight * 0.2;
    const activeStart = start + startBuffer;
    const activeEnd = end - endBuffer;
    const targetScroll = activeStart + progress * (activeEnd - activeStart);

    if (isInstant) {
      grid.style.transform = `translate3d(${-targetTranslation}px, 0, 0)`;

      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      // eslint-disable-next-line react-hooks/immutability

      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo({
        top: targetScroll,
        behavior: "auto",
      });
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        isNavigatingRef.current = false;
      });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior,
      });
    }
  };

  const switchPhase = (phaseId) => {
    if (phaseId === activePhaseRef.current) return;

    activePhaseRef.current = phaseId;
    setActivePhase(phaseId);

    // Scroll to the first card index of the selected phase

    const targetIndex = phaseStartIndexes[phaseId] ?? 0;

    activeIndexRef.current = targetIndex;
    setActiveIndex(targetIndex);
    centeredIndexRef.current = targetIndex;
    setCenteredIndex(targetIndex);
    scrollToCard(targetIndex, "instant");
  };

  return (
    <main className="vlsi-page" ref={rootRef}>
      <div className="bg-layer" aria-hidden="true">
        <canvas ref={canvasRef} className="vlsipg-bg-canvas" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="noise" />
      </div>

      {/* Semiconductor value proposition and hero imagery */}

      <section className="vlsipg-hero" id="top">
        <div className="vlsipg-hero-grid container">
          <div className="vlsipg-hero-left">
            <div className="vlsipg-eyebrow vlsipg-reveal">
              <span className="vlsipg-dot" /> {heroData.eyebrow}
            </div>
            <h1 className="vlsipg-display">
              <span className="vlsipg-title-line">
                <span className="vlsipg-line-inner">{heroData.titleLine1}</span>
              </span>
              <br />
              <span className="vlsipg-title-line">
                <span className="vlsipg-line-inner">{heroData.titleLine2}</span>
              </span>
              <br />
              <span className="vlsipg-title-line">
                <span className="vlsipg-line-inner vlsipg-hl">{heroData.titleHighlight}</span>
              </span>
            </h1>
            <p className="vlsipg-lede vlsipg-reveal vlsipg-delay-2">
              {heroData.lede}
            </p>
            <div className="vlsipg-hero-actions vlsipg-reveal vlsipg-delay-3">
              <a href="#capabilities" className="vlsipg-btn vlsipg-btn-primary">
                <span className="vlsipg-btn__label">Explore Services</span>
                <span className="vlsipg-btn__icon" aria-hidden="true">→</span>
              </a>
              <a href="#cta" className="vlsipg-btn vlsipg-btn-ghost">
                Talk to an engineer
              </a>
            </div>
            <dl className="vlsipg-hero-meta vlsipg-reveal vlsipg-delay-4">
              {heroData.stats.map((stat, idx) => (
                <div key={idx}>
                  <dt>{stat.value}</dt>
                  <dd>
                    {stat.labelLine1}
                    <br />
                    {stat.labelLine2}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="vlsipg-hero-right vlsipg-reveal vlsipg-delay-5">
            <figure className="vlsipg-hero-figure tilt" ref={tiltRef}>
              <img src={imageUrl(heroData.image)} alt="Macro photograph of a silicon microchip" loading="eager" fetchPriority="high" decoding="async" />
              <figcaption>
                <span className="vlsipg-cap-line">{heroData.caption.fig}</span>
                <span className="vlsipg-cap-title">{heroData.caption.title}</span>
                <span className="vlsipg-cap-loc">{heroData.caption.loc}</span>
              </figcaption>
            </figure>
            <div className="vlsipg-hero-badge vlsipg-floaty">
              <span className="vlsipg-pulse" />
              <div>
                <strong>{heroData.badge.title}</strong>
                <small>{heroData.badge.subtitle}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Repeating service-category marquee */}

      <Marquee />

      {/* Scroll-driven semiconductor lifecycle service cards */}

      <section className="section capabilities capabilities-scroll-container" id="capabilities" ref={scrollSectionRef}>
        <div
          className="capabilities-sticky-wrapper"
          ref={scrollWrapperRef}
        >
          <div className="container">
            <div className="cap-head">
              <div className="cap-title-block">
                <h2 className="vlsipg-display-2 capabilities-title">
                  Comprehensive
                  <br />
                  Across the <em>Chip</em> Lifecycle
                </h2>
              </div>
              <p className="section-note vlsipg-reveal">Deep expertise at every stage—from silicon concept to production scale.</p>
            </div>

            <div className="cap-nav-block vlsipg-reveal">
              <div className="caps-tabs">
                {phases.map((phase) => (
                  <button
                    className={`caps-tab ${activePhase === phase.id ? "active" : ""}`}
                    type="button"
                    key={phase.id}
                    onClick={() => switchPhase(phase.id)}
                  >
                    {phase.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="service-grid"
            ref={gridRef}
          >
            {allServices.map((service, index) => (
              <ServiceCard service={service} isActive={centeredIndex === index} key={service.letter} />
            ))}
          </div>

          <div className="cap-dots">
            {allServices.map((_, index) => (
              <button
                key={index}
                className={`cap-dot ${activeIndex === index ? "active" : ""}`}
                type="button"
                onClick={() => scrollToCard(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project inquiry and email capture */}

      <section className="cta" id="cta">
        <div className="container vlsipg-reveal">
          <h2 className="vlsipg-display-2">
            Have a custom silicon project that needs
            <br />
            <em>real</em> engineering underneath it?
          </h2>
          <p>
            We take on a small, deliberate number of engagements each quarter. Tell us what you're
            building — we'll reply within two working days with a preliminary read.
          </p>
          <form
            className="cta-form"
            onSubmit={(event) => {
              event.preventDefault();
              setFormSent(true);
            }}
          >
            <input type="email" placeholder="your@work-email.com" required />
            <button type="submit">{formSent ? "Sent · we'll be in touch" : "Talk to us →"}</button>
          </form>
          <div className="cta-alt">
            or write directly to <a href="mailto:hr@vconnectech.in">hr@vconnectech.in</a>
          </div>
        </div>
      </section>

      {/* Semiconductor capability brochure */}

      <section className="brochure-section">
        <div className="container">
          <div className="brochure-card vlsipg-reveal">
            <div className="brochure-content">
              <h3 className="brochure-title">
                <em>Semiconductor Engineering</em> Capability Brochure
              </h3>
              <p className="brochure-description">
                Learn about our complete engineering workflow, technologies, development process, industries, and project delivery approach.
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="vlsipg-btn vlsipg-btn-primary brochure-btn"
              >
                <span className="vlsipg-btn__label">Download Brochure</span>
                <span className="vlsipg-btn__icon" aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="brochure-visual">
              <img src={imageUrl("semiconductor_brochure.webp")} alt="Semiconductor engineering wafer probing" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Frequently asked engagement questions */}

      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-head split vlsipg-reveal">
            <div>
              <h2 className="vlsipg-display-2">Answers before<br /><em>we start engineering</em></h2>
            </div>
            <p className="section-note">A quick view of how VCTS engages across ASIC, FPGA, physical design, and post-silicon programs.</p>
          </div>

          <div className="faq-list vlsipg-reveal">
            {faqItems.map((item, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                  onMouseEnter={() => setActiveFaqIndex(index)}
                >
                  <div
                    className="faq-question"
                    onClick={() => setActiveFaqIndex(index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon-indicator" />
                  </div>
                  <div className="faq-answer-wrapper">
                    <div className="faq-answer-content">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
