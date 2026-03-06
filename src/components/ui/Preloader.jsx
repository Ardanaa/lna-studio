import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['LIGHTING', 'CAMERA', 'ROLL', 'LAUGH', 'N', 'ACTION'];

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
  },
};

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(-1); // -1 = clapperboard only
  const [clapOpen, setClapOpen] = useState(true);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Animation sequence
  useEffect(() => {
    let timeout;

    if (index === -1) {
      // Initial pause with clapper open, then start words
      timeout = setTimeout(() => {
        setIndex(0);
      }, 1500);
    } else if (index < words.length) {
      // Snap the clapper on ACTION and immediately exit
      if (words[index] === 'ACTION') {
        setClapOpen(false);
        timeout = setTimeout(() => {
          if (typeof onComplete === 'function') onComplete();
        }, 300);
      } else {
        const delay = index >= 3 ? 500 : 700;
        timeout = setTimeout(() => {
          setIndex((prev) => prev + 1);
        }, delay);
      }
    } else {
      if (typeof onComplete === 'function') onComplete();
    }

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 999,
        backgroundColor: '#0a0a0a',
        color: 'var(--text-color)',
      }}
    >
      {dimension.width > 0 && (
        <>
          {/* Clapperboard */}
          <div style={{ position: 'relative', width: '180px', height: '140px', marginBottom: '40px', zIndex: 2 }}>
            {/* Board body */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100px',
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 15px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '6px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '8px', letterSpacing: '2px', color: 'var(--secondary-color)' }}>PROD</span>
                <span style={{ fontFamily: 'Inter', fontSize: '8px', letterSpacing: '1px', fontWeight: 600 }}>LNA_STUDIO</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '6px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '8px', letterSpacing: '2px', color: 'var(--secondary-color)' }}>SCENE</span>
                <span style={{ fontFamily: 'Inter', fontSize: '8px', letterSpacing: '1px', fontWeight: 600 }}>001</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '8px', letterSpacing: '2px', color: 'var(--secondary-color)' }}>TAKE</span>
                <span style={{ fontFamily: 'Inter', fontSize: '8px', letterSpacing: '1px', fontWeight: 600 }}>01</span>
              </div>
            </div>

            {/* Clapper top (hinged) */}
            <motion.div
              animate={{ rotate: clapOpen ? -30 : 0 }}
              transition={{ duration: 0.15, ease: 'easeIn' }}
              style={{
                position: 'absolute',
                bottom: '98px',
                left: 0,
                width: '100%',
                height: '20px',
                transformOrigin: 'bottom left',
                overflow: 'hidden',
              }}
            >
              {/* Striped pattern */}
              <div style={{
                width: '100%',
                height: '100%',
                background: `repeating-linear-gradient(
                  -45deg,
                  var(--text-color),
                  var(--text-color) 8px,
                  var(--bg-color) 8px,
                  var(--bg-color) 16px
                )`,
                border: '2px solid rgba(255,255,255,0.3)',
              }} />
            </motion.div>

            {/* Bottom stripe (static) */}
            <div style={{
              position: 'absolute',
              bottom: '98px',
              left: 0,
              width: '100%',
              height: '20px',
              background: `repeating-linear-gradient(
                45deg,
                var(--text-color),
                var(--text-color) 8px,
                var(--bg-color) 8px,
                var(--bg-color) 16px
              )`,
              border: '2px solid rgba(255,255,255,0.3)',
              zIndex: -1,
            }} />
          </div>

          {/* Word sequence */}
          <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: 2 }}>
            <AnimatePresence mode="wait">
              {index >= 0 && index < words.length && (
                <motion.p
                  key={words[index]}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
                  className="display-heading"
                  style={{
                    fontSize: index >= 3 ? 'clamp(2rem, 5vw, 4rem)' : 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 800,
                    letterSpacing: index >= 3 ? '6px' : '4px',
                    margin: 0,
                    color: index >= 3 ? 'var(--accent-color)' : 'var(--text-color)',
                  }}
                >
                  {words[index]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '30px', zIndex: 2 }}>
            {words.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: i <= index ? 'var(--accent-color)' : 'rgba(255,255,255,0.15)',
                  scale: i === index ? 1.3 : 1,
                }}
                transition={{ duration: 0.2 }}
                style={{ width: '6px', height: '6px' }}
              />
            ))}
          </div>

          {/* SVG mask for exit */}
          <svg style={{ position: 'absolute', top: 0, width: '100%', height: 'calc(100% + 300px)', zIndex: 1 }}>
            <motion.path
              initial={{ d: initialPath }}
              exit={{ d: targetPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } }}
              fill="#0a0a0a"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Preloader;
