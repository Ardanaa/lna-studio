import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'
import { AnimatePresence, motion } from 'framer-motion'

// Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import SectionDots from './components/layout/SectionDots'

// UI
import Cursor from './components/ui/Cursor'
import Preloader from './components/ui/Preloader'
import PageTransition from './components/ui/PageTransition'

// Pages
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import AllArchive from './pages/AllArchive'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  // Trigger page transition on route change (skip initial load)
  useEffect(() => {
    if (!isLoading && prevPathRef.current !== location.pathname) {
      setIsTransitioning(true);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, isLoading]);

  return (
    <>
      <ScrollToTop />
      <Cursor />

      {/* Initial Preloader (full clapperboard + words) */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Route Transition (clapperboard snap only) */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <PageTransition key="transition" onComplete={() => setIsTransitioning(false)} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ pointerEvents: isLoading || isTransitioning ? 'none' : 'auto' }}
      >
        <Header />
        {location.pathname === '/' && <SectionDots />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<AllArchive />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </motion.main>
    </>
  )
}

export default App
