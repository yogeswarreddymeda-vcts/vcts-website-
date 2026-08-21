import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/Embedded.css";
import EmbeddedImages from "../assets/image/Embedded/emi.js";

gsap.registerPlugin(ScrollTrigger);

/* ============ PROJECT DETAILS DATA ============ */
const PROJECT_DETAILS = {
  "Industrial IoT": {
    tag: "Industrial IoT",
    title: "Sub-metering gateway with edge inference",
    desc: "A smart power-monitoring node designed for industrial factory grids, providing sub-phase granularity analysis directly at the edge.",
    specs: ["Dual-core Cortex-M33 (160MHz)", "802.15.4 Mesh & LTE-M Fallback", "Class 0.2S Metrology Core"],
    challenge: "Developing a robust power supply capable of utilizing a small supercapacitor array to provide 10 seconds of 'last-gasp' telemetry when grid power fails.",
    stack: ["FreeRTOS", "Zephyr RTOS", "C / C++", "Altium Designer"]
  },
  "Healthcare": {
    tag: "Healthcare",
    title: "Wearable health monitoring, made simple",
    desc: "A medical-grade continuous health tracker capable of monitoring ECG, PPG, and temperature waveforms for clinical patients.",
    specs: ["Ultra-low power BLE 5.3 SoC", "High-Resolution Analog Front End", "14-Day Rechargeable Battery Life"],
    challenge: "Filtering human motion artifacts from the raw ECG sensor waveforms in real-time using a mathematical filter optimized for micro-watt computing budgets.",
    stack: ["Nordic SDK", "Bare-Metal C", "ARM CMSIS-DSP", "KiCad Pro"]
  },
  "Automotive": {
    tag: "Automotive",
    title: "Smart control for electric vehicles",
    desc: "High-performance motor controller and vehicle supervisory control unit (VCU) for next-generation light electric vehicles.",
    specs: ["Dual-MCU Lockstep Architecture", "CAN FD & Automotive Ethernet", "ISO-26262 ASIL-D Compliance"],
    challenge: "Maintaining low throttle latency (sub-millisecond) while protecting telemetry data against intense electro-magnetic interference (EMI) inside the motor bay.",
    stack: ["Bare-Metal C++", "STM32 Automotive MCUs", "Altium Designer", "MATLAB Simulink"]
  },
  "Consumer": {
    tag: "Consumer",
    title: "Everyday tech, designed to feel effortless",
    desc: "A smart home control module supporting the latest cross-vendor smart home standards for instant, local responsiveness.",
    specs: ["Matter over Thread Protocol", "Capacitive Touch Front Glass", "Universal Mains Voltage Input"],
    challenge: "Shrinking the switching power supply and the wireless antenna layout to fit inside standard junction boxes while keeping thermal dissipation under 40°C.",
    stack: ["ESP-IDF", "C Language", "Thread Protocol Stack", "SolidWorks Integration"]
  },
  "Aerospace": {
    tag: "Aerospace",
    title: "Built to perform in extreme conditions",
    desc: "High-altitude telemetry and sensor acquisition module certified for low-orbit launch vehicles and aerospace tracking.",
    specs: ["MIL-STD-810H Certified", "High-g Vibration Telemetry System", "Extended Temp Range (-40°C to +85°C)"],
    challenge: "Mitigating structural clock oscillator frequency drift and thermal spikes during atmospheric escape conditions.",
    stack: ["RT-Thread OS", "Bare-Metal Assembly & C", "High-Frequency RF Layout", "Ansys RFSS"]
  },
  "Edge AI": {
    tag: "Edge AI",
    title: "Intelligence that runs at the edge",
    desc: "A standalone vision and acoustic classification board that processes intelligence directly at the sensor without relying on cloud computation.",
    specs: ["NPU-Accelerated Cortex-M55", "TensorFlow Lite Micro Ready", "2.5 TOPS Computing Power"],
    challenge: "Quantizing and compressing complex deep learning models to fit inside 512KB of ultra-fast internal SRAM with zero drop in accuracy.",
    stack: ["C++", "CMSIS-NN", "TensorFlow Lite", "Edge Impulse Studio"]
  }
};
/* ============ END PROJECT DETAILS DATA ============ */

