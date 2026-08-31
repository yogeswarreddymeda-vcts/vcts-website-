/**
 * Application Shell
 *
 * Coordinates client-side page selection and renders the shared header,
 * active page component, and footer without a routing dependency.
 */

import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import VLSI from './pages/VLSI.jsx'
import Embedded from './pages/Embedded.jsx'
import EdgeAI from './pages/edgeai.jsx'
import Technologies from './pages/Technologies.jsx'
import Hackathon from './pages/Hackathon.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Careers from './pages/Careers.jsx'
import CareerPortal from './pages/CareerPortal.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

// Canonical URL-to-page mapping used by navigation and browser history.

const pageRoutes = {
  '/': 'home',
  '/vlsi': 'vlsi',
  '/embedded': 'embedded',
  '/edgeai': 'edgeai',
  '/technologies': 'technologies',
  '/hackathon': 'hackathon',
  '/contact': 'contact',
  '/about': 'about',
  '/careers': 'careers',
  '/careers/students': 'career-students',
  '/careers/experienced': 'career-experienced'
};

// Reverse lookup keeps navigation callbacks independent from route strings.

const routePaths = Object.entries(pageRoutes).reduce((paths, [path, page]) => {
  paths[page] = path;
  return paths;
}, {});

const getCurrentRoutePage = () => {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  return pageRoutes[normalizedPath] || 'home';
};

/** Renders the persistent layout and the page selected from the current URL. */

function App() {
  const [currentPage, setCurrentPageState] = useState(getCurrentRoutePage);

  /** Updates the visible page and synchronizes the browser history entry. */

  const setCurrentPage = useCallback((page) => {
    const nextPath = routePaths[page] || '/';
    setCurrentPageState(page);

    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page }, '', nextPath);
    }
  }, []);

  // Restore the correct page when the visitor uses browser back or forward navigation.

  useEffect(() => {
    const handlePopState = (event) => {
      setCurrentPageState(getCurrentRoutePage());
      const returnTarget = event.state?.returnTo || window.location.hash.slice(1);

      if (returnTarget) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            document.getElementById(returnTarget)?.scrollIntoView({ behavior: 'auto', block: 'start' });
          });
        });
      } else {
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener('popstate', handlePopState);
    // Remove the global listener when the application shell unmounts.

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persist the active page for other client-side integrations in this session.

  useEffect(() => {
    sessionStorage.setItem('vcts_current_page', currentPage);
  }, [currentPage]);

  // Resolve section hashes after the active React page has mounted.

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentPage]);

  // Maintain shared section-reveal classes for pages that use the global animation contract.

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Immediately reveal all content for reduced-motion visitors.

      document.querySelectorAll('.scroll-reveal-item').forEach(el => el.classList.add('active'));
      document.querySelectorAll('.enterprise-row-section').forEach(el => el.classList.add('text-revealed'));
      document.querySelectorAll('.hero-reveal').forEach(el => el.classList.add('active-reveal'));
      return;
    }

    // One observer controls the shared section-reveal state.

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

    // A separate observer coordinates text timing inside enterprise cards.

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

    // Disconnect both observers before rebuilding them for another page.

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
      {currentPage === 'about' && <About setCurrentPage={setCurrentPage} />}
      {currentPage === 'careers' && <Careers setCurrentPage={setCurrentPage} />}
      {currentPage === 'career-students' && <CareerPortal mode="students" setCurrentPage={setCurrentPage} />}
      {currentPage === 'career-experienced' && <CareerPortal mode="experienced" setCurrentPage={setCurrentPage} />}
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App
