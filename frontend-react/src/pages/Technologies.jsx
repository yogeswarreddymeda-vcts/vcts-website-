/**
 * Technologies Page
 *
 * Documents supported engineering domains, platforms, tools, standards,
 * ecosystem capabilities, downloadable material, and FAQs.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/Technologies.css";
import techStackVisual from '../assets/image/Teachnologies/tech_stack_visual.webp';
import technologiesBrochure from '../assets/image/Teachnologies/technologies_brochure.webp';
import semiconductorDomainImg from '../assets/image/Teachnologies/semiconductor_domain.webp';
import embeddedDomainImg from '../assets/image/Teachnologies/embedded_domain.webp';
import automotiveDomainImg from '../assets/image/Teachnologies/automotive_domain.webp';
import edgeaiDomainImg from '../assets/image/Teachnologies/edgeai_domain.webp';

const clampDomainProgress = (value) => Math.min(1, Math.max(0, value));

const domainMotionConfig = {
  semiconductor: {
    indicator: { x: -30 },
    title: { x: -30, rotateY: 15, perspective: 600 },
    desc: { y: 20 },
    visual: { x: -30, scale: 0.96 },
    card: () => ({ y: 60, scale: 0.8, rotateX: 15, perspective: 1000 })
  },
  embedded: {
    indicator: { x: -10, y: -20 },
    title: { y: -20 },
    desc: { y: 15 },
    visual: { y: -30, scale: 0.97 },
    card: (index) => ({ x: index % 2 === 0 ? 50 : -50, y: 20 })
  },
  automotive: {
    indicator: { x: -40 },
    title: { x: -50 },
    desc: { y: 25 },
    visual: { x: -60, scale: 0.96 },
    card: () => ({ x: 20, y: 70, scale: 0.96, skewX: -4 })
  },
  edgeai: {
    indicator: { y: 20 },
    title: { y: 30 },
    desc: { y: 20 },
    visual: { y: 40, scale: 0.94 },
    card: () => ({ scale: 0.7, rotateZ: -4 })
  }
};



/** Renders the complete technology-domain and engineering-standards page. */