/* ============ SERVICES DATA ============ */
const SERVICES_DATA = [
  {
    letter: "A",
    title: "Embedded Hardware Engineering",
    description: "We design and develop production-ready embedded hardware platforms optimized for performance, reliability, manufacturability, and long-term product scalability.",
    items: [
      "Architecture & Hardware Planning",
      "Component Selection & BOM Engineering",
      "Schematic & PCB Design",
      "Power Management Design",
      "Sensor & MCU Integration",
      "Board Bring-Up & Validation",
      "DFM & DFT Implementation",
      "EMI/EMC, Thermal & Signal Integrity Analysis"
    ]
  },
  {
    letter: "B",
    title: "Bare-Metal & Firmware Development",
    description: "We develop efficient firmware and low-level software that provide deterministic control, optimized resource utilization, and seamless hardware interaction.",
    items: [
      "Firmware Architecture & Development",
      "Embedded C/C++ Programming",
      "Bare-Metal Firmware Development",
      "Bootloader Design & Customization",
      "BSP & HAL Development",
      "Peripheral Integration",
      "Algorithm Implementation",
      "Code, Memory & Performance Optimization"
    ]
  },
  {
    letter: "C",
    title: "BSP Development & Platform Enablement",
    description: "We enable custom hardware platforms through BSP development, hardware abstraction, platform bring-up, and system-level integration.",
    items: [
      "BSP Architecture & Development",
      "Board Bring-Up & Platform Enablement",
      "Hardware Abstraction Layer (HAL) Development",
      "Linux & RTOS Porting",
      "Peripheral & Interface Enablement",
      "Hardware-Software Integration",
      "Middleware Integration",
      "Platform Performance Optimization"
    ]
  },
  {
    letter: "D",
    title: "Real-Time Operating Systems (RTOS)",
    description: "We build deterministic real-time systems that deliver predictable task execution, low-latency response, and reliable multitasking performance.",
    items: [
      "RTOS Architecture & Integration",
      "Task Scheduling & Prioritization",
      "Message Queues, Mutexes & Semaphores",
      "Interrupt Management",
      "Multi-Threaded System Design",
      "Deterministic Control Implementation",
      "Memory & Resource Management",
      "Real-Time Performance Optimization"
    ]
  },
  {
    letter: "E",
    title: "Embedded Linux & High-Level OS",
    description: "We customize and optimize embedded operating systems to deliver stable, scalable, and feature-rich software platforms.",
    items: [
      "Embedded Linux Porting & Customization",
      "Yocto & Buildroot Development",
      "Kernel Configuration & Optimization",
      "Linux Device Driver Development",
      "Root Filesystem Optimization",
      "System Services Development",
      "Networking & File System Integration",
      "Secure Boot & OTA Enablement"
    ]
  },
  {
    letter: "F",
    title: "Device Drivers Development",
    description: "We develop robust device drivers that ensure reliable communication between hardware peripherals and software applications.",
    items: [
      "Peripheral Driver Development",
      "Sensor & Actuator Driver Integration",
      "Communication Drivers (I2C, SPI, UART, CAN, LIN)",
      "Linux Device Drivers",
      "RTOS Device Drivers",
      "Driver Porting & Adaptation",
      "Low-Power Driver Optimization",
      "Driver Debugging & Verification"
    ]
  },
  {
    letter: "G",
    title: "Wireless & Wired Connectivity",
    description: "We implement secure and reliable connectivity solutions that enable seamless communication between devices, gateways, cloud platforms, and enterprise systems.",
    items: [
      "BLE, Wi-Fi, Zigbee, Thread & Matter Integration",
      "LoRaWAN, NB-IoT & LTE-M Solutions",
      "CAN, RS485, Modbus, Ethernet & USB Integration",
      "MQTT, CoAP, HTTP & AMQP Protocols",
      "IoT Gateway Development",
      "Edge-to-Cloud Connectivity",
      "Edge AI Enablement",
      "Cloud & Embedded UI Integration"
    ]
  },
  {
    letter: "H",
    title: "Automotive & Functional Safety",
    description: "We develop automotive and safety-critical embedded systems with a focus on reliability, compliance, diagnostics, and real-time operation.",
    items: [
      "Automotive ECU Development",
      "CAN/LIN & UDS Integration",
      "Vehicle Communication Systems",
      "Diagnostic & Calibration Support",
      "Functional Safety Architecture",
      "Hazard & Risk Analysis (FMEA, FMEDA, HARA)",
      "Secure Boot & Firmware Security",
      "Certification & Compliance Support"
    ]
  },
  {
    letter: "I",
    title: "Testing, Validation & Embedded CI/CD",
    description: "We establish structured verification and validation workflows to improve software quality, accelerate development cycles, and ensure production-ready embedded systems.",
    items: [
      "Unit & Integration Testing",
      "System-Level Validation",
      "Regression Testing & Automation",
      "Hardware-in-the-Loop (HIL) Testing",
      "Embedded CI/CD Pipeline Development",
      "Performance & Stress Testing",
      "Test Framework Development",
      "Root Cause Analysis & Defect Resolution"
    ]
  },
  {
    letter: "J",
    title: "Manufacturing & Production Support",
    description: "We support the transition from prototype to production through manufacturing readiness, test infrastructure, programming workflows, and production engineering support.",
    items: [
      "DFM & DFT Review",
      "Test Fixture & Programming Jig Design",
      "In-System Programming (ISP)",
      "Production Test Planning",
      "Manufacturing Documentation",
      "Contract Manufacturer Support"
    ]
  }
];

const TABS_ACCENTS = ["#1c75bc", "#0ea5e9", "#06b6d4"];
/* ============ END SERVICES DATA ============ */

