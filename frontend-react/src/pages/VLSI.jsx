import React, { useEffect, useState, useRef } from 'react';
import '../assets/css/VLSI.css';

import vl from '../assets/image/VLSI/vl.js';

const ICONS_MAP = {
    '21': vl.Icon21,
    '22': vl.Icon22,
    '23': vl.Icon23,
    '24': vl.Icon24,
    '25': vl.Icon25,
    '26': vl.Icon26,
    '27': vl.Icon27,
    '28': vl.Icon28
};

// ==========================================
// CONSTANTS & STATIC DATA MAPS
// ==========================================
const EXPERTISE_DATA = [
    { id: '21', title: 'ASIC', delay: '0.05s' },
    { id: '22', title: 'SoC', delay: '0.12s' },
    { id: '23', title: 'FPGA', delay: '0.19s' },
    { id: '24', title: 'IP Integration', delay: '0.26s' },
    { id: '25', title: 'DFT', delay: '0.33s' },
    { id: '26', title: 'Physical Design', delay: '0.40s' },
    { id: '27', title: 'Advanced Nodes', delay: '0.47s' },
    { id: '28', title: 'Low Power Design', delay: '0.54s' }
];

const FLOW_STEPS = [
    { icon: 'bi-building', label: <>Architecture<br />Design</>, targetId: 'service-a' },
    { icon: 'bi-code-slash', label: <>RTL<br />Design</>, targetId: 'service-b' },
    { icon: 'bi-file-earmark-text', label: <>Functional<br />Verification</>, targetId: 'service-c' },
    { icon: 'bi-cpu', label: <>FPGA<br />Prototyping</>, targetId: 'service-d' },
    { icon: 'bi-gear-wide-connected', label: <>Synthesis<br />Optimization</>, targetId: 'service-e' },
    { icon: 'bi-shield-check', label: <>DFT<br />Implementation</>, targetId: 'service-f' },
    { icon: 'bi-grid-3x3-gap', label: <>Physical<br />Design</>, targetId: 'service-g' },
    { icon: 'bi-activity', label: <>Timing, Power<br />& Signoff</>, targetId: 'service-h' },
    { icon: 'bi-buildings', label: <>Fabrication<br />Support</>, targetId: 'service-i' },
    { icon: 'bi-box-seam', label: <>Packaging<br />& Assembly</>, targetId: 'service-j' },
    { icon: 'bi-usb-plug', label: <>Silicon Bring-Up<br />& Char.</>, targetId: 'service-k' },
    { icon: 'bi-clipboard2-check', label: <>Post-Silicon<br />Validation</>, targetId: 'service-l' }
];

