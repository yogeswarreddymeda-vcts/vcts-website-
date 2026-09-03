/**
 * Edge AI Page
 *
 * Presents edge-intelligence capabilities, platform ecosystem, delivery journey,
 * engineering services, engagement guidance, and frequently asked questions.
 */

import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/edgeai.css";
import edaHeroImg from "../assets/image/edgeai/eda_hero.webp";
import edas1 from "../assets/image/edgeai/edaservice_img/edas1.webp";
import edas2 from "../assets/image/edgeai/edaservice_img/edas2.webp";
import edas3 from "../assets/image/edgeai/edaservice_img/edas3.webp";
import edas4 from "../assets/image/edgeai/edaservice_img/edas4.webp";
import edas5 from "../assets/image/edgeai/edaservice_img/edas5.webp";
import edas6 from "../assets/image/edgeai/edaservice_img/edas6.webp";
import edasB from "../assets/image/edgeai/edaservice_img/edas_b.webp";

gsap.registerPlugin(ScrollTrigger);

/* ============ FAQ DATA ============ */

const FAQ_DATA = [
  {
    q: "Can VConnectTech support an Edge AI project from hardware selection through deployment?",
    a: "Yes. We cover the entire Edge AI lifecycle: platform evaluation, model optimization & quantization (TensorRT, OpenVINO, TinyML), software/hardware co-design, custom hardware acceleration (TPUs, FPGAs), testing and hardware-in-the-loop (HIL) validation, and lifecycle support."
  },
  {
    q: "Do you work on both deep learning accelerators and low-power microcontrollers (TinyML)?",
    a: "Yes. We develop solutions across the entire hardware spectrum — from high-performance edge computing units (NVIDIA Jetson, Intel Core) to dedicated neural accelerators (Google Coral Edge TPU, Hailo) and resource-constrained microcontrollers using TinyML toolchains."
  },
  {
    q: "Which Edge AI runtimes, frameworks, and toolchains do you support?",
    a: "We support frameworks like TensorFlow, PyTorch, and JAX, and optimize them using vendor-specific compiler engines and runtimes including ONNX Runtime, NVIDIA TensorRT, Intel OpenVINO, Qualcomm SNPE, STM32Cube.AI, and ARM CMSIS-NN."
  },
  {
    q: "Can you optimize or quantize an existing machine learning model?",
    a: "Yes. We specialize in post-training quantization (INT8/FP16), quantization-aware training, model pruning, and knowledge distillation to shrink model footprint and boost inference speed without sacrificing target accuracy."
  },
  {
    q: "Do you support over-the-air (OTA) updates and fleet management?",
    a: "Yes. We integrate secure OTA update mechanisms and remote fleet monitoring to safely deploy new model weights, manage firmware versions, and gather telemetry anomalies for continuous learning cycles."
  },
  {
    q: "How do we start a new engagement?",
    a: "Tell us about your Edge AI requirements through the contact form or by emailing us directly. We take on a small, deliberate number of engagements each quarter and reply within two working days with a preliminary read on your project."
  }
];
/* ============ END FAQ DATA ============ */

/** Renders the complete Edge AI capability page and its interactive visuals. */