/* ============ SERVICE DIAGRAM COMPONENT ============ */
function ServiceDiagram({ letter, accent }) {
  const horizontalLines = Array.from({ length: 6 }).map((_, i) => (
    <line key={`h-${i}`} x1="0" y1={40 + i * 44} x2="400" y2={40 + i * 44} />
  ));
  const verticalLines = Array.from({ length: 8 }).map((_, i) => (
    <line key={`v-${i}`} x1={30 + i * 48} y1="0" x2={30 + i * 48} y2="300" />
  ));

  return (
    <svg className="svc-illustration" viewBox="0 0 400 300" fill="none">
      <rect width="400" height="300" rx="14" fill="#fbfdff" />
      <g stroke={accent} strokeOpacity="0.06">
        {horizontalLines}
        {verticalLines}
      </g>
      <path
        d="M40 150h90l40-40h70l35 35h30"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M70 200h60l35 35h80l25-25"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 3"
        strokeOpacity="0.6"
      />
      <rect x="210" y="80" width="90" height="52" rx="8" fill="#fff" stroke={accent} strokeWidth="1.8" />
      <text
        x="255"
        y="111"
        fill={accent}
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
      >
        {letter}-CORE
      </text>
      <circle cx="180" cy="104" r="4" fill={accent}>
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="150" r="4" fill={accent} fillOpacity="0.7" />
      <circle cx="345" cy="190" r="4" fill="#10b981" />
      <text
        x="20"
        y="26"
        fill="#94a3b8"
        fontSize="9"
        fontFamily="Inter, sans-serif"
      >
        MODULE_{letter}: ACTIVE
      </text>
    </svg>
  );
}
/* ============ FAQ DATA ============ */
const FAQ_DATA = [
  {
    q: "Can VConnectTech support a project from concept through production?",
    a: "Yes. We cover hardware architecture and PCB design, firmware and BSP development, RTOS and embedded Linux, connectivity integration, testing and validation, and production support — so you can bring us in at any stage, from a blank sheet to a design that's ready to ship."
  },
  {
    q: "Do you work on both bare-metal firmware and embedded Linux systems?",
    a: "Yes. We handle the full spectrum — from bare-metal C/C++ and RTOS-based firmware to full embedded Linux platforms built with Yocto or Buildroot, depending on what your product needs."
  },
  {
    q: "Which communication protocols and connectivity standards do you support?",
    a: "We work across I²C, SPI, UART, CAN, and LIN at the hardware level, and BLE, Wi-Fi, Zigbee, Matter, MQTT, and CoAP for wireless and cloud connectivity."
  },
  {
    q: "Can you join only one phase of an existing project?",
    a: "Yes. We regularly step into partially built projects — auditing existing hardware or firmware, identifying gaps, and continuing development without requiring a full restart."
  },
  {
    q: "Do you support manufacturing and production testing?",
    a: "Yes. We handle DFM/DFT reviews, production test development, programming workflows, and failure analysis to help your design move smoothly from prototype to volume manufacturing."
  },
  {
    q: "How do we start a new engagement?",
    a: "Tell us what you're building through the contact form or by emailing us directly. We take on a small, deliberate number of engagements each quarter, and reply within two working days with a preliminary read on your project."
  }
];
/* ============ END FAQ DATA ============ */