const SERVICES_DATA = [
    {
        letter: 'A',
        title: 'Architecture Design & System Modeling',
        desc: 'Designing scalable semiconductor architectures and intelligent system-level platforms.',
        items: [
            'System & SoC Architecture',
            'ARM & RISC-V Platform Design',
            'Third-Party IP Evaluation & Selection',
            'Micro-Architecture Development',
            'Compute & Memory Architecture',
            'SystemC & TLM Modeling',
            'Virtual Prototyping'
        ],
        image: vl.s1,
        isLeft: false
    },
    {
        letter: 'B',
        title: 'RTL Design & Digital Design',
        desc: 'Developing optimized RTL solutions for high-performance ASIC and FPGA designs.',
        items: [
            'RTL Architecture Development',
            'Verilog, VHDL & SystemVerilog Design',
            'Logic & FSM Design',
            'IP & Subsystem Integratiion',
            'Clock Domain Crossing (CDC) & Reset Domain Crossing (RDC) Analysis',
            'Area & Power Optimization'
        ],
        image: vl.s2,
        isLeft: true
    },
    {
        letter: 'C',
        title: 'Functional Verification',
        desc: 'Ensuring functional correctness and design reliability using advanced verification methodologies.',
        items: [
            'UVM-Based Verification',
            'Testbench Development',
            'Coverage-Driven Verification',
            'Assertion-Based & Formal Verification',
            'Regression Testing',
            'Protocol Verification (PCIe, DDR, USB, etc.)'
        ],
        image: vl.s3,
        isLeft: false
    },
    {
        letter: 'D',
        title: 'FPGA Design, Prototyping & Emulation',
        desc: 'Accelerating development through FPGA implementation and enterprise hardware emulation.',
        items: [
            'FPGA RTL Design',
            'FPGA Prototyping & Enterprise Emulation',
            'High-Speed Interface Integration (PCIe/Ethernet/USB/DDR)',
            'Place & Route',
            'Timing Closure',
            'Hardware Validation'
        ],
        image: vl.s4,
        isLeft: true
    },
    {
        letter: 'E',
        title: 'Synthesis & Netlist Optimization',
        desc: 'Transforming RTL into optimized gate-level implementations for performance and power targets.',
        items: [
            'RTL-to-Gate-Level Synthesis',
            'Timing Constraint Optimization',
            'Area & Power Optimization',
            'Clock Gating',
            'Netlist Generation'
        ],
        image: vl.s5,
        isLeft: false
    },
    {
        letter: 'F',
        title: 'Design for Testability (DFT)',
        desc: 'Enhancing silicon testability and manufacturing readiness through robust DFT methodologies.',
        items: [
            'Scan Insertion & Compression',
            'Memory BIST (MBIST) & Logic BIST (LBIST)',
            'Boundary Scan (JTAG) Architecture',
            'ATPG & Fault Modeling'
        ],
        image: vl.s6,
        isLeft: true
    },
    {
        letter: 'G',
        title: 'Physical Design Implementation',
        desc: 'Executing complete RTL-to-GDSII implementation flows with a focus on timing and physical convergence.',
        items: [
            'Floorplanning & Partitioning',
            'Placement & Routing (P&R)',
            'Clock Tree Synthesis (CTS)',
            'Congestion & Cross-talk Management',
            'Low-Power Design (UPF/CPF Integration)',
            'Timing Closure'
        ],
        image: vl.s7,
        isLeft: false
    },
    {
        letter: 'H',
        title: 'Timing, Power, Signoff & Tapeout Support',
        desc: 'Delivering tape-out-ready designs through comprehensive timing, reliability, and physical signoff analysis.',
        items: [
            'Static Timing Analysis (STA)',
            'Power Integrity & EM/IR-Drop Analysis',
            'Signal Integrity Analysis',
            'Physical Verification (DRC/LVS/ERC)',
            'Design for Manufacturability (DFM) & Metal Fill',
            'Logic Equivalence Checking (LEC)',
            'Tape-Out Readiness & Support'
        ],
        image: vl.s8,
        isLeft: true
    },
    {
        letter: 'I',
        title: 'Fabrication Support',
        desc: 'Supporting seamless transition from tapeout to wafer fabrication through foundry engagement and manufacturing coordination.',
        items: [
            'Foundry Coordination',
            'Process Technology Support (FinFET/GaN)',
            'Tapeout Package Preparation',
            'Manufacturing Documentation',
            'Wafer Fabrication Monitoring',
            'Yield Estimation & Management'
        ],
        image: vl.s9,
        isLeft: false
    },
    {
        letter: 'J',
        title: 'Semiconductor Packaging & Assembly Support',
        desc: 'Enabling reliable device packaging, assembly, and advanced integration for production deployment.',
        items: [
            'Package Selection & Planning',
            'Advanced Packaging Support (2.5D, 3D IC, Chiplets)',
            'Assembly Support',
            'Thermal Considerations',
            'Signal & Power Integrity Review',
            'Package Qualification Support'
        ],
        image: vl.s10,
        isLeft: true
    },
    {
        letter: 'K',
        title: 'Silicon Bring-Up & Characterization',
        desc: 'Enabling first-silicon validation and device characterization for functional and performance verification.',
        items: [
            'Silicon Bring-Up & First-Silicon Validation',
            'Device Characterization',
            'Board Bring-Up Support',
            'Functional Debug & Performance Characterization (Schmoo Plots)',
            'Hardware Debug & Analysis',
            'ATE Test Program Development (Wafers/Package)'
        ],
        image: vl.s11,
        isLeft: false
    },
    {
        letter: 'L',
        title: 'Post-Silicon Validation & Production Readiness',
        desc: 'Validating silicon functionality, software stack, reliability, and production readiness for successful deployment.',
        items: [
            'Functional & System-Level Validation',
            'Firmware, Driver & SDK Development',
            'Protocol Compliance & Interoperability Testing',
            'Reliability Testing Support (HTOL/ESD)',
            'Performance Validation',
            'Failure Analysis Support',
            'Production Readiness & Yield Optimization'
        ],
        image: vl.s12,
        isLeft: true
    }
];

