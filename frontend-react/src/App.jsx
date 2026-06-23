import { useState, useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import VLSI from './pages/VLSI.jsx'
import Embedded from './pages/Embedded.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const navigationEntries = performance.getEntriesByType('navigation');
    const isReload = navigationEntries.length > 0
      ? navigationEntries[0].type === 'reload'
      : performance.navigation.type === 1;

    if (isReload) {
      return sessionStorage.getItem('vcts_current_page') || 'home';
    }
    return 'home';
  });

  useEffect(() => {
    sessionStorage.setItem('vcts_current_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Immediately reveal everything for reduced-motion users
      document.querySelectorAll('.scroll-reveal-item').forEach(el => el.classList.add('active'));
      document.querySelectorAll('.enterprise-row-section').forEach(el => el.classList.add('text-revealed'));
      document.querySelectorAll('.hero-reveal').forEach(el => el.classList.add('active-reveal'));
      return;
    }

    /* —— 1. UNIFIED SCROLL REVEAL OBSERVER —— */
    const scanObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.scroll-reveal-item').forEach(item => scanObserver.observe(item));

    /* —— TEXT REVEAL OBSERVER for enterprise cards —— */
    const textRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('text-revealed');
        } else {
          entry.target.classList.remove('text-revealed');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.enterprise-row-section').forEach(card => {
      textRevealObserver.observe(card);
    });

    return () => {
      scanObserver.disconnect();
      textRevealObserver.disconnect();
    };
  }, [currentPage]);

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'vlsi' && <VLSI />}
      {currentPage === 'embedded' && <Embedded />}
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App