export default function EdgeAI() {
  const tiltRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [activeFaq, setActiveFaq] = React.useState(null);
  const [formSent, setFormSent] = React.useState(false);

  // Reveal the hero in reading order, then clear temporary GSAP transforms
  // so the settled layout remains controlled by the stylesheet.

  React.useEffect(() => {
    window.scrollTo(0, 0);
    gsap.set(".edega-hero-badge", { opacity: 0, y: 12 });
    gsap.set(".edega-line-inner", { opacity: 0, yPercent: 110 });
    gsap.set(".edega-hero-desc", { opacity: 0, y: 16 });
    gsap.set(".edega-hero-actions", { opacity: 0, y: 14 });
    gsap.set(".edega-hero-stats", { opacity: 0, y: 14 });
    gsap.set(".edega-hero-right", { opacity: 0, y: 20 });
    gsap.set(".edega-hero-image", { scale: 1.1, filter: "brightness(0.92)" });
    gsap.set(".edega-ticker-section", { opacity: 0, y: 15 });

    const heroTL = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        gsap.set([".edega-hero-badge", ".edega-line-inner", ".edega-hero-desc", ".edega-hero-actions", ".edega-hero-stats", ".edega-hero-right", ".edega-ticker-section"], {
          clearProps: "transform,filter,willChange,perspective,scale"
        });
      }
    });
    heroTL
      .to(".edega-hero-badge", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      .to(".edega-line-inner", {
        opacity: 1,
        yPercent: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power4.out"
      }, "-=0.2")
      .to(".edega-hero-right", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.55")
      .to(".edega-hero-image", { scale: 1, filter: "brightness(1)", duration: 0.8, ease: "power2.out" }, "-=0.65")
      .to(".edega-hero-desc", { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.5")
      .to(".edega-hero-actions", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.35")
      .to(".edega-hero-stats", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")
      .to(".edega-ticker-section", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.25");

    // Stop the timeline on unmount so it cannot retain detached hero elements.

    return () => heroTL.kill();
  }, []);

  // Draw the pointer-responsive network background and resize its canvas
  // whenever the viewport dimensions change.

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const bctx = canvas.getContext("2d");
    let W, H, nodes = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("pointermove", onPointerMove);

    function resizeBg() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(22, Math.min(60, Math.floor((W * H) / 32000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    }

    resizeBg();
    window.addEventListener("resize", resizeBg);

    let frameId = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function drawBg() {
      bctx.clearRect(0, 0, W, H);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 0.1) {
          n.x += (dx / d) * 0.5;
          n.y += (dy / d) * 0.5;
        }
      });


      nodes.forEach((n) => {
        bctx.beginPath();
        bctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        bctx.fillStyle = "rgba(30, 107, 230, 0.28)";
        bctx.fill();
      });

      if (!reduceMotion) {
        frameId = requestAnimationFrame(drawBg);
      }
    }

    drawBg();

    gsap.set(canvas, { opacity: 0 });
    const fadeST = ScrollTrigger.create({
      trigger: ".edega-hero-section",
      start: "bottom 95%",
      end: "bottom 40%",
      scrub: true,
      animation: gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, ease: "none" })
    });

    // Release global listeners, animation frames, and ScrollTrigger state
    // when the page is no longer mounted.

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resizeBg);
      if (frameId) cancelAnimationFrame(frameId);
      if (fadeST) fadeST.kill();
    };
  }, []);

  // Reveal ecosystem cards together, then let them drift apart as the
  // section leaves the viewport to create a continuous scroll sequence.

  React.useEffect(() => {
    const revealWrappers = gsap.utils.toArray(".edega-ecosystem-card-wrapper");
    const driftCards = gsap.utils.toArray(".edega-ecosystem-card-anim-target");
    if (!revealWrappers.length || !driftCards.length) return;

    gsap.set([
      ".edega-ecosystem-section .edega-section-tag",
      ".edega-ecosystem-section .edega-section-title",
      ".edega-ecosystem-section .edega-section-subtitle"
    ], { opacity: 0, y: 20 });
    gsap.set(".edega-section-glow-line", { scaleX: 0 });
    gsap.set(revealWrappers, { opacity: 0, y: 35 });

    const revealTimeline = gsap.timeline({ paused: true });
    revealTimeline
      .to(".edega-ecosystem-section .edega-section-tag", { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0)
      .to(".edega-ecosystem-section .edega-section-title", { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.15)
      .to(".edega-ecosystem-section .edega-section-subtitle", { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.28)
      .to(".edega-section-glow-line", { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 0.45)
      .to(revealWrappers, { opacity: 1, y: 0, duration: 0.6, stagger: 0.14, ease: "power3.out" }, 0.65);

    const revealTrigger = ScrollTrigger.create({
      trigger: ".edega-ecosystem-section",
      start: "top 80%",
      onEnter: () => revealTimeline.play(),
      onEnterBack: () => revealTimeline.play(),
      onLeaveBack: () => revealTimeline.reverse()
    });

    const drifts = [
      { x: -220, y: -60, rotation: -8, opacity: 0.15 },
      { x: -80, y: 60, rotation: 6, opacity: 0.4 },
      { x: 80, y: -60, rotation: -6, opacity: 0.4 },
      { x: 220, y: 60, rotation: 8, opacity: 0.15 }
    ];

    const exitTimeline = gsap.timeline();
    driftCards.forEach((card, idx) => {
      const drift = drifts[idx] || { x: 220, y: 60, rotation: 8, opacity: 0.15 };
      exitTimeline.to(card, {
        x: drift.x,
        y: drift.y,
        rotation: drift.rotation,
        opacity: drift.opacity,
        ease: "power1.inOut"
      }, 0);
    });

    const exitTrigger = ScrollTrigger.create({
      trigger: ".edega-ecosystem-section",
      start: "bottom 70%",
      end: "bottom 15%",
      scrub: true,
      animation: exitTimeline,
      invalidateOnRefresh: true
    });

    // Kill section triggers and tweens to prevent duplicate animations on remount.

    return () => {
      revealTrigger.kill();
      exitTrigger.kill();
      revealTimeline.kill();
      revealWrappers.forEach(w => gsap.killTweensOf(w));
      driftCards.forEach(c => gsap.killTweensOf(c));
    };
  }, []);

  // Coordinate the desktop services morph while preserving a reset path
  // for smaller viewports and recalculating geometry after resize.

  React.useEffect(() => {
    const isMobile = window.innerWidth <= 1024;
    const section = document.querySelector(".edega-services-section");
    const grid = document.querySelector(".edega-services-grid");
    const cards = gsap.utils.toArray(".edega-service-card");
    const centerNode = document.querySelector(".edega-morph-center-node");
    const svgCanvas = document.querySelector(".edega-morph-svg");
    const morphContainer = document.querySelector(".edega-morph-container");
    const headerTag = section?.querySelector(".edega-section-tag");
    const headerTitle = section?.querySelector(".edega-section-title");
    const headerSub = section?.querySelector(".edega-section-subtitle");

    if (!section || !grid || cards.length < 6 || !centerNode || !svgCanvas || !morphContainer) return;

    const resetCardsForMobile = () => {
      cards.forEach(card => {
        card.classList.remove("edega-in-cluster");
        gsap.set(card, { clearProps: "all" });
        const title = card.querySelector(".edega-service-title");
        const desc = card.querySelector(".edega-service-desc");
        const tags = card.querySelector(".edega-service-tags");
        const iconBox = card.querySelector(".edega-service-icon-box");
        const svgIcon = card.querySelector(".edega-service-icon");
        const cardImg = card.querySelector(".edega-service-card-image");

        if (title) gsap.set(title, { clearProps: "all" });
        if (desc) gsap.set(desc, { clearProps: "all" });
        if (tags) gsap.set(tags, { clearProps: "all" });
        if (iconBox) gsap.set(iconBox, { clearProps: "all" });
        if (svgIcon) gsap.set(svgIcon, { clearProps: "all" });
        if (cardImg) gsap.set(cardImg, { clearProps: "all" });
      });
    };

    const headerEls = [headerTag, headerTitle, headerSub].filter(Boolean);
    gsap.set(headerEls, { opacity: 0, y: 24 });
    const headerST = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" });
      }
    });

    if (isMobile) {
      resetCardsForMobile();
      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.set(centerNode, { display: "none" });
      gsap.set(svgCanvas, { display: "none" });
      const mobileST = ScrollTrigger.create({
        trigger: grid,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" });
        }
      });
      // Destroy mobile-only triggers when the media-query scope is reverted.

      return () => { headerST.kill(); mobileST.kill(); };
    }

    let cardData = [];
    let morphTL = null;
    let morphST = null;
    let svgLines = [];
    let orbitGrid = null;
    let orbitSVG = null;
    let orbitCards = null;

    const CLUSTER_RADIUS = 160;
    const NODE_SIZE = 90;

    const clearAll = () => {
      if (orbitGrid) { orbitGrid.kill(); orbitGrid = null; }
      if (orbitSVG) { orbitSVG.kill(); orbitSVG = null; }
      if (orbitCards) { orbitCards.kill(); orbitCards = null; }
      grid.style.position = "";
      grid.style.width = "";
      grid.style.height = "";
      gsap.set([grid, svgCanvas], { clearProps: "rotation,transformOrigin" });
      cards.forEach(card => {
        card.style.position = "";
        card.style.left = "";
        card.style.top = "";
        card.classList.remove("edega-in-cluster");
        gsap.set(card, { clearProps: "all" });
        ["edega-service-title", "edega-service-desc", "edega-service-tags", "edega-service-icon-box", "edega-service-icon"].forEach(cls => {
          const el = card.querySelector(`.${cls}`);
          if (el) gsap.set(el, { clearProps: "all" });
        });
      });
      gsap.set(centerNode, { clearProps: "all" });
      morphContainer.style.minHeight = "";
      svgCanvas.removeAttribute("style");
      const lines = svgCanvas.querySelectorAll("line");
      lines.forEach((line) => {
        line.removeAttribute("x1");
        line.removeAttribute("y1");
        line.removeAttribute("x2");
        line.removeAttribute("y2");
        line.removeAttribute("stroke");
        line.removeAttribute("stroke-opacity");
        line.removeAttribute("stroke-width");
        line.removeAttribute("stroke-dasharray");
      });
    };

    const init = () => {
      clearAll();

      requestAnimationFrame(() => {
        const gridRect = grid.getBoundingClientRect();
        const gridW = gridRect.width;
        const gridH = gridRect.height;
        const gridCx = gridW / 2;
        const gridCy = gridH / 2;

        cardData = cards.map(card => {
          const r = card.getBoundingClientRect();
          return {
            el: card,
            left: r.left - gridRect.left,
            top: r.top - gridRect.top,
            width: r.width,
            height: r.height,
            centerX: r.left - gridRect.left + r.width / 2,
            centerY: r.top - gridRect.top + r.height / 2
          };
        });

        morphContainer.style.minHeight = gridH + "px";
        grid.style.position = "relative";
        grid.style.width = gridW + "px";
        grid.style.height = gridH + "px";
        grid.style.display = "block";

        cards.forEach((card, i) => {
          const cd = cardData[i];
          card.style.position = "absolute";
          card.style.left = cd.left + "px";
          card.style.top = cd.top + "px";
          card.style.width = cd.width + "px";
          card.style.margin = "0";
        });

        const angles = cards.map((_, i) => (i / cards.length) * Math.PI * 2 - Math.PI / 2);

        const currentScroll = window.scrollY || window.pageYOffset;
        const triggerStart = section.getBoundingClientRect().top + currentScroll - 180;
        const isPastStart = currentScroll > triggerStart;

        if (!isPastStart) {
          cards.forEach((card, i) => {
            const angle = angles[i];
            const clusterX = gridCx + Math.cos(angle) * CLUSTER_RADIUS - NODE_SIZE / 2;
            const clusterY = gridCy + Math.sin(angle) * CLUSTER_RADIUS - NODE_SIZE / 2;

            card.classList.add("edega-in-cluster");
            gsap.set(card, {
              left: clusterX,
              top: clusterY,
              width: NODE_SIZE,
              height: NODE_SIZE,
              padding: 0,
              borderRadius: 45,
              overflow: "hidden"
            });

            const title = card.querySelector(".edega-service-title");
            const desc = card.querySelector(".edega-service-desc");
            const tags = card.querySelector(".edega-service-tags");
            const iconBox = card.querySelector(".edega-service-icon-box");
            const svgIcon = card.querySelector(".edega-service-icon");
            const cardImg = card.querySelector(".edega-service-card-image");

            if (title) gsap.set(title, { display: "none", clipPath: "inset(0 100% 0 0)", opacity: 0 });
            if (desc) gsap.set(desc, { display: "none", clipPath: "inset(0 100% 0 0)", opacity: 0 });
            if (tags) gsap.set(tags, { display: "none", clipPath: "inset(0 100% 0 0)", opacity: 0 });
            if (cardImg) gsap.set(cardImg, { display: "none", opacity: 0 });
            if (iconBox) {
              gsap.set(iconBox, {
                margin: 0,
                top: 0,
                left: 0,
                width: NODE_SIZE,
                height: NODE_SIZE,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              });
            }
            if (svgIcon) {
              gsap.set(svgIcon, {
                width: 40,
                height: 40
              });
            }
          });

          gsap.set(centerNode, { display: "", opacity: 1, scale: 1 });
        } else {
          gsap.set(centerNode, { display: "none", opacity: 0, scale: 0.4 });
          cards.forEach(card => card.classList.remove("edega-in-cluster"));
        }

        svgCanvas.setAttribute("viewBox", `0 0 ${gridW} ${gridH}`);
        svgCanvas.style.width = gridW + "px";
        svgCanvas.style.height = gridH + "px";

        const lines = svgCanvas.querySelectorAll("line");
        svgLines = Array.from(lines).map((line) => {
          line.setAttribute("x1", gridCx);
          line.setAttribute("y1", gridCy);
          line.setAttribute("x2", gridCx);
          line.setAttribute("y2", gridCy);
          line.setAttribute("stroke", "#1e6fd9");
          line.setAttribute("stroke-opacity", isPastStart ? "0" : "0.3");
          line.setAttribute("stroke-width", "1.5");
          line.setAttribute("stroke-dasharray", "6 4");
          return line;
        });

        morphTL = gsap.timeline({ paused: true });

        morphTL.to([grid, svgCanvas], {
          rotation: 0,
          duration: 0.5,
          ease: "power2.inOut"
        }, 0);
        morphTL.to(cards, {
          rotation: 0,
          duration: 0.5,
          ease: "power2.inOut"
        }, 0);

        cards.forEach((card, i) => {
          const cd = cardData[i];
          const angle = angles[i];
          const clusterX = gridCx + Math.cos(angle) * CLUSTER_RADIUS - NODE_SIZE / 2;
          const clusterY = gridCy + Math.sin(angle) * CLUSTER_RADIUS - NODE_SIZE / 2;
          const stagger = i * 0.03;

          morphTL.fromTo(svgLines[i], {
            attr: { x2: gridCx, y2: gridCy, "stroke-opacity": isPastStart ? "0" : "0.3" }
          }, {
            attr: { x2: cd.centerX, y2: cd.centerY },
            duration: 0.4,
            ease: "power2.inOut"
          }, 0.05 + stagger);

          morphTL.fromTo(card, {
            left: clusterX,
            top: clusterY,
            width: NODE_SIZE,
            height: NODE_SIZE,
            padding: 0,
            borderRadius: 45,
            overflow: "hidden"
          }, {
            left: cd.left,
            top: cd.top,
            width: cd.width,
            height: cd.height,
            padding: 24,
            borderRadius: 24,
            overflow: "hidden",
            duration: 0.5,
            ease: "power2.inOut"
          }, 0.1 + stagger);

          const iconBox = card.querySelector(".edega-service-icon-box");
          const svgIcon = card.querySelector(".edega-service-icon");
          if (iconBox) {
            morphTL.fromTo(iconBox, {
              margin: 0,
              top: 0,
              left: 0,
              width: NODE_SIZE,
              height: NODE_SIZE,
              borderRadius: "50%"
            }, {
              left: 16,
              top: 16,
              width: 44,
              height: 44,
              borderRadius: 12,
              duration: 0.3,
              ease: "power2.out"
            }, 0.35 + stagger);
          }
          if (svgIcon) {
            morphTL.fromTo(svgIcon, {
              width: 40,
              height: 40
            }, {
              width: 20,
              height: 20,
              duration: 0.3,
              ease: "power2.out"
            }, 0.35 + stagger);
          }

          const cardImg = card.querySelector(".edega-service-card-image");
          if (cardImg) {
            morphTL.fromTo(cardImg, {
              display: "none",
              opacity: 0
            }, {
              display: "",
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            }, 0.2 + stagger);
          }

          const title = card.querySelector(".edega-service-title");
          if (title) {
            morphTL.fromTo(title, {
              display: "none",
              clipPath: "inset(0 100% 0 0)",
              opacity: 0
            }, {
              display: "",
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.2,
              ease: "power2.out"
            }, 0.42 + stagger);
          }

          const desc = card.querySelector(".edega-service-desc");
          if (desc) {
            morphTL.fromTo(desc, {
              display: "none",
              clipPath: "inset(0 100% 0 0)",
              opacity: 0
            }, {
              display: "",
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.2,
              ease: "power2.out"
            }, 0.52 + stagger);
          }

          const tags = card.querySelector(".edega-service-tags");
          if (tags) {
            morphTL.fromTo(tags, {
              display: "none",
              clipPath: "inset(0 100% 0 0)",
              opacity: 0
            }, {
              display: "",
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.18,
              ease: "power2.out"
            }, 0.6 + stagger);
          }
        });

        morphTL.fromTo(centerNode, {
          opacity: 1,
          scale: 1,
          display: ""
        }, {
          opacity: 0,
          scale: 0.4,
          display: "none",
          duration: 0.2,
          ease: "power2.in"
        }, 0.75);

        svgLines.forEach((line, i) => {
          morphTL.fromTo(line, {
            attr: { "stroke-opacity": isPastStart ? "0" : "0.3" }
          }, {
            attr: { "stroke-opacity": "0" },
            duration: 0.12
          }, 0.82 + i * 0.015);
        });

        morphST = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * 0.8}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          animation: morphTL,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const isAtStart = self.progress === 0 || self.scroll() <= self.start;
            if (isAtStart) {
              cards.forEach(card => card.classList.add("edega-in-cluster"));
              if (orbitGrid) orbitGrid.play();
              if (orbitSVG) orbitSVG.play();
              if (orbitCards) orbitCards.play();
            } else {
              cards.forEach(card => card.classList.remove("edega-in-cluster"));
              if (orbitGrid) orbitGrid.pause();
              if (orbitSVG) orbitSVG.pause();
              if (orbitCards) orbitCards.pause();
            }
          }
        });

        ScrollTrigger.refresh();
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);

        gsap.set([grid, svgCanvas], { transformOrigin: "50% 50%" });
        cards.forEach(card => gsap.set(card, { transformOrigin: "50% 50%" }));

        orbitGrid = gsap.to(grid, {
          rotation: 360,
          repeat: -1,
          duration: 35,
          ease: "none"
        });
        orbitSVG = gsap.to(svgCanvas, {
          rotation: 360,
          repeat: -1,
          duration: 35,
          ease: "none"
        });
        orbitCards = gsap.to(cards, {
          rotation: -360,
          repeat: -1,
          duration: 35,
          ease: "none"
        });
      });
    };

    const rafId = requestAnimationFrame(init);

    let resizeTimer;
    const onResize = () => {
      if (morphST) morphST.kill();
      if (morphTL) morphTL.kill();
      svgLines = [];
      clearAll();
      if (window.innerWidth <= 1024) {
        resetCardsForMobile();
        gsap.set(centerNode, { display: "none" });
        gsap.set(svgCanvas, { display: "none" });
        return;
      }
      requestAnimationFrame(init);
    };
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(onResize, 250);
    };
    window.addEventListener("resize", debouncedResize);

    // Remove resize work and destroy the morph timelines before unmounting.

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
      headerST.kill();
      if (morphST) morphST.kill();
      if (morphTL) morphTL.kill();
      clearAll();
    };
  }, []);

  // Pin the delivery journey, synchronize each step with scroll progress,
  // and type the matching diagnostic line into the terminal panel.

  React.useEffect(() => {
    const section = document.getElementById("edega-journey-section");
    const headerEl = document.getElementById("edega-journey-header");
    const timelineLine = document.getElementById("edega-timeline-line");
    const pipelineDot = document.getElementById("edega-pipeline-dot");
    const terminalBody = document.getElementById("edega-terminal-body");
    const terminalWrap = document.getElementById("edega-terminal-wrap");
    const steps = gsap.utils.toArray("#edega-journey-section .edega-timeline-step");

    if (!section || !steps.length || !terminalBody) return;

    const cursor = document.getElementById("edega-terminal-cursor");

    const stepLogs = [
      { cls: "info", text: "[DATA] Receiving camera feed 30fps..." },
      { cls: "warning", text: "[PROCESS] Neural model input: tensor(1, 3, 224, 224)" },
      { cls: "highlight", text: "[INFERENCE] Prediction: Object [Vehicle] — Conf: 99.8%" },
      { cls: "highlight", text: "[ACTION] Command dispatched to local PLC actuator." },
      { cls: "success", text: "[SYNC] Synchronizing anomaly data payload with cloud registry." },
      { cls: "success", text: "[LEARN] Edge anomalies queued for cloud model refinement." },
    ];

    const activeIntervals = [];

    function addTerminalLine(idx) {
      if (!cursor || !terminalBody || !stepLogs[idx]) return;
      let existing = terminalBody.querySelector(`[data-terminal-step="${idx}"]`);
      if (existing) return;

      const line = document.createElement("div");
      line.className = `edega-terminal-line ${stepLogs[idx].cls}`;
      line.setAttribute("data-terminal-step", idx);
      terminalBody.insertBefore(line, cursor);

      const text = stepLogs[idx].text;
      let i = 0;
      const speed = Math.max(12, Math.floor(600 / text.length));
      const iv = setInterval(() => {
        line.textContent += text[i++];
        if (i >= text.length) clearInterval(iv);
      }, speed);
      activeIntervals.push(iv);
    }

    function removeTerminalLine(idx) {
      if (!terminalBody) return;
      const existing = terminalBody.querySelector(`[data-terminal-step="${idx}"]`);
      if (existing) {
        existing.remove();
      }
    }

    function getDotY(idx) {
      const wrapper = document.getElementById("edega-timeline-wrapper");
      const node = steps[idx]?.querySelector(".edega-step-number-node");
      if (!wrapper || !node) return 0;
      const wr = wrapper.getBoundingClientRect();
      const nr = node.getBoundingClientRect();
      return nr.top - wr.top + nr.height / 2 - 7;
    }

    const headerChildren = headerEl ? Array.from(headerEl.children) : [];
    gsap.set(headerChildren, { opacity: 0, y: 20 });
    gsap.set(timelineLine, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(steps, { opacity: 0, y: 24 });
    gsap.set(pipelineDot, { opacity: 0, y: getDotY(0) });
    if (terminalWrap) {
      gsap.set(terminalWrap, { opacity: 0, y: 35, scale: 0.96 });
    }

    const headerST = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(headerChildren, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out"
        });
        gsap.to(timelineLine, {
          scaleY: 1, duration: 0.8, ease: "power2.out"
        });
        gsap.to(pipelineDot, {
          opacity: 1, duration: 0.4, ease: "power2.out"
        });
        if (terminalWrap) {
          gsap.to(terminalWrap, {
            opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out"
          });
        }
      }
    });

    const revealedSteps = new Set();

    const scrubTL = gsap.timeline({ paused: true });

    const STEP_GAP = 1.4;
    const STEP_START = 0.1;

    steps.forEach((step, idx) => {
      const t = STEP_START + idx * STEP_GAP;

      // Animate pipeline dot movement to this step node

      scrubTL.to(pipelineDot, {
        y: () => getDotY(idx),
        duration: idx === 0 ? 0.2 : 0.8,
        ease: "power2.inOut",
      }, t);

      // Reveal each timeline step one by one on scroll

      scrubTL.to(step, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, t);
    });

    const totalDuration = STEP_START + steps.length * STEP_GAP + 0.4;

    const scrubST = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 2.2}`,
      pin: true,
      pinSpacing: true,
      scrub: 1.0,
      animation: scrubTL,
      onUpdate: (self) => {
        const progress = self.progress;
        let activeIdx = -1;

        steps.forEach((step, idx) => {
          const stepProgress = Math.max(0, (STEP_START + idx * STEP_GAP - 0.05) / totalDuration);
          if (progress >= stepProgress) {
            activeIdx = idx;
            if (!revealedSteps.has(idx)) {
              revealedSteps.add(idx);
              addTerminalLine(idx);
            }
          } else {
            if (revealedSteps.has(idx)) {
              revealedSteps.delete(idx);
              removeTerminalLine(idx);
            }
          }
        });

        steps.forEach((step, idx) => {
          if (idx === activeIdx) {
            step.classList.add("edega-step-active");
          } else {
            step.classList.remove("edega-step-active");
          }
        });
      }
    });

    let floatTween = null;
    if (terminalWrap) {
      floatTween = gsap.to(terminalWrap, {
        y: -3, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1
      });
    }

    // Clear typing intervals and GSAP resources so no background work survives navigation.

    return () => {
      activeIntervals.forEach(clearInterval);
      headerST.kill();
      scrubST.kill();
      scrubTL.kill();
      if (floatTween) floatTween.kill();
      if (terminalWrap) gsap.killTweensOf(terminalWrap);
      gsap.killTweensOf(pipelineDot);
      steps.forEach(s => {
        s.classList.remove("edega-step-active");
        gsap.killTweensOf(s);
      });
    };
  }, []);

  // Apply restrained pointer tilt to the engagement visual on pointer devices.

  React.useEffect(() => {
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

    // Detach pointer listeners when the visual leaves the document.

    return () => {
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Observe generic reveal elements once and stop observing each item after activation.

  React.useEffect(() => {
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

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    // Disconnect the observer to release its references to page elements.

    return () => observer.disconnect();
  }, []);

  // Ease decorative blobs toward the pointer while pausing the animation
  // whenever the page is not visible.

  React.useEffect(() => {
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

    // Stop pointer tracking and animation frames when the page unmounts.

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
    <div className="eaipg-edgeai-page edega-page-wrapper embpg-embedded-page" ref={rootRef}>
      <div className="bg-layer" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="noise" />
      </div>

      {/* ============ HERO SECTION ============ */}

      <section className="edega-hero-section" id="top">
        <div className="edega-hero-container">
          <div className="edega-hero-grid">
            <div className="edega-hero-left">
              <div className="edega-hero-badge">
                <span className="edega-badge-bullet"></span> SEMICONDUCTOR & EDGE AI
              </div>
              <h1 className="edega-hero-title">
                <span className="edega-title-line">
                  <span className="edega-line-inner">Real-Time</span>
                </span>
                <br />
                <span className="edega-title-line">
                  <span className="edega-line-inner">Intelligence at the</span>
                </span>
                <br />
                <span className="edega-title-line">
                  <span className="edega-line-inner edega-hero-title-highlight">Intelligent Edge.</span>
                </span>
              </h1>
              <p className="edega-hero-desc">
                From high-performance hardware acceleration to optimized model deployment —
                delivering customized edge computing solutions, low-latency inferencing,
                and energy-efficient intelligence.
              </p>
              <div className="edega-hero-actions">
                <a href="#capabilities" className="edega-btn-primary">
                  Explore Services <span className="edega-btn-arrow">→</span>
                </a>
                <a href="#contact" className="edega-btn-secondary">
                  Talk to an engineer <span className="edega-btn-arrow">→</span>
                </a>
              </div>
              <div className="edega-hero-stats">
                <div className="edega-stat-item">
                  <div className="edega-stat-number">10x</div>
                  <div className="edega-stat-label">FASTER MODEL INFERENCE</div>
                </div>
                <div className="edega-stat-item">
                  <div className="edega-stat-number">95%</div>
                  <div className="edega-stat-label">POWER EFFICIENCY SAVINGS</div>
                </div>
              </div>
            </div>
            <div className="edega-hero-right">
              <figure className="edega-image-container edega-hero-figure tilt" ref={tiltRef}>
                <img src={edaHeroImg} alt="Edge Deployment" className="edega-hero-image" loading="eager" fetchPriority="high" decoding="async" />
                <figcaption className="edega-image-overlay">
                  <span className="edega-image-fig">Fig. 001</span>
                  <span className="edega-image-title">Edge Deployment — Low-Power Inference</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        <div className="edega-ticker-section">
          <div className="edega-ticker-container">
            <div className="edega-ticker-track">
              {[1, 2].map((i) => (
                <div className="edega-ticker-group" key={i}>
                  <span className="edega-ticker-item">TENSORFLOW / PYTORCH</span>
                  <span className="edega-ticker-separator">•</span>
                  <span className="edega-ticker-item">TENSORRT ACCELERATION</span>
                  <span className="edega-ticker-separator">•</span>
                  <span className="edega-ticker-item">ONNX RUNTIME</span>
                  <span className="edega-ticker-separator">•</span>
                  <span className="edega-ticker-item">EDGE TPU</span>
                  <span className="edega-ticker-separator">•</span>
                  <span className="edega-ticker-item">NVIDIA JETSON PLATFORMS</span>
                  <span className="edega-ticker-separator">•</span>
                  <span className="edega-ticker-item">ARM CORTEX-M OPTIMIZATION</span>
                  <span className="edega-ticker-separator">•</span>
                  <span className="edega-ticker-item">INTEL OPENVINO</span>
                  <span className="edega-ticker-separator">•</span>
                  <span className="edega-ticker-item">MODEL QUANTIZATION</span>
                  <span className="edega-ticker-separator">•</span>
                  <span className="edega-ticker-item">LOW-LATENCY INFERENCE</span>
                  <span className="edega-ticker-separator">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ============ END HERO SECTION ============ */}

      {/* ============ ECOSYSTEM SECTION ============ */}

      <section className="edega-ecosystem-section">
        <div className="edega-section-container">
          <div className="edega-section-header">
            <span className="edega-section-tag">OUR EDGE AI ECOSYSTEM</span>
            <h2 className="edega-section-title">A Complete <span className="edega-title-highlight">Edge AI Ecosystem</span></h2>
            <p className="edega-section-subtitle">
              End-to-end solutions designed for intelligent, low-latency, and scalable edge deployments.
            </p>
            <div className="edega-section-glow-line"></div>
          </div>
          <div className="edega-ecosystem-grid">
            <div className="edega-ecosystem-card-wrapper">
              <div className="edega-ecosystem-card-anim-target">
                <div className="edega-ecosystem-card">
                  <div className="edega-card-icon-wrapper">
                    <svg className="edega-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="edega-card-title">Smart Vision Systems</h3>
                  <p className="edega-card-desc">Advanced vision intelligence for real-time object tracking, classification, and spatial monitoring.</p>
                  <div className="edega-card-visual-placeholder">
                    <div className="edega-schematic-grid"></div>
                    <div className="edega-camera-scope">
                      <div className="edega-scope-line horizontal"></div>
                      <div className="edega-scope-line vertical"></div>
                      <div className="edega-scope-indicator"></div>
                    </div>
                    <span className="edega-visual-label">[ CAMERA FEED ANALYTICS MOCKUP ]</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="edega-ecosystem-card-wrapper">
              <div className="edega-ecosystem-card-anim-target">
                <div className="edega-ecosystem-card">
                  <div className="edega-card-icon-wrapper">
                    <svg className="edega-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                      <rect x="9" y="9" width="6" height="6" />
                      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                    </svg>
                  </div>
                  <h3 className="edega-card-title">Intelligent Edge Devices</h3>
                  <p className="edega-card-desc">AI-powered hardware and computing units tailored for extreme performance and reliability at scale.</p>
                  <div className="edega-card-visual-placeholder">
                    <div className="edega-schematic-grid"></div>
                    <div className="edega-hardware-chassis">
                      <div className="edega-chassis-leds">
                        <span className="edega-led blue blinking"></span>
                        <span className="edega-led green"></span>
                        <span className="edega-led cyan"></span>
                      </div>
                      <div className="edega-chassis-chip"></div>
                    </div>
                    <span className="edega-visual-label">[ EDGE COMPUTING NODE MOCKUP ]</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="edega-ecosystem-card-wrapper">
              <div className="edega-ecosystem-card-anim-target">
                <div className="edega-ecosystem-card">
                  <div className="edega-card-icon-wrapper">
                    <svg className="edega-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18" />
                      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                    </svg>
                  </div>
                  <h3 className="edega-card-title">AI Applications & Analytics</h3>
                  <p className="edega-card-desc">Domain-specific models and streaming analytical pipelines that convert raw edge sensor data into insights.</p>
                  <div className="edega-card-visual-placeholder">
                    <div className="edega-schematic-grid"></div>
                    <div className="edega-dashboard-bars">
                      <div className="edega-bar" style={{ '--height': '40%' }}></div>
                      <div className="edega-bar" style={{ '--height': '75%' }}></div>
                      <div className="edega-bar" style={{ '--height': '55%' }}></div>
                      <div className="edega-bar" style={{ '--height': '90%' }}></div>
                    </div>
                    <span className="edega-visual-label">[ INSIGHTS DASHBOARD MOCKUP ]</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="edega-ecosystem-card-wrapper">
              <div className="edega-ecosystem-card-anim-target">
                <div className="edega-ecosystem-card">
                  <div className="edega-card-icon-wrapper">
                    <svg className="edega-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                  </div>
                  <h3 className="edega-card-title">Deployment & Optimization</h3>
                  <p className="edega-card-desc">Efficient, secure model compilation, quantization, and OTA provisioning built for resource constraints.</p>
                  <div className="edega-card-visual-placeholder">
                    <div className="edega-schematic-grid"></div>
                    <div className="edega-deployment-network">
                      <div className="edega-net-node center"></div>
                      <div className="edega-net-node child-1"></div>
                      <div className="edega-net-node child-2"></div>
                    </div>
                    <span className="edega-visual-label">[ OTA MODEL PIPELINE MOCKUP ]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============ END ECOSYSTEM SECTION ============ */}

      {/* ============ JOURNEY SECTION ============ */}

      <section className="edega-journey-section" id="edega-journey-section">
        <div className="edega-section-container">
          <div className="edega-section-header" id="edega-journey-header">
            <span className="edega-section-tag">DATA PIPELINE</span>
            <h2 className="edega-section-title">From Edge to <span className="edega-title-highlight">Intelligence</span></h2>
            <p className="edega-section-subtitle">
              A seamless logical sequence that unlocks raw hardware capability and transforms data into real-time business action.
            </p>
          </div>
          <div className="edega-journey-grid">
            <div className="edega-journey-left">
              <div className="edega-timeline-wrapper" id="edega-timeline-wrapper">
                <div className="edega-timeline-line" id="edega-timeline-line"></div>
                <div className="edega-pipeline-dot" id="edega-pipeline-dot"></div>
                {[
                  {
                    num: "01",
                    title: "Data Capture",
                    desc: "Capture high-bandwidth data streams from cameras, IoT sensors, and local connected peripherals with minimal latency."
                  },
                  {
                    num: "02",
                    title: "AI Processing",
                    desc: "Analyze spatial patterns, frequencies, and streams locally using specialized neural network layers."
                  },
                  {
                    num: "03",
                    title: "Edge Inference",
                    desc: "Run inference execution inside low-power embedded modules (TPUs, microcontrollers) for instantaneous outputs."
                  },
                  {
                    num: "04",
                    title: "Decision Making",
                    desc: "Evaluate predictions against local operational guidelines to filter insights and make immediate decisions."
                  },
                  {
                    num: "05",
                    title: "Automation",
                    desc: "Trigger high-speed machinery actuators, alerts, or localized control systems directly without cloud delay."
                  },
                  {
                    num: "06",
                    title: "Continuous Learning",
                    desc: "Anonymize, compress, and report edge anomalies back to cloud servers to refine global model accuracy."
                  }
                ].map((step, idx) => (
                  <div className="edega-timeline-step" key={idx} data-step={idx}>
                    <div className="edega-step-number-node">
                      <span>{step.num}</span>
                    </div>
                    <div className="edega-step-content">
                      <h4 className="edega-step-title">{step.title}</h4>
                      <p className="edega-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="edega-journey-right">
              <div className="edega-terminal-glow-wrap" id="edega-terminal-wrap">
                <div className="edega-terminal-visual">
                  <div className="edega-terminal-header">
                    <span className="edega-terminal-dot red"></span>
                    <span className="edega-terminal-dot yellow"></span>
                    <span className="edega-terminal-dot green"></span>
                    <span className="edega-terminal-title">edge-inference-pipeline.sh</span>
                  </div>
                  <div className="edega-terminal-body" id="edega-terminal-body">
                    <div className="edega-terminal-line command">$ run-edge-pipeline --device /dev/tpu0</div>
                    <div className="edega-terminal-line success">[OK] Platform: TPU Accelerator Initialized.</div>
                    <span className="edega-terminal-cursor" id="edega-terminal-cursor"></span>
                  </div>
                  <div className="edega-signal-visualizer">
                    <div className="edega-signal-bar"></div>
                    <div className="edega-signal-bar"></div>
                    <div className="edega-signal-bar"></div>
                    <div className="edega-signal-bar"></div>
                    <div className="edega-signal-bar"></div>
                    <div className="edega-signal-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============ END JOURNEY SECTION ============ */}

      {/* ============ SERVICES SECTION ============ */}

      <section className="edega-services-section">
        <div className="edega-section-container">
          <div className="edega-section-header">
            <span className="edega-section-tag">ENGINEERING SERVICES</span>
            <h2 className="edega-section-title">End-to-End <span className="edega-title-highlight">Edge AI Engineering</span></h2>
            <p className="edega-section-subtitle">
              We deliver specialized engineering capabilities across the entire Edge AI lifecycle to drive real-world impact.
            </p>
          </div>
          <div className="edega-morph-container">
            <div className="edega-morph-center-node">
              <span className="edega-morph-center-label">EDGE AI</span>
            </div>
            <svg className="edega-morph-svg" preserveAspectRatio="none">
              {[...Array(6)].map((_, i) => (
                <line key={i} />
              ))}
            </svg>
            <div className="edega-services-grid">
              {[
                {
                  image: edas1,
                  icon: (
                    <svg className="edega-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  ),
                  title: "01. Consulting & Architecture",
                  desc: "We provide expert end-to-end consulting services to evaluate complex hardware targets, co-design custom high-performance system architectures, and plan detailed thermal and power requirements to ensure optimal edge deployment.",
                  tags: ["Platform Evaluation", "HW/SW Co-Design", "Power Analysis"]
                },
                {
                  image: edas2,
                  icon: (
                    <svg className="edega-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 7V4h16v3M9 20h6M12 12v8" />
                      <rect x="2" y="7" width="20" height="10" rx="2" />
                    </svg>
                  ),
                  title: "02. Model Development & Optimization",
                  desc: "Compress, quantize, and prune heavy neural network architectures for resource-constrained edge microcontrollers and SoCs. We maximize inference throughput and accuracy within strict memory and power budgets.",
                  tags: ["Model Pruning", "8-bit Quantization", "Knowledge Distillation"]
                },
                {
                  image: edas3,
                  icon: (
                    <svg className="edega-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                    </svg>
                  ),
                  title: "03. Applications & Intelligent Analytics",
                  desc: "Deploy sophisticated real-time vision, audio, and multi-sensor processing systems. Our intelligent analytics pipelines run entirely on the edge, enabling instant object tracking, video analytics, and critical anomaly alerts.",
                  tags: ["Computer Vision", "Anomaly Detection", "Stream Analytics"]
                },
                {
                  image: edas4,
                  icon: (
                    <svg className="edega-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="8" rx="2" />
                      <rect x="2" y="14" width="20" height="8" rx="2" />
                      <path d="M6 6h.01M6 18h.01" />
                    </svg>
                  ),
                  title: "04. Platform Enablement & Toolchains",
                  desc: "Seamlessly integrate vendor-specific runtime acceleration engines and compile model compiler graphs. We optimize workflows using TensorRT, OpenVINO, ONNX, and custom hardware compiler toolchains.",
                  tags: ["TensorRT", "OpenVINO", "ONNX Runtime", "CUDA"]
                },
                {
                  image: edas5,
                  icon: (
                    <svg className="edega-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                  title: "05. Embedded AI Integration",
                  desc: "Port and optimize deep learning workloads onto highly resource-constrained embedded systems, custom silicon SoCs, and bare-metal microcontrollers (TinyML), bridging hardware drivers and AI application layers.",
                  tags: ["NVIDIA Jetson", "ARM Cortex", "Qualcomm AI", "TinyML"]
                },
                {
                  image: edas6,
                  icon: (
                    <svg className="edega-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                  ),
                  title: "06. Validation & Lifecycle Support",
                  desc: "Ensure continuous model reliability and edge performance via automated validation rigs. We build hardware-in-the-loop (HIL) testing suites, latency benchmark monitors, and secure over-the-air (OTA) update fleets.",
                  tags: ["HIL Testing", "Fleet Benchmarking", "OTA Management"]
                }
              ].map((service, idx) => (
                <div className="edega-service-card" key={idx}>
                  <img src={service.image} alt={service.title} className="edega-service-card-image" decoding="async" />
                  <div className="edega-service-icon-box">
                    {service.icon}
                  </div>
                  <h3 className="edega-service-title">{service.title}</h3>
                  <p className="edega-service-desc">{service.desc}</p>
                  <div className="edega-service-tags">
                    {service.tags.map((tag, tIdx) => (
                      <span className="edega-service-tag-item" key={tIdx}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ============ END SERVICES SECTION ============ */}

      {/* ============ CTA SECTION ============ */}

      <section className="embpg-cta" id="cta">
        <div className="container reveal">
          <h2 className="display-2">
            Have an Edge AI project that needs
            <br />
            <em>real</em> engineering?
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
            or write directly to <a href="mailto:hr@vconnectech.in">hr@vconnectech.in</a>
          </div>
        </div>
      </section>
      {/* ============ END CTA SECTION ============ */}

      {/* ============ PLAIN CARD SECTION ============ */}

      <section className="embpg-plain-card-section">
        <div className="container container-narrow mb-4">
          <div className="embpg-section-head reveal center">
            <h2 className="display-2">
              Build with <span className="embpg-blue-highlight">Confidence</span>
            </h2>
          </div>
        </div>
        <div className="container container-narrow">
          <div className="embpg-plain-horizontal-card reveal">
            <div className="embpg-brochure-card-content">
              <h3 className="embpg-brochure-card-heading">
                <span style={{ whiteSpace: "nowrap" }}>Download our <span className="embpg-blue-highlight">Edge AI Engineering</span></span> Capability Brochure
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
              <img src={edasB} alt="Edge AI Engineering Capability Brochure visual" decoding="async" />
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
            <p className="embpg-faq-note">A quick view of common questions about our Edge AI Engineering engagements.</p>
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

      <canvas ref={canvasRef} id="edega-bg-canvas" aria-hidden="true" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}></canvas>
    </div>
  );
}