export default function VLSI() {
    const MAX_TILT = 1;

    useEffect(() => {
        const root = document.querySelector(".vlsi-page");
        if (!root) return undefined;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const cleanups = [];

        if (reducedMotion) {
            root.querySelectorAll(".vlsi-scroll-reveal-item").forEach((el) => el.classList.add("vlsi-active"));
            root.querySelectorAll(".vlsi-enterprise-row-section").forEach((el) => el.classList.add("vlsi-text-revealed"));
            root.querySelectorAll(".vlsi-hero-reveal").forEach((el) => el.classList.add("vlsi-active-reveal"));
            return undefined;
        }

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("vlsi-active", entry.isIntersecting);
                });
            },
            { threshold: 0, rootMargin: "0px 0px -60px 0px" },
        );

        const textObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("vlsi-text-revealed", entry.isIntersecting);
                });
            },
            { threshold: 0, rootMargin: "0px 0px -80px 0px" },
        );

        root.querySelectorAll(".vlsi-scroll-reveal-item").forEach((item) => revealObserver.observe(item));
        root.querySelectorAll(".vlsi-enterprise-row-section").forEach((card) => textObserver.observe(card));

        const heroTimer = window.setTimeout(() => {
            root.querySelectorAll(".vlsi-hero-reveal").forEach((el) => el.classList.add("vlsi-active-reveal"));
        }, 80);

        const progressBar = root.querySelector(".vlsi-scroll-progress-bar");
        const updateProgress = () => {
            if (!progressBar) return;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = `${docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0}%`;
        };
        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();

        root.querySelectorAll(".vlsi-magnetic-btn-anchor").forEach((btn) => {
            const handleMove = (event) => {
                const rect = btn.getBoundingClientRect();
                const x = ((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
                const y = ((event.clientY - rect.top - rect.height / 2) / (event.height / 2)) * 5;
                btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            };
            const handleLeave = () => {
                btn.style.transform = "translate3d(0,0,0)";
            };
            btn.addEventListener("mousemove", handleMove, { passive: true });
            btn.addEventListener("mouseleave", handleLeave);
            cleanups.push(() => {
                btn.removeEventListener("mousemove", handleMove);
                btn.removeEventListener("mouseleave", handleLeave);
            });
        });

        root.querySelectorAll(".vlsi-enterprise-row-section, .vlsi-showcase-card.vlsi-anim-lift-card").forEach((card) => {
            const handleMove = (event) => {
                const rect = card.getBoundingClientRect();
                const relX = (event.clientX - rect.left) / rect.width - 0.5;
                const relY = (event.clientY - rect.top) / rect.height - 0.5;
                card.style.transition =
                    "transform 0.1s ease, border-color 0.5s var(--ease-apple), box-shadow 0.5s var(--ease-apple)";
                card.style.transform = `perspective(900px) rotateX(${-relY * MAX_TILT}deg) rotateY(${relX * MAX_TILT}deg) translate3d(0,-1px,0)`;
                card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
                card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
            };
            const handleLeave = () => {
                card.style.transition =
                    "transform 0.55s var(--ease-apple), border-color 0.5s var(--ease-apple), box-shadow 0.5s var(--ease-apple)";
                card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";
            };
            card.addEventListener("mousemove", handleMove, { passive: true });
            card.addEventListener("mouseleave", handleLeave);
            cleanups.push(() => {
                card.removeEventListener("mousemove", handleMove);
                card.removeEventListener("mouseleave", handleLeave);
            });
        });

        return () => {
            window.clearTimeout(heroTimer);
            window.removeEventListener("scroll", updateProgress);
            revealObserver.disconnect();
            textObserver.disconnect();
            cleanups.forEach((cleanup) => cleanup());
        };
    }, []);

    const renderWords = (text) => {
        return text.trim().split(/\s+/).map((w, idx) => (
            <span className="vlsi-word-clip" key={idx}>
                <span className="vlsi-word-inner" style={{ transitionDelay: `${0.05 + idx * 0.07}s` }}>
                    {w}
                </span>
            </span>
        ));
    };

    return (
        <div className="vlsi-page">
            {/* 1. SCROLL PROGRESS BAR */}
            <div className="vlsi-scroll-progress-bar" />

            {/* 2. HERO SECTION */}
            <section className="vlsi-hero-section">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7">
                            <div className="vlsi-kinetic-reveal-container">
                                <div className="vlsi-hero-reveal">
                                    <span className="text-uppercase fw-bold small tracking-wider mb-2 d-block" style={{ color: 'var(--primary-cobalt)', fontSize: '0.8rem' }}>Semiconductor Design & Verification Services</span>
                                </div>
                            </div>
                            <div className="vlsi-kinetic-reveal-container">
                                <div className="vlsi-hero-reveal">
                                    <h1 className="vlsi-hero-title mb-4">Design. Verify.<br />Deliver Silicon Excellence.</h1>
                                </div>
                            </div>
                            <div className="vlsi-kinetic-reveal-container">
                                <div className="vlsi-hero-reveal">
                                    <p className="text-secondary lead fs-5 mb-4" style={{ maxWidth: '600px' }}>
                                        End-to-end semiconductor design and verification services that accelerate innovation and deliver reliable, high-performance silicon solutions from concept to production.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap gap-3 mb-5 vlsi-hero-reveal">
                                <div className="vlsi-magnetic-btn-anchor">
                                    <a href="#" className="btn vlsi-btn-vcts-primary px-4 py-3">Explore Our Services</a>
                                </div>
                                <div className="vlsi-magnetic-btn-anchor">
                                    <a href="#" className="btn vlsi-btn-vcts-outline px-4 py-3">Talk to Our Experts</a>
                                </div>
                            </div>

                            {/* Micro-Features Structural Row */}
                            <div className="row g-4 pt-5 vlsi-hero-reveal">
                                <div className="col-6 col-sm-3 d-flex align-items-center">
                                    <img src={vl.Icon11} alt="Expert Engineering" className="vlsi-hero-badge-icon me-2" />
                                    <span className="small fw-semibold text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>Expert<br />Engineering</span>
                                </div>
                                <div className="col-6 col-sm-3 d-flex align-items-center">
                                    <img src={vl.Icon12} alt="Proven Methodologies" className="vlsi-hero-badge-icon me-2" />
                                    <span className="small fw-semibold text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>Proven<br />Methodologies</span>
                                </div>
                                <div className="col-6 col-sm-3 d-flex align-items-center">
                                    <img src={vl.Icon13} alt="Quality & Reliability" className="vlsi-hero-badge-icon me-2" />
                                    <span className="small fw-semibold text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>Quality &<br />Reliability</span>
                                </div>
                                <div className="col-6 col-sm-3 d-flex align-items-center">
                                    <img src={vl.Icon14} alt="On-time Delivery" className="vlsi-hero-badge-icon me-2" />
                                    <span className="small fw-semibold text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>On-time<br />Delivery</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Hardware Visual Layout */}
                        <div className="col-xl-6 col-lg-5 text-center text-lg-end mt-5 mt-lg-0 vlsi-hero-reveal">
                            <img src={vl.hero1} alt="Semiconductor Design & Verification" className="img-fluid vlsi-hero-main-img" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. EXPERTISE SECTION */}
            <section className="vlsi-expertise-section vlsi-scroll-reveal-item">
                <div className="container-fluid">
                    <div className="text-center mb-5">
                        <span className="text-uppercase fw-bold small tracking-wider d-block mb-2" style={{ color: 'var(--primary-cobalt)', fontSize: '0.8rem' }}>Our Expertise</span>
                        <div style={{ width: '45px', height: '3px', backgroundColor: 'var(--primary-cobalt)', margin: '0 auto' }}></div>
                    </div>

                    <div className="row row-cols-2 row-cols-md-4 g-4 text-center">
                        {EXPERTISE_DATA.map((item) => (
                            <div key={item.id} className="col vlsi-scroll-reveal-item" style={{ transitionDelay: item.delay }}>
                                <div className="vlsi-showcase-card vlsi-anim-lift-card py-4">
                                    <div className="vlsi-blue-icon-box">
                                        <img
                                            src={ICONS_MAP[item.id]}
                                            alt={item.title}
                                            className="vlsi-expertise-card-icon"
                                        />
                                    </div>
                                    <h4 className="h6 fw-bold mb-0">{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FLOW PIPELINE SECTION */}
            <section className="py-5 bg-white">
                <div className="container-fluid vlsi-scroll-reveal-item">
                    <div className="text-center mb-5">
                        <span className="text-uppercase fw-bold small tracking-wider d-block mb-2" style={{ color: 'var(--primary-cobalt)', fontSize: '0.8rem' }}>Our Semiconductor Engineering Flow</span>
                        <div style={{ width: '45px', height: '3px', backgroundColor: 'var(--primary-cobalt)', margin: '0 auto' }}></div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 pt-3 vlsi-flow-pipeline-grid">
                        {FLOW_STEPS.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <div
                                    className="vlsi-flow-node-item text-center flex-fill vlsi-scroll-reveal-item"
                                    style={{ minWidth: '90px', cursor: 'pointer' }}
                                    onClick={() => {
                                        const el = document.getElementById(step.targetId);
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                    }}
                                >
                                    <div className="vlsi-flow-node-circle">
                                        <i className={`bi ${step.icon}`}></i>
                                    </div>
                                    <p className="fw-bold text-secondary text-center" style={{ fontSize: '0.72rem', lineHeight: '1.3' }}>
                                        {step.label}
                                    </p>
                                </div>
                                {idx < FLOW_STEPS.length - 1 && (
                                    <div className="vlsi-flow-arrow-icon d-none d-xl-block">
                                        <i className="bi bi-arrow-right"></i>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. SERVICES MATRIX SECTION */}
            <section className="py-5" style={{ background: 'var(--bg-off-white)' }}>
                <div className="container-fluid" style={{ maxWidth: '1400px' }}>
                    <div className="text-center mb-5">
                        <span className="text-uppercase fw-bold small tracking-wider d-block mb-2" style={{ color: 'var(--primary-cobalt)', fontSize: '0.8rem' }}>Technical Services</span>
                        <h2 className="fw-bold h3" style={{ color: 'var(--deep-navy)' }}>Our Semiconductor Design & Verification Services</h2>
                        <div style={{ width: '55px', height: '3px', backgroundColor: 'var(--primary-cobalt)', margin: '0.75rem auto 0' }}></div>
                    </div>

                    <div className="vlsi-subsystems-matrix-container">
                        {SERVICES_DATA.map((stage) => {
                            const textCol = (
                                <div className="col-lg-6 p-0">
                                    <div className="vlsi-subsys-text-wrap">
                                        <div className="d-flex align-items-center gap-3 mb-2">
                                            <div className="vlsi-alpha-badge">{stage.letter}</div>
                                            <h3 className="h5 fw-bold mb-0">{renderWords(stage.title)}</h3>
                                        </div>
                                        <p className="text-secondary small mb-3 vlsi-subsys-para">
                                            <span className="vlsi-subsys-para-inner" style={{ transitionDelay: '0.45s' }}>
                                                {stage.desc}
                                            </span>
                                        </p>
                                        <ul className="vlsi-tech-list">
                                            {stage.items.map((item, itemIdx) => (
                                                <li key={itemIdx} style={{ transitionDelay: `${0.55 + itemIdx * 0.12}s` }}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );

                            const diagramCol = (
                                <div className="col-lg-6 d-flex p-0">
                                    <div className="vlsi-diagram-box">
                                        <img
                                            src={stage.image}
                                            alt={stage.title}
                                            className="img-fluid vlsi-diagram-box-img"
                                        />
                                    </div>
                                </div>
                            );

                            return (
                                <div
                                    key={stage.letter}
                                    id={`service-${stage.letter.toLowerCase()}`}
                                    className="vlsi-enterprise-row-section vlsi-scroll-reveal-item vlsi"
                                >
                                    <div className="row w-100 g-5 m-0">
                                        {stage.isLeft ? (
                                            <>
                                                {diagramCol}
                                                {textCol}
                                            </>
                                        ) : (
                                            <>
                                                {textCol}
                                                {diagramCol}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6. CTA BANNER SECTION */}
            <section className="py-5 bg-white">
                <div className="container-fluid">
                    <div className="vlsi-cta-blue-card shadow-sm">
                        <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
                            <div className="col-lg-6 offset-lg-3 text-center text-lg-start">
                                <h3 className="fw-bold mb-2 fs-3 text-white">Let's Build the Future of Semiconductor Together</h3>
                                <p className="mb-0 text-white-50">Partner with VCTS for innovative, reliable and silicon-proven solutions.</p>
                            </div>
                            <div className="col-lg-3 text-center text-lg-end mt-4 mt-lg-0">
                                <div className="vlsi-magnetic-btn-anchor">
                                    <a href="#" className="btn vlsi-btn-vcts-cta-white py-3 px-4 fw-bold shadow-sm" style={{ fontSize: '0.9rem', borderRadius: '4px' }}>
                                        Connect With Our Experts <i className="bi bi-arrow-right ms-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}