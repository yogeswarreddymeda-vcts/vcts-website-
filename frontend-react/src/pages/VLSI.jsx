import React, { useEffect, useState, useRef } from 'react';
import '../assets/css/VLSI.css';

import s1 from '../assets/image/VLSI/s1.png';
import s2 from '../assets/image/VLSI/s2.png';
import s3 from '../assets/image/VLSI/s3.png';
import s4 from '../assets/image/VLSI/s4.png';
import s5 from '../assets/image/VLSI/s5.png';
import s6 from '../assets/image/VLSI/s6.png';
import s7 from '../assets/image/VLSI/s7.png';
import s8 from '../assets/image/VLSI/s8.png';
import s9 from '../assets/image/VLSI/s9.png';
import s10 from '../assets/image/VLSI/s10.png';
import s11 from '../assets/image/VLSI/s11.png';
import s12 from '../assets/image/VLSI/s12.png';

import M1 from '../assets/image/VLSI/M1.png';

import Icon11 from '../assets/image/VLSI/icons/Icon11.png';
import Icon12 from '../assets/image/VLSI/icons/Icon12.png';
import Icon13 from '../assets/image/VLSI/icons/Icon13.png';
import Icon14 from '../assets/image/VLSI/icons/Icon14.png';

import Icon21 from '../assets/image/VLSI/icons/Icon21.png';
import Icon22 from '../assets/image/VLSI/icons/Icon22.png';
import Icon23 from '../assets/image/VLSI/icons/Icon23.png';
import Icon24 from '../assets/image/VLSI/icons/Icon24.png';
import Icon25 from '../assets/image/VLSI/icons/Icon25.png';
import Icon26 from '../assets/image/VLSI/icons/Icon26.png';
import Icon27 from '../assets/image/VLSI/icons/Icon27.png';
import Icon28 from '../assets/image/VLSI/icons/Icon28.png';

const ICONS_MAP = {
    '21': Icon21,
    '22': Icon22,
    '23': Icon23,
    '24': Icon24,
    '25': Icon25,
    '26': Icon26,
    '27': Icon27,
    '28': Icon28
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
    { icon: 'bi-building', label: <>Architecture<br />Design</> },
    { icon: 'bi-code-slash', label: <>RTL<br />Design</> },
    { icon: 'bi-file-earmark-text', label: <>Functional<br />Verification</> },
    { icon: 'bi-cpu', label: <>FPGA<br />Prototyping</> },
    { icon: 'bi-gear-wide-connected', label: <>Synthesis<br />Optimization</> },
    { icon: 'bi-shield-check', label: <>DFT<br />Implementation</> },
    { icon: 'bi-grid-3x3-gap', label: <>Physical<br />Design</> },
    { icon: 'bi-activity', label: <>Timing, Power<br />& Signoff</> },
    { icon: 'bi-buildings', label: <>Fabrication<br />Support</> },
    { icon: 'bi-box-seam', label: <>Packaging<br />& Assembly</> },
    { icon: 'bi-usb-plug', label: <>Silicon Bring-Up<br />& Char.</> },
    { icon: 'bi-clipboard2-check', label: <>Post-Silicon<br />Validation</> }
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
        image: s1,
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
            'IP & Subsystem Integration',
            'Clock Domain Crossing (CDC) & Reset Domain Crossing (RDC) Analysis',
            'Area & Power Optimization'
        ],
        image: s2,
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
        image: s3,
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
        image: s4,
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
        image: s5,
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
        image: s6,
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
        image: s7,
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
        image: s8,
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
        image: s9,
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
        image: s10,
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
        image: s11,
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
        image: s12,
        isLeft: true
    }
];

