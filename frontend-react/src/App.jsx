import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import VLSI from './pages/VLSI.jsx'
import Embedded from './pages/Embedded.jsx'
import EdgeAI from './pages/edgeai.jsx'
import Technologies from './pages/Technologies.jsx'
import Hackathon from './pages/Hackathon.jsx'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

const pageRoutes = {
  '/': 'home',
  '/vlsi': 'vlsi',
  '/embedded': 'embedded',
  '/edgeai': 'edgeai',
  '/technologies': 'technologies',
  '/hackathon': 'hackathon',
  '/contact': 'contact'
};

const routePaths = Object.entries(pageRoutes).reduce((paths, [path, page]) => {
  paths[page] = path;
  return paths;
}, {});

const getCurrentRoutePage = () => {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  return pageRoutes[normalizedPath] || 'home';
};

function App() {
  const [currentPage, setCurrentPageState] = useState(getCurrentRoutePage);

  const setCurrentPage = useCallback((page) => {
    const nextPath = routePaths[page] || '/';
    setCurrentPageState(page);

    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page }, '', nextPath);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPageState(getCurrentRoutePage());
      window.scrollTo({ top: 0 });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
      {currentPage === 'edgeai' && <EdgeAI />}
      {currentPage === 'technologies' && <Technologies />}
      {currentPage === 'hackathon' && <Hackathon />}
      {currentPage === 'contact' && <Contact />}
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App
