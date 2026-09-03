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
  const [navigationRequest, setNavigationRequest] = useState(() => ({
    key: 0,
    targetId: window.location.hash.slice(1) || null,
  }));

  /** Updates the visible page, URL, and optional post-render section target. */

  const setCurrentPage = useCallback((page, targetId = null) => {
    window.dispatchEvent(new CustomEvent('vcts:navigation-start'));

    const nextPath = routePaths[page] || '/';
    const nextHash = targetId ? `#${targetId}` : '';
    const nextUrl = `${nextPath}${nextHash}`;
    setCurrentPageState(page);
    setNavigationRequest((request) => ({
      key: request.key + 1,
      targetId,
    }));

    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page, targetId }, '', nextUrl);
    } else if (window.location.hash !== nextHash) {
      window.history.replaceState({ page, targetId }, '', nextUrl);
    }
  }, []);

  // Restore the correct page when the visitor uses browser back or forward navigation.

  useEffect(() => {
    const handlePopState = (event) => {
      setCurrentPageState(getCurrentRoutePage());
      const returnTarget = event.state?.returnTo || window.location.hash.slice(1);
      setNavigationRequest((request) => ({
        key: request.key + 1,
        targetId: returnTarget || null,
      }));
    };

    window.addEventListener('popstate', handlePopState);
    // Remove the global listener when the application shell unmounts.

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persist the active page for other client-side integrations in this session.

  useEffect(() => {
    sessionStorage.setItem('vcts_current_page', currentPage);
  }, [currentPage]);

  // App owns post-navigation scrolling. Keep this immediate and non-smooth so
  // page-specific scroll effects cannot intercept the route transition.

  useEffect(() => {
    const target = navigationRequest.targetId
      ? document.getElementById(navigationRequest.targetId)
      : null;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({
      top: target
        ? target.getBoundingClientRect().top + window.scrollY
        : 0,
      left: 0,
      behavior: 'auto'
    });
    document.documentElement.style.scrollBehavior = previousScrollBehavior;

    // Give mount-time effects one frame to settle, then correct one position
    // change without starting another navigation loop.
    const correctionFrame = requestAnimationFrame(() => {
      const currentTarget = navigationRequest.targetId
        ? document.getElementById(navigationRequest.targetId)
        : null;
      const expectedTop = currentTarget
        ? currentTarget.getBoundingClientRect().top + window.scrollY
        : 0;

      if (Math.abs(window.scrollY - expectedTop) > 1) {
        const correctionScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo({
          top: currentTarget
            ? currentTarget.getBoundingClientRect().top + window.scrollY
            : 0,
          left: 0,
          behavior: 'auto'
        });
        document.documentElement.style.scrollBehavior = correctionScrollBehavior;
      }
    });

    return () => cancelAnimationFrame(correctionFrame);
  }, [currentPage, navigationRequest]);


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
      {currentPage === 'vlsi' && <VLSI navigationRequest={navigationRequest} />}
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