export default function VLSI() {
    const MAX_TILT = 4;

    // Unified States & Refs
    const [scrollWidth, setScrollWidth] = useState(0);
    const heroBtn1Ref = useRef(null);
    const heroBtn2Ref = useRef(null);
    const ctaBtnRef = useRef(null);

    // Centralized Lifecycle System
    useEffect(() => {
        // 1. Scroll Progress Bar Tracking
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollWidth(pct);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // 2. Hero Component Fade-In Trigger
        const revealTimer = setTimeout(() => {
            document.querySelectorAll('.hero-reveal').forEach((el) => {
                el.classList.add('active-reveal');
            });
        }, 80);

        // 3. Centralized Interactive Magnetic Anchors Mapping
        const magneticTargets = [heroBtn1Ref.current, heroBtn2Ref.current, ctaBtnRef.current];

        const magneticCleanups = magneticTargets.map((btn) => {
            if (!btn) return null;

            const handleMouseMove = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
                const y = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 5;
                btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            };

            const handleMouseLeave = () => {
                btn.style.transform = 'translate3d(0,0,0)';
            };

            btn.addEventListener('mousemove', handleMouseMove, { passive: true });
            btn.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                btn.removeEventListener('mousemove', handleMouseMove);
                btn.removeEventListener('mouseleave', handleMouseLeave);
            };
        });

        // Clean up all global hooks upon component unmounting
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(revealTimer);
            magneticCleanups.forEach((cleanup) => cleanup && cleanup());
        };
    }, []);

    // Shared 3D Interactive Card Logic
    const handleCard3DMove = (e, card) => {
        const rect = card.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transition = 'transform 0.1s ease, border-color 0.5s var(--ease-apple), box-shadow 0.5s var(--ease-apple)';
        card.style.transform = `perspective(900px) rotateX(${-relY * MAX_TILT}deg) rotateY(${relX * MAX_TILT}deg) translate3d(0,-3px,0)`;
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const handleCard3DLeave = (card) => {
        card.style.transition = 'transform 0.55s var(--ease-apple), border-color 0.5s var(--ease-apple), box-shadow 0.5s var(--ease-apple)';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)';
    };

    const renderWords = (text) => {
        return text.trim().split(/\s+/).map((w, idx) => (
            <span className="word-clip" key={idx}>
                <span className="word-inner" style={{ transitionDelay: `${0.05 + idx * 0.07}s` }}>
                    {w}
                </span>
            </span>
        ));
    };

    return (
        <>
            {/* 1. SCROLL PROGRESS BAR */}
            <div id="scroll-progress-bar" style={{ width: `${scrollWidth}%` }} />

            {/* 2. HERO SECTION */}
            <section className="hero-section">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7">
                            <div className="kinetic-reveal-container">
                                <div className="hero-reveal">
                                    <span className="text-uppercase fw-bold small tracking-wider mb-2 d-block" style={{ color: 'var(--primary-cobalt)', fontSize: '0.8rem' }}>Semiconductor Design & Verification Services</span>
                                </div>
                            </div>
                            <div className="kinetic-reveal-container">
                                <div className="hero-reveal">
                                    <h1 className="hero-title mb-4">Design. Verify.<br />Deliver Silicon Excellence.</h1>
                                </div>
                            </div>
                            <div className="kinetic-reveal-container">
                                <div className="hero-reveal">
                                    <p className="text-secondary lead fs-5 mb-4" style={{ maxWidth: '600px' }}>
                                        End-to-end semiconductor design and verification services that accelerate innovation and deliver reliable, high-performance silicon solutions from concept to production.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap gap-3 mb-5 hero-reveal">
                                <div className="magnetic-btn-anchor" ref={heroBtn1Ref}>
                                    <a href="#" className="btn btn-vcts-primary px-4 py-3">Explore Our Services</a>
                                </div>
                                <div className="magnetic-btn-anchor" ref={heroBtn2Ref}>
                                    <a href="#" className="btn btn-vcts-outline px-4 py-3">Talk to Our Experts</a>
                                </div>
                            </div>

                            {/* Micro-Features Structural Row */}
                            <div className="row g-4 pt-5 border-top border-light-subtle hero-reveal">
                                <div className="col-6 col-sm-3 d-flex align-items-center">
                                    <img src={Icon11} alt="Expert Engineering" className="me-2" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                                    <span className="small fw-semibold text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>Expert<br />Engineering</span>
                                </div>
                                <div className="col-6 col-sm-3 d-flex align-items-center">
                                    <img src={Icon12} alt="Proven Methodologies" className="me-2" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                                    <span className="small fw-semibold text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>Proven<br />Methodologies</span>
                                </div>
                                <div className="col-6 col-sm-3 d-flex align-items-center">
                                    <img src={Icon13} alt="Quality & Reliability" className="me-2" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                                    <span className="small fw-semibold text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>Quality &<br />Reliability</span>
                                </div>
                                <div className="col-6 col-sm-3 d-flex align-items-center">
                                    <img src={Icon14} alt="On-time Delivery" className="me-2" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                                    <span className="small fw-semibold text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>On-time<br />Delivery</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Hardware Visual Layout */}
                        <div className="col-xl-6 col-lg-5 text-center mt-5 mt-lg-0 hero-reveal">
                            <div className="d-inline-block position-relative" id="hardwareInteractiveStage" style={{ maxWidth: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(10, 54, 157, 0.08)' }}>
                                <img src={M1} alt="Semiconductor Design & Verification" className="img-fluid" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. EXPERTISE SECTION */}
            <section className="expertise-section scroll-reveal-item">
                <div className="container-fluid">
                    <div className="text-center mb-5">
                        <span className="text-uppercase fw-bold small tracking-wider d-block mb-2" style={{ color: 'var(--primary-cobalt)', fontSize: '0.8rem' }}>Our Expertise</span>
                        <div style={{ width: '45px', height: '3px', backgroundColor: 'var(--primary-cobalt)', margin: '0 auto' }}></div>
                    </div>

                    <div className="row row-cols-2 row-cols-md-4 g-4 text-center">
                        {EXPERTISE_DATA.map((item) => (
                            <div key={item.id} className="col scroll-reveal-item" style={{ transitionDelay: item.delay }}>
                                <div
                                    className="showcase-card anim-lift-card py-4"
                                    onMouseMove={(e) => handleCard3DMove(e, e.currentTarget)}
                                    onMouseLeave={(e) => handleCard3DLeave(e.currentTarget)}
                                >
                                    <div className="blue-icon-box">
                                        <img
                                            src={ICONS_MAP[item.id]}
                                            alt={item.title}
                                            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
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
                <div className="container-fluid scroll-reveal-item">
                    <div className="text-center mb-5">
                        <span className="text-uppercase fw-bold small tracking-wider d-block mb-2" style={{ color: 'var(--primary-cobalt)', fontSize: '0.8rem' }}>Our Semiconductor Engineering Flow</span>
                        <div style={{ width: '45px', height: '3px', backgroundColor: 'var(--primary-cobalt)', margin: '0 auto' }}></div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 pt-3">
                        {FLOW_STEPS.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <div className="flow-node-item text-center flex-fill scroll-reveal-item" style={{ minWidth: '90px' }}>
                                    <div className="flow-node-circle">
                                        <i className={`bi ${step.icon}`}></i>
                                    </div>
                                    <p className="fw-bold text-secondary text-center" style={{ fontSize: '0.72rem', lineHeight: '1.3' }}>
                                        {step.label}
                                    </p>
                                </div>
                                {idx < FLOW_STEPS.length - 1 && (
                                    <div className="flow-arrow-icon d-none d-xl-block">
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

                    <div className="subsystems-matrix-container">
                        {SERVICES_DATA.map((stage) => {
                            const textCol = (
                                <div className="col-lg-6 p-0">
                                    <div className="d-flex align-items-center gap-3 mb-2">
                                        <div className="alpha-badge">{stage.letter}</div>
                                        <h3 className="h5 fw-bold mb-0">{renderWords(stage.title)}</h3>
                                    </div>
                                    <p className="text-secondary small mb-3 subsys-para">
                                        <span className="subsys-para-inner" style={{ transitionDelay: '0.45s' }}>
                                            {stage.desc}
                                        </span>
                                    </p>
                                    <ul className="tech-list">
                                        {stage.items.map((item, itemIdx) => (
                                            <li key={itemIdx} style={{ transitionDelay: `${0.55 + itemIdx * 0.12}s` }}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );

                            const diagramCol = (
                                <div className="col-lg-6 d-flex justify-content-center align-items-center p-0">
                                    <div className="diagram-box">
                                        <img
                                            src={stage.image}
                                            alt={stage.title}
                                            className="img-fluid"
                                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>
                            );

                            return (
                                <div
                                    key={stage.letter}
                                    className="enterprise-row-section scroll-reveal-item"
                                    onMouseMove={(e) => handleCard3DMove(e, e.currentTarget)}
                                    onMouseLeave={(e) => handleCard3DLeave(e.currentTarget)}
                                >
                                    <div className="row align-items-center w-100 g-5 m-0">
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
                    <div className="cta-blue-card shadow-sm">
                        <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
                            <div className="col-lg-6 offset-lg-3 text-center text-lg-start">
                                <h3 className="fw-bold mb-2 fs-3 text-white">Let's Build the Future of Semiconductor Together</h3>
                                <p className="mb-0 text-white-50">Partner with VCTS for innovative, reliable and silicon-proven solutions.</p>
                            </div>
                            <div className="col-lg-3 text-center text-lg-end mt-4 mt-lg-0">
                                <div className="magnetic-btn-anchor" ref={ctaBtnRef}>
                                    <a href="#" className="btn btn-vcts-primary bg-white text-dark py-3 px-4 fw-bold shadow-sm" style={{ fontSize: '0.9rem', borderRadius: '4px' }}>
                                        Connect With Our Experts <i className="bi bi-arrow-right ms-1 text-primary"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}