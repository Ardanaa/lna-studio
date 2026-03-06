import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Magnetic from '../ui/Magnetic';

const navVariants = {
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
};

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <motion.div
        className="header"
        variants={navVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '30px 4vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--text-color)',
          zIndex: 50,
          mixBlendMode: 'difference'
        }}
      >
        <Magnetic>
          <div data-cursor-hover className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <p className="display-heading" style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem', letterSpacing: '4px' }}>
              LNA_STUDIO
            </p>
          </div>
        </Magnetic>

        <nav>
          <Magnetic>
            <div
              data-cursor-hover
              onClick={() => setIsActive(!isActive)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 51,
                padding: '10px 15px',
                border: '2px solid var(--text-color)',
                backgroundColor: isActive && isMobile ? 'var(--text-color)' : 'transparent',
                color: isActive && isMobile ? '#000' : 'var(--text-color)',
                transition: 'all 0.3s ease',
                fontWeight: 700,
                letterSpacing: '2px',
                fontSize: '0.9rem'
              }}
              className="display-heading"
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'var(--text-color)';
                  e.target.style.color = '#000';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--text-color)';
                }
              }}
            >
              {isActive ? '[ CLOSE ]' : '[ MENU ]'}
            </div>
          </Magnetic>
        </nav>
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={isMobile ? { opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' } : { opacity: 0, scale: 0.95, y: -20 }}
            animate={isMobile ? { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' } : { opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: isMobile ? 0 : '90px',
              right: isMobile ? 0 : '4vw',
              width: isMobile ? '100%' : '350px',
              height: isMobile ? '100vh' : 'auto',
              maxHeight: isMobile ? 'auto' : '80vh',
              backgroundColor: 'var(--bg-color)',
              border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: isMobile ? 'none' : '0 20px 40px rgba(0,0,0,0.5)',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              padding: isMobile ? '0 10vw' : '40px 30px',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}
          >
            {isMobile && <div style={{ position: 'absolute', top: 0, left: '5vw', width: '2px', height: '100%', backgroundColor: 'rgba(255,255,255,0.05)' }} />}

            <ul style={{ listStyle: 'none', textAlign: 'left', margin: 0, padding: 0 }}>
              {[{ label: 'ARCHIVE', id: 'projects' }, { label: 'STUDIO', id: 'studio' }, { label: 'INQUIRY', id: 'contact' }].map((item, i) => (
                <NavLink key={i} item={item} index={i} setIsActive={setIsActive} isMobile={isMobile} />
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                position: isMobile ? 'absolute' : 'relative',
                bottom: isMobile ? '5vh' : 'auto',
                left: isMobile ? '10vw' : 'auto',
                marginTop: isMobile ? 0 : '40px',
                display: 'flex',
                gap: isMobile ? '4vw' : '20px',
                flexDirection: isMobile ? 'row' : 'column',
                color: 'var(--secondary-color)',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '1px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: 'var(--text-color)' }}>OFFICE</span>
                <span>1012 JS AMSTERDAM NL</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: 'var(--text-color)' }}>SOCIAL</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>IG</a>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LI</a>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>VI</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ item, index, setIsActive, isMobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setIsActive(false);

    const scrollToSection = () => {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for React Router and framer-motion to transition before scrolling
      setTimeout(() => {
        scrollToSection();
      }, 500);
    } else {
      scrollToSection();
    }
  };

  return (
    <li style={{ marginBottom: isMobile ? '2vh' : '15px', overflow: 'hidden' }}>
      <motion.a
        className="display-heading"
        data-cursor-hover
        onClick={handleClick}
        href={`#${item.id}`}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.5, delay: 0.1 + (index * 0.05), ease: [0.76, 0, 0.24, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          color: isHovered ? 'var(--accent-color)' : 'var(--text-color)',
          textDecoration: 'none',
          fontSize: isMobile ? 'clamp(3rem, 8vw, 6rem)' : '1.8rem',
          fontWeight: 800,
          letterSpacing: isMobile ? '-2px' : '0px',
          transition: 'color 0.2s, transform 0.2s',
          position: 'relative',
          transform: isHovered && !isMobile ? 'translateX(10px)' : 'translateX(0px)',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isMobile && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            style={{
              marginRight: '10px',
              fontSize: '1rem',
              color: 'var(--accent-color)',
              display: 'inline-block'
            }}
          >
            →
          </motion.span>
        )}
        {item.label}
      </motion.a>
    </li>
  );
}