export default function Technologies() {
  const rootRef = useRef(null);
  const domainAnimationRef = useRef({
    animationFrameId: 0,
    sections: [],
    viewportHeight: 0,
    needsMeasurement: true
  });
  const [activeCards, setActiveCards] = useState({});
  const [formSent, setFormSent] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  const toggleCard = (key) => { };

  // Interpolate each domain section from its configured entrance pose according
  // to scroll progress, with a static fallback for reduced-motion visitors.

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const animation = domainAnimationRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sectionElements = Array.from(root.querySelectorAll(".techpg-domains-sec"));
    const domainImages = Array.from(root.querySelectorAll(".techpg-domains-sec .techpg-domain-visual img"));
    const lastProgress = new WeakMap();

    const createItem = (element, from, start, end) => {
      if (!element) return null;
      element.classList.add("techpg-domain-motion");
      return { element, from, start, end };
    };

    animation.sections = sectionElements.map((section) => {
      const config = domainMotionConfig[section.id];
      const cards = Array.from(section.querySelectorAll(".techpg-domain-card"));
      const items = [
        createItem(section.querySelector(".techpg-domain-indicator-wrap"), config.indicator, 0, 0.42),
        createItem(section.querySelector(".techpg-domain-title"), config.title, 0.08, 0.52),
        createItem(section.querySelector(".techpg-domain-desc"), config.desc, 0.16, 0.62),
        createItem(section.querySelector(".techpg-domain-visual"), config.visual, 0.22, 0.74),
        ...cards.map((card, index) => createItem(
          card,
          config.card(index),
          0.18 + index * 0.045,
          0.62 + index * 0.045
        ))
      ].filter(Boolean);

      return {
        element: section,
        items,
        top: 0,
        bottom: 0,
        targetValue: 0,
        currentValue: 0
      };
    });

    const applyItemProgress = (item, sectionProgress) => {
      const range = item.end - item.start;
      const localProgress = clampDomainProgress((sectionProgress - item.start) / range);
      const easedProgress = 1 - Math.pow(1 - localProgress, 3);

      if (Math.abs((lastProgress.get(item.element) ?? -1) - easedProgress) < 0.0005) return;
      lastProgress.set(item.element, easedProgress);

      const remaining = 1 - easedProgress;
      const {
        x = 0,
        y = 0,
        scale = 1,
        rotateX = 0,
        rotateY = 0,
        rotateZ = 0,
        skewX = 0,
        perspective = 0
      } = item.from;
      const transform = [
        perspective ? `perspective(${perspective}px)` : "",
        `translate3d(${(x * remaining).toFixed(3)}px, ${(y * remaining).toFixed(3)}px, 0)`,
        `scale(${(1 - (1 - scale) * remaining).toFixed(5)})`,
        `rotateX(${(rotateX * remaining).toFixed(3)}deg)`,
        `rotateY(${(rotateY * remaining).toFixed(3)}deg)`,
        `rotateZ(${(rotateZ * remaining).toFixed(3)}deg)`,
        `skewX(${(skewX * remaining).toFixed(3)}deg)`
      ].filter(Boolean).join(" ");

      item.element.style.setProperty("--domain-transform", transform);
      item.element.style.setProperty("--domain-opacity", easedProgress.toFixed(5));
    };

    const applySectionProgress = (section, progress) => {
      section.items.forEach((item) => applyItemProgress(item, progress));
    };

    const measureSections = () => {
      const scrollY = window.scrollY;
      const measurements = animation.sections.map((section) => {
        const rect = section.element.getBoundingClientRect();
        return { section, top: rect.top + scrollY, bottom: rect.bottom + scrollY };
      });

      animation.viewportHeight = window.innerHeight;
      measurements.forEach(({ section, top, bottom }) => {
        section.top = top;
        section.bottom = bottom;
      });
      animation.needsMeasurement = false;
    };

    const updateTargets = () => {
      const scrollY = window.scrollY;
      const viewportHeight = animation.viewportHeight || window.innerHeight;

      animation.sections.forEach((section) => {
        const entryStart = section.top - viewportHeight * 1.1;
        const entryEnd = section.top - viewportHeight * 0.1;
        const exitStart = section.bottom - viewportHeight * 0.6;
        const exitEnd = section.bottom - viewportHeight * 0.05;
        const entryProgress = clampDomainProgress((scrollY - entryStart) / (entryEnd - entryStart));
        const exitProgress = 1 - clampDomainProgress((scrollY - exitStart) / (exitEnd - exitStart));
        section.targetValue = Math.min(entryProgress, exitProgress);
      });
    };

    const animateDomains = () => {
      animation.animationFrameId = 0;

      if (animation.needsMeasurement) measureSections();
      updateTargets();

      let shouldContinue = false;
      animation.sections.forEach((section) => {
        const difference = section.targetValue - section.currentValue;
        if (Math.abs(difference) > 0.001) {
          section.currentValue += difference * 0.025;
          shouldContinue = true;
        } else {
          section.currentValue = section.targetValue;
        }
        applySectionProgress(section, section.currentValue);
      });

      if (shouldContinue) {
        animation.animationFrameId = window.requestAnimationFrame(animateDomains);
      }
    };

    const startAnimation = () => {
      if (!animation.animationFrameId && !reducedMotion.matches) {
        animation.animationFrameId = window.requestAnimationFrame(animateDomains);
      }
    };

    const handleScroll = () => {
      if (reducedMotion.matches) return;
      updateTargets();
      startAnimation();
    };

    const handleResize = () => {
      animation.needsMeasurement = true;
      startAnimation();
    };

    const handleReducedMotion = () => {
      if (reducedMotion.matches) {
        if (animation.animationFrameId) {
          window.cancelAnimationFrame(animation.animationFrameId);
          animation.animationFrameId = 0;
        }
        animation.sections.forEach((section) => {
          section.currentValue = 1;
          section.targetValue = 1;
          applySectionProgress(section, 1);
        });
      } else {
        animation.needsMeasurement = true;
        startAnimation();
      }
    };

    measureSections();
    updateTargets();
    if (reducedMotion.matches) {
      handleReducedMotion();
    } else {
      animation.sections.forEach((section) => applySectionProgress(section, 0));
      startAnimation();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    reducedMotion.addEventListener("change", handleReducedMotion);
    domainImages.forEach((image) => image.addEventListener("load", handleResize));

    // Remove global listeners, image listeners, frames, and inline motion styles
    // so revisiting the page starts from a clean state.

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", handleReducedMotion);
      domainImages.forEach((image) => image.removeEventListener("load", handleResize));
      if (animation.animationFrameId) {
        window.cancelAnimationFrame(animation.animationFrameId);
      }
      animation.animationFrameId = 0;
      animation.sections.forEach((section) => {
        section.items.forEach(({ element }) => {
          element.classList.remove("techpg-domain-motion");
          element.style.removeProperty("--domain-transform");
          element.style.removeProperty("--domain-opacity");
        });
      });
      animation.sections = [];
    };
  }, []);

  // Build the ecosystem and standards entrance sequences with shared
  // ScrollTriggers that replay consistently in both scroll directions.

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const triggers = [];

    // 4. Ecosystem scroll animation: fanning-out entrance

    const ecoSec = root.querySelector(".techpg-ecosystem-sec");
    if (ecoSec) {
      const ecoHeader = ecoSec.querySelector(".techpg-sec-head");
      const ecoCards = ecoSec.querySelectorAll(".techpg-ecosystem-card");

      // Initial hide to prevent flash

      gsap.set(ecoCards, { opacity: 0 });

      if (ecoHeader) {
        gsap.set(ecoHeader, { opacity: 0 });
        const headerTrigger = ScrollTrigger.create({
          trigger: ecoHeader,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(ecoHeader,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
          },
          onLeave: () => {
            gsap.set(ecoHeader, { opacity: 0 });
          },
          onEnterBack: () => {
            gsap.fromTo(ecoHeader,
              { y: -30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
          },
          onLeaveBack: () => {
            gsap.set(ecoHeader, { opacity: 0 });
          }
        });
        triggers.push(headerTrigger);
      }

      if (ecoCards.length === 3) {
        const playEcoCards = () => {
          // Left card slides in from left with negative rotation

          gsap.fromTo(ecoCards[0],
            { x: -60, y: 30, opacity: 0, rotationY: -15, transformPerspective: 1000 },
            { x: 0, y: 0, opacity: 1, rotationY: 0, duration: 0.85, ease: "power2.out", clearProps: "all" }
          );
          // Center card slides straight up

          gsap.fromTo(ecoCards[1],
            { y: 60, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power2.out", delay: 0.1, clearProps: "all" }
          );
          // Right card slides in from right with positive rotation

          gsap.fromTo(ecoCards[2],
            { x: 60, y: 30, opacity: 0, rotationY: 15, transformPerspective: 1000 },
            { x: 0, y: 0, opacity: 1, rotationY: 0, duration: 0.85, ease: "power2.out", delay: 0.2, clearProps: "all" }
          );
        };

        const resetEcoCards = () => {
          gsap.set(ecoCards, { opacity: 0 });
        };

        const ecoCardsTrigger = ScrollTrigger.create({
          trigger: ecoSec.querySelector(".techpg-ecosystem-grid") || ecoSec,
          start: "top 80%",
          onEnter: playEcoCards,
          onEnterBack: playEcoCards,
          onLeave: resetEcoCards,
          onLeaveBack: resetEcoCards
        });
        triggers.push(ecoCardsTrigger);
      }
    }

    // 5. Standards scroll animation: split panel sliding and staggered grid zoom

    const stdSec = root.querySelector(".techpg-standards-sec");
    if (stdSec) {
      const stdHeader = stdSec.querySelector(".techpg-sec-head");
      const stdLeft = stdSec.querySelector(".techpg-standards-left-panel");
      const stdRightCards = stdSec.querySelectorAll(".techpg-standards-card");
      const leftItems = stdLeft ? stdLeft.querySelectorAll(".techpg-standards-left-item") : [];

      // Initial hide to prevent flash

      gsap.set([stdLeft, ...leftItems, ...stdRightCards], { opacity: 0 });

      if (stdHeader) {
        gsap.set(stdHeader, { opacity: 0 });
        const headerTrigger = ScrollTrigger.create({
          trigger: stdHeader,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(stdHeader,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
          },
          onLeave: () => {
            gsap.set(stdHeader, { opacity: 0 });
          },
          onEnterBack: () => {
            gsap.fromTo(stdHeader,
              { y: -30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
          },
          onLeaveBack: () => {
            gsap.set(stdHeader, { opacity: 0 });
          }
        });
        triggers.push(headerTrigger);
      }

      if (stdLeft && stdRightCards.length > 0) {
        const playStdElements = () => {
          // Left panel slides from left with a Y-axis tilt

          gsap.fromTo(stdLeft,
            { x: -80, opacity: 0, rotateY: 20, transformPerspective: 1000 },
            { x: 0, opacity: 1, rotateY: 0, duration: 1.0, ease: "power3.out", clearProps: "all" }
          );
          // Stagger inner sub-items of the left panel

          gsap.fromTo(leftItems,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.45, clearProps: "all" }
          );
          // Right cards swing/rotate in staggered order with elastic back ease

          gsap.fromTo(stdRightCards,
            { rotateX: 35, rotateY: -20, y: 50, z: -100, opacity: 0, transformPerspective: 1200 },
            { rotateX: 0, rotateY: 0, y: 0, z: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "back.out(1.2)", delay: 0.25, clearProps: "all" }
          );
        };

        const resetStdElements = () => {
          gsap.set([stdLeft, ...leftItems, ...stdRightCards], { opacity: 0 });
        };

        const stdTrigger = ScrollTrigger.create({
          trigger: stdSec.querySelector(".techpg-standards-grid") || stdSec,
          start: "top 80%",
          onEnter: playStdElements,
          onEnterBack: playStdElements,
          onLeave: resetStdElements,
          onLeaveBack: resetStdElements
        });
        triggers.push(stdTrigger);
      }
    }

    // Destroy triggers on unmount to avoid duplicate callbacks after navigation.

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Reveal ordinary content once as it enters the viewport, while providing
  // an immediate fallback when IntersectionObserver is unavailable.

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      root?.querySelectorAll(".techpg-reveal").forEach((element) => element.classList.add("in"));
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
      { threshold: 0.05, rootMargin: "0px 100px -30px 100px" }
    );

    root.querySelectorAll(".techpg-reveal:not(.in)").forEach((element) => observer.observe(element));
    // Disconnect the observer so it no longer retains section elements.

    return () => observer.disconnect();
  }, []);

  // Ease the decorative background blobs toward pointer movement and suspend
  // frame work while their page container is outside the viewport.

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const blobs = Array.from(root.querySelectorAll(".techpg-blob"));
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

    const bgLayer = root.querySelector(".techpg-bg-layer");
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

    // Stop pointer tracking and release animation resources during navigation.

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

  return (
    <main className="techpg-page" ref={rootRef}>
      {/* Shared Gradient Defs for Domain Symbols */}

      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="domain-symbol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b7bf0" />
            <stop offset="100%" stopColor="#00d2ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="techpg-bg-layer" aria-hidden="true">
        <div className="techpg-blob techpg-blob-1" />
        <div className="techpg-blob techpg-blob-2" />
        <div className="techpg-blob techpg-blob-3" />
        <div className="techpg-blob techpg-blob-4" />
        <div className="techpg-noise" />
      </div>

      {/* ==========================================
         SECTION 1: HERO SECTION
         ========================================== */}

      <section className="techpg-hero techpg-tech-hero" id="top">
        <div className="techpg-hero-grid techpg-container">
          <div className="techpg-hero-left">
            <div className="techpg-eyebrow techpg-reveal">
              <span className="techpg-dot"></span> Technical Depth
            </div>
            <h1 className="techpg-display techpg-reveal techpg-delay-1">
              Multi-Domain<br />
              Technology<br />
              <span className="techpg-hl">Stack.</span>
            </h1>
            <p className="techpg-lede techpg-reveal techpg-delay-2">
              From semiconductor design and embedded platforms to AI-powered edge systems, VCTS works across the
              technologies driving next-generation intelligent products.
            </p>
            <div className="techpg-hero-actions techpg-reveal techpg-delay-3">
              <a href="#coverage" className="techpg-btn techpg-btn-primary">
                Explore Technologies <span>↓</span>
              </a>
              <a href="#cta" className="techpg-btn techpg-btn-ghost">Talk to an architect</a>
            </div>
            <dl className="techpg-hero-meta techpg-reveal techpg-delay-4">
              <div>
                <dt>05</dt>
                <dd>Technical<br />domains</dd>
              </div>
              <div>
                <dt>20+</dt>
                <dd>Engineering<br />categories</dd>
              </div>
              <div>
                <dt>06</dt>
                <dd>Lifecycle<br />phases</dd>
              </div>
            </dl>
          </div>
          <div className="techpg-hero-right techpg-reveal techpg-delay-5">
            <figure className="techpg-hero-figure tilt">
              <div className="techpg-hero-image-float">
                <img
                  src={techStackVisual}
                  alt="Isometric render of a multi-layer technology stack displaying silicon, embedded, and Edge AI layers"
                  className="techpg-hero-img"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span className="techpg-cap-line">Fig. 002</span>
                <span className="techpg-cap-title">VCTS Technology Stack Architecture</span>
                <span className="techpg-cap-loc">Silicon · Embedded · Edge AI</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="techpg-marquee" aria-hidden="true">
          <div className="techpg-marquee-track">
            <span>RISC-V &amp; ARM SoC</span><i>·</i><span>SystemC &amp; TLM</span><i>·</i><span>SystemVerilog /
              UVM</span><i>·</i><span>FPGA Prototyping</span><i>·</i><span>RTL-to-GDSII</span><i>·</i><span>Embedded Linux &amp;
                RTOS</span><i>·</i><span>C / C++ &amp; Rust</span><i>·</i><span>BSP &amp; Device Drivers</span><i>·</i><span>AUTOSAR &amp;
                  ISO 26262</span><i>·</i><span>Edge AI &amp; TinyML</span><i>·</i><span>NVIDIA
                    Jetson</span><i>·</i><span>TensorFlow &amp; PyTorch</span><i>·</i>
            <span>RISC-V &amp; ARM SoC</span><i>·</i><span>SystemC &amp; TLM</span><i>·</i><span>SystemVerilog /
              UVM</span><i>·</i><span>FPGA Prototyping</span><i>·</i><span>RTL-to-GDSII</span><i>·</i><span>Embedded Linux &amp;
                RTOS</span><i>·</i><span>C / C++ &amp; Rust</span><i>·</i><span>BSP &amp; Device Drivers</span><i>·</i><span>AUTOSAR &amp;
                  ISO 26262</span><i>·</i><span>Edge AI &amp; TinyML</span><i>·</i><span>NVIDIA
                    Jetson</span><i>·</i><span>TensorFlow &amp; PyTorch</span><i>·</i>
          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 2: END-TO-END COVERAGE
         ========================================== */}

      <section className="techpg-coverage-sec" id="coverage">
        <div className="techpg-container">
          <div className="techpg-sec-head techpg-reveal">
            <h2 className="techpg-sec-title">
              End-to-End Technology <span className="techpg-sec-title-hl">Coverage</span>
            </h2>
            <p className="techpg-sec-lede">
              Our expertise spans the complete engineering lifecycle—from architecture definition and semiconductor design to embedded implementation, AI deployment, and system validation.
            </p>
          </div>

          <div className="techpg-timeline techpg-reveal">
            <div className="techpg-timeline-line" />
            <div className="techpg-timeline-steps">
              <div className="techpg-timeline-step step-1 techpg-reveal" style={{ '--step-index': 0 }}>
                <div className="techpg-step-dot-outer">
                  <div className="techpg-step-dot" />
                </div>
                <div className="techpg-step-info">
                  <span className="techpg-step-num">01</span>
                  <span className="techpg-step-name">Architecture</span>
                </div>
              </div>
              <div className="techpg-timeline-step step-2 techpg-reveal techpg-delay-1" style={{ '--step-index': 1 }}>
                <div className="techpg-step-dot-outer">
                  <div className="techpg-step-dot" />
                </div>
                <div className="techpg-step-info">
                  <span className="techpg-step-num">02</span>
                  <span className="techpg-step-name">Design</span>
                </div>
              </div>
              <div className="techpg-timeline-step step-3 techpg-reveal techpg-delay-2" style={{ '--step-index': 2 }}>
                <div className="techpg-step-dot-outer">
                  <div className="techpg-step-dot" />
                </div>
                <div className="techpg-step-info">
                  <span className="techpg-step-num">03</span>
                  <span className="techpg-step-name">Verification</span>
                </div>
              </div>
              <div className="techpg-timeline-step step-4 techpg-reveal techpg-delay-3" style={{ '--step-index': 3 }}>
                <div className="techpg-step-dot-outer">
                  <div className="techpg-step-dot" />
                </div>
                <div className="techpg-step-info">
                  <span className="techpg-step-num">04</span>
                  <span className="techpg-step-name">Implementation</span>
                </div>
              </div>
              <div className="techpg-timeline-step step-5 techpg-reveal techpg-delay-4" style={{ '--step-index': 4 }}>
                <div className="techpg-step-dot-outer">
                  <div className="techpg-step-dot" />
                </div>
                <div className="techpg-step-info">
                  <span className="techpg-step-num">05</span>
                  <span className="techpg-step-name">Deployment</span>
                </div>
              </div>
              <div className="techpg-timeline-step step-6 techpg-reveal techpg-delay-5" style={{ '--step-index': 5 }}>
                <div className="techpg-step-dot-outer">
                  <div className="techpg-step-dot" />
                </div>
                <div className="techpg-step-info">
                  <span className="techpg-step-num">06</span>
                  <span className="techpg-step-name">Validation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="techpg-callout-box techpg-reveal">
            <div className="techpg-callout-left">
              <div className="techpg-callout-eyebrow"><strong>From Silicon to Intelligent Edge Systems</strong></div>
              <h3 className="techpg-callout-title">
                A complete engineering lifecycle — in a single team.
              </h3>
            </div>
            <div className="techpg-callout-right">
              <p className="techpg-callout-text">
                VCTS combines deep domain expertise across semiconductor design, embedded systems, automotive functional safety, and Edge AI — delivering intelligent systems that are architected, engineered, and validated end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========          DOMAINS INTRO HEADER
          ========================================== */}

      <section className="techpg-domains-header-sec">
        <div className="techpg-container">
          <div className="techpg-domains-header techpg-reveal">
            <h2 className="techpg-domains-title">
              Technology <span className="techpg-domains-hl">Domains</span>
            </h2>
            <p className="techpg-domains-subtitle">
              Four core engineering disciplines, each with deep sub-category expertise and a comprehensive technology stack.
            </p>
          </div>
        </div>
      </section>

      {/* =========          SECTION 3: SEMICONDUCTOR DOMAIN
          ========================================== */}

      <section className="techpg-domains-sec" id="semiconductor">
        <div className="techpg-container">
          <div className="techpg-domain-row techpg-reveal">

            <div className="techpg-domain-left">

              <div className="techpg-domain-header-row">
                <div className="techpg-domain-symbol">
                  <svg className="techpg-domain-symbol-svg" viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                  </svg>
                </div>
                <h2 className="techpg-domain-title">Semiconductor Engineering</h2>
              </div>
              <p className="techpg-domain-desc">
                From architecture definition through silicon signoff — full-stack chip design and verification.
              </p>
              <div className="techpg-domain-visual">
                <img src={semiconductorDomainImg} alt="Semiconductor Engineering chip layout and design verification visualization" decoding="async" />
              </div>
            </div>

            <div className="techpg-domain-right">
              <div className="techpg-domain-grid">

                {/* Card 1: Architecture & System Design */}

                <div
                  className={`techpg-domain-card ${activeCards["semi-arch"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("semi-arch")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="4" />
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                        <path d="M9 1v5M15 1v5M9 18v5M15 18v5M1 9h5M1 15h5M18 9h5M18 15h5" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Architecture & System Design</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">6</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["ARM Architecture", "RISC-V Architecture", "AMBA Protocols (AXI, AHB, APB)", "SoC Architecture", "Microarchitecture Design", "Compute & Memory Architecture"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2: Modeling & Virtual Platforms */}

                <div
                  className={`techpg-domain-card ${activeCards["semi-model"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("semi-model")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Modeling & Virtual Platforms</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">5</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["SystemC", "TLM", "Virtual Prototyping", "MATLAB", "Simulink"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 3: RTL Design */}

                <div
                  className={`techpg-domain-card ${activeCards["semi-rtl"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("semi-rtl")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                        <line x1="14" y1="4" x2="10" y2="20" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">RTL Design</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">5</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Verilog", "SystemVerilog", "VHDL", "Low-Power Design", "Clock Gating"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 4: Verification */}

                <div
                  className={`techpg-domain-card ${activeCards["semi-verify"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("semi-verify")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 11 2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Verification</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">5</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["UVM", "Assertions (SVA)", "Coverage-Driven Verification", "Formal Verification", "Protocol Verification"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 5: FPGA & Prototyping */}

                <div
                  className={`techpg-domain-card ${activeCards["semi-fpga"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("semi-fpga")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" rx="1" />
                        <line x1="9" y1="1" x2="9" y2="4" />
                        <line x1="15" y1="1" x2="15" y2="4" />
                        <line x1="9" y1="20" x2="9" y2="23" />
                        <line x1="15" y1="20" x2="15" y2="23" />
                        <line x1="20" y1="9" x2="23" y2="9" />
                        <line x1="20" y1="15" x2="23" y2="15" />
                        <line x1="1" y1="9" x2="4" y2="9" />
                        <line x1="1" y1="15" x2="4" y2="15" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">FPGA & Prototyping</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">6</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["AMD/Xilinx FPGA", "Intel FPGA", "FPGA Prototyping", "PCIe", "DDR", "Ethernet"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 6: Physical Design & Signoff */}

                <div
                  className={`techpg-domain-card ${activeCards["semi-physical"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("semi-physical")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Physical Design & Signoff</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">6</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Floorplanning", "CTS", "Place & Route", "STA", "CDC/RDC", "DRC/LVS"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 7: EDA Ecosystem */}

                <div
                  className={`techpg-domain-card ${activeCards["semi-eda"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("semi-eda")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">EDA Ecosystem</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">3</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Synopsys", "Cadence", "Siemens EDA"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 4: EMBEDDED SYSTEMS DOMAIN
         ========================================== */}

      <section className="techpg-domains-sec" id="embedded">
        <div className="techpg-container">
          <div className="techpg-domain-row techpg-reveal">

            <div className="techpg-domain-left">

              <div className="techpg-domain-header-row">
                <div className="techpg-domain-symbol">
                  <svg className="techpg-domain-symbol-svg" viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="3" />
                    <path d="M9 14h3a2 2 0 0 0 2-2V9" />
                    <circle cx="9" cy="14" r="1.5" />
                    <circle cx="14" cy="9" r="1.5" />
                  </svg>
                </div>
                <h2 className="techpg-domain-title">Embedded Systems</h2>
              </div>
              <p className="techpg-domain-desc">
                Building reliable, close-to-metal software and robust hardware solutions that connect physical systems with intelligent control.
              </p>
              <div className="techpg-domain-visual">
                <img src={embeddedDomainImg} alt="Embedded Systems cloud connected microcontroller sensor board design visualization" decoding="async" />
              </div>
            </div>

            <div className="techpg-domain-right">
              <div className="techpg-domain-grid">

                {/* Card 1: Processor Platforms */}

                <div
                  className={`techpg-domain-card ${activeCards["embed-platforms"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("embed-platforms")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" rx="1" />
                        <line x1="9" y1="1" x2="9" y2="4" />
                        <line x1="15" y1="1" x2="15" y2="4" />
                        <line x1="9" y1="20" x2="9" y2="23" />
                        <line x1="15" y1="20" x2="15" y2="23" />
                        <line x1="20" y1="9" x2="23" y2="9" />
                        <line x1="20" y1="15" x2="23" y2="15" />
                        <line x1="1" y1="9" x2="4" y2="9" />
                        <line x1="1" y1="15" x2="4" y2="15" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Processor Platforms</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">7</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["ARM Cortex-M", "ARM Cortex-A", "ARM Cortex-R", "RISC-V", "STM32", "NXP", "TI"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2: Operating Systems */}

                <div
                  className={`techpg-domain-card ${activeCards["embed-os"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("embed-os")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Operating Systems</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">4</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Embedded Linux", "FreeRTOS", "Zephyr", "ThreadX"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 3: Programming Languages */}

                <div
                  className={`techpg-domain-card ${activeCards["embed-languages"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("embed-languages")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Programming Languages</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">4</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["C", "C++", "Python", "Rust"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 4: BSP & Driver Development */}

                <div
                  className={`techpg-domain-card ${activeCards["embed-drivers"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("embed-drivers")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                        <line x1="1" y1="14" x2="7" y2="14" />
                        <line x1="9" y1="8" x2="15" y2="8" />
                        <line x1="17" y1="16" x2="23" y2="16" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">BSP & Driver Development</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">2</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["BSP Development", "Device Drivers"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 5: Middleware Development */}

                <div
                  className={`techpg-domain-card ${activeCards["embed-middleware"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("embed-middleware")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Middleware Development</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">1</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Hardware Abstraction Layer (HAL)"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 6: Connectivity & Communication */}

                <div
                  className={`techpg-domain-card ${activeCards["embed-connectivity"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("embed-connectivity")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Connectivity & Communication</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">7</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["UART", "SPI", "I2C", "CAN", "LIN", "USB", "Ethernet"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 7: Wireless Technologies */}

                <div
                  className={`techpg-domain-card ${activeCards["embed-wireless"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("embed-wireless")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                        <circle cx="12" cy="20" r="1" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Wireless Technologies</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">4</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Wi-Fi", "BLE", "Zigbee", "LoRaWAN"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 8: Cloud & IoT */}

                <div
                  className={`techpg-domain-card ${activeCards["embed-cloud"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("embed-cloud")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Cloud & IoT</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">5</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["MQTT", "CoAP", "OTA Updates", "AWS IoT", "Azure IoT"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 5: AUTOMOTIVE SAFETY & SYSTEMS DOMAIN
         ========================================== */}

      <section className="techpg-domains-sec" id="automotive">
        <div className="techpg-container">
          <div className="techpg-domain-row techpg-reveal">

            <div className="techpg-domain-left">

              <div className="techpg-domain-header-row">
                <div className="techpg-domain-symbol">
                  <svg className="techpg-domain-symbol-svg" viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <h2 className="techpg-domain-title">Automotive & Functional Safety</h2>
              </div>
              <p className="techpg-domain-desc">
                Designing safety-critical, standard-compliant automotive systems that power modern electric, connected, and autonomous vehicles.
              </p>
              <div className="techpg-domain-visual">
                <img src={automotiveDomainImg} alt="Automotive and Functional Safety autonomous car engineering and ADAS wiring system representation" decoding="async" />
              </div>
            </div>

            <div className="techpg-domain-right">
              <div className="techpg-domain-grid">

                {/* Card 1: Functional Safety */}

                <div
                  className={`techpg-domain-card ${activeCards["auto-platforms"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("auto-platforms")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Functional Safety</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">4</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["ISO 26262", "ASIL Development", "Safety Analysis", "Functional Safety Lifecycle"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2: Vehicle Communication */}

                <div
                  className={`techpg-domain-card ${activeCards["auto-comm"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("auto-comm")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Vehicle Communication</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">4</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["CAN", "CAN FD", "LIN", "Automotive Ethernet"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 3: Diagnostics & Vehicle Services */}

                <div
                  className={`techpg-domain-card ${activeCards["auto-diag"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("auto-diag")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Diagnostics & Vehicle Services</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">2</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["UDS", "OBD"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 4: Automotive Software Platforms */}

                <div
                  className={`techpg-domain-card ${activeCards["auto-safety"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("auto-safety")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="9" />
                        <rect x="14" y="3" width="7" height="5" />
                        <rect x="14" y="12" width="7" height="9" />
                        <rect x="3" y="16" width="7" height="5" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Automotive Software Platforms</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">2</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["AUTOSAR Classic", "AUTOSAR Adaptive"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 5: Automotive Process Standards */}

                <div
                  className={`techpg-domain-card ${activeCards["auto-standards"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("auto-standards")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Automotive Process Standards</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">1</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["ASPICE"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 6: Requirements Engineering */}

                <div
                  className={`techpg-domain-card ${activeCards["auto-reqs"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("auto-reqs")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="6" y1="3" x2="6" y2="15" />
                        <circle cx="18" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <path d="M18 9a9 9 0 0 1-9 9" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Requirements Engineering</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">1</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Traceability Management"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 6: EDGE AI & TINYML DOMAIN
         ========================================== */}

      <section className="techpg-domains-sec" id="edgeai">
        <div className="techpg-container">
          <div className="techpg-domain-row techpg-reveal">

            <div className="techpg-domain-left">

              <div className="techpg-domain-header-row">
                <div className="techpg-domain-symbol">
                  <svg className="techpg-domain-symbol-svg" viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                    <path d="M12 5v14" />
                    <path d="M12 9h4a2 2 0 1 1 0 4h-4" />
                    <path d="M12 9H8a2 2 0 1 0 0 4h4" />
                  </svg>
                </div>
                <h2 className="techpg-domain-title">Edge AI Engineering</h2>
              </div>
              <p className="techpg-domain-desc">
                Optimizing and deploying advanced deep learning models directly on low-power, constrained microcontrollers and edge hardware.
              </p>
              <div className="techpg-domain-visual">
                <img src={edgeaiDomainImg} alt="Edge AI Engineering intelligent industrial automation robotic arm and computer vision visualization" decoding="async" />
              </div>
            </div>

            <div className="techpg-domain-right">
              <div className="techpg-domain-grid">

                {/* Card 1: Computer Vision */}

                <div
                  className={`techpg-domain-card ${activeCards["edge-vision"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("edge-vision")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Computer Vision</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">5</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Object Detection", "Object Tracking", "Image Classification", "Segmentation", "Video Analytics"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2: AI Frameworks */}

                <div
                  className={`techpg-domain-card ${activeCards["edge-frameworks"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("edge-frameworks")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                        <path d="M12 5v14" />
                        <path d="M12 9h4a2 2 0 1 1 0 4h-4" />
                        <path d="M12 9H8a2 2 0 1 0 0 4h4" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">AI Frameworks</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">5</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["TensorFlow", "TensorFlow Lite", "PyTorch", "ONNX", "OpenVINO"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 3: Edge AI Optimization */}

                <div
                  className={`techpg-domain-card ${activeCards["edge-opt"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("edge-opt")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                        <path d="m12 14 4-4" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Edge AI Optimization</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">4</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["Quantization", "Pruning", "Model Compression", "Runtime Optimization"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 4: Hardware Acceleration */}

                <div
                  className={`techpg-domain-card ${activeCards["edge-acceleration"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("edge-acceleration")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Hardware Acceleration</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">5</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["CUDA", "TensorRT", "GPU Acceleration", "NPU Acceleration", "FPGA Acceleration"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 5: Edge AI Platforms */}

                <div
                  className={`techpg-domain-card ${activeCards["edge-platforms"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("edge-platforms")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                        <line x1="6" y1="6" x2="6.01" y2="6" />
                        <line x1="6" y1="18" x2="6.01" y2="18" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">Edge AI Platforms</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">5</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["NVIDIA Jetson", "Qualcomm AI Platforms", "Intel Edge AI", "NXP i.MX", "STM32 AI"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 6: TinyML & Embedded AI */}

                <div
                  className={`techpg-domain-card ${activeCards["edge-tinyml"] ? "expanded" : ""}`}
                  onClick={() => toggleCard("edge-tinyml")}
                >
                  <div className="techpg-card-header">
                    <div className="techpg-card-icon">
                      <svg className="techpg-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" rx="1" />
                        <line x1="9" y1="1" x2="9" y2="4" />
                        <line x1="15" y1="1" x2="15" y2="4" />
                        <line x1="9" y1="20" x2="9" y2="23" />
                        <line x1="15" y1="20" x2="15" y2="23" />
                        <line x1="20" y1="9" x2="23" y2="9" />
                        <line x1="20" y1="15" x2="23" y2="15" />
                        <line x1="1" y1="9" x2="4" y2="9" />
                        <line x1="1" y1="15" x2="4" y2="15" />
                      </svg>
                    </div>
                    <h3 className="techpg-card-title">TinyML & Embedded AI</h3>
                    <div className="techpg-card-indicator">
                      <span className="techpg-card-count">3</span>
                      <svg className="techpg-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="techpg-card-body">
                    <div className="techpg-card-tags">
                      {["TinyML", "Embedded AI", "Microcontroller AI Deployment"].map((tag, idx) => (
                        <span key={idx} className="techpg-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==========================================
         SECTION 6: DEVELOPMENT & ENGINEERING ECOSYSTEM (Standalone Section)
         ========================================== */}

      <section className="techpg-ecosystem-sec" id="ecosystem">
        <div className="techpg-container">

          <div className="techpg-sec-head techpg-reveal">
            <span className="techpg-eyebrow">
              <span className="techpg-dot"></span> Tools & Infrastructure
            </span>
            <h2 className="techpg-sec-title">
              Development & Engineering <span className="techpg-sec-title-hl">Ecosystem</span>
            </h2>
            <p className="techpg-sec-lede">
              Reliable configuration management, automated integration pipelines, and engineering simulation frameworks.
            </p>
          </div>

          <div className="techpg-ecosystem-grid techpg-reveal">

            {/* Card 1: Collaboration & Configuration Management */}

            <div className="techpg-ecosystem-card">
              <div className="techpg-ecosystem-card-header">
                <div className="techpg-ecosystem-card-icon">
                  <svg className="techpg-ecosystem-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="3" x2="6" y2="15" />
                    <circle cx="18" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M18 9a9 9 0 0 1-9 9" />
                  </svg>
                </div>
                <h3 className="techpg-ecosystem-card-title">Collaboration & Configuration Management</h3>
              </div>
              <div className="techpg-ecosystem-card-tags">
                {["Git", "GitHub", "GitLab", "Jira", "Confluence"].map((tag, idx) => (
                  <span key={idx} className="techpg-ecosystem-card-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 2: CI/CD & DevOps */}

            <div className="techpg-ecosystem-card">
              <div className="techpg-ecosystem-card-header">
                <div className="techpg-ecosystem-card-icon">
                  <svg className="techpg-ecosystem-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <h3 className="techpg-ecosystem-card-title">CI/CD & DevOps</h3>
              </div>
              <div className="techpg-ecosystem-card-tags">
                {["Jenkins", "Docker", "Containerized Workflows"].map((tag, idx) => (
                  <span key={idx} className="techpg-ecosystem-card-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 3: Engineering Simulation & Analysis */}

            <div className="techpg-ecosystem-card">
              <div className="techpg-ecosystem-card-header">
                <div className="techpg-ecosystem-card-icon">
                  <svg className="techpg-ecosystem-card-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <h3 className="techpg-ecosystem-card-title">Engineering Simulation & Analysis</h3>
              </div>
              <div className="techpg-ecosystem-card-tags">
                {["MATLAB", "Simulink", "SystemC"].map((tag, idx) => (
                  <span key={idx} className="techpg-ecosystem-card-tag">{tag}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 7: INDUSTRY STANDARDS & COMPLIANCE (Standalone Section)
         ========================================== */}

      <section className="techpg-standards-sec" id="standards">
        <div className="techpg-container">

          <div className="techpg-sec-head techpg-reveal">
            <span className="techpg-eyebrow">
              <span className="techpg-dot"></span> Governance & Compliance
            </span>
            <h2 className="techpg-sec-title">
              Industry Standards & <span className="techpg-sec-title-hl">Compliance</span>
            </h2>
            <p className="techpg-sec-lede">
              Adhering to strict international methodologies, safety lifecycles, and process models to deliver automotive-grade quality.
            </p>
          </div>

          <div className="techpg-standards-grid techpg-reveal">

            {/* Left Column: Big Showcase Card (Engineering Governance) */}

            <div className="techpg-standards-left-panel">
              <div className="techpg-standards-left-header">
                <div className="techpg-standards-left-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="techpg-standards-shield-svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="techpg-standards-left-title">Standards, Methodologies & Best Practices</h3>
                  <span className="techpg-standards-left-tag">System Governance</span>
                </div>
              </div>
              <p className="techpg-standards-left-desc">
                We integrate functional safety and threat defense directly into our hardware design and software architectures from day one.
              </p>

              <div className="techpg-standards-left-items">
                <div className="techpg-standards-left-item">
                  <div className="techpg-standards-left-item-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="techpg-standards-left-item-icon">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <div className="techpg-standards-left-item-content">
                    <h4 className="techpg-standards-left-item-title">Functional Safety Methodologies</h4>
                    <p className="techpg-standards-left-item-desc">
                      Strict implementation of hazard analysis, risk assessment (HARA), safety goals, and ASIL level compliance.
                    </p>
                  </div>
                </div>

                <div className="techpg-standards-left-item">
                  <div className="techpg-standards-left-item-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="techpg-standards-left-item-icon">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div className="techpg-standards-left-item-content">
                    <h4 className="techpg-standards-left-item-title">Secure Development Practices</h4>
                    <p className="techpg-standards-left-item-desc">
                      Adherence to threat modeling, secure coding standards (MISRA C/C++), and vulnerability testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Bento-style Cards */}

            <div className="techpg-standards-right-grid">

              {/* Card 1: ISO 26262 */}

              <div className="techpg-standards-card">
                <div className="techpg-standards-card-header-row">
                  <div className="techpg-standards-card-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="techpg-standards-card-icon">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="techpg-standards-card-badge">Safety Standard</div>
                </div>
                <h3 className="techpg-standards-card-title">ISO 26262</h3>
                <p className="techpg-standards-card-desc">
                  Ensuring safety lifecycle and functional safety for road vehicles.
                </p>
                <div className="techpg-standards-card-watermark">ASIL-D</div>
              </div>

              {/* Card 2: ASPICE */}

              <div className="techpg-standards-card">
                <div className="techpg-standards-card-header-row">
                  <div className="techpg-standards-card-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="techpg-standards-card-icon">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="techpg-standards-card-badge">Process Model</div>
                </div>
                <h3 className="techpg-standards-card-title">ASPICE</h3>
                <p className="techpg-standards-card-desc">
                  Software process capability evaluation and improvement framework.
                </p>
                <div className="techpg-standards-card-watermark">LEVEL 3</div>
              </div>

              {/* Card 3: AUTOSAR */}

              <div className="techpg-standards-card">
                <div className="techpg-standards-card-header-row">
                  <div className="techpg-standards-card-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="techpg-standards-card-icon">
                      <rect x="3" y="3" width="7" height="9" />
                      <rect x="14" y="3" width="7" height="5" />
                      <rect x="14" y="12" width="7" height="9" />
                      <rect x="3" y="16" width="7" height="5" />
                    </svg>
                  </div>
                  <div className="techpg-standards-card-badge">Architecture</div>
                </div>
                <h3 className="techpg-standards-card-title">AUTOSAR</h3>
                <p className="techpg-standards-card-desc">
                  Standardized open software architecture for ECUs.
                </p>
                <div className="techpg-standards-card-watermark">ECU</div>
              </div>

              {/* Card 4: IEEE Standards */}

              <div className="techpg-standards-card">
                <div className="techpg-standards-card-header-row">
                  <div className="techpg-standards-card-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="url(#domain-symbol-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="techpg-standards-card-icon">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div className="techpg-standards-card-badge">Engineering</div>
                </div>
                <h3 className="techpg-standards-card-title">IEEE Standards</h3>
                <p className="techpg-standards-card-desc">
                  Adhering to IEEE electrical and system design specifications.
                </p>
                <div className="techpg-standards-card-watermark">IEEE</div>
              </div>

              {/* Card 5: AMBA Specifications (Span 2 - Accent Gradient Card) */}

              <div className="techpg-standards-card techpg-standards-card-wide techpg-standards-card-accent">
                <div className="techpg-standards-card-header-row">
                  <div className="techpg-standards-card-icon-box-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="techpg-standards-card-icon-white">
                      <polyline points="16 3 21 8 16 13" />
                      <line x1="21" y1="8" x2="9" y2="8" />
                      <polyline points="8 21 3 16 8 11" />
                      <line x1="3" y1="16" x2="15" y2="16" />
                    </svg>
                  </div>
                  <div className="techpg-standards-card-badge-white">SoC Protocol</div>
                </div>
                <h3 className="techpg-standards-card-title-white">AMBA Specifications</h3>
                <p className="techpg-standards-card-desc-white">
                  ARM advanced microcontroller bus architecture specifications for high-performance on-chip communication.
                </p>
                <div className="techpg-standards-card-watermark-white">AMBA</div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <section className="techpg-cta" id="cta">
        <div className="container techpg-reveal">
          <h2 className="techpg-display-2">
            Have a custom silicon project that needs
            <br />
            <em>real</em> engineering underneath it?
          </h2>
          <p>
            We take on a small, deliberate number of engagements each quarter. Tell us what you're
            building — we'll reply within two working days with a preliminary read.
          </p>
          <form
            className="techpg-cta-form"
            onSubmit={(event) => {
              event.preventDefault();
              setFormSent(true);
            }}
          >
            <input type="email" placeholder="your@work-email.com" required />
            <button type="submit">{formSent ? "Sent · we'll be in touch" : "Talk to us →"}</button>
          </form>
          <div className="techpg-cta-alt">
            or write directly to <a href="mailto:hr@vconnectech.in">hr@vconnectech.in</a>
          </div>
        </div>
      </section>

      <section className="techpg-brochure-section">
        <div className="container">
          <div className="techpg-brochure-card techpg-reveal">
            <div className="techpg-brochure-content">
              <h3 className="techpg-brochure-title">
                <em>Technology & Engineering</em> Capability Brochure
              </h3>
              <p className="techpg-brochure-description">
                Learn about our complete engineering workflow, technologies, development process, industries, and project delivery approach.
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="techpg-btn techpg-btn-primary techpg-brochure-btn"
              >
                <span className="vlsipg-btn__label">Download Brochure</span>
                <span className="vlsipg-btn__icon" aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="techpg-brochure-visual">
              <img src={technologiesBrochure} alt="VCTS Technology & Engineering Capability Brochure visual" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="techpg-faq-section" id="faq">
        <div className="container">
          <div className="techpg-sec-head techpg-split techpg-reveal">
            <div>
              <h2 className="techpg-sec-title">
                Answers before <br />
                <span className="techpg-sec-title-hl">we start engineering</span>
              </h2>
            </div>
            <p className="techpg-sec-lede">
              A quick view of how VCTS engages across custom silicon, embedded systems, Edge AI, and automotive programs.
            </p>
          </div>

          <div className="techpg-faq-list techpg-reveal">
            {faqItems.map((item, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`techpg-faq-item ${isOpen ? "is-open" : ""}`}
                  onMouseEnter={() => setActiveFaqIndex(index)}
                >
                  <div
                    className="techpg-faq-question"
                    onClick={() => setActiveFaqIndex(index)}
                  >
                    <span>{item.q}</span>
                    <span className="techpg-faq-icon-indicator" />
                  </div>
                  <div className="techpg-faq-answer-wrapper">
                    <div className="techpg-faq-answer-content">
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

const faqItems = [
  {
    q: "What core technologies and domains does VCTS specialize in?",
    a: "VCTS provides specialized engineering across Semiconductor/ASIC design and verification, Embedded firmware & RTOS, Edge AI & smart vision pipelines, and safety-critical Automotive hardware-software architectures."
  },
  {
    q: "How does VCTS optimize Edge AI models for resource-constrained hardware?",
    a: "We combine model pruning, deep quantization (INT8/FPGA-friendly weights), custom operator mapping, and hardware-specific kernel optimization to deploy neural networks on low-power Edge platforms with minimal footprint."
  },
  {
    q: "What is your approach to safety-critical embedded systems and automotive compliance?",
    a: "We develop in compliance with strict industry safety guidelines, including ISO 26262 (ASIL A-D) for automotive electronics, MISRA rules for C/C++, and secure boot and encrypted OTA updates for high-integrity products."
  },
  {
    q: "Can you co-design custom hardware alongside low-level firmware?",
    a: "Yes. Our team handles complete hardware-software co-design. We coordinate RTL/ASIC/FPGA development, high-speed PCB layouts, and driver/RTOS development concurrently to eliminate potential integration mismatches."
  },
  {
    q: "Do you support BSP development and operating system porting?",
    a: "Yes. We design custom Board Support Packages (BSPs), author optimized kernel device drivers, and port Real-Time Operating Systems (RTOS) or Embedded Linux to custom silicon and standard FPGA boards."
  },
  {
    q: "How do we coordinate a multi-disciplinary technology engagement?",
    a: "We begin with a thorough technical scoping phase to define clean boundaries and interfaces between hardware, firmware, and software. Our engineers then develop in structured sprints, concluding with full system verification."
  }
];
