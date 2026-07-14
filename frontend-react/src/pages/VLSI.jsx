import { Fragment, useEffect, useRef, useState } from "react";
import "../assets/css/VLSI.css";

const imageUrl = (fileName) => new URL(`../assets/image/VLSI/${fileName}`, import.meta.url).href;

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
      image: "chip_card_a_hover.png",
      hoverImage: "s1.png",
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
      image: "chip_card_b_hover1.png",
      hoverImage: "s2.png",
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
      image: "chip_card_c_hover.png",
      hoverImage: "s3.png",
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
      image: "chip_card_d_hover.png",
      hoverImage: "s4.png",
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
      image: "chip_card_e_hover.png",
      hoverImage: "s5.png",
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
      image: "chip_card_f_hover2.png",
      hoverImage: "s6.png",
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
      image: "chip_card_g_hover.png",
      hoverImage: "s7.png",
      items: [
        "Floorplanning & Partitioning",
        "Placement & Routing (P&R)",
        "Clock Tree Synthesis (CTS)",
        "Congestion & Cross-talk Management",
        "Low-Power Design (UPF/CPF Integration)",
        "Timing Closure",
      ],
    },
    {
      letter: "H",
      cardClass: "card-h",
      title: "Timing, Power, Signoff & Tapeout Support",
      desc: "Delivering tape-out-ready designs through comprehensive timing, reliability, and physical signoff analysis.",
      image: "chip_card_h_hover.png",
      hoverImage: "s8.png",
      items: [
        "Static Timing Analysis (STA)",
        "Power Integrity & EM/IR-Drop Analysis",
        "Signal Integrity Analysis",
        "Physical Verification (DRC/LVS/ERC)",
        "Design for Manufacturability (DFM) & Metal Fill",
        "Logic Equivalence Checking (LEC)",
        "Tape-Out Readiness & Support",
      ],
    },
  ],
  postsilicon: [
    {
      letter: "I",
      cardClass: "card-i",
      title: "Fabrication Support",
      desc: "Supporting seamless transition from tapeout to wafer fabrication through foundry engagement and manufacturing coordination.",
      image: "chip_card_i_hover.png",
      hoverImage: "s9.png",
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
      image: "chip_card_j_hover1.png",
      hoverImage: "s10.png",
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
      image: "chip_card_k_hover.png",
      hoverImage: "s11.png",
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
      image: "chip_card_l_hover.png",
      hoverImage: "s12.png",
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

function ServiceCard({ service, isActive }) {
  return (
    <article className={`service-card ${service.cardClass} ${isActive ? "is-active" : ""}`}>
      <div className="service-card__bg">
        {service.image && <img className="service-card__bg-mask" src={imageUrl(service.image)} alt="" />}
        <img className="service-card__bg-hover" src={imageUrl(service.hoverImage)} alt="" />
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

const allServices = [
  ...services.frontend,
  ...services.backend,
  ...services.postsilicon
];

export default function Vlsi() {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const gridRef = useRef(null);
  const activePhaseRef = useRef("frontend");
  const [activePhase, setActivePhase] = useState("frontend");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const centeredIndexRef = useRef(0);
  const [formSent, setFormSent] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef(null);
  const isSkippingUpRef = useRef(false);
  const lastScrollYRef = useRef(0);

  const startNavigationLock = () => {
    isNavigatingRef.current = true;
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const nav = root.querySelector("#nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 20);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      root?.querySelectorAll(".reveal").forEach((element) => element.classList.add("in"));
      return undefined;
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

    root.querySelectorAll(".reveal:not(.in)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

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

    return () => {
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
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

  // Re-compute geometry whenever activeIndex changes because changing active states may affect widths/offsets
  useEffect(() => {
    computeGeometry();
  }, [activeIndex]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleScrollEnd = () => {
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

      let currentPhase = "frontend";
      if (nearestIndex >= 8) {
        currentPhase = "postsilicon";
      } else if (nearestIndex >= 4) {
        currentPhase = "backend";
      }
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
      if (isScrollingUp && !isSkippingUpRef.current && !isNavigatingRef.current && prevScroll >= end && currentScroll < end) {
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

      let currentPhase = "frontend";
      const phaseIndex = nearestIndex;
      if (phaseIndex >= 8) {
        currentPhase = "postsilicon";
      } else if (phaseIndex >= 4) {
        currentPhase = "backend";
      }
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

    // Initial calculation and scroll handling
    computeGeometry();
    lastScrollYRef.current = window.scrollY;
    handleWindowScroll();
    handleGridScroll();

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    grid.addEventListener("scroll", handleGridScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    grid.addEventListener("scrollend", handleScrollEnd, { passive: true });

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

    let currentPhase = "frontend";
    if (index >= 8) {
      currentPhase = "postsilicon";
    } else if (index >= 4) {
      currentPhase = "backend";
    }

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
    let targetIndex = 0;
    if (phaseId === "backend") targetIndex = 4;
    else if (phaseId === "postsilicon") targetIndex = 8;

    activeIndexRef.current = targetIndex;
    setActiveIndex(targetIndex);
    centeredIndexRef.current = targetIndex;
    setCenteredIndex(targetIndex);
    scrollToCard(targetIndex, "instant");
  };

  return (
    <main className="vlsi-page" ref={rootRef}>
      <div className="bg-layer" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="noise" />
      </div>

      <section className="hero" id="top">
        <div className="grid-overlay" />
        <div className="hero-grid container">
          <div className="hero-left reveal">
            <div className="eyebrow">
              <span className="dot" /> Semiconductor Engineering
            </div>
            <h1 className="display">
              End-to-End
              <br />
              Semiconductor
              <br />
              <span className="hl">Solutions.</span>
            </h1>
            <p className="lede">
              From Architecture to Production-Ready Silicon — delivering specialized front-end design,
              back-end physical design, and post-silicon validation services.
            </p>
            <div className="hero-actions">
              <a href="#capabilities" className="btn btn-primary">
                <span className="btn__label">Explore</span>
                <span className="btn__icon" aria-hidden="true">→</span>
              </a>
              <a href="#cta" className="btn btn-ghost">
                Talk to an engineer
              </a>
            </div>
            <dl className="hero-meta">
              <div>
                <dt>03</dt>
                <dd>
                  Main service
                  <br />
                  phases
                </dd>
              </div>
              <div>
                <dt>12</dt>
                <dd>
                  Core engineering
                  <br />
                  capabilities
                </dd>
              </div>
            </dl>
          </div>
          <div className="hero-right reveal delay-1">
            <figure className="hero-figure tilt" ref={tiltRef}>
              <img src={imageUrl("hero_chip.png")} alt="Macro photograph of a silicon microchip" />
              <figcaption>
                <span className="cap-line">Fig. 001</span>
                <span className="cap-title">Custom Silicon — 7nm Architecture</span>
                <span className="cap-loc">In-house lab · Bengaluru</span>
              </figcaption>
            </figure>
            <div className="hero-badge floaty">
              <span className="pulse" />
              <div>
                <strong>Silicon Success</strong>
                <small>100% tapeout rate · 7nm / 5nm / 3nm</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section capabilities capabilities-scroll-container" id="capabilities" ref={scrollSectionRef}>
        <div
          className="capabilities-sticky-wrapper"
          ref={scrollWrapperRef}
        >
          <div className="container">
            <div className="cap-head">
              <div className="cap-title-block">
                <h2 className="display-2 capabilities-title">
                  Comprehensive
                  <br />
                  Across the <em>Chip</em> Lifecycle
                </h2>
              </div>
              <p className="section-note reveal">Deep expertise at every stage—from silicon concept to production scale.</p>
            </div>

            <div className="cap-nav-block reveal">
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

      <section className="cta" id="cta">
        <div className="container reveal">
          <h2 className="display-2">
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
            or write directly to <a href="mailto:hello@vconnectech.com">hello@vconnectech.com</a>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-head split reveal">
            <div>
              <h2 className="display-2">Answers before<br /><em>we start engineering</em></h2>
            </div>
            <p className="section-note">A quick view of how VCTS engages across ASIC, FPGA, physical design, and post-silicon programs.</p>
          </div>

          <div className="faq-list reveal">
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

      <section className="brochure-section">
        <div className="container">
          <div className="brochure-card reveal">
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
                className="btn btn-primary brochure-btn"
              >
                <span className="btn__label">Download Brochure</span>
                <span className="btn__icon" aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="brochure-visual">
              <img src={imageUrl("semiconductor_brochure.jpg")} alt="Semiconductor engineering wafer probing" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}