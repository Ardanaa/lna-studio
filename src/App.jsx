import React, { useState, useEffect } from 'react'
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
  const location = useLocation();

  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Cursor />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
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