/* ============ MAIN COMPONENT ============ */
export default function Embedded() {
  const [activeService, setActiveService] = React.useState("A");
  const [counts, setCounts] = React.useState({ phase: 0, capability: 0 });
  const [activeProject, setActiveProject] = React.useState(null);
  const [activeFaq, setActiveFaq] = React.useState(null);
  const [formSent, setFormSent] = React.useState(false);
  const scrollContainerRef = React.useRef(null);
  const glassCardRef = React.useRef(null);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });
  const canvasRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const overImgRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const isAlignedRef = React.useRef(false);

  /* ============ GSAP SCRAMBLE & SCROLL ALIGNMENT ANIMATION ============ */
  React.useEffect(() => {
    const cards = gsap.utils.toArray(".embpg-work-item");
    const innerCards = gsap.utils.toArray(".embpg-work-item-inner");
    if (!cards.length) return;

    // Store random offsets per card so they stay consistent on reverse
    const randomOffsets = cards.map(() => ({
      x: gsap.utils.random(-140, 140),
      y: gsap.utils.random(80, 130),
      rotation: gsap.utils.random(-6, 6),
    }));

    // 1. Initial State: Scrambled, slightly blurred, but visible
    cards.forEach((card, i) => {
      gsap.set(card, {
        x: randomOffsets[i].x,
        y: randomOffsets[i].y,
        rotation: randomOffsets[i].rotation,
        scale: 0.92,
        opacity: 0.5,
        filter: "blur(3px)"
      });
    });

    let floatTweens = [];

    const startFloating = () => {
      if (!isAlignedRef.current) return;
      // Clear existing tweens to avoid duplicates
      floatTweens.forEach((t) => t.kill());
      gsap.killTweensOf(innerCards);
      floatTweens = innerCards.map((innerCard, index) => {
        return gsap.to(innerCard, {
          y: -3,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.25
        });
      });
    };

    const stopFloating = () => {
      floatTweens.forEach((t) => t.kill());
      floatTweens = [];
      gsap.killTweensOf(innerCards);
      gsap.to(innerCards, { y: 0, duration: 0.35, ease: "power3.out" });
    };

    // 2. Play Alignment animation forward when entering, reverse when leaving
    const alignForward = () => {
      if (isAlignedRef.current) return;
      isAlignedRef.current = true;
      stopFloating();
      gsap.killTweensOf(cards);
      gsap.to(cards, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.55,
        stagger: 0.1,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        onComplete: startFloating
      });
    };

    const scatterBack = () => {
      if (!isAlignedRef.current) return;
      isAlignedRef.current = false;
      stopFloating();
      gsap.killTweensOf(cards);
      cards.forEach((card, i) => {
        gsap.to(card, {
          x: randomOffsets[i].x,
          y: randomOffsets[i].y,
          rotation: randomOffsets[i].rotation,
          scale: 0.92,
          opacity: 0.5,
          filter: "blur(3px)",
          duration: 1.35,
          delay: i * 0.07,
          ease: "power3.inOut"
        });
      });
    };

    // Use invalidateOnRefresh so trigger recalculates after services pin adds scroll height
    const trigger = ScrollTrigger.create({
      trigger: ".embpg-work-section",
      start: "top 80%",
      end: "bottom 20%",
      invalidateOnRefresh: true,
      refreshPriority: -1, // Ensure pinned sections calculate before this trigger refreshes
      onEnter: () => alignForward(),
      onEnterBack: () => alignForward(),
      onLeave: () => scatterBack(),
      onLeaveBack: () => scatterBack(),
    });

    return () => {
      trigger.kill();
      floatTweens.forEach((t) => t.kill());
      cards.forEach((card) => gsap.killTweensOf(card));
      innerCards.forEach((innerCard) => gsap.killTweensOf(innerCard));
      isAlignedRef.current = false;
    };
  }, []);
  /* ============ END GSAP SCRAMBLE & SCROLL ALIGNMENT ANIMATION ============ */

  /* ============ HERO X-RAY MASK EFFECT ============ */
  React.useEffect(() => {
    const stage = stageRef.current;
    const overImg = overImgRef.current;
    const ring = ringRef.current;
    if (!stage || !overImg || !ring) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;

    let radius = 130;
    let mx = -500, my = 0, tx = -500, ty = 0;
    let idle = true;
    let revealed = false;
    let touchTimer = null;
    let animationFrameId = null;
    let introSweep = true;
    let introTimer = 0;

    function sizeStage() {
      const r = stage.getBoundingClientRect();
      radius = Math.max(80, Math.min(260, r.width * 0.28));
      stage.style.setProperty("--r", radius + "px");
      if (idle) {
        tx = -radius * 3;
        ty = r.height / 2;
      }
    }
    sizeStage();
    window.addEventListener("resize", sizeStage);

    function setRevealed(state) {
      if (state === revealed) return;
      revealed = state;
    }

    const handlePointerEnter = () => {
      introSweep = false;
      idle = false;
      ring.style.opacity = "1";
    };

    const handlePointerMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      introSweep = false;
      idle = false;
      const r = stage.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      setRevealed(true);
    };

    const handlePointerLeave = () => {
      const r = stage.getBoundingClientRect();
      tx = -radius * 3;
      ty = r.height / 2;
      ring.style.opacity = "0";
      setRevealed(false);
    };

    const handlePointerDown = (e) => {
      introSweep = false;
      idle = false;
      const r = stage.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      setRevealed(true);
      ring.style.opacity = "1";
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => {
        idle = true;
        ring.style.opacity = "0";
        setRevealed(false);
      }, 2200);
    };

    if (hasHover) {
      stage.addEventListener("pointerenter", handlePointerEnter);
      stage.addEventListener("pointermove", handlePointerMove);
      stage.addEventListener("pointerleave", handlePointerLeave);
      stage.addEventListener("pointerdown", () => { idle = false; });
    } else {
      stage.addEventListener("pointerdown", handlePointerDown);
    }

    function loop(t) {
      const elapsed = t / 1000;
      const r = stage.getBoundingClientRect();

      if (introSweep && !reduceMotion) {
        introTimer += 0.016;
        const progress = Math.min(1, introTimer / 2.2); // 2.2s intro sweep
        tx = r.width * 0.1 + Math.sin(progress * Math.PI) * r.width * 0.8;
        ty = r.height * 0.5;
        if (ring) {
          ring.style.opacity = "1";
        }
        setRevealed(true);
        if (progress >= 1) {
          introSweep = false;
        }
      } else if (idle && !reduceMotion) {
        tx = r.width * 0.5 + Math.cos(elapsed * 0.5) * r.width * 0.32;
        ty = r.height * 0.5 + Math.sin(elapsed * 0.8) * r.height * 0.22;
        if (!ring.dataset.shown) {
          ring.style.opacity = "1";
          ring.dataset.shown = "1";
        }
        setRevealed(true);
      } else if (idle && reduceMotion) {
        setRevealed(false);
      }

      mx += (tx - mx) * (reduceMotion ? 1 : 0.14);
      my += (ty - my) * (reduceMotion ? 1 : 0.14);

      overImg.style.setProperty("--mx", mx + "px");
      overImg.style.setProperty("--my", my + "px");
      ring.style.left = mx + "px";
      ring.style.top = my + "px";

      animationFrameId = requestAnimationFrame(loop);
    }
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", sizeStage);
      if (hasHover) {
        if (stage) {
          stage.removeEventListener("pointerenter", handlePointerEnter);
          stage.removeEventListener("pointermove", handlePointerMove);
          stage.removeEventListener("pointerleave", handlePointerLeave);
        }
      } else {
        if (stage) {
          stage.removeEventListener("pointerdown", handlePointerDown);
        }
      }
      clearTimeout(touchTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  /* ============ END HERO X-RAY MASK EFFECT ============ */

  /* ============ GSAP HERO INTRO ANIMATION ============ */
  React.useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Initial fade-in of wrappers to prevent layout flashing
    tl.to(".embpg-hero-eyebrow, .embpg-hero-display-title, .embpg-hero-lede-para, .embpg-hero-stats-row, .embpg-hero-action-buttons, .embpg-hero-mask-visual", {
      opacity: 1,
      duration: 0.05
    });

    // 2. Staggered sliding entrance animations
    tl.fromTo(".embpg-hero-eyebrow",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1 },
      "0.15"
    );

    tl.fromTo(".embpg-hero-display-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4 },
      "-=0.9"
    );

    tl.fromTo(".embpg-hero-lede-para",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1 },
      "-=1.0"
    );

    tl.fromTo(".embpg-hero-action-buttons",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      "-=0.95"
    );

    const counterObj = { phase: 0, capability: 0 };
    tl.fromTo(".embpg-hero-stats-row",
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        onStart: () => {
          gsap.to(counterObj, {
            phase: 6,
            capability: 10,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              setCounts({
                phase: Math.floor(counterObj.phase),
                capability: Math.floor(counterObj.capability)
              });
            }
          });
        }
      },
      "-=0.85"
    );

    tl.fromTo(".embpg-hero-mask-visual",
      { x: 120, opacity: 0, scale: 0.96 },
      { x: 0, opacity: 1, scale: 1, duration: 1.8, ease: "cubic-bezier(0.16, 1, 0.3, 1)" },
      "-=1.6"
    );

    return () => {
      tl.kill();
    };
  }, []);

  /* ============ SERVICES GSAP SCROLL PINNING & TAB CYCLING ============ */
  React.useEffect(() => {
    const card = glassCardRef.current;
    if (!card) return;

    let mm = gsap.matchMedia();
    mm.add("(min-width: 991px)", () => {
      const trigger = ScrollTrigger.create({
        id: "services-trigger",
        trigger: card,
        start: "top 70px",
        end: "+=1200",
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(
            SERVICES_DATA.length - 1,
            Math.floor(progress * SERVICES_DATA.length)
          );
          setActiveService(SERVICES_DATA[idx].letter);
        }
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);
  /* ============ END SERVICES GSAP SCROLL PINNING & TAB CYCLING ============ */




  /* ============ MOUSE TRACKING ============ */
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  /* ============ END MOUSE TRACKING ============ */

  /* ============ SCROLL REVEAL OBSERVER ============ */
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(".reveal:not(.embpg-work-item)");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  /* ============ END SCROLL REVEAL OBSERVER ============ */

  /* ============ BACKGROUND CANVAS ANIMATION ============ */
  React.useEffect(() => {
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

      const count = Math.max(22, Math.min(60, Math.floor((W * H) / 32000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mouse = mouseRef.current;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 0.1) {
          n.x += (dx / d) * 0.5;
          n.y += (dy / d) * 0.5;
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            ctx.strokeStyle = `rgba(27, 109, 224, ${(1 - d / 150) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(27, 109, 224, 0.55)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  /* ============ END BACKGROUND CANVAS ANIMATION ============ */

  /* ============ TAB CLICK HANDLER ============ */
  const handleTabClick = (letter) => {
    const idx = SERVICES_DATA.findIndex((s) => s.letter === letter);
    if (idx === -1) return;

    const trigger = ScrollTrigger.getById("services-trigger");
    if (trigger && window.innerWidth > 990) {
      // Calculate scroll position corresponding to the index
      const proportion = idx / (SERVICES_DATA.length - 1);
      const targetScroll = trigger.start + proportion * 1200;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    } else {
      // Fallback for mobile
      setActiveService(letter);
    }
  };
  /* ============ END TAB CLICK HANDLER ============ */

  /* ============ CARD INTERACTIVE SPOTLIGHT HANDLER ============ */
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };
  /* ============ END CARD INTERACTIVE SPOTLIGHT HANDLER ============ */

  return (
    <div className="embpg-embedded-page">

      {/* ============ BACKGROUND LAYER ============ */}
      <div className="embpg-bg-layer" aria-hidden="true">
        <canvas ref={canvasRef} className="embpg-bg-canvas" />
        <div className="embpg-noise" />
      </div>
      {/* ============ END BACKGROUND LAYER ============ */}

      <section className="embpg-hero-section" id="top">
        <div className="embpg-hero-content-wrapper">
          <div className="embpg-hero-copy-wrap">
            <p className="embpg-hero-eyebrow">
              <span className="embpg-blue-dot"></span>
              EMBEDDED ENGINEERING
            </p>
            <h1 className="embpg-hero-display-title">
              The quiet <span className="embpg-blue-highlight">intelligence</span> inside every <span className="embpg-blue-highlight">connected product.</span>
            </h1>
            <p className="embpg-hero-lede-para">
              We design the hardware, firmware, connectivity and validation systems that let ambitious products ship on time — and stay working, quietly, for a decade.
            </p>
            <div className="embpg-hero-action-buttons">
              <a href="#capabilities" className="embpg-hero-btn-primary">
                Explore Services <span className="embpg-arrow">→</span>
              </a>
              <a href="#contact" className="embpg-hero-btn-ghost">
                Talk to an engineer <span className="embpg-arrow">→</span>
              </a>
            </div>
            <div className="embpg-hero-stats-row">
              <div className="embpg-stat-item">
                <span className="embpg-stat-num">{String(counts.phase).padStart(2, '0')}</span>
                <span className="embpg-stat-label">Main Industry<br />Phases</span>
              </div>
              <div className="embpg-stat-item">
                <span className="embpg-stat-num">{String(counts.capability).padStart(2, '0')}</span>
                <span className="embpg-stat-label">Core Engineering<br />Services</span>
              </div>
            </div>
          </div>
          <div className="embpg-hero-mask-visual">
            <div className="embpg-device-stage" id="stage" ref={stageRef}>
              <img className="embpg-d-layer embpg-d-under" src={EmbeddedImages.after} alt="Internal hardware of the fanless embedded enclosure" draggable="false" loading="eager" fetchPriority="high" decoding="async" />
              <img className="embpg-d-layer embpg-d-over" id="overImg" ref={overImgRef} src={EmbeddedImages.before} alt="Assembled fanless embedded enclosure" draggable="false" loading="eager" fetchPriority="high" decoding="async" />
              <div className="embpg-reveal-ring" id="ring" ref={ringRef} aria-hidden="true"></div>
            </div>
            <div className="embpg-stage-hint">
              <span className="embpg-hint-pulse"></span>
              <span>Hover stage to expose internal hardware architecture</span>
            </div>
          </div>
        </div>
      </section>
      {/* ============ END HERO SECTION ============ */}

      {/* ============ MARQUEE SECTION ============ */}
      <div className="embpg-marquee" aria-hidden="true">
        <div className="embpg-marquee-track">
          <span>MCU</span><i>·</i>
          <span>RTOS</span><i>·</i>
          <span>Embedded Linux</span><i>·</i>
          <span>BLE / Wi-Fi</span><i>·</i>
          <span>CAN / LIN</span><i>·</i>
          <span>Yocto</span><i>·</i>
          <span>OTA</span><i>·</i>
          <span>Zigbee</span><i>·</i>
          <span>Matter</span><i>·</i>
          <span>Bootloaders</span><i>·</i>
          <span>HAL / BSP</span><i>·</i>
          <span>MQTT</span><i>·</i>
          <span>Functional Safety</span><i>·</i>
          <span>MCU</span><i>·</i>
          <span>RTOS</span><i>·</i>
          <span>Embedded Linux</span><i>·</i>
          <span>BLE / Wi-Fi</span><i>·</i>
          <span>CAN / LIN</span><i>·</i>
          <span>Yocto</span><i>·</i>
          <span>OTA</span><i>·</i>
          <span>Zigbee</span><i>·</i>
          <span>Matter</span><i>·</i>
          <span>Bootloaders</span><i>·</i>
          <span>HAL / BSP</span><i>·</i>
          <span>MQTT</span><i>·</i>
          <span>Functional Safety</span><i>·</i>
        </div>
      </div>
      {/* ============ END MARQUEE SECTION ============ */}

      {/* ============ SERVICES SECTION ============ */}
      <div ref={scrollContainerRef} className="embpg-services-scroll-container">
        <section className="embpg-section embpg-services" id="capabilities">
          <div className="container container-narrow mb-4">
            <div className="embpg-section-head reveal center">

              <h2 className="display-2">
                Our <span className="embpg-blue-highlight">Embedded Engineering</span> Services
              </h2>
              <p className="embpg-section-subtitle">
                From initial schematic design to low-level driver porting and system bring-up, we deliver end-to-end expertise at every layer of the hardware-software stack.
              </p>
            </div>
          </div>
          <div ref={glassCardRef} className="container container-narrow embpg-services-glass-wrapper">
            <div className="embpg-svc-layout reveal">
              <div className="embpg-svc-tabs">
                {SERVICES_DATA.map((s) => {
                  const isActive = activeService === s.letter;
                  return (
                    <button
                      key={s.letter}
                      className={`embpg-svc-tab${isActive ? " active" : ""}`}
                      onClick={() => handleTabClick(s.letter)}
                    >
                      <span className="embpg-letter">{s.letter}</span>
                      <span>{s.title}</span>
                    </button>
                  );
                })}
              </div>
              <div className={`embpg-svc-panel embpg-align-${["A", "B", "C"].includes(activeService) ? "start" :
                ["D", "E", "F", "G"].includes(activeService) ? "center" : "end"
                }`}>
                {SERVICES_DATA.map((s, idx) => {
                  if (activeService !== s.letter) return null;
                  const accent = TABS_ACCENTS[idx % TABS_ACCENTS.length];
                  return (
                    <div key={s.letter} className="embpg-svc-panel-grid">
                      <div className="embpg-svc-panel-copy">
                        <div className="embpg-service-title-row">
                          <div className="embpg-alpha-badge">{s.letter}</div>
                          <h3>{s.title}</h3>
                        </div>
                        <p className="embpg-service-desc">{s.description}</p>
                        <span className="embpg-deliver-label">What We Deliver</span>
                        <ul className="embpg-tech-list">
                          {s.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="embpg-svc-illustration-wrap">
                        {s.letter === "A" ? (
                          <img
                            src={EmbeddedImages.test}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "B" ? (
                          <img
                            src={EmbeddedImages.m2}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "C" ? (
                          <img
                            src={EmbeddedImages.m3}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "D" ? (
                          <img
                            src={EmbeddedImages.m4}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "E" ? (
                          <img
                            src={EmbeddedImages.m5}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "F" ? (
                          <img
                            src={EmbeddedImages.m6}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "G" ? (
                          <img
                            src={EmbeddedImages.m7}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "H" ? (
                          <img
                            src={EmbeddedImages.m8}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "I" ? (
                          <img
                            src={EmbeddedImages.m9}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : s.letter === "J" ? (
                          <img
                            src={EmbeddedImages.m10}
                            alt={s.title}
                            className="embpg-svc-illustration-img"
                            decoding="async"
                          />
                        ) : (
                          <ServiceDiagram letter={s.letter} accent={accent} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* ============ END SERVICES SECTION ============ */}

      {/* ============ WORK SECTION ============ */}
      <section className="embpg-section embpg-work-section" id="work">
        <div className="container">
          <div className="embpg-section-head reveal center">

            <h2 className="display-2">
              Industries We've <span className="embpg-blue-highlight">Engineered</span> For
            </h2>
            <p className="embpg-section-subtitle">
              Delivering robust embedded solutions across diverse sectors—from high-reliability aerospace to high-volume automotive platforms.
            </p>
          </div>
          <div className="embpg-work-grid">
            <a
              className="embpg-work-item embpg-w-tall"
              href="#work"
              onClick={(e) => { e.preventDefault(); setActiveProject("Industrial IoT"); }}
              onMouseMove={handleCardMouseMove}
            >
              <div className="embpg-work-item-inner">
                <div className="embpg-border-glow" aria-hidden="true" />
                <div className="embpg-work-img" style={{ backgroundImage: `url(${EmbeddedImages.industry})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="embpg-work-meta">
                  <div>
                    <span className="embpg-tag">Industrial IoT</span>
                    <h3>Sub-metering gateway with edge inference</h3>
                  </div>
                  <span className="embpg-arrow">↗</span>
                </div>
              </div>
            </a>
            <a
              className="embpg-work-item embpg-w-wide"
              href="#work"
              onClick={(e) => { e.preventDefault(); setActiveProject("Healthcare"); }}
              onMouseMove={handleCardMouseMove}
            >
              <div className="embpg-work-item-inner">
                <div className="embpg-border-glow" aria-hidden="true" />
                <div className="embpg-work-img" style={{ backgroundImage: `url(${EmbeddedImages.watch})`, backgroundSize: 'cover', backgroundPosition: 'center 35%' }} />
                <div className="embpg-work-meta">
                  <div>
                    <span className="embpg-tag">Healthcare</span>
                    <h3>Wearable health monitoring, made simple</h3>
                  </div>
                  <span className="embpg-arrow">↗</span>
                </div>
              </div>
            </a>
            <a
              className="embpg-work-item"
              href="#work"
              onClick={(e) => { e.preventDefault(); setActiveProject("Automotive"); }}
              onMouseMove={handleCardMouseMove}
            >
              <div className="embpg-work-item-inner">
                <div className="embpg-border-glow" aria-hidden="true" />
                <div className="embpg-work-img" style={{ backgroundImage: `url(${EmbeddedImages.automo})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="embpg-work-meta">
                  <div>
                    <span className="embpg-tag">Automotive</span>
                    <h3>Smart control for electric vehicles</h3>
                  </div>
                  <span className="embpg-arrow">↗</span>
                </div>
              </div>
            </a>
            <a
              className="embpg-work-item"
              href="#work"
              onClick={(e) => { e.preventDefault(); setActiveProject("Consumer"); }}
              onMouseMove={handleCardMouseMove}
            >
              <div className="embpg-work-item-inner">
                <div className="embpg-border-glow" aria-hidden="true" />
                <div className="embpg-work-img" style={{ backgroundImage: `url(${EmbeddedImages.home})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="embpg-work-meta">
                  <div>
                    <span className="embpg-tag">Consumer</span>
                    <h3>Everyday tech, designed to feel effortless</h3>
                  </div>
                  <span className="embpg-arrow">↗</span>
                </div>
              </div>
            </a>
            <a
              className="embpg-work-item embpg-w-wide"
              href="#work"
              onClick={(e) => { e.preventDefault(); setActiveProject("Edge AI"); }}
              onMouseMove={handleCardMouseMove}
            >
              <div className="embpg-work-item-inner">
                <div className="embpg-border-glow" aria-hidden="true" />
                <div className="embpg-work-img" style={{ backgroundImage: `url(${EmbeddedImages.edge})`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
                <div className="embpg-work-meta">
                  <div>
                    <span className="embpg-tag">Edge AI</span>
                    <h3>Intelligence that runs at the edge</h3>
                  </div>
                  <span className="embpg-arrow">↗</span>
                </div>
              </div>
            </a>
            <a
              className="embpg-work-item"
              href="#work"
              onClick={(e) => { e.preventDefault(); setActiveProject("Aerospace"); }}
              onMouseMove={handleCardMouseMove}
            >
              <div className="embpg-work-item-inner">
                <div className="embpg-border-glow" aria-hidden="true" />
                <div className="embpg-work-img" style={{ backgroundImage: `url(${EmbeddedImages.aero})`, backgroundSize: 'cover', backgroundPosition: 'center 45%' }} />
                <div className="embpg-work-meta">
                  <div>
                    <span className="embpg-tag">Aerospace</span>
                    <h3>Built to perform in extreme conditions</h3>
                  </div>
                  <span className="embpg-arrow">↗</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* ============ END WORK SECTION ============ */}

      {/* ============ CTA SECTION ============ */}
      <section className="embpg-cta" id="cta">
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
            className="embpg-cta-form"
            onSubmit={(event) => {
              event.preventDefault();
              setFormSent(true);
            }}
          >
            <input type="email" placeholder="your@work-email.com" required />
            <button type="submit">{formSent ? "Sent · we'll be in touch" : "Talk to us →"}</button>
          </form>
          <div className="embpg-cta-alt">
            or write directly to <a href="mailto:hello@vconnectech.com">hello@vconnectech.com</a>
          </div>
        </div>
      </section>
      {/* ============ END CTA SECTION ============ */}

      {/* ============ PLAIN CARD SECTION ============ */}
      <section className="embpg-plain-card-section">
        <div className="container container-narrow mb-4">
          <div className="embpg-section-head reveal center">
            <h2 className="display-2">
              <span className="embpg-blue-highlight">Build with Confidence</span>
            </h2>
          </div>
        </div>
        <div className="container container-narrow">
          <div className="embpg-plain-horizontal-card reveal">
            <div className="embpg-brochure-card-content">
              <h3 className="embpg-brochure-card-heading">
                <span style={{ whiteSpace: "nowrap" }}>Download our <span className="embpg-blue-highlight">Embedded Engineering</span></span> Capability Brochure
              </h3>
              <p className="embpg-brochure-card-subtext">
                Learn about our complete engineering workflow, technologies, development process, industries, and project delivery approach.
              </p>
              <a href="/brochure.pdf" download className="embpg-brochure-download-link">
                <span className="vlsipg-btn__label">Download Brochure</span>
                <span className="vlsipg-btn__icon" aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="embpg-brochure-visual">
              <img src={EmbeddedImages.brochure} alt="Embedded Engineering Capability Brochure visual" decoding="async" />
            </div>
          </div>
        </div>
      </section>
      {/* ============ END PLAIN CARD SECTION ============ */}

      {/* ============ FAQ SECTION ============ */}
      <section className="embpg-faq-section" id="faq">
        <div className="container">

          <div className="embpg-faq-header-grid">
            <div className="embpg-faq-header-left">
              <h2 className="display-2 embpg-questions-title">
                Questions before <br />
                we <span className="embpg-blue-highlight">start engineering?</span>
              </h2>
            </div>
            <p className="embpg-faq-note">A quick view of common questions about our Embedded Engineering engagements.</p>
          </div>

          <div className="embpg-faq-list">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`embpg-faq-item ${isOpen ? 'open' : ''}`}
                  onMouseEnter={() => setActiveFaq(index)}
                  onMouseLeave={() => setActiveFaq(null)}
                >
                  <div className="embpg-faq-question-row">
                    <h3 className="embpg-faq-question">{faq.q}</h3>
                    <div className={`embpg-faq-icon-box ${isOpen ? 'active' : ''}`}>
                      {isOpen ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 2.5V9.5M2.5 6H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="embpg-faq-answer-wrapper">
                    <p className="embpg-faq-answer">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
      {/* ============ END FAQ SECTION ============ */}

      {/* ============ PROJECT DETAIL MODAL ============ */}
      {activeProject && (
        <div className="embpg-project-detail-overlay active" onClick={() => setActiveProject(null)}>
          <div className="embpg-project-detail-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="embpg-detail-close-btn" onClick={() => setActiveProject(null)}>
              ✕
            </button>
            <div className="embpg-detail-content">
              <span className="embpg-detail-tag">{PROJECT_DETAILS[activeProject].tag}</span>
              <h2 className="embpg-detail-title">{PROJECT_DETAILS[activeProject].title}</h2>
              <p className="embpg-detail-desc">{PROJECT_DETAILS[activeProject].desc}</p>
              <div className="embpg-detail-grid">
                <div className="embpg-detail-block">
                  <h4>Technical Specs</h4>
                  <ul>
                    {PROJECT_DETAILS[activeProject].specs.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                </div>
                <div className="embpg-detail-block">
                  <h4>The Engineering Challenge</h4>
                  <p>{PROJECT_DETAILS[activeProject].challenge}</p>
                </div>
              </div>
              <div className="embpg-detail-tech-stack">
                <h4>Technology Stack</h4>
                <div className="embpg-tech-pills">
                  {PROJECT_DETAILS[activeProject].stack.map((tech, i) => (
                    <span key={i} className="embpg-tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ============ END PROJECT DETAIL MODAL ============ */}

    </div>
  );
}
/* ============ END MAIN COMPONENT ============ */
